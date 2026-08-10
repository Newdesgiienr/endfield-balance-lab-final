const WIKI_FILE = file => `https://endfield.wiki.gg/wiki/Special:Redirect/file/${encodeURIComponent(file)}`;
const CURRENCY_ICON='assets/rewards/crystal.png';
const SHOP_STORAGE='endfield-reward-shop-v5-r9';
const BOARD_SECOND_PHASE=new Set(['3-3','1-11','2-18','2-23','3-23']);

const SHOP_ITEMS=[
 {img:'shop-01.png',file:'Sticker Contingency Contract.png',name:'스티커 · 위기 협약',qty:'1',price:'200',limit:'1'},
 {img:'shop-02.png',file:'Oroberyl.png',name:'오로베릴',qty:'100',price:'50',limit:'20'},
 {img:'shop-03.png',file:'Coolant Gel.png',name:'냉각제',qty:'20',price:'15',limit:'30'},
 {img:'shop-04.png',file:'Advanced Progression Selection Crate Ⅰ.png',name:'고급 육성 선택 상자 I',qty:'1',price:'30',limit:'10'},
 {img:'shop-05.png',file:'T-Creds.png',name:'탈로시안 화폐',qty:'10000',price:'30',limit:'75',note:'한정 교환'},
 {img:'shop-06.png',file:'Protohedron.png',name:'프로토콜 프리즘 세트',qty:'3',price:'20',limit:'75'},
 {img:'shop-07.png',file:'Mark of Perseverance.png',name:'존속의 흔적',qty:'1',price:'60',limit:'10'},
 {img:'shop-09.png',file:'Metadiastima Photoemission Tube.png',name:'초거리 빛 반사 파이프',qty:'1',price:'15',limit:'15'},
 {img:'shop-10.png',file:'D96 Steel Sample 4.png',name:'D96강 시제품 4번',qty:'1',price:'15',limit:'15'},
 {img:'shop-11.png',file:'Tachyon Screening Lattice.png',name:'타키온 차폐 구조체',qty:'1',price:'15',limit:'15'},
 {img:'shop-12.png',file:'Quadrant Fitting Fluid.png',name:'정합용 유체',qty:'1',price:'15',limit:'15'},
 {img:'shop-13.png',file:'Triphasic Nanoflake.png',name:'3상 나노플레이크 칩',qty:'1',price:'15',limit:'15'},
 {img:'shop-15.png',file:'Advanced Cognitive Carrier.png',name:'고급 인지 매개체',qty:'1',price:'15',limit:'30'},
 {img:'shop-16.png',file:'Protoset.png',name:'프로토콜 디스크 세트',qty:'2',price:'15',limit:'10'},
 {img:'shop-18.png',file:'Arms INSP Set.png',name:'무기 점검 세트',qty:'3',price:'20',limit:'20'},
 {img:'shop-19.png',file:'Heavy Cast Die.png',name:'중형 모형 틀',qty:'2',price:'15',limit:'10'},
 {img:'shop-20.png',file:'T-Creds.png',name:'탈로시안 화폐',qty:'500',price:'5',limit:'∞',note:'상점의 다른 한정 품목을 모두 구매하면 개방',excludeFromSettlement:true}
];

