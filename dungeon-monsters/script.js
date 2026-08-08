

const selected = new Set();
const selectedOrder = [];
let lastSelectedId = null;
let flashCardId = null;
let panelNewItemId = null;

const exitingPanelItems = new Map();
const PANEL_EXIT_MS = 240;


function getAllCards(){
  return ROWS.flatMap(r => r.cards);
}

function getCard(id){
  return getAllCards().find(c => c.id === id);
}

function getTier(id){
  return ROWS.find(r => r.cards.some(c => c.id === id))?.tier || 1;
}

function removeFromOrder(id){
  const i = selectedOrder.indexOf(id);
  if(i !== -1) selectedOrder.splice(i, 1);
}

function startPanelExit(id){
  if(exitingPanelItems.has(id)) return;

  const card = getCard(id);
  if(!card) return;

  exitingPanelItems.set(id, {
    card,
    tier: getTier(id)
  });

  setTimeout(() => {
    exitingPanelItems.delete(id);
    removeFromOrder(id);
    updateAll();
  }, PANEL_EXIT_MS);
}

function deselectCard(id, animate = true){
  selected.delete(id);

  if(animate){
    startPanelExit(id);
  }
  else{
    removeFromOrder(id);
  }
}

function isGroupSelected(group){
  return getAllCards().some(c =>
    c.group === group &&
    selected.has(c.id)
  );
}

function isDisabled(card){
  if(card.requiresAny){
    return !card.requiresAny.some(id => selected.has(id));
  }

  return false;
}

function isGroupConflict(card){
  if(!card.group) return false;
  if(selected.has(card.id)) return false;

  return getAllCards().some(c =>
    c.group === card.group &&
    selected.has(c.id)
  );
}

function toggleCard(id){
  const card = getCard(id);

  if(!card) return;
  if(isDisabled(card)) return;

  if(selected.has(id)){
    deselectCard(id, true);

    removeDependentCards();

    saveState();
    updateAll();
    return;
  }

  if(card.group){
    getAllCards()
      .filter(c =>
        c.group === card.group &&
        selected.has(c.id)
      )
      .forEach(c => {
        deselectCard(c.id, true);
      });
  }

  selected.add(id);

  if(!selectedOrder.includes(id)){
    selectedOrder.push(id);
  }

  lastSelectedId = id;
  flashCardId = id;
  panelNewItemId = id;
  removeDependentCards();

  saveState();
  updateAll();

  flashCardId = null;
}

function removeDependentCards(){
  getAllCards().forEach(card => {
    if(!card.requiresAny) return;

    const unlocked = card.requiresAny.some(id => selected.has(id));

    if(!unlocked && selected.has(card.id)){
      deselectCard(card.id, true);
    }
  });
}

function buildGrid(){
  const area = document.getElementById('grid-area');
  area.innerHTML = '';

  ROWS.forEach(({tier, cards}) => {
    const wrap = document.createElement('div');
    wrap.className = 'row-wrap';

    wrap.innerHTML = `
      <div class="tier-bar t${tier}"></div>

      <div class="row-label">
        <span class="tier-num">${tier}</span>
        <span class="tier-icon">★</span>
      </div>
    `;

    const row = document.createElement('div');
    row.className = 'cards-row';

    cards.forEach(card => {
      const el = document.createElement('div');
      el.className = 'card';
      el.style.gridColumn = card.col;

      if(card.lineTop) el.classList.add('line-top');
      if(card.lineBottom) el.classList.add('line-bottom');
      if(card.lineLeft) el.classList.add('line-left');
      if(card.lineRight) el.classList.add('line-right');


      if(card.empty){
        el.classList.add('empty');

        if(card.connectorOnly){
          el.classList.add('connector-only');
        }

        el.innerHTML = `
          <span class="conn top"></span>
          <span class="conn bottom"></span>
          <span class="conn left"></span>
          <span class="conn right"></span>

          ${card.connectorOnly ? '' : '<div class="card-x"></div>'}
        `;

        row.appendChild(el);
        return;
      }

      const disabled = isDisabled(card);
      const conflict = isGroupConflict(card);

      if(selected.has(card.id)) el.classList.add('selected');

      if(card.id === flashCardId && selected.has(card.id)){
        el.classList.add('select-flash');
      
        setTimeout(() => {
          el.classList.remove('select-flash');
        }, 450);
      }
      if(disabled) el.classList.add('disabled');
      if(conflict) el.classList.add('group-conflict');
      if(card.key) el.classList.add('key-card');
      if(card.unlockable) el.classList.add('unlockable-card');

      el.innerHTML = `
        <span class="conn top"></span>
        <span class="conn bottom"></span>
        <span class="conn left"></span>
        <span class="conn right"></span>

        <div class="card-icon">
          <img src="${card.icon}" alt="${card.name}" draggable="false">
        </div>

        <div class="card-check">✓</div>
        
        ${conflict ? '<div class="conflict-dim"></div>' : ''}

        <div class="conflict-text">충돌</div>
        <div class="conflict-mark">⊘</div>

        <div class="card-tooltip">
          <div class="tooltip-title">${card.name}</div>
        
          <div class="tooltip-desc">
            ${colorizeDesc(card.desc || '설명이 없습니다.')}
          </div>
        </div>
        
        ${disabled ? '<div class="lock-mark">🔒</div>' : ''}
      `;

     if(!disabled){
      el.addEventListener('click', (e) => {
      
        if(dragMoved){
          e.preventDefault();
          return;
        }
      
        toggleCard(card.id);
      });
    
      el.addEventListener('mouseenter', () => {
        showFloatingTooltip(card, el);
      });
    
      el.addEventListener('mouseleave', () => {
        hideFloatingTooltip();
      });
    }

      row.appendChild(el);
    });

    wrap.appendChild(row);
    area.appendChild(wrap);
  });
}

