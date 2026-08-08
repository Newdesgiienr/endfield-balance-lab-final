window.CONSTRAINT_CATALOG = [
  {
    id: 'team-major-stat-limit', category: '팀', label: '주요 능력치 제한', baseline: true,
    matchAny: ['주력 화력', '피해', '화력 집중'],
    feature: '파티 전체의 공격 관련 주요 능력치를 낮춰 기본 화력 여유를 줄입니다.',
    description: '같은 제약을 적용 계수에 따라 1·2·3단계로 강화할 수 있습니다. 현재 데이터에서는 구체 수치 대신 제한 기능만 제안합니다.',
    impact: '주력 순환을 한 번 성공시키는 것뿐 아니라 반복 운용과 보조 피해원의 기여도가 중요해집니다.'
  },
  {
    id: 'team-normal-attack-limit', category: '팀', label: '일반 공격 피해 제한',
    matchAny: ['generalAttack', '일반 공격', '강력한 일격', '일반 공격 의존도'],
    feature: '일반 공격과 강화 일반 공격에 집중된 피해 효율을 낮춥니다.',
    description: '일반 공격 자체를 금지하지 않고 피해 기여도만 단계적으로 제한하는 제약입니다.',
    impact: '배틀 스킬·연계 스킬·궁극기 또는 설치형 효과를 섞는 대체 운용의 가치가 높아집니다.'
  },
  {
    id: 'team-battle-skill-limit', category: '팀', label: '배틀 스킬 피해 제한',
    matchAny: ['battleSkill', '배틀 스킬', '배틀 스킬 피해 비중'],
    feature: '배틀 스킬의 직접 피해 효율을 낮추되 상태 생성과 후속 조건은 유지합니다.',
    description: '배틀 스킬을 완전히 막지 않고, 피해 수단과 조건 준비 수단을 분리해서 시험하는 제약입니다.',
    impact: '배틀 스킬은 준비 용도로 남고 연계 스킬·궁극기·일반 공격의 상대 가치가 올라갑니다.'
  },
  {
    id: 'team-link-skill-limit', category: '팀', label: '연계 스킬 발동 제한',
    matchAny: ['linkSkill', '연계 스킬', '연계 스킬 빈도'],
    feature: '연계 스킬의 발동 빈도 또는 재사용 여유를 단계적으로 줄입니다.',
    description: '조건 자체를 삭제하지 않고 연계 스킬을 연속으로 반복하기 어렵게 만드는 제약입니다.',
    impact: '조건을 여는 순서와 연계 스킬 사이에 넣는 보조 행동의 중요도가 높아집니다.'
  },
  {
    id: 'team-ultimate-repeat-limit', category: '팀', label: '궁극기 반복 제한',
    matchAny: ['ultimate', '궁극기', '궁극기 반복 의존도', '궁극기 에너지'],
    feature: '같은 캐릭터가 궁극기를 반복 사용할 때 후속 사용의 효율을 제한합니다.',
    description: '첫 궁극기는 유지하고 반복 사용에만 단계별 제한을 적용해 준비 과정의 의미를 보존합니다.',
    impact: '첫 폭발 구간 이후 배틀 스킬·연계 스킬·일반 공격으로 이어지는 두 번째 순환이 중요해집니다.'
  },
  {
    id: 'team-resource-gain-limit', category: '팀', label: '전투 자원 획득 제한',
    matchAny: ['skillGauge', 'skillGaugeReturn', 'ultimateEnergy', '스킬 게이지', '궁극기 에너지', '전투 자원 확보 방식'],
    feature: '스킬 게이지와 궁극기 에너지의 획득 속도를 낮춥니다.',
    description: '자연 회복과 능동 회복을 모두 막지 않고, 한쪽 자원 축만 단계적으로 제한하는 제약입니다.',
    impact: '자원 반환, 처형, 강력한 일격, 연계 스킬 등 능동적인 자원 확보 수단의 가치가 커집니다.'
  },
  {
    id: 'team-healing-protection-limit', category: '팀', label: '치유·보호 효과 제한',
    matchAny: ['healing', 'protection', 'fortification', '치유', '보호', '비호', '대형 치유·보호 사용'],
    feature: '치유량과 보호 효과의 효율을 낮춰 안전하게 버티는 여유를 줄입니다.',
    description: '생존 수단을 삭제하지 않고 적용 계수에 따라 효율만 조절하는 제약입니다.',
    impact: '회피, 제어, 피해 감소, 적 처치 속도 등 회복 이외의 생존 방식이 더 중요해집니다.'
  },
  {
    id: 'control-switch-limit', category: '조작', label: '캐릭터 교대 제한',
    matchAny: ['mainControl', '메인 컨트롤', '메인 컨트롤 점유'],
    feature: '메인 컨트롤 캐릭터를 교대할 수 있는 빈도나 시점을 제한합니다.',
    description: '교대를 완전히 금지하기보다 단계별로 교대 간격을 늘리는 방식으로 적용할 수 있습니다.',
    impact: '비조작 상태에서도 작동하는 연계 스킬·설치 효과·지원 효과의 가치가 올라갑니다.'
  },
  {
    id: 'control-dodge-limit', category: '조작', label: '회피 사용 제한', baseline: true,
    matchAny: ['회피', '생존', '근거리', '메인 컨트롤'],
    feature: '회피 사용 횟수 또는 회피 자원 회복을 제한합니다.',
    description: '캐릭터 메커니즘과 무관하게 기본 조작 안정성을 시험하는 공통 제약입니다.',
    impact: '위치 선정, 제어 활용, 보호·치유 타이밍과 적 패턴 대응의 중요도가 높아집니다.'
  },
  {
    id: 'control-stack-application-limit', category: '조작', label: '부착 스택 연속 적용 제한',
    matchAny: ['artsInfliction', 'defenseless', 'Infliction', '부착', '방어 불능', '부착·방어 불능 축적 속도'],
    feature: '같은 적에게 동일한 부착 또는 방어 불능 스택을 연속으로 적용하는 속도를 제한합니다.',
    description: '부착 자체는 허용하되 연속 적용 간격을 단계적으로 늘리는 제약입니다.',
    impact: '최대 스택 도달이 늦어지고 낮은 스택에서도 작동하는 스킬과 강제 상태 부여의 가치가 올라갑니다.'
  },
  {
    id: 'control-control-duration-cost', category: '조작', label: '제어 유지 제한',
    matchAny: ['freeze', 'launch', 'knockdown', 'slow', '동결', '띄우기', '넘어뜨리기', '제어 유지 시간'],
    feature: '적을 장시간 제어할수록 효율이 낮아지거나 반대급부가 생기도록 제한합니다.',
    description: '제어 면역 대신 유지 시간과 반복 사용에 단계별 부담을 주는 제약입니다.',
    impact: '제어를 오래 유지하기보다 강타·쇄빙·집중 공격으로 빠르게 전환하는 선택이 중요해집니다.'
  },
  {
    id: 'environment-time-limit', category: '환경', label: '제한 시간 단축', baseline: true,
    matchAny: ['준비', '순서', '스택', '궁극기', '전투 순환'],
    feature: '전투에 주어진 제한 시간을 줄입니다.',
    description: '파티 메커니즘과 무관하게 준비 속도와 실전 성공률을 확인하는 기본 제약입니다.',
    impact: '긴 준비 과정, 실패 복구, 두 번째 전투 순환에 사용할 수 있는 시간이 줄어듭니다.'
  },
  {
    id: 'environment-recovery-scarcity', category: '환경', label: '웨이브 간 회복 제한',
    matchAny: ['healing', '치유', '생존', '회복'],
    feature: '웨이브 사이에 제공되는 회복 수단이나 회복 기회를 줄입니다.',
    description: '전투 중 치유와 웨이브 사이 회복을 분리해서 시험할 수 있는 환경 제약입니다.',
    impact: '누적 피해 관리와 파티 내부의 치유·보호·정화 수단이 더 중요해집니다.'
  },
  {
    id: 'environment-periodic-hazard', category: '환경', label: '지속 위험 지대 추가', baseline: true,
    matchAny: ['제어', '메인 컨트롤', '근거리', '설치'],
    feature: '전장 일부에 지속 피해나 이동을 강요하는 위험 지대를 추가합니다.',
    description: '특정 캐릭터 메커니즘이 아니라 위치 선정과 조작 유연성을 시험하는 기본 제약입니다.',
    impact: '고정 위치에서 준비하는 스킬과 긴 시전 구간의 안정성이 낮아지고 이동 중 운용 능력이 중요해집니다.'
  }
];
