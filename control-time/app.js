(() => {
  const payload = window.CONTROL_TIME_DATA;
  const parties = payload.parties;
  const model = payload.model;
  const saved = (() => { try { return JSON.parse(localStorage.getItem('controlTimeUiV5') || '{}'); } catch { return {}; } })();
  const state = {
    partyId: 'leva-ake', // v8: always open with the first party selected
    compositionId: model.compositions.some(c => c.id === saved.compositionId) ? saved.compositionId : 'c1',
    adjustments: {...model.adjustments, ...(saved.adjustments || {})}
  };

  const $ = sel => document.querySelector(sel);
  const fmt = n => new Intl.NumberFormat('ko-KR',{maximumFractionDigits:1}).format(n);
  const sec = n => `${fmt(n)}초`;
  const clock = n => `${fmt(n)}초`;
  const save = () => { try { localStorage.setItem('controlTimeUiV5', JSON.stringify(state)); } catch {} };
  const selectedParty = () => parties.find(p=>p.id===state.partyId) || parties[0];
  const monsterDef = key => model.monsters[key];
  const baseMonsterDef = key => {const d=monsterDef(key); return d.baseFrom ? monsterDef(d.baseFrom) : d;};

  function resolveComposition(id){
    const src=model.compositions.find(c=>c.id===id); if(!src) return model.compositions[0];
    if(!src.inherit) return JSON.parse(JSON.stringify(src));
    const base=resolveComposition(src.inherit);
    const out={...base,...src,waves:base.waves.map(w=>JSON.parse(JSON.stringify(w)))};
    Object.entries(src.replace||{}).forEach(([waveNo,replacement])=>{
      const idx=out.waves.findIndex(w=>String(w.wave)===String(waveNo));
      if(idx>=0) out.waves[idx]={...out.waves[idx],...JSON.parse(JSON.stringify(replacement))};
    });
    return out;
  }
  function repeatedPlan(plan,count){const out=[];if(!plan?.length)return out;for(let i=0;i<count;i++)out.push(plan[i%plan.length]);return out;}
  function patternCount(key,p){
    if(key==='tidewalker' && p.dynamic==='tidewalkerComboTotal') return state.adjustments.tidewalkerComboTotal;
    return p.baseCount||0;
  }
  function monsterRows(key){
    const def=monsterDef(key), base=baseMonsterDef(key), rows=[];
    base.patterns.forEach(p=>{const count=patternCount(key,p); rows.push({kind:'pattern',monster:key,name:p.name,count,seconds:p.seconds,subtotal:count*p.seconds});});
    if(base.extraPlan && (key==='heavySting'||key==='heavyStingAlpha')){
      const grouped={}; repeatedPlan(base.extraPlan,state.adjustments.heavyStingExtra).forEach(id=>grouped[id]=(grouped[id]||0)+1);
      Object.entries(grouped).forEach(([id,count])=>{const p=base.patterns.find(x=>x.id===id);rows.push({kind:'extra',monster:key,name:p.name,count,seconds:p.seconds,subtotal:count*p.seconds,extra:true});});
    }
    if(def.baseFrom && def.alphaExtraPlan){
      const grouped={}; repeatedPlan(def.alphaExtraPlan,state.adjustments.alphaExtraPatterns).forEach(id=>grouped[id]=(grouped[id]||0)+1);
      Object.entries(grouped).forEach(([id,count])=>{const p=base.patterns.find(x=>x.id===id);rows.push({kind:'alpha',monster:key,name:p.name,count,seconds:p.seconds,subtotal:count*p.seconds,alpha:true});});
    }
    return rows;
  }
  function alphaExtraRows(key,instances=1){
    const def=monsterDef(key),base=baseMonsterDef(key),grouped={};
    repeatedPlan(def.alphaExtraPlan||[],state.adjustments.alphaExtraPatterns).forEach(id=>grouped[id]=(grouped[id]||0)+instances);
    return Object.entries(grouped).map(([id,count])=>{const p=base.patterns.find(x=>x.id===id);return {kind:'alpha',monster:key,name:p.name,count,seconds:p.seconds,subtotal:count*p.seconds,alpha:true};});
  }
  function heavyRamPairRows(key){
    const base=baseMonsterDef(key),pick=id=>base.patterns.find(p=>p.id===id);
    return [['basic',2],['leap',2],['charged',1]].map(([id,count])=>{const p=pick(id);return {kind:'pattern',monster:key,name:p.name,count,seconds:p.seconds,subtotal:count*p.seconds};});
  }
  function heavyRamSingleNoChargeRows(key){
    const base=baseMonsterDef(key);
    return ['basic','leap','charged'].map(id=>{const p=base.patterns.find(x=>x.id===id);return {kind:'pattern',monster:key,name:p.name,count:1,seconds:p.seconds,subtotal:p.seconds};});
  }
  function eventRows(event,party){
    if(event.kind==='monster') return monsterRows(event.monster);
    if(event.kind==='pairHeavyRamBase') return heavyRamPairRows(event.monster);
    if(event.kind==='singleHeavyRamBaseNoCharge') return heavyRamSingleNoChargeRows(event.monster);
    if(event.kind==='alphaExtras') return alphaExtraRows(event.monster,event.instances||1);
    const seconds=event.dynamic==='partyW1'?party.grouping.w1Seconds:event.seconds;
    return [{kind:event.kind,name:event.name,count:1,seconds,subtotal:seconds,monster:event.monster||null,grouping:event.kind.includes('guided')||event.kind==='grouping',overlap:event.kind==='overlap'}];
  }
  function calculate(party,compId){
    const comp=resolveComposition(compId);
    const waves=comp.waves.map(w=>{
      const rows=w.events.flatMap(e=>eventRows(e,party));
      const total=rows.reduce((a,r)=>a+r.subtotal,0);
      const grouping=rows.filter(r=>r.grouping).reduce((a,r)=>a+r.subtotal,0);
      const overlap=rows.filter(r=>r.overlap).reduce((a,r)=>a+r.subtotal,0);
      const patterns=total-grouping-overlap;
      return {...w,rows,total,grouping,overlap,patterns};
    });
    return {comp,waves,total:waves.reduce((a,w)=>a+w.total,0)};
  }

  function portraitLine(party, cls='party-portraits'){
    return `<span class="${cls}">${party.characters.map(c=>`<img src="${c.portrait}" alt="${c.name}" title="${c.name}">`).join('')}</span>`;
  }
  function renderAssumptionChips(){
    $('#assumptionChips').innerHTML=`
      <span><b>삼미</b> +${state.adjustments.heavyStingExtra}회</span>
      <span><b>조류 연속공격</b> ${state.adjustments.tidewalkerComboTotal}회</span>
      <span><b>α</b> +${state.adjustments.alphaExtraPatterns}회</span>`;
  }
  function renderPartyPicker(){
    $('#partyPicker').innerHTML=parties.map((p,i)=>`
      <button type="button" class="party-row ${p.id===state.partyId?'active':''}" data-party="${p.id}" aria-pressed="${p.id===state.partyId}">
        <span class="party-members">${portraitLine(p)}</span>
        <span class="party-name"><small>${String(i+1).padStart(2,'0')}</small><strong>${p.name}</strong></span>
        <span class="party-metric"><small>DPS</small><b>${fmt(p.dps)}</b></span>
        <span class="party-metric"><small>사이클</small><b>${fmt(p.duration)}초</b></span>
        <span class="grouping-pill tone-${p.grouping.tone}">${p.grouping.label}</span>
        <span class="row-check">${p.id===state.partyId?'✓':'›'}</span>
      </button>`).join('');
    document.querySelectorAll('[data-party]').forEach(b=>b.addEventListener('click',()=>{state.partyId=b.dataset.party;save();render();}));
  }
  function renderCompositionPicker(){
    $('#compositionPicker').innerHTML=model.compositions.map(c=>`
      <button type="button" class="composition-option ${c.id===state.compositionId?'active':''}" data-comp="${c.id}">
        <strong>${c.name}</strong><span>${c.subtitle}</span>
      </button>`).join('');
    document.querySelectorAll('[data-comp]').forEach(b=>b.addEventListener('click',()=>{state.compositionId=b.dataset.comp;save();render();}));
  }
  function monsterSummary(w){
    const counts={}; w.monsters.forEach(k=>counts[k]=(counts[k]||0)+1);
    return Object.entries(counts).map(([k,count])=>{const d=monsterDef(k);return `<span class="wave-monster ${d.baseFrom?'alpha':''}" title="${d.name}"><img src="${d.portrait}" alt="${d.name}">${count>1?`<em>×${count}</em>`:''}</span>`;}).join('');
  }
  function waveSummaryItem(w){
    return `<div class="wave-summary"><span>W${w.wave}</span><strong>${clock(w.total)}</strong><small>${w.label}</small></div>`;
  }
  function renderOverview(){
    const party=selectedParty(), calc=calculate(party,state.compositionId);
    const topResult = $('#topResult');
    if (topResult) topResult.innerHTML=`<span>추가 컨트롤</span><b>${clock(calc.total)}</b>`;
    $('#totalClock').textContent=clock(calc.total);
    $('#totalContext').innerHTML=`${party.name} · ${calc.comp.name} · ${party.grouping.label}`;
    $('#waveSummaryGrid').innerHTML=calc.waves.map(waveSummaryItem).join('');
    $('#waveStack').innerHTML=calc.waves.map(w=>waveHtml(w)).join('');
  }
  function rowTypeTag(r){
    if(r.grouping)return '<span class="type-tag grouping">집결/유도</span>';
    if(r.alpha)return '<span class="type-tag alpha">α 추가</span>';
    if(r.extra)return '<span class="type-tag extra">추가</span>';
    if(r.overlap)return '<span class="type-tag overlap">중복 차감</span>';
    return '<span class="type-tag normal">기본</span>';
  }
  function detailRow(r){
    const d=r.monster?monsterDef(r.monster):null;
    const who=d?`<span class="detail-target"><img src="${d.portrait}" alt="${d.name}"><b>${d.name}</b></span>`:`<span class="detail-target common"><i>±</i><b>공통 조작</b></span>`;
    return `<div class="detail-row ${r.overlap?'is-overlap':''}">
      ${who}
      <span class="detail-pattern">${r.name}</span>
      <span>${rowTypeTag(r)}</span>
      <span class="detail-num">${r.count}회</span>
      <span class="detail-num">${sec(r.seconds)}</span>
      <strong class="detail-subtotal">${r.subtotal<0?'−':''}${sec(Math.abs(r.subtotal))}</strong>
    </div>`;
  }
  function waveCalcSummary(w){
    const parts=[`패턴 ${clock(w.patterns)}`];
    if(Math.abs(w.grouping)>0.001) parts.push(`집결 ${clock(w.grouping)}`);
    if(Math.abs(w.overlap)>0.001) parts.push(`중첩 ${clock(w.overlap)}`);
    return parts.map(x=>`<span>${x}</span>`).join('');
  }
  function waveHtml(w){
    const metric=(label,value,extra='')=>`<span class="wave-metric ${extra}"><small>${label}</small><b>${clock(value)}</b></span>`;
    return `<details class="wave-card card">
      <summary>
        <span class="wave-index"><small>WAVE</small><b>${w.wave}</b></span>
        <span class="wave-monsters">${monsterSummary(w)}</span>
        <span class="wave-label"><b>${w.label}</b><small>${w.monsters.map(k=>monsterDef(k).name).join(' · ')}</small></span>
        ${metric('패턴',w.patterns)}
        ${metric('집결',w.grouping,Math.abs(w.grouping)<0.001?'is-zero':'')}
        ${metric('중첩',w.overlap,w.overlap<0?'is-negative':Math.abs(w.overlap)<0.001?'is-zero':'')}
        <span class="wave-total"><small>합계</small><b>${clock(w.total)}</b></span>
        <span class="wave-open-label"><span class="closed">상세</span><span class="opened">닫기</span></span>
      </summary>
      <div class="wave-detail">
        <div class="detail-table">
          <div class="detail-head"><span>대상</span><span>패턴 / 조작</span><span>구분</span><span>횟수</span><span>1회 시간</span><span>소계</span></div>
          ${w.rows.map(detailRow).join('')}
          <div class="detail-total"><span>W${w.wave} 합계</span><strong>${clock(w.total)}</strong></div>
        </div>
      </div>
    </details>`;
  }
  function renderComparison(){
    const rows=parties.map(p=>({p,calc:calculate(p,state.compositionId)})).sort((a,b)=>a.calc.total-b.calc.total);
    $('#partyComparison').innerHTML=`<div class="compare-table">
      <div class="compare-head"><span>파티</span><span>DPS</span><span>집결</span><span>추가 컨트롤</span></div>
      ${rows.map(({p,calc})=>`<div class="compare-row ${p.id===state.partyId?'active':''}">
        <span class="compare-party">${portraitLine(p,'compare-portraits')}<b>${p.name}</b></span>
        <span>${fmt(p.dps)}</span><span>${p.grouping.label}</span><strong>${clock(calc.total)}</strong>
      </div>`).join('')}
    </div>`;
  }
  function renderAssumptions(){
    $('#heavyStingExtraValue').textContent=`${state.adjustments.heavyStingExtra}회`;
    $('#tidewalkerComboTotalValue').textContent=`${state.adjustments.tidewalkerComboTotal}회`;
    $('#alphaExtraPatternsValue').textContent=`${state.adjustments.alphaExtraPatterns}회`;
    renderAssumptionChips();
    const items=[
      ['heavySting',`모든 주요 패턴 1회씩 + 추가 ${state.adjustments.heavyStingExtra}회`],
      ['heavyStingAlpha',`일반 삼미 기준 + α 추가 ${state.adjustments.alphaExtraPatterns}회`],
      ['tidewalker',`일반 연속공격 ${state.adjustments.tidewalkerComboTotal}회, 나머지 주요 패턴 1회씩`],
      ['heavyRam','W3/W4 돌진 유도는 별도 집결 이벤트로 계산'],
      ['heavyRamAlpha',`일반 쌍뿔 기준 + α 추가 ${state.adjustments.alphaExtraPatterns}회`],
      ['effigy','주요 패턴 1회씩'],
      ['tidalklast','주요 패턴 1회씩']
    ];
    $('#monsterAssumptions').innerHTML=items.map(([k,text])=>{const d=monsterDef(k);return `<article class="assumption-item"><img src="${d.portrait}" alt="${d.name}"><div><b>${d.name}</b><span>${text}</span></div></article>`;}).join('');
  }
  function render(){renderPartyPicker();renderCompositionPicker();renderOverview();renderComparison();renderAssumptions();}

  document.querySelectorAll('[data-adjust]').forEach(btn=>btn.addEventListener('click',()=>{
    const key=btn.dataset.adjust,delta=Number(btn.dataset.delta);
    const min=key==='tidewalkerComboTotal'?1:0,max=key==='heavyStingExtra'?8:key==='alphaExtraPatterns'?5:6;
    state.adjustments[key]=Math.max(min,Math.min(max,state.adjustments[key]+delta));
    save(); render();
  }));
  render();
})();
