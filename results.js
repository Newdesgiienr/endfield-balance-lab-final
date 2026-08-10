(function () {
  'use strict';

  const DATA = window.APP_DATA || { characters: [] };
  const ASSETS = window.SKPORT_ASSETS || {};
  const STORE = window.AnalysisStore || { getAll: () => [], find: () => null };

  function normalizeCharacters(characters) {
    const managerPattern = /^관리자(?:\s*\[(?:남|여)\]|\((?:남|여)\))$/;
    const managerEntries = characters.filter((character) => managerPattern.test(character.name));
    if (!managerEntries.length) return characters;

    const female = managerEntries.find((character) => /여/.test(character.name));
    const merged = {
      ...(female || managerEntries[0]),
      id: 'administrator',
      name: '관리자 [남][여]',
      assetName: '관리자(여)'
    };

    const firstManagerIndex = characters.findIndex((character) => managerPattern.test(character.name));
    const withoutManagers = characters.filter((character) => !managerPattern.test(character.name));
    withoutManagers.splice(firstManagerIndex, 0, merged);
    return withoutManagers;
  }

  const CHARACTERS = normalizeCharacters(DATA.characters || []);
  const CHARACTER_BY_ID = new Map(CHARACTERS.map((character) => [character.id, character]));
  const PAGE_PARAMS = new URLSearchParams(window.location.search);
  const PARTY_DPR = Number(PAGE_PARAMS.get('partyDpr'));
  const CURRENT_DPR = window.devicePixelRatio || 1;
  const PAGE_SCALE = Number.isFinite(PARTY_DPR) && PARTY_DPR > 0
    ? Math.min(1.4, Math.max(0.65, PARTY_DPR / CURRENT_DPR))
    : 1;

  // Local file pages can retain different browser zoom levels. When this page is
  // opened from the party page, compensate for that difference so both screens
  // keep the same visual scale. At the same zoom level this remains exactly 1.
  if (Math.abs(PAGE_SCALE - 1) > 0.01) document.documentElement.style.zoom = String(PAGE_SCALE);

  function resultsUrl(id = '') {
    const params = new URLSearchParams();
    if (id) params.set('id', id);
    if (Number.isFinite(PARTY_DPR) && PARTY_DPR > 0) params.set('partyDpr', String(PARTY_DPR));
    const query = params.toString();
    return `results.html${query ? `?${query}` : ''}`;
  }

  function esc(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function siteHeader() {
    return `<header class="app-topbar">
      <div class="brand">
        <a class="brand-mark" href="index.html" aria-label="Endfield Balance Lab 파티 분석 페이지"><img class="site-brand-character" src="assets/lab-brand-character.jpg" alt=""></a>
        <div class="brand-copy">
          <a class="brand-title" href="index.html"><strong>ENDFIELD BALANCE LAB</strong></a>
          <div class="brand-lower">
            <small>엔드필드 위기 협약 데이터베이스</small>
            <nav class="site-nav" aria-label="페이지 전환">
              <a href="glossary.html">용어 사전</a>
              <a href="characters.html">캐릭터</a>
              <a href="index.html">파티 분석</a>
              <a href="results.html" class="active" aria-current="page">분석 결과</a>
              <a href="monster-patterns/index.html">등장 몬스터</a>
              <a href="dungeon-monsters.html">스테이지 구성</a>
              <a href="constraints.html">제약 추천</a>
              <a href="constraint-board.html">제약 설계</a>
              <a href="constraint-balancing/index.html">제약 밸런싱</a>
              <a href="control-time/index.html">컨트롤 시간</a>
              <a href="constraint-application/index.html">제약 적용</a>
              <a href="reward/index.html">보상 설계</a>
            </nav>
          </div>
        </div>
      </div>
    </header>`;
  }

  function fullCharacter(member) {
    return CHARACTER_BY_ID.get(member?.id) || member || {};
  }

  function characterAsset(member) {
    const character = fullCharacter(member);
    const name = character?.name === '관리자 [남][여]' ? '관리자(여)' : (character?.assetName || character?.name);
    return ASSETS[name] || null;
  }

  function savedPortrait(member, className = '') {
    const src = characterAsset(member)?.portrait;
    if (!src) return `<span class="saved-party-portrait saved-party-portrait--fallback ${esc(className)}"><span>${esc(member?.name?.slice(0, 1) || '?')}</span></span>`;
    return `<span class="saved-party-portrait ${esc(className)}"><img src="${esc(src)}" alt="${esc(member.name)} 초상화" loading="lazy" referrerpolicy="no-referrer"></span>`;
  }

  function portrait(member, className = '') {
    const character = fullCharacter(member);
    const src = characterAsset(character)?.portrait;
    if (!src) return `<span class="party-portrait party-portrait--fallback ${esc(className)}"><span>${esc(character?.name?.slice(0, 1) || '?')}</span></span>`;
    return `<span class="party-portrait ${esc(className)}"><img src="${esc(src)}" alt="${esc(character.name)} 초상화" loading="lazy" referrerpolicy="no-referrer"></span>`;
  }

  function identityIcons(member) {
    const icons = (characterAsset(member)?.icons || []).slice(0, 2);
    return `<span class="party-identity-icons" aria-hidden="true">${icons.map((src) => `<img src="${esc(src)}" alt="">`).join('')}</span>`;
  }

  function normalizeSearchText(value) {
    return String(value ?? '').normalize('NFKC').toLocaleLowerCase('ko-KR').replace(/\s+/g, ' ').trim();
  }

  function rich(text) {
    const plain = String(text ?? '').replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, '$2');
    return esc(plain);
  }

  function referenceBadgeHtml(item) {
    const badges = item.badges || (item.badge ? [{ text: item.badge }] : []);
    if (!badges.length) return '';
    return `<div class="party-reference-badges">${badges.map((badge) => {
      const text = typeof badge === 'string' ? badge : badge.text;
      return `<span>${esc(text)}</span>`;
    }).join('')}</div>`;
  }

  function referenceEntryHtml(item, index, kind) {
    const type = kind === 'skill'
      ? (item.type || `전투 스킬 ${index + 1}`)
      : kind === 'potential'
        ? (item.index || `P${index + 1}`)
        : (item.index || `재능 ${index + 1}`);
    const paragraphs = kind === 'potential'
      ? [item.text].filter(Boolean)
      : (item.paragraphs || []);
    const chips = kind === 'potential'
      ? (item.target ? [`영향 대상 · ${item.target}`] : [])
      : (item.chips || []);
    return `<article class="party-reference-entry party-reference-entry--${esc(kind)}">
      <header><span>${esc(type)}</span><strong>${esc(item.name)}</strong></header>
      ${referenceBadgeHtml(item)}
      <div class="party-reference-entry-copy">${paragraphs.map((paragraph) => `<p>${rich(paragraph)}</p>`).join('')}</div>
      ${chips.length ? `<div class="party-reference-chips">${chips.map((chip) => `<span>${esc(chip)}</span>`).join('')}</div>` : ''}
    </article>`;
  }

  function referenceCharacterHtml(character) {
    return `<div class="party-reference-profile">
      <header class="party-reference-character">
        ${portrait(character, 'party-reference-portrait')}
        <div><small>CHARACTER REFERENCE</small><h3>${esc(character.name)}</h3><p>${esc(character.subtitle || character.tags?.join(' · ') || '')}</p></div>
      </header>
      <section class="party-reference-section" aria-labelledby="results-reference-skills-title">
        <header><div><small>COMBAT SKILLS</small><h4 id="results-reference-skills-title">전투 스킬</h4></div><span>${character.skills?.length || 0}종</span></header>
        <div class="party-reference-list">${(character.skills || []).map((skill, index) => referenceEntryHtml(skill, index, 'skill')).join('')}</div>
      </section>
      <section class="party-reference-section" aria-labelledby="results-reference-talents-title">
        <header><div><small>TALENTS</small><h4 id="results-reference-talents-title">재능</h4></div><span>${character.talents?.length || 0}종</span></header>
        <div class="party-reference-list">${(character.talents || []).map((talent, index) => referenceEntryHtml(talent, index, 'talent')).join('')}</div>
      </section>
      <section class="party-reference-section" aria-labelledby="results-reference-potentials-title">
        <header><div><small>POTENTIALS</small><h4 id="results-reference-potentials-title">잠재력</h4></div><span>${character.potentials?.length || 0}단계</span></header>
        <div class="party-reference-list">${(character.potentials || []).map((potential, index) => referenceEntryHtml(potential, index, 'potential')).join('')}</div>
      </section>
    </div>`;
  }

  function referenceSearchResultHtml(character) {
    return `<button type="button" class="party-reference-result" data-reference-character-id="${esc(character.id)}">
      ${portrait(character, 'party-reference-result-portrait')}
      <span><strong>${esc(character.name)}</strong><small>${esc(character.subtitle || character.tags?.slice(0, 2).join(' · ') || '')}</small></span>
    </button>`;
  }

  function initCharacterReferencePanel() {
    const stage = document.getElementById('results-stage');
    const panel = document.getElementById('party-reference-panel');
    const toggle = document.getElementById('toggle-character-reference');
    const input = document.getElementById('party-reference-search');
    const results = document.getElementById('party-reference-results');
    const content = document.getElementById('party-reference-content');
    if (!stage || !panel || !toggle || !input || !results || !content) return;

    let open = false;
    let matches = [];
    let composing = false;

    function setOpen(next, focusSearch = false) {
      open = next;
      stage.classList.toggle('reference-open', next);
      panel.classList.toggle('open', next);
      panel.setAttribute('aria-hidden', String(!next));
      panel.inert = !next;
      toggle.setAttribute('aria-expanded', String(next));
      toggle.setAttribute('aria-label', next ? '캐릭터 빠른 조회 패널 닫기' : '캐릭터 빠른 조회 패널 열기');
      toggle.querySelector('.party-reference-toggle-icon').textContent = next ? '›' : '‹';
      if (focusSearch && next) window.setTimeout(() => input.focus(), 240);
    }

    function showCharacter(character) {
      if (!character) return;
      content.innerHTML = referenceCharacterHtml(character);
      content.dataset.characterId = character.id;
      results.hidden = true;
      input.value = character.name;
      input.setAttribute('aria-activedescendant', '');
    }

    function updateResults() {
      const query = normalizeSearchText(input.value);
      if (!query) {
        matches = [];
        results.hidden = true;
        content.innerHTML = `<div class="party-reference-empty"><strong>캐릭터 이름을 검색해 주세요.</strong><p>선택한 캐릭터의 전투 스킬 4종, 재능 2종과 잠재력 P1~P5를 이 패널에서 바로 확인할 수 있습니다.</p></div>`;
        delete content.dataset.characterId;
        return;
      }

      matches = CHARACTERS.filter((character) => normalizeSearchText(character.name).startsWith(query)).slice(0, 8);
      if (!matches.length) {
        results.innerHTML = '<div class="party-reference-no-result">일치하는 캐릭터가 없습니다.</div>';
        results.hidden = false;
        content.innerHTML = `<div class="party-reference-empty"><strong>검색 결과가 없습니다.</strong><p>캐릭터 이름의 첫 글자부터 다시 입력해 주세요.</p></div>`;
        delete content.dataset.characterId;
        return;
      }

      const exact = matches.find((character) => normalizeSearchText(character.name) === query);
      if (exact) {
        showCharacter(exact);
        return;
      }

      results.innerHTML = matches.map(referenceSearchResultHtml).join('');
      results.hidden = false;
      content.innerHTML = `<div class="party-reference-empty"><strong>검색 결과에서 캐릭터를 선택해 주세요.</strong><p>이름을 모두 입력하거나 결과를 클릭하면 전투 스킬, 재능과 잠재력을 불러옵니다.</p></div>`;
      delete content.dataset.characterId;
    }

    toggle.addEventListener('click', () => setOpen(!open, !open));
    input.addEventListener('compositionstart', () => { composing = true; });
    input.addEventListener('compositionend', () => {
      composing = false;
      updateResults();
    });
    input.addEventListener('input', () => {
      if (!composing) updateResults();
    });
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && matches.length) {
        event.preventDefault();
        showCharacter(matches[0]);
      } else if (event.key === 'Escape') {
        if (input.value) {
          input.value = '';
          updateResults();
        } else setOpen(false);
      }
    });
    results.addEventListener('click', (event) => {
      const button = event.target.closest('[data-reference-character-id]');
      if (!button) return;
      showCharacter(CHARACTER_BY_ID.get(button.dataset.referenceCharacterId));
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && open && document.activeElement !== input) setOpen(false);
    });

    setOpen(false);
  }

  function dependencyChips(analysis, limit = 5) {
    const items = analysis?.summary?.dependencies || [];
    return items.slice(0, limit).map((item) => `<span class="saved-analysis-chip">${esc(item.label || item)}</span>`).join('');
  }

  function analysisEntry(analysis, initiallyOpen = false) {
    const party = analysis.party || [];
    const detailId = `saved-analysis-detail-${String(analysis.id || '').replace(/[^a-zA-Z0-9_-]/g, '-')}`;
    return `<article class="saved-analysis-entry" data-analysis-id="${esc(analysis.id)}" data-search="${esc(`${party.map((member) => member.name).join(' ')} ${analysis.summary?.sentence || ''}`.toLocaleLowerCase('ko-KR'))}">
      <div class="saved-analysis-card">
        <div class="saved-analysis-party-faces">${party.map((member) => savedPortrait(member)).join('')}</div>
        <div class="saved-analysis-card-copy">
          <small>PARTY ANALYSIS</small>
          <h2>${esc(party.map((member) => member.name).join(' · ') || analysis.title || '저장된 파티')}</h2>
          <p>${esc(analysis.summary?.sentence || '저장된 파티 분석입니다.')}</p>
          <div class="saved-analysis-chip-row">${dependencyChips(analysis)}</div>
        </div>
        <div class="saved-analysis-card-actions">
          <button type="button" class="saved-analysis-open" data-toggle-analysis="${esc(analysis.id)}" aria-expanded="${initiallyOpen}" aria-controls="${esc(detailId)}">${initiallyOpen ? '분석 접기' : '분석 펼치기'}</button>
          <a class="saved-analysis-constraint-link" href="constraints.html">제약 추천</a>
        </div>
      </div>
      <section id="${esc(detailId)}" class="saved-analysis-inline-detail" ${initiallyOpen ? '' : 'hidden'}>${analysisResultHtml(analysis)}</section>
    </article>`;
  }

  function overviewHtml(analysis) {
    const items = analysis.summary?.dependencies || [];
    return `<section class="analysis-overview" aria-label="핵심 의존 요소">
      <div class="analysis-overview-title"><span>한눈에 보기</span><strong>핵심 의존 요소</strong></div>
      <div class="analysis-dependency-list">
        ${items.slice(0, 5).map((item) => `<div><span data-color="${esc(item.color || 'navy')}">${esc(item.label || item)}</span><b>${esc(item.level || '')}</b></div>`).join('')}
      </div>
    </section>`;
  }

  function diagramNodeHtml(node, variant = 'main') {
    return `<article class="analysis-diagram-node analysis-diagram-node--${esc(variant)}">
      ${portrait(node.character, variant === 'branch' ? 'analysis-diagram-portrait analysis-diagram-portrait--branch' : 'analysis-diagram-portrait')}
      <div class="analysis-diagram-copy"><span>${esc(node.character?.name)}</span><strong>${esc(node.skill?.type || node.skillType || '전투 준비')}</strong></div>
    </article>`;
  }

  function diagramBranchItemHtml(route) {
    return `<article class="analysis-diagram-branch-item">
      ${portrait(route.character, 'analysis-diagram-portrait analysis-diagram-portrait--branch')}
      <div class="analysis-diagram-copy"><span>${esc(route.character?.name)}</span><strong>${esc(route.skill?.type || '전투 준비')}</strong></div>
    </article>`;
  }

  function diagramTransitionHtml(connection) {
    const routes = connection?.preparationRoutes || [];
    return `<div class="analysis-diagram-transition">
      <div class="analysis-diagram-link"><span>${esc(connection?.label || '다음 조건 연결')}</span></div>
      ${routes.length ? `<div class="analysis-diagram-branch">
        <div class="analysis-diagram-branch-label">선택 가능한 조건 준비 경로</div>
        <div class="analysis-diagram-branch-list">${routes.map(diagramBranchItemHtml).join('')}</div>
      </div>` : ''}
    </div>`;
  }

  function diagramHtml(analysis) {
    const nodes = analysis.diagram?.nodes || [];
    const connections = analysis.diagram?.connections || [];
    if (!nodes.length) return '';
    return `<section class="analysis-section analysis-diagram-section">
      <header class="analysis-section-heading"><span>DI</span><div><h3>간단 다이어그램</h3><p>주력 전투 흐름의 핵심 노드와, 다음 단계로 이어지기 위한 선택 가능한 조건 준비 경로를 함께 보여줍니다.</p></div></header>
      <div class="analysis-diagram-shell"><div class="analysis-diagram-row">${nodes.map((node, index) => `${diagramNodeHtml(node)}${connections[index] ? diagramTransitionHtml(connections[index]) : ''}`).join('')}</div></div>
    </section>`;
  }

  function routeDetailsHtml(routes) {
    if (!routes?.length) return '';
    return `<div class="analysis-route-group"><strong>선택 가능한 조건 준비 경로</strong><div class="analysis-route-list">
      ${routes.map((route) => `<article class="analysis-route-bar">
        ${portrait(route.character, 'analysis-route-portrait')}
        <div><header><span>${esc(route.character?.name)}</span><b>${esc(route.skill?.type || '전투 준비')}</b></header><p>${esc(route.summary || '')}</p><div class="analysis-node-meta">${(route.matchedMechanics || []).map((item) => `<span class="analysis-chip">${esc(item.label || item)}</span>`).join('')}</div></div>
      </article>`).join('')}
    </div></div>`;
  }

  function flowNodeHtml(node, index) {
    const detailSections = [
      node.conditions?.length ? `<div class="analysis-node-condition"><strong>${node.skill?.typeId === 'linkSkill' ? '연계 스킬 발동 조건' : '효과 발동 조건'}</strong><p>${node.conditions.map(esc).join('<br>')}</p></div>` : '',
      node.timing ? `<div class="analysis-node-timing"><strong>사용 시점</strong><p>${esc(node.timing)}</p></div>` : '',
      node.effects?.length ? `<div class="analysis-node-effects"><strong>핵심 효과</strong><ul>${node.effects.map((text) => `<li>${esc(text)}</li>`).join('')}</ul></div>` : '',
      routeDetailsHtml(node.preparationRoutes)
    ].filter(Boolean).join('');

    return `<article class="analysis-flow-node">
      <div class="analysis-flow-index">${String(index + 1).padStart(2, '0')}</div>
      ${portrait(node.character, 'analysis-node-portrait')}
      <div class="analysis-flow-copy">
        <header><span>${esc(node.character?.name)}</span><strong>${esc(node.skill?.type || '전투 준비')}</strong><em>${esc(node.title || '')}</em></header>
        <p>${esc(node.detail || '')}</p>
        ${detailSections ? `<details class="analysis-node-details"><summary><span class="analysis-node-summary-copy"><span class="analysis-node-summary-title">효과 및 준비 경로</span><span class="analysis-node-summary-state" aria-hidden="true"></span></span><i aria-hidden="true"></i></summary><div class="analysis-node-details-content">${detailSections}</div></details>` : ''}
      </div>
    </article>`;
  }

  function flowHtml(analysis) {
    const nodes = analysis.combatFlow || [];
    const connections = analysis.diagram?.connections || [];
    const support = analysis.supportFlow || [];
    return `<section class="analysis-section">
      <header class="analysis-section-heading"><span>01</span><div><h3>주력 전투 흐름</h3><p>초상화 왼쪽, 스킬 종류·발동 조건·준비 선택지·핵심 효과를 오른쪽에 한 방향 흐름으로 정리했습니다.</p></div></header>
      <div class="analysis-flow">${nodes.map((node, index) => `${flowNodeHtml(node, index)}${index < nodes.length - 1 ? `<div class="analysis-flow-arrow"><span>${esc(connections[index]?.label || '다음 단계')}</span></div>` : ''}`).join('')}</div>
      ${support.length ? `<div class="analysis-support-block"><strong>보조 연결</strong>${support.map((node, index) => flowNodeHtml(node, nodes.length + index)).join('')}</div>` : ''}
    </section>`;
  }

  function operationsHtml(analysis) {
    return `<section class="analysis-section"><header class="analysis-section-heading"><span>02</span><div><h3>기본 운용 순서</h3><p>다이어그램의 핵심만 짧은 문장으로 다시 설명합니다.</p></div></header>
      <ol class="analysis-operation-list">${(analysis.basicOperation || []).map((step, index) => `<li><span>${index + 1}</span><div><strong>${esc(step.title)}</strong><p>${esc(step.detail)}</p></div></li>`).join('')}</ol>
    </section>`;
  }

  function rolesHtml(analysis) {
    return `<section class="analysis-section"><header class="analysis-section-heading"><span>03</span><div><h3>파티 구성원 역할</h3><p>공식 역할군이 아니라 이 조합 안에서 실제로 맡는 기능입니다.</p></div></header>
      <div class="analysis-role-list">${(analysis.roles || []).map((role) => `<article class="analysis-info-bar">${portrait(role.character, 'analysis-info-portrait')}<div><header><strong>${esc(role.character?.name)}</strong>${identityIcons(role.character)}</header><div class="analysis-role-chips">${(role.labels || []).map((label) => `<span>${esc(label)}</span>`).join('')}</div><p>${esc(role.relation || '')}</p></div></article>`).join('')}</div>
    </section>`;
  }

  function weaknessesHtml(analysis) {
    return `<section class="analysis-section"><header class="analysis-section-heading"><span>04</span><div><h3>구조적 약점</h3><p>특정 제약을 고르기 전, 이 파티가 원래부터 부담을 느끼는 축입니다.</p></div></header>
      <div class="analysis-weakness-list">${(analysis.weaknesses || []).map((group) => `<article class="analysis-weakness-bar"><header><small>취약 축</small><strong>${esc(group.title)}</strong></header><div>${(group.entries || group.matches || []).slice(0, 3).map((entry) => `<div class="analysis-weakness-entry"><strong>${esc(entry.character?.name || '')}${entry.axis ? ` · ${esc(entry.axis)}` : ''}</strong><p>${esc(entry.implication || '')}</p></div>`).join('')}</div></article>`).join('')}</div>
    </section>`;
  }

  function discoveriesHtml(analysis) {
    return `<section class="analysis-section analysis-discovery-section"><header class="analysis-section-heading"><span>05</span><div><h3>새롭게 활용할 수 있는 연결</h3><p>현재 주력 루프에서 비중이 낮지만, 전투 조건이 달라졌을 때 살아날 수 있는 스킬입니다.</p></div></header>
      <div class="analysis-discovery-list">${(analysis.discoveries || []).map((item) => `<article class="analysis-info-bar analysis-discovery-bar">${portrait(item.character, 'analysis-info-portrait')}<div><header><strong>${esc(item.character?.name)} · ${esc(item.title)}</strong></header><p>${esc(item.description)}</p><aside>${esc(item.opportunity)}</aside></div></article>`).join('')}</div>
    </section>`;
  }

  function hintsHtml(analysis) {
    return `<section class="analysis-section analysis-hints-section"><header class="analysis-section-heading"><span>06</span><div><h3>제약 설계 힌트</h3><p>제약을 먼저 고르는 것이 아니라, 어떤 전투 축을 건드리면 새로운 운용이 발견될지 보여줍니다.</p></div></header>
      <div class="analysis-hint-list">${(analysis.designHints || []).map((hint) => `<article class="analysis-hint-card"><header><span>검토 축</span><h4>${esc(hint.title)}</h4><div class="analysis-hint-faces">${(hint.characters || []).slice(0, 4).map((character) => portrait(character, 'analysis-hint-portrait')).join('')}</div></header><div class="analysis-hint-grid"><div><strong>건드려볼 방향</strong><p>${esc(hint.pressure)}</p></div><div><strong>어려워지는 부분</strong><p>${esc(hint.impact)}</p></div><div class="opportunity"><strong>발견 가능성</strong><p>${esc(hint.opportunity)}</p></div><div class="caution"><strong>과잉 압박 주의</strong><p>${esc(hint.caution)}</p></div></div></article>`).join('')}</div>
    </section>`;
  }

  function analysisResultHtml(analysis) {
    return `<article class="party-analysis saved-party-analysis">
      <div class="analysis-result-heading"><div class="analysis-result-copy"><small>PARTY RESULT</small><h2>파티 전투 구조 분석</h2><p>${esc(analysis.summary?.sentence || '')}</p></div></div>
      <div class="analysis-content">
        ${overviewHtml(analysis)}
        ${diagramHtml(analysis)}
        ${flowHtml(analysis)}
        ${operationsHtml(analysis)}
        ${rolesHtml(analysis)}
        ${weaknessesHtml(analysis)}
        ${discoveriesHtml(analysis)}
        ${hintsHtml(analysis)}
      </div>
    </article>`;
  }

  function setEntryOpen(entry, open) {
    const button = entry.querySelector('[data-toggle-analysis]');
    const detail = entry.querySelector('.saved-analysis-inline-detail');
    if (!button || !detail) return;

    // 상세 결과가 열리면서 긴 다이어그램의 최소 너비가 문서 전체 폭을
    // 밀어내지 않도록, 현재 뷰포트 폭과 스크롤 위치를 그대로 유지합니다.
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const viewportWidth = document.documentElement.clientWidth;

    detail.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
    button.textContent = open ? '분석 접기' : '분석 펼치기';
    entry.classList.toggle('open', open);

    requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--archive-viewport-width', `${viewportWidth}px`);
      window.scrollTo(scrollX, scrollY);
    });
  }

  function render() {
    const analyses = STORE.getAll();
    const requested = PAGE_PARAMS.get('id');
    document.body.innerHTML = `${siteHeader()}
    <div id="results-stage" class="party-stage results-stage">
      <main class="page-shell archive-page">
        <header class="page-heading archive-heading"><div><span>PARTY ANALYSIS ARCHIVE</span><h1>분석 결과</h1><p>파티 분석 결과를 리스트로 제공합니다.</p></div>${analyses.length ? `<label class="search-field"><span>저장된 파티 검색</span><input id="saved-analysis-search" type="search" placeholder="캐릭터 이름 또는 분석 내용 검색"></label>` : ''}</header>
        ${analyses.length ? `<section id="saved-analysis-list" class="saved-analysis-list">${analyses.map((analysis) => analysisEntry(analysis, analysis.id === requested)).join('')}</section>` : `<section class="archive-empty-state"><strong>아직 저장된 파티 분석이 없습니다.</strong><p>파티 분석을 완료한 뒤 ‘분석 완료’ 버튼에 마우스를 올려 ‘분석 내보내기’를 실행하면 JSON 다운로드와 함께 이 브라우저의 분석 결과 목록에도 저장됩니다.</p><a href="party.html">파티 분석으로 이동</a></section>`}
      </main>
    </div>
    <button type="button" id="toggle-character-reference" class="party-reference-toggle" aria-expanded="false" aria-controls="party-reference-panel" aria-label="캐릭터 빠른 조회 패널 열기">
      <span class="party-reference-toggle-icon" aria-hidden="true">‹</span>
    </button>
    <aside id="party-reference-panel" class="party-reference-panel" aria-hidden="true" aria-labelledby="party-reference-title" inert>
      <div class="party-reference-panel-inner">
        <header class="party-reference-panel-heading"><small>QUICK CHARACTER LOOKUP</small><h2 id="party-reference-title">캐릭터 빠른 조회</h2><p>분석 결과를 유지한 채 캐릭터의 전투 스킬, 재능과 잠재력을 확인하세요.</p></header>
        <label class="search-field party-reference-search-field">
          <span>캐릭터 검색</span>
          <input id="party-reference-search" type="search" autocomplete="off" placeholder="예: 이본, 탕탕, 레바테인" aria-controls="party-reference-results">
        </label>
        <div id="party-reference-results" class="party-reference-results" role="listbox" hidden></div>
        <div id="party-reference-content" class="party-reference-content" aria-live="polite">
          <div class="party-reference-empty"><strong>캐릭터 이름을 검색해 주세요.</strong><p>선택한 캐릭터의 전투 스킬 4종, 재능 2종과 잠재력 P1~P5를 이 패널에서 바로 확인할 수 있습니다.</p></div>
        </div>
      </div>
    </aside>`;

    const search = document.getElementById('saved-analysis-search');
    const entries = [...document.querySelectorAll('.saved-analysis-entry')];
    search?.addEventListener('input', () => {
      const query = search.value.trim().toLocaleLowerCase('ko-KR');
      entries.forEach((entry) => { entry.hidden = Boolean(query && !entry.dataset.search.includes(query)); });
    });

    document.addEventListener('click', (event) => {
      const button = event.target.closest('[data-toggle-analysis]');
      if (!button) return;
      const entry = button.closest('.saved-analysis-entry');
      if (!entry) return;
      const open = button.getAttribute('aria-expanded') !== 'true';
      setEntryOpen(entry, open);
      if (open) history.replaceState(null, '', resultsUrl(button.dataset.toggleAnalysis));
      else history.replaceState(null, '', resultsUrl());
    });

    const requestedEntry = requested ? entries.find((entry) => entry.dataset.analysisId === requested) : null;
    if (requestedEntry) requestAnimationFrame(() => requestedEntry.scrollIntoView({ block: 'start' }));

    initCharacterReferencePanel();
  }

  render();
})();
