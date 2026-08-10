(function () {
  'use strict';

  const STORE = window.AnalysisStore || { getAll: () => [] };
  const CATEGORY_ORDER = ['팀', '조작', '환경'];
  const CATALOG = (Array.isArray(window.CONSTRAINT_CATALOG) ? window.CONSTRAINT_CATALOG : []).filter((item) => CATEGORY_ORDER.includes(item?.category));
  const ASSETS = window.SKPORT_ASSETS || {};

  function esc(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function siteHeader() {
    return `<header class="app-topbar"><div class="brand"><a class="brand-mark" href="index.html" aria-label="Endfield Balance Lab 파티 분석 페이지"><img class="site-brand-character" src="assets/lab-brand-character.jpg" alt=""></a><div class="brand-copy"><a class="brand-title" href="index.html"><strong>ENDFIELD BALANCE LAB</strong></a><div class="brand-lower"><small>엔드필드 위기 협약 데이터베이스</small><nav class="site-nav" aria-label="페이지 전환"><a href="glossary.html">용어 사전</a><a href="characters.html">캐릭터</a><a href="index.html">파티 분석</a><a href="results.html">분석 결과</a><a href="dungeon-monsters.html">스테이지 구성</a>
              <a href="constraints.html" class="active" aria-current="page">제약 추천</a>
              <a href="constraint-board.html">제약 설계</a>
              <a href="constraint-balancing/index.html">제약 밸런싱</a>
              <a href="control-time/index.html">컨트롤 시간</a>
              <a href="constraint-application/index.html">제약 적용</a><a href="reward/index.html">보상 설계</a></nav></div></div></div></header>`;
  }

  function portrait(member, className = '') {
    const lookup = member?.name === '관리자 [남][여]' ? '관리자(여)' : member?.name;
    const src = ASSETS[lookup]?.portrait;
    if (!src) return `<span class="constraint-party-portrait constraint-party-portrait--fallback ${esc(className)}"><span>${esc(member?.name?.slice(0, 1) || '?')}</span></span>`;
    return `<span class="constraint-party-portrait ${esc(className)}"><img src="${esc(src)}" alt="${esc(member.name)} 초상화" loading="lazy" referrerpolicy="no-referrer"></span>`;
  }

  function sourceTexts(analysis) {
    const sources = [];
    const partyNames = (analysis.party || []).map((member) => member.name).join(' · ');
    const add = (label, text) => { if (text) sources.push({ label, text: String(text), partyNames, analysisId: analysis.id }); };
    add('파티 요약', analysis.summary?.sentence);
    (analysis.summary?.dependencies || []).forEach((item) => add('핵심 의존 요소', item.label || item));
    (analysis.combatFlow || []).forEach((item) => {
      add('주력 전투 흐름', `${item.character?.name || ''} ${item.skill?.type || ''} ${item.title || ''} ${item.detail || ''}`);
      (item.conditions || []).forEach((text) => add('발동 조건', text));
      (item.effects || []).forEach((text) => add('핵심 효과', text));
    });
    (analysis.weaknesses || []).forEach((group) => {
      add('구조적 약점', group.title);
      (group.entries || group.matches || []).forEach((entry) => add('구조적 약점', `${entry.character?.name || ''} ${entry.axis || ''} ${entry.implication || ''}`));
    });
    (analysis.designHints || []).forEach((hint) => add('제약 설계 힌트', `${hint.title || ''} ${hint.pressure || ''} ${hint.impact || ''} ${hint.opportunity || ''}`));
    (analysis.discoveries || []).forEach((item) => add('새로운 연결', `${item.title || ''} ${item.description || ''} ${item.opportunity || ''}`));
    return sources;
  }

  function mechanicTokens(analysis) {
    const profile = analysis.mechanicProfile || {};
    return new Set([...(profile.mechanicIds || []), ...(profile.hintIds || []), ...(profile.dependencyLabels || []), ...(profile.weaknessAxes || []), profile.dominantAction || ''].filter(Boolean).map((item) => String(item).toLocaleLowerCase('ko-KR')));
  }

  function recommend(analyses) {
    const prepared = analyses.map((analysis) => ({ analysis, sources: sourceTexts(analysis), tokens: mechanicTokens(analysis) }));
    const ranked = CATALOG.map((constraint) => {
      let score = constraint.baseline ? 2 : 0;
      const evidence = [];
      const matchedAnalyses = [];
      const keywords = (constraint.matchAny || []).map((keyword) => String(keyword).toLocaleLowerCase('ko-KR'));

      prepared.forEach(({ analysis, sources, tokens }) => {
        const joined = sources.map((source) => source.text).join(' ').toLocaleLowerCase('ko-KR');
        let analysisScore = 0;
        keywords.forEach((keyword) => {
          if (tokens.has(keyword)) analysisScore += 7;
          else if (joined.includes(keyword)) analysisScore += 4;
        });
        if (analysisScore <= 0) return;
        score += analysisScore;
        matchedAnalyses.push(analysis.id);
        sources.forEach((source) => {
          if (evidence.length >= 5) return;
          const lower = source.text.toLocaleLowerCase('ko-KR');
          if (keywords.some((keyword) => lower.includes(keyword))) evidence.push(source);
        });
      });

      if (constraint.baseline) score += Math.min(analyses.length, 5);
      return { ...constraint, score, evidence, matchedCount: new Set(matchedAnalyses).size, totalCount: analyses.length };
    });

    const selected = ranked.filter((item) => item.score > 0).sort((left, right) => right.score - left.score || right.matchedCount - left.matchedCount);
    const categoryCounts = new Map();
    const output = [];
    selected.forEach((item) => {
      const count = categoryCounts.get(item.category) || 0;
      if (output.length < 12 && count < 4) {
        output.push(item);
        categoryCounts.set(item.category, count + 1);
      }
    });
    CATEGORY_ORDER.forEach((category) => {
      if (output.some((item) => item.category === category)) return;
      const fallback = selected.find((item) => item.category === category);
      if (fallback) output.push(fallback);
    });
    return output.slice(0, 12);
  }

  function reasonText(item, analyses) {
    const total = analyses.length;
    if (item.evidence?.length) {
      const prefix = total === 1
        ? `${item.evidence[0].partyNames || '저장된 파티'}의 분석에서 관련 근거가 확인되었습니다.`
        : `저장된 ${total}개 파티 중 ${item.matchedCount}개 파티에서 관련 경향이 반복되었습니다.`;
      const details = item.evidence.slice(0, 3).map((source) => {
        const text = source.text.length > 118 ? `${source.text.slice(0, 115)}…` : source.text;
        return `${source.partyNames}의 ${source.label}: “${text}”`;
      }).join(' / ');
      return `${prefix} ${details}`;
    }
    return total === 1
      ? '해당 파티의 특정 메커니즘과 무관하게 기본 전투 안정성, 조작 대응력, 장기 운용 능력을 점검하기 위한 공통 제약입니다.'
      : `저장된 ${total}개 파티 모두를 대상으로 기본 전투 안정성, 조작 대응력, 장기 운용 능력을 공통 기준에서 비교하기 위한 제약입니다.`;
  }

  function stageRail() {
    return `<div class="constraint-stage-rail" aria-label="제약 강도 1단계부터 3단계까지"><div class="constraint-stage-node"><span>1단계</span></div><i aria-hidden="true"></i><div class="constraint-stage-node"><span>2단계</span></div><i aria-hidden="true"></i><div class="constraint-stage-node"><span>3단계</span></div><small>제한 계수 확정 후 단계 선택</small></div>`;
  }

  function constraintCard(item, analyses) {
    return `<article class="constraint-recommendation-card" data-category="${esc(item.category)}"><aside class="constraint-stage-column">${stageRail()}</aside><div class="constraint-recommendation-copy"><header><small>${esc(item.category)} CATEGORY</small><h2>${esc(item.category)}: ${esc(item.label)}</h2></header><div class="constraint-copy-stack"><p><strong>[제약 기능]:</strong> ${esc(item.feature)}</p><p><strong>[설명]:</strong> ${esc(item.description)}</p><p><strong>[추천 근거]:</strong> ${esc(reasonText(item, analyses))}</p><p><strong>[예상 영향]:</strong> ${esc(item.impact)}</p></div></div></article>`;
  }

  function aggregateSummary(analyses) {
    const parties = analyses.map((analysis) => (analysis.party || []).map((member) => member.name).join(' · '));
    const members = [];
    const seen = new Set();
    analyses.forEach((analysis) => (analysis.party || []).forEach((member) => {
      const key = member.id || member.name;
      if (seen.has(key)) return;
      seen.add(key);
      members.push(member);
    }));
    const visibleMembers = members.slice(0, 6);
    const hiddenMemberCount = Math.max(0, members.length - visibleMembers.length);
    const overflowBadge = hiddenMemberCount
      ? `<span class="constraint-party-overflow" aria-label="추가 캐릭터 ${hiddenMemberCount}명">+${hiddenMemberCount}</span>`
      : '';
    return `<section class="constraint-selected-analysis constraint-aggregate-summary"><div class="constraint-selected-faces">${visibleMembers.map((member) => portrait(member)).join('')}${overflowBadge}</div><div><small>ALL SAVED PARTY ANALYSES</small><h2>저장된 파티 ${analyses.length}개 종합 분석</h2><p>${esc(parties.slice(0, 4).join(' / '))}${parties.length > 4 ? ` 외 ${parties.length - 4}개 파티` : ''}의 분석 결과를 함께 비교해 제약을 추천합니다.</p></div><a href="results.html">분석 결과 보기</a></section>`;
  }

  function recommendationsHtml(analyses) {
    const items = recommend(analyses);
    return `${aggregateSummary(analyses)}<div class="constraint-filter-row" role="group" aria-label="제약 카테고리 필터"><button type="button" class="active" data-constraint-filter="all">전체</button><button type="button" data-constraint-filter="팀">팀</button><button type="button" data-constraint-filter="조작">조작</button><button type="button" data-constraint-filter="환경">환경</button></div><section id="constraint-recommendation-list" class="constraint-recommendation-list">${items.map((item) => constraintCard(item, analyses)).join('')}</section>`;
  }

  function render() {
    const analyses = STORE.getAll();
    document.body.innerHTML = `${siteHeader()}<main class="page-shell constraint-page"><header class="page-heading constraint-page-heading"><div><span>CONSTRAINT RECOMMENDATION</span><h1>제약 추천</h1><p>저장된 모든 파티 분석의 전투 흐름, 구조적 약점, 새로운 연결과 제약 설계 힌트를 종합해 적용할 만한 제한 기능을 추천합니다. 저장된 분석이 하나라면 해당 파티만을 기준으로 추천합니다.</p></div></header><div id="constraint-root">${analyses.length ? recommendationsHtml(analyses) : `<section class="archive-empty-state"><strong>제약 추천에 사용할 분석 결과가 없습니다.</strong><p>파티 분석을 내보내면 이 브라우저에 분석 자료가 저장되고, 이후 이 페이지에서 저장된 모든 자료를 종합해 제약을 추천할 수 있습니다.</p><a href="party.html">파티 분석으로 이동</a></section>`}</div></main>`;
    initFilters();
  }

  function initFilters() {
    const buttons = [...document.querySelectorAll('[data-constraint-filter]')];
    const cards = [...document.querySelectorAll('.constraint-recommendation-card')];
    buttons.forEach((button) => button.addEventListener('click', () => {
      buttons.forEach((item) => item.classList.toggle('active', item === button));
      const category = button.dataset.constraintFilter;
      cards.forEach((card) => { card.hidden = category !== 'all' && card.dataset.category !== category; });
    }));
  }

  render();
})();
