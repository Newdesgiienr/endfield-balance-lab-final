const MONSTER_PATTERN_DATA = {
  ram: {
    id: 'eny_0021_agmelee', name: '큰뿔 아겔로스', en: 'Ram', icon: 'assets/monsters/ram.png',
    class: '일반', classKey: 'common', family: '아겔로스', hp: 24750, atk: 1198, def: 100, stagger: 60, range: 2.1,
    summary: '뿔을 이용해 정면의 적을 들이받는 기본 근접형 아겔로스.',
    patterns: [
      { id:'ram-hit', name:'정면 들이받기', type:'melee', verified:false, range:2.1, shape:'cone', angle:55, length:2.1, effect:'정면 물리 공격. 뿔로 목표를 들이받는다.', response:'측면이나 후방으로 빠져 정면축을 벗어나는 것이 안전하다.', note:'공격 행동은 아카이브 설명에서 확인. 2.1m는 데이터상의 공격 사거리.', source:'SSRDex / Goyfield' }
    ],
    sources:[
      ['고이필드 · 램 전투 데이터','https://goyfield.moe/enemies/eny_0021_agmelee'],
      ['SSRDex · 램 설명/능력','https://www.ssrdex.fr/Endfield/en/ennemis/eny_0021_agmelee']
    ]
  },
  falsewings: {
    id:'eny_0076_agfly', name:'모방 아겔로스', en:'Falsewings', icon:'assets/monsters/falsewings.png',
    class:'일반', classKey:'common', family:'아겔로스', hp:19800, atk:958, def:100, stagger:60, range:6,
    summary:'소형 회오리를 발사해 원거리에서 압박하며 피격된 오퍼레이터의 이동을 둔화한다.',
    patterns:[
      { id:'falsewings-range', name:'회오리 투사체', type:'ranged', verified:false, range:6, shape:'line', length:6, width:0.45, directionDeg:45, effect:'소형 회오리를 발사하며 피격 시 이동 속도 저하를 유발한다.', response:'투사체 진행축을 옆으로 비켜 피하고, 6m 밖에서는 일반 공격권을 벗어난다.', note:'6m는 공격 사거리. 투사체 자체의 실제 폭은 공개 자료에서 확인되지 않아 선형 오버레이 폭은 개념 표시.', source:'SSRDex / 게임에이트 / Goyfield' }
    ],
    sources:[
      ['고이필드 · 폴스윙즈 전투 데이터','https://goyfield.moe/enemies/eny_0076_agfly'],
      ['SSRDex · 폴스윙즈 능력','https://www.ssrdex.fr/Endfield/en/ennemis/eny_0076_agfly'],
      ['게임에이트 · Falsewings 능력','https://game8.co/games/Arknights-Endfield/archives/576982']
    ]
  },
  heavyRam: {
    id:'eny_0023_aghornb', name:'쌍뿔 아겔로스', en:'Heavy Ram', icon:'assets/monsters/heavy-ram.png',
    class:'상급', classKey:'advanced', family:'아겔로스', hp:148502, atk:2395, def:100, stagger:160, range:3.2,
    summary:'도약 지면 강타와 전방 돌진을 섞는 고체력 근접형. 행동 전조가 비교적 분명하다.',
    patterns:[
      { id:'hr-basic', name:'정면 들이받기', type:'melee', verified:false, range:3.2, shape:'cone', effect:'정면의 오퍼레이터를 뿔로 들이받아 물리 피해를 준다.', response:'정면축을 비우고 측후방을 유지한다.', note:'공개 공격 사거리 3.2m. 공격 각도/폭은 별도 수치 미공개.', source:'Goyfield / 엔드필드 탈로스 위키' },
      { id:'hr-leap', name:'도약 → 지면 강타', type:'area', verified:false, range:3.2, shape:'circle', effect:'짧은 준비 동작 뒤 도약하고 착지하며 주변 오퍼레이터에게 물리 피해를 준다.', response:'도약 전조를 확인하면 착지 중심에서 멀어지고 후딜에 공격한다.', note:'행동 확인. 정확한 도약 거리와 착지 AoE 반경은 공개 수치 없음.', source:'엔드필드 탈로스 위키' },
      { id:'hr-charge', name:'직선 돌진', type:'charge', verified:false, range:3.2, shape:'corridor', effect:'전방으로 돌진하며 경로상의 오퍼레이터에게 물리 피해를 주고 밀쳐낸다.', response:'돌진 진행축과 수직 방향으로 빠져 경로를 벗어난다.', note:'행동 확인. 돌진 거리/폭은 공개 수치 없음.', source:'엔드필드 탈로스 위키' },
      { id:'hr-power', name:'강화 들이받기', type:'charge', verified:false, range:3.2, shape:'cone', effect:'충전 후 더 강한 들이받기를 사용한다. 스킬로 차단할 수 있다.', response:'충전 동작을 보면 인터럽트를 우선하거나 정면을 이탈한다.', note:'공개 공격 사거리 3.2m. 강화 공격의 개별 판정 폭은 미공개.', source:'엔드필드 탈로스 위키' }
    ],
    sources:[
      ['고이필드 · 헤비 램 전투 데이터','https://goyfield.moe/enemies/eny_0023_aghornb'],
      ['SSRDex · 헤비 램 데이터','https://www.ssrdex.fr/Endfield/en/ennemis/eny_0023_aghornb'],
      ['엔드필드 탈로스 위키 · Heavy Ram 행동','https://endfield.wiki.gg/wiki/Heavy_Ram']
    ]
  },
  heavyRamAlpha: {
    id:'eny_0069_aghornb2', name:'쌍뿔아겔로스 · α', en:'Heavy Ram α', icon:'assets/monsters/heavy-ram-alpha.png',
    class:'상급 강화형', classKey:'advanced', family:'아겔로스', hp:222753, atk:2635, def:100, stagger:200, range:3.2,
    summary:'쌍뿔 아겔로스의 강화형. 동일 계열의 도약·지면 강타·돌진 행동을 사용하며 체급이 증가한다.',
    patterns:[
      { id:'hra-basic', name:'정면 들이받기', type:'melee', verified:false, range:3.2, shape:'cone', effect:'정면의 오퍼레이터를 뿔로 들이받아 물리 피해를 준다.', response:'측후방 유지.', note:'공개 공격 사거리 3.2m. 공격 각도/폭은 별도 수치 미공개.', source:'Goyfield / 엔드필드 탈로스 위키' },
      { id:'hra-leap', name:'도약 → 지면 강타', type:'area', verified:false, range:3.2, shape:'circle', effect:'짧은 준비 동작 뒤 도약하고 착지하며 주변에 물리 피해를 준다.', response:'착지 중심에서 이탈한 뒤 후딜에 공격한다.', note:'행동 확인. 실제 도약 거리/AoE 반경 미공개.', source:'엔드필드 탈로스 위키' },
      { id:'hra-charge', name:'직선 돌진', type:'charge', verified:false, range:3.2, shape:'corridor', effect:'전방으로 돌진해 경로상의 오퍼레이터에게 물리 피해와 넉백을 준다.', response:'횡이동으로 돌진축을 벗어난다.', note:'행동 확인. 실제 돌진 거리/폭 미공개.', source:'엔드필드 탈로스 위키' },
      { id:'hra-power', name:'강화 들이받기', type:'charge', verified:false, range:3.2, shape:'cone', effect:'충전 후 강력한 들이받기를 사용하며 스킬로 차단할 수 있다.', response:'충전 중 인터럽트하거나 정면을 비운다.', note:'공개 공격 사거리 3.2m. 개별 판정 폭은 미공개.', source:'엔드필드 탈로스 위키' }
    ],
    sources:[
      ['SSRDex · Heavy Ram α 데이터','https://www.ssrdex.fr/Endfield/en/ennemis/eny_0069_aghornb2'],
      ['엔드필드 탈로스 위키 · Heavy Ram α 행동','https://endfield.wiki.gg/wiki/Heavy_Ram_%CE%B1']
    ]
  },
  heavySting: {
    id:'eny_0027_agscorp', name:'삼미 아겔로스', en:'Heavy Sting', icon:'assets/monsters/heavy-sting.png',
    class:'상급', classKey:'advanced', family:'아겔로스', hp:131177, atk:1796, def:100, stagger:140, range:7,
    summary:'원거리에서 오퍼레이터 발밑에 오리지늄 기둥을 솟게 하고, 접근하면 주변에 방어용 석주를 소환한다.',
    patterns:[
      { id:'hs-shot', name:'꼬리 단발 사격', type:'ranged', verified:false, range:7, shape:'line', effect:'꼬리에서 한 발을 발사해 물리 피해를 준다.', response:'사격축을 옆으로 비켜 피한다.', note:'공개 공격 사거리 7m. 투사체 실제 폭/속도는 공개 수치 없음.', source:'Goyfield / 엔드필드 탈로스 위키' },
      { id:'hs-triple-shot', name:'꼬리 3연속 사격', type:'ranged', verified:false, range:7, shape:'line', effect:'꼬리에서 세 발을 연속으로 발사해 물리 피해를 준다.', response:'첫 발 회피 후 같은 방향에 멈추지 말고 연속 횡이동한다.', note:'공개 공격 사거리 7m. 발사 간격과 투사체 폭은 미공개.', source:'엔드필드 탈로스 위키' },
      { id:'hs-around', name:'랜덤 3지점 지면 폭발', type:'area', verified:false, range:7, shape:'threeRandom', effect:'꼬리를 지면에 꽂고 무작위 세 지점을 폭발시켜 물리 피해와 넉백을 준다.', response:'지면 전조가 나타난 위치 사이의 빈 공간으로 빠진다.', note:'3개 지점 공격 행동은 확인. 각 지점 반경/배치 거리는 미공개.', source:'엔드필드 탈로스 위키' },
      { id:'hs-track', name:'대상 위치 3연속 분출', type:'ranged', verified:false, range:7, shape:'targetCircle', effect:'꼬리를 지면에 꽂고 오퍼레이터 아래 지면을 세 차례 연속 분출시켜 물리 피해와 넉백을 준다. 이 행동은 인터럽트할 수 있다.', response:'한 자리에 멈추지 말고 연속 이동하며, 가능하면 시전 중 인터럽트한다.', note:'공개 공격 사거리 7m. 개별 분출 AoE 반경과 간격은 미공개.', source:'엔드필드 탈로스 위키 / SSRDex' },
      { id:'hs-guard', name:'접근 시 보호 석주', type:'support', verified:false, range:7, shape:'ringDots', effect:'가까이 접근하면 자신 주변에 석주를 소환해 보호한다.', response:'석주에 둘러싸이기 전에 위치를 바꾸거나 시전 전후의 빈틈을 노린다.', note:'능력 자체는 공개 설명에서 확인. 발동 거리와 석주 배치 반경은 미공개.', source:'SSRDex / 엔드필드 탈로스 위키' }
    ],
    sources:[
      ['고이필드 · 헤비 스팅 전투 데이터','https://goyfield.moe/enemies/eny_0027_agscorp'],
      ['SSRDex · 헤비 스팅 능력','https://www.ssrdex.fr/Endfield/en/ennemis/eny_0027_agscorp'],
      ['게임에이트 · Heavy Sting 능력','https://game8.co/games/Arknights-Endfield/archives/576988'],
      ['게이머가이드 · Heavy Sting 설명','https://www.gamerguides.com/arknights-endfield/database/enemies/advanced/heavy-sting']
    ]
  },
  heavyStingAlpha: {
    id:'eny_0070_agscorp2', name:'삼미아겔로스 · α', en:'Heavy Sting α', icon:'assets/monsters/heavy-sting-alpha.png',
    class:'상급 강화형', classKey:'advanced', family:'아겔로스', hp:195528, atk:2156, def:100, stagger:180, range:7,
    summary:'삼미 아겔로스 강화형. 기둥 분출과 접근 방어 석주 계열의 행동을 유지하면서 체력·공격력·강인도가 증가한다.',
    patterns:[
      { id:'hsa-shot', name:'꼬리 단발 사격', type:'ranged', verified:false, range:7, shape:'line', effect:'꼬리에서 한 발을 발사해 물리 피해를 준다.', response:'사격축에서 횡이동한다.', note:'공개 공격 사거리 7m. 투사체 폭은 미공개.', source:'Goyfield / 엔드필드 탈로스 위키' },
      { id:'hsa-triple-shot', name:'꼬리 3연속 사격', type:'ranged', verified:false, range:7, shape:'line', effect:'꼬리에서 세 발을 연속 발사한다.', response:'첫 발 이후에도 이동을 유지한다.', note:'공개 공격 사거리 7m. 발사 간격/폭 미공개.', source:'엔드필드 탈로스 위키' },
      { id:'hsa-around', name:'랜덤 3지점 지면 폭발', type:'area', verified:false, range:7, shape:'threeRandom', effect:'무작위 세 지점을 폭발시켜 물리 피해와 넉백을 준다.', response:'전조가 없는 공간 쪽으로 빠진다.', note:'행동 확인. 각 지점 판정 반경/배치 거리 미공개.', source:'엔드필드 탈로스 위키' },
      { id:'hsa-track', name:'대상 위치 3연속 분출', type:'ranged', verified:false, range:7, shape:'targetCircle', effect:'오퍼레이터의 위치 아래를 세 차례 분출시키며 물리 피해와 넉백을 준다. 스킬로 차단할 수 있다.', response:'연속 이동하면서 시전 중 인터럽트를 노린다.', note:'공개 공격 사거리 7m. 개별 AoE 반경과 간격은 미공개.', source:'엔드필드 탈로스 위키 / SSRDex' },
      { id:'hsa-guard', name:'접근 시 보호 석주', type:'support', verified:false, range:7, shape:'ringDots', effect:'가까이 접근하면 자신 주변에 석주를 소환해 보호한다.', response:'석주 생성 전후에 위치를 바꾸고 구조물 사이에 갇히지 않는다.', note:'능력 자체는 공개 설명에서 확인. 발동 거리와 석주 배치 반경은 미공개.', source:'SSRDex / 엔드필드 탈로스 위키' }
    ],
    sources:[
      ['SSRDex · 헤비 스팅 α 데이터','https://www.ssrdex.fr/Endfield/en/ennemis/eny_0070_agscorp2'],
      ['게이머가이드 · Heavy Sting α 능력','https://www.gamerguides.com/arknights-endfield/database/enemies/advanced/heavy-sting-1']
    ]
  },
  effigy: {
    id:'eny_0058_agdisk', name:'형상 아겔로스', en:'Effigy', icon:'assets/monsters/effigy.png',
    class:'정예', classKey:'elite', family:'아겔로스', hp:222753, atk:2395, def:100, stagger:340, range:12,
    summary:'형태 전환으로 이동·근접 강타·포획·포격/레이저를 모두 수행하는 다기능 정예 개체.',
    patterns:[
      { id:'ef-swings', name:'전방 2연속 휘두르기', type:'melee', verified:false, range:12, shape:'cone', effect:'정면 오퍼레이터에게 두 차례 물리 피해를 주는 휘두르기를 사용한다.', response:'첫 휘두르기 전조에 측후방으로 이동한다.', note:'행동 확인. 근접 휘두르기의 개별 거리/각도는 공개 수치 없음.', source:'엔드필드 탈로스 위키' },
      { id:'ef-slam', name:'긴 전조 지면 강타', type:'area', verified:false, range:12, shape:'circle', effect:'긴 준비 동작 뒤 팔로 지면을 강타해 큰 물리 피해와 넉백을 준다. 시전 중 회전이 느리다.', response:'준비 중 뒤로 돌아가 공격하고 강타 중심에서 벗어난다.', note:'행동 확인. 실제 AoE 반경 미공개.', source:'엔드필드 탈로스 위키' },
      { id:'ef-leap-slam', name:'도약 지면 강타', type:'area', verified:false, range:12, shape:'circle', effect:'도약 후 지면을 강타해 주변에 큰 물리 피해와 넉백을 준다.', response:'도약 착지 위치를 보고 바깥으로 이동한다.', note:'행동 확인. 도약 거리와 착지 반경 미공개.', source:'엔드필드 탈로스 위키' },
      { id:'ef-combo', name:'연속 휘두르기·찌르기', type:'melee', verified:false, range:12, shape:'cone', effect:'여러 번 휘두르고 찌른 뒤 위로 올려치는 연속 물리 공격을 전방에 사용한다.', response:'정면에서 장시간 교환하지 말고 연속기의 진행 방향 옆으로 이탈한다.', note:'행동 확인. 개별 타격 범위와 연속기 길이는 미공개.', source:'엔드필드 탈로스 위키' },
      { id:'ef-laser', name:'포격 형태 · 직선 레이저', type:'ranged', verified:false, range:12, shape:'line', directionDeg:45, effect:'포격 형태로 변형한 뒤 짧게 충전하고 정면으로 지속 에테르 피해를 주는 레이저를 발사한다. 인터럽트 가능.', response:'충전 중 정면축을 벗어나거나 인터럽트한다.', note:'공개 공격 사거리 12m. 레이저 실제 폭/지속시간은 별도 공개 수치 없음.', source:'Goyfield / 엔드필드 탈로스 위키' },
      { id:'ef-trap', name:'오퍼레이터 포획', type:'control', verified:false, range:12, shape:'targetCircle', effect:'오퍼레이터 한 명을 포획해 지속 물리 피해를 주고, 충전 후 큰 물리 피해와 넉백을 가한다. 인터럽트 가능.', response:'포획 시도를 빠르게 차단한다.', note:'포획 판정 거리/반경은 공개 수치 없음.', source:'엔드필드 탈로스 위키' },
      { id:'ef-orbs', name:'에너지 구체 3발 · 소환', type:'ranged', verified:false, range:12, shape:'targetCircle', effect:'에너지 구체 세 발을 발사해 에테르 피해를 준다. 착탄 후 큰뿔 아겔로스 2체와 침형 아겔로스 1체가 소환된다.', response:'착탄 지점에서 벗어나고 소환된 적을 빠르게 정리한다.', note:'공격 사거리 12m. 구체 착탄 반경은 별도 수치가 확인되지 않는다.', source:'엔드필드 탈로스 위키' }
    ],
    sources:[
      ['고이필드 · 에피지 전투 데이터','https://goyfield.moe/enemies/eny_0058_agdisk'],
      ['게임에이트 · Effigy 능력','https://game8.co/games/Arknights-Endfield/archives/576983'],
      ['엔드필드 탈로스 위키 · Effigy 행동','https://endfield.wiki.gg/wiki/Effigy'],
      ['엔드필드허브 · Umbral Monument DB','https://endfieldhub.org/database/umbral-monument-database']
    ]
  },
  mudflow: {
    id:'eny_0087_wgslime', name:'탁류 아겔로스', en:'Mudflow', icon:'assets/monsters/mudflow.png',
    class:'일반', classKey:'common', family:'아겔로스', hp:32175, atk:958, def:100, stagger:60, range:2.1,
    summary:'먼 거리에서 빠르게 접근한 뒤 근접 공격을 이어가며 피격 시 냉기 부착을 건다.',
    patterns:[
      { id:'mud-melee', name:'근접 냉기 공격', type:'melee', verified:false, range:2.1, shape:'circle', radius:2.1, effect:'근접 공격 적중 시 냉기 부착을 적용한다.', response:'근접 유지 시간을 줄여 냉기 누적을 피한다.', note:'2.1m는 공격 사거리.', source:'SSRDex / Goyfield' },
      { id:'mud-close', name:'급속 접근', type:'movement', verified:false, range:2.1, shape:'dash', length:2.1, effect:'먼 거리에서 빠르게 간격을 좁힌다.', response:'접근 시작을 보고 이동기를 아끼지 말고 횡이동으로 맞물림을 피한다.', note:'행동은 확인되나 실제 접근 거리/속도는 미공개.', source:'SSRDex / 게임에이트' }
    ],
    sources:[
      ['고이필드 · 머드플로우 전투 데이터','https://goyfield.moe/enemies/eny_0087_wgslime'],
      ['SSRDex · 머드플로우 능력','https://www.ssrdex.fr/Endfield/en/ennemis/eny_0087_wgslime'],
      ['게임에이트 · Mudflow 능력','https://game8.co/games/Arknights-Endfield/archives/576981']
    ]
  },
  hedron: {
    id:'eny_0088_wgthorns', name:'수정 아겔로스', en:'Hedron', icon:'assets/monsters/hedron.png',
    class:'일반', classKey:'common', family:'아겔로스', hp:27225, atk:958, def:100, stagger:60, range:2.1,
    summary:'에너지 투사체를 발사하며 적중한 오퍼레이터에게 냉기 부착을 적용한다.',
    patterns:[
      { id:'hedron-shot', name:'냉기 투사체', type:'ranged', verified:false, range:2.1, shape:'line', length:2.1, width:0.35, effect:'투사체 적중 시 냉기 부착을 적용한다.', response:'작은 기본 사거리 안에서 정면에 오래 머무르지 않는다.', note:'공격 사거리는 2.1m로 확인. 투사체의 실제 폭은 미공개.', source:'탈로스 위키 / SSRDex / Goyfield' }
    ],
    sources:[
      ['고이필드 · 헤드론 전투 데이터','https://goyfield.moe/enemies/eny_0088_wgthorns'],
      ['SSRDex · 헤드론 능력','https://www.ssrdex.fr/Endfield/en/ennemis/eny_0088_wgthorns'],
      ['엔드필드 탈로스 위키 · Hedron','https://endfield.wiki.gg/wiki/Hedron']
    ]
  },
  prism: {
    id:'eny_0089_wgreflec', name:'굴절 아겔로스', en:'Prism', icon:'assets/monsters/prism.png',
    class:'일반', classKey:'common', family:'아겔로스', hp:19800, atk:958, def:100, stagger:60, range:2.1,
    summary:'주변 아겔로스를 강화해 받는 피해를 크게 줄이는 지원형. 주변 아군이 없으면 직접 내려찍기 공격을 한다.',
    patterns:[
      { id:'prism-buff', name:'주변 아군 강화', type:'support', verified:false, range:2.1, shape:'circle', radius:2.1, effect:'근처 아겔로스를 강화해 생존력을 높인다.', response:'다른 고위협 적보다 먼저 제거하면 전체 전투가 쉬워진다.', note:'강화 효과 자체는 확인되지만 실제 버프 반경은 미공개.', source:'게임에이트 / 탈로스 위키 / SSRDex' },
      { id:'prism-pound', name:'단독 내려찍기', type:'melee', verified:false, range:2.1, shape:'circle', radius:2.1, effect:'주변에 아군 아겔로스가 없을 때 직접 내려찍기로 물리 피해를 준다.', response:'혼자 남은 Prism에 근접할 때 기본 공격권을 의식한다.', note:'2.1m는 공격 사거리. 내려찍기 실제 AoE가 2.1m라는 뜻은 아님.', source:'탈로스 위키' }
    ],
    sources:[
      ['엔드필드 탈로스 위키 · Prism 데이터/개요','https://endfield.wiki.gg/wiki/Prism'],
      ['SSRDex · 프리즘 능력','https://www.ssrdex.fr/Endfield/en/ennemis/eny_0089_wgreflec'],
      ['게임에이트 · Prism 능력','https://game8.co/games/Arknights-Endfield/archives/576979']
    ]
  },
  tidewalker: {
    id:'eny_0091_wgshoal', name:'조류 아겔로스', en:'Tidewalker', icon:'assets/monsters/tidewalker.png',
    class:'정예', classKey:'elite', family:'아겔로스', hp:222753, atk:2395, def:100, stagger:320, range:2.8,
    summary:'양쪽 촉수를 이용한 연속 공격과 지면 냉기 공격을 사용한다. 냉기 공격은 냉기 부착을 가하며 피격된 오퍼레이터를 고형화할 수 있다.',
    patterns:[
      { id:'tide-shockwave', name:'3연속 촉수 휘두르기 · 충격파', type:'area', verified:false, range:2.8, shape:'cone', angle:105, length:2.8, effect:'양쪽 촉수를 세 차례 휘두르며 매 타격마다 지면 충격파를 발생시켜 냉기 피해와 냉기 부착을 준다.', response:'연속 휘두르기 축에서 벗어나고 지면 충격파가 이어지는 동안 정면에 머무르지 않는다.', note:'조류 아겔로스의 공격 사거리 2.8m를 기준으로 표시.', source:'엔드필드 탈로스 위키' },
      { id:'tide-nine', name:'지면 찌르기 · 9지점 냉기 폭발', type:'area', verified:false, range:2.8, shape:'nineAreas', effect:'양쪽 촉수를 지면에 꽂아 먼저 물리 피해를 준 뒤, 촉수를 아홉 지점으로 뻗어 냉기 피해와 냉기 부착을 준다.', response:'지면 전개를 확인하면 촉수 중심과 연속 폭발 지점에서 빠르게 이탈한다.', note:'9지점 공격 행동은 확인되며 개별 지점 반경은 별도 수치가 확인되지 않는다.', source:'엔드필드 탈로스 위키' }
    ],
    sources:[
      ['고이필드 · Tidewalker 전투 데이터','https://goyfield.moe/enemies/eny_0091_wgshoal'],
      ['SSRDex · Tidewalker 능력','https://www.ssrdex.fr/Endfield/en/ennemis/eny_0091_wgshoal'],
      ['게임에이트 · Tidewalker 능력','https://game8.co/games/Arknights-Endfield/archives/576978'],
      ['엔드필드 탈로스 위키 · Tidewalker 행동','https://endfield.wiki.gg/wiki/Tidewalker']
    ]
  },
  tidalklast: {
    id:'eny_0090_wgabyss', name:'파조의 상', en:'Tidalklast', icon:'assets/monsters/tidalklast.png',
    class:'알파', classKey:'elite', family:'아겔로스', hp:247504, atk:2395, def:100, stagger:640, range:2.8,
    summary:'근접/원거리 상태를 전환하는 알파 개체. 근접 상태에서는 촉수 물리 공격을 사용하고, 원거리 상태에서는 빙결 외피와 냉기 충격파를 사용한다.',
    patterns:[
      { id:'tk-front-swing', name:'전방 양촉수 휘두르기', type:'melee', verified:false, range:2.8, shape:'cone', angle:105, length:2.8, effect:'양쪽 촉수를 전방으로 휘둘러 부채꼴 범위에 물리 피해를 준다.', response:'정면에서 벗어나 측후방으로 이동한다.', note:'파조의 상 공격 사거리 2.8m를 기준으로 표시.', source:'엔드필드 탈로스 위키' },
      { id:'tk-ground-swipe', name:'지면 찌르기 · 360도 휘두르기', type:'area', verified:false, range:2.8, shape:'circle', radius:2.8, effect:'양쪽 촉수를 지면에 찔러 물리 피해를 준 뒤, 360도로 촉수를 휘둘러 물리 피해와 넉백을 가한다.', response:'지면 찌르기 전조가 보이면 기본 공격권 밖으로 빠져 후속 전방위 휘두르기를 피한다.', note:'전방위 후속 공격이 확인되며 2.8m 공격 사거리를 기준으로 표시.', source:'엔드필드 탈로스 위키' },
      { id:'tk-ranged-state', name:'원거리 상태 · 빙결 외피', type:'support', verified:false, range:2.8, shape:'none', effect:'원거리 상태로 전환하면 몸을 얼음으로 감싸 거리를 유지하며 공격한다. 이 상태에서는 열기 피해에 더 취약하지만 그 외 피해에는 큰 피해 감소를 얻는다.', response:'상태 전환 중 열기 피해를 우선하고, 다른 속성으로는 장기 교전을 피한다.', note:'상태 효과이므로 별도 공격 도형은 표시하지 않는다.', source:'엔드필드 탈로스 위키 / 엔드필드허브' },
      { id:'tk-cryo-wave', name:'지상 냉기 충격파', type:'ranged', verified:false, range:2.8, shape:'cone', angle:80, length:2.8, effect:'원거리 상태에서 조류 아겔로스와 유사한 지상 충격파를 발생시켜 냉기 피해와 냉기 부착을 준다.', response:'충격파 진행 방향에서 측면으로 빠져 연속 판정을 피한다.', note:'공격 사거리 2.8m를 기준으로 표시.', source:'엔드필드 탈로스 위키' }
    ],
    sources:[
      ['고이필드 · Tidalklast 전투 데이터','https://goyfield.moe/enemies/eny_0090_wgabyss'],
      ['게이머가이드 · Tidalklast 상태 설명','https://www.gamerguides.com/arknights-endfield/database/enemies/alpha/tidalklast'],
      ['엔드필드 탈로스 위키 · Tidalklast 행동','https://endfield.wiki.gg/wiki/Tidalklast'],
      ['엔드필드허브 · Umbral Monument DB','https://endfieldhub.org/database/umbral-monument-database']
    ]
  }};