const C={
 attack1:{name:'조작: 공격 I',stars:1,effect:'적이 주는 피해 +30%',icon:'공격1.png'},
 attack2:{name:'조작: 공격 II',stars:2,effect:'적이 주는 피해 +80%',icon:'공격2.png'},
 active1:{name:'조작: 활성 I',stars:1,effect:'적 생명력 +50%',icon:'활성1.png'},
 anaerobic:{name:'환경: 호흡 불가',stars:1,effect:'기력 회복 속도 -50%',icon:'호흡.png'},
 overspeed:{name:'환경: 과속',stars:3,effect:'오퍼레이터 연계 스킬 쿨타임 -60%, 배틀 스킬 피해 -60%',icon:'과속.png'},
 suppress1:{name:'팀: 억제 I',stars:1,effect:'오퍼레이터가 적의 방어불능 또는 아츠 부착 스택을 증가시키면 해당 유형 피해 -45%, 10초간 지속',icon:'억제1.png'},
 attach:{name:'조작: 부착',stars:1,effect:'적에게 부착된 방어불능 또는 아츠 부착 1단계마다 해당 스택에 대응하는 피해 -10%',icon:'모름1.png'},
 hypo1:{name:'팀: 저체온증 I',stars:1,effect:'배틀 스킬을 2회 사용할 때마다 메인 컨트롤 오퍼레이터에게 냉기 부착 1스택. 오퍼레이터별 쿨타임 3초',icon:'한기1.png'},
 heatloss1:{name:'팀: 열 손실 I',stars:1,effect:'연계 스킬을 2회 사용할 때마다 메인 컨트롤 오퍼레이터에게 냉기 부착 1스택. 오퍼레이터별 쿨타임 3초',icon:'손실1.png'},
 shock:{name:'환경: 충격',stars:3,effect:'일반 공격·배틀 스킬·연계 스킬·궁극기 이외의 피해 +100%, 배틀 스킬 피해 -60%',icon:'충격.png'},
 rush:{name:'조작: 질주',stars:2,effect:'적 이동 속도 +100%, 0.1초 내에 받는 피해는 최대 생명력의 25%를 초과하지 않음',icon:'모름2.png'},
 sync:{name:'환경: 동시 성장',stars:2,effect:'메인 컨트롤 오퍼레이터가 일정량 회복하거나 보호막을 얻으면 전장의 모든 적도 최대 HP의 8% 회복',icon:'모름3.png'},
 exhaustion:{name:'팀: 쇠약',stars:3,effect:'받은 피해의 일부만큼 최대 생명력 감소 (근거리 30% / 원거리 50%)',icon:'쇠퇴.png'},
 toxic1:{name:'조작: 독성 I',stars:1,effect:'처치된 적이 독성 물질을 남기며 범위 안의 오퍼레이터는 매초 최대 생명력의 2% 피해',icon:'독성1.png'},
 heal1:{name:'조작: 치유 I',stars:1,effect:'적이 제어 효과의 영향을 받을 때 매초 최대 HP의 5% 회복',icon:'치유1.png'},
 reconstruct1:{name:'환경: 재구성 I',stars:2,effect:'최종 웨이브의 쌍뿔아겔로스·삼미아겔로스가 알파 개체로 변경 (체력 +50%)',icon:'재구성.png'},
 decap2:{name:'팀: 참수 II',stars:2,effect:'메인 컨트롤 오퍼레이터가 받는 피해 +100%',icon:'참수2.png'},
 wither2:{name:'환경: 쇠퇴 II',stars:2,effect:'웨이브 사이에 치유 물질이 생성되지 않음',icon:'쇠퇴2.png'},
 hypo2:{name:'팀: 저체온증 II',stars:2,effect:'배틀 스킬을 1회 사용할 때마다 메인 컨트롤 오퍼레이터에게 냉기 부착 1스택. 오퍼레이터별 쿨타임 3초',icon:'한기2.png'},
 heatloss2:{name:'팀: 열 손실 II',stars:2,effect:'연계 스킬을 1회 사용할 때마다 메인 컨트롤 오퍼레이터에게 냉기 부착 1스택. 오퍼레이터별 쿨타임 3초',icon:'손실2.png'},
 heatabsorb:{name:'조작: 열량 흡수',stars:2,effect:'적이 메인 컨트롤 오퍼레이터에게 냉기 부착을 부여하는 대신 즉시 동결',icon:'열량흡수.png'},
 bind:{name:'환경: 속박',stars:3,effect:'회피 불가',icon:'속박.png'},
 separate:{name:'환경: 분리',stars:2,effect:'전투 시작 후 메인 컨트롤 오퍼레이터 전환 불가',icon:'분리.png'}
};
const PERIODIC=[
 {no:'01',name:'압박 적응',note:'공격 I·활성 I·호흡 불가를 한 번에 선택하면 됩니다.',constraints:['attack1','active1','anaerobic']},
 {no:'02',name:'술식 교란',note:'과속을 먼저 선택한 뒤 억제 I·부착·저체온증 I·열 손실 I을 함께 선택합니다.',constraints:['overspeed','suppress1','attach','hypo1','heatloss1']},
 {no:'03',name:'전방위 압박',note:'충격·질주·동시 성장·쇠약을 한 번에 선택해 클리어합니다.',constraints:['shock','rush','sync','exhaustion']},
 {no:'04',name:'악의 증식',note:'과속을 먼저 선택한 뒤 활성 I·질주·독성 I·치유 I·재구성 I을 함께 선택합니다.',constraints:['overspeed','active1','rush','toxic1','heal1','reconstruct1']},
 {no:'05',name:'치유 고갈',note:'충격과 쇠약을 선택하고 공격·참수·쇠퇴는 II 단계로 선택합니다.',constraints:['shock','attack2','decap2','wither2','exhaustion']},
 {no:'06',name:'엔트로피 감소 진화',note:'과속을 먼저 선택한 뒤 저체온증 II·열 손실 II·열량 흡수를 함께 선택합니다.',constraints:['overspeed','hypo2','heatloss2','heatabsorb']},
 {no:'07',name:'동적 고정화',note:'충격을 먼저 선택한 뒤 속박·분리를 함께 선택합니다.',constraints:['shock','bind','separate']}
];
const SCORE_TASKS=[5,10,15,20];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const comma=v=>/^\d+$/.test(String(v))?Number(v).toLocaleString('ko-KR'):String(v);
const currencyImg=(cls='currency-icon')=>`<img class="${cls} hq-currency" data-hq="Vitrified Coin.png" data-fallback="${CURRENCY_ICON}" src="${CURRENCY_ICON}" alt="결정화 화폐">`;
const chevron=()=>`<span class="chevron-box" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3.5 6 8 10.5 12.5 6"/></svg></span>`;

