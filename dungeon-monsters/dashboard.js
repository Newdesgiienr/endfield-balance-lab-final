(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const fmt = value => Number(value || 0).toLocaleString('ko-KR');

  let activeView = 'enemy-view';
  let catalogType = 'all';
  let catalogTier = 'all';
  let catalogQuery = '';
  let catalogFocusId = null;

  let activeComposition = 1;
  let activeWaveIndex = 0;
  let monsterFilter = 'all';
  let monsterQuery = '';
  let selectedPlacementUid = null;
  const selectedOrderPlacementUids = new Set();
  let showAllRanges = true;
  let activeDraggedPlacementUid = null;
  let activeDraggedGroupUids = [];

  const GRID_COLS = 12;
  const GRID_ROWS = 12;
  const METERS_PER_CELL = 2;
  const PLACEMENT_STORAGE_KEY = 'endfieldEnemyPlacementsV5UploadedCompositions';
  const PLACEMENT_SEED_REVISION_KEY = 'endfieldEnemyPlacementsSeedRevision';
  const PLACEMENT_SEED_REVISION = 'compositions-1-2-3-grid-only-v123';
  const FIXED_MONSTER_HP_INCREASE_PERCENT = 30;
  const hpBuffPercent = FIXED_MONSTER_HP_INCREASE_PERCENT;

  function roundHp(value) {
    return Math.round((Number(value) || 0) * 10) / 10;
  }

  function hpMultiplier() {
    return 1 + FIXED_MONSTER_HP_INCREASE_PERCENT / 100;
  }

  function monsterHp(monsterOrKey) {
    const monster = typeof monsterOrKey === 'string' ? MONSTERS[monsterOrKey] : monsterOrKey;
    return roundHp((monster?.hp || 0) * hpMultiplier());
  }

  function fmtHp(value) {
    return Number(value || 0).toLocaleString('ko-KR', { maximumFractionDigits: 1 });
  }
  const DEFAULT_POSITIONS = [
    [5,3],[6,3],[5,4],[6,4],
    [3,2],[8,2],[3,5],[8,5],
    [1,1],[10,1],[1,6],[10,6],
    [4,1],[7,1],[4,6],[7,6],
    [2,3],[9,3],[2,4],[9,4],
    [5,1],[6,1],[5,6],[6,6]
  ];

  function cardType(card) {
    if (card.name.startsWith('팀:')) return 'team';
    if (card.name.startsWith('조작:')) return 'control';
    if (card.name.startsWith('환경:')) return 'env';
    return 'etc';
  }

  function typeLabel(type) {
    return ({ team: '팀', control: '조작', env: '환경' })[type] || '기타';
  }

  function totalScore() {
    let score = 0;
    selected.forEach(id => { const card = getCard(id); if (card) score += card.pts; });
    return score;
  }

  function syncTopbar() {
    const count = $('#top-selected-count');
    const score = $('#top-score');
    if (count) count.textContent = selected.size;
    if (score) score.textContent = totalScore();
  }

  function openView(id) {
    activeView = id;
    $$('.app-view').forEach(view => view.classList.toggle('active', view.id === id));
    $$('.app-tab').forEach(tab => tab.classList.toggle('active', tab.dataset.target === id));
    const topbarStatus = $('.topbar-status');
    if (topbarStatus) topbarStatus.classList.toggle('simulator-only-hidden', id !== 'simulator-view');
    const stage = $('.app-stage');
    if (stage) stage.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    if (id === 'catalog-view') renderCatalog();
    if (id === 'enemy-view') renderEnemyWorkspace();
    hideFloatingTooltip();
  }

  $$('.app-tab').forEach(tab => tab.addEventListener('click', () => openView(tab.dataset.target)));

  /* ---------- 지표 정보: 시뮬레이터 상태와 완전히 분리 ---------- */
  function catalogCards() {
    return ROWS.flatMap(row => row.cards.map(card => ({ ...card, tier: row.tier }))).filter(card => !card.empty);
  }

  function matchesCatalogFilter(card) {
    const typeOk = catalogType === 'all' || cardType(card) === catalogType;
    const tierOk = catalogTier === 'all' || String(card.tier || getTier(card.id)) === catalogTier;
    const query = catalogQuery.trim().toLowerCase();
    const queryOk = !query || `${card.name} ${card.desc || ''}`.toLowerCase().includes(query);
    return typeOk && tierOk && queryOk;
  }

  function buildCatalogBoard() {
    const area = $('#catalog-grid-area');
    if (!area) return;
    area.innerHTML = '';

    ROWS.forEach(({ tier, cards }) => {
      const wrap = document.createElement('div');
      wrap.className = 'row-wrap';
      wrap.innerHTML = `
        <div class="tier-bar t${tier}"></div>
        <div class="row-label"><span class="tier-num">${tier}</span><span class="tier-icon">★</span></div>
      `;

      const row = document.createElement('div');
      row.className = 'cards-row';

      cards.forEach(card => {
        const el = document.createElement('button');
        el.type = 'button';
        el.className = 'card catalog-map-card';
        el.style.gridColumn = card.col;

        if (card.lineTop) el.classList.add('line-top');
        if (card.lineBottom) el.classList.add('line-bottom');
        if (card.lineLeft) el.classList.add('line-left');
        if (card.lineRight) el.classList.add('line-right');

        if (card.empty) {
          el.classList.add('empty');
          el.tabIndex = -1;
          if (card.connectorOnly) el.classList.add('connector-only');
          el.innerHTML = `
            <span class="conn top"></span><span class="conn bottom"></span>
            <span class="conn left"></span><span class="conn right"></span>
            ${card.connectorOnly ? '' : '<div class="card-x"></div>'}
          `;
          row.appendChild(el);
          return;
        }

        const cardWithTier = { ...card, tier };
        const matched = matchesCatalogFilter(cardWithTier);
        if (!matched) el.classList.add('filter-muted');
        if (catalogFocusId === card.id) el.classList.add('catalog-focused');
        if (card.key) el.classList.add('key-card');
        if (card.unlockable) el.classList.add('unlockable-card');
        el.setAttribute('aria-label', `${card.name}, ${card.pts}점`);
        el.innerHTML = `
          <span class="conn top"></span><span class="conn bottom"></span>
          <span class="conn left"></span><span class="conn right"></span>
          <div class="card-icon"><img src="${card.icon}" alt="${card.name}" draggable="false"></div>
        `;

        el.addEventListener('click', () => {
          if (!matched) return;
          catalogFocusId = card.id;
          renderCatalog();
          requestAnimationFrame(() => $('#catalog-detail')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
        });
        el.addEventListener('mouseenter', () => showFloatingTooltip(card, el));
        el.addEventListener('mouseleave', hideFloatingTooltip);
        row.appendChild(el);
      });

      wrap.appendChild(row);
      area.appendChild(wrap);
    });
  }

  function renderCatalog() {
    const cards = catalogCards();
    const filtered = cards.filter(matchesCatalogFilter);
    $('#catalog-total').textContent = cards.length;

    if (catalogFocusId && !filtered.some(card => card.id === catalogFocusId)) {
      catalogFocusId = null;
    }

    buildCatalogBoard();

    const focused = catalogFocusId ? getCard(catalogFocusId) : null;
    $('#catalog-focus-name').textContent = focused ? focused.name.replace(/^(팀|조작|환경):\s*/, '') : '없음';
    $('#catalog-focus-score').textContent = focused ? `${focused.pts}★` : '-';

    if (!focused) {
      $('#catalog-detail').innerHTML = filtered.length
        ? '<div class="empty-detail"><span>◈</span><strong>지표 아이콘을 선택하세요</strong><p>시뮬레이터의 선택 상태와 무관하게 이 페이지에서 열람할 지표를 고를 수 있습니다.</p></div>'
        : '<div class="empty-detail"><span>⌕</span><strong>조건에 맞는 지표가 없습니다</strong><p>검색어 또는 필터 조건을 변경해 주세요.</p></div>';
      return;
    }

    renderCatalogDetail({ ...focused, tier: getTier(focused.id) });
  }

  function renderCatalogDetail(card) {
    const type = cardType(card);
    const related = card.group
      ? catalogCards().filter(item => item.group === card.group && item.id !== card.id).map(item => item.name)
      : [];
    const requires = card.requiresAny
      ? card.requiresAny.map(id => getCard(id)?.name || id)
      : [];

    $('#catalog-detail').innerHTML = `
      <div class="detail-wide-identity">
        <div class="detail-icon"><img src="${card.icon}" alt="${card.name}"></div>
        <div class="detail-title">
          <small>${typeLabel(type)} · ${card.pts}점 지표</small>
          <h2>${card.name}</h2>
          <span>지표 정보 페이지에서 열람 중</span>
        </div>
      </div>
      <div class="detail-wide-section detail-effect">
        <h4>효과</h4>
        <div class="detail-desc">${colorizeDesc(card.desc || '설명 없음')}</div>
      </div>
      <div class="detail-wide-section detail-relation">
        <h4>관계</h4>
        <div class="detail-tags">
          <span class="detail-tag">${card.tier || getTier(card.id)}단계</span>
          <span class="detail-tag">${typeLabel(type)} 유형</span>
          ${related.length ? related.map(name => `<span class="detail-tag">동일 그룹: ${name}</span>`).join('') : '<span class="detail-tag">단독 지표</span>'}
          ${requires.map(name => `<span class="detail-tag">해금 조건: ${name}</span>`).join('')}
        </div>
      </div>
    `;
  }

  $('#catalog-search')?.addEventListener('input', event => {
    catalogQuery = event.target.value;
    renderCatalog();
  });
  $$('#catalog-type-filters .filter-chip').forEach(btn => btn.addEventListener('click', () => {
    catalogType = btn.dataset.filter;
    $$('#catalog-type-filters .filter-chip').forEach(item => item.classList.toggle('active', item === btn));
    renderCatalog();
  }));
  $$('#catalog-tier-filters .filter-chip').forEach(btn => btn.addEventListener('click', () => {
    catalogTier = btn.dataset.tier;
    $$('#catalog-tier-filters .filter-chip').forEach(item => item.classList.toggle('active', item === btn));
    renderCatalog();
  }));

  const catalogBoardWrap = $('#catalog-board-wrap');
  catalogBoardWrap?.addEventListener('wheel', event => {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault();
      catalogBoardWrap.scrollLeft += event.deltaY;
    }
  }, { passive: false });

  /* ---------- 던전 몬스터 배치 편집기 ---------- */
  const SEEDED_COMPOSITION_PLACEMENTS = {
  "1": [
    [
      {
        "uid": "composition-1-wave-1-1-ee3ab2ed-9c0f-4641-bdce-444c3e4fc741",
        "monsterKey": "ram",
        "slotType": "intersection",
        "x": 5,
        "y": 3,
        "spawnOrder": 1
      },
      {
        "uid": "composition-1-wave-1-2-a968c727-d335-4462-add3-d2263b9a4e49",
        "monsterKey": "ram",
        "slotType": "intersection",
        "x": 6,
        "y": 2,
        "spawnOrder": 1
      },
      {
        "uid": "composition-1-wave-1-3-505d9ac9-f875-4b9d-89ff-8f94e4736f0a",
        "monsterKey": "ram",
        "slotType": "intersection",
        "x": 7,
        "y": 3,
        "spawnOrder": 1
      },
      {
        "uid": "composition-1-wave-1-4-438b7e01-72c8-48b9-8741-5ce3e759126e",
        "monsterKey": "falsewings",
        "slotType": "intersection",
        "x": 6,
        "y": 3,
        "spawnOrder": 2
      },
      {
        "uid": "composition-1-wave-1-5-c70fcd78-2dac-4ebf-b2e3-ff5824d31bcd",
        "monsterKey": "falsewings",
        "slotType": "intersection",
        "x": 3,
        "y": 8,
        "spawnOrder": 2
      },
      {
        "uid": "composition-1-wave-1-6-54614c2f-45a2-463c-923c-b3bc32061393",
        "monsterKey": "falsewings",
        "slotType": "intersection",
        "x": 9,
        "y": 8,
        "spawnOrder": 2
      },
      {
        "uid": "composition-1-wave-1-7-06e4ebc2-a2ca-46ec-883e-c6892de7d397",
        "monsterKey": "heavySting",
        "slotType": "intersection",
        "x": 6,
        "y": 6,
        "spawnOrder": 2
      }
    ],
    [
      {
        "uid": "composition-1-wave-2-1-98fcb41e-a7ed-41a4-8fd1-f927d4d1fda1",
        "monsterKey": "mudflow",
        "slotType": "intersection",
        "x": 6,
        "y": 6,
        "spawnOrder": 1
      },
      {
        "uid": "composition-1-wave-2-2-37051fc4-6cd3-48fb-a70f-6efbaac7f4c6",
        "monsterKey": "mudflow",
        "slotType": "intersection",
        "x": 5,
        "y": 8,
        "spawnOrder": 1
      },
      {
        "uid": "composition-1-wave-2-3-9055d776-fa82-4bbb-a61d-5c85852e464a",
        "monsterKey": "mudflow",
        "slotType": "intersection",
        "x": 7,
        "y": 8,
        "spawnOrder": 1
      },
      {
        "uid": "composition-1-wave-2-4-a9c48171-a549-4550-ace9-90ec9b442421",
        "monsterKey": "hedron",
        "slotType": "intersection",
        "x": 6,
        "y": 2,
        "spawnOrder": 2
      },
      {
        "uid": "composition-1-wave-2-5-4fd4bcf8-2d8d-4b86-9b11-d418190f5be2",
        "monsterKey": "hedron",
        "slotType": "intersection",
        "x": 1,
        "y": 9,
        "spawnOrder": 2
      },
      {
        "uid": "composition-1-wave-2-6-f6427523-3e15-49e5-b610-430ab86b7e6c",
        "monsterKey": "hedron",
        "slotType": "intersection",
        "x": 11,
        "y": 9,
        "spawnOrder": 2
      },
      {
        "uid": "composition-1-wave-2-7-6c58e7c9-a943-45dd-b2e3-657be5e0f24e",
        "monsterKey": "prism",
        "slotType": "intersection",
        "x": 7,
        "y": 6,
        "spawnOrder": 3
      },
      {
        "uid": "composition-1-wave-2-8-cbd4f7ef-8ccc-4405-80cd-6ddbd6ced709",
        "monsterKey": "tidewalker",
        "slotType": "intersection",
        "x": 6,
        "y": 7,
        "spawnOrder": 3
      }
    ],
    [
      {
        "uid": "composition-1-wave-3-1-f1dc218b-557f-4300-bfb5-98629352ca29",
        "monsterKey": "heavyRam",
        "slotType": "intersection",
        "x": 3,
        "y": 6,
        "spawnOrder": 1
      },
      {
        "uid": "composition-1-wave-3-2-0a06daa2-281c-45c7-af8a-864645152c2c",
        "monsterKey": "heavyRam",
        "slotType": "intersection",
        "x": 9,
        "y": 6,
        "spawnOrder": 1
      },
      {
        "uid": "composition-1-wave-3-3-db6e300f-3e57-4f96-b8e7-0ad77fd5290b",
        "monsterKey": "effigy",
        "slotType": "intersection",
        "x": 6,
        "y": 6,
        "spawnOrder": 2
      }
    ],
    [
      {
        "uid": "composition-1-wave-4-1-fb645905-62f6-491f-ba04-d461ce1d4a69",
        "monsterKey": "heavySting",
        "slotType": "intersection",
        "x": 3,
        "y": 6,
        "spawnOrder": 1
      },
      {
        "uid": "composition-1-wave-4-3-8aa996ea-c207-4278-b075-524a912d2893",
        "monsterKey": "tidalklast",
        "slotType": "intersection",
        "x": 6,
        "y": 6,
        "spawnOrder": 2
      },
      {
        "uid": "c9057394-4a48-40b4-8d74-30fe1939c4a4",
        "monsterKey": "heavyRam",
        "slotType": "intersection",
        "x": 9,
        "y": 6,
        "spawnOrder": 1
      }
    ]
  ],
  "2": [
    [
      {
        "uid": "composition-2-wave-1-1-ee3ab2ed-9c0f-4641-bdce-444c3e4fc741",
        "monsterKey": "ram",
        "slotType": "intersection",
        "x": 5,
        "y": 3,
        "spawnOrder": 1
      },
      {
        "uid": "composition-2-wave-1-2-a968c727-d335-4462-add3-d2263b9a4e49",
        "monsterKey": "ram",
        "slotType": "intersection",
        "x": 6,
        "y": 2,
        "spawnOrder": 1
      },
      {
        "uid": "composition-2-wave-1-3-505d9ac9-f875-4b9d-89ff-8f94e4736f0a",
        "monsterKey": "ram",
        "slotType": "intersection",
        "x": 7,
        "y": 3,
        "spawnOrder": 1
      },
      {
        "uid": "composition-2-wave-1-4-438b7e01-72c8-48b9-8741-5ce3e759126e",
        "monsterKey": "falsewings",
        "slotType": "intersection",
        "x": 6,
        "y": 3,
        "spawnOrder": 2
      },
      {
        "uid": "composition-2-wave-1-5-c70fcd78-2dac-4ebf-b2e3-ff5824d31bcd",
        "monsterKey": "falsewings",
        "slotType": "intersection",
        "x": 3,
        "y": 8,
        "spawnOrder": 2
      },
      {
        "uid": "composition-2-wave-1-6-54614c2f-45a2-463c-923c-b3bc32061393",
        "monsterKey": "falsewings",
        "slotType": "intersection",
        "x": 9,
        "y": 8,
        "spawnOrder": 2
      },
      {
        "uid": "composition-2-wave-1-7-06e4ebc2-a2ca-46ec-883e-c6892de7d397",
        "monsterKey": "heavySting",
        "slotType": "intersection",
        "x": 6,
        "y": 6,
        "spawnOrder": 2
      }
    ],
    [
      {
        "uid": "composition-2-wave-2-1-98fcb41e-a7ed-41a4-8fd1-f927d4d1fda1",
        "monsterKey": "mudflow",
        "slotType": "intersection",
        "x": 6,
        "y": 6,
        "spawnOrder": 1
      },
      {
        "uid": "composition-2-wave-2-2-37051fc4-6cd3-48fb-a70f-6efbaac7f4c6",
        "monsterKey": "mudflow",
        "slotType": "intersection",
        "x": 5,
        "y": 8,
        "spawnOrder": 1
      },
      {
        "uid": "composition-2-wave-2-3-9055d776-fa82-4bbb-a61d-5c85852e464a",
        "monsterKey": "mudflow",
        "slotType": "intersection",
        "x": 7,
        "y": 8,
        "spawnOrder": 1
      },
      {
        "uid": "composition-2-wave-2-4-a9c48171-a549-4550-ace9-90ec9b442421",
        "monsterKey": "hedron",
        "slotType": "intersection",
        "x": 6,
        "y": 2,
        "spawnOrder": 2
      },
      {
        "uid": "composition-2-wave-2-5-4fd4bcf8-2d8d-4b86-9b11-d418190f5be2",
        "monsterKey": "hedron",
        "slotType": "intersection",
        "x": 1,
        "y": 9,
        "spawnOrder": 2
      },
      {
        "uid": "composition-2-wave-2-6-f6427523-3e15-49e5-b610-430ab86b7e6c",
        "monsterKey": "hedron",
        "slotType": "intersection",
        "x": 11,
        "y": 9,
        "spawnOrder": 2
      },
      {
        "uid": "composition-2-wave-2-7-6c58e7c9-a943-45dd-b2e3-657be5e0f24e",
        "monsterKey": "prism",
        "slotType": "intersection",
        "x": 7,
        "y": 6,
        "spawnOrder": 3
      },
      {
        "uid": "composition-2-wave-2-8-cbd4f7ef-8ccc-4405-80cd-6ddbd6ced709",
        "monsterKey": "tidewalker",
        "slotType": "intersection",
        "x": 6,
        "y": 7,
        "spawnOrder": 3
      }
    ],
    [
      {
        "uid": "composition-2-wave-3-1-f1dc218b-557f-4300-bfb5-98629352ca29",
        "monsterKey": "heavyRam",
        "slotType": "intersection",
        "x": 3,
        "y": 6,
        "spawnOrder": 1
      },
      {
        "uid": "composition-2-wave-3-2-0a06daa2-281c-45c7-af8a-864645152c2c",
        "monsterKey": "heavyRam",
        "slotType": "intersection",
        "x": 9,
        "y": 6,
        "spawnOrder": 1
      },
      {
        "uid": "composition-2-wave-3-3-db6e300f-3e57-4f96-b8e7-0ad77fd5290b",
        "monsterKey": "effigy",
        "slotType": "intersection",
        "x": 6,
        "y": 6,
        "spawnOrder": 2
      }
    ],
    [
      {
        "uid": "composition-2-wave-4-3-8aa996ea-c207-4278-b075-524a912d2893",
        "monsterKey": "tidalklast",
        "slotType": "intersection",
        "x": 6,
        "y": 6,
        "spawnOrder": 2
      },
      {
        "uid": "80dc9ac4-62d9-4c15-ad53-1f27d7151efc",
        "monsterKey": "heavyRamAlpha",
        "slotType": "intersection",
        "x": 9,
        "y": 6,
        "spawnOrder": 1
      },
      {
        "uid": "04057a53-d4c3-4537-9630-7f1c4c043a3a",
        "monsterKey": "heavyStingAlpha",
        "slotType": "intersection",
        "x": 3,
        "y": 6,
        "spawnOrder": 1
      }
    ]
  ],
  "3": [
    [
      {
        "uid": "composition-3-wave-1-1-ee3ab2ed-9c0f-4641-bdce-444c3e4fc741",
        "monsterKey": "ram",
        "slotType": "intersection",
        "x": 5,
        "y": 3,
        "spawnOrder": 1
      },
      {
        "uid": "composition-3-wave-1-2-a968c727-d335-4462-add3-d2263b9a4e49",
        "monsterKey": "ram",
        "slotType": "intersection",
        "x": 6,
        "y": 2,
        "spawnOrder": 1
      },
      {
        "uid": "composition-3-wave-1-3-505d9ac9-f875-4b9d-89ff-8f94e4736f0a",
        "monsterKey": "ram",
        "slotType": "intersection",
        "x": 7,
        "y": 3,
        "spawnOrder": 1
      },
      {
        "uid": "composition-3-wave-1-4-438b7e01-72c8-48b9-8741-5ce3e759126e",
        "monsterKey": "falsewings",
        "slotType": "intersection",
        "x": 6,
        "y": 3,
        "spawnOrder": 2
      },
      {
        "uid": "composition-3-wave-1-5-c70fcd78-2dac-4ebf-b2e3-ff5824d31bcd",
        "monsterKey": "falsewings",
        "slotType": "intersection",
        "x": 3,
        "y": 8,
        "spawnOrder": 2
      },
      {
        "uid": "composition-3-wave-1-6-54614c2f-45a2-463c-923c-b3bc32061393",
        "monsterKey": "falsewings",
        "slotType": "intersection",
        "x": 9,
        "y": 8,
        "spawnOrder": 2
      },
      {
        "uid": "composition-3-wave-1-7-06e4ebc2-a2ca-46ec-883e-c6892de7d397",
        "monsterKey": "heavySting",
        "slotType": "intersection",
        "x": 6,
        "y": 6,
        "spawnOrder": 2
      }
    ],
    [
      {
        "uid": "composition-3-wave-2-1-98fcb41e-a7ed-41a4-8fd1-f927d4d1fda1",
        "monsterKey": "mudflow",
        "slotType": "intersection",
        "x": 6,
        "y": 6,
        "spawnOrder": 1
      },
      {
        "uid": "composition-3-wave-2-2-37051fc4-6cd3-48fb-a70f-6efbaac7f4c6",
        "monsterKey": "mudflow",
        "slotType": "intersection",
        "x": 5,
        "y": 8,
        "spawnOrder": 1
      },
      {
        "uid": "composition-3-wave-2-3-9055d776-fa82-4bbb-a61d-5c85852e464a",
        "monsterKey": "mudflow",
        "slotType": "intersection",
        "x": 7,
        "y": 8,
        "spawnOrder": 1
      },
      {
        "uid": "composition-3-wave-2-4-a9c48171-a549-4550-ace9-90ec9b442421",
        "monsterKey": "hedron",
        "slotType": "intersection",
        "x": 6,
        "y": 2,
        "spawnOrder": 2
      },
      {
        "uid": "composition-3-wave-2-5-4fd4bcf8-2d8d-4b86-9b11-d418190f5be2",
        "monsterKey": "hedron",
        "slotType": "intersection",
        "x": 1,
        "y": 9,
        "spawnOrder": 2
      },
      {
        "uid": "composition-3-wave-2-6-f6427523-3e15-49e5-b610-430ab86b7e6c",
        "monsterKey": "hedron",
        "slotType": "intersection",
        "x": 11,
        "y": 9,
        "spawnOrder": 2
      },
      {
        "uid": "composition-3-wave-2-7-6c58e7c9-a943-45dd-b2e3-657be5e0f24e",
        "monsterKey": "prism",
        "slotType": "intersection",
        "x": 7,
        "y": 6,
        "spawnOrder": 3
      },
      {
        "uid": "composition-3-wave-2-8-cbd4f7ef-8ccc-4405-80cd-6ddbd6ced709",
        "monsterKey": "tidewalker",
        "slotType": "intersection",
        "x": 6,
        "y": 7,
        "spawnOrder": 3
      }
    ],
    [
      {
        "uid": "composition-3-wave-3-3-db6e300f-3e57-4f96-b8e7-0ad77fd5290b",
        "monsterKey": "effigy",
        "slotType": "intersection",
        "x": 6,
        "y": 6,
        "spawnOrder": 2
      },
      {
        "uid": "7526f2fd-4215-40b2-add5-c76aa951baa2",
        "monsterKey": "heavyRamAlpha",
        "slotType": "intersection",
        "x": 3,
        "y": 6,
        "spawnOrder": 1
      },
      {
        "uid": "f62ae712-0b07-478c-9272-7c44cf11312a",
        "monsterKey": "heavyRamAlpha",
        "slotType": "intersection",
        "x": 9,
        "y": 6,
        "spawnOrder": 1
      }
    ],
    [
      {
        "uid": "composition-3-wave-4-3-8aa996ea-c207-4278-b075-524a912d2893",
        "monsterKey": "tidalklast",
        "slotType": "intersection",
        "x": 6,
        "y": 6,
        "spawnOrder": 2
      },
      {
        "uid": "538d29ed-297e-4ade-836f-531058148aaa",
        "monsterKey": "heavyRamAlpha",
        "slotType": "intersection",
        "x": 9,
        "y": 6,
        "spawnOrder": 1
      },
      {
        "uid": "e121b844-3c22-4ae7-a1a4-ff6e9ef89fbf",
        "monsterKey": "heavyStingAlpha",
        "slotType": "intersection",
        "x": 3,
        "y": 6,
        "spawnOrder": 1
      }
    ]
  ]
};

  function createDefaultPlacements() {
    const result = {};
    Object.entries(COMPOSITIONS).forEach(([compositionId, composition]) => {
      const sourceWaves = SEEDED_COMPOSITION_PLACEMENTS[compositionId] || [];
      result[compositionId] = composition.waves.map((wave, waveIndex) =>
        (sourceWaves[waveIndex] || []).map(item => ({ ...item }))
      );
    });
    return result;
  }

  const DEFAULT_PLACEMENTS = createDefaultPlacements();

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function sanitizePlacementState(raw) {
    const clean = clone(DEFAULT_PLACEMENTS);
    if (!raw || typeof raw !== 'object') return clean;

    Object.keys(clean).forEach(compositionId => {
      if (!Array.isArray(raw[compositionId])) return;
      clean[compositionId] = clean[compositionId].map((defaultWave, waveIndex) => {
        const sourceWave = raw[compositionId][waveIndex];
        if (!Array.isArray(sourceWave)) return defaultWave;
        const occupied = new Set();
        return sourceWave.map(item => normalizePlacement(item)).filter(item => {
          if (!item) return false;
          const key = placementKey(item);
          if (occupied.has(key)) return false;
          occupied.add(key);
          return true;
        });
      });
    });
    return clean;
  }

  function loadPlacementState() {
    try {
      const loaded = sanitizePlacementState(JSON.parse(localStorage.getItem(PLACEMENT_STORAGE_KEY) || 'null'));
      const appliedRevision = localStorage.getItem(PLACEMENT_SEED_REVISION_KEY);

      // V123: 첨부 JSON에서 구성 1~3의 몬스터 격자 배치만 한 번 적용한다.
      // HP, HP 증가율, 사거리, 몬스터 원본 데이터와 다른 화면 설정은 변경하지 않는다.
      if (appliedRevision !== PLACEMENT_SEED_REVISION) {
        Object.keys(DEFAULT_PLACEMENTS).forEach(compositionId => {
          loaded[compositionId] = clone(DEFAULT_PLACEMENTS[compositionId]);
        });
        localStorage.setItem(PLACEMENT_STORAGE_KEY, JSON.stringify(loaded));
        localStorage.setItem(PLACEMENT_SEED_REVISION_KEY, PLACEMENT_SEED_REVISION);
      }

      return loaded;
    } catch (error) {
      console.warn('몬스터 배치 저장 데이터를 불러오지 못했습니다.', error);
      return clone(DEFAULT_PLACEMENTS);
    }
  }

  let enemyPlacements = loadPlacementState();

  function savePlacementState() {
    try {
      localStorage.setItem(PLACEMENT_STORAGE_KEY, JSON.stringify(enemyPlacements));
    } catch (error) {
      console.warn('몬스터 배치 상태를 저장하지 못했습니다.');
    }
  }

  function currentWave() {
    return COMPOSITIONS[activeComposition].waves[activeWaveIndex];
  }

  function currentPlacements() {
    return enemyPlacements[String(activeComposition)][activeWaveIndex];
  }

  function setCurrentPlacements(value) {
    enemyPlacements[String(activeComposition)][activeWaveIndex] = value;
  }

  function aggregatePlacements(placements) {
    const map = new Map();
    placements.forEach(item => map.set(item.monsterKey, (map.get(item.monsterKey) || 0) + 1));
    return map;
  }

  function compositionPlacements(compositionId) {
    return enemyPlacements[String(compositionId)].flat();
  }

  function compositionTotals(compositionId) {
    return compositionPlacements(compositionId).reduce((totals, placement) => {
      const monster = MONSTERS[placement.monsterKey];
      if (!monster) return totals;
      totals.count += 1;
      totals.hp += monsterHp(monster);
      totals.atk += monster.atk;
      totals.stagger += monster.stagger;
      return totals;
    }, { count: 0, hp: 0, atk: 0, stagger: 0 });
  }

  function renderCompositionTabSummaries() {
    [1, 2, 3].forEach(compositionId => {
      const target = document.querySelector(`[data-composition-total="${compositionId}"]`);
      if (!target) return;
      target.textContent = fmt(Math.round(compositionTotals(compositionId).hp));
    });
  }

  function currentWaveKeys() {
    return new Set(currentPlacements().map(item => item.monsterKey));
  }

  function normalizePlacement(item) {
    if (!item || !MONSTERS[item.monsterKey]) return null;
    const slotType = item.slotType === 'intersection' ? 'intersection' : 'cell';
    if (!Number.isInteger(item.x) || !Number.isInteger(item.y)) return null;
    if (slotType === 'cell') {
      if (item.x < 0 || item.x >= GRID_COLS || item.y < 0 || item.y >= GRID_ROWS) return null;
    } else if (item.x < 1 || item.x >= GRID_COLS || item.y < 1 || item.y >= GRID_ROWS) {
      return null;
    }
    return {
      uid: String(item.uid || uniqueUid()),
      monsterKey: item.monsterKey,
      slotType,
      x: item.x,
      y: item.y,
      spawnOrder: [1, 2, 3].includes(item.spawnOrder) ? item.spawnOrder : null
    };
  }

  function placementKey(item) {
    return `${item.slotType || 'cell'}:${item.x}:${item.y}`;
  }

  function placementCenter(placement) {
    if (placement?.slotType === 'intersection') return { x: placement.x, y: placement.y };
    return { x: placement.x + 0.5, y: placement.y + 0.5 };
  }

  function placementPercent(placement) {
    const center = placementCenter(placement);
    return {
      left: `${(center.x / GRID_COLS) * 100}%`,
      top: `${(center.y / GRID_ROWS) * 100}%`
    };
  }

  function formatPlacementLabel(placement) {
    if (!placement) return '';
    return placement.slotType === 'intersection'
      ? `내부 교차점 (${placement.x}, ${placement.y})`
      : `셀 (${placement.x + 1}, ${placement.y + 1})`;
  }

  function clearOrderSelection() {
    selectedOrderPlacementUids.clear();
  }

  function selectedOrderPlacements() {
    const currentIds = new Set(currentPlacements().map(item => item.uid));
    [...selectedOrderPlacementUids].forEach(uid => {
      if (!currentIds.has(uid)) selectedOrderPlacementUids.delete(uid);
    });
    return currentPlacements().filter(item => selectedOrderPlacementUids.has(item.uid));
  }

  function activeGroupPlacements(anchorUid = activeDraggedPlacementUid) {
    if (!anchorUid || activeDraggedGroupUids.length < 2) return [];
    const activeIds = new Set(activeDraggedGroupUids);
    if (!activeIds.has(anchorUid)) return [];
    return currentPlacements().filter(item => activeIds.has(item.uid));
  }

  function placementWithinGrid(placement, x, y) {
    const slotType = placement.slotType || 'cell';
    if (slotType === 'intersection') {
      return x >= 1 && x < GRID_COLS && y >= 1 && y < GRID_ROWS;
    }
    return x >= 0 && x < GRID_COLS && y >= 0 && y < GRID_ROWS;
  }

  function validateGroupMove(anchorUid, targetX, targetY, targetSlotType) {
    const anchor = currentPlacements().find(item => item.uid === anchorUid);
    const moving = activeGroupPlacements(anchorUid);
    if (!anchor || moving.length < 2) return null;

    const anchorSlotType = anchor.slotType || 'cell';
    // 그룹 이동 중에는 각 몬스터의 셀/교차점 유형을 그대로 보존한다.
    if (targetSlotType !== anchorSlotType) return null;

    const deltaX = targetX - anchor.x;
    const deltaY = targetY - anchor.y;
    const movingIds = new Set(moving.map(item => item.uid));
    const occupied = new Set(
      currentPlacements()
        .filter(item => !movingIds.has(item.uid))
        .map(placementKey)
    );
    const updates = [];

    for (const placement of moving) {
      const nextX = placement.x + deltaX;
      const nextY = placement.y + deltaY;
      if (!placementWithinGrid(placement, nextX, nextY)) return null;
      const key = `${placement.slotType || 'cell'}:${nextX}:${nextY}`;
      if (occupied.has(key)) return null;
      occupied.add(key);
      updates.push({ placement, nextX, nextY });
    }

    return updates;
  }

  function movePlacementGroup(anchorUid, targetX, targetY, targetSlotType) {
    const updates = validateGroupMove(anchorUid, targetX, targetY, targetSlotType);
    if (!updates) return false;
    updates.forEach(({ placement, nextX, nextY }) => {
      placement.x = nextX;
      placement.y = nextY;
    });
    selectedPlacementUid = anchorUid;
    savePlacementState();
    return true;
  }

  function syncGridSelectionVisuals(grid = $('#battle-grid')) {
    if (!grid) return;
    $$('.grid-monster-token', grid).forEach(token => {
      token.classList.toggle('order-selected', selectedOrderPlacementUids.has(token.dataset.placementUid));
    });
    renderSpawnOrderControls();
  }

  function assignSelectedSpawnOrder(order) {
    if (![1, 2, 3].includes(order)) return;
    const selected = selectedOrderPlacements();
    if (!selected.length) return;
    selected.forEach(placement => { placement.spawnOrder = order; });
    savePlacementState();
    renderEnemyWorkspace();
  }

  function renderSpawnOrderControls() {
    const selected = selectedOrderPlacements();
    const count = selected.length;
    const countLabel = $('#spawn-order-selection-count');
    if (countLabel) countLabel.textContent = count ? `${count}마리 선택` : '선택 없음';
    [1, 2, 3].forEach(order => {
      const button = $(`#assign-spawn-order-${order}-btn`);
      if (!button) return;
      button.disabled = count === 0;
      const assignedCount = selected.filter(item => item.spawnOrder === order).length;
      button.classList.toggle('current-order', count > 0 && assignedCount === count);
    });
  }

  function clearIntersectionDropPreview() {
    activeDraggedPlacementUid = null;
    activeDraggedGroupUids = [];
    const grid = $('#battle-grid');
    grid?.classList.remove('dragging-monster', 'dragging-monster-group');
    grid?.querySelectorAll('.grid-monster-token.group-drag-source').forEach(token => token.classList.remove('group-drag-source'));
    const preview = grid?.querySelector('.intersection-drop-preview');
    if (preview) {
      preview.classList.remove('visible', 'unavailable', 'rejected');
      preview.removeAttribute('data-x');
      preview.removeAttribute('data-y');
    }
  }

  function uniqueUid() {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID();
    return `placement-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  let waveOverviewFitFrame = 0;
  let waveOverviewResizeObserver = null;

  function fitWaveOverviewLine(element, maximumSize, minimumSize) {
    if (!element || element.clientWidth <= 0) return;
    let size = maximumSize;
    element.style.setProperty('font-size', `${size}px`, 'important');
    while (size > minimumSize && element.scrollWidth > element.clientWidth + 0.5) {
      size = Math.max(minimumSize, size - 0.5);
      element.style.setProperty('font-size', `${size}px`, 'important');
    }
  }

  function fitWaveOverviewText() {
    $$('.wave-overview-card').forEach(card => {
      fitWaveOverviewLine($('.wave-card-heading strong', card), 20, 13);
      fitWaveOverviewLine($('.wave-card-heading small', card), 11, 8);
      $$('.wave-metric strong', card).forEach(element => fitWaveOverviewLine(element, 20, 12));
      $$('.wave-metric small', card).forEach(element => fitWaveOverviewLine(element, 10, 8));
    });
  }

  function scheduleWaveOverviewTextFit() {
    cancelAnimationFrame(waveOverviewFitFrame);
    waveOverviewFitFrame = requestAnimationFrame(fitWaveOverviewText);
  }

  function observeWaveOverviewSize(target) {
    if (!target || target.dataset.waveTextFitObserved === 'true') return;
    target.dataset.waveTextFitObserved = 'true';
    window.addEventListener('resize', scheduleWaveOverviewTextFit);
    if ('ResizeObserver' in window) {
      waveOverviewResizeObserver ||= new ResizeObserver(scheduleWaveOverviewTextFit);
      waveOverviewResizeObserver.observe(target);
    } else {
      window.addEventListener('resize', scheduleWaveOverviewTextFit);
    }
  }

  function renderWaveTabs() {
    const target = $('#wave-tabs');
    target.innerHTML = COMPOSITIONS[activeComposition].waves.map((wave, index) => {
      const placements = enemyPlacements[String(activeComposition)][index];
      const count = placements.length;
      const waveHp = roundHp(placements.reduce((sum, item) => sum + monsterHp(item.monsterKey), 0));
      return `<button class="wave-tab wave-overview-card ${index === activeWaveIndex ? 'active' : ''}" data-wave-index="${index}" aria-pressed="${index === activeWaveIndex}">
        <div class="wave-card-heading">
          <small>WAVE ${String(index + 1).padStart(2, '0')}</small>
          <strong>웨이브 ${index + 1}</strong>
        </div>
        <div class="wave-card-metrics wave-card-metrics-compact">
          <div class="wave-metric wave-metric-count"><strong>${count}<span class="metric-unit">마리</span></strong><small>몬스터</small></div>
          <div class="wave-metric wave-metric-hp"><strong>${fmtHp(waveHp)}</strong><small>총 HP</small></div>
        </div>
      </button>`;
    }).join('');
    $$('.wave-tab', target).forEach(btn => btn.addEventListener('click', () => {
      activeWaveIndex = Number(btn.dataset.waveIndex);
      selectedPlacementUid = null;
      clearOrderSelection();
      renderEnemyWorkspace();
    }));
    observeWaveOverviewSize(target);
    scheduleWaveOverviewTextFit();
  }

  function paletteMonsters() {
    const currentKeys = currentWaveKeys();
    return Object.entries(MONSTERS).filter(([key, monster]) => {
      let filterOk = true;
      if (monsterFilter === 'current') filterOk = currentKeys.has(key);
      if (monsterFilter === 'common') filterOk = monster.classKey === 'common';
      if (monsterFilter === 'advanced') filterOk = monster.classKey === 'advanced';
      if (monsterFilter === 'elite') filterOk = monster.classKey === 'elite';
      const query = monsterQuery.trim().toLowerCase();
      const queryOk = !query || `${monster.name} ${monster.en} ${monster.id}`.toLowerCase().includes(query);
      return filterOk && queryOk;
    });
  }

  function renderMonsterPalette() {
    const target = $('#monster-palette');
    const currentCounts = aggregatePlacements(currentPlacements());
    const rows = paletteMonsters();
    target.innerHTML = rows.map(([key, monster]) => `
      <article class="palette-monster-card" draggable="true" data-monster-key="${key}" tabindex="0">
        <div class="palette-monster-icon ${monster.classKey}"><img src="${monster.icon}" alt="${monster.name}" draggable="false" loading="lazy"></div>
        <div class="palette-monster-main">
          <div class="palette-monster-name"><strong>${monster.name}</strong><span class="class-pill ${monster.classKey}">${monster.class}</span></div>
          <small>${monster.id}</small>
          <div class="palette-stat-line"><span>HP ${fmtHp(monsterHp(monster))}</span><span>ATK ${fmt(monster.atk)}</span><span>사거리 ${monster.range}m</span></div>
        </div>
        <div class="palette-count">${currentCounts.get(key) || 0}<small>배치</small></div>
      </article>
    `).join('') || '<div class="palette-empty">조건에 맞는 몬스터가 없습니다.</div>';

    $$('.palette-monster-card', target).forEach(card => {
      card.addEventListener('dragstart', event => {
        activeDraggedPlacementUid = null;
        $('#battle-grid')?.classList.add('dragging-monster');
        event.dataTransfer.effectAllowed = 'copy';
        event.dataTransfer.setData('application/x-monster-key', card.dataset.monsterKey);
        event.dataTransfer.setData('text/plain', card.dataset.monsterKey);
        card.classList.add('drag-source');
      });
      card.addEventListener('dragend', () => {
        card.classList.remove('drag-source');
        clearIntersectionDropPreview();
      });
      card.addEventListener('click', () => openMonster(card.dataset.monsterKey));
      card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') openMonster(card.dataset.monsterKey);
      });
    });
  }

  function occupiedAt(x, y, slotType = 'cell', exceptUid = null) {
    return currentPlacements().some(item => item.uid !== exceptUid && (item.slotType || 'cell') === slotType && item.x === x && item.y === y);
  }

  function addPlacement(monsterKey, x, y, slotType = 'cell') {
    if (!MONSTERS[monsterKey] || occupiedAt(x, y, slotType)) return false;
    const placement = normalizePlacement({ uid: uniqueUid(), monsterKey, slotType, x, y });
    if (!placement) return false;
    clearOrderSelection();
    currentPlacements().push(placement);
    selectedPlacementUid = placement.uid;
    savePlacementState();
    return true;
  }

  function movePlacement(uid, x, y, slotType = 'cell') {
    const placement = currentPlacements().find(item => item.uid === uid);
    if (!placement || occupiedAt(x, y, slotType, uid)) return false;
    const nextPlacement = normalizePlacement({ ...placement, slotType, x, y });
    if (!nextPlacement) return false;
    placement.slotType = nextPlacement.slotType;
    placement.x = nextPlacement.x;
    placement.y = nextPlacement.y;
    selectedPlacementUid = uid;
    savePlacementState();
    return true;
  }

  function removePlacement(uid) {
    const next = currentPlacements().filter(item => item.uid !== uid);
    if (next.length === currentPlacements().length) return;
    setCurrentPlacements(next);
    if (selectedPlacementUid === uid) selectedPlacementUid = null;
    selectedOrderPlacementUids.delete(uid);
    savePlacementState();
    renderEnemyWorkspace();
  }

  function rangeCellRadius(monster) {
    return monster.range / METERS_PER_CELL;
  }

  function drawAllRangeCanvas(canvas, grid, placements) {
    if (!canvas || !grid || !placements.length) return;
    const rect = grid.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const sampleScale = Math.min(1, 720 / Math.max(rect.width, rect.height));
    const width = Math.max(1, Math.round(rect.width * sampleScale));
    const height = Math.max(1, Math.round(rect.height * sampleScale));
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const cellW = width / GRID_COLS;
    const cellH = height / GRID_ROWS;
    const unit = Math.min(cellW, cellH);
    const counts = new Uint8Array(width * height);

    placements.forEach(placement => {
      const monster = MONSTERS[placement.monsterKey];
      const radius = rangeCellRadius(monster) * unit;
      const center = placementCenter(placement);
      const cx = center.x * cellW;
      const cy = center.y * cellH;
      const minX = Math.max(0, Math.floor(cx - radius));
      const maxX = Math.min(width - 1, Math.ceil(cx + radius));
      const minY = Math.max(0, Math.floor(cy - radius));
      const maxY = Math.min(height - 1, Math.ceil(cy + radius));
      const r2 = radius * radius;
      for (let y = minY; y <= maxY; y += 1) {
        const dy = y + 0.5 - cy;
        for (let x = minX; x <= maxX; x += 1) {
          const dx = x + 0.5 - cx;
          if (dx * dx + dy * dy <= r2) {
            const idx = y * width + x;
            if (counts[idx] < 255) counts[idx] += 1;
          }
        }
      }
    });

    const ctx = canvas.getContext('2d');
    const image = ctx.createImageData(width, height);
    for (let i = 0; i < counts.length; i += 1) {
      const count = counts[i];
      if (!count) continue;
      const p = i * 4;
      if (count === 1) {
        image.data[p] = 235;
        image.data[p + 1] = 64;
        image.data[p + 2] = 78;
        image.data[p + 3] = 46;
      } else {
        image.data[p] = 103;
        image.data[p + 1] = 72;
        image.data[p + 2] = 196;
        image.data[p + 3] = Math.min(150, 82 + (count - 2) * 18);
      }
    }
    ctx.putImageData(image, 0, 0);

    placements.forEach(placement => {
      const monster = MONSTERS[placement.monsterKey];
      const radius = rangeCellRadius(monster) * unit;
      const center = placementCenter(placement);
      const cx = center.x * cellW;
      const cy = center.y * cellH;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.lineWidth = placement.uid === selectedPlacementUid ? 2.2 : 1.15;
      ctx.strokeStyle = placement.uid === selectedPlacementUid ? 'rgba(176,28,44,.94)' : 'rgba(218,48,62,.58)';
      ctx.stroke();
    });
  }

  function renderBattleGrid() {
    const target = $('#battle-grid');
    const placements = currentPlacements();
    const selectedPlacement = placements.find(item => item.uid === selectedPlacementUid) || null;
    const selectedMonster = selectedPlacement ? MONSTERS[selectedPlacement.monsterKey] : null;
    const rangeRadiusCells = selectedMonster ? rangeCellRadius(selectedMonster) : 0;
    const compactRange = Boolean(!showAllRanges && selectedMonster && rangeRadiusCells * 2 <= 1);

    target.classList.toggle('compact-range', compactRange);
    target.style.setProperty('--grid-cols', GRID_COLS);
    target.style.setProperty('--grid-rows', GRID_ROWS);
    target._battleGridEventController?.abort();
    const gridEventController = new AbortController();
    target._battleGridEventController = gridEventController;
    target.innerHTML = '';

    const intersectionPreview = document.createElement('div');
    intersectionPreview.className = 'intersection-drop-preview';
    intersectionPreview.setAttribute('aria-hidden', 'true');
    target.appendChild(intersectionPreview);

    const selectionMarquee = document.createElement('div');
    selectionMarquee.className = 'grid-selection-marquee';
    selectionMarquee.setAttribute('aria-hidden', 'true');
    target.appendChild(selectionMarquee);

    const hideIntersectionPreview = () => {
      intersectionPreview.classList.remove('visible', 'unavailable', 'rejected');
      intersectionPreview.removeAttribute('data-x');
      intersectionPreview.removeAttribute('data-y');
    };

    const intersectionCandidateFromEvent = event => {
      const rect = target.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      const localX = event.clientX - rect.left;
      const localY = event.clientY - rect.top;
      if (localX < 0 || localY < 0 || localX > rect.width || localY > rect.height) return null;

      const cellW = rect.width / GRID_COLS;
      const cellH = rect.height / GRID_ROWS;
      const activeGroup = activeGroupPlacements();
      const groupAnchor = activeGroup.length
        ? currentPlacements().find(item => item.uid === activeDraggedPlacementUid)
        : null;

      // 셀에 있던 그룹의 기준 몬스터는 그룹 이동 중 교차점으로 바꾸지 않는다.
      if (groupAnchor && (groupAnchor.slotType || 'cell') !== 'intersection') return null;

      let x = Math.round(localX / cellW);
      let y = Math.round(localY / cellH);
      if (groupAnchor) {
        // 교차점 기반 그룹은 격자 어디에서 놓더라도 가장 가까운 내부 교차점으로 스냅한다.
        x = Math.max(1, Math.min(GRID_COLS - 1, x));
        y = Math.max(1, Math.min(GRID_ROWS - 1, y));
      } else if (x < 1 || x >= GRID_COLS || y < 1 || y >= GRID_ROWS) {
        // 단일 마크 및 팔레트 배치는 외곽 테두리 교차점을 계속 제외한다.
        return null;
      }

      const pointX = x * cellW;
      const pointY = y * cellH;
      const distance = Math.hypot(localX - pointX, localY - pointY);
      if (!groupAnchor) {
        const snapRadius = Math.min(cellW, cellH) * 0.34;
        if (distance > snapRadius) return null;
      }

      return {
        x,
        y,
        left: (x / GRID_COLS) * 100,
        top: (y / GRID_ROWS) * 100,
        available: activeGroup.length
          ? Boolean(validateGroupMove(activeDraggedPlacementUid, x, y, 'intersection'))
          : !occupiedAt(x, y, 'intersection', activeDraggedPlacementUid)
      };
    };

    // 교차점의 작은 DOM 표적을 직접 맞힐 필요 없이, 격자 전체에서 가장 가까운
    // 내부 교차점을 계산해 스냅 미리보기를 표시한다.
    target.addEventListener('dragover', event => {
      const candidate = intersectionCandidateFromEvent(event);
      if (!candidate) {
        hideIntersectionPreview();
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      event.dataTransfer.dropEffect = event.dataTransfer.types.includes('application/x-placement-id') ? 'move' : 'copy';
      target.querySelectorAll('.battle-cell.drop-target').forEach(cell => cell.classList.remove('drop-target'));

      intersectionPreview.style.left = `${candidate.left}%`;
      intersectionPreview.style.top = `${candidate.top}%`;
      intersectionPreview.dataset.x = String(candidate.x);
      intersectionPreview.dataset.y = String(candidate.y);
      intersectionPreview.classList.add('visible');
      intersectionPreview.classList.toggle('unavailable', !candidate.available);
      intersectionPreview.classList.remove('rejected');
    }, { capture: true, signal: gridEventController.signal });

    target.addEventListener('drop', event => {
      const candidate = intersectionCandidateFromEvent(event);
      if (!candidate) return;

      event.preventDefault();
      event.stopPropagation();
      const placementUid = event.dataTransfer.getData('application/x-placement-id') || activeDraggedPlacementUid;
      const monsterKey = event.dataTransfer.getData('application/x-monster-key') || event.dataTransfer.getData('text/plain');
      const group = activeGroupPlacements(placementUid);
      const changed = candidate.available && (placementUid
        ? (group.length > 1
          ? movePlacementGroup(placementUid, candidate.x, candidate.y, 'intersection')
          : movePlacement(placementUid, candidate.x, candidate.y, 'intersection'))
        : addPlacement(monsterKey, candidate.x, candidate.y, 'intersection'));

      if (!changed) {
        intersectionPreview.classList.add('visible', 'unavailable', 'rejected');
        setTimeout(hideIntersectionPreview, 360);
        return;
      }

      clearIntersectionDropPreview();
      renderEnemyWorkspace();
    }, { capture: true, signal: gridEventController.signal });

    target.addEventListener('dragleave', event => {
      const rect = target.getBoundingClientRect();
      if (event.clientX <= rect.left || event.clientX >= rect.right || event.clientY <= rect.top || event.clientY >= rect.bottom) {
        hideIntersectionPreview();
      }
    }, { capture: true, signal: gridEventController.signal });

    const bindCellDropZone = (node, x, y) => {
      node.addEventListener('dragover', event => {
        event.preventDefault();
        event.dataTransfer.dropEffect = event.dataTransfer.types.includes('application/x-placement-id') ? 'move' : 'copy';
        node.classList.add('drop-target');
      });
      node.addEventListener('dragleave', () => node.classList.remove('drop-target'));
      node.addEventListener('drop', event => {
        event.preventDefault();
        node.classList.remove('drop-target');
        hideIntersectionPreview();
        const placementUid = event.dataTransfer.getData('application/x-placement-id') || activeDraggedPlacementUid;
        const monsterKey = event.dataTransfer.getData('application/x-monster-key') || event.dataTransfer.getData('text/plain');
        const group = activeGroupPlacements(placementUid);
        const changed = placementUid
          ? (group.length > 1
            ? movePlacementGroup(placementUid, x, y, 'cell')
            : movePlacement(placementUid, x, y, 'cell'))
          : addPlacement(monsterKey, x, y, 'cell');
        if (!changed) {
          node.classList.add('drop-rejected');
          setTimeout(() => node.classList.remove('drop-rejected'), 320);
        }
        clearIntersectionDropPreview();
        renderEnemyWorkspace();
      });
    };

    for (let y = 0; y < GRID_ROWS; y += 1) {
      for (let x = 0; x < GRID_COLS; x += 1) {
        const cell = document.createElement('div');
        cell.className = 'battle-cell';
        cell.dataset.x = x;
        cell.dataset.y = y;
        cell.dataset.slotType = 'cell';
        cell.setAttribute('role', 'gridcell');

        if (selectedPlacement && (selectedPlacement.slotType || 'cell') === 'cell' && x === selectedPlacement.x && y === selectedPlacement.y) {
          cell.classList.add('range-origin');
        }

        bindCellDropZone(cell, x, y);
        target.appendChild(cell);
      }
    }

    // 스타크래프트식 드래그 박스 선택. 격자 빈 곳에서 클릭 후 드래그하면
    // 사각형 안에 들어온 몬스터 마크들이 한 번에 선택된다.
    let marqueeState = null;
    const gridPointFromPointer = event => {
      const rect = target.getBoundingClientRect();
      return {
        rect,
        x: Math.max(0, Math.min(rect.width, event.clientX - rect.left)),
        y: Math.max(0, Math.min(rect.height, event.clientY - rect.top))
      };
    };

    target.onpointerdown = event => {
      if (event.button !== 0 || event.target.closest('.grid-monster-token')) return;
      const point = gridPointFromPointer(event);
      marqueeState = {
        pointerId: event.pointerId,
        startX: point.x,
        startY: point.y,
        baseSelection: event.shiftKey ? new Set(selectedOrderPlacementUids) : new Set(),
        shiftKey: event.shiftKey,
        moved: false
      };
      target.setPointerCapture?.(event.pointerId);
      target.classList.add('marquee-selecting');
      selectionMarquee.style.left = `${point.x}px`;
      selectionMarquee.style.top = `${point.y}px`;
      selectionMarquee.style.width = '0px';
      selectionMarquee.style.height = '0px';
      selectionMarquee.classList.add('visible');
      event.preventDefault();
    };

    target.onpointermove = event => {
      if (!marqueeState || event.pointerId !== marqueeState.pointerId) return;
      const point = gridPointFromPointer(event);
      const left = Math.min(marqueeState.startX, point.x);
      const top = Math.min(marqueeState.startY, point.y);
      const width = Math.abs(point.x - marqueeState.startX);
      const height = Math.abs(point.y - marqueeState.startY);
      if (width > 4 || height > 4) marqueeState.moved = true;

      selectionMarquee.style.left = `${left}px`;
      selectionMarquee.style.top = `${top}px`;
      selectionMarquee.style.width = `${width}px`;
      selectionMarquee.style.height = `${height}px`;

      if (!marqueeState.moved) return;
      const nextSelection = new Set(marqueeState.baseSelection);
      const rect = point.rect;
      placements.forEach(placement => {
        const center = placementCenter(placement);
        const centerX = (center.x / GRID_COLS) * rect.width;
        const centerY = (center.y / GRID_ROWS) * rect.height;
        if (centerX >= left && centerX <= left + width && centerY >= top && centerY <= top + height) {
          nextSelection.add(placement.uid);
        }
      });
      selectedOrderPlacementUids.clear();
      nextSelection.forEach(uid => selectedOrderPlacementUids.add(uid));
      syncGridSelectionVisuals(target);
    };

    const finishMarquee = event => {
      if (!marqueeState || event.pointerId !== marqueeState.pointerId) return;
      const wasMoved = marqueeState.moved;
      const wasShift = marqueeState.shiftKey;
      marqueeState = null;
      selectionMarquee.classList.remove('visible');
      target.classList.remove('marquee-selecting');
      target.releasePointerCapture?.(event.pointerId);

      if (!wasMoved && !wasShift) {
        clearOrderSelection();
        selectedPlacementUid = null;
        syncGridSelectionVisuals(target);
      } else if (selectedOrderPlacementUids.size) {
        if (!selectedPlacementUid || !selectedOrderPlacementUids.has(selectedPlacementUid)) {
          selectedPlacementUid = selectedOrderPlacements()[0]?.uid || null;
        }
      }
      renderPlacementInspector();
      renderSpawnOrderControls();
    };
    target.onpointerup = finishMarquee;
    target.onpointercancel = finishMarquee;

    if (showAllRanges && placements.length) {
      const canvas = document.createElement('canvas');
      canvas.className = 'all-ranges-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      target.appendChild(canvas);
      requestAnimationFrame(() => drawAllRangeCanvas(canvas, target, placements));
    } else if (selectedPlacement && selectedMonster) {
      const center = placementCenter(selectedPlacement);
      const overlay = document.createElement('div');
      overlay.className = 'attack-range-overlay';
      overlay.dataset.rangeLabel = `${selectedMonster.range}m`;
      overlay.style.left = `${(center.x / GRID_COLS) * 100}%`;
      overlay.style.top = `${(center.y / GRID_ROWS) * 100}%`;
      overlay.style.width = `${(rangeRadiusCells * 2 / GRID_COLS) * 100}%`;
      overlay.style.height = `${(rangeRadiusCells * 2 / GRID_ROWS) * 100}%`;
      target.appendChild(overlay);
    }

    placements.forEach(placement => {
      const monster = MONSTERS[placement.monsterKey];
      const token = document.createElement('button');
      token.type = 'button';
      const isSelected = placement.uid === selectedPlacementUid;
      const isOrderSelected = selectedOrderPlacementUids.has(placement.uid);
      const compactSelectedRange = false;
      const pos = placementPercent(placement);
      token.className = `grid-monster-token ${monster.classKey} ${isSelected ? 'selected' : ''} ${isOrderSelected ? 'order-selected' : ''} ${placement.spawnOrder ? `spawn-order-${placement.spawnOrder}` : ''} ${compactSelectedRange ? 'range-inside-cell' : ''}`;
      token.draggable = true;
      token.dataset.placementUid = placement.uid;
      token.dataset.slotType = placement.slotType || 'cell';
      token.style.left = pos.left;
      token.style.top = pos.top;
      token.title = `${monster.name} · ${formatPlacementLabel(placement)} · 공격 사거리 ${monster.range}m`;
      token.innerHTML = `${placement.spawnOrder ? `<span class="grid-order-badge order-${placement.spawnOrder}">${placement.spawnOrder}차</span>` : ''}<img class="grid-monster-image" src="${monster.icon}" alt="${monster.name}" draggable="false"><span class="grid-range-label">${monster.range}m</span>`;
      token.addEventListener('click', event => {
        event.stopPropagation();
        selectedPlacementUid = placement.uid;
        if (event.shiftKey) {
          if (selectedOrderPlacementUids.has(placement.uid)) selectedOrderPlacementUids.delete(placement.uid);
          else selectedOrderPlacementUids.add(placement.uid);
        } else {
          clearOrderSelection();
        }
        renderBattleGrid();
        renderPlacementInspector();
        renderSpawnOrderControls();
      });
      token.addEventListener('dblclick', event => {
        event.stopPropagation();
        removePlacement(placement.uid);
      });
      token.addEventListener('dragstart', event => {
        event.stopPropagation();
        selectedPlacementUid = placement.uid;
        activeDraggedPlacementUid = placement.uid;

        if (!selectedOrderPlacementUids.has(placement.uid)) {
          clearOrderSelection();
          syncGridSelectionVisuals(target);
        }
        const selectedGroup = selectedOrderPlacementUids.has(placement.uid)
          ? selectedOrderPlacements()
          : [];
        activeDraggedGroupUids = selectedGroup.length > 1
          ? selectedGroup.map(item => item.uid)
          : [];

        target.classList.add('dragging-monster');
        if (activeDraggedGroupUids.length > 1) {
          target.classList.add('dragging-monster-group');
          activeDraggedGroupUids.forEach(uid => {
            target.querySelector(`.grid-monster-token[data-placement-uid="${uid}"]`)?.classList.add('group-drag-source');
          });
          event.dataTransfer.setData('application/x-placement-group', String(activeDraggedGroupUids.length));
        }
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('application/x-placement-id', placement.uid);
        event.dataTransfer.setData('application/x-monster-key', placement.monsterKey);
        token.classList.add('drag-source');
      });
      token.addEventListener('dragend', () => {
        token.classList.remove('drag-source');
        hideIntersectionPreview();
        clearIntersectionDropPreview();
      });
      target.appendChild(token);
    });
  }

  function renderPlacementInspector() {
    const target = $('#placement-inspector');
    const placement = currentPlacements().find(item => item.uid === selectedPlacementUid);
    if (!placement) {
      target.innerHTML = '<div class="inspector-empty"><strong>배치된 몬스터를 선택하세요</strong><span>선택하면 기본 스탯과 공격 사거리 범위를 확인할 수 있습니다.</span></div>';
      return;
    }
    const monster = MONSTERS[placement.monsterKey];
    const radiusCells = rangeCellRadius(monster);
    target.innerHTML = `
      <div class="inspector-icon ${monster.classKey}"><img src="${monster.icon}" alt="${monster.name}" draggable="false"></div>
      <div class="inspector-identity"><small>${monster.class} · ${monster.id}</small><strong>${monster.name}</strong><span>${formatPlacementLabel(placement)}${placement.spawnOrder ? ` · ${placement.spawnOrder}차 등장` : ' · 등장 차수 미지정'}</span></div>
      <div class="inspector-stat"><small>HP</small><strong>${fmtHp(monsterHp(monster))}</strong></div>
      <div class="inspector-stat"><small>ATK</small><strong>${fmt(monster.atk)}</strong></div>
      <div class="inspector-stat"><small>강인도</small><strong>${fmt(monster.stagger)}</strong></div>
      <div class="inspector-stat range"><small>공격 사거리</small><strong>${monster.range}m</strong><span>반경 ${radiusCells.toFixed(2)}칸</span></div>
      <button class="inspect-detail-btn" type="button">상세 스탯</button>
      <button class="inspect-remove-btn" type="button">배치 삭제</button>
    `;
    $('.inspect-detail-btn', target).addEventListener('click', () => openMonster(placement.monsterKey));
    $('.inspect-remove-btn', target).addEventListener('click', () => removePlacement(placement.uid));
  }

  function renderCurrentWaveRoster() {
    const placements = currentPlacements();
    const counts = aggregatePlacements(placements);
    $('#wave-total-label').textContent = `웨이브 ${activeWaveIndex + 1} · ${placements.length}마리`;
    const target = $('#wave-list');
    if (!placements.length) {
      target.innerHTML = '<div class="delta-none">현재 웨이브에 배치된 몬스터가 없습니다.<br>왼쪽 데이터베이스에서 몬스터를 끌어오세요.</div>';
      return;
    }
    target.innerHTML = `<article class="wave-row roster-row">
      <div class="wave-number"><small>WAVE ${activeWaveIndex + 1}</small><strong>웨이브 ${activeWaveIndex + 1}</strong></div>
      <div class="wave-enemies">${[...counts.entries()].map(([key, count]) => {
        const monster = MONSTERS[key];
        return `<button class="enemy-token" data-monster="${key}"><span class="mini-avatar"><img src="${monster.icon}" alt="" draggable="false" loading="lazy"></span><b>${monster.name}</b><em>×${count}</em></button>`;
      }).join('')}</div>
      <div class="wave-count">${placements.length}<small>ENEMIES</small></div>
    </article>`;
    $$('.enemy-token', target).forEach(btn => btn.addEventListener('click', () => openMonster(btn.dataset.monster)));
  }

  function resistanceText(monster) {
    const labels = { physical:'물리', heat:'열기', electric:'전기', cryo:'냉기', nature:'자연', ether:'에테르' };
    const reduced = Object.entries(monster.resist).filter(([, value]) => value < 1);
    if (!reduced.length) return '<span>전 속성 1.0×</span>';
    return reduced.map(([key, value]) => `<span class="strong">${labels[key]} ${value.toFixed(1)}×</span>`).join('');
  }

  function renderMonsterTable() {
    const body = $('#monster-table-body');
    if (!body) return;
    const currentKeys = currentWaveKeys();
    const rows = paletteMonsters();
    body.innerHTML = rows.map(([key, monster]) => `
      <tr data-monster="${key}">
        <td><div class="monster-name-cell"><span class="monster-avatar">${monster.accent}</span><div><b>${monster.name}${currentKeys.has(key) ? ' · 현재 웨이브' : ''}</b><small>${monster.en} · ${monster.id}</small></div></div></td>
        <td><span class="class-pill ${monster.classKey}">${monster.class}</span></td>
        <td class="stat-number">${fmtHp(monsterHp(monster))}</td><td class="stat-number">${fmt(monster.atk)}</td><td class="stat-number">${fmt(monster.def)}</td><td class="stat-number">${fmt(monster.stagger)}</td><td>${monster.range}m</td>
        <td><div class="resist-mini">${resistanceText(monster)}</div><small>${monster.feature}</small></td>
      </tr>
    `).join('') || '<tr><td colspan="8" style="text-align:center;padding:40px;color:#7f8996">조건에 맞는 몬스터가 없습니다.</td></tr>';
    $$('tr[data-monster]', body).forEach(row => row.addEventListener('click', () => openMonster(row.dataset.monster)));
  }


  function renderEnemyWorkspace() {
    renderCompositionTabSummaries();
    renderWaveTabs();
    renderMonsterPalette();
    renderBattleGrid();
    renderPlacementInspector();
    renderCurrentWaveRoster();
    renderMonsterTable();
    renderSpawnOrderControls();
    $('#placement-title').textContent = `구성 ${activeComposition} · 웨이브 ${activeWaveIndex + 1} 배치 격자`;
    const rangeToggle = $('#range-toggle-btn');
    if (rangeToggle) {
      rangeToggle.classList.toggle('active', showAllRanges);
      rangeToggle.setAttribute('aria-pressed', showAllRanges ? 'true' : 'false');
      const label = $('b', rangeToggle);
      if (label) label.textContent = showAllRanges ? '전체 범위 숨기기' : '전체 범위 표시';
    }
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1200);
  }

  function exportPlacementJson() {
    const compositionId = String(activeComposition);
    const waves = enemyPlacements[compositionId].map((placements, waveIndex) => ({
      wave: waveIndex + 1,
      monsters: placements.map(placement => {
        const monster = MONSTERS[placement.monsterKey];
        return {
          uid: placement.uid,
          monsterKey: placement.monsterKey,
          monsterId: monster?.id || null,
          name: monster?.name || placement.monsterKey,
          slotType: placement.slotType || 'cell',
          x: placement.x,
          y: placement.y,
          spawnOrder: placement.spawnOrder || null,
          baseHp: monster?.hp ?? null,
          hpBuffPercent,
          hp: monster ? monsterHp(monster) : null,
          rangeMeters: monster?.range ?? null
        };
      })
    }));

    const payload = {
      schemaVersion: 1,
      exportedAt: new Date().toISOString(),
      composition: activeComposition,
      hpBuffPercent,
      hpMultiplier: hpMultiplier(),
      grid: {
        columns: GRID_COLS,
        rows: GRID_ROWS,
        metersPerCell: METERS_PER_CELL,
        intersectionPolicy: 'internal-only'
      },
      waves
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
    downloadBlob(blob, `endfield-composition-${activeComposition}-placements.json`);
  }

  function openImageExportModal() {
    const modal = $('#image-export-modal');
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    $('#export-grid-with-range-btn')?.focus();
  }

  function closeImageExportModal() {
    const modal = $('#image-export-modal');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  function roundedRectPath(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
  }

  function loadCanvasImage(src) {
    return new Promise(resolve => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => resolve(null);
      image.src = window.MONSTER_EXPORT_IMAGES?.[src] || src;
    });
  }

  function drawContainedImage(ctx, image, x, y, width, height) {
    if (!image?.naturalWidth || !image?.naturalHeight) return;
    const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    ctx.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
  }

  function drawExportRangeCoverage(ctx, size, placements) {
    if (!placements.length) return;
    const counts = new Uint8Array(size * size);
    const cellSize = size / GRID_COLS;

    placements.forEach(placement => {
      const monster = MONSTERS[placement.monsterKey];
      if (!monster) return;
      const center = placementCenter(placement);
      const cx = center.x * cellSize;
      const cy = center.y * cellSize;
      const radius = rangeCellRadius(monster) * cellSize;
      const minX = Math.max(0, Math.floor(cx - radius));
      const maxX = Math.min(size - 1, Math.ceil(cx + radius));
      const minY = Math.max(0, Math.floor(cy - radius));
      const maxY = Math.min(size - 1, Math.ceil(cy + radius));
      const radiusSquared = radius * radius;
      for (let y = minY; y <= maxY; y += 1) {
        const dy = y + 0.5 - cy;
        for (let x = minX; x <= maxX; x += 1) {
          const dx = x + 0.5 - cx;
          if (dx * dx + dy * dy <= radiusSquared) {
            const index = y * size + x;
            if (counts[index] < 255) counts[index] += 1;
          }
        }
      }
    });

    const layer = document.createElement('canvas');
    layer.width = size;
    layer.height = size;
    const layerCtx = layer.getContext('2d');
    const image = layerCtx.createImageData(size, size);
    for (let index = 0; index < counts.length; index += 1) {
      const count = counts[index];
      if (!count) continue;
      const pixel = index * 4;
      if (count === 1) {
        image.data[pixel] = 235;
        image.data[pixel + 1] = 64;
        image.data[pixel + 2] = 78;
        image.data[pixel + 3] = 46;
      } else {
        // 사이트의 전체 범위 표시와 동일하게 중첩 영역을 보라색으로 합성한다.
        image.data[pixel] = 103;
        image.data[pixel + 1] = 72;
        image.data[pixel + 2] = 196;
        image.data[pixel + 3] = Math.min(150, 82 + (count - 2) * 18);
      }
    }
    layerCtx.putImageData(image, 0, 0);
    ctx.drawImage(layer, 0, 0);

    placements.forEach(placement => {
      const monster = MONSTERS[placement.monsterKey];
      if (!monster) return;
      const center = placementCenter(placement);
      const cx = center.x * cellSize;
      const cy = center.y * cellSize;
      const radius = rangeCellRadius(monster) * cellSize;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(218,48,62,0.78)';
      ctx.stroke();
    });
  }

  async function exportGridPng(includeRanges) {
    closeImageExportModal();
    const placements = currentPlacements();
    const size = 1440;
    const cellSize = size / GRID_COLS;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#f7f9fb';
    ctx.fillRect(0, 0, size, size);

    if (includeRanges) {
      drawExportRangeCoverage(ctx, size, placements);
    }

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#c8d0d9';
    for (let index = 1; index < GRID_COLS; index += 1) {
      const position = index * cellSize;
      ctx.beginPath();
      ctx.moveTo(position, 0);
      ctx.lineTo(position, size);
      ctx.stroke();
    }
    for (let index = 1; index < GRID_ROWS; index += 1) {
      const position = index * cellSize;
      ctx.beginPath();
      ctx.moveTo(0, position);
      ctx.lineTo(size, position);
      ctx.stroke();
    }
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#8d98a5';
    ctx.strokeRect(1.5, 1.5, size - 3, size - 3);

    const imageEntries = await Promise.all(placements.map(async placement => ({
      placement,
      image: await loadCanvasImage(MONSTERS[placement.monsterKey]?.icon || '')
    })));

    imageEntries.forEach(({ placement, image }) => {
      const monster = MONSTERS[placement.monsterKey];
      if (!monster) return;
      const center = placementCenter(placement);
      const cx = center.x * cellSize;
      const cy = center.y * cellSize;
      const tokenSize = cellSize * 0.72;
      const x = cx - tokenSize / 2;
      const y = cy - tokenSize / 2;
      const borderColor = monster.classKey === 'elite' ? '#c42f3d' : monster.classKey === 'advanced' ? '#aa791d' : '#3e7dae';

      ctx.save();
      ctx.shadowColor = 'rgba(35,44,55,0.24)';
      ctx.shadowBlur = 14;
      ctx.shadowOffsetY = 5;
      roundedRectPath(ctx, x, y, tokenSize, tokenSize, 13);
      ctx.fillStyle = '#101722';
      ctx.fill();
      ctx.restore();

      ctx.save();
      roundedRectPath(ctx, x, y, tokenSize, tokenSize, 13);
      ctx.clip();
      ctx.fillStyle = '#101722';
      ctx.fillRect(x, y, tokenSize, tokenSize);
      drawContainedImage(ctx, image, x, y, tokenSize, tokenSize);
      const gradient = ctx.createLinearGradient(0, y + tokenSize * 0.42, 0, y + tokenSize);
      gradient.addColorStop(0, 'rgba(0,0,0,0)');
      gradient.addColorStop(1, 'rgba(0,0,0,0.82)');
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y + tokenSize * 0.42, tokenSize, tokenSize * 0.58);
      ctx.restore();

      roundedRectPath(ctx, x, y, tokenSize, tokenSize, 13);
      ctx.lineWidth = 4;
      ctx.strokeStyle = borderColor;
      ctx.stroke();

      ctx.font = '900 22px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const rangeText = `${monster.range}m`;
      const textWidth = ctx.measureText(rangeText).width;
      roundedRectPath(ctx, cx - textWidth / 2 - 9, y + tokenSize - 29, textWidth + 18, 24, 7);
      ctx.fillStyle = 'rgba(0,0,0,0.72)';
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillText(rangeText, cx, y + tokenSize - 17);

      if (placement.spawnOrder) {
        const badgeText = `${placement.spawnOrder}차`;
        ctx.font = '900 22px sans-serif';
        const badgeWidth = Math.max(52, ctx.measureText(badgeText).width + 20);
        const badgeX = cx - badgeWidth / 2;
        const badgeY = y - 13;
        roundedRectPath(ctx, badgeX, badgeY, badgeWidth, 31, 16);
        ctx.fillStyle = placement.spawnOrder === 1 ? '#c84450' : placement.spawnOrder === 2 ? '#536fc4' : '#8a58b7';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255,255,255,0.92)';
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.fillText(badgeText, cx, badgeY + 16);
      }
    });

    try {
      canvas.toBlob(blob => {
        if (!blob) {
          alert('이미지를 생성하지 못했습니다. 페이지를 새로고침한 뒤 다시 시도해 주세요.');
          return;
        }
        const rangeSuffix = includeRanges ? 'with-ranges' : 'without-ranges';
        downloadBlob(blob, `endfield-composition-${activeComposition}-wave-${activeWaveIndex + 1}-${rangeSuffix}.png`);
      }, 'image/png');
    } catch (error) {
      console.error('격자 이미지 내보내기 실패', error);
      alert('이미지를 생성하지 못했습니다. 페이지를 새로고침한 뒤 다시 시도해 주세요.');
    }
  }

  function openMonster(key) {
    const monster = MONSTERS[key];
    if (!monster) return;
    const labels = { physical:'물리', heat:'열기', electric:'전기', cryo:'냉기', nature:'자연', ether:'에테르' };
    const modal = $('#monster-modal');
    $('#monster-modal-content').innerHTML = `
      <div class="monster-detail-hero">
        <div class="monster-detail-avatar"><img src="${monster.icon}" alt="${monster.name}" draggable="false"></div>
        <div><small>Lv.60 기본 템플릿 · ${monster.class}</small><h2>${monster.name}</h2><p>${monster.en} · ${monster.id}<br>${monster.feature}</p></div>
      </div>
      <div class="monster-detail-body">
        <div class="stat-grid">
          <div class="stat-box"><small>HP</small><strong>${fmtHp(monsterHp(monster))}</strong></div>
          <div class="stat-box"><small>ATK</small><strong>${fmt(monster.atk)}</strong></div>
          <div class="stat-box"><small>DEF</small><strong>${fmt(monster.def)}</strong></div>
          <div class="stat-box"><small>강인도</small><strong>${fmt(monster.stagger)}</strong></div>
          <div class="stat-box"><small>강인도 회복</small><strong>${monster.staggerRecovery}초</strong></div>
          <div class="stat-box"><small>공격 사거리</small><strong>${monster.range}m</strong></div>
          <div class="stat-box"><small>격자 환산</small><strong>${rangeCellRadius(monster).toFixed(2)}칸 반경</strong></div>
          <div class="stat-box"><small>중량</small><strong>${monster.weight}</strong></div>
        </div>
        <h4 style="margin:22px 0 10px;color:#8b95a2;font-size:11px;letter-spacing:.13em">DAMAGE TAKEN MULTIPLIER</h4>
        <div class="resist-grid">${Object.entries(monster.resist).map(([key, value]) => `<div class="resist-box ${value < 1 ? 'reduced' : ''}"><small>${labels[key]}</small><strong>${value.toFixed(1)}×</strong></div>`).join('')}</div>
        <p style="margin-top:18px;color:#7f8996;font-size:12px;line-height:1.7">격자의 공격 범위는 1칸을 ${METERS_PER_CELL}m로 환산한 연속형 원으로 표시합니다. 2.1m, 2.8m, 3.2m처럼 소수점이 다른 사거리도 실제 비율대로 서로 다른 크기로 보입니다.</p>
      </div>
    `;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeMonster() {
    const modal = $('#monster-modal');
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  $$('.composition-tab').forEach(btn => btn.addEventListener('click', () => {
    activeComposition = Number(btn.dataset.composition);
    activeWaveIndex = 0;
    selectedPlacementUid = null;
    clearOrderSelection();
    $$('.composition-tab').forEach(item => {
      const selected = item === btn;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-selected', selected ? 'true' : 'false');
    });
    renderEnemyWorkspace();
  }));

  $('#monster-search')?.addEventListener('input', event => {
    monsterQuery = event.target.value;
    renderMonsterPalette();
    renderMonsterTable();
  });

  $$('#monster-filters .filter-chip').forEach(btn => btn.addEventListener('click', () => {
    monsterFilter = btn.dataset.monsterFilter;
    $$('#monster-filters .filter-chip').forEach(item => item.classList.toggle('active', item === btn));
    renderMonsterPalette();
    renderMonsterTable();
  }));


  $('#range-toggle-btn')?.addEventListener('click', () => {
    showAllRanges = !showAllRanges;
    renderEnemyWorkspace();
  });

  $('#reset-wave-btn')?.addEventListener('click', () => {
    setCurrentPlacements(clone(DEFAULT_PLACEMENTS[String(activeComposition)][activeWaveIndex]));
    selectedPlacementUid = null;
    clearOrderSelection();
    savePlacementState();
    renderEnemyWorkspace();
  });

  $('#reset-composition-btn')?.addEventListener('click', () => {
    enemyPlacements[String(activeComposition)] = clone(DEFAULT_PLACEMENTS[String(activeComposition)]);
    selectedPlacementUid = null;
    clearOrderSelection();
    savePlacementState();
    renderEnemyWorkspace();
  });

  $('#assign-spawn-order-1-btn')?.addEventListener('click', () => assignSelectedSpawnOrder(1));
  $('#assign-spawn-order-2-btn')?.addEventListener('click', () => assignSelectedSpawnOrder(2));
  $('#assign-spawn-order-3-btn')?.addEventListener('click', () => assignSelectedSpawnOrder(3));

  $('#export-placement-json-btn')?.addEventListener('click', exportPlacementJson);
  $('#export-grid-image-btn')?.addEventListener('click', openImageExportModal);
  $('#export-grid-with-range-btn')?.addEventListener('click', () => exportGridPng(true));
  $('#export-grid-without-range-btn')?.addEventListener('click', () => exportGridPng(false));
  $('#cancel-grid-export-btn')?.addEventListener('click', closeImageExportModal);
  $('.export-choice-backdrop')?.addEventListener('click', closeImageExportModal);

  $('.modal-backdrop')?.addEventListener('click', closeMonster);
  $('.modal-close')?.addEventListener('click', closeMonster);
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') { closeMonster(); closeImageExportModal(); }
    if ((event.key === 'Delete' || event.key === 'Backspace') && activeView === 'enemy-view' && selectedPlacementUid && !event.target.matches('input, textarea')) {
      removePlacement(selectedPlacementUid);
    }
  });

  let rangeResizeTimer = null;
  window.addEventListener('resize', () => {
    if (!showAllRanges || activeView !== 'enemy-view') return;
    clearTimeout(rangeResizeTimer);
    rangeResizeTimer = setTimeout(renderBattleGrid, 100);
  });

  /* 시뮬레이터 업데이트는 정보 페이지 상태를 다시 렌더링하지 않는다. */
  const originalUpdateAll = updateAll;
  updateAll = function() {
    originalUpdateAll();
    syncTopbar();
  };

  syncTopbar();
  renderCatalog();
  renderEnemyWorkspace();
})();
