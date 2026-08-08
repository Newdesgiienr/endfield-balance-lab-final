const MONSTERS = {
  ram: {
    id: 'eny_0021_agmelee', name: '큰뿔 아겔로스', en: 'Ram', icon: 'assets/monsters/ram.png', class: '일반', classKey: 'common', family: '아겔로스',
    hp: 24750, atk: 1198, def: 100, stagger: 60, staggerRecovery: 6, range: 2.1, weight: 1,
    resist: { physical: 1, heat: 1, electric: 1, cryo: 1, nature: 1, ether: 1 },
    feature: '정면 돌진 중심의 기본 근접 개체.', accent: 'R'
  },
  falsewings: {
    id: 'eny_0076_agfly', name: '모방 아겔로스', en: 'Falsewings', icon: 'assets/monsters/falsewings.png', class: '일반', classKey: 'common', family: '아겔로스',
    hp: 19800, atk: 958, def: 100, stagger: 60, staggerRecovery: 6, range: 6, weight: 1,
    resist: { physical: 1, heat: 1, electric: 1, cryo: 1, nature: 1, ether: 1 },
    feature: '원거리 투사체와 이동형 회오리로 감속을 유발.', accent: 'F'
  },
  heavyRam: {
    id: 'eny_0023_aghornb', name: '쌍뿔 아겔로스', en: 'Heavy Ram', icon: 'assets/monsters/heavy-ram.png', class: '상급', classKey: 'advanced', family: '아겔로스',
    hp: 148502, atk: 2395, def: 100, stagger: 160, staggerRecovery: 7, range: 3.2, weight: 1.5,
    resist: { physical: .8, heat: .8, electric: 1, cryo: 1, nature: .8, ether: 1 },
    feature: '도약·돌진·넉백을 사용하는 고체력 근접 개체.', accent: 'HR'
  },
  heavyRamAlpha: {
    id: 'eny_0069_aghornb2', name: '쌍뿔아겔로스 · α', en: 'Heavy Ram α', icon: 'assets/monsters/heavy-ram-alpha.png', class: '상급 강화형', classKey: 'advanced', family: '아겔로스',
    hp: 222753, atk: 2635, def: 100, stagger: 200, staggerRecovery: 7.5, range: 3.2, weight: 1.5,
    resist: { physical: .8, heat: .8, electric: 1, cryo: 1, nature: .8, ether: 1 },
    feature: '쌍뿔아겔로스의 강화형. 동일 계열 패턴에 체급이 크게 증가.', accent: 'Hα'
  },
  heavySting: {
    id: 'eny_0027_agscorp', name: '삼미 아겔로스', en: 'Heavy Sting', icon: 'assets/monsters/heavy-sting.png', class: '상급', classKey: 'advanced', family: '아겔로스',
    hp: 131177, atk: 1796, def: 100, stagger: 140, staggerRecovery: 7, range: 7, weight: 1.5,
    resist: { physical: .8, heat: .8, electric: 1, cryo: 1, nature: .8, ether: 1 },
    feature: '원거리 공격과 지면 기둥 공격으로 넓은 구역을 압박.', accent: 'HS'
  },
  heavyStingAlpha: {
    id: 'eny_0070_agscorp2', name: '삼미아겔로스 · α', en: 'Heavy Sting α', icon: 'assets/monsters/heavy-sting-alpha.png', class: '상급 강화형', classKey: 'advanced', family: '아겔로스',
    hp: 195528, atk: 2156, def: 100, stagger: 180, staggerRecovery: 7.5, range: 7, weight: 1.5,
    resist: { physical: .8, heat: .8, electric: 1, cryo: 1, nature: .8, ether: 1 },
    feature: '삼미아겔로스의 강화형. HP·공격력·강인도가 모두 상승.', accent: 'Sα'
  },
  effigy: {
    id: 'eny_0058_agdisk', name: '형상 아겔로스', en: 'Effigy', icon: 'assets/monsters/effigy.png', class: '정예', classKey: 'elite', family: '아겔로스',
    hp: 222753, atk: 2395, def: 100, stagger: 340, staggerRecovery: 9, range: 12, weight: 2,
    resist: { physical: .8, heat: .8, electric: 1, cryo: 1, nature: .8, ether: 1 },
    feature: '형태 전환, 레이저, 포획 등 다수의 특수 패턴을 보유.', accent: 'E'
  },
  mudflow: {
    id: 'eny_0087_wgslime', name: '탁류 아겔로스', en: 'Mudflow', icon: 'assets/monsters/mudflow.png', class: '일반', classKey: 'common', family: '아겔로스',
    hp: 32175, atk: 958, def: 100, stagger: 60, staggerRecovery: 6, range: 2.1, weight: 1,
    resist: { physical: 1, heat: 1, electric: .8, cryo: .8, nature: 1, ether: 1 },
    feature: '빠르게 거리를 좁히며 냉기 부착을 가하는 근접 개체.', accent: 'M'
  },
  hedron: {
    id: 'eny_0088_wgthorns', name: '수정 아겔로스', en: 'Hedron', icon: 'assets/monsters/hedron.png', class: '일반', classKey: 'common', family: '아겔로스',
    hp: 27225, atk: 958, def: 100, stagger: 60, staggerRecovery: 6, range: 2.1, weight: 1,
    resist: { physical: 1, heat: 1, electric: .8, cryo: .8, nature: 1, ether: 1 },
    feature: '범위형 냉기 투사체로 냉기 부착을 누적.', accent: 'H'
  },
  prism: {
    id: 'eny_0089_wgreflec', name: '굴절 아겔로스', en: 'Prism', icon: 'assets/monsters/prism.png', class: '일반', classKey: 'common', family: '아겔로스',
    hp: 19800, atk: 958, def: 100, stagger: 60, staggerRecovery: 6, range: 2.1, weight: 1,
    resist: { physical: 1, heat: 1, electric: .8, cryo: .8, nature: 1, ether: 1 },
    feature: '주변 적을 보호해 받는 피해를 줄이는 지원형 개체.', accent: 'P'
  },
  tidewalker: {
    id: 'eny_0091_wgshoal', name: '조류 아겔로스', en: 'Tidewalker', icon: 'assets/monsters/tidewalker.png', class: '정예', classKey: 'elite', family: '아겔로스',
    hp: 222753, atk: 2395, def: 100, stagger: 320, staggerRecovery: 9, range: 2.8, weight: 1.2,
    resist: { physical: 1, heat: 1, electric: .8, cryo: .8, nature: 1, ether: 1 },
    feature: '광범위 냉기 공격과 고형화 효과를 사용하는 정예 개체.', accent: 'T'
  },
  tidalklast: {
    id: 'eny_0090_wgabyss', name: '파조의 상', en: 'Tidalklast', icon: 'assets/monsters/tidalklast.png', class: '알파', classKey: 'elite', family: '아겔로스',
    hp: 247504, atk: 2395, def: 100, stagger: 640, staggerRecovery: 13, range: 2.8, weight: 1.5,
    resist: { physical: 1, heat: 1, electric: .8, cryo: .8, nature: 1, ether: 1 },
    feature: '근접·원거리 상태를 전환. 원거리 상태에서는 열기 외 피해에 강함.', accent: 'TK'
  }
};

