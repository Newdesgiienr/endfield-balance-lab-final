(() => {
  'use strict';

  const monsters = typeof MONSTERS !== 'undefined' ? MONSTERS : {};
  const compositions = typeof COMPOSITIONS !== 'undefined' ? COMPOSITIONS : {};
  const patternDb = typeof MONSTER_PATTERN_DATA !== 'undefined' ? MONSTER_PATTERN_DATA : {};

  const C = 390;
  const GRID_PX = 30;
  const HALF_GRID_CELLS = 13;

  const state = {
    selectedKey: Object.keys(monsters)[0] || null,
    selectedPatternId: null,
    filter: 'all',
    query: ''
  };

  const $ = (selector) => document.querySelector(selector);
  const esc = (value) => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
  const num = (value) => Number(value || 0).toLocaleString('ko-KR');
  const iconPath = (monster) => `dungeon-monsters/${monster.icon}`;

  function monsterEntries() {
    return Object.entries(monsters).filter(([key, monster]) => {
      const filterOk = state.filter === 'all' || monster.classKey === state.filter;
      const haystack = `${key} ${monster.name} ${monster.en} ${monster.id} ${monster.family}`.toLowerCase();
      const queryOk = !state.query || haystack.includes(state.query);
      return filterOk && queryOk;
    });
  }

  function currentPatternSet(key) {
    return Array.isArray(patternDb[key]?.patterns) ? patternDb[key].patterns : [];
  }

  function hasColdInfliction(key) {
    const db = patternDb[key] || {};
    const text = [db.summary, ...(Array.isArray(db.patterns) ? db.patterns.map((pattern) => pattern.effect) : [])]
      .filter(Boolean)
      .join(' ');
    return text.includes('냉기 부착');
  }

  function normalizeSelectedPattern(key) {
    const patterns = currentPatternSet(key);
    if (!patterns.some((pattern) => pattern.id === state.selectedPatternId)) {
      state.selectedPatternId = patterns[0]?.id || null;
    }
    return patterns;
  }

  function renderList() {
    const entries = monsterEntries();
    $('#visible-count').textContent = entries.length;

    if (!entries.some(([key]) => key === state.selectedKey)) {
      state.selectedKey = entries[0]?.[0] || null;
      state.selectedPatternId = null;
    }

    $('#monster-pattern-list').innerHTML = entries.length ? entries.map(([key, monster]) => `
      <button type="button" class="monster-list-button ${hasColdInfliction(key) ? 'cold-infliction' : ''} ${key === state.selectedKey ? 'active' : ''}" data-monster-key="${esc(key)}">
        <img class="monster-list-icon" src="${esc(iconPath(monster))}" alt="">
        <span class="monster-list-copy">
          <strong>${esc(monster.name)}</strong>
          <small>${esc(monster.en)} · ${esc(monster.family)}</small>
        </span>
        <em class="monster-list-class">${esc(monster.class)}</em>
      </button>
    `).join('') : '<div class="list-empty">검색 조건에 맞는 몬스터가 없습니다.</div>';

    document.querySelectorAll('[data-monster-key]').forEach((button) => {
      button.addEventListener('click', () => {
        state.selectedKey = button.dataset.monsterKey;
        state.selectedPatternId = null;
        renderList();
        renderDetail();
      });
    });
  }

  function patternExtentMeters(pattern) {
    if (!pattern) return 0;
    // 공개된 개별 히트박스 수치가 없는 패턴은 개념 도형 크기로 축척을 바꾸지 않는다.
    if (!pattern.verified) return Number(pattern.range || 0);
    if (pattern.shape === 'circle' || pattern.shape === 'ring' || pattern.shape === 'arc' || pattern.shape === 'ringDots') {
      return Number(pattern.radius || pattern.range || 2);
    }
    if (pattern.shape === 'cone' || pattern.shape === 'line' || pattern.shape === 'corridor' || pattern.shape === 'dash') {
      return Number(pattern.length || pattern.range || 6);
    }
    if (pattern.shape === 'targetCircle') {
      const x = Number(pattern.offsetX || 4);
      const y = Number(pattern.offsetY || 0);
      const radius = Number(pattern.radius || 1.2);
      return Math.hypot(x, y) + radius;
    }
    return Number(pattern.range || 0);
  }

  function getBoardScale(monster, pattern) {
    const maxExtent = Math.max(Number(monster.range || 0), patternExtentMeters(pattern));
    const scaleOptions = [0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3];
    const usableCellsFromCenter = 12;
    const metersPerCell = scaleOptions.find((value) => maxExtent <= value * usableCellsFromCenter)
      || Math.ceil((maxExtent / usableCellsFromCenter) * 2) / 2;
    return {
      metersPerCell,
      pxPerM: GRID_PX / metersPerCell,
      axisMax: HALF_GRID_CELLS * metersPerCell,
      tokenScale: Math.min(1.35, Math.max(1, Math.sqrt(1 / metersPerCell)))
    };
  }

  function meterText(value) {
    return Number(value.toFixed(2)).toString();
  }

  function pointFrom(angleDeg, meters, pxPerM) {
    const r = angleDeg * Math.PI / 180;
    return [C + Math.cos(r) * meters * pxPerM, C + Math.sin(r) * meters * pxPerM];
  }

  function pathSector(radiusM, startDeg, endDeg, pxPerM) {
    const [x1, y1] = pointFrom(startDeg, radiusM, pxPerM);
    const [x2, y2] = pointFrom(endDeg, radiusM, pxPerM);
    const large = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
    return `M ${C} ${C} L ${x1} ${y1} A ${radiusM * pxPerM} ${radiusM * pxPerM} 0 ${large} 1 ${x2} ${y2} Z`;
  }

  function overlayStyle(pattern) {
    if (pattern.verified) return { stroke: '#ec7d86', fill: 'rgba(240,112,122,.20)', dash: '' };
    if (['support', 'status'].includes(pattern.type)) return { stroke: '#6f87d9', fill: 'rgba(92,112,204,.18)', dash: '12 8' };
    return { stroke: '#f0a04d', fill: 'rgba(243,161,73,.18)', dash: '12 8' };
  }

  function drawSelectedPattern(pattern, pxPerM, hatchId = 'diagHatch') {
    if (!pattern) return '';
    const s = overlayStyle(pattern);
    const dash = s.dash ? `stroke-dasharray="${s.dash}"` : '';
    const sw = pattern.verified ? 3.2 : 3;
    const concept = !pattern.verified;

    // 정확한 개별 스킬 히트박스가 공개되지 않은 경우에는 격자의 m 수치와
    // 오해되지 않도록 고정 픽셀 크기의 '형태 참고용' 도형으로만 표시한다.
    if (pattern.shape === 'none') return '';
    if (pattern.shape === 'circle' || pattern.shape === 'ring') {
      const hasMeasuredRadius = Number(pattern.radius || pattern.range || 0) > 0;
      const r = hasMeasuredRadius ? (pattern.radius || pattern.range || 2) * pxPerM : 105;
      return `<circle cx="${C}" cy="${C}" r="${r}" fill="${pattern.shape === 'ring' ? 'none' : s.fill}" stroke="${s.stroke}" stroke-width="${sw}" ${dash}/>`;
    }
    if (pattern.shape === 'cone') {
      const ang = pattern.angle || 60;
      const len = pattern.length || pattern.range || 3;
      return `<path d="${pathSector(len, -ang / 2, ang / 2, pxPerM)}" fill="${s.fill}" stroke="${s.stroke}" stroke-width="${sw}" ${dash}/>`;
    }
    if (pattern.shape === 'line') {
      const len = (pattern.length || pattern.range || 6) * pxPerM;
      const w = Math.max(18, (pattern.width || .5) * pxPerM);
      const start = C + 18;
      const tip = C + len;
      const lineStart = start + 10;
      const lineEnd = tip - Math.max(22, w * .95);
      const arrowCenter = tip - Math.max(18, w * .85);
      const arrowHalfW = Math.max(10, w * .30);
      const arrowHalfH = Math.max(8, w * .26);
      const angle = Number.isFinite(Number(pattern.directionDeg)) ? Number(pattern.directionDeg) : 45;
      const shape = `<rect x="${start}" y="${C - w / 2}" width="${Math.max(12, tip - start)}" height="${w}" rx="${Math.min(10, w / 2)}" fill="${s.fill}" stroke="${s.stroke}" stroke-width="${sw}" ${dash}/>
        <line x1="${lineStart}" y1="${C}" x2="${lineEnd}" y2="${C}" stroke="${s.stroke}" stroke-width="${Math.max(3, w * .18)}" stroke-linecap="round" opacity=".95"/>
        <polygon points="${arrowCenter - arrowHalfW},${C - arrowHalfH} ${arrowCenter + arrowHalfW},${C} ${arrowCenter - arrowHalfW},${C + arrowHalfH}" fill="${s.stroke}" opacity=".95"/>`;
      return angle ? `<g transform="rotate(${angle} ${C} ${C})">${shape}</g>` : shape;
    }
    if (pattern.shape === 'corridor') {
      const len = (pattern.length || pattern.range || 8) * pxPerM;
      const w = Math.max(36, (pattern.width || 1.5) * pxPerM);
      const start = C + 20;
      const tip = C + len;
      const lineStart = start + 14;
      const lineEnd = tip - Math.max(28, w * .5);
      const arrowCenter = tip - Math.max(20, w * .34);
      return `<rect x="${start}" y="${C - w / 2}" width="${Math.max(14, tip - start)}" height="${w}" rx="${Math.min(14, w / 2)}" fill="url(#${hatchId})" stroke="${s.stroke}" stroke-width="${sw}" ${dash}/>
        <line x1="${lineStart}" y1="${C}" x2="${lineEnd}" y2="${C}" stroke="${s.stroke}" stroke-width="${Math.max(4, w * .14)}" stroke-linecap="round" opacity=".92"/>
        <polygon points="${arrowCenter - Math.max(12, w * .22)},${C - Math.max(10, w * .18)} ${arrowCenter + Math.max(12, w * .22)},${C} ${arrowCenter - Math.max(12, w * .22)},${C + Math.max(10, w * .18)}" fill="${s.stroke}" opacity=".92"/>`;
    }
    if (pattern.shape === 'targetCircle') {
      const rangeM = Number(pattern.range || 0);
      const radiusM = Math.min(Number(pattern.radius || 1.2), Math.max(.55, rangeM * .36 || 1.2));
      const angle = Number.isFinite(Number(pattern.directionDeg)) ? Number(pattern.directionDeg) : 45;
      const centerDistanceM = Math.max(.35, rangeM - radiusM);
      const [x, y] = pointFrom(angle, centerDistanceM, pxPerM);
      const r = radiusM * pxPerM;
      return `<line x1="${C}" y1="${C}" x2="${x}" y2="${y}" stroke="${s.stroke}" stroke-width="2.4" ${dash}/>
        <circle cx="${x}" cy="${y}" r="${r}" fill="${s.fill}" stroke="${s.stroke}" stroke-width="${sw}" ${dash}/>
        <circle cx="${x}" cy="${y}" r="7" fill="${s.stroke}"/>`;
    }
    if (pattern.shape === 'threeRandom') {
      const maxR = Math.max(2.1, Number(pattern.range || 0) * .72 || 2.1) * pxPerM;
      const positions = [
        [-.52, -.46], [.58, -.18], [.12, .62]
      ];
      const dotR = Math.max(13, Math.min(24, maxR * .13));
      const dots = positions.map(([dx, dy]) => `<circle cx="${C + dx * maxR}" cy="${C + dy * maxR}" r="${dotR}" fill="${s.fill}" stroke="${s.stroke}" stroke-width="2.6" ${dash}/>`).join('');
      return `<circle cx="${C}" cy="${C}" r="${maxR}" fill="none" stroke="${s.stroke}" stroke-width="2" stroke-dasharray="7 7" opacity=".42"/>${dots}`;
    }
    if (pattern.shape === 'ringDots') {
      const r = (pattern.radius || Math.max(2.1, Number(pattern.range || 0) * 0.62 || 2.1)) * pxPerM;
      let dots = '';
      for (let i = 0; i < 8; i += 1) {
        const a = i * Math.PI / 4;
        dots += `<circle cx="${C + Math.cos(a) * r}" cy="${C + Math.sin(a) * r}" r="12" fill="${s.fill}" stroke="${s.stroke}" stroke-width="2.5" ${dash}/>`;
      }
      return `<circle cx="${C}" cy="${C}" r="${r}" fill="none" stroke="${s.stroke}" stroke-width="2.2" ${dash}/>${dots}`;
    }
    if (pattern.shape === 'nineAreas') {
      const maxR = Math.max(1.2, Number(pattern.range || 2.8)) * pxPerM;
      const spacing = maxR * .42;
      const dotR = Math.max(12, Math.min(22, maxR * .13));
      let areas = '';
      [-1, 0, 1].forEach((row) => {
        [-1, 0, 1].forEach((col) => {
          const x = C + col * spacing;
          const y = C + row * spacing;
          areas += `<circle cx="${x}" cy="${y}" r="${dotR}" fill="${s.fill}" stroke="${s.stroke}" stroke-width="2.6" ${dash}/>`;
        });
      });
      return `<circle cx="${C}" cy="${C}" r="${maxR}" fill="none" stroke="${s.stroke}" stroke-width="2" stroke-dasharray="7 7" opacity=".55"/>${areas}`;
    }
    if (pattern.shape === 'arc') {
      const r = (pattern.radius || pattern.range || 2.5) * pxPerM;
      const half = (pattern.angle || 120) / 2;
      const radiusM = pattern.radius || pattern.range || 2.5;
      const [x1, y1] = pointFrom(180 - half, radiusM, pxPerM);
      const [x2, y2] = pointFrom(180 + half, radiusM, pxPerM);
      return `<path d="M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}" fill="none" stroke="${s.stroke}" stroke-width="34" stroke-linecap="round" opacity=".20" ${dash}/>
        <path d="M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}" fill="none" stroke="${s.stroke}" stroke-width="3.2" ${dash}/>`;
    }
    if (pattern.shape === 'dash') {
      // 접근/돌진 이동은 곡선이 아니라 목표 방향으로 곧게 뻗는 이동축으로 표시한다.
      const len = (pattern.length || pattern.range || 6) * pxPerM;
      const start = C + 34;
      const tip = C + len;
      const corridorW = 34;
      const lineStart = start + 10;
      const lineEnd = tip - 22;
      const arrowCenter = tip - 16;
      return `<rect x="${start}" y="${C - corridorW / 2}" width="${Math.max(12, tip - start)}" height="${corridorW}" rx="17" fill="${s.fill}" stroke="${s.stroke}" stroke-width="3" ${dash}/>
        <line x1="${lineStart}" y1="${C}" x2="${lineEnd}" y2="${C}" stroke="${s.stroke}" stroke-width="4" stroke-linecap="round" opacity=".92"/>
        <polygon points="${arrowCenter - 12},${C - 9} ${arrowCenter + 12},${C} ${arrowCenter - 12},${C + 9}" fill="${s.stroke}" opacity=".92"/>`;
    }
    return '';
  }

  function patternBoardSvg(monster, pattern, scale, suffix = 'main') {
    const baseRange = Number(monster.range || 0) * scale.pxPerM;
    const safeSuffix = String(suffix).replace(/[^a-z0-9_-]/gi, '-');
    const gridId = `miniGrid-${monster.id}-${safeSuffix}`;
    const majorGridId = `majorGrid-${monster.id}-${safeSuffix}`;
    const hatchId = `diagHatch-${monster.id}-${safeSuffix}`;
    const shadowId = `tokenShadow-${monster.id}-${safeSuffix}`;
    const patternShape = drawSelectedPattern(pattern, scale.pxPerM, hatchId);
    const icon = iconPath(monster);
    return `
      <svg class="pattern-mini-board" viewBox="0 0 780 780" role="img" aria-label="${esc(monster.name)} ${esc(pattern?.name || '')} 패턴 범위 격자">
        <defs>
          <pattern id="${esc(gridId)}" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#d3dae2" stroke-width="1"/>
          </pattern>
          <pattern id="${esc(majorGridId)}" width="150" height="150" patternUnits="userSpaceOnUse">
            <rect width="150" height="150" fill="url(#${esc(gridId)})"/>
            <path d="M 150 0 L 0 0 0 150" fill="none" stroke="#aeb9c4" stroke-width="1.5"/>
          </pattern>
          <pattern id="${esc(hatchId)}" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
            <line x1="0" y1="0" x2="0" y2="12" stroke="#f2a85d" stroke-width="4" opacity=".48"/>
          </pattern>
          <filter id="${esc(shadowId)}" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#0d1721" flood-opacity=".30"/>
          </filter>
        </defs>
        <rect data-board-bg="true" x="0" y="0" width="780" height="780" fill="#f7f9fb"/>
        <rect x="0" y="0" width="780" height="780" fill="url(#${esc(majorGridId)})"/>
        <line x1="390" y1="0" x2="390" y2="780" stroke="#8f9ba8" stroke-width="1.5" opacity=".72"/>
        <line x1="0" y1="390" x2="780" y2="390" stroke="#8f9ba8" stroke-width="1.5" opacity=".72"/>
        <circle cx="390" cy="390" r="${baseRange}" fill="rgba(104,117,131,.035)" stroke="#98a4b0" stroke-width="2.2" stroke-dasharray="7 7"/>
        ${patternShape}
        <g transform="translate(${C} ${C}) scale(${scale.tokenScale}) translate(${-C} ${-C})" filter="url(#${esc(shadowId)})">
          <rect x="348" y="342" width="84" height="96" rx="13" fill="#111922" stroke="#187eae" stroke-width="3"/>
          <rect x="354" y="348" width="72" height="72" rx="9" fill="#f7f9fb"/>
          <image href="${esc(icon)}" x="354" y="348" width="72" height="72" preserveAspectRatio="xMidYMid meet"/>
          <rect x="354" y="421" width="72" height="17" rx="8" fill="#0f1720"/>
          <text x="390" y="434" text-anchor="middle" fill="#fff" font-size="15" font-weight="900">${esc(monster.range)}m</text>
        </g>
        <circle cx="390" cy="390" r="4" fill="#fff" stroke="#17212c" stroke-width="2"/>
      </svg>`;
  }

  function patternRangeText(monster, pattern) {
    if (!pattern) return '-';
    if (Number.isFinite(Number(pattern.range)) && Number(pattern.range) > 0) {
      return `${meterText(Number(pattern.range))}m`;
    }
    if (pattern.verified) {
      const exact = Number(pattern.radius || pattern.length || 0);
      if (exact > 0) return `${meterText(exact)}m`;
    }
    return `${meterText(Number(monster.range || 0))}m`;
  }

  function typeLabel(type) {
    return ({
      melee: '근접', ranged: '원거리', area: '범위', charge: '돌진', support: '지원',
      status: '상태 이상', control: '특수', movement: '이동'
    })[type] || '전투 행동';
  }

  function patternGroupLabel(pattern) {
    const name = String(pattern?.name || '');
    if (name.includes('들이받기')) return '들이받기';
    if (name.includes('휘두르기') || name.includes('찌르기')) return '휘두르기 · 찌르기';
    if (name.includes('지면 강타') || name.includes('내려찍기')) return '지면 강타';
    if (name.includes('돌진') || name.includes('급속 접근')) return '돌진 · 접근';
    if (name.includes('분출') || name.includes('석주') || name.includes('지면 폭발') || name.includes('9지점')) return '지면 패턴';
    if (name.includes('사격') || name.includes('투사체') || name.includes('레이저') || name.includes('구체') || name.includes('충격파')) return '원거리 공격';
    if (name.includes('포획')) return '포획';
    if (name.includes('상태') || name.includes('외피') || name.includes('강화')) return '상태 · 강화';
    return typeLabel(pattern?.type);
  }

  function groupPatterns(patterns) {
    const map = new Map();
    patterns.forEach((pattern) => {
      const label = patternGroupLabel(pattern);
      if (!map.has(label)) map.set(label, []);
      map.get(label).push(pattern);
    });
    return [...map.entries()].map(([label, items]) => ({ label, items }));
  }

  function formatInlineText(value) {
    const escaped = esc(value || '');
    return escaped.replaceAll('냉기 부착', '<span class="cold-term">냉기 부착</span>');
  }


  function svgTextLabel(svg, x, y, text, anchor = 'start') {
    const node = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    node.setAttribute('x', x);
    node.setAttribute('y', y);
    node.setAttribute('text-anchor', anchor);
    node.setAttribute('fill', '#5f6f7e');
    node.setAttribute('font-size', '25');
    node.setAttribute('font-weight', '900');
    node.setAttribute('font-family', 'Arial, sans-serif');
    node.setAttribute('style', 'paint-order:stroke;stroke:#fff;stroke-width:8px;stroke-linejoin:round;');
    node.textContent = text;
    svg.appendChild(node);
  }

  function embeddedMonsterIcon(monster) {
    const key = iconPath(monster);
    const data = typeof MONSTER_ICON_DATA !== 'undefined' ? MONSTER_ICON_DATA[key] : '';
    if (!data) throw new Error(`embedded monster icon missing: ${key}`);
    return data;
  }

  async function exportPatternPng(monster, pattern, scale, button) {
    const originalText = button?.textContent || 'PNG 저장';
    if (button) {
      button.disabled = true;
      button.textContent = 'PNG 생성 중…';
    }
    try {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = patternBoardSvg(monster, pattern, scale, 'export').trim();
      const svg = wrapper.querySelector('svg');
      if (!svg) throw new Error('board svg not found');
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svg.setAttribute('width', '780');
      svg.setAttribute('height', '780');
      // PNG 저장 시 격자판 내부 배경색까지 포함한다.

      const iconData = embeddedMonsterIcon(monster);
      svg.querySelectorAll('image').forEach((imageNode) => {
        imageNode.setAttribute('href', iconData);
      });

      const axis = meterText(scale.axisMax);
      svgTextLabel(svg, 418, 34, `+${axis}m`, 'start');
      svgTextLabel(svg, 418, 762, `-${axis}m`, 'start');
      svgTextLabel(svg, 20, 382, `-${axis}m`, 'start');
      svgTextLabel(svg, 760, 382, `+${axis}m`, 'end');
      svgTextLabel(svg, 20, 754, `격자 1칸 = ${meterText(scale.metersPerCell)}m`, 'start');

      const serialized = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([serialized], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      const renderImage = new Image();
      try {
        await new Promise((resolve, reject) => {
          renderImage.onload = resolve;
          renderImage.onerror = () => reject(new Error('SVG 렌더링 실패'));
          renderImage.src = svgUrl;
        });
      } finally {
        URL.revokeObjectURL(svgUrl);
      }

      const canvas = document.createElement('canvas');
      canvas.width = 1560;
      canvas.height = 1560;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('canvas context unavailable');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#f7f9fb';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(renderImage, 0, 0, canvas.width, canvas.height);

      const pngBlob = await new Promise((resolve, reject) => {
        canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('png encode failed')), 'image/png');
      });
      const pngUrl = URL.createObjectURL(pngBlob);
      const link = document.createElement('a');
      link.href = pngUrl;
      link.download = `${monster.name}-${pattern.name}-현황판.png`.replace(/[\\/:*?"<>|]/g, '-');
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(pngUrl), 1000);
    } catch (error) {
      console.error('PNG 저장 실패:', error);
      if (button) button.textContent = '저장 실패 · 다시 시도';
      setTimeout(() => {
        if (button) button.textContent = originalText;
      }, 1500);
      return;
    } finally {
      if (button) button.disabled = false;
    }
    if (button) button.textContent = originalText;
  }

  function syncIndexPanelHeight() {
    const panel = document.querySelector('.monster-index-panel');
    const detail = document.querySelector('.monster-pattern-detail');
    if (!panel || !detail) return;
    if (window.matchMedia('(max-width: 1000px)').matches) {
      panel.style.height = '';
      return;
    }
    const height = Math.ceil(detail.getBoundingClientRect().height);
    if (height > 0) panel.style.height = `${height}px`;
  }

  function closePatternModal() {
    const modal = document.querySelector('[data-pattern-modal]');
    if (modal?._patternKeyHandler) document.removeEventListener('keydown', modal._patternKeyHandler);
    if (modal) modal.remove();
    document.body.classList.remove('pattern-modal-open');
  }

  function openPatternModal(monster, pattern, scale) {
    closePatternModal();
    const modal = document.createElement('div');
    modal.className = 'pattern-modal-backdrop';
    modal.dataset.patternModal = 'true';
    modal.innerHTML = `
      <div class="pattern-modal-dialog" role="dialog" aria-modal="true" aria-label="${esc(monster.name)} ${esc(pattern.name)} 확대 보기">
        <button type="button" class="pattern-modal-close" data-pattern-modal-close aria-label="확대 보기 닫기">×</button>
        <div class="pattern-modal-title">
          <small>${esc(monster.name)}</small>
          <h2>${esc(pattern.name)}</h2>
        </div>
        <div class="pattern-modal-layout">
          <div class="pattern-modal-board-wrap">
            <div class="pattern-mini-board-shell pattern-modal-board-shell">
              ${patternBoardSvg(monster, pattern, scale, 'modal')}
              <span class="pattern-board-axis top">+${meterText(scale.axisMax)}m</span>
              <span class="pattern-board-axis bottom">-${meterText(scale.axisMax)}m</span>
              <span class="pattern-board-axis left">-${meterText(scale.axisMax)}m</span>
              <span class="pattern-board-axis right">+${meterText(scale.axisMax)}m</span>
              <span class="pattern-board-scale-label">격자 1칸 = ${meterText(scale.metersPerCell)}m</span>
            </div>
          </div>
          <article class="pattern-info-card pattern-modal-info-card">
            <div class="pattern-info-title">
              <strong>${esc(pattern.name)}</strong>
              <small>${esc(typeLabel(pattern.type))} 패턴</small>
            </div>
            <p class="pattern-info-description">${formatInlineText(pattern.effect)}</p>
            <dl class="pattern-info-grid">
              <dt>사거리 / 범위</dt><dd>${esc(patternRangeText(monster, pattern))}</dd>
              <dt>공격 특성</dt><dd>${esc(typeLabel(pattern.type))}</dd>
            </dl>
          </article>
        </div>
      </div>`;
    document.body.appendChild(modal);
    document.body.classList.add('pattern-modal-open');

    modal.querySelector('[data-pattern-modal-close]').addEventListener('click', closePatternModal);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closePatternModal();
    });
    const onKey = (event) => {
      if (event.key === 'Escape') closePatternModal();
    };
    modal._patternKeyHandler = onKey;
    document.addEventListener('keydown', onKey);
  }


  function renderDetail() {
    const target = $('#monster-pattern-detail');
    const monster = monsters[state.selectedKey];
    if (!monster) {
      target.innerHTML = '<div class="pattern-empty-state"><strong>몬스터를 선택하세요</strong><p>왼쪽 목록에서 몬스터를 선택하면 패턴 상세 정보가 표시됩니다.</p></div>';
      return;
    }

    const db = patternDb[state.selectedKey] || {};
    const patterns = normalizeSelectedPattern(state.selectedKey);
    const selected = patterns.find((pattern) => pattern.id === state.selectedPatternId) || patterns[0] || null;
    const boardScale = selected ? getBoardScale(monster, selected) : null;

    target.innerHTML = `
      <div class="detail-hero">
        <div class="detail-monster-art"><img src="${esc(iconPath(monster))}" alt="${esc(monster.name)}"></div>
        <div>
          <div class="detail-title-line"><span>${esc(monster.class)}</span><span>${esc(monster.family)}</span></div>
          <h2>${esc(monster.name)}</h2>
          <span class="detail-en">${esc(monster.en)}</span>
          <p class="detail-feature">${esc(db.summary || monster.feature)}</p>
        </div>
      </div>

      <div class="stat-strip" aria-label="몬스터 기본 스탯">
        <div><small>HP</small><strong>${num(monster.hp)}</strong></div>
        <div><small>ATK</small><strong>${num(monster.atk)}</strong></div>
        <div><small>DEF</small><strong>${num(monster.def)}</strong></div>
        <div><small>강인도</small><strong>${num(monster.stagger)}</strong></div>
        <div><small>공격 사거리</small><strong>${num(monster.range)}m</strong></div>
      </div>

      <div class="detail-content detail-content-pattern-only">
        <section class="pattern-section">
          <header class="pattern-section-head">
            <h3>행동 패턴</h3>
            ${selected ? '<button type="button" class="pattern-export-button" data-pattern-export>PNG 저장</button>' : ''}
          </header>
          <div class="pattern-body">
            ${selected ? `
              <div class="pattern-visual-layout" data-pattern-expand role="button" tabindex="0" aria-label="${esc(selected.name)} 행동 패턴 크게 보기">
                <div class="pattern-board-column">
                  <div class="pattern-mini-board-shell">
                    ${patternBoardSvg(monster, selected, boardScale, 'main')}
                    <span class="pattern-board-axis top">+${meterText(boardScale.axisMax)}m</span>
                    <span class="pattern-board-axis bottom">-${meterText(boardScale.axisMax)}m</span>
                    <span class="pattern-board-axis left">-${meterText(boardScale.axisMax)}m</span>
                    <span class="pattern-board-axis right">+${meterText(boardScale.axisMax)}m</span>
                    <span class="pattern-board-scale-label">격자 1칸 = ${meterText(boardScale.metersPerCell)}m</span>
                  </div>
                </div>

                <div class="pattern-info-column">
                  <div class="pattern-selector" aria-label="행동 패턴 선택">
                    ${groupPatterns(patterns).map((group) => `
                      <div class="pattern-selector-group">
                        <span class="pattern-selector-group-label">${esc(group.label)}</span>
                        <div class="pattern-selector-buttons">
                          ${group.items.map((pattern) => `<button type="button" class="${pattern.id === selected.id ? 'active' : ''}" data-pattern-id="${esc(pattern.id)}">${esc(pattern.name)}</button>`).join('')}
                        </div>
                      </div>
                    `).join('')}
                  </div>
                  <article class="pattern-info-card">
                    <div class="pattern-info-top pattern-info-top-clean">
                      <div class="pattern-info-title">
                        <strong>${esc(selected.name)}</strong>
                        <small>${esc(typeLabel(selected.type))} 패턴</small>
                      </div>
                    </div>
                    <p class="pattern-info-description">${formatInlineText(selected.effect)}</p>
                    <dl class="pattern-info-grid">
                      <dt>사거리 / 범위</dt><dd>${esc(patternRangeText(monster, selected))}</dd>
                      <dt>공격 특성</dt><dd>${esc(typeLabel(selected.type))}</dd>
                    </dl>
                  </article>
                </div>
              </div>
            ` : '<p class="pattern-draft-note">현재 확인된 행동 패턴 데이터가 없습니다.</p>'}
          </div>
        </section>
      </div>
    `;

    document.querySelectorAll('[data-pattern-id]').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        state.selectedPatternId = button.dataset.patternId;
        renderDetail();
      });
    });

    const exportButton = target.querySelector('[data-pattern-export]');
    if (exportButton && selected && boardScale) {
      exportButton.addEventListener('click', (event) => {
        event.stopPropagation();
        exportPatternPng(monster, selected, boardScale, exportButton);
      });
    }

    requestAnimationFrame(syncIndexPanelHeight);

    const expandTarget = target.querySelector('[data-pattern-expand]');
    if (expandTarget && selected && boardScale) {
      const open = (event) => {
        if (event.target.closest('[data-pattern-id]')) return;
        openPatternModal(monster, selected, boardScale);
      };
      expandTarget.addEventListener('click', open);
      expandTarget.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openPatternModal(monster, selected, boardScale);
        }
      });
    }
  }

  function renderSummary() {
    $('#pattern-total').textContent = Object.keys(monsters).length;
    $('#pattern-complete').textContent = Object.keys(monsters).filter((key) => currentPatternSet(key).length > 0).length;
  }

  function bindToolbar() {
    $('#pattern-search').addEventListener('input', (event) => {
      state.query = event.target.value.trim().toLowerCase();
      state.selectedPatternId = null;
      renderList();
      renderDetail();
    });

    document.querySelectorAll('[data-filter]').forEach((button) => {
      button.addEventListener('click', () => {
        state.filter = button.dataset.filter;
        state.selectedPatternId = null;
        document.querySelectorAll('[data-filter]').forEach((item) => item.classList.toggle('active', item === button));
        renderList();
        renderDetail();
      });
    });
  }

  renderSummary();
  bindToolbar();
  renderList();
  renderDetail();

  const detailElement = document.querySelector('.monster-pattern-detail');
  if (detailElement && typeof ResizeObserver !== 'undefined') {
    const sizeObserver = new ResizeObserver(() => syncIndexPanelHeight());
    sizeObserver.observe(detailElement);
  }
  window.addEventListener('resize', syncIndexPanelHeight);
  requestAnimationFrame(syncIndexPanelHeight);
})();
