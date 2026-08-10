(function () {
  'use strict';

  const DATA = window.APP_DATA;
  const glossary = DATA.glossary;
  const SKPORT_ASSETS = window.SKPORT_ASSETS || {};
  const GAME_TERMS = window.GAME_TERMS || { terms: [], keywords: [] };
  const GAME_TERM_BY_ID = new Map((GAME_TERMS.terms || []).map((term) => [term.id, term]));
  const GAME_KEYWORD_BY_TEXT = new Map((GAME_TERMS.keywords || []).map((keyword) => [keyword.text, keyword]));
  const GAME_KEYWORDS = [...GAME_KEYWORD_BY_TEXT.values()].sort((left, right) => right.text.length - left.text.length);
  const GAME_KEYWORD_PATTERN = GAME_KEYWORDS.length
    ? new RegExp(GAME_KEYWORDS.map((keyword) => keyword.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g')
    : null;

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

  const NORMALIZED_CHARACTERS = normalizeCharacters(DATA.characters);

  const FILTER_GROUPS = [
    {
      key: 'element',
      label: '속성',
      items: [
        { id: 'physical', label: '물리', assetName: '관리자(여)', iconIndex: 0 },
        { id: 'heat', label: '열기', assetName: '레바테인', iconIndex: 0 },
        { id: 'electric', label: '전기', assetName: '리노', iconIndex: 0 },
        { id: 'frost', label: '냉기', assetName: '이본', iconIndex: 0 },
        { id: 'nature', label: '자연', assetName: '질베르타', iconIndex: 0 }
      ]
    },
    {
      key: 'role',
      label: '역할군',
      items: [
        { id: 'guard', label: '가드', assetName: '에스텔라', iconIndex: 1 },
        { id: 'defender', label: '디펜더', assetName: '엠버', iconIndex: 1 },
        { id: 'supporter', label: '서포터', assetName: '자이히', iconIndex: 1 },
        { id: 'caster', label: '캐스터', assetName: '울프가드', iconIndex: 1 },
        { id: 'striker', label: '스트라이커', assetName: '레바테인', iconIndex: 1 },
        { id: 'vanguard', label: '뱅가드', assetName: '카뮤', iconIndex: 1 }
      ]
    }
  ];

  function filterIcon(item) {
    return SKPORT_ASSETS[item.assetName]?.icons?.[item.iconIndex] || '';
  }

  function characterClassification(character) {
    const asset = characterAsset(character);
    const icons = asset?.icons || [];
    const result = { element: '', role: '' };

    FILTER_GROUPS.forEach((group) => {
      const matched = group.items.find((item) => filterIcon(item) === icons[item.iconIndex]);
      result[group.key] = matched?.id || '';
    });

    return result;
  }

  const ELEMENT_SORT_ORDER = ['physical', 'heat', 'electric', 'frost', 'nature'];

  function sortCharactersByElement(characters) {
    const order = new Map(ELEMENT_SORT_ORDER.map((element, index) => [element, index]));
    return characters
      .map((character, originalIndex) => ({ character, originalIndex }))
      .sort((left, right) => {
        const leftElement = characterClassification(left.character).element;
        const rightElement = characterClassification(right.character).element;
        const leftOrder = order.has(leftElement) ? order.get(leftElement) : ELEMENT_SORT_ORDER.length;
        const rightOrder = order.has(rightElement) ? order.get(rightElement) : ELEMENT_SORT_ORDER.length;
        return leftOrder - rightOrder || left.originalIndex - right.originalIndex;
      })
      .map((entry) => entry.character);
  }

  const CHARACTERS = sortCharactersByElement(NORMALIZED_CHARACTERS);

  function filterControls() {
    return FILTER_GROUPS.map((group) => `<div class="filter-group" aria-label="${esc(group.label)} 필터">
      <span class="filter-group-label">${esc(group.label)}</span>
      <div class="filter-buttons">
        ${group.items.map((item) => {
          const src = filterIcon(item);
          return `<button type="button"
            class="filter-icon-button"
            data-filter-group="${esc(group.key)}"
            data-filter-value="${esc(item.id)}"
            data-tooltip="${esc(`${group.label} · ${item.label}`)}"
            aria-label="${esc(`${group.label} ${item.label} 필터`)}"
            aria-pressed="false">
            ${src ? `<img src="${esc(src)}" alt="">` : `<span>${esc(item.label.slice(0, 1))}</span>`}
          </button>`;
        }).join('')}
      </div>
    </div>`).join('<span class="filter-divider" aria-hidden="true"></span>');
  }

  function esc(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function gameKeywordButton(keyword, label) {
    return `<button type="button" class="term-link" data-game-keyword="${esc(keyword.text)}" data-game-term="${esc(keyword.termId)}" data-color="${esc(keyword.color || 'cyan')}">${esc(label)}</button>`;
  }

  function explicitTermButton(key, label) {
    const legacy = glossary[key];
    const keyword = GAME_KEYWORD_BY_TEXT.get(label) || (legacy && GAME_KEYWORD_BY_TEXT.get(legacy.name));
    if (!legacy && !keyword) return esc(label);

    const attributes = [
      legacy ? `data-term="${esc(key)}"` : '',
      keyword ? `data-game-keyword="${esc(keyword.text)}" data-game-term="${esc(keyword.termId)}"` : '',
      `data-color="${esc(keyword?.color || legacy?.color || 'orange')}"`
    ].filter(Boolean).join(' ');

    return `<button type="button" class="term-link" ${attributes}>${esc(label)}</button>`;
  }

  function autoHighlight(text) {
    if (!GAME_KEYWORD_PATTERN || !text) return esc(text);

    const normalized = String(text).replace(/\[([^\[\]]+)\]/g, (match, inner) => {
      const clean = inner.trim();
      return GAME_KEYWORD_BY_TEXT.has(clean) ? clean : match;
    });

    let output = '';
    let cursor = 0;
    GAME_KEYWORD_PATTERN.lastIndex = 0;
    for (const match of normalized.matchAll(GAME_KEYWORD_PATTERN)) {
      const keyword = GAME_KEYWORD_BY_TEXT.get(match[0]);
      if (!keyword) continue;
      output += esc(normalized.slice(cursor, match.index));
      output += gameKeywordButton(keyword, match[0]);
      cursor = match.index + match[0].length;
    }
    output += esc(normalized.slice(cursor));
    return output;
  }

  function rich(text) {
    const source = String(text ?? '');
    const explicitTokens = [];
    const tokenized = source.replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, (_, key, label) => {
      const token = `\uE000${explicitTokens.length}\uE001`;
      explicitTokens.push(explicitTermButton(key, label));
      return token;
    });

    return tokenized
      .split(/(\uE000\d+\uE001)/g)
      .map((part) => {
        const tokenMatch = part.match(/^\uE000(\d+)\uE001$/);
        return tokenMatch ? explicitTokens[Number(tokenMatch[1])] : autoHighlight(part);
      })
      .join('');
  }

  function normalizeSearchText(value) {
    return String(value ?? '')
      .normalize('NFKC')
      .toLocaleLowerCase('ko-KR')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function collectSearchValues(value, values, glossaryKeys) {
    if (value == null) return;

    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      const text = String(value);
      values.push(text);

      if (typeof value === 'string') {
        for (const match of text.matchAll(/\[\[([^|\]]+)\|[^\]]+\]\]/g)) {
          glossaryKeys.add(match[1]);
        }
      }
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => collectSearchValues(item, values, glossaryKeys));
      return;
    }

    if (typeof value === 'object') {
      Object.values(value).forEach((item) => collectSearchValues(item, values, glossaryKeys));
    }
  }

  function characterSearchText(character) {
    const values = [];
    const glossaryKeys = new Set();
    collectSearchValues(character, values, glossaryKeys);

    glossaryKeys.forEach((key) => {
      const term = glossary[key];
      if (!term) return;
      collectSearchValues(term, values, new Set());
    });

    const rawCharacterText = values.join(' ');
    const relatedGameTermIds = new Set();
    GAME_KEYWORDS.forEach((keyword) => {
      if (rawCharacterText.includes(keyword.text)) relatedGameTermIds.add(keyword.termId);
    });
    relatedGameTermIds.forEach((termId) => {
      const term = GAME_TERM_BY_ID.get(termId);
      if (term) collectSearchValues(term, values, new Set());
    });

    return normalizeSearchText(values.join(' '));
  }

  const CHARACTER_SEARCH_INDEX = CHARACTERS.map(characterSearchText);


  function characterAsset(character) {
    const lookupName = character.name === '관리자 [남][여]' ? '관리자(여)' : (character.assetName || character.name);
    return SKPORT_ASSETS[lookupName] || null;
  }

  function characterVisual(character) {
    const asset = characterAsset(character);
    if (!asset?.portrait) {
      return `<span class="character-portrait character-portrait--fallback" aria-hidden="true"><span>${esc(character.name.slice(0, 1))}</span></span>`;
    }

    // SKPORT에서 위→아래로 표시되던 두 아이콘을 같은 순서로 왼쪽→오른쪽에 배치합니다.
    const icons = (asset.icons || []).slice(0, 2)
      .map((src, index) => `<img src="${esc(src)}" alt="" class="character-identity-icon character-identity-icon-${index + 1}">`)
      .join('');

    return `<span class="character-portrait">
      <img class="character-portrait-image" src="${esc(asset.portrait)}" alt="${esc(character.name)} 초상화" loading="lazy" referrerpolicy="no-referrer">
    </span>
    ${icons ? `<span class="character-identity-icons" aria-hidden="true">${icons}</span>` : ''}`;
  }

  function isResourceLabel(text) {
    return /(스킬\s*코스트|코스트|쿨타임)/.test(String(text));
  }

  function rowBadges(item) {
    const badges = item.badges || (item.badge ? [{ text: item.badge }] : []);
    if (!badges.length) return '';

    return `<div class="row-badges">${badges.map((badge) => {
      const text = typeof badge === 'string' ? badge : badge.text;
      const kind = typeof badge === 'string' ? '' : badge.kind;
      const resource = kind === 'resource' || isResourceLabel(text);
      return `<span class="row-badge${resource ? ' row-badge--resource' : ''}">${esc(text)}</span>`;
    }).join('')}</div>`;
  }

  function skillRow(item, id) {
    return `<article class="reading-row" id="${id}">
      <header class="row-heading">
        <span class="row-type">${esc(item.type || item.index)}</span>
        <h4>${esc(item.name)}</h4>
        ${rowBadges(item)}
      </header>
      <div class="row-body">
        ${(item.paragraphs || []).map((p) => `<p>${rich(p)}</p>`).join('')}
        ${item.chips?.length ? `<div class="row-points">${item.chips.map((chip) => `<span class="${isResourceLabel(chip) ? 'row-point--resource' : ''}">${esc(chip)}</span>`).join('')}</div>` : ''}
      </div>
    </article>`;
  }

  function characterCard(character, index) {
    const uid = `character-${character.id}`;
    const classification = characterClassification(character);
    return `<details class="character-card" id="${uid}" data-element="${esc(classification.element)}" data-role="${esc(classification.role)}">
      <summary class="character-summary">
        <div class="character-identity">
          ${characterVisual(character)}
          <h2>${esc(character.name)}</h2>
        </div>
        <div class="character-tags" aria-label="캐릭터 키워드">
          ${character.tags.map((tag, tagIndex) => `<span class="character-tag ${tagIndex === 0 ? 'hot' : ''}">${esc(tag)}</span>`).join('')}
        </div>
        <span class="summary-action" aria-hidden="true"><i></i></span>
      </summary>

      <div class="character-content">
        <nav class="section-nav" aria-label="${esc(character.name)} 내부 이동">
          <button type="button" data-target="${uid}-skills">전투 스킬</button>
          <button type="button" data-target="${uid}-talents">재능</button>
          <button type="button" data-target="${uid}-potentials">잠재력</button>
          <button type="button" data-target="${uid}-weakness">약점 분석</button>
        </nav>

        <section class="character-section" id="${uid}-skills">
          <header class="section-heading">
            <span>01</span>
            <div><h3>전투 스킬</h3><p>일반 공격, 배틀 스킬, 연계 스킬, 궁극기</p></div>
          </header>
          <div class="reading-list">
            ${character.skills.map((skill, skillIndex) => skillRow(skill, `${uid}-skill-${skillIndex}`)).join('')}
          </div>
        </section>

        <section class="character-section" id="${uid}-talents">
          <header class="section-heading">
            <span>02</span>
            <div><h3>재능</h3><p>발동 조건과 지속 효과</p></div>
          </header>
          <div class="reading-list">
            ${character.talents.map((talent, talentIndex) => skillRow(talent, `${uid}-talent-${talentIndex}`)).join('')}
          </div>
        </section>

        <section class="character-section" id="${uid}-potentials">
          <header class="section-heading">
            <span>03</span>
            <div><h3>잠재력</h3><p>P1부터 P5까지의 변경 효과</p></div>
          </header>
          <div class="potential-list">
            ${character.potentials.map((potential) => `<article class="potential-row">
              <div class="potential-index">${esc(potential.index)}</div>
              <div class="potential-name">${esc(potential.name)}</div>
              <div class="potential-detail">${rich(potential.text)}<small>영향 대상 · ${esc(potential.target)}</small></div>
            </article>`).join('')}
          </div>
        </section>

        <section class="character-section" id="${uid}-weakness">
          <header class="section-heading">
            <span>04</span>
            <div><h3>약점 분석</h3><p>스킬 순환과 취약 구조를 근거 중심으로 정리</p></div>
          </header>

          <div class="loop-panel">
            <div class="loop-title">핵심 순환</div>
            <ol class="loop-list">
              ${character.loop.map((step) => `<li><strong>${esc(step.label)}</strong><p>${rich(step.detail)}</p></li>`).join('')}
            </ol>
          </div>

          <div class="weakness-list">
            ${character.weaknesses.map((weakness) => `<article class="weakness-row">
              <header><small>취약 구조</small><h4>${esc(weakness.axis)}</h4></header>
              <div class="weakness-detail">
                <div><strong>스킬 근거</strong><p>${rich(weakness.evidence)}</p></div>
                <div><strong>영향 스킬</strong><p class="affected">${rich(weakness.affected)}</p></div>
                <div><strong>약점 해석</strong><p>${rich(weakness.implication)}</p></div>
              </div>
            </article>`).join('')}
          </div>
        </section>
      </div>
    </details>`;
  }

  function siteHeader(activePage) {
    return `<header class="app-topbar">
      <div class="brand">
        <a class="brand-mark" href="index.html" aria-label="Endfield Balance Lab 파티 분석 페이지"><img class="site-brand-character" src="assets/lab-brand-character.jpg" alt=""></a>
        <div class="brand-copy">
          <a class="brand-title" href="index.html"><strong>ENDFIELD BALANCE LAB</strong></a>
          <div class="brand-lower">
            <small>엔드필드 위기 협약 데이터베이스</small>
            <nav class="site-nav" aria-label="페이지 전환">
              <a href="glossary.html" class="${activePage === 'glossary' ? 'active' : ''}">용어 사전</a>
              <a href="characters.html" class="${activePage === 'characters' ? 'active' : ''}" aria-current="${activePage === 'characters' ? 'page' : 'false'}">캐릭터</a>
              <a href="index.html" class="${activePage === 'party' ? 'active' : ''}">파티 분석</a>
              <a href="results.html" class="${activePage === 'results' ? 'active' : ''}">분석 결과</a>
              <a href="monster-patterns/index.html">등장 몬스터</a>
              <a href="dungeon-monsters.html" class="${activePage === 'dungeon-monsters' ? 'active' : ''}">스테이지 구성</a>
              <a href="constraints.html" class="${activePage === 'constraints' ? 'active' : ''}">제약 추천</a>
              <a href="constraint-board.html" class="${activePage === 'constraint-board' ? 'active' : ''}">제약 설계</a>
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

  function render() {
    document.body.innerHTML = `
      ${siteHeader('characters')}

      <main class="page-shell">
        <header class="page-heading">
          <div>
            <span>CHARACTER DATABASE</span>
            <h1>캐릭터</h1>
            <p>이름·키워드·스킬·재능·잠재력·전투 순환·약점 분석과 관련 툴팁 용어를 검색할 수 있습니다.</p>
          </div>
          <label class="search-field">
            <span>캐릭터 검색</span>
            <input id="character-search" type="search" placeholder="이름, 스킬, 효과, 툴팁 용어 검색">
          </label>
        </header>

        <div class="list-toolbar">
          <div class="toolbar-primary">
            <span class="character-total">등록 캐릭터 <b id="character-count">${CHARACTERS.length}</b></span>
            <div class="character-filters" aria-label="속성 및 역할군 필터">
              ${filterControls()}
              <button type="button" id="reset-filters" class="reset-filters" hidden>필터 해제</button>
            </div>
          </div>
          <div class="toolbar-actions">
            <button type="button" id="expand-all">모두 펼치기</button>
            <button type="button" id="collapse-all">모두 접기</button>
          </div>
        </div>

        <section id="character-list" class="character-list" aria-label="캐릭터 목록">
          ${CHARACTERS.map(characterCard).join('')}
        </section>

        <div id="empty-state" class="empty-state" hidden>검색 조건에 맞는 캐릭터가 없습니다.</div>
      </main>

      <div class="tooltip" role="tooltip" aria-hidden="true"></div>`;

    initCharacterCards();
    initListFilters();
    initTooltip();
  }

  function initCharacterCards() {
    const cards = [...document.querySelectorAll('.character-card')];

    document.querySelectorAll('.section-nav button').forEach((button) => {
      button.addEventListener('click', () => {
        const target = document.getElementById(button.dataset.target);
        if (!target) return;
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    document.getElementById('expand-all').addEventListener('click', () => {
      cards.filter((card) => !card.hidden).forEach((card) => { card.open = true; });
    });

    document.getElementById('collapse-all').addEventListener('click', () => {
      cards.filter((card) => !card.hidden).forEach((card) => { card.open = false; });
    });
  }

  function initListFilters() {
    const input = document.getElementById('character-search');
    const cards = [...document.querySelectorAll('.character-card')];
    const count = document.getElementById('character-count');
    const empty = document.getElementById('empty-state');
    const reset = document.getElementById('reset-filters');
    const buttons = [...document.querySelectorAll('.filter-icon-button')];
    const selected = {
      element: new Set(),
      role: new Set()
    };

    function matchesSelection(value, selection) {
      return selection.size === 0 || selection.has(value);
    }

    function applyFilters() {
      const query = normalizeSearchText(input.value);
      const queryTerms = query.split(' ').filter(Boolean);
      let visible = 0;

      cards.forEach((card, index) => {
        const haystack = CHARACTER_SEARCH_INDEX[index];
        const searchMatch = queryTerms.length === 0 || queryTerms.every((term) => haystack.includes(term));
        const elementMatch = matchesSelection(card.dataset.element, selected.element);
        const roleMatch = matchesSelection(card.dataset.role, selected.role);
        const match = searchMatch && elementMatch && roleMatch;

        card.hidden = !match;
        if (match) visible += 1;
      });

      const hasSelection = selected.element.size > 0 || selected.role.size > 0;
      reset.hidden = !hasSelection;
      count.textContent = visible;
      empty.hidden = visible !== 0;
    }

    input.addEventListener('input', applyFilters);

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const group = button.dataset.filterGroup;
        const value = button.dataset.filterValue;
        const set = selected[group];

        if (set.has(value)) set.delete(value);
        else set.add(value);

        const active = set.has(value);
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
        applyFilters();
      });
    });

    reset.addEventListener('click', () => {
      selected.element.clear();
      selected.role.clear();
      buttons.forEach((button) => {
        button.classList.remove('active');
        button.setAttribute('aria-pressed', 'false');
      });
      applyFilters();
    });

    applyFilters();
  }

  function initTooltip() {
    const tooltip = document.querySelector('.tooltip');
    let active = null;

    function place(target) {
      const rect = target.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
      left = Math.max(12, Math.min(left, window.innerWidth - tooltipRect.width - 12));
      let top = rect.top - tooltipRect.height - 10;
      if (top < 10) top = rect.bottom + 10;
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    }

    function show(target) {
      const keyword = GAME_KEYWORD_BY_TEXT.get(target.dataset.gameKeyword || '');
      const gameTerm = GAME_TERM_BY_ID.get(target.dataset.gameTerm || keyword?.termId || '');
      const legacy = glossary[target.dataset.term];

      if (!keyword && !gameTerm && !legacy) return;

      let category = legacy?.fullName || legacy?.category || '';
      let title = legacy?.name || '';
      let description = legacy?.description || '';

      if (gameTerm) {
        const definition = gameTerm.sections?.find((section) => section.label === '정의 및 효과 설명')?.text
          || gameTerm.sections?.[0]?.text
          || '';
        category = gameTerm.category;
        title = keyword?.title || keyword?.text || gameTerm.name;
        description = keyword?.description || definition;
      }

      active = target;
      tooltip.innerHTML = `<div class="tooltip-category">${esc(category)}</div><h3>${esc(title)}</h3><p>${esc(description).replaceAll('\n', '<br>')}</p>`;
      tooltip.classList.add('visible');
      tooltip.setAttribute('aria-hidden', 'false');
      requestAnimationFrame(() => place(target));
    }

    function hide() {
      active = null;
      tooltip.classList.remove('visible');
      tooltip.setAttribute('aria-hidden', 'true');
    }

    document.addEventListener('pointerover', (event) => {
      const target = event.target.closest('.term-link');
      if (target && event.pointerType !== 'touch') show(target);
    });

    document.addEventListener('pointerout', (event) => {
      if (event.target.closest('.term-link') && event.pointerType !== 'touch') hide();
    });

    document.addEventListener('click', (event) => {
      const target = event.target.closest('.term-link');
      if (target) {
        event.preventDefault();
        active === target ? hide() : show(target);
      } else if (!event.target.closest('.tooltip')) {
        hide();
      }
    });

    window.addEventListener('scroll', () => active && place(active), { passive: true });
    window.addEventListener('resize', () => active && place(active));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') hide();
    });
  }

  render();
})();