function renderPanel(){
  const list = document.getElementById('panel-list');
  const count = document.getElementById('selected-count');
  const score = document.getElementById('selected-score');

  count.textContent = selected.size;
  if(score){
    let total = 0;
    selected.forEach(id => {
      const card = getCard(id);
      if(card) total += card.pts;
    });
    score.textContent = `${total}★`;
  }

  if(selected.size === 0){
    list.innerHTML = `
      <div class="panel-empty">
        <strong>선택된 지표가 없습니다.</strong>
        <span>왼쪽 지표를 눌러 구성에 추가하세요.</span>
        <div class="panel-empty-guide">
          <b>팀</b> 오퍼레이터 관련 제약<br>
          <b>조작</b> 적 및 조작 관련 제약<br>
          <b>환경</b> 전장과 상호작용 관련 제약
        </div>
        <small>지표 정보 탭에서는 동일한 연결 구조와 상세 효과를 넓게 확인할 수 있습니다.</small>
      </div>
    `;
    return;
  }

  list.innerHTML = '';

  selectedOrder
    .filter(id => selected.has(id) || exitingPanelItems.has(id))
    .forEach(id => {
      const exiting = exitingPanelItems.get(id);
      const card = exiting ? exiting.card : getCard(id);
      const tier = exiting ? exiting.tier : getTier(id);
      
      const item = document.createElement('div');
      item.className = `panel-item tier-${tier}`;
      
      if(id === panelNewItemId && selected.has(id)){
        item.classList.add('new-item');
      }
      
      if(exitingPanelItems.has(id) && !selected.has(id)){
        item.classList.add('removing-item');
      }

      item.innerHTML = `
        <div class="panel-score">${card.pts}★</div>

        <div class="panel-icon">
          <img src="${card.icon}" alt="${card.name}" draggable="false">
        </div>

          <div class="panel-content">
            <div class="panel-name">${card.name}</div>
            <div class="panel-desc">
              ${colorizeDesc(
                card.desc || '설명이 아직 입력되지 않았습니다.'
              )}
            </div>
          </div>

        <button class="panel-del">×</button>
      `;

      item.querySelector('.panel-del')
        .addEventListener('click', () => {
          deselectCard(id, true);
          removeDependentCards();
                
          saveState();
          updateAll();
        });

      list.prepend(item);
    });
  panelNewItemId = null;
}

function updateTotal(){
  let total = 0;
  selected.forEach(id => {
    const card = getCard(id);
    if(card) total += card.pts;
  });
  const totalElement = document.getElementById('total-pts');
  if(totalElement) totalElement.textContent = total;
  const warning = document.getElementById('warn-text');
  if(warning) warning.classList.toggle('visible', total >= 25);
  const scoreBox = document.querySelector('.total-score');
  if(scoreBox) scoreBox.classList.toggle('danger', total >= 25);
}

function getType(card){
  if(card.name.startsWith('팀:')) return 'team';
  if(card.name.startsWith('조작:')) return 'control';
  if(card.name.startsWith('환경:')) return 'env';
  return 'etc';
}