let shopState=loadShopState();
function loadShopState(){try{const s=JSON.parse(localStorage.getItem(SHOP_STORAGE)||'null');if(Array.isArray(s)&&s.length===SHOP_ITEMS.length)return s;}catch{}return SHOP_ITEMS.map(x=>({qty:x.qty,price:x.price,limit:x.limit}));}
function saveShopState(){localStorage.setItem(SHOP_STORAGE,JSON.stringify(shopState));}
function resetShopState(){shopState=SHOP_ITEMS.map(x=>({qty:x.qty,price:x.price,limit:x.limit}));saveShopState();renderShop(document.getElementById('shop-search')?.value||'');}
function shopImage(item){const fallback=`assets/shop/${item.img}`;return `<img class="hq-icon" data-hq="${esc(item.file)}" data-fallback="${fallback}" src="${fallback}" alt="${esc(item.name)}">`;}
function editField(index,key,value,prefix='',suffix=''){return `<div class="editable-cell">${prefix?`<span class="prefix">${prefix}</span>`:''}<input class="editable-input" type="text" inputmode="numeric" data-shop-index="${index}" data-shop-key="${key}" value="${esc(comma(value))}" aria-label="${key}">${suffix?`<span class="suffix">${suffix}</span>`:''}</div>`;}
function renderShop(filter=''){
 const q=filter.trim().toLowerCase();
 const rows=SHOP_ITEMS.map((item,index)=>({item,index})).filter(({item})=>item.name.toLowerCase().includes(q));
 document.getElementById('shop-count').textContent=rows.length;
 document.getElementById('shop-table').innerHTML=rows.map(({item,index})=>{const st=shopState[index];return `<article class="shop-row">
   <div class="shop-item">${shopImage(item)}<div><h3>${esc(item.name)}</h3>${item.note?`<small>${esc(item.note)}</small>`:''}</div></div>
   <div>${editField(index,'qty',st.qty,'×')}</div>
   <div>${editField(index,'limit',st.limit)}${item.excludeFromSettlement?'<span class="variant-tag">무한 교환</span>':''}</div>
   <div class="price-edit">${currencyImg()}<span class="currency-name">결정화 화폐</span>${editField(index,'price',st.price)}</div>
 </article>`;}).join('')||'<div class="empty-state">검색 결과가 없습니다.</div>';
 hydrateHQImages(document.getElementById('shop-table'));bindShopInputs();renderSettlement();
}
function bindShopInputs(){document.querySelectorAll('.editable-input').forEach(input=>{input.addEventListener('focus',()=>{input.value=input.value.replaceAll(',','')});input.addEventListener('input',()=>{shopState[+input.dataset.shopIndex][input.dataset.shopKey]=input.value;saveShopState();renderSettlement()});input.addEventListener('blur',()=>{const v=input.value.trim();shopState[+input.dataset.shopIndex][input.dataset.shopKey]=v;input.value=comma(v);saveShopState();renderSettlement()});});}

