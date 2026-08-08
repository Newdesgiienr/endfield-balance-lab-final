(() => {
  'use strict';

  const isEmbedded = new URLSearchParams(location.search).get('embed') === '1';
  if (!isEmbedded) return;

  const controlIds = [
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

  const byId = id => document.getElementById(id);
  window.CONSTRAINT_SELECTED_IDS = [];
  window.CONSTRAINT_RESULT_TIME_MODE = 'practical';
  let resizeObserver = null;
  let mutationObserver = null;
  let reportTimer = 0;

  function setChecked(id, checked) {
    const el = byId(id);
    if (el) el.checked = Boolean(checked);
  }

  function setValue(id, value) {
    const el = byId(id);
    if (el) el.value = String(value);
  }

  function resetControls() {
    controlIds.forEach(id => setChecked(id, false));
  }

  function applyOne(id) {
    switch (id) {
      case '1-1': setChecked('comboStatEnabled', true); setValue('comboStatReduction', 10); break;
      case '2-1': setChecked('comboStatEnabled', true); setValue('comboStatReduction', 20); break;
      case '3-1': setChecked('comboStatEnabled', true); setValue('comboStatReduction', 40); break;

      case '1-3': setChecked('comboTimeEnabled', true); setValue('comboTimeReduction', 100); break;
      case '2-3': setChecked('comboTimeEnabled', true); setValue('comboTimeReduction', 200); break;
      case '3-3': setChecked('comboTimeEnabled', true); setValue('comboTimeReduction', 300); break;

      case '1-4': setChecked('comboHpEnabled', true); setValue('comboHpIncrease', 50); break;
      case '2-4': setChecked('comboHpEnabled', true); setValue('comboHpIncrease', 100); break;
      case '3-4': setChecked('comboHpEnabled', true); setValue('comboHpIncrease', 200); break;

      case '1-5':
        setChecked('comboStatusWindowEnabled', true);
        setValue('comboStatusWindowDuration', 10);
        setValue('comboStatusWindowReduction', 45);
        break;
      case '2-5':
        setChecked('comboStatusWindowEnabled', true);
        setValue('comboStatusWindowDuration', 10);
        setValue('comboStatusWindowReduction', 90);
        break;

      case '1-9': setChecked('comboUltRepeatEnabled', true); setValue('comboUltRepeatReduction', 50); break;
      case '2-9': setChecked('comboUltRepeatEnabled', true); setValue('comboUltRepeatReduction', 100); break;

      case '1-10':
        setChecked('comboStatusReapplyEnabled', true);
        setValue('comboStatusReapplyInterval', 5);
        break;

      case '1-14':
        setChecked('comboStatusStageEnabled', true);
        setValue('comboStatusStageDuration', 1);
        setValue('comboStatusStageReduction', 10);
        break;

      case '1-16':
        setChecked('comboBattleChillEnabled', true);
        setValue('comboBattleChillStage', 1);
        setValue('comboBattleChillCooldown', 3);
        break;
      case '2-16':
        setChecked('comboBattleChillEnabled', true);
        setValue('comboBattleChillStage', 2);
        setValue('comboBattleChillCooldown', 3);
        break;

      case '1-17':
        setChecked('comboComboChillEnabled', true);
        setValue('comboComboChillStage', 1);
        setValue('comboComboChillCooldown', 3);
        break;
      case '2-17':
        setChecked('comboComboChillEnabled', true);
        setValue('comboComboChillStage', 2);
        setValue('comboComboChillCooldown', 3);
        break;

      case '1-22':
        setChecked('comboControlRecoveryEnabled', true);
        setValue('comboControlRecoveryRate', 5);
        break;
      case '2-22':
        setChecked('comboControlRecoveryEnabled', true);
        setValue('comboControlRecoveryRate', 15);
        break;

      case '2-10':
        setChecked('comboHighHpCapEnabled', true);
        setValue('comboHighHpThreshold', 100000);
        setValue('comboHighHpCapRate', 25);
        break;

      case '2-23':
        setChecked('comboStageEnhanceEnabled', true);
        setValue('comboStageEnhanceLevel', 1);
        break;
      case '3-23':
        setChecked('comboStageEnhanceEnabled', true);
        setValue('comboStageEnhanceLevel', 2);
        break;

      case '3-10':
        setChecked('comboNormalEnabled', true);
        setValue('comboNormalReduction', 70);
        break;

      case '3-12':
        setChecked('comboComboSpeedEnabled', true);
        setValue('comboComboCooldownReduction', 60);
        setValue('comboSpeedBattleReduction', 60);
        break;

      case '3-13':
        setChecked('comboSkillOtherEnabled', true);
        setValue('comboBattleReduction', 60);
        setValue('comboOtherIncrease', 100);
        break;

      default:
        return false;
    }
    return true;
  }

  function triggerCalculation() {
    const trigger = byId('comboTimeEnabled') || controlIds.map(byId).find(Boolean);
    if (!trigger) return;
    trigger.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function measuredHeight() {
    const root = byId('embedded-party-results-root');
    if (!root) return 860;
    const rootRect = root.getBoundingClientRect();
    return Math.ceil(Math.max(
      rootRect.height,
      root.scrollHeight,
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    ));
  }

  function reportHeight(delay = 0) {
    window.clearTimeout(reportTimer);
    reportTimer = window.setTimeout(() => {
      parent.postMessage({
        type: 'constraint-results-height',
        height: measuredHeight()
      }, '*');
    }, delay);
  }

  function applySelection(ids, selectedCount, timeMode) {
    window.CONSTRAINT_SELECTED_IDS = Array.isArray(ids) ? ids.slice() : [];
    if (timeMode === 'dps' || timeMode === 'practical') window.CONSTRAINT_RESULT_TIME_MODE = timeMode;
    resetControls();
    let appliedCount = 0;

    (Array.isArray(ids) ? ids : []).forEach(id => {
      if (applyOne(id)) appliedCount += 1;
    });

    /* V21에서 과속과 충격은 동일 충돌 그룹이므로 동시에 선택되지 않습니다. */
    if (byId('comboSkillOtherEnabled')?.checked && byId('comboComboSpeedEnabled')?.checked) {
      setChecked('comboSkillOtherEnabled', false);
    }

    triggerCalculation();

    window.setTimeout(() => {
      reportHeight(20);
      parent.postMessage({
        type: 'constraint-results-applied',
        selectedCount: Number(selectedCount) || 0,
        appliedCount
      }, '*');
    }, 90);
  }

  function prepareEmbeddedView() {
    document.documentElement.classList.add('embed-results');
    document.body.classList.add('embed-results');

    const resultStack = byId('comboPartyResults');
    if (!resultStack) return;

    const root = document.createElement('main');
    root.id = 'embedded-party-results-root';
    root.appendChild(resultStack);
    document.body.appendChild(root);

    /* 원본 제약 밸런싱의 파티 결과 펼치기 기능을 그대로 유지합니다. */
    root.querySelectorAll('details.constraint-party-fold').forEach(details => {
      details.open = false;
      details.addEventListener('toggle', () => reportHeight(40));
    });

    resizeObserver = new ResizeObserver(() => reportHeight(20));
    resizeObserver.observe(root);

    mutationObserver = new MutationObserver(() => reportHeight(30));
    mutationObserver.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['open', 'class', 'style']
    });

    reportHeight(30);
  }

  window.addEventListener('message', event => {
    const data = event.data || {};
    if (data.type === 'v21-constraint-selection') { applySelection(data.ids, data.selectedCount, data.timeMode); return; }
    if (data.type === 'constraint-time-mode') { window.CONSTRAINT_RESULT_TIME_MODE = data.mode === 'dps' ? 'dps' : 'practical'; triggerCalculation(); }
  });

  window.addEventListener('resize', () => reportHeight(40));

  window.addEventListener('load', () => {
    window.setTimeout(() => {
      prepareEmbeddedView();
      parent.postMessage({ type: 'constraint-engine-ready' }, '*');
    }, 180);
  });
})();
