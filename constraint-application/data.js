
const ROWS = [
  {
    tier: 1,
    cards: [
      {
        id: '1-1',
        col: 1,
        icon: 'assets/icons/위축1.png',
        name: '팀: 위축 I',
        pts: 1,
        group: 'g1',
        lineBottom: true,
        desc: '오퍼레이터의 주요 능력치 -10%'
      },
      {
        id: '1-2',
        col: 2,
        icon: 'assets/icons/공격1.png',
        name: '조작: 공격 I',
        pts: 1,
        group: 'g2',
        lineBottom: true,
        desc: '적이 주는 피해 +30%'
      },
      {
        id: '1-3',
        col: 3,
        icon: 'assets/icons/시간1.png',
        name: '환경: 시간 제한 I',
        pts: 1,
        group: 'g3',
        lineBottom: true,
        desc: '카운트다운 -100초 (제한시간 8분20초)'
      },
      {
        id: '1-4',
        col: 4,
        icon: 'assets/icons/활성1.png',
        name: '조작: 활성 I',
        pts: 1,
        group: 'g4',
        lineBottom: true,
        desc: '적 생명력 +50%'
      },
      {
        id: '1-5',
        col: 5,
        icon: 'assets/icons/억제1.png',
        name: '팀: 억제 I',
        pts: 1,
        group: 'g5',
        lineBottom: true,
        desc: '오퍼레이터가 적의 방어불능 또는 아츠부착 스택 수치를 증가시키면, 해당 오퍼레이터가 주는 해당 유형의 피해 -45%, 10초간 지속'
      },
      {
        id: '1-6',
        col: 6,
        icon: 'assets/icons/참수1.png',
        name: '팀: 참수 I',
        pts: 1,
        group: 'g6',
        lineBottom: true,
        desc: '메인 컨트롤 오퍼레이터가 받는 피해 +50%'
      },
      {
        id: '1-7',
        col: 7,
        icon: 'assets/icons/호흡.png',
        name: '환경: 호흡 불가',
        pts: 1,
        group: 'g7',
        lineBottom: true,
        desc: '기력 회복 속도 -50%'
      },
      {
        id: '1-8',
        col: 8,
        icon: 'assets/icons/쇠퇴1.png',
        name: '환경: 쇠퇴 I',
        pts: 1,
        group: 'g8',
        lineBottom: true,
        desc: '웨이브 사이에 치유 물질이 1개만 생성'
      },
      {
        id: '1-9',
        col: 9,
        icon: 'assets/icons/칼날1.png',
        name: '팀: 부러진 칼날 I',
        pts: 1,
        group: 'g9',
        lineBottom: true,
        desc: '오퍼레이터가 궁극기를 1회 사용할 때마다, 해당 오퍼레이터가 이후 사용하는 궁극기 피해 50% 감소'
      },
      {
        id: '1-10',
        col: 10,
        icon: 'assets/icons/보호벽.png',
        name: '조작: 보호벽',
        pts: 1,
        desc: '각 적은 5초마다 방어불능 또는 같은 유형의 아츠부착을 1회만 부여받을 수 있음'
      },

      {
        id: '1-11',
        col: 11,
        icon: 'assets/icons/중압.png',
        name: '팀: 중압',
        pts: 1,
        desc: '메인 컨트롤 오퍼가 12초 내 적에게 강력한 일격 피해를 주지 않으면, 스킬 게이지 자연회복 중단'
      },
      { empty: true, col: 12 },
      { empty: true, col: 13 },

      {
        id: '1-14',
        col: 14,
        icon: 'assets/icons/모름1.png',
        name: '조작: 부착',
        pts: 1,
        unlockable: true,
        requiresAny: ['3-12', '3-13'],
        desc: '적에게 부착된 방어불능 또는 아츠부착 1단계마다 해당 적이 받는 부착 스택과 대응되는 데미지 -10%(해당 버프는 부착 지속시간 종료 0.1초후에 소멸)'
      },
      {
        id: '1-15',
        col: 15,
        icon: 'assets/icons/독성1.png',
        name: '조작: 독성 I',
        pts: 1,
        group: 'g11',
        unlockable: true,
        requiresAny: ['3-12', '3-13'],
        lineBottom: true,
        desc: '처치 당한 적이 독성 물질을 남기고 오퍼레이터가 독성 물질의 범위에 있을 때, 매초마다 최대 생명력의 2% 피해를 입음'
      },
      {
        id: '1-16',
        col: 16,
        icon: 'assets/icons/한기1.png',
        name: '팀: 저체온증 I',
        pts: 1,
        group: 'g12',
        unlockable: true,
        requiresAny: ['3-12', '3-13'],
        lineBottom: true,
        desc: '오퍼레이터가 배틀 스킬을 2회 사용할 때마다 메인 컨트롤 오퍼레이터에게 냉기부착 1스택 부여. 각 오퍼레이터당 발동 가능 쿨타임 3초'
      },
      {
        id: '1-17',
        col: 17,
        icon: 'assets/icons/손실1.png',
        name: '팀: 열 손실 I',
        pts: 1,
        group: 'g13',
        unlockable: true,
        requiresAny: ['3-12', '3-13'],
        lineBottom: true,
        desc: '오퍼레이터가 연계 스킬을 2회 사용할 때마다 메인 컨트롤 오퍼레이터에게 냉기부착 1스택 부여. 각 오퍼레이터당 발동 가능 쿨타임 3초'
      },
      {
        id: '1-18',
        col: 18,
        icon: 'assets/icons/열기분해.png',
        name: '환경: 융해',
        pts: 1,
        group: 'g14',
        unlockable: true,
        requiresAny: ['3-12', '3-13'],
        lineRight: true,
        desc: '오퍼레이터가 받는 동결 지속시간 15초 증가. 열기 유형 스킬을 사용할 경우, 동결 해제 가능'
      },
      {
        id: '1-19',
        col: 19,
        icon: 'assets/icons/자연분해.png',
        name: '환경: 승화',
        pts: 1,
        group: 'g14',
        unlockable: true,
        requiresAny: ['3-12', '3-13'],
        lineLeft: true,
        lineRight: true,
        desc: '오퍼레이터가 받는 동결 지속시간 15초 증가. 자연 유형 스킬을 사용할 경우, 동결 해제 가능'
      },
      {
        id: '1-20',
        col: 20,
        icon: 'assets/icons/전기분해.png',
        name: '환경: 전기분해',
        pts: 1,
        group: 'g14',
        unlockable: true,
        requiresAny: ['3-12', '3-13'],
        lineLeft: true,
        lineRight: true,
        desc: '오퍼레이터가 받는 동결 지속시간 15초 증가. 전기 유형 스킬을 사용할 경우, 동결 해제 가능'
      },
      {
        id: '1-21',
        col: 21,
        icon: 'assets/icons/절삭.png',
        name: '환경: 절삭',
        pts: 1,
        group: 'g14',
        unlockable: true,
        requiresAny: ['3-12', '3-13'],
        lineLeft: true,
        desc: '오퍼레이터가 받는 동결 지속시간 15초 증가. 물리 유형 스킬을 사용할 경우, 동결 해제 가능'
      },
      {
        id: '1-22',
        col: 22,
        icon: 'assets/icons/치유1.png',
        name: '조작: 치유 I',
        pts: 1,
        group: 'g15',
        unlockable: true,
        requiresAny: ['3-12', '3-13'],
        lineBottom: true,
        desc: '적이 제어 효과의 영향을 받을 때, 매초마다 최대 HP의 5%를 회복'
      },
      { empty: true, col: 23 }
    ]
  },

  {
    tier: 2,
    cards: [
      {
        id: '2-1',
        col: 1,
        icon: 'assets/icons/위축2.png',
        name: '팀: 위축 II',
        pts: 2,
        group: 'g1',
        lineTop: true,
        lineBottom: true,
        desc: '오퍼레이터의 주요 능력치 -20%'
      },
      {
        id: '2-2',
        col: 2,
        icon: 'assets/icons/공격2.png',
        name: '조작: 공격 II',
        pts: 2,
        group: 'g2',
        lineTop: true,
        desc: '적이 주는 피해 +80%'
      },
      {
        id: '2-3',
        col: 3,
        icon: 'assets/icons/시간2.png',
        name: '환경: 시간 제한 II',
        pts: 2,
        group: 'g3',
        lineTop: true,
        lineBottom: true,
        desc: '카운트다운 -200초 (제한시간 6분40초)'
      },
      {
        id: '2-4',
        col: 4,
        icon: 'assets/icons/활성2.png',
        name: '조작: 활성 II',
        pts: 2,
        group: 'g4',
        lineTop: true,
        lineBottom: true,
        desc: '적 생명력 +100%'
      },
      {
        id: '2-5',
        col: 5,
        icon: 'assets/icons/억제2.png',
        name: '팀: 억제 II',
        pts: 2,
        group: 'g5',
        lineTop: true,
        desc: '오퍼레이터가 적의 방어불능 또는 아츠부착 스택 수치를 증가시키면, 해당 오퍼레이터가 주는 해당 유형의 피해 -90%, 10초간 지속'
      },
      {
        id: '2-6',
        col: 6,
        icon: 'assets/icons/참수2.png',
        name: '팀: 참수 II',
        pts: 2,
        group: 'g6',
        lineTop: true,
        desc: '메인 컨트롤 오퍼레이터가 받는 피해 +100%'
      },

      {
        empty: true,
        col: 7,
        group: 'g7',
        connectorOnly: true,
        lineTop: true,
        lineBottom: true
      },

      {
        id: '2-8',
        col: 8,
        icon: 'assets/icons/쇠퇴2.png',
        name: '환경: 쇠퇴 II',
        pts: 2,
        group: 'g8',
        lineTop: true,
        desc: '웨이브 사이에 치유 물질이 생성되지 않음'
      },
      {
        id: '2-9',
        col: 9,
        icon: 'assets/icons/칼날2.png',
        name: '팀: 부러진 칼날 II',
        pts: 2,
        group: 'g9',
        lineTop: true,
        desc: '오퍼레이터가 궁극기를 1회 사용할 때마다, 해당 오퍼레이터가 이후 사용하는 궁극기 피해 100% 감소'
      },
      {
        id: '2-10',
        col: 10,
        icon: 'assets/icons/모름2.png',
        name: '조작: 질주',
        pts: 2,
        desc: '적 이동속도 +100%, 0.1초 내에 받는 피해는 최대 생명력의 25%를 초과하지 않음'
      },
      {
        id: '2-11',
        col: 11,
        icon: 'assets/icons/모름3.png',
        name: '환경: 동시 성장',
        pts: 2,
        desc: '메인 컨트롤 오퍼레이터가 최대 HP의 10% 이상으로 회복하거나 20% 이상에 해당하는 보호막을 얻을 때, 전장의 모든 적도 최대 HP의 8%를 회복한다'
      },

      { empty: true, col: 12 },
      { empty: true, col: 13 },

      {
        id: '2-14',
        col: 14,
        icon: 'assets/icons/분리.png',
        name: '환경: 분리',
        pts: 2,
        unlockable: true,
        requiresAny: ['3-12', '3-13'],
        desc: '전투가 시작된 후 메인 컨트롤 오퍼레이터 전환 불가'
      },
      {
        id: '2-15',
        col: 15,
        icon: 'assets/icons/독성2.png',
        name: '조작: 독성 II',
        pts: 2,
        group: 'g11',
        unlockable: true,
        requiresAny: ['3-12', '3-13'],
        lineTop: true,
        desc: '처치 당한 적이 독성 물질을 남기고 오퍼레이터가 독성 물질의 범위에 있을 때, 매초마다 최대 생명력의 5% 피해를 입음'
      },
      {
        id: '2-16',
        col: 16,
        icon: 'assets/icons/한기2.png',
        name: '팀: 저체온증 II',
        pts: 2,
        group: 'g12',
        unlockable: true,
        requiresAny: ['3-12', '3-13'],
        lineTop: true,
        desc: '오퍼레이터가 배틀 스킬을 1회 사용할 때마다 메인 컨트롤 오퍼레이터에게 냉기부착 1스택 부여. 각 오퍼레이터당 발동 가능 쿨타임 3초'
      },
      {
        id: '2-17',
        col: 17,
        icon: 'assets/icons/손실2.png',
        name: '팀: 열 손실 II',
        pts: 2,
        group: 'g13',
        unlockable: true,
        requiresAny: ['3-12', '3-13'],
        lineTop: true,
        desc: '오퍼레이터가 연계 스킬을 1회 사용할 때마다 메인 컨트롤 오퍼레이터에게 냉기부착 1스택 부여. 각 오퍼레이터당 발동 가능 쿨타임 3초'
      },
      {
        id: '2-18',
        col: 18,
        icon: 'assets/icons/열량흡수.png',
        name: '조작: 열량 흡수',
        pts: 2,
        unlockable: true,
        requiresAny: ['3-12', '3-13'],
        desc: '적이 메인 컨트롤 오퍼에게 냉기 부착을 부여하는 대신, 즉시 동결'
      },
      { empty: true, col: 19 },
      { empty: true, col: 20 },
      { empty: true, col: 21 },
      {
        id: '2-22',
        col: 22,
        icon: 'assets/icons/치유2.png',
        name: '조작: 치유 II',
        pts: 2,
        group: 'g15',
        unlockable: true,
        requiresAny: ['3-12', '3-13'],
        lineTop: true,
        desc: '적이 제어 효과의 영향을 받을 때, 매초마다 최대 HP의 15%를 회복'
      },
      {
        id: '2-23',
        col: 23,
        icon: 'assets/icons/재구성.png',
        name: '환경: 재구성 I',
        pts: 2,
        group: 'g16',
        lineBottom: true,
        unlockable: true,
        requiresAny: ['3-12', '3-13'],
        desc: '최종 웨이브의 쌍뿔아겔로스,삼미아겔로스가 알파개체로 변경(알파개체 : 체력 50% 증가)'
      }
    ]
  },

  {
    tier: 3,
    cards: [
      {
        id: '3-1',
        col: 1,
        icon: 'assets/icons/위축3.png',
        name: '팀: 위축 III',
        pts: 3,
        group: 'g1',
        lineTop: true,
        desc: '오퍼레이터의 주요 능력치 -40%'
      },

      { empty: true, col: 2 },

      {
        id: '3-3',
        col: 3,
        icon: 'assets/icons/시간3.png',
        name: '환경: 시간 제한 III',
        pts: 3,
        group: 'g3',
        lineTop: true,
        desc: '카운트다운 -300초 (제한시간 5분)'
      },
      {
        id: '3-4',
        col: 4,
        icon: 'assets/icons/활성3.png',
        name: '조작: 활성 III',
        pts: 3,
        group: 'g4',
        lineTop: true,
        desc: '적 생명력 +200%'
      },

      { empty: true, col: 5 },
      { empty: true, col: 6 },

      {
        id: '3-7',
        col: 7,
        icon: 'assets/icons/속박.png',
        name: '환경: 속박',
        pts: 3,
        group: 'g7',
        lineTop: true,
        desc: '회피 불가'
      },

      { empty: true, col: 8 },
      { empty: true, col: 9 },

      {
        id: '3-10',
        col: 10,
        icon: 'assets/icons/피로.png',
        name: '팀: 피로',
        pts: 3,
        desc: '오퍼레이터의 일반공격 피해 -70%'
      },
      {
        id: '3-11',
        col: 11,
        icon: 'assets/icons/쇠퇴.png',
        name: '팀: 쇠약',
        pts: 3,
        desc: '오퍼레이터가 받은 데미지의 일부 수치만큼 최대 생명력 감소(근거리오퍼:30%,원거리오퍼:50%)'
      },
      {
        id: '3-12',
        col: 12,
        icon: 'assets/icons/과속.png',
        name: '환경: 과속',
        pts: 3,
        group: 'yellow-key',
        key: true,
        lineRight: true,
        desc: '오퍼레이터 연계스킬 쿨타임 -60%, 배틀스킬 피해 -60%'
      },
      {
        id: '3-13',
        col: 13,
        icon: 'assets/icons/충격.png',
        name: '환경: 충격',
        pts: 3,
        group: 'yellow-key',
        key: true,
        lineLeft: true,
        desc: '오퍼레이터 일반공격, 배틀스킬,연계스킬, 궁극기 이외의 피해 +100%, 배틀스킬 피해 -60%'
      },

      { empty: true, col: 14 },
      { empty: true, col: 15 },
      { empty: true, col: 16 },
      { empty: true, col: 17 },
      { empty: true, col: 18 },
      { empty: true, col: 19 },
      { empty: true, col: 20 },
      { empty: true, col: 21 },
      { empty: true, col: 22 },
      {
        id: '3-23',
        col: 23,
        icon: 'assets/icons/재구성.png',
        name: '환경: 재구성 II',
        pts: 3,
        group: 'g16',
        lineTop: true,
        unlockable: true,
        requiresAny: ['3-12', '3-13'],
        desc: '3,4 웨이브의 쌍뿔아겔로스,삼미아겔로스가 알파개체로 변경(알파개체 : 체력 50% 증가)'
      }
    ]
  }
];