function shopNumber(value){const n=Number(String(value??'').replaceAll(',','').trim());return Number.isFinite(n)?n:null;}
function renderSettlement(){
 const grid=document.getElementById('settlement-grid');
 if(!grid)return;
 const grouped=new Map();
 let totalCost=0;
 SHOP_ITEMS.forEach((item,index)=>{
   if(item.excludeFromSettlement)return;
   const st=shopState[index]||{};
   const qty=shopNumber(st.qty),price=shopNumber(st.price),limit=shopNumber(st.limit);
   if(qty===null||price===null||limit===null)return;
   totalCost+=price*limit;
   if(!grouped.has(item.name))grouped.set(item.name,{item,qty:0});
   grouped.get(item.name).qty+=qty*limit;
 });
 const formattedTotal=Math.round(totalCost).toLocaleString('ko-KR');
 document.getElementById('settlement-total').textContent=formattedTotal;
 document.getElementById('settlement-total-large').textContent=formattedTotal;
 document.getElementById('settlement-item-count').textContent=grouped.size.toLocaleString('ko-KR');
 grid.innerHTML=[...grouped.values()].map(({item,qty})=>`<article class="settlement-item">${shopImage(item)}<div><h4>${esc(item.name)}</h4><span>전체 구매 시</span><strong>×${Number.isInteger(qty)?qty.toLocaleString('ko-KR'):qty.toLocaleString('ko-KR',{maximumFractionDigits:2})}</strong></div></article>`).join('');
 hydrateHQImages(grid);
}

function renderPeriodic(){
 const list=document.getElementById('periodic-list');
 list.innerHTML=PERIODIC.map((m,missionIndex)=>{const cs=m.constraints.map(k=>C[k]);const total=cs.reduce((a,c)=>a+c.stars,0);const rows=cs.map((c,i)=>`<div class="constraint-row"><div class="constraint-icon-cell"><span class="constraint-icon-box"><img src="assets/icons/${encodeURIComponent(c.icon)}" alt=""></span></div><div class="constraint-name-cell"><strong>${esc(c.name)}</strong><small>선택 제약 ${String(i+1).padStart(2,'0')}</small></div><div class="constraint-score">${c.stars}★</div><div class="constraint-effect">${esc(c.effect)}</div></div>`).join('');return `<details class="mission-card card" data-mission-index="${missionIndex}"><summary class="mission-summary"><div class="fold-number">${m.no}</div><div class="fold-title"><small>CYCLE MISSION</small><h3>${esc(m.name)}</h3><span>${esc(m.note)}</span></div><div class="fold-stat"><small>선택 지표</small><strong>${cs.length}개</strong></div><div class="fold-stat"><small>최소 합계</small><strong>${total}★</strong></div><div class="fold-reward">${currencyImg('mission-currency-icon')}<div><small>보상</small><strong>결정화 화폐 ×500</strong></div></div>${chevron()}</summary><div class="mission-detail"><div class="constraint-table-head"><span>아이콘</span><span>선택할 제약</span><span>점수</span><span>효과</span></div><div class="constraint-table">${rows}</div></div></details>`;}).join('');
 hydrateHQImages(list);
 list.querySelectorAll('details.mission-card').forEach(details=>details.addEventListener('toggle',syncPeriodicBoard));
}

function getOpenMissionConstraintNames(){
 const names=[];
 const seen=new Set();
 document.querySelectorAll('#periodic-list details.mission-card[open]').forEach(details=>{
   const mission=PERIODIC[Number(details.dataset.missionIndex)];
   if(!mission)return;
   mission.constraints.forEach(key=>{
     const name=C[key]?.name;
     if(name&&!seen.has(name)){seen.add(name);names.push(name);}
   });
 });
 return names;
}