const COMPOSITIONS = {
  1: {
    name: '구성 1', subtitle: '기준 구성', description: '후반까지 일반형 쌍뿔·삼미아겔로스를 사용하는 기준 프리셋.',
    waves: [
      { no: 1, displayNo: 1, enemies: [['ram',3],['falsewings',3],['heavySting',1]] },
      { no: 2, displayNo: 3, enemies: [['mudflow',3],['hedron',3],['prism',1],['tidewalker',1]] },
      { no: 3, displayNo: 5, enemies: [['heavyRam',2],['effigy',1]] },
      { no: 4, displayNo: 7, enemies: [['heavyRam',1],['heavySting',1],['tidalklast',1]] }
    ]
  },
  2: {
    name: '구성 2', subtitle: '최종 웨이브 강화', description: '최종 웨이브의 쌍뿔·삼미아겔로스를 α 강화형으로 교체.',
    waves: [
      { no: 1, displayNo: 1, enemies: [['ram',3],['falsewings',3],['heavySting',1]] },
      { no: 2, displayNo: 3, enemies: [['mudflow',3],['hedron',3],['prism',1],['tidewalker',1]] },
      { no: 3, displayNo: 5, enemies: [['heavyRam',2],['effigy',1]] },
      { no: 4, displayNo: 7, enemies: [['heavyRamAlpha',1],['heavyStingAlpha',1],['tidalklast',1]] }
    ]
  },
  3: {
    name: '구성 3', subtitle: '후반 2개 웨이브 강화', description: '3웨이브부터 쌍뿔 강화형이 투입되고 최종 웨이브도 강화형 조합을 사용.',
    waves: [
      { no: 1, displayNo: 1, enemies: [['ram',3],['falsewings',3],['heavySting',1]] },
      { no: 2, displayNo: 3, enemies: [['mudflow',3],['hedron',3],['prism',1],['tidewalker',1]] },
      { no: 3, displayNo: 5, enemies: [['heavyRamAlpha',2],['effigy',1]] },
      { no: 4, displayNo: 7, enemies: [['heavyRamAlpha',1],['heavyStingAlpha',1],['tidalklast',1]] }
    ]
  }
};
