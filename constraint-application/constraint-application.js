(() => {
  'use strict';

  const frame = document.getElementById('constraint-result-frame');
  const topSelectedCount = document.getElementById('top-selected-count');
  const topScore = document.getElementById('top-score');
  const dashboardTotalCount = document.getElementById('dashboard-total-count');
  const dashboardSelectedCount = document.getElementById('dashboard-selected-count');
  const dashboardScore = document.getElementById('dashboard-score');
  const boardSearch = document.getElementById('constraint-board-search');
  const timeModeButtons = [...document.querySelectorAll('[data-time-mode]')];
  const typeFilterButtons = [...document.querySelectorAll('#constraint-type-filters .constraint-filter-chip')];
  const tierFilterButtons = [...document.querySelectorAll('#constraint-tier-filters .constraint-filter-chip')];
  const comboDrawerStage = document.getElementById('constraint-page-stage');
  const comboDrawer = document.getElementById('constraint-combo-drawer');
  const comboDrawerToggle = document.getElementById('constraint-combo-drawer-toggle');
  const comboSaveTab = document.getElementById('constraint-combo-save-tab');
  const comboSavedTab = document.getElementById('constraint-combo-saved-tab');
  const comboSavePanel = document.getElementById('constraint-combo-save-panel');
  const comboSavedPanel = document.getElementById('constraint-combo-saved-panel');
  const comboCurrentScore = document.getElementById('constraint-combo-current-score');
  const comboCurrentCount = document.getElementById('constraint-combo-current-count');
  const comboCurrentCaption = document.getElementById('constraint-combo-current-caption');
  const comboCurrentList = document.getElementById('constraint-combo-current-list');
  const comboNameInput = document.getElementById('constraint-combo-name');
  const comboSaveButton = document.getElementById('constraint-combo-save-button');
  const comboSavedCount = document.getElementById('constraint-combo-saved-count');
  const comboSavedCaption = document.getElementById('constraint-combo-saved-caption');
  const comboSavedList = document.getElementById('constraint-combo-saved-list');
  const comboToast = document.getElementById('constraint-combo-toast');
  const comboSearchInput = document.getElementById('constraint-combo-search');
  if (!frame) return;

  let activeTypeFilter = 'all';
  let activeTierFilter = 'all';
  let activeBoardQuery = '';

  const COMBINATION_STORAGE_KEY = 'endfieldConstraintCombinationsV1';
  const COMBINATION_SCHEMA = 'endfield-constraint-combinations';
  let comboDrawerOpen = false;
  let comboDrawerSelectionKey = '';
  let comboToastTimer = 0;
  let comboSearchQuery = '';
  let localConstraintCombinations = readLocalConstraintCombinations();
  const collapsedCombinationIds = new Set(allSavedCombinations().map(item => `${item.source}:${item.id}`));


  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function categoryLabel(card) {
    const prefix = String(card?.name || '').split(':')[0].trim();
    if (prefix === '팀' || prefix === '조작' || prefix === '환경') return prefix;
    try {
      const type = getType(card);
      return type === 'team' ? '팀' : type === 'control' ? '조작' : type === 'env' ? '환경' : '기타';
    } catch (error) {
      return '기타';
    }
  }

  function constraintRecord(id) {
    try {
      const card = getCard(id);
      if (!card || card.empty) return null;
      return {
        id: card.id,
        name: card.name,
        category: categoryLabel(card),
        tier: Number(getTier(card.id)) || 1,
        score: Number(card.pts) || 0,
        effect: card.desc || '',
        icon: card.icon || ''
      };
    } catch (error) {
      return null;
    }
  }

  function readLocalConstraintCombinations() {
    try {
      const raw = localStorage.getItem(COMBINATION_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      const list = Array.isArray(parsed) ? parsed : Array.isArray(parsed?.combinations) ? parsed.combinations : [];
      return list.filter(item => item && Array.isArray(item.selectedIds));
    } catch (error) {
      console.warn('저장된 제약 조합을 불러오지 못했습니다.', error);
      return [];
    }
  }

  function writeLocalConstraintCombinations() {
    try {
      localStorage.setItem(COMBINATION_STORAGE_KEY, JSON.stringify(localConstraintCombinations));
      return true;
    } catch (error) {
      console.warn('제약 조합을 브라우저에 저장하지 못했습니다.', error);
      return false;
    }
  }

  function normalizedDefaultCombinations() {
    const defaults = Array.isArray(window.DEFAULT_CONSTRAINT_COMBINATIONS)
      ? window.DEFAULT_CONSTRAINT_COMBINATIONS
      : [];
    return defaults
      .filter(item => item && Array.isArray(item.selectedIds))
      .map((item, index) => ({
        ...item,
        id: item.id || `site-default-${index + 1}`,
        source: 'site'
      }));
  }

  function allSavedCombinations() {
    return [
      ...normalizedDefaultCombinations(),
      ...localConstraintCombinations.map(item => ({ ...item, source: 'local' }))
    ];
  }

  function showComboToast(message) {
    if (!comboToast) return;
    window.clearTimeout(comboToastTimer);
    comboToast.textContent = message;
    comboToast.classList.add('show');
    comboToastTimer = window.setTimeout(() => comboToast.classList.remove('show'), 2600);
  }

  function setComboDrawerOpen(next, focusName = false) {
    if (!comboDrawer || !comboDrawerToggle || !comboDrawerStage) return;
    comboDrawerOpen = Boolean(next);
    comboDrawer.classList.toggle('open', comboDrawerOpen);
    comboDrawerStage.classList.toggle('constraint-combo-drawer-open', comboDrawerOpen);
    document.body.classList.toggle('constraint-combo-drawer-is-open', comboDrawerOpen);
    comboDrawer.setAttribute('aria-hidden', String(!comboDrawerOpen));
    comboDrawer.inert = !comboDrawerOpen;
    comboDrawerToggle.setAttribute('aria-expanded', String(comboDrawerOpen));
    comboDrawerToggle.setAttribute('aria-label', comboDrawerOpen ? '제약 조합 저장 패널 닫기' : '제약 조합 저장 패널 열기');
    const icon = comboDrawerToggle.querySelector('span');
    if (icon) icon.textContent = comboDrawerOpen ? '›' : '‹';
    if (comboDrawerOpen) {
      renderSavedCombinations();
      updateCombinationDrawerCurrent(selectedIds(), true);
      if (focusName) window.setTimeout(() => comboNameInput?.focus(), 220);
    }
  }

  function setCombinationTab(tab) {
    const saveActive = tab !== 'saved';
    comboSaveTab?.classList.toggle('active', saveActive);
    comboSavedTab?.classList.toggle('active', !saveActive);
    comboSaveTab?.setAttribute('aria-selected', String(saveActive));
    comboSavedTab?.setAttribute('aria-selected', String(!saveActive));
    comboSavePanel?.classList.toggle('active', saveActive);
    comboSavedPanel?.classList.toggle('active', !saveActive);
    if (comboSavePanel) comboSavePanel.hidden = !saveActive;
    if (comboSavedPanel) comboSavedPanel.hidden = saveActive;
    if (!saveActive) renderSavedCombinations();
  }

  function currentConstraintCardHtml(record) {
    if (!record) return '';
    return `<article class="constraint-combo-constraint-card">
      <img src="${escapeHtml(record.icon)}" alt="">
      <div class="constraint-combo-constraint-card-copy">
        <small>${escapeHtml(record.category)} · ${record.score}점 지표</small>
        <strong>${escapeHtml(record.name)}</strong>
        <p>${escapeHtml(record.effect)}</p>
      </div>
    </article>`;
  }

  function updateCombinationDrawerCurrent(ids, force = false) {
    if (!comboCurrentList) return;
    const validIds = (Array.isArray(ids) ? ids : []).filter(id => constraintRecord(id));
    const key = validIds.join('|');
    if (!force && key === comboDrawerSelectionKey) return;
    comboDrawerSelectionKey = key;
    const score = selectedScore(validIds);
    if (comboCurrentScore) comboCurrentScore.textContent = String(score);
    if (comboCurrentCount) comboCurrentCount.textContent = String(validIds.length);
    if (comboCurrentCaption) comboCurrentCaption.textContent = validIds.length ? `${validIds.length}개 · ${score}★` : '선택 없음';
    if (comboSaveButton) comboSaveButton.disabled = validIds.length === 0;
    const records = validIds.map(constraintRecord).filter(Boolean);
    comboCurrentList.innerHTML = records.length
      ? records.map(currentConstraintCardHtml).join('')
      : '<div class="constraint-combo-empty"><strong>선택된 제약이 없습니다.</strong><p>현황판에서 저장할 제약을 먼저 선택해 주세요.</p></div>';
  }

  function savedConstraintMiniHtml(record) {
    return `<div class="constraint-combo-saved-constraint">
      <img src="${escapeHtml(record.icon || '')}" alt="">
      <span>${escapeHtml(record.name || record.id)}</span>
      <b>${Number(record.score) || 0}★</b>
    </div>`;
  }

  function normalizeCombinationForDisplay(item) {
    const ids = Array.isArray(item.selectedIds) ? item.selectedIds.filter(id => constraintRecord(id)) : [];
    const recordsById = new Map((Array.isArray(item.constraints) ? item.constraints : []).map(record => [record.id, record]));
    const records = ids.map(id => {
      const live = constraintRecord(id);
      const saved = recordsById.get(id);
      return live ? { ...live, ...(saved || {}), icon: live.icon || saved?.icon || '' } : saved;
    }).filter(Boolean);
    const score = records.reduce((sum, record) => sum + (Number(record.score) || 0), 0);
    return {
      ...item,
      selectedIds: ids,
      constraints: records,
      totalScore: Number(item.totalScore) || score,
      selectedCount: ids.length
    };
  }

  function renderSavedCombinations() {
    const fullList = allSavedCombinations()
      .map(normalizeCombinationForDisplay)
      .sort((a, b) => {
        const scoreDiff = (Number(a.totalScore) || 0) - (Number(b.totalScore) || 0);
        if (scoreDiff) return scoreDiff;
        return String(a.name || '').localeCompare(String(b.name || ''), 'ko-KR');
      });
    const query = String(comboSearchQuery || '').trim().toLowerCase();
    const list = query
      ? fullList.filter(item => String(item.name || '').toLowerCase().includes(query))
      : fullList;
    if (comboSavedCount) comboSavedCount.textContent = String(fullList.length);
    if (comboSavedCaption) comboSavedCaption.textContent = query ? `검색 결과 ${list.length}개` : `${fullList.length}개`;
    if (!comboSavedList) return;
    if (!list.length) {
      comboSavedList.innerHTML = query
        ? '<div class="constraint-combo-empty"><strong>검색 결과가 없습니다.</strong><p>제약 조합 제목을 다시 확인해 주세요.</p></div>'
        : '<div class="constraint-combo-empty"><strong>저장된 제약 조합이 없습니다.</strong><p>‘제약 조합 저장’ 탭에서 현재 선택을 이름과 함께 저장해 주세요.</p></div>';
      return;
    }
    comboSavedList.innerHTML = list.map(item => {
      const siteBadge = item.source === 'site' ? '<span class="constraint-combo-site-badge">사이트 기본 저장</span>' : '';
      const editButton = item.source === 'site' ? '' : `<button type="button" class="constraint-combo-rename-button" data-rename-combination="${escapeHtml(item.id)}" data-source="${escapeHtml(item.source)}" aria-label="조합 제목 수정" title="조합 제목 수정">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 16.8V20h3.2L17.6 9.6l-3.2-3.2L4 16.8Zm15.7-9.7a.9.9 0 0 0 0-1.3l-1.5-1.5a.9.9 0 0 0-1.3 0l-1.2 1.2 3.2 3.2 1.2-1.2Z"/></svg>
      </button>`;
      const deleteButton = item.source === 'site' ? '' : `<button type="button" class="constraint-combo-delete-button" data-delete-combination="${escapeHtml(item.id)}">삭제</button>`;
      const dateText = item.createdAt ? new Date(item.createdAt).toLocaleString('ko-KR') : '저장 시각 없음';
      const collapsed = collapsedCombinationIds.has(`${item.source}:${item.id}`);
      return `<article class="constraint-combo-saved-card${collapsed ? ' constraint-combo-card-collapsed' : ''}" data-combination-card="${escapeHtml(item.id)}" data-source="${escapeHtml(item.source)}">
        <div class="constraint-combo-saved-card-head">
          <div class="constraint-combo-saved-title-row">
            <div class="constraint-combo-saved-title-wrap"><h3>${escapeHtml(item.name || '이름 없는 조합')}${siteBadge}</h3>${editButton}</div>
            <strong class="constraint-combo-saved-score">${item.totalScore}★</strong>
          </div>
          <div class="constraint-combo-saved-meta">${item.selectedCount}개 제약 · ${escapeHtml(dateText)}</div>
        </div>
        <div class="constraint-combo-saved-constraints"${collapsed ? ' hidden' : ''}>${item.constraints.map(savedConstraintMiniHtml).join('')}</div>
        <div class="constraint-combo-saved-card-actions">
          <button type="button" class="constraint-combo-load-button" data-load-combination="${escapeHtml(item.id)}" data-source="${escapeHtml(item.source)}">이 조합 불러오기</button>
          <button type="button" class="constraint-combo-collapse-button" data-toggle-combination="${escapeHtml(item.id)}" data-source="${escapeHtml(item.source)}" aria-expanded="${collapsed ? 'false' : 'true'}">${collapsed ? '목록 펼치기' : '목록 접기'}</button>
          <button type="button" class="constraint-combo-export-button" data-export-combination="${escapeHtml(item.id)}" data-source="${escapeHtml(item.source)}">파일 내보내기</button>
          ${deleteButton}
        </div>
      </article>`;
    }).join('');
  }

  function buildCombinationRecord(name) {
    const ids = selectedIds();
    const constraints = ids.map(constraintRecord).filter(Boolean);
    const createdAt = new Date().toISOString();
    return {
      id: `combo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: String(name || '').trim(),
      totalScore: constraints.reduce((sum, record) => sum + (Number(record.score) || 0), 0),
      selectedCount: constraints.length,
      selectedIds: constraints.map(record => record.id),
      constraints,
      createdAt
    };
  }

  function exportLocalCombinationsJson() {
    const payload = {
      schema: COMBINATION_SCHEMA,
      version: 1,
      exportedAt: new Date().toISOString(),
      combinations: localConstraintCombinations
    };
    const text = JSON.stringify(payload, null, 2);
    const blob = new Blob([text], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z').replace('T', '-');
    a.href = url;
    a.download = `endfield-constraint-combinations-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function exportSavedCombinationJson(item) {
    if (!item) return;
    const normalized = normalizeCombinationForDisplay(item);
    const cleanCombination = { ...normalized };
    delete cleanCombination.source;
    const payload = {
      schema: COMBINATION_SCHEMA,
      version: 1,
      exportedAt: new Date().toISOString(),
      combinations: [cleanCombination]
    };
    const text = JSON.stringify(payload, null, 2);
    const blob = new Blob([text], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const safeName = String(normalized.name || 'constraint-combination')
      .trim()
      .replace(/[\\/:*?"<>|]+/g, '-')
      .replace(/\s+/g, ' ')
      .slice(0, 60) || 'constraint-combination';
    const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z').replace('T', '-');
    a.href = url;
    a.download = `${safeName}-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showComboToast(`‘${normalized.name || '저장 조합'}’ JSON 파일을 내보냈습니다.`);
  }

  function renameLocalCombination(id) {
    const item = localConstraintCombinations.find(record => record.id === id);
    if (!item) return;
    const nextName = window.prompt('제약 조합 이름을 수정해 주세요.', item.name || '');
    if (nextName === null) return;
    const trimmed = String(nextName).trim();
    if (!trimmed) {
      showComboToast('제약 조합 이름은 비워둘 수 없습니다.');
      return;
    }
    item.name = trimmed;
    item.updatedAt = new Date().toISOString();
    writeLocalConstraintCombinations();
    renderSavedCombinations();
    showComboToast(`조합 제목을 ‘${trimmed}’(으)로 수정했습니다.`);
  }

  function toggleSavedCombinationList(id, source) {
    const key = `${source}:${id}`;
    if (collapsedCombinationIds.has(key)) collapsedCombinationIds.delete(key);
    else collapsedCombinationIds.add(key);
    renderSavedCombinations();
  }

  function saveCurrentCombination() {
    const name = String(comboNameInput?.value || '').trim();
    const ids = selectedIds();
    if (!ids.length) {
      showComboToast('저장할 제약을 먼저 선택해 주세요.');
      return;
    }
    if (!name) {
      showComboToast('제약 조합 이름을 입력해 주세요.');
      comboNameInput?.focus();
      return;
    }
    const record = buildCombinationRecord(name);
    localConstraintCombinations.push(record);
    collapsedCombinationIds.add(`local:${record.id}`);
    const stored = writeLocalConstraintCombinations();
    renderSavedCombinations();
    if (comboNameInput) comboNameInput.value = '';
    try {
      exportLocalCombinationsJson();
      showComboToast(stored ? '제약 조합을 저장했고 JSON 파일도 추출했습니다.' : '브라우저 저장은 실패했지만 JSON 파일은 추출했습니다.');
    } catch (error) {
      console.warn('JSON 추출 실패', error);
      showComboToast(stored ? '조합은 저장했지만 JSON 파일 추출에 실패했습니다.' : '조합 저장과 JSON 추출에 실패했습니다.');
    }
  }

  function findSavedCombination(id, source) {
    const list = source === 'site' ? normalizedDefaultCombinations() : localConstraintCombinations;
    return list.find(item => item.id === id) || null;
  }

  function loadSavedCombination(item) {
    if (!item || !Array.isArray(item.selectedIds)) return;
    try {
      selected.clear();
      selectedOrder.length = 0;
      item.selectedIds.forEach(id => {
        if (!constraintRecord(id)) return;
        selected.add(id);
        selectedOrder.push(id);
      });
      saveState();
      updateAll();
      lastSelectionKey = '';
      scheduleSync(0, true);
      setComboDrawerOpen(false);
      showComboToast(`‘${item.name || '저장 조합'}’을 불러왔습니다.`);
    } catch (error) {
      console.warn('저장 조합 불러오기 실패', error);
      showComboToast('저장 조합을 불러오지 못했습니다.');
    }
  }

  function deleteLocalCombination(id) {
    const before = localConstraintCombinations.length;
    localConstraintCombinations = localConstraintCombinations.filter(item => item.id !== id);
    if (localConstraintCombinations.length === before) return;
    collapsedCombinationIds.delete(`local:${id}`);
    writeLocalConstraintCombinations();
    renderSavedCombinations();
    showComboToast('저장된 제약 조합을 삭제했습니다.');
  }

  function initCombinationDrawer() {
    if (!comboDrawer || !comboDrawerToggle) return;
    comboDrawerToggle.addEventListener('click', () => setComboDrawerOpen(!comboDrawerOpen));
    comboSaveTab?.addEventListener('click', () => setCombinationTab('save'));
    comboSavedTab?.addEventListener('click', () => setCombinationTab('saved'));
    comboSaveButton?.addEventListener('click', saveCurrentCombination);
    comboSavedList?.addEventListener('click', event => {
      const renameButton = event.target.closest('[data-rename-combination]');
      if (renameButton) {
        renameLocalCombination(renameButton.dataset.renameCombination);
        return;
      }

      const loadButton = event.target.closest('[data-load-combination]');
      if (loadButton) {
        const item = findSavedCombination(loadButton.dataset.loadCombination, loadButton.dataset.source);
        loadSavedCombination(item);
        return;
      }

      const toggleButton = event.target.closest('[data-toggle-combination]');
      if (toggleButton) {
        toggleSavedCombinationList(toggleButton.dataset.toggleCombination, toggleButton.dataset.source);
        return;
      }

      const exportButton = event.target.closest('[data-export-combination]');
      if (exportButton) {
        const item = findSavedCombination(exportButton.dataset.exportCombination, exportButton.dataset.source);
        exportSavedCombinationJson(item);
        return;
      }

      const deleteButton = event.target.closest('[data-delete-combination]');
      if (deleteButton) deleteLocalCombination(deleteButton.dataset.deleteCombination);
    });
    comboNameInput?.addEventListener('keydown', event => {
      if (event.key === 'Enter' && !event.isComposing) {
        event.preventDefault();
        saveCurrentCombination();
      }
    });
    comboSearchInput?.addEventListener('input', event => {
      comboSearchQuery = String(event.target.value || '');
      if (comboSearchQuery.trim()) setCombinationTab('saved');
      else renderSavedCombinations();
    });
    comboSearchInput?.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        comboSearchInput.value = '';
        comboSearchQuery = '';
        renderSavedCombinations();
      }
    });
    renderSavedCombinations();
    updateCombinationDrawerCurrent(selectedIds(), true);
  }

  const mappedIds = new Set([
    '1-1','2-1','3-1',
    '1-3','2-3','3-3',
    '1-4','2-4','3-4',
    '1-5','2-5',
    '1-9','2-9',
    '1-10','1-14',
    '1-16','2-16',
    '1-17','2-17',
    '1-22','2-22',
    '2-10','2-23','3-23',
    '3-10','3-12','3-13'
  ]);

  const TIME_MODE_STORAGE_KEY = 'endfield.constraint.application.timeMode.v1';
  let timeMode = (() => { try { return localStorage.getItem(TIME_MODE_STORAGE_KEY) === 'dps' ? 'dps' : 'practical'; } catch { return 'practical'; } })();
  function renderTimeModeButtons(){timeModeButtons.forEach(button=>{const active=button.dataset.timeMode===timeMode;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});}
  function setTimeMode(next){timeMode=next==='dps'?'dps':'practical';try{localStorage.setItem(TIME_MODE_STORAGE_KEY,timeMode);}catch{}renderTimeModeButtons();if(childReady&&frame?.contentWindow)frame.contentWindow.postMessage({type:'constraint-time-mode',mode:timeMode},'*');}

  let childReady = false;
  let lastPayload = null;
  let lastSelectionKey = '';
  let syncTimer = 0;

  function setScrollableFrameHeight() {
    const viewportBased = Math.round(window.innerHeight * 0.72);
    const height = Math.max(560, Math.min(900, viewportBased));
    frame.style.height = `${height}px`;
  }

  function selectedIds() {
    try {
      return Array.from(selected);
    } catch (error) {
      return [];
    }
  }

  function selectedScore(ids) {
    return ids.reduce((sum, id) => {
      try {
        return sum + (Number(getCard(id)?.pts) || 0);
      } catch (error) {
        return sum;
      }
    }, 0);
  }

  function updateTopbar(ids) {
    const score = selectedScore(ids);
    if (topSelectedCount) topSelectedCount.textContent = String(ids.length);
    if (topScore) topScore.textContent = String(score);
    if (dashboardSelectedCount) dashboardSelectedCount.textContent = String(ids.length);
    if (dashboardScore) dashboardScore.textContent = String(score);

    if (dashboardTotalCount) {
      try {
        dashboardTotalCount.textContent = String(getAllCards().filter(card => !card.empty).length);
      } catch (error) {
        dashboardTotalCount.textContent = '46';
      }
    }
  }

  function applyBoardFilters() {
    const query = activeBoardQuery.trim().toLowerCase();

    document.querySelectorAll('#grid-area .card[data-card-id]').forEach(element => {
      const typeMatches = activeTypeFilter === 'all' || element.dataset.type === activeTypeFilter;
      const tierMatches = activeTierFilter === 'all' || element.dataset.tier === activeTierFilter;
      const queryMatches = !query || (element.dataset.search || '').includes(query);
      const matches = typeMatches && tierMatches && queryMatches;

      element.classList.toggle('constraint-filter-muted', !matches);
      element.setAttribute('aria-hidden', matches ? 'false' : 'true');
    });
  }

  function setActiveFilter(buttons, selectedButton) {
    buttons.forEach(button => button.classList.toggle('active', button === selectedButton));
  }

  function updateStatus() {}

  function syncResults(force = false) {
    const ids = selectedIds();
    const key = ids.slice().sort().join('|');
    updateTopbar(ids);
    updateCombinationDrawerCurrent(ids);

    if (!force && key === lastSelectionKey) return;
    lastSelectionKey = key;

    lastPayload = {
      type: 'v21-constraint-selection',
      ids,
      selectedCount: ids.length,
      timeMode
    };
    updateStatus(ids);

    if (childReady && frame.contentWindow) {
      frame.contentWindow.postMessage(lastPayload, '*');
    }
  }

  function scheduleSync(delay = 0, force = false) {
    window.clearTimeout(syncTimer);
    syncTimer = window.setTimeout(() => syncResults(force), delay);
  }

  window.addEventListener('message', event => {
    const data = event.data || {};

    if (data.type === 'constraint-engine-ready') {
      childReady = true;
      syncResults(true);
      return;
    }

    if (data.type === 'constraint-results-height') {
      /* 결과 전체 높이로 iframe을 늘리면 iframe 위에서 휠이 부모 페이지에 전달되지 않습니다.
         결과 영역 자체에 세로 스크롤이 생기도록 화면 높이 기준으로 고정합니다. */
      setScrollableFrameHeight();
      return;
    }

    if (data.type === 'constraint-results-applied') {
      updateStatus(selectedIds(), data.appliedCount);
    }
  });

  frame.addEventListener('load', () => {
    childReady = false;
    scheduleSync(250, true);
  });

  /* V21의 선택 함수가 다시 그려진 직후와 실제 클릭 직후 모두 동기화합니다. */
  try {
    const originalUpdateAll = updateAll;
    updateAll = function(...args) {
      const result = originalUpdateAll.apply(this, args);
      applyBoardFilters();
      scheduleSync(0);
      return result;
    };
  } catch (error) {
    // 아래 클릭 감시와 상태 감시가 동일 기능을 보완합니다.
  }

  renderTimeModeButtons();
  timeModeButtons.forEach(button => button.addEventListener('click', () => setTimeMode(button.dataset.timeMode)));

  boardSearch?.addEventListener('input', event => {
    activeBoardQuery = event.target.value || '';
    applyBoardFilters();
  });

  typeFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
      activeTypeFilter = button.dataset.filter || 'all';
      setActiveFilter(typeFilterButtons, button);
      applyBoardFilters();
    });
  });

  tierFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
      activeTierFilter = button.dataset.tier || 'all';
      setActiveFilter(tierFilterButtons, button);
      applyBoardFilters();
    });
  });

  document.addEventListener('click', event => {
    if (event.target.closest('#grid-area .card, .panel-del, .panel-reset-btn, .constraint-top-reset, .constraint-selection-reset')) {
      scheduleSync(30);
    }
  });

  /* 스크립트 래핑 여부와 관계없이 선택 Set의 실제 변화를 감지합니다. */
  window.setInterval(() => syncResults(false), 180);
  window.addEventListener('resize', setScrollableFrameHeight);

  setScrollableFrameHeight();
  applyBoardFilters();
  initCombinationDrawer();
  syncResults(true);
})();