function syncPeriodicBoard(){
 const frame=document.querySelector('.indicator-map-frame');
 if(!frame?.contentWindow)return;
 frame.contentWindow.postMessage({type:'reward-mission-sync',names:getOpenMissionConstraintNames()},'*');
}

function bindPeriodicBoardBridge(){
 const frame=document.querySelector('.indicator-map-frame');
 if(!frame)return;
 const sync=()=>setTimeout(syncPeriodicBoard,0);
 frame.addEventListener('load',sync);
 sync();
}

function renderScores(){document.getElementById('score-grid').innerHTML=SCORE_TASKS.map(v=>`<article class="score-card card"><small>지표 총합</small><div class="score-reward"><b class="score-points">${v}★ 이상 클리어</b><span class="score-reward-copy">${currencyImg('score-currency-icon')}<span><small>보상</small><strong>결정화 화폐 ×1,250</strong></span></span></div></article>`).join('');hydrateHQImages(document.getElementById('score-grid'));}

function hydrateHQImages(root=document){root.querySelectorAll('img[data-hq]').forEach(img=>{const file=img.dataset.hq,fallback=img.dataset.fallback;img.onerror=()=>{img.onerror=null;img.src=fallback};img.src=WIKI_FILE(file);});}

const selectedIndicators=new Set();
function buildIndicatorBoard(){const area=document.getElementById('grid-area');area.innerHTML='';(window.CONSTRAINT_ROWS||[]).forEach(({tier,cards})=>{const wrap=document.createElement('div');wrap.className='row-wrap';wrap.innerHTML=`<div class="tier-bar t${tier}"></div><div class="row-label"><span class="tier-num">${tier}</span><span class="tier-icon">★</span></div>`;const row=document.createElement('div');row.className='cards-row';cards.forEach(card=>{const el=document.createElement('div');el.className='indicator-card';el.style.gridColumn=card.col;if(card.lineTop)el.classList.add('line-top');if(card.lineBottom)el.classList.add('line-bottom');if(card.lineLeft)el.classList.add('line-left');if(card.lineRight)el.classList.add('line-right');if(card.empty){el.classList.add('empty');if(card.connectorOnly)el.classList.add('connector-only');el.innerHTML='<span class="conn top"></span><span class="conn bottom"></span><span class="conn left"></span><span class="conn right"></span>';row.appendChild(el);return;}if(card.key)el.classList.add('key-card');el.dataset.id=card.id;el.innerHTML=`<span class="conn top"></span><span class="conn bottom"></span><span class="conn left"></span><span class="conn right"></span>${BOARD_SECOND_PHASE.has(card.id)?'<span class="second-phase-badge">2차</span>':''}<img src="${card.icon}" alt="${esc(card.name)}"><span class="card-check">✓</span>`;el.addEventListener('click',()=>{selectedIndicators.has(card.id)?selectedIndicators.delete(card.id):selectedIndicators.add(card.id);el.classList.toggle('selected',selectedIndicators.has(card.id));});el.addEventListener('mouseenter',e=>showTooltip(card,e.currentTarget));el.addEventListener('mouseleave',hideTooltip);row.appendChild(el);});wrap.appendChild(row);area.appendChild(wrap);});}
const tooltip=document.getElementById('floating-tooltip');
function showTooltip(card,el){tooltip.querySelector('strong').textContent=`${card.name} · ${card.pts}★`;tooltip.querySelector('span').textContent=card.desc||'';const r=el.getBoundingClientRect();tooltip.style.left=`${Math.min(window.innerWidth-350,Math.max(8,r.left+r.width/2-150))}px`;tooltip.style.top=`${Math.max(80,r.top-92)}px`;tooltip.classList.add('visible');}
function hideTooltip(){tooltip.classList.remove('visible');}

function init(){renderShop();renderPeriodic();renderScores();hydrateHQImages(document);bindPeriodicBoardBridge();document.getElementById('shop-search').addEventListener('input',e=>renderShop(e.target.value));document.getElementById('shop-reset').addEventListener('click',resetShopState);}
init();