function updateStatsHud(){
  // 분포 분석 UI는 제거되었지만, 기존 호출과의 호환성을 위해 함수를 유지합니다.
}

function updateAll(){
  buildGrid();
  renderPanel();
  updateTotal();
}

const floatingTooltip = document.createElement('div');
floatingTooltip.className = 'floating-tooltip';
document.body.appendChild(floatingTooltip);

function showFloatingTooltip(card, el){
  const rect = el.getBoundingClientRect();

  floatingTooltip.innerHTML = `
    <div class="tooltip-title">${card.name}</div>
    <div class="tooltip-desc">
      ${colorizeDesc(card.desc || '설명이 없습니다.')}
    </div>
  `;

  floatingTooltip.style.left = `${rect.left + rect.width / 2}px`;
  floatingTooltip.style.top = `${rect.top - 18}px`;
  
  floatingTooltip.classList.add('visible');
}

function hideFloatingTooltip(){
  floatingTooltip.classList.remove('visible');
}

const boardWrap = document.querySelector('.board-wrap');

boardWrap.addEventListener('wheel', (e) => {
  if(Math.abs(e.deltaY) > Math.abs(e.deltaX)){
    e.preventDefault();
    boardWrap.scrollLeft += e.deltaY;
  }
}, { passive:false });

let isDragging = false;
let startX = 0;
let scrollLeft = 0;
let dragMoved = false;

boardWrap.addEventListener('mousedown', (e) => {

  if(
    e.target.closest('.panel-item') ||
    e.target.closest('.panel-del') ||
    e.target.closest('.floating-tooltip')
  ){
    return;
  }

  isDragging = true;
  dragMoved = false;

  boardWrap.classList.add('dragging');

  startX = e.pageX - boardWrap.offsetLeft;
  scrollLeft = boardWrap.scrollLeft;
});

window.addEventListener('mouseup', () => {
  isDragging = false;

  boardWrap.classList.remove('dragging');

  setTimeout(() => {
    dragMoved = false;
  }, 0);
});

boardWrap.addEventListener('mousemove', (e) => {

  if(!isDragging) return;

  e.preventDefault();

  const x = e.pageX - boardWrap.offsetLeft;

  const walk = (x - startX) * 1.15;

  if(Math.abs(walk) > 4){
    dragMoved = true;
  }

  boardWrap.scrollLeft = scrollLeft - walk;
});


function resetSelected(){
  selected.clear();
  selectedOrder.length = 0;
  
  saveState();
  updateAll();
}


function colorizeDesc(text){

  return text

    .replace(
      /방어불능/g,
      '<span class="defense-text">방어불능</span>'
    )

    .replace(
      /아츠부착/g,
      '<span class="arts-text">아츠부착</span>'
    )

    .replace(
      /([+-]?\d+%|[+-]?\d+초)/g,
      '<span class="yellow-text">$1</span>'
    );
}


function saveState(){
  try{
    const selectedOnly = selectedOrder.filter(id => selected.has(id));
    localStorage.setItem('selectedConstraints', JSON.stringify(selectedOnly));
  }
  catch(error){
    console.warn('지표 선택 상태를 저장하지 못했습니다.');
  }
}

function loadState(){
  try{
    const saved = localStorage.getItem('selectedConstraints');
    if(saved){
      const arr = JSON.parse(saved);
      arr.forEach(id => {
        selected.add(id);
        if(!selectedOrder.includes(id)) selectedOrder.push(id);
      });
    }
  }
  catch(error){
    console.warn('지표 저장 데이터 복원 실패');
  }
  removeDependentCards();
  updateAll();
}

const screenFlash = document.createElement('div');
screenFlash.className = 'screen-flash';
document.body.appendChild(screenFlash);

function playScreenFlash(){
  screenFlash.classList.remove('active');
  void screenFlash.offsetWidth;
  screenFlash.classList.add('active');
}


const resultScreen = document.getElementById('result-screen');
const resultBtn = document.querySelector('.result-btn');

let isResultOpen = false;

if(resultScreen && resultBtn){
  resultBtn.addEventListener('click', () => {
    isResultOpen = !isResultOpen;

    resultScreen.classList.toggle('active', isResultOpen);

    resultBtn.textContent = isResultOpen
      ? '돌아가기'
      : '선택 결과';
  });
}

loadState();
