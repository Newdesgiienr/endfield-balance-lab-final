window.CONSTRAINT_BOARD_DEFAULT_VERSIONS = [
  {
    "id": "version-883c4131-84c4-4dc2-9fe8-8708745b7911",
    "name": "v1.0",
    "memo": "제약 설계 초안",
    "createdAt": "2026-07-28T07:11:11.406Z",
    "snapshot": {
      "schemaVersion": 1,
      "projectId": "constraint-project-776675a0-07b4-44a9-8381-f7532cda9e82",
      "markers": [
        {
          "id": "constraint-c67ed6e6-b8e8-4017-9d8b-64c5b6d0b74d",
          "category": "조작",
          "label": "적이 주는 피해 1",
          "title": "적이 주는 피해 [+N%]",
          "description": "적이 플레이어에게 가하는  피해가 \n[N%] 증가합니다.",
          "tier": 1,
          "x": 0.06521739130434782,
          "y": 0.5,
          "gridCol": 1,
          "gridRow": 0,
          "layoutOrder": 1,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T13:51:11.953Z",
          "updatedAt": "2026-07-26T11:25:00.032Z"
        },
        {
          "id": "constraint-13385690-ec41-4bee-81bb-7c0cd4838ee5",
          "category": "조작",
          "label": "적이 주는 피해 2",
          "title": "적이 주는 피해 [++N%]",
          "description": "적이 플레이어에게 가하는  피해가 \n[N++%] 증가합니다.",
          "tier": 2,
          "x": 0.06521739130434782,
          "y": 0.5,
          "gridCol": 1,
          "gridRow": 0,
          "layoutOrder": 1,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T13:52:44.999Z",
          "updatedAt": "2026-07-26T11:25:00.032Z"
        },
        {
          "id": "constraint-d56b1044-3b47-4715-a84a-25d11cf5fa48",
          "category": "환경",
          "label": "시간제한 1",
          "title": "클리어 타임 N초 감소",
          "description": "기본 클리어 제한 시간 10분에서\nN초 감소",
          "tier": 1,
          "x": 0.10869565217391304,
          "y": 0.5,
          "gridCol": 2,
          "gridRow": 0,
          "layoutOrder": 2,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T13:55:14.297Z",
          "updatedAt": "2026-07-26T10:23:14.288Z"
        },
        {
          "id": "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de",
          "category": "환경",
          "label": "시간제한 2",
          "title": "클리어 타임 [--N초] 감소",
          "description": "기본 클리어 제한 시간 [600초][10분] 에서\n[N초 감소]",
          "tier": 2,
          "x": 0.10869565217391304,
          "y": 0.5,
          "gridCol": 2,
          "gridRow": 0,
          "layoutOrder": 2,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T13:56:24.842Z",
          "updatedAt": "2026-07-27T11:08:37.360Z"
        },
        {
          "id": "constraint-8d1211ab-8796-495d-8585-168711c868d6",
          "category": "조작",
          "label": "적 생명력 1",
          "title": "적 생명력 [+N%]",
          "description": "적 생명력 [+N%]",
          "tier": 1,
          "x": 0.15217391304347827,
          "y": 0.5,
          "gridCol": 3,
          "gridRow": 0,
          "layoutOrder": 3,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T14:19:56.168Z",
          "updatedAt": "2026-07-26T11:24:58.622Z"
        },
        {
          "id": "constraint-81f0f266-11d3-4d88-af1c-d03344149293",
          "category": "조작",
          "label": "적 생명력 2",
          "title": "적 생명력 [+N%]",
          "description": "적 생명력 [+N%]",
          "tier": 2,
          "x": 0.15217391304347827,
          "y": 0.5,
          "gridCol": 3,
          "gridRow": 0,
          "layoutOrder": 3,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T14:20:13.440Z",
          "updatedAt": "2026-07-26T11:24:58.622Z"
        },
        {
          "id": "constraint-f809c887-1ce6-4092-91b3-071baea5be39",
          "category": "팀",
          "label": "메인 오퍼 받는 피해 1",
          "title": "메인 오퍼 받는 피해 1",
          "description": "메인 컨트롤 오퍼레이터가 받는 피해 [+N%]",
          "tier": 1,
          "x": 0.1956521739130435,
          "y": 0.5,
          "gridCol": 4,
          "gridRow": 0,
          "layoutOrder": 4,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T06:55:02.719Z",
          "updatedAt": "2026-07-26T10:23:14.288Z"
        },
        {
          "id": "constraint-26907513-206c-4a68-83ab-f97172b2e9a6",
          "category": "팀",
          "label": "메인 오퍼 받는 피해 2",
          "title": "메인 오퍼 받는 피해 2",
          "description": "메인 컨트롤 오퍼레이터가 받는 피해 [+N%]",
          "tier": 2,
          "x": 0.1956521739130435,
          "y": 0.5,
          "gridCol": 4,
          "gridRow": 0,
          "layoutOrder": 4,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T06:55:23.102Z",
          "updatedAt": "2026-07-26T10:23:14.288Z"
        },
        {
          "id": "constraint-5bc259e4-b739-4c6e-9c2a-7b3745f0e9e1",
          "category": "환경",
          "label": "기력 회복 속도 감소 1",
          "title": "기력 회복 속도 감소 1",
          "description": "기력 회복 속도 [-50%]",
          "tier": 1,
          "x": 0.2391304347826087,
          "y": 0.5,
          "gridCol": 5,
          "gridRow": 0,
          "layoutOrder": 5,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T06:56:58.455Z",
          "updatedAt": "2026-07-26T10:23:14.288Z"
        },
        {
          "id": "constraint-83a3d8f1-453b-4b38-aabe-4c23c4297821",
          "category": "환경",
          "label": "회피 불가",
          "title": "회피 불가",
          "description": "메인 오퍼레이터는 회피를 사용할 수 없습니다.",
          "tier": 2,
          "x": 0.2391304347826087,
          "y": 0.5,
          "gridCol": 5,
          "gridRow": 0,
          "layoutOrder": 5,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T06:57:11.307Z",
          "updatedAt": "2026-07-26T10:23:14.288Z"
        },
        {
          "id": "constraint-acdcff94-ff70-446c-a237-91375ad47463",
          "category": "환경",
          "label": "치유 물질 생성 감소",
          "title": "치유 물질 생성 감소",
          "description": "웨이브 사이에 치유 물질이 1개만 생성",
          "tier": 1,
          "x": 0.2826086956521739,
          "y": 0.5,
          "gridCol": 6,
          "gridRow": 0,
          "layoutOrder": 6,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T07:22:37.530Z",
          "updatedAt": "2026-07-26T10:23:14.288Z"
        },
        {
          "id": "constraint-b5fc4699-06a4-46f7-a05d-10086e052532",
          "category": "환경",
          "label": "치유 물질 생성 제한",
          "title": "치유 물질 생성 제한",
          "description": "웨이브 사이에 치유 물질이 생성되지 않음",
          "tier": 2,
          "x": 0.2826086956521739,
          "y": 0.5,
          "gridCol": 6,
          "gridRow": 0,
          "layoutOrder": 6,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T07:23:02.744Z",
          "updatedAt": "2026-07-26T10:23:14.288Z"
        },
        {
          "id": "constraint-3371d3b1-a318-4c07-86c0-e9dbd30b31d3",
          "category": "팀",
          "label": "궁극기 피해 감소 1",
          "title": "궁극기 피해 감소 1",
          "description": "오퍼레이터가 궁극기를 1회 사용할 때마다, 해당 오퍼레이터가 이후 사용하는 궁극기 피해 [-50%] 감소",
          "tier": 1,
          "x": 0.32608695652173914,
          "y": 0.5,
          "gridCol": 7,
          "gridRow": 0,
          "layoutOrder": 7,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T07:26:06.017Z",
          "updatedAt": "2026-07-26T10:23:14.288Z"
        },
        {
          "id": "constraint-de114359-c53b-416b-b3ae-405ab72b6ea4",
          "category": "팀",
          "label": "궁극기 피해 감소 2",
          "title": "궁극기 피해 감소 2",
          "description": "오퍼레이터가 궁극기를 1회 사용할 때마다, 해당 오퍼레이터가 이후 사용하는 궁극기 피해 [-100%] 감소",
          "tier": 2,
          "x": 0.32608695652173914,
          "y": 0.5,
          "gridCol": 7,
          "gridRow": 0,
          "layoutOrder": 7,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T07:26:24.360Z",
          "updatedAt": "2026-07-26T10:23:14.288Z"
        },
        {
          "id": "constraint-74cde916-7cfa-4230-a96b-e553daec56ff",
          "category": "팀",
          "label": "일반 공격 피해 감소",
          "title": "일반 공격 피해 감소",
          "description": "오퍼레이터의 일반 공격 피해 [-70%]",
          "tier": 2,
          "x": 0.3695652173913043,
          "y": 0.5,
          "gridCol": 8,
          "gridRow": 0,
          "layoutOrder": 8,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:09:17.017Z",
          "updatedAt": "2026-07-27T07:37:45.449Z"
        },
        {
          "id": "constraint-9cdb62e8-085b-49a4-86d5-a1d44bf440ac",
          "category": "팀",
          "label": "스킬 게이지 자연회복 중단",
          "title": "스킬 게이지 자연회복 중단",
          "description": "메인 컨트롤 오퍼레이터가 [12초] 내에 강력한 일격 피해를 주지 않으면, 스킬 게이지 자연 회복 중단",
          "tier": 1,
          "x": 0.3695652173913043,
          "y": 0.5,
          "gridCol": 8,
          "gridRow": 0,
          "layoutOrder": 8,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:10:46.703Z",
          "updatedAt": "2026-07-26T10:10:56.353Z"
        },
        {
          "id": "constraint-d997df22-39a5-4b6d-a243-5f4cd00f1f5d",
          "category": "환경",
          "label": "연계/배틀 스킬 쿨감/약화",
          "title": "연계/배틀 스킬 쿨감/약화",
          "description": "오퍼레이터 \n연계 스킬 쿨타임 [-N%]\n배틀 스킬 피해 [-N%]",
          "tier": 3,
          "x": 0.41304347826086957,
          "y": 0.5,
          "gridCol": 9,
          "gridRow": 0,
          "layoutOrder": 9,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:21:01.267Z",
          "updatedAt": "2026-07-26T10:21:10.378Z"
        },
        {
          "id": "constraint-bb996e82-a3fb-452b-9375-ae6315286b87",
          "category": "환경",
          "label": "물리/아츠 강화",
          "title": "물리/아츠 강화",
          "description": "오퍼레이터 일반 공격, 배틀 스킬, 연계 스킬, 궁극기 이외의 피해 [+N%]\n\n배틀 스킬 피해 [-N%]",
          "tier": 3,
          "x": 0.45652173913043476,
          "y": 0.5,
          "gridCol": 10,
          "gridRow": 0,
          "layoutOrder": 10,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:22:24.947Z",
          "updatedAt": "2026-07-26T11:21:29.624Z"
        },
        {
          "id": "constraint-e8e63da7-85f4-428b-bff8-0361c634a5f9",
          "category": "환경",
          "label": "메인 오퍼레이터 전환 불가",
          "title": "메인 오퍼레이터 전환 불가",
          "description": "전투가 시작된 후 메인 컨트롤 오퍼레이터 전환 불가",
          "tier": 2,
          "x": 0.5,
          "y": 0.5,
          "gridCol": 11,
          "gridRow": 0,
          "layoutOrder": 11,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:24:33.442Z",
          "updatedAt": "2026-07-26T10:24:37.385Z"
        },
        {
          "id": "constraint-56f6527a-cd59-4d06-8453-bb8b92e6feb4",
          "category": "조작",
          "label": "적 사망 시 독성 장판 1",
          "title": "적 사망 시 독성 장판 1",
          "description": "처치 당한 적이 독성 물질을 남기고 오퍼레이터가 독성 물질의 범위에 있을 때, 매 초마다 최대 생명력의 [N%] 피해를 입음",
          "tier": 1,
          "x": 0.5434782608695652,
          "y": 0.5,
          "gridCol": 12,
          "gridRow": 0,
          "layoutOrder": 12,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:28:50.511Z",
          "updatedAt": "2026-07-26T10:29:13.501Z"
        },
        {
          "id": "constraint-4eb8e789-3c54-474b-906b-492d84e325a1",
          "category": "조작",
          "label": "적 사망 시 독성 장판 1",
          "title": "적 사망 시 독성 장판 2",
          "description": "처치 당한 적이 독성 물질을 남기고 오퍼레이터가 독성 물질의 범위에 있을 때, 매 초마다 최대 생명력의 [N%] 피해를 입음",
          "tier": 2,
          "x": 0.5434782608695652,
          "y": 0.5,
          "gridCol": 12,
          "gridRow": 0,
          "layoutOrder": 12,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:29:00.992Z",
          "updatedAt": "2026-07-26T10:29:23.054Z"
        },
        {
          "id": "constraint-9830f340-5aab-451e-9b75-5726018813a3",
          "category": "팀",
          "label": "배틀 스킬 횟수 제한: 냉기 1",
          "title": "배틀 스킬 횟수 제한: 냉기 1",
          "description": "오퍼레이터가 [배틀 스킬]을  [2회] 사용할 때마다 메인 컨트롤 오퍼레이터에게 [냉기 부착 1스택] 부여 \n\n* 각 오퍼레이터 당 발동 가능 쿨타임 [3초]",
          "tier": 1,
          "x": 0.5869565217391305,
          "y": 0.5,
          "gridCol": 13,
          "gridRow": 0,
          "layoutOrder": 13,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:34:11.770Z",
          "updatedAt": "2026-07-26T10:36:16.045Z"
        },
        {
          "id": "constraint-484b0e70-0078-4e17-82a2-1bd54068721b",
          "category": "팀",
          "label": "배틀 스킬 횟수 제한: 냉기 2",
          "title": "배틀 스킬 횟수 제한: 냉기 2",
          "description": "오퍼레이터가 [배틀 스킬]을  [1회] 사용할 때마다 메인 컨트롤 오퍼레이터에게 [냉기 부착 1스택] 부여 \n\n* 각 오퍼레이터 당 발동 가능 쿨타임 [3초]",
          "tier": 2,
          "x": 0.5869565217391305,
          "y": 0.5,
          "gridCol": 13,
          "gridRow": 0,
          "layoutOrder": 13,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:34:37.321Z",
          "updatedAt": "2026-07-26T10:36:25.749Z"
        },
        {
          "id": "constraint-069af05b-3595-4c34-b196-9ac364c216c1",
          "category": "팀",
          "label": "연계 스킬 횟수 제한: 냉기 1",
          "title": "연계 스킬 횟수 제한: 냉기 1",
          "description": "오퍼레이터가 연계 스킬을 2회 사용할 때마다 메인 컨트롤 오퍼레이터에게 [냉기 부착 1스택] 부여\n\n* 각 오퍼레이터당 발동 가능한 쿨타임 [3초]",
          "tier": 1,
          "x": 0.6304347826086957,
          "y": 0.5,
          "gridCol": 14,
          "gridRow": 0,
          "layoutOrder": 14,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:37:10.982Z",
          "updatedAt": "2026-07-26T10:37:29.020Z"
        },
        {
          "id": "constraint-07f55139-50ef-4ad9-8b32-cae5ef602775",
          "category": "팀",
          "label": "연계 스킬 횟수 제한: 냉기 2",
          "title": "연계 스킬 횟수 제한: 냉기 2",
          "description": "오퍼레이터가 연계 스킬을 1회 사용할 때마다 메인 컨트롤 오퍼레이터에게 [냉기 부착 1스택] 부여\n\n* 각 오퍼레이터당 발동 가능한 쿨타임 [3초]",
          "tier": 2,
          "x": 0.6304347826086957,
          "y": 0.5,
          "gridCol": 14,
          "gridRow": 0,
          "layoutOrder": 14,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:37:23.626Z",
          "updatedAt": "2026-07-26T10:37:29.697Z"
        },
        {
          "id": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "category": "조작",
          "label": "냉기 피격 시 즉시 동결",
          "title": "냉기 피격 시 즉시 동결",
          "description": "적이 메인 컨트롤 오퍼레이터에게 [냉기]를 적용하면, 공격을 받은 메인 오퍼레이터가 [즉시 동결] 상태가 됩니다.",
          "tier": 2,
          "x": 0.6739130434782609,
          "y": 0.5,
          "gridCol": 15,
          "gridRow": 0,
          "layoutOrder": 15,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:43:50.128Z",
          "updatedAt": "2026-07-26T10:52:08.584Z"
        },
        {
          "id": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "category": "환경",
          "label": "동결 시간 증가 / 열기 해제",
          "title": "동결 시간 증가 / 열기 해제",
          "description": "오퍼레이터가 받는 동결 지속 시간 [15초 증가]\n* 기존 동결 지속 시간 [5초]\n[열기 유형 스킬]을 사용할 경우, [동결 해제] 가능",
          "tier": 1,
          "x": 0.6739130434782609,
          "y": 0.5,
          "gridCol": 15,
          "gridRow": 0,
          "layoutOrder": 15,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:01:45.737Z",
          "updatedAt": "2026-07-26T11:04:36.396Z"
        },
        {
          "id": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "category": "환경",
          "label": "동결 시간 증가 / 자연 해제",
          "title": "동결 시간 증가 / 자연 해제",
          "description": "오퍼레이터가 받는 동결 지속 시간 [15초 증가]\n* 기존 동결 지속 시간 [5초]\n[자연 유형 스킬]을 사용할 경우, [동결 해제] 가능",
          "tier": 1,
          "x": 0.717391304347826,
          "y": 0.5,
          "gridCol": 16,
          "gridRow": 0,
          "layoutOrder": 16,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:02:13.479Z",
          "updatedAt": "2026-07-26T11:03:42.642Z"
        },
        {
          "id": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "category": "환경",
          "label": "동결 시간 증가 / 전기 해제",
          "title": "동결 시간 증가 / 전기 해제",
          "description": "오퍼레이터가 받는 동결 지속 시간 [15초 증가]\n* 기존 동결 지속 시간 [5초]\n[전기 유형 스킬]을 사용할 경우, [동결 해제] 가능",
          "tier": 1,
          "x": 0.7608695652173914,
          "y": 0.5,
          "gridCol": 17,
          "gridRow": 0,
          "layoutOrder": 17,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:02:46.126Z",
          "updatedAt": "2026-07-26T11:03:51.802Z"
        },
        {
          "id": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "category": "환경",
          "label": "동결 시간 증가 / 물리 해제",
          "title": "동결 시간 증가 / 물리 해제",
          "description": "오퍼레이터가 받는 동결 지속 시간 [15초 증가]\n* 기존 동결 지속 시간 [5초]\n[물리 유형 스킬]을 사용할 경우, [동결 해제] 가능",
          "tier": 1,
          "x": 0.8043478260869565,
          "y": 0.5,
          "gridCol": 18,
          "gridRow": 0,
          "layoutOrder": 18,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:03:13.810Z",
          "updatedAt": "2026-07-26T11:03:52.551Z"
        },
        {
          "id": "constraint-5d254c10-f50f-494b-8962-b179e5ad01fd",
          "category": "조작",
          "label": "적 제어 효과 부여 시 회복 1",
          "title": "적 제어 효과 부여 시 회복 1",
          "description": "적이 군중 제어 효과에 걸리면 초당 최대 생명력의 [N%]를 회복합니다.",
          "tier": 1,
          "x": 0.8478260869565217,
          "y": 0.5,
          "gridCol": 19,
          "gridRow": 0,
          "layoutOrder": 19,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:24:18.235Z",
          "updatedAt": "2026-07-26T11:29:21.582Z"
        },
        {
          "id": "constraint-1810b8df-62c6-4808-9b10-d420058309e4",
          "category": "조작",
          "label": "적 제어 효과 부여 시 회복 2",
          "title": "적 제어 효과 부여 시 회복 2",
          "description": "적이 군중 제어 효과에 걸리면 초당 최대 생명력의 [N%]를 회복합니다.",
          "tier": 2,
          "x": 0.8478260869565217,
          "y": 0.5,
          "gridCol": 19,
          "gridRow": 0,
          "layoutOrder": 19,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:24:28.391Z",
          "updatedAt": "2026-07-26T11:24:38.701Z"
        },
        {
          "id": "constraint-39d4ebf9-c9fb-46ba-9213-be5f213fabea",
          "category": "환경",
          "label": "적 개체 강화 1",
          "title": "적 개체 강화 1",
          "description": "[최종(4) 웨이브]의 쌍뿔 아겔로스, 삼미 아겔로스가 \n[알파(α) 개체]로 변경\n\n* 알파(α) 개체 : 체력 [N%] 증가",
          "tier": 2,
          "x": 0.8913043478260869,
          "y": 0.5,
          "gridCol": 20,
          "gridRow": 0,
          "layoutOrder": 20,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:27:23.047Z",
          "updatedAt": "2026-07-26T11:28:37.118Z"
        },
        {
          "id": "constraint-fed9df65-4d84-423c-acd1-77baa18661fd",
          "category": "환경",
          "label": "적 개체 강화 2",
          "title": "적 개체 강화 2",
          "description": "[3, 최종(4) 웨이브]의 쌍뿔 아겔로스, 삼미 아겔로스가 \n[알파(α) 개체]로 변경\n\n* 알파(α) 개체 : 체력 [N%] 증가",
          "tier": 3,
          "x": 0.8913043478260869,
          "y": 0.5,
          "gridCol": 20,
          "gridRow": 0,
          "layoutOrder": 20,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:28:31.349Z",
          "updatedAt": "2026-07-26T11:28:38.178Z"
        },
        {
          "id": "constraint-1e2cd626-0f53-4b43-a63d-d44f19241c9e",
          "category": "팀",
          "label": "오퍼레이터 주요 능력치 감소 1",
          "title": "오퍼레이터 주요 능력치 감소 1",
          "description": "오퍼레이터 주요 능력치 [-N%]",
          "tier": 1,
          "x": 0.021739130434782608,
          "y": 0.5,
          "gridCol": 0,
          "gridRow": 0,
          "layoutOrder": 0,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:42:13.150Z",
          "updatedAt": "2026-07-27T06:16:07.639Z"
        },
        {
          "id": "constraint-8cafa6f9-b106-449b-a400-95a38952df32",
          "category": "팀",
          "label": "오퍼레이터 주요 능력치 감소 2",
          "title": "오퍼레이터 주요 능력치 감소 2",
          "description": "오퍼레이터 주요 능력치 [-N%]",
          "tier": 2,
          "x": 0.021739130434782608,
          "y": 0.5,
          "gridCol": 0,
          "gridRow": 0,
          "layoutOrder": 0,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:42:27.156Z",
          "updatedAt": "2026-07-27T06:16:07.639Z"
        }
      ],
      "relations": [
        {
          "id": "relation-cf032d63-abd0-4559-9616-c9d28a024773",
          "a": "constraint-c67ed6e6-b8e8-4017-9d8b-64c5b6d0b74d",
          "b": "constraint-13385690-ec41-4bee-81bb-7c0cd4838ee5",
          "type": "conflict",
          "createdAt": "2026-07-26T05:34:25.003Z"
        },
        {
          "id": "relation-2658715b-e109-4fdd-8c06-705ac855d24c",
          "a": "constraint-8d1211ab-8796-495d-8585-168711c868d6",
          "b": "constraint-81f0f266-11d3-4d88-af1c-d03344149293",
          "type": "conflict",
          "createdAt": "2026-07-26T05:34:27.774Z"
        },
        {
          "id": "relation-1d69be79-43cf-4b8e-b2a4-88349efb4b59",
          "a": "constraint-f809c887-1ce6-4092-91b3-071baea5be39",
          "b": "constraint-26907513-206c-4a68-83ab-f97172b2e9a6",
          "type": "conflict",
          "createdAt": "2026-07-26T06:55:39.480Z"
        },
        {
          "id": "relation-97d8d95e-b7da-4db5-b1af-23f1ff54bcd8",
          "a": "constraint-5bc259e4-b739-4c6e-9c2a-7b3745f0e9e1",
          "b": "constraint-83a3d8f1-453b-4b38-aabe-4c23c4297821",
          "type": "conflict",
          "createdAt": "2026-07-26T06:57:25.022Z"
        },
        {
          "id": "relation-3aba1ca3-5194-4934-8cda-a63746a278c7",
          "a": "constraint-d56b1044-3b47-4715-a84a-25d11cf5fa48",
          "b": "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de",
          "type": "conflict",
          "createdAt": "2026-07-26T06:58:23.942Z"
        },
        {
          "id": "relation-0659119c-bf4f-44d5-b48f-333b8dc5dc75",
          "a": "constraint-acdcff94-ff70-446c-a237-91375ad47463",
          "b": "constraint-b5fc4699-06a4-46f7-a05d-10086e052532",
          "type": "conflict",
          "createdAt": "2026-07-26T07:23:11.766Z"
        },
        {
          "id": "relation-55fa8052-095b-4bdc-b2d6-d1a0fe9e60d6",
          "a": "constraint-3371d3b1-a318-4c07-86c0-e9dbd30b31d3",
          "b": "constraint-de114359-c53b-416b-b3ae-405ab72b6ea4",
          "type": "conflict",
          "createdAt": "2026-07-26T07:26:39.919Z"
        },
        {
          "id": "relation-4d484aa6-30f5-4eb6-93aa-0aa7f175333a",
          "a": "constraint-bb996e82-a3fb-452b-9375-ae6315286b87",
          "b": "constraint-d997df22-39a5-4b6d-a243-5f4cd00f1f5d",
          "type": "conflict",
          "createdAt": "2026-07-26T10:22:53.495Z"
        },
        {
          "id": "relation-12734b1a-9f4e-4f4d-8c06-7d824f9782c6",
          "a": "constraint-56f6527a-cd59-4d06-8453-bb8b92e6feb4",
          "b": "constraint-4eb8e789-3c54-474b-906b-492d84e325a1",
          "type": "conflict",
          "createdAt": "2026-07-26T10:35:18.612Z"
        },
        {
          "id": "relation-e58ceafd-3d24-4870-b4eb-25770edfffef",
          "a": "constraint-9830f340-5aab-451e-9b75-5726018813a3",
          "b": "constraint-484b0e70-0078-4e17-82a2-1bd54068721b",
          "type": "conflict",
          "createdAt": "2026-07-26T10:35:20.258Z"
        },
        {
          "id": "relation-d1b2fbe4-2346-4b18-b9fc-c91e7c32dcd2",
          "a": "constraint-069af05b-3595-4c34-b196-9ac364c216c1",
          "b": "constraint-07f55139-50ef-4ad9-8b32-cae5ef602775",
          "type": "conflict",
          "createdAt": "2026-07-26T10:37:33.628Z"
        },
        {
          "id": "relation-76a78f94-0057-4a0b-b3b9-540273d1f57b",
          "a": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "b": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:34.933Z"
        },
        {
          "id": "relation-ef7a7237-e7ac-4625-8da5-005e463f1fe8",
          "a": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "b": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:38.105Z"
        },
        {
          "id": "relation-38728469-282a-4666-9bbc-fa2055dd9402",
          "a": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "b": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:40.117Z"
        },
        {
          "id": "relation-2be1bfba-035c-4b90-a2e2-b21ddb59fc44",
          "a": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "b": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:44.510Z"
        },
        {
          "id": "relation-199557b0-7fa4-47b4-9fd4-90e737c7d9a9",
          "a": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "b": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:46.285Z"
        },
        {
          "id": "relation-ed160eaf-fbc9-47ee-92ff-0c1b19cf094b",
          "a": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "b": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:49.224Z"
        },
        {
          "id": "relation-74a44660-50da-48d4-bbe7-7c07de21477e",
          "a": "constraint-484b0e70-0078-4e17-82a2-1bd54068721b",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:32.823Z"
        },
        {
          "id": "relation-34052c4c-3763-4449-a0ee-582728b922c8",
          "a": "constraint-07f55139-50ef-4ad9-8b32-cae5ef602775",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:34.678Z"
        },
        {
          "id": "relation-920dad56-63ae-41fb-8030-49f658362020",
          "a": "constraint-9830f340-5aab-451e-9b75-5726018813a3",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:40.055Z"
        },
        {
          "id": "relation-f4ed9d78-e771-4076-bf90-82e07ee85fee",
          "a": "constraint-069af05b-3595-4c34-b196-9ac364c216c1",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:41.468Z"
        },
        {
          "id": "relation-19e37070-a3a2-488b-8a51-1ab0a8851213",
          "a": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:43.884Z"
        },
        {
          "id": "relation-681d4e50-9a68-4029-9396-9f35303de699",
          "a": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:45.213Z"
        },
        {
          "id": "relation-817b4c09-2545-4500-a053-7843145d6eb1",
          "a": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:46.493Z"
        },
        {
          "id": "relation-eeecdaa8-f387-44c3-bc3b-67560a7036f6",
          "a": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:48.033Z"
        },
        {
          "id": "relation-1f459b3b-877a-4919-9728-d08fa5c5f286",
          "a": "constraint-39d4ebf9-c9fb-46ba-9213-be5f213fabea",
          "b": "constraint-fed9df65-4d84-423c-acd1-77baa18661fd",
          "type": "conflict",
          "createdAt": "2026-07-26T11:28:44.230Z"
        },
        {
          "id": "relation-3d50a21b-2022-4773-9249-74ed1c19b220",
          "a": "constraint-5d254c10-f50f-494b-8962-b179e5ad01fd",
          "b": "constraint-1810b8df-62c6-4808-9b10-d420058309e4",
          "type": "conflict",
          "createdAt": "2026-07-26T11:29:22.901Z"
        },
        {
          "id": "relation-c375de84-491d-4d7e-b7f3-fa921aeeda73",
          "a": "constraint-1e2cd626-0f53-4b43-a63d-d44f19241c9e",
          "b": "constraint-8cafa6f9-b106-449b-a400-95a38952df32",
          "type": "conflict",
          "createdAt": "2026-07-26T11:42:51.941Z"
        }
      ],
      "groups": [
        {
          "id": "group-ac213868-029f-45cc-b4a0-3a9a4d777482",
          "type": "normal",
          "markerIds": [
            "constraint-c67ed6e6-b8e8-4017-9d8b-64c5b6d0b74d",
            "constraint-13385690-ec41-4bee-81bb-7c0cd4838ee5"
          ],
          "createdAt": "2026-07-25T15:56:44.016Z"
        },
        {
          "id": "group-e7233a27-ff9a-4d1d-80d3-eed9cfb52561",
          "type": "normal",
          "markerIds": [
            "constraint-8d1211ab-8796-495d-8585-168711c868d6",
            "constraint-81f0f266-11d3-4d88-af1c-d03344149293"
          ],
          "createdAt": "2026-07-25T15:56:47.375Z"
        },
        {
          "id": "group-09d395f9-a72a-4398-9d65-79e0a07ef2d0",
          "type": "normal",
          "markerIds": [
            "constraint-d56b1044-3b47-4715-a84a-25d11cf5fa48",
            "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de"
          ],
          "createdAt": "2026-07-25T15:56:51.887Z"
        },
        {
          "id": "group-e3ab5682-3e00-4a36-88e5-3a40bf6c7d14",
          "type": "normal",
          "markerIds": [
            "constraint-f809c887-1ce6-4092-91b3-071baea5be39",
            "constraint-26907513-206c-4a68-83ab-f97172b2e9a6"
          ],
          "createdAt": "2026-07-26T06:56:11.401Z"
        },
        {
          "id": "group-65e7db39-86b1-4e99-abd8-862220e31c7e",
          "type": "normal",
          "markerIds": [
            "constraint-5bc259e4-b739-4c6e-9c2a-7b3745f0e9e1",
            "constraint-83a3d8f1-453b-4b38-aabe-4c23c4297821"
          ],
          "createdAt": "2026-07-26T06:57:19.077Z"
        },
        {
          "id": "group-6e97eef7-b2da-4770-bc26-112c484592d6",
          "type": "normal",
          "markerIds": [
            "constraint-acdcff94-ff70-446c-a237-91375ad47463",
            "constraint-b5fc4699-06a4-46f7-a05d-10086e052532"
          ],
          "createdAt": "2026-07-26T07:23:08.653Z"
        },
        {
          "id": "group-6cb6647a-a789-41c8-ba94-fd82518fd2ee",
          "type": "normal",
          "markerIds": [
            "constraint-3371d3b1-a318-4c07-86c0-e9dbd30b31d3",
            "constraint-de114359-c53b-416b-b3ae-405ab72b6ea4"
          ],
          "createdAt": "2026-07-26T07:26:37.214Z"
        },
        {
          "id": "group-10823366-bdc5-4ff4-a37c-03018bb9f6a5",
          "type": "gatekeeper",
          "markerIds": [
            "constraint-d997df22-39a5-4b6d-a243-5f4cd00f1f5d",
            "constraint-bb996e82-a3fb-452b-9375-ae6315286b87"
          ],
          "createdAt": "2026-07-26T10:22:32.008Z"
        },
        {
          "id": "group-d0ae0c32-cd8c-4a0e-910e-dc8ffb62d17d",
          "type": "normal",
          "markerIds": [
            "constraint-56f6527a-cd59-4d06-8453-bb8b92e6feb4",
            "constraint-4eb8e789-3c54-474b-906b-492d84e325a1"
          ],
          "createdAt": "2026-07-26T10:29:30.887Z"
        },
        {
          "id": "group-20a5ba92-9a41-4a98-a324-2495918efe74",
          "type": "normal",
          "markerIds": [
            "constraint-9830f340-5aab-451e-9b75-5726018813a3",
            "constraint-484b0e70-0078-4e17-82a2-1bd54068721b"
          ],
          "createdAt": "2026-07-26T10:35:15.704Z"
        },
        {
          "id": "group-470b9153-797c-4b4a-b99d-9768dc879b5a",
          "type": "normal",
          "markerIds": [
            "constraint-069af05b-3595-4c34-b196-9ac364c216c1",
            "constraint-07f55139-50ef-4ad9-8b32-cae5ef602775"
          ],
          "createdAt": "2026-07-26T10:37:31.278Z"
        },
        {
          "id": "group-bcae8ba5-d08a-4ef1-84b9-37ee12ca7feb",
          "type": "normal",
          "markerIds": [
            "constraint-03d66d12-d414-46be-a359-d2962d24793d",
            "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
            "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
            "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb"
          ],
          "createdAt": "2026-07-26T11:04:26.943Z"
        },
        {
          "id": "group-50df0d3f-55ae-409d-bfc0-fb18615b8eef",
          "type": "normal",
          "markerIds": [
            "constraint-5d254c10-f50f-494b-8962-b179e5ad01fd",
            "constraint-1810b8df-62c6-4808-9b10-d420058309e4"
          ],
          "createdAt": "2026-07-26T11:25:31.476Z"
        },
        {
          "id": "group-94f60558-66d3-4f74-bc9a-314062a757f5",
          "type": "normal",
          "markerIds": [
            "constraint-39d4ebf9-c9fb-46ba-9213-be5f213fabea",
            "constraint-fed9df65-4d84-423c-acd1-77baa18661fd"
          ],
          "createdAt": "2026-07-26T11:28:41.557Z"
        },
        {
          "id": "group-45f11026-09ff-4cdf-9daa-2f6379be351e",
          "type": "normal",
          "markerIds": [
            "constraint-1e2cd626-0f53-4b43-a63d-d44f19241c9e",
            "constraint-8cafa6f9-b106-449b-a400-95a38952df32"
          ],
          "createdAt": "2026-07-26T11:42:49.259Z"
        }
      ],
      "relationVisibility": {
        "conflict": true,
        "synergy": true
      },
      "secondPhaseIncluded": true,
      "trayViewAll": false,
      "boardColumns": 23,
      "updatedAt": "2026-07-28T03:55:54.828Z"
    }
  },
  {
    "id": "version-7f539348-2bba-49c1-a3bf-98a6175a7978",
    "name": "v1.1",
    "memo": "제약 수치 1차 작성 완료",
    "createdAt": "2026-08-06T06:17:44.476Z",
    "snapshot": {
      "schemaVersion": 1,
      "projectId": "constraint-project-776675a0-07b4-44a9-8381-f7532cda9e82",
      "markers": [
        {
          "id": "constraint-c67ed6e6-b8e8-4017-9d8b-64c5b6d0b74d",
          "category": "조작",
          "label": "적이 주는 피해 +30%",
          "title": "적이 주는 피해 [+N%]",
          "description": "적이 플레이어에게 가하는  피해가 \n[30%] 증가합니다.",
          "tier": 1,
          "x": 0.06521739130434782,
          "y": 0.5,
          "gridCol": 1,
          "gridRow": 0,
          "layoutOrder": 1,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T13:51:11.953Z",
          "updatedAt": "2026-08-06T05:56:24.922Z"
        },
        {
          "id": "constraint-13385690-ec41-4bee-81bb-7c0cd4838ee5",
          "category": "조작",
          "label": "적이 주는 피해 +80%",
          "title": "적이 주는 피해 [++N%]",
          "description": "적이 플레이어에게 가하는  피해가 \n[80%] 증가합니다.",
          "tier": 2,
          "x": 0.06521739130434782,
          "y": 0.5,
          "gridCol": 1,
          "gridRow": 0,
          "layoutOrder": 1,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T13:52:44.999Z",
          "updatedAt": "2026-08-06T05:56:38.975Z"
        },
        {
          "id": "constraint-d56b1044-3b47-4715-a84a-25d11cf5fa48",
          "category": "환경",
          "label": "시간제한 -100초",
          "title": "시간제한 -100초",
          "description": "기본 클리어 제한 시간 [600초]에서\n[100초] 감소\n\n제한 시간 [500초(8분 20초)]",
          "tier": 1,
          "x": 0.10869565217391304,
          "y": 0.5,
          "gridCol": 2,
          "gridRow": 0,
          "layoutOrder": 2,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T13:55:14.297Z",
          "updatedAt": "2026-08-06T06:02:33.878Z"
        },
        {
          "id": "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de",
          "category": "환경",
          "label": "시간제한 -200초",
          "title": "시간제한 -200초",
          "description": "기본 클리어 제한 시간 [600초]에서\n[200초] 감소\n\n제한 시간 [400초(6분 40초)]",
          "tier": 2,
          "x": 0.10869565217391304,
          "y": 0.5,
          "gridCol": 2,
          "gridRow": 0,
          "layoutOrder": 2,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T13:56:24.842Z",
          "updatedAt": "2026-08-06T06:01:32.182Z"
        },
        {
          "id": "constraint-8d1211ab-8796-495d-8585-168711c868d6",
          "category": "조작",
          "label": "적 생명력 +50%",
          "title": "적 생명력 +50%",
          "description": "적 생명력 [+50%]",
          "tier": 1,
          "x": 0.15217391304347827,
          "y": 0.5,
          "gridCol": 3,
          "gridRow": 0,
          "layoutOrder": 3,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T14:19:56.168Z",
          "updatedAt": "2026-08-06T06:13:55.218Z"
        },
        {
          "id": "constraint-81f0f266-11d3-4d88-af1c-d03344149293",
          "category": "조작",
          "label": "적 생명력 +100%",
          "title": "적 생명력 [+100%]",
          "description": "적 생명력 [+100%]",
          "tier": 2,
          "x": 0.15217391304347827,
          "y": 0.5,
          "gridCol": 3,
          "gridRow": 0,
          "layoutOrder": 3,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T14:20:13.440Z",
          "updatedAt": "2026-08-06T06:14:14.140Z"
        },
        {
          "id": "constraint-f809c887-1ce6-4092-91b3-071baea5be39",
          "category": "팀",
          "label": "메인 오퍼 받는 피해 +50%",
          "title": "메인 오퍼 받는 피해 +50%",
          "description": "메인 컨트롤 오퍼레이터가 받는 피해 [+50%]",
          "tier": 1,
          "x": 0.1956521739130435,
          "y": 0.5,
          "gridCol": 4,
          "gridRow": 0,
          "layoutOrder": 4,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T06:55:02.719Z",
          "updatedAt": "2026-08-06T06:15:18.883Z"
        },
        {
          "id": "constraint-26907513-206c-4a68-83ab-f97172b2e9a6",
          "category": "팀",
          "label": "메인 오퍼 받는 피해 +100%",
          "title": "메인 오퍼 받는 피해 +100%",
          "description": "메인 컨트롤 오퍼레이터가 받는 피해 [+100%]",
          "tier": 2,
          "x": 0.1956521739130435,
          "y": 0.5,
          "gridCol": 4,
          "gridRow": 0,
          "layoutOrder": 4,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T06:55:23.102Z",
          "updatedAt": "2026-08-06T06:15:33.494Z"
        },
        {
          "id": "constraint-5bc259e4-b739-4c6e-9c2a-7b3745f0e9e1",
          "category": "환경",
          "label": "기력 회복 속도 -50%",
          "title": "기력 회복 속도 -50%",
          "description": "기력 회복 속도 [-50%]",
          "tier": 1,
          "x": 0.2391304347826087,
          "y": 0.5,
          "gridCol": 5,
          "gridRow": 0,
          "layoutOrder": 5,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T06:56:58.455Z",
          "updatedAt": "2026-08-06T06:15:46.528Z"
        },
        {
          "id": "constraint-83a3d8f1-453b-4b38-aabe-4c23c4297821",
          "category": "환경",
          "label": "회피 불가",
          "title": "회피 불가",
          "description": "메인 오퍼레이터는 회피를 사용할 수 없습니다.\n[기존 달리기는 사용 가능]\n[기존 돌진은 사용 불가]",
          "tier": 2,
          "x": 0.2391304347826087,
          "y": 0.5,
          "gridCol": 5,
          "gridRow": 0,
          "layoutOrder": 5,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T06:57:11.307Z",
          "updatedAt": "2026-08-06T06:16:18.437Z"
        },
        {
          "id": "constraint-acdcff94-ff70-446c-a237-91375ad47463",
          "category": "환경",
          "label": "치유 물질 생성 감소",
          "title": "치유 물질 생성 감소",
          "description": "웨이브 사이에 치유 물질이 1개만 생성",
          "tier": 1,
          "x": 0.2826086956521739,
          "y": 0.5,
          "gridCol": 6,
          "gridRow": 0,
          "layoutOrder": 6,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T07:22:37.530Z",
          "updatedAt": "2026-07-26T10:23:14.288Z"
        },
        {
          "id": "constraint-b5fc4699-06a4-46f7-a05d-10086e052532",
          "category": "환경",
          "label": "치유 물질 생성 제한",
          "title": "치유 물질 생성 제한",
          "description": "웨이브 사이에 치유 물질이 생성되지 않음",
          "tier": 2,
          "x": 0.2826086956521739,
          "y": 0.5,
          "gridCol": 6,
          "gridRow": 0,
          "layoutOrder": 6,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T07:23:02.744Z",
          "updatedAt": "2026-07-26T10:23:14.288Z"
        },
        {
          "id": "constraint-3371d3b1-a318-4c07-86c0-e9dbd30b31d3",
          "category": "팀",
          "label": "반복 궁극기 피해 -50%",
          "title": "반복 궁극기 피해 -50%",
          "description": "오퍼레이터가 궁극기를 1회 사용할 때마다, 해당 오퍼레이터가 이후 사용하는 궁극기 피해 [-50%] 감소",
          "tier": 2,
          "x": 0.32608695652173914,
          "y": 0.5,
          "gridCol": 7,
          "gridRow": 0,
          "layoutOrder": 7,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T07:26:06.017Z",
          "updatedAt": "2026-08-06T06:16:42.467Z"
        },
        {
          "id": "constraint-de114359-c53b-416b-b3ae-405ab72b6ea4",
          "category": "팀",
          "label": "반복 궁극기 피해 -100%",
          "title": "반복 궁극기 피해 -100%",
          "description": "오퍼레이터가 궁극기를 1회 사용할 때마다, 해당 오퍼레이터가 이후 사용하는 궁극기 피해 [-100%] 감소",
          "tier": 3,
          "x": 0.32608695652173914,
          "y": 0.5,
          "gridCol": 7,
          "gridRow": 0,
          "layoutOrder": 7,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T07:26:24.360Z",
          "updatedAt": "2026-08-06T06:16:52.048Z"
        },
        {
          "id": "constraint-74cde916-7cfa-4230-a96b-e553daec56ff",
          "category": "팀",
          "label": "일반 공격 피해 -70%",
          "title": "일반 공격 피해 감소",
          "description": "오퍼레이터의 일반 공격 피해 [-70%]",
          "tier": 2,
          "x": 0.3695652173913043,
          "y": 0.5,
          "gridCol": 8,
          "gridRow": 0,
          "layoutOrder": 8,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:09:17.017Z",
          "updatedAt": "2026-08-06T06:16:59.045Z"
        },
        {
          "id": "constraint-9cdb62e8-085b-49a4-86d5-a1d44bf440ac",
          "category": "팀",
          "label": "스킬 게이지 자연회복 중단",
          "title": "스킬 게이지 자연회복 중단",
          "description": "메인 컨트롤 오퍼레이터가 [12초] 내에 강력한 일격 피해를 주지 않으면, 스킬 게이지 자연 회복 중단",
          "tier": 1,
          "x": 0.3695652173913043,
          "y": 0.5,
          "gridCol": 8,
          "gridRow": 0,
          "layoutOrder": 8,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:10:46.703Z",
          "updatedAt": "2026-08-06T05:49:55.977Z"
        },
        {
          "id": "constraint-d997df22-39a5-4b6d-a243-5f4cd00f1f5d",
          "category": "환경",
          "label": "연계/배틀 스킬 쿨감/약화",
          "title": "연계/배틀 스킬 쿨감/약화",
          "description": "오퍼레이터 \n연계 스킬 쿨타임 [-60%]\n배틀 스킬 피해 [-60%]",
          "tier": 3,
          "x": 0.41304347826086957,
          "y": 0.5,
          "gridCol": 9,
          "gridRow": 0,
          "layoutOrder": 9,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:21:01.267Z",
          "updatedAt": "2026-08-06T05:48:17.588Z"
        },
        {
          "id": "constraint-bb996e82-a3fb-452b-9375-ae6315286b87",
          "category": "환경",
          "label": "물리/아츠 강화",
          "title": "물리/아츠 강화",
          "description": "오퍼레이터 일반 공격, 배틀 스킬, 연계 스킬, 궁극기 이외의 피해 [+N%]\n\n배틀 스킬 피해 [-N%]",
          "tier": 3,
          "x": 0.45652173913043476,
          "y": 0.5,
          "gridCol": 10,
          "gridRow": 0,
          "layoutOrder": 10,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:22:24.947Z",
          "updatedAt": "2026-07-26T11:21:29.624Z"
        },
        {
          "id": "constraint-e8e63da7-85f4-428b-bff8-0361c634a5f9",
          "category": "환경",
          "label": "메인 오퍼레이터 전환 불가",
          "title": "메인 오퍼레이터 전환 불가",
          "description": "전투가 시작된 후 메인 컨트롤 오퍼레이터 전환 불가",
          "tier": 2,
          "x": 0.5,
          "y": 0.5,
          "gridCol": 11,
          "gridRow": 0,
          "layoutOrder": 11,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:24:33.442Z",
          "updatedAt": "2026-07-26T10:24:37.385Z"
        },
        {
          "id": "constraint-56f6527a-cd59-4d06-8453-bb8b92e6feb4",
          "category": "조작",
          "label": "적 사망 시 독성 장판 1",
          "title": "적 사망 시 독성 장판 1",
          "description": "처치 당한 적이 독성 물질을 남기고 오퍼레이터가 독성 물질의 범위에 있을 때, 매 초마다 최대 생명력의 [N%] 피해를 입음",
          "tier": 1,
          "x": 0.5434782608695652,
          "y": 0.5,
          "gridCol": 12,
          "gridRow": 0,
          "layoutOrder": 12,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:28:50.511Z",
          "updatedAt": "2026-07-26T10:29:13.501Z"
        },
        {
          "id": "constraint-4eb8e789-3c54-474b-906b-492d84e325a1",
          "category": "조작",
          "label": "적 사망 시 독성 장판 1",
          "title": "적 사망 시 독성 장판 2",
          "description": "처치 당한 적이 독성 물질을 남기고 오퍼레이터가 독성 물질의 범위에 있을 때, 매 초마다 최대 생명력의 [N%] 피해를 입음",
          "tier": 2,
          "x": 0.5434782608695652,
          "y": 0.5,
          "gridCol": 12,
          "gridRow": 0,
          "layoutOrder": 12,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:29:00.992Z",
          "updatedAt": "2026-07-26T10:29:23.054Z"
        },
        {
          "id": "constraint-9830f340-5aab-451e-9b75-5726018813a3",
          "category": "팀",
          "label": "배틀 스킬 횟수 제한: 냉기 1",
          "title": "배틀 스킬 횟수 제한: 냉기 1",
          "description": "오퍼레이터가 [배틀 스킬]을  [2회] 사용할 때마다 메인 컨트롤 오퍼레이터에게 [냉기 부착 1스택] 부여 \n\n* 각 오퍼레이터 당 발동 가능 쿨타임 [3초]",
          "tier": 1,
          "x": 0.5869565217391305,
          "y": 0.5,
          "gridCol": 13,
          "gridRow": 0,
          "layoutOrder": 13,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:34:11.770Z",
          "updatedAt": "2026-08-06T05:39:35.635Z"
        },
        {
          "id": "constraint-484b0e70-0078-4e17-82a2-1bd54068721b",
          "category": "팀",
          "label": "배틀 스킬 횟수 제한: 냉기 2",
          "title": "배틀 스킬 횟수 제한: 냉기 2",
          "description": "오퍼레이터가 [배틀 스킬]을  [1회] 사용할 때마다 메인 컨트롤 오퍼레이터에게 [냉기 부착 1스택] 부여 \n\n* 각 오퍼레이터 당 발동 가능 쿨타임 [3초]",
          "tier": 2,
          "x": 0.5869565217391305,
          "y": 0.5,
          "gridCol": 13,
          "gridRow": 0,
          "layoutOrder": 13,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:34:37.321Z",
          "updatedAt": "2026-08-06T05:39:36.485Z"
        },
        {
          "id": "constraint-069af05b-3595-4c34-b196-9ac364c216c1",
          "category": "팀",
          "label": "연계 스킬 횟수 제한: 냉기 1",
          "title": "연계 스킬 횟수 제한: 냉기 1",
          "description": "오퍼레이터가 연계 스킬을 2회 사용할 때마다 메인 컨트롤 오퍼레이터에게 [냉기 부착 1스택] 부여\n\n* 각 오퍼레이터당 발동 가능한 쿨타임 [3초]",
          "tier": 1,
          "x": 0.6304347826086957,
          "y": 0.5,
          "gridCol": 14,
          "gridRow": 0,
          "layoutOrder": 14,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:37:10.982Z",
          "updatedAt": "2026-07-26T10:37:29.020Z"
        },
        {
          "id": "constraint-07f55139-50ef-4ad9-8b32-cae5ef602775",
          "category": "팀",
          "label": "연계 스킬 횟수 제한: 냉기 2",
          "title": "연계 스킬 횟수 제한: 냉기 2",
          "description": "오퍼레이터가 연계 스킬을 1회 사용할 때마다 메인 컨트롤 오퍼레이터에게 [냉기 부착 1스택] 부여\n\n* 각 오퍼레이터당 발동 가능한 쿨타임 [3초]",
          "tier": 2,
          "x": 0.6304347826086957,
          "y": 0.5,
          "gridCol": 14,
          "gridRow": 0,
          "layoutOrder": 14,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:37:23.626Z",
          "updatedAt": "2026-07-26T10:37:29.697Z"
        },
        {
          "id": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "category": "조작",
          "label": "냉기 공격 피격 시 즉시 동결",
          "title": "냉기 피격 시 즉시 동결",
          "description": "적이 메인 컨트롤 오퍼레이터에게 [냉기]를 적용하면, 공격을 받은 메인 오퍼레이터가 [즉시 동결] 상태가 됩니다.\n\n* 냉기 피해 몬스터 리스트 *\n[수정 아겔로스]\n[탁류 아겔로스]\n[조류 아겔로스] (예외) 해당 제약을 적용하지 않아도 피격 시 오퍼레이터 동결 적용",
          "tier": 2,
          "x": 0.6739130434782609,
          "y": 0.5,
          "gridCol": 15,
          "gridRow": 0,
          "layoutOrder": 15,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:43:50.128Z",
          "updatedAt": "2026-08-06T05:38:13.190Z"
        },
        {
          "id": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "category": "환경",
          "label": "동결 시간 증가 / 열기속성 해제",
          "title": "동결 시간 증가 / 열기 해제",
          "description": "오퍼레이터가 받는 동결 지속 시간 [15초 증가]\n* 기존 동결 지속 시간 [5초]\n[열기 유형 스킬]을 사용할 경우, [동결 해제] 가능",
          "tier": 1,
          "x": 0.6739130434782609,
          "y": 0.5,
          "gridCol": 15,
          "gridRow": 0,
          "layoutOrder": 15,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:01:45.737Z",
          "updatedAt": "2026-08-06T05:27:53.216Z"
        },
        {
          "id": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "category": "환경",
          "label": "동결 시간 증가 / 자연속성 해제",
          "title": "동결 시간 증가 / 자연 해제",
          "description": "오퍼레이터가 받는 동결 지속 시간 [15초 증가]\n* 기존 동결 지속 시간 [5초]\n[자연 유형 스킬]을 사용할 경우, [동결 해제] 가능",
          "tier": 1,
          "x": 0.717391304347826,
          "y": 0.5,
          "gridCol": 16,
          "gridRow": 0,
          "layoutOrder": 16,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:02:13.479Z",
          "updatedAt": "2026-08-06T05:27:48.806Z"
        },
        {
          "id": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "category": "환경",
          "label": "동결 시간 증가 / 전기속성 해제",
          "title": "동결 시간 증가 / 전기 해제",
          "description": "오퍼레이터가 받는 동결 지속 시간 [15초 증가]\n* 기존 동결 지속 시간 [5초]\n[전기 유형 스킬]을 사용할 경우, [동결 해제] 가능",
          "tier": 1,
          "x": 0.7608695652173914,
          "y": 0.5,
          "gridCol": 17,
          "gridRow": 0,
          "layoutOrder": 17,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:02:46.126Z",
          "updatedAt": "2026-08-06T05:27:43.799Z"
        },
        {
          "id": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "category": "환경",
          "label": "동결 시간 증가 / 물리속성 해제",
          "title": "동결 시간 증가 / 물리 해제",
          "description": "오퍼레이터가 받는 동결 지속 시간 [15초 증가]\n* 기존 동결 지속 시간 [5초]\n[물리 유형 스킬]을 사용할 경우, [동결 해제] 가능",
          "tier": 1,
          "x": 0.8043478260869565,
          "y": 0.5,
          "gridCol": 18,
          "gridRow": 0,
          "layoutOrder": 18,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:03:13.810Z",
          "updatedAt": "2026-08-06T05:27:37.878Z"
        },
        {
          "id": "constraint-5d254c10-f50f-494b-8962-b179e5ad01fd",
          "category": "조작",
          "label": "적 제어 부여, 적 회복 5%",
          "title": "적 제어 효과 부여 시 회복 1",
          "description": "적이 군중 제어 효과에 걸리면 초당 최대 생명력의 [5%]를 회복합니다.",
          "tier": 1,
          "x": 0.8478260869565217,
          "y": 0.5,
          "gridCol": 19,
          "gridRow": 0,
          "layoutOrder": 19,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:24:18.235Z",
          "updatedAt": "2026-08-06T05:27:01.688Z"
        },
        {
          "id": "constraint-1810b8df-62c6-4808-9b10-d420058309e4",
          "category": "조작",
          "label": "적 제어 부여, 적 회복 15%",
          "title": "적 제어 효과 부여 시 회복 2",
          "description": "적이 군중 제어 효과에 걸리면 초당 최대 생명력의 [15%]를 회복합니다.",
          "tier": 2,
          "x": 0.8478260869565217,
          "y": 0.5,
          "gridCol": 19,
          "gridRow": 0,
          "layoutOrder": 19,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:24:28.391Z",
          "updatedAt": "2026-08-06T05:26:52.666Z"
        },
        {
          "id": "constraint-39d4ebf9-c9fb-46ba-9213-be5f213fabea",
          "category": "환경",
          "label": "4 웨이브 적 개체 강화",
          "title": "적 개체 강화 1",
          "description": "[최종(4) 웨이브]의 쌍뿔 아겔로스, 삼미 아겔로스가 \n[알파(α) 개체]로 변경\n\n* 알파(α) 개체 : 체력 [50%] 증가",
          "tier": 2,
          "x": 0.8913043478260869,
          "y": 0.5,
          "gridCol": 20,
          "gridRow": 0,
          "layoutOrder": 20,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:27:23.047Z",
          "updatedAt": "2026-08-06T05:27:26.582Z"
        },
        {
          "id": "constraint-fed9df65-4d84-423c-acd1-77baa18661fd",
          "category": "환경",
          "label": "3, 4 웨이브 적 개체 강화",
          "title": "적 개체 강화 2",
          "description": "[웨이브(3), 최종(4) 웨이브]의 쌍뿔 아겔로스, 삼미 아겔로스가 \n[알파(α) 개체]로 변경\n\n* 알파(α) 개체 : 체력 [50%] 증가",
          "tier": 3,
          "x": 0.8913043478260869,
          "y": 0.5,
          "gridCol": 20,
          "gridRow": 0,
          "layoutOrder": 20,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:28:31.349Z",
          "updatedAt": "2026-08-06T05:27:16.504Z"
        },
        {
          "id": "constraint-1e2cd626-0f53-4b43-a63d-d44f19241c9e",
          "category": "팀",
          "label": "오퍼레이터 주요 능력치 -10%",
          "title": "오퍼레이터 주요 능력치 감소 1",
          "description": "오퍼레이터 주요 능력치 [-10%]",
          "tier": 1,
          "x": 0.021739130434782608,
          "y": 0.5,
          "gridCol": 0,
          "gridRow": 0,
          "layoutOrder": 0,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:42:13.150Z",
          "updatedAt": "2026-08-06T05:05:22.735Z"
        },
        {
          "id": "constraint-8cafa6f9-b106-449b-a400-95a38952df32",
          "category": "팀",
          "label": "오퍼레이터 주요 능력치 -20%",
          "title": "오퍼레이터 주요 능력치 감소 2",
          "description": "오퍼레이터 주요 능력치 [-N%]",
          "tier": 2,
          "x": 0.021739130434782608,
          "y": 0.5,
          "gridCol": 0,
          "gridRow": 0,
          "layoutOrder": 0,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:42:27.156Z",
          "updatedAt": "2026-08-06T05:05:32.396Z"
        },
        {
          "id": "constraint-746d241b-dec0-4cea-9966-b9db3941eed1",
          "category": "팀",
          "label": "오퍼레이터 주요 능력치 -40%",
          "title": "오퍼레이터 주요 능력치 감소 3",
          "description": "오퍼레이터 주요 능력치 [-40%]",
          "tier": 3,
          "x": 0.021739130434782608,
          "y": 0.5,
          "gridCol": 0,
          "gridRow": 0,
          "layoutOrder": 0,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T05:06:12.981Z",
          "updatedAt": "2026-08-06T05:06:14.614Z"
        },
        {
          "id": "constraint-b6cae3b0-53a6-42bb-956f-7736795848eb",
          "category": "조작",
          "label": "상태 단계당 대응 피해 -10%",
          "title": "방어 불능/아츠 부착 단계당 대응 피해 감소",
          "description": "적에게 부착된 방어불능 또는 아츠부착 1단계마다 해당 적이 받는 부착 스택과 대응되는 데미지 -10%(해당 버프는 부착 지속시간 종료 0.1초후에 소멸)",
          "tier": 1,
          "x": 0.5,
          "y": 0.5,
          "gridCol": 11,
          "gridRow": 0,
          "layoutOrder": 11,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T05:46:17.704Z",
          "updatedAt": "2026-08-06T05:46:36.887Z"
        },
        {
          "id": "constraint-f7efab9a-f30d-4152-b69c-a795194a0a74",
          "category": "환경",
          "label": "시간제한 -300초",
          "title": "시간제한 -300초",
          "description": "기본 클리어 제한 시간 [600초]에서\n[300초] 감소\n\n제한 시간 [300초(5분)]",
          "tier": 3,
          "x": 0.10869565217391304,
          "y": 0.5,
          "gridCol": 2,
          "gridRow": 0,
          "layoutOrder": 2,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T06:00:48.210Z",
          "updatedAt": "2026-08-06T06:00:50.062Z"
        },
        {
          "id": "constraint-c031b79c-7421-470f-91e5-c5cf0925aaa4",
          "category": "조작",
          "label": "적 생명력 +200%",
          "title": "적 생명력 +200%",
          "description": "적 생명력 [+200%]",
          "tier": 3,
          "x": 0.15217391304347827,
          "y": 0.5,
          "gridCol": 3,
          "gridRow": 0,
          "layoutOrder": 3,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T06:14:30.850Z",
          "updatedAt": "2026-08-06T06:14:33.201Z"
        }
      ],
      "relations": [
        {
          "id": "relation-2658715b-e109-4fdd-8c06-705ac855d24c",
          "a": "constraint-8d1211ab-8796-495d-8585-168711c868d6",
          "b": "constraint-81f0f266-11d3-4d88-af1c-d03344149293",
          "type": "conflict",
          "createdAt": "2026-07-26T05:34:27.774Z"
        },
        {
          "id": "relation-1d69be79-43cf-4b8e-b2a4-88349efb4b59",
          "a": "constraint-f809c887-1ce6-4092-91b3-071baea5be39",
          "b": "constraint-26907513-206c-4a68-83ab-f97172b2e9a6",
          "type": "conflict",
          "createdAt": "2026-07-26T06:55:39.480Z"
        },
        {
          "id": "relation-97d8d95e-b7da-4db5-b1af-23f1ff54bcd8",
          "a": "constraint-5bc259e4-b739-4c6e-9c2a-7b3745f0e9e1",
          "b": "constraint-83a3d8f1-453b-4b38-aabe-4c23c4297821",
          "type": "conflict",
          "createdAt": "2026-07-26T06:57:25.022Z"
        },
        {
          "id": "relation-3aba1ca3-5194-4934-8cda-a63746a278c7",
          "a": "constraint-d56b1044-3b47-4715-a84a-25d11cf5fa48",
          "b": "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de",
          "type": "conflict",
          "createdAt": "2026-07-26T06:58:23.942Z"
        },
        {
          "id": "relation-0659119c-bf4f-44d5-b48f-333b8dc5dc75",
          "a": "constraint-acdcff94-ff70-446c-a237-91375ad47463",
          "b": "constraint-b5fc4699-06a4-46f7-a05d-10086e052532",
          "type": "conflict",
          "createdAt": "2026-07-26T07:23:11.766Z"
        },
        {
          "id": "relation-55fa8052-095b-4bdc-b2d6-d1a0fe9e60d6",
          "a": "constraint-3371d3b1-a318-4c07-86c0-e9dbd30b31d3",
          "b": "constraint-de114359-c53b-416b-b3ae-405ab72b6ea4",
          "type": "conflict",
          "createdAt": "2026-07-26T07:26:39.919Z"
        },
        {
          "id": "relation-4d484aa6-30f5-4eb6-93aa-0aa7f175333a",
          "a": "constraint-bb996e82-a3fb-452b-9375-ae6315286b87",
          "b": "constraint-d997df22-39a5-4b6d-a243-5f4cd00f1f5d",
          "type": "conflict",
          "createdAt": "2026-07-26T10:22:53.495Z"
        },
        {
          "id": "relation-12734b1a-9f4e-4f4d-8c06-7d824f9782c6",
          "a": "constraint-56f6527a-cd59-4d06-8453-bb8b92e6feb4",
          "b": "constraint-4eb8e789-3c54-474b-906b-492d84e325a1",
          "type": "conflict",
          "createdAt": "2026-07-26T10:35:18.612Z"
        },
        {
          "id": "relation-e58ceafd-3d24-4870-b4eb-25770edfffef",
          "a": "constraint-9830f340-5aab-451e-9b75-5726018813a3",
          "b": "constraint-484b0e70-0078-4e17-82a2-1bd54068721b",
          "type": "conflict",
          "createdAt": "2026-07-26T10:35:20.258Z"
        },
        {
          "id": "relation-d1b2fbe4-2346-4b18-b9fc-c91e7c32dcd2",
          "a": "constraint-069af05b-3595-4c34-b196-9ac364c216c1",
          "b": "constraint-07f55139-50ef-4ad9-8b32-cae5ef602775",
          "type": "conflict",
          "createdAt": "2026-07-26T10:37:33.628Z"
        },
        {
          "id": "relation-76a78f94-0057-4a0b-b3b9-540273d1f57b",
          "a": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "b": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:34.933Z"
        },
        {
          "id": "relation-ef7a7237-e7ac-4625-8da5-005e463f1fe8",
          "a": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "b": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:38.105Z"
        },
        {
          "id": "relation-38728469-282a-4666-9bbc-fa2055dd9402",
          "a": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "b": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:40.117Z"
        },
        {
          "id": "relation-2be1bfba-035c-4b90-a2e2-b21ddb59fc44",
          "a": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "b": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:44.510Z"
        },
        {
          "id": "relation-199557b0-7fa4-47b4-9fd4-90e737c7d9a9",
          "a": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "b": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:46.285Z"
        },
        {
          "id": "relation-ed160eaf-fbc9-47ee-92ff-0c1b19cf094b",
          "a": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "b": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:49.224Z"
        },
        {
          "id": "relation-74a44660-50da-48d4-bbe7-7c07de21477e",
          "a": "constraint-484b0e70-0078-4e17-82a2-1bd54068721b",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:32.823Z"
        },
        {
          "id": "relation-34052c4c-3763-4449-a0ee-582728b922c8",
          "a": "constraint-07f55139-50ef-4ad9-8b32-cae5ef602775",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:34.678Z"
        },
        {
          "id": "relation-920dad56-63ae-41fb-8030-49f658362020",
          "a": "constraint-9830f340-5aab-451e-9b75-5726018813a3",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:40.055Z"
        },
        {
          "id": "relation-f4ed9d78-e771-4076-bf90-82e07ee85fee",
          "a": "constraint-069af05b-3595-4c34-b196-9ac364c216c1",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:41.468Z"
        },
        {
          "id": "relation-19e37070-a3a2-488b-8a51-1ab0a8851213",
          "a": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:43.884Z"
        },
        {
          "id": "relation-681d4e50-9a68-4029-9396-9f35303de699",
          "a": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:45.213Z"
        },
        {
          "id": "relation-817b4c09-2545-4500-a053-7843145d6eb1",
          "a": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:46.493Z"
        },
        {
          "id": "relation-eeecdaa8-f387-44c3-bc3b-67560a7036f6",
          "a": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:48.033Z"
        },
        {
          "id": "relation-1f459b3b-877a-4919-9728-d08fa5c5f286",
          "a": "constraint-39d4ebf9-c9fb-46ba-9213-be5f213fabea",
          "b": "constraint-fed9df65-4d84-423c-acd1-77baa18661fd",
          "type": "conflict",
          "createdAt": "2026-07-26T11:28:44.230Z"
        },
        {
          "id": "relation-3d50a21b-2022-4773-9249-74ed1c19b220",
          "a": "constraint-5d254c10-f50f-494b-8962-b179e5ad01fd",
          "b": "constraint-1810b8df-62c6-4808-9b10-d420058309e4",
          "type": "conflict",
          "createdAt": "2026-07-26T11:29:22.901Z"
        },
        {
          "id": "relation-c375de84-491d-4d7e-b7f3-fa921aeeda73",
          "a": "constraint-1e2cd626-0f53-4b43-a63d-d44f19241c9e",
          "b": "constraint-8cafa6f9-b106-449b-a400-95a38952df32",
          "type": "conflict",
          "createdAt": "2026-07-26T11:42:51.941Z"
        },
        {
          "id": "relation-f579a1ee-14f1-4742-9ea4-a2aa7045e031",
          "a": "constraint-8cafa6f9-b106-449b-a400-95a38952df32",
          "b": "constraint-746d241b-dec0-4cea-9966-b9db3941eed1",
          "type": "conflict",
          "createdAt": "2026-08-06T05:07:12.767Z"
        },
        {
          "id": "relation-2af751b1-7935-4dff-bada-0a64c78ee277",
          "a": "constraint-c67ed6e6-b8e8-4017-9d8b-64c5b6d0b74d",
          "b": "constraint-13385690-ec41-4bee-81bb-7c0cd4838ee5",
          "type": "conflict",
          "createdAt": "2026-08-06T05:07:38.629Z"
        },
        {
          "id": "relation-cd5633ff-b8a7-4628-801d-a02edeaf9dff",
          "a": "constraint-f7efab9a-f30d-4152-b69c-a795194a0a74",
          "b": "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de",
          "type": "conflict",
          "createdAt": "2026-08-06T06:01:45.820Z"
        },
        {
          "id": "relation-a11865bf-b329-4c6f-b08d-b581edb65800",
          "a": "constraint-81f0f266-11d3-4d88-af1c-d03344149293",
          "b": "constraint-c031b79c-7421-470f-91e5-c5cf0925aaa4",
          "type": "conflict",
          "createdAt": "2026-08-06T06:14:38.468Z"
        }
      ],
      "groups": [
        {
          "id": "group-e7233a27-ff9a-4d1d-80d3-eed9cfb52561",
          "type": "normal",
          "markerIds": [
            "constraint-8d1211ab-8796-495d-8585-168711c868d6",
            "constraint-81f0f266-11d3-4d88-af1c-d03344149293"
          ],
          "createdAt": "2026-07-25T15:56:47.375Z"
        },
        {
          "id": "group-09d395f9-a72a-4398-9d65-79e0a07ef2d0",
          "type": "normal",
          "markerIds": [
            "constraint-d56b1044-3b47-4715-a84a-25d11cf5fa48",
            "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de"
          ],
          "createdAt": "2026-07-25T15:56:51.887Z"
        },
        {
          "id": "group-e3ab5682-3e00-4a36-88e5-3a40bf6c7d14",
          "type": "normal",
          "markerIds": [
            "constraint-f809c887-1ce6-4092-91b3-071baea5be39",
            "constraint-26907513-206c-4a68-83ab-f97172b2e9a6"
          ],
          "createdAt": "2026-07-26T06:56:11.401Z"
        },
        {
          "id": "group-65e7db39-86b1-4e99-abd8-862220e31c7e",
          "type": "normal",
          "markerIds": [
            "constraint-5bc259e4-b739-4c6e-9c2a-7b3745f0e9e1",
            "constraint-83a3d8f1-453b-4b38-aabe-4c23c4297821"
          ],
          "createdAt": "2026-07-26T06:57:19.077Z"
        },
        {
          "id": "group-6e97eef7-b2da-4770-bc26-112c484592d6",
          "type": "normal",
          "markerIds": [
            "constraint-acdcff94-ff70-446c-a237-91375ad47463",
            "constraint-b5fc4699-06a4-46f7-a05d-10086e052532"
          ],
          "createdAt": "2026-07-26T07:23:08.653Z"
        },
        {
          "id": "group-6cb6647a-a789-41c8-ba94-fd82518fd2ee",
          "type": "normal",
          "markerIds": [
            "constraint-3371d3b1-a318-4c07-86c0-e9dbd30b31d3",
            "constraint-de114359-c53b-416b-b3ae-405ab72b6ea4"
          ],
          "createdAt": "2026-07-26T07:26:37.214Z"
        },
        {
          "id": "group-10823366-bdc5-4ff4-a37c-03018bb9f6a5",
          "type": "gatekeeper",
          "markerIds": [
            "constraint-d997df22-39a5-4b6d-a243-5f4cd00f1f5d",
            "constraint-bb996e82-a3fb-452b-9375-ae6315286b87"
          ],
          "createdAt": "2026-07-26T10:22:32.008Z"
        },
        {
          "id": "group-d0ae0c32-cd8c-4a0e-910e-dc8ffb62d17d",
          "type": "normal",
          "markerIds": [
            "constraint-56f6527a-cd59-4d06-8453-bb8b92e6feb4",
            "constraint-4eb8e789-3c54-474b-906b-492d84e325a1"
          ],
          "createdAt": "2026-07-26T10:29:30.887Z"
        },
        {
          "id": "group-20a5ba92-9a41-4a98-a324-2495918efe74",
          "type": "normal",
          "markerIds": [
            "constraint-9830f340-5aab-451e-9b75-5726018813a3",
            "constraint-484b0e70-0078-4e17-82a2-1bd54068721b"
          ],
          "createdAt": "2026-07-26T10:35:15.704Z"
        },
        {
          "id": "group-470b9153-797c-4b4a-b99d-9768dc879b5a",
          "type": "normal",
          "markerIds": [
            "constraint-069af05b-3595-4c34-b196-9ac364c216c1",
            "constraint-07f55139-50ef-4ad9-8b32-cae5ef602775"
          ],
          "createdAt": "2026-07-26T10:37:31.278Z"
        },
        {
          "id": "group-bcae8ba5-d08a-4ef1-84b9-37ee12ca7feb",
          "type": "normal",
          "markerIds": [
            "constraint-03d66d12-d414-46be-a359-d2962d24793d",
            "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
            "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
            "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb"
          ],
          "createdAt": "2026-07-26T11:04:26.943Z"
        },
        {
          "id": "group-50df0d3f-55ae-409d-bfc0-fb18615b8eef",
          "type": "normal",
          "markerIds": [
            "constraint-5d254c10-f50f-494b-8962-b179e5ad01fd",
            "constraint-1810b8df-62c6-4808-9b10-d420058309e4"
          ],
          "createdAt": "2026-07-26T11:25:31.476Z"
        },
        {
          "id": "group-94f60558-66d3-4f74-bc9a-314062a757f5",
          "type": "normal",
          "markerIds": [
            "constraint-39d4ebf9-c9fb-46ba-9213-be5f213fabea",
            "constraint-fed9df65-4d84-423c-acd1-77baa18661fd"
          ],
          "createdAt": "2026-07-26T11:28:41.557Z"
        },
        {
          "id": "group-45f11026-09ff-4cdf-9daa-2f6379be351e",
          "type": "normal",
          "markerIds": [
            "constraint-1e2cd626-0f53-4b43-a63d-d44f19241c9e",
            "constraint-8cafa6f9-b106-449b-a400-95a38952df32"
          ],
          "createdAt": "2026-07-26T11:42:49.259Z"
        },
        {
          "id": "group-87c844ab-ed02-49f8-a2ba-cdbe39276317",
          "type": "normal",
          "markerIds": [
            "constraint-c67ed6e6-b8e8-4017-9d8b-64c5b6d0b74d",
            "constraint-13385690-ec41-4bee-81bb-7c0cd4838ee5"
          ],
          "createdAt": "2026-08-06T05:07:32.315Z"
        },
        {
          "id": "group-67ed1b29-b718-4d84-b1a6-8fe16f0cffac",
          "type": "normal",
          "markerIds": [
            "constraint-8cafa6f9-b106-449b-a400-95a38952df32",
            "constraint-746d241b-dec0-4cea-9966-b9db3941eed1"
          ],
          "createdAt": "2026-08-06T05:17:22.866Z"
        },
        {
          "id": "group-6948b3b3-cc04-4cd3-ab91-51f131ad1d76",
          "type": "normal",
          "markerIds": [
            "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de",
            "constraint-f7efab9a-f30d-4152-b69c-a795194a0a74"
          ],
          "createdAt": "2026-08-06T06:01:42.945Z"
        },
        {
          "id": "group-ab0ba632-ebb9-4337-bc77-c04fa99e9f4a",
          "type": "normal",
          "markerIds": [
            "constraint-81f0f266-11d3-4d88-af1c-d03344149293",
            "constraint-c031b79c-7421-470f-91e5-c5cf0925aaa4"
          ],
          "createdAt": "2026-08-06T06:14:36.109Z"
        }
      ],
      "relationVisibility": {
        "conflict": true,
        "synergy": true
      },
      "secondPhaseIncluded": true,
      "trayViewAll": false,
      "boardColumns": 23,
      "updatedAt": "2026-08-06T06:16:59.048Z"
    }
  },
  {
    "id": "version-706a4bf5-f847-4e76-994b-1b1e5cec03e9",
    "name": "v1.2",
    "memo": "1차 제약 - 47점\n2차 제약 포함 - 54점\n분할 작업 진행",
    "createdAt": "2026-08-06T06:57:24.364Z",
    "snapshot": {
      "schemaVersion": 1,
      "projectId": "constraint-project-776675a0-07b4-44a9-8381-f7532cda9e82",
      "markers": [
        {
          "id": "constraint-c67ed6e6-b8e8-4017-9d8b-64c5b6d0b74d",
          "category": "조작",
          "label": "적이 주는 피해 +30%",
          "title": "적이 주는 피해 [+N%]",
          "description": "적이 플레이어에게 가하는  피해가 \n[30%] 증가합니다.",
          "tier": 1,
          "x": 0.06521739130434782,
          "y": 0.5,
          "gridCol": 1,
          "gridRow": 0,
          "layoutOrder": 1,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T13:51:11.953Z",
          "updatedAt": "2026-08-06T05:56:24.922Z"
        },
        {
          "id": "constraint-13385690-ec41-4bee-81bb-7c0cd4838ee5",
          "category": "조작",
          "label": "적이 주는 피해 +80%",
          "title": "적이 주는 피해 [++N%]",
          "description": "적이 플레이어에게 가하는  피해가 \n[80%] 증가합니다.",
          "tier": 2,
          "x": 0.06521739130434782,
          "y": 0.5,
          "gridCol": 1,
          "gridRow": 0,
          "layoutOrder": 1,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T13:52:44.999Z",
          "updatedAt": "2026-08-06T05:56:38.975Z"
        },
        {
          "id": "constraint-d56b1044-3b47-4715-a84a-25d11cf5fa48",
          "category": "환경",
          "label": "시간제한 -100초",
          "title": "시간제한 -100초",
          "description": "기본 클리어 제한 시간 [600초]에서\n[100초] 감소\n\n제한 시간 [500초(8분 20초)]",
          "tier": 1,
          "x": 0.10869565217391304,
          "y": 0.5,
          "gridCol": 2,
          "gridRow": 0,
          "layoutOrder": 2,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T13:55:14.297Z",
          "updatedAt": "2026-08-06T06:02:33.878Z"
        },
        {
          "id": "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de",
          "category": "환경",
          "label": "시간제한 -200초",
          "title": "시간제한 -200초",
          "description": "기본 클리어 제한 시간 [600초]에서\n[200초] 감소\n\n제한 시간 [400초(6분 40초)]",
          "tier": 2,
          "x": 0.10869565217391304,
          "y": 0.5,
          "gridCol": 2,
          "gridRow": 0,
          "layoutOrder": 2,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T13:56:24.842Z",
          "updatedAt": "2026-08-06T06:01:32.182Z"
        },
        {
          "id": "constraint-8d1211ab-8796-495d-8585-168711c868d6",
          "category": "조작",
          "label": "적 생명력 +50%",
          "title": "적 생명력 +50%",
          "description": "적 생명력 [+50%]",
          "tier": 1,
          "x": 0.15217391304347827,
          "y": 0.5,
          "gridCol": 3,
          "gridRow": 0,
          "layoutOrder": 3,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T14:19:56.168Z",
          "updatedAt": "2026-08-06T06:13:55.218Z"
        },
        {
          "id": "constraint-81f0f266-11d3-4d88-af1c-d03344149293",
          "category": "조작",
          "label": "적 생명력 +100%",
          "title": "적 생명력 [+100%]",
          "description": "적 생명력 [+100%]",
          "tier": 2,
          "x": 0.15217391304347827,
          "y": 0.5,
          "gridCol": 3,
          "gridRow": 0,
          "layoutOrder": 3,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T14:20:13.440Z",
          "updatedAt": "2026-08-06T06:14:14.140Z"
        },
        {
          "id": "constraint-f809c887-1ce6-4092-91b3-071baea5be39",
          "category": "팀",
          "label": "메인 오퍼 받는 피해 +50%",
          "title": "메인 오퍼 받는 피해 +50%",
          "description": "메인 컨트롤 오퍼레이터가 받는 피해 [+50%]",
          "tier": 1,
          "x": 0.1956521739130435,
          "y": 0.5,
          "gridCol": 4,
          "gridRow": 0,
          "layoutOrder": 4,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T06:55:02.719Z",
          "updatedAt": "2026-08-06T06:15:18.883Z"
        },
        {
          "id": "constraint-26907513-206c-4a68-83ab-f97172b2e9a6",
          "category": "팀",
          "label": "메인 오퍼 받는 피해 +100%",
          "title": "메인 오퍼 받는 피해 +100%",
          "description": "메인 컨트롤 오퍼레이터가 받는 피해 [+100%]",
          "tier": 2,
          "x": 0.1956521739130435,
          "y": 0.5,
          "gridCol": 4,
          "gridRow": 0,
          "layoutOrder": 4,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T06:55:23.102Z",
          "updatedAt": "2026-08-06T06:15:33.494Z"
        },
        {
          "id": "constraint-5bc259e4-b739-4c6e-9c2a-7b3745f0e9e1",
          "category": "환경",
          "label": "기력 회복 속도 -50%",
          "title": "기력 회복 속도 -50%",
          "description": "기력 회복 속도 [-50%]",
          "tier": 1,
          "x": 0.2391304347826087,
          "y": 0.5,
          "gridCol": 5,
          "gridRow": 0,
          "layoutOrder": 5,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T06:56:58.455Z",
          "updatedAt": "2026-08-06T06:15:46.528Z"
        },
        {
          "id": "constraint-83a3d8f1-453b-4b38-aabe-4c23c4297821",
          "category": "환경",
          "label": "회피 불가",
          "title": "회피 불가",
          "description": "메인 오퍼레이터는 회피를 사용할 수 없습니다.\n[기존 달리기는 사용 가능]\n[기존 돌진은 사용 불가]",
          "tier": 2,
          "x": 0.2391304347826087,
          "y": 0.5,
          "gridCol": 5,
          "gridRow": 0,
          "layoutOrder": 5,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T06:57:11.307Z",
          "updatedAt": "2026-08-06T06:16:18.437Z"
        },
        {
          "id": "constraint-acdcff94-ff70-446c-a237-91375ad47463",
          "category": "환경",
          "label": "치유 물질 생성 감소",
          "title": "치유 물질 생성 감소",
          "description": "웨이브 사이에 치유 물질이 1개만 생성",
          "tier": 1,
          "x": 0.2826086956521739,
          "y": 0.5,
          "gridCol": 6,
          "gridRow": 0,
          "layoutOrder": 6,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T07:22:37.530Z",
          "updatedAt": "2026-07-26T10:23:14.288Z"
        },
        {
          "id": "constraint-b5fc4699-06a4-46f7-a05d-10086e052532",
          "category": "환경",
          "label": "치유 물질 생성 제한",
          "title": "치유 물질 생성 제한",
          "description": "웨이브 사이에 치유 물질이 생성되지 않음",
          "tier": 2,
          "x": 0.2826086956521739,
          "y": 0.5,
          "gridCol": 6,
          "gridRow": 0,
          "layoutOrder": 6,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T07:23:02.744Z",
          "updatedAt": "2026-07-26T10:23:14.288Z"
        },
        {
          "id": "constraint-3371d3b1-a318-4c07-86c0-e9dbd30b31d3",
          "category": "팀",
          "label": "반복 궁극기 피해 -50%",
          "title": "반복 궁극기 피해 -50%",
          "description": "오퍼레이터가 궁극기를 1회 사용할 때마다, 해당 오퍼레이터가 이후 사용하는 궁극기 피해 [-50%] 감소",
          "tier": 2,
          "x": 0.32608695652173914,
          "y": 0.5,
          "gridCol": 7,
          "gridRow": 0,
          "layoutOrder": 7,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T07:26:06.017Z",
          "updatedAt": "2026-08-06T06:16:42.467Z"
        },
        {
          "id": "constraint-de114359-c53b-416b-b3ae-405ab72b6ea4",
          "category": "팀",
          "label": "반복 궁극기 피해 -100%",
          "title": "반복 궁극기 피해 -100%",
          "description": "오퍼레이터가 궁극기를 1회 사용할 때마다, 해당 오퍼레이터가 이후 사용하는 궁극기 피해 [-100%] 감소",
          "tier": 3,
          "x": 0.32608695652173914,
          "y": 0.5,
          "gridCol": 7,
          "gridRow": 0,
          "layoutOrder": 7,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T07:26:24.360Z",
          "updatedAt": "2026-08-06T06:16:52.048Z"
        },
        {
          "id": "constraint-74cde916-7cfa-4230-a96b-e553daec56ff",
          "category": "팀",
          "label": "일반 공격 피해 -70%",
          "title": "일반 공격 피해 감소",
          "description": "오퍼레이터의 일반 공격 피해 [-70%]",
          "tier": 2,
          "x": 0.3695652173913043,
          "y": 0.5,
          "gridCol": 8,
          "gridRow": 0,
          "layoutOrder": 8,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:09:17.017Z",
          "updatedAt": "2026-08-06T06:16:59.045Z"
        },
        {
          "id": "constraint-9cdb62e8-085b-49a4-86d5-a1d44bf440ac",
          "category": "팀",
          "label": "스킬 게이지 자연회복 중단",
          "title": "스킬 게이지 자연회복 중단",
          "description": "메인 컨트롤 오퍼레이터가 [12초] 내에 강력한 일격 피해를 주지 않으면, 스킬 게이지 자연 회복 중단",
          "tier": 1,
          "x": 0.3695652173913043,
          "y": 0.5,
          "gridCol": 8,
          "gridRow": 0,
          "layoutOrder": 8,
          "sourceConstraintId": null,
          "isSecondPhase": true,
          "createdAt": "2026-07-26T10:10:46.703Z",
          "updatedAt": "2026-08-06T06:56:17.984Z"
        },
        {
          "id": "constraint-d997df22-39a5-4b6d-a243-5f4cd00f1f5d",
          "category": "환경",
          "label": "연계/배틀 스킬 쿨감/약화",
          "title": "연계/배틀 스킬 쿨감/약화",
          "description": "오퍼레이터 \n연계 스킬 쿨타임 [-60%]\n배틀 스킬 피해 [-60%]",
          "tier": 3,
          "x": 0.41304347826086957,
          "y": 0.5,
          "gridCol": 9,
          "gridRow": 0,
          "layoutOrder": 9,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:21:01.267Z",
          "updatedAt": "2026-08-06T05:48:17.588Z"
        },
        {
          "id": "constraint-bb996e82-a3fb-452b-9375-ae6315286b87",
          "category": "환경",
          "label": "물리/아츠 강화",
          "title": "물리/아츠 강화",
          "description": "오퍼레이터 일반 공격, 배틀 스킬, 연계 스킬, 궁극기 이외의 피해 [+N%]\n\n배틀 스킬 피해 [-N%]",
          "tier": 3,
          "x": 0.45652173913043476,
          "y": 0.5,
          "gridCol": 10,
          "gridRow": 0,
          "layoutOrder": 10,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:22:24.947Z",
          "updatedAt": "2026-07-26T11:21:29.624Z"
        },
        {
          "id": "constraint-e8e63da7-85f4-428b-bff8-0361c634a5f9",
          "category": "환경",
          "label": "메인 오퍼레이터 전환 불가",
          "title": "메인 오퍼레이터 전환 불가",
          "description": "전투가 시작된 후 메인 컨트롤 오퍼레이터 전환 불가",
          "tier": 2,
          "x": 0.5,
          "y": 0.5,
          "gridCol": 11,
          "gridRow": 0,
          "layoutOrder": 11,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:24:33.442Z",
          "updatedAt": "2026-07-26T10:24:37.385Z"
        },
        {
          "id": "constraint-56f6527a-cd59-4d06-8453-bb8b92e6feb4",
          "category": "조작",
          "label": "적 사망 시 독성 장판 1",
          "title": "적 사망 시 독성 장판 1",
          "description": "처치 당한 적이 독성 물질을 남기고 오퍼레이터가 독성 물질의 범위에 있을 때, 매 초마다 최대 생명력의 [N%] 피해를 입음",
          "tier": 1,
          "x": 0.5434782608695652,
          "y": 0.5,
          "gridCol": 12,
          "gridRow": 0,
          "layoutOrder": 12,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:28:50.511Z",
          "updatedAt": "2026-07-26T10:29:13.501Z"
        },
        {
          "id": "constraint-4eb8e789-3c54-474b-906b-492d84e325a1",
          "category": "조작",
          "label": "적 사망 시 독성 장판 1",
          "title": "적 사망 시 독성 장판 2",
          "description": "처치 당한 적이 독성 물질을 남기고 오퍼레이터가 독성 물질의 범위에 있을 때, 매 초마다 최대 생명력의 [N%] 피해를 입음",
          "tier": 2,
          "x": 0.5434782608695652,
          "y": 0.5,
          "gridCol": 12,
          "gridRow": 0,
          "layoutOrder": 12,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:29:00.992Z",
          "updatedAt": "2026-07-26T10:29:23.054Z"
        },
        {
          "id": "constraint-9830f340-5aab-451e-9b75-5726018813a3",
          "category": "팀",
          "label": "배틀 스킬 횟수 제한: 냉기 1",
          "title": "배틀 스킬 횟수 제한: 냉기 1",
          "description": "오퍼레이터가 [배틀 스킬]을  [2회] 사용할 때마다 메인 컨트롤 오퍼레이터에게 [냉기 부착 1스택] 부여 \n\n* 각 오퍼레이터 당 발동 가능 쿨타임 [3초]",
          "tier": 1,
          "x": 0.5869565217391305,
          "y": 0.5,
          "gridCol": 13,
          "gridRow": 0,
          "layoutOrder": 13,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:34:11.770Z",
          "updatedAt": "2026-08-06T05:39:35.635Z"
        },
        {
          "id": "constraint-484b0e70-0078-4e17-82a2-1bd54068721b",
          "category": "팀",
          "label": "배틀 스킬 횟수 제한: 냉기 2",
          "title": "배틀 스킬 횟수 제한: 냉기 2",
          "description": "오퍼레이터가 [배틀 스킬]을  [1회] 사용할 때마다 메인 컨트롤 오퍼레이터에게 [냉기 부착 1스택] 부여 \n\n* 각 오퍼레이터 당 발동 가능 쿨타임 [3초]",
          "tier": 2,
          "x": 0.5869565217391305,
          "y": 0.5,
          "gridCol": 13,
          "gridRow": 0,
          "layoutOrder": 13,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:34:37.321Z",
          "updatedAt": "2026-08-06T05:39:36.485Z"
        },
        {
          "id": "constraint-069af05b-3595-4c34-b196-9ac364c216c1",
          "category": "팀",
          "label": "연계 스킬 횟수 제한: 냉기 1",
          "title": "연계 스킬 횟수 제한: 냉기 1",
          "description": "오퍼레이터가 연계 스킬을 2회 사용할 때마다 메인 컨트롤 오퍼레이터에게 [냉기 부착 1스택] 부여\n\n* 각 오퍼레이터당 발동 가능한 쿨타임 [3초]",
          "tier": 1,
          "x": 0.6304347826086957,
          "y": 0.5,
          "gridCol": 14,
          "gridRow": 0,
          "layoutOrder": 14,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:37:10.982Z",
          "updatedAt": "2026-07-26T10:37:29.020Z"
        },
        {
          "id": "constraint-07f55139-50ef-4ad9-8b32-cae5ef602775",
          "category": "팀",
          "label": "연계 스킬 횟수 제한: 냉기 2",
          "title": "연계 스킬 횟수 제한: 냉기 2",
          "description": "오퍼레이터가 연계 스킬을 1회 사용할 때마다 메인 컨트롤 오퍼레이터에게 [냉기 부착 1스택] 부여\n\n* 각 오퍼레이터당 발동 가능한 쿨타임 [3초]",
          "tier": 2,
          "x": 0.6304347826086957,
          "y": 0.5,
          "gridCol": 14,
          "gridRow": 0,
          "layoutOrder": 14,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:37:23.626Z",
          "updatedAt": "2026-07-26T10:37:29.697Z"
        },
        {
          "id": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "category": "조작",
          "label": "냉기 공격 피격 시 즉시 동결",
          "title": "냉기 피격 시 즉시 동결",
          "description": "적이 메인 컨트롤 오퍼레이터에게 [냉기]를 적용하면, 공격을 받은 메인 오퍼레이터가 [즉시 동결] 상태가 됩니다.\n\n* 냉기 피해 몬스터 리스트 *\n[수정 아겔로스]\n[탁류 아겔로스]\n[조류 아겔로스] (예외) 해당 제약을 적용하지 않아도 피격 시 오퍼레이터 동결 적용",
          "tier": 2,
          "x": 0.6739130434782609,
          "y": 0.5,
          "gridCol": 15,
          "gridRow": 0,
          "layoutOrder": 15,
          "sourceConstraintId": null,
          "isSecondPhase": true,
          "createdAt": "2026-07-26T10:43:50.128Z",
          "updatedAt": "2026-08-06T06:51:26.800Z"
        },
        {
          "id": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "category": "환경",
          "label": "동결 시간 증가 / 열기속성 해제",
          "title": "동결 시간 증가 / 열기 해제",
          "description": "오퍼레이터가 받는 동결 지속 시간 [15초 증가]\n* 기존 동결 지속 시간 [5초]\n[열기 유형 스킬]을 사용할 경우, [동결 해제] 가능",
          "tier": 1,
          "x": 0.6739130434782609,
          "y": 0.5,
          "gridCol": 15,
          "gridRow": 0,
          "layoutOrder": 15,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:01:45.737Z",
          "updatedAt": "2026-08-06T05:27:53.216Z"
        },
        {
          "id": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "category": "환경",
          "label": "동결 시간 증가 / 자연속성 해제",
          "title": "동결 시간 증가 / 자연 해제",
          "description": "오퍼레이터가 받는 동결 지속 시간 [15초 증가]\n* 기존 동결 지속 시간 [5초]\n[자연 유형 스킬]을 사용할 경우, [동결 해제] 가능",
          "tier": 1,
          "x": 0.717391304347826,
          "y": 0.5,
          "gridCol": 16,
          "gridRow": 0,
          "layoutOrder": 16,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:02:13.479Z",
          "updatedAt": "2026-08-06T05:27:48.806Z"
        },
        {
          "id": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "category": "환경",
          "label": "동결 시간 증가 / 전기속성 해제",
          "title": "동결 시간 증가 / 전기 해제",
          "description": "오퍼레이터가 받는 동결 지속 시간 [15초 증가]\n* 기존 동결 지속 시간 [5초]\n[전기 유형 스킬]을 사용할 경우, [동결 해제] 가능",
          "tier": 1,
          "x": 0.7608695652173914,
          "y": 0.5,
          "gridCol": 17,
          "gridRow": 0,
          "layoutOrder": 17,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:02:46.126Z",
          "updatedAt": "2026-08-06T05:27:43.799Z"
        },
        {
          "id": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "category": "환경",
          "label": "동결 시간 증가 / 물리속성 해제",
          "title": "동결 시간 증가 / 물리 해제",
          "description": "오퍼레이터가 받는 동결 지속 시간 [15초 증가]\n* 기존 동결 지속 시간 [5초]\n[물리 유형 스킬]을 사용할 경우, [동결 해제] 가능",
          "tier": 1,
          "x": 0.8043478260869565,
          "y": 0.5,
          "gridCol": 18,
          "gridRow": 0,
          "layoutOrder": 18,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:03:13.810Z",
          "updatedAt": "2026-08-06T05:27:37.878Z"
        },
        {
          "id": "constraint-5d254c10-f50f-494b-8962-b179e5ad01fd",
          "category": "조작",
          "label": "적 제어 부여, 적 회복 5%",
          "title": "적 제어 효과 부여 시 회복 1",
          "description": "적이 군중 제어 효과에 걸리면 초당 최대 생명력의 [5%]를 회복합니다.",
          "tier": 1,
          "x": 0.8478260869565217,
          "y": 0.5,
          "gridCol": 19,
          "gridRow": 0,
          "layoutOrder": 19,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:24:18.235Z",
          "updatedAt": "2026-08-06T05:27:01.688Z"
        },
        {
          "id": "constraint-1810b8df-62c6-4808-9b10-d420058309e4",
          "category": "조작",
          "label": "적 제어 부여, 적 회복 15%",
          "title": "적 제어 효과 부여 시 회복 2",
          "description": "적이 군중 제어 효과에 걸리면 초당 최대 생명력의 [15%]를 회복합니다.",
          "tier": 2,
          "x": 0.8478260869565217,
          "y": 0.5,
          "gridCol": 19,
          "gridRow": 0,
          "layoutOrder": 19,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:24:28.391Z",
          "updatedAt": "2026-08-06T05:26:52.666Z"
        },
        {
          "id": "constraint-39d4ebf9-c9fb-46ba-9213-be5f213fabea",
          "category": "환경",
          "label": "4 웨이브 적 개체 강화",
          "title": "적 개체 강화 1",
          "description": "[최종(4) 웨이브]의 쌍뿔 아겔로스, 삼미 아겔로스가 \n[알파(α) 개체]로 변경\n\n* 알파(α) 개체 : 체력 [50%] 증가",
          "tier": 2,
          "x": 0.8913043478260869,
          "y": 0.5,
          "gridCol": 20,
          "gridRow": 0,
          "layoutOrder": 20,
          "sourceConstraintId": null,
          "isSecondPhase": true,
          "createdAt": "2026-07-26T11:27:23.047Z",
          "updatedAt": "2026-08-06T06:54:26.009Z"
        },
        {
          "id": "constraint-fed9df65-4d84-423c-acd1-77baa18661fd",
          "category": "환경",
          "label": "3, 4 웨이브 적 개체 강화",
          "title": "적 개체 강화 2",
          "description": "[웨이브(3), 최종(4) 웨이브]의 쌍뿔 아겔로스, 삼미 아겔로스가 \n[알파(α) 개체]로 변경\n\n* 알파(α) 개체 : 체력 [50%] 증가",
          "tier": 3,
          "x": 0.8913043478260869,
          "y": 0.5,
          "gridCol": 20,
          "gridRow": 0,
          "layoutOrder": 20,
          "sourceConstraintId": null,
          "isSecondPhase": true,
          "createdAt": "2026-07-26T11:28:31.349Z",
          "updatedAt": "2026-08-06T06:54:26.009Z"
        },
        {
          "id": "constraint-1e2cd626-0f53-4b43-a63d-d44f19241c9e",
          "category": "팀",
          "label": "오퍼레이터 주요 능력치 -10%",
          "title": "오퍼레이터 주요 능력치 감소 1",
          "description": "오퍼레이터 주요 능력치 [-10%]",
          "tier": 1,
          "x": 0.021739130434782608,
          "y": 0.5,
          "gridCol": 0,
          "gridRow": 0,
          "layoutOrder": 0,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:42:13.150Z",
          "updatedAt": "2026-08-06T05:05:22.735Z"
        },
        {
          "id": "constraint-8cafa6f9-b106-449b-a400-95a38952df32",
          "category": "팀",
          "label": "오퍼레이터 주요 능력치 -20%",
          "title": "오퍼레이터 주요 능력치 감소 2",
          "description": "오퍼레이터 주요 능력치 [-N%]",
          "tier": 2,
          "x": 0.021739130434782608,
          "y": 0.5,
          "gridCol": 0,
          "gridRow": 0,
          "layoutOrder": 0,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:42:27.156Z",
          "updatedAt": "2026-08-06T05:05:32.396Z"
        },
        {
          "id": "constraint-746d241b-dec0-4cea-9966-b9db3941eed1",
          "category": "팀",
          "label": "오퍼레이터 주요 능력치 -40%",
          "title": "오퍼레이터 주요 능력치 감소 3",
          "description": "오퍼레이터 주요 능력치 [-40%]",
          "tier": 3,
          "x": 0.021739130434782608,
          "y": 0.5,
          "gridCol": 0,
          "gridRow": 0,
          "layoutOrder": 0,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T05:06:12.981Z",
          "updatedAt": "2026-08-06T05:06:14.614Z"
        },
        {
          "id": "constraint-b6cae3b0-53a6-42bb-956f-7736795848eb",
          "category": "조작",
          "label": "상태 단계당 대응 피해 -10%",
          "title": "방어 불능/아츠 부착 단계당 대응 피해 감소",
          "description": "적에게 부착된 방어불능 또는 아츠부착 1단계마다 해당 적이 받는 부착 스택과 대응되는 데미지 -10%(해당 버프는 부착 지속시간 종료 0.1초후에 소멸)",
          "tier": 1,
          "x": 0.5,
          "y": 0.5,
          "gridCol": 11,
          "gridRow": 0,
          "layoutOrder": 11,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T05:46:17.704Z",
          "updatedAt": "2026-08-06T06:19:20.474Z"
        },
        {
          "id": "constraint-f7efab9a-f30d-4152-b69c-a795194a0a74",
          "category": "환경",
          "label": "시간제한 -300초",
          "title": "시간제한 -300초",
          "description": "기본 클리어 제한 시간 [600초]에서\n[300초] 감소\n\n제한 시간 [300초(5분)]",
          "tier": 3,
          "x": 0.10869565217391304,
          "y": 0.5,
          "gridCol": 2,
          "gridRow": 0,
          "layoutOrder": 2,
          "sourceConstraintId": null,
          "isSecondPhase": true,
          "createdAt": "2026-08-06T06:00:48.210Z",
          "updatedAt": "2026-08-06T06:49:08.305Z"
        },
        {
          "id": "constraint-c031b79c-7421-470f-91e5-c5cf0925aaa4",
          "category": "조작",
          "label": "적 생명력 +200%",
          "title": "적 생명력 +200%",
          "description": "적 생명력 [+200%]",
          "tier": 3,
          "x": 0.15217391304347827,
          "y": 0.5,
          "gridCol": 3,
          "gridRow": 0,
          "layoutOrder": 3,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T06:14:30.850Z",
          "updatedAt": "2026-08-06T06:14:33.201Z"
        }
      ],
      "relations": [
        {
          "id": "relation-2658715b-e109-4fdd-8c06-705ac855d24c",
          "a": "constraint-8d1211ab-8796-495d-8585-168711c868d6",
          "b": "constraint-81f0f266-11d3-4d88-af1c-d03344149293",
          "type": "conflict",
          "createdAt": "2026-07-26T05:34:27.774Z"
        },
        {
          "id": "relation-1d69be79-43cf-4b8e-b2a4-88349efb4b59",
          "a": "constraint-f809c887-1ce6-4092-91b3-071baea5be39",
          "b": "constraint-26907513-206c-4a68-83ab-f97172b2e9a6",
          "type": "conflict",
          "createdAt": "2026-07-26T06:55:39.480Z"
        },
        {
          "id": "relation-97d8d95e-b7da-4db5-b1af-23f1ff54bcd8",
          "a": "constraint-5bc259e4-b739-4c6e-9c2a-7b3745f0e9e1",
          "b": "constraint-83a3d8f1-453b-4b38-aabe-4c23c4297821",
          "type": "conflict",
          "createdAt": "2026-07-26T06:57:25.022Z"
        },
        {
          "id": "relation-3aba1ca3-5194-4934-8cda-a63746a278c7",
          "a": "constraint-d56b1044-3b47-4715-a84a-25d11cf5fa48",
          "b": "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de",
          "type": "conflict",
          "createdAt": "2026-07-26T06:58:23.942Z"
        },
        {
          "id": "relation-0659119c-bf4f-44d5-b48f-333b8dc5dc75",
          "a": "constraint-acdcff94-ff70-446c-a237-91375ad47463",
          "b": "constraint-b5fc4699-06a4-46f7-a05d-10086e052532",
          "type": "conflict",
          "createdAt": "2026-07-26T07:23:11.766Z"
        },
        {
          "id": "relation-55fa8052-095b-4bdc-b2d6-d1a0fe9e60d6",
          "a": "constraint-3371d3b1-a318-4c07-86c0-e9dbd30b31d3",
          "b": "constraint-de114359-c53b-416b-b3ae-405ab72b6ea4",
          "type": "conflict",
          "createdAt": "2026-07-26T07:26:39.919Z"
        },
        {
          "id": "relation-4d484aa6-30f5-4eb6-93aa-0aa7f175333a",
          "a": "constraint-bb996e82-a3fb-452b-9375-ae6315286b87",
          "b": "constraint-d997df22-39a5-4b6d-a243-5f4cd00f1f5d",
          "type": "conflict",
          "createdAt": "2026-07-26T10:22:53.495Z"
        },
        {
          "id": "relation-12734b1a-9f4e-4f4d-8c06-7d824f9782c6",
          "a": "constraint-56f6527a-cd59-4d06-8453-bb8b92e6feb4",
          "b": "constraint-4eb8e789-3c54-474b-906b-492d84e325a1",
          "type": "conflict",
          "createdAt": "2026-07-26T10:35:18.612Z"
        },
        {
          "id": "relation-e58ceafd-3d24-4870-b4eb-25770edfffef",
          "a": "constraint-9830f340-5aab-451e-9b75-5726018813a3",
          "b": "constraint-484b0e70-0078-4e17-82a2-1bd54068721b",
          "type": "conflict",
          "createdAt": "2026-07-26T10:35:20.258Z"
        },
        {
          "id": "relation-d1b2fbe4-2346-4b18-b9fc-c91e7c32dcd2",
          "a": "constraint-069af05b-3595-4c34-b196-9ac364c216c1",
          "b": "constraint-07f55139-50ef-4ad9-8b32-cae5ef602775",
          "type": "conflict",
          "createdAt": "2026-07-26T10:37:33.628Z"
        },
        {
          "id": "relation-76a78f94-0057-4a0b-b3b9-540273d1f57b",
          "a": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "b": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:34.933Z"
        },
        {
          "id": "relation-ef7a7237-e7ac-4625-8da5-005e463f1fe8",
          "a": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "b": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:38.105Z"
        },
        {
          "id": "relation-38728469-282a-4666-9bbc-fa2055dd9402",
          "a": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "b": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:40.117Z"
        },
        {
          "id": "relation-2be1bfba-035c-4b90-a2e2-b21ddb59fc44",
          "a": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "b": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:44.510Z"
        },
        {
          "id": "relation-199557b0-7fa4-47b4-9fd4-90e737c7d9a9",
          "a": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "b": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:46.285Z"
        },
        {
          "id": "relation-ed160eaf-fbc9-47ee-92ff-0c1b19cf094b",
          "a": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "b": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:49.224Z"
        },
        {
          "id": "relation-74a44660-50da-48d4-bbe7-7c07de21477e",
          "a": "constraint-484b0e70-0078-4e17-82a2-1bd54068721b",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:32.823Z"
        },
        {
          "id": "relation-34052c4c-3763-4449-a0ee-582728b922c8",
          "a": "constraint-07f55139-50ef-4ad9-8b32-cae5ef602775",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:34.678Z"
        },
        {
          "id": "relation-920dad56-63ae-41fb-8030-49f658362020",
          "a": "constraint-9830f340-5aab-451e-9b75-5726018813a3",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:40.055Z"
        },
        {
          "id": "relation-f4ed9d78-e771-4076-bf90-82e07ee85fee",
          "a": "constraint-069af05b-3595-4c34-b196-9ac364c216c1",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:41.468Z"
        },
        {
          "id": "relation-19e37070-a3a2-488b-8a51-1ab0a8851213",
          "a": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:43.884Z"
        },
        {
          "id": "relation-681d4e50-9a68-4029-9396-9f35303de699",
          "a": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:45.213Z"
        },
        {
          "id": "relation-817b4c09-2545-4500-a053-7843145d6eb1",
          "a": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:46.493Z"
        },
        {
          "id": "relation-eeecdaa8-f387-44c3-bc3b-67560a7036f6",
          "a": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:48.033Z"
        },
        {
          "id": "relation-1f459b3b-877a-4919-9728-d08fa5c5f286",
          "a": "constraint-39d4ebf9-c9fb-46ba-9213-be5f213fabea",
          "b": "constraint-fed9df65-4d84-423c-acd1-77baa18661fd",
          "type": "conflict",
          "createdAt": "2026-07-26T11:28:44.230Z"
        },
        {
          "id": "relation-3d50a21b-2022-4773-9249-74ed1c19b220",
          "a": "constraint-5d254c10-f50f-494b-8962-b179e5ad01fd",
          "b": "constraint-1810b8df-62c6-4808-9b10-d420058309e4",
          "type": "conflict",
          "createdAt": "2026-07-26T11:29:22.901Z"
        },
        {
          "id": "relation-c375de84-491d-4d7e-b7f3-fa921aeeda73",
          "a": "constraint-1e2cd626-0f53-4b43-a63d-d44f19241c9e",
          "b": "constraint-8cafa6f9-b106-449b-a400-95a38952df32",
          "type": "conflict",
          "createdAt": "2026-07-26T11:42:51.941Z"
        },
        {
          "id": "relation-f579a1ee-14f1-4742-9ea4-a2aa7045e031",
          "a": "constraint-8cafa6f9-b106-449b-a400-95a38952df32",
          "b": "constraint-746d241b-dec0-4cea-9966-b9db3941eed1",
          "type": "conflict",
          "createdAt": "2026-08-06T05:07:12.767Z"
        },
        {
          "id": "relation-2af751b1-7935-4dff-bada-0a64c78ee277",
          "a": "constraint-c67ed6e6-b8e8-4017-9d8b-64c5b6d0b74d",
          "b": "constraint-13385690-ec41-4bee-81bb-7c0cd4838ee5",
          "type": "conflict",
          "createdAt": "2026-08-06T05:07:38.629Z"
        },
        {
          "id": "relation-cd5633ff-b8a7-4628-801d-a02edeaf9dff",
          "a": "constraint-f7efab9a-f30d-4152-b69c-a795194a0a74",
          "b": "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de",
          "type": "conflict",
          "createdAt": "2026-08-06T06:01:45.820Z"
        },
        {
          "id": "relation-a11865bf-b329-4c6f-b08d-b581edb65800",
          "a": "constraint-81f0f266-11d3-4d88-af1c-d03344149293",
          "b": "constraint-c031b79c-7421-470f-91e5-c5cf0925aaa4",
          "type": "conflict",
          "createdAt": "2026-08-06T06:14:38.468Z"
        }
      ],
      "groups": [
        {
          "id": "group-e7233a27-ff9a-4d1d-80d3-eed9cfb52561",
          "type": "normal",
          "markerIds": [
            "constraint-8d1211ab-8796-495d-8585-168711c868d6",
            "constraint-81f0f266-11d3-4d88-af1c-d03344149293"
          ],
          "createdAt": "2026-07-25T15:56:47.375Z"
        },
        {
          "id": "group-09d395f9-a72a-4398-9d65-79e0a07ef2d0",
          "type": "normal",
          "markerIds": [
            "constraint-d56b1044-3b47-4715-a84a-25d11cf5fa48",
            "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de"
          ],
          "createdAt": "2026-07-25T15:56:51.887Z"
        },
        {
          "id": "group-e3ab5682-3e00-4a36-88e5-3a40bf6c7d14",
          "type": "normal",
          "markerIds": [
            "constraint-f809c887-1ce6-4092-91b3-071baea5be39",
            "constraint-26907513-206c-4a68-83ab-f97172b2e9a6"
          ],
          "createdAt": "2026-07-26T06:56:11.401Z"
        },
        {
          "id": "group-65e7db39-86b1-4e99-abd8-862220e31c7e",
          "type": "normal",
          "markerIds": [
            "constraint-5bc259e4-b739-4c6e-9c2a-7b3745f0e9e1",
            "constraint-83a3d8f1-453b-4b38-aabe-4c23c4297821"
          ],
          "createdAt": "2026-07-26T06:57:19.077Z"
        },
        {
          "id": "group-6e97eef7-b2da-4770-bc26-112c484592d6",
          "type": "normal",
          "markerIds": [
            "constraint-acdcff94-ff70-446c-a237-91375ad47463",
            "constraint-b5fc4699-06a4-46f7-a05d-10086e052532"
          ],
          "createdAt": "2026-07-26T07:23:08.653Z"
        },
        {
          "id": "group-6cb6647a-a789-41c8-ba94-fd82518fd2ee",
          "type": "normal",
          "markerIds": [
            "constraint-3371d3b1-a318-4c07-86c0-e9dbd30b31d3",
            "constraint-de114359-c53b-416b-b3ae-405ab72b6ea4"
          ],
          "createdAt": "2026-07-26T07:26:37.214Z"
        },
        {
          "id": "group-10823366-bdc5-4ff4-a37c-03018bb9f6a5",
          "type": "gatekeeper",
          "markerIds": [
            "constraint-d997df22-39a5-4b6d-a243-5f4cd00f1f5d",
            "constraint-bb996e82-a3fb-452b-9375-ae6315286b87"
          ],
          "createdAt": "2026-07-26T10:22:32.008Z"
        },
        {
          "id": "group-d0ae0c32-cd8c-4a0e-910e-dc8ffb62d17d",
          "type": "normal",
          "markerIds": [
            "constraint-56f6527a-cd59-4d06-8453-bb8b92e6feb4",
            "constraint-4eb8e789-3c54-474b-906b-492d84e325a1"
          ],
          "createdAt": "2026-07-26T10:29:30.887Z"
        },
        {
          "id": "group-20a5ba92-9a41-4a98-a324-2495918efe74",
          "type": "normal",
          "markerIds": [
            "constraint-9830f340-5aab-451e-9b75-5726018813a3",
            "constraint-484b0e70-0078-4e17-82a2-1bd54068721b"
          ],
          "createdAt": "2026-07-26T10:35:15.704Z"
        },
        {
          "id": "group-470b9153-797c-4b4a-b99d-9768dc879b5a",
          "type": "normal",
          "markerIds": [
            "constraint-069af05b-3595-4c34-b196-9ac364c216c1",
            "constraint-07f55139-50ef-4ad9-8b32-cae5ef602775"
          ],
          "createdAt": "2026-07-26T10:37:31.278Z"
        },
        {
          "id": "group-bcae8ba5-d08a-4ef1-84b9-37ee12ca7feb",
          "type": "normal",
          "markerIds": [
            "constraint-03d66d12-d414-46be-a359-d2962d24793d",
            "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
            "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
            "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb"
          ],
          "createdAt": "2026-07-26T11:04:26.943Z"
        },
        {
          "id": "group-50df0d3f-55ae-409d-bfc0-fb18615b8eef",
          "type": "normal",
          "markerIds": [
            "constraint-5d254c10-f50f-494b-8962-b179e5ad01fd",
            "constraint-1810b8df-62c6-4808-9b10-d420058309e4"
          ],
          "createdAt": "2026-07-26T11:25:31.476Z"
        },
        {
          "id": "group-94f60558-66d3-4f74-bc9a-314062a757f5",
          "type": "normal",
          "markerIds": [
            "constraint-39d4ebf9-c9fb-46ba-9213-be5f213fabea",
            "constraint-fed9df65-4d84-423c-acd1-77baa18661fd"
          ],
          "createdAt": "2026-07-26T11:28:41.557Z"
        },
        {
          "id": "group-45f11026-09ff-4cdf-9daa-2f6379be351e",
          "type": "normal",
          "markerIds": [
            "constraint-1e2cd626-0f53-4b43-a63d-d44f19241c9e",
            "constraint-8cafa6f9-b106-449b-a400-95a38952df32"
          ],
          "createdAt": "2026-07-26T11:42:49.259Z"
        },
        {
          "id": "group-87c844ab-ed02-49f8-a2ba-cdbe39276317",
          "type": "normal",
          "markerIds": [
            "constraint-c67ed6e6-b8e8-4017-9d8b-64c5b6d0b74d",
            "constraint-13385690-ec41-4bee-81bb-7c0cd4838ee5"
          ],
          "createdAt": "2026-08-06T05:07:32.315Z"
        },
        {
          "id": "group-67ed1b29-b718-4d84-b1a6-8fe16f0cffac",
          "type": "normal",
          "markerIds": [
            "constraint-8cafa6f9-b106-449b-a400-95a38952df32",
            "constraint-746d241b-dec0-4cea-9966-b9db3941eed1"
          ],
          "createdAt": "2026-08-06T05:17:22.866Z"
        },
        {
          "id": "group-6948b3b3-cc04-4cd3-ab91-51f131ad1d76",
          "type": "normal",
          "markerIds": [
            "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de",
            "constraint-f7efab9a-f30d-4152-b69c-a795194a0a74"
          ],
          "createdAt": "2026-08-06T06:01:42.945Z"
        },
        {
          "id": "group-ab0ba632-ebb9-4337-bc77-c04fa99e9f4a",
          "type": "normal",
          "markerIds": [
            "constraint-81f0f266-11d3-4d88-af1c-d03344149293",
            "constraint-c031b79c-7421-470f-91e5-c5cf0925aaa4"
          ],
          "createdAt": "2026-08-06T06:14:36.109Z"
        }
      ],
      "relationVisibility": {
        "conflict": true,
        "synergy": true
      },
      "secondPhaseIncluded": true,
      "trayViewAll": false,
      "boardColumns": 23,
      "updatedAt": "2026-08-06T06:56:17.987Z"
    }
  },
  {
    "id": "version-1d0f9bde-ee96-4be3-8874-9dfe5f8d7383",
    "name": "v1.3",
    "memo": "필수 제약 추가 완료",
    "createdAt": "2026-08-06T12:14:39.498Z",
    "snapshot": {
      "schemaVersion": 1,
      "projectId": "constraint-project-776675a0-07b4-44a9-8381-f7532cda9e82",
      "markers": [
        {
          "id": "constraint-c67ed6e6-b8e8-4017-9d8b-64c5b6d0b74d",
          "category": "조작",
          "label": "적이 주는 피해 +30%",
          "title": "적이 주는 피해 [+N%]",
          "description": "적이 플레이어에게 가하는  피해가 \n[30%] 증가합니다.",
          "tier": 1,
          "x": 0.06,
          "y": 0.5,
          "gridCol": 1,
          "gridRow": 0,
          "layoutOrder": 1,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T13:51:11.953Z",
          "updatedAt": "2026-08-06T05:56:24.922Z"
        },
        {
          "id": "constraint-13385690-ec41-4bee-81bb-7c0cd4838ee5",
          "category": "조작",
          "label": "적이 주는 피해 +80%",
          "title": "적이 주는 피해 [++N%]",
          "description": "적이 플레이어에게 가하는  피해가 \n[80%] 증가합니다.",
          "tier": 2,
          "x": 0.06,
          "y": 0.5,
          "gridCol": 1,
          "gridRow": 0,
          "layoutOrder": 1,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T13:52:44.999Z",
          "updatedAt": "2026-08-06T05:56:38.975Z"
        },
        {
          "id": "constraint-d56b1044-3b47-4715-a84a-25d11cf5fa48",
          "category": "환경",
          "label": "시간제한 -100초",
          "title": "시간제한 -100초",
          "description": "기본 클리어 제한 시간 [600초]에서\n[100초] 감소\n\n제한 시간 [500초(8분 20초)]",
          "tier": 1,
          "x": 0.1,
          "y": 0.5,
          "gridCol": 2,
          "gridRow": 0,
          "layoutOrder": 2,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T13:55:14.297Z",
          "updatedAt": "2026-08-06T06:02:33.878Z"
        },
        {
          "id": "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de",
          "category": "환경",
          "label": "시간제한 -200초",
          "title": "시간제한 -200초",
          "description": "기본 클리어 제한 시간 [600초]에서\n[200초] 감소\n\n제한 시간 [400초(6분 40초)]",
          "tier": 2,
          "x": 0.1,
          "y": 0.5,
          "gridCol": 2,
          "gridRow": 0,
          "layoutOrder": 2,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T13:56:24.842Z",
          "updatedAt": "2026-08-06T06:01:32.182Z"
        },
        {
          "id": "constraint-8d1211ab-8796-495d-8585-168711c868d6",
          "category": "조작",
          "label": "적 생명력 +50%",
          "title": "적 생명력 +50%",
          "description": "적 생명력 [+50%]",
          "tier": 1,
          "x": 0.14,
          "y": 0.5,
          "gridCol": 3,
          "gridRow": 0,
          "layoutOrder": 3,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T14:19:56.168Z",
          "updatedAt": "2026-08-06T06:13:55.218Z"
        },
        {
          "id": "constraint-81f0f266-11d3-4d88-af1c-d03344149293",
          "category": "조작",
          "label": "적 생명력 +100%",
          "title": "적 생명력 [+100%]",
          "description": "적 생명력 [+100%]",
          "tier": 2,
          "x": 0.14,
          "y": 0.5,
          "gridCol": 3,
          "gridRow": 0,
          "layoutOrder": 3,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T14:20:13.440Z",
          "updatedAt": "2026-08-06T06:14:14.140Z"
        },
        {
          "id": "constraint-f809c887-1ce6-4092-91b3-071baea5be39",
          "category": "팀",
          "label": "메인 오퍼 받는 피해 +50%",
          "title": "메인 오퍼 받는 피해 +50%",
          "description": "메인 컨트롤 오퍼레이터가 받는 피해 [+50%]",
          "tier": 1,
          "x": 0.22,
          "y": 0.5,
          "gridCol": 5,
          "gridRow": 0,
          "layoutOrder": 5,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T06:55:02.719Z",
          "updatedAt": "2026-08-06T11:54:23.498Z"
        },
        {
          "id": "constraint-26907513-206c-4a68-83ab-f97172b2e9a6",
          "category": "팀",
          "label": "메인 오퍼 받는 피해 +100%",
          "title": "메인 오퍼 받는 피해 +100%",
          "description": "메인 컨트롤 오퍼레이터가 받는 피해 [+100%]",
          "tier": 2,
          "x": 0.22,
          "y": 0.5,
          "gridCol": 5,
          "gridRow": 0,
          "layoutOrder": 5,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T06:55:23.102Z",
          "updatedAt": "2026-08-06T11:54:23.498Z"
        },
        {
          "id": "constraint-5bc259e4-b739-4c6e-9c2a-7b3745f0e9e1",
          "category": "환경",
          "label": "기력 회복 속도 -50%",
          "title": "기력 회복 속도 -50%",
          "description": "기력 회복 속도 [-50%]",
          "tier": 1,
          "x": 0.26,
          "y": 0.5,
          "gridCol": 6,
          "gridRow": 0,
          "layoutOrder": 6,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T06:56:58.455Z",
          "updatedAt": "2026-08-06T11:54:28.748Z"
        },
        {
          "id": "constraint-83a3d8f1-453b-4b38-aabe-4c23c4297821",
          "category": "환경",
          "label": "회피 불가",
          "title": "회피 불가",
          "description": "메인 오퍼레이터는 회피를 사용할 수 없습니다.\n[기존 달리기는 사용 가능]\n[기존 돌진은 사용 불가]",
          "tier": 3,
          "x": 0.26,
          "y": 0.5,
          "gridCol": 6,
          "gridRow": 0,
          "layoutOrder": 6,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T06:57:11.307Z",
          "updatedAt": "2026-08-06T11:54:28.748Z"
        },
        {
          "id": "constraint-acdcff94-ff70-446c-a237-91375ad47463",
          "category": "환경",
          "label": "치유 물질 생성 감소",
          "title": "치유 물질 생성 감소 1",
          "description": "웨이브 사이에 [치유 물질이 1개씩 총 3개 생성]\n치유 물질 1개 당 오퍼레이터 최대 체력의 [10%] 회복\n\n*제약 미적용 시 웨이브 사이에 [치유물질이 3개씩 총 9개 생성]",
          "tier": 1,
          "x": 0.3,
          "y": 0.5,
          "gridCol": 7,
          "gridRow": 0,
          "layoutOrder": 7,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T07:22:37.530Z",
          "updatedAt": "2026-08-06T11:59:43.929Z"
        },
        {
          "id": "constraint-b5fc4699-06a4-46f7-a05d-10086e052532",
          "category": "환경",
          "label": "치유 물질 생성 제한",
          "title": "치유 물질 생성 제한",
          "description": "웨이브 사이에 치유 물질이 [생성되지 않음]",
          "tier": 2,
          "x": 0.3,
          "y": 0.5,
          "gridCol": 7,
          "gridRow": 0,
          "layoutOrder": 7,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T07:23:02.744Z",
          "updatedAt": "2026-08-06T12:00:13.348Z"
        },
        {
          "id": "constraint-3371d3b1-a318-4c07-86c0-e9dbd30b31d3",
          "category": "팀",
          "label": "반복 궁극기 피해 -50%",
          "title": "반복 궁극기 피해 -50%",
          "description": "오퍼레이터가 궁극기를 1회 사용할 때마다, 해당 오퍼레이터가 이후 사용하는 궁극기 피해 [-50%] 감소",
          "tier": 2,
          "x": 0.34,
          "y": 0.5,
          "gridCol": 8,
          "gridRow": 0,
          "layoutOrder": 8,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T07:26:06.017Z",
          "updatedAt": "2026-08-06T12:02:26.757Z"
        },
        {
          "id": "constraint-de114359-c53b-416b-b3ae-405ab72b6ea4",
          "category": "팀",
          "label": "반복 궁극기 피해 -100%",
          "title": "반복 궁극기 피해 -100%",
          "description": "오퍼레이터가 궁극기를 1회 사용할 때마다, 해당 오퍼레이터가 이후 사용하는 궁극기 피해 [-100%] 감소",
          "tier": 3,
          "x": 0.34,
          "y": 0.5,
          "gridCol": 8,
          "gridRow": 0,
          "layoutOrder": 8,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T07:26:24.360Z",
          "updatedAt": "2026-08-06T12:01:12.952Z"
        },
        {
          "id": "constraint-74cde916-7cfa-4230-a96b-e553daec56ff",
          "category": "팀",
          "label": "일반 공격 피해 -70%",
          "title": "일반 공격 피해 감소",
          "description": "오퍼레이터의 일반 공격 피해 [-70%]",
          "tier": 3,
          "x": 0.38,
          "y": 0.5,
          "gridCol": 9,
          "gridRow": 0,
          "layoutOrder": 9,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:09:17.017Z",
          "updatedAt": "2026-08-06T12:01:28.565Z"
        },
        {
          "id": "constraint-9cdb62e8-085b-49a4-86d5-a1d44bf440ac",
          "category": "팀",
          "label": "스킬 게이지 자연회복 중단",
          "title": "스킬 게이지 자연회복 중단",
          "description": "메인 컨트롤 오퍼레이터가 [12초] 내에 강력한 일격 피해를 주지 않으면, 스킬 게이지 자연 회복 중단",
          "tier": 1,
          "x": 0.42,
          "y": 0.5,
          "gridCol": 10,
          "gridRow": 0,
          "layoutOrder": 10,
          "sourceConstraintId": null,
          "isSecondPhase": true,
          "createdAt": "2026-07-26T10:10:46.703Z",
          "updatedAt": "2026-08-06T12:01:46.055Z"
        },
        {
          "id": "constraint-d997df22-39a5-4b6d-a243-5f4cd00f1f5d",
          "category": "환경",
          "label": "연계/배틀 스킬 쿨감/약화",
          "title": "연계/배틀 스킬 쿨감/약화",
          "description": "오퍼레이터 \n연계 스킬 쿨타임 [-60%]\n배틀 스킬 피해 [-60%]",
          "tier": 3,
          "x": 0.46,
          "y": 0.5,
          "gridCol": 11,
          "gridRow": 0,
          "layoutOrder": 11,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:21:01.267Z",
          "updatedAt": "2026-08-06T11:51:05.864Z"
        },
        {
          "id": "constraint-bb996e82-a3fb-452b-9375-ae6315286b87",
          "category": "환경",
          "label": "물리/아츠 강화",
          "title": "물리/아츠 강화",
          "description": "오퍼레이터 일반 공격, 배틀 스킬, 연계 스킬, 궁극기 이외의 피해 [+100%]\n\n배틀 스킬 피해 [-60%]",
          "tier": 3,
          "x": 0.5,
          "y": 0.5,
          "gridCol": 12,
          "gridRow": 0,
          "layoutOrder": 12,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:22:24.947Z",
          "updatedAt": "2026-08-06T11:51:05.864Z"
        },
        {
          "id": "constraint-e8e63da7-85f4-428b-bff8-0361c634a5f9",
          "category": "환경",
          "label": "메인 오퍼레이터 전환 불가",
          "title": "메인 오퍼레이터 전환 불가",
          "description": "전투가 시작된 후 [메인 컨트롤 오퍼레이터 전환 불가]",
          "tier": 2,
          "x": 0.54,
          "y": 0.5,
          "gridCol": 13,
          "gridRow": 0,
          "layoutOrder": 13,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:24:33.442Z",
          "updatedAt": "2026-08-06T12:13:00.824Z"
        },
        {
          "id": "constraint-56f6527a-cd59-4d06-8453-bb8b92e6feb4",
          "category": "조작",
          "label": "적 사망 시 독성 장판 1",
          "title": "적 사망 시 독성 장판 1",
          "description": "처치 당한 적이 독성 물질을 남기고 오퍼레이터가 독성 물질의 범위에 있을 때, [매 초마다 최대 생명력의 2%] 피해를 입음",
          "tier": 1,
          "x": 0.58,
          "y": 0.5,
          "gridCol": 14,
          "gridRow": 0,
          "layoutOrder": 14,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:28:50.511Z",
          "updatedAt": "2026-08-06T12:13:59.138Z"
        },
        {
          "id": "constraint-4eb8e789-3c54-474b-906b-492d84e325a1",
          "category": "조작",
          "label": "적 사망 시 독성 장판 2",
          "title": "적 사망 시 독성 장판 2",
          "description": "처치 당한 적이 독성 물질을 남기고 오퍼레이터가 독성 물질의 범위에 있을 때, [매 초마다 최대 생명력의 5%] 피해를 입음",
          "tier": 2,
          "x": 0.58,
          "y": 0.5,
          "gridCol": 14,
          "gridRow": 0,
          "layoutOrder": 14,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:29:00.992Z",
          "updatedAt": "2026-08-06T12:14:10.734Z"
        },
        {
          "id": "constraint-9830f340-5aab-451e-9b75-5726018813a3",
          "category": "팀",
          "label": "배틀 스킬 횟수 제한: 냉기 1",
          "title": "배틀 스킬 횟수 제한: 냉기 1",
          "description": "오퍼레이터가 [배틀 스킬]을  [2회] 사용할 때마다 메인 컨트롤 오퍼레이터에게 [냉기 부착 1스택] 부여 \n\n* 각 오퍼레이터 당 발동 가능 쿨타임 [3초]",
          "tier": 1,
          "x": 0.62,
          "y": 0.5,
          "gridCol": 15,
          "gridRow": 0,
          "layoutOrder": 15,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:34:11.770Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-484b0e70-0078-4e17-82a2-1bd54068721b",
          "category": "팀",
          "label": "배틀 스킬 횟수 제한: 냉기 2",
          "title": "배틀 스킬 횟수 제한: 냉기 2",
          "description": "오퍼레이터가 [배틀 스킬]을  [1회] 사용할 때마다 메인 컨트롤 오퍼레이터에게 [냉기 부착 1스택] 부여 \n\n* 각 오퍼레이터 당 발동 가능 쿨타임 [3초]",
          "tier": 2,
          "x": 0.62,
          "y": 0.5,
          "gridCol": 15,
          "gridRow": 0,
          "layoutOrder": 15,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:34:37.321Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-069af05b-3595-4c34-b196-9ac364c216c1",
          "category": "팀",
          "label": "연계 스킬 횟수 제한: 냉기 1",
          "title": "연계 스킬 횟수 제한: 냉기 1",
          "description": "오퍼레이터가 연계 스킬을 2회 사용할 때마다 메인 컨트롤 오퍼레이터에게 [냉기 부착 1스택] 부여\n\n* 각 오퍼레이터당 발동 가능한 쿨타임 [3초]",
          "tier": 1,
          "x": 0.66,
          "y": 0.5,
          "gridCol": 16,
          "gridRow": 0,
          "layoutOrder": 16,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:37:10.982Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-07f55139-50ef-4ad9-8b32-cae5ef602775",
          "category": "팀",
          "label": "연계 스킬 횟수 제한: 냉기 2",
          "title": "연계 스킬 횟수 제한: 냉기 2",
          "description": "오퍼레이터가 연계 스킬을 1회 사용할 때마다 메인 컨트롤 오퍼레이터에게 [냉기 부착 1스택] 부여\n\n* 각 오퍼레이터당 발동 가능한 쿨타임 [3초]",
          "tier": 2,
          "x": 0.66,
          "y": 0.5,
          "gridCol": 16,
          "gridRow": 0,
          "layoutOrder": 16,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:37:23.626Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "category": "조작",
          "label": "냉기 공격 피격 시 즉시 동결",
          "title": "냉기 피격 시 즉시 동결",
          "description": "적이 메인 컨트롤 오퍼레이터에게 [냉기]를 적용하면, 공격을 받은 메인 오퍼레이터가 [즉시 동결] 상태가 됩니다.\n\n* 냉기 피해 몬스터 리스트 *\n[수정 아겔로스]\n[탁류 아겔로스]\n[조류 아겔로스] (예외) 해당 제약을 적용하지 않아도 피격 시 오퍼레이터 동결 적용",
          "tier": 2,
          "x": 0.7,
          "y": 0.5,
          "gridCol": 17,
          "gridRow": 0,
          "layoutOrder": 17,
          "sourceConstraintId": null,
          "isSecondPhase": true,
          "createdAt": "2026-07-26T10:43:50.128Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "category": "환경",
          "label": "동결 시간 증가 / 열기속성 해제",
          "title": "동결 시간 증가 / 열기 해제",
          "description": "오퍼레이터가 받는 동결 지속 시간 [15초 증가]\n* 기존 동결 지속 시간 [5초]\n[열기 유형 스킬]을 사용할 경우, [동결 해제] 가능",
          "tier": 1,
          "x": 0.7,
          "y": 0.5,
          "gridCol": 17,
          "gridRow": 0,
          "layoutOrder": 17,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:01:45.737Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "category": "환경",
          "label": "동결 시간 증가 / 자연속성 해제",
          "title": "동결 시간 증가 / 자연 해제",
          "description": "오퍼레이터가 받는 동결 지속 시간 [15초 증가]\n* 기존 동결 지속 시간 [5초]\n[자연 유형 스킬]을 사용할 경우, [동결 해제] 가능",
          "tier": 1,
          "x": 0.74,
          "y": 0.5,
          "gridCol": 18,
          "gridRow": 0,
          "layoutOrder": 18,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:02:13.479Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "category": "환경",
          "label": "동결 시간 증가 / 전기속성 해제",
          "title": "동결 시간 증가 / 전기 해제",
          "description": "오퍼레이터가 받는 동결 지속 시간 [15초 증가]\n* 기존 동결 지속 시간 [5초]\n[전기 유형 스킬]을 사용할 경우, [동결 해제] 가능",
          "tier": 1,
          "x": 0.78,
          "y": 0.5,
          "gridCol": 19,
          "gridRow": 0,
          "layoutOrder": 19,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:02:46.126Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "category": "환경",
          "label": "동결 시간 증가 / 물리속성 해제",
          "title": "동결 시간 증가 / 물리 해제",
          "description": "오퍼레이터가 받는 동결 지속 시간 [15초 증가]\n* 기존 동결 지속 시간 [5초]\n[물리 유형 스킬]을 사용할 경우, [동결 해제] 가능",
          "tier": 1,
          "x": 0.82,
          "y": 0.5,
          "gridCol": 20,
          "gridRow": 0,
          "layoutOrder": 20,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:03:13.810Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-5d254c10-f50f-494b-8962-b179e5ad01fd",
          "category": "조작",
          "label": "적 제어 부여, 적 회복 5%",
          "title": "적 제어 효과 부여 시 회복 1",
          "description": "적이 군중 제어 효과에 걸리면 초당 최대 생명력의 [5%]를 회복합니다.",
          "tier": 1,
          "x": 0.86,
          "y": 0.5,
          "gridCol": 21,
          "gridRow": 0,
          "layoutOrder": 21,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:24:18.235Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-1810b8df-62c6-4808-9b10-d420058309e4",
          "category": "조작",
          "label": "적 제어 부여, 적 회복 15%",
          "title": "적 제어 효과 부여 시 회복 2",
          "description": "적이 군중 제어 효과에 걸리면 초당 최대 생명력의 [15%]를 회복합니다.",
          "tier": 2,
          "x": 0.86,
          "y": 0.5,
          "gridCol": 21,
          "gridRow": 0,
          "layoutOrder": 21,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:24:28.391Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-39d4ebf9-c9fb-46ba-9213-be5f213fabea",
          "category": "환경",
          "label": "4 웨이브 적 개체 강화",
          "title": "적 개체 강화 1",
          "description": "[최종(4) 웨이브]의 쌍뿔 아겔로스, 삼미 아겔로스가 \n[알파(α) 개체]로 변경\n\n* 알파(α) 개체 : 체력 [50%] 증가",
          "tier": 2,
          "x": 0.9,
          "y": 0.5,
          "gridCol": 22,
          "gridRow": 0,
          "layoutOrder": 22,
          "sourceConstraintId": null,
          "isSecondPhase": true,
          "createdAt": "2026-07-26T11:27:23.047Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-fed9df65-4d84-423c-acd1-77baa18661fd",
          "category": "환경",
          "label": "3, 4 웨이브 적 개체 강화",
          "title": "적 개체 강화 2",
          "description": "[웨이브(3), 최종(4) 웨이브]의 쌍뿔 아겔로스, 삼미 아겔로스가 \n[알파(α) 개체]로 변경\n\n* 알파(α) 개체 : 체력 [50%] 증가",
          "tier": 3,
          "x": 0.9,
          "y": 0.5,
          "gridCol": 22,
          "gridRow": 0,
          "layoutOrder": 22,
          "sourceConstraintId": null,
          "isSecondPhase": true,
          "createdAt": "2026-07-26T11:28:31.349Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-1e2cd626-0f53-4b43-a63d-d44f19241c9e",
          "category": "팀",
          "label": "오퍼레이터 주요 능력치 -10%",
          "title": "오퍼레이터 주요 능력치 감소 1",
          "description": "오퍼레이터 주요 능력치 [-10%]",
          "tier": 1,
          "x": 0.02,
          "y": 0.5,
          "gridCol": 0,
          "gridRow": 0,
          "layoutOrder": 0,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:42:13.150Z",
          "updatedAt": "2026-08-06T05:05:22.735Z"
        },
        {
          "id": "constraint-8cafa6f9-b106-449b-a400-95a38952df32",
          "category": "팀",
          "label": "오퍼레이터 주요 능력치 -20%",
          "title": "오퍼레이터 주요 능력치 감소 2",
          "description": "오퍼레이터 주요 능력치 [-N%]",
          "tier": 2,
          "x": 0.02,
          "y": 0.5,
          "gridCol": 0,
          "gridRow": 0,
          "layoutOrder": 0,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:42:27.156Z",
          "updatedAt": "2026-08-06T05:05:32.396Z"
        },
        {
          "id": "constraint-746d241b-dec0-4cea-9966-b9db3941eed1",
          "category": "팀",
          "label": "오퍼레이터 주요 능력치 -40%",
          "title": "오퍼레이터 주요 능력치 감소 3",
          "description": "오퍼레이터 주요 능력치 [-40%]",
          "tier": 3,
          "x": 0.02,
          "y": 0.5,
          "gridCol": 0,
          "gridRow": 0,
          "layoutOrder": 0,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T05:06:12.981Z",
          "updatedAt": "2026-08-06T05:06:14.614Z"
        },
        {
          "id": "constraint-b6cae3b0-53a6-42bb-956f-7736795848eb",
          "category": "조작",
          "label": "상태 단계당 대응 피해 -10%",
          "title": "방어 불능/아츠 부착 단계당 대응 피해 감소",
          "description": "[적에게 부착된 방어불능 또는 아츠부착 1단계]마다 해당 적이 받는 [부착 스택과 대응되는 데미지 -10%]\n(해당 버프는 부착 지속시간 종료 0.1초후에 소멸)",
          "tier": 1,
          "x": 0.54,
          "y": 0.5,
          "gridCol": 13,
          "gridRow": 0,
          "layoutOrder": 13,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T05:46:17.704Z",
          "updatedAt": "2026-08-06T12:12:52.547Z"
        },
        {
          "id": "constraint-f7efab9a-f30d-4152-b69c-a795194a0a74",
          "category": "환경",
          "label": "시간제한 -300초",
          "title": "시간제한 -300초",
          "description": "기본 클리어 제한 시간 [600초]에서\n[300초] 감소\n\n제한 시간 [300초(5분)]",
          "tier": 3,
          "x": 0.1,
          "y": 0.5,
          "gridCol": 2,
          "gridRow": 0,
          "layoutOrder": 2,
          "sourceConstraintId": null,
          "isSecondPhase": true,
          "createdAt": "2026-08-06T06:00:48.210Z",
          "updatedAt": "2026-08-06T06:49:08.305Z"
        },
        {
          "id": "constraint-c031b79c-7421-470f-91e5-c5cf0925aaa4",
          "category": "조작",
          "label": "적 생명력 +200%",
          "title": "적 생명력 +200%",
          "description": "적 생명력 [+200%]",
          "tier": 3,
          "x": 0.14,
          "y": 0.5,
          "gridCol": 3,
          "gridRow": 0,
          "layoutOrder": 3,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T06:14:30.850Z",
          "updatedAt": "2026-08-06T06:14:33.201Z"
        },
        {
          "id": "constraint-a802c62b-469e-4d98-a7e1-d7825cb9f698",
          "category": "팀",
          "label": "물리/아츠 부착 시 피해 감소 1",
          "title": "물리/아츠 부착 시 피해 감소 1",
          "description": "오퍼레이터가 적의 방어불능 또는 아츠부착 스택 수치를 증가시키면, 해당 오퍼레이터가 주는 해당 유형의 피해 [-45%] [10초간 지속]",
          "tier": 1,
          "x": 0.18,
          "y": 0.5,
          "gridCol": 4,
          "gridRow": 0,
          "layoutOrder": 4,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T11:52:55.717Z",
          "updatedAt": "2026-08-06T11:54:06.958Z"
        },
        {
          "id": "constraint-66a6f9ed-3768-4f1a-8380-832e8faaaa13",
          "category": "팀",
          "label": "물리/아츠 부착 시 피해 감소 2",
          "title": "물리/아츠 부착 시 피해 감소 2",
          "description": "오퍼레이터가 적의 방어불능 또는 아츠부착 스택 수치를 증가시키면, 해당 오퍼레이터가 주는 해당 유형의 피해 [-90%] [10초간 지속]",
          "tier": 2,
          "x": 0.18,
          "y": 0.5,
          "gridCol": 4,
          "gridRow": 0,
          "layoutOrder": 4,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T11:53:21.965Z",
          "updatedAt": "2026-08-06T11:54:02.399Z"
        },
        {
          "id": "constraint-0f3f7b1b-a04e-41e2-8d16-b15364c7ce8a",
          "category": "조작",
          "label": "적에게 가하는 순간 딜량 제한",
          "title": "적에게 가하는 순간 딜량 제한",
          "description": "적 이동속도 [+100%], [0.1초 내]에 받는 피해는 [최대 생명력의 25%]를 초과하지 않음",
          "tier": 2,
          "x": 0.38,
          "y": 0.5,
          "gridCol": 9,
          "gridRow": 0,
          "layoutOrder": 9,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T12:05:06.108Z",
          "updatedAt": "2026-08-06T12:05:08.906Z"
        },
        {
          "id": "constraint-8a1a1ce9-b829-49be-9128-514a2529b163",
          "category": "조작",
          "label": "물리/아츠 부착 1회만 허용",
          "title": "물리/아츠 부착 1회만 허용",
          "description": "각 적은 5초마다 [방어불능 또는 같은 유형의 아츠부착을 1회만] 부여받을 수 있음",
          "tier": 1,
          "x": 0.38,
          "y": 0.5,
          "gridCol": 9,
          "gridRow": 0,
          "layoutOrder": 9,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T12:07:18.692Z",
          "updatedAt": "2026-08-06T12:07:21.589Z"
        },
        {
          "id": "constraint-e8293d23-9266-4f56-9f36-dec13fa9e1e6",
          "category": "환경",
          "label": "오퍼 회복/보호막 획득시 적 회복",
          "title": "오퍼 회복/보호막 획득시 적 회복",
          "description": "메인 컨트롤 오퍼레이터가 [최대 HP의 10% 이상으로 회복]하거나 [20% 이상에 해당하는 보호막]을 얻을 때, 전장의 [모든 적도 최대 HP의 8%를 회복]한다",
          "tier": 2,
          "x": 0.42,
          "y": 0.5,
          "gridCol": 10,
          "gridRow": 0,
          "layoutOrder": 10,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T12:09:02.056Z",
          "updatedAt": "2026-08-06T12:09:33.560Z"
        },
        {
          "id": "constraint-369d3bea-8338-4f34-9d2c-b29f35bfd76c",
          "category": "팀",
          "label": "오퍼가 받은 피해 일부 HP 감소",
          "title": "오퍼가 받은 피해 일부 HP 감소",
          "description": "오퍼레이터가 받은 데미지의 일부 수치만큼 최대 생명력 감소\n근거리오퍼:[30%]\n원거리오퍼:[50%]",
          "tier": 3,
          "x": 0.42,
          "y": 0.5,
          "gridCol": 10,
          "gridRow": 0,
          "layoutOrder": 10,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T12:12:08.676Z",
          "updatedAt": "2026-08-06T12:12:10.252Z"
        }
      ],
      "relations": [
        {
          "id": "relation-2658715b-e109-4fdd-8c06-705ac855d24c",
          "a": "constraint-8d1211ab-8796-495d-8585-168711c868d6",
          "b": "constraint-81f0f266-11d3-4d88-af1c-d03344149293",
          "type": "conflict",
          "createdAt": "2026-07-26T05:34:27.774Z"
        },
        {
          "id": "relation-1d69be79-43cf-4b8e-b2a4-88349efb4b59",
          "a": "constraint-f809c887-1ce6-4092-91b3-071baea5be39",
          "b": "constraint-26907513-206c-4a68-83ab-f97172b2e9a6",
          "type": "conflict",
          "createdAt": "2026-07-26T06:55:39.480Z"
        },
        {
          "id": "relation-97d8d95e-b7da-4db5-b1af-23f1ff54bcd8",
          "a": "constraint-5bc259e4-b739-4c6e-9c2a-7b3745f0e9e1",
          "b": "constraint-83a3d8f1-453b-4b38-aabe-4c23c4297821",
          "type": "conflict",
          "createdAt": "2026-07-26T06:57:25.022Z"
        },
        {
          "id": "relation-3aba1ca3-5194-4934-8cda-a63746a278c7",
          "a": "constraint-d56b1044-3b47-4715-a84a-25d11cf5fa48",
          "b": "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de",
          "type": "conflict",
          "createdAt": "2026-07-26T06:58:23.942Z"
        },
        {
          "id": "relation-0659119c-bf4f-44d5-b48f-333b8dc5dc75",
          "a": "constraint-acdcff94-ff70-446c-a237-91375ad47463",
          "b": "constraint-b5fc4699-06a4-46f7-a05d-10086e052532",
          "type": "conflict",
          "createdAt": "2026-07-26T07:23:11.766Z"
        },
        {
          "id": "relation-55fa8052-095b-4bdc-b2d6-d1a0fe9e60d6",
          "a": "constraint-3371d3b1-a318-4c07-86c0-e9dbd30b31d3",
          "b": "constraint-de114359-c53b-416b-b3ae-405ab72b6ea4",
          "type": "conflict",
          "createdAt": "2026-07-26T07:26:39.919Z"
        },
        {
          "id": "relation-4d484aa6-30f5-4eb6-93aa-0aa7f175333a",
          "a": "constraint-bb996e82-a3fb-452b-9375-ae6315286b87",
          "b": "constraint-d997df22-39a5-4b6d-a243-5f4cd00f1f5d",
          "type": "conflict",
          "createdAt": "2026-07-26T10:22:53.495Z"
        },
        {
          "id": "relation-12734b1a-9f4e-4f4d-8c06-7d824f9782c6",
          "a": "constraint-56f6527a-cd59-4d06-8453-bb8b92e6feb4",
          "b": "constraint-4eb8e789-3c54-474b-906b-492d84e325a1",
          "type": "conflict",
          "createdAt": "2026-07-26T10:35:18.612Z"
        },
        {
          "id": "relation-e58ceafd-3d24-4870-b4eb-25770edfffef",
          "a": "constraint-9830f340-5aab-451e-9b75-5726018813a3",
          "b": "constraint-484b0e70-0078-4e17-82a2-1bd54068721b",
          "type": "conflict",
          "createdAt": "2026-07-26T10:35:20.258Z"
        },
        {
          "id": "relation-d1b2fbe4-2346-4b18-b9fc-c91e7c32dcd2",
          "a": "constraint-069af05b-3595-4c34-b196-9ac364c216c1",
          "b": "constraint-07f55139-50ef-4ad9-8b32-cae5ef602775",
          "type": "conflict",
          "createdAt": "2026-07-26T10:37:33.628Z"
        },
        {
          "id": "relation-76a78f94-0057-4a0b-b3b9-540273d1f57b",
          "a": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "b": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:34.933Z"
        },
        {
          "id": "relation-ef7a7237-e7ac-4625-8da5-005e463f1fe8",
          "a": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "b": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:38.105Z"
        },
        {
          "id": "relation-38728469-282a-4666-9bbc-fa2055dd9402",
          "a": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "b": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:40.117Z"
        },
        {
          "id": "relation-2be1bfba-035c-4b90-a2e2-b21ddb59fc44",
          "a": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "b": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:44.510Z"
        },
        {
          "id": "relation-199557b0-7fa4-47b4-9fd4-90e737c7d9a9",
          "a": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "b": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:46.285Z"
        },
        {
          "id": "relation-ed160eaf-fbc9-47ee-92ff-0c1b19cf094b",
          "a": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "b": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:49.224Z"
        },
        {
          "id": "relation-74a44660-50da-48d4-bbe7-7c07de21477e",
          "a": "constraint-484b0e70-0078-4e17-82a2-1bd54068721b",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:32.823Z"
        },
        {
          "id": "relation-34052c4c-3763-4449-a0ee-582728b922c8",
          "a": "constraint-07f55139-50ef-4ad9-8b32-cae5ef602775",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:34.678Z"
        },
        {
          "id": "relation-920dad56-63ae-41fb-8030-49f658362020",
          "a": "constraint-9830f340-5aab-451e-9b75-5726018813a3",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:40.055Z"
        },
        {
          "id": "relation-f4ed9d78-e771-4076-bf90-82e07ee85fee",
          "a": "constraint-069af05b-3595-4c34-b196-9ac364c216c1",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:41.468Z"
        },
        {
          "id": "relation-19e37070-a3a2-488b-8a51-1ab0a8851213",
          "a": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:43.884Z"
        },
        {
          "id": "relation-681d4e50-9a68-4029-9396-9f35303de699",
          "a": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:45.213Z"
        },
        {
          "id": "relation-817b4c09-2545-4500-a053-7843145d6eb1",
          "a": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:46.493Z"
        },
        {
          "id": "relation-eeecdaa8-f387-44c3-bc3b-67560a7036f6",
          "a": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:48.033Z"
        },
        {
          "id": "relation-1f459b3b-877a-4919-9728-d08fa5c5f286",
          "a": "constraint-39d4ebf9-c9fb-46ba-9213-be5f213fabea",
          "b": "constraint-fed9df65-4d84-423c-acd1-77baa18661fd",
          "type": "conflict",
          "createdAt": "2026-07-26T11:28:44.230Z"
        },
        {
          "id": "relation-3d50a21b-2022-4773-9249-74ed1c19b220",
          "a": "constraint-5d254c10-f50f-494b-8962-b179e5ad01fd",
          "b": "constraint-1810b8df-62c6-4808-9b10-d420058309e4",
          "type": "conflict",
          "createdAt": "2026-07-26T11:29:22.901Z"
        },
        {
          "id": "relation-c375de84-491d-4d7e-b7f3-fa921aeeda73",
          "a": "constraint-1e2cd626-0f53-4b43-a63d-d44f19241c9e",
          "b": "constraint-8cafa6f9-b106-449b-a400-95a38952df32",
          "type": "conflict",
          "createdAt": "2026-07-26T11:42:51.941Z"
        },
        {
          "id": "relation-f579a1ee-14f1-4742-9ea4-a2aa7045e031",
          "a": "constraint-8cafa6f9-b106-449b-a400-95a38952df32",
          "b": "constraint-746d241b-dec0-4cea-9966-b9db3941eed1",
          "type": "conflict",
          "createdAt": "2026-08-06T05:07:12.767Z"
        },
        {
          "id": "relation-2af751b1-7935-4dff-bada-0a64c78ee277",
          "a": "constraint-c67ed6e6-b8e8-4017-9d8b-64c5b6d0b74d",
          "b": "constraint-13385690-ec41-4bee-81bb-7c0cd4838ee5",
          "type": "conflict",
          "createdAt": "2026-08-06T05:07:38.629Z"
        },
        {
          "id": "relation-cd5633ff-b8a7-4628-801d-a02edeaf9dff",
          "a": "constraint-f7efab9a-f30d-4152-b69c-a795194a0a74",
          "b": "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de",
          "type": "conflict",
          "createdAt": "2026-08-06T06:01:45.820Z"
        },
        {
          "id": "relation-a11865bf-b329-4c6f-b08d-b581edb65800",
          "a": "constraint-81f0f266-11d3-4d88-af1c-d03344149293",
          "b": "constraint-c031b79c-7421-470f-91e5-c5cf0925aaa4",
          "type": "conflict",
          "createdAt": "2026-08-06T06:14:38.468Z"
        }
      ],
      "groups": [
        {
          "id": "group-e7233a27-ff9a-4d1d-80d3-eed9cfb52561",
          "type": "normal",
          "markerIds": [
            "constraint-8d1211ab-8796-495d-8585-168711c868d6",
            "constraint-81f0f266-11d3-4d88-af1c-d03344149293"
          ],
          "createdAt": "2026-07-25T15:56:47.375Z"
        },
        {
          "id": "group-09d395f9-a72a-4398-9d65-79e0a07ef2d0",
          "type": "normal",
          "markerIds": [
            "constraint-d56b1044-3b47-4715-a84a-25d11cf5fa48",
            "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de"
          ],
          "createdAt": "2026-07-25T15:56:51.887Z"
        },
        {
          "id": "group-e3ab5682-3e00-4a36-88e5-3a40bf6c7d14",
          "type": "normal",
          "markerIds": [
            "constraint-f809c887-1ce6-4092-91b3-071baea5be39",
            "constraint-26907513-206c-4a68-83ab-f97172b2e9a6"
          ],
          "createdAt": "2026-07-26T06:56:11.401Z"
        },
        {
          "id": "group-65e7db39-86b1-4e99-abd8-862220e31c7e",
          "type": "normal",
          "markerIds": [
            "constraint-5bc259e4-b739-4c6e-9c2a-7b3745f0e9e1",
            "constraint-83a3d8f1-453b-4b38-aabe-4c23c4297821"
          ],
          "createdAt": "2026-07-26T06:57:19.077Z"
        },
        {
          "id": "group-6e97eef7-b2da-4770-bc26-112c484592d6",
          "type": "normal",
          "markerIds": [
            "constraint-acdcff94-ff70-446c-a237-91375ad47463",
            "constraint-b5fc4699-06a4-46f7-a05d-10086e052532"
          ],
          "createdAt": "2026-07-26T07:23:08.653Z"
        },
        {
          "id": "group-6cb6647a-a789-41c8-ba94-fd82518fd2ee",
          "type": "normal",
          "markerIds": [
            "constraint-3371d3b1-a318-4c07-86c0-e9dbd30b31d3",
            "constraint-de114359-c53b-416b-b3ae-405ab72b6ea4"
          ],
          "createdAt": "2026-07-26T07:26:37.214Z"
        },
        {
          "id": "group-10823366-bdc5-4ff4-a37c-03018bb9f6a5",
          "type": "gatekeeper",
          "markerIds": [
            "constraint-d997df22-39a5-4b6d-a243-5f4cd00f1f5d",
            "constraint-bb996e82-a3fb-452b-9375-ae6315286b87"
          ],
          "createdAt": "2026-07-26T10:22:32.008Z"
        },
        {
          "id": "group-d0ae0c32-cd8c-4a0e-910e-dc8ffb62d17d",
          "type": "normal",
          "markerIds": [
            "constraint-56f6527a-cd59-4d06-8453-bb8b92e6feb4",
            "constraint-4eb8e789-3c54-474b-906b-492d84e325a1"
          ],
          "createdAt": "2026-07-26T10:29:30.887Z"
        },
        {
          "id": "group-20a5ba92-9a41-4a98-a324-2495918efe74",
          "type": "normal",
          "markerIds": [
            "constraint-9830f340-5aab-451e-9b75-5726018813a3",
            "constraint-484b0e70-0078-4e17-82a2-1bd54068721b"
          ],
          "createdAt": "2026-07-26T10:35:15.704Z"
        },
        {
          "id": "group-470b9153-797c-4b4a-b99d-9768dc879b5a",
          "type": "normal",
          "markerIds": [
            "constraint-069af05b-3595-4c34-b196-9ac364c216c1",
            "constraint-07f55139-50ef-4ad9-8b32-cae5ef602775"
          ],
          "createdAt": "2026-07-26T10:37:31.278Z"
        },
        {
          "id": "group-bcae8ba5-d08a-4ef1-84b9-37ee12ca7feb",
          "type": "normal",
          "markerIds": [
            "constraint-03d66d12-d414-46be-a359-d2962d24793d",
            "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
            "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
            "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb"
          ],
          "createdAt": "2026-07-26T11:04:26.943Z"
        },
        {
          "id": "group-50df0d3f-55ae-409d-bfc0-fb18615b8eef",
          "type": "normal",
          "markerIds": [
            "constraint-5d254c10-f50f-494b-8962-b179e5ad01fd",
            "constraint-1810b8df-62c6-4808-9b10-d420058309e4"
          ],
          "createdAt": "2026-07-26T11:25:31.476Z"
        },
        {
          "id": "group-94f60558-66d3-4f74-bc9a-314062a757f5",
          "type": "normal",
          "markerIds": [
            "constraint-39d4ebf9-c9fb-46ba-9213-be5f213fabea",
            "constraint-fed9df65-4d84-423c-acd1-77baa18661fd"
          ],
          "createdAt": "2026-07-26T11:28:41.557Z"
        },
        {
          "id": "group-45f11026-09ff-4cdf-9daa-2f6379be351e",
          "type": "normal",
          "markerIds": [
            "constraint-1e2cd626-0f53-4b43-a63d-d44f19241c9e",
            "constraint-8cafa6f9-b106-449b-a400-95a38952df32"
          ],
          "createdAt": "2026-07-26T11:42:49.259Z"
        },
        {
          "id": "group-87c844ab-ed02-49f8-a2ba-cdbe39276317",
          "type": "normal",
          "markerIds": [
            "constraint-c67ed6e6-b8e8-4017-9d8b-64c5b6d0b74d",
            "constraint-13385690-ec41-4bee-81bb-7c0cd4838ee5"
          ],
          "createdAt": "2026-08-06T05:07:32.315Z"
        },
        {
          "id": "group-67ed1b29-b718-4d84-b1a6-8fe16f0cffac",
          "type": "normal",
          "markerIds": [
            "constraint-8cafa6f9-b106-449b-a400-95a38952df32",
            "constraint-746d241b-dec0-4cea-9966-b9db3941eed1"
          ],
          "createdAt": "2026-08-06T05:17:22.866Z"
        },
        {
          "id": "group-6948b3b3-cc04-4cd3-ab91-51f131ad1d76",
          "type": "normal",
          "markerIds": [
            "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de",
            "constraint-f7efab9a-f30d-4152-b69c-a795194a0a74"
          ],
          "createdAt": "2026-08-06T06:01:42.945Z"
        },
        {
          "id": "group-ab0ba632-ebb9-4337-bc77-c04fa99e9f4a",
          "type": "normal",
          "markerIds": [
            "constraint-81f0f266-11d3-4d88-af1c-d03344149293",
            "constraint-c031b79c-7421-470f-91e5-c5cf0925aaa4"
          ],
          "createdAt": "2026-08-06T06:14:36.109Z"
        }
      ],
      "relationVisibility": {
        "conflict": true,
        "synergy": true
      },
      "secondPhaseIncluded": true,
      "trayViewAll": false,
      "boardColumns": 25,
      "updatedAt": "2026-08-06T12:14:10.740Z"
    }
  },
  {
    "id": "version-80fe1dab-caea-4100-b33b-4ce51da7a856",
    "name": "v1.4",
    "memo": "제약 추가",
    "createdAt": "2026-08-06T12:14:58.655Z",
    "snapshot": {
      "schemaVersion": 1,
      "projectId": "constraint-project-776675a0-07b4-44a9-8381-f7532cda9e82",
      "markers": [
        {
          "id": "constraint-c67ed6e6-b8e8-4017-9d8b-64c5b6d0b74d",
          "category": "조작",
          "label": "적이 주는 피해 +30%",
          "title": "적이 주는 피해 [+N%]",
          "description": "적이 플레이어에게 가하는  피해가 \n[30%] 증가합니다.",
          "tier": 1,
          "x": 0.06,
          "y": 0.5,
          "gridCol": 1,
          "gridRow": 0,
          "layoutOrder": 1,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T13:51:11.953Z",
          "updatedAt": "2026-08-06T05:56:24.922Z"
        },
        {
          "id": "constraint-13385690-ec41-4bee-81bb-7c0cd4838ee5",
          "category": "조작",
          "label": "적이 주는 피해 +80%",
          "title": "적이 주는 피해 [++N%]",
          "description": "적이 플레이어에게 가하는  피해가 \n[80%] 증가합니다.",
          "tier": 2,
          "x": 0.06,
          "y": 0.5,
          "gridCol": 1,
          "gridRow": 0,
          "layoutOrder": 1,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T13:52:44.999Z",
          "updatedAt": "2026-08-06T05:56:38.975Z"
        },
        {
          "id": "constraint-d56b1044-3b47-4715-a84a-25d11cf5fa48",
          "category": "환경",
          "label": "시간제한 -100초",
          "title": "시간제한 -100초",
          "description": "기본 클리어 제한 시간 [600초]에서\n[100초] 감소\n\n제한 시간 [500초(8분 20초)]",
          "tier": 1,
          "x": 0.1,
          "y": 0.5,
          "gridCol": 2,
          "gridRow": 0,
          "layoutOrder": 2,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T13:55:14.297Z",
          "updatedAt": "2026-08-06T06:02:33.878Z"
        },
        {
          "id": "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de",
          "category": "환경",
          "label": "시간제한 -200초",
          "title": "시간제한 -200초",
          "description": "기본 클리어 제한 시간 [600초]에서\n[200초] 감소\n\n제한 시간 [400초(6분 40초)]",
          "tier": 2,
          "x": 0.1,
          "y": 0.5,
          "gridCol": 2,
          "gridRow": 0,
          "layoutOrder": 2,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T13:56:24.842Z",
          "updatedAt": "2026-08-06T06:01:32.182Z"
        },
        {
          "id": "constraint-8d1211ab-8796-495d-8585-168711c868d6",
          "category": "조작",
          "label": "적 생명력 +50%",
          "title": "적 생명력 +50%",
          "description": "적 생명력 [+50%]",
          "tier": 1,
          "x": 0.14,
          "y": 0.5,
          "gridCol": 3,
          "gridRow": 0,
          "layoutOrder": 3,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T14:19:56.168Z",
          "updatedAt": "2026-08-06T06:13:55.218Z"
        },
        {
          "id": "constraint-81f0f266-11d3-4d88-af1c-d03344149293",
          "category": "조작",
          "label": "적 생명력 +100%",
          "title": "적 생명력 [+100%]",
          "description": "적 생명력 [+100%]",
          "tier": 2,
          "x": 0.14,
          "y": 0.5,
          "gridCol": 3,
          "gridRow": 0,
          "layoutOrder": 3,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T14:20:13.440Z",
          "updatedAt": "2026-08-06T06:14:14.140Z"
        },
        {
          "id": "constraint-f809c887-1ce6-4092-91b3-071baea5be39",
          "category": "팀",
          "label": "메인 오퍼 받는 피해 +50%",
          "title": "메인 오퍼 받는 피해 +50%",
          "description": "메인 컨트롤 오퍼레이터가 받는 피해 [+50%]",
          "tier": 1,
          "x": 0.22,
          "y": 0.5,
          "gridCol": 5,
          "gridRow": 0,
          "layoutOrder": 5,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T06:55:02.719Z",
          "updatedAt": "2026-08-06T11:54:23.498Z"
        },
        {
          "id": "constraint-26907513-206c-4a68-83ab-f97172b2e9a6",
          "category": "팀",
          "label": "메인 오퍼 받는 피해 +100%",
          "title": "메인 오퍼 받는 피해 +100%",
          "description": "메인 컨트롤 오퍼레이터가 받는 피해 [+100%]",
          "tier": 2,
          "x": 0.22,
          "y": 0.5,
          "gridCol": 5,
          "gridRow": 0,
          "layoutOrder": 5,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T06:55:23.102Z",
          "updatedAt": "2026-08-06T11:54:23.498Z"
        },
        {
          "id": "constraint-5bc259e4-b739-4c6e-9c2a-7b3745f0e9e1",
          "category": "환경",
          "label": "기력 회복 속도 -50%",
          "title": "기력 회복 속도 -50%",
          "description": "기력 회복 속도 [-50%]",
          "tier": 1,
          "x": 0.26,
          "y": 0.5,
          "gridCol": 6,
          "gridRow": 0,
          "layoutOrder": 6,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T06:56:58.455Z",
          "updatedAt": "2026-08-06T11:54:28.748Z"
        },
        {
          "id": "constraint-83a3d8f1-453b-4b38-aabe-4c23c4297821",
          "category": "환경",
          "label": "회피 불가",
          "title": "회피 불가",
          "description": "메인 오퍼레이터는 회피를 사용할 수 없습니다.\n[기존 달리기는 사용 가능]\n[기존 돌진은 사용 불가]",
          "tier": 3,
          "x": 0.26,
          "y": 0.5,
          "gridCol": 6,
          "gridRow": 0,
          "layoutOrder": 6,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T06:57:11.307Z",
          "updatedAt": "2026-08-06T11:54:28.748Z"
        },
        {
          "id": "constraint-acdcff94-ff70-446c-a237-91375ad47463",
          "category": "환경",
          "label": "치유 물질 생성 감소",
          "title": "치유 물질 생성 감소 1",
          "description": "웨이브 사이에 [치유 물질이 1개씩 총 3개 생성]\n치유 물질 1개 당 오퍼레이터 최대 체력의 [10%] 회복\n\n*제약 미적용 시 웨이브 사이에 [치유물질이 3개씩 총 9개 생성]",
          "tier": 1,
          "x": 0.3,
          "y": 0.5,
          "gridCol": 7,
          "gridRow": 0,
          "layoutOrder": 7,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T07:22:37.530Z",
          "updatedAt": "2026-08-06T11:59:43.929Z"
        },
        {
          "id": "constraint-b5fc4699-06a4-46f7-a05d-10086e052532",
          "category": "환경",
          "label": "치유 물질 생성 제한",
          "title": "치유 물질 생성 제한",
          "description": "웨이브 사이에 치유 물질이 [생성되지 않음]",
          "tier": 2,
          "x": 0.3,
          "y": 0.5,
          "gridCol": 7,
          "gridRow": 0,
          "layoutOrder": 7,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T07:23:02.744Z",
          "updatedAt": "2026-08-06T12:00:13.348Z"
        },
        {
          "id": "constraint-3371d3b1-a318-4c07-86c0-e9dbd30b31d3",
          "category": "팀",
          "label": "반복 궁극기 피해 -50%",
          "title": "반복 궁극기 피해 -50%",
          "description": "오퍼레이터가 궁극기를 1회 사용할 때마다, 해당 오퍼레이터가 이후 사용하는 궁극기 피해 [-50%] 감소",
          "tier": 2,
          "x": 0.34,
          "y": 0.5,
          "gridCol": 8,
          "gridRow": 0,
          "layoutOrder": 8,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T07:26:06.017Z",
          "updatedAt": "2026-08-06T12:02:26.757Z"
        },
        {
          "id": "constraint-de114359-c53b-416b-b3ae-405ab72b6ea4",
          "category": "팀",
          "label": "반복 궁극기 피해 -100%",
          "title": "반복 궁극기 피해 -100%",
          "description": "오퍼레이터가 궁극기를 1회 사용할 때마다, 해당 오퍼레이터가 이후 사용하는 궁극기 피해 [-100%] 감소",
          "tier": 3,
          "x": 0.34,
          "y": 0.5,
          "gridCol": 8,
          "gridRow": 0,
          "layoutOrder": 8,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T07:26:24.360Z",
          "updatedAt": "2026-08-06T12:01:12.952Z"
        },
        {
          "id": "constraint-74cde916-7cfa-4230-a96b-e553daec56ff",
          "category": "팀",
          "label": "일반 공격 피해 -70%",
          "title": "일반 공격 피해 감소",
          "description": "오퍼레이터의 일반 공격 피해 [-70%]",
          "tier": 3,
          "x": 0.38,
          "y": 0.5,
          "gridCol": 9,
          "gridRow": 0,
          "layoutOrder": 9,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:09:17.017Z",
          "updatedAt": "2026-08-06T12:01:28.565Z"
        },
        {
          "id": "constraint-9cdb62e8-085b-49a4-86d5-a1d44bf440ac",
          "category": "팀",
          "label": "스킬 게이지 자연회복 중단",
          "title": "스킬 게이지 자연회복 중단",
          "description": "메인 컨트롤 오퍼레이터가 [12초] 내에 강력한 일격 피해를 주지 않으면, 스킬 게이지 자연 회복 중단",
          "tier": 1,
          "x": 0.42,
          "y": 0.5,
          "gridCol": 10,
          "gridRow": 0,
          "layoutOrder": 10,
          "sourceConstraintId": null,
          "isSecondPhase": true,
          "createdAt": "2026-07-26T10:10:46.703Z",
          "updatedAt": "2026-08-06T12:01:46.055Z"
        },
        {
          "id": "constraint-d997df22-39a5-4b6d-a243-5f4cd00f1f5d",
          "category": "환경",
          "label": "연계/배틀 스킬 쿨감/약화",
          "title": "연계/배틀 스킬 쿨감/약화",
          "description": "오퍼레이터 \n연계 스킬 쿨타임 [-60%]\n배틀 스킬 피해 [-60%]",
          "tier": 3,
          "x": 0.46,
          "y": 0.5,
          "gridCol": 11,
          "gridRow": 0,
          "layoutOrder": 11,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:21:01.267Z",
          "updatedAt": "2026-08-06T11:51:05.864Z"
        },
        {
          "id": "constraint-bb996e82-a3fb-452b-9375-ae6315286b87",
          "category": "환경",
          "label": "물리/아츠 강화",
          "title": "물리/아츠 강화",
          "description": "오퍼레이터 일반 공격, 배틀 스킬, 연계 스킬, 궁극기 이외의 피해 [+100%]\n\n배틀 스킬 피해 [-60%]",
          "tier": 3,
          "x": 0.5,
          "y": 0.5,
          "gridCol": 12,
          "gridRow": 0,
          "layoutOrder": 12,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:22:24.947Z",
          "updatedAt": "2026-08-06T11:51:05.864Z"
        },
        {
          "id": "constraint-e8e63da7-85f4-428b-bff8-0361c634a5f9",
          "category": "환경",
          "label": "메인 오퍼레이터 전환 불가",
          "title": "메인 오퍼레이터 전환 불가",
          "description": "전투가 시작된 후 [메인 컨트롤 오퍼레이터 전환 불가]",
          "tier": 2,
          "x": 0.54,
          "y": 0.5,
          "gridCol": 13,
          "gridRow": 0,
          "layoutOrder": 13,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:24:33.442Z",
          "updatedAt": "2026-08-06T12:13:00.824Z"
        },
        {
          "id": "constraint-56f6527a-cd59-4d06-8453-bb8b92e6feb4",
          "category": "조작",
          "label": "적 사망 시 독성 장판 1",
          "title": "적 사망 시 독성 장판 1",
          "description": "처치 당한 적이 독성 물질을 남기고 오퍼레이터가 독성 물질의 범위에 있을 때, [매 초마다 최대 생명력의 2%] 피해를 입음",
          "tier": 1,
          "x": 0.58,
          "y": 0.5,
          "gridCol": 14,
          "gridRow": 0,
          "layoutOrder": 14,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:28:50.511Z",
          "updatedAt": "2026-08-06T12:13:59.138Z"
        },
        {
          "id": "constraint-4eb8e789-3c54-474b-906b-492d84e325a1",
          "category": "조작",
          "label": "적 사망 시 독성 장판 2",
          "title": "적 사망 시 독성 장판 2",
          "description": "처치 당한 적이 독성 물질을 남기고 오퍼레이터가 독성 물질의 범위에 있을 때, [매 초마다 최대 생명력의 5%] 피해를 입음",
          "tier": 2,
          "x": 0.58,
          "y": 0.5,
          "gridCol": 14,
          "gridRow": 0,
          "layoutOrder": 14,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:29:00.992Z",
          "updatedAt": "2026-08-06T12:14:10.734Z"
        },
        {
          "id": "constraint-9830f340-5aab-451e-9b75-5726018813a3",
          "category": "팀",
          "label": "배틀 스킬 횟수 제한: 냉기 1",
          "title": "배틀 스킬 횟수 제한: 냉기 1",
          "description": "오퍼레이터가 [배틀 스킬]을  [2회] 사용할 때마다 메인 컨트롤 오퍼레이터에게 [냉기 부착 1스택] 부여 \n\n* 각 오퍼레이터 당 발동 가능 쿨타임 [3초]",
          "tier": 1,
          "x": 0.62,
          "y": 0.5,
          "gridCol": 15,
          "gridRow": 0,
          "layoutOrder": 15,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:34:11.770Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-484b0e70-0078-4e17-82a2-1bd54068721b",
          "category": "팀",
          "label": "배틀 스킬 횟수 제한: 냉기 2",
          "title": "배틀 스킬 횟수 제한: 냉기 2",
          "description": "오퍼레이터가 [배틀 스킬]을  [1회] 사용할 때마다 메인 컨트롤 오퍼레이터에게 [냉기 부착 1스택] 부여 \n\n* 각 오퍼레이터 당 발동 가능 쿨타임 [3초]",
          "tier": 2,
          "x": 0.62,
          "y": 0.5,
          "gridCol": 15,
          "gridRow": 0,
          "layoutOrder": 15,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:34:37.321Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-069af05b-3595-4c34-b196-9ac364c216c1",
          "category": "팀",
          "label": "연계 스킬 횟수 제한: 냉기 1",
          "title": "연계 스킬 횟수 제한: 냉기 1",
          "description": "오퍼레이터가 연계 스킬을 2회 사용할 때마다 메인 컨트롤 오퍼레이터에게 [냉기 부착 1스택] 부여\n\n* 각 오퍼레이터당 발동 가능한 쿨타임 [3초]",
          "tier": 1,
          "x": 0.66,
          "y": 0.5,
          "gridCol": 16,
          "gridRow": 0,
          "layoutOrder": 16,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:37:10.982Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-07f55139-50ef-4ad9-8b32-cae5ef602775",
          "category": "팀",
          "label": "연계 스킬 횟수 제한: 냉기 2",
          "title": "연계 스킬 횟수 제한: 냉기 2",
          "description": "오퍼레이터가 연계 스킬을 1회 사용할 때마다 메인 컨트롤 오퍼레이터에게 [냉기 부착 1스택] 부여\n\n* 각 오퍼레이터당 발동 가능한 쿨타임 [3초]",
          "tier": 2,
          "x": 0.66,
          "y": 0.5,
          "gridCol": 16,
          "gridRow": 0,
          "layoutOrder": 16,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:37:23.626Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "category": "조작",
          "label": "냉기 공격 피격 시 즉시 동결",
          "title": "냉기 피격 시 즉시 동결",
          "description": "적이 메인 컨트롤 오퍼레이터에게 [냉기]를 적용하면, 공격을 받은 메인 오퍼레이터가 [즉시 동결] 상태가 됩니다.\n\n* 냉기 피해 몬스터 리스트 *\n[수정 아겔로스]\n[탁류 아겔로스]\n[조류 아겔로스] (예외) 해당 제약을 적용하지 않아도 피격 시 오퍼레이터 동결 적용",
          "tier": 2,
          "x": 0.7,
          "y": 0.5,
          "gridCol": 17,
          "gridRow": 0,
          "layoutOrder": 17,
          "sourceConstraintId": null,
          "isSecondPhase": true,
          "createdAt": "2026-07-26T10:43:50.128Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "category": "환경",
          "label": "동결 시간 증가 / 열기속성 해제",
          "title": "동결 시간 증가 / 열기 해제",
          "description": "오퍼레이터가 받는 동결 지속 시간 [15초 증가]\n* 기존 동결 지속 시간 [5초]\n[열기 유형 스킬]을 사용할 경우, [동결 해제] 가능",
          "tier": 1,
          "x": 0.7,
          "y": 0.5,
          "gridCol": 17,
          "gridRow": 0,
          "layoutOrder": 17,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:01:45.737Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "category": "환경",
          "label": "동결 시간 증가 / 자연속성 해제",
          "title": "동결 시간 증가 / 자연 해제",
          "description": "오퍼레이터가 받는 동결 지속 시간 [15초 증가]\n* 기존 동결 지속 시간 [5초]\n[자연 유형 스킬]을 사용할 경우, [동결 해제] 가능",
          "tier": 1,
          "x": 0.74,
          "y": 0.5,
          "gridCol": 18,
          "gridRow": 0,
          "layoutOrder": 18,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:02:13.479Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "category": "환경",
          "label": "동결 시간 증가 / 전기속성 해제",
          "title": "동결 시간 증가 / 전기 해제",
          "description": "오퍼레이터가 받는 동결 지속 시간 [15초 증가]\n* 기존 동결 지속 시간 [5초]\n[전기 유형 스킬]을 사용할 경우, [동결 해제] 가능",
          "tier": 1,
          "x": 0.78,
          "y": 0.5,
          "gridCol": 19,
          "gridRow": 0,
          "layoutOrder": 19,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:02:46.126Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "category": "환경",
          "label": "동결 시간 증가 / 물리속성 해제",
          "title": "동결 시간 증가 / 물리 해제",
          "description": "오퍼레이터가 받는 동결 지속 시간 [15초 증가]\n* 기존 동결 지속 시간 [5초]\n[물리 유형 스킬]을 사용할 경우, [동결 해제] 가능",
          "tier": 1,
          "x": 0.82,
          "y": 0.5,
          "gridCol": 20,
          "gridRow": 0,
          "layoutOrder": 20,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:03:13.810Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-5d254c10-f50f-494b-8962-b179e5ad01fd",
          "category": "조작",
          "label": "적 제어 부여, 적 회복 5%",
          "title": "적 제어 효과 부여 시 회복 1",
          "description": "적이 군중 제어 효과에 걸리면 초당 최대 생명력의 [5%]를 회복합니다.",
          "tier": 1,
          "x": 0.86,
          "y": 0.5,
          "gridCol": 21,
          "gridRow": 0,
          "layoutOrder": 21,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:24:18.235Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-1810b8df-62c6-4808-9b10-d420058309e4",
          "category": "조작",
          "label": "적 제어 부여, 적 회복 15%",
          "title": "적 제어 효과 부여 시 회복 2",
          "description": "적이 군중 제어 효과에 걸리면 초당 최대 생명력의 [15%]를 회복합니다.",
          "tier": 2,
          "x": 0.86,
          "y": 0.5,
          "gridCol": 21,
          "gridRow": 0,
          "layoutOrder": 21,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:24:28.391Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-39d4ebf9-c9fb-46ba-9213-be5f213fabea",
          "category": "환경",
          "label": "4 웨이브 적 개체 강화",
          "title": "적 개체 강화 1",
          "description": "[최종(4) 웨이브]의 쌍뿔 아겔로스, 삼미 아겔로스가 \n[알파(α) 개체]로 변경\n\n* 알파(α) 개체 : 체력 [50%] 증가",
          "tier": 2,
          "x": 0.9,
          "y": 0.5,
          "gridCol": 22,
          "gridRow": 0,
          "layoutOrder": 22,
          "sourceConstraintId": null,
          "isSecondPhase": true,
          "createdAt": "2026-07-26T11:27:23.047Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-fed9df65-4d84-423c-acd1-77baa18661fd",
          "category": "환경",
          "label": "3, 4 웨이브 적 개체 강화",
          "title": "적 개체 강화 2",
          "description": "[웨이브(3), 최종(4) 웨이브]의 쌍뿔 아겔로스, 삼미 아겔로스가 \n[알파(α) 개체]로 변경\n\n* 알파(α) 개체 : 체력 [50%] 증가",
          "tier": 3,
          "x": 0.9,
          "y": 0.5,
          "gridCol": 22,
          "gridRow": 0,
          "layoutOrder": 22,
          "sourceConstraintId": null,
          "isSecondPhase": true,
          "createdAt": "2026-07-26T11:28:31.349Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-1e2cd626-0f53-4b43-a63d-d44f19241c9e",
          "category": "팀",
          "label": "오퍼레이터 주요 능력치 -10%",
          "title": "오퍼레이터 주요 능력치 감소 1",
          "description": "오퍼레이터 주요 능력치 [-10%]",
          "tier": 1,
          "x": 0.02,
          "y": 0.5,
          "gridCol": 0,
          "gridRow": 0,
          "layoutOrder": 0,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:42:13.150Z",
          "updatedAt": "2026-08-06T05:05:22.735Z"
        },
        {
          "id": "constraint-8cafa6f9-b106-449b-a400-95a38952df32",
          "category": "팀",
          "label": "오퍼레이터 주요 능력치 -20%",
          "title": "오퍼레이터 주요 능력치 감소 2",
          "description": "오퍼레이터 주요 능력치 [-N%]",
          "tier": 2,
          "x": 0.02,
          "y": 0.5,
          "gridCol": 0,
          "gridRow": 0,
          "layoutOrder": 0,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:42:27.156Z",
          "updatedAt": "2026-08-06T05:05:32.396Z"
        },
        {
          "id": "constraint-746d241b-dec0-4cea-9966-b9db3941eed1",
          "category": "팀",
          "label": "오퍼레이터 주요 능력치 -40%",
          "title": "오퍼레이터 주요 능력치 감소 3",
          "description": "오퍼레이터 주요 능력치 [-40%]",
          "tier": 3,
          "x": 0.02,
          "y": 0.5,
          "gridCol": 0,
          "gridRow": 0,
          "layoutOrder": 0,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T05:06:12.981Z",
          "updatedAt": "2026-08-06T05:06:14.614Z"
        },
        {
          "id": "constraint-b6cae3b0-53a6-42bb-956f-7736795848eb",
          "category": "조작",
          "label": "상태 단계당 대응 피해 -10%",
          "title": "방어 불능/아츠 부착 단계당 대응 피해 감소",
          "description": "[적에게 부착된 방어불능 또는 아츠부착 1단계]마다 해당 적이 받는 [부착 스택과 대응되는 데미지 -10%]\n(해당 버프는 부착 지속시간 종료 0.1초후에 소멸)",
          "tier": 1,
          "x": 0.54,
          "y": 0.5,
          "gridCol": 13,
          "gridRow": 0,
          "layoutOrder": 13,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T05:46:17.704Z",
          "updatedAt": "2026-08-06T12:12:52.547Z"
        },
        {
          "id": "constraint-f7efab9a-f30d-4152-b69c-a795194a0a74",
          "category": "환경",
          "label": "시간제한 -300초",
          "title": "시간제한 -300초",
          "description": "기본 클리어 제한 시간 [600초]에서\n[300초] 감소\n\n제한 시간 [300초(5분)]",
          "tier": 3,
          "x": 0.1,
          "y": 0.5,
          "gridCol": 2,
          "gridRow": 0,
          "layoutOrder": 2,
          "sourceConstraintId": null,
          "isSecondPhase": true,
          "createdAt": "2026-08-06T06:00:48.210Z",
          "updatedAt": "2026-08-06T06:49:08.305Z"
        },
        {
          "id": "constraint-c031b79c-7421-470f-91e5-c5cf0925aaa4",
          "category": "조작",
          "label": "적 생명력 +200%",
          "title": "적 생명력 +200%",
          "description": "적 생명력 [+200%]",
          "tier": 3,
          "x": 0.14,
          "y": 0.5,
          "gridCol": 3,
          "gridRow": 0,
          "layoutOrder": 3,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T06:14:30.850Z",
          "updatedAt": "2026-08-06T06:14:33.201Z"
        },
        {
          "id": "constraint-a802c62b-469e-4d98-a7e1-d7825cb9f698",
          "category": "팀",
          "label": "물리/아츠 부착 시 피해 감소 1",
          "title": "물리/아츠 부착 시 피해 감소 1",
          "description": "오퍼레이터가 적의 방어불능 또는 아츠부착 스택 수치를 증가시키면, 해당 오퍼레이터가 주는 해당 유형의 피해 [-45%] [10초간 지속]",
          "tier": 1,
          "x": 0.18,
          "y": 0.5,
          "gridCol": 4,
          "gridRow": 0,
          "layoutOrder": 4,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T11:52:55.717Z",
          "updatedAt": "2026-08-06T11:54:06.958Z"
        },
        {
          "id": "constraint-66a6f9ed-3768-4f1a-8380-832e8faaaa13",
          "category": "팀",
          "label": "물리/아츠 부착 시 피해 감소 2",
          "title": "물리/아츠 부착 시 피해 감소 2",
          "description": "오퍼레이터가 적의 방어불능 또는 아츠부착 스택 수치를 증가시키면, 해당 오퍼레이터가 주는 해당 유형의 피해 [-90%] [10초간 지속]",
          "tier": 2,
          "x": 0.18,
          "y": 0.5,
          "gridCol": 4,
          "gridRow": 0,
          "layoutOrder": 4,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T11:53:21.965Z",
          "updatedAt": "2026-08-06T11:54:02.399Z"
        },
        {
          "id": "constraint-0f3f7b1b-a04e-41e2-8d16-b15364c7ce8a",
          "category": "조작",
          "label": "적에게 가하는 순간 딜량 제한",
          "title": "적에게 가하는 순간 딜량 제한",
          "description": "적 이동속도 [+100%], [0.1초 내]에 받는 피해는 [최대 생명력의 25%]를 초과하지 않음",
          "tier": 2,
          "x": 0.38,
          "y": 0.5,
          "gridCol": 9,
          "gridRow": 0,
          "layoutOrder": 9,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T12:05:06.108Z",
          "updatedAt": "2026-08-06T12:05:08.906Z"
        },
        {
          "id": "constraint-8a1a1ce9-b829-49be-9128-514a2529b163",
          "category": "조작",
          "label": "물리/아츠 부착 1회만 허용",
          "title": "물리/아츠 부착 1회만 허용",
          "description": "각 적은 5초마다 [방어불능 또는 같은 유형의 아츠부착을 1회만] 부여받을 수 있음",
          "tier": 1,
          "x": 0.38,
          "y": 0.5,
          "gridCol": 9,
          "gridRow": 0,
          "layoutOrder": 9,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T12:07:18.692Z",
          "updatedAt": "2026-08-06T12:07:21.589Z"
        },
        {
          "id": "constraint-e8293d23-9266-4f56-9f36-dec13fa9e1e6",
          "category": "환경",
          "label": "오퍼 회복/보호막 획득시 적 회복",
          "title": "오퍼 회복/보호막 획득시 적 회복",
          "description": "메인 컨트롤 오퍼레이터가 [최대 HP의 10% 이상으로 회복]하거나 [20% 이상에 해당하는 보호막]을 얻을 때, 전장의 [모든 적도 최대 HP의 8%를 회복]한다",
          "tier": 2,
          "x": 0.42,
          "y": 0.5,
          "gridCol": 10,
          "gridRow": 0,
          "layoutOrder": 10,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T12:09:02.056Z",
          "updatedAt": "2026-08-06T12:09:33.560Z"
        },
        {
          "id": "constraint-369d3bea-8338-4f34-9d2c-b29f35bfd76c",
          "category": "팀",
          "label": "오퍼가 받은 피해 일부 HP 감소",
          "title": "오퍼가 받은 피해 일부 HP 감소",
          "description": "오퍼레이터가 받은 데미지의 일부 수치만큼 최대 생명력 감소\n근거리오퍼:[30%]\n원거리오퍼:[50%]",
          "tier": 3,
          "x": 0.42,
          "y": 0.5,
          "gridCol": 10,
          "gridRow": 0,
          "layoutOrder": 10,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T12:12:08.676Z",
          "updatedAt": "2026-08-06T12:12:10.252Z"
        }
      ],
      "relations": [
        {
          "id": "relation-2658715b-e109-4fdd-8c06-705ac855d24c",
          "a": "constraint-8d1211ab-8796-495d-8585-168711c868d6",
          "b": "constraint-81f0f266-11d3-4d88-af1c-d03344149293",
          "type": "conflict",
          "createdAt": "2026-07-26T05:34:27.774Z"
        },
        {
          "id": "relation-1d69be79-43cf-4b8e-b2a4-88349efb4b59",
          "a": "constraint-f809c887-1ce6-4092-91b3-071baea5be39",
          "b": "constraint-26907513-206c-4a68-83ab-f97172b2e9a6",
          "type": "conflict",
          "createdAt": "2026-07-26T06:55:39.480Z"
        },
        {
          "id": "relation-97d8d95e-b7da-4db5-b1af-23f1ff54bcd8",
          "a": "constraint-5bc259e4-b739-4c6e-9c2a-7b3745f0e9e1",
          "b": "constraint-83a3d8f1-453b-4b38-aabe-4c23c4297821",
          "type": "conflict",
          "createdAt": "2026-07-26T06:57:25.022Z"
        },
        {
          "id": "relation-3aba1ca3-5194-4934-8cda-a63746a278c7",
          "a": "constraint-d56b1044-3b47-4715-a84a-25d11cf5fa48",
          "b": "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de",
          "type": "conflict",
          "createdAt": "2026-07-26T06:58:23.942Z"
        },
        {
          "id": "relation-0659119c-bf4f-44d5-b48f-333b8dc5dc75",
          "a": "constraint-acdcff94-ff70-446c-a237-91375ad47463",
          "b": "constraint-b5fc4699-06a4-46f7-a05d-10086e052532",
          "type": "conflict",
          "createdAt": "2026-07-26T07:23:11.766Z"
        },
        {
          "id": "relation-55fa8052-095b-4bdc-b2d6-d1a0fe9e60d6",
          "a": "constraint-3371d3b1-a318-4c07-86c0-e9dbd30b31d3",
          "b": "constraint-de114359-c53b-416b-b3ae-405ab72b6ea4",
          "type": "conflict",
          "createdAt": "2026-07-26T07:26:39.919Z"
        },
        {
          "id": "relation-4d484aa6-30f5-4eb6-93aa-0aa7f175333a",
          "a": "constraint-bb996e82-a3fb-452b-9375-ae6315286b87",
          "b": "constraint-d997df22-39a5-4b6d-a243-5f4cd00f1f5d",
          "type": "conflict",
          "createdAt": "2026-07-26T10:22:53.495Z"
        },
        {
          "id": "relation-12734b1a-9f4e-4f4d-8c06-7d824f9782c6",
          "a": "constraint-56f6527a-cd59-4d06-8453-bb8b92e6feb4",
          "b": "constraint-4eb8e789-3c54-474b-906b-492d84e325a1",
          "type": "conflict",
          "createdAt": "2026-07-26T10:35:18.612Z"
        },
        {
          "id": "relation-e58ceafd-3d24-4870-b4eb-25770edfffef",
          "a": "constraint-9830f340-5aab-451e-9b75-5726018813a3",
          "b": "constraint-484b0e70-0078-4e17-82a2-1bd54068721b",
          "type": "conflict",
          "createdAt": "2026-07-26T10:35:20.258Z"
        },
        {
          "id": "relation-d1b2fbe4-2346-4b18-b9fc-c91e7c32dcd2",
          "a": "constraint-069af05b-3595-4c34-b196-9ac364c216c1",
          "b": "constraint-07f55139-50ef-4ad9-8b32-cae5ef602775",
          "type": "conflict",
          "createdAt": "2026-07-26T10:37:33.628Z"
        },
        {
          "id": "relation-76a78f94-0057-4a0b-b3b9-540273d1f57b",
          "a": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "b": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:34.933Z"
        },
        {
          "id": "relation-ef7a7237-e7ac-4625-8da5-005e463f1fe8",
          "a": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "b": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:38.105Z"
        },
        {
          "id": "relation-38728469-282a-4666-9bbc-fa2055dd9402",
          "a": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "b": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:40.117Z"
        },
        {
          "id": "relation-2be1bfba-035c-4b90-a2e2-b21ddb59fc44",
          "a": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "b": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:44.510Z"
        },
        {
          "id": "relation-199557b0-7fa4-47b4-9fd4-90e737c7d9a9",
          "a": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "b": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:46.285Z"
        },
        {
          "id": "relation-ed160eaf-fbc9-47ee-92ff-0c1b19cf094b",
          "a": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "b": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:49.224Z"
        },
        {
          "id": "relation-74a44660-50da-48d4-bbe7-7c07de21477e",
          "a": "constraint-484b0e70-0078-4e17-82a2-1bd54068721b",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:32.823Z"
        },
        {
          "id": "relation-34052c4c-3763-4449-a0ee-582728b922c8",
          "a": "constraint-07f55139-50ef-4ad9-8b32-cae5ef602775",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:34.678Z"
        },
        {
          "id": "relation-920dad56-63ae-41fb-8030-49f658362020",
          "a": "constraint-9830f340-5aab-451e-9b75-5726018813a3",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:40.055Z"
        },
        {
          "id": "relation-f4ed9d78-e771-4076-bf90-82e07ee85fee",
          "a": "constraint-069af05b-3595-4c34-b196-9ac364c216c1",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:41.468Z"
        },
        {
          "id": "relation-19e37070-a3a2-488b-8a51-1ab0a8851213",
          "a": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:43.884Z"
        },
        {
          "id": "relation-681d4e50-9a68-4029-9396-9f35303de699",
          "a": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:45.213Z"
        },
        {
          "id": "relation-817b4c09-2545-4500-a053-7843145d6eb1",
          "a": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:46.493Z"
        },
        {
          "id": "relation-eeecdaa8-f387-44c3-bc3b-67560a7036f6",
          "a": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:48.033Z"
        },
        {
          "id": "relation-1f459b3b-877a-4919-9728-d08fa5c5f286",
          "a": "constraint-39d4ebf9-c9fb-46ba-9213-be5f213fabea",
          "b": "constraint-fed9df65-4d84-423c-acd1-77baa18661fd",
          "type": "conflict",
          "createdAt": "2026-07-26T11:28:44.230Z"
        },
        {
          "id": "relation-3d50a21b-2022-4773-9249-74ed1c19b220",
          "a": "constraint-5d254c10-f50f-494b-8962-b179e5ad01fd",
          "b": "constraint-1810b8df-62c6-4808-9b10-d420058309e4",
          "type": "conflict",
          "createdAt": "2026-07-26T11:29:22.901Z"
        },
        {
          "id": "relation-c375de84-491d-4d7e-b7f3-fa921aeeda73",
          "a": "constraint-1e2cd626-0f53-4b43-a63d-d44f19241c9e",
          "b": "constraint-8cafa6f9-b106-449b-a400-95a38952df32",
          "type": "conflict",
          "createdAt": "2026-07-26T11:42:51.941Z"
        },
        {
          "id": "relation-f579a1ee-14f1-4742-9ea4-a2aa7045e031",
          "a": "constraint-8cafa6f9-b106-449b-a400-95a38952df32",
          "b": "constraint-746d241b-dec0-4cea-9966-b9db3941eed1",
          "type": "conflict",
          "createdAt": "2026-08-06T05:07:12.767Z"
        },
        {
          "id": "relation-2af751b1-7935-4dff-bada-0a64c78ee277",
          "a": "constraint-c67ed6e6-b8e8-4017-9d8b-64c5b6d0b74d",
          "b": "constraint-13385690-ec41-4bee-81bb-7c0cd4838ee5",
          "type": "conflict",
          "createdAt": "2026-08-06T05:07:38.629Z"
        },
        {
          "id": "relation-cd5633ff-b8a7-4628-801d-a02edeaf9dff",
          "a": "constraint-f7efab9a-f30d-4152-b69c-a795194a0a74",
          "b": "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de",
          "type": "conflict",
          "createdAt": "2026-08-06T06:01:45.820Z"
        },
        {
          "id": "relation-a11865bf-b329-4c6f-b08d-b581edb65800",
          "a": "constraint-81f0f266-11d3-4d88-af1c-d03344149293",
          "b": "constraint-c031b79c-7421-470f-91e5-c5cf0925aaa4",
          "type": "conflict",
          "createdAt": "2026-08-06T06:14:38.468Z"
        }
      ],
      "groups": [
        {
          "id": "group-e7233a27-ff9a-4d1d-80d3-eed9cfb52561",
          "type": "normal",
          "markerIds": [
            "constraint-8d1211ab-8796-495d-8585-168711c868d6",
            "constraint-81f0f266-11d3-4d88-af1c-d03344149293"
          ],
          "createdAt": "2026-07-25T15:56:47.375Z"
        },
        {
          "id": "group-09d395f9-a72a-4398-9d65-79e0a07ef2d0",
          "type": "normal",
          "markerIds": [
            "constraint-d56b1044-3b47-4715-a84a-25d11cf5fa48",
            "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de"
          ],
          "createdAt": "2026-07-25T15:56:51.887Z"
        },
        {
          "id": "group-e3ab5682-3e00-4a36-88e5-3a40bf6c7d14",
          "type": "normal",
          "markerIds": [
            "constraint-f809c887-1ce6-4092-91b3-071baea5be39",
            "constraint-26907513-206c-4a68-83ab-f97172b2e9a6"
          ],
          "createdAt": "2026-07-26T06:56:11.401Z"
        },
        {
          "id": "group-65e7db39-86b1-4e99-abd8-862220e31c7e",
          "type": "normal",
          "markerIds": [
            "constraint-5bc259e4-b739-4c6e-9c2a-7b3745f0e9e1",
            "constraint-83a3d8f1-453b-4b38-aabe-4c23c4297821"
          ],
          "createdAt": "2026-07-26T06:57:19.077Z"
        },
        {
          "id": "group-6e97eef7-b2da-4770-bc26-112c484592d6",
          "type": "normal",
          "markerIds": [
            "constraint-acdcff94-ff70-446c-a237-91375ad47463",
            "constraint-b5fc4699-06a4-46f7-a05d-10086e052532"
          ],
          "createdAt": "2026-07-26T07:23:08.653Z"
        },
        {
          "id": "group-6cb6647a-a789-41c8-ba94-fd82518fd2ee",
          "type": "normal",
          "markerIds": [
            "constraint-3371d3b1-a318-4c07-86c0-e9dbd30b31d3",
            "constraint-de114359-c53b-416b-b3ae-405ab72b6ea4"
          ],
          "createdAt": "2026-07-26T07:26:37.214Z"
        },
        {
          "id": "group-10823366-bdc5-4ff4-a37c-03018bb9f6a5",
          "type": "gatekeeper",
          "markerIds": [
            "constraint-d997df22-39a5-4b6d-a243-5f4cd00f1f5d",
            "constraint-bb996e82-a3fb-452b-9375-ae6315286b87"
          ],
          "createdAt": "2026-07-26T10:22:32.008Z"
        },
        {
          "id": "group-d0ae0c32-cd8c-4a0e-910e-dc8ffb62d17d",
          "type": "normal",
          "markerIds": [
            "constraint-56f6527a-cd59-4d06-8453-bb8b92e6feb4",
            "constraint-4eb8e789-3c54-474b-906b-492d84e325a1"
          ],
          "createdAt": "2026-07-26T10:29:30.887Z"
        },
        {
          "id": "group-20a5ba92-9a41-4a98-a324-2495918efe74",
          "type": "normal",
          "markerIds": [
            "constraint-9830f340-5aab-451e-9b75-5726018813a3",
            "constraint-484b0e70-0078-4e17-82a2-1bd54068721b"
          ],
          "createdAt": "2026-07-26T10:35:15.704Z"
        },
        {
          "id": "group-470b9153-797c-4b4a-b99d-9768dc879b5a",
          "type": "normal",
          "markerIds": [
            "constraint-069af05b-3595-4c34-b196-9ac364c216c1",
            "constraint-07f55139-50ef-4ad9-8b32-cae5ef602775"
          ],
          "createdAt": "2026-07-26T10:37:31.278Z"
        },
        {
          "id": "group-bcae8ba5-d08a-4ef1-84b9-37ee12ca7feb",
          "type": "normal",
          "markerIds": [
            "constraint-03d66d12-d414-46be-a359-d2962d24793d",
            "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
            "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
            "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb"
          ],
          "createdAt": "2026-07-26T11:04:26.943Z"
        },
        {
          "id": "group-50df0d3f-55ae-409d-bfc0-fb18615b8eef",
          "type": "normal",
          "markerIds": [
            "constraint-5d254c10-f50f-494b-8962-b179e5ad01fd",
            "constraint-1810b8df-62c6-4808-9b10-d420058309e4"
          ],
          "createdAt": "2026-07-26T11:25:31.476Z"
        },
        {
          "id": "group-94f60558-66d3-4f74-bc9a-314062a757f5",
          "type": "normal",
          "markerIds": [
            "constraint-39d4ebf9-c9fb-46ba-9213-be5f213fabea",
            "constraint-fed9df65-4d84-423c-acd1-77baa18661fd"
          ],
          "createdAt": "2026-07-26T11:28:41.557Z"
        },
        {
          "id": "group-45f11026-09ff-4cdf-9daa-2f6379be351e",
          "type": "normal",
          "markerIds": [
            "constraint-1e2cd626-0f53-4b43-a63d-d44f19241c9e",
            "constraint-8cafa6f9-b106-449b-a400-95a38952df32"
          ],
          "createdAt": "2026-07-26T11:42:49.259Z"
        },
        {
          "id": "group-87c844ab-ed02-49f8-a2ba-cdbe39276317",
          "type": "normal",
          "markerIds": [
            "constraint-c67ed6e6-b8e8-4017-9d8b-64c5b6d0b74d",
            "constraint-13385690-ec41-4bee-81bb-7c0cd4838ee5"
          ],
          "createdAt": "2026-08-06T05:07:32.315Z"
        },
        {
          "id": "group-67ed1b29-b718-4d84-b1a6-8fe16f0cffac",
          "type": "normal",
          "markerIds": [
            "constraint-8cafa6f9-b106-449b-a400-95a38952df32",
            "constraint-746d241b-dec0-4cea-9966-b9db3941eed1"
          ],
          "createdAt": "2026-08-06T05:17:22.866Z"
        },
        {
          "id": "group-6948b3b3-cc04-4cd3-ab91-51f131ad1d76",
          "type": "normal",
          "markerIds": [
            "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de",
            "constraint-f7efab9a-f30d-4152-b69c-a795194a0a74"
          ],
          "createdAt": "2026-08-06T06:01:42.945Z"
        },
        {
          "id": "group-ab0ba632-ebb9-4337-bc77-c04fa99e9f4a",
          "type": "normal",
          "markerIds": [
            "constraint-81f0f266-11d3-4d88-af1c-d03344149293",
            "constraint-c031b79c-7421-470f-91e5-c5cf0925aaa4"
          ],
          "createdAt": "2026-08-06T06:14:36.109Z"
        }
      ],
      "relationVisibility": {
        "conflict": true,
        "synergy": true
      },
      "secondPhaseIncluded": true,
      "trayViewAll": false,
      "boardColumns": 25,
      "updatedAt": "2026-08-06T12:14:10.740Z"
    }
  },
  {
    "id": "version-0118a627-cc26-4226-a10f-03dd472ef62e",
    "name": "v1.5",
    "memo": "치유 물질 최대 비율 조정 및 주요 능력치 감소 수치 조정",
    "createdAt": "2026-08-08T13:53:20.229Z",
    "snapshot": {
      "schemaVersion": 1,
      "projectId": "constraint-project-776675a0-07b4-44a9-8381-f7532cda9e82",
      "markers": [
        {
          "id": "constraint-c67ed6e6-b8e8-4017-9d8b-64c5b6d0b74d",
          "category": "조작",
          "label": "적이 주는 피해 +30%",
          "title": "적이 주는 피해 [+N%]",
          "description": "적이 플레이어에게 가하는  피해가 \n[30%] 증가합니다.",
          "tier": 1,
          "x": 0.06,
          "y": 0.5,
          "gridCol": 1,
          "gridRow": 0,
          "layoutOrder": 1,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T13:51:11.953Z",
          "updatedAt": "2026-08-06T05:56:24.922Z"
        },
        {
          "id": "constraint-13385690-ec41-4bee-81bb-7c0cd4838ee5",
          "category": "조작",
          "label": "적이 주는 피해 +80%",
          "title": "적이 주는 피해 [++N%]",
          "description": "적이 플레이어에게 가하는  피해가 \n[80%] 증가합니다.",
          "tier": 2,
          "x": 0.06,
          "y": 0.5,
          "gridCol": 1,
          "gridRow": 0,
          "layoutOrder": 1,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T13:52:44.999Z",
          "updatedAt": "2026-08-06T05:56:38.975Z"
        },
        {
          "id": "constraint-d56b1044-3b47-4715-a84a-25d11cf5fa48",
          "category": "환경",
          "label": "시간제한 -100초",
          "title": "시간제한 -100초",
          "description": "기본 클리어 제한 시간 [600초]에서\n[100초] 감소\n\n제한 시간 [500초(8분 20초)]",
          "tier": 1,
          "x": 0.1,
          "y": 0.5,
          "gridCol": 2,
          "gridRow": 0,
          "layoutOrder": 2,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T13:55:14.297Z",
          "updatedAt": "2026-08-06T06:02:33.878Z"
        },
        {
          "id": "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de",
          "category": "환경",
          "label": "시간제한 -200초",
          "title": "시간제한 -200초",
          "description": "기본 클리어 제한 시간 [600초]에서\n[200초] 감소\n\n제한 시간 [400초(6분 40초)]",
          "tier": 2,
          "x": 0.1,
          "y": 0.5,
          "gridCol": 2,
          "gridRow": 0,
          "layoutOrder": 2,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T13:56:24.842Z",
          "updatedAt": "2026-08-06T06:01:32.182Z"
        },
        {
          "id": "constraint-8d1211ab-8796-495d-8585-168711c868d6",
          "category": "조작",
          "label": "적 생명력 +50%",
          "title": "적 생명력 +50%",
          "description": "적 생명력 [+50%]",
          "tier": 1,
          "x": 0.14,
          "y": 0.5,
          "gridCol": 3,
          "gridRow": 0,
          "layoutOrder": 3,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T14:19:56.168Z",
          "updatedAt": "2026-08-06T06:13:55.218Z"
        },
        {
          "id": "constraint-81f0f266-11d3-4d88-af1c-d03344149293",
          "category": "조작",
          "label": "적 생명력 +100%",
          "title": "적 생명력 [+100%]",
          "description": "적 생명력 [+100%]",
          "tier": 2,
          "x": 0.14,
          "y": 0.5,
          "gridCol": 3,
          "gridRow": 0,
          "layoutOrder": 3,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-25T14:20:13.440Z",
          "updatedAt": "2026-08-06T06:14:14.140Z"
        },
        {
          "id": "constraint-f809c887-1ce6-4092-91b3-071baea5be39",
          "category": "팀",
          "label": "메인 오퍼 받는 피해 +50%",
          "title": "메인 오퍼 받는 피해 +50%",
          "description": "메인 컨트롤 오퍼레이터가 받는 피해 [+50%]",
          "tier": 1,
          "x": 0.22,
          "y": 0.5,
          "gridCol": 5,
          "gridRow": 0,
          "layoutOrder": 5,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T06:55:02.719Z",
          "updatedAt": "2026-08-06T11:54:23.498Z"
        },
        {
          "id": "constraint-26907513-206c-4a68-83ab-f97172b2e9a6",
          "category": "팀",
          "label": "메인 오퍼 받는 피해 +100%",
          "title": "메인 오퍼 받는 피해 +100%",
          "description": "메인 컨트롤 오퍼레이터가 받는 피해 [+100%]",
          "tier": 2,
          "x": 0.22,
          "y": 0.5,
          "gridCol": 5,
          "gridRow": 0,
          "layoutOrder": 5,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T06:55:23.102Z",
          "updatedAt": "2026-08-06T11:54:23.498Z"
        },
        {
          "id": "constraint-5bc259e4-b739-4c6e-9c2a-7b3745f0e9e1",
          "category": "환경",
          "label": "기력 회복 속도 -50%",
          "title": "기력 회복 속도 -50%",
          "description": "기력 회복 속도 [-50%]",
          "tier": 1,
          "x": 0.26,
          "y": 0.5,
          "gridCol": 6,
          "gridRow": 0,
          "layoutOrder": 6,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T06:56:58.455Z",
          "updatedAt": "2026-08-06T11:54:28.748Z"
        },
        {
          "id": "constraint-83a3d8f1-453b-4b38-aabe-4c23c4297821",
          "category": "환경",
          "label": "회피 불가",
          "title": "회피 불가",
          "description": "메인 오퍼레이터는 회피를 사용할 수 없습니다.\n[기존 달리기는 사용 가능]\n[기존 돌진은 사용 불가]",
          "tier": 3,
          "x": 0.26,
          "y": 0.5,
          "gridCol": 6,
          "gridRow": 0,
          "layoutOrder": 6,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T06:57:11.307Z",
          "updatedAt": "2026-08-06T11:54:28.748Z"
        },
        {
          "id": "constraint-acdcff94-ff70-446c-a237-91375ad47463",
          "category": "환경",
          "label": "치유 물질 생성 감소",
          "title": "치유 물질 생성 감소 1",
          "description": "웨이브 사이에 [치유 물질이 1개씩 총 3개 생성]\n\n치유 물질 1개 당 치유량: [오퍼레이터 최데 체력의 8%]\n\n*제약 미적용 시 웨이브 사이에 [치유물질이 3개씩 총 9개 생성]",
          "tier": 1,
          "x": 0.3,
          "y": 0.5,
          "gridCol": 7,
          "gridRow": 0,
          "layoutOrder": 7,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T07:22:37.530Z",
          "updatedAt": "2026-08-08T13:50:57.766Z"
        },
        {
          "id": "constraint-b5fc4699-06a4-46f7-a05d-10086e052532",
          "category": "환경",
          "label": "치유 물질 생성 제한",
          "title": "치유 물질 생성 제한",
          "description": "웨이브 사이에 치유 물질이 [생성되지 않음]\n\n치유 물질 1개 당 치유량: [오퍼레이터 최데 체력의 8%]",
          "tier": 2,
          "x": 0.3,
          "y": 0.5,
          "gridCol": 7,
          "gridRow": 0,
          "layoutOrder": 7,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T07:23:02.744Z",
          "updatedAt": "2026-08-08T13:50:36.690Z"
        },
        {
          "id": "constraint-3371d3b1-a318-4c07-86c0-e9dbd30b31d3",
          "category": "팀",
          "label": "반복 궁극기 피해 -50%",
          "title": "반복 궁극기 피해 -50%",
          "description": "오퍼레이터가 궁극기를 1회 사용할 때마다, 해당 오퍼레이터가 이후 사용하는 궁극기 피해 [-50%] 감소",
          "tier": 1,
          "x": 0.34,
          "y": 0.5,
          "gridCol": 8,
          "gridRow": 0,
          "layoutOrder": 8,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T07:26:06.017Z",
          "updatedAt": "2026-08-08T13:47:17.414Z"
        },
        {
          "id": "constraint-de114359-c53b-416b-b3ae-405ab72b6ea4",
          "category": "팀",
          "label": "반복 궁극기 피해 -100%",
          "title": "반복 궁극기 피해 -100%",
          "description": "오퍼레이터가 궁극기를 1회 사용할 때마다, 해당 오퍼레이터가 이후 사용하는 궁극기 피해 [-100%] 감소",
          "tier": 2,
          "x": 0.34,
          "y": 0.5,
          "gridCol": 8,
          "gridRow": 0,
          "layoutOrder": 8,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T07:26:24.360Z",
          "updatedAt": "2026-08-08T13:47:18.087Z"
        },
        {
          "id": "constraint-74cde916-7cfa-4230-a96b-e553daec56ff",
          "category": "팀",
          "label": "일반 공격 피해 -70%",
          "title": "일반 공격 피해 감소",
          "description": "오퍼레이터의 일반 공격 피해 [-70%]",
          "tier": 3,
          "x": 0.38,
          "y": 0.5,
          "gridCol": 9,
          "gridRow": 0,
          "layoutOrder": 9,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:09:17.017Z",
          "updatedAt": "2026-08-06T12:01:28.565Z"
        },
        {
          "id": "constraint-9cdb62e8-085b-49a4-86d5-a1d44bf440ac",
          "category": "팀",
          "label": "스킬 게이지 자연회복 중단",
          "title": "스킬 게이지 자연회복 중단",
          "description": "메인 컨트롤 오퍼레이터가 [12초] 내에 강력한 일격 피해를 주지 않으면, 스킬 게이지 자연 회복 중단",
          "tier": 1,
          "x": 0.42,
          "y": 0.5,
          "gridCol": 10,
          "gridRow": 0,
          "layoutOrder": 10,
          "sourceConstraintId": null,
          "isSecondPhase": true,
          "createdAt": "2026-07-26T10:10:46.703Z",
          "updatedAt": "2026-08-06T12:01:46.055Z"
        },
        {
          "id": "constraint-d997df22-39a5-4b6d-a243-5f4cd00f1f5d",
          "category": "환경",
          "label": "연계/배틀 스킬 쿨감/약화",
          "title": "연계/배틀 스킬 쿨감/약화",
          "description": "오퍼레이터 \n연계 스킬 쿨타임 [-60%]\n배틀 스킬 피해 [-60%]",
          "tier": 3,
          "x": 0.46,
          "y": 0.5,
          "gridCol": 11,
          "gridRow": 0,
          "layoutOrder": 11,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:21:01.267Z",
          "updatedAt": "2026-08-06T11:51:05.864Z"
        },
        {
          "id": "constraint-bb996e82-a3fb-452b-9375-ae6315286b87",
          "category": "환경",
          "label": "물리/아츠 강화",
          "title": "물리/아츠 강화",
          "description": "오퍼레이터 일반 공격, 배틀 스킬, 연계 스킬, 궁극기 이외의 피해 [+100%]\n\n배틀 스킬 피해 [-60%]",
          "tier": 3,
          "x": 0.5,
          "y": 0.5,
          "gridCol": 12,
          "gridRow": 0,
          "layoutOrder": 12,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:22:24.947Z",
          "updatedAt": "2026-08-06T11:51:05.864Z"
        },
        {
          "id": "constraint-e8e63da7-85f4-428b-bff8-0361c634a5f9",
          "category": "환경",
          "label": "메인 오퍼레이터 전환 불가",
          "title": "메인 오퍼레이터 전환 불가",
          "description": "전투가 시작된 후 [메인 컨트롤 오퍼레이터 전환 불가]",
          "tier": 2,
          "x": 0.54,
          "y": 0.5,
          "gridCol": 13,
          "gridRow": 0,
          "layoutOrder": 13,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:24:33.442Z",
          "updatedAt": "2026-08-06T12:13:00.824Z"
        },
        {
          "id": "constraint-56f6527a-cd59-4d06-8453-bb8b92e6feb4",
          "category": "조작",
          "label": "적 사망 시 독성 장판 1",
          "title": "적 사망 시 독성 장판 1",
          "description": "처치 당한 적이 독성 물질을 남기고 오퍼레이터가 독성 물질의 범위에 있을 때, [매 초마다 최대 생명력의 2%] 피해를 입음",
          "tier": 1,
          "x": 0.58,
          "y": 0.5,
          "gridCol": 14,
          "gridRow": 0,
          "layoutOrder": 14,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:28:50.511Z",
          "updatedAt": "2026-08-06T12:13:59.138Z"
        },
        {
          "id": "constraint-4eb8e789-3c54-474b-906b-492d84e325a1",
          "category": "조작",
          "label": "적 사망 시 독성 장판 2",
          "title": "적 사망 시 독성 장판 2",
          "description": "처치 당한 적이 독성 물질을 남기고 오퍼레이터가 독성 물질의 범위에 있을 때, [매 초마다 최대 생명력의 5%] 피해를 입음",
          "tier": 2,
          "x": 0.58,
          "y": 0.5,
          "gridCol": 14,
          "gridRow": 0,
          "layoutOrder": 14,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:29:00.992Z",
          "updatedAt": "2026-08-06T12:14:10.734Z"
        },
        {
          "id": "constraint-9830f340-5aab-451e-9b75-5726018813a3",
          "category": "팀",
          "label": "배틀 스킬 횟수 제한: 냉기 1",
          "title": "배틀 스킬 횟수 제한: 냉기 1",
          "description": "오퍼레이터가 [배틀 스킬]을  [2회] 사용할 때마다 메인 컨트롤 오퍼레이터에게 [냉기 부착 1스택] 부여 \n\n* 각 오퍼레이터 당 발동 가능 쿨타임 [3초]",
          "tier": 1,
          "x": 0.62,
          "y": 0.5,
          "gridCol": 15,
          "gridRow": 0,
          "layoutOrder": 15,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:34:11.770Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-484b0e70-0078-4e17-82a2-1bd54068721b",
          "category": "팀",
          "label": "배틀 스킬 횟수 제한: 냉기 2",
          "title": "배틀 스킬 횟수 제한: 냉기 2",
          "description": "오퍼레이터가 [배틀 스킬]을  [1회] 사용할 때마다 메인 컨트롤 오퍼레이터에게 [냉기 부착 1스택] 부여 \n\n* 각 오퍼레이터 당 발동 가능 쿨타임 [3초]",
          "tier": 2,
          "x": 0.62,
          "y": 0.5,
          "gridCol": 15,
          "gridRow": 0,
          "layoutOrder": 15,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:34:37.321Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-069af05b-3595-4c34-b196-9ac364c216c1",
          "category": "팀",
          "label": "연계 스킬 횟수 제한: 냉기 1",
          "title": "연계 스킬 횟수 제한: 냉기 1",
          "description": "오퍼레이터가 연계 스킬을 2회 사용할 때마다 메인 컨트롤 오퍼레이터에게 [냉기 부착 1스택] 부여\n\n* 각 오퍼레이터당 발동 가능한 쿨타임 [3초]",
          "tier": 1,
          "x": 0.66,
          "y": 0.5,
          "gridCol": 16,
          "gridRow": 0,
          "layoutOrder": 16,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:37:10.982Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-07f55139-50ef-4ad9-8b32-cae5ef602775",
          "category": "팀",
          "label": "연계 스킬 횟수 제한: 냉기 2",
          "title": "연계 스킬 횟수 제한: 냉기 2",
          "description": "오퍼레이터가 연계 스킬을 1회 사용할 때마다 메인 컨트롤 오퍼레이터에게 [냉기 부착 1스택] 부여\n\n* 각 오퍼레이터당 발동 가능한 쿨타임 [3초]",
          "tier": 2,
          "x": 0.66,
          "y": 0.5,
          "gridCol": 16,
          "gridRow": 0,
          "layoutOrder": 16,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T10:37:23.626Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "category": "조작",
          "label": "냉기 공격 피격 시 즉시 동결",
          "title": "냉기 피격 시 즉시 동결",
          "description": "적이 메인 컨트롤 오퍼레이터에게 [냉기]를 적용하면, 공격을 받은 메인 오퍼레이터가 [즉시 동결] 상태가 됩니다.\n\n* 냉기 피해 몬스터 리스트 *\n[수정 아겔로스]\n[탁류 아겔로스]\n[조류 아겔로스] (예외) 해당 제약을 적용하지 않아도 피격 시 오퍼레이터 동결 적용",
          "tier": 2,
          "x": 0.7,
          "y": 0.5,
          "gridCol": 17,
          "gridRow": 0,
          "layoutOrder": 17,
          "sourceConstraintId": null,
          "isSecondPhase": true,
          "createdAt": "2026-07-26T10:43:50.128Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "category": "환경",
          "label": "동결 시간 증가 / 열기속성 해제",
          "title": "동결 시간 증가 / 열기 해제",
          "description": "오퍼레이터가 받는 동결 지속 시간 [15초 증가]\n* 기존 동결 지속 시간 [5초]\n[열기 유형 스킬]을 사용할 경우, [동결 해제] 가능",
          "tier": 1,
          "x": 0.7,
          "y": 0.5,
          "gridCol": 17,
          "gridRow": 0,
          "layoutOrder": 17,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:01:45.737Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "category": "환경",
          "label": "동결 시간 증가 / 자연속성 해제",
          "title": "동결 시간 증가 / 자연 해제",
          "description": "오퍼레이터가 받는 동결 지속 시간 [15초 증가]\n* 기존 동결 지속 시간 [5초]\n[자연 유형 스킬]을 사용할 경우, [동결 해제] 가능",
          "tier": 1,
          "x": 0.74,
          "y": 0.5,
          "gridCol": 18,
          "gridRow": 0,
          "layoutOrder": 18,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:02:13.479Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "category": "환경",
          "label": "동결 시간 증가 / 전기속성 해제",
          "title": "동결 시간 증가 / 전기 해제",
          "description": "오퍼레이터가 받는 동결 지속 시간 [15초 증가]\n* 기존 동결 지속 시간 [5초]\n[전기 유형 스킬]을 사용할 경우, [동결 해제] 가능",
          "tier": 1,
          "x": 0.78,
          "y": 0.5,
          "gridCol": 19,
          "gridRow": 0,
          "layoutOrder": 19,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:02:46.126Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "category": "환경",
          "label": "동결 시간 증가 / 물리속성 해제",
          "title": "동결 시간 증가 / 물리 해제",
          "description": "오퍼레이터가 받는 동결 지속 시간 [15초 증가]\n* 기존 동결 지속 시간 [5초]\n[물리 유형 스킬]을 사용할 경우, [동결 해제] 가능",
          "tier": 1,
          "x": 0.82,
          "y": 0.5,
          "gridCol": 20,
          "gridRow": 0,
          "layoutOrder": 20,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:03:13.810Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-5d254c10-f50f-494b-8962-b179e5ad01fd",
          "category": "조작",
          "label": "적 제어 부여, 적 회복 5%",
          "title": "적 제어 효과 부여 시 회복 1",
          "description": "적이 군중 제어 효과에 걸리면 초당 최대 생명력의 [5%]를 회복합니다.",
          "tier": 1,
          "x": 0.86,
          "y": 0.5,
          "gridCol": 21,
          "gridRow": 0,
          "layoutOrder": 21,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:24:18.235Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-1810b8df-62c6-4808-9b10-d420058309e4",
          "category": "조작",
          "label": "적 제어 부여, 적 회복 15%",
          "title": "적 제어 효과 부여 시 회복 2",
          "description": "적이 군중 제어 효과에 걸리면 초당 최대 생명력의 [15%]를 회복합니다.",
          "tier": 2,
          "x": 0.86,
          "y": 0.5,
          "gridCol": 21,
          "gridRow": 0,
          "layoutOrder": 21,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:24:28.391Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-39d4ebf9-c9fb-46ba-9213-be5f213fabea",
          "category": "환경",
          "label": "4 웨이브 적 개체 강화",
          "title": "적 개체 강화 1",
          "description": "[최종(4) 웨이브]의 쌍뿔 아겔로스, 삼미 아겔로스가 \n[알파(α) 개체]로 변경\n\n* 알파(α) 개체 : 체력 [50%] 증가",
          "tier": 2,
          "x": 0.9,
          "y": 0.5,
          "gridCol": 22,
          "gridRow": 0,
          "layoutOrder": 22,
          "sourceConstraintId": null,
          "isSecondPhase": true,
          "createdAt": "2026-07-26T11:27:23.047Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-fed9df65-4d84-423c-acd1-77baa18661fd",
          "category": "환경",
          "label": "3, 4 웨이브 적 개체 강화",
          "title": "적 개체 강화 2",
          "description": "[웨이브(3), 최종(4) 웨이브]의 쌍뿔 아겔로스, 삼미 아겔로스가 \n[알파(α) 개체]로 변경\n\n* 알파(α) 개체 : 체력 [50%] 증가",
          "tier": 3,
          "x": 0.9,
          "y": 0.5,
          "gridCol": 22,
          "gridRow": 0,
          "layoutOrder": 22,
          "sourceConstraintId": null,
          "isSecondPhase": true,
          "createdAt": "2026-07-26T11:28:31.349Z",
          "updatedAt": "2026-08-06T11:50:55.372Z"
        },
        {
          "id": "constraint-1e2cd626-0f53-4b43-a63d-d44f19241c9e",
          "category": "팀",
          "label": "오퍼레이터 주요 능력치 -10%",
          "title": "오퍼레이터 주요 능력치 감소 1",
          "description": "오퍼레이터 주요 능력치 [-10%]",
          "tier": 1,
          "x": 0.02,
          "y": 0.5,
          "gridCol": 0,
          "gridRow": 0,
          "layoutOrder": 0,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:42:13.150Z",
          "updatedAt": "2026-08-06T05:05:22.735Z"
        },
        {
          "id": "constraint-8cafa6f9-b106-449b-a400-95a38952df32",
          "category": "팀",
          "label": "오퍼레이터 주요 능력치 -20%",
          "title": "오퍼레이터 주요 능력치 감소 2",
          "description": "오퍼레이터 주요 능력치 [-20%]",
          "tier": 2,
          "x": 0.02,
          "y": 0.5,
          "gridCol": 0,
          "gridRow": 0,
          "layoutOrder": 0,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-07-26T11:42:27.156Z",
          "updatedAt": "2026-08-08T13:47:07.828Z"
        },
        {
          "id": "constraint-746d241b-dec0-4cea-9966-b9db3941eed1",
          "category": "팀",
          "label": "오퍼레이터 주요 능력치 -40%",
          "title": "오퍼레이터 주요 능력치 감소 3",
          "description": "오퍼레이터 주요 능력치 [-40%]",
          "tier": 3,
          "x": 0.02,
          "y": 0.5,
          "gridCol": 0,
          "gridRow": 0,
          "layoutOrder": 0,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T05:06:12.981Z",
          "updatedAt": "2026-08-06T05:06:14.614Z"
        },
        {
          "id": "constraint-b6cae3b0-53a6-42bb-956f-7736795848eb",
          "category": "조작",
          "label": "상태 단계당 대응 피해 -10%",
          "title": "방어 불능/아츠 부착 단계당 대응 피해 감소",
          "description": "[적에게 부착된 방어불능 또는 아츠부착 1단계]마다 해당 적이 받는 [부착 스택과 대응되는 데미지 -10%]\n(해당 버프는 부착 지속시간 종료 0.1초후에 소멸)",
          "tier": 1,
          "x": 0.54,
          "y": 0.5,
          "gridCol": 13,
          "gridRow": 0,
          "layoutOrder": 13,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T05:46:17.704Z",
          "updatedAt": "2026-08-06T12:12:52.547Z"
        },
        {
          "id": "constraint-f7efab9a-f30d-4152-b69c-a795194a0a74",
          "category": "환경",
          "label": "시간제한 -300초",
          "title": "시간제한 -300초",
          "description": "기본 클리어 제한 시간 [600초]에서\n[300초] 감소\n\n제한 시간 [300초(5분)]",
          "tier": 3,
          "x": 0.1,
          "y": 0.5,
          "gridCol": 2,
          "gridRow": 0,
          "layoutOrder": 2,
          "sourceConstraintId": null,
          "isSecondPhase": true,
          "createdAt": "2026-08-06T06:00:48.210Z",
          "updatedAt": "2026-08-06T06:49:08.305Z"
        },
        {
          "id": "constraint-c031b79c-7421-470f-91e5-c5cf0925aaa4",
          "category": "조작",
          "label": "적 생명력 +200%",
          "title": "적 생명력 +200%",
          "description": "적 생명력 [+200%]",
          "tier": 3,
          "x": 0.14,
          "y": 0.5,
          "gridCol": 3,
          "gridRow": 0,
          "layoutOrder": 3,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T06:14:30.850Z",
          "updatedAt": "2026-08-06T06:14:33.201Z"
        },
        {
          "id": "constraint-a802c62b-469e-4d98-a7e1-d7825cb9f698",
          "category": "팀",
          "label": "물리/아츠 부착 시 피해 감소 1",
          "title": "물리/아츠 부착 시 피해 감소 1",
          "description": "오퍼레이터가 적의 방어불능 또는 아츠부착 스택 수치를 증가시키면, 해당 오퍼레이터가 주는 해당 유형의 피해 [-45%] [10초간 지속]",
          "tier": 1,
          "x": 0.18,
          "y": 0.5,
          "gridCol": 4,
          "gridRow": 0,
          "layoutOrder": 4,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T11:52:55.717Z",
          "updatedAt": "2026-08-06T11:54:06.958Z"
        },
        {
          "id": "constraint-66a6f9ed-3768-4f1a-8380-832e8faaaa13",
          "category": "팀",
          "label": "물리/아츠 부착 시 피해 감소 2",
          "title": "물리/아츠 부착 시 피해 감소 2",
          "description": "오퍼레이터가 적의 방어불능 또는 아츠부착 스택 수치를 증가시키면, 해당 오퍼레이터가 주는 해당 유형의 피해 [-90%] [10초간 지속]",
          "tier": 2,
          "x": 0.18,
          "y": 0.5,
          "gridCol": 4,
          "gridRow": 0,
          "layoutOrder": 4,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T11:53:21.965Z",
          "updatedAt": "2026-08-06T11:54:02.399Z"
        },
        {
          "id": "constraint-0f3f7b1b-a04e-41e2-8d16-b15364c7ce8a",
          "category": "조작",
          "label": "적에게 가하는 순간 딜량 제한",
          "title": "적에게 가하는 순간 딜량 제한",
          "description": "적 이동속도 [+100%], [0.1초 내]에 받는 피해는 [최대 생명력의 25%]를 초과하지 않음",
          "tier": 2,
          "x": 0.38,
          "y": 0.5,
          "gridCol": 9,
          "gridRow": 0,
          "layoutOrder": 9,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T12:05:06.108Z",
          "updatedAt": "2026-08-06T12:05:08.906Z"
        },
        {
          "id": "constraint-8a1a1ce9-b829-49be-9128-514a2529b163",
          "category": "조작",
          "label": "물리/아츠 부착 1회만 허용",
          "title": "물리/아츠 부착 1회만 허용",
          "description": "각 적은 5초마다 [방어불능 또는 같은 유형의 아츠부착을 1회만] 부여받을 수 있음",
          "tier": 1,
          "x": 0.38,
          "y": 0.5,
          "gridCol": 9,
          "gridRow": 0,
          "layoutOrder": 9,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T12:07:18.692Z",
          "updatedAt": "2026-08-06T12:07:21.589Z"
        },
        {
          "id": "constraint-e8293d23-9266-4f56-9f36-dec13fa9e1e6",
          "category": "환경",
          "label": "오퍼 회복/보호막 획득시 적 회복",
          "title": "오퍼 회복/보호막 획득시 적 회복",
          "description": "메인 컨트롤 오퍼레이터가 [최대 HP의 10% 이상으로 회복]하거나 [20% 이상에 해당하는 보호막]을 얻을 때, 전장의 [모든 적도 최대 HP의 8%를 회복]한다",
          "tier": 2,
          "x": 0.42,
          "y": 0.5,
          "gridCol": 10,
          "gridRow": 0,
          "layoutOrder": 10,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T12:09:02.056Z",
          "updatedAt": "2026-08-06T12:09:33.560Z"
        },
        {
          "id": "constraint-369d3bea-8338-4f34-9d2c-b29f35bfd76c",
          "category": "팀",
          "label": "오퍼가 받은 피해 일부 HP 감소",
          "title": "오퍼가 받은 피해 일부 HP 감소",
          "description": "오퍼레이터가 받은 데미지의 일부 수치만큼 최대 생명력 감소\n근거리오퍼:[30%]\n원거리오퍼:[50%]",
          "tier": 3,
          "x": 0.42,
          "y": 0.5,
          "gridCol": 10,
          "gridRow": 0,
          "layoutOrder": 10,
          "sourceConstraintId": null,
          "isSecondPhase": false,
          "createdAt": "2026-08-06T12:12:08.676Z",
          "updatedAt": "2026-08-06T12:12:10.252Z"
        }
      ],
      "relations": [
        {
          "id": "relation-2658715b-e109-4fdd-8c06-705ac855d24c",
          "a": "constraint-8d1211ab-8796-495d-8585-168711c868d6",
          "b": "constraint-81f0f266-11d3-4d88-af1c-d03344149293",
          "type": "conflict",
          "createdAt": "2026-07-26T05:34:27.774Z"
        },
        {
          "id": "relation-1d69be79-43cf-4b8e-b2a4-88349efb4b59",
          "a": "constraint-f809c887-1ce6-4092-91b3-071baea5be39",
          "b": "constraint-26907513-206c-4a68-83ab-f97172b2e9a6",
          "type": "conflict",
          "createdAt": "2026-07-26T06:55:39.480Z"
        },
        {
          "id": "relation-97d8d95e-b7da-4db5-b1af-23f1ff54bcd8",
          "a": "constraint-5bc259e4-b739-4c6e-9c2a-7b3745f0e9e1",
          "b": "constraint-83a3d8f1-453b-4b38-aabe-4c23c4297821",
          "type": "conflict",
          "createdAt": "2026-07-26T06:57:25.022Z"
        },
        {
          "id": "relation-3aba1ca3-5194-4934-8cda-a63746a278c7",
          "a": "constraint-d56b1044-3b47-4715-a84a-25d11cf5fa48",
          "b": "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de",
          "type": "conflict",
          "createdAt": "2026-07-26T06:58:23.942Z"
        },
        {
          "id": "relation-0659119c-bf4f-44d5-b48f-333b8dc5dc75",
          "a": "constraint-acdcff94-ff70-446c-a237-91375ad47463",
          "b": "constraint-b5fc4699-06a4-46f7-a05d-10086e052532",
          "type": "conflict",
          "createdAt": "2026-07-26T07:23:11.766Z"
        },
        {
          "id": "relation-55fa8052-095b-4bdc-b2d6-d1a0fe9e60d6",
          "a": "constraint-3371d3b1-a318-4c07-86c0-e9dbd30b31d3",
          "b": "constraint-de114359-c53b-416b-b3ae-405ab72b6ea4",
          "type": "conflict",
          "createdAt": "2026-07-26T07:26:39.919Z"
        },
        {
          "id": "relation-4d484aa6-30f5-4eb6-93aa-0aa7f175333a",
          "a": "constraint-bb996e82-a3fb-452b-9375-ae6315286b87",
          "b": "constraint-d997df22-39a5-4b6d-a243-5f4cd00f1f5d",
          "type": "conflict",
          "createdAt": "2026-07-26T10:22:53.495Z"
        },
        {
          "id": "relation-12734b1a-9f4e-4f4d-8c06-7d824f9782c6",
          "a": "constraint-56f6527a-cd59-4d06-8453-bb8b92e6feb4",
          "b": "constraint-4eb8e789-3c54-474b-906b-492d84e325a1",
          "type": "conflict",
          "createdAt": "2026-07-26T10:35:18.612Z"
        },
        {
          "id": "relation-e58ceafd-3d24-4870-b4eb-25770edfffef",
          "a": "constraint-9830f340-5aab-451e-9b75-5726018813a3",
          "b": "constraint-484b0e70-0078-4e17-82a2-1bd54068721b",
          "type": "conflict",
          "createdAt": "2026-07-26T10:35:20.258Z"
        },
        {
          "id": "relation-d1b2fbe4-2346-4b18-b9fc-c91e7c32dcd2",
          "a": "constraint-069af05b-3595-4c34-b196-9ac364c216c1",
          "b": "constraint-07f55139-50ef-4ad9-8b32-cae5ef602775",
          "type": "conflict",
          "createdAt": "2026-07-26T10:37:33.628Z"
        },
        {
          "id": "relation-76a78f94-0057-4a0b-b3b9-540273d1f57b",
          "a": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "b": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:34.933Z"
        },
        {
          "id": "relation-ef7a7237-e7ac-4625-8da5-005e463f1fe8",
          "a": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "b": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:38.105Z"
        },
        {
          "id": "relation-38728469-282a-4666-9bbc-fa2055dd9402",
          "a": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "b": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:40.117Z"
        },
        {
          "id": "relation-2be1bfba-035c-4b90-a2e2-b21ddb59fc44",
          "a": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "b": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:44.510Z"
        },
        {
          "id": "relation-199557b0-7fa4-47b4-9fd4-90e737c7d9a9",
          "a": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "b": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:46.285Z"
        },
        {
          "id": "relation-ed160eaf-fbc9-47ee-92ff-0c1b19cf094b",
          "a": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "b": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "type": "conflict",
          "createdAt": "2026-07-26T11:04:49.224Z"
        },
        {
          "id": "relation-74a44660-50da-48d4-bbe7-7c07de21477e",
          "a": "constraint-484b0e70-0078-4e17-82a2-1bd54068721b",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:32.823Z"
        },
        {
          "id": "relation-34052c4c-3763-4449-a0ee-582728b922c8",
          "a": "constraint-07f55139-50ef-4ad9-8b32-cae5ef602775",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:34.678Z"
        },
        {
          "id": "relation-920dad56-63ae-41fb-8030-49f658362020",
          "a": "constraint-9830f340-5aab-451e-9b75-5726018813a3",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:40.055Z"
        },
        {
          "id": "relation-f4ed9d78-e771-4076-bf90-82e07ee85fee",
          "a": "constraint-069af05b-3595-4c34-b196-9ac364c216c1",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:41.468Z"
        },
        {
          "id": "relation-19e37070-a3a2-488b-8a51-1ab0a8851213",
          "a": "constraint-03d66d12-d414-46be-a359-d2962d24793d",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:43.884Z"
        },
        {
          "id": "relation-681d4e50-9a68-4029-9396-9f35303de699",
          "a": "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:45.213Z"
        },
        {
          "id": "relation-817b4c09-2545-4500-a053-7843145d6eb1",
          "a": "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:46.493Z"
        },
        {
          "id": "relation-eeecdaa8-f387-44c3-bc3b-67560a7036f6",
          "a": "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb",
          "b": "constraint-30a8aff2-fe1e-4612-b56f-4b9671a9b37d",
          "type": "synergy",
          "createdAt": "2026-07-26T11:22:48.033Z"
        },
        {
          "id": "relation-1f459b3b-877a-4919-9728-d08fa5c5f286",
          "a": "constraint-39d4ebf9-c9fb-46ba-9213-be5f213fabea",
          "b": "constraint-fed9df65-4d84-423c-acd1-77baa18661fd",
          "type": "conflict",
          "createdAt": "2026-07-26T11:28:44.230Z"
        },
        {
          "id": "relation-3d50a21b-2022-4773-9249-74ed1c19b220",
          "a": "constraint-5d254c10-f50f-494b-8962-b179e5ad01fd",
          "b": "constraint-1810b8df-62c6-4808-9b10-d420058309e4",
          "type": "conflict",
          "createdAt": "2026-07-26T11:29:22.901Z"
        },
        {
          "id": "relation-c375de84-491d-4d7e-b7f3-fa921aeeda73",
          "a": "constraint-1e2cd626-0f53-4b43-a63d-d44f19241c9e",
          "b": "constraint-8cafa6f9-b106-449b-a400-95a38952df32",
          "type": "conflict",
          "createdAt": "2026-07-26T11:42:51.941Z"
        },
        {
          "id": "relation-f579a1ee-14f1-4742-9ea4-a2aa7045e031",
          "a": "constraint-8cafa6f9-b106-449b-a400-95a38952df32",
          "b": "constraint-746d241b-dec0-4cea-9966-b9db3941eed1",
          "type": "conflict",
          "createdAt": "2026-08-06T05:07:12.767Z"
        },
        {
          "id": "relation-2af751b1-7935-4dff-bada-0a64c78ee277",
          "a": "constraint-c67ed6e6-b8e8-4017-9d8b-64c5b6d0b74d",
          "b": "constraint-13385690-ec41-4bee-81bb-7c0cd4838ee5",
          "type": "conflict",
          "createdAt": "2026-08-06T05:07:38.629Z"
        },
        {
          "id": "relation-cd5633ff-b8a7-4628-801d-a02edeaf9dff",
          "a": "constraint-f7efab9a-f30d-4152-b69c-a795194a0a74",
          "b": "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de",
          "type": "conflict",
          "createdAt": "2026-08-06T06:01:45.820Z"
        },
        {
          "id": "relation-a11865bf-b329-4c6f-b08d-b581edb65800",
          "a": "constraint-81f0f266-11d3-4d88-af1c-d03344149293",
          "b": "constraint-c031b79c-7421-470f-91e5-c5cf0925aaa4",
          "type": "conflict",
          "createdAt": "2026-08-06T06:14:38.468Z"
        }
      ],
      "groups": [
        {
          "id": "group-e7233a27-ff9a-4d1d-80d3-eed9cfb52561",
          "type": "normal",
          "markerIds": [
            "constraint-8d1211ab-8796-495d-8585-168711c868d6",
            "constraint-81f0f266-11d3-4d88-af1c-d03344149293"
          ],
          "createdAt": "2026-07-25T15:56:47.375Z"
        },
        {
          "id": "group-09d395f9-a72a-4398-9d65-79e0a07ef2d0",
          "type": "normal",
          "markerIds": [
            "constraint-d56b1044-3b47-4715-a84a-25d11cf5fa48",
            "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de"
          ],
          "createdAt": "2026-07-25T15:56:51.887Z"
        },
        {
          "id": "group-e3ab5682-3e00-4a36-88e5-3a40bf6c7d14",
          "type": "normal",
          "markerIds": [
            "constraint-f809c887-1ce6-4092-91b3-071baea5be39",
            "constraint-26907513-206c-4a68-83ab-f97172b2e9a6"
          ],
          "createdAt": "2026-07-26T06:56:11.401Z"
        },
        {
          "id": "group-65e7db39-86b1-4e99-abd8-862220e31c7e",
          "type": "normal",
          "markerIds": [
            "constraint-5bc259e4-b739-4c6e-9c2a-7b3745f0e9e1",
            "constraint-83a3d8f1-453b-4b38-aabe-4c23c4297821"
          ],
          "createdAt": "2026-07-26T06:57:19.077Z"
        },
        {
          "id": "group-6e97eef7-b2da-4770-bc26-112c484592d6",
          "type": "normal",
          "markerIds": [
            "constraint-acdcff94-ff70-446c-a237-91375ad47463",
            "constraint-b5fc4699-06a4-46f7-a05d-10086e052532"
          ],
          "createdAt": "2026-07-26T07:23:08.653Z"
        },
        {
          "id": "group-6cb6647a-a789-41c8-ba94-fd82518fd2ee",
          "type": "normal",
          "markerIds": [
            "constraint-3371d3b1-a318-4c07-86c0-e9dbd30b31d3",
            "constraint-de114359-c53b-416b-b3ae-405ab72b6ea4"
          ],
          "createdAt": "2026-07-26T07:26:37.214Z"
        },
        {
          "id": "group-10823366-bdc5-4ff4-a37c-03018bb9f6a5",
          "type": "gatekeeper",
          "markerIds": [
            "constraint-d997df22-39a5-4b6d-a243-5f4cd00f1f5d",
            "constraint-bb996e82-a3fb-452b-9375-ae6315286b87"
          ],
          "createdAt": "2026-07-26T10:22:32.008Z"
        },
        {
          "id": "group-d0ae0c32-cd8c-4a0e-910e-dc8ffb62d17d",
          "type": "normal",
          "markerIds": [
            "constraint-56f6527a-cd59-4d06-8453-bb8b92e6feb4",
            "constraint-4eb8e789-3c54-474b-906b-492d84e325a1"
          ],
          "createdAt": "2026-07-26T10:29:30.887Z"
        },
        {
          "id": "group-20a5ba92-9a41-4a98-a324-2495918efe74",
          "type": "normal",
          "markerIds": [
            "constraint-9830f340-5aab-451e-9b75-5726018813a3",
            "constraint-484b0e70-0078-4e17-82a2-1bd54068721b"
          ],
          "createdAt": "2026-07-26T10:35:15.704Z"
        },
        {
          "id": "group-470b9153-797c-4b4a-b99d-9768dc879b5a",
          "type": "normal",
          "markerIds": [
            "constraint-069af05b-3595-4c34-b196-9ac364c216c1",
            "constraint-07f55139-50ef-4ad9-8b32-cae5ef602775"
          ],
          "createdAt": "2026-07-26T10:37:31.278Z"
        },
        {
          "id": "group-bcae8ba5-d08a-4ef1-84b9-37ee12ca7feb",
          "type": "normal",
          "markerIds": [
            "constraint-03d66d12-d414-46be-a359-d2962d24793d",
            "constraint-e25bc7a3-c0c2-46f3-bf72-7b7b6c9f2806",
            "constraint-2ce0863e-2610-4bca-9dac-8089d0fa240c",
            "constraint-d6e154be-5e74-4fc3-9216-8ff72ad0effb"
          ],
          "createdAt": "2026-07-26T11:04:26.943Z"
        },
        {
          "id": "group-50df0d3f-55ae-409d-bfc0-fb18615b8eef",
          "type": "normal",
          "markerIds": [
            "constraint-5d254c10-f50f-494b-8962-b179e5ad01fd",
            "constraint-1810b8df-62c6-4808-9b10-d420058309e4"
          ],
          "createdAt": "2026-07-26T11:25:31.476Z"
        },
        {
          "id": "group-94f60558-66d3-4f74-bc9a-314062a757f5",
          "type": "normal",
          "markerIds": [
            "constraint-39d4ebf9-c9fb-46ba-9213-be5f213fabea",
            "constraint-fed9df65-4d84-423c-acd1-77baa18661fd"
          ],
          "createdAt": "2026-07-26T11:28:41.557Z"
        },
        {
          "id": "group-45f11026-09ff-4cdf-9daa-2f6379be351e",
          "type": "normal",
          "markerIds": [
            "constraint-1e2cd626-0f53-4b43-a63d-d44f19241c9e",
            "constraint-8cafa6f9-b106-449b-a400-95a38952df32"
          ],
          "createdAt": "2026-07-26T11:42:49.259Z"
        },
        {
          "id": "group-87c844ab-ed02-49f8-a2ba-cdbe39276317",
          "type": "normal",
          "markerIds": [
            "constraint-c67ed6e6-b8e8-4017-9d8b-64c5b6d0b74d",
            "constraint-13385690-ec41-4bee-81bb-7c0cd4838ee5"
          ],
          "createdAt": "2026-08-06T05:07:32.315Z"
        },
        {
          "id": "group-67ed1b29-b718-4d84-b1a6-8fe16f0cffac",
          "type": "normal",
          "markerIds": [
            "constraint-8cafa6f9-b106-449b-a400-95a38952df32",
            "constraint-746d241b-dec0-4cea-9966-b9db3941eed1"
          ],
          "createdAt": "2026-08-06T05:17:22.866Z"
        },
        {
          "id": "group-6948b3b3-cc04-4cd3-ab91-51f131ad1d76",
          "type": "normal",
          "markerIds": [
            "constraint-5151d9c4-3151-4e20-be1a-7fb4ee3eb0de",
            "constraint-f7efab9a-f30d-4152-b69c-a795194a0a74"
          ],
          "createdAt": "2026-08-06T06:01:42.945Z"
        },
        {
          "id": "group-ab0ba632-ebb9-4337-bc77-c04fa99e9f4a",
          "type": "normal",
          "markerIds": [
            "constraint-81f0f266-11d3-4d88-af1c-d03344149293",
            "constraint-c031b79c-7421-470f-91e5-c5cf0925aaa4"
          ],
          "createdAt": "2026-08-06T06:14:36.109Z"
        }
      ],
      "relationVisibility": {
        "conflict": true,
        "synergy": true
      },
      "secondPhaseIncluded": true,
      "trayViewAll": true,
      "boardColumns": 25,
      "updatedAt": "2026-08-08T13:52:19.144Z"
    }
  }
];
