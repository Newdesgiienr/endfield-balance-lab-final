(() => {
  'use strict';

  const { parties: rawParties, stage, monsters, model } = window.V043_DATA;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const fmt = new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 1 });
  const fmt0 = new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 0 });

  const typeMeta = {
    normal: { label: '일반 공격 판정', color: '#526bb2' },
    battle: { label: '배틀 스킬', color: '#d7553e' },
    combo: { label: '연계 스킬', color: '#3e8552' },
    ultimate: { label: '궁극기', color: '#7158a6' },
    special: { label: '기타 피해', color: '#d39726' }
  };
  const partyPalette = ['#d9553d', '#5d9b62', '#4f6fba', '#9a61a7', '#b27a3f', '#31858d'];
  const pct = n => `${fmt.format(n)}%`;
  const num = n => fmt.format(Number.isFinite(n) ? n : 0);
  const num0 = n => fmt0.format(Math.round(Number.isFinite(n) ? n : 0));
  const compactMan = n => { const value = Number.isFinite(Number(n)) ? Number(n) : 0; return value % 10000 === 0 ? `${value / 10000}만` : num0(value); };
  const seconds = n => `${fmt.format(Number.isFinite(n) ? n : 0)}초`;
  const safeId = value => String(value).replace(/[^a-zA-Z0-9_-]/g, '-');

  function setDualSummaryText(target, first, second) {
    if (!target) return;
    target.classList.add('dual-summary-setting');
    target.innerHTML = `<span>${first}</span><span>· ${second}</span>`;
  }

  function setDualOutputLines(target, first, second) {
    if (!target) return;
    target.classList.add('dual-output-lines');
    target.innerHTML = `<span>${first}</span><span>${second}</span>`;
  }

  function otherTypeName(e) {
    const text = `${e.note || ''} ${e.label || ''}`;
    if (/폭발|Burst/i.test(text)) return '아츠 폭발';
    if (/연소|Burn/i.test(text)) return '연소';
    if (/감전|Electrification/i.test(text)) return '감전 반응';
    if (/동결|Solidification/i.test(text)) return '동결 반응';
    if (/부식/i.test(text)) return '부식';
    if (/강타/i.test(text)) return '강타';
    if (/갑옷 파괴/i.test(text)) return '갑옷 파괴';
    return e.note || e.label || '특수 효과 피해';
  }

  function normalizeParty(p) {
    const characters = Array.isArray(p.characters) ? p.characters : Object.entries(p.characters).map(([id, c]) => ({ id, ...c }));
    const order = p.order && p.order.length ? p.order : characters.map(c => c.id);
    const charMap = Object.fromEntries(characters.map(c => [c.id, c]));
    const breakdown = p.breakdown || {};
    const events = (p.events || []).map(e => ({ ...e, damage: Number(e.damage) || 0, time: Number(e.time) || 0 }));
    const ultimateByCharacter = new Map();
    events.filter(e => e.type === 'ultimate').sort((a, b) => a.time - b.time).forEach(e => {
      const prev = ultimateByCharacter.get(e.character) || { use: 0, time: -Infinity };
      const use = prev.use === 0 || e.time - prev.time > 12 ? prev.use + 1 : prev.use;
      e.ultimateUse = use;
      ultimateByCharacter.set(e.character, { use, time: e.time });
    });
    const specialTotalFromBreakdown = Object.entries(breakdown).filter(([k]) => /아츠|반응|강타|갑옷|부식|연소|기타/.test(k)).reduce((s, [, v]) => s + Number(v || 0), 0);
    const battleDamage = Number(p.battleDamage || Object.entries(breakdown).filter(([k]) => /배틀/.test(k)).reduce((s, [, v]) => s + Number(v || 0), 0));
    const otherDamage = Number(p.otherDamage || specialTotalFromBreakdown || Number(p.burst || 0) + Number(p.reaction || 0));
    const comboDamage = Object.entries(breakdown).filter(([k]) => /연계/.test(k)).reduce((s, [, v]) => s + Number(v || 0), 0);
    const ultimateDamage = Object.entries(breakdown).filter(([k]) => /궁극/.test(k)).reduce((s, [, v]) => s + Number(v || 0), 0);
    const rawUltimate = events.filter(e => e.type === 'ultimate' && e.damage > 0).reduce((s, e) => s + e.damage, 0);
    const rawRepeatedUltimate = events.filter(e => e.type === 'ultimate' && e.damage > 0 && e.ultimateUse > 1).reduce((s, e) => s + e.damage, 0);
    const otherDamageTypes = p.otherDamageTypes?.length ? p.otherDamageTypes : [...new Set(events.filter(e => e.type === 'special' && e.damage > 0).map(otherTypeName))];
    return {
      ...p,
      characters,
      order,
      charMap,
      breakdown,
      phases: p.phases || [],
      events,
      curve: p.curve || [[0, 0], [p.duration, p.totalDamage]],
      mainNormalDamage: Number(p.mainNormalDamage || p.normalConstraintDamage || 0),
      battleDamage,
      otherDamage,
      otherDamageTypes,
      comboDamage,
      ultimateDamage,
      repeatedUltimateDamage: ultimateDamage,
      specialTotal: otherDamage,
      focusTag: p.focusTag || '피해 유형 혼합'
    };
  }
  const parties = rawParties.map(normalizeParty);
  const partyById = Object.fromEntries(parties.map(p => [p.id, p]));
  const phaseState = new Map();

  const phaseHp = p => p.monsters.reduce((s, m) => s + m.hp, 0);
  const waveHp = w => w.phases.reduce((s, p) => s + phaseHp(p), 0);
  const totalStageHp = () => stage.waves.reduce((s, w) => s + waveHp(w), 0);
  const placedMonsters = () => stage.waves.flatMap(w => w.phases.flatMap(p => p.monsters));
  const phaseCount = () => stage.waves.reduce((s, w) => s + w.phases.length, 0);

  // 웨이브 타임라인 클리어 모델: 각 웨이브 시작 시 파티 행동 사이클을 0초부터 다시 재생합니다.
  // 웨이브 HP가 실제 누적 피해에 의해 0이 되는 시점을 구하고, 웨이브 사이 전환시간은 기존 총 15초를 유지합니다.
  function normalizeDamageCurve(curve, duration, expectedTotal = null) {
    const safeDuration = Math.max(Number(duration) || 0, .001);
    const rows = (Array.isArray(curve) ? curve : [])
      .map(row => [Math.max(0, Number(row?.[0]) || 0), Math.max(0, Number(row?.[1]) || 0)])
      .filter(row => row[0] <= safeDuration + 1e-6)
      .sort((a, b) => a[0] - b[0]);
    if (!rows.length || rows[0][0] > 1e-6) rows.unshift([0, 0]);
    const rawFinal = rows.at(-1)?.[1] || 0;
    const targetFinal = Number.isFinite(Number(expectedTotal)) ? Math.max(0, Number(expectedTotal)) : rawFinal;
    const scale = rawFinal > 0 && targetFinal >= 0 ? targetFinal / rawFinal : 1;
    const scaled = rows.map(([time, value]) => [time, value * scale]);
    if (scaled.at(-1)[0] < safeDuration - 1e-6) scaled.push([safeDuration, targetFinal]);
    else scaled[scaled.length - 1][1] = targetFinal;
    return scaled;
  }

  function cycleTimeToHp(curve, duration, hp) {
    const targetHp = Math.max(0, Number(hp) || 0);
    if (targetHp <= 0) return { time: 0, cycles: 0, cycleTime: 0 };
    const safeDuration = Math.max(Number(duration) || 0, .001);
    const cycleDamage = Math.max(0, curve.at(-1)?.[1] || 0);
    if (!(cycleDamage > 0)) return { time: Infinity, cycles: Infinity, cycleTime: Infinity };

    const completedCycles = Math.max(0, Math.floor((targetHp - 1e-7) / cycleDamage));
    const remaining = Math.max(1e-7, targetHp - completedCycles * cycleDamage);
    let hitTime = safeDuration;
    for (const [time, cumulative] of curve) {
      if (cumulative + 1e-7 >= remaining) {
        hitTime = Math.min(safeDuration, time);
        break;
      }
    }
    return { time: completedCycles * safeDuration + hitTime, cycles: completedCycles, cycleTime: hitTime };
  }

  function simulateWaveTimelineClear(curve, duration, waveRows) {
    const safeRows = (Array.isArray(waveRows) ? waveRows : []).map((row, index) => ({
      wave: Number(row.wave) || index + 1,
      hp: Math.max(0, Number(row.hp) || 0)
    }));
    const rows = safeRows.map(row => {
      const clear = cycleTimeToHp(curve, duration, row.hp);
      return { ...row, combatTime: clear.time, completedCycles: clear.cycles, finalCycleTime: clear.cycleTime };
    });
    const combatTime = rows.reduce((sum, row) => sum + row.combatTime, 0);
    const transitionCount = Math.max(0, rows.length - 1);
    const transitionTime = transitionCount ? Number(model.stageTransitionSeconds) || 0 : 0;
    const transitionPerGap = transitionCount ? transitionTime / transitionCount : 0;
    return { rows, combatTime, transitionTime, transitionPerGap, totalTime: combatTime + transitionTime, cycleResetEachWave: true };
  }

  function baseWaveRows(hpMultiplier = 1) {
    const mult = Math.max(0, Number(hpMultiplier) || 0);
    return stage.waves.map(wave => ({ wave: wave.wave, hp: waveHp(wave) * mult }));
  }

  function clearEstimateWithWaveRows(party, waveRows, damageScale = 1) {
    const targetDamage = Math.max(0, party.totalDamage * Math.max(0, Number(damageScale) || 0));
    const curve = normalizeDamageCurve(party.curve, party.duration, targetDamage);
    return simulateWaveTimelineClear(curve, party.duration, waveRows).totalTime;
  }

  const clearEstimate = (party, hpMultiplier = 1, dps = party.dps) => {
    const damageScale = Math.max(0, Number(dps) || 0) / Math.max(Number(party.dps) || 0, 1);
    return clearEstimateWithWaveRows(party, baseWaveRows(hpMultiplier), damageScale);
  };
  const statRatio = (c, reduction) => {
    const before = 1 + .005 * c.main + .002 * c.sub;
    const after = 1 + .005 * c.main * (1 - reduction) + .002 * c.sub;
    return after / before;
  };
  const portraitsHtml = p => p.order.map(id => `<img src="${p.charMap[id].portrait}" alt="${p.charMap[id].name}" style="object-position:${p.charMap[id].portraitPosition || '50% 40%'}">`).join('');

  function init() {
    renderPartyList();
    renderStage();
    renderConstraintPartyShells();
    bindControls();
    bindHighlightControls();
    bindExclusiveModal();
    bindComboQuickDrawer();
    updateStatConstraint();
    updateNormalConstraint();
    updateHpConstraint();
    updateTimeConstraint();
    updateSkillOtherConstraint();
    updateUltRepeatConstraint();
    updateComboSpeedConstraint();
    updateStatusWindowConstraint();
    updateStatusStageConstraint();
    updateStatusReapplyConstraint();
    updateStageEnhanceConstraint();
    updateHighHpCapConstraint();
    updateControlRecoveryConstraint();
    initFreezeReleaseConstraint();
    updateComboConstraint();
  }

  function partyMarkup(p) {
    const pid = safeId(p.id);
    return `<details id="partyDetails-${pid}" class="fold-card card" data-party-id="${p.id}">
      <summary class="party-fold-summary">
        <div class="summary-party-id">
          <span class="party-tab-portraits" data-role="partyTabPortraits"></span>
          <div><span class="party-focus-tag">${p.focusTag}</span><b>${p.name}</b></div>
        </div>
        <div data-role="baseMetrics" class="summary-metrics"></div>
        <span class="fold-action"><b class="closed-label">원본 파티 분석 펼치기</b><b class="open-label">원본 파티 분석 접기</b></span>
      </summary>
      <div class="fold-body">
        <div data-role="characterGrid" class="character-grid"></div>
        <section class="inner-section">
          <div class="inner-heading"><span>ROTATION</span><h3>전투 흐름 요약</h3></div>
          <div class="flow-guide"><div class="type-legend" data-role="typeLegend"></div></div>
          <div class="phase-flow" data-role="phaseFlow"></div>
        </section>
        <section class="timeline-card inner-card">
          <div class="card-title-row timeline-title-row"><div><span class="eyebrow">캐릭터별 행동</span><h3>${Math.ceil(p.duration)}초 행동 타임라인</h3></div><div class="timeline-type-key" data-role="timelineTypeLegend" aria-label="피해 판정 범례"></div></div>
          <div class="timeline-axis" data-role="timelineAxis"></div>
          <div class="timeline-lanes" data-role="timelineLanes"></div>
          <div data-role="eventInspector" class="event-inspector empty"><span>위 타임라인은 행동명, 피해 판정, 발생 시간을 표시합니다. 마우스 오버 시 정보가 팝업됩니다.</span></div>
        </section>
        <div class="chart-grid">
          <article class="inner-card chart-card">
            <div class="card-title-row"><div><span class="eyebrow">순간 피해</span><h3>시간대별 피해 분포</h3></div><span class="chart-hint">2초 단위 합산</span></div>
            <div data-role="damageLegend" class="chart-legend"></div><div data-role="damageBars" class="svg-chart"></div>
          </article>
          <article class="inner-card chart-card">
            <div class="card-title-row"><div><span class="eyebrow">누적 피해</span><h3>시간대별 누적 피해</h3></div></div>
            <div data-role="cumulativeLegend" class="chart-legend"></div><div data-role="cumulativeChart" class="svg-chart"></div>
          </article>
        </div>
        <article class="inner-card breakdown-card">
          <div class="card-title-row"><div><span class="eyebrow">피해 구성</span><h3>주력 오퍼레이터 피해 유형 구성</h3></div></div>
          <div data-role="damageBreakdown"></div>
          <p class="plain-explanation">처형 공격과 궁극기 강화 일반 공격은 일반 공격 판정에 포함됩니다.</p>
        </article>
        <details class="inner-card log-details">
          <summary><span><b>상세 행동 기록</b><small>공식 스킬 분류와 피해 판정</small></span><strong>펼치기</strong></summary>
          <div class="table-wrap"><table><colgroup><col class="log-time"><col class="log-operator"><col class="log-action"><col class="log-verdict"><col class="log-damage"></colgroup><thead><tr><th>시간</th><th>오퍼레이터</th><th>행동</th><th>피해 판정</th><th>피해</th></tr></thead><tbody data-role="eventTable"></tbody></table></div>
        </details>
      </div>
    </details>`;
  }

  function renderPartyList() {
    const list = $('#partyList');
    list.innerHTML = parties.map(partyMarkup).join('');
    parties.forEach(p => {
      const root = $(`[data-party-id="${p.id}"]`, list);
      renderPartySummary(p, root);
      renderCharacters(p, root);
      renderPartyLegend(root);
      renderPhases(p, root);
      renderTimeline(p, root);
      renderDamageBars(p, root);
      renderLegendItems($('[data-role="cumulativeLegend"]', root), [{ label: '원본 누적 피해', color: '#d7553e' }]);
      renderCumulative($('[data-role="cumulativeChart"]', root), [{ color: '#d7553e', points: p.curve }], p.duration);
      renderBreakdown(p, root);
      renderEventTable(p, root);
    });
  }

  function renderPartySummary(p, root) {
    $('[data-role="partyTabPortraits"]', root).innerHTML = portraitsHtml(p);
    const metrics = [
      ['원본 DPS', num(p.dps)], ['총피해', num0(p.totalDamage)], ['분석 시간', seconds(p.duration)], ['기타 피해', num0(p.specialTotal)]
    ];
    $('[data-role="baseMetrics"]', root).innerHTML = metrics.map(([k, v]) => `<div class="summary-metric"><span>${k}</span><b>${v}</b></div>`).join('');
  }

  function renderCharacters(p, root) {
    $('[data-role="characterGrid"]', root).innerHTML = p.order.map(id => {
      const c = p.charMap[id];
      return `<article class="character-card card">
        <div class="character-visual" style="--portrait-position:${c.portraitPosition || '50% 40%'}"><img src="${c.portrait}" alt="${c.name}">
          <div class="character-id"><div><small>${c.en}</small><h3>${c.name}</h3></div><div class="icon-pair"><img src="${c.elementIcon}" title="${c.element}" alt="${c.element}"><img src="${c.roleIcon}" title="${c.role}" alt="${c.role}"></div></div>
        </div>
        <div class="character-body">
          <div class="char-tags"><span>${c.potential} · ${c.element}</span><span>${c.role}</span></div>
          <div class="weapon-name"><b>${c.weapon}</b><small class="set-highlight">${c.set}</small><p class="set-effect-copy">${c.setEffect || '세트 효과 정보가 없습니다.'}</p></div>
          <div class="char-stats">
            <div><span>개인 DPS</span><b>${num(c.dps)}</b></div><div><span>총피해</span><b>${num0(c.damage)}</b></div>
            <div><span>주요 능력치</span><b>${c.mainName} ${num(c.main)}</b></div><div><span>보조 능력치</span><b>${c.subName} ${num(c.sub)}</b></div>
          </div>
          <div class="share-bar"><header><span>파티 피해 기여율</span><b>${pct(c.share)}</b></header><div class="share-track"><i style="width:${Math.min(c.share, 100)}%"></i></div></div>
        </div>
      </article>`;
    }).join('');
  }

  function renderPartyLegend(root) {
    const items = Object.entries(typeMeta);
    $('[data-role="typeLegend"]', root).innerHTML = items.map(([,m]) => `<span class="legend-item"><i style="background:${m.color}"></i>${m.label}</span>`).join('');
    const timelineLegend = $('[data-role="timelineTypeLegend"]', root);
    if (timelineLegend) timelineLegend.innerHTML = items.map(([key,m]) => `<span><i class="timeline-key-mark type-${key}"></i><b>${m.label}</b></span>`).join('');
  }

  function renderPhases(p, root) {
    $('[data-role="phaseFlow"]', root).innerHTML = p.phases.map(ph => `<button type="button" class="phase-button" data-phase="${ph.id}"><time>${num(ph.start)}～${num(ph.end)}초</time><b>${ph.name}</b></button>`).join('');
    $$('.phase-button', root).forEach(btn => btn.addEventListener('click', () => setPhase(p, root, btn.dataset.phase)));
  }

  function setPhase(p, root, id) {
    phaseState.set(p.id, id);
    $$('.phase-button', root).forEach(b => b.classList.toggle('active', b.dataset.phase === id));
    const ph = p.phases.find(x => x.id === id);
    $$('.event-dot', root).forEach(el => {
      const e = p.events[Number(el.dataset.eventIndex)];
      el.classList.toggle('dim', ph ? !(e.time >= ph.start && e.time <= ph.end) : false);
    });
    if (!ph) clearInspector(root);
  }

  function timelineTicks(duration) {
    const max = Math.ceil(duration / 10) * 10;
    const ticks = [];
    for (let t = 0; t <= max; t += 10) ticks.push(t);
    return { max, ticks };
  }

  function renderTimeline(p, root) {
    const { max, ticks } = timelineTicks(p.duration);
    $('[data-role="timelineAxis"]', root).innerHTML = ticks.map(t => `<span class="axis-tick" style="left:${t / max * 100}%">${t}초</span>`).join('');
    $('[data-role="timelineLanes"]', root).innerHTML = p.order.map(id => {
      const c = p.charMap[id];
      const events = p.events.map((e, index) => ({ ...e, index })).filter(e => e.character === id);
      return `<div class="timeline-lane"><div class="lane-label"><img src="${c.portrait}" alt=""><div><b>${c.name}</b><small>${c.role}</small></div></div><div class="lane-track">${events.map(e => `<button type="button" class="event-dot type-${e.type}" style="left:${Math.min(99.4, e.time / max * 100)}%" data-event-index="${e.index}" data-label="${e.label} · ${num(e.time)}초" aria-label="${e.label}"></button>`).join('')}</div></div>`;
    }).join('');
    $$('.event-dot', root).forEach(el => el.addEventListener('click', () => selectEvent(p, root, Number(el.dataset.eventIndex))));
  }

  function selectEvent(p, root, index) {
    $$('.event-dot', root).forEach(el => el.classList.toggle('selected', Number(el.dataset.eventIndex) === index));
    const e = p.events[index], c = p.charMap[e.character];
    const inspector = $('[data-role="eventInspector"]', root);
    inspector.className = 'event-inspector';
    inspector.innerHTML = `<div class="inspector-main"><strong>${e.label}</strong><small>${c ? c.name : e.character}${e.note ? ` · ${e.note}` : ''}</small></div>
      <div class="inspector-cell"><span>피해 판정</span><b>${(typeMeta[e.type] || typeMeta.special).label}</b></div>
      <div class="inspector-cell"><span>발생 시간</span><b>${num(e.time)}초</b></div><div class="inspector-cell"><span>피해량</span><b>${num0(e.damage)}</b></div>`;
  }

  function clearInspector(root) {
    $$('.event-dot', root).forEach(el => el.classList.remove('selected'));
    const inspector = $('[data-role="eventInspector"]', root);
    inspector.className = 'event-inspector empty';
    inspector.innerHTML = '<span>위 타임라인은 행동명, 피해 판정, 발생 시간을 표시합니다. 마우스 오버 시 정보가 팝업됩니다.</span>';
  }

  function renderLegendItems(target, items, portraits = false) {
    target.innerHTML = items.map(x => `<span class="chart-legend-item"><i style="background:${x.color}"></i>${portraits ? `<img src="${x.portrait}" alt="">` : ''}${x.label}</span>`).join('');
  }

  function renderDamageBars(p, root) {
    const bucketCount = Math.max(1, Math.ceil(p.duration / 2));
    const buckets = Array.from({ length: bucketCount }, (_, i) => ({ start: i * 2, chars: Object.fromEntries(p.order.map(id => [id, 0])) }));
    p.events.forEach(e => { const i = Math.min(bucketCount - 1, Math.floor(e.time / 2)); if (buckets[i].chars[e.character] !== undefined) buckets[i].chars[e.character] += e.damage; });
    const totals = buckets.map(b => Object.values(b.chars).reduce((a, v) => a + v, 0));
    const max = Math.max(...totals, 1), W = 720, H = 280, pad = { l: 48, r: 12, t: 12, b: 34 }, bw = (W - pad.l - pad.r) / buckets.length;
    let grid = '', bars = '';
    [0, .25, .5, .75, 1].forEach(v => { const y = H - pad.b - v * (H - pad.t - pad.b); grid += `<line class="chart-grid-line" x1="${pad.l}" x2="${W - pad.r}" y1="${y}" y2="${y}"/><text class="chart-label" x="${pad.l - 8}" y="${y + 4}" text-anchor="end">${Math.round(max * v / 1000)}k</text>`; });
    const { max: timeMax, ticks } = timelineTicks(p.duration);
    ticks.forEach(t => { const x = pad.l + t / timeMax * (W - pad.l - pad.r); grid += `<text class="chart-label" x="${x}" y="${H - 10}" text-anchor="middle">${t}초</text>`; });
    buckets.forEach((b, i) => { let yBase = H - pad.b; p.order.forEach((id, index) => { const value = b.chars[id]; if (!value) return; const h = value / max * (H - pad.t - pad.b); yBase -= h; bars += `<rect x="${pad.l + i * bw + 1}" y="${yBase}" width="${Math.max(2, bw - 2)}" height="${h}" fill="${partyPalette[index]}"><title>${b.start}～${b.start + 2}초 · ${p.charMap[id].name} ${num0(value)}</title></rect>`; }); });
    renderLegendItems($('[data-role="damageLegend"]', root), p.order.map((id, i) => ({ label: p.charMap[id].name, color: partyPalette[i], portrait: p.charMap[id].portrait })), true);
    $('[data-role="damageBars"]', root).innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="오퍼레이터별 시간대 피해 분포">${grid}${bars}</svg>`;
  }

  function renderCumulative(target, series, duration) {
    const W = 720, H = 270, p = { l: 58, r: 14, t: 15, b: 36 };
    const maxY = Math.max(...series.flatMap(s => s.points.map(x => x[1])), 1);
    const x = t => p.l + t / Math.max(duration, 1) * (W - p.l - p.r), y = v => H - p.b - v / maxY * (H - p.t - p.b);
    let grid = '', paths = '';
    [0, .25, .5, .75, 1].forEach(v => { const yy = y(maxY * v); grid += `<line class="chart-grid-line" x1="${p.l}" x2="${W - p.r}" y1="${yy}" y2="${yy}"/><text class="chart-label" x="${p.l - 8}" y="${yy + 4}" text-anchor="end">${(maxY * v / 1e6).toFixed(1)}M</text>`; });
    const ticks = timelineTicks(duration).ticks; ticks.forEach(t => { if (t <= duration + 0.01) grid += `<text class="chart-label" x="${x(t)}" y="${H - 10}" text-anchor="middle">${t}초</text>`; });
    series.forEach(s => { const d = s.points.map((pt, i) => `${i ? 'L' : 'M'} ${x(pt[0]).toFixed(1)} ${y(pt[1]).toFixed(1)}`).join(' '); paths += `<path d="${d}" fill="none" stroke="${s.color}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`; });
    target.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img">${grid}${paths}</svg>`;
  }

  function breakdownColor(label, index) {
    if (/일반/.test(label)) return typeMeta.normal.color;
    if (/배틀/.test(label)) return typeMeta.battle.color;
    if (/연계/.test(label)) return typeMeta.combo.color;
    if (/궁극/.test(label)) return typeMeta.ultimate.color;
    if (/아츠|반응|강타/.test(label)) return typeMeta.special.color;
    return ['#8b96a2', '#7e8792'][index % 2];
  }

  function renderBreakdown(p, root) {
    const entries = Object.entries(p.breakdown);
    const known = entries.reduce((s, [, v]) => s + v, 0);
    const rows = [...entries];
    if (p.totalDamage - known > 1) rows.push(['기타·집계 차이', p.totalDamage - known]);
    $('[data-role="damageBreakdown"]', root).innerHTML = rows.map(([label, value], i) => { const share = value / p.totalDamage * 100; return `<div class="breakdown-row"><label>${label}</label><div class="breakdown-track"><i style="width:${Math.min(100, share)}%;background:${breakdownColor(label, i)}"></i></div><b>${num0(value)} · ${pct(share)}</b></div>`; }).join('');
  }

  function renderEventTable(p, root) {
    $('[data-role="eventTable"]', root).innerHTML = p.events.map(e => `<tr><td>${num(e.time)}초</td><td>${p.charMap[e.character]?.name || e.character}</td><td><b>${e.label}</b></td><td><span class="type-chip type-${e.type}">${(typeMeta[e.type] || typeMeta.special).label}</span></td><td>${num0(e.damage)}</td></tr>`).join('');
  }


  function stageComposition(level = 0) {
    const normalized = Number(level) >= 2 ? 2 : Number(level) >= 1 ? 1 : 0;
    return stage.waves.map(wave => ({
      ...wave,
      phases: wave.phases.map(phase => ({
        ...phase,
        monsters: phase.monsters.map(monster => {
          const wave4Target = normalized >= 1 && wave.wave === 4 && (monster.monsterKey === 'heavySting' || monster.monsterKey === 'heavyRam');
          const wave3Target = normalized >= 2 && wave.wave === 3 && monster.monsterKey === 'heavyRam';
          if (!wave4Target && !wave3Target) return { ...monster, isEnhanced: false, baseHp: monster.hp };
          const alphaKey = monster.monsterKey === 'heavyRam' ? 'heavyRamAlpha' : 'heavyStingAlpha';
          const alpha = monsters[alphaKey];
          return {
            ...monster,
            displayKey: `${monster.monsterKey}-alpha`,
            name: alpha?.name || `${monster.name} · α`,
            icon: alpha?.icon || monster.icon,
            class: alpha?.class || `${monster.class} 강화형`,
            hp: alpha?.hp ?? monster.hp * 1.5,
            baseHp: monster.hp,
            isEnhanced: true,
            alphaKey
          };
        })
      }))
    }));
  }

  function compositionMonsters(waves) {
    return waves.flatMap(wave => wave.phases.flatMap(phase => phase.monsters));
  }

  function renderStageComposition({ level = 0, summaryId, waveGridId, specGridId }) {
    const waves = stageComposition(level);
    const allMonsters = compositionMonsters(waves);
    const totalHp = waves.reduce((sum, wave) => sum + waveHp(wave), 0);
    const totalPhases = waves.reduce((sum, wave) => sum + wave.phases.length, 0);
    const summary = $(summaryId);
    const waveGrid = $(waveGridId);
    const specGrid = $(specGridId);
    if (!summary || !waveGrid || !specGrid) return;

    const hpLabel = level ? '적용 총 HP' : '원본 총 HP';
    summary.innerHTML = [
      ['배치 몬스터', `${allMonsters.length}마리`],
      ['세부 페이즈', `${totalPhases}개`],
      [hpLabel, num0(totalHp)],
      ['웨이브 전환', `${model.stageTransitionSeconds}초`]
    ].map(([k, v]) => `<div class="summary-metric"><span>${k}</span><b>${v}</b></div>`).join('');

    waveGrid.innerHTML = waves.map(wave => {
      const count = wave.phases.reduce((sum, phase) => sum + phase.monsters.length, 0);
      return `<article class="wave-card card${level ? ' enhanced-wave-card' : ''}">
        <div class="wave-head"><h3>웨이브 ${wave.wave}</h3><span>${count}마리 · HP ${num0(waveHp(wave))}</span></div>
        <div class="phase-list">${wave.phases.map(phase => `<article>
          <header><b>${phase.order}차 등장</b><span>${phase.monsters.length}마리</span></header>
          <div class="monster-avatar-row">${phase.monsters.map(monster => `<span class="monster-avatar-wrap${monster.isEnhanced ? ' enhanced-monster-avatar' : ''}">
            <img class="monster-avatar" src="${monster.icon}" alt="${monster.name}">
            ${monster.isEnhanced ? '<i class="enhanced-alpha-badge">α</i>' : ''}
            <span class="monster-name-tooltip">${monster.name}${monster.isEnhanced ? ` · HP ${num0(monster.baseHp)} → ${num0(monster.hp)}` : ''}</span>
          </span>`).join('')}</div>
          <span class="phase-hp">페이즈 총 HP ${num0(phaseHp(phase))}</span>
        </article>`).join('')}</div>
      </article>`;
    }).join('');

    const unique = [];
    const seen = new Set();
    allMonsters.forEach(monster => {
      const key = monster.displayKey || monster.monsterKey;
      if (seen.has(key)) return;
      seen.add(key);
      unique.push(monster);
    });
    specGrid.innerHTML = unique.map(monster => {
      const key = monster.displayKey || monster.monsterKey;
      const instances = allMonsters.filter(item => (item.displayKey || item.monsterKey) === key).length;
      const source = monster.isEnhanced ? monster : monsters[monster.monsterKey] || monster;
      return `<article class="monster-spec${monster.isEnhanced ? ' enhanced-monster-spec' : ''}">
        <img src="${monster.icon || source.icon}" alt="${monster.name || source.name}">
        <div><h4>${monster.name || source.name}${monster.isEnhanced ? '<span class="enhanced-spec-badge">강화</span>' : ''}</h4>
          <p>${monster.class || source.class} · 배치 ${instances}마리${monster.isEnhanced ? ` · 기본 HP ${num0(monster.baseHp)}` : ''}</p>
          <div class="monster-stat-line"><span>HP ${num0(monster.hp || source.hp)}</span><span>ATK ${num0(source.atk)}</span><span>DEF ${num0(source.def)}</span><span>강인도 ${num0(source.stagger)}</span></div>
        </div>
      </article>`;
    }).join('');
  }

  function renderStage() {
    renderStageComposition({ level: 0, summaryId: '#stageSummary', waveGridId: '#waveGrid', specGridId: '#monsterSpecGrid' });
    renderStageComposition({ level: 1, summaryId: '#stageSummaryEnhance1', waveGridId: '#waveGridEnhance1', specGridId: '#monsterSpecGridEnhance1' });
    renderStageComposition({ level: 2, summaryId: '#stageSummaryEnhance2', waveGridId: '#waveGridEnhance2', specGridId: '#monsterSpecGridEnhance2' });
  }

  function resultPanelMarkup(kind, p) {
    const combo = kind === 'combo';
    const inner = kind === 'stat' ? `<div class="constraint-result-grid"><div data-role="statTable" class="compact-result"></div><div class="comparison-chart"><div class="chart-title"><b>누적 피해 비교</b></div><div data-role="statLegend" class="chart-legend"></div><div data-role="statCurve" class="svg-chart small"></div></div></div><div class="impact-analysis"><span>전투 영향 해석</span><p data-role="statImpact"></p></div>`
      : kind === 'normal' ? `<div class="constraint-result-grid normal-grid"><div class="affected-actions"><div class="chart-title"><b>영향받는 행동 타임라인</b><span data-role="normalActionCount"></span></div><div data-role="normalMiniTimeline"></div></div><div class="comparison-chart"><div class="chart-title"><b>누적 피해 비교</b></div><div data-role="normalLegend" class="chart-legend"></div><div data-role="normalCurve" class="svg-chart small"></div></div></div><div class="impact-analysis"><span>전투 영향 해석</span><p data-role="normalImpact"></p></div>`
      : kind === 'hp' ? `<div class="constraint-result-grid hp-grid"><div data-role="hpWaveTable" class="compact-result"></div><div class="comparison-chart"><div class="chart-title"><b>웨이브별 총 HP 비교</b></div><div data-role="hpLegend" class="chart-legend"></div><div data-role="hpWaveChart" class="svg-chart small"></div></div></div><div class="impact-analysis"><span>전투 영향 해석</span><p data-role="hpImpact"></p></div>`
      : kind === 'time' ? `<div class="constraint-result-grid time-grid"><div data-role="timeStatusPanel" class="compact-result"></div><div class="comparison-chart"><div class="chart-title"><b>제한시간 대비 예상 클리어 시간</b></div><div data-role="timeLegend" class="chart-legend"></div><div data-role="timeChart" class="svg-chart small"></div></div></div><div class="impact-analysis"><span>전투 영향 해석</span><p data-role="timeImpact"></p></div>`
      : kind === 'skillOther' ? `<div class="constraint-result-grid damage-trade-grid"><div data-role="skillOtherTable" class="compact-result"></div><div class="comparison-chart"><div class="chart-title"><b>누적 피해 비교</b></div><div data-role="skillOtherLegend" class="chart-legend"></div><div data-role="skillOtherCurve" class="svg-chart small"></div></div></div><div class="impact-analysis"><span>전투 영향 해석</span><p data-role="skillOtherImpact"></p></div>`
      : kind === 'ultRepeat' ? `<div class="constraint-result-grid ult-repeat-grid"><div data-role="ultRepeatTable" class="compact-result"></div><div class="comparison-chart"><div class="chart-title"><b>반복 사이클 누적 피해 비교</b></div><div data-role="ultRepeatLegend" class="chart-legend"></div><div data-role="ultRepeatCurve" class="svg-chart small"></div></div></div><div class="impact-analysis"><span>전투 영향 해석</span><p data-role="ultRepeatImpact"></p></div>`
      : kind === 'comboSpeed' ? `<div class="constraint-result-grid combo-speed-grid"><div data-role="comboSpeedTable" class="compact-result"></div><div class="comparison-chart"><div class="chart-title"><b>행동 기록 기반 누적 피해 비교</b></div><div data-role="comboSpeedLegend" class="chart-legend"></div><div data-role="comboSpeedCurve" class="svg-chart small"></div></div></div><div class="impact-analysis"><span>전투 영향 해석</span><p data-role="comboSpeedImpact"></p></div>`
      : kind === 'statusWindow' ? `<div class="constraint-result-grid status-window-grid"><div data-role="statusWindowTable" class="compact-result"></div><div class="comparison-chart"><div class="chart-title"><b>상태 시간창 누적 피해 비교</b></div><div data-role="statusWindowLegend" class="chart-legend"></div><div data-role="statusWindowCurve" class="svg-chart small"></div></div></div><div class="impact-analysis"><span>전투 영향 해석</span><p data-role="statusWindowImpact"></p></div>`
      : kind === 'statusStage' ? `<div class="constraint-result-grid status-stage-grid"><div data-role="statusStageTable" class="compact-result"></div><div class="comparison-chart"><div class="chart-title"><b>상태 단계 누적 피해 비교</b></div><div data-role="statusStageLegend" class="chart-legend"></div><div data-role="statusStageCurve" class="svg-chart small"></div></div></div><div class="impact-analysis"><span>전투 영향 해석</span><p data-role="statusStageImpact"></p></div>`
      : kind === 'statusReapply' ? `<div class="constraint-result-grid status-reapply-grid"><div data-role="statusReapplyTable" class="compact-result"></div><div class="comparison-chart"><div class="chart-title"><b>재적용 대기 누적 피해 비교</b></div><div data-role="statusReapplyLegend" class="chart-legend"></div><div data-role="statusReapplyCurve" class="svg-chart small"></div></div></div><div class="impact-analysis"><span>전투 영향 해석</span><p data-role="statusReapplyImpact"></p></div>`
      : kind === 'stageEnhance' ? `<div class="constraint-result-grid stage-enhance-grid"><div data-role="stageEnhanceTable" class="compact-result"></div><div class="comparison-chart"><div class="chart-title"><b>웨이브별 총 HP 비교</b></div><div data-role="stageEnhanceLegend" class="chart-legend"></div><div data-role="stageEnhanceChart" class="svg-chart small"></div></div></div><div class="impact-analysis"><span>전투 영향 해석</span><p data-role="stageEnhanceImpact"></p></div>`
      : kind === 'highHpCap' ? `<div class="constraint-result-grid high-hp-cap-grid"><div data-role="highHpCapTable" class="compact-result"></div><div class="comparison-chart"><div class="chart-title"><b>0.1초 피해 상한 누적 피해 비교</b></div><div data-role="highHpCapLegend" class="chart-legend"></div><div data-role="highHpCapCurve" class="svg-chart small"></div></div></div><div class="impact-analysis"><span>전투 영향 해석</span><p data-role="highHpCapImpact"></p></div>`
      : kind === 'controlRecovery' ? `<div class="constraint-result-grid control-recovery-grid"><div data-role="controlRecoveryTable" class="compact-result"></div><div class="comparison-chart"><div class="chart-title"><b>제어 유지·회피 누적 피해 비교</b></div><div data-role="controlRecoveryLegend" class="chart-legend"></div><div data-role="controlRecoveryCurve" class="svg-chart small"></div></div></div><div class="impact-analysis"><span>전투 영향 해석</span><p data-role="controlRecoveryImpact"></p></div>`
      : `<div class="constraint-result-grid combo-result-grid"><div data-role="comboOverview" class="compact-result combo-overview"></div><div class="comparison-chart combo-chart-card"><div class="chart-title combo-chart-title"><div><b>원본·조합 누적 피해 비교</b><span data-role="comboCurveContext">공격 제약 변경 시 실시간 갱신</span></div><strong data-role="comboCurveDelta" class="combo-chart-delta"></strong></div><div data-role="comboCurveLegend" class="chart-legend"></div><div data-role="comboCurve" class="svg-chart small"></div><div data-role="comboCurveMetrics" class="combo-chart-metrics"></div></div></div><div class="constraint-result-grid combo-result-grid"><div class="compact-result combo-contribution-card"><h4>조합 내 제약 영향</h4><p>현재 조합에서 해당 제약 하나를 제외했을 때 회복되는 값을 기준으로 표시합니다.</p><div data-role="comboContributions" class="combo-contributions"></div></div><div class="comparison-chart combo-chart-card"><div class="chart-title combo-chart-title"><div><b>클리어 시간·제한시간 비교</b><span data-role="comboTimeContext">선택한 모든 제약을 종합 반영</span></div><strong data-role="comboTimeDelta" class="combo-chart-delta"></strong></div><div data-role="comboTimeLegend" class="chart-legend"></div><div data-role="comboTimeChart" class="svg-chart small"></div><div data-role="comboTimeMetrics" class="combo-chart-metrics"></div></div></div><div data-role="comboInteractions" class="combo-interactions"></div><div class="impact-analysis combo-impact"><span>전투 영향 해석</span><p data-role="comboImpact"></p></div>`;
    return `<details class="constraint-party-fold" data-kind="${kind}" data-result-party="${p.id}"><summary data-role="resultBar" class="party-result-bar${combo ? ' combo-party-result' : ''}"></summary><div class="constraint-party-detail-body">${inner}</div></details>`;
  }

  function renderConstraintPartyShells() {
    ['stat', 'normal', 'hp', 'time', 'skillOther', 'ultRepeat', 'comboSpeed', 'statusWindow', 'statusStage', 'statusReapply', 'stageEnhance', 'highHpCap', 'controlRecovery', 'combo'].forEach(kind => {
      const root = $(`#${kind}PartyResults`);
      root.innerHTML = parties.map(p => resultPanelMarkup(kind, p)).join('');
    });
  }

  function panel(kind, p) { return $(`[data-kind="${kind}"][data-result-party="${p.id}"]`); }

  function resultBar(root, p, subtitle, metrics, directTarget = '') {
    const combo = root.dataset.kind === 'combo';
    const action = combo ? `<span class="result-action-cell"><span class="result-fold-action"><b class="closed-result-label">파티 결과 펼치기</b><b class="open-result-label">파티 결과 접기</b></span></span>` : '';
    const bar = $('[data-role="resultBar"]', root);
    bar.style.setProperty('--result-metric-count', metrics.length);
    bar.innerHTML = `<div class="result-party-id"><div class="result-portraits">${portraitsHtml(p)}</div><div><b>${p.name}</b><span class="result-click-hint">클릭해서 자세히 보기</span></div></div>${metrics.map(m => `<div class="result-metric"><span>${m.label}</span><b class="${m.className || ''}">${m.value}</b></div>`).join('')}${action}`;
  }



  function initFreezeReleaseConstraint() {
    const summary = $('#freezeSummaryValue');
    const label = $('#freezeReleaseTypeLabel');
    if (!summary || !label) return;
    const names = { heat: '열기', nature: '자연', electric: '전기', physical: '물리' };
    const update = key => {
      const type = names[key] || names.heat;
      label.textContent = type;
      summary.textContent = `동결 15초 · ${type} 유형 스킬로 해제`;
      $$('[data-freeze-release]').forEach(button => button.classList.toggle('active', button.dataset.freezeRelease === key));
    };
    $$('[data-freeze-release]').forEach(button => {
      button.addEventListener('click', event => {
        event.preventDefault();
        update(button.dataset.freezeRelease);
      });
    });
    update('heat');
  }

  function bindControls() {
    bindRange('statReduction', 'stat', updateStatConstraint);
    bindRange('normalReduction', 'normal', updateNormalConstraint);
    bindRange('hpIncrease', 'hp', updateHpConstraint);
    bindRange('timeReduction', 'time', updateTimeConstraint);
    bindRange('battleReduction', 'battle', updateSkillOtherConstraint);
    bindRange('otherIncrease', 'other', updateSkillOtherConstraint);
    bindRange('ultRepeatReduction', 'ult-repeat', updateUltRepeatConstraint);
    bindRange('comboCooldownReduction', 'speed-cooldown', updateComboSpeedConstraint);
    bindRange('speedBattleReduction', 'speed-battle', updateComboSpeedConstraint);
    bindRange('statusWindowDuration', 'status-duration', updateStatusWindowConstraint);
    bindRange('statusWindowReduction', 'status-reduction', updateStatusWindowConstraint);
    bindRange('statusStageDuration', 'status-stage-duration', updateStatusStageConstraint);
    bindRange('statusStageReduction', 'status-stage-reduction', updateStatusStageConstraint);
    bindRange('statusReapplyInterval', 'status-reapply', updateStatusReapplyConstraint);
    bindRange('highHpThreshold', 'high-hp-threshold', updateHighHpCapConstraint);
    bindRange('highHpCapRate', 'high-hp-cap', updateHighHpCapConstraint);
    bindRange('controlRecoveryRate', 'control-recovery', updateControlRecoveryConstraint);
    $$('[data-stage-enhance]').forEach(btn => btn.addEventListener('click', event => { event.preventDefault(); $('#stageEnhanceLevel').value = btn.getAttribute('data-stage-enhance'); updateStageEnhanceConstraint(); }));
    bindComboControls();
  }
  function bindRange(id, attr, fn) {
    $(`#${id}`).addEventListener('input', fn);
    $$(`[data-${attr}]`).forEach(btn => btn.addEventListener('click', e => { e.preventDefault(); $(`#${id}`).value = btn.getAttribute(`data-${attr}`); fn(); }));
  }
  function setPreset(attr, value) { $$(`[data-${attr}]`).forEach(b => b.classList.toggle('active', Number(b.getAttribute(`data-${attr}`)) === Number(value))); }

  function statResult(p, value) {
    const r = value / 100;
    const rows = p.order.map(id => { const c = p.charMap[id], base = 1 + .005 * c.main + .002 * c.sub, after = 1 + .005 * c.main * (1 - r) + .002 * c.sub; return { c, base, after, dpsAfter: c.dps * after / base }; });
    const originalCharacterDps = rows.reduce((s, x) => s + x.c.dps, 0) || p.dps;
    const afterCharacterDps = rows.reduce((s, x) => s + x.dpsAfter, 0);
    const ratio = afterCharacterDps / originalCharacterDps;
    return { rows, ratio, dps: p.dps * ratio, totalDamage: p.totalDamage * ratio };
  }

  function updateStatConstraint() {
    const value = Number($('#statReduction').value);
    $('#statReductionValue').value = pct(value); $('#statSummaryValue').textContent = pct(value); setPreset('stat', value);
    parties.forEach(p => {
      const root = panel('stat', p), r = statResult(p, value), drop = (1 - r.dps / p.dps) * 100, lost = p.totalDamage - r.totalDamage;
      resultBar(root, p, '주요 능력치가 적용되는 파티', [
        { label: '원본 DPS', value: num(p.dps) }, { label: '제약 적용 DPS', value: num(r.dps) }, { label: 'DPS 변화', value: `-${pct(drop)}`, className: 'negative' }, { label: '감소한 총피해', value: `-${num0(lost)}`, className: 'negative' }
      ]);
      $('[data-role="statTable"]', root).innerHTML = `<h4>캐릭터별 관련 정보</h4><div class="compact-row header"><span>오퍼레이터</span><span>주·보조</span><span>원본 배율</span><span>변경 배율</span><span>변경 DPS</span></div>${r.rows.map(x => `<div class="compact-row"><span class="char-mini"><img src="${x.c.portrait}" alt="">${x.c.name}</span><b>${x.c.mainName} ${num(x.c.main)}<br>${x.c.subName} ${num(x.c.sub)}</b><b>${x.base.toFixed(3)}×</b><b>${x.after.toFixed(3)}×</b><b>${num(x.dpsAfter)}</b></div>`).join('')}`;
      renderLegendItems($('[data-role="statLegend"]', root), [{ label: '원본', color: '#283441' }, { label: `주요 능력치 -${value}%`, color: '#d7553e' }]);
      renderCumulative($('[data-role="statCurve"]', root), [{ color: '#283441', points: p.curve }, { color: '#d7553e', points: p.curve.map(([t, v]) => [t, v * r.ratio]) }], p.duration);
      const extra = clearEstimate(p, 1, r.dps) - clearEstimate(p);
      $('[data-role="statImpact"]', root).textContent = drop < 8 ? `기존 스킬 순서와 사이클을 대부분 유지할 수 있는 수준입니다. 현재 단순 환산 모델에서는 예상 클리어 시간이 약 ${num(extra)}초 증가합니다.` : drop < 20 ? `${p.charMap[p.controller].name}을 포함한 파티 전체의 공격 배율이 낮아져 세부 페이즈 처리 시간이 증가합니다. 현재 예상 클리어 시간은 약 ${num(extra)}초 늘어납니다.` : `파티 전체의 공격 배율이 크게 낮아져 기존 로테이션만으로 동일한 페이즈를 처리하기 어려워집니다. 예상 클리어 시간은 약 ${num(extra)}초 증가합니다.`;
    });
  }

  function normalDistribution(p) {
    const events = p.events.filter(e => e.character === p.controller && e.type === 'normal' && e.damage > 0).sort((a, b) => a.time - b.time);
    const raw = events.reduce((s, e) => s + e.damage, 0) || 1, scale = p.mainNormalDamage / raw;
    let sum = 0; const points = [[0, 0]];
    events.forEach(e => { sum += e.damage * scale; points.push([e.time, sum]); });
    if (points.at(-1)[0] < p.duration) points.push([p.duration, p.mainNormalDamage]);
    return { events, points };
  }
  function valueAt(points, t) { let prev = points[0]; for (let i = 1; i < points.length; i++) { const next = points[i]; if (t <= next[0]) { if (next[0] === prev[0]) return next[1]; const q = (t - prev[0]) / (next[0] - prev[0]); return prev[1] + q * (next[1] - prev[1]); } prev = next; } return points.at(-1)[1]; }

  function updateNormalConstraint() {
    const value = Number($('#normalReduction').value), reduction = value / 100;
    $('#normalReductionValue').value = pct(value); $('#normalSummaryValue').textContent = pct(value); setPreset('normal', value);
    parties.forEach(p => {
      const root = panel('normal', p), newDamage = p.totalDamage - p.mainNormalDamage * reduction, newDps = newDamage / p.duration, drop = (1 - newDps / p.dps) * 100, nd = normalDistribution(p), controller = p.charMap[p.controller];
      resultBar(root, p, '메인 오퍼레이터 일반 공격 판정이 존재하는 파티', [
        { label: '관련 피해', value: num0(p.mainNormalDamage) }, { label: '관련 피해 비중', value: pct(p.mainNormalDamage / p.totalDamage * 100) }, { label: '제약 적용 DPS', value: num(newDps) }, { label: 'DPS 변화', value: `-${pct(drop)}`, className: 'negative' }
      ], controller.name);
      $('[data-role="normalActionCount"]', root).textContent = `관련 행동 ${nd.events.length}개`;
      const max = Math.max(...nd.events.map(e => e.damage), 1);
      const mini = $('[data-role="normalMiniTimeline"]', root); mini.className = 'mini-timeline';
      mini.innerHTML = `${timelineTicks(p.duration).ticks.map(t => `<span class="mini-tick" style="left:${t / timelineTicks(p.duration).max * 100}%">${t}</span>`).join('')}${nd.events.map(e => `<i class="mini-event" style="left:${e.time / timelineTicks(p.duration).max * 100}%;height:${10 + e.damage / max * 120}px;opacity:${.25 + .75 * (1 - reduction)}" data-label="${e.label} · ${num0(e.damage)} → ${num0(e.damage * (1 - reduction))}"></i>`).join('')}`;
      const adjusted = p.curve.map(([t, v]) => [t, Math.max(0, v - valueAt(nd.points, t) * reduction)]);
      renderLegendItems($('[data-role="normalLegend"]', root), [{ label: '원본', color: '#283441' }, { label: `일반 공격 -${value}%`, color: '#d7553e' }]);
      renderCumulative($('[data-role="normalCurve"]', root), [{ color: '#283441', points: p.curve }, { color: '#d7553e', points: adjusted }], p.duration);
      $('[data-role="normalImpact"]', root).textContent = value <= 20 ? `${controller.name}의 일반 공격 판정 피해가 소폭 낮아지지만 배틀 스킬과 연계 스킬 중심의 기존 운영은 크게 훼손되지 않습니다.` : value < 70 ? `${controller.name}의 일반 공격과 처형 공격, 궁극기 강화 일반 공격의 기여도가 낮아져 다른 피해 유형의 상대적 비중이 증가합니다.` : value < 100 ? `${controller.name}의 일반 공격 판정 피해가 크게 감소해 기존 로테이션의 효율이 낮아집니다. 배틀 스킬·연계 스킬·아츠 반응 중심으로 사이클을 재구성할 필요가 있습니다.` : `${controller.name}의 일반 공격 판정 피해가 모두 제거된 가정입니다. 기존 로테이션을 그대로 유지하기 어렵습니다.`;
    });
  }

  function renderWaveHpChart(target, multiplier) {
    const values = stage.waves.map(w => waveHp(w)), max = Math.max(...values.map(v => v * multiplier), 1), W = 720, H = 280, p = { l: 72, r: 18, t: 20, b: 35 }, group = (W - p.l - p.r) / values.length, bw = group * .28;
    let grid = '', bars = '';
    [0, .25, .5, .75, 1].forEach(v => { const y = H - p.b - v * (H - p.t - p.b); grid += `<line class="chart-grid-line" x1="${p.l}" x2="${W - p.r}" y1="${y}" y2="${y}"/><text class="chart-label" x="${p.l - 8}" y="${y + 4}" text-anchor="end">${Math.round(max * v / 1000)}k</text>`; });
    values.forEach((v, i) => { const cx = p.l + group * (i + .5), h1 = v / max * (H - p.t - p.b), h2 = v * multiplier / max * (H - p.t - p.b); bars += `<rect x="${cx - bw - 3}" y="${H - p.b - h1}" width="${bw}" height="${h1}" rx="3" fill="#283441"/><rect x="${cx + 3}" y="${H - p.b - h2}" width="${bw}" height="${h2}" rx="3" fill="#d7553e"/><text class="chart-label" x="${cx}" y="${H - 10}" text-anchor="middle">웨이브 ${i + 1}</text>`; });
    target.innerHTML = `<svg viewBox="0 0 ${W} ${H}">${grid}${bars}</svg>`;
  }

  function updateHpConstraint() {
    const value = Number($('#hpIncrease').value), mult = 1 + value / 100, baseHp = totalStageHp(), newHp = baseHp * mult;
    $('#hpIncreaseValue').value = pct(value); $('#hpSummaryValue').textContent = pct(value); setPreset('hp', value);
    parties.forEach(p => {
      const root = panel('hp', p), baseClear = clearEstimate(p), newClear = clearEstimate(p, mult), increase = newClear - baseClear;
      resultBar(root, p, '스테이지 구성 1을 사용하는 파티', [
        { label: '원본 총 HP', value: num0(baseHp) }, { label: '변경 총 HP', value: num0(newHp) }, { label: '예상 클리어 시간', value: seconds(newClear) }, { label: '예상 시간 증가', value: `+${seconds(increase)}`, className: 'negative' }
      ]);
      $('[data-role="hpWaveTable"]', root).innerHTML = `<h4>웨이브별 총 HP</h4><div class="compact-row header"><span>웨이브</span><span>원본 HP</span><span>변경 HP</span><span>증가량</span></div>${stage.waves.map(w => { const b = waveHp(w), a = b * mult; return `<div class="compact-row"><b>웨이브 ${w.wave}</b><b>${num0(b)}</b><b>${num0(a)}</b><b class="negative">+${num0(a - b)}</b></div>`; }).join('')}`;
      renderLegendItems($('[data-role="hpLegend"]', root), [{ label: '원본 HP', color: '#283441' }, { label: `최대 체력 +${value}%`, color: '#d7553e' }]);
      renderWaveHpChart($('[data-role="hpWaveChart"]', root), mult);
      $('[data-role="hpImpact"]', root).textContent = value <= 20 ? `세부 페이즈의 총 처리량이 완만하게 증가하며 ${p.name}의 예상 클리어 시간은 약 ${num(increase)}초 늘어납니다.` : value <= 60 ? `잡몹과 정예 몬스터의 처치 경계가 함께 상승해 ${p.name}의 예상 클리어 시간이 약 ${num(increase)}초 증가합니다. 실제 전투에서는 추가 공격이 필요해지는 순간 증가 폭이 더 커질 수 있습니다.` : `각 세부 페이즈가 추가 스킬 사이클을 요구하는 수준으로 체력이 증가하며 ${p.name}의 예상 클리어 시간은 약 ${num(increase)}초 늘어납니다.`;
    });
  }

  function categoryAdjustedDamage(p, type, targetTotal, ratios, predicate = null) {
    const events = p.events.filter(e => e.type === type && e.damage > 0 && (!predicate || predicate(e)));
    const raw = events.reduce((s, e) => s + e.damage, 0);
    if (!raw || !targetTotal) return 0;
    const scale = targetTotal / raw;
    return events.reduce((s, e) => s + e.damage * scale * (ratios[e.character] || 1), 0);
  }

  function otherSubtypeRows(p) {
    const groups = new Map();
    p.events.filter(e => e.type === 'special' && e.damage > 0).forEach(e => {
      const name = otherTypeName(e);
      groups.set(name, (groups.get(name) || 0) + e.damage);
    });
    const raw = [...groups.values()].reduce((s, v) => s + v, 0) || 1;
    return [...groups].map(([name, value]) => ({ name, damage: p.otherDamage * value / raw }));
  }

  function median(values) {
    const sorted = values.filter(Number.isFinite).sort((a, b) => a - b);
    if (!sorted.length) return 0;
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
  }

  function recordScale(p) {
    const raw = p.events.reduce((sum, event) => sum + Math.max(0, event.damage), 0);
    return raw > 0 ? p.totalDamage / raw : 1;
  }

  function comboUseGroups(p, characterId) {
    const groups = new Map();
    p.events.filter(event => event.character === characterId && event.type === 'combo').forEach(event => {
      const key = event.time.toFixed(3);
      const group = groups.get(key) || { time: event.time, comboRaw: 0, linkedRaw: 0, labels: [], events: [] };
      group.comboRaw += Math.max(0, event.damage);
      group.events.push(event);
      if (event.label) group.labels.push(event.label);
      groups.set(key, group);
    });
    p.events.filter(event => event.character === characterId && event.type === 'special' && event.damage > 0).forEach(event => {
      const key = event.time.toFixed(3);
      if (!groups.has(key)) return;
      const group = groups.get(key);
      group.linkedRaw += event.damage;
      if (event.label) group.labels.push(event.label);
    });
    return [...groups.values()].sort((a, b) => a.time - b.time);
  }

  function simulateComboCooldown(p, reduction, ratios = {}) {
    const opportunityTimes = [...new Set(p.events.filter(event => event.type === 'combo').map(event => event.time.toFixed(3)))].map(Number).sort((a, b) => a - b);
    const scale = recordScale(p);
    const rows = [];
    const extraEvents = [];
    let originalUses = 0;
    p.order.forEach(characterId => {
      const c = p.charMap[characterId];
      const groups = comboUseGroups(p, characterId);
      originalUses += groups.length;
      const intervals = groups.slice(1).map((group, index) => group.time - groups[index].time).filter(value => value > .5);
      const observedCooldown = median(intervals);
      const changedCooldown = observedCooldown ? Math.max(.1, observedCooldown * (1 - reduction)) : 0;
      const actualKeys = new Set(groups.map(group => group.time.toFixed(3)));
      const avgComboRaw = groups.length ? groups.reduce((sum, group) => sum + group.comboRaw, 0) / groups.length : 0;
      const avgLinkedRaw = groups.length ? groups.reduce((sum, group) => sum + group.linkedRaw, 0) / groups.length : 0;
      const sourceCounts = new Map();
      groups.flatMap(group => group.events || []).forEach(event => {
        const key = `${event.source || ''}|||${event.label || ''}|||${event.note || ''}`;
        const item = sourceCounts.get(key) || { count: 0, event };
        item.count += 1; sourceCounts.set(key, item);
      });
      const representativeEvent = [...sourceCounts.values()].sort((a, b) => b.count - a.count)[0]?.event || { type: 'combo', label: '추가 연계 스킬', source: 'Synthetic Combo' };
      const extraTimes = [];
      let lastUse = -Infinity;
      if (groups.length >= 2 && changedCooldown > 0) {
        opportunityTimes.forEach(time => {
          const key = time.toFixed(3);
          if (actualKeys.has(key)) {
            lastUse = time;
            return;
          }
          if (time <= groups[0].time || !Number.isFinite(lastUse)) return;
          if (time - lastUse + .001 < changedCooldown) return;
          const ratio = ratios[characterId] || 1;
          const damage = (avgComboRaw + avgLinkedRaw) * scale * ratio;
          extraTimes.push(time);
          extraEvents.push({ ...representativeEvent, time, character: characterId, type: 'combo', damage, comboDamage: avgComboRaw * scale * ratio, linkedDamage: avgLinkedRaw * scale * ratio, synthetic: true });
          lastUse = time;
        });
      }
      const ratio = ratios[characterId] || 1;
      rows.push({
        c,
        actualUses: groups.length,
        observedCooldown,
        changedCooldown,
        extraTimes,
        extraUses: extraTimes.length,
        averageComboDamage: avgComboRaw * scale * ratio,
        averageLinkedDamage: avgLinkedRaw * scale * ratio,
        extraDamage: extraTimes.length * (avgComboRaw + avgLinkedRaw) * scale * ratio
      });
    });
    const extraDamage = extraEvents.reduce((sum, event) => sum + event.damage, 0);
    return { rows, originalUses, extraUses: extraEvents.length, extraDamage, extraEvents, opportunityCount: opportunityTimes.length };
  }

  function ultimateRepeatSummary(p) {
    const rawUltimate = p.events.filter(event => event.type === 'ultimate' && event.damage > 0).reduce((sum, event) => sum + event.damage, 0) || 1;
    const rows = p.order.map(id => {
      const events = p.events.filter(event => event.character === id && event.type === 'ultimate' && event.damage > 0);
      const raw = events.reduce((sum, event) => sum + event.damage, 0);
      return { c: p.charMap[id], eventCount: events.length, damage: p.ultimateDamage * raw / rawUltimate };
    }).filter(row => row.eventCount > 0);
    const preservedEvents = p.events.filter(event => event.type !== 'ultimate' && event.damage > 0 && /궁극기 강화|\bUlt\b|천리|Sunder Blade Ult|Combo skill Ult/i.test(`${event.label || ''} ${event.source || ''} ${event.note || ''}`));
    const preservedDamage = preservedEvents.reduce((sum, event) => sum + event.damage, 0) * recordScale(p);
    const preservedTypes = [...new Set(preservedEvents.map(event => typeMeta[event.type]?.label || event.type))];
    return { rows, ultimateDamage: p.ultimateDamage, preservedDamage, preservedTypes, preservedEvents: preservedEvents.length };
  }

  function updateSkillOtherConstraint() {
    const battleValue = Number($('#battleReduction').value), otherValue = Number($('#otherIncrease').value);
    $('#battleReductionValue').value = pct(battleValue); $('#otherIncreaseValue').value = pct(otherValue);
    setDualSummaryText($('#skillOtherSummaryValue'), `배틀 스킬 피해 -${battleValue}%`, `기타 피해 +${otherValue}%`);
    setPreset('battle', battleValue); setPreset('other', otherValue);
    const state = { statEnabled:false, normalEnabled:false, hpEnabled:false, timeEnabled:false, skillOtherEnabled:true, comboSpeedEnabled:false, ultRepeatEnabled:false, battle:battleValue/100, other:otherValue/100, comboCooldown:0, speedBattle:0, ultRepeat:0 };
    parties.forEach(p => {
      const root = panel('skillOther', p), result = calculateCombo(p, state), deltaPct = (result.dps / p.dps - 1) * 100;
      const battleAfter = p.battleDamage * (1 - state.battle), otherAfter = p.otherDamage * (1 + state.other);
      resultBar(root, p, '', [
        { label:'배틀 스킬 피해', value:num0(p.battleDamage) },
        { label:'기타 피해', value:num0(p.otherDamage) },
        { label:'제약 적용 DPS', value:num(result.dps) },
        { label:'DPS 변화', value:`${deltaPct >= 0 ? '+' : ''}${pct(deltaPct)}`, className:deltaPct > 0 ? 'positive' : deltaPct < 0 ? 'negative' : '' }
      ]);
      const types = p.otherDamageTypes.length ? p.otherDamageTypes.join(' · ') : '해당 피해 없음';
      $('[data-role="skillOtherTable"]', root).innerHTML = `<h4>피해 유형별 변화</h4><div class="damage-type-row"><div><span>배틀 스킬 피해</span></div><b>${num0(p.battleDamage)} → ${num0(battleAfter)}</b><strong class="negative">-${num0(p.battleDamage - battleAfter)}</strong></div><div class="damage-type-row other-damage-heading"><div><span>기타 피해</span><small>${types}</small></div><b>${num0(p.otherDamage)} → ${num0(otherAfter)}</b><strong class="positive">+${num0(otherAfter - p.otherDamage)}</strong></div><div class="other-subtype-list">${otherSubtypeRows(p).map(x => `<span><b>${x.name}</b><em>${num0(x.damage)} → ${num0(x.damage * (1 + state.other))}</em></span>`).join('') || '<span><b>기타 피해 없음</b><em>변화 없음</em></span>'}</div>`;
      renderLegendItems($('[data-role="skillOtherLegend"]', root), [{label:'원본',color:'#283441'},{label:`배틀 스킬 피해 -${battleValue}% · 기타 피해 +${otherValue}%`,color:'#d7553e'}]);
      renderCumulative($('[data-role="skillOtherCurve"]', root), [{color:'#283441',points:p.curve},{color:'#d7553e',points:adjustedCurve(p,state,result)}], p.duration);
      const battleLoss = p.battleDamage * state.battle, otherGain = p.otherDamage * state.other;
      $('[data-role="skillOtherImpact"]', root).textContent = `배틀 스킬 피해는 ${num0(battleLoss)} 감소하고, ${types} 피해는 합계 ${num0(otherGain)} 증가합니다. 최종 DPS는 ${num(p.dps)}에서 ${num(result.dps)}로 ${deltaPct >= 0 ? '증가' : '감소'}합니다.`;
    });
  }

  function updateUltRepeatConstraint() {
    const value = Number($('#ultRepeatReduction').value), reduction = value / 100;
    $('#ultRepeatReductionValue').value = pct(value); $('#ultRepeatSummaryValue').textContent = pct(value); setPreset('ult-repeat', value);
    const state = { statEnabled:false, normalEnabled:false, hpEnabled:false, timeEnabled:false, skillOtherEnabled:false, comboSpeedEnabled:false, ultRepeatEnabled:true, battle:0, other:0, comboCooldown:0, speedBattle:0, ultRepeat:reduction };
    parties.forEach(p => {
      const root = panel('ultRepeat', p), result = calculateCombo(p,state), info = ultimateRepeatSummary(p), loss = p.ultimateDamage * reduction, deltaPct = (result.dps / p.dps - 1) * 100;
      resultBar(root,p,'',[
        {label:'반복 사이클 궁극기',value:num0(info.ultimateDamage)},
        {label:'강화 상태 피해 유지',value:num0(info.preservedDamage)},
        {label:'제약 적용 DPS',value:num(result.dps)},
        {label:'DPS 변화',value:deltaPct ? `${pct(deltaPct)}` : '0%',className:deltaPct < 0 ? 'negative' : ''}
      ]);
      const preservedLabel = info.preservedTypes.length ? info.preservedTypes.join(' · ') : '별도 유지 대상 없음';
      $('[data-role="ultRepeatTable"]',root).innerHTML = `<h4>반복 사이클의 실제 궁극기 판정</h4><div class="ult-repeat-list">${info.rows.map(row => `<div><span class="char-mini"><img src="${row.c.portrait}" alt="">${row.c.name}</span><b>${num0(row.damage)}</b><em>반복 사이클 감소 대상</em></div>`).join('') || '<div><span>궁극기 피해 기록 없음</span><b>0</b><em>변화 없음</em></div>'}</div><div class="damage-type-row total-repeat-row"><div><span>감소 대상 궁극기 피해</span></div><b>${num0(info.ultimateDamage)}</b><strong class="negative">-${num0(loss)}</strong></div><div class="preserved-ultimate-note"><b>감소에서 제외되는 강화 상태 피해</b><span>${preservedLabel}</span><em>${info.preservedEvents ? `${info.preservedEvents}개 행동 · 약 ${num0(info.preservedDamage)}` : '해당 기록 없음'}</em></div>`;
      const adjusted=adjustedCurve(p,state,result), unchanged=Math.abs(result.totalDamage-p.totalDamage)<.5;
      renderLegendItems($('[data-role="ultRepeatLegend"]',root), unchanged ? [{label:'원본 · 실제 궁극기 피해 없음',color:'#283441'}] : [{label:'원본 사이클',color:'#283441'},{label:`반복 사이클 궁극기 -${value}%`,color:'#7158a6'}]);
      renderCumulative($('[data-role="ultRepeatCurve"]',root), unchanged ? [{color:'#283441',points:p.curve}] : [{color:'#283441',points:p.curve},{color:'#7158a6',points:adjusted}],p.duration);
      $('[data-role="ultRepeatImpact"]',root).textContent = `첫 사이클은 원본 피해를 유지합니다. 이후 같은 행동 기록을 반복하는 사이클에서는 실제 궁극기 판정 피해 ${num0(info.ultimateDamage)}만 감소하며, 레바테인·장방이처럼 강화 상태에서 사용하는 일반 공격·배틀 스킬·연계 스킬 판정 피해는 유지됩니다. 현재 설정의 반복 사이클 피해 감소량은 ${num0(loss)}입니다.`;
    });
  }

  function updateComboSpeedConstraint() {
    const cooldownValue = Number($('#comboCooldownReduction').value), battleValue = Number($('#speedBattleReduction').value);
    $('#comboCooldownReductionValue').value = pct(cooldownValue); $('#speedBattleReductionValue').value = pct(battleValue);
    setDualSummaryText($('#comboSpeedSummaryValue'), `연계 스킬 쿨타임 -${cooldownValue}%`, `배틀 스킬 피해 -${battleValue}%`);
    setPreset('speed-cooldown', cooldownValue); setPreset('speed-battle', battleValue);
    const state = { statEnabled:false, normalEnabled:false, hpEnabled:false, timeEnabled:false, skillOtherEnabled:false, comboSpeedEnabled:true, ultRepeatEnabled:false, battle:0, other:0, comboCooldown:cooldownValue/100, speedBattle:battleValue/100, ultRepeat:0 };
    parties.forEach(p => {
      const root = panel('comboSpeed', p), result = calculateCombo(p, state), modelResult = result.comboSpeed, battleLoss = p.battleDamage * state.speedBattle, deltaPct = (result.dps / p.dps - 1) * 100;
      resultBar(root,p,'',[
        {label:'DPS 변화',value:`${deltaPct >= 0 ? '+' : ''}${pct(deltaPct)}`,className:deltaPct > 0 ? 'positive' : deltaPct < 0 ? 'negative' : ''},
        {label:'기록상 연계 사용',value:`${modelResult.originalUses}회`},
        {label:'추가 사용',value:`+${modelResult.extraUses}회`,className:modelResult.extraUses ? 'positive' : ''},
        {label:'배틀 스킬 손실',value:`-${num0(battleLoss)}`,className:'negative'},
        {label:'제약 적용 DPS',value:num(result.dps)}
      ]);
      const rows = modelResult.rows.filter(row => row.actualUses > 0).map(row => `<div class="combo-speed-row"><span class="char-mini"><img src="${row.c.portrait}" alt="">${row.c.name}</span><b>${row.actualUses}회 → ${row.actualUses + row.extraUses}회</b><em>${row.observedCooldown ? `${num(row.observedCooldown)}초 → ${num(row.changedCooldown)}초` : '사용 간격 산출 불가'}</em><small>${row.extraTimes.length ? `추가 시점 ${row.extraTimes.map(time => `${num(time)}초`).join(' · ')}` : '추가 가능한 발동 기회 없음'}</small><strong class="${row.extraDamage ? 'positive' : ''}">${row.extraDamage ? `+${num0(row.extraDamage)}` : '변화 없음'}</strong></div>`).join('');
      $('[data-role="comboSpeedTable"]',root).innerHTML = `<h4>행동 기록에서 계산한 추가 연계 스킬</h4><p class="record-model-note">파티 전체의 연계 스킬 발생 시각 ${modelResult.opportunityCount}개를 발동 기회로 보고, 각 오퍼레이터의 기록상 사용 간격이 변경 재사용시간 이상 회복된 경우에만 추가합니다.</p><div class="combo-speed-list">${rows || '<div class="combo-empty">연계 스킬 사용 기록이 없습니다.</div>'}</div><div class="damage-type-row"><div><span>추가 연계 스킬·연동 피해</span></div><b>+${num0(modelResult.extraDamage)}</b><strong class="positive">+${modelResult.extraUses}회</strong></div><div class="damage-type-row"><div><span>감소한 배틀 스킬 피해</span></div><b>${num0(p.battleDamage)} → ${num0(p.battleDamage - battleLoss)}</b><strong class="negative">-${num0(battleLoss)}</strong></div>`;
      renderLegendItems($('[data-role="comboSpeedLegend"]',root), [{label:'원본 행동 기록',color:'#283441'},{label:`연계 스킬 쿨타임 -${cooldownValue}% · 배틀 스킬 피해 -${battleValue}%`,color:'#d7553e'}]);
      renderCumulative($('[data-role="comboSpeedCurve"]',root), [{color:'#283441',points:p.curve},{color:'#d7553e',points:adjustedCurve(p,state,result)}],p.duration);
      $('[data-role="comboSpeedImpact"]',root).textContent = `배틀 스킬 피해는 ${num0(battleLoss)} 감소합니다. 행동 기록의 실제 연계 스킬 발동 기회와 오퍼레이터별 사용 간격을 다시 확인한 결과 ${modelResult.extraUses}회의 추가 사용과 약 ${num0(modelResult.extraDamage)}의 추가 피해가 계산되었습니다. 전체 기록 시간은 원본 ${num(p.duration)}초로 유지합니다.`;
    });
  }



  const statusElementMeta = {
    '물리': { key: 'physical', label: '물리 상태 · 방어 불능' },
    '열기': { key: 'heat', label: '열기 부착' },
    '전기': { key: 'electric', label: '전기 부착' },
    '냉기': { key: 'cryo', label: '냉기 부착' },
    '자연': { key: 'nature', label: '자연 부착' },
    '에테르': { key: 'ether', label: '에테르 부착' }
  };
  const artsElements = new Set(['열기', '전기', '냉기', '자연', '에테르']);
  const statusEpsilon = .0001;

  function statusEventText(event) {
    return `${event.label || ''} ${event.source || ''} ${event.note || ''}`;
  }

  function abnormalityElementFromEvent(event) {
    const text = statusEventText(event);
    if (/아츠\s*폭발|Heat\s*Burst|Cryo\s*Burst|Electric\s*Burst|Nature\s*Burst/i.test(text)) return '';
    if (/연소|Combustion|\bBurn\b/i.test(text)) return '열기';
    if (/감전|Electrification|\bShock\b/i.test(text)) return '전기';
    if (/동결|Solidification|\bFreeze\b/i.test(text)) return '냉기';
    if (/부식|Corrosion/i.test(text)) return '자연';
    return '';
  }

  function inferredDamageElement(p, event) {
    const text = statusEventText(event);
    if (event.element) return event.element;
    if (/강타|\bCrush\b|갑옷\s*파괴|\bBreach\b|Armor\s*Break/i.test(text)) return '물리';
    if (/Heat\s*Burst|연소|Combustion|\bBurn\b/i.test(text)) return '열기';
    if (/Cryo\s*Burst|동결|Solidification|\bFreeze\b/i.test(text)) return '냉기';
    if (/감전|Electrification|\bShock\b/i.test(text)) return '전기';
    if (/부식|Corrosion/i.test(text)) return '자연';

    if (event.character === 'akekuri') return event.type === 'battle' ? '열기' : '물리';
    if (event.character === 'rossi') {
      if (event.type === 'ultimate' || event.type === 'special' || (event.type === 'battle' && /Skill\s*Heat/i.test(event.source || ''))) return '열기';
      return '물리';
    }
    if (event.character === 'arclight') return event.type === 'ultimate' || event.type === 'special' ? '전기' : '물리';
    return p.charMap[event.character]?.element || '';
  }

  function statusEventProfile(p, event) {
    const text = statusEventText(event);
    const source = event.source || '';
    const profile = { damageElement: inferredDamageElement(p, event), pre: [], post: [], windowTriggers: [] };
    const addPre = (kind, payload = {}) => profile.pre.push({ kind, ...payload });
    const addPost = (kind, payload = {}) => profile.post.push({ kind, ...payload });
    const addWindow = (element, kind) => profile.windowTriggers.push({ element, kind });

    // 방어 불능: 띄우기·넘어뜨리기만 각각 1스택을 쌓고, 강타·갑옷 파괴는 전부 소모합니다.
    let physicalGain = 0;
    if (event.character === 'rossi' && event.type === 'battle') physicalGain += 1;
    if (event.character === 'rossi' && event.type === 'combo' && /Combo\s*2/i.test(source)) {
      addPre('consumeArtsAll', { reason: '로시 연계 스킬 2타' });
      physicalGain += 2; // 띄우기 1 + 정확한 연계의 방어 불능 1
    }
    if (event.character === 'gilberta' && event.type === 'combo') physicalGain += 1;
    if (event.character === 'jintianyu' && (event.type === 'battle' || event.type === 'combo')) physicalGain += 1;
    if (event.character === 'yufeng' && event.type === 'battle') physicalGain += 1;
    if (event.character === 'yufeng' && event.type === 'ultimate') physicalGain += 2;
    if (event.character === 'mive' && event.type === 'ultimate') physicalGain += 1;
    if (/쇄빙|Shatter/i.test(text)) physicalGain += 1;

    // 데이터에 효과명이 직접 들어오는 경우의 보조 판정. 이미 스킬별로 판정한 이벤트는 중복하지 않습니다.
    if (!physicalGain) {
      if (/띄우기|\bLaunch\b/i.test(text)) physicalGain += 1;
      if (/넘어뜨리기|Knockdown/i.test(text)) physicalGain += 1;
    }
    if (physicalGain) {
      addPost('addPhysical', { count: physicalGain, reason: physicalGain > 1 ? '동시 물리 이상 효과' : '띄우기·넘어뜨리기' });
      addWindow('물리', physicalGain > 1 ? '복수 물리 이상' : '물리 이상');
    }

    if (/강타|\bCrush\b/i.test(text) || (event.character === 'mive' && event.type === 'battle' && /World\s*Splitter\s*Empowered/i.test(source))) {
      addPre('consumePhysical', { reason: '강타' });
      addWindow('물리', '강타');
    }
    if (/갑옷\s*파괴|\bBreach\b|Armor\s*Break/i.test(text)) {
      addPre('consumePhysical', { reason: '갑옷 파괴' });
      addWindow('물리', '갑옷 파괴');
    }

    // 아츠 부착: 실제로 부착을 명시한 스킬만 기록합니다. 아츠 폭발과 아츠 이상은 부착이 아닙니다.
    let artsInfliction = '';
    if (event.character === 'akekuri' && event.type === 'battle') artsInfliction = '열기';
    if (event.character === 'wolfguard' && (event.type === 'combo' || (event.type === 'battle' && !/Additional/i.test(source)))) artsInfliction = '열기';
    if (event.character === 'laevatain' && event.type === 'normal' && /Ult\s*Basic\s*3/i.test(source)) artsInfliction = '열기';
    if (event.character === 'rossi' && event.type === 'ultimate' && /Ult\s*(Slash|chain)/i.test(source)) artsInfliction = '열기';
    if (event.character === 'tangtang' && ((event.type === 'battle' && /Skill\s*1\s*Sprout/i.test(source)) || (event.type === 'ultimate' && /Waterspouts?/i.test(source)))) artsInfliction = '냉기';
    if (event.character === 'gilberta' && (event.type === 'battle' || event.type === 'ultimate')) artsInfliction = '자연';
    if (event.character === 'perlica' && event.type === 'battle') artsInfliction = '전기';
    if (event.character === 'jangbangyi' && event.type === 'battle' && /Sunder\s*Blade\s*Ult/i.test(source)) artsInfliction = '전기';
    if (event.character === 'arclight' && event.type === 'ultimate') artsInfliction = '전기';
    if (event.character === 'xaihi' && event.type === 'combo') artsInfliction = '냉기';
    if ((event.character === 'camille' || event.character === 'camu') && (event.type === 'battle' || event.type === 'ultimate')) artsInfliction = '열기';
    if (!artsInfliction && !abnormalityElementFromEvent(event) && !/아츠\s*폭발|Burst/i.test(text)) {
      if (/열기\s*부착|Heat\s*Infliction/i.test(text)) artsInfliction = '열기';
      else if (/전기\s*부착|Electric\s*Infliction/i.test(text)) artsInfliction = '전기';
      else if (/냉기\s*부착|Frost\s*Infliction|Cryo\s*Infliction/i.test(text)) artsInfliction = '냉기';
      else if (/자연\s*부착|Nature\s*Infliction/i.test(text)) artsInfliction = '자연';
      else if (/에테르\s*부착|Ether\s*Infliction/i.test(text)) artsInfliction = '에테르';
    }
    if (artsInfliction) addPost('addArts', { element: artsInfliction, reason: `${artsInfliction} 부착` });

    // 스킬별 아츠 부착 소비. 소비 공격은 0.1초 잔존 효과를 거쳐 해당 공격에도 기존 단계를 적용합니다.
    if (event.character === 'yvonne' && event.type === 'special' && /Solidification|동결\s*반응/i.test(text)) addPre('consumeArtsAll', { reason: '이본 강제 동결' });
    if (event.character === 'arclight' && event.type === 'special' && /Electrification|감전\s*반응/i.test(text)) addPre('consumeArtsElement', { element: '전기', reason: '아크라이트 감전' });
    if (event.character === 'jangbangyi' && event.type === 'combo') addPost('consumeArtsElement', { element: '전기', reason: '장방이 연계 스킬' });

    // 자연 발생 아츠 이상. 이미 직전 행동에서 혼합 부착이 소비된 경우에는 같은 시각의 잔존 단계를 재사용합니다.
    if (event.character === 'gilberta' && event.type === 'special' && /Corrosion|부식/i.test(text)) addPre('artsReaction', { element: '자연', reason: '부식 아츠 이상' });
    if (event.character === 'rossi' && event.type === 'special' && /Combustion|연소.*아츠\s*반응/i.test(text)) addPre('artsReaction', { element: '열기', reason: '연소 아츠 이상' });

    // 레바테인 특성: 메인 오퍼레이터의 강력한 일격·마지막 타격·처형 뒤 열기 부착을 흡수합니다.
    if (event.character === p.controller && /Final\s*Strike|Finisher/i.test(source) && p.order.includes('laevatain')) {
      addPost('consumeArtsElement', { element: '열기', reason: '레바테인 열기 부착 흡수' });
    }

    // 상태 시간창은 실제 상태가 새로 부여되는 행동만 사용합니다. 연소 지속 피해 틱은 재부여로 세지 않습니다.
    if (event.character === 'gilberta' && event.type === 'special' && /Corrosion|부식/i.test(text)) addWindow('자연', '부식 아츠 이상');
    if (event.character === 'rossi' && event.type === 'special' && /Combustion|연소.*아츠\s*반응/i.test(text)) addWindow('열기', '연소 아츠 이상');
    if (event.character === 'yvonne' && event.type === 'special' && /Solidification|동결\s*반응/i.test(text)) addWindow('냉기', '강제 동결');
    if (event.character === 'arclight' && event.type === 'special' && /Electrification|감전\s*반응/i.test(text)) addWindow('전기', '감전 아츠 이상');
    if (event.character === 'perlica' && event.type === 'special' && /Electrification|감전\s*반응/i.test(text)) addWindow('전기', '강제 감전');
    if (event.character === 'wolfguard' && event.type === 'ultimate') addWindow('열기', '강제 연소');
    if (event.character === 'adelia' && event.type === 'combo' && !/Combo\s*Skill\s*1/i.test(source)) addWindow('자연', '강제 부식');
    if (event.character === 'perlica' && event.type === 'combo') addWindow('전기', '강제 감전');
    if (event.character === 'yvonne' && event.type === 'combo' && /Combo\s*Skill\s*Burst/i.test(source)) addWindow('냉기', '강제 동결');
    if (event.character === 'laevatain' && event.type === 'battle' && /Skill\s*Additional/i.test(source)) {
      const hasForcedBurnRecord = p.events.some(other => Math.abs(other.time - event.time) <= statusEpsilon && other.character === 'laevatain' && other.type === 'special' && /연소|\bBurn\b/i.test(statusEventText(other)));
      if (hasForcedBurnRecord) addWindow('열기', '강제 연소');
    }

    return profile;
  }

  function characterEventScales(p) {
    const rawByCharacter = Object.fromEntries(p.order.map(id => [id, 0]));
    p.events.forEach(event => { if (event.damage > 0 && rawByCharacter[event.character] !== undefined) rawByCharacter[event.character] += event.damage; });
    return Object.fromEntries(p.order.map(id => [id, rawByCharacter[id] > 0 ? p.charMap[id].damage / rawByCharacter[id] : 0]));
  }

  function combinedStatusEventRows(p, extraEvents = [], reapplication = null, finalTiming = null) {
    const rows = p.events.map((event, index) => ({ event, index, extraIndex: -1, isExtra: false, order: index }));
    extraEvents.forEach((event, extraIndex) => rows.push({ event, index: -1, extraIndex, isExtra: true, order: p.events.length + extraIndex }));
    return rows.map(row => {
      const rowKey = statusRowKey(row.index, row.extraIndex, row.isExtra);
      const scheduledTime = finalTiming?.scheduledTimeByRowKey?.get(rowKey) ?? reapplication?.scheduledTimeByRowKey?.get(rowKey);
      if (!Number.isFinite(scheduledTime) || Math.abs(scheduledTime - row.event.time) <= statusEpsilon) return row;
      return { ...row, event: { ...row.event, originalTime: row.event.time, time: scheduledTime } };
    }).sort((a, b) => a.event.time - b.event.time || a.order - b.order);
  }

  function statusRowKey(index, extraIndex, isExtra) {
    return isExtra ? `extra:${extraIndex}` : `event:${index}`;
  }


  function emptyComboChillResult(baseDuration = 0) {
    return {
      constraints: [], attempts: 0, attachedCount: 0, missedCount: 0,
      freezeCount: 0, freezeTimes: [], totalDelay: 0, finalStack: 0,
      baseDuration, appliedDuration: baseDuration, logs: [],
      perConstraint: { battle: { attempts: 0, attached: 0, missed: 0 }, combo: { attempts: 0, attached: 0, missed: 0 } },
      scheduledTimeByRowKey: new Map()
    };
  }

  function simulateComboChill(p, state, comboSpeed, statusReapply, baseDuration) {
    const constraints = [];
    if (state.battleChillEnabled) constraints.push({ key:'battle', type:'battle', threshold:state.battleChillStage === 2 ? 1 : 2, cooldown:state.battleChillCooldown });
    if (state.comboChillEnabled) constraints.push({ key:'combo', type:'combo', threshold:state.comboChillStage === 2 ? 1 : 2, cooldown:state.comboChillCooldown });
    const result = emptyComboChillResult(baseDuration);
    result.constraints = constraints;
    if (!constraints.length) return result;

    const rows = combinedStatusEventRows(p, comboSpeed?.extraEvents || [], statusReapply);
    const counters = new Map();
    const lastAttachedAt = new Map();
    let stack = 0;
    let totalDelay = 0;

    rows.forEach((row, position) => {
      const rowKey = statusRowKey(row.index, row.extraIndex, row.isExtra);
      const appliedTime = row.event.time + totalDelay;
      result.scheduledTimeByRowKey.set(rowKey, appliedTime);
      constraints.forEach(constraint => {
        if (row.event.type !== constraint.type) return;
        const counterKey = `${constraint.key}|${row.event.character}`;
        const nextCount = (counters.get(counterKey) || 0) + 1;
        if (nextCount < constraint.threshold) {
          counters.set(counterKey, nextCount);
          return;
        }
        counters.set(counterKey, 0);
        result.attempts += 1;
        result.perConstraint[constraint.key].attempts += 1;
        const lastKey = `${constraint.key}|${row.event.character}`;
        const lastTime = lastAttachedAt.has(lastKey) ? lastAttachedAt.get(lastKey) : -Infinity;
        if (appliedTime - lastTime < constraint.cooldown - statusEpsilon) {
          result.missedCount += 1;
          result.perConstraint[constraint.key].missed += 1;
          result.logs.push({ rowKey, key:constraint.key, time:appliedTime, originalTime:row.event.time, character:row.event.character, event:row.event, status:'miss', stack, delayAfter:totalDelay });
          return;
        }
        lastAttachedAt.set(lastKey, appliedTime);
        result.attachedCount += 1;
        result.perConstraint[constraint.key].attached += 1;
        stack += 1;
        let freeze = false;
        if (stack >= 4) {
          freeze = true;
          result.freezeCount += 1;
          result.freezeTimes.push(appliedTime);
          stack = 0;
          if (position < rows.length - 1) totalDelay += 5;
        }
        result.logs.push({ rowKey, key:constraint.key, time:appliedTime, originalTime:row.event.time, character:row.event.character, event:row.event, status:freeze ? 'freeze' : 'attached', stack, delayAfter:totalDelay });
      });
    });

    result.totalDelay = totalDelay;
    result.finalStack = stack;
    result.appliedDuration = baseDuration + totalDelay;
    return result;
  }

  function statusEffectKey(rowKey, phase, effectIndex) {
    return `${rowKey}:${phase}:${effectIndex}`;
  }

  function emptyStatusReapplyResult() {
    return {
      attempts: [], applied: [], delayed: [], delayedActions: [], waits: [], rows: [],
      allowedEffectCounts: new Map(), rowApplicationSuccess: new Map(),
      scheduledTimeByRowKey: new Map(), delayByRowKey: new Map(),
      suppressedEventKeys: new Set(), suppressedIndexes: new Set(), extraSuppressedIndexes: new Set(),
      affectedDamage: 0, loss: 0, totalWait: 0, maxWait: 0, maxActionDelay: 0,
      latestOriginalTime: 0, latestScheduledTime: 0, adjustedDuration: 0
    };
  }

  function reapplicationAllowedCount(info, rowKey, phase, effectIndex, fallback) {
    if (!info?.allowedEffectCounts) return fallback;
    const key = statusEffectKey(rowKey, phase, effectIndex);
    return info.allowedEffectCounts.has(key) ? info.allowedEffectCounts.get(key) : fallback;
  }

  function reapplicationEventSuppressed(info, rowKey) {
    return Boolean(info?.suppressedEventKeys?.has(rowKey));
  }

  function reapplicationWindowAllowed(info, rowKey, profile, trigger) {
    if (!info) return true;
    if (reapplicationEventSuppressed(info, rowKey)) return false;
    if (trigger.element !== '물리') return true;
    const physicalEffects = profile.post.map((effect, index) => ({ effect, index })).filter(row => row.effect.kind === 'addPhysical');
    if (!physicalEffects.length) return true;
    return physicalEffects.some(row => reapplicationAllowedCount(info, rowKey, 'post', row.index, row.effect.count || 1) > 0);
  }

  function simulateStatusReapplication(p, interval, state, ratios, extraEvents = []) {
    const result = emptyStatusReapplyResult();
    const rawRows = combinedStatusEventRows(p, extraEvents);
    const lastApplied = new Map();
    const byElement = new Map();
    const sequences = new Map();
    const offsets = new Map();
    const pointers = new Map();

    const summaryFor = element => {
      const current = byElement.get(element) || { element, attempts: 0, applied: 0, delayed: 0, delayedTimes: [], totalDelay: 0, maxDelay: 0 };
      byElement.set(element, current);
      return current;
    };

    rawRows.forEach(row => {
      const character = row.event.character || '__party__';
      const sequence = sequences.get(character) || [];
      const previous = sequence.at(-1);
      if (previous && Math.abs(previous.originalTime - row.event.time) <= statusEpsilon) previous.rows.push(row);
      else sequence.push({ character, originalTime: row.event.time, order: row.order, rows: [row], waitAdded: 0 });
      sequences.set(character, sequence);
    });
    sequences.forEach((_, character) => { offsets.set(character, 0); pointers.set(character, 0); });

    const descriptorsFor = group => {
      const descriptors = [];
      group.rows.forEach(row => {
        const profile = statusEventProfile(p, row.event);
        const rowKey = statusRowKey(row.index, row.extraIndex, row.isExtra);
        profile.post.forEach((effect, effectIndex) => {
          const effectKey = statusEffectKey(rowKey, 'post', effectIndex);
          if (effect.kind === 'addPhysical') descriptors.push({ element: '물리', count: Math.max(1, effect.count || 1), effect, effectIndex, effectKey, row, rowKey });
          if (effect.kind === 'addArts') descriptors.push({ element: effect.element, count: 1, effect, effectIndex, effectKey, row, rowKey });
        });
      });
      return descriptors;
    };

    let remaining = [...sequences.values()].reduce((sum, sequence) => sum + sequence.length, 0);
    let guard = 0;
    while (remaining > 0 && guard < 20000) {
      guard += 1;
      const candidates = [];
      sequences.forEach((sequence, character) => {
        const pointer = pointers.get(character) || 0;
        const group = sequence[pointer];
        if (!group) return;
        candidates.push({ character, group, scheduledTime: group.originalTime + (offsets.get(character) || 0) });
      });
      candidates.sort((a, b) => a.scheduledTime - b.scheduledTime || a.group.order - b.group.order);
      const candidate = candidates[0];
      if (!candidate) break;
      const { character, group } = candidate;
      const descriptors = descriptorsFor(group);
      const uniqueElements = [...new Set(descriptors.map(row => row.element))];
      let requiredTime = candidate.scheduledTime;
      uniqueElements.forEach(element => {
        const previous = lastApplied.get(element);
        if (Number.isFinite(previous)) requiredTime = Math.max(requiredTime, previous + interval);
      });
      const addedWait = Math.max(0, requiredTime - candidate.scheduledTime);
      if (addedWait > statusEpsilon) {
        offsets.set(character, (offsets.get(character) || 0) + addedWait);
        group.waitAdded += addedWait;
        result.waits.push({ character, originalTime: group.originalTime, from: candidate.scheduledTime, to: requiredTime, wait: addedWait, elements: uniqueElements });
        result.totalWait += addedWait;
        result.maxWait = Math.max(result.maxWait, addedWait);
        continue;
      }

      const scheduledTime = candidate.scheduledTime;
      const actionDelay = Math.max(0, scheduledTime - group.originalTime);
      result.maxActionDelay = Math.max(result.maxActionDelay, actionDelay);
      group.rows.forEach(row => {
        const rowKey = statusRowKey(row.index, row.extraIndex, row.isExtra);
        result.scheduledTimeByRowKey.set(rowKey, scheduledTime);
        result.delayByRowKey.set(rowKey, actionDelay);
        result.latestOriginalTime = Math.max(result.latestOriginalTime, row.event.time);
        result.latestScheduledTime = Math.max(result.latestScheduledTime, scheduledTime);
      });

      if (group.waitAdded > statusEpsilon) {
        result.delayedActions.push({
          character, originalTime: group.originalTime, scheduledTime, wait: group.waitAdded,
          events: group.rows.map(row => row.event), elements: uniqueElements
        });
      }

      descriptors.forEach(descriptor => {
        result.allowedEffectCounts.set(descriptor.effectKey, descriptor.count);
        const successKey = `${descriptor.rowKey}:${descriptor.element}`;
        result.rowApplicationSuccess.set(successKey, (result.rowApplicationSuccess.get(successKey) || 0) + descriptor.count);
        for (let ordinal = 1; ordinal <= descriptor.count; ordinal += 1) {
          const item = {
            element: descriptor.element, time: scheduledTime, originalTime: group.originalTime,
            delay: actionDelay, wait: group.waitAdded, event: descriptor.row.event,
            index: descriptor.row.index, extraIndex: descriptor.row.extraIndex, isExtra: descriptor.row.isExtra,
            kind: descriptor.effect.reason || `${descriptor.element} 부착`, ordinal, previous: lastApplied.get(descriptor.element), allowed: true
          };
          result.attempts.push(item);
          result.applied.push(item);
          const summary = summaryFor(descriptor.element);
          summary.attempts += 1;
          summary.applied += 1;
          if (actionDelay > statusEpsilon) {
            result.delayed.push(item);
            summary.delayed += 1;
            summary.totalDelay += actionDelay;
            summary.maxDelay = Math.max(summary.maxDelay, actionDelay);
            summary.delayedTimes.push({ originalTime: group.originalTime, scheduledTime, delay: actionDelay });
          }
        }
      });
      uniqueElements.forEach(element => lastApplied.set(element, scheduledTime));
      pointers.set(character, (pointers.get(character) || 0) + 1);
      remaining -= 1;
    }

    if (guard >= 20000) console.warn('상태 재적용 대기 스케줄 계산이 안전 한도에 도달했습니다.');
    const tailShift = Math.max(0, result.latestScheduledTime - result.latestOriginalTime);
    result.adjustedDuration = p.duration + tailShift;
    result.rows = [...byElement.values()].sort((a, b) => b.delayed - a.delayed || b.totalDelay - a.totalDelay || b.attempts - a.attempts);
    return result;
  }

  function mergeWindowSeconds(windows) {
    const byElement = new Map();
    windows.forEach(window => {
      const rows = byElement.get(window.element) || [];
      rows.push([window.start, window.end]);
      byElement.set(window.element, rows);
    });
    let total = 0;
    byElement.forEach(rows => {
      rows.sort((a, b) => a[0] - b[0]);
      let current = null;
      rows.forEach(row => {
        if (!current) current = row.slice();
        else if (row[0] <= current[1] + statusEpsilon) current[1] = Math.max(current[1], row[1]);
        else { total += current[1] - current[0]; current = row.slice(); }
      });
      if (current) total += current[1] - current[0];
    });
    return total;
  }

  function adjustedStatusEventDamage(p, event, index, state, ratios, scales, statusWindow = null) {
    if (event.synthetic) {
      let damage = Math.max(0, event.damage);
      if (state.statusWindowEnabled && statusWindow?.extraAffectedIndexes?.has(event.extraIndex)) damage *= 1 - state.statusReduction;
      return damage;
    }
    let ratio = ratios[event.character] || 1;
    if (state.normalEnabled && event.character === p.controller && event.type === 'normal') ratio *= 1 - state.normal;
    if (state.skillOtherEnabled && event.type === 'battle') ratio *= 1 - state.battle;
    if (state.skillOtherEnabled && event.type === 'special') ratio *= 1 + state.other;
    if (state.comboSpeedEnabled && event.type === 'battle') ratio *= 1 - state.speedBattle;
    if (state.ultRepeatEnabled && event.type === 'ultimate') ratio *= 1 - state.ultRepeat;
    if (state.statusWindowEnabled && statusWindow?.affectedIndexes?.has(index)) ratio *= 1 - state.statusReduction;
    return Math.max(0, event.damage) * (scales[event.character] || 0) * ratio;
  }

  function simulateStatusWindow(p, duration, reduction, state, ratios, extraEvents = [], reapplication = null) {
    const scales = characterEventScales(p);
    const active = new Map();
    const windows = [];
    const applications = [];
    const affected = [];
    const extraAffected = [];
    const affectedIndexes = new Set();
    const extraAffectedIndexes = new Set();
    const byElement = new Map();
    const triggerSeen = new Set();

    const summaryFor = element => {
      const current = byElement.get(element) || { element, triggers: 0, affected: 0, damage: 0, loss: 0, times: [] };
      byElement.set(element, current);
      return current;
    };

    combinedStatusEventRows(p, extraEvents, reapplication).forEach(row => {
      const { event, index, extraIndex, isExtra } = row;
      const time = event.time;
      const profile = statusEventProfile(p, event);
      const rowKey = statusRowKey(index, extraIndex, isExtra);
      const suppressed = reapplicationEventSuppressed(reapplication, rowKey);
      [...active.entries()].forEach(([element, window]) => { if (time > window.end + statusEpsilon) active.delete(element); });

      if (event.damage > 0 && !suppressed) {
        const element = profile.damageElement;
        const window = active.get(element);
        if (window && time <= window.end + statusEpsilon) {
          const damage = isExtra ? Math.max(0, event.damage) : adjustedStatusEventDamage(p, event, index, state, ratios, scales);
          const loss = damage * reduction;
          const item = { index, extraIndex, time, event, element, damage, loss };
          if (isExtra) { extraAffected.push(item); extraAffectedIndexes.add(extraIndex); }
          else { affected.push(item); affectedIndexes.add(index); }
          const summary = summaryFor(element);
          summary.affected += 1; summary.damage += damage; summary.loss += loss;
        }
      }

      profile.windowTriggers.forEach(trigger => {
        if (!reapplicationWindowAllowed(reapplication, rowKey, profile, trigger)) return;
        const dedupeKey = `${trigger.element}:${time.toFixed(3)}`;
        if (triggerSeen.has(dedupeKey)) return;
        triggerSeen.add(dedupeKey);
        const previous = active.get(trigger.element);
        const end = Math.max(previous?.end || -Infinity, time + duration);
        active.set(trigger.element, { start: time, end });
        windows.push({ element: trigger.element, start: time, end, event, kind: trigger.kind });
        applications.push({ event, index, extraIndex, element: trigger.element, kind: trigger.kind, time });
        const summary = summaryFor(trigger.element);
        summary.triggers += 1; summary.times.push(time);
      });
    });

    const affectedDamage = affected.reduce((sum, row) => sum + row.damage, 0) + extraAffected.reduce((sum, row) => sum + row.damage, 0);
    const loss = affected.reduce((sum, row) => sum + row.loss, 0) + extraAffected.reduce((sum, row) => sum + row.loss, 0);
    return { applications, windows, affected, affectedIndexes, extraAffected, extraAffectedIndexes, affectedDamage, loss, totalWindowSeconds: mergeWindowSeconds(windows), rows: [...byElement.values()].sort((a, b) => b.loss - a.loss) };
  }

  function updateStatusWindowConstraint() {
    const duration = Number($('#statusWindowDuration').value), reductionValue = Number($('#statusWindowReduction').value), reduction = reductionValue / 100;
    $('#statusWindowDurationValue').value = `${duration}초`;
    $('#statusWindowReductionValue').value = pct(reductionValue);
    setDualSummaryText($('#statusWindowSummaryValue'), `감소 지속 ${duration}초`, `속성 피해 -${reductionValue}%`);
    setPreset('status-duration', duration); setPreset('status-reduction', reductionValue);
    const state = { statEnabled:false, normalEnabled:false, hpEnabled:false, timeEnabled:false, skillOtherEnabled:false, comboSpeedEnabled:false, ultRepeatEnabled:false, statusWindowEnabled:true, battle:0, other:0, comboCooldown:0, speedBattle:0, ultRepeat:0, statusDuration:duration, statusReduction:reduction };
    parties.forEach(p => {
      const root = panel('statusWindow', p), result = calculateCombo(p, state), info = result.statusWindow, deltaPct = (result.dps / p.dps - 1) * 100;
      resultBar(root, p, '', [
        { label:'상태 기록', value:`${info.applications.length}회` },
        { label:'감소 적용 행동', value:`${info.affected.length + info.extraAffected.length}개` },
        { label:'감소한 총피해', value:`-${num0(info.loss)}`, className:info.loss ? 'negative' : '' },
        { label:'DPS 변화', value:deltaPct ? pct(deltaPct) : '0%', className:deltaPct < 0 ? 'negative' : '' },
        { label:'제약 적용 DPS', value:num(result.dps) }
      ]);
      const elementRows = info.rows.map(row => {
        const meta = statusElementMeta[row.element] || { key:'unknown', label:row.element };
        const times = row.times.length ? row.times.map(time => `${num(time)}초`).join(' · ') : '기록 없음';
        return `<div class="status-window-row"><span><i class="status-element-dot status-${meta.key}"></i><b>${meta.label}</b><small>${row.triggers}회 · ${times}</small></span><em>관련 행동 ${row.affected}개</em><strong class="negative">-${num0(row.loss)}</strong></div>`;
      }).join('');
      const affectedRows = info.affected.slice(0, 10).map(row => `<span><b>${num(row.time)}초 · ${p.charMap[row.event.character]?.name || row.event.character}</b><em>${row.event.label} · ${row.element} · ${num0(row.damage)} → ${num0(row.damage - row.loss)}</em></span>`).join('');
      $('[data-role="statusWindowTable"]', root).innerHTML = `<h4>상태 기록과 피해 감소 구간</h4><p class="record-model-note">원본 DATAFIELD 행동 순서와 피해량은 변경하지 않습니다. 실제 물리 이상 또는 아츠 이상이 발동한 행동 뒤부터 같은 속성 피해에 감소를 적용하며, 같은 시각이라도 원본 기록에서 뒤에 위치한 행동은 적용 대상이 될 수 있습니다.</p><div class="status-window-list">${elementRows || '<div class="combo-empty">행동 기록에서 물리 이상 또는 아츠 이상 발동 시점을 확인하지 못했습니다.</div>'}</div><div class="damage-type-row"><div><span>감소 구간의 원본 피해</span></div><b>${num0(info.affectedDamage)}</b><strong class="negative">-${num0(info.loss)}</strong></div><div class="status-affected-list">${affectedRows || `<span><b>감소 적용 행동 없음</b><em>${info.applications.length ? '상태 시간창 동안 대응 피해 없음' : '상태 이상 기록 없음'}</em></span>`}${info.affected.length > 10 ? `<span class="status-more"><b>외 ${info.affected.length - 10}개 행동</b><em>누적 피해 그래프에 모두 반영됨</em></span>` : ''}</div>`;
      const unchanged = info.loss < .5;
      renderLegendItems($('[data-role="statusWindowLegend"]', root), unchanged ? [{label:'원본 · 감소 적용 행동 없음',color:'#283441'}] : [{label:'원본 행동 기록',color:'#283441'},{label:`상태 후 ${duration}초 · 속성 피해 -${reductionValue}%`,color:'#d7553e'}]);
      renderCumulative($('[data-role="statusWindowCurve"]', root), unchanged ? [{color:'#283441',points:p.curve}] : [{color:'#283441',points:p.curve},{color:'#d7553e',points:adjustedCurve(p,state,result)}], p.duration);
      $('[data-role="statusWindowImpact"]', root).textContent = info.applications.length ? `원본 행동 기록에서 실제 상태 이상 발동 ${info.applications.length}회를 확인했습니다. 발동 뒤 ${duration}초 동안 대응 속성 피해 ${num0(info.affectedDamage)}가 영향을 받아 총 ${num0(info.loss)} 감소합니다.` : '현재 원본 행동 기록에는 상태 시간창을 시작할 수 있는 물리 이상 또는 아츠 이상 발동 기록이 없어 DPS가 변하지 않습니다.';
    });
  }

  function emptyStatusStageResult() {
    return { applications: [], consumptions: [], affected: [], affectedReductionByIndex: new Map(), extraAffected: [], extraReductionByIndex: new Map(), affectedDamage: 0, loss: 0, maxStage: 0, rows: [] };
  }

  function simulateStatusStages(p, duration, stageReduction, state, ratios, extraEvents = [], statusWindow = null, reapplication = null) {
    const scales = characterEventScales(p);
    const active = new Map();
    const lingering = new Map();
    const applications = [];
    const consumptions = [];
    const affected = [];
    const extraAffected = [];
    const affectedReductionByIndex = new Map();
    const extraReductionByIndex = new Map();
    const byElement = new Map();
    let maxStage = 0;

    const summaryFor = element => {
      const current = byElement.get(element) || { element, applications: 0, consumptions: 0, maxStage: 0, affected: 0, damage: 0, loss: 0, stages: [0, 0, 0, 0, 0] };
      byElement.set(element, current);
      return current;
    };
    const setLingering = (element, stack, time, reason) => {
      if (!stack) return;
      const previous = lingering.get(element);
      lingering.set(element, { stack: Math.max(previous?.stack || 0, stack), expireAt: Math.max(previous?.expireAt || -Infinity, time + .1), sourceTime: time, reason });
    };
    const expireAt = time => {
      [...active.entries()].forEach(([element, info]) => {
        if (time >= info.stateExpireAt - statusEpsilon) {
          if (time < info.effectExpireAt - statusEpsilon) {
            const previous = lingering.get(element);
            lingering.set(element, { stack: Math.max(previous?.stack || 0, info.stack), expireAt: Math.max(previous?.expireAt || -Infinity, info.effectExpireAt), sourceTime: info.stateExpireAt, reason: '자연 만료' });
          }
          active.delete(element);
        }
      });
      [...lingering.entries()].forEach(([element, info]) => { if (time >= info.expireAt - statusEpsilon) lingering.delete(element); });
    };
    const effectiveStack = element => Math.max(active.get(element)?.stack || 0, lingering.get(element)?.stack || 0);
    const recordApplication = (element, time, event, kind, stack) => {
      const item = { element, time, event, kind, stack };
      applications.push(item);
      const summary = summaryFor(element);
      summary.applications += 1; summary.maxStage = Math.max(summary.maxStage, stack);
      maxStage = Math.max(maxStage, stack);
    };
    const consumeElement = (element, time, event, reason) => {
      const before = active.get(element);
      if (!before) return false;
      setLingering(element, before.stack, time, reason);
      active.delete(element);
      consumptions.push({ element, time, event, stack: before.stack, reason });
      summaryFor(element).consumptions += 1;
      return true;
    };
    const consumeArtsAll = (time, event, reason) => {
      let consumed = false;
      [...active.keys()].filter(element => artsElements.has(element)).forEach(element => { consumed = consumeElement(element, time, event, reason) || consumed; });
      return consumed;
    };
    const addArts = (element, time, event, reason) => {
      const otherArts = [...active.keys()].filter(key => artsElements.has(key) && key !== element);
      const previous = active.get(element);
      const stack = Math.min(4, (previous?.stack || 0) + 1);
      recordApplication(element, time, event, reason, stack);
      active.set(element, { stack, stateExpireAt: time + duration, effectExpireAt: time + duration + .1, appliedAt: time });
      if (otherArts.length) consumeArtsAll(time, event, '서로 다른 아츠 부착으로 아츠 이상 발동');
    };
    const addPhysical = (count, time, event, reason) => {
      for (let i = 0; i < count; i += 1) {
        const previous = active.get('물리');
        const stack = Math.min(4, (previous?.stack || 0) + 1);
        active.set('물리', { stack, stateExpireAt: time + duration, effectExpireAt: time + duration + .1, appliedAt: time });
        recordApplication('물리', time, event, reason, stack);
      }
    };
    const applyEffect = (effect, time, event, rowKey, phase, effectIndex) => {
      if (reapplicationEventSuppressed(reapplication, rowKey)) return;
      if (effect.kind === 'consumePhysical') consumeElement('물리', time, event, effect.reason);
      if (effect.kind === 'consumeArtsAll') consumeArtsAll(time, event, effect.reason);
      if (effect.kind === 'consumeArtsElement') consumeElement(effect.element, time, event, effect.reason);
      if (effect.kind === 'addPhysical') {
        const count = reapplicationAllowedCount(reapplication, rowKey, phase, effectIndex, effect.count || 1);
        if (count > 0) addPhysical(count, time, event, effect.reason);
      }
      if (effect.kind === 'addArts') {
        const count = reapplicationAllowedCount(reapplication, rowKey, phase, effectIndex, 1);
        if (count > 0) addArts(effect.element, time, event, effect.reason);
      }
      if (effect.kind === 'artsReaction') {
        const sameTimeResidual = lingering.get(effect.element);
        if (!active.has(effect.element) && !(sameTimeResidual && Math.abs(sameTimeResidual.sourceTime - time) <= statusEpsilon)) {
          active.set(effect.element, { stack: 1, stateExpireAt: time, effectExpireAt: time + .1, appliedAt: time });
          recordApplication(effect.element, time, event, `${effect.reason}의 반응 부착`, 1);
        }
        consumeArtsAll(time, event, effect.reason);
      }
    };

    combinedStatusEventRows(p, extraEvents, reapplication).forEach(row => {
      const { event, index, extraIndex, isExtra } = row;
      const time = event.time;
      if (isExtra) event.extraIndex = extraIndex;
      expireAt(time);
      const profile = statusEventProfile(p, event);
      const rowKey = statusRowKey(index, extraIndex, isExtra);
      profile.pre.forEach((effect, effectIndex) => applyEffect(effect, time, event, rowKey, 'pre', effectIndex));

      if (event.damage > 0 && !reapplicationEventSuppressed(reapplication, rowKey)) {
        const element = profile.damageElement;
        const stack = effectiveStack(element);
        if (stack) {
          const rate = Math.min(1, stack * stageReduction);
          const damage = isExtra ? adjustedStatusEventDamage(p, { ...event, synthetic:true, extraIndex }, index, state, ratios, scales, statusWindow) : adjustedStatusEventDamage(p, event, index, state, ratios, scales, statusWindow);
          const loss = damage * rate;
          const item = { index, extraIndex, time, event, element, stack, rate, damage, loss };
          if (isExtra) { extraAffected.push(item); extraReductionByIndex.set(extraIndex, rate); }
          else { affected.push(item); affectedReductionByIndex.set(index, rate); }
          const summary = summaryFor(element);
          summary.affected += 1; summary.damage += damage; summary.loss += loss; summary.stages[stack] += damage;
        }
      }

      profile.post.forEach((effect, effectIndex) => applyEffect(effect, time, event, rowKey, 'post', effectIndex));
    });

    const affectedDamage = affected.reduce((sum, row) => sum + row.damage, 0) + extraAffected.reduce((sum, row) => sum + row.damage, 0);
    const loss = affected.reduce((sum, row) => sum + row.loss, 0) + extraAffected.reduce((sum, row) => sum + row.loss, 0);
    return { applications, consumptions, affected, affectedReductionByIndex, extraAffected, extraReductionByIndex, affectedDamage, loss, maxStage, rows: [...byElement.values()].sort((a, b) => b.loss - a.loss || b.maxStage - a.maxStage) };
  }

  function updateStatusStageConstraint() {
    const duration = Number($('#statusStageDuration').value), reductionValue = Number($('#statusStageReduction').value), reduction = reductionValue / 100;
    $('#statusStageDurationValue').value = `${duration}초`;
    $('#statusStageReductionValue').value = pct(reductionValue);
    setDualSummaryText($('#statusStageSummaryValue'), `부착 지속 ${duration}초`, `단계당 피해 -${reductionValue}%`);
    setPreset('status-stage-duration', duration); setPreset('status-stage-reduction', reductionValue);
    const state = { statEnabled:false, normalEnabled:false, hpEnabled:false, timeEnabled:false, skillOtherEnabled:false, comboSpeedEnabled:false, ultRepeatEnabled:false, statusWindowEnabled:false, statusStageEnabled:true, battle:0, other:0, comboCooldown:0, speedBattle:0, ultRepeat:0, statusDuration:0, statusReduction:0, statusStageDuration:duration, statusStageReduction:reduction };
    parties.forEach(p => {
      const root = panel('statusStage', p), result = calculateCombo(p, state), info = result.statusStage, deltaPct = (result.dps / p.dps - 1) * 100;
      resultBar(root, p, '', [
        { label:'최고 상태 단계', value:`${info.maxStage}단계` },
        { label:'상태 부착 기록', value:`${info.applications.length}회` },
        { label:'소비·초기화', value:`${info.consumptions.length}회` },
        { label:'감소한 총피해', value:`-${num0(info.loss)}`, className:info.loss ? 'negative' : '' },
        { label:'DPS 변화', value:deltaPct ? pct(deltaPct) : '0%', className:deltaPct < 0 ? 'negative' : '' },
        { label:'제약 적용 DPS', value:num(result.dps) }
      ]);
      const elementRows = info.rows.map(row => {
        const meta = statusElementMeta[row.element] || { key:'unknown', label:row.element };
        const stageText = [1,2,3,4].filter(stage => row.stages[stage] > .5).map(stage => `${stage}단계 ${num0(row.stages[stage])}`).join(' · ') || '감소 적용 피해 없음';
        return `<div class="status-stage-row"><span><i class="status-element-dot status-${meta.key}"></i><b>${meta.label}</b><small>최고 ${row.maxStage}단계 · 부착 ${row.applications}회 · 초기화 ${row.consumptions}회</small></span><em>${stageText}</em><strong class="negative">-${num0(row.loss)}</strong></div>`;
      }).join('');
      const affectedRows = info.affected.slice(0, 10).map(row => `<span><b>${num(row.time)}초 · ${p.charMap[row.event.character]?.name || row.event.character}</b><em>${row.event.label} · ${row.element} ${row.stack}단계 · -${pct(row.rate * 100)} · ${num0(row.damage)} → ${num0(row.damage - row.loss)}</em></span>`).join('');
      $('[data-role="statusStageTable"]', root).innerHTML = `<h4>상태 단계와 초기화 기록</h4><p class="record-model-note">원본 DATAFIELD 행동 타임라인과 피해량은 그대로 두고 계산용 해석만 적용합니다. 띄우기·넘어뜨리기는 효과마다 방어 불능 1스택을 쌓고, 강타·갑옷 파괴는 모든 방어 불능 스택을 소모합니다. 같은 아츠 부착은 최대 4스택까지 누적하며 아츠 폭발은 스택을 소모하지 않습니다. 서로 다른 아츠 부착으로 발생한 아츠 이상은 모든 아츠 부착을 소모합니다.</p><div class="status-stage-list">${elementRows || '<div class="combo-empty">행동 기록에서 상태 부착 단계를 구성할 수 있는 기록이 없습니다.</div>'}</div><div class="damage-type-row"><div><span>단계 감소가 적용된 원본 피해</span></div><b>${num0(info.affectedDamage)}</b><strong class="negative">-${num0(info.loss)}</strong></div><div class="status-affected-list">${affectedRows || `<span><b>감소 적용 행동 없음</b><em>${info.applications.length ? '활성 단계 동안 대응 피해 없음' : '상태 부착 기록 없음'}</em></span>`}${info.affected.length > 10 ? `<span class="status-more"><b>외 ${info.affected.length - 10}개 행동</b><em>누적 피해 그래프에 모두 반영됨</em></span>` : ''}</div>`;
      const unchanged = info.loss < .5;
      renderLegendItems($('[data-role="statusStageLegend"]', root), unchanged ? [{label:'원본 · 단계 감소 적용 없음',color:'#283441'}] : [{label:'원본 행동 기록',color:'#283441'},{label:`단계당 대응 피해 -${reductionValue}%`,color:'#d7553e'}]);
      renderCumulative($('[data-role="statusStageCurve"]', root), unchanged ? [{color:'#283441',points:p.curve}] : [{color:'#283441',points:p.curve},{color:'#d7553e',points:adjustedCurve(p,state,result)}], p.duration);
      $('[data-role="statusStageImpact"]', root).textContent = !info.applications.length
        ? '현재 원본 행동 기록에는 상태 단계를 구성할 수 있는 실제 부착 기록이 없어 DPS가 변하지 않습니다.'
        : info.affectedDamage < .5
          ? `상태 부착 ${info.applications.length}회는 확인했지만, 활성 단계와 종료 후 0.1초 잔존 구간 동안 대응 피해가 없어 DPS가 변하지 않습니다.`
          : `원본 행동 기록에서 실제 상태 부착 ${info.applications.length}회와 소비·초기화 ${info.consumptions.length}회를 확인했습니다. 공격 시점의 대응 상태 단계에 따라 총 ${num0(info.affectedDamage)}의 원본 피해가 영향을 받아 ${num0(info.loss)} 감소합니다.`;
    });
  }

  function updateStatusReapplyConstraint() {
    const interval = Number($('#statusReapplyInterval').value);
    $('#statusReapplyIntervalValue').value = `${interval}초`;
    $('#statusReapplySummaryValue').textContent = `재적용 제한 ${interval}초`;
    setPreset('status-reapply', interval);
    const state = {
      statEnabled:false, normalEnabled:false, hpEnabled:false, timeEnabled:false,
      skillOtherEnabled:false, comboSpeedEnabled:false, ultRepeatEnabled:false,
      statusWindowEnabled:false, statusStageEnabled:false, statusReapplyEnabled:true,
      stageEnhanceEnabled:false, battle:0, other:0, comboCooldown:0, speedBattle:0,
      ultRepeat:0, statusDuration:0, statusReduction:0, statusStageDuration:10,
      statusStageReduction:0, statusReapplyInterval:interval, stageEnhanceLevel:0
    };
    parties.forEach(party => {
      const root = panel('statusReapply', party);
      const result = calculateCombo(party, state);
      const info = result.statusReapply;
      const deltaPct = (result.dps / party.dps - 1) * 100;
      resultBar(root, party, '', [
        { label:'상태 부여 예정', value:`${info.attempts.length}회` },
        { label:'대기 발생', value:`${info.delayedActions.length}회`, className:info.delayedActions.length ? 'negative' : '' },
        { label:'누적 대기시간', value:seconds(info.totalWait), className:info.totalWait ? 'negative' : '' },
        { label:'제약 적용 시간', value:seconds(result.duration) },
        { label:'DPS 변화', value:deltaPct ? pct(deltaPct) : '0%', className:deltaPct < 0 ? 'negative' : '' },
        { label:'제약 적용 DPS', value:num(result.dps) }
      ]);
      const rows = info.rows.map(row => {
        const meta = statusElementMeta[row.element] || { key:'unknown', label:row.element };
        const delayedTimes = row.delayedTimes.length
          ? row.delayedTimes.slice(0, 5).map(item => `${num(item.originalTime)}→${num(item.scheduledTime)}초`).join(' · ')
          : '원본 예정 시각에 정상 사용';
        const more = row.delayedTimes.length > 5 ? ` · 외 ${row.delayedTimes.length - 5}회` : '';
        return `<div class="status-reapply-row"><span><i class="status-element-dot status-${meta.key}"></i><b>${meta.label}</b><small>${delayedTimes}${more}</small></span><em>부여 ${row.applied}회 · 대기 ${row.delayed}회</em><strong class="${row.delayed ? 'negative' : ''}">${row.delayed ? `최대 +${num(row.maxDelay)}초` : '지연 없음'}</strong></div>`;
      }).join('');
      const delayed = info.delayedActions.slice(0, 10).map(row => {
        const characterName = party.charMap[row.character]?.name || row.character;
        const labels = [...new Set(row.events.map(event => event.label))].join(' · ');
        return `<span><b>${num(row.originalTime)}초 → ${num(row.scheduledTime)}초 · ${characterName}</b><em>${labels} · 재적용 가능 시점까지 ${num(row.wait)}초 대기</em></span>`;
      }).join('');
      $('[data-role="statusReapplyTable"]', root).innerHTML = `<h4>재적용 대기 판정</h4><p class="record-model-note">DATAFIELD 원본 행동과 피해량은 변경하지 않고 별도의 계산용 타임라인을 만듭니다. 방어불능 또는 같은 유형의 아츠부착을 다시 사용할 수 없는 경우 해당 오퍼레이터가 재적용 가능 시점까지 기다린 뒤 스킬을 사용하며, 같은 오퍼레이터의 이후 행동도 누적 대기시간만큼 함께 이동합니다. 다른 오퍼레이터의 행동은 독립적으로 진행합니다.</p><div class="status-reapply-list">${rows || '<div class="combo-empty">행동 기록에서 방어불능 또는 아츠부착 시도를 확인하지 못했습니다.</div>'}</div><div class="damage-type-row"><div><span>원본 피해량 유지 · 계산용 행동 시간 연장</span></div><b>${info.delayedActions.length}개 행동 묶음</b><strong class="${info.totalWait ? 'negative' : ''}">+${num(info.totalWait)}초 대기</strong></div><div class="status-affected-list">${delayed || `<span><b>대기 발생 없음</b><em>${info.attempts.length ? `모든 상태 부여가 ${interval}초 간격을 충족함` : '재적용 제한을 판정할 상태 부여 기록 없음'}</em></span>`}${info.delayedActions.length > 10 ? `<span class="status-more"><b>외 ${info.delayedActions.length - 10}개 행동 묶음</b><em>누적 피해 그래프와 제약 적용 시간에 모두 반영됨</em></span>` : ''}</div>`;
      const unchanged = info.delayedActions.length === 0 && Math.abs(result.duration - party.duration) <= statusEpsilon;
      const originalCurve = extendedCurve(party.curve, result.duration, party.totalDamage);
      renderLegendItems($('[data-role="statusReapplyLegend"]', root), unchanged
        ? [{label:'원본 · 추가 대기 없음',color:'#283441'}]
        : [{label:`원본 행동 기록 · ${num(party.duration)}초`,color:'#283441'},{label:`재적용 대기 적용 · ${num(result.duration)}초`,color:'#d7553e'}]);
      renderCumulative($('[data-role="statusReapplyCurve"]', root), unchanged
        ? [{color:'#283441',points:party.curve}]
        : [{color:'#283441',points:originalCurve},{color:'#d7553e',points:adjustedCurve(party,state,result)}], result.duration);
      $('[data-role="statusReapplyImpact"]', root).textContent = !info.attempts.length
        ? '현재 원본 행동 기록에는 재적용 제한을 판정할 수 있는 방어불능 또는 아츠부착 시도가 없습니다.'
        : !info.delayedActions.length
          ? `모든 상태 부여가 ${interval}초 간격을 충족해 원본 행동 시간과 DPS가 유지됩니다.`
          : `재적용 가능 시점까지 기다리는 행동 묶음이 ${info.delayedActions.length}회 발생했습니다. 원본 총피해는 유지되지만 계산용 전투시간이 ${num(party.duration)}초에서 ${num(result.duration)}초로 늘어나 DPS가 ${num(party.dps)}에서 ${num(result.dps)}로 변경됩니다.`;
    });
  }

  function stageEnhancementInfo(level) {
    const normalized = Number(level) >= 2 ? 2 : 1;
    const targets = [];
    stage.waves.forEach(wave => wave.phases.forEach(phase => phase.monsters.forEach(monster => {
      const wave4Target = wave.wave === 4 && (monster.monsterKey === 'heavySting' || monster.monsterKey === 'heavyRam');
      const wave3Target = normalized >= 2 && wave.wave === 3 && monster.monsterKey === 'heavyRam';
      if (!wave4Target && !wave3Target) return;
      const alphaKey = monster.monsterKey === 'heavyRam' ? 'heavyRamAlpha' : 'heavyStingAlpha';
      const alpha = monsters[alphaKey];
      targets.push({
        wave: wave.wave, phase: phase.order, monster, alpha,
        beforeHp: monster.hp, afterHp: alpha?.hp ?? monster.hp * 1.5, deltaHp: (alpha?.hp ?? monster.hp * 1.5) - monster.hp
      });
    })));
    const deltaHp = targets.reduce((sum, row) => sum + row.deltaHp, 0);
    const baseHp = totalStageHp();
    const waveRows = stage.waves.map(wave => {
      const before = waveHp(wave);
      const delta = targets.filter(row => row.wave === wave.wave).reduce((sum, row) => sum + row.deltaHp, 0);
      return { wave: wave.wave, before, after: before + delta, delta };
    });
    return { level: normalized, targets, deltaHp, baseHp, totalHp: baseHp + deltaHp, waveRows };
  }

  function renderStageEnhanceChart(target, info) {
    const values = info.waveRows;
    const max = Math.max(...values.map(row => row.after), 1);
    const W = 720, H = 280, pad = { l:72, r:18, t:20, b:35 }, group = (W - pad.l - pad.r) / values.length, bw = group * .28;
    let grid = '', bars = '';
    [0,.25,.5,.75,1].forEach(value => {
      const y = H - pad.b - value * (H - pad.t - pad.b);
      grid += `<line class="chart-grid-line" x1="${pad.l}" x2="${W-pad.r}" y1="${y}" y2="${y}"/><text class="chart-label" x="${pad.l-8}" y="${y+4}" text-anchor="end">${Math.round(max*value/1000)}k</text>`;
    });
    values.forEach((row,index) => {
      const cx = pad.l + group * (index + .5), h1 = row.before/max*(H-pad.t-pad.b), h2 = row.after/max*(H-pad.t-pad.b);
      bars += `<rect x="${cx-bw-3}" y="${H-pad.b-h1}" width="${bw}" height="${h1}" rx="3" fill="#283441"/><rect x="${cx+3}" y="${H-pad.b-h2}" width="${bw}" height="${h2}" rx="3" fill="#d7553e"/><text class="chart-label" x="${cx}" y="${H-10}" text-anchor="middle">웨이브 ${row.wave}</text>`;
    });
    target.innerHTML = `<svg viewBox="0 0 ${W} ${H}">${grid}${bars}</svg>`;
  }

  function updateStageEnhanceConstraint() {
    const level = Number($('#stageEnhanceLevel').value) >= 2 ? 2 : 1;
    const info = stageEnhancementInfo(level);
    $('#stageEnhanceLevelValue').value = `강화 [${level}]`;
    $('#stageEnhanceSummaryValue').textContent = `강화 [${level}]`;
    setPreset('stage-enhance', level);
    parties.forEach(party => {
      const root = panel('stageEnhance', party);
      const baseClear = clearEstimateWithWaveRows(party, info.waveRows.map(row => ({ wave: row.wave, hp: row.before })));
      const changedClear = clearEstimateWithWaveRows(party, info.waveRows.map(row => ({ wave: row.wave, hp: row.after })));
      const extra = changedClear - baseClear;
      resultBar(root, party, '', [
        { label:'강화 단계', value:`강화 [${level}]` },
        { label:'강화 대상', value:`${info.targets.length}마리` },
        { label:'추가 몬스터 HP', value:`+${num0(info.deltaHp)}`, className:'negative' },
        { label:'변경 총 HP', value:num0(info.totalHp) },
        { label:'예상 시간 증가', value:`+${seconds(extra)}`, className:'negative' },
        { label:'제약 적용 DPS', value:num(party.dps) }
      ]);
      const targetRows = info.targets.map(row => `<div class="stage-enhance-target"><span><img src="${row.alpha?.icon || row.monster.icon}" alt=""><b>웨이브 ${row.wave} · ${row.monster.name}</b><small>${row.alpha?.name || `${row.monster.name} · α`}로 표시</small></span><em>${num0(row.beforeHp)} → ${num0(row.afterHp)}</em><strong class="negative">+${num0(row.deltaHp)}</strong></div>`).join('');
      const waveRows = info.waveRows.map(row => `<div class="compact-row"><b>웨이브 ${row.wave}</b><b>${num0(row.before)}</b><b>${num0(row.after)}</b><b class="${row.delta ? 'negative' : ''}">${row.delta ? `+${num0(row.delta)}` : '변화 없음'}</b></div>`).join('');
      $('[data-role="stageEnhanceTable"]', root).innerHTML = `<h4>알파 개체 전환 대상</h4><p class="record-model-note">구성 1 · 기준 구성의 현재 몬스터 체력을 원본으로 유지하고, 선택 단계의 지정 개체를 스테이지 구성 페이지와 동일한 α 개체 체력으로 교체합니다. DATAFIELD 파티 행동과 원본 DPS는 변경하지 않습니다.</p><div class="stage-enhance-target-list">${targetRows}</div><h4>웨이브별 총 HP</h4><div class="compact-row header"><span>웨이브</span><span>원본 HP</span><span>변경 HP</span><span>증가량</span></div>${waveRows}`;
      renderLegendItems($('[data-role="stageEnhanceLegend"]', root), [{label:'기준 구성 HP',color:'#283441'},{label:`강화 [${level}] 적용 HP`,color:'#d7553e'}]);
      renderStageEnhanceChart($('[data-role="stageEnhanceChart"]', root), info);
      $('[data-role="stageEnhanceImpact"]', root).textContent = `강화 [${level}]은 지정된 ${info.targets.length}마리의 현재 체력을 스테이지 구성 페이지의 α 개체 체력으로 교체해 스테이지 총 HP를 ${num0(info.baseHp)}에서 ${num0(info.totalHp)}로 높입니다. 파티 DPS는 ${num(party.dps)}로 유지되며 예상 클리어 시간은 약 ${num(extra)}초 증가합니다.`;
    });
  }


  function emptyHighHpCapResult(totalDamage = 0) {
    return { threshold:0, capRate:0, targets:[], targetCount:0, eligibleHp:0, highHpShare:0, cappedBucketCount:0, bucketCount:0, originalDamage:totalDamage, appliedDamage:totalDamage, loss:0, curve:[[0,0]], buckets:[], appliedBuckets:[], bucketRatioByBucket:new Map() };
  }

  function highHpCapEventBuckets(p, state, context, totalDamage) {
    const rows = [];
    const reapply = context.statusReapply;
    const eventTime = eventIndex => context.chill?.scheduledTimeByRowKey?.get(statusRowKey(eventIndex, -1, false))
      ?? (state.statusReapplyEnabled ? (reapply?.scheduledTimeByRowKey?.get(statusRowKey(eventIndex, -1, false)) ?? p.events[eventIndex].time) : p.events[eventIndex].time);
    const extraTime = (event, extraIndex) => context.chill?.scheduledTimeByRowKey?.get(statusRowKey(-1, extraIndex, true))
      ?? (state.statusReapplyEnabled ? (reapply?.scheduledTimeByRowKey?.get(statusRowKey(-1, extraIndex, true)) ?? event.time) : event.time);
    p.events.forEach((event, index) => {
      if (!(event.damage > 0)) return;
      let ratio = state.statEnabled ? context.ratios[event.character] || 1 : 1;
      if (state.normalEnabled && event.character === p.controller && event.type === 'normal') ratio *= 1 - state.normal;
      if (state.skillOtherEnabled && event.type === 'battle') ratio *= 1 - state.battle;
      if (state.skillOtherEnabled && event.type === 'special') ratio *= 1 + state.other;
      if (state.comboSpeedEnabled && event.type === 'battle') ratio *= 1 - state.speedBattle;
      if (state.ultRepeatEnabled && event.type === 'ultimate') ratio *= 1 - state.ultRepeat;
      if (state.statusWindowEnabled && context.statusWindow?.affectedIndexes?.has(index)) ratio *= 1 - state.statusReduction;
      if (state.statusStageEnabled && context.statusStage?.affectedReductionByIndex?.has(index)) ratio *= 1 - context.statusStage.affectedReductionByIndex.get(index);
      rows.push({ time:eventTime(index), damage:Math.max(0,event.damage * ratio) });
    });
    (context.comboSpeed?.extraEvents || []).forEach((event, extraIndex) => {
      let ratio = state.statusWindowEnabled && context.statusWindow?.extraAffectedIndexes?.has(extraIndex) ? 1 - state.statusReduction : 1;
      if (state.statusStageEnabled && context.statusStage?.extraReductionByIndex?.has(extraIndex)) ratio *= 1 - context.statusStage.extraReductionByIndex.get(extraIndex);
      rows.push({ time:extraTime(event, extraIndex), damage:Math.max(0,event.damage * ratio) });
    });
    const raw = rows.reduce((sum,row) => sum + row.damage, 0);
    const correction = raw > 0 ? totalDamage / raw : 0;
    const byBucket = new Map();
    rows.forEach(row => {
      const bucket = Math.max(0, Math.floor((row.time + 1e-7) * 10));
      byBucket.set(bucket, (byBucket.get(bucket) || 0) + row.damage * correction);
    });
    return [...byBucket.entries()].sort((a,b) => a[0]-b[0]).map(([bucket,damage]) => ({ bucket, time:(bucket + 1) / 10, damage }));
  }

  function highHpCapTargets(threshold, enhancement, hpMult) {
    const enhancedHpByUid = new Map((enhancement?.targets || []).map(row => [row.monster.uid, row.afterHp]));
    const rows = [];
    stage.waves.forEach(wave => wave.phases.forEach(phase => phase.monsters.forEach(monster => {
      const appliedHp = (enhancedHpByUid.get(monster.uid) ?? monster.hp) * hpMult;
      if (appliedHp < threshold) return;
      rows.push({ wave:wave.wave, phase:phase.order, monster, baseHp:monster.hp, hp:appliedHp });
    })));
    return rows;
  }

  function simulateHighHpDamageCap(p, threshold, capRate, state, context, totalDamage, enhancement, hpMult, stageHp) {
    const result = emptyHighHpCapResult(totalDamage);
    result.threshold = threshold;
    result.capRate = capRate;
    const targets = highHpCapTargets(threshold, enhancement, hpMult);
    result.targets = targets;
    result.targetCount = targets.length;
    result.eligibleHp = targets.reduce((sum,row) => sum + row.hp, 0);
    result.highHpShare = stageHp > 0 ? Math.min(1, result.eligibleHp / stageHp) : 0;
    const buckets = highHpCapEventBuckets(p, state, context, totalDamage);
    result.buckets = buckets;
    result.bucketCount = buckets.length;
    if (!targets.length || !buckets.length || !(totalDamage > 0)) {
      result.curve = extendedCurve([[0,0]], context.duration || p.duration, totalDamage);
      return result;
    }
    targets.forEach(target => {
      const cap = target.hp * capRate;
      const applied = buckets.reduce((sum,row) => sum + Math.min(row.damage, cap), 0);
      target.cap = cap;
      target.applied = applied;
      target.loss = Math.max(0, totalDamage - applied);
      target.ratio = totalDamage > 0 ? applied / totalDamage : 1;
      target.capHits = buckets.filter(row => row.damage > cap + .5).length;
    });
    const eligibleHp = Math.max(result.eligibleHp, 1);
    let cumulative = 0;
    const curve = [[0,0]];
    const cappedBucketSet = new Set();
    buckets.forEach(bucket => {
      let weightedRatio = 0;
      targets.forEach(target => {
        const ratio = bucket.damage > 0 ? Math.min(1, target.cap / bucket.damage) : 1;
        weightedRatio += target.hp / eligibleHp * ratio;
        if (bucket.damage > target.cap + .5) cappedBucketSet.add(bucket.bucket);
      });
      const blendedRatio = (1 - result.highHpShare) + result.highHpShare * weightedRatio;
      const applied = bucket.damage * blendedRatio;
      result.appliedBuckets.push({ ...bucket, ratio: blendedRatio, applied });
      result.bucketRatioByBucket.set(bucket.bucket, blendedRatio);
      cumulative += applied;
      curve.push([bucket.time, cumulative]);
    });
    result.cappedBucketCount = cappedBucketSet.size;
    result.appliedDamage = cumulative;
    result.loss = Math.max(0, totalDamage - cumulative);
    result.curve = extendedCurve(curve, context.duration || p.duration, cumulative);
    return result;
  }

  function updateHighHpCapConstraint() {
    const threshold = Number($('#highHpThreshold').value), capDisplay = Number($('#highHpCapRate').value), capRate = capDisplay / 100;
    $('#highHpThresholdValue').value = num0(threshold);
    $('#highHpCapRateValue').value = `최대 HP의 ${capDisplay}%`;
    setDualSummaryText($('#highHpCapSummaryValue'), `적용 HP ${num0(threshold)} 이상`, `0.1초 상한 ${capDisplay}%`);
    setPreset('high-hp-threshold', threshold); setPreset('high-hp-cap', capDisplay);
    const state = { statEnabled:false, normalEnabled:false, hpEnabled:false, timeEnabled:false, skillOtherEnabled:false, comboSpeedEnabled:false, ultRepeatEnabled:false, statusWindowEnabled:false, statusStageEnabled:false, statusReapplyEnabled:false, stageEnhanceEnabled:false, highHpCapEnabled:true, battle:0, other:0, comboCooldown:0, speedBattle:0, ultRepeat:0, highHpThreshold:threshold, highHpCapRate:capRate };
    parties.forEach(party => {
      const root = panel('highHpCap', party), result = calculateCombo(party, state), info = result.highHpCap, deltaPct = (result.dps / party.dps - 1) * 100;
      resultBar(root, party, '', [
        { label:'적용 몬스터', value:`${info.targetCount}마리` },
        { label:'상한 발생 구간', value:`${info.cappedBucketCount}개` },
        { label:'감소한 총피해', value:`-${num0(info.loss)}`, className:info.loss ? 'negative' : '' },
        { label:'DPS 변화', value:deltaPct ? pct(deltaPct) : '0%', className:deltaPct < 0 ? 'negative' : '' },
        { label:'제약 적용 DPS', value:num(result.dps) }
      ]);
      const targetRows = info.targets.map(row => `<div class="high-hp-target-row"><span><img src="${row.monster.icon}" alt=""><b>웨이브 ${row.wave} · ${row.monster.name}</b><small>현재 HP ${num0(row.hp)} · 0.1초 상한 ${num0(row.cap)}</small></span><em>상한 ${row.capHits}구간</em><strong class="${row.loss ? 'negative' : ''}">-${num0(row.loss)}</strong></div>`).join('');
      $('[data-role="highHpCapTable"]', root).innerHTML = `<h4>고체력 몬스터별 상한 시뮬레이션</h4><p class="record-model-note">DATAFIELD에 공격 대상 ID가 없으므로, 기준 체력 ${num0(threshold)} 이상인 각 몬스터에게 동일한 원본 행동 기록을 적용한 뒤 몬스터 체력 비중으로 결과를 합산합니다. 일반 몬스터 체력 비중은 원본 피해를 유지합니다.</p><div class="high-hp-target-list">${targetRows || '<div class="combo-empty">현재 체력 기준에 해당하는 몬스터가 없습니다.</div>'}</div><div class="damage-type-row"><div><span>고체력 몬스터 체력 비중</span></div><b>${pct(info.highHpShare * 100)}</b><strong>${info.targetCount}마리</strong></div><div class="damage-type-row"><div><span>원본 총피해 → 상한 적용 총피해</span></div><b>${num0(party.totalDamage)} → ${num0(info.appliedDamage)}</b><strong class="${info.loss ? 'negative' : ''}">-${num0(info.loss)}</strong></div>`;
      renderLegendItems($('[data-role="highHpCapLegend"]', root), [{label:'원본 누적 피해',color:'#283441'},{label:`고체력 적 0.1초 상한 ${capDisplay}%`,color:'#d7553e'}]);
      renderCumulative($('[data-role="highHpCapCurve"]', root), [{color:'#283441',points:party.curve},{color:'#d7553e',points:info.curve}], party.duration);
      $('[data-role="highHpCapImpact"]', root).textContent = info.loss ? `기준 HP ${num0(threshold)} 이상인 ${info.targetCount}마리에게 0.1초당 최대 HP의 ${capDisplay}% 상한을 적용하면, 고체력 몬스터의 스테이지 체력 비중을 반영한 파티 DPS가 ${num(party.dps)}에서 ${num(result.dps)}로 감소합니다.` : `현재 설정에서는 0.1초 피해가 각 대상의 상한을 넘지 않아 파티 DPS 변화가 없습니다.`;
    });
  }

  function emptyControlRecoveryResult(totalDamage = 0) {
    return {
      rate: 0, intervals: [], ticks: [], controlActions: [], controlActionCount: 0,
      representativeHp: 0, perTickPotential: 0, potentialRecovery: 0, actualRecovery: 0,
      maintainDamage: totalDamage, avoidDamage: totalDamage, appliedDamage: totalDamage,
      removedDamage: 0, selectedBehavior: 'maintain', selectedLabel: '제어 유지',
      maintainCurve: [[0, 0]], avoidCurve: [[0, 0]], targetRows: [], limitations: []
    };
  }

  function effectiveStageMonsterRows(enhancement, hpMult = 1) {
    const enhancedHpByUid = new Map((enhancement?.targets || []).map(row => [row.monster.uid, row.afterHp]));
    return stage.waves.flatMap(wave => wave.phases.flatMap(phase => phase.monsters.map(monster => ({
      wave: wave.wave,
      phase: phase.order,
      monster,
      hp: (enhancedHpByUid.get(monster.uid) ?? monster.hp) * hpMult
    }))));
  }

  function controlInstantTag(event) {
    const text = statusEventText(event);
    const source = event.source || '';
    if (event.character === 'rossi' && event.type === 'battle') return '띄우기';
    if (event.character === 'rossi' && event.type === 'combo' && /Combo\s*2/i.test(source)) return '띄우기';
    if (event.character === 'gilberta' && event.type === 'combo') return '끌어당김·강제 띄우기';
    if (event.character === 'jintianyu' && (event.type === 'battle' || event.type === 'combo')) return '물리 제어';
    if (event.character === 'yufeng' && (event.type === 'battle' || event.type === 'ultimate')) return '물리 제어';
    if (event.character === 'mive' && event.type === 'ultimate') return '넘어뜨리기';
    if (event.character === 'yvonne' && event.type === 'special' && /Solidification|동결\s*반응/i.test(text)) return '강제 동결';
    if (/띄우기|\bLaunch\b/i.test(text)) return '띄우기';
    if (/넘어뜨리기|Knockdown/i.test(text)) return '넘어뜨리기';
    if (/강제\s*동결|Solidification|\bFreeze\b/i.test(text)) return '강제 동결';
    if (/끌어당김|이동\s*불가|속박|Bind|Immobil/i.test(text)) return '이동 제한';
    return '';
  }

  function controlTimelineRows(p, extraEvents = [], reapplication = null, finalTiming = null) {
    return combinedStatusEventRows(p, extraEvents, reapplication, finalTiming).map(row => ({ ...row, rowKey: statusRowKey(row.index, row.extraIndex, row.isExtra) }));
  }

  function buildControlIntervals(p, extraEvents = [], reapplication = null, finalTiming = null) {
    const rows = controlTimelineRows(p, extraEvents, reapplication, finalTiming);
    const intervals = [];
    const avoidKeys = new Set();
    const actionRows = [];
    const used = new Set();
    const markCharacterTime = (character, time, reason) => {
      rows.forEach(row => {
        if (row.event.character === character && Math.abs(row.event.time - time) <= statusEpsilon) {
          avoidKeys.add(row.rowKey);
          actionRows.push({ rowKey: row.rowKey, event: row.event, time, reason });
        }
      });
    };
    const addInterval = (start, end, tag, sourceRows = []) => {
      if (!Number.isFinite(start) || !Number.isFinite(end)) return;
      const normalizedStart = Math.max(0, Math.min(start, end));
      const normalizedEnd = Math.max(normalizedStart, end);
      intervals.push({ start: normalizedStart, end: normalizedEnd, tags: [tag], sources: sourceRows });
    };

    // 이본 연계 스킬: 끌어당김·지속 제어 시작부터 종료 폭발의 강제 동결까지 하나의 구간으로 봅니다.
    const yvonneStarts = rows.filter(row => row.event.character === 'yvonne' && row.event.type === 'combo' && /Combo\s*Skill\s*Dps/i.test(row.event.source || ''));
    const yvonneEnds = rows.filter(row => row.event.character === 'yvonne' && row.event.type === 'combo' && /Combo\s*Skill\s*Burst/i.test(row.event.source || ''));
    yvonneStarts.forEach(startRow => {
      const endRow = yvonneEnds.find(row => !used.has(row.rowKey) && row.event.time >= startRow.event.time - statusEpsilon);
      const end = endRow ? endRow.event.time : startRow.event.time;
      if (endRow) used.add(endRow.rowKey);
      used.add(startRow.rowKey);
      addInterval(startRow.event.time, end, '이본 연계 제어', [startRow, ...(endRow ? [endRow] : [])]);
      rows.forEach(row => {
        if (row.event.character === 'yvonne' && row.event.type === 'combo' && row.event.time >= startRow.event.time - statusEpsilon && row.event.time <= end + statusEpsilon) {
          avoidKeys.add(row.rowKey);
          actionRows.push({ rowKey: row.rowKey, event: row.event, time: row.event.time, reason: '이본 연계 제어' });
        }
      });
    });

    // 탕탕 궁극기: 시전부터 거대한 파도 발생까지 지속 제어. 시전 기록이 없으면 공식 4초 지속을 역산합니다.
    const tangtangWaves = rows.filter(row => row.event.character === 'tangtang' && eventTextMatches(row.event, /Early\s*Rogue\s*Wave|궁극기\s*파도/i));
    const tangtangCasts = rows.filter(row => row.event.character === 'tangtang' && eventTextMatches(row.event, /Ultimate\s*Cast|궁극기\s*시전/i));
    tangtangWaves.forEach(waveRow => {
      const candidates = tangtangCasts.filter(row => !used.has(row.rowKey) && row.event.time <= waveRow.event.time + statusEpsilon);
      const castRow = candidates.at(-1);
      const start = castRow ? castRow.event.time : Math.max(0, waveRow.event.time - 4);
      if (castRow) used.add(castRow.rowKey);
      used.add(waveRow.rowKey);
      addInterval(start, waveRow.event.time, '탕탕 궁극기 · 고대의 진', [castRow, waveRow].filter(Boolean));
      rows.forEach(row => {
        const sameUlt = row.event.character === 'tangtang' && row.event.time >= start - statusEpsilon && row.event.time <= waveRow.event.time + statusEpsilon && (row.event.type === 'ultimate' || (row.event.type === 'special' && Math.abs(row.event.time - waveRow.event.time) <= statusEpsilon));
        if (sameUlt) {
          avoidKeys.add(row.rowKey);
          actionRows.push({ rowKey: row.rowKey, event: row.event, time: row.event.time, reason: '탕탕 궁극기' });
        }
      });
    });

    rows.forEach(row => {
      if (used.has(row.rowKey)) return;
      if (row.event.character === 'tangtang' && eventTextMatches(row.event, /Early\s*Rogue\s*Wave|Ultimate\s*Cast|궁극기\s*파도|궁극기\s*시전/i)) return;
      if (row.event.character === 'yvonne' && row.event.type === 'combo' && /Combo\s*Skill\s*(Dps|Burst)/i.test(row.event.source || '')) return;
      const tag = controlInstantTag(row.event);
      if (!tag) return;
      addInterval(row.event.time, row.event.time, tag, [row]);
      markCharacterTime(row.event.character, row.event.time, tag);
    });

    // 제어 회피 시 방어 불능을 전제로 한 강타·갑옷 파괴·쇄빙의 별도 피해도 사용하지 않는 것으로 계산합니다.
    if (intervals.length) {
      rows.forEach(row => {
        if (/강타|\bCrush\b|갑옷\s*파괴|\bBreach\b|쇄빙|Shatter/i.test(statusEventText(row.event))) {
          avoidKeys.add(row.rowKey);
          actionRows.push({ rowKey: row.rowKey, event: row.event, time: row.event.time, reason: '제어 의존 후속 피해' });
        }
      });
    }

    const merged = [];
    intervals.sort((a, b) => a.start - b.start || a.end - b.end).forEach(interval => {
      const current = merged.at(-1);
      if (!current || interval.start > current.end + statusEpsilon) {
        merged.push({ ...interval, tags: [...new Set(interval.tags)] });
      } else {
        current.end = Math.max(current.end, interval.end);
        current.tags = [...new Set([...current.tags, ...interval.tags])];
        current.sources.push(...interval.sources);
      }
    });
    const ticks = [];
    merged.forEach((interval, intervalIndex) => {
      for (let time = interval.start, ordinal = 1; time <= interval.end + statusEpsilon; time = interval.start + ordinal, ordinal += 1) {
        ticks.push({ time, intervalIndex, ordinal });
      }
    });
    const uniqueActions = [...new Map(actionRows.map(row => [row.rowKey, row])).values()].sort((a, b) => a.time - b.time);
    return { intervals: merged, ticks, avoidKeys, actions: uniqueActions, rows };
  }

  function eventTextMatches(event, pattern) {
    return pattern.test(statusEventText(event));
  }

  function controlAdjustedDamageRows(p, state, context, totalDamage) {
    const scales = characterEventScales(p);
    const rows = [];
    const reapply = context.statusReapply;
    p.events.forEach((event, index) => {
      if (!(event.damage > 0)) return;
      let damage = adjustedStatusEventDamage(p, event, index, state, context.ratios, scales, context.statusWindow);
      if (state.statusStageEnabled && context.statusStage?.affectedReductionByIndex?.has(index)) damage *= 1 - context.statusStage.affectedReductionByIndex.get(index);
      const rowKey = statusRowKey(index, -1, false);
      const time = context.chill?.scheduledTimeByRowKey?.get(rowKey) ?? (state.statusReapplyEnabled ? (reapply?.scheduledTimeByRowKey?.get(rowKey) ?? event.time) : event.time);
      rows.push({ rowKey, event, time, damage });
    });
    (context.comboSpeed?.extraEvents || []).forEach((event, extraIndex) => {
      let damage = Math.max(0, event.damage || 0);
      if (state.statusWindowEnabled && context.statusWindow?.extraAffectedIndexes?.has(extraIndex)) damage *= 1 - state.statusReduction;
      if (state.statusStageEnabled && context.statusStage?.extraReductionByIndex?.has(extraIndex)) damage *= 1 - context.statusStage.extraReductionByIndex.get(extraIndex);
      const rowKey = statusRowKey(-1, extraIndex, true);
      const time = context.chill?.scheduledTimeByRowKey?.get(rowKey) ?? (state.statusReapplyEnabled ? (reapply?.scheduledTimeByRowKey?.get(rowKey) ?? event.time) : event.time);
      rows.push({ rowKey, event, time, damage });
    });
    if (state.highHpCapEnabled && context.highHpCap?.bucketRatioByBucket?.size) {
      rows.forEach(row => {
        const bucket = Math.max(0, Math.floor((row.time + 1e-7) * 10));
        row.damage *= context.highHpCap.bucketRatioByBucket.get(bucket) ?? 1;
      });
    }
    const raw = rows.reduce((sum, row) => sum + row.damage, 0);
    const correction = raw > 0 ? totalDamage / raw : 0;
    rows.forEach(row => { row.damage *= correction; });
    return rows.sort((a, b) => a.time - b.time);
  }

  function curveFromDamageRows(rows, duration, excluded = new Set()) {
    let cumulative = 0;
    const points = [[0, 0]];
    rows.forEach(row => {
      if (excluded.has(row.rowKey)) return;
      cumulative += row.damage;
      points.push([row.time, cumulative]);
    });
    return extendedCurve(points, duration, cumulative);
  }

  function simulateControlRecovery(p, rate, state, context, totalDamage, enhancement, hpMult) {
    const result = emptyControlRecoveryResult(totalDamage);
    result.rate = rate;
    const timeline = buildControlIntervals(p, context.comboSpeed?.extraEvents || [], context.statusReapply, context.chill);
    result.intervals = timeline.intervals;
    result.ticks = timeline.ticks;
    result.controlActions = timeline.actions;
    result.controlActionCount = timeline.actions.length;
    const monsterRows = effectiveStageMonsterRows(enhancement, hpMult);
    const totalHp = monsterRows.reduce((sum, row) => sum + row.hp, 0);
    result.representativeHp = totalHp > 0 ? monsterRows.reduce((sum, row) => sum + row.hp * row.hp, 0) / totalHp : 0;
    result.perTickPotential = result.representativeHp * rate;
    result.potentialRecovery = result.perTickPotential * timeline.ticks.length;
    const groupedTargets = new Map();
    monsterRows.forEach(row => {
      const key = row.monster.monsterKey || row.monster.name;
      const current = groupedTargets.get(key) || { monster: row.monster, count: 0, hp: row.hp, perTick: row.hp * rate };
      current.count += 1;
      current.hp = row.hp;
      current.perTick = row.hp * rate;
      groupedTargets.set(key, current);
    });
    result.targetRows = [...groupedTargets.values()].sort((a, b) => b.hp - a.hp);
    const damageRows = controlAdjustedDamageRows(p, state, context, totalDamage);
    if (!timeline.intervals.length || !(rate > 0) || !damageRows.length) {
      result.maintainCurve = curveFromDamageRows(damageRows, context.duration || p.duration);
      result.avoidCurve = result.maintainCurve;
      result.limitations.push('제어 태그 기록 또는 회복률이 없어 원본 행동을 유지합니다.');
      return result;
    }

    const maintainEvents = [
      ...damageRows.map(row => ({ kind: 'damage', time: row.time, row })),
      ...timeline.ticks.map(tick => ({ kind: 'heal', time: tick.time, tick }))
    ].sort((a, b) => a.time - b.time || (a.kind === 'damage' ? -1 : 1));
    let net = 0;
    let recovered = 0;
    const maintainCurve = [[0, 0]];
    maintainEvents.forEach(item => {
      if (item.kind === 'damage') {
        net += item.row.damage;
        maintainCurve.push([item.time, net]);
      } else {
        const actual = Math.min(result.perTickPotential, Math.max(0, net));
        recovered += actual;
        net = Math.max(0, net - actual);
        item.tick.potential = result.perTickPotential;
        item.tick.actual = actual;
        maintainCurve.push([item.time, net]);
      }
    });
    result.actualRecovery = recovered;
    result.maintainDamage = net;
    result.maintainCurve = extendedCurve(maintainCurve, context.duration || p.duration, net);
    result.avoidCurve = curveFromDamageRows(damageRows, context.duration || p.duration, timeline.avoidKeys);
    result.avoidDamage = result.avoidCurve.at(-1)?.[1] || 0;
    result.removedDamage = Math.max(0, totalDamage - result.avoidDamage);
    const useAvoid = result.avoidDamage > result.maintainDamage + .5;
    result.selectedBehavior = useAvoid ? 'avoid' : 'maintain';
    result.selectedLabel = useAvoid ? '제어 회피' : '제어 유지';
    result.appliedDamage = useAvoid ? result.avoidDamage : result.maintainDamage;
    result.limitations.push('공격 대상 ID가 없어 각 몬스터의 최대 HP를 스테이지 체력 비중으로 가중한 대표 대상 HP로 회복량을 계산합니다. 같은 시각에는 제어 태그 공격 피해를 먼저 반영한 뒤 회복하고, 이미 잃은 체력을 넘는 회복은 적용하지 않습니다.');
    result.limitations.push('띄우기·넘어뜨리기 등 지속시간 정보가 없는 제어 태그 공격은 시작 즉시 회복 1회로 계산하며, 탕탕 궁극기와 이본 연계 제어는 기록된 지속 구간을 사용합니다.');
    result.limitations.push('제어 회피는 제어 태그 행동 묶음과 강타·갑옷 파괴·쇄빙의 별도 피해를 제외합니다. 후속 행동의 시간 재배치는 추정하지 않고 원본 분석 시간을 유지하며, 분리되지 않은 조건부 추가 피해는 원본에 남습니다.');
    return result;
  }

  function updateControlRecoveryConstraint() {
    const rateDisplay = Number($('#controlRecoveryRate').value), rate = rateDisplay / 100;
    $('#controlRecoveryRateValue').value = `${rateDisplay}%`;
    $('#controlRecoverySummaryValue').textContent = `초당 최대 HP ${rateDisplay}%`;
    setPreset('control-recovery', rateDisplay);
    const state = {
      statEnabled:false, normalEnabled:false, hpEnabled:false, timeEnabled:false,
      skillOtherEnabled:false, comboSpeedEnabled:false, ultRepeatEnabled:false,
      statusWindowEnabled:false, statusStageEnabled:false, statusReapplyEnabled:false,
      stageEnhanceEnabled:false, highHpCapEnabled:false, controlRecoveryEnabled:true,
      battle:0, other:0, comboCooldown:0, speedBattle:0, ultRepeat:0,
      statusDuration:0, statusReduction:0, statusStageDuration:10, statusStageReduction:0,
      statusReapplyInterval:0, stageEnhanceLevel:0, highHpThreshold:100000, highHpCapRate:.25,
      controlRecoveryRate:rate
    };
    parties.forEach(party => {
      const root = panel('controlRecovery', party), comboResult = calculateCombo(party, state), info = comboResult.controlRecovery;
      const maintainDps = info.maintainDamage / party.duration, avoidDps = info.avoidDamage / party.duration;
      const deltaPct = (comboResult.dps / party.dps - 1) * 100;
      resultBar(root, party, '', [
        { label:'제어 합집합', value:`${info.intervals.length}구간` },
        { label:'회복 판정', value:`${info.ticks.length}회` },
        { label:'예상 몬스터 회복량', value:`+${num0(info.actualRecovery)}`, className:info.actualRecovery ? 'negative' : '' },
        { label:'추천 행동', value:info.intervals.length ? info.selectedLabel : '제어 기록 없음', className:info.selectedBehavior === 'avoid' ? 'positive' : '' },
        { label:'제약 적용 DPS', value:num(comboResult.dps) },
        { label:'DPS 변화', value:deltaPct ? pct(deltaPct) : '0%', className:deltaPct < 0 ? 'negative' : '' }
      ]);
      const intervalRows = info.intervals.map((interval, index) => {
        const count = info.ticks.filter(tick => tick.intervalIndex === index).length;
        const durationText = interval.end > interval.start + statusEpsilon ? `${num(interval.start)}~${num(interval.end)}초` : `${num(interval.start)}초 즉시`;
        return `<div class="control-recovery-row"><span><b>${interval.tags.join(' · ')}</b><small>${durationText}</small></span><em>${count}회 회복</em><strong>초당 ${rateDisplay}%</strong></div>`;
      }).join('');
      const targetRows = info.targetRows.map(row => `<div class="control-target-row"><span><img src="${row.monster.icon}" alt=""><b>${row.monster.name}</b><small>배치 ${row.count}마리 · 적용 HP ${num0(row.hp)}</small></span><em>1회당 ${num0(row.perTick)}</em></div>`).join('');
      $('[data-role="controlRecoveryTable"]', root).innerHTML = `<h4>제어 합집합과 회복 판정</h4><p class="record-model-note">제어가 시작되는 즉시 첫 회복이 발생하고, 합쳐진 제어 구간이 유지되는 동안 시작 시점 기준 1초마다 회복합니다. 여러 제어가 겹치면 회복률은 중첩되지 않고 종료 시각만 연장됩니다.</p><div class="control-recovery-list">${intervalRows || '<div class="combo-empty">현재 행동 기록에서 제어 태그 행동을 확인하지 못했습니다.</div>'}</div><div class="damage-type-row"><div><span>체력 가중 대표 대상 HP</span><small>대상 ID가 없는 DATAFIELD 보정 모델</small></div><b>${num0(info.representativeHp)}</b><strong>1회 ${num0(info.perTickPotential)}</strong></div><div class="damage-type-row"><div><span>잠재 몬스터 회복량 → 예상 몬스터 회복량</span><small>같은 시각의 제어 태그 피해를 먼저 적용하며, 최대 HP를 넘는 회복은 제외</small></div><b>${num0(info.potentialRecovery)} → ${num0(info.actualRecovery)}</b><strong>${info.ticks.length}회 판정</strong></div><h4>몬스터별 1회 회복량</h4><div class="control-target-list">${targetRows}</div><h4>행동 선택 비교</h4><div class="control-behavior-grid"><div class="${info.selectedBehavior === 'maintain' ? 'selected' : ''}"><span>제어 유지</span><b>DPS ${num(maintainDps)}</b><small>회복 ${num0(info.actualRecovery)} 감수</small></div><div class="${info.selectedBehavior === 'avoid' ? 'selected' : ''}"><span>제어 회피</span><b>DPS ${num(avoidDps)}</b><small>제어·의존 피해 ${num0(info.removedDamage)} 제외</small></div></div><p class="record-model-note">${info.limitations.join(' ')}</p>`;
      const legends = [{label:'원본 누적 피해',color:'#283441'}];
      if (info.intervals.length) {
        legends.push({label:`제어 유지 · 회복 ${rateDisplay}%`,color:'#d7553e'});
        legends.push({label:'제어 회피',color:'#3e8552'});
      }
      renderLegendItems($('[data-role="controlRecoveryLegend"]', root), legends);
      renderCumulative($('[data-role="controlRecoveryCurve"]', root), info.intervals.length ? [{color:'#283441',points:party.curve},{color:'#d7553e',points:info.maintainCurve},{color:'#3e8552',points:info.avoidCurve}] : [{color:'#283441',points:party.curve}], party.duration);
      $('[data-role="controlRecoveryImpact"]', root).textContent = !info.intervals.length
        ? '현재 DATAFIELD 행동 기록에는 제어 태그가 붙은 행동이 없어 이 제약으로 인한 변화가 없습니다.'
        : info.selectedBehavior === 'avoid'
          ? `제어 유지 시 몬스터가 실제로 약 ${num0(info.actualRecovery)}을 회복해 DPS가 ${num(maintainDps)}로 낮아집니다. 제어 태그 행동과 직접 의존 피해를 제외한 회피 행동의 DPS ${num(avoidDps)}가 더 높아 현재 설정에서는 제어 회피를 선택합니다.`
          : `제어 태그 행동으로 몬스터가 실제로 약 ${num0(info.actualRecovery)}을 회복하지만, 제어와 강타·갑옷 파괴 등으로 얻는 피해가 더 커 제어 유지 DPS ${num(maintainDps)}가 회피 DPS ${num(avoidDps)}보다 높습니다.`;
    });
  }

  function renderTimeChart(target, limit, clear) {
    const W = 720, H = 220, p = { l: 150, r: 70, t: 25, b: 30 }, max = Math.max(600, limit, clear) * 1.08;
    const rows = [['원본 제한시간', 600, '#283441'], ['적용 제한시간', limit, '#d7553e'], ['예상 클리어 시간', clear, '#3e8552']];
    let out = '';
    rows.forEach((row, i) => { const y = 40 + i * 55, w = (W - p.l - p.r) * Math.min(row[1] / max, 1), outside = p.l + w + 10, useInside = outside > W - p.r - 45, tx = useInside ? p.l + Math.max(w - 8, 45) : outside, anchor = useInside ? 'end' : 'start', fill = useInside ? '#fff' : '#3d4a59'; out += `<text class="chart-label" x="${p.l - 12}" y="${y + 14}" text-anchor="end">${row[0]}</text><rect x="${p.l}" y="${y}" width="${W - p.l - p.r}" height="24" rx="6" fill="#edf1f5"/><rect x="${p.l}" y="${y}" width="${w}" height="24" rx="6" fill="${row[2]}"/><text x="${tx}" y="${y + 17}" text-anchor="${anchor}" font-size="13" font-weight="800" fill="${fill}">${num(row[1])}초</text>`; });
    target.innerHTML = `<svg viewBox="0 0 ${W} ${H}">${out}</svg>`;
  }

  function updateTimeConstraint() {
    const reduction = Number($('#timeReduction').value), baseLimit = model.baseTimeLimit, limit = baseLimit - reduction;
    $('#timeReductionValue').value = reduction ? `${reduction}초 감소` : '감소 없음'; $('#timeSummaryValue').textContent = reduction ? `${reduction}초 감소` : '감소 없음'; $('#appliedTimeLimitValue').textContent = `${limit}초`; setPreset('time', reduction);
    parties.forEach(p => {
      const root = panel('time', p), clear = clearEstimate(p), remaining = limit - clear, available = limit - model.stageTransitionSeconds, baseAvailable = baseLimit - model.stageTransitionSeconds, speed = (baseAvailable / available - 1) * 100;
      resultBar(root, p, '스테이지 구성 1의 예상 클리어 시간을 비교하는 파티', [
        { label: '제한시간 감소', value: `${reduction}초` }, { label: '적용 제한시간', value: `${limit}초` }, { label: '예상 클리어', value: seconds(clear) }, { label: remaining >= 0 ? '남은 시간' : '초과 시간', value: seconds(Math.abs(remaining)), className: remaining < 0 ? 'negative' : 'positive' }
      ]);
      $('[data-role="timeStatusPanel"]', root).innerHTML = `<h4>제한시간 비교</h4><div class="compact-row"><span>원본 제한시간</span><b>${baseLimit}초</b></div><div class="compact-row"><span>감소량</span><b>${reduction}초</b></div><div class="compact-row"><span>적용 제한시간</span><b>${limit}초</b></div><div class="compact-row"><span>예상 클리어 시간</span><b>${seconds(clear)}</b></div><div class="compact-row"><span>실질 전투 가능 시간</span><b>${available}초</b></div><div class="compact-row"><span>요구 전투 속도 증가</span><b>${pct(speed)}</b></div>`;
      renderLegendItems($('[data-role="timeLegend"]', root), [{ label: '원본 제한시간', color: '#283441' }, { label: `적용 제한시간 (${reduction}초 감소)`, color: '#d7553e' }, { label: '예상 클리어 시간', color: '#3e8552' }]);
      renderTimeChart($('[data-role="timeChart"]', root), limit, clear);
      $('[data-role="timeImpact"]', root).textContent = remaining < 0 ? `제한시간을 ${reduction}초 줄이면 ${p.name}의 예상 클리어 시간이 적용 제한시간을 ${num(Math.abs(remaining))}초 초과합니다.` : remaining <= 60 ? `제한시간 감소 후 ${p.name}에 남는 시간이 ${num(remaining)}초로 짧아, 이동·공격 대상 전환·스킬 공백이 발생하면 시간 초과로 바뀔 수 있습니다.` : reduction === 0 ? `${p.name}의 원본 제한시간 상태이며 현재 예상 클리어 시간과 600초 사이에 ${num(remaining)}초의 여유가 있습니다.` : `${p.name}은 제한시간을 ${reduction}초 줄여도 ${num(remaining)}초의 예상 여유가 남습니다.`;
    });
  }

  const exclusivePair = {
    skillOther: { check: 'comboSkillOtherEnabled', popup: 'popupComboSkillOtherEnabled', other: 'comboSpeed' },
    comboSpeed: { check: 'comboComboSpeedEnabled', popup: 'popupComboComboSpeedEnabled', other: 'skillOther' }
  };

  function showExclusiveModal() {
    const modal = $('#exclusiveConstraintModal');
    if (!modal) return;
    modal.hidden = false;
    document.body.classList.add('constraint-modal-open');
    requestAnimationFrame(() => $('#exclusiveConstraintConfirm')?.focus());
  }

  function closeExclusiveModal() {
    const modal = $('#exclusiveConstraintModal');
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('constraint-modal-open');
  }

  function bindExclusiveModal() {
    $('#exclusiveConstraintConfirm')?.addEventListener('click', closeExclusiveModal);
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && !$('#exclusiveConstraintModal')?.hidden) closeExclusiveModal(); });
  }

  function canEnableExclusive(key) {
    const other = exclusivePair[key]?.other;
    if (!other) return true;
    if ($(`#${exclusivePair[other].check}`).checked) {
      showExclusiveModal();
      return false;
    }
    return true;
  }

  const comboEnabledControlIds = [
    'comboStatEnabled',
    'comboNormalEnabled',
    'comboSkillOtherEnabled',
    'comboComboSpeedEnabled',
    'comboUltRepeatEnabled',
    'comboStatusWindowEnabled',
    'comboStatusStageEnabled',
    'comboStatusReapplyEnabled',
    'comboBattleChillEnabled',
    'comboComboChillEnabled',
    'comboStageEnhanceEnabled',
    'comboHighHpCapEnabled',
    'comboControlRecoveryEnabled',
    'comboHpEnabled',
    'comboTimeEnabled'
  ];

  function resetComboSelections() {
    comboEnabledControlIds.forEach(id => {
      const control = $(`#${id}`);
      if (control) control.checked = false;
    });
    updateComboConstraint();
  }

  function bindComboControls() {
    const simpleChecks = ['comboStatEnabled', 'comboNormalEnabled', 'comboUltRepeatEnabled', 'comboStatusWindowEnabled', 'comboStatusStageEnabled', 'comboStatusReapplyEnabled', 'comboBattleChillEnabled', 'comboComboChillEnabled', 'comboStageEnhanceEnabled', 'comboHighHpCapEnabled', 'comboControlRecoveryEnabled', 'comboHpEnabled', 'comboTimeEnabled'];
    simpleChecks.forEach(id => $(`#${id}`).addEventListener('change', updateComboConstraint));
    ['comboSkillOtherEnabled','comboComboSpeedEnabled'].forEach(id => $(`#${id}`).addEventListener('change', event => {
      const key = id === 'comboSkillOtherEnabled' ? 'skillOther' : 'comboSpeed';
      if (event.target.checked && !canEnableExclusive(key)) event.target.checked = false;
      updateComboConstraint();
    }));
    ['comboStatReduction','comboNormalReduction','comboBattleReduction','comboOtherIncrease','comboComboCooldownReduction','comboSpeedBattleReduction','comboUltRepeatReduction','comboStatusWindowDuration','comboStatusWindowReduction','comboStatusStageDuration','comboStatusStageReduction','comboStatusReapplyInterval','comboBattleChillStage','comboBattleChillCooldown','comboComboChillStage','comboComboChillCooldown','comboHighHpThreshold','comboHighHpCapRate','comboControlRecoveryRate','comboHpIncrease','comboTimeReduction'].forEach(id => $(`#${id}`).addEventListener('input', updateComboConstraint));

    const presets = [
      ['combo-stat','comboStatReduction','comboStatEnabled',null],
      ['combo-normal','comboNormalReduction','comboNormalEnabled',null],
      ['combo-battle','comboBattleReduction','comboSkillOtherEnabled','skillOther'],
      ['combo-other','comboOtherIncrease','comboSkillOtherEnabled','skillOther'],
      ['combo-cooldown','comboComboCooldownReduction','comboComboSpeedEnabled','comboSpeed'],
      ['combo-speed-battle','comboSpeedBattleReduction','comboComboSpeedEnabled','comboSpeed'],
      ['combo-ult-repeat','comboUltRepeatReduction','comboUltRepeatEnabled',null],
      ['combo-status-duration','comboStatusWindowDuration','comboStatusWindowEnabled',null],
      ['combo-status-reduction','comboStatusWindowReduction','comboStatusWindowEnabled',null],
      ['combo-status-stage-duration','comboStatusStageDuration','comboStatusStageEnabled',null],
      ['combo-status-stage-reduction','comboStatusStageReduction','comboStatusStageEnabled',null],
      ['combo-status-reapply','comboStatusReapplyInterval','comboStatusReapplyEnabled',null],
      ['combo-battle-chill-stage','comboBattleChillStage','comboBattleChillEnabled',null],
      ['combo-battle-chill-cooldown','comboBattleChillCooldown','comboBattleChillEnabled',null],
      ['combo-combo-chill-stage','comboComboChillStage','comboComboChillEnabled',null],
      ['combo-combo-chill-cooldown','comboComboChillCooldown','comboComboChillEnabled',null],
      ['combo-high-hp-threshold','comboHighHpThreshold','comboHighHpCapEnabled',null],
      ['combo-high-hp-cap','comboHighHpCapRate','comboHighHpCapEnabled',null],
      ['combo-control-recovery','comboControlRecoveryRate','comboControlRecoveryEnabled',null],
      ['combo-hp','comboHpIncrease','comboHpEnabled',null],
      ['combo-time','comboTimeReduction','comboTimeEnabled',null]
    ];
    presets.forEach(([attr, range, check, exclusiveKey]) => $$(`[data-${attr}]`).forEach(btn => btn.addEventListener('click', event => {
      event.preventDefault();
      if (exclusiveKey && !$(`#${check}`).checked && !canEnableExclusive(exclusiveKey)) return;
      $(`#${range}`).value = btn.getAttribute(`data-${attr}`);
      $(`#${check}`).checked = true;
      updateComboConstraint();
    })));
    $$('[data-combo-stage-enhance]').forEach(btn => btn.addEventListener('click', event => {
      event.preventDefault();
      $('#comboStageEnhanceLevel').value = btn.getAttribute('data-combo-stage-enhance');
      $('#comboStageEnhanceEnabled').checked = true;
      updateComboConstraint();
    }));

    const constraintToggle = $('#comboConstraintToggle');
    const constraintControls = $('#comboConstraintControls');
    const constraintToggleLabel = $('#comboConstraintToggleLabel');
    if (constraintToggle && constraintControls && constraintToggleLabel) {
      constraintToggle.addEventListener('click', event => {
        event.preventDefault();
        const expanded = constraintToggle.getAttribute('aria-expanded') === 'true';
        const nextExpanded = !expanded;
        constraintToggle.setAttribute('aria-expanded', String(nextExpanded));
        constraintControls.hidden = !nextExpanded;
        constraintToggleLabel.textContent = nextExpanded ? '제약 접기' : '제약 펼치기';
      });
    }

    $('#comboLoadSettings').addEventListener('click', event => {
      event.preventDefault();
      $('#comboStatReduction').value = $('#statReduction').value;
      $('#comboNormalReduction').value = $('#normalReduction').value;
      $('#comboBattleReduction').value = $('#battleReduction').value;
      $('#comboOtherIncrease').value = $('#otherIncrease').value;
      $('#comboComboCooldownReduction').value = $('#comboCooldownReduction').value;
      $('#comboSpeedBattleReduction').value = $('#speedBattleReduction').value;
      $('#comboUltRepeatReduction').value = $('#ultRepeatReduction').value;
      $('#comboStatusWindowDuration').value = $('#statusWindowDuration').value;
      $('#comboStatusWindowReduction').value = $('#statusWindowReduction').value;
      $('#comboStatusStageDuration').value = $('#statusStageDuration').value;
      $('#comboStatusStageReduction').value = $('#statusStageReduction').value;
      $('#comboStatusReapplyInterval').value = $('#statusReapplyInterval').value;
      $('#comboBattleChillStage').value = $('[data-battle-chill-stage].active')?.dataset.battleChillStage === 'two' ? 2 : 1;
      $('#comboBattleChillCooldown').value = $('#battleChillCooldown')?.value || 3;
      $('#comboComboChillStage').value = $('[data-combo-chill-stage].active')?.dataset.comboChillStage === 'two' ? 2 : 1;
      $('#comboComboChillCooldown').value = $('#comboChillCooldown')?.value || 3;
      $('#comboStageEnhanceLevel').value = $('#stageEnhanceLevel').value;
      $('#comboHighHpThreshold').value = $('#highHpThreshold').value;
      $('#comboHighHpCapRate').value = $('#highHpCapRate').value;
      $('#comboControlRecoveryRate').value = $('#controlRecoveryRate').value;
      $('#comboHpIncrease').value = $('#hpIncrease').value;
      $('#comboTimeReduction').value = $('#timeReduction').value;
      ['comboStatEnabled','comboNormalEnabled','comboUltRepeatEnabled','comboStatusWindowEnabled','comboStatusStageEnabled','comboStatusReapplyEnabled','comboBattleChillEnabled','comboComboChillEnabled','comboStageEnhanceEnabled','comboHighHpCapEnabled','comboControlRecoveryEnabled','comboHpEnabled','comboTimeEnabled'].forEach(id => $(`#${id}`).checked = true);
      if (!$('#comboSkillOtherEnabled').checked && !$('#comboComboSpeedEnabled').checked) $('#comboSkillOtherEnabled').checked = true;
      updateComboConstraint();
    });
    $('#comboReset').addEventListener('click', event => {
      event.preventDefault();
      resetComboSelections();
    });
  }

  function getComboState(overrides = {}) {
    return {
      statEnabled: $('#comboStatEnabled').checked,
      normalEnabled: $('#comboNormalEnabled').checked,
      skillOtherEnabled: $('#comboSkillOtherEnabled').checked,
      comboSpeedEnabled: $('#comboComboSpeedEnabled').checked,
      ultRepeatEnabled: $('#comboUltRepeatEnabled').checked,
      statusWindowEnabled: $('#comboStatusWindowEnabled').checked,
      statusStageEnabled: $('#comboStatusStageEnabled').checked,
      statusReapplyEnabled: $('#comboStatusReapplyEnabled').checked,
      battleChillEnabled: $('#comboBattleChillEnabled').checked,
      comboChillEnabled: $('#comboComboChillEnabled').checked,
      stageEnhanceEnabled: $('#comboStageEnhanceEnabled').checked,
      highHpCapEnabled: $('#comboHighHpCapEnabled').checked,
      controlRecoveryEnabled: $('#comboControlRecoveryEnabled').checked,
      hpEnabled: $('#comboHpEnabled').checked,
      timeEnabled: $('#comboTimeEnabled').checked,
      stat: Number($('#comboStatReduction').value) / 100,
      normal: Number($('#comboNormalReduction').value) / 100,
      battle: Number($('#comboBattleReduction').value) / 100,
      other: Number($('#comboOtherIncrease').value) / 100,
      comboCooldown: Number($('#comboComboCooldownReduction').value) / 100,
      speedBattle: Number($('#comboSpeedBattleReduction').value) / 100,
      ultRepeat: Number($('#comboUltRepeatReduction').value) / 100,
      statusDuration: Number($('#comboStatusWindowDuration').value),
      statusReduction: Number($('#comboStatusWindowReduction').value) / 100,
      statusStageDuration: Number($('#comboStatusStageDuration').value),
      statusStageReduction: Number($('#comboStatusStageReduction').value) / 100,
      statusReapplyInterval: Number($('#comboStatusReapplyInterval').value),
      battleChillStage: Number($('#comboBattleChillStage').value),
      battleChillCooldown: Number($('#comboBattleChillCooldown').value),
      comboChillStage: Number($('#comboComboChillStage').value),
      comboChillCooldown: Number($('#comboComboChillCooldown').value),
      stageEnhanceLevel: Number($('#comboStageEnhanceLevel').value),
      highHpThreshold: Number($('#comboHighHpThreshold').value),
      highHpCapRate: Number($('#comboHighHpCapRate').value) / 100,
      controlRecoveryRate: Number($('#comboControlRecoveryRate').value) / 100,
      hp: Number($('#comboHpIncrease').value) / 100,
      time: Number($('#comboTimeReduction').value),
      statDisplay: Number($('#comboStatReduction').value),
      normalDisplay: Number($('#comboNormalReduction').value),
      battleDisplay: Number($('#comboBattleReduction').value),
      otherDisplay: Number($('#comboOtherIncrease').value),
      comboCooldownDisplay: Number($('#comboComboCooldownReduction').value),
      speedBattleDisplay: Number($('#comboSpeedBattleReduction').value),
      ultRepeatDisplay: Number($('#comboUltRepeatReduction').value),
      statusDurationDisplay: Number($('#comboStatusWindowDuration').value),
      statusReductionDisplay: Number($('#comboStatusWindowReduction').value),
      statusStageDurationDisplay: Number($('#comboStatusStageDuration').value),
      statusStageReductionDisplay: Number($('#comboStatusStageReduction').value),
      statusReapplyIntervalDisplay: Number($('#comboStatusReapplyInterval').value),
      battleChillStageDisplay: Number($('#comboBattleChillStage').value),
      battleChillCooldownDisplay: Number($('#comboBattleChillCooldown').value),
      comboChillStageDisplay: Number($('#comboComboChillStage').value),
      comboChillCooldownDisplay: Number($('#comboComboChillCooldown').value),
      stageEnhanceLevelDisplay: Number($('#comboStageEnhanceLevel').value),
      highHpThresholdDisplay: Number($('#comboHighHpThreshold').value),
      highHpCapRateDisplay: Number($('#comboHighHpCapRate').value),
      controlRecoveryRateDisplay: Number($('#comboControlRecoveryRate').value),
      hpDisplay: Number($('#comboHpIncrease').value),
      ...overrides
    };
  }

  function calculateCombo(p, state) {
    const ratios = Object.fromEntries(p.order.map(id => [id, state.statEnabled ? statRatio(p.charMap[id], state.stat) : 1]));
    let totalDamage = p.order.reduce((sum, id) => sum + p.charMap[id].damage * ratios[id], 0);
    let comboSpeed = { rows: [], originalUses: 0, extraUses: 0, extraDamage: 0, extraEvents: [], opportunityCount: 0 };
    if (state.normalEnabled) totalDamage -= p.mainNormalDamage * ratios[p.controller] * state.normal;
    if (state.skillOtherEnabled) {
      totalDamage -= categoryAdjustedDamage(p, 'battle', p.battleDamage, ratios) * state.battle;
      totalDamage += categoryAdjustedDamage(p, 'special', p.otherDamage, ratios) * state.other;
    }
    if (state.comboSpeedEnabled) {
      totalDamage -= categoryAdjustedDamage(p, 'battle', p.battleDamage, ratios) * state.speedBattle;
      comboSpeed = simulateComboCooldown(p, state.comboCooldown, ratios);
      totalDamage += comboSpeed.extraDamage;
    }
    if (state.ultRepeatEnabled) totalDamage -= categoryAdjustedDamage(p, 'ultimate', p.ultimateDamage, ratios) * state.ultRepeat;
    let statusReapply = emptyStatusReapplyResult();
    if (state.statusReapplyEnabled) {
      statusReapply = simulateStatusReapplication(p, state.statusReapplyInterval, state, ratios, comboSpeed.extraEvents);
    }
    let statusWindow = { applications: [], windows: [], affected: [], affectedIndexes: new Set(), extraAffected: [], extraAffectedIndexes: new Set(), affectedDamage: 0, loss: 0, totalWindowSeconds: 0, rows: [] };
    if (state.statusWindowEnabled) {
      statusWindow = simulateStatusWindow(p, state.statusDuration, state.statusReduction, state, ratios, comboSpeed.extraEvents, statusReapply);
      totalDamage -= statusWindow.loss;
    }
    let statusStage = emptyStatusStageResult();
    if (state.statusStageEnabled) {
      statusStage = simulateStatusStages(p, state.statusStageDuration, state.statusStageReduction, state, ratios, comboSpeed.extraEvents, statusWindow, statusReapply);
      totalDamage -= statusStage.loss;
    }
    totalDamage = Math.max(0, totalDamage);
    const preChillDuration = state.statusReapplyEnabled ? Math.max(p.duration, statusReapply.adjustedDuration || p.duration) : p.duration;
    const chill = simulateComboChill(p, state, comboSpeed, statusReapply, preChillDuration);
    const duration = chill.appliedDuration;
    const enhancement = state.stageEnhanceEnabled ? stageEnhancementInfo(state.stageEnhanceLevel) : { level:0, targets:[], deltaHp:0, baseHp:totalStageHp(), totalHp:totalStageHp(), waveRows:[] };
    const hpMult = state.hpEnabled ? 1 + state.hp : 1;
    const stageHp = enhancement.totalHp * hpMult;
    let highHpCap = emptyHighHpCapResult(totalDamage);
    if (state.highHpCapEnabled) {
      highHpCap = simulateHighHpDamageCap(p, state.highHpThreshold, state.highHpCapRate, state, { ratios, comboSpeed, statusReapply, statusWindow, statusStage, chill, duration }, totalDamage, enhancement, hpMult, stageHp);
      totalDamage = highHpCap.appliedDamage;
    }
    let controlRecovery = emptyControlRecoveryResult(totalDamage);
    if (state.controlRecoveryEnabled) {
      controlRecovery = simulateControlRecovery(
        p,
        state.controlRecoveryRate,
        state,
        { ratios, comboSpeed, statusReapply, statusWindow, statusStage, chill, highHpCap, duration },
        totalDamage,
        enhancement,
        hpMult
      );
      totalDamage = controlRecovery.appliedDamage;
    }
    const dps = totalDamage / duration;
    const appliedCurve = normalizeDamageCurve(adjustedCurve(p, state, {
      dps, duration, totalDamage, stageHp, ratios, comboSpeed, statusReapply, statusWindow, statusStage, stageEnhance: enhancement, chill, highHpCap, controlRecovery
    }), duration, totalDamage);
    const waveRows = (enhancement.waveRows?.length ? enhancement.waveRows : baseWaveRows(1).map(row => ({ wave: row.wave, after: row.hp })))
      .map(row => ({ wave: row.wave, hp: Math.max(0, Number(row.after) || 0) * hpMult }));
    const clearSimulation = simulateWaveTimelineClear(appliedCurve, duration, waveRows);
    const clear = clearSimulation.totalTime, limit = model.baseTimeLimit - (state.timeEnabled ? state.time : 0), remaining = limit - clear;
    return { dps, duration, totalDamage, stageHp, clear, limit, remaining, clearSimulation, ratios, comboSpeed, statusReapply, statusWindow, statusStage, stageEnhance: enhancement, chill, highHpCap, controlRecovery };
  }

  function comboSelectedItems(state) {
    const arr = [];
    if (state.statEnabled) arr.push({ label: `주요 능력치 -${state.statDisplay}%`, summary: `능력치 -${state.statDisplay}%` });
    if (state.normalEnabled) arr.push({ label: `일반 공격 피해 -${state.normalDisplay}%`, summary: `일반 공격 -${state.normalDisplay}%` });
    if (state.skillOtherEnabled) arr.push({ label: `배틀 스킬 피해 -${state.battleDisplay}% · 기타 피해 +${state.otherDisplay}%`, summary: `배틀 스킬 피해 -${state.battleDisplay}% · 기타 피해 +${state.otherDisplay}%` });
    if (state.comboSpeedEnabled) arr.push({ label: `연계 스킬 쿨타임 -${state.comboCooldownDisplay}% · 배틀 스킬 피해 -${state.speedBattleDisplay}%`, summary: `연계 스킬 쿨타임 -${state.comboCooldownDisplay}% · 배틀 스킬 피해 -${state.speedBattleDisplay}%` });
    if (state.ultRepeatEnabled) arr.push({ label: `궁극기 반복 피해 -${state.ultRepeatDisplay}%`, summary: `반복 궁극기 -${state.ultRepeatDisplay}%` });
    if (state.statusWindowEnabled) arr.push({ label: `상태 후 ${state.statusDurationDisplay}초 · 속성 피해 -${state.statusReductionDisplay}%`, summary: `상태 ${state.statusDurationDisplay}초 · 속성 -${state.statusReductionDisplay}%` });
    if (state.statusStageEnabled) arr.push({ label: `부착 지속 ${state.statusStageDurationDisplay}초 · 단계당 피해 -${state.statusStageReductionDisplay}%`, summary: `단계당 -${state.statusStageReductionDisplay}%` });
    if (state.statusReapplyEnabled) arr.push({ label: `방어불능·동일 아츠부착 재적용 제한 ${state.statusReapplyIntervalDisplay}초`, summary: `재적용 ${state.statusReapplyIntervalDisplay}초` });
    if (state.battleChillEnabled) arr.push({ label: `배틀 스킬 냉기 · 단계 ${state.battleChillStageDisplay === 2 ? 'II' : 'I'} · ${state.battleChillStageDisplay === 2 ? '1회' : '2회'}마다 · ${state.battleChillCooldownDisplay}초`, summary: `배틀 냉기 ${state.battleChillStageDisplay === 2 ? 'II' : 'I'} · ${state.battleChillCooldownDisplay}초` });
    if (state.comboChillEnabled) arr.push({ label: `연계 스킬 냉기 · 단계 ${state.comboChillStageDisplay === 2 ? 'II' : 'I'} · ${state.comboChillStageDisplay === 2 ? '1회' : '2회'}마다 · ${state.comboChillCooldownDisplay}초`, summary: `연계 냉기 ${state.comboChillStageDisplay === 2 ? 'II' : 'I'} · ${state.comboChillCooldownDisplay}초` });
    if (state.stageEnhanceEnabled) arr.push({ label: `지정 웨이브 몬스터 강화 [${state.stageEnhanceLevelDisplay}]`, summary: `강화 [${state.stageEnhanceLevelDisplay}]` });
    if (state.highHpCapEnabled) arr.push({ label: `HP ${num0(state.highHpThresholdDisplay)} 이상 · 0.1초 피해 상한 ${state.highHpCapRateDisplay}%`, summary: `0.1초 상한 ${state.highHpCapRateDisplay}%` });
    if (state.controlRecoveryEnabled) arr.push({ label: `제어 중 몬스터 최대 HP 초당 ${state.controlRecoveryRateDisplay}% 회복`, summary: `제어 중 회복 ${state.controlRecoveryRateDisplay}%` });
    if (state.hpEnabled) arr.push({ label: `몬스터 HP +${state.hpDisplay}%`, summary: `HP +${state.hpDisplay}%` });
    if (state.timeEnabled) arr.push({ label: `제한시간 -${state.time}초`, summary: `시간 -${state.time}초` });
    return arr;
  }

  function extendedCurve(points, duration, finalValue) {
    const rows = points.map(point => point.slice());
    if (!rows.length) return [[0, 0], [duration, finalValue]];
    if (rows.at(-1)[0] < duration - statusEpsilon) rows.push([duration, finalValue]);
    return rows;
  }

  function adjustedCurve(p, state, result) {
    if (state.controlRecoveryEnabled && result.controlRecovery) {
      return result.controlRecovery.selectedBehavior === 'avoid'
        ? result.controlRecovery.avoidCurve
        : result.controlRecovery.maintainCurve;
    }
    const baseRaw = p.events.reduce((s, e) => s + e.damage, 0) || 1, scale = p.totalDamage / baseRaw;
    const duration = result.duration || p.duration;
    const eventTime = eventIndex => result.chill?.scheduledTimeByRowKey?.get(statusRowKey(eventIndex, -1, false))
      ?? (state.statusReapplyEnabled ? (result.statusReapply?.scheduledTimeByRowKey?.get(statusRowKey(eventIndex, -1, false)) ?? p.events[eventIndex].time) : p.events[eventIndex].time);
    const extraTime = (event, extraIndex) => result.chill?.scheduledTimeByRowKey?.get(statusRowKey(-1, extraIndex, true))
      ?? (state.statusReapplyEnabled ? (result.statusReapply?.scheduledTimeByRowKey?.get(statusRowKey(-1, extraIndex, true)) ?? event.time) : event.time);
    const scheduledTimes = p.events.map((_, index) => eventTime(index));
    const scheduledExtraTimes = (result.comboSpeed?.extraEvents || []).map((event, extraIndex) => extraTime(event, extraIndex));
    const times = [...new Set([0, ...p.curve.map(x => x[0]).filter(time => time <= duration), ...scheduledTimes, ...scheduledExtraTimes, duration])].sort((a, b) => a - b);
    const points = times.map(t => {
      const original = p.events.reduce((sum, e, eventIndex) => {
        if (eventTime(eventIndex) > t + statusEpsilon) return sum;
        let ratio = state.statEnabled ? result.ratios[e.character] || 1 : 1;
        if (state.normalEnabled && e.character === p.controller && e.type === 'normal') ratio *= 1 - state.normal;
        if (state.skillOtherEnabled && e.type === 'battle') ratio *= 1 - state.battle;
        if (state.skillOtherEnabled && e.type === 'special') ratio *= 1 + state.other;
        if (state.comboSpeedEnabled && e.type === 'battle') ratio *= 1 - state.speedBattle;
        if (state.ultRepeatEnabled && e.type === 'ultimate') ratio *= 1 - state.ultRepeat;
        if (state.statusWindowEnabled && result.statusWindow?.affectedIndexes?.has(eventIndex)) ratio *= 1 - state.statusReduction;
        if (state.statusStageEnabled && result.statusStage?.affectedReductionByIndex?.has(eventIndex)) ratio *= 1 - result.statusStage.affectedReductionByIndex.get(eventIndex);
        return sum + e.damage * ratio;
      }, 0) * scale;
      const additions = (result.comboSpeed?.extraEvents || []).reduce((sum, event, extraIndex) => {
        if (extraTime(event, extraIndex) > t + statusEpsilon) return sum;
        let ratio = state.statusWindowEnabled && result.statusWindow?.extraAffectedIndexes?.has(extraIndex) ? 1 - state.statusReduction : 1;
        if (state.statusStageEnabled && result.statusStage?.extraReductionByIndex?.has(extraIndex)) ratio *= 1 - result.statusStage.extraReductionByIndex.get(extraIndex);
        return sum + event.damage * ratio;
      }, 0);
      return [t, original + additions];
    });
    const final = points.at(-1)[1] || 1, correction = result.totalDamage / final;
    return points.map(([t, v]) => [t, v * correction]);
  }

  function contributionRow(label, detail, severity, tone) { const width = Math.max(severity === 0 ? 0 : 4, Math.min(100, severity)); return `<div class="combo-contribution-row"><div class="combo-contribution-head"><b>${label}</b><span>${detail}</span></div><div class="combo-contribution-track"><i class="${tone}" style="width:${width}%"></i></div></div>`; }

  function renderComboTimeChart(target, p, result) {
    const baseClear = clearEstimate(p), remaining = result.remaining, rows = [['원본 예상 클리어', baseClear, '#283441'], ['조합 예상 클리어', result.clear, '#586cc8'], ['조합 적용 제한시간', result.limit, '#d7553e'], [remaining >= 0 ? '남은 시간' : '초과 시간', Math.abs(remaining), remaining >= 0 ? '#3e8552' : '#d7553e']];
    const W = 760, H = 300, pad = { l: 160, r: 72, t: 20, b: 25 }, max = Math.max(...rows.map(r => r[1]), 1) * 1.08; let out = '';
    rows.forEach((row, i) => { const y = 28 + i * 60, w = (W - pad.l - pad.r) * row[1] / max, outside = pad.l + w + 10, useInside = outside > W - pad.r - 42, tx = useInside ? pad.l + Math.max(w - 8, 42) : outside; out += `<text class="combo-time-label" x="${pad.l - 16}" y="${y + 21}" text-anchor="end">${row[0]}</text><rect x="${pad.l}" y="${y}" width="${W - pad.l - pad.r}" height="36" rx="9" fill="#edf1f7"/><rect x="${pad.l}" y="${y}" width="${w}" height="36" rx="9" fill="${row[2]}"/><text class="combo-time-value" x="${tx}" y="${y + 24}" text-anchor="${useInside ? 'end' : 'start'}" fill="${useInside ? '#fff' : '#3d4a59'}">${num(row[1])}초</text>`; });
    target.innerHTML = `<svg viewBox="0 0 ${W} ${H}">${out}</svg>`;
  }

  function renderComboInteractions(target, state) {
    const cards = [];
    if (state.statEnabled && state.normalEnabled) cards.push(['공격 제약 중복 적용', '주요 능력치 감소 후의 일반 공격 피해에 일반 공격 피해 감소가 추가 적용됩니다. 개별 DPS 감소율을 단순 합산하지 않습니다.']);
    if (state.skillOtherEnabled && state.normalEnabled) cards.push(['피해 유형별 중복 적용', '일반 공격 감소와 배틀 스킬 감소는 서로 다른 피해 유형에 적용되며, 기타 피해 증가는 별도로 더해집니다.']);
    if (state.comboSpeedEnabled) cards.push(['행동 기록 기반 추가 연계', '원본 행동 기록에 존재하는 연계 스킬 발동 시각만 기회로 사용하며, 변경 재사용시간이 회복된 오퍼레이터의 행동만 추가합니다.']);
    if (state.statusWindowEnabled) cards.push(['상태 시간창 적용', '원본 행동 순서를 유지한 채 상태 이상 발동 뒤의 대응 속성 피해만 감소합니다. 같은 시각에서는 원본 기록상 뒤에 있는 행동부터 적용될 수 있습니다.']);
    if (state.statusStageEnabled) cards.push(['상태 단계 추적', '띄우기·넘어뜨리기는 방어 불능을 누적하고 강타·갑옷 파괴는 전부 소모합니다. 아츠 폭발은 부착을 유지하며, 자연 만료와 소비 뒤에는 0.1초간 직전 단계가 남습니다.']);
    if (state.statusReapplyEnabled) cards.push(['상태 재적용 대기 시간 반영', `방어불능과 같은 유형의 아츠부착은 마지막 적용 뒤 ${state.statusReapplyIntervalDisplay}초가 지나야 다시 사용할 수 있습니다. 제한에 걸린 스킬은 삭제하지 않고 해당 오퍼레이터의 계산용 행동 순서를 재적용 가능 시점까지 늦춥니다.`]);
    if (state.battleChillEnabled || state.comboChillEnabled) cards.push(['냉기 부착·동결 행동 지연', `선택한 배틀·연계 스킬 기록을 조정된 행동 시각 순서로 판정하고, 4스택마다 이후 행동을 5초 늦춥니다. 현재 조합은 동결 ${state.battleChillEnabled && state.comboChillEnabled ? '공용 스택' : '단독 스택'}으로 계산합니다.`]);
    if (state.comboSpeedEnabled && state.comboChillEnabled) cards.push(['추가 연계 스킬과 냉기 시너지', '재사용시간 감소로 추가된 연계 스킬도 연계 냉기 사용 횟수와 부착 쿨타임 판정에 포함됩니다.']);
    if (state.ultRepeatEnabled && state.skillOtherEnabled) cards.push(['궁극기·기타 피해 분리', '궁극기 반복 피해 감소는 실제 궁극기 판정에만 적용하며 기타 피해 증가와 중복되지 않습니다.']);
    if (state.stageEnhanceEnabled) cards.push(['지정 개체 체력 강화', `강화 [${state.stageEnhanceLevelDisplay}] 대상 개체의 현재 HP를 50% 높여 웨이브별 처리량을 다시 계산합니다.`]);
    if (state.highHpCapEnabled) cards.push(['고체력 적 순간 피해 제한', `기준 HP ${num0(state.highHpThresholdDisplay)} 이상인 몬스터의 0.1초 피해를 최대 HP의 ${state.highHpCapRateDisplay}%로 제한하고, 해당 몬스터가 차지하는 스테이지 체력 비중만큼 DPS에 반영합니다.`]);
    if (state.controlRecoveryEnabled) cards.push(['제어 유지·회피 행동 비교', `제어 태그가 적중한 즉시 최대 HP의 ${state.controlRecoveryRateDisplay}%를 회복하고, 겹친 제어는 회복률을 중첩하지 않은 채 합집합 종료 시각만 연장합니다. 제어 유지와 제어 회피의 계산 결과 중 유효 DPS가 높은 행동을 적용합니다.`]);
    if (state.hpEnabled && state.timeEnabled) cards.push(['스테이지 압박 동시 증가', '처리해야 하는 몬스터 HP는 증가하고 사용할 수 있는 시간은 감소해 요구 전투 속도가 양쪽에서 동시에 높아집니다.']);
    if ((state.statEnabled || state.normalEnabled || state.skillOtherEnabled || state.comboSpeedEnabled || state.ultRepeatEnabled || state.statusWindowEnabled || state.statusStageEnabled || state.statusReapplyEnabled || state.battleChillEnabled || state.comboChillEnabled || state.highHpCapEnabled || state.controlRecoveryEnabled) && (state.hpEnabled || state.stageEnhanceEnabled)) cards.push(['공격 성능·처리량 상호작용', '파티의 초당 피해가 낮아지는 동시에 스테이지 총 HP가 증가하므로 예상 클리어 시간이 복합적으로 증가합니다.']);
    const rows = cards.length ? cards.map(([title, text], index) => `<article><span class="interaction-number">${String(index + 1).padStart(2, '0')}</span><b>${title}</b><p>${text}</p></article>`).join('') : '<article class="empty"><span class="interaction-number">—</span><b>독립 적용 상태</b><p>현재 선택에서는 별도의 중복 또는 증폭 상호작용이 감지되지 않습니다.</p></article>';
    target.innerHTML = `<div class="combo-interaction-heading"><span>제약 상호작용</span><b>${cards.length ? cards.length + '개 감지' : '감지 없음'}</b></div><div class="combo-interaction-grid">${rows}</div>`;
  }

  const comboStrengthDescriptors = [
    { key:'stat', flag:'statEnabled', label:'주요 능력치 감소', color:'#526bb2' },
    { key:'normal', flag:'normalEnabled', label:'일반 공격 피해 감소', color:'#d7553e' },
    { key:'skillOther', flag:'skillOtherEnabled', label:'배틀 스킬 감소·기타 피해 증가', color:'#d39726' },
    { key:'comboSpeed', flag:'comboSpeedEnabled', label:'연계 재사용 감소·배틀 스킬 감소', color:'#3e8552' },
    { key:'ultRepeat', flag:'ultRepeatEnabled', label:'궁극기 반복 피해 감소', color:'#7158a6' },
    { key:'statusReapply', flag:'statusReapplyEnabled', label:'상태 재적용 간격 제한', color:'#a86794' },
    { key:'statusWindow', flag:'statusWindowEnabled', label:'상태 후 속성 피해 감소', color:'#2f8a8f' },
    { key:'statusStage', flag:'statusStageEnabled', label:'상태 단계당 피해 감소', color:'#8a6a45' },
    { key:'battleChill', flag:'battleChillEnabled', label:'배틀 스킬 냉기 부착', color:'#4f7fb0' },
    { key:'comboChill', flag:'comboChillEnabled', label:'연계 스킬 냉기 부착', color:'#62a6be' },
    { key:'stageEnhance', flag:'stageEnhanceEnabled', label:'지정 웨이브 몬스터 강화', color:'#b37a42' },
    { key:'hp', flag:'hpEnabled', label:'몬스터 최대 체력 증가', color:'#9b5d50' },
    { key:'highHpCap', flag:'highHpCapEnabled', label:'고체력 적 0.1초 피해 상한', color:'#725fa5' },
    { key:'controlRecovery', flag:'controlRecoveryEnabled', label:'제어 중 몬스터 체력 회복', color:'#4d8a64' },
    { key:'time', flag:'timeEnabled', label:'클리어 제한시간 감소', color:'#667386' }
  ];

  const meanValue = values => values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
  function percentileValue(values, percentile) {
    if (!values.length) return 0;
    const sorted = values.slice().sort((a, b) => a - b);
    const index = (sorted.length - 1) * percentile;
    const lower = Math.floor(index), upper = Math.ceil(index);
    if (lower === upper) return sorted[lower];
    return sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower);
  }

  function signedPercent(value, digits = true) {
    const safe = Math.abs(value) < .005 ? 0 : value;
    const formatted = digits ? fmt.format(Math.abs(safe)) : fmt0.format(Math.abs(safe));
    return `${safe > 0 ? '+' : safe < 0 ? '-' : '±'}${formatted}%`;
  }

  function comboAllDisabledState(state) {
    const disabled = { ...state };
    comboStrengthDescriptors.forEach(item => { disabled[item.flag] = false; });
    return disabled;
  }

  function comboStrengthSettingText(item, state) {
    const settings = {
      stat:`주요 능력치 -${state.statDisplay}%`,
      normal:`일반 공격 피해 -${state.normalDisplay}%`,
      skillOther:`배틀 스킬 피해 -${state.battleDisplay}% · 기타 피해 +${state.otherDisplay}%`,
      comboSpeed:`연계 스킬 쿨타임 -${state.comboCooldownDisplay}% · 배틀 스킬 피해 -${state.speedBattleDisplay}%`,
      ultRepeat:`반복 궁극기 피해 -${state.ultRepeatDisplay}%`,
      statusReapply:`동일 상태 재적용 간격 ${state.statusReapplyIntervalDisplay}초`,
      statusWindow:`감소 지속 ${state.statusDurationDisplay}초 · 속성 피해 -${state.statusReductionDisplay}%`,
      statusStage:`부착 지속 ${state.statusStageDurationDisplay}초 · 단계당 피해 -${state.statusStageReductionDisplay}%`,
      battleChill:`냉기 단계 ${state.battleChillStageDisplay} · 부착 쿨타임 ${state.battleChillCooldownDisplay}초`,
      comboChill:`냉기 단계 ${state.comboChillStageDisplay} · 부착 쿨타임 ${state.comboChillCooldownDisplay}초`,
      stageEnhance:`강화 [${state.stageEnhanceLevelDisplay}] · 대상 몬스터 α 개체 HP 적용`,
      hp:`몬스터 최대 HP +${state.hpDisplay}%`,
      highHpCap:`HP ${num0(state.highHpThresholdDisplay)} 이상 · 0.1초 상한 ${state.highHpCapRateDisplay}%`,
      controlRecovery:`제어 중 초당 최대 HP ${state.controlRecoveryRateDisplay}% 회복`,
      time:`클리어 제한시간 -${state.time}초`
    };
    return settings[item.key] || '현재 설정값 적용';
  }

  function evaluateSingleConstraint(item, state, baseState, baseResults, results) {
    const singleState = { ...baseState, [item.flag]: true };
    const rows = results.map(({ p }) => {
      const baseResult = baseResults.get(p.id);
      const appliedResult = calculateCombo(p, singleState);
      const baseWindow = Math.max(1, baseResult.limit - model.stageTransitionSeconds);
      const appliedWindow = Math.max(1, appliedResult.limit - model.stageTransitionSeconds);
      const baseLoad = baseResult.stageHp / Math.max(baseResult.dps * baseWindow, 1);
      const appliedLoad = appliedResult.stageHp / Math.max(appliedResult.dps * appliedWindow, 1);
      return {
        pressure:(appliedLoad / Math.max(baseLoad, 1e-9) - 1) * 100,
        dpsReduction:(baseResult.dps - appliedResult.dps) / Math.max(baseResult.dps, 1) * 100,
        clearIncrease:(appliedResult.clear / Math.max(baseResult.clear, 1e-9) - 1) * 100,
        timeout:appliedResult.remaining < 0
      };
    });
    const pressures = rows.map(row => row.pressure);
    const sortedPressures = pressures.slice().sort((a, b) => a - b);
    const median = percentileValue(sortedPressures, .5);
    const worst = sortedPressures.length ? sortedPressures.at(-1) : 0;
    const secondWorst = sortedPressures.length > 1 ? sortedPressures.at(-2) : worst;
    const best = sortedPressures.length ? sortedPressures[0] : 0;
    const averagePressure = meanValue(pressures);
    const averageDpsReduction = meanValue(rows.map(row => row.dpsReduction));
    const averageClearIncrease = meanValue(rows.map(row => row.clearIncrease));
    const timeoutCount = rows.filter(row => row.timeout).length;

    // 일반적인 파티와 불리한 파티를 함께 반영한 기본 강도입니다.
    const baseIndex = Math.max(0, median * .45 + secondWorst * .30 + worst * .25);
    // 특정 파티만 유독 크게 불리한 경우를 별도로 보정합니다.
    const partyBias = Math.max(0, worst - median);
    const biasPenalty = partyBias * .5;
    const rawIndex = Math.max(0, baseIndex + biasPenalty);

    let grade = rawIndex < 20 ? 1 : rawIndex < 50 ? 2 : 3;
    const thirdOfParties = Math.ceil(results.length / 3);
    if (worst >= 80 || partyBias >= 40 || timeoutCount >= thirdOfParties) grade = 3;
    else if (worst >= 35 || partyBias >= 15 || timeoutCount > 0) grade = Math.max(grade, 2);

    const spread = worst - best;
    const confidence = partyBias < 5
      ? '파티 편향 낮음'
      : partyBias < 15
        ? '파티 편향 보통'
        : partyBias < 30
          ? '파티 편향 높음'
          : '파티 편향 매우 높음';
    return {
      ...item,
      setting:comboStrengthSettingText(item, state),
      rows,
      median,
      secondWorst,
      worst,
      best,
      averagePressure,
      averageDpsReduction,
      averageClearIncrease,
      timeoutCount,
      baseIndex,
      partyBias,
      biasPenalty,
      rawIndex,
      grade,
      spread,
      confidence
    };
  }

  function singleConstraintReason(score) {
    const impact = Math.abs(score.averageDpsReduction) <= .005
      ? '직접 DPS 변화 없음'
      : score.averageDpsReduction > 0
        ? `평균 DPS -${fmt.format(score.averageDpsReduction)}%`
        : `평균 DPS +${fmt.format(Math.abs(score.averageDpsReduction))}%`;
    const timeout = score.timeoutCount ? `제한시간 초과 ${score.timeoutCount}개 파티` : '제한시간 초과 없음';
    return `강도 지수 ${fmt.format(score.rawIndex)} = 기본 ${fmt.format(score.baseIndex)} + 편향 보정 ${fmt.format(score.biasPenalty)} · ${impact} · 중앙 부담 ${signedPercent(score.median)} · 두 번째 최고 부담 ${signedPercent(score.secondWorst)} · 최고 부담 ${signedPercent(score.worst)} · 파티 편향 ${fmt.format(score.partyBias)}%p · ${timeout}`;
  }

  function analyzeComboStrength(state, results) {
    const selected = comboStrengthDescriptors.filter(item => state[item.flag]);
    const baseState = comboAllDisabledState(state);
    const contributionTotals = Object.fromEntries(selected.map(item => [item.key, 0]));
    const netDpsChanges = [];
    const baseResults = new Map(results.map(({ p }) => [p.id, calculateCombo(p, baseState)]));

    results.forEach(({ p, result }) => {
      let runningState = { ...baseState };
      let previous = baseResults.get(p.id);
      const baseResult = previous;
      selected.forEach(item => {
        runningState = { ...runningState, [item.flag]: true };
        const next = calculateCombo(p, runningState);
        contributionTotals[item.key] += (previous.dps - next.dps) / Math.max(baseResult.dps, 1) * 100;
        previous = next;
      });
      netDpsChanges.push((baseResult.dps - result.dps) / Math.max(baseResult.dps, 1) * 100);
    });

    const constraintScores = selected.map(item => evaluateSingleConstraint(item, state, baseState, baseResults, results));
    const scoreByKey = Object.fromEntries(constraintScores.map(score => [score.key, score]));
    const contributions = selected.map(item => ({
      ...item,
      averagePct: contributionTotals[item.key] / Math.max(results.length, 1),
      score:scoreByKey[item.key]
    }));
    return {
      selected,
      contributions,
      constraintScores,
      averageDpsReduction:meanValue(netDpsChanges)
    };
  }

  function renderComboStrengthAnalysis(state, results, selectedCount) {
    const donut = $('#comboStrengthDonut');
    if (!donut) return;
    const analysis = analyzeComboStrength(state, results);
    const positive = analysis.contributions.filter(item => item.averagePct > .005);
    const offsets = analysis.contributions.filter(item => item.averagePct < -.005);
    const neutral = analysis.contributions.filter(item => Math.abs(item.averagePct) <= .005);
    const grossReduction = positive.reduce((sum, item) => sum + item.averagePct, 0);
    let cursor = 0;
    const gradient = positive.length && grossReduction > 0
      ? positive.map(item => {
          const start = cursor;
          cursor += item.averagePct / grossReduction * 100;
          return `${item.color} ${start.toFixed(3)}% ${cursor.toFixed(3)}%`;
        }).join(',')
      : '#e5eaf1 0 100%';
    donut.style.background = `conic-gradient(${gradient})`;
    donut.setAttribute('aria-label', positive.length
      ? `평균 DPS 감소 ${fmt.format(Math.max(0, analysis.averageDpsReduction))}%. ${positive.map(item => `${item.label} ${fmt.format(item.averagePct / grossReduction * 100)}% · ${item.score.grade}점`).join(', ')}`
      : '현재 조합에서 직접적인 DPS 감소 기여가 없습니다.');
    $('#comboStrengthDonutValue').textContent = signedPercent(-analysis.averageDpsReduction);
    $('#comboStrengthDonutValue').className = analysis.averageDpsReduction > .005 ? 'negative' : analysis.averageDpsReduction < -.005 ? 'positive' : '';
    $('#comboStrengthDonutSub').textContent = selectedCount ? `순 기여 · ${selectedCount}개 선택` : '선택 없음';
    $('#comboStrengthContributionCount').textContent = `${analysis.contributions.length}개 분석`;

    const ordered = [...analysis.contributions].sort((a, b) =>
      a.score.grade - b.score.grade ||
      b.averagePct - a.averagePct ||
      a.label.localeCompare(b.label, 'ko')
    );
    $('#comboStrengthLegend').innerHTML = ordered.length ? ordered.map(item => {
      const isReduction = item.averagePct > .005;
      const isOffset = item.averagePct < -.005;
      const share = isReduction && grossReduction > 0 ? item.averagePct / grossReduction * 100 : 0;
      const effect = isReduction ? `평균 DPS -${fmt.format(item.averagePct)}%` : isOffset ? `평균 DPS +${fmt.format(Math.abs(item.averagePct))}%` : '직접 DPS 변화 없음';
      const detail = isReduction ? `감소 기여 ${fmt.format(share)}%` : isOffset ? '감소분 상쇄' : '처리 부담으로 판정';
      return `<div class="combo-strength-legend-row ${isReduction ? 'reduction' : isOffset ? 'offset' : 'neutral'}"><i style="--strength-color:${item.color}"></i><div><b>${item.label}</b><span>${effect}</span></div><strong><em class="combo-strength-inline-grade grade-${item.score.grade}">${item.score.grade}점</em>${detail}</strong></div>`;
    }).join('') : '<div class="combo-strength-empty">선택된 제약이 없습니다.</div>';

    const sortedScores = [...analysis.constraintScores].sort((a, b) =>
      a.grade - b.grade || a.rawIndex - b.rawIndex || a.label.localeCompare(b.label, 'ko')
    );
    $('#comboStrengthScoreCount').textContent = `${sortedScores.length}개 판정`;
    $('#comboStrengthScoreList').innerHTML = sortedScores.length ? sortedScores.map(score => (
      `<div class="combo-strength-score-row grade-${score.grade}"><span>${score.grade}점</span><div><b>${score.label}</b><small>${score.setting}</small></div><strong>강도 지수 ${fmt.format(score.rawIndex)}</strong></div>`
    )).join('') : '<div class="combo-strength-empty">선택된 제약이 없습니다.</div>';

    const scoreCounts = { 1:0, 2:0, 3:0 };
    sortedScores.forEach(score => { scoreCounts[score.grade] += 1; });
    $('#comboStrengthScoreSummary').textContent = `1점 ${scoreCounts[1]}개 · 2점 ${scoreCounts[2]}개 · 3점 ${scoreCounts[3]}개`;
    const renderScoreDetail = score => {
      const dpsClass = score.averageDpsReduction > .005 ? 'negative' : score.averageDpsReduction < -.005 ? 'positive' : '';
      const pressureClass = score.median > .005 ? 'negative' : score.median < -.005 ? 'positive' : '';
      const secondWorstClass = score.secondWorst > .005 ? 'negative' : score.secondWorst < -.005 ? 'positive' : '';
      const worstClass = score.worst > .005 ? 'negative' : score.worst < -.005 ? 'positive' : '';
      const biasClass = score.partyBias >= 15 ? 'negative' : score.partyBias >= 5 ? 'warning' : 'positive';
      return `<article class="combo-strength-score-detail grade-${score.grade}"><div class="combo-strength-score-detail-head"><span class="combo-strength-score-badge grade-${score.grade}">${score.grade}점</span><div><b>${score.label}</b><span>${score.setting} · ${score.confidence}</span></div></div><dl><div><dt>평균 DPS 감소</dt><dd class="${dpsClass}">${signedPercent(score.averageDpsReduction)}</dd></div><div><dt>중앙 전투 부담</dt><dd class="${pressureClass}">${signedPercent(score.median)}</dd></div><div><dt>두 번째 최고 부담</dt><dd class="${secondWorstClass}">${signedPercent(score.secondWorst)}</dd></div><div><dt>최고 전투 부담</dt><dd class="${worstClass}">${signedPercent(score.worst)}</dd></div><div><dt>파티 편향</dt><dd class="${biasClass}">${fmt.format(score.partyBias)}%p</dd></div><div><dt>제한시간 초과</dt><dd class="${score.timeoutCount ? 'negative' : 'positive'}">${score.timeoutCount}개 파티</dd></div></dl><p>${singleConstraintReason(score)}</p></article>`;
    };
    $('#comboStrengthScoreGrid').innerHTML = sortedScores.length ? [1, 2, 3].map(grade => {
      const group = sortedScores.filter(score => score.grade === grade);
      if (!group.length) return '';
      return `<section class="combo-strength-score-group grade-${grade}"><header class="combo-strength-score-group-head"><span>${grade}점 제약</span><b>${group.length}개</b></header><div class="combo-strength-score-group-grid">${group.map(renderScoreDetail).join('')}</div></section>`;
    }).join('') : '<div class="combo-strength-empty">선택된 제약이 없습니다.</div>';
  }

  function updateComboConstraint() {
    const state = getComboState(), selected = comboSelectedItems(state), count = selected.length;
    const controls = [
      ['stat', 'comboStatEnabled', 'comboStatReduction', 'comboStatValue', 'combo-stat', `${state.statDisplay}%`], ['normal', 'comboNormalEnabled', 'comboNormalReduction', 'comboNormalValue', 'combo-normal', `${state.normalDisplay}%`], ['skillOther', 'comboSkillOtherEnabled', 'comboBattleReduction', 'comboSkillOtherValue', 'combo-battle', `배틀 스킬 피해 -${state.battleDisplay}% · 기타 피해 +${state.otherDisplay}%`], ['comboSpeed', 'comboComboSpeedEnabled', 'comboComboCooldownReduction', 'comboComboSpeedValue', 'combo-cooldown', `연계 스킬 쿨타임 -${state.comboCooldownDisplay}% · 배틀 스킬 피해 -${state.speedBattleDisplay}%`], ['ultRepeat', 'comboUltRepeatEnabled', 'comboUltRepeatReduction', 'comboUltRepeatValue', 'combo-ult-repeat', `${state.ultRepeatDisplay}%`], ['statusWindow', 'comboStatusWindowEnabled', 'comboStatusWindowDuration', 'comboStatusWindowValue', 'combo-status-duration', `감소 지속 ${state.statusDurationDisplay}초 · 속성 피해 -${state.statusReductionDisplay}%`], ['statusStage', 'comboStatusStageEnabled', 'comboStatusStageDuration', 'comboStatusStageValue', 'combo-status-stage-duration', `부착 지속 ${state.statusStageDurationDisplay}초 · 단계당 피해 -${state.statusStageReductionDisplay}%`], ['statusReapply', 'comboStatusReapplyEnabled', 'comboStatusReapplyInterval', 'comboStatusReapplyValue', 'combo-status-reapply', `재적용 제한 ${state.statusReapplyIntervalDisplay}초`], ['controlRecovery', 'comboControlRecoveryEnabled', 'comboControlRecoveryRate', 'comboControlRecoveryValue', 'combo-control-recovery', `초당 ${state.controlRecoveryRateDisplay}%`], ['hp', 'comboHpEnabled', 'comboHpIncrease', 'comboHpValue', 'combo-hp', `${state.hpDisplay}%`], ['time', 'comboTimeEnabled', 'comboTimeReduction', 'comboTimeValue', 'combo-time', `${state.time}초`]
    ];
    controls.forEach(([key, checkId, rangeId, outId, attr, text]) => { const enabled = $(`#${checkId}`).checked; $(`#${outId}`).value = text; $(`#${rangeId}`).disabled = !enabled; $(`[data-combo-card="${key}"]`).classList.toggle('disabled', !enabled); setPreset(attr, Number($(`#${rangeId}`).value)); });
    setDualOutputLines($('#comboSkillOtherValue'), `배틀 스킬 피해 -${state.battleDisplay}%`, `기타 피해 +${state.otherDisplay}%`);
    setDualOutputLines($('#comboComboSpeedValue'), `연계 스킬 쿨타임 -${state.comboCooldownDisplay}%`, `배틀 스킬 피해 -${state.speedBattleDisplay}%`);
    setDualOutputLines($('#comboStatusWindowValue'), `감소 지속 ${state.statusDurationDisplay}초`, `속성 피해 -${state.statusReductionDisplay}%`);
    setDualOutputLines($('#comboStatusStageValue'), `부착 지속 ${state.statusStageDurationDisplay}초`, `단계당 피해 -${state.statusStageReductionDisplay}%`);
    const battleChillStageLabel = state.battleChillStageDisplay === 2 ? '단계 II' : '단계 I';
    const battleChillCountLabel = state.battleChillStageDisplay === 2 ? '1회마다' : '2회마다';
    const comboChillStageLabel = state.comboChillStageDisplay === 2 ? '단계 II' : '단계 I';
    const comboChillCountLabel = state.comboChillStageDisplay === 2 ? '1회마다' : '2회마다';
    setDualOutputLines($('#comboBattleChillValue'), `${battleChillStageLabel} · ${battleChillCountLabel}`, `부착 쿨타임 ${state.battleChillCooldownDisplay}초`);
    setDualOutputLines($('#comboComboChillValue'), `${comboChillStageLabel} · ${comboChillCountLabel}`, `부착 쿨타임 ${state.comboChillCooldownDisplay}초`);
    [['battleChill','comboBattleChillEnabled','comboBattleChillStage','comboBattleChillCooldown'],['comboChill','comboComboChillEnabled','comboComboChillStage','comboComboChillCooldown']].forEach(([key,checkId,stageId,cooldownId]) => { const enabled = $(`#${checkId}`).checked; $(`#${stageId}`).disabled = !enabled; $(`#${cooldownId}`).disabled = !enabled; $(`[data-combo-card="${key}"]`).classList.toggle('disabled', !enabled); });
    $('#comboBattleChillStageInline').textContent = battleChillStageLabel; $('#comboBattleChillCooldownInline').textContent = `${state.battleChillCooldownDisplay}초`;
    $('#comboComboChillStageInline').textContent = comboChillStageLabel; $('#comboComboChillCooldownInline').textContent = `${state.comboChillCooldownDisplay}초`;
    setPreset('combo-battle-chill-stage', state.battleChillStageDisplay); setPreset('combo-battle-chill-cooldown', state.battleChillCooldownDisplay);
    setPreset('combo-combo-chill-stage', state.comboChillStageDisplay); setPreset('combo-combo-chill-cooldown', state.comboChillCooldownDisplay);
    $('#comboBattleReductionInline').textContent = `${state.battleDisplay}%`; $('#comboOtherIncreaseInline').textContent = `${state.otherDisplay}%`; setPreset('combo-other', state.otherDisplay);
    $('#comboCooldownReductionInline').textContent = `${state.comboCooldownDisplay}%`; $('#comboSpeedBattleReductionInline').textContent = `${state.speedBattleDisplay}%`; $('#comboOtherIncrease').disabled = !state.skillOtherEnabled; $('#comboSpeedBattleReduction').disabled = !state.comboSpeedEnabled; $('#comboStatusWindowReduction').disabled = !state.statusWindowEnabled; setPreset('combo-speed-battle', state.speedBattleDisplay); $('#comboStatusDurationInline').textContent = `${state.statusDurationDisplay}초`; $('#comboStatusReductionInline').textContent = `${state.statusReductionDisplay}%`; setPreset('combo-status-reduction', state.statusReductionDisplay); $('#comboStatusStageDurationInline').textContent = `${state.statusStageDurationDisplay}초`; $('#comboStatusStageReductionInline').textContent = `${state.statusStageReductionDisplay}%`; $('#comboStatusStageDuration').disabled = !state.statusStageEnabled; $('#comboStatusStageReduction').disabled = !state.statusStageEnabled; setPreset('combo-status-stage-reduction', state.statusStageReductionDisplay);
    const stageEnhanceEnabled = $('#comboStageEnhanceEnabled').checked;
    $('#comboStageEnhanceValue').value = `강화 [${state.stageEnhanceLevelDisplay}]`;
    $('[data-combo-card="stageEnhance"]').classList.toggle('disabled', !stageEnhanceEnabled);
    setPreset('combo-stage-enhance', state.stageEnhanceLevelDisplay);
    const highHpCapEnabled = $('#comboHighHpCapEnabled').checked;
    setDualOutputLines($('#comboHighHpCapValue'), `적용 HP ${num0(state.highHpThresholdDisplay)} 이상`, `0.1초 상한 ${state.highHpCapRateDisplay}%`);
    $('#comboHighHpThresholdInline').textContent = num0(state.highHpThresholdDisplay);
    $('#comboHighHpCapInline').textContent = `${state.highHpCapRateDisplay}%`;
    $('#comboHighHpThreshold').disabled = !highHpCapEnabled;
    $('#comboHighHpCapRate').disabled = !highHpCapEnabled;
    $('[data-combo-card="highHpCap"]').classList.toggle('disabled', !highHpCapEnabled);
    setPreset('combo-high-hp-threshold', state.highHpThresholdDisplay);
    setPreset('combo-high-hp-cap', state.highHpCapRateDisplay);
    $('#comboControlRecoveryValue').value = `초당 ${state.controlRecoveryRateDisplay}%`;
    $('#comboSummaryValue').textContent = count ? `${count}개 선택` : '선택 없음';
    $('#comboSummaryChips').innerHTML = selected.slice(0, 3).map(item => `<span>${item.summary}</span>`).join('') + (selected.length > 3 ? `<span>외 ${selected.length - 3}개</span>` : '');
    $('#comboSelectedChips').innerHTML = selected.length ? `<b>현재 적용 조합</b>${selected.map(item => `<span>${item.label}</span>`).join('')}` : '<b>현재 적용 조합</b><span class="empty-chip">선택된 제약 없음</span>';
    const results = parties.map(p => ({ p, result: calculateCombo(p, state) }));
    $('#comboAppliedTimeLimit').textContent = `${results[0].result.limit}초`;
    renderComboStrengthAnalysis(state, results, count);

    results.forEach(({ p, result }) => {
      const root = panel('combo', p), dpsChange = (result.dps / p.dps - 1) * 100, remainingLabel = result.remaining >= 0 ? '남은 시간' : '초과 시간';
      const noConstraintDpsChange = count === 0;
      const dpsChangeText = noConstraintDpsChange ? '+0%' : (dpsChange ? `${dpsChange > 0 ? '+' : ''}${pct(dpsChange)}` : '0%');
      const dpsChangeClass = noConstraintDpsChange ? 'positive' : (dpsChange > 0 ? 'positive' : dpsChange < 0 ? 'negative' : '');
      resultBar(root, p, '', [
        { label: '원본 DPS', value: num(p.dps) }, { label: '조합 적용 DPS', value: num(result.dps) }, { label: 'DPS 변화', value: dpsChangeText, className: dpsChangeClass }, { label: '예상 클리어', value: seconds(result.clear) }, { label: '적용 제한시간', value: `${result.limit}초` }, { label: remainingLabel, value: seconds(Math.abs(result.remaining)), className: result.remaining < 0 ? 'negative' : 'positive' }
      ]);
      $('[data-role="comboOverview"]', root).innerHTML = `<h4>종합 결과</h4><div class="compact-row"><span>선택 제약</span><b>${count}개</b></div><div class="compact-row"><span>원본 DPS</span><b>${num(p.dps)}</b></div><div class="compact-row"><span>조합 적용 DPS</span><b>${num(result.dps)}</b></div><div class="compact-row"><span>DPS 변화</span><b class="${dpsChangeClass}">${dpsChangeText}</b></div><div class="compact-row"><span>원본 분석 시간</span><b>${seconds(p.duration)}</b></div><div class="compact-row"><span>조합 분석 시간</span><b class="${result.duration > p.duration + statusEpsilon ? 'negative' : ''}">${seconds(result.duration)}</b></div><div class="compact-row"><span>냉기 스택 부착</span><b>${result.chill.attachedCount}회</b></div><div class="compact-row"><span>동결·행동 지연</span><b class="${result.chill.freezeCount ? 'negative' : ''}">${result.chill.freezeCount}회 · ${seconds(result.chill.totalDelay)}</b></div><div class="compact-row"><span>원본 총피해</span><b>${num0(p.totalDamage)}</b></div><div class="compact-row"><span>조합 총피해</span><b>${num0(result.totalDamage)}</b></div><div class="compact-row"><span>원본 스테이지 HP</span><b>${num0(totalStageHp())}</b></div><div class="compact-row"><span>조합 스테이지 HP</span><b>${num0(result.stageHp)}</b></div><div class="compact-row"><span>조합 예상 클리어</span><b>${seconds(result.clear)}</b></div><div class="compact-row"><span>적용 제한시간</span><b>${result.limit}초</b></div><div class="compact-row"><span>${remainingLabel}</span><b class="${result.remaining < 0 ? 'negative' : 'positive'}">${seconds(Math.abs(result.remaining))}</b></div>`;
      const adjusted = adjustedCurve(p, state, result), lost = p.totalDamage - result.totalDamage;
      const damageUnchanged = Math.abs(lost) < 0.5;
      const timeChanged = Math.abs(result.duration - p.duration) > statusEpsilon;
      const originalCurve = extendedCurve(p.curve, result.duration, p.totalDamage);
      if (damageUnchanged && !timeChanged) {
        renderLegendItems($('[data-role="comboCurveLegend"]', root), [{ label: `원본 누적 피해 · ${num0(p.totalDamage)}`, color: '#283441' }]);
        renderCumulative($('[data-role="comboCurve"]', root), [{ color: '#283441', points: p.curve }], p.duration);
        $('[data-role="comboCurveContext"]', root).textContent = '피해량·행동 시간 변화 없음 · 원본 선만 표시';
      } else {
        renderLegendItems($('[data-role="comboCurveLegend"]', root), [{ label: `원본 · ${num(p.duration)}초`, color: '#283441' }, { label: `조합 적용 · ${num(result.duration)}초`, color: '#586cc8' }]);
        renderCumulative($('[data-role="comboCurve"]', root), [{ color: '#283441', points: originalCurve }, { color: '#586cc8', points: adjusted }], result.duration);
        $('[data-role="comboCurveContext"]', root).textContent = timeChanged && damageUnchanged ? '원본 피해량 유지 · 행동 대기시간 반영' : '공격 피해와 행동 시간 실시간 갱신';
      }
      $('[data-role="comboCurveDelta"]', root).textContent = timeChanged && damageUnchanged
        ? `피해 ±0 · 시간 +${num(result.duration - p.duration)}초`
        : `${lost > 0 ? '-' : lost < 0 ? '+' : ''}${num0(Math.abs(lost))} · ${lost > 0 ? '-' : lost < 0 ? '+' : ''}${pct(Math.abs(lost) / p.totalDamage * 100)}`;
      $('[data-role="comboCurveMetrics"]', root).innerHTML = [['원본 총피해', num0(p.totalDamage), ''], ['조합 총피해', num0(result.totalDamage), lost < 0 ? 'positive' : ''], ['원본 분석 시간', seconds(p.duration), ''], ['조합 분석 시간', seconds(result.duration), timeChanged ? 'negative' : '']].map(([l, v, c]) => `<div><span>${l}</span><b class="${c}">${v}</b></div>`).join('');
      const contributionRows = [];
      if (state.statEnabled) { const without = calculateCombo(p, { ...state, statEnabled: false }); const loss = without.dps - result.dps; contributionRows.push(contributionRow('주요 능력치 감소', `조합 DPS -${num(loss)} · 원본 대비 ${pct(loss / p.dps * 100)}`, loss / p.dps * 220, 'attack')); }
      if (state.normalEnabled) { const without = calculateCombo(p, { ...state, normalEnabled: false }); const loss = without.dps - result.dps; contributionRows.push(contributionRow('일반 공격 피해 감소', `조합 DPS -${num(loss)} · 원본 대비 ${pct(loss / p.dps * 100)}`, loss / p.dps * 220, 'attack')); }
      if (state.skillOtherEnabled) { const without = calculateCombo(p, { ...state, skillOtherEnabled: false }); const delta = result.dps - without.dps; contributionRows.push(contributionRow('배틀 스킬 감소 · 기타 피해 증가', `조합 DPS ${delta >= 0 ? '+' : ''}${num(delta)} · 원본 대비 ${delta >= 0 ? '+' : ''}${pct(delta / p.dps * 100)}`, Math.abs(delta) / p.dps * 220, delta >= 0 ? 'stage' : 'attack')); }
      if (state.comboSpeedEnabled) { const without = calculateCombo(p, { ...state, comboSpeedEnabled: false }); const delta = result.dps - without.dps; contributionRows.push(contributionRow('연계 재사용 감소 · 배틀 스킬 감소', `추가 연계 ${result.comboSpeed.extraUses}회 · 조합 DPS ${delta >= 0 ? '+' : ''}${num(delta)}`, Math.abs(delta) / p.dps * 220, delta >= 0 ? 'stage' : 'attack')); }
      if (state.statusWindowEnabled) { const without = calculateCombo(p, { ...state, statusWindowEnabled: false }); const loss = without.dps - result.dps; contributionRows.push(contributionRow('상태 부여 후 속성 피해 감소', result.statusWindow.applications.length ? `상태 ${result.statusWindow.applications.length}회 · 조합 DPS -${num(loss)}` : '상태 기록 없음 · 변화 없음', loss / p.dps * 220, 'attack')); }
      if (state.statusStageEnabled) { const without = calculateCombo(p, { ...state, statusStageEnabled: false }); const loss = without.dps - result.dps; contributionRows.push(contributionRow('상태 단계당 대응 피해 감소', result.statusStage.applications.length ? `최고 ${result.statusStage.maxStage}단계 · 초기화 ${result.statusStage.consumptions.length}회 · 조합 DPS -${num(loss)}` : '상태 기록 없음 · 변화 없음', loss / p.dps * 220, 'attack')); }
      if (state.statusReapplyEnabled) { const without = calculateCombo(p, { ...state, statusReapplyEnabled: false }); const loss = without.dps - result.dps; contributionRows.push(contributionRow('방어불능·동일 아츠부착 재적용 제한', result.statusReapply.delayedActions.length ? `대기 ${result.statusReapply.delayedActions.length}회 · 분석 시간 +${num(result.duration - without.duration)}초 · 조합 DPS -${num(loss)}` : '추가 대기 없음 · 변화 없음', loss / p.dps * 220, 'attack')); }
      if (state.battleChillEnabled) { const without = calculateCombo(p, { ...state, battleChillEnabled: false }); const loss = without.dps - result.dps; const info = result.chill.perConstraint.battle; contributionRows.push(contributionRow('배틀 스킬 냉기 부착', `부착 ${info.attached}회 · 동결 ${result.chill.freezeCount}회 · 행동 지연 ${seconds(result.chill.totalDelay)} · 조합 DPS -${num(Math.max(0, loss))}`, Math.max(0, loss) / p.dps * 220, 'attack')); }
      if (state.comboChillEnabled) { const without = calculateCombo(p, { ...state, comboChillEnabled: false }); const loss = without.dps - result.dps; const info = result.chill.perConstraint.combo; contributionRows.push(contributionRow('연계 스킬 냉기 부착', `부착 ${info.attached}회 · 동결 ${result.chill.freezeCount}회 · 행동 지연 ${seconds(result.chill.totalDelay)} · 조합 DPS -${num(Math.max(0, loss))}`, Math.max(0, loss) / p.dps * 220, 'attack')); }
      if (state.ultRepeatEnabled) { const without = calculateCombo(p, { ...state, ultRepeatEnabled: false }); const loss = without.dps - result.dps; contributionRows.push(contributionRow('궁극기 반복 피해 감소', loss > 0 ? `조합 DPS -${num(loss)} · 원본 대비 ${pct(loss / p.dps * 100)}` : '반복 궁극기 없음 · 변화 없음', loss / p.dps * 220, 'attack')); }
      if (state.stageEnhanceEnabled) { const without = calculateCombo(p, { ...state, stageEnhanceEnabled: false }); const extra = result.clear - without.clear; contributionRows.push(contributionRow('지정 웨이브 몬스터 체력 강화', `강화 [${state.stageEnhanceLevelDisplay}] · 대상 ${result.stageEnhance.targets.length}마리 · 예상 클리어 +${num(extra)}초`, extra / Math.max(clearEstimate(p), 1) * 100, 'stage')); }
      if (state.highHpCapEnabled) { const without = calculateCombo(p, { ...state, highHpCapEnabled: false }); const loss = without.dps - result.dps; contributionRows.push(contributionRow('고체력 적 0.1초 피해 상한', result.highHpCap.cappedBucketCount ? `상한 ${result.highHpCap.cappedBucketCount}구간 · 조합 DPS -${num(loss)}` : '상한 초과 구간 없음 · 변화 없음', loss / p.dps * 220, 'attack')); }
      if (state.controlRecoveryEnabled) { const without = calculateCombo(p, { ...state, controlRecoveryEnabled: false }); const loss = without.dps - result.dps; const info = result.controlRecovery; contributionRows.push(contributionRow('제어 상태 중 몬스터 체력 회복', info.intervals.length ? `${info.selectedLabel} · 유지 시 회복 ${num0(info.actualRecovery)} · 조합 DPS -${num(loss)}` : '제어 태그 기록 없음 · 변화 없음', Math.abs(loss) / p.dps * 220, info.selectedBehavior === 'avoid' ? 'stage' : 'attack')); }
      if (state.hpEnabled) { const without = calculateCombo(p, { ...state, hpEnabled: false }); const extra = result.clear - without.clear; contributionRows.push(contributionRow('몬스터 최대 체력 증가', `예상 클리어 시간 +${num(extra)}초`, extra / Math.max(clearEstimate(p), 1) * 100, 'stage')); }
      if (state.timeEnabled) contributionRows.push(contributionRow('클리어 제한시간 감소', `허용시간 -${state.time}초`, state.time / model.baseTimeLimit * 100, 'time'));
      $('[data-role="comboContributions"]', root).innerHTML = contributionRows.length ? contributionRows.join('') : '<div class="combo-empty">선택된 제약이 없어 조합 내 영향이 없습니다.</div>';
      renderLegendItems($('[data-role="comboTimeLegend"]', root), [{ label: `원본 예상 클리어 · ${num(clearEstimate(p))}초`, color: '#283441' }, { label: `조합 예상 클리어 · ${num(result.clear)}초`, color: '#586cc8' }, { label: `조합 적용 제한시간 · ${result.limit}초`, color: '#d7553e' }]);
      renderComboTimeChart($('[data-role="comboTimeChart"]', root), p, result);
      const extra = result.clear - clearEstimate(p);
      $('[data-role="comboTimeDelta"]', root).textContent = `${extra >= 0 ? '+' : ''}${num(extra)}초`;
      $('[data-role="comboTimeDelta"]', root).className = `combo-chart-delta ${extra > 0 ? 'negative' : extra < 0 ? 'positive' : 'neutral'}`;
      $('[data-role="comboTimeMetrics"]', root).innerHTML = [['원본 예상 클리어', seconds(clearEstimate(p)), ''], ['조합 예상 클리어', seconds(result.clear), extra > 0 ? 'negative' : ''], ['적용 제한시간', `${result.limit}초`, ''], [remainingLabel, seconds(Math.abs(result.remaining)), result.remaining < 0 ? 'negative' : 'positive']].map(([l, v, c]) => `<div><span>${l}</span><b class="${c}">${v}</b></div>`).join('');
      renderComboInteractions($('[data-role="comboInteractions"]', root), state);
      const parts = [];
      if (!count) parts.push('선택된 제약이 없어 원본 파티 DPS와 스테이지 조건이 그대로 유지됩니다.');
      if (state.statEnabled || state.normalEnabled || state.skillOtherEnabled || state.comboSpeedEnabled || state.ultRepeatEnabled || state.statusWindowEnabled || state.statusStageEnabled || state.statusReapplyEnabled || state.battleChillEnabled || state.comboChillEnabled || state.highHpCapEnabled || state.controlRecoveryEnabled) parts.push(`공격 관련 제약으로 ${p.name}의 DPS가 ${num(p.dps)}에서 ${num(result.dps)}로 변경되었습니다.`);
      if (state.hpEnabled || state.stageEnhanceEnabled) parts.push(`몬스터 체력 관련 제약으로 처리해야 하는 스테이지 HP가 ${num0(result.stageHp)}가 되었습니다.`);
      if (state.timeEnabled) parts.push(`클리어 제한시간은 ${result.limit}초입니다.`);
      parts.push(result.remaining < 0 ? `예상 클리어 시간이 적용 제한시간을 ${num(Math.abs(result.remaining))}초 초과합니다.` : `현재 단순 환산 모델에서는 ${num(result.remaining)}초의 예상 여유가 남습니다.`);
      $('[data-role="comboImpact"]', root).textContent = parts.join(' ');
    });
    syncComboQuickFromMain();
    applyHighlightState();
  }

  function bindComboQuickDrawer() {
    const drawer = $('#comboQuickDrawer');
    const launcher = $('#comboQuickLauncher');
    const closeButton = $('#comboQuickClose');
    const handle = $('#comboQuickDragHandle');
    const selectionResetButton = $('#comboQuickSelectionReset');
    if (!drawer || !launcher || !closeButton || !handle) return;

    selectionResetButton?.addEventListener('click', event => {
      event.preventDefault();
      resetComboSelections();
    });

    const positionKey = 'endfield-combo-quick-drawer-position-v2';
    const mapping = [
      { key: 'stat', mainCheck: 'comboStatEnabled', mainRange: 'comboStatReduction', popupCheck: 'popupComboStatEnabled', popupRange: 'popupComboStatReduction' },
      { key: 'normal', mainCheck: 'comboNormalEnabled', mainRange: 'comboNormalReduction', popupCheck: 'popupComboNormalEnabled', popupRange: 'popupComboNormalReduction' },
      { key: 'ultRepeat', attr: 'ult-repeat', mainCheck: 'comboUltRepeatEnabled', mainRange: 'comboUltRepeatReduction', popupCheck: 'popupComboUltRepeatEnabled', popupRange: 'popupComboUltRepeatReduction' },
      { key: 'controlRecovery', attr: 'control-recovery', mainCheck: 'comboControlRecoveryEnabled', mainRange: 'comboControlRecoveryRate', popupCheck: 'popupComboControlRecoveryEnabled', popupRange: 'popupComboControlRecoveryRate' },
      { key: 'hp', mainCheck: 'comboHpEnabled', mainRange: 'comboHpIncrease', popupCheck: 'popupComboHpEnabled', popupRange: 'popupComboHpIncrease' },
      { key: 'time', mainCheck: 'comboTimeEnabled', mainRange: 'comboTimeReduction', popupCheck: 'popupComboTimeEnabled', popupRange: 'popupComboTimeReduction' }
    ];

    function applyPopupToMain(item, enableOnValue = false) {
      $(`#${item.mainCheck}`).checked = $(`#${item.popupCheck}`).checked || enableOnValue;
      $(`#${item.mainRange}`).value = $(`#${item.popupRange}`).value;
      updateComboConstraint();
    }

    mapping.forEach(item => {
      $(`#${item.popupCheck}`).addEventListener('change', () => applyPopupToMain(item));
      $(`#${item.popupRange}`).addEventListener('input', () => applyPopupToMain(item, true));
      $$(`[data-popup-combo-${item.attr || item.key}]`).forEach(button => button.addEventListener('click', event => {
        event.preventDefault();
        $(`#${item.popupRange}`).value = button.getAttribute(`data-popup-combo-${item.attr || item.key}`);
        $(`#${item.popupCheck}`).checked = true;
        applyPopupToMain(item, true);
      }));
    });

    function applySkillOtherPopup(enableOnValue = false) {
      const wantsEnable = $('#popupComboSkillOtherEnabled').checked || enableOnValue;
      if (wantsEnable && $('#comboComboSpeedEnabled').checked) {
        $('#popupComboSkillOtherEnabled').checked = false;
        showExclusiveModal();
        syncComboQuickFromMain();
        return false;
      }
      $('#comboSkillOtherEnabled').checked = wantsEnable;
      $('#comboBattleReduction').value = $('#popupComboBattleReduction').value;
      $('#comboOtherIncrease').value = $('#popupComboOtherIncrease').value;
      updateComboConstraint();
      return true;
    }
    $('#popupComboSkillOtherEnabled').addEventListener('change', () => applySkillOtherPopup());
    ['popupComboBattleReduction','popupComboOtherIncrease'].forEach(id => $(`#${id}`).addEventListener('input', () => applySkillOtherPopup(true)));
    [['battle','popupComboBattleReduction'],['other','popupComboOtherIncrease']].forEach(([key,id]) => $$(`[data-popup-combo-${key}]`).forEach(button => button.addEventListener('click', event => {
      event.preventDefault();
      if (!$('#popupComboSkillOtherEnabled').checked && $('#comboComboSpeedEnabled').checked) { showExclusiveModal(); syncComboQuickFromMain(); return; }
      $(`#${id}`).value = button.getAttribute(`data-popup-combo-${key}`);
      $('#popupComboSkillOtherEnabled').checked = true;
      applySkillOtherPopup(true);
    })));

    function applyComboSpeedPopup(enableOnValue = false) {
      const wantsEnable = $('#popupComboComboSpeedEnabled').checked || enableOnValue;
      if (wantsEnable && $('#comboSkillOtherEnabled').checked) {
        $('#popupComboComboSpeedEnabled').checked = false;
        showExclusiveModal();
        syncComboQuickFromMain();
        return false;
      }
      $('#comboComboSpeedEnabled').checked = wantsEnable;
      $('#comboComboCooldownReduction').value = $('#popupComboComboCooldownReduction').value;
      $('#comboSpeedBattleReduction').value = $('#popupComboSpeedBattleReduction').value;
      updateComboConstraint();
      return true;
    }
    $('#popupComboComboSpeedEnabled').addEventListener('change', () => applyComboSpeedPopup());
    ['popupComboComboCooldownReduction','popupComboSpeedBattleReduction'].forEach(id => $(`#${id}`).addEventListener('input', () => applyComboSpeedPopup(true)));
    [['cooldown','popupComboComboCooldownReduction'],['speed-battle','popupComboSpeedBattleReduction']].forEach(([key,id]) => $$(`[data-popup-combo-${key}]`).forEach(button => button.addEventListener('click', event => {
      event.preventDefault();
      if (!$('#popupComboComboSpeedEnabled').checked && $('#comboSkillOtherEnabled').checked) { showExclusiveModal(); syncComboQuickFromMain(); return; }
      $(`#${id}`).value = button.getAttribute(`data-popup-combo-${key}`);
      $('#popupComboComboSpeedEnabled').checked = true;
      applyComboSpeedPopup(true);
    })));



    function applyStatusWindowPopup(enableOnValue = false) {
      const wantsEnable = $('#popupComboStatusWindowEnabled').checked || enableOnValue;
      $('#comboStatusWindowEnabled').checked = wantsEnable;
      $('#comboStatusWindowDuration').value = $('#popupComboStatusWindowDuration').value;
      $('#comboStatusWindowReduction').value = $('#popupComboStatusWindowReduction').value;
      updateComboConstraint();
    }
    $('#popupComboStatusWindowEnabled').addEventListener('change', () => applyStatusWindowPopup());
    ['popupComboStatusWindowDuration','popupComboStatusWindowReduction'].forEach(id => $(`#${id}`).addEventListener('input', () => applyStatusWindowPopup(true)));
    [['status-duration','popupComboStatusWindowDuration'],['status-reduction','popupComboStatusWindowReduction']].forEach(([key,id]) => $$(`[data-popup-combo-${key}]`).forEach(button => button.addEventListener('click', event => {
      event.preventDefault();
      $(`#${id}`).value = button.getAttribute(`data-popup-combo-${key}`);
      $('#popupComboStatusWindowEnabled').checked = true;
      applyStatusWindowPopup(true);
    })));

    function applyStatusStagePopup(enableOnValue = false) {
      const wantsEnable = $('#popupComboStatusStageEnabled').checked || enableOnValue;
      $('#comboStatusStageEnabled').checked = wantsEnable;
      $('#comboStatusStageDuration').value = $('#popupComboStatusStageDuration').value;
      $('#comboStatusStageReduction').value = $('#popupComboStatusStageReduction').value;
      updateComboConstraint();
    }
    $('#popupComboStatusStageEnabled').addEventListener('change', () => applyStatusStagePopup());
    ['popupComboStatusStageDuration','popupComboStatusStageReduction'].forEach(id => $(`#${id}`).addEventListener('input', () => applyStatusStagePopup(true)));
    [['status-stage-duration','popupComboStatusStageDuration'],['status-stage-reduction','popupComboStatusStageReduction']].forEach(([key,id]) => $$(`[data-popup-combo-${key}]`).forEach(button => button.addEventListener('click', event => {
      event.preventDefault();
      $(`#${id}`).value = button.getAttribute(`data-popup-combo-${key}`);
      $('#popupComboStatusStageEnabled').checked = true;
      applyStatusStagePopup(true);
    })));

    function applyStatusReapplyPopup(enableOnValue = false) {
      const wantsEnable = $('#popupComboStatusReapplyEnabled').checked || enableOnValue;
      $('#comboStatusReapplyEnabled').checked = wantsEnable;
      $('#comboStatusReapplyInterval').value = $('#popupComboStatusReapplyInterval').value;
      updateComboConstraint();
    }
    $('#popupComboStatusReapplyEnabled').addEventListener('change', () => applyStatusReapplyPopup());
    $('#popupComboStatusReapplyInterval').addEventListener('input', () => applyStatusReapplyPopup(true));
    $$('[data-popup-combo-status-reapply]').forEach(button => button.addEventListener('click', event => {
      event.preventDefault();
      $('#popupComboStatusReapplyInterval').value = button.getAttribute('data-popup-combo-status-reapply');
      $('#popupComboStatusReapplyEnabled').checked = true;
      applyStatusReapplyPopup(true);
    }));


    function bindChillPopup(kind) {
      const cap = kind === 'battle' ? 'Battle' : 'Combo';
      const attr = kind === 'battle' ? 'battle' : 'combo';
      const mainCheck = `combo${cap}ChillEnabled`;
      const mainStage = `combo${cap}ChillStage`;
      const mainCooldown = `combo${cap}ChillCooldown`;
      const popupCheck = `popupCombo${cap}ChillEnabled`;
      const popupStage = `popupCombo${cap}ChillStage`;
      const popupCooldown = `popupCombo${cap}ChillCooldown`;
      const apply = enableOnValue => {
        $(`#${mainCheck}`).checked = $(`#${popupCheck}`).checked || enableOnValue;
        $(`#${mainStage}`).value = $(`#${popupStage}`).value;
        $(`#${mainCooldown}`).value = $(`#${popupCooldown}`).value;
        updateComboConstraint();
      };
      $(`#${popupCheck}`).addEventListener('change', () => apply(false));
      [$(`#${popupStage}`), $(`#${popupCooldown}`)].forEach(input => input.addEventListener('input', () => apply(true)));
      [[`stage`, popupStage], [`cooldown`, popupCooldown]].forEach(([key,id]) => $$(`[data-popup-combo-${attr}-chill-${key}]`).forEach(button => button.addEventListener('click', event => {
        event.preventDefault();
        $(`#${id}`).value = button.getAttribute(`data-popup-combo-${attr}-chill-${key}`);
        $(`#${popupCheck}`).checked = true;
        apply(true);
      })));
    }
    bindChillPopup('battle');
    bindChillPopup('combo');

    function applyStageEnhancePopup(enableOnValue = false) {
      const wantsEnable = $('#popupComboStageEnhanceEnabled').checked || enableOnValue;
      $('#comboStageEnhanceEnabled').checked = wantsEnable;
      $('#comboStageEnhanceLevel').value = $('#popupComboStageEnhanceLevel').value;
      updateComboConstraint();
    }
    $('#popupComboStageEnhanceEnabled').addEventListener('change', () => applyStageEnhancePopup());
    $$('[data-popup-combo-stage-enhance]').forEach(button => button.addEventListener('click', event => {
      event.preventDefault();
      $('#popupComboStageEnhanceLevel').value = button.getAttribute('data-popup-combo-stage-enhance');
      $('#popupComboStageEnhanceEnabled').checked = true;
      applyStageEnhancePopup(true);
    }));


    function applyHighHpCapPopup(enableOnValue = false) {
      const wantsEnable = $('#popupComboHighHpCapEnabled').checked || enableOnValue;
      $('#comboHighHpCapEnabled').checked = wantsEnable;
      $('#comboHighHpThreshold').value = $('#popupComboHighHpThreshold').value;
      $('#comboHighHpCapRate').value = $('#popupComboHighHpCapRate').value;
      updateComboConstraint();
    }
    $('#popupComboHighHpCapEnabled').addEventListener('change', () => applyHighHpCapPopup());
    ['popupComboHighHpThreshold','popupComboHighHpCapRate'].forEach(id => $(`#${id}`).addEventListener('input', () => applyHighHpCapPopup(true)));
    [['high-hp-threshold','popupComboHighHpThreshold'],['high-hp-cap','popupComboHighHpCapRate']].forEach(([key,id]) => $$(`[data-popup-combo-${key}]`).forEach(button => button.addEventListener('click', event => {
      event.preventDefault();
      $(`#${id}`).value = button.getAttribute(`data-popup-combo-${key}`);
      $('#popupComboHighHpCapEnabled').checked = true;
      applyHighHpCapPopup(true);
    })));

    function clamp(left, top, width, height) {
      const margin = 8;
      const availableWidth = Math.max(300, window.innerWidth - margin * 2);
      const preferredMinWidth = Math.min(560, availableWidth);
      const safeWidth = Math.min(Math.max(preferredMinWidth, width), availableWidth);
      const safeHeight = Math.min(Math.max(260, height), Math.max(260, window.innerHeight - margin * 2));
      return {
        left: Math.min(Math.max(margin, left), Math.max(margin, window.innerWidth - safeWidth - margin)),
        top: Math.min(Math.max(margin, top), Math.max(margin, window.innerHeight - safeHeight - margin)),
        width: safeWidth, height: safeHeight
      };
    }

    function savePosition() {
      if (drawer.hidden || !drawer.classList.contains('is-positioned')) return;
      const rect = drawer.getBoundingClientRect();
      try { localStorage.setItem(positionKey, JSON.stringify({ left: rect.left, top: rect.top, width: rect.width, height: rect.height })); } catch (_) {}
    }

    function restorePosition() {
      let saved = null;
      try { saved = JSON.parse(localStorage.getItem(positionKey) || 'null'); } catch (_) {}
      if (!saved || !Number.isFinite(saved.left) || !Number.isFinite(saved.top)) return;
      const rect = drawer.getBoundingClientRect();
      const next = clamp(saved.left, saved.top, saved.width || rect.width, saved.height || rect.height);
      drawer.classList.add('is-positioned');
      drawer.style.left = `${next.left}px`; drawer.style.top = `${next.top}px`;
      drawer.style.right = 'auto'; drawer.style.bottom = 'auto';
      drawer.style.width = `${next.width}px`; drawer.style.height = `${next.height}px`;
    }

    function openDrawer() {
      drawer.hidden = false;
      launcher.setAttribute('aria-expanded', 'true');
      launcher.setAttribute('aria-label', '제약 조합 빠른 조정 닫기');
      syncComboQuickFromMain();
      requestAnimationFrame(restorePosition);
    }
    function closeDrawer() {
      savePosition();
      drawer.hidden = true;
      launcher.setAttribute('aria-expanded', 'false');
      launcher.setAttribute('aria-label', '제약 조합 빠른 조정 열기');
    }
    launcher.addEventListener('click', () => drawer.hidden ? openDrawer() : closeDrawer());
    closeButton.addEventListener('click', closeDrawer);

    handle.addEventListener('pointerdown', event => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      event.preventDefault(); event.stopPropagation();
      const rect = drawer.getBoundingClientRect();
      const initial = clamp(rect.left, rect.top, rect.width, rect.height);
      drawer.classList.add('is-positioned', 'is-dragging');
      document.body.classList.add('combo-quick-dragging');
      Object.assign(drawer.style, { left: `${initial.left}px`, top: `${initial.top}px`, right: 'auto', bottom: 'auto', width: `${initial.width}px`, height: `${initial.height}px` });
      const pointerId = event.pointerId;
      const offsetX = event.clientX - initial.left, offsetY = event.clientY - initial.top;
      handle.setPointerCapture?.(pointerId);
      const move = moveEvent => {
        if (moveEvent.pointerId !== pointerId) return;
        const next = clamp(moveEvent.clientX - offsetX, moveEvent.clientY - offsetY, initial.width, initial.height);
        drawer.style.left = `${next.left}px`; drawer.style.top = `${next.top}px`;
        moveEvent.preventDefault();
      };
      const end = endEvent => {
        if (endEvent.pointerId !== pointerId) return;
        handle.releasePointerCapture?.(pointerId);
        handle.removeEventListener('pointermove', move);
        handle.removeEventListener('pointerup', end);
        handle.removeEventListener('pointercancel', end);
        drawer.classList.remove('is-dragging');
        document.body.classList.remove('combo-quick-dragging');
        savePosition();
      };
      handle.addEventListener('pointermove', move);
      handle.addEventListener('pointerup', end);
      handle.addEventListener('pointercancel', end);
    });

    window.addEventListener('resize', () => {
      if (drawer.hidden || !drawer.classList.contains('is-positioned')) return;
      const rect = drawer.getBoundingClientRect();
      const next = clamp(rect.left, rect.top, rect.width, rect.height);
      Object.assign(drawer.style, { left: `${next.left}px`, top: `${next.top}px`, width: `${next.width}px`, height: `${next.height}px` });
      savePosition();
    });
  }

  function syncComboQuickFromMain() {
    const drawer = $('#comboQuickDrawer');
    if (!drawer) return;
    const items = [
      { key:'stat', attr:'stat', mainCheck:'comboStatEnabled', mainRange:'comboStatReduction', popupCheck:'popupComboStatEnabled', popupRange:'popupComboStatReduction', popupOutput:'popupComboStatValue', unit:'%' },
      { key:'normal', attr:'normal', mainCheck:'comboNormalEnabled', mainRange:'comboNormalReduction', popupCheck:'popupComboNormalEnabled', popupRange:'popupComboNormalReduction', popupOutput:'popupComboNormalValue', unit:'%' },
      { key:'ultRepeat', attr:'ult-repeat', mainCheck:'comboUltRepeatEnabled', mainRange:'comboUltRepeatReduction', popupCheck:'popupComboUltRepeatEnabled', popupRange:'popupComboUltRepeatReduction', popupOutput:'popupComboUltRepeatValue', unit:'%' },
      { key:'controlRecovery', attr:'control-recovery', mainCheck:'comboControlRecoveryEnabled', mainRange:'comboControlRecoveryRate', popupCheck:'popupComboControlRecoveryEnabled', popupRange:'popupComboControlRecoveryRate', popupOutput:'popupComboControlRecoveryValue', unit:'%' },
      { key:'hp', attr:'hp', mainCheck:'comboHpEnabled', mainRange:'comboHpIncrease', popupCheck:'popupComboHpEnabled', popupRange:'popupComboHpIncrease', popupOutput:'popupComboHpValue', unit:'%' },
      { key:'time', attr:'time', mainCheck:'comboTimeEnabled', mainRange:'comboTimeReduction', popupCheck:'popupComboTimeEnabled', popupRange:'popupComboTimeReduction', popupOutput:'popupComboTimeValue', unit:'초' }
    ];
    items.forEach(({ key, attr, mainCheck, mainRange, popupCheck, popupRange, popupOutput, unit }) => {
      const enabled = $(`#${mainCheck}`).checked;
      const value = Number($(`#${mainRange}`).value);
      $(`#${popupCheck}`).checked = enabled;
      $(`#${popupRange}`).value = value;
      $(`#${popupRange}`).disabled = !enabled;
      $(`#${popupOutput}`).value = key === 'controlRecovery' ? `초당 ${value}%` : `${value}${unit}`;
      $(`[data-popup-combo-card="${key}"]`).classList.toggle('disabled', !enabled);
      $$(`[data-popup-combo-${attr}]`).forEach(button => button.classList.toggle('active', Number(button.getAttribute(`data-popup-combo-${attr}`)) === value));
    });
    const skillEnabled = $('#comboSkillOtherEnabled').checked, battleValue = Number($('#comboBattleReduction').value), otherValue = Number($('#comboOtherIncrease').value);
    $('#popupComboSkillOtherEnabled').checked = skillEnabled;
    $('#popupComboBattleReduction').value = battleValue;
    $('#popupComboOtherIncrease').value = otherValue;
    $('#popupComboBattleReduction').disabled = !skillEnabled;
    $('#popupComboOtherIncrease').disabled = !skillEnabled;
    setDualOutputLines($('#popupComboSkillOtherValue'), `배틀 스킬 피해 -${battleValue}%`, `기타 피해 +${otherValue}%`);
    $('#popupComboBattleReductionInline').textContent = `${battleValue}%`;
    $('#popupComboOtherIncreaseInline').textContent = `${otherValue}%`;
    $('[data-popup-combo-card="skillOther"]').classList.toggle('disabled', !skillEnabled);
    $$('[data-popup-combo-battle]').forEach(button => button.classList.toggle('active', Number(button.getAttribute('data-popup-combo-battle')) === battleValue));
    $$('[data-popup-combo-other]').forEach(button => button.classList.toggle('active', Number(button.getAttribute('data-popup-combo-other')) === otherValue));

    const speedEnabled = $('#comboComboSpeedEnabled').checked, cooldownValue = Number($('#comboComboCooldownReduction').value), speedBattleValue = Number($('#comboSpeedBattleReduction').value);
    $('#popupComboComboSpeedEnabled').checked = speedEnabled;
    $('#popupComboComboCooldownReduction').value = cooldownValue;
    $('#popupComboSpeedBattleReduction').value = speedBattleValue;
    $('#popupComboComboCooldownReduction').disabled = !speedEnabled;
    $('#popupComboSpeedBattleReduction').disabled = !speedEnabled;
    setDualOutputLines($('#popupComboComboSpeedValue'), `연계 스킬 쿨타임 -${cooldownValue}%`, `배틀 스킬 피해 -${speedBattleValue}%`);
    $('#popupComboCooldownReductionInline').textContent = `${cooldownValue}%`;
    $('#popupComboSpeedBattleReductionInline').textContent = `${speedBattleValue}%`;
    $('[data-popup-combo-card="comboSpeed"]').classList.toggle('disabled', !speedEnabled);
    $$('[data-popup-combo-cooldown]').forEach(button => button.classList.toggle('active', Number(button.getAttribute('data-popup-combo-cooldown')) === cooldownValue));
    $$('[data-popup-combo-speed-battle]').forEach(button => button.classList.toggle('active', Number(button.getAttribute('data-popup-combo-speed-battle')) === speedBattleValue));



    const statusEnabled = $('#comboStatusWindowEnabled').checked, statusDuration = Number($('#comboStatusWindowDuration').value), statusReduction = Number($('#comboStatusWindowReduction').value);
    $('#popupComboStatusWindowEnabled').checked = statusEnabled;
    $('#popupComboStatusWindowDuration').value = statusDuration;
    $('#popupComboStatusWindowReduction').value = statusReduction;
    $('#popupComboStatusWindowDuration').disabled = !statusEnabled;
    $('#popupComboStatusWindowReduction').disabled = !statusEnabled;
    setDualOutputLines($('#popupComboStatusWindowValue'), `감소 지속 ${statusDuration}초`, `속성 피해 -${statusReduction}%`);
    $('#popupComboStatusDurationInline').textContent = `${statusDuration}초`;
    $('#popupComboStatusReductionInline').textContent = `${statusReduction}%`;
    $('[data-popup-combo-card="statusWindow"]').classList.toggle('disabled', !statusEnabled);
    $$('[data-popup-combo-status-duration]').forEach(button => button.classList.toggle('active', Number(button.getAttribute('data-popup-combo-status-duration')) === statusDuration));
    $$('[data-popup-combo-status-reduction]').forEach(button => button.classList.toggle('active', Number(button.getAttribute('data-popup-combo-status-reduction')) === statusReduction));

    const stageEnabled = $('#comboStatusStageEnabled').checked, stageDuration = Number($('#comboStatusStageDuration').value), stageReduction = Number($('#comboStatusStageReduction').value);
    $('#popupComboStatusStageEnabled').checked = stageEnabled;
    $('#popupComboStatusStageDuration').value = stageDuration;
    $('#popupComboStatusStageReduction').value = stageReduction;
    $('#popupComboStatusStageDuration').disabled = !stageEnabled;
    $('#popupComboStatusStageReduction').disabled = !stageEnabled;
    setDualOutputLines($('#popupComboStatusStageValue'), `부착 지속 ${stageDuration}초`, `단계당 피해 -${stageReduction}%`);
    $('#popupComboStatusStageDurationInline').textContent = `${stageDuration}초`;
    $('#popupComboStatusStageReductionInline').textContent = `${stageReduction}%`;
    $('[data-popup-combo-card="statusStage"]').classList.toggle('disabled', !stageEnabled);
    $$('[data-popup-combo-status-stage-duration]').forEach(button => button.classList.toggle('active', Number(button.getAttribute('data-popup-combo-status-stage-duration')) === stageDuration));
    $$('[data-popup-combo-status-stage-reduction]').forEach(button => button.classList.toggle('active', Number(button.getAttribute('data-popup-combo-status-stage-reduction')) === stageReduction));

    const reapplyEnabled = $('#comboStatusReapplyEnabled').checked;
    const reapplyInterval = Number($('#comboStatusReapplyInterval').value);
    $('#popupComboStatusReapplyEnabled').checked = reapplyEnabled;
    $('#popupComboStatusReapplyInterval').value = reapplyInterval;
    $('#popupComboStatusReapplyInterval').disabled = !reapplyEnabled;
    $('#popupComboStatusReapplyValue').value = `재적용 제한 ${reapplyInterval}초`;
    $('[data-popup-combo-card="statusReapply"]').classList.toggle('disabled', !reapplyEnabled);
    $$('[data-popup-combo-status-reapply]').forEach(button => button.classList.toggle('active', Number(button.getAttribute('data-popup-combo-status-reapply')) === reapplyInterval));


    [['battle','Battle'],['combo','Combo']].forEach(([kind,cap]) => {
      const enabled = $(`#combo${cap}ChillEnabled`).checked;
      const stageValue = Number($(`#combo${cap}ChillStage`).value);
      const cooldownValue = Number($(`#combo${cap}ChillCooldown`).value);
      const stageLabel = stageValue === 2 ? '단계 II' : '단계 I';
      const countLabel = stageValue === 2 ? '1회마다' : '2회마다';
      $(`#popupCombo${cap}ChillEnabled`).checked = enabled;
      $(`#popupCombo${cap}ChillStage`).value = stageValue;
      $(`#popupCombo${cap}ChillCooldown`).value = cooldownValue;
      $(`#popupCombo${cap}ChillStage`).disabled = !enabled;
      $(`#popupCombo${cap}ChillCooldown`).disabled = !enabled;
      setDualOutputLines($(`#popupCombo${cap}ChillValue`), `${stageLabel} · ${countLabel}`, `부착 쿨타임 ${cooldownValue}초`);
      $(`#popupCombo${cap}ChillStageInline`).textContent = stageLabel;
      $(`#popupCombo${cap}ChillCooldownInline`).textContent = `${cooldownValue}초`;
      $(`[data-popup-combo-card="${kind}Chill"]`).classList.toggle('disabled', !enabled);
      $$(`[data-popup-combo-${kind}-chill-stage]`).forEach(button => button.classList.toggle('active', Number(button.getAttribute(`data-popup-combo-${kind}-chill-stage`)) === stageValue));
      $$(`[data-popup-combo-${kind}-chill-cooldown]`).forEach(button => button.classList.toggle('active', Number(button.getAttribute(`data-popup-combo-${kind}-chill-cooldown`)) === cooldownValue));
    });

    const stageEnhanceEnabled = $('#comboStageEnhanceEnabled').checked;
    const stageEnhanceLevel = Number($('#comboStageEnhanceLevel').value);
    $('#popupComboStageEnhanceEnabled').checked = stageEnhanceEnabled;
    $('#popupComboStageEnhanceLevel').value = stageEnhanceLevel;
    $('#popupComboStageEnhanceValue').value = `강화 [${stageEnhanceLevel}]`;
    $('[data-popup-combo-card="stageEnhance"]').classList.toggle('disabled', !stageEnhanceEnabled);
    $$('[data-popup-combo-stage-enhance]').forEach(button => button.classList.toggle('active', Number(button.getAttribute('data-popup-combo-stage-enhance')) === stageEnhanceLevel));


    const highCapEnabled = $('#comboHighHpCapEnabled').checked;
    const highThreshold = Number($('#comboHighHpThreshold').value);
    const highCapRate = Number($('#comboHighHpCapRate').value);
    $('#popupComboHighHpCapEnabled').checked = highCapEnabled;
    $('#popupComboHighHpThreshold').value = highThreshold;
    $('#popupComboHighHpCapRate').value = highCapRate;
    $('#popupComboHighHpThreshold').disabled = !highCapEnabled;
    $('#popupComboHighHpCapRate').disabled = !highCapEnabled;
    setDualOutputLines($('#popupComboHighHpCapValue'), `적용 HP ${num0(highThreshold)} 이상`, `0.1초 상한 ${highCapRate}%`);
    $('#popupComboHighHpThresholdInline').textContent = compactMan(highThreshold);
    $('#popupComboHighHpCapInline').textContent = `${highCapRate}%`;
    $('[data-popup-combo-card="highHpCap"]').classList.toggle('disabled', !highCapEnabled);
    $$('[data-popup-combo-high-hp-threshold]').forEach(button => button.classList.toggle('active', Number(button.getAttribute('data-popup-combo-high-hp-threshold')) === highThreshold));
    $$('[data-popup-combo-high-hp-cap]').forEach(button => button.classList.toggle('active', Number(button.getAttribute('data-popup-combo-high-hp-cap')) === highCapRate));

    const limitText = $('#comboAppliedTimeLimit')?.textContent || '500초';
    $('#popupComboAppliedTimeLimit').textContent = limitText;
    applyHighlightState();
  }

  const highlightStorageKey = 'endfield-constraint-highlights-v1';
  let highlightedConstraints = new Set();
  try { highlightedConstraints = new Set(JSON.parse(localStorage.getItem(highlightStorageKey) || '[]')); } catch (_) {}

  function updateRangeProgress(range) {
    const min = Number(range.min || 0), max = Number(range.max || 100), value = Number(range.value || 0);
    const progress = max > min ? (value - min) / (max - min) * 100 : 0;
    range.style.setProperty('--range-progress', `${Math.max(0, Math.min(100, progress))}%`);
  }

  function applyHighlightState() {
    $$('[data-combo-card], [data-popup-combo-card]').forEach(card => {
      const key = card.getAttribute('data-combo-card') || card.getAttribute('data-popup-combo-card');
      const active = highlightedConstraints.has(key);
      card.classList.toggle('is-highlighted', active);
      const button = $('[data-highlight-key]', card);
      if (button) { button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); }
      $$('input[type="range"]', card).forEach(updateRangeProgress);
    });
  }

  function bindHighlightControls() {
    $$('[data-combo-card], [data-popup-combo-card]').forEach(card => {
      const key = card.getAttribute('data-combo-card') || card.getAttribute('data-popup-combo-card');
      const title = $('header label span b', card);
      if (!title || $('[data-highlight-key]', card)) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'constraint-crown-button';
      button.setAttribute('data-highlight-key', key);
      button.setAttribute('aria-label', `${title.textContent} 강조 전환`);
      button.setAttribute('aria-pressed', 'false');
      button.title = '수치 조정 영역 강조';
      button.textContent = '♛';
      title.insertAdjacentElement('afterend', button);
      button.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        highlightedConstraints.has(key) ? highlightedConstraints.delete(key) : highlightedConstraints.add(key);
        try { localStorage.setItem(highlightStorageKey, JSON.stringify([...highlightedConstraints])); } catch (_) {}
        applyHighlightState();
      });
    });
    document.addEventListener('input', event => { if (event.target.matches('input[type="range"]')) updateRangeProgress(event.target); });
    applyHighlightState();
  }

  init();
})();

(() => {
  'use strict';

  const profiles = [
    { id:'laevatain', name:'레바테인', baseHp:6100, type:'검', portrait:'assets/characters/laevatain/portrait.png' },
    { id:'camu', name:'카뮤', baseHp:6005, type:'장병기', portrait:'assets/characters/camu/portrait.png' },
    { id:'amber', name:'엠버', baseHp:6375, type:'대검', portrait:'assets/characters/amber/portrait.png', hpWeapon:'과거의 일품', hpMultiplier:1.78 },
    { id:'wolfguard', name:'울프가드', baseHp:6300, type:'권총', portrait:'assets/characters/wolfguard/portrait.png' },
    { id:'akekuri', name:'아케쿠리', baseHp:6045, type:'검', portrait:'assets/characters/akekuri/portrait.png' },
    { id:'yvonne', name:'이본', baseHp:5905, type:'권총', portrait:'assets/characters/yvonne/portrait.png' },
    { id:'tangtang', name:'탕탕', baseHp:6110, type:'권총', portrait:'assets/characters/tangtang/portrait.png' },
    { id:'last-light', name:'라스트 라이트', baseHp:6270, type:'대검', portrait:'assets/characters/last-light/portrait.png', hpWeapon:'과거의 일품', hpMultiplier:1.78 },
    { id:'xaihi', name:'자이히', baseHp:5940, type:'아츠 유닛', portrait:'assets/characters/xaihi/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'snowshine', name:'스노우샤인', baseHp:6265, type:'대검', portrait:'assets/characters/snowshine/portrait.png', hpWeapon:'과거의 일품', hpMultiplier:1.78 },
    { id:'alesh', name:'알레쉬', baseHp:6285, type:'검', portrait:'assets/characters/alesh/portrait.png' },
    { id:'estella', name:'에스텔라', baseHp:6015, type:'장병기', portrait:'assets/characters/estella/portrait.png' },
    { id:'jangbangyi', name:'장방이', baseHp:5990, type:'아츠 유닛', portrait:'assets/characters/jangbangyi/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'perlica', name:'펠리카', baseHp:5950, type:'아츠 유닛', portrait:'assets/characters/perlica/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'arclight', name:'아크라이트', baseHp:6030, type:'검', portrait:'assets/characters/arclight/portrait.png' },
    { id:'avivenna', name:'아비웨나', baseHp:6030, type:'장병기', portrait:'assets/characters/avivenna/portrait.png' },
    { id:'antal', name:'안탈', baseHp:6140, type:'아츠 유닛', portrait:'assets/characters/antal/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'gilberta', name:'질베르타', baseHp:5940, type:'아츠 유닛', portrait:'assets/characters/gilberta/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'adelia', name:'아델리아', baseHp:6055, type:'아츠 유닛', portrait:'assets/characters/adelia/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'fluorite', name:'플루라이트', baseHp:5945, type:'권총', portrait:'assets/characters/fluorite/portrait.png' },
    { id:'administrator', name:'관리자 [남][여]', baseHp:6110, type:'검', portrait:'assets/characters/administrator-female/portrait.png' },
    { id:'mive', name:'미브', baseHp:6080, type:'대검', portrait:'assets/characters/mive/portrait.png', hpWeapon:'천둥의 흔적', fixedMaxHp:12709.2 },
    { id:'rossi', name:'로시', baseHp:5980, type:'검', portrait:'assets/characters/rossi/portrait.png' },
    { id:'pogranichnik', name:'포그라니치크', baseHp:6000, type:'검', portrait:'assets/characters/pogranichnik/portrait.png' },
    { id:'yufeng', name:'여풍', baseHp:6110, type:'장병기', portrait:'assets/characters/yufeng/portrait.png' },
    { id:'jintianyu', name:'진천우', baseHp:6025, type:'검', portrait:'assets/characters/jintianyu/portrait.png' },
    { id:'pan', name:'판', baseHp:6370, type:'대검', portrait:'assets/characters/pan/portrait.png', hpWeapon:'과거의 일품', hpMultiplier:1.78 },
    { id:'kachir', name:'카치르', baseHp:6375, type:'대검', portrait:'assets/characters/kachir/portrait.png', hpWeapon:'과거의 일품', hpMultiplier:1.78 }
  ].map(profile => ({
    ...profile,
    maxHp: profile.fixedMaxHp || profile.baseHp * (profile.hpMultiplier || 1)
  }));

  const $ = selector => document.querySelector(selector);
  const fmt = new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 1 });
  const fmt0 = new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 0 });
  const number = value => fmt.format(Number(value) || 0);
  const number0 = value => fmt0.format(Math.round(Number(value) || 0));

  function toxicState(profile, rate, shield, ticks) {
    const perTick = profile.maxHp * rate / 100;
    const totalDamage = perTick * ticks;
    const remainingShield = Math.max(0, shield - totalDamage);
    const hpDamage = Math.max(0, totalDamage - shield);
    const remainingHp = Math.max(0, profile.maxHp - hpDamage);
    return { perTick, totalDamage, remainingShield, hpDamage, remainingHp };
  }

  function selectedShield() {
    const preset = $('#toxicShieldPreset');
    const custom = $('#toxicShieldCustom');
    if (!preset || !custom) return 0;
    return preset.value === 'custom' ? Math.max(0, Number(custom.value) || 0) : Math.max(0, Number(preset.value) || 0);
  }

  function buildText(profile) {
    if (profile.hpWeapon) {
      return `Lv.90 기본 HP ${number0(profile.baseHp)} · 생존 비교용 ${profile.hpWeapon} Lv.90 · 재련 0 · 완벽 기질 [9/9/4] · 최대 HP ${number0(profile.maxHp)}`;
    }
    return `Lv.90 기본 HP ${number0(profile.baseHp)} · ${profile.type} 무기군에서 최대 HP 보조 속성을 확인하지 못해 무기 HP 보정 없음`;
  }

  function renderTimeline(profile, rate, shield) {
    const checkpoints = [0,1,3,5,10,15];
    const denominator = Math.max(1, profile.maxHp + shield);
    $('#toxicTimeline').innerHTML = checkpoints.map(tick => {
      const state = toxicState(profile, rate, shield, tick);
      const hpWidth = state.remainingHp / denominator * 100;
      const shieldWidth = state.remainingShield / denominator * 100;
      const shieldLeft = hpWidth;
      return `<div class="toxic-timeline-row">
        <span>${tick}초</span>
        <div class="toxic-health-track" title="HP ${number0(state.remainingHp)} · 보호막 ${number0(state.remainingShield)}">
          <i style="width:${Math.max(0,Math.min(100,hpWidth))}%"></i>
          <em style="left:${Math.max(0,Math.min(100,shieldLeft))}%;width:${Math.max(0,Math.min(100-shieldLeft,shieldWidth))}%"></em>
        </div>
        <strong>HP ${number0(state.remainingHp)}</strong>
      </div>`;
    }).join('');
  }

  function renderDistribution(rate, shield, selectedId) {
    const sorted = [...profiles].sort((a,b) => b.maxHp - a.maxHp);
    const minHp = Math.min(...sorted.map(p => p.maxHp));
    const maxHp = Math.max(...sorted.map(p => p.maxHp));
    $('#toxicHpRange').textContent = `${number0(minHp)} ~ ${number0(maxHp)}`;
    $('#toxicOperatorResults').innerHTML = sorted.map(profile => {
      const state = toxicState(profile, rate, shield, 15);
      const pct = profile.maxHp ? state.remainingHp / profile.maxHp * 100 : 0;
      const statusClass = pct <= 25 ? 'danger' : 'safe';
      const statusText = state.remainingHp <= 0 ? '사망' : `${number(pct)}% 남음`;
      const fallbackAttr = profile.id === 'camu' ? ` onerror=\"this.onerror=null;this.src='assets/characters/camille/portrait.png'\"` : '';
      return `<button type="button" class="toxic-operator-card ${profile.id === selectedId ? 'selected' : ''}" data-toxic-operator-card="${profile.id}">
        <img src="${profile.portrait}" alt="${profile.name}"${fallbackAttr}>
        <div><h5>${profile.name}</h5><p>최대 HP ${number0(profile.maxHp)} · ${profile.hpWeapon ? profile.hpWeapon : 'HP 무기 보정 없음'}</p></div>
        <div class="toxic-card-result"><b>${number0(state.remainingHp)}</b><small class="${statusClass}">15초 후 ${statusText}</small></div>
      </button>`;
    }).join('');
    document.querySelectorAll('[data-toxic-operator-card]').forEach(button => {
      button.addEventListener('click', () => {
        $('#toxicOperatorSelect').value = button.dataset.toxicOperatorCard;
        updateToxicModel();
      });
    });
  }

  function updateToxicModel() {
    const rate = Math.max(0, Number($('#toxicDamageRate').value) || 0);
    const shield = selectedShield();
    const selectedId = $('#toxicOperatorSelect').value || profiles[0].id;
    const profile = profiles.find(item => item.id === selectedId) || profiles[0];
    const one = toxicState(profile, rate, shield, 1);
    const fifteen = toxicState(profile, rate, shield, 15);
    const shieldBreakTick = shield <= 0 ? 0 : Math.ceil(shield / Math.max(one.perTick, .0001));

    $('#toxicSummaryValue').textContent = `초당 최대 HP ${number(rate)}%`;
    $('#toxicDamageRateValue').textContent = `${number(rate)}%`;
    $('#toxicShieldValue').textContent = number0(shield);
    $('#toxicOperatorHp').textContent = `최대 HP ${number0(profile.maxHp)}`;
    $('#toxicSelectedName').textContent = profile.name;
    $('#toxicSelectedPortrait').onerror = () => { $('#toxicSelectedPortrait').onerror = null; $('#toxicSelectedPortrait').src = 'assets/characters/camille/portrait.png'; };
    $('#toxicSelectedPortrait').src = profile.portrait;
    $('#toxicSelectedPortrait').alt = profile.name;
    $('#toxicSelectedBuild').textContent = buildText(profile);
    $('#toxicOneSecondHp').textContent = number0(one.remainingHp);
    $('#toxicOneSecondNote').textContent = `피해 ${number0(one.totalDamage)} · 보호막 ${number0(one.remainingShield)} 남음`;
    $('#toxicFifteenSecondHp').textContent = number0(fifteen.remainingHp);
    $('#toxicFifteenSecondNote').textContent = `누적 피해 ${number0(fifteen.totalDamage)} · 최대 HP의 ${number(Math.min(100, fifteen.totalDamage / profile.maxHp * 100))}%`;
    $('#toxicShieldBreak').textContent = shield <= 0 ? '즉시 HP 피해' : shieldBreakTick > 15 ? '15초 동안 유지' : `${shieldBreakTick}초차 소진`;

    document.querySelectorAll('[data-toxic-rate]').forEach(button => {
      button.classList.toggle('active', Number(button.dataset.toxicRate) === rate);
    });

    renderTimeline(profile, rate, shield);
    renderDistribution(rate, shield, profile.id);
  }

  function initToxicModel() {
    const root = $('#toxicResidueConstraint');
    if (!root) return;
    const select = $('#toxicOperatorSelect');
    select.innerHTML = [...profiles].sort((a,b) => b.maxHp - a.maxHp).map(profile => `<option value="${profile.id}">${profile.name} · 최대 HP ${number0(profile.maxHp)}</option>`).join('');
    select.value = 'mive';

    $('#toxicDamageRate').addEventListener('input', updateToxicModel);
    select.addEventListener('change', updateToxicModel);
    $('#toxicShieldPreset').addEventListener('change', event => {
      const custom = $('#toxicShieldCustom');
      custom.hidden = event.target.value !== 'custom';
      if (event.target.value === 'custom') custom.focus();
      updateToxicModel();
    });
    $('#toxicShieldCustom').addEventListener('input', updateToxicModel);
    document.querySelectorAll('[data-toxic-rate]').forEach(button => {
      button.addEventListener('click', () => {
        $('#toxicDamageRate').value = button.dataset.toxicRate;
        updateToxicModel();
      });
    });
    updateToxicModel();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initToxicModel);
  else initToxicModel();
})();


(() => {
  'use strict';

  const profiles = [
    { id:'laevatain', name:'레바테인', baseHp:6100, type:'검', portrait:'assets/characters/laevatain/portrait.png' },
    { id:'camu', name:'카뮤', baseHp:6005, type:'장병기', portrait:'assets/characters/camu/portrait.png' },
    { id:'amber', name:'엠버', baseHp:6375, type:'대검', portrait:'assets/characters/amber/portrait.png', hpWeapon:'과거의 일품', hpMultiplier:1.78 },
    { id:'wolfguard', name:'울프가드', baseHp:6300, type:'권총', portrait:'assets/characters/wolfguard/portrait.png' },
    { id:'akekuri', name:'아케쿠리', baseHp:6045, type:'검', portrait:'assets/characters/akekuri/portrait.png' },
    { id:'yvonne', name:'이본', baseHp:5905, type:'권총', portrait:'assets/characters/yvonne/portrait.png' },
    { id:'tangtang', name:'탕탕', baseHp:6110, type:'권총', portrait:'assets/characters/tangtang/portrait.png' },
    { id:'last-light', name:'라스트 라이트', baseHp:6270, type:'대검', portrait:'assets/characters/last-light/portrait.png', hpWeapon:'과거의 일품', hpMultiplier:1.78 },
    { id:'xaihi', name:'자이히', baseHp:5940, type:'아츠 유닛', portrait:'assets/characters/xaihi/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'snowshine', name:'스노우샤인', baseHp:6265, type:'대검', portrait:'assets/characters/snowshine/portrait.png', hpWeapon:'과거의 일품', hpMultiplier:1.78 },
    { id:'alesh', name:'알레쉬', baseHp:6285, type:'검', portrait:'assets/characters/alesh/portrait.png' },
    { id:'estella', name:'에스텔라', baseHp:6015, type:'장병기', portrait:'assets/characters/estella/portrait.png' },
    { id:'jangbangyi', name:'장방이', baseHp:5990, type:'아츠 유닛', portrait:'assets/characters/jangbangyi/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'perlica', name:'펠리카', baseHp:5950, type:'아츠 유닛', portrait:'assets/characters/perlica/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'arclight', name:'아크라이트', baseHp:6030, type:'검', portrait:'assets/characters/arclight/portrait.png' },
    { id:'avivenna', name:'아비웨나', baseHp:6030, type:'장병기', portrait:'assets/characters/avivenna/portrait.png' },
    { id:'antal', name:'안탈', baseHp:6140, type:'아츠 유닛', portrait:'assets/characters/antal/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'gilberta', name:'질베르타', baseHp:5940, type:'아츠 유닛', portrait:'assets/characters/gilberta/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'adelia', name:'아델리아', baseHp:6055, type:'아츠 유닛', portrait:'assets/characters/adelia/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'fluorite', name:'플루라이트', baseHp:5945, type:'권총', portrait:'assets/characters/fluorite/portrait.png' },
    { id:'administrator', name:'관리자 [남][여]', baseHp:6110, type:'검', portrait:'assets/characters/administrator-female/portrait.png' },
    { id:'mive', name:'미브', baseHp:6080, type:'대검', portrait:'assets/characters/mive/portrait.png', hpWeapon:'천둥의 흔적', fixedMaxHp:12709.2 },
    { id:'rossi', name:'로시', baseHp:5980, type:'검', portrait:'assets/characters/rossi/portrait.png' },
    { id:'pogranichnik', name:'포그라니치크', baseHp:6000, type:'검', portrait:'assets/characters/pogranichnik/portrait.png' },
    { id:'yufeng', name:'여풍', baseHp:6110, type:'장병기', portrait:'assets/characters/yufeng/portrait.png' },
    { id:'jintianyu', name:'진천우', baseHp:6025, type:'검', portrait:'assets/characters/jintianyu/portrait.png' },
    { id:'pan', name:'판', baseHp:6370, type:'대검', portrait:'assets/characters/pan/portrait.png', hpWeapon:'과거의 일품', hpMultiplier:1.78 },
    { id:'kachir', name:'카치르', baseHp:6375, type:'대검', portrait:'assets/characters/kachir/portrait.png', hpWeapon:'과거의 일품', hpMultiplier:1.78 }
  ].map(profile => ({
    ...profile,
    maxHp: profile.fixedMaxHp || profile.baseHp * (profile.hpMultiplier || 1)
  }));

  const $ = selector => document.querySelector(selector);
  const fmt = new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 1 });
  const fmt0 = new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 0 });
  const number = value => fmt.format(Number(value) || 0);
  const number0 = value => fmt0.format(Math.round(Number(value) || 0));

  function selectedShield() {
    const preset = $('#enemyShieldPreset');
    const custom = $('#enemyShieldCustom');
    if (!preset || !custom) return 0;
    return preset.value === 'custom' ? Math.max(0, Number(custom.value) || 0) : Math.max(0, Number(preset.value) || 0);
  }

  function buildText(profile) {
    if (profile.hpWeapon) return `Lv.90 기본 HP ${number0(profile.baseHp)} · 생존 비교용 ${profile.hpWeapon} Lv.90 · 재련 0 · 완벽 기질 [9/9/4] · 최대 HP ${number0(profile.maxHp)}`;
    return `Lv.90 기본 HP ${number0(profile.baseHp)} · ${profile.type} 무기군에서 최대 HP 보조 속성을 확인하지 못해 무기 HP 보정 없음`;
  }

  function simulateHits(profile, damage, shield, maxHits = 6) {
    let currentHp = profile.maxHp;
    let currentShield = shield;
    const rows = [];
    let half = null, quarter = null, down = null;
    for (let hit = 1; hit <= maxHits; hit += 1) {
      const absorbed = Math.min(currentShield, damage);
      currentShield -= absorbed;
      const hpDamage = damage - absorbed;
      currentHp = Math.max(0, currentHp - hpDamage);
      if (half === null && currentHp <= profile.maxHp * 0.5) half = hit;
      if (quarter === null && currentHp <= profile.maxHp * 0.25) quarter = hit;
      if (down === null && currentHp <= 0) down = hit;
      rows.push({ hit, hp: currentHp, shield: currentShield });
      if (currentHp <= 0 && hit >= 4) break;
    }
    if (half === null) half = '미도달';
    if (quarter === null) quarter = '미도달';
    if (down === null) down = '6회 이상';
    return { rows, half, quarter, down };
  }

  function renderHitTimeline(profile, sim, shield) {
    const denominator = Math.max(1, profile.maxHp + shield);
    $('#enemyHitTimeline').innerHTML = sim.rows.map(row => {
      const hpWidth = row.hp / denominator * 100;
      const shieldWidth = row.shield / denominator * 100;
      const shieldLeft = hpWidth;
      return `<div class="toxic-timeline-row">
        <span>${row.hit}회 피격</span>
        <div class="toxic-health-track" title="HP ${number0(row.hp)} · 보호막 ${number0(row.shield)}">
          <i style="width:${Math.max(0,Math.min(100,hpWidth))}%"></i>
          <em style="left:${Math.max(0,Math.min(100,shieldLeft))}%;width:${Math.max(0,Math.min(100-shieldLeft,shieldWidth))}%"></em>
        </div>
        <strong>HP ${number0(row.hp)}</strong>
      </div>`;
    }).join('');
  }

  function renderDistribution(damage, shield, selectedId) {
    const sorted = [...profiles].sort((a,b) => b.maxHp - a.maxHp);
    const minHp = Math.min(...sorted.map(p => p.maxHp));
    const maxHp = Math.max(...sorted.map(p => p.maxHp));
    $('#enemyHpRange').textContent = `${number0(minHp)} ~ ${number0(maxHp)}`;
    const exactDownHits = sorted.map(profile => Math.max(1, Math.ceil((profile.maxHp + shield) / Math.max(1, damage))));
    const averageDownHits = exactDownHits.reduce((sum, hit) => sum + hit, 0) / exactDownHits.length;
    $('#enemyAverageDownHits').textContent = `${number(averageDownHits)}회`;
    $('#enemyOperatorResults').innerHTML = sorted.map(profile => {
      const sim = simulateHits(profile, damage, shield, 6);
      const downText = typeof sim.down === 'number' ? `${sim.down}회` : sim.down;
      const fallbackAttr = profile.id === 'camu' ? ` onerror="this.onerror=null;this.src='assets/characters/camille/portrait.png'"` : '';
      return `<button type="button" class="toxic-operator-card ${profile.id === selectedId ? 'selected' : ''}" data-enemy-operator-card="${profile.id}">
        <img src="${profile.portrait}" alt="${profile.name}"${fallbackAttr}>
        <div><h5>${profile.name}</h5><p>최대 HP ${number0(profile.maxHp)} · ${profile.hpWeapon ? profile.hpWeapon : 'HP 무기 보정 없음'}</p></div>
        <div class="toxic-card-result"><b>불능 ${downText}</b><small>50% ${sim.half} · 25% ${sim.quarter}</small></div>
      </button>`;
    }).join('');
    document.querySelectorAll('[data-enemy-operator-card]').forEach(button => {
      button.addEventListener('click', () => {
        $('#enemyOperatorSelect').value = button.dataset.enemyOperatorCard;
        updateEnemyDamageModel();
      });
    });
  }

  function updateEnemyDamageModel() {
    const rate = Math.max(0, Number($('#enemyDamageRate').value) || 0);
    const baseAttack = Number(document.querySelector('[data-enemy-attack].active')?.dataset.enemyAttack || 1400);
    const shield = selectedShield();
    const selectedId = $('#enemyOperatorSelect').value || 'mive';
    const profile = profiles.find(item => item.id === selectedId) || profiles[0];
    const damage = baseAttack * (1 + rate / 100);
    const sim = simulateHits(profile, damage, shield, 6);
    const one = sim.rows[0] || { hp: profile.maxHp, shield };
    const attackLabel = baseAttack === 800 ? '하급' : baseAttack === 2200 ? '강공' : '표준';

    $('#enemyDamageSummaryValue').textContent = `피해 +${number(rate)}% · ${attackLabel} 공격력 ${number0(baseAttack)}`;
    $('#enemyDamageRateValue').textContent = `${number(rate)}%`;
    $('#enemyAttackValue').textContent = `${attackLabel} ${number0(baseAttack)}`;
    $('#enemyShieldValue').textContent = number0(shield);
    $('#enemyOperatorHp').textContent = `최대 HP ${number0(profile.maxHp)}`;
    $('#enemySelectedName').textContent = profile.name;
    $('#enemySelectedPortrait').onerror = () => { $('#enemySelectedPortrait').onerror = null; $('#enemySelectedPortrait').src = 'assets/characters/camille/portrait.png'; };
    $('#enemySelectedPortrait').src = profile.portrait;
    $('#enemySelectedPortrait').alt = profile.name;
    $('#enemySelectedBuild').textContent = buildText(profile);
    $('#enemyAfterOneHit').textContent = number0(one.hp);
    $('#enemyAfterOneHitNote').textContent = `1회 피해 ${number0(damage)} · 보호막 ${number0(one.shield)} 남음`;
    $('#enemyHalfHitCount').textContent = String(sim.half);
    $('#enemyHalfHitNote').textContent = typeof sim.half === 'number' ? `${sim.half}회째 50% 이하 진입` : '6회 연속 피격 내 미도달';
    $('#enemyQuarterHitCount').textContent = String(sim.quarter);
    $('#enemyQuarterHitNote').textContent = typeof sim.quarter === 'number' ? `${sim.quarter}회째 25% 이하 진입` : '6회 연속 피격 내 미도달';
    $('#enemyDownHitCount').textContent = String(sim.down);
    $('#enemyDownHitNote').textContent = typeof sim.down === 'number' ? `${sim.down}회째 전투 불능` : '6회 연속 피격 내 버팀';

    document.querySelectorAll('[data-enemy-rate]').forEach(button => {
      button.classList.toggle('active', Number(button.dataset.enemyRate) === rate);
    });
    document.querySelectorAll('[data-enemy-attack]').forEach(button => {
      button.classList.toggle('active', Number(button.dataset.enemyAttack) === baseAttack);
    });

    renderHitTimeline(profile, sim, shield);
    renderDistribution(damage, shield, profile.id);

    const linkedState = { rate, baseAttack, attackLabel, damage };
    window.endfieldEnemyDamageState = linkedState;
    window.dispatchEvent(new CustomEvent('endfield:enemy-damage-change', { detail: linkedState }));
  }

  function initEnemyDamageModel() {
    const root = $('#enemyDamageConstraint');
    if (!root) return;
    const select = $('#enemyOperatorSelect');
    select.innerHTML = [...profiles].sort((a,b) => b.maxHp - a.maxHp).map(profile => `<option value="${profile.id}">${profile.name} · 최대 HP ${number0(profile.maxHp)}</option>`).join('');
    select.value = 'mive';

    $('#enemyDamageRate').addEventListener('input', updateEnemyDamageModel);
    select.addEventListener('change', updateEnemyDamageModel);
    $('#enemyShieldPreset').addEventListener('change', event => {
      const custom = $('#enemyShieldCustom');
      custom.hidden = event.target.value !== 'custom';
      if (event.target.value === 'custom') custom.focus();
      updateEnemyDamageModel();
    });
    $('#enemyShieldCustom').addEventListener('input', updateEnemyDamageModel);
    document.querySelectorAll('[data-enemy-rate]').forEach(button => {
      button.addEventListener('click', () => {
        $('#enemyDamageRate').value = button.dataset.enemyRate;
        updateEnemyDamageModel();
      });
    });
    document.querySelectorAll('[data-enemy-attack]').forEach(button => {
      button.addEventListener('click', () => {
        document.querySelectorAll('[data-enemy-attack]').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        updateEnemyDamageModel();
      });
    });

    updateEnemyDamageModel();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initEnemyDamageModel);
  else initEnemyDamageModel();
})();


(() => {
  'use strict';

  const profiles = [
    { id:'laevatain', name:'레바테인', baseHp:6100, type:'검', portrait:'assets/characters/laevatain/portrait.png' },
    { id:'camu', name:'카뮤', baseHp:6005, type:'장병기', portrait:'assets/characters/camu/portrait.png' },
    { id:'amber', name:'엠버', baseHp:6375, type:'대검', portrait:'assets/characters/amber/portrait.png', hpWeapon:'과거의 일품', hpMultiplier:1.78 },
    { id:'wolfguard', name:'울프가드', baseHp:6300, type:'권총', portrait:'assets/characters/wolfguard/portrait.png' },
    { id:'akekuri', name:'아케쿠리', baseHp:6045, type:'검', portrait:'assets/characters/akekuri/portrait.png' },
    { id:'yvonne', name:'이본', baseHp:5905, type:'권총', portrait:'assets/characters/yvonne/portrait.png' },
    { id:'tangtang', name:'탕탕', baseHp:6110, type:'권총', portrait:'assets/characters/tangtang/portrait.png' },
    { id:'last-light', name:'라스트 라이트', baseHp:6270, type:'대검', portrait:'assets/characters/last-light/portrait.png', hpWeapon:'과거의 일품', hpMultiplier:1.78 },
    { id:'xaihi', name:'자이히', baseHp:5940, type:'아츠 유닛', portrait:'assets/characters/xaihi/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'snowshine', name:'스노우샤인', baseHp:6265, type:'대검', portrait:'assets/characters/snowshine/portrait.png', hpWeapon:'과거의 일품', hpMultiplier:1.78 },
    { id:'alesh', name:'알레쉬', baseHp:6285, type:'검', portrait:'assets/characters/alesh/portrait.png' },
    { id:'estella', name:'에스텔라', baseHp:6015, type:'장병기', portrait:'assets/characters/estella/portrait.png' },
    { id:'jangbangyi', name:'장방이', baseHp:5990, type:'아츠 유닛', portrait:'assets/characters/jangbangyi/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'perlica', name:'펠리카', baseHp:5950, type:'아츠 유닛', portrait:'assets/characters/perlica/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'arclight', name:'아크라이트', baseHp:6030, type:'검', portrait:'assets/characters/arclight/portrait.png' },
    { id:'avivenna', name:'아비웨나', baseHp:6030, type:'장병기', portrait:'assets/characters/avivenna/portrait.png' },
    { id:'antal', name:'안탈', baseHp:6140, type:'아츠 유닛', portrait:'assets/characters/antal/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'gilberta', name:'질베르타', baseHp:5940, type:'아츠 유닛', portrait:'assets/characters/gilberta/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'adelia', name:'아델리아', baseHp:6055, type:'아츠 유닛', portrait:'assets/characters/adelia/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'fluorite', name:'플루라이트', baseHp:5945, type:'권총', portrait:'assets/characters/fluorite/portrait.png' },
    { id:'administrator', name:'관리자 [남][여]', baseHp:6110, type:'검', portrait:'assets/characters/administrator-female/portrait.png' },
    { id:'mive', name:'미브', baseHp:6080, type:'대검', portrait:'assets/characters/mive/portrait.png', hpWeapon:'천둥의 흔적', fixedMaxHp:12709.2 },
    { id:'rossi', name:'로시', baseHp:5980, type:'검', portrait:'assets/characters/rossi/portrait.png' },
    { id:'pogranichnik', name:'포그라니치크', baseHp:6000, type:'검', portrait:'assets/characters/pogranichnik/portrait.png' },
    { id:'yufeng', name:'여풍', baseHp:6110, type:'장병기', portrait:'assets/characters/yufeng/portrait.png' },
    { id:'jintianyu', name:'진천우', baseHp:6025, type:'검', portrait:'assets/characters/jintianyu/portrait.png' },
    { id:'pan', name:'판', baseHp:6370, type:'대검', portrait:'assets/characters/pan/portrait.png', hpWeapon:'과거의 일품', hpMultiplier:1.78 },
    { id:'kachir', name:'카치르', baseHp:6375, type:'대검', portrait:'assets/characters/kachir/portrait.png', hpWeapon:'과거의 일품', hpMultiplier:1.78 }
  ].map(profile => ({ ...profile, maxHp: profile.fixedMaxHp || profile.baseHp * (profile.hpMultiplier || 1) }));

  const $ = selector => document.querySelector(selector);
  const fmt = new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 2 });
  const fmt0 = new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 0 });
  const number = value => fmt.format(Number(value) || 0);
  const number0 = value => fmt0.format(Math.round(Number(value) || 0));
  let initialized = false;

  function linkedEnemyState() {
    if (window.endfieldEnemyDamageState) return window.endfieldEnemyDamageState;
    const rate = Math.max(0, Number($('#enemyDamageRate')?.value) || 25);
    const active = document.querySelector('[data-enemy-attack].active');
    const baseAttack = Math.max(0, Number(active?.dataset.enemyAttack) || 1400);
    const attackLabel = baseAttack === 800 ? '하급' : baseAttack === 2200 ? '강공' : '표준';
    return { rate, baseAttack, attackLabel, damage: baseAttack * (1 + rate / 100) };
  }

  function selectedShield() {
    const preset = $('#mainControlShieldPreset');
    const custom = $('#mainControlShieldCustom');
    if (!preset || !custom) return 0;
    return preset.value === 'custom' ? Math.max(0, Number(custom.value) || 0) : Math.max(0, Number(preset.value) || 0);
  }

  function buildText(profile) {
    if (profile.hpWeapon) return `Lv.90 기본 HP ${number0(profile.baseHp)} · 생존 비교용 ${profile.hpWeapon} Lv.90 · 재련 0 · 완벽 기질 [9/9/4] · 최대 HP ${number0(profile.maxHp)}`;
    return `Lv.90 기본 HP ${number0(profile.baseHp)} · ${profile.type} 무기군에서 최대 HP 보조 속성을 확인하지 못해 무기 HP 보정 없음`;
  }

  function simulateHits(profile, damage, shield, maxHits = 20) {
    let hp = profile.maxHp;
    let barrier = shield;
    let half = null, quarter = null, down = null;
    let afterOne = hp;
    for (let hit = 1; hit <= maxHits; hit += 1) {
      const absorbed = Math.min(barrier, damage);
      barrier -= absorbed;
      hp = Math.max(0, hp - Math.max(0, damage - absorbed));
      if (hit === 1) afterOne = hp;
      if (half === null && hp <= profile.maxHp * .5) half = hit;
      if (quarter === null && hp <= profile.maxHp * .25) quarter = hit;
      if (down === null && hp <= 0) { down = hit; break; }
    }
    return {
      afterOne,
      half: half ?? `${maxHits}회 이상`,
      quarter: quarter ?? `${maxHits}회 이상`,
      down: down ?? `${maxHits}회 이상`
    };
  }

  function metricText(value) {
    return typeof value === 'number' ? `${value}회` : value;
  }

  function renderOperatorResults(mainRate, enemyState, shield, selectedId) {
    const soloDamage = enemyState.baseAttack * (1 + mainRate / 100);
    const combinedDamage = enemyState.baseAttack * (1 + enemyState.rate / 100) * (1 + mainRate / 100);
    const sorted = [...profiles].sort((a,b) => b.maxHp - a.maxHp);
    const minHp = Math.min(...sorted.map(profile => profile.maxHp));
    const maxHp = Math.max(...sorted.map(profile => profile.maxHp));
    $('#mainControlHpRange').textContent = `${number0(minHp)} ~ ${number0(maxHp)}`;
    const soloAverage = sorted.reduce((sum, profile) => sum + Math.max(1, Math.ceil((profile.maxHp + shield) / Math.max(1, soloDamage))), 0) / sorted.length;
    const combinedAverage = sorted.reduce((sum, profile) => sum + Math.max(1, Math.ceil((profile.maxHp + shield) / Math.max(1, combinedDamage))), 0) / sorted.length;
    $('#mainControlAverageDownHits').textContent = `단독 ${number(Math.round(soloAverage * 10) / 10)}회 · 동시 ${number(Math.round(combinedAverage * 10) / 10)}회`;
    $('#mainControlOperatorResults').innerHTML = sorted.map(profile => {
      const solo = simulateHits(profile, soloDamage, shield);
      const combined = simulateHits(profile, combinedDamage, shield);
      return `<button type="button" class="main-control-operator-card ${profile.id === selectedId ? 'selected' : ''}" data-main-control-operator-card="${profile.id}">
        <div class="main-control-card-profile">
          <img src="${profile.portrait}" alt="${profile.name}">
          <div><h5>${profile.name}</h5><p>최대 HP ${number0(profile.maxHp)} · 메인 컨트롤 지정 가정</p></div>
        </div>
        <div class="main-control-card-scenarios">
          <div><span>메인 피격 증가만</span><b>피해 ${number0(soloDamage)}</b><small>50% ${metricText(solo.half)} · 25% ${metricText(solo.quarter)} · 불능 ${metricText(solo.down)}</small></div>
          <div class="combined"><span>적 피해 증가 동시 적용</span><b>피해 ${number0(combinedDamage)}</b><small>50% ${metricText(combined.half)} · 25% ${metricText(combined.quarter)} · 불능 ${metricText(combined.down)}</small></div>
        </div>
      </button>`;
    }).join('');

    document.querySelectorAll('[data-main-control-operator-card]').forEach(button => {
      button.addEventListener('click', () => {
        $('#mainControlOperatorSelect').value = button.dataset.mainControlOperatorCard;
        updateMainControlDamageModel();
      });
    });
  }

  function updateMainControlDamageModel() {
    if (!initialized) return;
    const mainRate = Math.max(0, Number($('#mainControlDamageRate').value) || 0);
    const enemyState = linkedEnemyState();
    const shield = selectedShield();
    const selectedId = $('#mainControlOperatorSelect').value || 'mive';
    const profile = profiles.find(item => item.id === selectedId) || profiles[0];
    const enemyMultiplier = 1 + enemyState.rate / 100;
    const mainMultiplier = 1 + mainRate / 100;
    const combinedMultiplier = enemyMultiplier * mainMultiplier;
    const soloDamage = enemyState.baseAttack * mainMultiplier;
    const combinedDamage = enemyState.baseAttack * combinedMultiplier;
    const solo = simulateHits(profile, soloDamage, shield);
    const combined = simulateHits(profile, combinedDamage, shield);

    $('#mainControlDamageSummaryValue').textContent = `받는 피해 +${number(mainRate)}% · 적 피해 +${number(enemyState.rate)}% 연동`;
    $('#mainControlDamageRateValue').textContent = `${number(mainRate)}%`;
    $('#mainControlShieldValue').textContent = number0(shield);
    $('#mainControlOperatorHp').textContent = `최대 HP ${number0(profile.maxHp)}`;
    $('#mainLinkedEnemyRate').textContent = `${number(enemyState.rate)}%`;
    $('#mainLinkedEnemyAttack').textContent = `${enemyState.attackLabel} ${number0(enemyState.baseAttack)}`;
    $('#mainCombinedMultiplier').textContent = `${number(combinedMultiplier * 100)}%`;
    $('#mainCombinedMultiplierNote').textContent = `${number(enemyMultiplier)} × ${number(mainMultiplier)} = ${number(combinedMultiplier)}`;

    $('#mainControlSelectedName').textContent = profile.name;
    $('#mainControlSelectedBuild').textContent = buildText(profile);
    $('#mainControlSelectedPortrait').src = profile.portrait;
    $('#mainControlSelectedPortrait').alt = profile.name;

    $('#mainSoloDamage').textContent = number0(soloDamage);
    $('#mainSoloAfterOne').textContent = number0(solo.afterOne);
    $('#mainSoloHalf').textContent = metricText(solo.half);
    $('#mainSoloQuarter').textContent = metricText(solo.quarter);
    $('#mainSoloDown').textContent = metricText(solo.down);

    $('#mainCombinedDamage').textContent = number0(combinedDamage);
    $('#mainCombinedAfterOne').textContent = number0(combined.afterOne);
    $('#mainCombinedHalf').textContent = metricText(combined.half);
    $('#mainCombinedQuarter').textContent = metricText(combined.quarter);
    $('#mainCombinedDown').textContent = metricText(combined.down);

    document.querySelectorAll('[data-main-control-rate]').forEach(button => {
      button.classList.toggle('active', Number(button.dataset.mainControlRate) === mainRate);
    });

    renderOperatorResults(mainRate, enemyState, shield, profile.id);

    const linkedState = { rate: mainRate };
    window.endfieldMainControlDamageState = linkedState;
    window.dispatchEvent(new CustomEvent('endfield:main-control-damage-change', { detail: linkedState }));
  }

  function initMainControlDamageModel() {
    const root = $('#mainControlDamageConstraint');
    if (!root) return;
    const select = $('#mainControlOperatorSelect');
    select.innerHTML = [...profiles].sort((a,b) => b.maxHp - a.maxHp).map(profile => `<option value="${profile.id}">${profile.name} · 최대 HP ${number0(profile.maxHp)}</option>`).join('');
    select.value = 'mive';
    initialized = true;

    $('#mainControlDamageRate').addEventListener('input', updateMainControlDamageModel);
    select.addEventListener('change', updateMainControlDamageModel);
    $('#mainControlShieldPreset').addEventListener('change', event => {
      const custom = $('#mainControlShieldCustom');
      custom.hidden = event.target.value !== 'custom';
      if (event.target.value === 'custom') custom.focus();
      updateMainControlDamageModel();
    });
    $('#mainControlShieldCustom').addEventListener('input', updateMainControlDamageModel);
    document.querySelectorAll('[data-main-control-rate]').forEach(button => {
      button.addEventListener('click', () => {
        $('#mainControlDamageRate').value = button.dataset.mainControlRate;
        updateMainControlDamageModel();
      });
    });
    updateMainControlDamageModel();
  }

  window.addEventListener('endfield:enemy-damage-change', () => {
    if (initialized) updateMainControlDamageModel();
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initMainControlDamageModel);
  else initMainControlDamageModel();
})();


(() => {
  'use strict';

  const profiles = [
    { id:'laevatain', name:'레바테인', baseHp:6100, type:'검', portrait:'assets/characters/laevatain/portrait.png' },
    { id:'camu', name:'카뮤', baseHp:6005, type:'장병기', portrait:'assets/characters/camu/portrait.png' },
    { id:'amber', name:'엠버', baseHp:6375, type:'대검', portrait:'assets/characters/amber/portrait.png', hpWeapon:'과거의 일품', hpMultiplier:1.78 },
    { id:'wolfguard', name:'울프가드', baseHp:6300, type:'권총', portrait:'assets/characters/wolfguard/portrait.png' },
    { id:'akekuri', name:'아케쿠리', baseHp:6045, type:'검', portrait:'assets/characters/akekuri/portrait.png' },
    { id:'yvonne', name:'이본', baseHp:5905, type:'권총', portrait:'assets/characters/yvonne/portrait.png' },
    { id:'tangtang', name:'탕탕', baseHp:6110, type:'권총', portrait:'assets/characters/tangtang/portrait.png' },
    { id:'last-light', name:'라스트 라이트', baseHp:6270, type:'대검', portrait:'assets/characters/last-light/portrait.png', hpWeapon:'과거의 일품', hpMultiplier:1.78 },
    { id:'xaihi', name:'자이히', baseHp:5940, type:'아츠 유닛', portrait:'assets/characters/xaihi/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'snowshine', name:'스노우샤인', baseHp:6265, type:'대검', portrait:'assets/characters/snowshine/portrait.png', hpWeapon:'과거의 일품', hpMultiplier:1.78 },
    { id:'alesh', name:'알레쉬', baseHp:6285, type:'검', portrait:'assets/characters/alesh/portrait.png' },
    { id:'estella', name:'에스텔라', baseHp:6015, type:'장병기', portrait:'assets/characters/estella/portrait.png' },
    { id:'jangbangyi', name:'장방이', baseHp:5990, type:'아츠 유닛', portrait:'assets/characters/jangbangyi/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'perlica', name:'펠리카', baseHp:5950, type:'아츠 유닛', portrait:'assets/characters/perlica/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'arclight', name:'아크라이트', baseHp:6030, type:'검', portrait:'assets/characters/arclight/portrait.png' },
    { id:'avivenna', name:'아비웨나', baseHp:6030, type:'장병기', portrait:'assets/characters/avivenna/portrait.png' },
    { id:'antal', name:'안탈', baseHp:6140, type:'아츠 유닛', portrait:'assets/characters/antal/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'gilberta', name:'질베르타', baseHp:5940, type:'아츠 유닛', portrait:'assets/characters/gilberta/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'adelia', name:'아델리아', baseHp:6055, type:'아츠 유닛', portrait:'assets/characters/adelia/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'fluorite', name:'플루라이트', baseHp:5945, type:'권총', portrait:'assets/characters/fluorite/portrait.png' },
    { id:'administrator', name:'관리자 [남][여]', baseHp:6110, type:'검', portrait:'assets/characters/administrator-female/portrait.png' },
    { id:'mive', name:'미브', baseHp:6080, type:'대검', portrait:'assets/characters/mive/portrait.png', hpWeapon:'천둥의 흔적', fixedMaxHp:12709.2 },
    { id:'rossi', name:'로시', baseHp:5980, type:'검', portrait:'assets/characters/rossi/portrait.png' },
    { id:'pogranichnik', name:'포그라니치크', baseHp:6000, type:'검', portrait:'assets/characters/pogranichnik/portrait.png' },
    { id:'yufeng', name:'여풍', baseHp:6110, type:'장병기', portrait:'assets/characters/yufeng/portrait.png' },
    { id:'jintianyu', name:'진천우', baseHp:6025, type:'검', portrait:'assets/characters/jintianyu/portrait.png' },
    { id:'pan', name:'판', baseHp:6370, type:'대검', portrait:'assets/characters/pan/portrait.png', hpWeapon:'과거의 일품', hpMultiplier:1.78 },
    { id:'kachir', name:'카치르', baseHp:6375, type:'대검', portrait:'assets/characters/kachir/portrait.png', hpWeapon:'과거의 일품', hpMultiplier:1.78 }
  ].map(profile => ({
    ...profile,
    maxHp: profile.fixedMaxHp || profile.baseHp * (profile.hpMultiplier || 1),
    rangeClass: ['권총','아츠 유닛'].includes(profile.type) ? 'ranged' : 'melee'
  }));

  const $ = selector => document.querySelector(selector);
  const fmt = new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 1 });
  const fmt0 = new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 0 });
  const number = value => fmt.format(Number(value) || 0);
  const number0 = value => fmt0.format(Math.round(Number(value) || 0));
  let initialized = false;

  function linkedEnemyState() {
    if (window.endfieldEnemyDamageState) return window.endfieldEnemyDamageState;
    const rate = Math.max(0, Number($('#enemyDamageRate')?.value) || 0);
    const baseAttack = Number(document.querySelector('[data-enemy-attack].active')?.dataset.enemyAttack || 1400);
    return { rate, baseAttack, attackLabel: baseAttack === 800 ? '하급' : baseAttack === 2200 ? '강공' : '표준' };
  }

  function linkedMainRate() {
    if (window.endfieldMainControlDamageState) return Math.max(0, Number(window.endfieldMainControlDamageState.rate) || 0);
    return Math.max(0, Number($('#mainControlDamageRate')?.value) || 0);
  }

  function selectedShield() {
    const preset = $('#maxHpReductionShieldPreset');
    const custom = $('#maxHpReductionShieldCustom');
    if (!preset || !custom) return 0;
    return preset.value === 'custom' ? Math.max(0, Number(custom.value) || 0) : Math.max(0, Number(preset.value) || 0);
  }

  function selectedDamageModel() {
    return document.querySelector('[data-max-hp-damage-model].active')?.dataset.maxHpDamageModel || 'both';
  }

  function modelInfo(model, enemyState, mainRate) {
    const enemyMultiplier = 1 + enemyState.rate / 100;
    const mainMultiplier = 1 + mainRate / 100;
    const map = {
      base: { label:'기준 공격력만', damage:enemyState.baseAttack, formula:'기준 공격력' },
      enemy: { label:'적 피해 증가 적용', damage:enemyState.baseAttack * enemyMultiplier, formula:`기준 × ${number(enemyMultiplier)}` },
      main: { label:'메인 피격 증가 적용', damage:enemyState.baseAttack * mainMultiplier, formula:`기준 × ${number(mainMultiplier)}` },
      both: { label:'두 제약 동시 적용', damage:enemyState.baseAttack * enemyMultiplier * mainMultiplier, formula:`기준 × ${number(enemyMultiplier)} × ${number(mainMultiplier)}` }
    };
    return map[model] || map.both;
  }

  function buildText(profile) {
    const rangeLabel = profile.rangeClass === 'melee' ? '근거리' : '원거리';
    if (profile.hpWeapon) return `${rangeLabel} · ${profile.type} · Lv.90 기본 HP ${number0(profile.baseHp)} · 생존 비교용 ${profile.hpWeapon} Lv.90 · 재련 0 · 완벽 기질 [9/9/4] · 최대 HP ${number0(profile.maxHp)}`;
    return `${rangeLabel} · ${profile.type} · Lv.90 기본 HP ${number0(profile.baseHp)} · 최대 HP 무기 보정 없음`;
  }

  function simulate(profile, damage, shield, reductionRate, maxHits = 12) {
    let currentHp = profile.maxHp;
    let currentMaxHp = profile.maxHp;
    let currentShield = shield;
    let cumulativeMaxLoss = 0;
    let down = null;
    const rows = [];
    for (let hit = 1; hit <= maxHits; hit += 1) {
      const absorbed = Math.min(currentShield, damage);
      currentShield = Math.max(0, currentShield - absorbed);
      const incomingToHp = Math.max(0, damage - absorbed);
      const actualHpDamage = Math.min(currentHp, incomingToHp);
      currentHp = Math.max(0, currentHp - actualHpDamage);
      const maxHpLoss = Math.min(currentMaxHp, actualHpDamage * reductionRate / 100);
      currentMaxHp = Math.max(0, currentMaxHp - maxHpLoss);
      cumulativeMaxLoss += maxHpLoss;
      currentHp = Math.min(currentHp, currentMaxHp);
      if ((currentHp <= 0 || currentMaxHp <= 0) && down === null) down = hit;
      rows.push({ hit, absorbed, actualHpDamage, maxHpLoss, cumulativeMaxLoss, hp:currentHp, maxHp:currentMaxHp, shield:currentShield });
      if (down !== null) break;
    }
    return { rows, down: down ?? `${maxHits}회 이상`, first:rows[0] || null, third:rows[Math.min(2, rows.length - 1)] || null };
  }

  function downText(value) {
    return typeof value === 'number' ? `${value}회` : value;
  }

  function renderTimeline(sim) {
    const rows = sim.rows.slice(0, 6).map(row => `<div class="max-hp-timeline-row">
      <span>${row.hit}회</span>
      <div><small>보호막 흡수</small><b>${number0(row.absorbed)}</b></div>
      <div><small>실제 HP 피해</small><b>${number0(row.actualHpDamage)}</b></div>
      <div><small>최대 HP 감소</small><b>-${number0(row.maxHpLoss)}</b></div>
      <div class="max-hp-state-cell"><small>현재 HP / 최대 HP</small><b>${number0(row.hp)} / ${number0(row.maxHp)}</b></div>
    </div>`).join('');
    const note = sim.rows.length > 6 ? `<p class="max-hp-timeline-note">상세 표는 최초 6회 피격까지 표시하며, 전투 불능 판정은 최대 12회까지 계산합니다.</p>` : '';
    $('#maxHpReductionTimeline').innerHTML = `<div class="max-hp-timeline-head"><span>피격</span><span>보호막</span><span>HP 피해</span><span>최대 HP 감소</span><span>남은 상태</span></div>${rows}${note}`;
  }

  function renderDistribution(damage, shield, meleeRate, rangedRate, selectedId) {
    const sorted = [...profiles].sort((a,b) => b.maxHp - a.maxHp);
    const exactDownHits = sorted.map(profile => {
      const rate = profile.rangeClass === 'melee' ? meleeRate : rangedRate;
      const result = simulate(profile, damage, shield, rate, 500);
      return typeof result.down === 'number' ? result.down : 500;
    });
    const averageDownHits = exactDownHits.reduce((sum, hit) => sum + hit, 0) / exactDownHits.length;
    $('#maxHpReductionAverageDownHits').textContent = `${number(averageDownHits)}회`;
    $('#maxHpReductionOperatorResults').innerHTML = sorted.map(profile => {
      const rate = profile.rangeClass === 'melee' ? meleeRate : rangedRate;
      const result = simulate(profile, damage, shield, rate);
      const third = result.third || { hp:profile.maxHp, maxHp:profile.maxHp, cumulativeMaxLoss:0 };
      const rangeLabel = profile.rangeClass === 'melee' ? '근거리' : '원거리';
      const fallbackAttr = profile.id === 'camu' ? ` onerror="this.onerror=null;this.src='assets/characters/camille/portrait.png'"` : '';
      return `<button type="button" class="max-hp-operator-card ${profile.id === selectedId ? 'selected' : ''}" data-max-hp-operator-card="${profile.id}">
        <div class="max-hp-card-profile"><img src="${profile.portrait}" alt="${profile.name}"${fallbackAttr}><div><h5>${profile.name}</h5><p>${rangeLabel} · ${profile.type} · 감소율 ${number(rate)}%</p></div></div>
        <div class="max-hp-card-result"><b>${number0(third.hp)} / ${number0(third.maxHp)}</b><small>3회 후 · 최대 HP -${number0(third.cumulativeMaxLoss)}</small><strong>불능 ${downText(result.down)}</strong></div>
      </button>`;
    }).join('');
    document.querySelectorAll('[data-max-hp-operator-card]').forEach(button => {
      button.addEventListener('click', () => {
        $('#maxHpReductionOperatorSelect').value = button.dataset.maxHpOperatorCard;
        updateMaxHpReductionModel();
      });
    });
  }

  function updateMaxHpReductionModel() {
    if (!initialized) return;
    const meleeRate = Math.max(0, Number($('#meleeMaxHpReductionRate').value) || 0);
    const rangedRate = Math.max(0, Number($('#rangedMaxHpReductionRate').value) || 0);
    const enemyState = linkedEnemyState();
    const mainRate = linkedMainRate();
    const model = selectedDamageModel();
    const modelState = modelInfo(model, enemyState, mainRate);
    const shield = selectedShield();
    const selectedId = $('#maxHpReductionOperatorSelect').value || 'mive';
    const profile = profiles.find(item => item.id === selectedId) || profiles[0];
    const rate = profile.rangeClass === 'melee' ? meleeRate : rangedRate;
    const result = simulate(profile, modelState.damage, shield, rate);
    const first = result.first || { actualHpDamage:0, maxHpLoss:0, absorbed:0 };
    const third = result.third || { hp:profile.maxHp, maxHp:profile.maxHp, cumulativeMaxLoss:0, shield };
    const rangeLabel = profile.rangeClass === 'melee' ? '근거리' : '원거리';

    $('#maxHpReductionSummaryValue').textContent = `근거리 ${number(meleeRate)}% · 원거리 ${number(rangedRate)}% · ${modelState.label}`;
    $('#meleeMaxHpReductionRateValue').textContent = `${number(meleeRate)}%`;
    $('#rangedMaxHpReductionRateValue').textContent = `${number(rangedRate)}%`;
    $('#maxHpDamageModelValue').textContent = modelState.label;
    $('#maxHpReductionShieldValue').textContent = number0(shield);
    $('#maxHpReductionOperatorHp').textContent = `최대 HP ${number0(profile.maxHp)}`;
    $('#maxHpReductionOperatorType').textContent = `${rangeLabel} · ${profile.type} · 적용 감소율 ${number(rate)}%`;
    $('#maxHpLinkedAttack').textContent = `${enemyState.attackLabel} ${number0(enemyState.baseAttack)}`;
    $('#maxHpLinkedEnemyRate').textContent = `${number(enemyState.rate)}%`;
    $('#maxHpLinkedMainRate').textContent = `${number(mainRate)}%`;
    $('#maxHpReductionRateRange').textContent = `${number(meleeRate)}% / ${number(rangedRate)}%`;

    $('#maxHpReductionSelectedName').textContent = profile.name;
    $('#maxHpReductionSelectedType').textContent = `${rangeLabel} · ${number(rate)}%`;
    $('#maxHpReductionSelectedBuild').textContent = buildText(profile);
    $('#maxHpReductionSelectedPortrait').src = profile.portrait;
    $('#maxHpReductionSelectedPortrait').alt = profile.name;
    $('#maxHpReductionDamage').textContent = number0(modelState.damage);
    $('#maxHpReductionDamageModelNote').textContent = modelState.formula;
    $('#maxHpReductionActualDamage').textContent = number0(first.actualHpDamage);
    $('#maxHpReductionShieldNote').textContent = `보호막 ${number0(first.absorbed)} 흡수 후`;
    $('#maxHpReductionOneLoss').textContent = `-${number0(first.maxHpLoss)}`;
    $('#maxHpReductionRateNote').textContent = `${rangeLabel} 감소율 ${number(rate)}%`;
    $('#maxHpReductionDownHit').textContent = downText(result.down);
    $('#maxHpReductionThreeHitState').textContent = `${number0(third.hp)} / ${number0(third.maxHp)}`;
    $('#maxHpReductionThreeHitLoss').textContent = `-${number0(third.cumulativeMaxLoss)}`;
    $('#maxHpReductionThreeHitShield').textContent = number0(third.shield);

    document.querySelectorAll('[data-melee-max-hp-rate]').forEach(button => button.classList.toggle('active', Number(button.dataset.meleeMaxHpRate) === meleeRate));
    document.querySelectorAll('[data-ranged-max-hp-rate]').forEach(button => button.classList.toggle('active', Number(button.dataset.rangedMaxHpRate) === rangedRate));
    document.querySelectorAll('[data-max-hp-damage-model]').forEach(button => button.classList.toggle('active', button.dataset.maxHpDamageModel === model));

    renderTimeline(result);
    renderDistribution(modelState.damage, shield, meleeRate, rangedRate, profile.id);
  }

  function initMaxHpReductionModel() {
    const root = $('#maxHpReductionConstraint');
    if (!root) return;
    const select = $('#maxHpReductionOperatorSelect');
    select.innerHTML = [...profiles].sort((a,b) => b.maxHp - a.maxHp).map(profile => {
      const rangeLabel = profile.rangeClass === 'melee' ? '근거리' : '원거리';
      return `<option value="${profile.id}">${profile.name} · ${rangeLabel} · 최대 HP ${number0(profile.maxHp)}</option>`;
    }).join('');
    select.value = 'mive';
    initialized = true;

    $('#meleeMaxHpReductionRate').addEventListener('input', updateMaxHpReductionModel);
    $('#rangedMaxHpReductionRate').addEventListener('input', updateMaxHpReductionModel);
    select.addEventListener('change', updateMaxHpReductionModel);
    $('#maxHpReductionShieldPreset').addEventListener('change', event => {
      const custom = $('#maxHpReductionShieldCustom');
      custom.hidden = event.target.value !== 'custom';
      if (event.target.value === 'custom') custom.focus();
      updateMaxHpReductionModel();
    });
    $('#maxHpReductionShieldCustom').addEventListener('input', updateMaxHpReductionModel);
    document.querySelectorAll('[data-melee-max-hp-rate]').forEach(button => button.addEventListener('click', () => {
      $('#meleeMaxHpReductionRate').value = button.dataset.meleeMaxHpRate;
      updateMaxHpReductionModel();
    }));
    document.querySelectorAll('[data-ranged-max-hp-rate]').forEach(button => button.addEventListener('click', () => {
      $('#rangedMaxHpReductionRate').value = button.dataset.rangedMaxHpRate;
      updateMaxHpReductionModel();
    }));
    document.querySelectorAll('[data-max-hp-damage-model]').forEach(button => button.addEventListener('click', () => {
      document.querySelectorAll('[data-max-hp-damage-model]').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      updateMaxHpReductionModel();
    }));
    updateMaxHpReductionModel();
  }

  window.addEventListener('endfield:enemy-damage-change', () => { if (initialized) updateMaxHpReductionModel(); });
  window.addEventListener('endfield:main-control-damage-change', () => { if (initialized) updateMaxHpReductionModel(); });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initMaxHpReductionModel);
  else initMaxHpReductionModel();
})();

(() => {
  'use strict';

  const profiles = [
    { id:'laevatain', name:'레바테인', baseHp:6100, type:'검', portrait:'assets/characters/laevatain/portrait.png' },
    { id:'camu', name:'카뮤', baseHp:6005, type:'장병기', portrait:'assets/characters/camu/portrait.png' },
    { id:'amber', name:'엠버', baseHp:6375, type:'대검', portrait:'assets/characters/amber/portrait.png', hpWeapon:'과거의 일품', hpMultiplier:1.78 },
    { id:'wolfguard', name:'울프가드', baseHp:6300, type:'권총', portrait:'assets/characters/wolfguard/portrait.png' },
    { id:'akekuri', name:'아케쿠리', baseHp:6045, type:'검', portrait:'assets/characters/akekuri/portrait.png' },
    { id:'yvonne', name:'이본', baseHp:5905, type:'권총', portrait:'assets/characters/yvonne/portrait.png' },
    { id:'tangtang', name:'탕탕', baseHp:6110, type:'권총', portrait:'assets/characters/tangtang/portrait.png' },
    { id:'last-light', name:'라스트 라이트', baseHp:6270, type:'대검', portrait:'assets/characters/last-light/portrait.png', hpWeapon:'과거의 일품', hpMultiplier:1.78 },
    { id:'xaihi', name:'자이히', baseHp:5940, type:'아츠 유닛', portrait:'assets/characters/xaihi/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'snowshine', name:'스노우샤인', baseHp:6265, type:'대검', portrait:'assets/characters/snowshine/portrait.png', hpWeapon:'과거의 일품', hpMultiplier:1.78 },
    { id:'alesh', name:'알레쉬', baseHp:6285, type:'검', portrait:'assets/characters/alesh/portrait.png' },
    { id:'estella', name:'에스텔라', baseHp:6015, type:'장병기', portrait:'assets/characters/estella/portrait.png' },
    { id:'jangbangyi', name:'장방이', baseHp:5990, type:'아츠 유닛', portrait:'assets/characters/jangbangyi/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'perlica', name:'펠리카', baseHp:5950, type:'아츠 유닛', portrait:'assets/characters/perlica/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'arclight', name:'아크라이트', baseHp:6030, type:'검', portrait:'assets/characters/arclight/portrait.png' },
    { id:'avivenna', name:'아비웨나', baseHp:6030, type:'장병기', portrait:'assets/characters/avivenna/portrait.png' },
    { id:'antal', name:'안탈', baseHp:6140, type:'아츠 유닛', portrait:'assets/characters/antal/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'gilberta', name:'질베르타', baseHp:5940, type:'아츠 유닛', portrait:'assets/characters/gilberta/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'adelia', name:'아델리아', baseHp:6055, type:'아츠 유닛', portrait:'assets/characters/adelia/portrait.png', hpWeapon:'기사도 정신', hpMultiplier:1.78 },
    { id:'fluorite', name:'플루라이트', baseHp:5945, type:'권총', portrait:'assets/characters/fluorite/portrait.png' },
    { id:'administrator', name:'관리자 [남][여]', baseHp:6110, type:'검', portrait:'assets/characters/administrator-female/portrait.png' },
    { id:'mive', name:'미브', baseHp:6080, type:'대검', portrait:'assets/characters/mive/portrait.png', hpWeapon:'천둥의 흔적', fixedMaxHp:12709.2 },
    { id:'rossi', name:'로시', baseHp:5980, type:'검', portrait:'assets/characters/rossi/portrait.png' },
    { id:'pogranichnik', name:'포그라니치크', baseHp:6000, type:'검', portrait:'assets/characters/pogranichnik/portrait.png' },
    { id:'yufeng', name:'여풍', baseHp:6110, type:'장병기', portrait:'assets/characters/yufeng/portrait.png' },
    { id:'jintianyu', name:'진천우', baseHp:6025, type:'검', portrait:'assets/characters/jintianyu/portrait.png' },
    { id:'pan', name:'판', baseHp:6370, type:'대검', portrait:'assets/characters/pan/portrait.png', hpWeapon:'과거의 일품', hpMultiplier:1.78 },
    { id:'kachir', name:'카치르', baseHp:6375, type:'대검', portrait:'assets/characters/kachir/portrait.png', hpWeapon:'과거의 일품', hpMultiplier:1.78 }
  ].map(profile => ({ ...profile, maxHp: profile.fixedMaxHp || profile.baseHp * (profile.hpMultiplier || 1) }));

  const $ = selector => document.querySelector(selector);
  const fmt = new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 1 });
  const fmt0 = new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 0 });
  const number = value => fmt.format(Number(value) || 0);
  const number0 = value => fmt0.format(Math.round(Number(value) || 0));
  const levels = {
    none: { label:'제약 없음', perGap:3, total:9 },
    one: { label:'쇠퇴 I', perGap:1, total:3 },
    two: { label:'쇠퇴 II', perGap:0, total:0 }
  };
  let initialized = false;

  function linkedEnemyState() {
    if (window.endfieldEnemyDamageState) return window.endfieldEnemyDamageState;
    const rate = Math.max(0, Number($('#enemyDamageRate')?.value) || 25);
    const active = document.querySelector('[data-enemy-attack].active');
    const baseAttack = Math.max(0, Number(active?.dataset.enemyAttack) || 1400);
    const attackLabel = baseAttack === 800 ? '하급' : baseAttack === 2200 ? '강공' : '표준';
    return { rate, baseAttack, attackLabel, damage:baseAttack * (1 + rate / 100) };
  }

  function linkedMainRate() {
    if (window.endfieldMainControlDamageState) return Math.max(0, Number(window.endfieldMainControlDamageState.rate) || 0);
    return Math.max(0, Number($('#mainControlDamageRate')?.value) || 25);
  }

  function linkedToxicRate() {
    return Math.max(0, Number($('#toxicDamageRate')?.value) || 5);
  }

  function selectedLevelKey() {
    return document.querySelector('[data-decay-level].active')?.dataset.decayLevel || 'one';
  }

  function selectedDamageModel() {
    return document.querySelector('[data-decay-damage-model].active')?.dataset.decayDamageModel || 'combined';
  }

  function selectedShield() {
    const preset = $('#decayShieldPreset');
    const custom = $('#decayShieldCustom');
    if (!preset || !custom) return 0;
    return preset.value === 'custom' ? Math.max(0, Number(custom.value) || 0) : Math.max(0, Number(preset.value) || 0);
  }

  function buildText(profile) {
    if (profile.hpWeapon) return `Lv.90 기본 HP ${number0(profile.baseHp)} · 생존 비교용 ${profile.hpWeapon} Lv.90 · 재련 0 · 완벽 기질 [9/9/4] · 최대 HP ${number0(profile.maxHp)}`;
    return `Lv.90 기본 HP ${number0(profile.baseHp)} · ${profile.type} 무기군에서 최대 HP 보조 속성을 확인하지 못해 무기 HP 보정 없음`;
  }

  function modelInfo(model, profile, enemyState, mainRate, toxicRate) {
    if (model === 'base') return { label:'기준 공격력', damage:enemyState.baseAttack, formula:`${enemyState.attackLabel} 공격력 ${number0(enemyState.baseAttack)}` };
    if (model === 'enemy') return { label:'적 피해 증가 적용', damage:enemyState.baseAttack * (1 + enemyState.rate / 100), formula:`${number0(enemyState.baseAttack)} × ${number(1 + enemyState.rate / 100)}` };
    if (model === 'main') return { label:'메인 피격 증가 적용', damage:enemyState.baseAttack * (1 + mainRate / 100), formula:`${number0(enemyState.baseAttack)} × ${number(1 + mainRate / 100)}` };
    if (model === 'toxic') return { label:'독성 물질 1초', damage:profile.maxHp * toxicRate / 100, formula:`최대 HP × ${number(toxicRate)}%` };
    return { label:'두 피해 제약 동시 적용', damage:enemyState.baseAttack * (1 + enemyState.rate / 100) * (1 + mainRate / 100), formula:`${number0(enemyState.baseAttack)} × ${number(1 + enemyState.rate / 100)} × ${number(1 + mainRate / 100)}` };
  }

  function simulate(profile, damage, shield, hits) {
    let hp = profile.maxHp;
    let remainingShield = shield;
    for (let index = 0; index < hits; index += 1) {
      const absorbed = Math.min(remainingShield, damage);
      remainingShield -= absorbed;
      const hpDamage = Math.max(0, damage - absorbed);
      hp = Math.max(0, hp - hpDamage);
      if (hp <= 0) break;
    }
    const missing = Math.max(0, profile.maxHp - hp);
    return { hp, missing, shield:remainingShield, dead:hp <= 0 };
  }

  function neededMaterials(state, healAmount) {
    if (state.dead) return Infinity;
    if (state.missing <= 0) return 0;
    return Math.ceil(state.missing / Math.max(healAmount, .0001));
  }

  function availabilityText(needed, count) {
    if (!Number.isFinite(needed)) return { className:'fail', text:'전투 불능' };
    if (needed === 0) return { className:'ok', text:'회복 불필요' };
    if (count >= needed) return { className:'ok', text:'복구 가능' };
    return { className:'fail', text:`${needed - count}개 부족` };
  }

  function renderAvailability(needed) {
    return Object.values(levels).map(level => {
      const status = availabilityText(needed, level.total);
      return `<div class="${status.className}"><span>${level.label} · ${level.total}개</span><b>${status.text}</b></div>`;
    }).join('');
  }

  function renderWaveFlow(level) {
    const gaps = ['웨이브 1 → 2','웨이브 2 → 3','웨이브 3 → 4'];
    $('#decayWaveFlow').innerHTML = gaps.map(label => `<article class="decay-wave-gap"><span>${label}</span><b>${level.perGap}개 생성</b><small>${level.label} 적용</small></article>`).join('');
  }

  function renderHitScenarios(profile, model, enemyState, mainRate, toxicRate, shield, healAmount) {
    $('#decayHitScenarios').innerHTML = [1,2,3].map(hits => {
      const modelState = modelInfo(model, profile, enemyState, mainRate, toxicRate);
      const state = simulate(profile, modelState.damage, shield, hits);
      const needed = neededMaterials(state, healAmount);
      const neededLabel = Number.isFinite(needed) ? `${needed}개` : '복구 불가';
      return `<article class="decay-hit-card ${state.dead ? 'danger' : ''}">
        <span>${hits}회 연속 피격</span>
        <h5>${state.dead ? '전투 불능' : `남은 HP ${number0(state.hp)}`}</h5>
        <dl>
          <dt>손실 HP</dt><dd>${number0(state.missing)}</dd>
          <dt>남은 보호막</dt><dd>${number0(state.shield)}</dd>
          <dt>풀 HP 복구 필요</dt><dd>${neededLabel}</dd>
        </dl>
        <div class="decay-availability-grid">${renderAvailability(needed)}</div>
      </article>`;
    }).join('');
  }

  function renderDistribution(model, enemyState, mainRate, toxicRate, shield, healRate, level, selectedId) {
    const sorted = [...profiles].sort((a,b) => b.maxHp - a.maxHp);
    const minHp = Math.min(...sorted.map(profile => profile.maxHp));
    const maxHp = Math.max(...sorted.map(profile => profile.maxHp));
    $('#decayOperatorHpRange').textContent = `${number0(minHp)} ~ ${number0(maxHp)}`;
    $('#decayOperatorResults').innerHTML = sorted.map(profile => {
      const modelState = modelInfo(model, profile, enemyState, mainRate, toxicRate);
      const state = simulate(profile, modelState.damage, shield, 3);
      const healAmount = profile.maxHp * healRate / 100;
      const needed = neededMaterials(state, healAmount);
      const status = availabilityText(needed, level.total);
      const neededLabel = Number.isFinite(needed) ? `${needed}개 필요` : '전투 불능';
      const fallbackAttr = profile.id === 'camu' ? ` onerror="this.onerror=null;this.src='assets/characters/camille/portrait.png'"` : '';
      return `<button type="button" class="decay-operator-card ${profile.id === selectedId ? 'selected' : ''}" data-decay-operator-card="${profile.id}">
        <div class="decay-card-profile"><img src="${profile.portrait}" alt="${profile.name}"${fallbackAttr}><div><h5>${profile.name}</h5><p>최대 HP ${number0(profile.maxHp)} · 1개 회복 ${number0(healAmount)}</p></div></div>
        <div class="decay-card-result"><b>${neededLabel}</b><small>3회 후 HP ${number0(state.hp)}</small><strong class="${status.className === 'ok' ? 'safe' : ''}">${level.label}: ${status.text}</strong></div>
      </button>`;
    }).join('');
    document.querySelectorAll('[data-decay-operator-card]').forEach(button => {
      button.addEventListener('click', () => {
        $('#decayOperatorSelect').value = button.dataset.decayOperatorCard;
        updateDecayModel();
      });
    });
  }

  function updateDecayModel() {
    if (!initialized) return;
    const levelKey = selectedLevelKey();
    const level = levels[levelKey];
    const healRate = Math.max(0, Number($('#decayHealRate').value) || 30);
    const model = selectedDamageModel();
    const enemyState = linkedEnemyState();
    const mainRate = linkedMainRate();
    const toxicRate = linkedToxicRate();
    const shield = selectedShield();
    const selectedId = $('#decayOperatorSelect').value || 'mive';
    const profile = profiles.find(item => item.id === selectedId) || profiles[0];
    const modelState = modelInfo(model, profile, enemyState, mainRate, toxicRate);
    const healAmount = profile.maxHp * healRate / 100;

    $('#decaySummaryValue').textContent = `${level.label} · 치유 물질 ${level.total}개 · 1개당 최대 HP ${number(healRate)}%`;
    $('#decayLevelValue').textContent = `${level.label} · 총 ${level.total}개`;
    $('#decayHealRateValue').textContent = `${number(healRate)}%`;
    $('#decayDamageModelValue').textContent = modelState.label;
    $('#decayShieldValue').textContent = number0(shield);
    $('#decayOperatorHp').textContent = `최대 HP ${number0(profile.maxHp)}`;
    $('#decayLinkedAttack').textContent = `${enemyState.attackLabel} ${number0(enemyState.baseAttack)}`;
    $('#decayLinkedEnemyRate').textContent = `${number(enemyState.rate)}%`;
    $('#decayLinkedMainRate').textContent = `${number(mainRate)}%`;
    $('#decayLinkedToxicRate').textContent = `현재 최대 HP ${number(toxicRate)}%`;
    $('#decayTotalMaterials').textContent = `총 ${level.total}개`;
    $('#decaySelectedName').textContent = profile.name;
    $('#decaySelectedBuild').textContent = buildText(profile);
    $('#decaySelectedPortrait').src = profile.portrait;
    $('#decaySelectedPortrait').alt = profile.name;
    $('#decayOneHealAmount').textContent = number0(healAmount);
    $('#decayOneHealNote').textContent = `최대 HP의 ${number(healRate)}%`;
    $('#decayOneHitDamage').textContent = number0(modelState.damage);
    $('#decayDamageFormulaNote').textContent = modelState.formula;
    $('#decaySelectedShield').textContent = number0(shield);
    $('#decaySelectedLevel').textContent = `${level.label} · ${level.total}개`;

    document.querySelectorAll('[data-decay-level]').forEach(button => button.classList.toggle('active', button.dataset.decayLevel === levelKey));
    document.querySelectorAll('[data-decay-rate]').forEach(button => button.classList.toggle('active', Number(button.dataset.decayRate) === healRate));
    document.querySelectorAll('[data-decay-damage-model]').forEach(button => button.classList.toggle('active', button.dataset.decayDamageModel === model));

    renderWaveFlow(level);
    renderHitScenarios(profile, model, enemyState, mainRate, toxicRate, shield, healAmount);
    renderDistribution(model, enemyState, mainRate, toxicRate, shield, healRate, level, profile.id);

    const linkedState = { level:levelKey, materials:level.total, healRate, damageModel:model };
    window.endfieldDecayState = linkedState;
    window.dispatchEvent(new CustomEvent('endfield:decay-change', { detail:linkedState }));
  }

  function initDecayModel() {
    const root = $('#decayConstraint');
    if (!root) return;
    const select = $('#decayOperatorSelect');
    select.innerHTML = [...profiles].sort((a,b) => b.maxHp - a.maxHp).map(profile => `<option value="${profile.id}">${profile.name} · 최대 HP ${number0(profile.maxHp)}</option>`).join('');
    select.value = 'mive';
    initialized = true;

    $('#decayHealRate').addEventListener('input', updateDecayModel);
    select.addEventListener('change', updateDecayModel);
    $('#decayShieldPreset').addEventListener('change', event => {
      const custom = $('#decayShieldCustom');
      custom.hidden = event.target.value !== 'custom';
      if (event.target.value === 'custom') custom.focus();
      updateDecayModel();
    });
    $('#decayShieldCustom').addEventListener('input', updateDecayModel);
    document.querySelectorAll('[data-decay-level]').forEach(button => button.addEventListener('click', () => {
      document.querySelectorAll('[data-decay-level]').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      updateDecayModel();
    }));
    document.querySelectorAll('[data-decay-rate]').forEach(button => button.addEventListener('click', () => {
      $('#decayHealRate').value = button.dataset.decayRate;
      updateDecayModel();
    }));
    document.querySelectorAll('[data-decay-damage-model]').forEach(button => button.addEventListener('click', () => {
      document.querySelectorAll('[data-decay-damage-model]').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      updateDecayModel();
    }));
    $('#toxicDamageRate')?.addEventListener('input', updateDecayModel);
    document.querySelectorAll('[data-toxic-rate]').forEach(button => button.addEventListener('click', updateDecayModel));
    updateDecayModel();
  }

  window.addEventListener('endfield:enemy-damage-change', () => { if (initialized) updateDecayModel(); });
  window.addEventListener('endfield:main-control-damage-change', () => { if (initialized) updateDecayModel(); });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initDecayModel);
  else initDecayModel();
})();

(() => {
  'use strict';

  const source = window.V043_DATA;
  if (!source || !Array.isArray(source.parties)) return;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const fmt = new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 1 });
  const fmt0 = new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 0 });
  const n1 = value => fmt.format(Number(value) || 0);
  const n0 = value => fmt0.format(Math.round(Number(value) || 0));
  const sec = value => `${n1(value)}초`;
  const pct = value => `${n1(value)}%`;
  const freezeSeconds = 5;

  const parties = source.parties.map(raw => {
    const characters = Array.isArray(raw.characters)
      ? raw.characters
      : Object.entries(raw.characters || {}).map(([id, character]) => ({ id, ...character }));
    const order = Array.isArray(raw.order) && raw.order.length ? raw.order : characters.map(character => character.id);
    const charMap = Object.fromEntries(characters.map(character => [character.id, character]));
    const events = (raw.events || []).map((event, index) => ({
      ...event,
      _index: index,
      time: Number(event.time) || 0,
      damage: Number(event.damage) || 0
    })).sort((a, b) => a.time - b.time || a._index - b._index);
    const duration = Math.max(0.001, Number(raw.duration) || Math.max(...events.map(event => event.time), 0.001));
    const totalDamage = Number(raw.totalDamage) || events.reduce((sum, event) => sum + event.damage, 0);
    const dps = Number(raw.dps) || totalDamage / duration;
    return { ...raw, characters, order, charMap, events, duration, totalDamage, dps };
  });

  const panelConfig = {
    battle: {
      rootId: 'battleChillConstraint',
      eventType: 'battle',
      sourceLabel: '배틀 스킬',
      summaryId: 'battleChillSummaryValue',
      stageValueId: 'battleChillStageValue',
      cooldownId: 'battleChillCooldown',
      cooldownValueId: 'battleChillCooldownValue',
      partyResultsId: 'battleChillPartyResults',
      partyRangeId: 'battleChillPartyRange'
    },
    combo: {
      rootId: 'comboChillConstraint',
      eventType: 'combo',
      sourceLabel: '연계 스킬',
      summaryId: 'comboChillSummaryValue',
      stageValueId: 'comboChillStageValue',
      cooldownId: 'comboChillCooldown',
      cooldownValueId: 'comboChillCooldownValue',
      partyResultsId: 'comboChillPartyResults',
      partyRangeId: 'comboChillPartyRange'
    }
  };

  const timelineView = new Map();

  function getStage(kind) {
    const selector = `[data-${kind}-chill-stage].active`;
    const stage = $(selector)?.dataset[`${kind}ChillStage`] || 'one';
    return stage === 'two'
      ? { key: 'two', label: '단계 II', threshold: 1 }
      : { key: 'one', label: '단계 I', threshold: 2 };
  }

  function getCooldown(kind) {
    const id = panelConfig[kind].cooldownId;
    return Math.max(0, Number($(`#${id}`)?.value) || 0);
  }

  function getConstraint(kind, cooldownOverride = null) {
    const stage = getStage(kind);
    return {
      key: kind,
      type: panelConfig[kind].eventType,
      label: panelConfig[kind].sourceLabel,
      threshold: stage.threshold,
      stageLabel: stage.label,
      cooldown: cooldownOverride === null ? getCooldown(kind) : cooldownOverride
    };
  }

  function characterName(party, id) {
    return party.charMap[id]?.name || id || '알 수 없음';
  }

  function simulateCold(party, constraints) {
    const counters = new Map();
    const lastAttachedAt = new Map();
    const perConstraint = Object.fromEntries(constraints.map(constraint => [constraint.key, { attempts: 0, attached: 0, missed: 0 }]));
    let stack = 0;
    let totalDelay = 0;
    let freezeCount = 0;
    let attachedCount = 0;
    let missedCount = 0;
    const freezeTimes = [];
    const logs = [];

    party.events.forEach((event, eventPosition) => {
      const appliedTime = event.time + totalDelay;
      constraints.forEach(constraint => {
        if (event.type !== constraint.type) return;
        const counterKey = `${constraint.key}|${event.character}`;
        const nextCount = (counters.get(counterKey) || 0) + 1;
        if (nextCount < constraint.threshold) {
          counters.set(counterKey, nextCount);
          return;
        }
        counters.set(counterKey, 0);
        perConstraint[constraint.key].attempts += 1;

        const lastKey = `${constraint.key}|${event.character}`;
        const lastTime = lastAttachedAt.has(lastKey) ? lastAttachedAt.get(lastKey) : -Infinity;
        const canAttach = appliedTime - lastTime >= constraint.cooldown - 1e-9;
        if (!canAttach) {
          perConstraint[constraint.key].missed += 1;
          missedCount += 1;
          logs.push({
            appliedTime,
            originalTime: event.time,
            character: characterName(party, event.character),
            action: event.label || constraint.label,
            source: constraint.label,
            status: '쿨타임으로 인한 냉기 스택 미부착',
            className: 'miss',
            stack,
            nextAt: lastTime + constraint.cooldown,
            freeze: false,
            delayAfter: totalDelay
          });
          return;
        }

        lastAttachedAt.set(lastKey, appliedTime);
        perConstraint[constraint.key].attached += 1;
        attachedCount += 1;
        stack += 1;
        let freeze = false;
        let shifted = false;
        if (stack >= 4) {
          freeze = true;
          freezeCount += 1;
          freezeTimes.push(appliedTime);
          stack = 0;
          if (eventPosition < party.events.length - 1) {
            totalDelay += freezeSeconds;
            shifted = true;
          }
        }
        logs.push({
          appliedTime,
          originalTime: event.time,
          character: characterName(party, event.character),
          action: event.label || constraint.label,
          source: constraint.label,
          status: freeze ? '냉기 스택 부착 후 동결 발생' : '냉기 스택 부착 성공',
          className: freeze ? 'freeze' : 'success',
          stack,
          nextAt: appliedTime + constraint.cooldown,
          freeze,
          shifted,
          delayAfter: totalDelay
        });
      });
    });

    const appliedDuration = party.duration + totalDelay;
    const appliedDps = party.dps * party.duration / Math.max(appliedDuration, 0.001);
    const lossRate = Math.max(0, (1 - appliedDps / Math.max(party.dps, 0.001)) * 100);
    return {
      baseDps: party.dps,
      appliedDps,
      lossRate,
      baseDuration: party.duration,
      appliedDuration,
      totalDelay,
      freezeCount,
      freezeTimes,
      attachedCount,
      missedCount,
      finalStack: stack,
      logs,
      perConstraint
    };
  }

  function settingsFor(kind) {
    const own = getConstraint(kind);
    const other = getConstraint(kind === 'battle' ? 'combo' : 'battle');
    const combined = kind === 'battle' ? [own, other] : [other, own];
    return { own, combined };
  }

  function portraitsHtml(party, compact = false) {
    return party.order.map(id => {
      const character = party.charMap[id] || {};
      return `<img src="${character.portrait || ''}" alt="${character.name || id}" style="object-position:${character.portraitPosition || '50% 40%'}"${compact ? ' loading="lazy"' : ''}>`;
    }).join('');
  }

  function metricMarkup(result) {
    return [
      ['적용 DPS', n1(result.appliedDps), `원본 ${n1(result.baseDps)}`],
      ['DPS 감소율', `-${pct(result.lossRate)}`, `${sec(result.baseDuration)} → ${sec(result.appliedDuration)}`],
      ['냉기 스택 부착', `${result.attachedCount}회`, `남은 스택 ${result.finalStack}`],
      ['냉기 스택 미부착', `${result.missedCount}회`, '부착 쿨타임 판정'],
      ['동결 발생', `${result.freezeCount}회`, result.freezeTimes.length ? result.freezeTimes.map(sec).join(' · ') : '발생 없음'],
      ['누적 행동 지연', sec(result.totalDelay), '동결 시점마다 이후 행동 이동']
    ].map(([label, value, note]) => `<div><span>${label}</span><b>${value}</b><small>${note}</small></div>`).join('');
  }

  function timelineMarkup(result) {
    if (!result.logs.length) return '<div class="chill-timeline-empty">현재 설정에서 냉기 스택 부착 판정이 발생하지 않았습니다.</div>';
    const rows = result.logs.map(log => {
      const timeNote = Math.abs(log.appliedTime - log.originalTime) > 0.001
        ? `원본 ${sec(log.originalTime)} → 적용 ${sec(log.appliedTime)}`
        : `적용 ${sec(log.appliedTime)}`;
      const stackText = log.freeze ? '동결 후 0스택' : `${log.stack}스택`;
      const statusNote = log.className === 'miss'
        ? `다음 부착 가능 ${sec(log.nextAt)}`
        : log.freeze
          ? `${log.shifted ? '이후 행동 5초 이동' : '이후 기록 행동 없음'} · 누적 지연 ${sec(log.delayAfter)}`
          : `다음 부착 가능 ${sec(log.nextAt)}`;
      return `<div class="chill-timeline-row">
        <div><b>${sec(log.appliedTime)}</b><small>${timeNote}</small></div>
        <div><b>${log.character}</b><small>${log.source}</small></div>
        <div><b>${log.action}</b><small>DATAFIELD 개별 기록 판정</small></div>
        <div class="${log.className}"><b>${log.status}</b><small>${statusNote}</small></div>
        <div><b>${stackText}</b><small>공용 냉기 스택</small></div>
      </div>`;
    }).join('');
    return `<div class="chill-timeline-head"><span>적용 시각</span><span>오퍼레이터</span><span>행동 기록</span><span>냉기 판정</span><span>누적 스택</span></div>${rows}`;
  }

  function cooldownMarkup(party, kind, ownConstraint) {
    return [1, 2, 3, 4, 5].map(cooldown => {
      const testConstraint = { ...ownConstraint, cooldown };
      const result = simulateCold(party, [testConstraint]);
      const active = Math.abs(getCooldown(kind) - cooldown) < 0.001;
      return `<article class="chill-cooldown-card ${active ? 'active' : ''}">
        <span>부착 쿨타임 ${cooldown}초</span>
        <b>DPS ${n1(result.appliedDps)}</b>
        <small>감소 ${pct(result.lossRate)} · 동결 ${result.freezeCount}회</small>
        <small>부착 ${result.attachedCount}회 · 미부착 ${result.missedCount}회</small>
        <small>행동 지연 ${sec(result.totalDelay)}</small>
      </article>`;
    }).join('');
  }

  function chillMetricCell(label, value, className = '') {
    return `<div class="result-metric"><span>${label}</span><b class="${className}">${value}</b></div>`;
  }

  function chillPartyFoldMarkup(party, kind, solo, combined) {
    const sourceLabel = panelConfig[kind].sourceLabel;
    const viewKey = `${kind}:${party.id}`;
    const view = timelineView.get(viewKey) || 'solo';
    const lossClass = solo.lossRate > 0 ? 'negative' : '';
    const impact = solo.freezeCount
      ? `${sourceLabel} 냉기 제약 단독 적용으로 ${solo.freezeCount}회의 동결이 발생해 행동이 총 ${sec(solo.totalDelay)} 지연됩니다. 두 냉기 제약을 함께 적용하면 동결 ${combined.freezeCount}회, 누적 지연 ${sec(combined.totalDelay)}, 적용 DPS ${n1(combined.appliedDps)}로 계산됩니다.`
      : `${sourceLabel} 냉기 제약 단독 적용에서는 동결이 발생하지 않았습니다. 두 냉기 제약을 함께 적용했을 때는 동결 ${combined.freezeCount}회, 누적 지연 ${sec(combined.totalDelay)}, 적용 DPS ${n1(combined.appliedDps)}로 계산됩니다.`;
    return `<details class="constraint-party-fold chill-party-fold" data-chill-kind="${kind}" data-chill-party="${party.id}">
      <summary class="party-result-bar">
        <div class="result-party-id"><div class="result-portraits">${portraitsHtml(party)}</div><div><b>${party.name}</b><span class="result-click-hint">클릭해서 파티 분석 펼치기</span></div></div>
        ${chillMetricCell('제약 적용 DPS', n1(solo.appliedDps))}
        ${chillMetricCell('DPS 감소율', `-${pct(solo.lossRate)}`, lossClass)}
        ${chillMetricCell('동결 발생', `${solo.freezeCount}회`)}
        ${chillMetricCell('누적 행동 지연', sec(solo.totalDelay))}
      </summary>
      <div class="constraint-party-detail-body chill-party-detail-body">
        <div class="chill-readable-scenario-grid">
          <article class="chill-scenario-card solo">
            <div class="chill-scenario-heading"><span>${sourceLabel} 냉기 제약 단독</span><h5>단독 적용 결과</h5></div>
            <div class="chill-metric-list">${metricMarkup(solo)}</div>
          </article>
          <article class="chill-scenario-card combined">
            <div class="chill-scenario-heading"><span>배틀·연계 냉기 제약 결합</span><h5>두 제약 동시 적용 결과</h5></div>
            <div class="chill-metric-list">${metricMarkup(combined)}</div>
          </article>
        </div>

        <section class="chill-detail-panel chill-detail-cooldown-panel">
          <header><div><span>부착 쿨타임 비교</span><h5>1~5초 설정별 결과</h5><p>현재 단계는 유지하고 부착 쿨타임만 변경해 비교합니다.</p></div></header>
          <div class="chill-cooldown-results">${cooldownMarkup(party, kind, getConstraint(kind))}</div>
        </section>

        <section class="chill-detail-panel chill-detail-timeline-panel">
          <header class="chill-detail-timeline-heading">
            <div><span>냉기 부착 판정 타임라인</span><h5>${party.name}</h5><p>단독 적용과 두 제약 동시 적용의 판정 기록을 전환해서 확인합니다.</p></div>
            <div class="chill-view-buttons">
              <button type="button" data-chill-timeline-kind="${kind}" data-chill-timeline-party="${party.id}" data-chill-timeline-view="solo" class="${view === 'solo' ? 'active' : ''}">단독 적용</button>
              <button type="button" data-chill-timeline-kind="${kind}" data-chill-timeline-party="${party.id}" data-chill-timeline-view="combined" class="${view === 'combined' ? 'active' : ''}">두 제약 동시</button>
            </div>
          </header>
          <div class="chill-timeline" data-chill-timeline-panel="${kind}:${party.id}:solo"${view === 'solo' ? '' : ' hidden'}>${timelineMarkup(solo)}</div>
          <div class="chill-timeline" data-chill-timeline-panel="${kind}:${party.id}:combined"${view === 'combined' ? '' : ' hidden'}>${timelineMarkup(combined)}</div>
        </section>

        <div class="impact-analysis chill-impact-analysis"><span>전투 영향 해석</span><p>${impact}</p></div>
      </div>
    </details>`;
  }

  function updateButtons(kind, stage, cooldown) {
    $$(`[data-${kind}-chill-stage]`).forEach(button => {
      button.classList.toggle('active', button.dataset[`${kind}ChillStage`] === stage.key);
    });
    $$(`[data-${kind}-chill-cooldown]`).forEach(button => {
      button.classList.toggle('active', Math.abs(Number(button.dataset[`${kind}ChillCooldown`]) - cooldown) < 0.001);
    });
  }

  function bindPartyTimelineButtons(kind, root) {
    $$('[data-chill-timeline-view]', root).forEach(button => {
      button.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        const partyId = button.dataset.chillTimelineParty;
        const view = button.dataset.chillTimelineView;
        const key = `${kind}:${partyId}`;
        timelineView.set(key, view);
        $$(`[data-chill-timeline-kind="${kind}"][data-chill-timeline-party="${partyId}"]`, root).forEach(item => {
          item.classList.toggle('active', item.dataset.chillTimelineView === view);
        });
        $$(`[data-chill-timeline-panel^="${kind}:${partyId}:"]`, root).forEach(panel => {
          panel.hidden = panel.dataset.chillTimelinePanel !== `${kind}:${partyId}:${view}`;
        });
      });
    });
  }

  function updatePanel(kind) {
    const config = panelConfig[kind];
    const root = $(`#${config.rootId}`);
    if (!root) return;
    const stage = getStage(kind);
    const cooldown = getCooldown(kind);
    const { own, combined } = settingsFor(kind);

    $(`#${config.summaryId}`).textContent = `${stage.label} · ${stage.threshold}회마다 · 부착 쿨타임 ${sec(cooldown)}`;
    $(`#${config.stageValueId}`).textContent = `${stage.label} · ${stage.threshold}회마다`;
    $(`#${config.cooldownValueId}`).textContent = sec(cooldown);

    const partyResults = parties.map(party => ({
      party,
      solo: simulateCold(party, [own]),
      combined: simulateCold(party, combined)
    }));
    const losses = partyResults.map(item => item.solo.lossRate);
    $(`#${config.partyRangeId}`).textContent = losses.length ? `${pct(Math.min(...losses))} ~ ${pct(Math.max(...losses))}` : '-';

    const resultsRoot = $(`#${config.partyResultsId}`);
    const openParties = new Set($$('details[open][data-chill-party]', resultsRoot).map(item => item.dataset.chillParty));
    resultsRoot.innerHTML = partyResults.map(item => chillPartyFoldMarkup(item.party, kind, item.solo, item.combined)).join('');
    openParties.forEach(partyId => {
      const fold = $(`details[data-chill-party="${partyId}"]`, resultsRoot);
      if (fold) fold.open = true;
    });
    bindPartyTimelineButtons(kind, resultsRoot);
    updateButtons(kind, stage, cooldown);
  }

  function updateAll() {
    updatePanel('battle');
    updatePanel('combo');
    window.dispatchEvent(new CustomEvent('endfield:chill-constraints-change', {
      detail: {
        battle: getConstraint('battle'),
        combo: getConstraint('combo')
      }
    }));
  }

  function bindPanel(kind) {
    const config = panelConfig[kind];
    const cooldownInput = $(`#${config.cooldownId}`);
    if (!cooldownInput) return;
    cooldownInput.addEventListener('input', updateAll);

    $$(`[data-${kind}-chill-stage]`).forEach(button => {
      button.addEventListener('click', () => {
        $$(`[data-${kind}-chill-stage]`).forEach(item => item.classList.remove('active'));
        button.classList.add('active');
        updateAll();
      });
    });
    $$(`[data-${kind}-chill-cooldown]`).forEach(button => {
      button.addEventListener('click', () => {
        cooldownInput.value = button.dataset[`${kind}ChillCooldown`];
        updateAll();
      });
    });
  }

  function initChillConstraints() {
    if (!$('#battleChillConstraint') || !$('#comboChillConstraint')) return;
    bindPanel('battle');
    bindPanel('combo');
    updateAll();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initChillConstraints);
  else initChillConstraints();
})();


/* V0.12.7 · 실제 계산/조건이 직접 연결된 제약 빠른 이동 */
(() => {
  'use strict';

  const relatedConstraintEdges = [
    ['statConstraint', 'normalConstraint', '주요 능력치 감소 배율이 일반 공격 피해 감소 계산보다 먼저 적용됩니다.'],
    ['normalConstraint', 'skillGaugeRecoveryConstraint', '스킬 게이지 자연 회복 유지 조건이 일반 공격 마지막 타격입니다.'],
    ['hpConstraint', 'timeConstraint', '증가한 스테이지 HP와 감소한 제한시간이 같은 클리어 판정에 함께 적용됩니다.'],
    ['hpConstraint', 'stageEnhanceConstraint', '전체 몬스터 HP 배율이 지정 개체 강화 후 HP에도 적용됩니다.'],
    ['hpConstraint', 'highHpCapConstraint', '몬스터 최대 HP가 고체력 기준 판정과 0.1초 피해 상한량을 바꿉니다.'],
    ['hpConstraint', 'controlRecoveryConstraint', '제어 상태 중 회복량이 몬스터 최대 HP 비율로 계산됩니다.'],
    ['hpConstraint', 'healingShieldRecoveryPreview', '회복·보호막 발동 시 몬스터 회복량이 최대 HP 비율로 계산됩니다.'],
    ['timeConstraint', 'statusReapplyConstraint', '상태 재적용 대기로 늘어난 전투시간이 감소된 제한시간 판정에 반영됩니다.'],
    ['timeConstraint', 'battleChillConstraint', '배틀 스킬 냉기 누적으로 발생한 행동 지연이 제한시간 판정에 반영됩니다.'],
    ['timeConstraint', 'comboChillConstraint', '연계 스킬 냉기 누적으로 발생한 행동 지연이 제한시간 판정에 반영됩니다.'],
    ['skillOtherConstraint', 'comboSpeedConstraint', '두 제약이 배틀 스킬 피해 감소를 같은 피해 기록에 적용합니다.'],
    ['comboSpeedConstraint', 'statusWindowConstraint', '재사용시간 감소로 추가된 연계 스킬 기록이 상태 시간창 판정에 포함될 수 있습니다.'],
    ['comboSpeedConstraint', 'statusStageConstraint', '재사용시간 감소로 추가된 연계 스킬 기록이 상태 단계 판정에 포함될 수 있습니다.'],
    ['comboSpeedConstraint', 'statusReapplyConstraint', '추가 연계 스킬의 상태 부여도 재적용 간격 판정을 받습니다.'],
    ['comboSpeedConstraint', 'comboChillConstraint', '재사용시간 감소로 추가된 연계 스킬이 연계 냉기 부착 횟수에 포함됩니다.'],
    ['statusWindowConstraint', 'statusStageConstraint', '두 제약이 같은 상태 부착·소비 행동 기록을 기준으로 피해 감소를 판정합니다.'],
    ['statusWindowConstraint', 'statusReapplyConstraint', '재적용 대기로 이동한 상태 부착 시각이 상태 피해 감소 시간창을 바꿉니다.'],
    ['statusStageConstraint', 'statusReapplyConstraint', '재적용 대기로 이동한 상태 부착 시각이 상태 단계 누적과 초기화 시점을 바꿉니다.'],
    ['statusReapplyConstraint', 'battleChillConstraint', '재적용 대기로 조정된 행동 시각을 기준으로 배틀 냉기 부착과 동결을 계산합니다.'],
    ['statusReapplyConstraint', 'comboChillConstraint', '재적용 대기로 조정된 행동 시각을 기준으로 연계 냉기 부착과 동결을 계산합니다.'],
    ['stageEnhanceConstraint', 'highHpCapConstraint', '강화 대상의 α 개체 최대 HP가 고체력 기준과 순간 피해 상한량에 반영됩니다.'],
    ['stageEnhanceConstraint', 'controlRecoveryConstraint', '강화 대상의 α 개체 최대 HP가 제어 중 회복량에 반영됩니다.'],
    ['stageEnhanceConstraint', 'healingShieldRecoveryPreview', '강화 대상의 α 개체 최대 HP가 몬스터 회복량에 반영됩니다.'],
    ['highHpCapConstraint', 'controlRecoveryConstraint', '순간 피해 상한 적용 후의 피해량을 기준으로 제어 중 회복 결과를 계산합니다.'],
    ['healingShieldRecoveryPreview', 'decayConstraint', '치유 자원 감소가 메인 오퍼레이터의 회복 발생 횟수와 직접 연결됩니다.'],
    ['healingShieldRecoveryPreview', 'mainOperatorLockConstraint', '전환이 제한된 메인 오퍼레이터의 회복·보호막 수급이 몬스터 회복 조건과 연결됩니다.'],
    ['battleChillConstraint', 'comboChillConstraint', '두 제약은 같은 냉기 스택을 공유하며 4스택마다 동결을 발생시킵니다.'],
    ['battleChillConstraint', 'freezeReleaseConstraint', '배틀 스킬 냉기 누적으로 발생한 동결의 지속·해제 조건이 연결됩니다.'],
    ['comboChillConstraint', 'freezeReleaseConstraint', '연계 스킬 냉기 누적으로 발생한 동결의 지속·해제 조건이 연결됩니다.'],
    ['decayConstraint', 'maxHpReductionConstraint', '최대 HP 감소가 최대 HP 비율 기반 치유 물질의 실제 회복량을 낮춥니다.'],
    ['toxicResidueConstraint', 'movementRestrictionConstraint', '독성 물질 지역을 피해야 하는 상황에서 이동·회피 제한이 직접 작용합니다.'],
    ['toxicResidueConstraint', 'maxHpReductionConstraint', '독성 물질로 받은 실제 HP 피해가 최대 HP 감소 조건과 연결됩니다.'],
    ['freezeReleaseConstraint', 'heatAbsorptionConstraint', '두 제약 모두 동결 상태의 발생·지속·해제를 직접 다룹니다.'],
    ['movementRestrictionConstraint', 'mainControlDamageConstraint', '회피 사용 불가 상태에서 메인 컨트롤 오퍼레이터의 증가 피해를 피하기 어려워집니다.'],
    ['mainOperatorLockConstraint', 'mainControlDamageConstraint', '메인 오퍼레이터 전환 제한으로 증가 피해를 받는 조작 대상을 교체할 수 없습니다.'],
    ['mainOperatorLockConstraint', 'maxHpReductionConstraint', '조작 대상 교체가 불가능해 같은 오퍼레이터에게 최대 HP 감소가 누적됩니다.'],
    ['enemyDamageConstraint', 'mainControlDamageConstraint', '메인 컨트롤 오퍼레이터 피해 계산이 적 피해 증가 설정을 연동해 사용합니다.'],
    ['enemyDamageConstraint', 'maxHpReductionConstraint', '증가한 실제 HP 피해량이 최대 HP 감소량 계산에 직접 반영됩니다.'],
    ['mainControlDamageConstraint', 'maxHpReductionConstraint', '메인 컨트롤 오퍼레이터가 받은 증가 피해가 최대 HP 감소량에 직접 반영됩니다.']
  ];

  const relationMap = new Map();
  const addRelation = (from, to, reason) => {
    if (!relationMap.has(from)) relationMap.set(from, []);
    relationMap.get(from).push({ id: to, reason });
  };
  relatedConstraintEdges.forEach(([a, b, reason]) => {
    addRelation(a, b, reason);
    addRelation(b, a, reason);
  });

  const constraintMeta = new Map();
  const constraintNumber = id => Number(constraintMeta.get(id)?.number || 999);
  let flyout;
  let activeSummary = null;
  let hideTimer = 0;

  function readConstraintMeta() {
    document.querySelectorAll('details.constraint-details:not(.combo-details)').forEach(details => {
      const summary = details.querySelector(':scope > summary.constraint-summary');
      const index = summary?.querySelector('.constraint-index')?.textContent.trim() || '';
      const title = summary?.querySelector(':scope > div:nth-of-type(1) h3')?.textContent.trim() || '';
      if (!summary || !index || !title) return;
      constraintMeta.set(details.id, { number: index, title, details, summary });
    });
  }

  function ensureFlyout() {
    flyout = document.createElement('aside');
    flyout.className = 'related-constraint-flyout';
    flyout.setAttribute('aria-label', '직접 연관된 제약 빠른 이동');
    flyout.hidden = true;
    flyout.addEventListener('pointerenter', cancelHide);
    flyout.addEventListener('pointerleave', scheduleHide);
    flyout.addEventListener('focusin', cancelHide);
    flyout.addEventListener('focusout', scheduleHide);
    document.body.appendChild(flyout);
  }

  function cancelHide() {
    if (hideTimer) window.clearTimeout(hideTimer);
    hideTimer = 0;
  }

  function scheduleHide() {
    cancelHide();
    hideTimer = window.setTimeout(hideFlyout, 190);
  }

  function hideFlyout() {
    cancelHide();
    if (activeSummary) activeSummary.classList.remove('related-constraint-source-active');
    activeSummary = null;
    flyout?.classList.remove('is-visible');
    window.setTimeout(() => {
      if (flyout && !flyout.classList.contains('is-visible')) flyout.hidden = true;
    }, 150);
  }

  function positionFlyout(summary) {
    const rect = summary.getBoundingClientRect();
    const panelRect = flyout.getBoundingClientRect();
    const gap = 12;
    const viewportGap = 10;
    let left = rect.left - panelRect.width - gap;
    let top = rect.top + (rect.height - panelRect.height) / 2;
    let placement = 'left';

    if (left < viewportGap) {
      left = Math.min(Math.max(viewportGap, rect.left), window.innerWidth - panelRect.width - viewportGap);
      if (rect.top >= panelRect.height + gap + viewportGap) {
        top = rect.top - panelRect.height - gap;
        placement = 'above';
      } else {
        top = rect.bottom + gap;
        placement = 'below';
      }
    }

    top = Math.min(Math.max(viewportGap, top), window.innerHeight - panelRect.height - viewportGap);
    flyout.style.left = `${Math.round(left)}px`;
    flyout.style.top = `${Math.round(top)}px`;
    flyout.dataset.placement = placement;
  }

  function navigateToConstraint(targetId) {
    const meta = constraintMeta.get(targetId);
    if (!meta) return;
    const target = meta.details;
    const tuning = target.closest('#constraintTuningDetails');
    const group = target.closest('.constraint-group-details');
    if (tuning) tuning.open = true;
    if (group) group.open = true;
    hideFlyout();
    window.setTimeout(() => {
      meta.summary.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.classList.remove('related-constraint-arrival');
      void target.offsetWidth;
      target.classList.add('related-constraint-arrival');
      window.setTimeout(() => target.classList.remove('related-constraint-arrival'), 2200);
    }, 80);
  }

  function showFlyout(sourceId) {
    const source = constraintMeta.get(sourceId);
    const relations = (relationMap.get(sourceId) || [])
      .filter(item => constraintMeta.has(item.id))
      .sort((a, b) => constraintNumber(a.id) - constraintNumber(b.id));
    if (!source || !relations.length) {
      hideFlyout();
      return;
    }
    cancelHide();
    if (activeSummary && activeSummary !== source.summary) activeSummary.classList.remove('related-constraint-source-active');
    activeSummary = source.summary;
    activeSummary.classList.add('related-constraint-source-active');
    const sourceNumberValue = Number(source.number);
    flyout.dataset.accent = sourceNumberValue >= 19 && sourceNumberValue <= 23 ? 'green' : 'default';
    flyout.innerHTML = `
      <header class="related-constraint-flyout-heading">
        <span>직접 연관 제약</span>
        <b>${relations.length}개</b>
      </header>
      <div class="related-constraint-links">
        ${relations.map(item => {
          const target = constraintMeta.get(item.id);
          return `<button type="button" data-related-target="${item.id}" title="${item.reason.replace(/"/g, '&quot;')}"><span>${target.number}</span><b>${target.title}</b></button>`;
        }).join('')}
      </div>
      <p class="related-constraint-rule">계산식·발동 조건·공용 자원이 직접 연결된 항목만 표시합니다.</p>`;
    flyout.querySelectorAll('[data-related-target]').forEach(button => {
      button.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        navigateToConstraint(button.dataset.relatedTarget);
      });
    });
    flyout.hidden = false;
    flyout.classList.add('is-visible');
    requestAnimationFrame(() => positionFlyout(source.summary));
  }

  function bindConstraintSummaries() {
    constraintMeta.forEach((meta, id) => {
      if (!(relationMap.get(id) || []).length) return;
      meta.details.dataset.relatedConstraintCount = String(relationMap.get(id).length);
      meta.summary.addEventListener('pointerenter', () => showFlyout(id));
      meta.summary.addEventListener('pointerleave', scheduleHide);
      meta.summary.addEventListener('focusin', () => showFlyout(id));
      meta.summary.addEventListener('focusout', scheduleHide);
    });
    window.addEventListener('scroll', () => {
      if (activeSummary && flyout?.classList.contains('is-visible')) positionFlyout(activeSummary);
    }, { passive: true });
    window.addEventListener('resize', () => {
      if (activeSummary && flyout?.classList.contains('is-visible')) positionFlyout(activeSummary);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') hideFlyout();
    });
  }

  function initRelatedConstraintNavigator() {
    readConstraintMeta();
    ensureFlyout();
    bindConstraintSummaries();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initRelatedConstraintNavigator);
  else initRelatedConstraintNavigator();
})();


/* V0.12.8 · 제약 밸런싱 버전 저장 · JSON 내보내기 · 이전 설정 복원 */
(() => {
  'use strict';

  const STORAGE_KEY = 'endfield.constraint.balance.saved.v1';
  const SCHEMA = 'endfield-constraint-balance';
  const SCHEMA_VERSION = 1;
  const SITE_VERSION = 'V0.15.4';
  const bundledDefaultRecord = globalThis.ENDFIELD_DEFAULT_BALANCE || null;
  const settingAttributes = [
    'data-stat','data-normal','data-hp','data-time','data-battle','data-other',
    'data-ult-repeat','data-speed-cooldown','data-speed-battle','data-status-duration',
    'data-status-reduction','data-status-stage-duration','data-status-stage-reduction',
    'data-status-reapply','data-stage-enhance','data-high-hp-threshold','data-high-hp-cap',
    'data-control-recovery','data-battle-chill-stage','data-battle-chill-cooldown',
    'data-combo-chill-stage','data-combo-chill-cooldown','data-decay-level','data-decay-rate',
    'data-decay-damage-model','data-toxic-rate','data-freeze-release','data-enemy-rate',
    'data-enemy-attack','data-main-control-rate','data-melee-max-hp-rate',
    'data-ranged-max-hp-rate','data-max-hp-damage-model'
  ];

  const $ = selector => document.querySelector(selector);
  let toastTimer = 0;

  function safeStorageRead() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.warn('저장 목록을 읽지 못했습니다.', error);
      return [];
    }
  }

  function safeStorageWrite(records) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
      return true;
    } catch (error) {
      console.warn('저장 목록을 기록하지 못했습니다.', error);
      showToast('브라우저 저장소를 사용할 수 없습니다.', true);
      return false;
    }
  }

  function showToast(message, isError = false) {
    const toast = $('#balanceSaveToast');
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.toggle('is-error', isError);
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add('is-visible'));
    toastTimer = window.setTimeout(() => {
      toast.classList.remove('is-visible');
      window.setTimeout(() => { toast.hidden = true; }, 180);
    }, 2600);
  }

  function captureControls() {
    const controls = {};
    document.querySelectorAll('#constraints input[id], #constraints select[id], #constraints textarea[id]').forEach(control => {
      if (control.type === 'file') return;
      controls[control.id] = {
        tag: control.tagName.toLowerCase(),
        type: control.type || '',
        value: control.value,
        checked: control.matches('input[type="checkbox"],input[type="radio"]') ? control.checked : undefined
      };
    });
    return controls;
  }

  function captureActiveSelections() {
    return settingAttributes.map(attribute => {
      const button = [...document.querySelectorAll(`#constraints button.active[${attribute}]`)][0];
      return button ? { attribute, value: button.getAttribute(attribute) } : null;
    }).filter(Boolean);
  }

  function captureConstraintSnapshot() {
    return [...document.querySelectorAll('details.constraint-details:not(.combo-details)')].map(details => {
      const summary = details.querySelector(':scope > summary.constraint-summary');
      return {
        id: details.id,
        number: summary?.querySelector('.constraint-index')?.textContent.trim() || '',
        title: summary?.querySelector(':scope > div:nth-of-type(1) h3')?.textContent.trim() || '',
        currentSetting: summary?.querySelector('.current-setting b')?.textContent.trim() || ''
      };
    });
  }

  function captureEnabledComboConstraints() {
    return [...document.querySelectorAll('#comboConstraintControls input[type="checkbox"][id]')]
      .filter(input => input.checked)
      .map(input => ({
        id: input.id,
        label: input.closest('.combo-selector')?.querySelector('header b')?.textContent.trim() || input.id
      }));
  }

  function createRecord() {
    const now = new Date();
    return {
      schema: SCHEMA,
      schemaVersion: SCHEMA_VERSION,
      siteVersion: SITE_VERSION,
      id: globalThis.crypto?.randomUUID?.() || `balance-${now.getTime()}-${Math.random().toString(16).slice(2)}`,
      name: `밸런싱 ${now.toLocaleString('ko-KR', { hour12: false })}`,
      savedAt: now.toISOString(),
      state: {
        controls: captureControls(),
        activeSelections: captureActiveSelections()
      },
      readable: {
        constraints: captureConstraintSnapshot(),
        enabledComboConstraints: captureEnabledComboConstraints()
      }
    };
  }

  function downloadRecord(record) {
    const json = JSON.stringify(record, null, 2);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    const stamp = record.savedAt.replace(/[:.]/g, '-');
    anchor.href = url;
    anchor.download = `endfield-constraint-balance-${stamp}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function dispatchControl(control) {
    control.dispatchEvent(new Event('input', { bubbles: true }));
    control.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function restoreComboSelections(record) {
    const enabledItems = record?.readable?.enabledComboConstraints;
    if (!Array.isArray(enabledItems)) return;

    // 저장 당시의 개별 제약 수치를 조합 조정창에도 그대로 복사합니다.
    $('#comboLoadSettings')?.click();

    const enabledIds = new Set(enabledItems.map(item => item?.id).filter(Boolean));
    const comboCheckboxIds = [
      'comboStatEnabled','comboNormalEnabled','comboSkillOtherEnabled','comboComboSpeedEnabled',
      'comboUltRepeatEnabled','comboStatusWindowEnabled','comboStatusStageEnabled',
      'comboStatusReapplyEnabled','comboBattleChillEnabled','comboComboChillEnabled',
      'comboStageEnhanceEnabled','comboHighHpCapEnabled','comboControlRecoveryEnabled',
      'comboHpEnabled','comboTimeEnabled'
    ];

    comboCheckboxIds.forEach(id => {
      const checkbox = document.getElementById(id);
      if (checkbox) checkbox.checked = enabledIds.has(id);
    });

    const updateTrigger = document.getElementById('comboTimeEnabled') ||
      comboCheckboxIds.map(id => document.getElementById(id)).find(Boolean);
    if (updateTrigger) updateTrigger.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function applyRecord(record, options = {}) {
    const { silent = false, closeModal = true } = options;
    if (!record || record.schema !== SCHEMA || !record.state) {
      if (!silent) showToast('지원하지 않는 저장 형식입니다.', true);
      return false;
    }

    (record.state.activeSelections || []).forEach(selection => {
      const button = [...document.querySelectorAll(`#constraints button[${selection.attribute}]`)]
        .find(item => item.getAttribute(selection.attribute) === String(selection.value));
      if (button && !button.classList.contains('active')) button.click();
    });

    const controls = record.state.controls || {};
    Object.entries(controls).forEach(([id, saved]) => {
      const control = document.getElementById(id);
      if (!control || !control.closest('#constraints')) return;
      if (control.matches('input[type="checkbox"],input[type="radio"]')) {
        control.checked = Boolean(saved.checked);
      } else if (saved.value !== undefined && saved.value !== null) {
        control.value = String(saved.value);
      }
      dispatchControl(control);
    });

    restoreComboSelections(record);

    if (!silent) {
      window.setTimeout(() => {
        if (closeModal) closeHistory();
        showToast(`“${record.name}” 설정을 불러왔습니다.`);
      }, 80);
    } else if (closeModal) {
      closeHistory();
    }
    return true;
  }

  function seedBundledDefaultRecord() {
    if (!bundledDefaultRecord || bundledDefaultRecord.schema !== SCHEMA) return;
    try {
      const records = safeStorageRead();
      if (records.some(record => record.id === bundledDefaultRecord.id)) return;
      records.unshift(bundledDefaultRecord);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records.slice(0, 50)));
    } catch (error) {
      console.warn('기본 밸런싱 저장본을 브라우저 목록에 등록하지 못했습니다.', error);
    }
  }

  function applyBundledDefaultRecord() {
    if (!bundledDefaultRecord || bundledDefaultRecord.schema !== SCHEMA) return;
    applyRecord(bundledDefaultRecord, { silent: true, closeModal: false });
  }

  function formatSavedAt(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value || '';
    return date.toLocaleString('ko-KR', { hour12: false });
  }

  function renderHistory() {
    const list = $('#balanceHistoryList');
    if (!list) return;
    const records = safeStorageRead();
    if (!records.length) {
      list.innerHTML = '<div class="balance-history-empty"><b>저장된 밸런싱이 없습니다.</b><span>상단의 제약 밸런싱 저장 버튼을 누르면 이곳에 버전이 등록됩니다.</span></div>';
      return;
    }
    list.innerHTML = records.map(record => `
      <article class="balance-history-item" data-balance-id="${record.id}">
        <div><b>${escapeHtml(record.name)}</b><span>${escapeHtml(formatSavedAt(record.savedAt))} · ${escapeHtml(record.siteVersion || '')}</span></div>
        <div class="balance-history-item-actions">
          <button type="button" data-balance-load="${record.id}">불러오기</button>
          <button type="button" data-balance-download="${record.id}">JSON</button>
          <button type="button" class="danger" data-balance-delete="${record.id}">삭제</button>
        </div>
      </article>`).join('');

    list.querySelectorAll('[data-balance-load]').forEach(button => button.addEventListener('click', () => {
      const record = safeStorageRead().find(item => item.id === button.dataset.balanceLoad);
      applyRecord(record);
    }));
    list.querySelectorAll('[data-balance-download]').forEach(button => button.addEventListener('click', () => {
      const record = safeStorageRead().find(item => item.id === button.dataset.balanceDownload);
      if (record) downloadRecord(record);
    }));
    list.querySelectorAll('[data-balance-delete]').forEach(button => button.addEventListener('click', () => {
      const recordsNow = safeStorageRead().filter(item => item.id !== button.dataset.balanceDelete);
      if (safeStorageWrite(recordsNow)) renderHistory();
    }));
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char]));
  }

  function openHistory() {
    const modal = $('#balanceHistoryModal');
    const trigger = $('#balanceHistoryButton');
    if (!modal) return;
    renderHistory();
    modal.hidden = false;
    trigger?.setAttribute('aria-expanded', 'true');
    document.body.classList.add('balance-history-open');
    requestAnimationFrame(() => modal.classList.add('is-visible'));
    window.setTimeout(() => $('#balanceHistoryClose')?.focus(), 30);
  }

  function closeHistory() {
    const modal = $('#balanceHistoryModal');
    const trigger = $('#balanceHistoryButton');
    if (!modal || modal.hidden) return;
    modal.classList.remove('is-visible');
    trigger?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('balance-history-open');
    window.setTimeout(() => { modal.hidden = true; }, 170);
  }

  function initBalanceStorage() {
    $('#balanceSaveButton')?.addEventListener('click', () => {
      const record = createRecord();
      const records = safeStorageRead();
      records.unshift(record);
      const stored = safeStorageWrite(records.slice(0, 50));
      downloadRecord(record);
      showToast(stored
        ? '현재 제약 설정을 저장하고 JSON 파일로 내보냈습니다.'
        : '브라우저 저장은 실패했지만 JSON 파일은 내보냈습니다.', !stored);
    });
    $('#balanceHistoryButton')?.addEventListener('click', openHistory);
    $('#balanceHistoryClose')?.addEventListener('click', closeHistory);
    $('#balanceHistoryModal')?.addEventListener('click', event => {
      if (event.target === event.currentTarget) closeHistory();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !$('#balanceHistoryModal')?.hidden) closeHistory();
    });

    seedBundledDefaultRecord();
    window.setTimeout(applyBundledDefaultRecord, 0);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initBalanceStorage);
  else initBalanceStorage();
})();


/* V0.13.4 · 24~26번 선택 결과 정보 바 독립 접기 */
(() => {
  const panelConfigs = [
    ['enemySelectedResultPanel', 'enemySelectedResultToggle', 'enemySelectedResultContent'],
    ['mainControlSelectedResultPanel', 'mainControlSelectedResultToggle', 'mainControlSelectedResultContent'],
    ['maxHpReductionSelectedResultPanel', 'maxHpReductionSelectedResultToggle', 'maxHpReductionSelectedResultContent']
  ];

  function initSurvivalResultPanels() {
    panelConfigs.forEach(([panelId, buttonId, contentId]) => {
      const panel = document.getElementById(panelId);
      const button = document.getElementById(buttonId);
      const content = document.getElementById(contentId);
      if (!panel || !button || !content) return;

      const setExpanded = expanded => {
        button.setAttribute('aria-expanded', String(expanded));
        button.textContent = expanded ? '정보 바 접기' : '정보 바 펼치기';
        content.hidden = !expanded;
        panel.classList.toggle('is-collapsed', !expanded);
      };

      setExpanded(true);
      button.addEventListener('click', () => {
        setExpanded(button.getAttribute('aria-expanded') !== 'true');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSurvivalResultPanels);
  } else {
    initSurvivalResultPanels();
  }
})();
