(function () {
  'use strict';

  const GAME_TERMS = window.GAME_TERMS || { terms: [], keywords: [] };
  const TERMS = GAME_TERMS.terms || [];
  const TERM_BY_ID = new Map(TERMS.map((term) => [term.id, term]));
  const KEYWORD_BY_TEXT = new Map((GAME_TERMS.keywords || []).map((keyword) => [keyword.text, keyword]));
  const KEYWORDS = [...KEYWORD_BY_TEXT.values()].sort((left, right) => right.text.length - left.text.length);
  const KEYWORD_PATTERN = KEYWORDS.length
    ? new RegExp(KEYWORDS.map((keyword) => keyword.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g')
    : null;

  function esc(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function normalizeSearchText(value) {
    return String(value ?? '')
      .normalize('NFKC')
      .toLocaleLowerCase('ko-KR')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function keywordButton(keyword, label) {
    return `<button type="button" class="term-link" data-game-keyword="${esc(keyword.text)}" data-game-term="${esc(keyword.termId)}" data-color="${esc(keyword.color || 'cyan')}">${esc(label)}</button>`;
  }

  function rich(text) {
    if (!KEYWORD_PATTERN || !text) return esc(text);

    const normalized = String(text).replace(/\[([^\[\]]+)\]/g, (match, inner) => {
      const clean = inner.trim();
      return KEYWORD_BY_TEXT.has(clean) ? clean : match;
    });

    let output = '';
    let cursor = 0;
    KEYWORD_PATTERN.lastIndex = 0;
    for (const match of normalized.matchAll(KEYWORD_PATTERN)) {
      const keyword = KEYWORD_BY_TEXT.get(match[0]);
      if (!keyword) continue;
      output += esc(normalized.slice(cursor, match.index));
      output += keywordButton(keyword, match[0]);
      cursor = match.index + match[0].length;
    }
    output += esc(normalized.slice(cursor));
    return output;
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
              <a href="glossary.html" class="active" aria-current="page">용어 사전</a>
              <a href="characters.html">캐릭터</a>
              <a href="index.html">파티 분석</a>
              <a href="results.html">분석 결과</a>
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

  function renderTextLines(text) {
    return String(text || '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        if (/^\*\s*/.test(line)) {
          return `<p class="glossary-note">${rich(line.replace(/^\*\s*/, ''))}</p>`;
        }
        const numbered = line.match(/^(\d+)\.\s*(.+)$/);
        if (numbered) {
          return `<p class="glossary-step"><span>${esc(numbered[1])}</span>${rich(numbered[2])}</p>`;
        }
        if (/^\(.+\)$/.test(line)) {
          return `<p class="glossary-formula">${rich(line)}</p>`;
        }
        return `<p>${rich(line)}</p>`;
      })
      .join('');
  }

  function termCard(term) {
    const searchText = normalizeSearchText([
      term.name,
      term.category,
      ...(term.sections || []).map((section) => `${section.label} ${section.text}`),
      term.verificationNote || ''
    ].join(' '));

    return `<article class="glossary-card" id="${esc(term.id)}" data-search="${esc(searchText)}">
      <header class="glossary-card-heading">
        <span class="glossary-number">${String(term.number).padStart(2, '0')}</span>
        <div>
          <small>${esc(term.category)}</small>
          <h2 data-color="${esc(term.color)}">${esc(term.name)}</h2>
        </div>
      </header>
      <div class="glossary-card-body">
        ${(term.sections || []).map((section, index) => `<section class="glossary-definition${index === 0 ? ' primary' : ''}">
          <h3>${esc(section.label)}</h3>
          <div>${renderTextLines(section.text)}</div>
        </section>`).join('')}
        ${term.verificationNote ? `<aside class="verification-note"><strong>확인 필요</strong><p>${esc(term.verificationNote)}</p></aside>` : ''}
      </div>
    </article>`;
  }

  function groupedTerms() {
    const groups = new Map();
    TERMS.forEach((term) => {
      if (!groups.has(term.category)) groups.set(term.category, []);
      groups.get(term.category).push(term);
    });

    return [...groups.entries()].map(([category, terms]) => `<section class="glossary-group" data-category="${esc(category)}">
      <header class="glossary-group-heading">
        <span>${esc(category)}</span>
        <b>${terms.length}</b>
      </header>
      <div class="glossary-grid">${terms.map(termCard).join('')}</div>
    </section>`).join('');
  }

  function render() {
    document.body.innerHTML = `
      ${siteHeader()}
      <main class="page-shell glossary-page">
        <header class="page-heading">
          <div>
            <span>GAME SYSTEM GLOSSARY</span>
            <h1>용어 사전</h1>
            <p>게임의 피해 유형, 물리·아츠 이상, 부착·폭발·상태 소모와 전투 자원 규칙을 한곳에서 확인할 수 있습니다.</p>
          </div>
          <label class="search-field">
            <span>용어 검색</span>
            <input id="glossary-search" type="search" placeholder="용어 또는 효과 설명 검색">
          </label>
        </header>

        <div class="list-toolbar glossary-toolbar">
          <span>등록 용어 <b id="glossary-count">${TERMS.length}</b></span>
          <span class="glossary-help">색이 적용된 용어에 마우스를 올리면 해당 정의를 바로 확인할 수 있습니다.</span>
        </div>

        <div id="glossary-list" class="glossary-list">
          ${groupedTerms()}
        </div>
        <div id="glossary-empty" class="empty-state" hidden>검색 조건에 맞는 용어가 없습니다.</div>
      </main>
      <div class="tooltip" role="tooltip" aria-hidden="true"></div>`;

    initSearch();
    initTooltip();
  }

  function initSearch() {
    const input = document.getElementById('glossary-search');
    const cards = [...document.querySelectorAll('.glossary-card')];
    const groups = [...document.querySelectorAll('.glossary-group')];
    const count = document.getElementById('glossary-count');
    const empty = document.getElementById('glossary-empty');

    function apply() {
      const terms = normalizeSearchText(input.value).split(' ').filter(Boolean);
      let visible = 0;

      cards.forEach((card) => {
        const match = terms.length === 0 || terms.every((term) => card.dataset.search.includes(term));
        card.hidden = !match;
        if (match) visible += 1;
      });

      groups.forEach((group) => {
        group.hidden = !group.querySelector('.glossary-card:not([hidden])');
      });

      count.textContent = visible;
      empty.hidden = visible !== 0;
    }

    input.addEventListener('input', apply);
    apply();
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
      const keyword = KEYWORD_BY_TEXT.get(target.dataset.gameKeyword || '');
      const term = TERM_BY_ID.get(target.dataset.gameTerm || keyword?.termId || '');
      if (!term) return;

      const definition = term.sections?.find((section) => section.label === '정의 및 효과 설명')?.text
        || term.sections?.[0]?.text
        || '';

      active = target;
      tooltip.innerHTML = `<div class="tooltip-category">${esc(term.category)}</div><h3>${esc(keyword?.title || keyword?.text || term.name)}</h3><p>${esc(keyword?.description || definition).replaceAll('\n', '<br>')}</p>`;
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
