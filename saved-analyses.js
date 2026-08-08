// Bundled party analyses for the deployed GitHub Pages site.
// Generated from exported analysis JSON files.
window.SAVED_PARTY_ANALYSES = [
  {
    "schemaVersion": 1,
    "id": "party-rossi-tangtang-gilberta-perlica",
    "exportedAt": "2026-07-22T08:12:11.982Z",
    "title": "로시 · 탕탕 · 질베르타 · 펠리카 파티 분석",
    "party": [
      {
        "id": "rossi",
        "name": "로시",
        "order": 1
      },
      {
        "id": "tangtang",
        "name": "탕탕",
        "order": 2
      },
      {
        "id": "gilberta",
        "name": "질베르타",
        "order": 3
      },
      {
        "id": "perlica",
        "name": "펠리카",
        "order": 4
      }
    ],
    "summary": {
      "title": "파티 전투 구조 분석",
      "sentence": "띄우기·넘어뜨리기 등으로 방어 불능을 쌓고 배틀 스킬·궁극기 화력을 이어가는 파티입니다.",
      "dominantAction": "battleSkill",
      "actionTotals": {
        "generalAttack": 6,
        "battleSkill": 17,
        "linkSkill": 10,
        "ultimate": 14
      },
      "dependencies": [
        {
          "id": "defenseless",
          "label": "방어 불능",
          "color": "brown",
          "level": "매우 높음",
          "score": 20.5
        },
        {
          "id": "artsInfliction",
          "label": "아츠 부착",
          "color": "cyan",
          "level": "매우 높음",
          "score": 20
        },
        {
          "id": "shock",
          "label": "감전",
          "color": "electric",
          "level": "매우 높음",
          "score": 10.5
        },
        {
          "id": "natureInfliction",
          "label": "자연 부착",
          "color": "nature",
          "level": "높음",
          "score": 9.5
        },
        {
          "id": "battleSkill",
          "label": "배틀 스킬",
          "color": "blue",
          "level": "주력 행동",
          "score": 17
        }
      ]
    },
    "diagram": {
      "nodes": [
        {
          "order": 1,
          "character": {
            "id": "rossi",
            "name": "로시"
          },
          "skill": {
            "name": "그림자가 타오르는 순간",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "두 상태 준비"
        },
        {
          "order": 2,
          "character": {
            "id": "gilberta",
            "name": "질베르타"
          },
          "skill": {
            "name": "아케인 스태프 · 매트릭스 이동",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "아츠 이상 준비"
        },
        {
          "order": 3,
          "character": {
            "id": "tangtang",
            "name": "탕탕"
          },
          "skill": {
            "name": "야, 강물! 도와줘!",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "와류 생성"
        },
        {
          "order": 4,
          "character": {
            "id": "tangtang",
            "name": "탕탕"
          },
          "skill": {
            "name": "우당탕탕 파도!",
            "type": "배틀 스킬",
            "typeId": "battleSkill",
            "index": 1
          },
          "title": "용오름 전환"
        },
        {
          "order": 5,
          "character": {
            "id": "gilberta",
            "name": "질베르타"
          },
          "skill": {
            "name": "아케인 스태프 · 중력장",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "질베르타의 궁극기 전개"
        },
        {
          "order": 6,
          "character": {
            "id": "tangtang",
            "name": "탕탕"
          },
          "skill": {
            "name": "대당가께서 지켜보고 계신다!",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "궁극기 조기 폭발"
        }
      ],
      "connections": [
        {
          "fromOrder": 1,
          "toOrder": 2,
          "label": "다음 조건 연결",
          "preparationRoutes": [
            {
              "character": {
                "id": "perlica",
                "name": "펠리카"
              },
              "skill": {
                "name": "실시간 프로토콜 · 연쇄 섬광",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                },
                {
                  "id": "artsAbnormality",
                  "label": "아츠 이상"
                }
              ],
              "summary": "메인 컨트롤 오퍼레이터가 적에게 강력한 일격 피해를 준 다음 사용할 수 있습니다. 누적된 전기 에너지를 방출해 목표를 강타하며 전기 피해를 주고, 5초 동안 짧은 강제 감전 상태를 부여합니다."
            }
          ]
        },
        {
          "fromOrder": 2,
          "toOrder": 3,
          "label": "다음 조건 연결",
          "preparationRoutes": [
            {
              "character": {
                "id": "tangtang",
                "name": "탕탕"
              },
              "skill": {
                "name": "우당탕탕 파도!",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "frostInfliction",
                  "label": "냉기 부착"
                }
              ],
              "summary": "용오름은 범위 내의 적에게 냉기 부착 1스택을 부여하고 지속적으로 냉기 피해를 줍니다. 와류를 소모해 생성한 용오름의 개수에 따라 스킬 게이지를 반환하며, 와류마다 20포인트를 반환합니다."
            }
          ]
        },
        {
          "fromOrder": 3,
          "toOrder": 4,
          "label": "다음 조건 연결",
          "preparationRoutes": []
        },
        {
          "fromOrder": 4,
          "toOrder": 5,
          "label": "스킬 게이지 재투자",
          "preparationRoutes": []
        },
        {
          "fromOrder": 5,
          "toOrder": 6,
          "label": "다음 조건 연결",
          "preparationRoutes": []
        }
      ]
    },
    "combatFlow": [
      {
        "order": 1,
        "character": {
          "id": "rossi",
          "name": "로시"
        },
        "stageIds": [
          "setup",
          "trigger"
        ],
        "title": "두 상태 준비",
        "detail": "목표에게 방어 불능과 아츠 부착을 동시에 만들어 로시의 연계 스킬의 조건을 준비한다.",
        "skill": {
          "name": "그림자가 타오르는 순간",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "적이 동시에 방어 불능과 아츠 부착 상태일 때 발동할 수 있으며 연속으로 2회 사용할 수 있습니다.",
          "두 번째 공격은 목표의 아츠 부착을 모두 소모한 뒤 소모한 스택에 따른 물리 피해와 띄우기 피해를 주고, 15초 동안 자신의 치명타 확률 23%와 치명타 피해 46%를 증가시킵니다."
        ],
        "timing": "",
        "effects": [
          "두 번째 공격을 정확하게 연계하면 추가로 방어 불능 1스택을 쌓습니다."
        ],
        "mechanics": [
          {
            "id": "artsInfliction",
            "label": "아츠 부착"
          },
          {
            "id": "defenseless",
            "label": "방어 불능"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "skill": {
              "name": "아케인 스태프 · 중력장",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "artsInfliction",
                "label": "아츠 부착"
              },
              {
                "id": "defenseless",
                "label": "방어 불능"
              }
            ],
            "summary": "목표가 방어 불능 상태라면 아츠 취약 효과가 방어 불능 스택마다 3% 추가로 증가합니다. 중력 혼란 구역을 생성하여 구역 내의 적에게 즉시 1회의 자연 피해를 주고 자연 부착을 부여합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "skill": {
              "name": "우당탕탕 파도!",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "artsInfliction",
                "label": "아츠 부착"
              }
            ],
            "summary": "와류를 소모해 생성한 용오름의 개수에 따라 스킬 게이지를 반환하며, 와류마다 20포인트를 반환합니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "skill": {
              "name": "아케인 스태프 · 중력 모드",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "artsInfliction",
                "label": "아츠 부착"
              }
            ],
            "summary": "시전이 끝나면 중력 특이점이 폭발하여 범위 내의 적에게 자연 피해를 주고 자연 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "skill": {
              "name": "프로토콜ω · 뇌격",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "artsInfliction",
                "label": "아츠 부착"
              }
            ],
            "summary": "하늘에서 전기 에너지를 떨어뜨려 좁은 범위 내의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "skill": {
              "name": "야, 강물! 도와줘!",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "artsInfliction",
                "label": "아츠 부착"
              }
            ],
            "summary": "적이 냉기 부착을 부여받았거나 아츠 폭발 피해를 받았을 때 사용할 수 있습니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "skill": {
              "name": "아케인 스태프 · 매트릭스 이동",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "defenseless",
                "label": "방어 불능"
              }
            ],
            "summary": "아츠 이상 효과를 부여한 적이 있을 때 사용할 수 있습니다."
          }
        ]
      },
      {
        "order": 2,
        "character": {
          "id": "gilberta",
          "name": "질베르타"
        },
        "stageIds": [
          "setup",
          "trigger",
          "convert"
        ],
        "title": "아츠 이상 준비",
        "detail": "파티가 적에게 연소·감전·동결·부식 중 하나를 부여해 질베르타의 연계 스킬의 발동 조건을 만든다.",
        "skill": {
          "name": "아케인 스태프 · 매트릭스 이동",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "아츠 이상 효과를 부여한 적이 있을 때 사용할 수 있습니다.",
          "아츠 이상 대상"
        ],
        "timing": "",
        "effects": [
          "짧게 시전하여 목표 및 주변의 모든 적을 중력으로 끌어당기고 자연 피해와 강제 띄우기 피해를 줍니다."
        ],
        "mechanics": [
          {
            "id": "artsAbnormality",
            "label": "아츠 이상"
          },
          {
            "id": "combustion",
            "label": "연소"
          },
          {
            "id": "shock",
            "label": "감전"
          },
          {
            "id": "freeze",
            "label": "동결"
          },
          {
            "id": "corrosion",
            "label": "부식"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "skill": {
              "name": "실시간 프로토콜 · 연쇄 섬광",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              },
              {
                "id": "artsAbnormality",
                "label": "아츠 이상"
              }
            ],
            "summary": "메인 컨트롤 오퍼레이터가 적에게 강력한 일격 피해를 준 다음 사용할 수 있습니다. 누적된 전기 에너지를 방출해 목표를 강타하며 전기 피해를 주고, 5초 동안 짧은 강제 감전 상태를 부여합니다."
          }
        ]
      },
      {
        "order": 3,
        "character": {
          "id": "tangtang",
          "name": "탕탕"
        },
        "stageIds": [
          "setup",
          "trigger",
          "convert",
          "recycle"
        ],
        "title": "와류 생성",
        "detail": "냉기 부착 또는 아츠 폭발 피해 조건을 맞춰 탕탕의 연계 스킬을 사용하고 30초 동안 유지되는 와류를 최대 2개까지 준비한다.",
        "skill": {
          "name": "야, 강물! 도와줘!",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "적이 냉기 부착을 부여받았거나 아츠 폭발 피해를 받았을 때 사용할 수 있습니다.",
          "냉기 부착·아츠 폭발 피해 조건"
        ],
        "timing": "",
        "effects": [],
        "mechanics": [
          {
            "id": "frostInfliction",
            "label": "냉기 부착"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "skill": {
              "name": "우당탕탕 파도!",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "용오름은 범위 내의 적에게 냉기 부착 1스택을 부여하고 지속적으로 냉기 피해를 줍니다. 와류를 소모해 생성한 용오름의 개수에 따라 스킬 게이지를 반환하며, 와류마다 20포인트를 반환합니다."
          }
        ]
      },
      {
        "order": 4,
        "character": {
          "id": "tangtang",
          "name": "탕탕"
        },
        "stageIds": [
          "convert",
          "recycle"
        ],
        "title": "용오름 전환",
        "detail": "탕탕의 배틀 스킬로 기본 용오름을 만들고 주변 와류를 모두 소모해 추가 용오름과 와류당 스킬 게이지 20포인트 반환을 얻는다.",
        "skill": {
          "name": "우당탕탕 파도!",
          "type": "배틀 스킬",
          "typeId": "battleSkill",
          "index": 1
        },
        "conditions": [],
        "timing": "",
        "effects": [
          "와류를 소모해 생성한 용오름의 개수에 따라 스킬 게이지를 반환하며, 와류마다 20포인트를 반환합니다.",
          "용오름은 범위 내의 적에게 냉기 부착 1스택을 부여하고 지속적으로 냉기 피해를 줍니다.",
          "여러 개의 용오름이 생성됐다면 적에게 추가로 아츠 취약을 부여하지만 냉기 부착은 중복으로 부여되지 않습니다."
        ],
        "mechanics": [
          {
            "id": "skillGauge",
            "label": "스킬 게이지"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 5,
        "character": {
          "id": "gilberta",
          "name": "질베르타"
        },
        "stageIds": [
          "setup",
          "payoff"
        ],
        "title": "질베르타의 궁극기 전개",
        "detail": "모인 적에게 질베르타의 궁극기를 사용해 자연 부착, 감속 80%, 아츠 취약 30%를 동시에 부여한다.",
        "skill": {
          "name": "아케인 스태프 · 중력장",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [
          "목표가 방어 불능 상태라면 아츠 취약 효과가 방어 불능 스택마다 3% 추가로 증가합니다.",
          "구역 내 목표가 띄우기 상태라면 구역 효과가 끝날 때까지 띄우기 상태를 유지합니다."
        ],
        "timing": "아츠 취약·감속 효과를 먼저 적용한 뒤 로시의 궁극기를 이어갑니다.",
        "effects": [
          "중력 혼란 구역을 생성하여 구역 내의 적에게 즉시 1회의 자연 피해를 주고 자연 부착을 부여합니다.",
          "구역 내 목표에게 감속 80%와 아츠 취약 30%를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "natureInfliction",
            "label": "자연 부착"
          },
          {
            "id": "artsVulnerability",
            "label": "아츠 취약"
          },
          {
            "id": "slow",
            "label": "감속"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 6,
        "character": {
          "id": "tangtang",
          "name": "탕탕"
        },
        "stageIds": [
          "setup",
          "convert",
          "payoff"
        ],
        "title": "궁극기 조기 폭발",
        "detail": "고대의 진으로 적을 묶고, 메인 컨트롤 오퍼레이터의 낙하 공격으로 강화된 파도를 조기에 일으키면서 풍랑의 주재자의 용오름까지 생성한다.",
        "skill": {
          "name": "대당가께서 지켜보고 계신다!",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [],
        "timing": "질베르타의 궁극기로 아츠 취약 효과가 적용된 동안 사용해 주력 피해를 집중합니다.",
        "effects": [
          "메인 컨트롤 오퍼레이터가 고대의 진 내에서 낙하 공격을 사용하면 변화하던 고대의 진이 변화를 중단하고 예정보다 일찍 거대한 파도를 일으킵니다."
        ],
        "mechanics": [
          {
            "id": "mainControl",
            "label": "메인 컨트롤"
          },
          {
            "id": "ultimate",
            "label": "궁극기"
          }
        ],
        "preparationRoutes": []
      }
    ],
    "supportFlow": [
      {
        "order": 1,
        "character": {
          "id": "perlica",
          "name": "펠리카"
        },
        "stageIds": [
          "setup",
          "convert"
        ],
        "title": "강제 감전",
        "detail": "펠리카의 연계 스킬으로 5초 강제 감전을 부여하고, 방어 불능 대상이라면 추가 튕김을 확보한다.",
        "skill": {
          "name": "실시간 프로토콜 · 연쇄 섬광",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "메인 컨트롤 오퍼레이터가 적에게 강력한 일격 피해를 준 다음 사용할 수 있습니다.",
          "강력한 일격 피해 후"
        ],
        "timing": "",
        "effects": [
          "누적된 전기 에너지를 방출해 목표를 강타하며 전기 피해를 주고, 5초 동안 짧은 강제 감전 상태를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "shock",
            "label": "감전"
          },
          {
            "id": "defenseless",
            "label": "방어 불능"
          }
        ],
        "preparationRoutes": []
      }
    ],
    "basicOperation": [
      {
        "order": 1,
        "title": "로시 · 연계 스킬",
        "detail": "목표에게 방어 불능과 아츠 부착을 동시에 만들어 로시의 연계 스킬의 조건을 준비한다."
      },
      {
        "order": 2,
        "title": "질베르타 · 연계 스킬",
        "detail": "파티가 적에게 연소·감전·동결·부식 중 하나를 부여해 질베르타의 연계 스킬의 발동 조건을 만든다."
      },
      {
        "order": 3,
        "title": "탕탕 · 연계 스킬",
        "detail": "냉기 부착 또는 아츠 폭발 피해 조건을 맞춰 탕탕의 연계 스킬을 사용하고 30초 동안 유지되는 와류를 최대 2개까지 준비한다."
      },
      {
        "order": 4,
        "title": "탕탕 · 배틀 스킬",
        "detail": "탕탕의 배틀 스킬로 기본 용오름을 만들고 주변 와류를 모두 소모해 추가 용오름과 와류당 스킬 게이지 20포인트 반환을 얻는다."
      },
      {
        "order": 5,
        "title": "질베르타 · 궁극기",
        "detail": "모인 적에게 질베르타의 궁극기를 사용해 자연 부착, 감속 80%, 아츠 취약 30%를 동시에 부여한다."
      },
      {
        "order": 6,
        "title": "탕탕 · 궁극기",
        "detail": "고대의 진으로 적을 묶고, 메인 컨트롤 오퍼레이터의 낙하 공격으로 강화된 파도를 조기에 일으키면서 풍랑의 주재자의 용오름까지 생성한다."
      }
    ],
    "roles": [
      {
        "character": {
          "id": "rossi",
          "name": "로시"
        },
        "labels": [
          "열기 부착·방어 불능 생성",
          "물리 피해·아츠 부착 소모",
          "전투 자원 순환",
          "메인 컨트롤 후보"
        ],
        "relation": "탕탕의 불균형 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "tangtang",
          "name": "탕탕"
        },
        "labels": [
          "냉기 부착 생성",
          "스킬 게이지·스킬 게이지 반환 소모",
          "아츠 취약 지원",
          "전투 자원 순환"
        ],
        "relation": "로시의 불균형 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "gilberta",
          "name": "질베르타"
        },
        "labels": [
          "자연 부착·방어 불능 생성",
          "연소·감전·동결·부식 활용",
          "아츠 취약 지원",
          "전투 자원 순환"
        ],
        "relation": "로시의 불균형 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "perlica",
          "name": "펠리카"
        },
        "labels": [
          "전기 부착 생성",
          "감전 활용",
          "전투 자원 순환",
          "메인 컨트롤 후보"
        ],
        "relation": "로시의 불균형 조건과 직접 이어집니다."
      }
    ],
    "weaknesses": [
      {
        "title": "예열·상태 준비",
        "entries": [
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "axis": "이중 상태 의존",
            "evidence": "연계 스킬은 목표가 방어 불능과 아츠 부착을 동시에 보유해야 발동합니다.",
            "affected": "그림자가 타오르는 순간",
            "implication": "물리 이상 준비와 아츠 부착을 모두 제공하는 파티가 필요합니다. 어느 한쪽 상태가 소모·정화되거나 면역되면 2연속 연계와 치명타 강화가 시작되지 않습니다."
          },
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "axis": "정확한 2연속 입력",
            "evidence": "연계는 연속 2회 발동하며 두 번째 공격이 정확하게 연계될 때 방어 불능 1스택을 추가합니다.",
            "affected": "그림자가 타오르는 순간",
            "implication": "두 번째 입력 타이밍을 놓치거나 적이 이동·무적 상태가 되면 아츠 부착 소모, 치명타 강화, 추가 스택 중 일부를 잃을 수 있습니다."
          },
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "axis": "물리·열기 혼합 지원",
            "evidence": "일반·연계는 주로 물리 피해, 궁극기와 울프팀의 진주는 열기 피해를 사용합니다.",
            "affected": "붉은색의 그림자 · 그림자가 타오르는 순간 · 기습 날카로운 발톱",
            "implication": "한 속성만 강화하는 파티나 제약 환경에서는 전체 스킬이 같은 지원을 받지 못합니다. 다만 늑대의 발톱은 두 피해 유형을 함께 증가시켜 해당 상태 유지가 중요합니다."
          },
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "axis": "늑대의 발톱 전제",
            "evidence": "늑대의 발톱은 방어 불능 대상에게 배틀 스킬을 써 울프팀의 진주가 명중해야 부여됩니다.",
            "affected": "절흔 · 끓어오르는 피",
            "implication": "방어 불능이 없는 목표에게는 진주가 발동하지 않아 지속 피해와 받는 피해 증가, 치명타 추가 효과가 모두 비활성화됩니다. 목표 전환 때마다 다시 준비해야 합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "와류 준비 시간과 최대 수량",
            "evidence": "야, 강물! 도와줘!로 와류를 한 번에 1개 생성하며 필드에는 최대 2개만 존재하고, 연계 스킬의 쿨타임은 12초입니다.",
            "affected": "야, 강물! 도와줘! · 우당탕탕 파도!",
            "implication": "최대 용오름 전환을 위해서는 연계 스킬을 반복해 와류를 미리 준비해야 합니다. 연계 쿨타임 증가나 생성물 지속 시간 감소 방향의 제약에서 준비 시간이 길어집니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "스킬 게이지 반환의 사전 설치 의존",
            "evidence": "우당탕탕 파도!는 스킬 게이지 100포인트를 소모하고, 스킬 게이지 반환은 주변 와류를 소모해 용오름을 생성할 때 와류마다 20포인트씩 발생합니다.",
            "affected": "우당탕탕 파도! · 야, 강물! 도와줘!",
            "implication": "와류가 없는 상태에서는 배틀 스킬의 게이지 반환을 얻지 못합니다. 기본 최대 2개의 와류를 모두 소모해도 반환량은 40포인트이므로 자연 회복이나 추가 수급이 필요합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "아츠 취약의 다중 용오름 조건",
            "evidence": "아츠 취약은 여러 개의 용오름이 생성될 때만 부여되며, 용오름 3개에서 10%가 명시되어 있습니다.",
            "affected": "우당탕탕 파도! · 풍랑의 주재자",
            "implication": "와류 준비가 끊기면 아츠 취약 지원도 함께 사라집니다. 소환물 수 제한이나 생성물 제거 방향의 제약에서 파티 지원 가치가 크게 낮아집니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "아츠 이상 발동 조건",
            "evidence": "매트릭스 이동은 아츠 이상 효과가 부여된 적이 있어야 사용할 수 있습니다.",
            "affected": "아케인 스태프 · 매트릭스 이동",
            "implication": "질베르타의 기본 스킬만으로는 아츠 이상을 직접 완성하지 못하므로 파티의 부착 조합과 이상 발동 속도에 의존합니다. 상태 부여가 막히거나 늦어지면 광역 집적과 띄우기 기회가 사라집니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "지속 시전과 준비 시간",
            "evidence": "중력 모드는 지속 시전 후 마지막 폭발에서 자연 부착을 부여합니다.",
            "affected": "아케인 스태프 · 중력 모드",
            "implication": "자연 부착과 마지막 타격 치유 조건이 시전 종료에 몰려 있습니다. 적이 범위를 벗어나거나 시전이 끊기면 핵심 후속 효과를 놓칠 수 있어 시전 시간 증가·행동 방해 방향의 제약에 약합니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "다수 대상 치유 조건",
            "evidence": "뒤늦은 편지는 중력 모드의 마지막 공격 또는 매트릭스 이동이 최소 2명의 적에게 명중해야 발동합니다.",
            "affected": "뒤늦은 편지",
            "implication": "단일 보스전이나 적이 흩어진 상황에서는 치유가 발동하지 않습니다. 적을 모으는 스킬과 실제 명중 수를 함께 확보해야 하므로 안정적인 전담 회복 수단으로 보기 어렵습니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "방어 불능 파티 의존",
            "evidence": "중력장의 추가 아츠 취약은 목표의 방어 불능 스택에 따라 증가합니다.",
            "affected": "아케인 스태프 · 중력장 · P2",
            "implication": "기본 아츠 취약은 제공하지만 최대 효율에는 물리 이상과 방어 불능 누적을 담당할 동료가 필요합니다. 방어 불능 축적이 어려운 적이나 물리 이상이 제한되는 전투에서는 강화 폭이 줄어듭니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "궁극기·잠재력 의존",
            "evidence": "강한 감속과 아츠 취약은 궁극기에 집중되어 있고 P2·P3·P5가 취약, 충전, 연계 주기를 크게 강화합니다.",
            "affected": "중력장 · P2 · P3 · P5",
            "implication": "궁극기 에너지 수급이 느려지거나 쿨타임이 늘면 주요 지원 공백이 커집니다. 방어 불능 연동 취약과 연계 회전은 잠재력 단계에 따라 체감 차이가 큽니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "물리 상태와 전기 화력의 조합 의존",
            "evidence": "오블리터레이션 프로토콜은 불균형 대상을 요구하고, 순환 프로토콜의 추가 튕김은 방어 불능 대상을 요구합니다.",
            "affected": "재능 1 · 재능 2",
            "implication": "펠리카의 전기 스킬만으로는 불균형과 방어 불능을 안정적으로 준비하기 어렵습니다. 물리 이상·불균형 지원 캐릭터가 없으면 두 재능의 효율이 제한됩니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "좁은 배틀 스킬 범위",
            "evidence": "프로토콜ω · 뇌격은 좁은 범위 내의 적에게 전기 피해와 전기 부착을 부여합니다.",
            "affected": "프로토콜ω · 뇌격",
            "implication": "적이 넓게 분산된 상황에서는 한 번에 여러 대상에게 전기 부착을 공급하기 어렵습니다. 적 분산과 이동이 많은 전투에서 준비 효율이 낮아집니다."
          }
        ]
      },
      {
        "title": "스킬 게이지·궁극기 순환",
        "entries": [
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "axis": "치명타 의존",
            "evidence": "끓어오르는 피와 궁극기의 강화 효과는 치명타 피해를 줬을 때 발동합니다.",
            "affected": "끓어오르는 피 · 기습 날카로운 발톱",
            "implication": "치명타가 발생하지 않으면 추가 열기 피해·자기 회복·궁극기 강화의 기대값이 낮아집니다. 치명타 확률 감소나 버프 공백에 민감합니다."
          },
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "axis": "궁극기 에너지와 잠재력",
            "evidence": "궁극기는 에너지 110이 필요하고 P2·P4·P5가 치명타 확률, 에너지 비용, 궁극기 피해를 직접 보완합니다.",
            "affected": "기습 날카로운 발톱 · P2 · P4 · P5",
            "implication": "치명타 중심 마무리의 빈도와 안정성이 잠재력에 따라 크게 달라집니다. 에너지 획득 저하 환경에서는 연계 버프 시간 안에 궁극기를 맞추기 어려울 수 있습니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "와류 준비 시간과 최대 수량",
            "evidence": "야, 강물! 도와줘!로 와류를 한 번에 1개 생성하며 필드에는 최대 2개만 존재하고, 연계 스킬의 쿨타임은 12초입니다.",
            "affected": "야, 강물! 도와줘! · 우당탕탕 파도!",
            "implication": "최대 용오름 전환을 위해서는 연계 스킬을 반복해 와류를 미리 준비해야 합니다. 연계 쿨타임 증가나 생성물 지속 시간 감소 방향의 제약에서 준비 시간이 길어집니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "스킬 게이지 반환의 사전 설치 의존",
            "evidence": "우당탕탕 파도!는 스킬 게이지 100포인트를 소모하고, 스킬 게이지 반환은 주변 와류를 소모해 용오름을 생성할 때 와류마다 20포인트씩 발생합니다.",
            "affected": "우당탕탕 파도! · 야, 강물! 도와줘!",
            "implication": "와류가 없는 상태에서는 배틀 스킬의 게이지 반환을 얻지 못합니다. 기본 최대 2개의 와류를 모두 소모해도 반환량은 40포인트이므로 자연 회복이나 추가 수급이 필요합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "잠재력에 따른 순환 효율",
            "evidence": "P1은 연계 쿨타임과 와류당 추가 게이지 반환을 개선하고, P3은 아츠 취약을 강화하며, P5는 궁극기와 궁극기 생성 용오름의 피해를 강화합니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 구조는 완성되어 있지만 와류 회전·아츠 취약 수치·궁극기 폭발력의 상한은 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "다수 대상 치유 조건",
            "evidence": "뒤늦은 편지는 중력 모드의 마지막 공격 또는 매트릭스 이동이 최소 2명의 적에게 명중해야 발동합니다.",
            "affected": "뒤늦은 편지",
            "implication": "단일 보스전이나 적이 흩어진 상황에서는 치유가 발동하지 않습니다. 적을 모으는 스킬과 실제 명중 수를 함께 확보해야 하므로 안정적인 전담 회복 수단으로 보기 어렵습니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "궁극기·잠재력 의존",
            "evidence": "강한 감속과 아츠 취약은 궁극기에 집중되어 있고 P2·P3·P5가 취약, 충전, 연계 주기를 크게 강화합니다.",
            "affected": "중력장 · P2 · P3 · P5",
            "implication": "궁극기 에너지 수급이 느려지거나 쿨타임이 늘면 주요 지원 공백이 커집니다. 방어 불능 연동 취약과 연계 회전은 잠재력 단계에 따라 체감 차이가 큽니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "직접적인 자원 회복 부재",
            "evidence": "제공된 기본 스킬과 재능에는 스킬 게이지 반환이나 궁극기 에너지 직접 획득 효과가 없습니다.",
            "affected": "전 스킬 순환",
            "implication": "코스트 100 배틀 스킬과 궁극기 에너지 80을 외부 자원 공급과 자연 회복에 의존합니다. 자원 회복 감소 방향의 제약에서 스킬 빈도가 낮아집니다."
          }
        ]
      },
      {
        "title": "위치·대상 수",
        "entries": [
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "axis": "늑대의 발톱 전제",
            "evidence": "늑대의 발톱은 방어 불능 대상에게 배틀 스킬을 써 울프팀의 진주가 명중해야 부여됩니다.",
            "affected": "절흔 · 끓어오르는 피",
            "implication": "방어 불능이 없는 목표에게는 진주가 발동하지 않아 지속 피해와 받는 피해 증가, 치명타 추가 효과가 모두 비활성화됩니다. 목표 전환 때마다 다시 준비해야 합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "스킬 게이지 반환의 사전 설치 의존",
            "evidence": "우당탕탕 파도!는 스킬 게이지 100포인트를 소모하고, 스킬 게이지 반환은 주변 와류를 소모해 용오름을 생성할 때 와류마다 20포인트씩 발생합니다.",
            "affected": "우당탕탕 파도! · 야, 강물! 도와줘!",
            "implication": "와류가 없는 상태에서는 배틀 스킬의 게이지 반환을 얻지 못합니다. 기본 최대 2개의 와류를 모두 소모해도 반환량은 40포인트이므로 자연 회복이나 추가 수급이 필요합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "위치 기반 가속·감속",
            "evidence": "의기투합의 가속과 감속은 와류 주변 5미터에서 적용되고 범위를 벗어난 뒤 3초만 유지됩니다.",
            "affected": "의기투합 · 와류",
            "implication": "전투 위치가 와류에서 멀어지거나 적이 크게 이동하면 지원 효과를 계속 받기 어렵습니다. 적 이동 증가나 설치물 범위 축소 방향의 제약에 취약합니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "지속 시전과 준비 시간",
            "evidence": "중력 모드는 지속 시전 후 마지막 폭발에서 자연 부착을 부여합니다.",
            "affected": "아케인 스태프 · 중력 모드",
            "implication": "자연 부착과 마지막 타격 치유 조건이 시전 종료에 몰려 있습니다. 적이 범위를 벗어나거나 시전이 끊기면 핵심 후속 효과를 놓칠 수 있어 시전 시간 증가·행동 방해 방향의 제약에 약합니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "다수 대상 치유 조건",
            "evidence": "뒤늦은 편지는 중력 모드의 마지막 공격 또는 매트릭스 이동이 최소 2명의 적에게 명중해야 발동합니다.",
            "affected": "뒤늦은 편지",
            "implication": "단일 보스전이나 적이 흩어진 상황에서는 치유가 발동하지 않습니다. 적을 모으는 스킬과 실제 명중 수를 함께 확보해야 하므로 안정적인 전담 회복 수단으로 보기 어렵습니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "메인 컨트롤 강력한 일격 의존",
            "evidence": "연쇄 섬광은 메인 컨트롤 오퍼레이터가 강력한 일격 피해를 준 다음에만 사용할 수 있습니다.",
            "affected": "실시간 프로토콜 · 연쇄 섬광",
            "implication": "메인 컨트롤의 일반 공격 순환이나 강력한 일격 기회가 끊기면 핵심 감전 공급이 지연됩니다. 교대 제한·공격 중단 방향의 제약에 취약합니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "짧은 감전 지속 시간",
            "evidence": "연쇄 섬광이 부여하는 강제 감전은 기본 5초 동안 지속됩니다.",
            "affected": "연쇄 섬광 · P1",
            "implication": "감전이 유지되는 짧은 시간 안에 아츠 공격을 집중해야 합니다. 후속 스킬 지연이나 적 이동으로 피해 집중 창을 놓치기 쉽고, 지속 연장은 P1에 배치되어 있습니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "좁은 배틀 스킬 범위",
            "evidence": "프로토콜ω · 뇌격은 좁은 범위 내의 적에게 전기 피해와 전기 부착을 부여합니다.",
            "affected": "프로토콜ω · 뇌격",
            "implication": "적이 넓게 분산된 상황에서는 한 번에 여러 대상에게 전기 부착을 공급하기 어렵습니다. 적 분산과 이동이 많은 전투에서 준비 효율이 낮아집니다."
          }
        ]
      },
      {
        "title": "잠재력 의존",
        "entries": [
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "axis": "궁극기 에너지와 잠재력",
            "evidence": "궁극기는 에너지 110이 필요하고 P2·P4·P5가 치명타 확률, 에너지 비용, 궁극기 피해를 직접 보완합니다.",
            "affected": "기습 날카로운 발톱 · P2 · P4 · P5",
            "implication": "치명타 중심 마무리의 빈도와 안정성이 잠재력에 따라 크게 달라집니다. 에너지 획득 저하 환경에서는 연계 버프 시간 안에 궁극기를 맞추기 어려울 수 있습니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "잠재력에 따른 순환 효율",
            "evidence": "P1은 연계 쿨타임과 와류당 추가 게이지 반환을 개선하고, P3은 아츠 취약을 강화하며, P5는 궁극기와 궁극기 생성 용오름의 피해를 강화합니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 구조는 완성되어 있지만 와류 회전·아츠 취약 수치·궁극기 폭발력의 상한은 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "역할군 제한 지원",
            "evidence": "전달자의 노래는 가드·캐스터·서포터 오퍼레이터에게만 궁극기 충전 효율을 제공합니다.",
            "affected": "전달자의 노래 · P3",
            "implication": "디펜더·스트라이커·뱅가드 중심 조합에서는 재능과 P3의 가치가 낮아집니다. 파티 역할군 구성이 바뀌면 핵심 지원 효과의 수혜 인원이 크게 달라집니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "궁극기·잠재력 의존",
            "evidence": "강한 감속과 아츠 취약은 궁극기에 집중되어 있고 P2·P3·P5가 취약, 충전, 연계 주기를 크게 강화합니다.",
            "affected": "중력장 · P2 · P3 · P5",
            "implication": "궁극기 에너지 수급이 느려지거나 쿨타임이 늘면 주요 지원 공백이 커집니다. 방어 불능 연동 취약과 연계 회전은 잠재력 단계에 따라 체감 차이가 큽니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "짧은 감전 지속 시간",
            "evidence": "연쇄 섬광이 부여하는 강제 감전은 기본 5초 동안 지속됩니다.",
            "affected": "연쇄 섬광 · P1",
            "implication": "감전이 유지되는 짧은 시간 안에 아츠 공격을 집중해야 합니다. 후속 스킬 지연이나 적 이동으로 피해 집중 창을 놓치기 쉽고, 지속 연장은 P1에 배치되어 있습니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "잠재력에 집중된 감전·궁극기 강화",
            "evidence": "P1은 감전 지속을 늘리고, P3·P4는 감전 중 공격력과 아츠 피해 증가 효과를 강화하며, P5는 궁극기 치명타 확률을 올립니다.",
            "affected": "P1 · P3 · P4 · P5",
            "implication": "기본 감전 창과 최종 화력이 잠재력에서 크게 개선됩니다. 잠재력 단계에 따라 감전 지원과 궁극기 마무리 성능 차이가 큽니다."
          }
        ]
      },
      {
        "title": "메인 컨트롤·조작 집중",
        "entries": [
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "axis": "정확한 2연속 입력",
            "evidence": "연계는 연속 2회 발동하며 두 번째 공격이 정확하게 연계될 때 방어 불능 1스택을 추가합니다.",
            "affected": "그림자가 타오르는 순간",
            "implication": "두 번째 입력 타이밍을 놓치거나 적이 이동·무적 상태가 되면 아츠 부착 소모, 치명타 강화, 추가 스택 중 일부를 잃을 수 있습니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "메인 컨트롤 낙하 공격 조율",
            "evidence": "궁극기의 강화된 조기 파도와 풍랑의 주재자 용오름은 메인 컨트롤 오퍼레이터가 고대의 진 안에서 낙하 공격을 사용해야 발동합니다.",
            "affected": "대당가께서 지켜보고 계신다! · 풍랑의 주재자",
            "implication": "낙하 공격을 빠르게 넣지 못하면 강화 파도와 추가 용오름의 시점을 놓칠 수 있습니다. 공중 행동 제한이나 메인 컨트롤 교대 제한 방향의 제약이 불리합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "지속 제어와 조기 폭발의 선택",
            "evidence": "고대의 진은 4초 동안 적을 묶고 피해를 주지만, 낙하 공격을 사용하면 변화가 중단되고 거대한 파도가 예정보다 일찍 발생합니다.",
            "affected": "대당가께서 지켜보고 계신다!",
            "implication": "조기 폭발을 선택하면 강화된 파도와 용오름을 빠르게 얻는 대신 남은 지속 제어 구간을 끝내게 됩니다. 생존이나 제어 유지가 중요한 상황에서는 발동 시점을 조절해야 합니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "메인 컨트롤 강력한 일격 의존",
            "evidence": "연쇄 섬광은 메인 컨트롤 오퍼레이터가 강력한 일격 피해를 준 다음에만 사용할 수 있습니다.",
            "affected": "실시간 프로토콜 · 연쇄 섬광",
            "implication": "메인 컨트롤의 일반 공격 순환이나 강력한 일격 기회가 끊기면 핵심 감전 공급이 지연됩니다. 교대 제한·공격 중단 방향의 제약에 취약합니다."
          }
        ]
      }
    ],
    "discoveries": [
      {
        "character": {
          "id": "rossi",
          "name": "로시"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 배틀 스킬 비중이 높지만, 연계 스킬은 아츠 부착·방어 불능 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "tangtang",
          "name": "탕탕"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 배틀 스킬 비중이 높지만, 연계 스킬은 냉기 부착 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "gilberta",
          "name": "질베르타"
        },
        "title": "궁극기 재평가",
        "description": "현재 순환은 일반 공격 비중이 높지만, 궁극기은 방어 불능·아츠 취약 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "궁극기"
      },
      {
        "character": {
          "id": "perlica",
          "name": "펠리카"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 배틀 스킬 비중이 높지만, 연계 스킬은 강력한 일격·메인 컨트롤 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      }
    ],
    "designHints": [
      {
        "id": "normal",
        "title": "일반 공격 의존도",
        "pressure": "일반 공격 피해 비중을 낮추는 방향",
        "impact": "강화 상태나 메인 컨트롤 중 일반 공격에 몰린 화력 구간이 짧아집니다.",
        "opportunity": "로시의 연계 스킬, 탕탕의 연계 스킬처럼 연계·배틀 스킬 중심의 보조 축이 상대적으로 중요해질 수 있습니다.",
        "caution": "일반 공격과 강력한 일격을 동시에 완전히 막으면 스킬 게이지 회복과 불균형 순환까지 함께 끊길 수 있습니다.",
        "characters": [
          {
            "id": "perlica",
            "name": "펠리카"
          }
        ]
      },
      {
        "id": "ultimate",
        "title": "궁극기 반복 의존도",
        "pressure": "궁극기 반복 사용의 효율이 점차 낮아지는 방향",
        "impact": "궁극기를 중심으로 한 강화 구간과 마무리 빈도가 줄어듭니다.",
        "opportunity": "궁극기 에너지를 다른 가치로 돌리거나 배틀·연계 스킬을 주력화하는 운용을 찾게 됩니다.",
        "caution": "첫 궁극기까지 무력화하면 준비 과정의 의미도 사라질 수 있으므로 반복 효율을 조절하는 편이 발견을 만들기 쉽습니다.",
        "characters": [
          {
            "id": "rossi",
            "name": "로시"
          },
          {
            "id": "tangtang",
            "name": "탕탕"
          },
          {
            "id": "perlica",
            "name": "펠리카"
          }
        ]
      },
      {
        "id": "battle",
        "title": "배틀 스킬 피해 비중",
        "pressure": "배틀 스킬의 직접 피해를 줄이되 연계 스킬 순환은 열어주는 방향",
        "impact": "스킬 게이지를 사용해 즉시 내는 화력이 줄어듭니다.",
        "opportunity": "배틀 스킬을 상태 생성·변환 용도로만 쓰고, 연계 스킬이나 궁극기 외 추가 피해를 주력으로 삼는 구조가 떠오를 수 있습니다.",
        "caution": "배틀 스킬의 상태 부여까지 막으면 후속 연계 조건 자체가 사라질 수 있습니다.",
        "characters": [
          {
            "id": "rossi",
            "name": "로시"
          },
          {
            "id": "tangtang",
            "name": "탕탕"
          },
          {
            "id": "perlica",
            "name": "펠리카"
          }
        ]
      },
      {
        "id": "link",
        "title": "연계 스킬 빈도",
        "pressure": "연계 스킬 사용 빈도와 쿨타임을 크게 흔드는 방향",
        "impact": "조건을 자주 열 수 있는 파티일수록 순환 속도가 크게 달라집니다.",
        "opportunity": "연계 횟수가 늘어날 때 생기는 자원 수급과 보조 피해, 반대로 연계에 대가가 생길 때의 대체 순서를 비교할 수 있습니다.",
        "caution": "연계 조건과 쿨타임을 동시에 막으면 조합의 상호작용이 사라질 수 있습니다.",
        "characters": [
          {
            "id": "rossi",
            "name": "로시"
          },
          {
            "id": "tangtang",
            "name": "탕탕"
          }
        ]
      },
      {
        "id": "stack",
        "title": "부착·방어 불능 축적 속도",
        "pressure": "같은 대상에게 스택을 연속으로 쌓는 속도를 제한하는 방향",
        "impact": "최대 스택을 전제로 하는 동결·강타·갑옷 파괴·취약 발동 시점이 늦어집니다.",
        "opportunity": "낮은 스택에서 바로 작동하는 스킬, 강제 이상, 직접 부여 효과의 가치가 올라갈 수 있습니다.",
        "caution": "부착 자체를 금지하면 대체 운용이 아니라 파티의 핵심 문법을 삭제하게 됩니다.",
        "characters": [
          {
            "id": "rossi",
            "name": "로시"
          },
          {
            "id": "tangtang",
            "name": "탕탕"
          },
          {
            "id": "gilberta",
            "name": "질베르타"
          },
          {
            "id": "perlica",
            "name": "펠리카"
          }
        ]
      }
    ],
    "mechanicProfile": {
      "mechanicIds": [
        "defenseless",
        "artsInfliction",
        "shock",
        "natureInfliction",
        "artsVulnerability",
        "slow",
        "mainControl",
        "ultimate",
        "launch",
        "heatDamage",
        "frostInfliction",
        "skillGauge",
        "combustion",
        "freeze",
        "corrosion",
        "battleSkill",
        "artsAbnormality",
        "heatInfliction",
        "electricInfliction",
        "physicalDamage",
        "powerStrike",
        "haste",
        "electricDamage",
        "artsDamage",
        "imbalance",
        "ultimateEnergy",
        "generalAttack"
      ],
      "mechanicScores": {
        "defenseless": 20.5,
        "artsInfliction": 20,
        "shock": 10.5,
        "natureInfliction": 9.5,
        "artsVulnerability": 9,
        "slow": 9,
        "mainControl": 9,
        "ultimate": 9,
        "launch": 8.5,
        "heatDamage": 6.5,
        "frostInfliction": 6.5,
        "skillGauge": 6.5,
        "combustion": 6,
        "freeze": 6,
        "corrosion": 6,
        "battleSkill": 6,
        "artsAbnormality": 5.5,
        "heatInfliction": 5,
        "electricInfliction": 5,
        "physicalDamage": 4.5,
        "powerStrike": 4.5,
        "haste": 4.5,
        "electricDamage": 4,
        "artsDamage": 3,
        "imbalance": 3,
        "ultimateEnergy": 3,
        "generalAttack": 3,
        "frostDamage": 0,
        "natureDamage": 0,
        "knockdown": 0,
        "smash": 0,
        "armorBreak": 0,
        "execution": 0,
        "physicalVulnerability": 0,
        "heatVulnerability": 0,
        "electricVulnerability": 0,
        "frostVulnerability": 0,
        "natureVulnerability": 0,
        "artsAmplification": 0,
        "physicalAmplification": 0,
        "heatAmplification": 0,
        "electricAmplification": 0,
        "frostAmplification": 0,
        "natureAmplification": 0,
        "skillGaugeReturn": 0,
        "protection": 0,
        "fortification": 0,
        "healing": 0,
        "weakness": 0,
        "comboHit": 0,
        "cleanse": 0,
        "originiumCrystal": 0,
        "linkSkill": 0
      },
      "dominantAction": "battleSkill",
      "actionTotals": {
        "generalAttack": 6,
        "battleSkill": 17,
        "linkSkill": 10,
        "ultimate": 14
      },
      "hintIds": [
        "normal",
        "ultimate",
        "battle",
        "link",
        "stack"
      ],
      "hintTitles": [
        "일반 공격 의존도",
        "궁극기 반복 의존도",
        "배틀 스킬 피해 비중",
        "연계 스킬 빈도",
        "부착·방어 불능 축적 속도"
      ],
      "weaknessAxes": [
        "이중 상태 의존",
        "정확한 2연속 입력",
        "물리·열기 혼합 지원",
        "늑대의 발톱 전제",
        "와류 준비 시간과 최대 수량",
        "스킬 게이지 반환의 사전 설치 의존",
        "아츠 취약의 다중 용오름 조건",
        "아츠 이상 발동 조건",
        "지속 시전과 준비 시간",
        "다수 대상 치유 조건",
        "방어 불능 파티 의존",
        "궁극기·잠재력 의존",
        "물리 상태와 전기 화력의 조합 의존",
        "좁은 배틀 스킬 범위",
        "치명타 의존",
        "궁극기 에너지와 잠재력",
        "와류 준비 시간과 최대 수량",
        "스킬 게이지 반환의 사전 설치 의존",
        "잠재력에 따른 순환 효율",
        "다수 대상 치유 조건",
        "궁극기·잠재력 의존",
        "직접적인 자원 회복 부재",
        "늑대의 발톱 전제",
        "스킬 게이지 반환의 사전 설치 의존",
        "위치 기반 가속·감속",
        "지속 시전과 준비 시간",
        "다수 대상 치유 조건",
        "메인 컨트롤 강력한 일격 의존",
        "짧은 감전 지속 시간",
        "좁은 배틀 스킬 범위",
        "궁극기 에너지와 잠재력",
        "잠재력에 따른 순환 효율",
        "역할군 제한 지원",
        "궁극기·잠재력 의존",
        "짧은 감전 지속 시간",
        "잠재력에 집중된 감전·궁극기 강화",
        "정확한 2연속 입력",
        "메인 컨트롤 낙하 공격 조율",
        "지속 제어와 조기 폭발의 선택",
        "메인 컨트롤 강력한 일격 의존"
      ],
      "dependencyLabels": [
        "방어 불능",
        "아츠 부착",
        "감전",
        "자연 부착",
        "배틀 스킬"
      ]
    }
  },
  {
    "schemaVersion": 1,
    "id": "party-yvonne-tangtang-gilberta-xaihi",
    "exportedAt": "2026-07-22T07:51:28.762Z",
    "title": "이본 · 탕탕 · 질베르타 · 자이히 파티 분석",
    "party": [
      {
        "id": "yvonne",
        "name": "이본",
        "order": 1
      },
      {
        "id": "tangtang",
        "name": "탕탕",
        "order": 2
      },
      {
        "id": "gilberta",
        "name": "질베르타",
        "order": 3
      },
      {
        "id": "xaihi",
        "name": "자이히",
        "order": 4
      }
    ],
    "summary": {
      "title": "파티 전투 구조 분석",
      "sentence": "냉기 부착·자연 부착을 준비해 동결 조건으로 전환하고, 궁극기·배틀 스킬에 화력을 모으는 파티입니다.",
      "dominantAction": "ultimate",
      "actionTotals": {
        "generalAttack": 8,
        "battleSkill": 16,
        "linkSkill": 16,
        "ultimate": 20
      },
      "dependencies": [
        {
          "id": "freeze",
          "label": "동결",
          "color": "frost",
          "level": "매우 높음",
          "score": 30
        },
        {
          "id": "frostInfliction",
          "label": "냉기 부착",
          "color": "frost",
          "level": "매우 높음",
          "score": 26
        },
        {
          "id": "natureInfliction",
          "label": "자연 부착",
          "color": "nature",
          "level": "매우 높음",
          "score": 17.5
        },
        {
          "id": "artsInfliction",
          "label": "아츠 부착",
          "color": "cyan",
          "level": "매우 높음",
          "score": 16.5
        },
        {
          "id": "ultimate",
          "label": "궁극기",
          "color": "orange",
          "level": "주력 행동",
          "score": 20
        }
      ]
    },
    "diagram": {
      "nodes": [
        {
          "order": 1,
          "character": {
            "id": "yvonne",
            "name": "이본"
          },
          "skill": {
            "name": "얼음 폭탄 · β형",
            "type": "배틀 스킬",
            "typeId": "battleSkill",
            "index": 1
          },
          "title": "부착 스택 준비"
        },
        {
          "order": 2,
          "character": {
            "id": "xaihi",
            "name": "자이히"
          },
          "skill": {
            "name": "스트레스 테스트",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "냉기 피해 보조"
        },
        {
          "order": 3,
          "character": {
            "id": "tangtang",
            "name": "탕탕"
          },
          "skill": {
            "name": "야, 강물! 도와줘!",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "와류 생성"
        },
        {
          "order": 4,
          "character": {
            "id": "yvonne",
            "name": "이본"
          },
          "skill": {
            "name": "꽁꽁이 · υ37",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "연계 제어"
        },
        {
          "order": 5,
          "character": {
            "id": "gilberta",
            "name": "질베르타"
          },
          "skill": {
            "name": "아케인 스태프 · 매트릭스 이동",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "아츠 이상 준비"
        },
        {
          "order": 6,
          "character": {
            "id": "xaihi",
            "name": "자이히"
          },
          "skill": {
            "name": "스택 오버플로",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "팀 증폭·정화"
        },
        {
          "order": 7,
          "character": {
            "id": "gilberta",
            "name": "질베르타"
          },
          "skill": {
            "name": "아케인 스태프 · 중력장",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "질베르타의 궁극기 전개"
        },
        {
          "order": 8,
          "character": {
            "id": "yvonne",
            "name": "이본"
          },
          "skill": {
            "name": "아이스 슈터",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "궁극기 집중 공격"
        }
      ],
      "connections": [
        {
          "fromOrder": 1,
          "toOrder": 2,
          "label": "냉기 부착",
          "preparationRoutes": [
            {
              "character": {
                "id": "yvonne",
                "name": "이본"
              },
              "skill": {
                "name": "얼음 폭탄 · β형",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "frostInfliction",
                  "label": "냉기 부착"
                },
                {
                  "id": "freeze",
                  "label": "동결"
                }
              ],
              "summary": "냉기 부착 혹은 자연 부착 상태의 적에게 명중했을 때 목표가 보유한 모든 아츠 부착을 소모하고, 대상에게 강제로 동결을 부여하며 소모한 스택 수치에 따라 냉기 피해를 줍니다."
            },
            {
              "character": {
                "id": "tangtang",
                "name": "탕탕"
              },
              "skill": {
                "name": "우당탕탕 파도!",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "frostInfliction",
                  "label": "냉기 부착"
                }
              ],
              "summary": "용오름은 범위 내의 적에게 냉기 부착 1스택을 부여하고 지속적으로 냉기 피해를 줍니다. 와류를 소모해 생성한 용오름의 개수에 따라 스킬 게이지를 반환하며, 와류마다 20포인트를 반환합니다."
            },
            {
              "character": {
                "id": "yvonne",
                "name": "이본"
              },
              "skill": {
                "name": "꽁꽁이 · υ37",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "freeze",
                  "label": "동결"
                }
              ],
              "summary": "메인 컨트롤 오퍼레이터가 동결 상태의 적에게 강력한 일격을 사용했을 때 사용할 수 있습니다. 지속 시간이 끝나면 꽁꽁이가 자폭하여 주위의 적에게 강제로 동결 상태를 부여하고 냉기 피해를 줍니다."
            },
            {
              "character": {
                "id": "tangtang",
                "name": "탕탕"
              },
              "skill": {
                "name": "야, 강물! 도와줘!",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "frostInfliction",
                  "label": "냉기 부착"
                }
              ],
              "summary": "적이 냉기 부착을 부여받았거나 아츠 폭발 피해를 받았을 때 사용할 수 있습니다."
            }
          ]
        },
        {
          "fromOrder": 2,
          "toOrder": 3,
          "label": "냉기 부착",
          "preparationRoutes": [
            {
              "character": {
                "id": "yvonne",
                "name": "이본"
              },
              "skill": {
                "name": "얼음 폭탄 · β형",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "frostInfliction",
                  "label": "냉기 부착"
                }
              ],
              "summary": "냉기 부착 혹은 자연 부착 상태의 적에게 명중했을 때 목표가 보유한 모든 아츠 부착을 소모하고, 대상에게 강제로 동결을 부여하며 소모한 스택 수치에 따라 냉기 피해를 줍니다. 배틀 스킬로 적에게 동결 상태를 부여한 후, 동결 부여로 궁극기 에너지 10을 획득하고 중첩된 부착 스택을 소모할 때마다 궁극기 에너지 30을 획득합니다."
            },
            {
              "character": {
                "id": "tangtang",
                "name": "탕탕"
              },
              "skill": {
                "name": "우당탕탕 파도!",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "frostInfliction",
                  "label": "냉기 부착"
                }
              ],
              "summary": "용오름은 범위 내의 적에게 냉기 부착 1스택을 부여하고 지속적으로 냉기 피해를 줍니다. 와류를 소모해 생성한 용오름의 개수에 따라 스킬 게이지를 반환하며, 와류마다 20포인트를 반환합니다."
            },
            {
              "character": {
                "id": "xaihi",
                "name": "자이히"
              },
              "skill": {
                "name": "스트레스 테스트",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "frostInfliction",
                  "label": "냉기 부착"
                }
              ],
              "summary": "지원 결정체의 생명력 회복 횟수를 모두 소모했을 때 사용할 수 있습니다. 짧게 차지하여 지원 결정체를 적에게 투척해 냉기 피해를 주고 냉기 부착 상태를 부여합니다."
            }
          ]
        },
        {
          "fromOrder": 3,
          "toOrder": 4,
          "label": "다음 조건 연결",
          "preparationRoutes": [
            {
              "character": {
                "id": "yvonne",
                "name": "이본"
              },
              "skill": {
                "name": "얼음 폭탄 · β형",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "freeze",
                  "label": "동결"
                }
              ],
              "summary": "냉기 부착 혹은 자연 부착 상태의 적에게 명중했을 때 목표가 보유한 모든 아츠 부착을 소모하고, 대상에게 강제로 동결을 부여하며 소모한 스택 수치에 따라 냉기 피해를 줍니다."
            }
          ]
        },
        {
          "fromOrder": 4,
          "toOrder": 5,
          "label": "동결",
          "preparationRoutes": [
            {
              "character": {
                "id": "yvonne",
                "name": "이본"
              },
              "skill": {
                "name": "얼음 폭탄 · β형",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "freeze",
                  "label": "동결"
                },
                {
                  "id": "artsAbnormality",
                  "label": "아츠 이상"
                }
              ],
              "summary": "냉기 부착 혹은 자연 부착 상태의 적에게 명중했을 때 목표가 보유한 모든 아츠 부착을 소모하고, 대상에게 강제로 동결을 부여하며 소모한 스택 수치에 따라 냉기 피해를 줍니다."
            },
            {
              "character": {
                "id": "yvonne",
                "name": "이본"
              },
              "skill": {
                "name": "꽁꽁이 · υ37",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "freeze",
                  "label": "동결"
                },
                {
                  "id": "artsAbnormality",
                  "label": "아츠 이상"
                }
              ],
              "summary": "메인 컨트롤 오퍼레이터가 동결 상태의 적에게 강력한 일격을 사용했을 때 사용할 수 있습니다. 지속 시간이 끝나면 꽁꽁이가 자폭하여 주위의 적에게 강제로 동결 상태를 부여하고 냉기 피해를 줍니다."
            }
          ]
        },
        {
          "fromOrder": 5,
          "toOrder": 6,
          "label": "동결",
          "preparationRoutes": []
        },
        {
          "fromOrder": 6,
          "toOrder": 7,
          "label": "다음 조건 연결",
          "preparationRoutes": []
        },
        {
          "fromOrder": 7,
          "toOrder": 8,
          "label": "다음 조건 연결",
          "preparationRoutes": [
            {
              "character": {
                "id": "yvonne",
                "name": "이본"
              },
              "skill": {
                "name": "얼음 폭탄 · β형",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "freeze",
                  "label": "동결"
                }
              ],
              "summary": "냉기 부착 혹은 자연 부착 상태의 적에게 명중했을 때 목표가 보유한 모든 아츠 부착을 소모하고, 대상에게 강제로 동결을 부여하며 소모한 스택 수치에 따라 냉기 피해를 줍니다."
            },
            {
              "character": {
                "id": "yvonne",
                "name": "이본"
              },
              "skill": {
                "name": "꽁꽁이 · υ37",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "freeze",
                  "label": "동결"
                }
              ],
              "summary": "메인 컨트롤 오퍼레이터가 동결 상태의 적에게 강력한 일격을 사용했을 때 사용할 수 있습니다. 지속 시간이 끝나면 꽁꽁이가 자폭하여 주위의 적에게 강제로 동결 상태를 부여하고 냉기 피해를 줍니다."
            }
          ]
        }
      ]
    },
    "combatFlow": [
      {
        "order": 1,
        "character": {
          "id": "yvonne",
          "name": "이본"
        },
        "stageIds": [
          "setup",
          "trigger",
          "convert"
        ],
        "title": "부착 스택 준비",
        "detail": "냉기 부착 또는 자연 부착을 목표에게 쌓아 이본의 배틀 스킬의 소모 조건을 준비한다.",
        "skill": {
          "name": "얼음 폭탄 · β형",
          "type": "배틀 스킬",
          "typeId": "battleSkill",
          "index": 1
        },
        "conditions": [
          "냉기 부착 혹은 자연 부착 상태의 적에게 명중했을 때 목표가 보유한 모든 아츠 부착을 소모하고, 대상에게 강제로 동결을 부여하며 소모한 스택 수치에 따라 냉기 피해를 줍니다."
        ],
        "timing": "",
        "effects": [
          "배틀 스킬로 적에게 동결 상태를 부여한 후, 동결 부여로 궁극기 에너지 10을 획득하고 중첩된 부착 스택을 소모할 때마다 궁극기 에너지 30을 획득합니다."
        ],
        "mechanics": [
          {
            "id": "frostInfliction",
            "label": "냉기 부착"
          },
          {
            "id": "natureInfliction",
            "label": "자연 부착"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "skill": {
              "name": "우당탕탕 파도!",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "용오름은 범위 내의 적에게 냉기 부착 1스택을 부여하고 지속적으로 냉기 피해를 줍니다. 와류를 소모해 생성한 용오름의 개수에 따라 스킬 게이지를 반환하며, 와류마다 20포인트를 반환합니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "skill": {
              "name": "아케인 스태프 · 중력 모드",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "natureInfliction",
                "label": "자연 부착"
              }
            ],
            "summary": "시전이 끝나면 중력 특이점이 폭발하여 범위 내의 적에게 자연 피해를 주고 자연 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "skill": {
              "name": "야, 강물! 도와줘!",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "적이 냉기 부착을 부여받았거나 아츠 폭발 피해를 받았을 때 사용할 수 있습니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "skill": {
              "name": "스트레스 테스트",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "지원 결정체의 생명력 회복 횟수를 모두 소모했을 때 사용할 수 있습니다. 짧게 차지하여 지원 결정체를 적에게 투척해 냉기 피해를 주고 냉기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "skill": {
              "name": "아케인 스태프 · 중력장",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "natureInfliction",
                "label": "자연 부착"
              }
            ],
            "summary": "목표가 방어 불능 상태라면 아츠 취약 효과가 방어 불능 스택마다 3% 추가로 증가합니다. 중력 혼란 구역을 생성하여 구역 내의 적에게 즉시 1회의 자연 피해를 주고 자연 부착을 부여합니다. 구역 내 목표에게 감속 80%와 아츠 취약 30%를 부여합니다."
          }
        ]
      },
      {
        "order": 2,
        "character": {
          "id": "xaihi",
          "name": "자이히"
        },
        "stageIds": [
          "setup",
          "trigger",
          "convert"
        ],
        "title": "냉기 피해 보조",
        "detail": "자이히의 연계 스킬 명중 시 대상이 냉기 부착 또는 동결 상태라면 가동 프로세스로 5초 동안 받는 냉기 피해를 10% 증가시킨다.",
        "skill": {
          "name": "스트레스 테스트",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "지원 결정체의 생명력 회복 횟수를 모두 소모했을 때 사용할 수 있습니다.",
          "지원 결정체 회복 2회 소모 후"
        ],
        "timing": "",
        "effects": [
          "짧게 차지하여 지원 결정체를 적에게 투척해 냉기 피해를 주고 냉기 부착 상태를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "frostDamage",
            "label": "냉기 피해"
          },
          {
            "id": "frostInfliction",
            "label": "냉기 부착"
          },
          {
            "id": "freeze",
            "label": "동결"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "skill": {
              "name": "얼음 폭탄 · β형",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              },
              {
                "id": "freeze",
                "label": "동결"
              }
            ],
            "summary": "냉기 부착 혹은 자연 부착 상태의 적에게 명중했을 때 목표가 보유한 모든 아츠 부착을 소모하고, 대상에게 강제로 동결을 부여하며 소모한 스택 수치에 따라 냉기 피해를 줍니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "skill": {
              "name": "우당탕탕 파도!",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "용오름은 범위 내의 적에게 냉기 부착 1스택을 부여하고 지속적으로 냉기 피해를 줍니다. 와류를 소모해 생성한 용오름의 개수에 따라 스킬 게이지를 반환하며, 와류마다 20포인트를 반환합니다."
          },
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "skill": {
              "name": "꽁꽁이 · υ37",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "freeze",
                "label": "동결"
              }
            ],
            "summary": "메인 컨트롤 오퍼레이터가 동결 상태의 적에게 강력한 일격을 사용했을 때 사용할 수 있습니다. 지속 시간이 끝나면 꽁꽁이가 자폭하여 주위의 적에게 강제로 동결 상태를 부여하고 냉기 피해를 줍니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "skill": {
              "name": "야, 강물! 도와줘!",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "적이 냉기 부착을 부여받았거나 아츠 폭발 피해를 받았을 때 사용할 수 있습니다."
          }
        ]
      },
      {
        "order": 3,
        "character": {
          "id": "tangtang",
          "name": "탕탕"
        },
        "stageIds": [
          "setup",
          "trigger",
          "convert",
          "recycle"
        ],
        "title": "와류 생성",
        "detail": "냉기 부착 또는 아츠 폭발 피해 조건을 맞춰 탕탕의 연계 스킬을 사용하고 30초 동안 유지되는 와류를 최대 2개까지 준비한다.",
        "skill": {
          "name": "야, 강물! 도와줘!",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "적이 냉기 부착을 부여받았거나 아츠 폭발 피해를 받았을 때 사용할 수 있습니다.",
          "냉기 부착·아츠 폭발 피해 조건"
        ],
        "timing": "",
        "effects": [],
        "mechanics": [
          {
            "id": "frostInfliction",
            "label": "냉기 부착"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "skill": {
              "name": "얼음 폭탄 · β형",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "냉기 부착 혹은 자연 부착 상태의 적에게 명중했을 때 목표가 보유한 모든 아츠 부착을 소모하고, 대상에게 강제로 동결을 부여하며 소모한 스택 수치에 따라 냉기 피해를 줍니다. 배틀 스킬로 적에게 동결 상태를 부여한 후, 동결 부여로 궁극기 에너지 10을 획득하고 중첩된 부착 스택을 소모할 때마다 궁극기 에너지 30을 획득합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "skill": {
              "name": "우당탕탕 파도!",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "용오름은 범위 내의 적에게 냉기 부착 1스택을 부여하고 지속적으로 냉기 피해를 줍니다. 와류를 소모해 생성한 용오름의 개수에 따라 스킬 게이지를 반환하며, 와류마다 20포인트를 반환합니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "skill": {
              "name": "스트레스 테스트",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "지원 결정체의 생명력 회복 횟수를 모두 소모했을 때 사용할 수 있습니다. 짧게 차지하여 지원 결정체를 적에게 투척해 냉기 피해를 주고 냉기 부착 상태를 부여합니다."
          }
        ]
      },
      {
        "order": 4,
        "character": {
          "id": "yvonne",
          "name": "이본"
        },
        "stageIds": [
          "setup",
          "trigger",
          "convert",
          "payoff"
        ],
        "title": "연계 제어",
        "detail": "동결 대상에게 강력한 일격을 명중시켜 이본의 연계 스킬을 발동하고, 끌어당김·지속 피해·종료 시 강제 동결과 궁극기 에너지를 확보한다.",
        "skill": {
          "name": "꽁꽁이 · υ37",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "메인 컨트롤 오퍼레이터가 동결 상태의 적에게 강력한 일격을 사용했을 때 사용할 수 있습니다.",
          "동결 대상 강력한 일격 후"
        ],
        "timing": "",
        "effects": [
          "지속 시간이 끝나면 꽁꽁이가 자폭하여 주위의 적에게 강제로 동결 상태를 부여하고 냉기 피해를 줍니다."
        ],
        "mechanics": [
          {
            "id": "freeze",
            "label": "동결"
          },
          {
            "id": "powerStrike",
            "label": "강력한 일격"
          },
          {
            "id": "ultimateEnergy",
            "label": "궁극기 에너지"
          },
          {
            "id": "ultimate",
            "label": "궁극기"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "skill": {
              "name": "얼음 폭탄 · β형",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "freeze",
                "label": "동결"
              }
            ],
            "summary": "냉기 부착 혹은 자연 부착 상태의 적에게 명중했을 때 목표가 보유한 모든 아츠 부착을 소모하고, 대상에게 강제로 동결을 부여하며 소모한 스택 수치에 따라 냉기 피해를 줍니다."
          }
        ]
      },
      {
        "order": 5,
        "character": {
          "id": "gilberta",
          "name": "질베르타"
        },
        "stageIds": [
          "setup",
          "trigger",
          "convert"
        ],
        "title": "아츠 이상 준비",
        "detail": "파티가 적에게 연소·감전·동결·부식 중 하나를 부여해 질베르타의 연계 스킬의 발동 조건을 만든다.",
        "skill": {
          "name": "아케인 스태프 · 매트릭스 이동",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "아츠 이상 효과를 부여한 적이 있을 때 사용할 수 있습니다.",
          "아츠 이상 대상"
        ],
        "timing": "",
        "effects": [
          "짧게 시전하여 목표 및 주변의 모든 적을 중력으로 끌어당기고 자연 피해와 강제 띄우기 피해를 줍니다."
        ],
        "mechanics": [
          {
            "id": "artsAbnormality",
            "label": "아츠 이상"
          },
          {
            "id": "combustion",
            "label": "연소"
          },
          {
            "id": "shock",
            "label": "감전"
          },
          {
            "id": "freeze",
            "label": "동결"
          },
          {
            "id": "corrosion",
            "label": "부식"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "skill": {
              "name": "얼음 폭탄 · β형",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "freeze",
                "label": "동결"
              },
              {
                "id": "artsAbnormality",
                "label": "아츠 이상"
              }
            ],
            "summary": "냉기 부착 혹은 자연 부착 상태의 적에게 명중했을 때 목표가 보유한 모든 아츠 부착을 소모하고, 대상에게 강제로 동결을 부여하며 소모한 스택 수치에 따라 냉기 피해를 줍니다."
          },
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "skill": {
              "name": "꽁꽁이 · υ37",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "freeze",
                "label": "동결"
              },
              {
                "id": "artsAbnormality",
                "label": "아츠 이상"
              }
            ],
            "summary": "메인 컨트롤 오퍼레이터가 동결 상태의 적에게 강력한 일격을 사용했을 때 사용할 수 있습니다. 지속 시간이 끝나면 꽁꽁이가 자폭하여 주위의 적에게 강제로 동결 상태를 부여하고 냉기 피해를 줍니다."
          }
        ]
      },
      {
        "order": 6,
        "character": {
          "id": "xaihi",
          "name": "자이히"
        },
        "stageIds": [
          "setup",
          "convert",
          "payoff"
        ],
        "title": "팀 증폭·정화",
        "detail": "자이히의 궁극기로 팀 전체에 냉기·자연 증폭을 부여하고, 동시에 팀의 냉기 부착과 동결을 정화한다.",
        "skill": {
          "name": "스택 오버플로",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [],
        "timing": "냉기 증폭·자연 증폭 효과를 먼저 적용한 뒤 이본의 궁극기를 이어갑니다.",
        "effects": [
          "팀 전체에게 일정 시간 냉기 증폭과 자연 증폭 상태를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "frostInfliction",
            "label": "냉기 부착"
          },
          {
            "id": "freeze",
            "label": "동결"
          },
          {
            "id": "natureAmplification",
            "label": "자연 증폭"
          },
          {
            "id": "cleanse",
            "label": "정화"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 7,
        "character": {
          "id": "gilberta",
          "name": "질베르타"
        },
        "stageIds": [
          "setup",
          "payoff"
        ],
        "title": "질베르타의 궁극기 전개",
        "detail": "모인 적에게 질베르타의 궁극기를 사용해 자연 부착, 감속 80%, 아츠 취약 30%를 동시에 부여한다.",
        "skill": {
          "name": "아케인 스태프 · 중력장",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [
          "목표가 방어 불능 상태라면 아츠 취약 효과가 방어 불능 스택마다 3% 추가로 증가합니다.",
          "구역 내 목표가 띄우기 상태라면 구역 효과가 끝날 때까지 띄우기 상태를 유지합니다."
        ],
        "timing": "아츠 취약·감속 효과를 먼저 적용한 뒤 이본의 궁극기를 이어갑니다.",
        "effects": [
          "중력 혼란 구역을 생성하여 구역 내의 적에게 즉시 1회의 자연 피해를 주고 자연 부착을 부여합니다.",
          "구역 내 목표에게 감속 80%와 아츠 취약 30%를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "natureInfliction",
            "label": "자연 부착"
          },
          {
            "id": "artsVulnerability",
            "label": "아츠 취약"
          },
          {
            "id": "slow",
            "label": "감속"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 8,
        "character": {
          "id": "yvonne",
          "name": "이본"
        },
        "stageIds": [
          "convert",
          "payoff"
        ],
        "title": "궁극기 집중 공격",
        "detail": "이본의 궁극기로 메인 컨트롤을 점유해 일반 공격으로 치명타 강화 스택을 쌓고, 마지막 강력한 일격으로 동결 대상에게 추가 피해를 준 뒤 동결을 소모한다.",
        "skill": {
          "name": "아이스 슈터",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [
          "적이 동결 상태라면 추가로 냉기 피해를 1회 준 후 동결 상태를 소모합니다."
        ],
        "timing": "질베르타·자이히의 궁극기로 아츠 취약·냉기 증폭 효과가 적용된 동안 사용해 주력 피해를 집중합니다.",
        "effects": [
          "삐삐를 배치하여 지원을 요청하고 메인 컨트롤 오퍼레이터로 전환합니다.",
          "지속 시간이 끝나기 전의 마지막 공격은 강력한 일격으로 바뀌어 대량의 냉기 피해를 줍니다."
        ],
        "mechanics": [
          {
            "id": "freeze",
            "label": "동결"
          },
          {
            "id": "powerStrike",
            "label": "강력한 일격"
          },
          {
            "id": "mainControl",
            "label": "메인 컨트롤"
          },
          {
            "id": "generalAttack",
            "label": "일반 공격"
          },
          {
            "id": "ultimate",
            "label": "궁극기"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "skill": {
              "name": "얼음 폭탄 · β형",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "freeze",
                "label": "동결"
              }
            ],
            "summary": "냉기 부착 혹은 자연 부착 상태의 적에게 명중했을 때 목표가 보유한 모든 아츠 부착을 소모하고, 대상에게 강제로 동결을 부여하며 소모한 스택 수치에 따라 냉기 피해를 줍니다."
          },
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "skill": {
              "name": "꽁꽁이 · υ37",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "freeze",
                "label": "동결"
              }
            ],
            "summary": "메인 컨트롤 오퍼레이터가 동결 상태의 적에게 강력한 일격을 사용했을 때 사용할 수 있습니다. 지속 시간이 끝나면 꽁꽁이가 자폭하여 주위의 적에게 강제로 동결 상태를 부여하고 냉기 피해를 줍니다."
          }
        ]
      }
    ],
    "supportFlow": [],
    "basicOperation": [
      {
        "order": 1,
        "title": "이본 · 배틀 스킬",
        "detail": "냉기 부착 또는 자연 부착을 목표에게 쌓아 이본의 배틀 스킬의 소모 조건을 준비한다."
      },
      {
        "order": 2,
        "title": "자이히 · 연계 스킬",
        "detail": "자이히의 연계 스킬 명중 시 대상이 냉기 부착 또는 동결 상태라면 가동 프로세스로 5초 동안 받는 냉기 피해를 10% 증가시킨다."
      },
      {
        "order": 3,
        "title": "탕탕 · 연계 스킬",
        "detail": "냉기 부착 또는 아츠 폭발 피해 조건을 맞춰 탕탕의 연계 스킬을 사용하고 30초 동안 유지되는 와류를 최대 2개까지 준비한다."
      },
      {
        "order": 4,
        "title": "이본 · 연계 스킬",
        "detail": "동결 대상에게 강력한 일격을 명중시켜 이본의 연계 스킬을 발동하고, 끌어당김·지속 피해·종료 시 강제 동결과 궁극기 에너지를 확보한다."
      },
      {
        "order": 5,
        "title": "질베르타 · 연계 스킬",
        "detail": "파티가 적에게 연소·감전·동결·부식 중 하나를 부여해 질베르타의 연계 스킬의 발동 조건을 만든다."
      },
      {
        "order": 6,
        "title": "자이히 · 궁극기",
        "detail": "자이히의 궁극기로 팀 전체에 냉기·자연 증폭을 부여하고, 동시에 팀의 냉기 부착과 동결을 정화한다."
      },
      {
        "order": 7,
        "title": "질베르타 · 궁극기",
        "detail": "모인 적에게 질베르타의 궁극기를 사용해 자연 부착, 감속 80%, 아츠 취약 30%를 동시에 부여한다."
      },
      {
        "order": 8,
        "title": "이본 · 궁극기",
        "detail": "이본의 궁극기로 메인 컨트롤을 점유해 일반 공격으로 치명타 강화 스택을 쌓고, 마지막 강력한 일격으로 동결 대상에게 추가 피해를 준 뒤 동결을 소모한다."
      }
    ],
    "roles": [
      {
        "character": {
          "id": "yvonne",
          "name": "이본"
        },
        "labels": [
          "냉기 부착·자연 부착 생성",
          "냉기 피해·냉기 부착 소모",
          "동결 활용",
          "전투 자원 순환"
        ],
        "relation": "탕탕의 냉기 피해 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "tangtang",
          "name": "탕탕"
        },
        "labels": [
          "냉기 부착 생성",
          "스킬 게이지·스킬 게이지 반환 소모",
          "아츠 취약 지원",
          "전투 자원 순환"
        ],
        "relation": "이본의 냉기 피해 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "gilberta",
          "name": "질베르타"
        },
        "labels": [
          "자연 부착·방어 불능 생성",
          "연소·감전·동결·부식 활용",
          "아츠 취약 지원",
          "전투 자원 순환"
        ],
        "relation": "이본의 불균형 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "xaihi",
          "name": "자이히"
        },
        "labels": [
          "냉기 부착 생성",
          "치유 소모",
          "동결 활용",
          "아츠 증폭·냉기 증폭 지원"
        ],
        "relation": "이본의 냉기 피해 조건과 직접 이어집니다."
      }
    ],
    "weaknesses": [
      {
        "title": "예열·상태 준비",
        "entries": [
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "axis": "냉기·자연 부착 스택 의존",
            "evidence": "얼음 폭탄 · β형의 강제 동결과 스택 비례 피해·궁극기 에너지 획득은 냉기 부착 또는 자연 부착을 보유한 대상의 모든 아츠 부착을 소모해야 발동합니다.",
            "affected": "얼음 폭탄 · β형 · 하이테크 버스트",
            "implication": "부착이 충분히 쌓이지 않은 대상에서는 배틀 스킬의 피해와 궁극기 에너지 수급이 줄어듭니다. 아츠 부착 부여량 감소나 부착 소모 방해 방향의 제약에 민감합니다."
          },
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "axis": "높은 궁극기 에너지 요구량",
            "evidence": "아이스 슈터는 궁극기 에너지 220이 필요하며, 주요 에너지 수급원은 얼음 폭탄 · β형과 꽁꽁이 · υ37입니다.",
            "affected": "아이스 슈터 · 얼음 폭탄 · β형 · 꽁꽁이 · υ37",
            "implication": "부착 소모나 연계 스킬 발동이 끊기면 궁극기 회전이 크게 늦어집니다. 궁극기 에너지 획득 감소나 연계 쿨타임 증가 방향의 제약이 특히 불리합니다."
          },
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "axis": "동결 상태의 생성과 소모 순서",
            "evidence": "꽁꽁이 · υ37은 동결 대상에게 강력한 일격을 사용해야 발동하지만, 아이스 슈터의 마지막 공격은 동결 상태를 소모합니다.",
            "affected": "꽁꽁이 · υ37 · 아이스 슈터",
            "implication": "연계 스킬 기회를 남기려면 동결을 궁극기 마지막 공격으로 소모하기 전후의 행동 순서를 맞춰야 합니다. 상태 지속 시간 감소나 상태 즉시 제거 방향의 제약에서 순환이 불안정해집니다."
          },
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "axis": "메인 컨트롤 오퍼레이터 점유",
            "evidence": "아이스 슈터는 이본을 메인 컨트롤 오퍼레이터로 전환하고, 일반 공격을 반복해 치명타 확률 스택과 마지막 강력한 일격을 완성합니다.",
            "affected": "아이스 슈터",
            "implication": "궁극기 지속 중에는 다른 메인 컨트롤 오퍼레이터의 일반 공격 순환을 사용할 수 없습니다. 교대 제한이나 지속 시간 단축 방향의 제약은 궁극기 완성도를 낮춥니다."
          },
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "axis": "잠재력에 따른 궁극기 완성도",
            "evidence": "P1은 연계 범위·추가 방출·궁극기 에너지를 늘리고, P3은 빙점의 치명타 피해를 강화하며, P5는 궁극기 중 공격력과 치명타 피해를 증가시킵니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 상태에서도 동결 순환은 가능하지만, 연계 제어와 궁극기 에너지 회수·집중 화력의 상한은 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "와류 준비 시간과 최대 수량",
            "evidence": "야, 강물! 도와줘!로 와류를 한 번에 1개 생성하며 필드에는 최대 2개만 존재하고, 연계 스킬의 쿨타임은 12초입니다.",
            "affected": "야, 강물! 도와줘! · 우당탕탕 파도!",
            "implication": "최대 용오름 전환을 위해서는 연계 스킬을 반복해 와류를 미리 준비해야 합니다. 연계 쿨타임 증가나 생성물 지속 시간 감소 방향의 제약에서 준비 시간이 길어집니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "스킬 게이지 반환의 사전 설치 의존",
            "evidence": "우당탕탕 파도!는 스킬 게이지 100포인트를 소모하고, 스킬 게이지 반환은 주변 와류를 소모해 용오름을 생성할 때 와류마다 20포인트씩 발생합니다.",
            "affected": "우당탕탕 파도! · 야, 강물! 도와줘!",
            "implication": "와류가 없는 상태에서는 배틀 스킬의 게이지 반환을 얻지 못합니다. 기본 최대 2개의 와류를 모두 소모해도 반환량은 40포인트이므로 자연 회복이나 추가 수급이 필요합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "아츠 취약의 다중 용오름 조건",
            "evidence": "아츠 취약은 여러 개의 용오름이 생성될 때만 부여되며, 용오름 3개에서 10%가 명시되어 있습니다.",
            "affected": "우당탕탕 파도! · 풍랑의 주재자",
            "implication": "와류 준비가 끊기면 아츠 취약 지원도 함께 사라집니다. 소환물 수 제한이나 생성물 제거 방향의 제약에서 파티 지원 가치가 크게 낮아집니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "아츠 이상 발동 조건",
            "evidence": "매트릭스 이동은 아츠 이상 효과가 부여된 적이 있어야 사용할 수 있습니다.",
            "affected": "아케인 스태프 · 매트릭스 이동",
            "implication": "질베르타의 기본 스킬만으로는 아츠 이상을 직접 완성하지 못하므로 파티의 부착 조합과 이상 발동 속도에 의존합니다. 상태 부여가 막히거나 늦어지면 광역 집적과 띄우기 기회가 사라집니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "지속 시전과 준비 시간",
            "evidence": "중력 모드는 지속 시전 후 마지막 폭발에서 자연 부착을 부여합니다.",
            "affected": "아케인 스태프 · 중력 모드",
            "implication": "자연 부착과 마지막 타격 치유 조건이 시전 종료에 몰려 있습니다. 적이 범위를 벗어나거나 시전이 끊기면 핵심 후속 효과를 놓칠 수 있어 시전 시간 증가·행동 방해 방향의 제약에 약합니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "다수 대상 치유 조건",
            "evidence": "뒤늦은 편지는 중력 모드의 마지막 공격 또는 매트릭스 이동이 최소 2명의 적에게 명중해야 발동합니다.",
            "affected": "뒤늦은 편지",
            "implication": "단일 보스전이나 적이 흩어진 상황에서는 치유가 발동하지 않습니다. 적을 모으는 스킬과 실제 명중 수를 함께 확보해야 하므로 안정적인 전담 회복 수단으로 보기 어렵습니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "방어 불능 파티 의존",
            "evidence": "중력장의 추가 아츠 취약은 목표의 방어 불능 스택에 따라 증가합니다.",
            "affected": "아케인 스태프 · 중력장 · P2",
            "implication": "기본 아츠 취약은 제공하지만 최대 효율에는 물리 이상과 방어 불능 누적을 담당할 동료가 필요합니다. 방어 불능 축적이 어려운 적이나 물리 이상이 제한되는 전투에서는 강화 폭이 줄어듭니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "궁극기·잠재력 의존",
            "evidence": "강한 감속과 아츠 취약은 궁극기에 집중되어 있고 P2·P3·P5가 취약, 충전, 연계 주기를 크게 강화합니다.",
            "affected": "중력장 · P2 · P3 · P5",
            "implication": "궁극기 에너지 수급이 느려지거나 쿨타임이 늘면 주요 지원 공백이 커집니다. 방어 불능 연동 취약과 연계 회전은 잠재력 단계에 따라 체감 차이가 큽니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "강력한 일격 발동 의존",
            "evidence": "지원 결정체의 치유는 메인 컨트롤 오퍼레이터가 적에게 강력한 일격 피해를 준 후에만 발동합니다.",
            "affected": "디도스 · 스트레스 테스트",
            "implication": "강력한 일격을 자주 사용하지 못하면 치유 2회를 소모하지 못해 연계 스킬 조건도 늦어집니다. 공격 단계 증가나 강력한 일격 봉쇄 방향의 제약에 취약합니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "연계 스킬의 2회 치유 선행 조건",
            "evidence": "스트레스 테스트는 지원 결정체의 생명력 회복 횟수를 모두 소모해야 사용할 수 있으며, 결정체의 회복은 최대 2회 발동합니다.",
            "affected": "디도스 · 스트레스 테스트",
            "implication": "쿨타임이 8초여도 치유 2회를 먼저 발동하지 못하면 연계 스킬을 사용할 수 없습니다. 피해가 적거나 공격 기회가 끊기는 전투에서는 순환이 지연될 수 있습니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "아츠 증폭의 최대 생명력 조건",
            "evidence": "디도스의 아츠 증폭 9%는 회복 효과가 발동할 때 메인 컨트롤 오퍼레이터의 생명력이 최대치에 도달한 상태여야 부여되며 중첩되지 않습니다.",
            "affected": "디도스 · P1",
            "implication": "생명력이 계속 감소하는 환경에서는 치유는 작동해도 아츠 증폭을 얻기 어렵습니다. 지속 피해나 최대 생명력 유지 방해 방향의 제약이 지원 화력을 낮춥니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "냉기 상태 사전 준비",
            "evidence": "가동 프로세스는 스트레스 테스트가 명중할 때 목표가 냉기 부착 또는 동결 상태여야 받는 냉기 피해 +10%를 부여합니다.",
            "affected": "스트레스 테스트 · 가동 프로세스",
            "implication": "연계 스킬 자체가 냉기 부착을 부여하더라도 명중 시점의 상태 판정이 중요하므로, 안정적인 발동을 위해 다른 냉기 부착·동결 공급과 순서를 맞추는 편이 안전합니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "냉기·자연 파티 조합 의존",
            "evidence": "스택 오버플로의 공격 지원은 팀 전체의 냉기 증폭과 자연 증폭에 한정되며 지능으로 강화됩니다.",
            "affected": "스택 오버플로 · P5",
            "implication": "물리·열기·전기 중심 파티에서는 궁극기의 증폭 효과를 충분히 활용하기 어렵습니다. 속성 혼합 제한이나 지능 감소 방향의 제약에서 지원 가치가 낮아집니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "제한적인 정화 범위",
            "evidence": "프리징 프로토콜은 팀 전체의 냉기 부착과 동결 상태만 정화합니다.",
            "affected": "프리징 프로토콜 · 스택 오버플로",
            "implication": "다른 이상 효과는 제거하지 못하므로 범용 정화 역할을 완전히 대신할 수 없습니다. 냉기·동결 외 상태 이상이 중심인 전투에서는 재능의 효용이 제한됩니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "잠재력에 따른 지원 상한",
            "evidence": "P1은 아츠 증폭을 추가로 5% 높이고, P3은 연계 스킬을 추가 목표에 튕기며, P5는 궁극기의 증폭 효과를 1.1배로 강화합니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 상태에서도 치유와 속성 증폭을 제공하지만 다중 대상 연계와 아츠·속성 증폭의 상한은 관련 잠재력에 크게 좌우됩니다."
          }
        ]
      },
      {
        "title": "스킬 게이지·궁극기 순환",
        "entries": [
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "axis": "냉기·자연 부착 스택 의존",
            "evidence": "얼음 폭탄 · β형의 강제 동결과 스택 비례 피해·궁극기 에너지 획득은 냉기 부착 또는 자연 부착을 보유한 대상의 모든 아츠 부착을 소모해야 발동합니다.",
            "affected": "얼음 폭탄 · β형 · 하이테크 버스트",
            "implication": "부착이 충분히 쌓이지 않은 대상에서는 배틀 스킬의 피해와 궁극기 에너지 수급이 줄어듭니다. 아츠 부착 부여량 감소나 부착 소모 방해 방향의 제약에 민감합니다."
          },
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "axis": "높은 궁극기 에너지 요구량",
            "evidence": "아이스 슈터는 궁극기 에너지 220이 필요하며, 주요 에너지 수급원은 얼음 폭탄 · β형과 꽁꽁이 · υ37입니다.",
            "affected": "아이스 슈터 · 얼음 폭탄 · β형 · 꽁꽁이 · υ37",
            "implication": "부착 소모나 연계 스킬 발동이 끊기면 궁극기 회전이 크게 늦어집니다. 궁극기 에너지 획득 감소나 연계 쿨타임 증가 방향의 제약이 특히 불리합니다."
          },
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "axis": "대상 수에 따른 자원 효율 제한",
            "evidence": "얼음 폭탄 · β형과 꽁꽁이 · υ37은 여러 목표를 명중해도 궁극기 에너지를 1회만 획득하며, P4의 스킬 게이지 반환은 폭발이 단일 목표에 명중했을 때만 발동합니다.",
            "affected": "얼음 폭탄 · β형 · 꽁꽁이 · υ37 · P4",
            "implication": "다수전에서 제어 범위는 넓어도 에너지 획득량은 대상 수만큼 늘지 않으며, P4의 게이지 반환은 오히려 단일 대상에서만 얻을 수 있습니다."
          },
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "axis": "잠재력에 따른 궁극기 완성도",
            "evidence": "P1은 연계 범위·추가 방출·궁극기 에너지를 늘리고, P3은 빙점의 치명타 피해를 강화하며, P5는 궁극기 중 공격력과 치명타 피해를 증가시킵니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 상태에서도 동결 순환은 가능하지만, 연계 제어와 궁극기 에너지 회수·집중 화력의 상한은 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "와류 준비 시간과 최대 수량",
            "evidence": "야, 강물! 도와줘!로 와류를 한 번에 1개 생성하며 필드에는 최대 2개만 존재하고, 연계 스킬의 쿨타임은 12초입니다.",
            "affected": "야, 강물! 도와줘! · 우당탕탕 파도!",
            "implication": "최대 용오름 전환을 위해서는 연계 스킬을 반복해 와류를 미리 준비해야 합니다. 연계 쿨타임 증가나 생성물 지속 시간 감소 방향의 제약에서 준비 시간이 길어집니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "스킬 게이지 반환의 사전 설치 의존",
            "evidence": "우당탕탕 파도!는 스킬 게이지 100포인트를 소모하고, 스킬 게이지 반환은 주변 와류를 소모해 용오름을 생성할 때 와류마다 20포인트씩 발생합니다.",
            "affected": "우당탕탕 파도! · 야, 강물! 도와줘!",
            "implication": "와류가 없는 상태에서는 배틀 스킬의 게이지 반환을 얻지 못합니다. 기본 최대 2개의 와류를 모두 소모해도 반환량은 40포인트이므로 자연 회복이나 추가 수급이 필요합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "잠재력에 따른 순환 효율",
            "evidence": "P1은 연계 쿨타임과 와류당 추가 게이지 반환을 개선하고, P3은 아츠 취약을 강화하며, P5는 궁극기와 궁극기 생성 용오름의 피해를 강화합니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 구조는 완성되어 있지만 와류 회전·아츠 취약 수치·궁극기 폭발력의 상한은 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "다수 대상 치유 조건",
            "evidence": "뒤늦은 편지는 중력 모드의 마지막 공격 또는 매트릭스 이동이 최소 2명의 적에게 명중해야 발동합니다.",
            "affected": "뒤늦은 편지",
            "implication": "단일 보스전이나 적이 흩어진 상황에서는 치유가 발동하지 않습니다. 적을 모으는 스킬과 실제 명중 수를 함께 확보해야 하므로 안정적인 전담 회복 수단으로 보기 어렵습니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "궁극기·잠재력 의존",
            "evidence": "강한 감속과 아츠 취약은 궁극기에 집중되어 있고 P2·P3·P5가 취약, 충전, 연계 주기를 크게 강화합니다.",
            "affected": "중력장 · P2 · P3 · P5",
            "implication": "궁극기 에너지 수급이 느려지거나 쿨타임이 늘면 주요 지원 공백이 커집니다. 방어 불능 연동 취약과 연계 회전은 잠재력 단계에 따라 체감 차이가 큽니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "연계 스킬의 2회 치유 선행 조건",
            "evidence": "스트레스 테스트는 지원 결정체의 생명력 회복 횟수를 모두 소모해야 사용할 수 있으며, 결정체의 회복은 최대 2회 발동합니다.",
            "affected": "디도스 · 스트레스 테스트",
            "implication": "쿨타임이 8초여도 치유 2회를 먼저 발동하지 못하면 연계 스킬을 사용할 수 없습니다. 피해가 적거나 공격 기회가 끊기는 전투에서는 순환이 지연될 수 있습니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "아츠 증폭의 최대 생명력 조건",
            "evidence": "디도스의 아츠 증폭 9%는 회복 효과가 발동할 때 메인 컨트롤 오퍼레이터의 생명력이 최대치에 도달한 상태여야 부여되며 중첩되지 않습니다.",
            "affected": "디도스 · P1",
            "implication": "생명력이 계속 감소하는 환경에서는 치유는 작동해도 아츠 증폭을 얻기 어렵습니다. 지속 피해나 최대 생명력 유지 방해 방향의 제약이 지원 화력을 낮춥니다."
          }
        ]
      },
      {
        "title": "위치·대상 수",
        "entries": [
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "axis": "대상 수에 따른 자원 효율 제한",
            "evidence": "얼음 폭탄 · β형과 꽁꽁이 · υ37은 여러 목표를 명중해도 궁극기 에너지를 1회만 획득하며, P4의 스킬 게이지 반환은 폭발이 단일 목표에 명중했을 때만 발동합니다.",
            "affected": "얼음 폭탄 · β형 · 꽁꽁이 · υ37 · P4",
            "implication": "다수전에서 제어 범위는 넓어도 에너지 획득량은 대상 수만큼 늘지 않으며, P4의 게이지 반환은 오히려 단일 대상에서만 얻을 수 있습니다."
          },
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "axis": "잠재력에 따른 궁극기 완성도",
            "evidence": "P1은 연계 범위·추가 방출·궁극기 에너지를 늘리고, P3은 빙점의 치명타 피해를 강화하며, P5는 궁극기 중 공격력과 치명타 피해를 증가시킵니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 상태에서도 동결 순환은 가능하지만, 연계 제어와 궁극기 에너지 회수·집중 화력의 상한은 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "스킬 게이지 반환의 사전 설치 의존",
            "evidence": "우당탕탕 파도!는 스킬 게이지 100포인트를 소모하고, 스킬 게이지 반환은 주변 와류를 소모해 용오름을 생성할 때 와류마다 20포인트씩 발생합니다.",
            "affected": "우당탕탕 파도! · 야, 강물! 도와줘!",
            "implication": "와류가 없는 상태에서는 배틀 스킬의 게이지 반환을 얻지 못합니다. 기본 최대 2개의 와류를 모두 소모해도 반환량은 40포인트이므로 자연 회복이나 추가 수급이 필요합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "위치 기반 가속·감속",
            "evidence": "의기투합의 가속과 감속은 와류 주변 5미터에서 적용되고 범위를 벗어난 뒤 3초만 유지됩니다.",
            "affected": "의기투합 · 와류",
            "implication": "전투 위치가 와류에서 멀어지거나 적이 크게 이동하면 지원 효과를 계속 받기 어렵습니다. 적 이동 증가나 설치물 범위 축소 방향의 제약에 취약합니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "지속 시전과 준비 시간",
            "evidence": "중력 모드는 지속 시전 후 마지막 폭발에서 자연 부착을 부여합니다.",
            "affected": "아케인 스태프 · 중력 모드",
            "implication": "자연 부착과 마지막 타격 치유 조건이 시전 종료에 몰려 있습니다. 적이 범위를 벗어나거나 시전이 끊기면 핵심 후속 효과를 놓칠 수 있어 시전 시간 증가·행동 방해 방향의 제약에 약합니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "다수 대상 치유 조건",
            "evidence": "뒤늦은 편지는 중력 모드의 마지막 공격 또는 매트릭스 이동이 최소 2명의 적에게 명중해야 발동합니다.",
            "affected": "뒤늦은 편지",
            "implication": "단일 보스전이나 적이 흩어진 상황에서는 치유가 발동하지 않습니다. 적을 모으는 스킬과 실제 명중 수를 함께 확보해야 하므로 안정적인 전담 회복 수단으로 보기 어렵습니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "연계 스킬의 2회 치유 선행 조건",
            "evidence": "스트레스 테스트는 지원 결정체의 생명력 회복 횟수를 모두 소모해야 사용할 수 있으며, 결정체의 회복은 최대 2회 발동합니다.",
            "affected": "디도스 · 스트레스 테스트",
            "implication": "쿨타임이 8초여도 치유 2회를 먼저 발동하지 못하면 연계 스킬을 사용할 수 없습니다. 피해가 적거나 공격 기회가 끊기는 전투에서는 순환이 지연될 수 있습니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "냉기 상태 사전 준비",
            "evidence": "가동 프로세스는 스트레스 테스트가 명중할 때 목표가 냉기 부착 또는 동결 상태여야 받는 냉기 피해 +10%를 부여합니다.",
            "affected": "스트레스 테스트 · 가동 프로세스",
            "implication": "연계 스킬 자체가 냉기 부착을 부여하더라도 명중 시점의 상태 판정이 중요하므로, 안정적인 발동을 위해 다른 냉기 부착·동결 공급과 순서를 맞추는 편이 안전합니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "제한적인 정화 범위",
            "evidence": "프리징 프로토콜은 팀 전체의 냉기 부착과 동결 상태만 정화합니다.",
            "affected": "프리징 프로토콜 · 스택 오버플로",
            "implication": "다른 이상 효과는 제거하지 못하므로 범용 정화 역할을 완전히 대신할 수 없습니다. 냉기·동결 외 상태 이상이 중심인 전투에서는 재능의 효용이 제한됩니다."
          }
        ]
      },
      {
        "title": "생존·피격 조건",
        "entries": [
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "지속 제어와 조기 폭발의 선택",
            "evidence": "고대의 진은 4초 동안 적을 묶고 피해를 주지만, 낙하 공격을 사용하면 변화가 중단되고 거대한 파도가 예정보다 일찍 발생합니다.",
            "affected": "대당가께서 지켜보고 계신다!",
            "implication": "조기 폭발을 선택하면 강화된 파도와 용오름을 빠르게 얻는 대신 남은 지속 제어 구간을 끝내게 됩니다. 생존이나 제어 유지가 중요한 상황에서는 발동 시점을 조절해야 합니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "지속 시전과 준비 시간",
            "evidence": "중력 모드는 지속 시전 후 마지막 폭발에서 자연 부착을 부여합니다.",
            "affected": "아케인 스태프 · 중력 모드",
            "implication": "자연 부착과 마지막 타격 치유 조건이 시전 종료에 몰려 있습니다. 적이 범위를 벗어나거나 시전이 끊기면 핵심 후속 효과를 놓칠 수 있어 시전 시간 증가·행동 방해 방향의 제약에 약합니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "다수 대상 치유 조건",
            "evidence": "뒤늦은 편지는 중력 모드의 마지막 공격 또는 매트릭스 이동이 최소 2명의 적에게 명중해야 발동합니다.",
            "affected": "뒤늦은 편지",
            "implication": "단일 보스전이나 적이 흩어진 상황에서는 치유가 발동하지 않습니다. 적을 모으는 스킬과 실제 명중 수를 함께 확보해야 하므로 안정적인 전담 회복 수단으로 보기 어렵습니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "강력한 일격 발동 의존",
            "evidence": "지원 결정체의 치유는 메인 컨트롤 오퍼레이터가 적에게 강력한 일격 피해를 준 후에만 발동합니다.",
            "affected": "디도스 · 스트레스 테스트",
            "implication": "강력한 일격을 자주 사용하지 못하면 치유 2회를 소모하지 못해 연계 스킬 조건도 늦어집니다. 공격 단계 증가나 강력한 일격 봉쇄 방향의 제약에 취약합니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "연계 스킬의 2회 치유 선행 조건",
            "evidence": "스트레스 테스트는 지원 결정체의 생명력 회복 횟수를 모두 소모해야 사용할 수 있으며, 결정체의 회복은 최대 2회 발동합니다.",
            "affected": "디도스 · 스트레스 테스트",
            "implication": "쿨타임이 8초여도 치유 2회를 먼저 발동하지 못하면 연계 스킬을 사용할 수 없습니다. 피해가 적거나 공격 기회가 끊기는 전투에서는 순환이 지연될 수 있습니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "아츠 증폭의 최대 생명력 조건",
            "evidence": "디도스의 아츠 증폭 9%는 회복 효과가 발동할 때 메인 컨트롤 오퍼레이터의 생명력이 최대치에 도달한 상태여야 부여되며 중첩되지 않습니다.",
            "affected": "디도스 · P1",
            "implication": "생명력이 계속 감소하는 환경에서는 치유는 작동해도 아츠 증폭을 얻기 어렵습니다. 지속 피해나 최대 생명력 유지 방해 방향의 제약이 지원 화력을 낮춥니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "잠재력에 따른 지원 상한",
            "evidence": "P1은 아츠 증폭을 추가로 5% 높이고, P3은 연계 스킬을 추가 목표에 튕기며, P5는 궁극기의 증폭 효과를 1.1배로 강화합니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 상태에서도 치유와 속성 증폭을 제공하지만 다중 대상 연계와 아츠·속성 증폭의 상한은 관련 잠재력에 크게 좌우됩니다."
          }
        ]
      },
      {
        "title": "잠재력 의존",
        "entries": [
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "axis": "대상 수에 따른 자원 효율 제한",
            "evidence": "얼음 폭탄 · β형과 꽁꽁이 · υ37은 여러 목표를 명중해도 궁극기 에너지를 1회만 획득하며, P4의 스킬 게이지 반환은 폭발이 단일 목표에 명중했을 때만 발동합니다.",
            "affected": "얼음 폭탄 · β형 · 꽁꽁이 · υ37 · P4",
            "implication": "다수전에서 제어 범위는 넓어도 에너지 획득량은 대상 수만큼 늘지 않으며, P4의 게이지 반환은 오히려 단일 대상에서만 얻을 수 있습니다."
          },
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "axis": "잠재력에 따른 궁극기 완성도",
            "evidence": "P1은 연계 범위·추가 방출·궁극기 에너지를 늘리고, P3은 빙점의 치명타 피해를 강화하며, P5는 궁극기 중 공격력과 치명타 피해를 증가시킵니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 상태에서도 동결 순환은 가능하지만, 연계 제어와 궁극기 에너지 회수·집중 화력의 상한은 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "잠재력에 따른 순환 효율",
            "evidence": "P1은 연계 쿨타임과 와류당 추가 게이지 반환을 개선하고, P3은 아츠 취약을 강화하며, P5는 궁극기와 궁극기 생성 용오름의 피해를 강화합니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 구조는 완성되어 있지만 와류 회전·아츠 취약 수치·궁극기 폭발력의 상한은 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "역할군 제한 지원",
            "evidence": "전달자의 노래는 가드·캐스터·서포터 오퍼레이터에게만 궁극기 충전 효율을 제공합니다.",
            "affected": "전달자의 노래 · P3",
            "implication": "디펜더·스트라이커·뱅가드 중심 조합에서는 재능과 P3의 가치가 낮아집니다. 파티 역할군 구성이 바뀌면 핵심 지원 효과의 수혜 인원이 크게 달라집니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "궁극기·잠재력 의존",
            "evidence": "강한 감속과 아츠 취약은 궁극기에 집중되어 있고 P2·P3·P5가 취약, 충전, 연계 주기를 크게 강화합니다.",
            "affected": "중력장 · P2 · P3 · P5",
            "implication": "궁극기 에너지 수급이 느려지거나 쿨타임이 늘면 주요 지원 공백이 커집니다. 방어 불능 연동 취약과 연계 회전은 잠재력 단계에 따라 체감 차이가 큽니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "잠재력에 따른 지원 상한",
            "evidence": "P1은 아츠 증폭을 추가로 5% 높이고, P3은 연계 스킬을 추가 목표에 튕기며, P5는 궁극기의 증폭 효과를 1.1배로 강화합니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 상태에서도 치유와 속성 증폭을 제공하지만 다중 대상 연계와 아츠·속성 증폭의 상한은 관련 잠재력에 크게 좌우됩니다."
          }
        ]
      }
    ],
    "discoveries": [
      {
        "character": {
          "id": "yvonne",
          "name": "이본"
        },
        "title": "배틀 스킬 재평가",
        "description": "현재 순환은 궁극기 비중이 높지만, 배틀 스킬은 냉기 피해·냉기 부착 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "배틀 스킬"
      },
      {
        "character": {
          "id": "tangtang",
          "name": "탕탕"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 배틀 스킬 비중이 높지만, 연계 스킬은 냉기 부착 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "gilberta",
          "name": "질베르타"
        },
        "title": "궁극기 재평가",
        "description": "현재 순환은 일반 공격 비중이 높지만, 궁극기은 방어 불능·아츠 취약 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "궁극기"
      },
      {
        "character": {
          "id": "xaihi",
          "name": "자이히"
        },
        "title": "배틀 스킬 재평가",
        "description": "현재 순환은 연계 스킬 비중이 높지만, 배틀 스킬은 아츠 증폭·메인 컨트롤 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "배틀 스킬"
      }
    ],
    "designHints": [
      {
        "id": "normal",
        "title": "일반 공격 의존도",
        "pressure": "일반 공격 피해 비중을 낮추는 방향",
        "impact": "강화 상태나 메인 컨트롤 중 일반 공격에 몰린 화력 구간이 짧아집니다.",
        "opportunity": "이본의 배틀 스킬, 탕탕의 연계 스킬처럼 연계·배틀 스킬 중심의 보조 축이 상대적으로 중요해질 수 있습니다.",
        "caution": "일반 공격과 강력한 일격을 동시에 완전히 막으면 스킬 게이지 회복과 불균형 순환까지 함께 끊길 수 있습니다.",
        "characters": [
          {
            "id": "yvonne",
            "name": "이본"
          }
        ]
      },
      {
        "id": "ultimate",
        "title": "궁극기 반복 의존도",
        "pressure": "궁극기 반복 사용의 효율이 점차 낮아지는 방향",
        "impact": "궁극기를 중심으로 한 강화 구간과 마무리 빈도가 줄어듭니다.",
        "opportunity": "궁극기 에너지를 다른 가치로 돌리거나 배틀·연계 스킬을 주력화하는 운용을 찾게 됩니다.",
        "caution": "첫 궁극기까지 무력화하면 준비 과정의 의미도 사라질 수 있으므로 반복 효율을 조절하는 편이 발견을 만들기 쉽습니다.",
        "characters": [
          {
            "id": "yvonne",
            "name": "이본"
          },
          {
            "id": "tangtang",
            "name": "탕탕"
          },
          {
            "id": "xaihi",
            "name": "자이히"
          }
        ]
      },
      {
        "id": "battle",
        "title": "배틀 스킬 피해 비중",
        "pressure": "배틀 스킬의 직접 피해를 줄이되 연계 스킬 순환은 열어주는 방향",
        "impact": "스킬 게이지를 사용해 즉시 내는 화력이 줄어듭니다.",
        "opportunity": "배틀 스킬을 상태 생성·변환 용도로만 쓰고, 연계 스킬이나 궁극기 외 추가 피해를 주력으로 삼는 구조가 떠오를 수 있습니다.",
        "caution": "배틀 스킬의 상태 부여까지 막으면 후속 연계 조건 자체가 사라질 수 있습니다.",
        "characters": [
          {
            "id": "yvonne",
            "name": "이본"
          },
          {
            "id": "tangtang",
            "name": "탕탕"
          },
          {
            "id": "xaihi",
            "name": "자이히"
          }
        ]
      },
      {
        "id": "link",
        "title": "연계 스킬 빈도",
        "pressure": "연계 스킬 사용 빈도와 쿨타임을 크게 흔드는 방향",
        "impact": "조건을 자주 열 수 있는 파티일수록 순환 속도가 크게 달라집니다.",
        "opportunity": "연계 횟수가 늘어날 때 생기는 자원 수급과 보조 피해, 반대로 연계에 대가가 생길 때의 대체 순서를 비교할 수 있습니다.",
        "caution": "연계 조건과 쿨타임을 동시에 막으면 조합의 상호작용이 사라질 수 있습니다.",
        "characters": [
          {
            "id": "yvonne",
            "name": "이본"
          },
          {
            "id": "tangtang",
            "name": "탕탕"
          },
          {
            "id": "xaihi",
            "name": "자이히"
          }
        ]
      },
      {
        "id": "stack",
        "title": "부착·방어 불능 축적 속도",
        "pressure": "같은 대상에게 스택을 연속으로 쌓는 속도를 제한하는 방향",
        "impact": "최대 스택을 전제로 하는 동결·강타·갑옷 파괴·취약 발동 시점이 늦어집니다.",
        "opportunity": "낮은 스택에서 바로 작동하는 스킬, 강제 이상, 직접 부여 효과의 가치가 올라갈 수 있습니다.",
        "caution": "부착 자체를 금지하면 대체 운용이 아니라 파티의 핵심 문법을 삭제하게 됩니다.",
        "characters": [
          {
            "id": "yvonne",
            "name": "이본"
          },
          {
            "id": "tangtang",
            "name": "탕탕"
          },
          {
            "id": "gilberta",
            "name": "질베르타"
          },
          {
            "id": "xaihi",
            "name": "자이히"
          }
        ]
      }
    ],
    "mechanicProfile": {
      "mechanicIds": [
        "freeze",
        "frostInfliction",
        "ultimate",
        "mainControl",
        "natureInfliction",
        "artsInfliction",
        "powerStrike",
        "ultimateEnergy",
        "frostDamage",
        "artsVulnerability",
        "slow",
        "healing",
        "generalAttack",
        "skillGauge",
        "combustion",
        "shock",
        "corrosion",
        "artsAbnormality",
        "launch",
        "defenseless",
        "artsAmplification",
        "natureAmplification",
        "cleanse",
        "haste",
        "artsDamage"
      ],
      "mechanicScores": {
        "freeze": 30,
        "frostInfliction": 26,
        "ultimate": 20,
        "mainControl": 18,
        "natureInfliction": 17.5,
        "artsInfliction": 16.5,
        "powerStrike": 16.5,
        "ultimateEnergy": 16,
        "frostDamage": 9,
        "artsVulnerability": 9,
        "slow": 9,
        "healing": 7.5,
        "generalAttack": 7.5,
        "skillGauge": 6.5,
        "combustion": 6,
        "shock": 6,
        "corrosion": 6,
        "artsAbnormality": 5.5,
        "launch": 5.5,
        "defenseless": 4.5,
        "artsAmplification": 4.5,
        "natureAmplification": 4.5,
        "cleanse": 4.5,
        "haste": 4.5,
        "artsDamage": 3,
        "physicalDamage": 0,
        "heatDamage": 0,
        "electricDamage": 0,
        "natureDamage": 0,
        "heatInfliction": 0,
        "electricInfliction": 0,
        "knockdown": 0,
        "smash": 0,
        "armorBreak": 0,
        "imbalance": 0,
        "execution": 0,
        "physicalVulnerability": 0,
        "heatVulnerability": 0,
        "electricVulnerability": 0,
        "frostVulnerability": 0,
        "natureVulnerability": 0,
        "physicalAmplification": 0,
        "heatAmplification": 0,
        "electricAmplification": 0,
        "frostAmplification": 0,
        "skillGaugeReturn": 0,
        "protection": 0,
        "fortification": 0,
        "weakness": 0,
        "comboHit": 0,
        "originiumCrystal": 0,
        "battleSkill": 0,
        "linkSkill": 0
      },
      "dominantAction": "ultimate",
      "actionTotals": {
        "generalAttack": 8,
        "battleSkill": 16,
        "linkSkill": 16,
        "ultimate": 20
      },
      "hintIds": [
        "normal",
        "ultimate",
        "battle",
        "link",
        "stack"
      ],
      "hintTitles": [
        "일반 공격 의존도",
        "궁극기 반복 의존도",
        "배틀 스킬 피해 비중",
        "연계 스킬 빈도",
        "부착·방어 불능 축적 속도"
      ],
      "weaknessAxes": [
        "냉기·자연 부착 스택 의존",
        "높은 궁극기 에너지 요구량",
        "동결 상태의 생성과 소모 순서",
        "메인 컨트롤 오퍼레이터 점유",
        "잠재력에 따른 궁극기 완성도",
        "와류 준비 시간과 최대 수량",
        "스킬 게이지 반환의 사전 설치 의존",
        "아츠 취약의 다중 용오름 조건",
        "아츠 이상 발동 조건",
        "지속 시전과 준비 시간",
        "다수 대상 치유 조건",
        "방어 불능 파티 의존",
        "궁극기·잠재력 의존",
        "강력한 일격 발동 의존",
        "연계 스킬의 2회 치유 선행 조건",
        "아츠 증폭의 최대 생명력 조건",
        "냉기 상태 사전 준비",
        "냉기·자연 파티 조합 의존",
        "제한적인 정화 범위",
        "잠재력에 따른 지원 상한",
        "냉기·자연 부착 스택 의존",
        "높은 궁극기 에너지 요구량",
        "대상 수에 따른 자원 효율 제한",
        "잠재력에 따른 궁극기 완성도",
        "와류 준비 시간과 최대 수량",
        "스킬 게이지 반환의 사전 설치 의존",
        "잠재력에 따른 순환 효율",
        "다수 대상 치유 조건",
        "궁극기·잠재력 의존",
        "연계 스킬의 2회 치유 선행 조건",
        "아츠 증폭의 최대 생명력 조건",
        "대상 수에 따른 자원 효율 제한",
        "잠재력에 따른 궁극기 완성도",
        "스킬 게이지 반환의 사전 설치 의존",
        "위치 기반 가속·감속",
        "지속 시전과 준비 시간",
        "다수 대상 치유 조건",
        "연계 스킬의 2회 치유 선행 조건",
        "냉기 상태 사전 준비",
        "제한적인 정화 범위",
        "지속 제어와 조기 폭발의 선택",
        "지속 시전과 준비 시간",
        "다수 대상 치유 조건",
        "강력한 일격 발동 의존",
        "연계 스킬의 2회 치유 선행 조건",
        "아츠 증폭의 최대 생명력 조건",
        "잠재력에 따른 지원 상한",
        "대상 수에 따른 자원 효율 제한",
        "잠재력에 따른 궁극기 완성도",
        "잠재력에 따른 순환 효율",
        "역할군 제한 지원",
        "궁극기·잠재력 의존",
        "잠재력에 따른 지원 상한"
      ],
      "dependencyLabels": [
        "동결",
        "냉기 부착",
        "자연 부착",
        "아츠 부착",
        "궁극기"
      ]
    }
  },
  {
    "schemaVersion": 1,
    "id": "party-laevatain-wolfguard-akekuri-adelia",
    "exportedAt": "2026-07-22T14:36:43.137Z",
    "title": "레바테인 · 울프가드 · 아케쿠리 · 아델리아 파티 분석",
    "party": [
      {
        "id": "laevatain",
        "name": "레바테인",
        "order": 1
      },
      {
        "id": "wolfguard",
        "name": "울프가드",
        "order": 2
      },
      {
        "id": "akekuri",
        "name": "아케쿠리",
        "order": 3
      },
      {
        "id": "adelia",
        "name": "아델리아",
        "order": 4
      }
    ],
    "summary": {
      "title": "파티 전투 구조 분석",
      "sentence": "열기 부착을 준비해 연소·부식 조건으로 전환하고, 연계 스킬·배틀 스킬에 화력을 모으는 파티입니다.",
      "dominantAction": "linkSkill",
      "actionTotals": {
        "generalAttack": 6,
        "battleSkill": 26,
        "linkSkill": 29,
        "ultimate": 24
      },
      "dependencies": [
        {
          "id": "combustion",
          "label": "연소",
          "color": "heat",
          "level": "매우 높음",
          "score": 19
        },
        {
          "id": "heatInfliction",
          "label": "열기 부착",
          "color": "heat",
          "level": "매우 높음",
          "score": 14.5
        },
        {
          "id": "skillGauge",
          "label": "스킬 게이지",
          "color": "cyan",
          "level": "매우 높음",
          "score": 13.5
        },
        {
          "id": "corrosion",
          "label": "부식",
          "color": "nature",
          "level": "매우 높음",
          "score": 11.5
        },
        {
          "id": "linkSkill",
          "label": "연계 스킬",
          "color": "purple",
          "level": "주력 행동",
          "score": 29
        }
      ]
    },
    "diagram": {
      "nodes": [
        {
          "order": 1,
          "character": {
            "id": "wolfguard",
            "name": "울프가드"
          },
          "skill": {
            "name": "폭렬 수류탄 · β형",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "아츠 상태 준비"
        },
        {
          "order": 2,
          "character": {
            "id": "adelia",
            "name": "아델리아"
          },
          "skill": {
            "name": "화산 분화",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "무상태 대상 포착"
        },
        {
          "order": 3,
          "character": {
            "id": "laevatain",
            "name": "레바테인"
          },
          "skill": {
            "name": "열화",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "상태 준비"
        },
        {
          "order": 4,
          "character": {
            "id": "akekuri",
            "name": "아케쿠리"
          },
          "skill": {
            "name": "섬광 돌진",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "불균형 준비"
        },
        {
          "order": 5,
          "character": {
            "id": "wolfguard",
            "name": "울프가드"
          },
          "skill": {
            "name": "탄흔의 열기",
            "type": "배틀 스킬",
            "typeId": "battleSkill",
            "index": 1
          },
          "title": "상태 소모 사격"
        },
        {
          "order": 6,
          "character": {
            "id": "wolfguard",
            "name": "울프가드"
          },
          "skill": {
            "name": "늑대의 분노",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "궁극기 재점화"
        },
        {
          "order": 7,
          "character": {
            "id": "akekuri",
            "name": "아케쿠리"
          },
          "skill": {
            "name": "소대, 집합!",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "궁극기 대량 회복"
        },
        {
          "order": 8,
          "character": {
            "id": "laevatain",
            "name": "레바테인"
          },
          "skill": {
            "name": "황혼",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "레바테인의 궁극기 유지"
        }
      ],
      "connections": [
        {
          "fromOrder": 1,
          "toOrder": 2,
          "label": "다음 조건 연결",
          "preparationRoutes": []
        },
        {
          "fromOrder": 2,
          "toOrder": 3,
          "label": "다음 조건 연결",
          "preparationRoutes": [
            {
              "character": {
                "id": "wolfguard",
                "name": "울프가드"
              },
              "skill": {
                "name": "탄흔의 열기",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "heatInfliction",
                  "label": "열기 부착"
                },
                {
                  "id": "combustion",
                  "label": "연소"
                }
              ],
              "summary": "목표를 연속으로 사격하여 소량의 열기 피해를 주고, 마지막 한 발은 열기 부착 상태를 부여합니다."
            },
            {
              "character": {
                "id": "laevatain",
                "name": "레바테인"
              },
              "skill": {
                "name": "불타오르는 화염",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "combustion",
                  "label": "연소"
                }
              ],
              "summary": "이미 녹아내린 불꽃 4스택이 쌓였을 경우 마지막에 모든 스택 수치를 소모해 넓은 범위 내의 적에게 추가로 1회 공격하며, 열기 피해를 주고 짧은 강제 연소 상태를 부여합니다."
            },
            {
              "character": {
                "id": "akekuri",
                "name": "아케쿠리"
              },
              "skill": {
                "name": "열정 분출",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "heatInfliction",
                  "label": "열기 부착"
                }
              ],
              "summary": "전방으로 검을 휘둘러 열기 피해를 주고 열기 부착 상태를 부여합니다."
            },
            {
              "character": {
                "id": "adelia",
                "name": "아델리아"
              },
              "skill": {
                "name": "질주하는 돌리",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "corrosion",
                  "label": "부식"
                }
              ],
              "summary": "목표가 부식 상태라면 부식을 소모하고 대상에게 물리 취약과 아츠 취약 16%를 30초 동안 부여합니다."
            },
            {
              "character": {
                "id": "wolfguard",
                "name": "울프가드"
              },
              "skill": {
                "name": "폭렬 수류탄 · β형",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "heatInfliction",
                  "label": "열기 부착"
                }
              ],
              "summary": "아츠 부착 상태를 부여한 적이 있을 때 사용할 수 있습니다. 근처 범위 내의 적에게 열기 피해를 주고 열기 부착 상태를 부여합니다."
            },
            {
              "character": {
                "id": "adelia",
                "name": "아델리아"
              },
              "skill": {
                "name": "화산 분화",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "corrosion",
                  "label": "부식"
                }
              ],
              "summary": "메인 컨트롤 오퍼레이터가 방어 불능 혹은 아츠 부착 상태에 처해 있지 않은 적에게 강력한 일격을 준 후 사용할 수 있습니다. 화산 구름은 목표를 추적한 뒤 폭발하여 주변의 다른 적에게 절반의 자연 피해를 주고 강제로 7초 동안 부식 상태를 부여합니다."
            }
          ]
        },
        {
          "fromOrder": 3,
          "toOrder": 4,
          "label": "다음 조건 연결",
          "preparationRoutes": [
            {
              "character": {
                "id": "laevatain",
                "name": "레바테인"
              },
              "skill": {
                "name": "재",
                "type": "일반 공격",
                "typeId": "generalAttack",
                "index": 0
              },
              "matchedMechanics": [
                {
                  "id": "imbalance",
                  "label": "불균형"
                }
              ],
              "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때 일반 공격을 사용하면 해당 적을 처형하여 대량의 열기 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 18포인트의 불균형 피해를 줍니다."
            },
            {
              "character": {
                "id": "wolfguard",
                "name": "울프가드"
              },
              "skill": {
                "name": "다중 연사",
                "type": "일반 공격",
                "typeId": "generalAttack",
                "index": 0
              },
              "matchedMechanics": [
                {
                  "id": "imbalance",
                  "label": "불균형"
                }
              ],
              "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때, 일반 공격을 사용하면 해당 적을 처형하여 대량의 열기 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 18포인트의 불균형 피해를 줍니다."
            },
            {
              "character": {
                "id": "akekuri",
                "name": "아케쿠리"
              },
              "skill": {
                "name": "진취의 검날",
                "type": "일반 공격",
                "typeId": "generalAttack",
                "index": 0
              },
              "matchedMechanics": [
                {
                  "id": "imbalance",
                  "label": "불균형"
                }
              ],
              "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때, 일반 공격을 사용하면 해당 적을 처형하여 대량의 물리 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 17포인트의 불균형 피해를 줍니다."
            },
            {
              "character": {
                "id": "adelia",
                "name": "아델리아"
              },
              "skill": {
                "name": "바위의 속삭임",
                "type": "일반 공격",
                "typeId": "generalAttack",
                "index": 0
              },
              "matchedMechanics": [
                {
                  "id": "imbalance",
                  "label": "불균형"
                }
              ],
              "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때, 일반 공격을 사용하면 해당 적을 처형하여 대량의 자연 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 18포인트의 불균형 피해를 줍니다."
            }
          ]
        },
        {
          "fromOrder": 4,
          "toOrder": 5,
          "label": "다음 조건 연결",
          "preparationRoutes": [
            {
              "character": {
                "id": "laevatain",
                "name": "레바테인"
              },
              "skill": {
                "name": "불타오르는 화염",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "combustion",
                  "label": "연소"
                }
              ],
              "summary": "이미 녹아내린 불꽃 4스택이 쌓였을 경우 마지막에 모든 스택 수치를 소모해 넓은 범위 내의 적에게 추가로 1회 공격하며, 열기 피해를 주고 짧은 강제 연소 상태를 부여합니다."
            },
            {
              "character": {
                "id": "laevatain",
                "name": "레바테인"
              },
              "skill": {
                "name": "열화",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "combustion",
                  "label": "연소"
                }
              ],
              "summary": "적이 연소 상태거나 부식 상태일 때 사용할 수 있습니다."
            },
            {
              "character": {
                "id": "wolfguard",
                "name": "울프가드"
              },
              "skill": {
                "name": "늑대의 분노",
                "type": "궁극기",
                "typeId": "ultimate",
                "index": 3
              },
              "matchedMechanics": [
                {
                  "id": "combustion",
                  "label": "연소"
                }
              ],
              "summary": "5회에 걸쳐 열기 피해를 주고 강제 연소 상태를 부여합니다."
            }
          ]
        },
        {
          "fromOrder": 5,
          "toOrder": 6,
          "label": "열기 피해",
          "preparationRoutes": []
        },
        {
          "fromOrder": 6,
          "toOrder": 7,
          "label": "다음 조건 연결",
          "preparationRoutes": []
        },
        {
          "fromOrder": 7,
          "toOrder": 8,
          "label": "스킬 게이지 재투자",
          "preparationRoutes": []
        }
      ]
    },
    "combatFlow": [
      {
        "order": 1,
        "character": {
          "id": "wolfguard",
          "name": "울프가드"
        },
        "stageIds": [
          "setup",
          "trigger",
          "convert"
        ],
        "title": "아츠 상태 준비",
        "detail": "연소 또는 감전 상태를 준비하거나, 연계 스킬로 열기 부착을 부여해 스킬 조건을 만든다.",
        "skill": {
          "name": "폭렬 수류탄 · β형",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "아츠 부착 상태를 부여한 적이 있을 때 사용할 수 있습니다.",
          "아츠 부착 적 존재"
        ],
        "timing": "",
        "effects": [
          "근처 범위 내의 적에게 열기 피해를 주고 열기 부착 상태를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "heatInfliction",
            "label": "열기 부착"
          },
          {
            "id": "combustion",
            "label": "연소"
          },
          {
            "id": "shock",
            "label": "감전"
          },
          {
            "id": "linkSkill",
            "label": "연계 스킬"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "skill": {
              "name": "탄흔의 열기",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "heatInfliction",
                "label": "열기 부착"
              },
              {
                "id": "combustion",
                "label": "연소"
              },
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "목표를 연속으로 사격하여 소량의 열기 피해를 주고, 마지막 한 발은 열기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "skill": {
              "name": "불타오르는 화염",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "combustion",
                "label": "연소"
              }
            ],
            "summary": "이미 녹아내린 불꽃 4스택이 쌓였을 경우 마지막에 모든 스택 수치를 소모해 넓은 범위 내의 적에게 추가로 1회 공격하며, 열기 피해를 주고 짧은 강제 연소 상태를 부여합니다."
          },
          {
            "character": {
              "id": "akekuri",
              "name": "아케쿠리"
            },
            "skill": {
              "name": "열정 분출",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "heatInfliction",
                "label": "열기 부착"
              }
            ],
            "summary": "전방으로 검을 휘둘러 열기 피해를 주고 열기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "skill": {
              "name": "열화",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "combustion",
                "label": "연소"
              }
            ],
            "summary": "적이 연소 상태거나 부식 상태일 때 사용할 수 있습니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "skill": {
              "name": "황혼",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "heatInfliction",
                "label": "열기 부착"
              }
            ],
            "summary": "메인 컨트롤 전환 · 지속형 모든 공격이 열기 피해를 주며, 3단계 일반 공격은 열기 부착 상태를 부여합니다. 레바테인의 연계 스킬의 마검을 소환하고 메인 컨트롤 오퍼레이터로 전환합니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "skill": {
              "name": "늑대의 분노",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "combustion",
                "label": "연소"
              }
            ],
            "summary": "5회에 걸쳐 열기 피해를 주고 강제 연소 상태를 부여합니다."
          }
        ]
      },
      {
        "order": 2,
        "character": {
          "id": "adelia",
          "name": "아델리아"
        },
        "stageIds": [
          "setup"
        ],
        "title": "무상태 대상 포착",
        "detail": "방어 불능과 아츠 부착이 없는 적에게 메인 컨트롤 오퍼레이터가 강력한 일격을 넣어 아델리아의 연계 스킬을 연다.",
        "skill": {
          "name": "화산 분화",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "메인 컨트롤 오퍼레이터가 방어 불능 혹은 아츠 부착 상태에 처해 있지 않은 적에게 강력한 일격을 준 후 사용할 수 있습니다.",
          "방어 불능·아츠 부착이 없는 적에게 강력한 일격"
        ],
        "timing": "",
        "effects": [
          "화산 구름은 목표를 추적한 뒤 폭발하여 주변의 다른 적에게 절반의 자연 피해를 주고 강제로 7초 동안 부식 상태를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "artsInfliction",
            "label": "아츠 부착"
          },
          {
            "id": "defenseless",
            "label": "방어 불능"
          },
          {
            "id": "powerStrike",
            "label": "강력한 일격"
          },
          {
            "id": "mainControl",
            "label": "메인 컨트롤"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 3,
        "character": {
          "id": "laevatain",
          "name": "레바테인"
        },
        "stageIds": [
          "setup",
          "convert"
        ],
        "title": "상태 준비",
        "detail": "열기 부착 또는 연소·부식 상태를 만든다.",
        "skill": {
          "name": "열화",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "적이 연소 상태거나 부식 상태일 때 사용할 수 있습니다.",
          "모든 연소 상태 혹은 부식 상태의 적의 발밑에서 불꽃이 솟아오르게 만들고 대상에게 열기 피해를 줍니다."
        ],
        "timing": "",
        "effects": [],
        "mechanics": [
          {
            "id": "heatInfliction",
            "label": "열기 부착"
          },
          {
            "id": "combustion",
            "label": "연소"
          },
          {
            "id": "corrosion",
            "label": "부식"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "skill": {
              "name": "탄흔의 열기",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "heatInfliction",
                "label": "열기 부착"
              },
              {
                "id": "combustion",
                "label": "연소"
              }
            ],
            "summary": "목표를 연속으로 사격하여 소량의 열기 피해를 주고, 마지막 한 발은 열기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "skill": {
              "name": "불타오르는 화염",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "combustion",
                "label": "연소"
              }
            ],
            "summary": "이미 녹아내린 불꽃 4스택이 쌓였을 경우 마지막에 모든 스택 수치를 소모해 넓은 범위 내의 적에게 추가로 1회 공격하며, 열기 피해를 주고 짧은 강제 연소 상태를 부여합니다."
          },
          {
            "character": {
              "id": "akekuri",
              "name": "아케쿠리"
            },
            "skill": {
              "name": "열정 분출",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "heatInfliction",
                "label": "열기 부착"
              }
            ],
            "summary": "전방으로 검을 휘둘러 열기 피해를 주고 열기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "skill": {
              "name": "질주하는 돌리",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "corrosion",
                "label": "부식"
              }
            ],
            "summary": "목표가 부식 상태라면 부식을 소모하고 대상에게 물리 취약과 아츠 취약 16%를 30초 동안 부여합니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "skill": {
              "name": "폭렬 수류탄 · β형",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "heatInfliction",
                "label": "열기 부착"
              }
            ],
            "summary": "아츠 부착 상태를 부여한 적이 있을 때 사용할 수 있습니다. 근처 범위 내의 적에게 열기 피해를 주고 열기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "skill": {
              "name": "화산 분화",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "corrosion",
                "label": "부식"
              }
            ],
            "summary": "메인 컨트롤 오퍼레이터가 방어 불능 혹은 아츠 부착 상태에 처해 있지 않은 적에게 강력한 일격을 준 후 사용할 수 있습니다. 화산 구름은 목표를 추적한 뒤 폭발하여 주변의 다른 적에게 절반의 자연 피해를 주고 강제로 7초 동안 부식 상태를 부여합니다."
          }
        ]
      },
      {
        "order": 4,
        "character": {
          "id": "akekuri",
          "name": "아케쿠리"
        },
        "stageIds": [
          "setup",
          "trigger",
          "payoff"
        ],
        "title": "불균형 준비",
        "detail": "팀의 공격으로 적을 불균형 상태로 만들거나 강적의 불균형 지점에 도달해 아케쿠리의 연계 스킬 조건을 만든다.",
        "skill": {
          "name": "섬광 돌진",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "불균형 상태 혹은 불균형 지점에 도달한 적이 있을 때 사용할 수 있습니다.",
          "불균형 상태·불균형 지점 조건"
        ],
        "timing": "",
        "effects": [
          "2번 연속 찌르기를 사용하여 각 공격마다 물리 피해를 주고 스킬 게이지 7.5포인트를 회복합니다."
        ],
        "mechanics": [
          {
            "id": "imbalance",
            "label": "불균형"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "skill": {
              "name": "재",
              "type": "일반 공격",
              "typeId": "generalAttack",
              "index": 0
            },
            "matchedMechanics": [
              {
                "id": "imbalance",
                "label": "불균형"
              }
            ],
            "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때 일반 공격을 사용하면 해당 적을 처형하여 대량의 열기 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 18포인트의 불균형 피해를 줍니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "skill": {
              "name": "다중 연사",
              "type": "일반 공격",
              "typeId": "generalAttack",
              "index": 0
            },
            "matchedMechanics": [
              {
                "id": "imbalance",
                "label": "불균형"
              }
            ],
            "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때, 일반 공격을 사용하면 해당 적을 처형하여 대량의 열기 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 18포인트의 불균형 피해를 줍니다."
          },
          {
            "character": {
              "id": "akekuri",
              "name": "아케쿠리"
            },
            "skill": {
              "name": "진취의 검날",
              "type": "일반 공격",
              "typeId": "generalAttack",
              "index": 0
            },
            "matchedMechanics": [
              {
                "id": "imbalance",
                "label": "불균형"
              }
            ],
            "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때, 일반 공격을 사용하면 해당 적을 처형하여 대량의 물리 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 17포인트의 불균형 피해를 줍니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "skill": {
              "name": "바위의 속삭임",
              "type": "일반 공격",
              "typeId": "generalAttack",
              "index": 0
            },
            "matchedMechanics": [
              {
                "id": "imbalance",
                "label": "불균형"
              }
            ],
            "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때, 일반 공격을 사용하면 해당 적을 처형하여 대량의 자연 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 18포인트의 불균형 피해를 줍니다."
          }
        ]
      },
      {
        "order": 5,
        "character": {
          "id": "wolfguard",
          "name": "울프가드"
        },
        "stageIds": [
          "convert"
        ],
        "title": "상태 소모 사격",
        "detail": "울프가드의 배틀 스킬로 연소·감전을 소모해 추가 1회 사격과 대량의 열기 피해를 발생시킨다.",
        "skill": {
          "name": "탄흔의 열기",
          "type": "배틀 스킬",
          "typeId": "battleSkill",
          "index": 1
        },
        "conditions": [],
        "timing": "",
        "effects": [
          "목표를 연속으로 사격하여 소량의 열기 피해를 주고, 마지막 한 발은 열기 부착 상태를 부여합니다.",
          "목표가 연소 또는 감전 상태일 경우 열기 부착 상태를 부여하지 않고, 해당 상태를 소모하여 추가로 1회 사격하며 대량의 열기 피해를 줍니다."
        ],
        "mechanics": [
          {
            "id": "heatDamage",
            "label": "열기 피해"
          },
          {
            "id": "combustion",
            "label": "연소"
          },
          {
            "id": "shock",
            "label": "감전"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "skill": {
              "name": "불타오르는 화염",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "combustion",
                "label": "연소"
              }
            ],
            "summary": "이미 녹아내린 불꽃 4스택이 쌓였을 경우 마지막에 모든 스택 수치를 소모해 넓은 범위 내의 적에게 추가로 1회 공격하며, 열기 피해를 주고 짧은 강제 연소 상태를 부여합니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "skill": {
              "name": "열화",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "combustion",
                "label": "연소"
              }
            ],
            "summary": "적이 연소 상태거나 부식 상태일 때 사용할 수 있습니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "skill": {
              "name": "늑대의 분노",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "combustion",
                "label": "연소"
              }
            ],
            "summary": "5회에 걸쳐 열기 피해를 주고 강제 연소 상태를 부여합니다."
          }
        ]
      },
      {
        "order": 6,
        "character": {
          "id": "wolfguard",
          "name": "울프가드"
        },
        "stageIds": [
          "setup",
          "trigger",
          "convert",
          "payoff",
          "recycle"
        ],
        "title": "궁극기 재점화",
        "detail": "울프가드의 궁극기로 주변 적에게 5회 열기 피해와 강제 연소를 부여하고, P5에서는 연계 스킬 쿨타임까지 초기화한다.",
        "skill": {
          "name": "늑대의 분노",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [],
        "timing": "적에게 필요한 부착·이상 상태를 준비하고, 주력 피해를 집중할 수 있을 때 사용합니다.",
        "effects": [
          "5회에 걸쳐 열기 피해를 주고 강제 연소 상태를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "heatDamage",
            "label": "열기 피해"
          },
          {
            "id": "combustion",
            "label": "연소"
          },
          {
            "id": "linkSkill",
            "label": "연계 스킬"
          },
          {
            "id": "ultimate",
            "label": "궁극기"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 7,
        "character": {
          "id": "akekuri",
          "name": "아케쿠리"
        },
        "stageIds": [
          "payoff",
          "recycle"
        ],
        "title": "궁극기 대량 회복",
        "detail": "아케쿠리의 궁극기의 신호탄 3발로 스킬 게이지를 총 80포인트 회복하고, 지속 중 연타를 획득한다.",
        "skill": {
          "name": "소대, 집합!",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [],
        "timing": "적에게 필요한 부착·이상 상태를 준비하고, 주력 피해를 집중할 수 있을 때 사용합니다.",
        "effects": [
          "발사할 때마다 일정량의 스킬 게이지를 회복하며, 3발의 총 회복량은 80포인트입니다."
        ],
        "mechanics": [
          {
            "id": "skillGauge",
            "label": "스킬 게이지"
          },
          {
            "id": "comboHit",
            "label": "연타"
          },
          {
            "id": "ultimate",
            "label": "궁극기"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 8,
        "character": {
          "id": "laevatain",
          "name": "레바테인"
        },
        "stageIds": [
          "convert",
          "payoff",
          "recycle"
        ],
        "title": "레바테인의 궁극기 유지",
        "detail": "메인 컨트롤로 전환해 강화 일반 공격을 이어가며 스킬 사용 중 지속시간 감소를 멈춘다.",
        "skill": {
          "name": "황혼",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [
          "메인 컨트롤 전환 · 지속형"
        ],
        "timing": "적에게 필요한 부착·이상 상태를 준비하고, 주력 피해를 집중할 수 있을 때 사용합니다.",
        "effects": [
          "레바테인의 연계 스킬의 마검을 소환하고 메인 컨트롤 오퍼레이터로 전환합니다.",
          "모든 공격이 열기 피해를 주며, 3단계 일반 공격은 열기 부착 상태를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "mainControl",
            "label": "메인 컨트롤"
          },
          {
            "id": "generalAttack",
            "label": "일반 공격"
          }
        ],
        "preparationRoutes": []
      }
    ],
    "supportFlow": [],
    "basicOperation": [
      {
        "order": 1,
        "title": "울프가드 · 연계 스킬",
        "detail": "연소 또는 감전 상태를 준비하거나, 연계 스킬로 열기 부착을 부여해 스킬 조건을 만든다."
      },
      {
        "order": 2,
        "title": "아델리아 · 연계 스킬",
        "detail": "방어 불능과 아츠 부착이 없는 적에게 메인 컨트롤 오퍼레이터가 강력한 일격을 넣어 아델리아의 연계 스킬을 연다."
      },
      {
        "order": 3,
        "title": "레바테인 · 연계 스킬",
        "detail": "열기 부착 또는 연소·부식 상태를 만든다."
      },
      {
        "order": 4,
        "title": "아케쿠리 · 연계 스킬",
        "detail": "팀의 공격으로 적을 불균형 상태로 만들거나 강적의 불균형 지점에 도달해 아케쿠리의 연계 스킬 조건을 만든다."
      },
      {
        "order": 5,
        "title": "울프가드 · 배틀 스킬",
        "detail": "울프가드의 배틀 스킬로 연소·감전을 소모해 추가 1회 사격과 대량의 열기 피해를 발생시킨다."
      },
      {
        "order": 6,
        "title": "울프가드 · 궁극기",
        "detail": "울프가드의 궁극기로 주변 적에게 5회 열기 피해와 강제 연소를 부여하고, P5에서는 연계 스킬 쿨타임까지 초기화한다."
      },
      {
        "order": 7,
        "title": "아케쿠리 · 궁극기",
        "detail": "아케쿠리의 궁극기의 신호탄 3발로 스킬 게이지를 총 80포인트 회복하고, 지속 중 연타를 획득한다."
      },
      {
        "order": 8,
        "title": "레바테인 · 궁극기",
        "detail": "메인 컨트롤로 전환해 강화 일반 공격을 이어가며 스킬 사용 중 지속시간 감소를 멈춘다."
      }
    ],
    "roles": [
      {
        "character": {
          "id": "laevatain",
          "name": "레바테인"
        },
        "labels": [
          "열기 부착 생성",
          "열기 피해·연소 소모",
          "연소·부식 활용",
          "전투 자원 순환"
        ],
        "relation": "울프가드의 열기 피해 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "wolfguard",
          "name": "울프가드"
        },
        "labels": [
          "열기 부착 생성",
          "열기 피해·열기 부착 소모",
          "연소·감전 활용",
          "전투 자원 순환"
        ],
        "relation": "레바테인의 열기 피해 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "akekuri",
          "name": "아케쿠리"
        },
        "labels": [
          "열기 부착 생성",
          "전투 자원 순환",
          "메인 컨트롤 후보"
        ],
        "relation": "레바테인의 불균형 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "adelia",
          "name": "아델리아"
        },
        "labels": [
          "부식·아츠 취약 소모",
          "부식 활용",
          "아츠 취약·물리 취약 지원",
          "전투 자원 순환"
        ],
        "relation": "레바테인의 불균형 조건과 직접 이어집니다."
      }
    ],
    "weaknesses": [
      {
        "title": "예열·상태 준비",
        "entries": [
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "메인 컨트롤 점유",
            "evidence": "강력한 일격·처형·궁극기 전환과 강화 일반 공격이 메인 컨트롤 상태에 연결됩니다.",
            "affected": "재 · 불꽃의 심장 · 황혼",
            "implication": "메인 컨트롤 유지가 제한되거나 교대가 강제되면 핵심 발동 기회가 줄어듭니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "4스택 예열",
            "evidence": "불타오르는 화염의 추가 공격은 녹아내린 불꽃 4스택을 이미 보유한 상태에서 사용해야 발동합니다.",
            "affected": "불타오르는 화염 · 열화 · 불꽃의 심장",
            "implication": "중첩 획득 빈도·유지 시간·소모 조건의 변화에 순환 속도가 직접 영향을 받습니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "상태 이상 조건",
            "evidence": "열화는 적이 연소 또는 부식 상태일 때만 사용할 수 있고, 불꽃의 심장은 주변 적의 열기 부착을 흡수합니다.",
            "affected": "열화 · 불꽃의 심장",
            "implication": "아츠 부착과 연소·부식의 부여·유지·갱신이 방해되면 연계 스킬과 중첩 수급이 함께 약해집니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "열기 피해 편중",
            "evidence": "일반 공격부터 궁극기까지 주요 공격이 열기 피해이며, 저항 무시는 불꽃의 심장 4스택 후 20포인트입니다.",
            "affected": "전투 스킬 전반",
            "implication": "열기 저항이 높은 대상에게 피해 효율이 낮아질 수 있으며, 저항 무시 효과의 가동 여부가 중요합니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "대상 수·처치 수 효율",
            "evidence": "열화는 상태 이상 대상마다 공격하고 궁극기 에너지를 획득하며, P5는 처치 수에 따라 황혼을 최대 7초 연장합니다.",
            "affected": "열화 · P5",
            "implication": "적 수가 적거나 처치가 어려운 전투에서는 대상별 에너지 수급과 지속시간 연장의 이득이 감소합니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "연소·감전 소모 의존",
            "evidence": "탄흔의 열기는 목표가 연소 또는 감전 상태일 때만 해당 상태를 소모해 추가 사격과 대량의 열기 피해를 발동합니다.",
            "affected": "탄흔의 열기 · 절제의 원칙",
            "implication": "대상에게 소모할 아츠 이상이 없으면 추가 사격과 스킬 게이지 반환을 함께 얻지 못해 배틀 스킬의 효율이 낮아집니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "파티 상태 공급 의존",
            "evidence": "울프가드가 직접 확정적으로 제공하는 소모 대상은 궁극기의 강제 연소이며, 감전은 별도의 전기 부착 조건이 필요합니다.",
            "affected": "탄흔의 열기 · 늑대의 분노",
            "implication": "궁극기 사이에도 추가 효과를 반복하려면 연소 또는 감전을 안정적으로 공급하는 팀 구성이 유리합니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "스킬 게이지와 쿨타임",
            "evidence": "탄흔의 열기는 스킬 게이지 100포인트를 소모하고, 폭렬 수류탄 · β형은 쿨타임 19초입니다. 스킬 게이지 100포인트의 자연 회복에는 12.5초가 걸립니다.",
            "affected": "탄흔의 열기 · 폭렬 수류탄 · β형",
            "implication": "스킬 게이지 회복 감소, 배틀 스킬 비용 증가, 연계 스킬 쿨타임 증가 방향의 제약에서 상태 소모와 재부착의 순환이 느려질 수 있습니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "상태 소모에 따른 충돌",
            "evidence": "탄흔의 열기는 연소 또는 감전 상태를 소모하며, 그 경우 마지막 탄의 열기 부착을 부여하지 않습니다.",
            "affected": "탄흔의 열기",
            "implication": "다른 오퍼레이터가 유지 중인 연소·감전을 활용해야 하는 조합에서는 울프가드의 소모 시점과 팀의 상태 활용 순서를 맞춰야 합니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "대상 수에 따른 역할 차이",
            "evidence": "탄흔의 열기의 추가 효과는 목표의 상태를 확인하는 단일 대상 중심 구조인 반면, 폭렬 수류탄 · β형과 늑대의 분노는 주변 또는 근처 범위를 공격합니다.",
            "affected": "탄흔의 열기 · 폭렬 수류탄 · β형 · 늑대의 분노",
            "implication": "단일 대상에서는 상태 소모 화력을 집중하기 쉽지만, 다수 대상에서는 각 적에게 소모 가능한 상태를 준비하지 않으면 배틀 스킬의 추가 효과를 넓게 활용하기 어렵습니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "잠재력에 따른 순환 확장",
            "evidence": "P2는 게이지 반환을 추가하고, P3은 불타는 송곳니 유지와 팀 공유를 제공하며, P5는 궁극기 후 연계 스킬 쿨타임을 초기화합니다.",
            "affected": "P2 · P3 · P5",
            "implication": "기본 상태에서도 상태 소모 순환은 가능하지만, 게이지 회수·팀 열기 강화·연계 재사용의 완성도는 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "akekuri",
              "name": "아케쿠리"
            },
            "axis": "불균형 조건 의존",
            "evidence": "섬광 돌진은 불균형 상태이거나 불균형 지점에 도달한 적이 있을 때만 사용할 수 있습니다.",
            "affected": "섬광 돌진 · 승리의 함성",
            "implication": "불균형 누적이 느리거나 불균형 지점이 없는 대상에서는 연계 스킬을 통한 게이지 회복과 재능 효과를 자주 활용하기 어렵습니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "상반된 연계 조건과 부식 순환",
            "evidence": "화산 분화는 방어 불능과 아츠 부착이 없는 적에게 강력한 일격을 줘야 발동하고, 질주하는 돌리의 추가 효과는 부식 상태를 요구합니다.",
            "affected": "화산 분화 · 질주하는 돌리",
            "implication": "먼저 상태가 없는 목표를 골라 연계로 부식을 만든 뒤 즉시 배틀 스킬로 소모해야 합니다. 다른 파티원이 아츠 부착이나 방어 불능을 먼저 걸면 연계 조건을 놓칠 수 있어 행동 순서 의존도가 높습니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "부식 소모 의존",
            "evidence": "질주하는 돌리는 부식 상태를 소모해야 물리 취약과 아츠 취약을 부여합니다.",
            "affected": "질주하는 돌리 · 마운틴 서퍼",
            "implication": "부식을 준비하지 못하면 배틀 스킬은 자연 피해만 주고 핵심 지원 효과와 추가 돌진을 얻지 못합니다. 상태 면역·상태 제거·부식 준비 지연 방향의 제약에서 성능이 크게 떨어집니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "다수 대상 위치 의존",
            "evidence": "마운틴 서퍼는 부식 상태의 다른 적이 근처에 있을 때만 추가 배틀 스킬을 발동합니다.",
            "affected": "마운틴 서퍼",
            "implication": "단일 대상전에서는 재능 2가 발동하지 않으며, 적이 흩어지면 취약 확장이 끊깁니다. 다수전에서도 부식 대상의 거리와 배치에 따라 실제 이득이 달라집니다."
          }
        ]
      },
      {
        "title": "스킬 게이지·궁극기 순환",
        "entries": [
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "대상 수·처치 수 효율",
            "evidence": "열화는 상태 이상 대상마다 공격하고 궁극기 에너지를 획득하며, P5는 처치 수에 따라 황혼을 최대 7초 연장합니다.",
            "affected": "열화 · P5",
            "implication": "적 수가 적거나 처치가 어려운 전투에서는 대상별 에너지 수급과 지속시간 연장의 이득이 감소합니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "긴 생존 재발동 간격",
            "evidence": "부활의 불씨는 강한 비호와 회복을 제공하지만 120초마다 최대 1회 발동합니다.",
            "affected": "부활의 불씨",
            "implication": "짧은 시간 안에 반복되는 치명적 피해에는 두 번째 대응 수단으로 사용할 수 없습니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "연소·감전 소모 의존",
            "evidence": "탄흔의 열기는 목표가 연소 또는 감전 상태일 때만 해당 상태를 소모해 추가 사격과 대량의 열기 피해를 발동합니다.",
            "affected": "탄흔의 열기 · 절제의 원칙",
            "implication": "대상에게 소모할 아츠 이상이 없으면 추가 사격과 스킬 게이지 반환을 함께 얻지 못해 배틀 스킬의 효율이 낮아집니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "스킬 게이지와 쿨타임",
            "evidence": "탄흔의 열기는 스킬 게이지 100포인트를 소모하고, 폭렬 수류탄 · β형은 쿨타임 19초입니다. 스킬 게이지 100포인트의 자연 회복에는 12.5초가 걸립니다.",
            "affected": "탄흔의 열기 · 폭렬 수류탄 · β형",
            "implication": "스킬 게이지 회복 감소, 배틀 스킬 비용 증가, 연계 스킬 쿨타임 증가 방향의 제약에서 상태 소모와 재부착의 순환이 느려질 수 있습니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "잠재력에 따른 순환 확장",
            "evidence": "P2는 게이지 반환을 추가하고, P3은 불타는 송곳니 유지와 팀 공유를 제공하며, P5는 궁극기 후 연계 스킬 쿨타임을 초기화합니다.",
            "affected": "P2 · P3 · P5",
            "implication": "기본 상태에서도 상태 소모 순환은 가능하지만, 게이지 회수·팀 열기 강화·연계 재사용의 완성도는 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "akekuri",
              "name": "아케쿠리"
            },
            "axis": "불균형 조건 의존",
            "evidence": "섬광 돌진은 불균형 상태이거나 불균형 지점에 도달한 적이 있을 때만 사용할 수 있습니다.",
            "affected": "섬광 돌진 · 승리의 함성",
            "implication": "불균형 누적이 느리거나 불균형 지점이 없는 대상에서는 연계 스킬을 통한 게이지 회복과 재능 효과를 자주 활용하기 어렵습니다."
          },
          {
            "character": {
              "id": "akekuri",
              "name": "아케쿠리"
            },
            "axis": "스킬 게이지 수급 시점",
            "evidence": "열정 분출은 스킬 게이지 100포인트를 소모하지만, 섬광 돌진의 기본 회복량은 2회 합계 15포인트이며 궁극기는 총 80포인트를 회복합니다.",
            "affected": "열정 분출 · 섬광 돌진 · 소대, 집합!",
            "implication": "궁극기를 사용하지 못하는 구간에는 연계 스킬만으로 배틀 스킬 1회분을 빠르게 충당하기 어렵고, 자연 회복과 추가 게이지 수급이 필요합니다."
          },
          {
            "character": {
              "id": "akekuri",
              "name": "아케쿠리"
            },
            "axis": "궁극기 에너지와 쿨타임",
            "evidence": "소대, 집합!은 궁극기 에너지 120이 필요하고 쿨타임은 20초입니다.",
            "affected": "소대, 집합! · 몰입의 시간",
            "implication": "궁극기 에너지 획득 감소나 궁극기 쿨타임 증가 방향의 제약에서는 대량 게이지 회복과 연타 지원의 공백이 길어집니다."
          },
          {
            "character": {
              "id": "akekuri",
              "name": "아케쿠리"
            },
            "axis": "지능 기반 연계 회복",
            "evidence": "승리의 함성은 지능 10포인트마다 섬광 돌진의 스킬 게이지 회복량을 증가시킵니다.",
            "affected": "승리의 함성 · 섬광 돌진",
            "implication": "지능이 낮으면 연계 스킬의 자원 회복 강화 폭이 작아져 아케쿠리의 게이지 지원 성능이 제한됩니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "잠재력에 따른 지원 격차",
            "evidence": "P1은 취약을 추가 8% 강화하고 P2는 추가 아군 치유, P5는 부식 지속과 연계 회전을 강화합니다.",
            "affected": "P1 · P2 · P5",
            "implication": "기본 단계에서는 취약 수치, 팀 치유 범위, 부식 유지 시간이 제한됩니다. 취약 강화와 다인 회복을 기대하는 운용은 잠재력 의존도가 높습니다."
          }
        ]
      },
      {
        "title": "위치·대상 수",
        "entries": [
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "대상 수·처치 수 효율",
            "evidence": "열화는 상태 이상 대상마다 공격하고 궁극기 에너지를 획득하며, P5는 처치 수에 따라 황혼을 최대 7초 연장합니다.",
            "affected": "열화 · P5",
            "implication": "적 수가 적거나 처치가 어려운 전투에서는 대상별 에너지 수급과 지속시간 연장의 이득이 감소합니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "대상 수에 따른 역할 차이",
            "evidence": "탄흔의 열기의 추가 효과는 목표의 상태를 확인하는 단일 대상 중심 구조인 반면, 폭렬 수류탄 · β형과 늑대의 분노는 주변 또는 근처 범위를 공격합니다.",
            "affected": "탄흔의 열기 · 폭렬 수류탄 · β형 · 늑대의 분노",
            "implication": "단일 대상에서는 상태 소모 화력을 집중하기 쉽지만, 다수 대상에서는 각 적에게 소모 가능한 상태를 준비하지 않으면 배틀 스킬의 추가 효과를 넓게 활용하기 어렵습니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "부식 소모 의존",
            "evidence": "질주하는 돌리는 부식 상태를 소모해야 물리 취약과 아츠 취약을 부여합니다.",
            "affected": "질주하는 돌리 · 마운틴 서퍼",
            "implication": "부식을 준비하지 못하면 배틀 스킬은 자연 피해만 주고 핵심 지원 효과와 추가 돌진을 얻지 못합니다. 상태 면역·상태 제거·부식 준비 지연 방향의 제약에서 성능이 크게 떨어집니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "다수 대상 위치 의존",
            "evidence": "마운틴 서퍼는 부식 상태의 다른 적이 근처에 있을 때만 추가 배틀 스킬을 발동합니다.",
            "affected": "마운틴 서퍼",
            "implication": "단일 대상전에서는 재능 2가 발동하지 않으며, 적이 흩어지면 취약 확장이 끊깁니다. 다수전에서도 부식 대상의 거리와 배치에 따라 실제 이득이 달라집니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "그림자 접촉형 치유",
            "evidence": "친구의 그림자는 메인 컨트롤 오퍼레이터가 지면의 그림자와 접촉해야 치유합니다.",
            "affected": "친구의 그림자",
            "implication": "치유를 받으려면 메인 컨트롤의 이동 경로를 그림자 위치에 맞춰야 합니다. 그림자는 10초만 유지되고 궁극기 생성은 10% 확률이므로 급한 피해 대응과 원거리 전투에서 안정성이 낮습니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "지속 시전과 무작위 궁극기",
            "evidence": "복슬복슬 파티는 이동 가능한 지속 시전이며 분신을 무작위로 사방에 던집니다.",
            "affected": "복슬복슬 파티",
            "implication": "궁극기 동안 다른 행동이 제한되고 분신의 분포에 따라 단일 대상 명중과 그림자 생성 위치가 흔들릴 수 있습니다. 메인 컨트롤 점유와 목표 배치 변화에 영향을 받습니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "잠재력에 따른 지원 격차",
            "evidence": "P1은 취약을 추가 8% 강화하고 P2는 추가 아군 치유, P5는 부식 지속과 연계 회전을 강화합니다.",
            "affected": "P1 · P2 · P5",
            "implication": "기본 단계에서는 취약 수치, 팀 치유 범위, 부식 유지 시간이 제한됩니다. 취약 강화와 다인 회복을 기대하는 운용은 잠재력 의존도가 높습니다."
          }
        ]
      },
      {
        "title": "잠재력 의존",
        "entries": [
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "대상 수·처치 수 효율",
            "evidence": "열화는 상태 이상 대상마다 공격하고 궁극기 에너지를 획득하며, P5는 처치 수에 따라 황혼을 최대 7초 연장합니다.",
            "affected": "열화 · P5",
            "implication": "적 수가 적거나 처치가 어려운 전투에서는 대상별 에너지 수급과 지속시간 연장의 이득이 감소합니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "잠재력에 따른 순환 확장",
            "evidence": "P2는 게이지 반환을 추가하고, P3은 불타는 송곳니 유지와 팀 공유를 제공하며, P5는 궁극기 후 연계 스킬 쿨타임을 초기화합니다.",
            "affected": "P2 · P3 · P5",
            "implication": "기본 상태에서도 상태 소모 순환은 가능하지만, 게이지 회수·팀 열기 강화·연계 재사용의 완성도는 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "akekuri",
              "name": "아케쿠리"
            },
            "axis": "궁극기 지속 구간 의존",
            "evidence": "몰입의 시간의 연타와 P3의 팀 전체 공격력 증가는 소대, 집합!이 지속되는 동안에만 적용되며, P5가 있어야 연타가 종료 후 5초 더 지속됩니다.",
            "affected": "몰입의 시간 · P3 · P5",
            "implication": "궁극기 지속 구간에 팀의 배틀 스킬과 궁극기를 맞추지 못하면 지원 효과를 충분히 활용하기 어렵고, 종료 후 연타 유지에는 P5가 필요합니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "잠재력에 따른 지원 격차",
            "evidence": "P1은 취약을 추가 8% 강화하고 P2는 추가 아군 치유, P5는 부식 지속과 연계 회전을 강화합니다.",
            "affected": "P1 · P2 · P5",
            "implication": "기본 단계에서는 취약 수치, 팀 치유 범위, 부식 유지 시간이 제한됩니다. 취약 강화와 다인 회복을 기대하는 운용은 잠재력 의존도가 높습니다."
          }
        ]
      },
      {
        "title": "메인 컨트롤·조작 집중",
        "entries": [
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "메인 컨트롤 점유",
            "evidence": "강력한 일격·처형·궁극기 전환과 강화 일반 공격이 메인 컨트롤 상태에 연결됩니다.",
            "affected": "재 · 불꽃의 심장 · 황혼",
            "implication": "메인 컨트롤 유지가 제한되거나 교대가 강제되면 핵심 발동 기회가 줄어듭니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "그림자 접촉형 치유",
            "evidence": "친구의 그림자는 메인 컨트롤 오퍼레이터가 지면의 그림자와 접촉해야 치유합니다.",
            "affected": "친구의 그림자",
            "implication": "치유를 받으려면 메인 컨트롤의 이동 경로를 그림자 위치에 맞춰야 합니다. 그림자는 10초만 유지되고 궁극기 생성은 10% 확률이므로 급한 피해 대응과 원거리 전투에서 안정성이 낮습니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "지속 시전과 무작위 궁극기",
            "evidence": "복슬복슬 파티는 이동 가능한 지속 시전이며 분신을 무작위로 사방에 던집니다.",
            "affected": "복슬복슬 파티",
            "implication": "궁극기 동안 다른 행동이 제한되고 분신의 분포에 따라 단일 대상 명중과 그림자 생성 위치가 흔들릴 수 있습니다. 메인 컨트롤 점유와 목표 배치 변화에 영향을 받습니다."
          }
        ]
      }
    ],
    "discoveries": [
      {
        "character": {
          "id": "laevatain",
          "name": "레바테인"
        },
        "title": "연소를 유지한 연계 스킬 화력 축",
        "description": "주력 순환은 궁극기 이후 강화 일반 공격에 무게가 실리지만, 연소 또는 부식 상태의 적에게 연계 스킬을 발동해 별도의 열기 피해와 궁극기 에너지 수급을 만들 수 있습니다.",
        "opportunity": "일반 공격이나 궁극기의 비중을 낮추는 전투 설계에서는 연소를 곧바로 흡수하지 않고 유지하며 연계 스킬을 반복하는 운용이 새롭게 부각될 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "wolfguard",
          "name": "울프가드"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 연계 스킬 비중이 높지만, 연계 스킬은 아츠 부착 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "akekuri",
          "name": "아케쿠리"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 연계 스킬 비중이 높지만, 연계 스킬은 불균형 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "adelia",
          "name": "아델리아"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 배틀 스킬 비중이 높지만, 연계 스킬은 아츠 부착·방어 불능 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      }
    ],
    "designHints": [
      {
        "id": "normal",
        "title": "일반 공격 의존도",
        "pressure": "일반 공격 피해 비중을 낮추는 방향",
        "impact": "강화 상태나 메인 컨트롤 중 일반 공격에 몰린 화력 구간이 짧아집니다.",
        "opportunity": "레바테인의 연계 스킬, 울프가드의 연계 스킬처럼 연계·배틀 스킬 중심의 보조 축이 상대적으로 중요해질 수 있습니다.",
        "caution": "일반 공격과 강력한 일격을 동시에 완전히 막으면 스킬 게이지 회복과 불균형 순환까지 함께 끊길 수 있습니다.",
        "characters": [
          {
            "id": "laevatain",
            "name": "레바테인"
          }
        ]
      },
      {
        "id": "ultimate",
        "title": "궁극기 반복 의존도",
        "pressure": "궁극기 반복 사용의 효율이 점차 낮아지는 방향",
        "impact": "궁극기를 중심으로 한 강화 구간과 마무리 빈도가 줄어듭니다.",
        "opportunity": "궁극기 에너지를 다른 가치로 돌리거나 배틀·연계 스킬을 주력화하는 운용을 찾게 됩니다.",
        "caution": "첫 궁극기까지 무력화하면 준비 과정의 의미도 사라질 수 있으므로 반복 효율을 조절하는 편이 발견을 만들기 쉽습니다.",
        "characters": [
          {
            "id": "laevatain",
            "name": "레바테인"
          },
          {
            "id": "wolfguard",
            "name": "울프가드"
          },
          {
            "id": "akekuri",
            "name": "아케쿠리"
          },
          {
            "id": "adelia",
            "name": "아델리아"
          }
        ]
      },
      {
        "id": "battle",
        "title": "배틀 스킬 피해 비중",
        "pressure": "배틀 스킬의 직접 피해를 줄이되 연계 스킬 순환은 열어주는 방향",
        "impact": "스킬 게이지를 사용해 즉시 내는 화력이 줄어듭니다.",
        "opportunity": "배틀 스킬을 상태 생성·변환 용도로만 쓰고, 연계 스킬이나 궁극기 외 추가 피해를 주력으로 삼는 구조가 떠오를 수 있습니다.",
        "caution": "배틀 스킬의 상태 부여까지 막으면 후속 연계 조건 자체가 사라질 수 있습니다.",
        "characters": [
          {
            "id": "laevatain",
            "name": "레바테인"
          },
          {
            "id": "wolfguard",
            "name": "울프가드"
          },
          {
            "id": "akekuri",
            "name": "아케쿠리"
          },
          {
            "id": "adelia",
            "name": "아델리아"
          }
        ]
      },
      {
        "id": "link",
        "title": "연계 스킬 빈도",
        "pressure": "연계 스킬 사용 빈도와 쿨타임을 크게 흔드는 방향",
        "impact": "조건을 자주 열 수 있는 파티일수록 순환 속도가 크게 달라집니다.",
        "opportunity": "연계 횟수가 늘어날 때 생기는 자원 수급과 보조 피해, 반대로 연계에 대가가 생길 때의 대체 순서를 비교할 수 있습니다.",
        "caution": "연계 조건과 쿨타임을 동시에 막으면 조합의 상호작용이 사라질 수 있습니다.",
        "characters": [
          {
            "id": "laevatain",
            "name": "레바테인"
          },
          {
            "id": "wolfguard",
            "name": "울프가드"
          },
          {
            "id": "akekuri",
            "name": "아케쿠리"
          },
          {
            "id": "adelia",
            "name": "아델리아"
          }
        ]
      },
      {
        "id": "stack",
        "title": "부착·방어 불능 축적 속도",
        "pressure": "같은 대상에게 스택을 연속으로 쌓는 속도를 제한하는 방향",
        "impact": "최대 스택을 전제로 하는 동결·강타·갑옷 파괴·취약 발동 시점이 늦어집니다.",
        "opportunity": "낮은 스택에서 바로 작동하는 스킬, 강제 이상, 직접 부여 효과의 가치가 올라갈 수 있습니다.",
        "caution": "부착 자체를 금지하면 대체 운용이 아니라 파티의 핵심 문법을 삭제하게 됩니다.",
        "characters": [
          {
            "id": "laevatain",
            "name": "레바테인"
          },
          {
            "id": "wolfguard",
            "name": "울프가드"
          },
          {
            "id": "akekuri",
            "name": "아케쿠리"
          },
          {
            "id": "adelia",
            "name": "아델리아"
          }
        ]
      }
    ],
    "mechanicProfile": {
      "mechanicIds": [
        "combustion",
        "ultimate",
        "heatInfliction",
        "skillGauge",
        "heatDamage",
        "corrosion",
        "artsInfliction",
        "shock",
        "battleSkill",
        "mainControl",
        "linkSkill",
        "artsAbnormality",
        "imbalance",
        "artsVulnerability",
        "physicalVulnerability",
        "physicalDamage",
        "natureDamage",
        "ultimateEnergy",
        "healing",
        "comboHit",
        "defenseless",
        "powerStrike",
        "skillGaugeReturn",
        "generalAttack"
      ],
      "mechanicScores": {
        "combustion": 19,
        "ultimate": 15,
        "heatInfliction": 14.5,
        "skillGauge": 13.5,
        "heatDamage": 13,
        "corrosion": 11.5,
        "artsInfliction": 9,
        "shock": 9,
        "battleSkill": 9,
        "mainControl": 8.5,
        "linkSkill": 8.5,
        "artsAbnormality": 6.5,
        "imbalance": 6,
        "artsVulnerability": 5,
        "physicalVulnerability": 5,
        "physicalDamage": 4.5,
        "natureDamage": 4.5,
        "ultimateEnergy": 4.5,
        "healing": 4.5,
        "comboHit": 4.5,
        "defenseless": 3,
        "powerStrike": 3,
        "skillGaugeReturn": 3,
        "generalAttack": 3,
        "electricDamage": 0,
        "frostDamage": 0,
        "artsDamage": 0,
        "electricInfliction": 0,
        "frostInfliction": 0,
        "natureInfliction": 0,
        "freeze": 0,
        "launch": 0,
        "knockdown": 0,
        "smash": 0,
        "armorBreak": 0,
        "execution": 0,
        "heatVulnerability": 0,
        "electricVulnerability": 0,
        "frostVulnerability": 0,
        "natureVulnerability": 0,
        "artsAmplification": 0,
        "physicalAmplification": 0,
        "heatAmplification": 0,
        "electricAmplification": 0,
        "frostAmplification": 0,
        "natureAmplification": 0,
        "protection": 0,
        "fortification": 0,
        "weakness": 0,
        "cleanse": 0,
        "slow": 0,
        "haste": 0,
        "originiumCrystal": 0
      },
      "dominantAction": "linkSkill",
      "actionTotals": {
        "generalAttack": 6,
        "battleSkill": 26,
        "linkSkill": 29,
        "ultimate": 24
      },
      "hintIds": [
        "normal",
        "ultimate",
        "battle",
        "link",
        "stack"
      ],
      "hintTitles": [
        "일반 공격 의존도",
        "궁극기 반복 의존도",
        "배틀 스킬 피해 비중",
        "연계 스킬 빈도",
        "부착·방어 불능 축적 속도"
      ],
      "weaknessAxes": [
        "메인 컨트롤 점유",
        "4스택 예열",
        "상태 이상 조건",
        "열기 피해 편중",
        "대상 수·처치 수 효율",
        "연소·감전 소모 의존",
        "파티 상태 공급 의존",
        "스킬 게이지와 쿨타임",
        "상태 소모에 따른 충돌",
        "대상 수에 따른 역할 차이",
        "잠재력에 따른 순환 확장",
        "불균형 조건 의존",
        "상반된 연계 조건과 부식 순환",
        "부식 소모 의존",
        "다수 대상 위치 의존",
        "대상 수·처치 수 효율",
        "긴 생존 재발동 간격",
        "연소·감전 소모 의존",
        "스킬 게이지와 쿨타임",
        "잠재력에 따른 순환 확장",
        "불균형 조건 의존",
        "스킬 게이지 수급 시점",
        "궁극기 에너지와 쿨타임",
        "지능 기반 연계 회복",
        "잠재력에 따른 지원 격차",
        "대상 수·처치 수 효율",
        "대상 수에 따른 역할 차이",
        "부식 소모 의존",
        "다수 대상 위치 의존",
        "그림자 접촉형 치유",
        "지속 시전과 무작위 궁극기",
        "잠재력에 따른 지원 격차",
        "대상 수·처치 수 효율",
        "잠재력에 따른 순환 확장",
        "궁극기 지속 구간 의존",
        "잠재력에 따른 지원 격차",
        "메인 컨트롤 점유",
        "그림자 접촉형 치유",
        "지속 시전과 무작위 궁극기"
      ],
      "dependencyLabels": [
        "연소",
        "열기 부착",
        "스킬 게이지",
        "부식",
        "연계 스킬"
      ]
    }
  },
  {
    "schemaVersion": 1,
    "id": "party-jangbangyi-perlica-arclight-antal",
    "exportedAt": "2026-07-22T15:44:15.456Z",
    "title": "장방이 · 펠리카 · 아크라이트 · 안탈 파티 분석",
    "party": [
      {
        "id": "jangbangyi",
        "name": "장방이",
        "order": 1
      },
      {
        "id": "perlica",
        "name": "펠리카",
        "order": 2
      },
      {
        "id": "arclight",
        "name": "아크라이트",
        "order": 3
      },
      {
        "id": "antal",
        "name": "안탈",
        "order": 4
      }
    ],
    "summary": {
      "title": "파티 전투 구조 분석",
      "sentence": "전기 부착을 준비해 감전 조건으로 전환하고, 배틀 스킬·연계 스킬에 화력을 모으는 파티입니다.",
      "dominantAction": "battleSkill",
      "actionTotals": {
        "generalAttack": 6,
        "battleSkill": 29,
        "linkSkill": 24,
        "ultimate": 22
      },
      "dependencies": [
        {
          "id": "shock",
          "label": "감전",
          "color": "electric",
          "level": "매우 높음",
          "score": 37.5
        },
        {
          "id": "electricInfliction",
          "label": "전기 부착",
          "color": "electric",
          "level": "매우 높음",
          "score": 18.5
        },
        {
          "id": "artsInfliction",
          "label": "아츠 부착",
          "color": "cyan",
          "level": "매우 높음",
          "score": 11.5
        },
        {
          "id": "ultimateEnergy",
          "label": "궁극기 에너지",
          "color": "orange",
          "level": "매우 높음",
          "score": 10.5
        },
        {
          "id": "battleSkill",
          "label": "배틀 스킬",
          "color": "blue",
          "level": "주력 행동",
          "score": 29
        }
      ]
    },
    "diagram": {
      "nodes": [
        {
          "order": 1,
          "character": {
            "id": "jangbangyi",
            "name": "장방이"
          },
          "skill": {
            "name": "변화의 숨결",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "전기 부착 준비"
        },
        {
          "order": 2,
          "character": {
            "id": "arclight",
            "name": "아크라이트"
          },
          "skill": {
            "name": "질풍 섬광",
            "type": "배틀 스킬",
            "typeId": "battleSkill",
            "index": 1
          },
          "title": "아크라이트의 배틀 스킬 소모"
        },
        {
          "order": 3,
          "character": {
            "id": "antal",
            "name": "안탈"
          },
          "skill": {
            "name": "자기 폭풍 실험장",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "상태 효과 준비"
        },
        {
          "order": 4,
          "character": {
            "id": "arclight",
            "name": "아크라이트"
          },
          "skill": {
            "name": "천둥의 울림",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "아크라이트의 연계 스킬 연결"
        },
        {
          "order": 5,
          "character": {
            "id": "antal",
            "name": "안탈"
          },
          "skill": {
            "name": "오버클록 타임",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "팀 증폭 개시"
        },
        {
          "order": 6,
          "character": {
            "id": "arclight",
            "name": "아크라이트"
          },
          "skill": {
            "name": "천둥번개",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "감전 준비"
        },
        {
          "order": 7,
          "character": {
            "id": "perlica",
            "name": "펠리카"
          },
          "skill": {
            "name": "프로토콜ε · 70.41κ",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "저비용 궁극기 마무리"
        },
        {
          "order": 8,
          "character": {
            "id": "jangbangyi",
            "name": "장방이"
          },
          "skill": {
            "name": "심판의 폭풍",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "주력 화력 집중"
        }
      ],
      "connections": [
        {
          "fromOrder": 1,
          "toOrder": 2,
          "label": "다음 조건 연결",
          "preparationRoutes": []
        },
        {
          "fromOrder": 2,
          "toOrder": 3,
          "label": "스킬 게이지 재투자",
          "preparationRoutes": [
            {
              "character": {
                "id": "perlica",
                "name": "펠리카"
              },
              "skill": {
                "name": "프로토콜ω · 뇌격",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "artsInfliction",
                  "label": "아츠 부착"
                }
              ],
              "summary": "하늘에서 전기 에너지를 떨어뜨려 좁은 범위 내의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다."
            },
            {
              "character": {
                "id": "jangbangyi",
                "name": "장방이"
              },
              "skill": {
                "name": "변화의 숨결",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "artsInfliction",
                  "label": "아츠 부착"
                }
              ],
              "summary": "메인 컨트롤 오퍼레이터의 강력한 일격 또는 처형으로 전기 부착 상태의 적을 명중한 후 사용할 수 있습니다."
            },
            {
              "character": {
                "id": "jangbangyi",
                "name": "장방이"
              },
              "skill": {
                "name": "심판의 폭풍",
                "type": "궁극기",
                "typeId": "ultimate",
                "index": 3
              },
              "matchedMechanics": [
                {
                  "id": "artsInfliction",
                  "label": "아츠 부착"
                }
              ],
              "summary": "배틀 스킬 장방이의 배틀 스킬의 피해 배율과 공격 범위가 증가하며, 마지막 펠리카의 배틀 스킬이 적을 명중할 때 전기 부착을 부여합니다."
            },
            {
              "character": {
                "id": "arclight",
                "name": "아크라이트"
              },
              "skill": {
                "name": "천둥번개",
                "type": "궁극기",
                "typeId": "ultimate",
                "index": 3
              },
              "matchedMechanics": [
                {
                  "id": "artsInfliction",
                  "label": "아츠 부착"
                }
              ],
              "summary": "전기 아크로 자신을 둘러싼 다음 전방 일정 거리를 돌진하며 경로상의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다."
            }
          ]
        },
        {
          "fromOrder": 3,
          "toOrder": 4,
          "label": "다음 조건 연결",
          "preparationRoutes": [
            {
              "character": {
                "id": "jangbangyi",
                "name": "장방이"
              },
              "skill": {
                "name": "뇌정의 부름",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "목표의 감전 상태를 소모하여 이번 배틀 스킬의 피해 배율을 증가시키고, 소모한 감전 상태의 이상 레벨 +1자루의 청뢰검을 생성합니다."
            },
            {
              "character": {
                "id": "arclight",
                "name": "아크라이트"
              },
              "skill": {
                "name": "질풍 섬광",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "적이 감전 상태일 경우 감전을 소모하여 추가로 1회 공격하고 전기 피해를 주며 스킬 게이지 35포인트를 회복합니다."
            },
            {
              "character": {
                "id": "jangbangyi",
                "name": "장방이"
              },
              "skill": {
                "name": "변화의 숨결",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "메인 컨트롤 오퍼레이터의 강력한 일격 또는 처형으로 전기 부착 상태의 적을 명중한 후 사용할 수 있습니다. 전기 부착 상태의 적을 명중하면 그 전기 부착을 소모하고 강제로 감전 상태를 부여합니다."
            },
            {
              "character": {
                "id": "perlica",
                "name": "펠리카"
              },
              "skill": {
                "name": "실시간 프로토콜 · 연쇄 섬광",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "메인 컨트롤 오퍼레이터가 적에게 강력한 일격 피해를 준 다음 사용할 수 있습니다. 누적된 전기 에너지를 방출해 목표를 강타하며 전기 피해를 주고, 5초 동안 짧은 강제 감전 상태를 부여합니다."
            },
            {
              "character": {
                "id": "jangbangyi",
                "name": "장방이"
              },
              "skill": {
                "name": "심판의 폭풍",
                "type": "궁극기",
                "typeId": "ultimate",
                "index": 3
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "목표가 존재하면 감전 여부와 무관하게 청뢰검 3자루를 생성합니다. 배틀 스킬 장방이의 배틀 스킬의 피해 배율과 공격 범위가 증가하며, 마지막 펠리카의 배틀 스킬이 적을 명중할 때 전기 부착을 부여합니다."
            },
            {
              "character": {
                "id": "arclight",
                "name": "아크라이트"
              },
              "skill": {
                "name": "천둥번개",
                "type": "궁극기",
                "typeId": "ultimate",
                "index": 3
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "적이 전기 부착 상태일 경우 전기 부착을 소모하여 감전 상태를 부여합니다. 전기 아크로 자신을 둘러싼 다음 전방 일정 거리를 돌진하며 경로상의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다."
            }
          ]
        },
        {
          "fromOrder": 4,
          "toOrder": 5,
          "label": "다음 조건 연결",
          "preparationRoutes": []
        },
        {
          "fromOrder": 5,
          "toOrder": 6,
          "label": "다음 조건 연결",
          "preparationRoutes": [
            {
              "character": {
                "id": "jangbangyi",
                "name": "장방이"
              },
              "skill": {
                "name": "변화의 숨결",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "electricInfliction",
                  "label": "전기 부착"
                },
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "메인 컨트롤 오퍼레이터의 강력한 일격 또는 처형으로 전기 부착 상태의 적을 명중한 후 사용할 수 있습니다. 전기 부착 상태의 적을 명중하면 그 전기 부착을 소모하고 강제로 감전 상태를 부여합니다."
            },
            {
              "character": {
                "id": "jangbangyi",
                "name": "장방이"
              },
              "skill": {
                "name": "심판의 폭풍",
                "type": "궁극기",
                "typeId": "ultimate",
                "index": 3
              },
              "matchedMechanics": [
                {
                  "id": "electricInfliction",
                  "label": "전기 부착"
                },
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "배틀 스킬 장방이의 배틀 스킬의 피해 배율과 공격 범위가 증가하며, 마지막 펠리카의 배틀 스킬이 적을 명중할 때 전기 부착을 부여합니다. 배틀 스킬 장방이의 배틀 스킬의 피해 배율과 공격 범위가 증가하며, 마지막 펠리카의 배틀 스킬이 적을 명중할 때 전기 부착을 부여합니다."
            },
            {
              "character": {
                "id": "jangbangyi",
                "name": "장방이"
              },
              "skill": {
                "name": "뇌정의 부름",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "목표의 감전 상태를 소모하여 이번 배틀 스킬의 피해 배율을 증가시키고, 소모한 감전 상태의 이상 레벨 +1자루의 청뢰검을 생성합니다."
            },
            {
              "character": {
                "id": "perlica",
                "name": "펠리카"
              },
              "skill": {
                "name": "프로토콜ω · 뇌격",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "electricInfliction",
                  "label": "전기 부착"
                }
              ],
              "summary": "하늘에서 전기 에너지를 떨어뜨려 좁은 범위 내의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다."
            },
            {
              "character": {
                "id": "arclight",
                "name": "아크라이트"
              },
              "skill": {
                "name": "질풍 섬광",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "적이 감전 상태일 경우 감전을 소모하여 추가로 1회 공격하고 전기 피해를 주며 스킬 게이지 35포인트를 회복합니다."
            },
            {
              "character": {
                "id": "perlica",
                "name": "펠리카"
              },
              "skill": {
                "name": "실시간 프로토콜 · 연쇄 섬광",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "메인 컨트롤 오퍼레이터가 적에게 강력한 일격 피해를 준 다음 사용할 수 있습니다. 누적된 전기 에너지를 방출해 목표를 강타하며 전기 피해를 주고, 5초 동안 짧은 강제 감전 상태를 부여합니다."
            }
          ]
        },
        {
          "fromOrder": 6,
          "toOrder": 7,
          "label": "다음 조건 연결",
          "preparationRoutes": []
        },
        {
          "fromOrder": 7,
          "toOrder": 8,
          "label": "궁극기 준비",
          "preparationRoutes": [
            {
              "character": {
                "id": "jangbangyi",
                "name": "장방이"
              },
              "skill": {
                "name": "뇌정의 부름",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "목표의 감전 상태를 소모하여 이번 배틀 스킬의 피해 배율을 증가시키고, 소모한 감전 상태의 이상 레벨 +1자루의 청뢰검을 생성합니다."
            },
            {
              "character": {
                "id": "arclight",
                "name": "아크라이트"
              },
              "skill": {
                "name": "질풍 섬광",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "적이 감전 상태일 경우 감전을 소모하여 추가로 1회 공격하고 전기 피해를 주며 스킬 게이지 35포인트를 회복합니다."
            },
            {
              "character": {
                "id": "jangbangyi",
                "name": "장방이"
              },
              "skill": {
                "name": "변화의 숨결",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "메인 컨트롤 오퍼레이터의 강력한 일격 또는 처형으로 전기 부착 상태의 적을 명중한 후 사용할 수 있습니다. 전기 부착 상태의 적을 명중하면 그 전기 부착을 소모하고 강제로 감전 상태를 부여합니다."
            },
            {
              "character": {
                "id": "perlica",
                "name": "펠리카"
              },
              "skill": {
                "name": "실시간 프로토콜 · 연쇄 섬광",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "메인 컨트롤 오퍼레이터가 적에게 강력한 일격 피해를 준 다음 사용할 수 있습니다. 누적된 전기 에너지를 방출해 목표를 강타하며 전기 피해를 주고, 5초 동안 짧은 강제 감전 상태를 부여합니다."
            },
            {
              "character": {
                "id": "arclight",
                "name": "아크라이트"
              },
              "skill": {
                "name": "천둥번개",
                "type": "궁극기",
                "typeId": "ultimate",
                "index": 3
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "적이 전기 부착 상태일 경우 전기 부착을 소모하여 감전 상태를 부여합니다. 전기 아크로 자신을 둘러싼 다음 전방 일정 거리를 돌진하며 경로상의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다."
            }
          ]
        }
      ]
    },
    "combatFlow": [
      {
        "order": 1,
        "character": {
          "id": "jangbangyi",
          "name": "장방이"
        },
        "stageIds": [
          "setup",
          "trigger"
        ],
        "title": "전기 부착 준비",
        "detail": "파티의 전기 부착 공급과 메인 컨트롤 오퍼레이터의 강력한 일격 또는 처형으로 장방이의 연계 스킬 발동 조건을 만든다.",
        "skill": {
          "name": "변화의 숨결",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "메인 컨트롤 오퍼레이터의 강력한 일격 또는 처형으로 전기 부착 상태의 적을 명중한 후 사용할 수 있습니다.",
          "전기 부착 상태의 적을 명중하면 그 전기 부착을 소모하고 강제로 감전 상태를 부여합니다."
        ],
        "timing": "",
        "effects": [
          "소모한 전기 부착 스택마다 궁극기 에너지 10을 추가로 획득합니다."
        ],
        "mechanics": [
          {
            "id": "electricInfliction",
            "label": "전기 부착"
          },
          {
            "id": "powerStrike",
            "label": "강력한 일격"
          },
          {
            "id": "execution",
            "label": "처형"
          },
          {
            "id": "mainControl",
            "label": "메인 컨트롤"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "skill": {
              "name": "프로토콜ω · 뇌격",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "electricInfliction",
                "label": "전기 부착"
              }
            ],
            "summary": "하늘에서 전기 에너지를 떨어뜨려 좁은 범위 내의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "skill": {
              "name": "심판의 폭풍",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "electricInfliction",
                "label": "전기 부착"
              }
            ],
            "summary": "배틀 스킬 장방이의 배틀 스킬의 피해 배율과 공격 범위가 증가하며, 마지막 펠리카의 배틀 스킬이 적을 명중할 때 전기 부착을 부여합니다. 배틀 스킬 장방이의 배틀 스킬의 피해 배율과 공격 범위가 증가하며, 마지막 펠리카의 배틀 스킬이 적을 명중할 때 전기 부착을 부여합니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "skill": {
              "name": "천둥번개",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "electricInfliction",
                "label": "전기 부착"
              }
            ],
            "summary": "전기 아크로 자신을 둘러싼 다음 전방 일정 거리를 돌진하며 경로상의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다."
          }
        ]
      },
      {
        "order": 2,
        "character": {
          "id": "arclight",
          "name": "아크라이트"
        },
        "stageIds": [
          "setup",
          "convert",
          "payoff",
          "recycle"
        ],
        "title": "아크라이트의 배틀 스킬 소모",
        "detail": "감전 대상에게 아크라이트의 배틀 스킬을 사용해 추가 전기 공격과 스킬 게이지 35 회복을 확보한다.",
        "skill": {
          "name": "질풍 섬광",
          "type": "배틀 스킬",
          "typeId": "battleSkill",
          "index": 1
        },
        "conditions": [],
        "timing": "",
        "effects": [
          "적이 감전 상태일 경우 감전을 소모하여 추가로 1회 공격하고 전기 피해를 주며 스킬 게이지 35포인트를 회복합니다."
        ],
        "mechanics": [
          {
            "id": "shock",
            "label": "감전"
          },
          {
            "id": "skillGauge",
            "label": "스킬 게이지"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 3,
        "character": {
          "id": "antal",
          "name": "안탈"
        },
        "stageIds": [
          "setup",
          "trigger"
        ],
        "title": "상태 효과 준비",
        "detail": "파티원이 포커싱 대상에게 물리 이상 또는 아츠 부착을 부여해 안탈의 연계 스킬의 조건을 만든다.",
        "skill": {
          "name": "자기 폭풍 실험장",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "포커싱 당한 적이 물리 이상 효과 혹은 아츠 부착 상태일 때 사용할 수 있습니다.",
          "포커싱 대상의 물리 이상·아츠 부착"
        ],
        "timing": "",
        "effects": [
          "해당 적에게 에너지 폭발 1회를 일으켜 전기 피해를 주고, 대상에게 해당 물리 이상 효과 혹은 아츠 부착 상태를 다시 부여합니다."
        ],
        "mechanics": [
          {
            "id": "artsInfliction",
            "label": "아츠 부착"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "skill": {
              "name": "프로토콜ω · 뇌격",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "artsInfliction",
                "label": "아츠 부착"
              }
            ],
            "summary": "하늘에서 전기 에너지를 떨어뜨려 좁은 범위 내의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "skill": {
              "name": "변화의 숨결",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "artsInfliction",
                "label": "아츠 부착"
              }
            ],
            "summary": "메인 컨트롤 오퍼레이터의 강력한 일격 또는 처형으로 전기 부착 상태의 적을 명중한 후 사용할 수 있습니다."
          },
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "skill": {
              "name": "심판의 폭풍",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "artsInfliction",
                "label": "아츠 부착"
              }
            ],
            "summary": "배틀 스킬 장방이의 배틀 스킬의 피해 배율과 공격 범위가 증가하며, 마지막 펠리카의 배틀 스킬이 적을 명중할 때 전기 부착을 부여합니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "skill": {
              "name": "천둥번개",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "artsInfliction",
                "label": "아츠 부착"
              }
            ],
            "summary": "전기 아크로 자신을 둘러싼 다음 전방 일정 거리를 돌진하며 경로상의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다."
          }
        ]
      },
      {
        "order": 4,
        "character": {
          "id": "arclight",
          "name": "아크라이트"
        },
        "stageIds": [
          "convert",
          "recycle"
        ],
        "title": "아크라이트의 연계 스킬 연결",
        "detail": "감전이 유지되거나 방금 소모된 직후 3초 쿨타임의 아크라이트의 연계 스킬을 사용해 물리 피해와 게이지 9 회복을 더한다.",
        "skill": {
          "name": "천둥의 울림",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "적이 감전 상태이거나 감전 상태를 소모한 후 사용할 수 있습니다.",
          "감전 상태 또는 감전 소모 후"
        ],
        "timing": "",
        "effects": [
          "적의 옆으로 순간 이동해 연속으로 베기 공격을 하여 물리 피해를 주고 스킬 게이지 9포인트를 회복합니다."
        ],
        "mechanics": [
          {
            "id": "physicalDamage",
            "label": "물리 피해"
          },
          {
            "id": "shock",
            "label": "감전"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "skill": {
              "name": "뇌정의 부름",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "목표의 감전 상태를 소모하여 이번 배틀 스킬의 피해 배율을 증가시키고, 소모한 감전 상태의 이상 레벨 +1자루의 청뢰검을 생성합니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "skill": {
              "name": "질풍 섬광",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "적이 감전 상태일 경우 감전을 소모하여 추가로 1회 공격하고 전기 피해를 주며 스킬 게이지 35포인트를 회복합니다."
          },
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "skill": {
              "name": "변화의 숨결",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "메인 컨트롤 오퍼레이터의 강력한 일격 또는 처형으로 전기 부착 상태의 적을 명중한 후 사용할 수 있습니다. 전기 부착 상태의 적을 명중하면 그 전기 부착을 소모하고 강제로 감전 상태를 부여합니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "skill": {
              "name": "실시간 프로토콜 · 연쇄 섬광",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "메인 컨트롤 오퍼레이터가 적에게 강력한 일격 피해를 준 다음 사용할 수 있습니다. 누적된 전기 에너지를 방출해 목표를 강타하며 전기 피해를 주고, 5초 동안 짧은 강제 감전 상태를 부여합니다."
          },
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "skill": {
              "name": "심판의 폭풍",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "목표가 존재하면 감전 여부와 무관하게 청뢰검 3자루를 생성합니다. 배틀 스킬 장방이의 배틀 스킬의 피해 배율과 공격 범위가 증가하며, 마지막 펠리카의 배틀 스킬이 적을 명중할 때 전기 부착을 부여합니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "skill": {
              "name": "천둥번개",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "적이 전기 부착 상태일 경우 전기 부착을 소모하여 감전 상태를 부여합니다. 전기 아크로 자신을 둘러싼 다음 전방 일정 거리를 돌진하며 경로상의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다."
          }
        ]
      },
      {
        "order": 5,
        "character": {
          "id": "antal",
          "name": "안탈"
        },
        "stageIds": [
          "payoff"
        ],
        "title": "팀 증폭 개시",
        "detail": "안탈의 궁극기으로 12초 동안 팀 전체에 전기·열기 증폭 8%를 제공한다.",
        "skill": {
          "name": "오버클록 타임",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [],
        "timing": "열기 증폭·전기 증폭 효과를 먼저 적용한 뒤 장방이의 궁극기를 이어갑니다.",
        "effects": [
          "팀 전체에게 12초 동안 전기 증폭 8%와 열기 증폭 8%를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "heatAmplification",
            "label": "열기 증폭"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 6,
        "character": {
          "id": "arclight",
          "name": "아크라이트"
        },
        "stageIds": [
          "setup",
          "convert"
        ],
        "title": "감전 준비",
        "detail": "아크라이트의 궁극기로 전기 부착을 부여하고 지연 폭발에서 이를 소모해 감전을 만든다. 파티의 외부 감전 공급도 활용할 수 있다.",
        "skill": {
          "name": "천둥번개",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [],
        "timing": "안탈의 궁극기로 전기 증폭 효과가 적용된 동안 사용해 주력 피해를 집중합니다.",
        "effects": [
          "전기 아크로 자신을 둘러싼 다음 전방 일정 거리를 돌진하며 경로상의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다.",
          "적이 전기 부착 상태일 경우 전기 부착을 소모하여 감전 상태를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "electricInfliction",
            "label": "전기 부착"
          },
          {
            "id": "shock",
            "label": "감전"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "skill": {
              "name": "변화의 숨결",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "electricInfliction",
                "label": "전기 부착"
              },
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "메인 컨트롤 오퍼레이터의 강력한 일격 또는 처형으로 전기 부착 상태의 적을 명중한 후 사용할 수 있습니다. 전기 부착 상태의 적을 명중하면 그 전기 부착을 소모하고 강제로 감전 상태를 부여합니다."
          },
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "skill": {
              "name": "심판의 폭풍",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "electricInfliction",
                "label": "전기 부착"
              },
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "배틀 스킬 장방이의 배틀 스킬의 피해 배율과 공격 범위가 증가하며, 마지막 펠리카의 배틀 스킬이 적을 명중할 때 전기 부착을 부여합니다. 배틀 스킬 장방이의 배틀 스킬의 피해 배율과 공격 범위가 증가하며, 마지막 펠리카의 배틀 스킬이 적을 명중할 때 전기 부착을 부여합니다."
          },
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "skill": {
              "name": "뇌정의 부름",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "목표의 감전 상태를 소모하여 이번 배틀 스킬의 피해 배율을 증가시키고, 소모한 감전 상태의 이상 레벨 +1자루의 청뢰검을 생성합니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "skill": {
              "name": "프로토콜ω · 뇌격",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "electricInfliction",
                "label": "전기 부착"
              }
            ],
            "summary": "하늘에서 전기 에너지를 떨어뜨려 좁은 범위 내의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "skill": {
              "name": "질풍 섬광",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "적이 감전 상태일 경우 감전을 소모하여 추가로 1회 공격하고 전기 피해를 주며 스킬 게이지 35포인트를 회복합니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "skill": {
              "name": "실시간 프로토콜 · 연쇄 섬광",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "메인 컨트롤 오퍼레이터가 적에게 강력한 일격 피해를 준 다음 사용할 수 있습니다. 누적된 전기 에너지를 방출해 목표를 강타하며 전기 피해를 주고, 5초 동안 짧은 강제 감전 상태를 부여합니다."
          }
        ]
      },
      {
        "order": 7,
        "character": {
          "id": "perlica",
          "name": "펠리카"
        },
        "stageIds": [
          "payoff"
        ],
        "title": "저비용 궁극기 마무리",
        "detail": "궁극기 에너지 80을 채워 목표 구역에 대량 전기 피해를 가한다.",
        "skill": {
          "name": "프로토콜ε · 70.41κ",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [],
        "timing": "안탈의 궁극기로 전기 증폭 효과가 적용된 동안 사용해 주력 피해를 집중합니다.",
        "effects": [],
        "mechanics": [
          {
            "id": "electricDamage",
            "label": "전기 피해"
          },
          {
            "id": "ultimateEnergy",
            "label": "궁극기 에너지"
          },
          {
            "id": "ultimate",
            "label": "궁극기"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 8,
        "character": {
          "id": "jangbangyi",
          "name": "장방이"
        },
        "stageIds": [
          "payoff"
        ],
        "title": "주력 화력 집중",
        "detail": "배틀 스킬 장방이의 배틀 스킬의 피해 배율과 공격 범위가 증가하며, 마지막 펠리카의 배틀 스킬이 적을 명중할 때 전기 부착을 부여합니다. 천리의 경지에서 처음 사용하는 장방이의 배틀 스킬은 스킬 게이지와 감전 상태를 소모하지 않습니다.",
        "skill": {
          "name": "심판의 폭풍",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [],
        "timing": "적에게 필요한 부착·이상 상태를 준비하고, 주력 피해를 집중할 수 있을 때 사용합니다.",
        "effects": [
          "배틀 스킬 장방이의 배틀 스킬의 피해 배율과 공격 범위가 증가하며, 마지막 펠리카의 배틀 스킬이 적을 명중할 때 전기 부착을 부여합니다.",
          "천리의 경지에서 처음 사용하는 장방이의 배틀 스킬은 스킬 게이지와 감전 상태를 소모하지 않습니다."
        ],
        "mechanics": [
          {
            "id": "electricInfliction",
            "label": "전기 부착"
          },
          {
            "id": "shock",
            "label": "감전"
          },
          {
            "id": "skillGauge",
            "label": "스킬 게이지"
          },
          {
            "id": "generalAttack",
            "label": "일반 공격"
          },
          {
            "id": "battleSkill",
            "label": "배틀 스킬"
          },
          {
            "id": "linkSkill",
            "label": "연계 스킬"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "skill": {
              "name": "뇌정의 부름",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "목표의 감전 상태를 소모하여 이번 배틀 스킬의 피해 배율을 증가시키고, 소모한 감전 상태의 이상 레벨 +1자루의 청뢰검을 생성합니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "skill": {
              "name": "질풍 섬광",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "적이 감전 상태일 경우 감전을 소모하여 추가로 1회 공격하고 전기 피해를 주며 스킬 게이지 35포인트를 회복합니다."
          },
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "skill": {
              "name": "변화의 숨결",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "메인 컨트롤 오퍼레이터의 강력한 일격 또는 처형으로 전기 부착 상태의 적을 명중한 후 사용할 수 있습니다. 전기 부착 상태의 적을 명중하면 그 전기 부착을 소모하고 강제로 감전 상태를 부여합니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "skill": {
              "name": "실시간 프로토콜 · 연쇄 섬광",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "메인 컨트롤 오퍼레이터가 적에게 강력한 일격 피해를 준 다음 사용할 수 있습니다. 누적된 전기 에너지를 방출해 목표를 강타하며 전기 피해를 주고, 5초 동안 짧은 강제 감전 상태를 부여합니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "skill": {
              "name": "천둥번개",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "적이 전기 부착 상태일 경우 전기 부착을 소모하여 감전 상태를 부여합니다. 전기 아크로 자신을 둘러싼 다음 전방 일정 거리를 돌진하며 경로상의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다."
          }
        ]
      }
    ],
    "supportFlow": [],
    "basicOperation": [
      {
        "order": 1,
        "title": "장방이 · 연계 스킬",
        "detail": "파티의 전기 부착 공급과 메인 컨트롤 오퍼레이터의 강력한 일격 또는 처형으로 장방이의 연계 스킬 발동 조건을 만든다."
      },
      {
        "order": 2,
        "title": "아크라이트 · 배틀 스킬",
        "detail": "감전 대상에게 아크라이트의 배틀 스킬을 사용해 추가 전기 공격과 스킬 게이지 35 회복을 확보한다."
      },
      {
        "order": 3,
        "title": "안탈 · 연계 스킬",
        "detail": "파티원이 포커싱 대상에게 물리 이상 또는 아츠 부착을 부여해 안탈의 연계 스킬의 조건을 만든다."
      },
      {
        "order": 4,
        "title": "아크라이트 · 연계 스킬",
        "detail": "감전이 유지되거나 방금 소모된 직후 3초 쿨타임의 아크라이트의 연계 스킬을 사용해 물리 피해와 게이지 9 회복을 더한다."
      },
      {
        "order": 5,
        "title": "안탈 · 궁극기",
        "detail": "안탈의 궁극기으로 12초 동안 팀 전체에 전기·열기 증폭 8%를 제공한다."
      },
      {
        "order": 6,
        "title": "아크라이트 · 궁극기",
        "detail": "아크라이트의 궁극기로 전기 부착을 부여하고 지연 폭발에서 이를 소모해 감전을 만든다. 파티의 외부 감전 공급도 활용할 수 있다."
      },
      {
        "order": 7,
        "title": "펠리카 · 궁극기",
        "detail": "궁극기 에너지 80을 채워 목표 구역에 대량 전기 피해를 가한다."
      },
      {
        "order": 8,
        "title": "장방이 · 궁극기",
        "detail": "배틀 스킬 장방이의 배틀 스킬의 피해 배율과 공격 범위가 증가하며, 마지막 펠리카의 배틀 스킬이 적을 명중할 때 전기 부착을 부여합니다. 천리의 경지에서 처음 사용하는 장방이의 배틀 스킬은 스킬 게이지와 감전 상태를 소모하지 않습니다."
      }
    ],
    "roles": [
      {
        "character": {
          "id": "jangbangyi",
          "name": "장방이"
        },
        "labels": [
          "전기 부착 생성",
          "감전·배틀 스킬 소모",
          "감전 활용",
          "전투 자원 순환"
        ],
        "relation": "펠리카의 전기 피해 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "perlica",
          "name": "펠리카"
        },
        "labels": [
          "전기 부착 생성",
          "감전 활용",
          "전투 자원 순환",
          "메인 컨트롤 후보"
        ],
        "relation": "장방이의 전기 피해 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "arclight",
          "name": "아크라이트"
        },
        "labels": [
          "전기 부착 생성",
          "전기 피해·감전 소모",
          "감전 활용",
          "전투 자원 순환"
        ],
        "relation": "장방이의 불균형 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "antal",
          "name": "안탈"
        },
        "labels": [
          "열기 취약·전기 취약 지원",
          "전투 자원 순환",
          "생존 지원",
          "메인 컨트롤 후보"
        ],
        "relation": "장방이의 전기 피해 조건과 직접 이어집니다."
      }
    ],
    "weaknesses": [
      {
        "title": "예열·상태 준비",
        "entries": [
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "axis": "전기 부착·감전 이중 준비",
            "evidence": "변화의 숨결은 전기 부착 대상에 대한 강력한 일격 또는 처형이 필요하고, 뇌정의 부름의 강화 생성은 감전 소모를 요구합니다.",
            "affected": "변화의 숨결 · 뇌정의 부름",
            "implication": "전기 부착을 감전으로 바꾼 뒤 다시 감전을 소모하는 두 단계 준비가 필요합니다. 부착 저항·이상 상태 방해·조건 발동 지연 방향의 제약에서 순환이 끊기기 쉽습니다."
          },
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "axis": "높은 궁극기 에너지 요구",
            "evidence": "심판의 폭풍은 궁극기 에너지 240을 요구하며, 주요 에너지 획득은 전기 부착 스택 소모와 청뢰검 뇌격에 연결됩니다.",
            "affected": "변화의 숨결 · 뇌정의 부름 · 심판의 폭풍",
            "implication": "강화 상태 진입 전 준비 시간이 길고, 부착 스택을 충분히 소모하지 못하면 궁극기 회전이 크게 늦어집니다. 에너지 수급 감소 방향의 제약에 민감합니다."
          },
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "axis": "메인 컨트롤 조건 점유",
            "evidence": "변화의 숨결 발동에는 메인 컨트롤 오퍼레이터의 강력한 일격 또는 처형이 필요하고, 궁극기는 일반 공격을 직접 강화합니다.",
            "affected": "변화의 숨결 · 심판의 폭풍",
            "implication": "다른 메인 컨트롤 중심 캐릭터와 운용 시간이 충돌할 수 있습니다. 교대 제한이나 공격 기회 감소에서는 조건 충족과 강화 일반 공격 활용을 동시에 놓칠 수 있습니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "물리 상태와 전기 화력의 조합 의존",
            "evidence": "오블리터레이션 프로토콜은 불균형 대상을 요구하고, 순환 프로토콜의 추가 튕김은 방어 불능 대상을 요구합니다.",
            "affected": "재능 1 · 재능 2",
            "implication": "펠리카의 전기 스킬만으로는 불균형과 방어 불능을 안정적으로 준비하기 어렵습니다. 물리 이상·불균형 지원 캐릭터가 없으면 두 재능의 효율이 제한됩니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "좁은 배틀 스킬 범위",
            "evidence": "프로토콜ω · 뇌격은 좁은 범위 내의 적에게 전기 피해와 전기 부착을 부여합니다.",
            "affected": "프로토콜ω · 뇌격",
            "implication": "적이 넓게 분산된 상황에서는 한 번에 여러 대상에게 전기 부착을 공급하기 어렵습니다. 적 분산과 이동이 많은 전투에서 준비 효율이 낮아집니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "axis": "감전 상태 의존",
            "evidence": "질풍 섬광의 추가 공격과 게이지 35 회복은 감전 소모가 필요하고, 천둥의 울림도 감전 상태 또는 감전 소모 직후에만 사용할 수 있습니다.",
            "affected": "질풍 섬광 · 천둥의 울림",
            "implication": "감전 공급이 끊기면 배틀 스킬의 핵심 보상과 짧은 연계 순환이 동시에 사라집니다. 이상 상태 저항·부착 방해 방향의 제약에 매우 민감합니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "axis": "추가 효과 반복 요구",
            "evidence": "황무지의 여행자는 질풍 섬광의 추가 효과를 기본 3회 발동해야 팀 전기 피해 증가를 제공합니다.",
            "affected": "질풍 섬광 · 황무지의 여행자",
            "implication": "감전을 세 번 준비하고 소모해야 팀 버프가 시작됩니다. 짧은 전투나 대상이 빠르게 처치되는 전투에서는 버프 준비가 늦습니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "axis": "궁극기 의존 자체 감전 공급",
            "evidence": "자체 스킬 중 안정적으로 전기 부착과 감전을 연속 제공하는 수단은 궁극기 천둥번개입니다.",
            "affected": "천둥번개 · 질풍 섬광",
            "implication": "궁극기 전에는 외부 감전 공급이 없으면 핵심 순환 진입이 어렵습니다. 궁극기 에너지 감소나 시작 에너지 부족 방향의 제약이 첫 순환을 지연시킵니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "axis": "잠재력에 따른 버프 준비 차이",
            "evidence": "P3은 팀 전기 피해 증가량을 1.3배로 높이고 P5는 발동에 필요한 추가 효과 횟수를 3회에서 2회로 줄입니다.",
            "affected": "P3 · P5",
            "implication": "핵심 팀 지원 효과의 크기와 준비 속도가 잠재력에 크게 좌우됩니다. 낮은 잠재력에서는 전기 파티 지원이 늦고 유지 효율도 낮습니다."
          },
          {
            "character": {
              "id": "antal",
              "name": "안탈"
            },
            "axis": "단일 목표 포커싱 제한",
            "evidence": "지정 연구 대상은 최대 1명의 적만 포커싱할 수 있습니다.",
            "affected": "지정 연구 대상 · 자기 폭풍 실험장",
            "implication": "다수전에서는 한 대상만 취약과 상태 재부여 지원을 받을 수 있습니다. 목표가 자주 바뀌거나 여러 핵심 적이 동시에 등장하면 지원 범위가 제한됩니다."
          },
          {
            "character": {
              "id": "antal",
              "name": "안탈"
            },
            "axis": "외부 상태 효과 의존",
            "evidence": "자기 폭풍 실험장은 포커싱 대상에게 물리 이상 효과 또는 아츠 부착이 있어야 사용할 수 있습니다.",
            "affected": "자기 폭풍 실험장",
            "implication": "안탈 혼자서는 연계 스킬 조건을 안정적으로 준비하기 어렵습니다. 파티의 상태 부여가 늦거나 적이 면역이면 긴 25초 쿨타임의 연계를 사용하지 못합니다."
          },
          {
            "character": {
              "id": "antal",
              "name": "안탈"
            },
            "axis": "긴 연계 스킬 쿨타임",
            "evidence": "자기 폭풍 실험장의 쿨타임은 25초입니다.",
            "affected": "자기 폭풍 실험장",
            "implication": "상태 재부여 기회가 자주 오지 않으므로 한 번의 사용 시점과 재부여할 상태 선택이 중요합니다. 쿨타임 증가 방향의 제약에서 지원 공백이 커집니다."
          },
          {
            "character": {
              "id": "antal",
              "name": "안탈"
            },
            "axis": "조건부·제한형 치유",
            "evidence": "즉흥적인 천재성은 증폭 상태 팀원이 스킬 피해를 줘야 발동하고 각 오퍼레이터마다 30초에 1회만 치유합니다.",
            "affected": "즉흥적인 천재성 · 오버클록 타임",
            "implication": "지속적인 회복보다는 궁극기 증폭 창에 묶인 간헐적 치유입니다. 지속 피해가 강하거나 스킬을 사용하지 못하는 상황에서는 생존 지원이 부족합니다."
          },
          {
            "character": {
              "id": "antal",
              "name": "안탈"
            },
            "axis": "긴 포커싱 준비와 잠재력 의존",
            "evidence": "P5의 추가 취약 4%는 같은 목표를 20초 동안 포커싱해야 하며, P3의 게이지 반환은 포커싱 대상이 처치될 때만 발생합니다.",
            "affected": "P3 · P5",
            "implication": "짧은 전투에서는 추가 취약이 활성화되기 전에 목표가 처치될 수 있고, 보스전에서는 처치 조건 게이지 반환을 받기 어렵습니다. 잠재력 효과가 전투 유형에 따라 크게 달라집니다."
          }
        ]
      },
      {
        "title": "스킬 게이지·궁극기 순환",
        "entries": [
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "axis": "높은 궁극기 에너지 요구",
            "evidence": "심판의 폭풍은 궁극기 에너지 240을 요구하며, 주요 에너지 획득은 전기 부착 스택 소모와 청뢰검 뇌격에 연결됩니다.",
            "affected": "변화의 숨결 · 뇌정의 부름 · 심판의 폭풍",
            "implication": "강화 상태 진입 전 준비 시간이 길고, 부착 스택을 충분히 소모하지 못하면 궁극기 회전이 크게 늦어집니다. 에너지 수급 감소 방향의 제약에 민감합니다."
          },
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "axis": "확률형 생존과 긴 회복 제한",
            "evidence": "하늘의 가호는 기본 9% 확률의 피해 면역이며 청뢰검 수에 따라 증가하고, 발동 후 회복은 99초마다 1회입니다.",
            "affected": "하늘의 가호",
            "implication": "생존 보조가 확률에 의존하고 회복 재사용 간격도 매우 깁니다. 지속 압박이나 확정 생존이 필요한 상황에서는 안정적인 방어 수단으로 보기 어렵습니다."
          },
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "axis": "잠재력 의존 보완",
            "evidence": "P3은 감전 소모 후 게이지 반환과 청뢰검 지속 연장을, P4는 궁극기 에너지 감소를, P5는 전기 저항 무시를 제공합니다.",
            "affected": "P3 · P4 · P5",
            "implication": "기본 구조의 게이지 부담, 축적 유지, 높은 궁극기 요구량과 저항 대응을 잠재력이 크게 보완합니다. 잠재력 단계에 따라 체감 순환과 최종 화력 차이가 큽니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "직접적인 자원 회복 부재",
            "evidence": "제공된 기본 스킬과 재능에는 스킬 게이지 반환이나 궁극기 에너지 직접 획득 효과가 없습니다.",
            "affected": "전 스킬 순환",
            "implication": "코스트 100 배틀 스킬과 궁극기 에너지 80을 외부 자원 공급과 자연 회복에 의존합니다. 자원 회복 감소 방향의 제약에서 스킬 빈도가 낮아집니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "axis": "감전 상태 의존",
            "evidence": "질풍 섬광의 추가 공격과 게이지 35 회복은 감전 소모가 필요하고, 천둥의 울림도 감전 상태 또는 감전 소모 직후에만 사용할 수 있습니다.",
            "affected": "질풍 섬광 · 천둥의 울림",
            "implication": "감전 공급이 끊기면 배틀 스킬의 핵심 보상과 짧은 연계 순환이 동시에 사라집니다. 이상 상태 저항·부착 방해 방향의 제약에 매우 민감합니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "axis": "궁극기 의존 자체 감전 공급",
            "evidence": "자체 스킬 중 안정적으로 전기 부착과 감전을 연속 제공하는 수단은 궁극기 천둥번개입니다.",
            "affected": "천둥번개 · 질풍 섬광",
            "implication": "궁극기 전에는 외부 감전 공급이 없으면 핵심 순환 진입이 어렵습니다. 궁극기 에너지 감소나 시작 에너지 부족 방향의 제약이 첫 순환을 지연시킵니다."
          },
          {
            "character": {
              "id": "antal",
              "name": "안탈"
            },
            "axis": "외부 상태 효과 의존",
            "evidence": "자기 폭풍 실험장은 포커싱 대상에게 물리 이상 효과 또는 아츠 부착이 있어야 사용할 수 있습니다.",
            "affected": "자기 폭풍 실험장",
            "implication": "안탈 혼자서는 연계 스킬 조건을 안정적으로 준비하기 어렵습니다. 파티의 상태 부여가 늦거나 적이 면역이면 긴 25초 쿨타임의 연계를 사용하지 못합니다."
          },
          {
            "character": {
              "id": "antal",
              "name": "안탈"
            },
            "axis": "긴 연계 스킬 쿨타임",
            "evidence": "자기 폭풍 실험장의 쿨타임은 25초입니다.",
            "affected": "자기 폭풍 실험장",
            "implication": "상태 재부여 기회가 자주 오지 않으므로 한 번의 사용 시점과 재부여할 상태 선택이 중요합니다. 쿨타임 증가 방향의 제약에서 지원 공백이 커집니다."
          },
          {
            "character": {
              "id": "antal",
              "name": "안탈"
            },
            "axis": "조건부·제한형 치유",
            "evidence": "즉흥적인 천재성은 증폭 상태 팀원이 스킬 피해를 줘야 발동하고 각 오퍼레이터마다 30초에 1회만 치유합니다.",
            "affected": "즉흥적인 천재성 · 오버클록 타임",
            "implication": "지속적인 회복보다는 궁극기 증폭 창에 묶인 간헐적 치유입니다. 지속 피해가 강하거나 스킬을 사용하지 못하는 상황에서는 생존 지원이 부족합니다."
          },
          {
            "character": {
              "id": "antal",
              "name": "안탈"
            },
            "axis": "긴 포커싱 준비와 잠재력 의존",
            "evidence": "P5의 추가 취약 4%는 같은 목표를 20초 동안 포커싱해야 하며, P3의 게이지 반환은 포커싱 대상이 처치될 때만 발생합니다.",
            "affected": "P3 · P5",
            "implication": "짧은 전투에서는 추가 취약이 활성화되기 전에 목표가 처치될 수 있고, 보스전에서는 처치 조건 게이지 반환을 받기 어렵습니다. 잠재력 효과가 전투 유형에 따라 크게 달라집니다."
          }
        ]
      },
      {
        "title": "위치·대상 수",
        "entries": [
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "axis": "전기 부착·감전 이중 준비",
            "evidence": "변화의 숨결은 전기 부착 대상에 대한 강력한 일격 또는 처형이 필요하고, 뇌정의 부름의 강화 생성은 감전 소모를 요구합니다.",
            "affected": "변화의 숨결 · 뇌정의 부름",
            "implication": "전기 부착을 감전으로 바꾼 뒤 다시 감전을 소모하는 두 단계 준비가 필요합니다. 부착 저항·이상 상태 방해·조건 발동 지연 방향의 제약에서 순환이 끊기기 쉽습니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "메인 컨트롤 강력한 일격 의존",
            "evidence": "연쇄 섬광은 메인 컨트롤 오퍼레이터가 강력한 일격 피해를 준 다음에만 사용할 수 있습니다.",
            "affected": "실시간 프로토콜 · 연쇄 섬광",
            "implication": "메인 컨트롤의 일반 공격 순환이나 강력한 일격 기회가 끊기면 핵심 감전 공급이 지연됩니다. 교대 제한·공격 중단 방향의 제약에 취약합니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "짧은 감전 지속 시간",
            "evidence": "연쇄 섬광이 부여하는 강제 감전은 기본 5초 동안 지속됩니다.",
            "affected": "연쇄 섬광 · P1",
            "implication": "감전이 유지되는 짧은 시간 안에 아츠 공격을 집중해야 합니다. 후속 스킬 지연이나 적 이동으로 피해 집중 창을 놓치기 쉽고, 지속 연장은 P1에 배치되어 있습니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "좁은 배틀 스킬 범위",
            "evidence": "프로토콜ω · 뇌격은 좁은 범위 내의 적에게 전기 피해와 전기 부착을 부여합니다.",
            "affected": "프로토콜ω · 뇌격",
            "implication": "적이 넓게 분산된 상황에서는 한 번에 여러 대상에게 전기 부착을 공급하기 어렵습니다. 적 분산과 이동이 많은 전투에서 준비 효율이 낮아집니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "axis": "궁극기 의존 자체 감전 공급",
            "evidence": "자체 스킬 중 안정적으로 전기 부착과 감전을 연속 제공하는 수단은 궁극기 천둥번개입니다.",
            "affected": "천둥번개 · 질풍 섬광",
            "implication": "궁극기 전에는 외부 감전 공급이 없으면 핵심 순환 진입이 어렵습니다. 궁극기 에너지 감소나 시작 에너지 부족 방향의 제약이 첫 순환을 지연시킵니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "axis": "근접 이동과 대상 추적",
            "evidence": "질풍 섬광과 천둥의 울림은 적의 옆으로 순간 이동해 공격하며, 궁극기는 전방 일정 거리를 돌진합니다.",
            "affected": "질풍 섬광 · 천둥의 울림 · 천둥번개",
            "implication": "빠른 이동은 장점이지만 위험 지역이나 원하지 않는 위치로 진입할 수 있습니다. 적이 흩어지거나 이동 경로가 제한되면 공격과 후속 연결이 불안정해집니다."
          },
          {
            "character": {
              "id": "antal",
              "name": "안탈"
            },
            "axis": "단일 목표 포커싱 제한",
            "evidence": "지정 연구 대상은 최대 1명의 적만 포커싱할 수 있습니다.",
            "affected": "지정 연구 대상 · 자기 폭풍 실험장",
            "implication": "다수전에서는 한 대상만 취약과 상태 재부여 지원을 받을 수 있습니다. 목표가 자주 바뀌거나 여러 핵심 적이 동시에 등장하면 지원 범위가 제한됩니다."
          }
        ]
      },
      {
        "title": "잠재력 의존",
        "entries": [
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "axis": "잠재력 의존 보완",
            "evidence": "P3은 감전 소모 후 게이지 반환과 청뢰검 지속 연장을, P4는 궁극기 에너지 감소를, P5는 전기 저항 무시를 제공합니다.",
            "affected": "P3 · P4 · P5",
            "implication": "기본 구조의 게이지 부담, 축적 유지, 높은 궁극기 요구량과 저항 대응을 잠재력이 크게 보완합니다. 잠재력 단계에 따라 체감 순환과 최종 화력 차이가 큽니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "짧은 감전 지속 시간",
            "evidence": "연쇄 섬광이 부여하는 강제 감전은 기본 5초 동안 지속됩니다.",
            "affected": "연쇄 섬광 · P1",
            "implication": "감전이 유지되는 짧은 시간 안에 아츠 공격을 집중해야 합니다. 후속 스킬 지연이나 적 이동으로 피해 집중 창을 놓치기 쉽고, 지속 연장은 P1에 배치되어 있습니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "잠재력에 집중된 감전·궁극기 강화",
            "evidence": "P1은 감전 지속을 늘리고, P3·P4는 감전 중 공격력과 아츠 피해 증가 효과를 강화하며, P5는 궁극기 치명타 확률을 올립니다.",
            "affected": "P1 · P3 · P4 · P5",
            "implication": "기본 감전 창과 최종 화력이 잠재력에서 크게 개선됩니다. 잠재력 단계에 따라 감전 지원과 궁극기 마무리 성능 차이가 큽니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "axis": "잠재력에 따른 버프 준비 차이",
            "evidence": "P3은 팀 전기 피해 증가량을 1.3배로 높이고 P5는 발동에 필요한 추가 효과 횟수를 3회에서 2회로 줄입니다.",
            "affected": "P3 · P5",
            "implication": "핵심 팀 지원 효과의 크기와 준비 속도가 잠재력에 크게 좌우됩니다. 낮은 잠재력에서는 전기 파티 지원이 늦고 유지 효율도 낮습니다."
          },
          {
            "character": {
              "id": "antal",
              "name": "안탈"
            },
            "axis": "긴 포커싱 준비와 잠재력 의존",
            "evidence": "P5의 추가 취약 4%는 같은 목표를 20초 동안 포커싱해야 하며, P3의 게이지 반환은 포커싱 대상이 처치될 때만 발생합니다.",
            "affected": "P3 · P5",
            "implication": "짧은 전투에서는 추가 취약이 활성화되기 전에 목표가 처치될 수 있고, 보스전에서는 처치 조건 게이지 반환을 받기 어렵습니다. 잠재력 효과가 전투 유형에 따라 크게 달라집니다."
          }
        ]
      },
      {
        "title": "메인 컨트롤·조작 집중",
        "entries": [
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "axis": "메인 컨트롤 조건 점유",
            "evidence": "변화의 숨결 발동에는 메인 컨트롤 오퍼레이터의 강력한 일격 또는 처형이 필요하고, 궁극기는 일반 공격을 직접 강화합니다.",
            "affected": "변화의 숨결 · 심판의 폭풍",
            "implication": "다른 메인 컨트롤 중심 캐릭터와 운용 시간이 충돌할 수 있습니다. 교대 제한이나 공격 기회 감소에서는 조건 충족과 강화 일반 공격 활용을 동시에 놓칠 수 있습니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "메인 컨트롤 강력한 일격 의존",
            "evidence": "연쇄 섬광은 메인 컨트롤 오퍼레이터가 강력한 일격 피해를 준 다음에만 사용할 수 있습니다.",
            "affected": "실시간 프로토콜 · 연쇄 섬광",
            "implication": "메인 컨트롤의 일반 공격 순환이나 강력한 일격 기회가 끊기면 핵심 감전 공급이 지연됩니다. 교대 제한·공격 중단 방향의 제약에 취약합니다."
          }
        ]
      }
    ],
    "discoveries": [
      {
        "character": {
          "id": "jangbangyi",
          "name": "장방이"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 배틀 스킬 비중이 높지만, 연계 스킬은 전기 부착·강력한 일격 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "perlica",
          "name": "펠리카"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 배틀 스킬 비중이 높지만, 연계 스킬은 강력한 일격·메인 컨트롤 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "arclight",
          "name": "아크라이트"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 배틀 스킬 비중이 높지만, 연계 스킬은 감전 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "antal",
          "name": "안탈"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 연계 스킬 비중이 높지만, 연계 스킬은 아츠 부착 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      }
    ],
    "designHints": [
      {
        "id": "normal",
        "title": "일반 공격 의존도",
        "pressure": "일반 공격 피해 비중을 낮추는 방향",
        "impact": "강화 상태나 메인 컨트롤 중 일반 공격에 몰린 화력 구간이 짧아집니다.",
        "opportunity": "장방이의 연계 스킬, 펠리카의 연계 스킬처럼 연계·배틀 스킬 중심의 보조 축이 상대적으로 중요해질 수 있습니다.",
        "caution": "일반 공격과 강력한 일격을 동시에 완전히 막으면 스킬 게이지 회복과 불균형 순환까지 함께 끊길 수 있습니다.",
        "characters": [
          {
            "id": "perlica",
            "name": "펠리카"
          }
        ]
      },
      {
        "id": "ultimate",
        "title": "궁극기 반복 의존도",
        "pressure": "궁극기 반복 사용의 효율이 점차 낮아지는 방향",
        "impact": "궁극기를 중심으로 한 강화 구간과 마무리 빈도가 줄어듭니다.",
        "opportunity": "궁극기 에너지를 다른 가치로 돌리거나 배틀·연계 스킬을 주력화하는 운용을 찾게 됩니다.",
        "caution": "첫 궁극기까지 무력화하면 준비 과정의 의미도 사라질 수 있으므로 반복 효율을 조절하는 편이 발견을 만들기 쉽습니다.",
        "characters": [
          {
            "id": "jangbangyi",
            "name": "장방이"
          },
          {
            "id": "perlica",
            "name": "펠리카"
          },
          {
            "id": "arclight",
            "name": "아크라이트"
          },
          {
            "id": "antal",
            "name": "안탈"
          }
        ]
      },
      {
        "id": "battle",
        "title": "배틀 스킬 피해 비중",
        "pressure": "배틀 스킬의 직접 피해를 줄이되 연계 스킬 순환은 열어주는 방향",
        "impact": "스킬 게이지를 사용해 즉시 내는 화력이 줄어듭니다.",
        "opportunity": "배틀 스킬을 상태 생성·변환 용도로만 쓰고, 연계 스킬이나 궁극기 외 추가 피해를 주력으로 삼는 구조가 떠오를 수 있습니다.",
        "caution": "배틀 스킬의 상태 부여까지 막으면 후속 연계 조건 자체가 사라질 수 있습니다.",
        "characters": [
          {
            "id": "jangbangyi",
            "name": "장방이"
          },
          {
            "id": "perlica",
            "name": "펠리카"
          },
          {
            "id": "arclight",
            "name": "아크라이트"
          },
          {
            "id": "antal",
            "name": "안탈"
          }
        ]
      },
      {
        "id": "link",
        "title": "연계 스킬 빈도",
        "pressure": "연계 스킬 사용 빈도와 쿨타임을 크게 흔드는 방향",
        "impact": "조건을 자주 열 수 있는 파티일수록 순환 속도가 크게 달라집니다.",
        "opportunity": "연계 횟수가 늘어날 때 생기는 자원 수급과 보조 피해, 반대로 연계에 대가가 생길 때의 대체 순서를 비교할 수 있습니다.",
        "caution": "연계 조건과 쿨타임을 동시에 막으면 조합의 상호작용이 사라질 수 있습니다.",
        "characters": [
          {
            "id": "jangbangyi",
            "name": "장방이"
          },
          {
            "id": "arclight",
            "name": "아크라이트"
          },
          {
            "id": "antal",
            "name": "안탈"
          }
        ]
      },
      {
        "id": "stack",
        "title": "부착·방어 불능 축적 속도",
        "pressure": "같은 대상에게 스택을 연속으로 쌓는 속도를 제한하는 방향",
        "impact": "최대 스택을 전제로 하는 동결·강타·갑옷 파괴·취약 발동 시점이 늦어집니다.",
        "opportunity": "낮은 스택에서 바로 작동하는 스킬, 강제 이상, 직접 부여 효과의 가치가 올라갈 수 있습니다.",
        "caution": "부착 자체를 금지하면 대체 운용이 아니라 파티의 핵심 문법을 삭제하게 됩니다.",
        "characters": [
          {
            "id": "jangbangyi",
            "name": "장방이"
          },
          {
            "id": "perlica",
            "name": "펠리카"
          },
          {
            "id": "arclight",
            "name": "아크라이트"
          },
          {
            "id": "antal",
            "name": "안탈"
          }
        ]
      }
    ],
    "mechanicProfile": {
      "mechanicIds": [
        "shock",
        "electricInfliction",
        "electricDamage",
        "ultimate",
        "artsInfliction",
        "ultimateEnergy",
        "powerStrike",
        "mainControl",
        "physicalDamage",
        "battleSkill",
        "defenseless",
        "execution",
        "skillGauge",
        "healing",
        "imbalance",
        "heatVulnerability",
        "heatAmplification",
        "generalAttack",
        "linkSkill"
      ],
      "mechanicScores": {
        "shock": 37.5,
        "electricInfliction": 18.5,
        "electricDamage": 17,
        "ultimate": 15,
        "artsInfliction": 11.5,
        "ultimateEnergy": 10.5,
        "powerStrike": 9,
        "mainControl": 9,
        "physicalDamage": 6.5,
        "battleSkill": 6,
        "defenseless": 4.5,
        "execution": 4.5,
        "skillGauge": 4.5,
        "healing": 4.5,
        "imbalance": 3,
        "heatVulnerability": 3,
        "heatAmplification": 3,
        "generalAttack": 3,
        "linkSkill": 3,
        "heatDamage": 0,
        "frostDamage": 0,
        "natureDamage": 0,
        "artsDamage": 0,
        "heatInfliction": 0,
        "frostInfliction": 0,
        "natureInfliction": 0,
        "artsAbnormality": 0,
        "combustion": 0,
        "freeze": 0,
        "corrosion": 0,
        "launch": 0,
        "knockdown": 0,
        "smash": 0,
        "armorBreak": 0,
        "artsVulnerability": 0,
        "physicalVulnerability": 0,
        "electricVulnerability": 0,
        "frostVulnerability": 0,
        "natureVulnerability": 0,
        "artsAmplification": 0,
        "physicalAmplification": 0,
        "electricAmplification": 0,
        "frostAmplification": 0,
        "natureAmplification": 0,
        "skillGaugeReturn": 0,
        "protection": 0,
        "fortification": 0,
        "weakness": 0,
        "comboHit": 0,
        "cleanse": 0,
        "slow": 0,
        "haste": 0,
        "originiumCrystal": 0
      },
      "dominantAction": "battleSkill",
      "actionTotals": {
        "generalAttack": 6,
        "battleSkill": 29,
        "linkSkill": 24,
        "ultimate": 22
      },
      "hintIds": [
        "normal",
        "ultimate",
        "battle",
        "link",
        "stack"
      ],
      "hintTitles": [
        "일반 공격 의존도",
        "궁극기 반복 의존도",
        "배틀 스킬 피해 비중",
        "연계 스킬 빈도",
        "부착·방어 불능 축적 속도"
      ],
      "weaknessAxes": [
        "전기 부착·감전 이중 준비",
        "높은 궁극기 에너지 요구",
        "메인 컨트롤 조건 점유",
        "물리 상태와 전기 화력의 조합 의존",
        "좁은 배틀 스킬 범위",
        "감전 상태 의존",
        "추가 효과 반복 요구",
        "궁극기 의존 자체 감전 공급",
        "잠재력에 따른 버프 준비 차이",
        "단일 목표 포커싱 제한",
        "외부 상태 효과 의존",
        "긴 연계 스킬 쿨타임",
        "조건부·제한형 치유",
        "긴 포커싱 준비와 잠재력 의존",
        "높은 궁극기 에너지 요구",
        "확률형 생존과 긴 회복 제한",
        "잠재력 의존 보완",
        "직접적인 자원 회복 부재",
        "감전 상태 의존",
        "궁극기 의존 자체 감전 공급",
        "외부 상태 효과 의존",
        "긴 연계 스킬 쿨타임",
        "조건부·제한형 치유",
        "긴 포커싱 준비와 잠재력 의존",
        "전기 부착·감전 이중 준비",
        "메인 컨트롤 강력한 일격 의존",
        "짧은 감전 지속 시간",
        "좁은 배틀 스킬 범위",
        "궁극기 의존 자체 감전 공급",
        "근접 이동과 대상 추적",
        "단일 목표 포커싱 제한",
        "잠재력 의존 보완",
        "짧은 감전 지속 시간",
        "잠재력에 집중된 감전·궁극기 강화",
        "잠재력에 따른 버프 준비 차이",
        "긴 포커싱 준비와 잠재력 의존",
        "메인 컨트롤 조건 점유",
        "메인 컨트롤 강력한 일격 의존"
      ],
      "dependencyLabels": [
        "감전",
        "전기 부착",
        "아츠 부착",
        "궁극기 에너지",
        "배틀 스킬"
      ]
    }
  },
  {
    "schemaVersion": 1,
    "id": "party-last-light-tangtang-xaihi-perlica",
    "exportedAt": "2026-07-25T07:05:30.870Z",
    "title": "라스트 라이트 · 탕탕 · 자이히 · 펠리카 파티 분석",
    "party": [
      {
        "id": "last-light",
        "name": "라스트 라이트",
        "order": 1
      },
      {
        "id": "tangtang",
        "name": "탕탕",
        "order": 2
      },
      {
        "id": "xaihi",
        "name": "자이히",
        "order": 3
      },
      {
        "id": "perlica",
        "name": "펠리카",
        "order": 4
      }
    ],
    "summary": {
      "title": "파티 전투 구조 분석",
      "sentence": "전기 부착·냉기 부착을 준비해 감전 조건으로 전환하고, 궁극기·연계 스킬에 화력을 모으는 파티입니다.",
      "dominantAction": "ultimate",
      "actionTotals": {
        "generalAttack": 6,
        "battleSkill": 18,
        "linkSkill": 19,
        "ultimate": 22
      },
      "dependencies": [
        {
          "id": "frostInfliction",
          "label": "냉기 부착",
          "color": "frost",
          "level": "매우 높음",
          "score": 28
        },
        {
          "id": "ultimateEnergy",
          "label": "궁극기 에너지",
          "color": "orange",
          "level": "매우 높음",
          "score": 14.5
        },
        {
          "id": "powerStrike",
          "label": "강력한 일격",
          "color": "orange",
          "level": "매우 높음",
          "score": 12
        },
        {
          "id": "skillGauge",
          "label": "스킬 게이지",
          "color": "cyan",
          "level": "매우 높음",
          "score": 11
        },
        {
          "id": "ultimate",
          "label": "궁극기",
          "color": "orange",
          "level": "주력 행동",
          "score": 22
        }
      ]
    },
    "diagram": {
      "nodes": [
        {
          "order": 1,
          "character": {
            "id": "last-light",
            "name": "라스트 라이트"
          },
          "skill": {
            "name": "겨울 포식자",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "라스트 라이트의 연계 스킬 소모"
        },
        {
          "order": 2,
          "character": {
            "id": "xaihi",
            "name": "자이히"
          },
          "skill": {
            "name": "스트레스 테스트",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "냉기 피해 보조"
        },
        {
          "order": 3,
          "character": {
            "id": "tangtang",
            "name": "탕탕"
          },
          "skill": {
            "name": "야, 강물! 도와줘!",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "와류 생성"
        },
        {
          "order": 4,
          "character": {
            "id": "perlica",
            "name": "펠리카"
          },
          "skill": {
            "name": "실시간 프로토콜 · 연쇄 섬광",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "강력한 일격 조건"
        },
        {
          "order": 5,
          "character": {
            "id": "tangtang",
            "name": "탕탕"
          },
          "skill": {
            "name": "우당탕탕 파도!",
            "type": "배틀 스킬",
            "typeId": "battleSkill",
            "index": 1
          },
          "title": "용오름 전환"
        },
        {
          "order": 6,
          "character": {
            "id": "xaihi",
            "name": "자이히"
          },
          "skill": {
            "name": "스택 오버플로",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "팀 증폭·정화"
        },
        {
          "order": 7,
          "character": {
            "id": "perlica",
            "name": "펠리카"
          },
          "skill": {
            "name": "프로토콜ε · 70.41κ",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "저비용 궁극기 마무리"
        },
        {
          "order": 8,
          "character": {
            "id": "last-light",
            "name": "라스트 라이트"
          },
          "skill": {
            "name": "마지막 인사",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "취약 궁극기"
        }
      ],
      "connections": [
        {
          "fromOrder": 1,
          "toOrder": 2,
          "label": "냉기 부착",
          "preparationRoutes": [
            {
              "character": {
                "id": "last-light",
                "name": "라스트 라이트"
              },
              "skill": {
                "name": "세쉬카의 비전",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "frostInfliction",
                  "label": "냉기 부착"
                }
              ],
              "summary": "지속 시간 15초 15초 동안 해당 메인 컨트롤 오퍼레이터가 사용한 1회의 강력한 일격이 라스트 라이트의 환영을 소환해 목표를 추격하며 냉기 피해를 주고 냉기 부착 상태를 부여합니다. 메인 컨트롤 오퍼레이터의 무기에 저온 주입을 부여하고 스킬 게이지 30포인트를 반환합니다."
            },
            {
              "character": {
                "id": "tangtang",
                "name": "탕탕"
              },
              "skill": {
                "name": "우당탕탕 파도!",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "frostInfliction",
                  "label": "냉기 부착"
                }
              ],
              "summary": "용오름은 범위 내의 적에게 냉기 부착 1스택을 부여하고 지속적으로 냉기 피해를 줍니다. 와류를 소모해 생성한 용오름의 개수에 따라 스킬 게이지를 반환하며, 와류마다 20포인트를 반환합니다."
            },
            {
              "character": {
                "id": "last-light",
                "name": "라스트 라이트"
              },
              "skill": {
                "name": "겨울 포식자",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "frostInfliction",
                  "label": "냉기 부착"
                }
              ],
              "summary": "적에게 냉기 부착 3스택 혹은 그 이상이 쌓였을 때 사용할 수 있습니다."
            },
            {
              "character": {
                "id": "tangtang",
                "name": "탕탕"
              },
              "skill": {
                "name": "야, 강물! 도와줘!",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "frostInfliction",
                  "label": "냉기 부착"
                }
              ],
              "summary": "적이 냉기 부착을 부여받았거나 아츠 폭발 피해를 받았을 때 사용할 수 있습니다."
            }
          ]
        },
        {
          "fromOrder": 2,
          "toOrder": 3,
          "label": "냉기 부착",
          "preparationRoutes": [
            {
              "character": {
                "id": "last-light",
                "name": "라스트 라이트"
              },
              "skill": {
                "name": "세쉬카의 비전",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "frostInfliction",
                  "label": "냉기 부착"
                }
              ],
              "summary": "지속 시간 15초 15초 동안 해당 메인 컨트롤 오퍼레이터가 사용한 1회의 강력한 일격이 라스트 라이트의 환영을 소환해 목표를 추격하며 냉기 피해를 주고 냉기 부착 상태를 부여합니다. 메인 컨트롤 오퍼레이터의 무기에 저온 주입을 부여하고 스킬 게이지 30포인트를 반환합니다."
            },
            {
              "character": {
                "id": "tangtang",
                "name": "탕탕"
              },
              "skill": {
                "name": "우당탕탕 파도!",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "frostInfliction",
                  "label": "냉기 부착"
                }
              ],
              "summary": "용오름은 범위 내의 적에게 냉기 부착 1스택을 부여하고 지속적으로 냉기 피해를 줍니다. 와류를 소모해 생성한 용오름의 개수에 따라 스킬 게이지를 반환하며, 와류마다 20포인트를 반환합니다."
            },
            {
              "character": {
                "id": "last-light",
                "name": "라스트 라이트"
              },
              "skill": {
                "name": "겨울 포식자",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "frostInfliction",
                  "label": "냉기 부착"
                }
              ],
              "summary": "적에게 냉기 부착 3스택 혹은 그 이상이 쌓였을 때 사용할 수 있습니다."
            },
            {
              "character": {
                "id": "xaihi",
                "name": "자이히"
              },
              "skill": {
                "name": "스트레스 테스트",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "frostInfliction",
                  "label": "냉기 부착"
                }
              ],
              "summary": "지원 결정체의 생명력 회복 횟수를 모두 소모했을 때 사용할 수 있습니다. 짧게 차지하여 지원 결정체를 적에게 투척해 냉기 피해를 주고 냉기 부착 상태를 부여합니다."
            }
          ]
        },
        {
          "fromOrder": 3,
          "toOrder": 4,
          "label": "다음 조건 연결",
          "preparationRoutes": []
        },
        {
          "fromOrder": 4,
          "toOrder": 5,
          "label": "다음 조건 연결",
          "preparationRoutes": []
        },
        {
          "fromOrder": 5,
          "toOrder": 6,
          "label": "스킬 게이지 재투자",
          "preparationRoutes": []
        },
        {
          "fromOrder": 6,
          "toOrder": 7,
          "label": "다음 조건 연결",
          "preparationRoutes": []
        },
        {
          "fromOrder": 7,
          "toOrder": 8,
          "label": "궁극기 준비",
          "preparationRoutes": []
        }
      ]
    },
    "combatFlow": [
      {
        "order": 1,
        "character": {
          "id": "last-light",
          "name": "라스트 라이트"
        },
        "stageIds": [
          "setup",
          "convert",
          "payoff"
        ],
        "title": "라스트 라이트의 연계 스킬 소모",
        "detail": "라스트 라이트의 연계 스킬로 모든 냉기 부착을 소모해 스택 비례 피해·궁극기 에너지·저체온증의 냉기 취약을 동시에 확보한다.",
        "skill": {
          "name": "겨울 포식자",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "적에게 냉기 부착 3스택 혹은 그 이상이 쌓였을 때 사용할 수 있습니다.",
          "냉기 부착 3스택 이상"
        ],
        "timing": "",
        "effects": [
          "목표에 쌓인 냉기 부착을 전부 소모하고 대상에게 냉기 부착의 스택 수치에 따른 냉기 피해를 주며, 소모한 스택 수치에 따라 궁극기 에너지를 획득합니다.",
          "기초로 궁극기 에너지 40을 획득하며, 중첩된 부착 스택을 소모할 때마다 추가로 궁극기 에너지 15를 획득합니다."
        ],
        "mechanics": [
          {
            "id": "frostInfliction",
            "label": "냉기 부착"
          },
          {
            "id": "frostVulnerability",
            "label": "냉기 취약"
          },
          {
            "id": "ultimateEnergy",
            "label": "궁극기 에너지"
          },
          {
            "id": "ultimate",
            "label": "궁극기"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "last-light",
              "name": "라스트 라이트"
            },
            "skill": {
              "name": "세쉬카의 비전",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "지속 시간 15초 15초 동안 해당 메인 컨트롤 오퍼레이터가 사용한 1회의 강력한 일격이 라스트 라이트의 환영을 소환해 목표를 추격하며 냉기 피해를 주고 냉기 부착 상태를 부여합니다. 메인 컨트롤 오퍼레이터의 무기에 저온 주입을 부여하고 스킬 게이지 30포인트를 반환합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "skill": {
              "name": "우당탕탕 파도!",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "용오름은 범위 내의 적에게 냉기 부착 1스택을 부여하고 지속적으로 냉기 피해를 줍니다. 와류를 소모해 생성한 용오름의 개수에 따라 스킬 게이지를 반환하며, 와류마다 20포인트를 반환합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "skill": {
              "name": "야, 강물! 도와줘!",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "적이 냉기 부착을 부여받았거나 아츠 폭발 피해를 받았을 때 사용할 수 있습니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "skill": {
              "name": "스트레스 테스트",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "지원 결정체의 생명력 회복 횟수를 모두 소모했을 때 사용할 수 있습니다. 짧게 차지하여 지원 결정체를 적에게 투척해 냉기 피해를 주고 냉기 부착 상태를 부여합니다."
          }
        ]
      },
      {
        "order": 2,
        "character": {
          "id": "xaihi",
          "name": "자이히"
        },
        "stageIds": [
          "setup",
          "trigger",
          "convert"
        ],
        "title": "냉기 피해 보조",
        "detail": "자이히의 연계 스킬 명중 시 대상이 냉기 부착 또는 동결 상태라면 가동 프로세스로 5초 동안 받는 냉기 피해를 10% 증가시킨다.",
        "skill": {
          "name": "스트레스 테스트",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "지원 결정체의 생명력 회복 횟수를 모두 소모했을 때 사용할 수 있습니다.",
          "지원 결정체 회복 2회 소모 후"
        ],
        "timing": "",
        "effects": [
          "짧게 차지하여 지원 결정체를 적에게 투척해 냉기 피해를 주고 냉기 부착 상태를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "frostDamage",
            "label": "냉기 피해"
          },
          {
            "id": "frostInfliction",
            "label": "냉기 부착"
          },
          {
            "id": "freeze",
            "label": "동결"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "last-light",
              "name": "라스트 라이트"
            },
            "skill": {
              "name": "세쉬카의 비전",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "지속 시간 15초 15초 동안 해당 메인 컨트롤 오퍼레이터가 사용한 1회의 강력한 일격이 라스트 라이트의 환영을 소환해 목표를 추격하며 냉기 피해를 주고 냉기 부착 상태를 부여합니다. 메인 컨트롤 오퍼레이터의 무기에 저온 주입을 부여하고 스킬 게이지 30포인트를 반환합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "skill": {
              "name": "우당탕탕 파도!",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "용오름은 범위 내의 적에게 냉기 부착 1스택을 부여하고 지속적으로 냉기 피해를 줍니다. 와류를 소모해 생성한 용오름의 개수에 따라 스킬 게이지를 반환하며, 와류마다 20포인트를 반환합니다."
          },
          {
            "character": {
              "id": "last-light",
              "name": "라스트 라이트"
            },
            "skill": {
              "name": "겨울 포식자",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "적에게 냉기 부착 3스택 혹은 그 이상이 쌓였을 때 사용할 수 있습니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "skill": {
              "name": "야, 강물! 도와줘!",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "적이 냉기 부착을 부여받았거나 아츠 폭발 피해를 받았을 때 사용할 수 있습니다."
          }
        ]
      },
      {
        "order": 3,
        "character": {
          "id": "tangtang",
          "name": "탕탕"
        },
        "stageIds": [
          "setup",
          "trigger",
          "convert",
          "recycle"
        ],
        "title": "와류 생성",
        "detail": "냉기 부착 또는 아츠 폭발 피해 조건을 맞춰 탕탕의 연계 스킬을 사용하고 30초 동안 유지되는 와류를 최대 2개까지 준비한다.",
        "skill": {
          "name": "야, 강물! 도와줘!",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "적이 냉기 부착을 부여받았거나 아츠 폭발 피해를 받았을 때 사용할 수 있습니다.",
          "냉기 부착·아츠 폭발 피해 조건"
        ],
        "timing": "",
        "effects": [],
        "mechanics": [
          {
            "id": "frostInfliction",
            "label": "냉기 부착"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "last-light",
              "name": "라스트 라이트"
            },
            "skill": {
              "name": "세쉬카의 비전",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "지속 시간 15초 15초 동안 해당 메인 컨트롤 오퍼레이터가 사용한 1회의 강력한 일격이 라스트 라이트의 환영을 소환해 목표를 추격하며 냉기 피해를 주고 냉기 부착 상태를 부여합니다. 메인 컨트롤 오퍼레이터의 무기에 저온 주입을 부여하고 스킬 게이지 30포인트를 반환합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "skill": {
              "name": "우당탕탕 파도!",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "용오름은 범위 내의 적에게 냉기 부착 1스택을 부여하고 지속적으로 냉기 피해를 줍니다. 와류를 소모해 생성한 용오름의 개수에 따라 스킬 게이지를 반환하며, 와류마다 20포인트를 반환합니다."
          },
          {
            "character": {
              "id": "last-light",
              "name": "라스트 라이트"
            },
            "skill": {
              "name": "겨울 포식자",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "적에게 냉기 부착 3스택 혹은 그 이상이 쌓였을 때 사용할 수 있습니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "skill": {
              "name": "스트레스 테스트",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "지원 결정체의 생명력 회복 횟수를 모두 소모했을 때 사용할 수 있습니다. 짧게 차지하여 지원 결정체를 적에게 투척해 냉기 피해를 주고 냉기 부착 상태를 부여합니다."
          }
        ]
      },
      {
        "order": 4,
        "character": {
          "id": "perlica",
          "name": "펠리카"
        },
        "stageIds": [
          "trigger"
        ],
        "title": "강력한 일격 조건",
        "detail": "메인 컨트롤 오퍼레이터가 강력한 일격 피해를 주어 펠리카의 연계 스킬을 활성화한다.",
        "skill": {
          "name": "실시간 프로토콜 · 연쇄 섬광",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "메인 컨트롤 오퍼레이터가 적에게 강력한 일격 피해를 준 다음 사용할 수 있습니다.",
          "강력한 일격 피해 후"
        ],
        "timing": "",
        "effects": [
          "누적된 전기 에너지를 방출해 목표를 강타하며 전기 피해를 주고, 5초 동안 짧은 강제 감전 상태를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "powerStrike",
            "label": "강력한 일격"
          },
          {
            "id": "mainControl",
            "label": "메인 컨트롤"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 5,
        "character": {
          "id": "tangtang",
          "name": "탕탕"
        },
        "stageIds": [
          "convert",
          "recycle"
        ],
        "title": "용오름 전환",
        "detail": "탕탕의 배틀 스킬로 기본 용오름을 만들고 주변 와류를 모두 소모해 추가 용오름과 와류당 스킬 게이지 20포인트 반환을 얻는다.",
        "skill": {
          "name": "우당탕탕 파도!",
          "type": "배틀 스킬",
          "typeId": "battleSkill",
          "index": 1
        },
        "conditions": [],
        "timing": "",
        "effects": [
          "와류를 소모해 생성한 용오름의 개수에 따라 스킬 게이지를 반환하며, 와류마다 20포인트를 반환합니다.",
          "용오름은 범위 내의 적에게 냉기 부착 1스택을 부여하고 지속적으로 냉기 피해를 줍니다.",
          "여러 개의 용오름이 생성됐다면 적에게 추가로 아츠 취약을 부여하지만 냉기 부착은 중복으로 부여되지 않습니다."
        ],
        "mechanics": [
          {
            "id": "skillGauge",
            "label": "스킬 게이지"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 6,
        "character": {
          "id": "xaihi",
          "name": "자이히"
        },
        "stageIds": [
          "setup",
          "convert",
          "payoff"
        ],
        "title": "팀 증폭·정화",
        "detail": "자이히의 궁극기로 팀 전체에 냉기·자연 증폭을 부여하고, 동시에 팀의 냉기 부착과 동결을 정화한다.",
        "skill": {
          "name": "스택 오버플로",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [],
        "timing": "냉기 증폭·자연 증폭 효과를 먼저 적용한 뒤 라스트 라이트의 궁극기를 이어갑니다.",
        "effects": [
          "팀 전체에게 일정 시간 냉기 증폭과 자연 증폭 상태를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "frostInfliction",
            "label": "냉기 부착"
          },
          {
            "id": "freeze",
            "label": "동결"
          },
          {
            "id": "natureAmplification",
            "label": "자연 증폭"
          },
          {
            "id": "cleanse",
            "label": "정화"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 7,
        "character": {
          "id": "perlica",
          "name": "펠리카"
        },
        "stageIds": [
          "payoff"
        ],
        "title": "저비용 궁극기 마무리",
        "detail": "궁극기 에너지 80을 채워 목표 구역에 대량 전기 피해를 가한다.",
        "skill": {
          "name": "프로토콜ε · 70.41κ",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [],
        "timing": "적에게 필요한 부착·이상 상태를 준비하고, 주력 피해를 집중할 수 있을 때 사용합니다.",
        "effects": [],
        "mechanics": [
          {
            "id": "electricDamage",
            "label": "전기 피해"
          },
          {
            "id": "ultimateEnergy",
            "label": "궁극기 에너지"
          },
          {
            "id": "ultimate",
            "label": "궁극기"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 8,
        "character": {
          "id": "last-light",
          "name": "라스트 라이트"
        },
        "stageIds": [
          "payoff",
          "recycle"
        ],
        "title": "취약 궁극기",
        "detail": "냉기 취약이 유지되는 15초 안에 라스트 라이트의 궁극기를 사용해 3회 베기를 넣고 저온 취성으로 취약 효과를 1.5배로 활용한다.",
        "skill": {
          "name": "마지막 인사",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [],
        "timing": "자이히의 궁극기로 냉기 증폭 효과가 적용된 동안 사용해 주력 피해를 집중합니다.",
        "effects": [],
        "mechanics": [
          {
            "id": "frostVulnerability",
            "label": "냉기 취약"
          },
          {
            "id": "ultimate",
            "label": "궁극기"
          }
        ],
        "preparationRoutes": []
      }
    ],
    "supportFlow": [],
    "basicOperation": [
      {
        "order": 1,
        "title": "라스트 라이트 · 연계 스킬",
        "detail": "라스트 라이트의 연계 스킬로 모든 냉기 부착을 소모해 스택 비례 피해·궁극기 에너지·저체온증의 냉기 취약을 동시에 확보한다."
      },
      {
        "order": 2,
        "title": "자이히 · 연계 스킬",
        "detail": "자이히의 연계 스킬 명중 시 대상이 냉기 부착 또는 동결 상태라면 가동 프로세스로 5초 동안 받는 냉기 피해를 10% 증가시킨다."
      },
      {
        "order": 3,
        "title": "탕탕 · 연계 스킬",
        "detail": "냉기 부착 또는 아츠 폭발 피해 조건을 맞춰 탕탕의 연계 스킬을 사용하고 30초 동안 유지되는 와류를 최대 2개까지 준비한다."
      },
      {
        "order": 4,
        "title": "펠리카 · 연계 스킬",
        "detail": "메인 컨트롤 오퍼레이터가 강력한 일격 피해를 주어 펠리카의 연계 스킬을 활성화한다."
      },
      {
        "order": 5,
        "title": "탕탕 · 배틀 스킬",
        "detail": "탕탕의 배틀 스킬로 기본 용오름을 만들고 주변 와류를 모두 소모해 추가 용오름과 와류당 스킬 게이지 20포인트 반환을 얻는다."
      },
      {
        "order": 6,
        "title": "자이히 · 궁극기",
        "detail": "자이히의 궁극기로 팀 전체에 냉기·자연 증폭을 부여하고, 동시에 팀의 냉기 부착과 동결을 정화한다."
      },
      {
        "order": 7,
        "title": "펠리카 · 궁극기",
        "detail": "궁극기 에너지 80을 채워 목표 구역에 대량 전기 피해를 가한다."
      },
      {
        "order": 8,
        "title": "라스트 라이트 · 궁극기",
        "detail": "냉기 취약이 유지되는 15초 안에 라스트 라이트의 궁극기를 사용해 3회 베기를 넣고 저온 취성으로 취약 효과를 1.5배로 활용한다."
      }
    ],
    "roles": [
      {
        "character": {
          "id": "last-light",
          "name": "라스트 라이트"
        },
        "labels": [
          "냉기 부착 생성",
          "냉기 피해·냉기 부착 소모",
          "냉기 취약 지원",
          "전투 자원 순환"
        ],
        "relation": "탕탕의 냉기 피해 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "tangtang",
          "name": "탕탕"
        },
        "labels": [
          "냉기 부착 생성",
          "스킬 게이지·스킬 게이지 반환 소모",
          "아츠 취약 지원",
          "전투 자원 순환"
        ],
        "relation": "라스트 라이트의 냉기 피해 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "xaihi",
          "name": "자이히"
        },
        "labels": [
          "냉기 부착 생성",
          "치유 소모",
          "동결 활용",
          "아츠 증폭·냉기 증폭 지원"
        ],
        "relation": "라스트 라이트의 냉기 피해 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "perlica",
          "name": "펠리카"
        },
        "labels": [
          "전기 부착 생성",
          "감전 활용",
          "전투 자원 순환",
          "메인 컨트롤 후보"
        ],
        "relation": "라스트 라이트의 불균형 조건과 직접 이어집니다."
      }
    ],
    "weaknesses": [
      {
        "title": "예열·상태 준비",
        "entries": [
          {
            "character": {
              "id": "last-light",
              "name": "라스트 라이트"
            },
            "axis": "냉기 부착 3스택 준비",
            "evidence": "겨울 포식자는 냉기 부착이 3스택 이상일 때만 사용할 수 있고, 사용 시 대상의 냉기 부착을 전부 소모합니다.",
            "affected": "겨울 포식자 · 저체온증",
            "implication": "냉기 부착 공급이 느리면 연계 스킬·궁극기 에너지·냉기 취약이 동시에 지연됩니다. 부착 상한 감소나 부착 축적 속도 감소 방향의 제약에 민감합니다."
          },
          {
            "character": {
              "id": "last-light",
              "name": "라스트 라이트"
            },
            "axis": "저온 주입의 15초·1회 제한",
            "evidence": "세쉬카의 비전의 저온 주입은 15초 동안 유지되며 메인 컨트롤 오퍼레이터의 강력한 일격 1회에만 환영 추격을 발생시킵니다.",
            "affected": "세쉬카의 비전",
            "implication": "15초 안에 강력한 일격을 사용하지 못하면 추격과 냉기 부착 기회를 잃습니다. 공격 중단이나 강력한 일격 준비 시간 증가 방향의 제약에 취약합니다."
          },
          {
            "character": {
              "id": "last-light",
              "name": "라스트 라이트"
            },
            "axis": "메인 컨트롤 오퍼레이터 연계",
            "evidence": "세쉬카의 비전은 메인 컨트롤 오퍼레이터의 무기를 강화하고 그 강력한 일격을 추적 공격의 기점으로 사용합니다.",
            "affected": "세쉬카의 비전 · P1",
            "implication": "강력한 일격을 자주 활용하기 어려운 메인 컨트롤 오퍼레이터와 조합하면 부착 공급과 P1 효과를 충분히 활용하기 어렵습니다."
          },
          {
            "character": {
              "id": "last-light",
              "name": "라스트 라이트"
            },
            "axis": "냉기 취약의 소모 기반·중첩 불가",
            "evidence": "저체온증은 아츠 부착을 소모한 뒤에만 발동하고, 소모 스택당 4%로 계산되며 해당 효과는 중첩되지 않습니다.",
            "affected": "저체온증 · 저온 취성 · 마지막 인사",
            "implication": "낮은 스택으로 소모하면 취약 수치도 낮고, 같은 효과를 반복해 자체 중첩할 수 없습니다. 궁극기 전에 높은 스택을 한 번에 소모하는 순서가 중요합니다."
          },
          {
            "character": {
              "id": "last-light",
              "name": "라스트 라이트"
            },
            "axis": "단일 대상 중심의 스택 소모",
            "evidence": "겨울 포식자는 목표한 적 하나의 냉기 부착을 전부 소모해 피해와 궁극기 에너지를 얻습니다.",
            "affected": "겨울 포식자",
            "implication": "다수전에서는 각 대상별로 부착을 준비하고 소모해야 하므로 단일 강적보다 스택 관리가 분산될 수 있습니다. 대상 전환이 잦은 제약에서 주력 대상의 부착 유지가 어렵습니다."
          },
          {
            "character": {
              "id": "last-light",
              "name": "라스트 라이트"
            },
            "axis": "잠재력에 따른 자원·폭딜 강화",
            "evidence": "P3은 연계와 궁극기 피해를 1.15배로 만들고, P4는 궁극기 에너지 요구량을 낮추며, P5는 스킬 게이지 반환과 환영 추격 피해를 강화합니다.",
            "affected": "P3 · P4 · P5",
            "implication": "기본 상태에서도 취약 궁극기 순환은 가능하지만 높은 에너지 부담과 집중 화력·게이지 효율의 보완은 관련 잠재력에 크게 의존합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "와류 준비 시간과 최대 수량",
            "evidence": "야, 강물! 도와줘!로 와류를 한 번에 1개 생성하며 필드에는 최대 2개만 존재하고, 연계 스킬의 쿨타임은 12초입니다.",
            "affected": "야, 강물! 도와줘! · 우당탕탕 파도!",
            "implication": "최대 용오름 전환을 위해서는 연계 스킬을 반복해 와류를 미리 준비해야 합니다. 연계 쿨타임 증가나 생성물 지속 시간 감소 방향의 제약에서 준비 시간이 길어집니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "스킬 게이지 반환의 사전 설치 의존",
            "evidence": "우당탕탕 파도!는 스킬 게이지 100포인트를 소모하고, 스킬 게이지 반환은 주변 와류를 소모해 용오름을 생성할 때 와류마다 20포인트씩 발생합니다.",
            "affected": "우당탕탕 파도! · 야, 강물! 도와줘!",
            "implication": "와류가 없는 상태에서는 배틀 스킬의 게이지 반환을 얻지 못합니다. 기본 최대 2개의 와류를 모두 소모해도 반환량은 40포인트이므로 자연 회복이나 추가 수급이 필요합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "아츠 취약의 다중 용오름 조건",
            "evidence": "아츠 취약은 여러 개의 용오름이 생성될 때만 부여되며, 용오름 3개에서 10%가 명시되어 있습니다.",
            "affected": "우당탕탕 파도! · 풍랑의 주재자",
            "implication": "와류 준비가 끊기면 아츠 취약 지원도 함께 사라집니다. 소환물 수 제한이나 생성물 제거 방향의 제약에서 파티 지원 가치가 크게 낮아집니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "강력한 일격 발동 의존",
            "evidence": "지원 결정체의 치유는 메인 컨트롤 오퍼레이터가 적에게 강력한 일격 피해를 준 후에만 발동합니다.",
            "affected": "디도스 · 스트레스 테스트",
            "implication": "강력한 일격을 자주 사용하지 못하면 치유 2회를 소모하지 못해 연계 스킬 조건도 늦어집니다. 공격 단계 증가나 강력한 일격 봉쇄 방향의 제약에 취약합니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "연계 스킬의 2회 치유 선행 조건",
            "evidence": "스트레스 테스트는 지원 결정체의 생명력 회복 횟수를 모두 소모해야 사용할 수 있으며, 결정체의 회복은 최대 2회 발동합니다.",
            "affected": "디도스 · 스트레스 테스트",
            "implication": "쿨타임이 8초여도 치유 2회를 먼저 발동하지 못하면 연계 스킬을 사용할 수 없습니다. 피해가 적거나 공격 기회가 끊기는 전투에서는 순환이 지연될 수 있습니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "아츠 증폭의 최대 생명력 조건",
            "evidence": "디도스의 아츠 증폭 9%는 회복 효과가 발동할 때 메인 컨트롤 오퍼레이터의 생명력이 최대치에 도달한 상태여야 부여되며 중첩되지 않습니다.",
            "affected": "디도스 · P1",
            "implication": "생명력이 계속 감소하는 환경에서는 치유는 작동해도 아츠 증폭을 얻기 어렵습니다. 지속 피해나 최대 생명력 유지 방해 방향의 제약이 지원 화력을 낮춥니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "냉기 상태 사전 준비",
            "evidence": "가동 프로세스는 스트레스 테스트가 명중할 때 목표가 냉기 부착 또는 동결 상태여야 받는 냉기 피해 +10%를 부여합니다.",
            "affected": "스트레스 테스트 · 가동 프로세스",
            "implication": "연계 스킬 자체가 냉기 부착을 부여하더라도 명중 시점의 상태 판정이 중요하므로, 안정적인 발동을 위해 다른 냉기 부착·동결 공급과 순서를 맞추는 편이 안전합니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "냉기·자연 파티 조합 의존",
            "evidence": "스택 오버플로의 공격 지원은 팀 전체의 냉기 증폭과 자연 증폭에 한정되며 지능으로 강화됩니다.",
            "affected": "스택 오버플로 · P5",
            "implication": "물리·열기·전기 중심 파티에서는 궁극기의 증폭 효과를 충분히 활용하기 어렵습니다. 속성 혼합 제한이나 지능 감소 방향의 제약에서 지원 가치가 낮아집니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "제한적인 정화 범위",
            "evidence": "프리징 프로토콜은 팀 전체의 냉기 부착과 동결 상태만 정화합니다.",
            "affected": "프리징 프로토콜 · 스택 오버플로",
            "implication": "다른 이상 효과는 제거하지 못하므로 범용 정화 역할을 완전히 대신할 수 없습니다. 냉기·동결 외 상태 이상이 중심인 전투에서는 재능의 효용이 제한됩니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "잠재력에 따른 지원 상한",
            "evidence": "P1은 아츠 증폭을 추가로 5% 높이고, P3은 연계 스킬을 추가 목표에 튕기며, P5는 궁극기의 증폭 효과를 1.1배로 강화합니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 상태에서도 치유와 속성 증폭을 제공하지만 다중 대상 연계와 아츠·속성 증폭의 상한은 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "물리 상태와 전기 화력의 조합 의존",
            "evidence": "오블리터레이션 프로토콜은 불균형 대상을 요구하고, 순환 프로토콜의 추가 튕김은 방어 불능 대상을 요구합니다.",
            "affected": "재능 1 · 재능 2",
            "implication": "펠리카의 전기 스킬만으로는 불균형과 방어 불능을 안정적으로 준비하기 어렵습니다. 물리 이상·불균형 지원 캐릭터가 없으면 두 재능의 효율이 제한됩니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "좁은 배틀 스킬 범위",
            "evidence": "프로토콜ω · 뇌격은 좁은 범위 내의 적에게 전기 피해와 전기 부착을 부여합니다.",
            "affected": "프로토콜ω · 뇌격",
            "implication": "적이 넓게 분산된 상황에서는 한 번에 여러 대상에게 전기 부착을 공급하기 어렵습니다. 적 분산과 이동이 많은 전투에서 준비 효율이 낮아집니다."
          }
        ]
      },
      {
        "title": "스킬 게이지·궁극기 순환",
        "entries": [
          {
            "character": {
              "id": "last-light",
              "name": "라스트 라이트"
            },
            "axis": "냉기 부착 3스택 준비",
            "evidence": "겨울 포식자는 냉기 부착이 3스택 이상일 때만 사용할 수 있고, 사용 시 대상의 냉기 부착을 전부 소모합니다.",
            "affected": "겨울 포식자 · 저체온증",
            "implication": "냉기 부착 공급이 느리면 연계 스킬·궁극기 에너지·냉기 취약이 동시에 지연됩니다. 부착 상한 감소나 부착 축적 속도 감소 방향의 제약에 민감합니다."
          },
          {
            "character": {
              "id": "last-light",
              "name": "라스트 라이트"
            },
            "axis": "궁극기 에너지 획득 경로 제한",
            "evidence": "마지막 인사는 궁극기 에너지 240이 필요하며, 라스트 라이트는 자신의 배틀 스킬과 연계 스킬을 통해서만 궁극기 에너지를 획득할 수 있습니다.",
            "affected": "세쉬카의 비전 · 겨울 포식자 · 마지막 인사",
            "implication": "팀의 일반적인 궁극기 에너지 지원만으로 공백을 메울 수 없고, 자신의 스킬 순환이 끊기면 궁극기 회전이 크게 느려집니다. 스킬 봉쇄나 연계 쿨타임 증가 방향의 제약이 매우 불리합니다."
          },
          {
            "character": {
              "id": "last-light",
              "name": "라스트 라이트"
            },
            "axis": "단일 대상 중심의 스택 소모",
            "evidence": "겨울 포식자는 목표한 적 하나의 냉기 부착을 전부 소모해 피해와 궁극기 에너지를 얻습니다.",
            "affected": "겨울 포식자",
            "implication": "다수전에서는 각 대상별로 부착을 준비하고 소모해야 하므로 단일 강적보다 스택 관리가 분산될 수 있습니다. 대상 전환이 잦은 제약에서 주력 대상의 부착 유지가 어렵습니다."
          },
          {
            "character": {
              "id": "last-light",
              "name": "라스트 라이트"
            },
            "axis": "잠재력에 따른 자원·폭딜 강화",
            "evidence": "P3은 연계와 궁극기 피해를 1.15배로 만들고, P4는 궁극기 에너지 요구량을 낮추며, P5는 스킬 게이지 반환과 환영 추격 피해를 강화합니다.",
            "affected": "P3 · P4 · P5",
            "implication": "기본 상태에서도 취약 궁극기 순환은 가능하지만 높은 에너지 부담과 집중 화력·게이지 효율의 보완은 관련 잠재력에 크게 의존합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "와류 준비 시간과 최대 수량",
            "evidence": "야, 강물! 도와줘!로 와류를 한 번에 1개 생성하며 필드에는 최대 2개만 존재하고, 연계 스킬의 쿨타임은 12초입니다.",
            "affected": "야, 강물! 도와줘! · 우당탕탕 파도!",
            "implication": "최대 용오름 전환을 위해서는 연계 스킬을 반복해 와류를 미리 준비해야 합니다. 연계 쿨타임 증가나 생성물 지속 시간 감소 방향의 제약에서 준비 시간이 길어집니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "스킬 게이지 반환의 사전 설치 의존",
            "evidence": "우당탕탕 파도!는 스킬 게이지 100포인트를 소모하고, 스킬 게이지 반환은 주변 와류를 소모해 용오름을 생성할 때 와류마다 20포인트씩 발생합니다.",
            "affected": "우당탕탕 파도! · 야, 강물! 도와줘!",
            "implication": "와류가 없는 상태에서는 배틀 스킬의 게이지 반환을 얻지 못합니다. 기본 최대 2개의 와류를 모두 소모해도 반환량은 40포인트이므로 자연 회복이나 추가 수급이 필요합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "잠재력에 따른 순환 효율",
            "evidence": "P1은 연계 쿨타임과 와류당 추가 게이지 반환을 개선하고, P3은 아츠 취약을 강화하며, P5는 궁극기와 궁극기 생성 용오름의 피해를 강화합니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 구조는 완성되어 있지만 와류 회전·아츠 취약 수치·궁극기 폭발력의 상한은 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "연계 스킬의 2회 치유 선행 조건",
            "evidence": "스트레스 테스트는 지원 결정체의 생명력 회복 횟수를 모두 소모해야 사용할 수 있으며, 결정체의 회복은 최대 2회 발동합니다.",
            "affected": "디도스 · 스트레스 테스트",
            "implication": "쿨타임이 8초여도 치유 2회를 먼저 발동하지 못하면 연계 스킬을 사용할 수 없습니다. 피해가 적거나 공격 기회가 끊기는 전투에서는 순환이 지연될 수 있습니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "아츠 증폭의 최대 생명력 조건",
            "evidence": "디도스의 아츠 증폭 9%는 회복 효과가 발동할 때 메인 컨트롤 오퍼레이터의 생명력이 최대치에 도달한 상태여야 부여되며 중첩되지 않습니다.",
            "affected": "디도스 · P1",
            "implication": "생명력이 계속 감소하는 환경에서는 치유는 작동해도 아츠 증폭을 얻기 어렵습니다. 지속 피해나 최대 생명력 유지 방해 방향의 제약이 지원 화력을 낮춥니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "직접적인 자원 회복 부재",
            "evidence": "제공된 기본 스킬과 재능에는 스킬 게이지 반환이나 궁극기 에너지 직접 획득 효과가 없습니다.",
            "affected": "전 스킬 순환",
            "implication": "코스트 100 배틀 스킬과 궁극기 에너지 80을 외부 자원 공급과 자연 회복에 의존합니다. 자원 회복 감소 방향의 제약에서 스킬 빈도가 낮아집니다."
          }
        ]
      },
      {
        "title": "위치·대상 수",
        "entries": [
          {
            "character": {
              "id": "last-light",
              "name": "라스트 라이트"
            },
            "axis": "냉기 부착 3스택 준비",
            "evidence": "겨울 포식자는 냉기 부착이 3스택 이상일 때만 사용할 수 있고, 사용 시 대상의 냉기 부착을 전부 소모합니다.",
            "affected": "겨울 포식자 · 저체온증",
            "implication": "냉기 부착 공급이 느리면 연계 스킬·궁극기 에너지·냉기 취약이 동시에 지연됩니다. 부착 상한 감소나 부착 축적 속도 감소 방향의 제약에 민감합니다."
          },
          {
            "character": {
              "id": "last-light",
              "name": "라스트 라이트"
            },
            "axis": "단일 대상 중심의 스택 소모",
            "evidence": "겨울 포식자는 목표한 적 하나의 냉기 부착을 전부 소모해 피해와 궁극기 에너지를 얻습니다.",
            "affected": "겨울 포식자",
            "implication": "다수전에서는 각 대상별로 부착을 준비하고 소모해야 하므로 단일 강적보다 스택 관리가 분산될 수 있습니다. 대상 전환이 잦은 제약에서 주력 대상의 부착 유지가 어렵습니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "스킬 게이지 반환의 사전 설치 의존",
            "evidence": "우당탕탕 파도!는 스킬 게이지 100포인트를 소모하고, 스킬 게이지 반환은 주변 와류를 소모해 용오름을 생성할 때 와류마다 20포인트씩 발생합니다.",
            "affected": "우당탕탕 파도! · 야, 강물! 도와줘!",
            "implication": "와류가 없는 상태에서는 배틀 스킬의 게이지 반환을 얻지 못합니다. 기본 최대 2개의 와류를 모두 소모해도 반환량은 40포인트이므로 자연 회복이나 추가 수급이 필요합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "위치 기반 가속·감속",
            "evidence": "의기투합의 가속과 감속은 와류 주변 5미터에서 적용되고 범위를 벗어난 뒤 3초만 유지됩니다.",
            "affected": "의기투합 · 와류",
            "implication": "전투 위치가 와류에서 멀어지거나 적이 크게 이동하면 지원 효과를 계속 받기 어렵습니다. 적 이동 증가나 설치물 범위 축소 방향의 제약에 취약합니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "연계 스킬의 2회 치유 선행 조건",
            "evidence": "스트레스 테스트는 지원 결정체의 생명력 회복 횟수를 모두 소모해야 사용할 수 있으며, 결정체의 회복은 최대 2회 발동합니다.",
            "affected": "디도스 · 스트레스 테스트",
            "implication": "쿨타임이 8초여도 치유 2회를 먼저 발동하지 못하면 연계 스킬을 사용할 수 없습니다. 피해가 적거나 공격 기회가 끊기는 전투에서는 순환이 지연될 수 있습니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "냉기 상태 사전 준비",
            "evidence": "가동 프로세스는 스트레스 테스트가 명중할 때 목표가 냉기 부착 또는 동결 상태여야 받는 냉기 피해 +10%를 부여합니다.",
            "affected": "스트레스 테스트 · 가동 프로세스",
            "implication": "연계 스킬 자체가 냉기 부착을 부여하더라도 명중 시점의 상태 판정이 중요하므로, 안정적인 발동을 위해 다른 냉기 부착·동결 공급과 순서를 맞추는 편이 안전합니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "제한적인 정화 범위",
            "evidence": "프리징 프로토콜은 팀 전체의 냉기 부착과 동결 상태만 정화합니다.",
            "affected": "프리징 프로토콜 · 스택 오버플로",
            "implication": "다른 이상 효과는 제거하지 못하므로 범용 정화 역할을 완전히 대신할 수 없습니다. 냉기·동결 외 상태 이상이 중심인 전투에서는 재능의 효용이 제한됩니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "메인 컨트롤 강력한 일격 의존",
            "evidence": "연쇄 섬광은 메인 컨트롤 오퍼레이터가 강력한 일격 피해를 준 다음에만 사용할 수 있습니다.",
            "affected": "실시간 프로토콜 · 연쇄 섬광",
            "implication": "메인 컨트롤의 일반 공격 순환이나 강력한 일격 기회가 끊기면 핵심 감전 공급이 지연됩니다. 교대 제한·공격 중단 방향의 제약에 취약합니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "짧은 감전 지속 시간",
            "evidence": "연쇄 섬광이 부여하는 강제 감전은 기본 5초 동안 지속됩니다.",
            "affected": "연쇄 섬광 · P1",
            "implication": "감전이 유지되는 짧은 시간 안에 아츠 공격을 집중해야 합니다. 후속 스킬 지연이나 적 이동으로 피해 집중 창을 놓치기 쉽고, 지속 연장은 P1에 배치되어 있습니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "좁은 배틀 스킬 범위",
            "evidence": "프로토콜ω · 뇌격은 좁은 범위 내의 적에게 전기 피해와 전기 부착을 부여합니다.",
            "affected": "프로토콜ω · 뇌격",
            "implication": "적이 넓게 분산된 상황에서는 한 번에 여러 대상에게 전기 부착을 공급하기 어렵습니다. 적 분산과 이동이 많은 전투에서 준비 효율이 낮아집니다."
          }
        ]
      },
      {
        "title": "메인 컨트롤·조작 집중",
        "entries": [
          {
            "character": {
              "id": "last-light",
              "name": "라스트 라이트"
            },
            "axis": "저온 주입의 15초·1회 제한",
            "evidence": "세쉬카의 비전의 저온 주입은 15초 동안 유지되며 메인 컨트롤 오퍼레이터의 강력한 일격 1회에만 환영 추격을 발생시킵니다.",
            "affected": "세쉬카의 비전",
            "implication": "15초 안에 강력한 일격을 사용하지 못하면 추격과 냉기 부착 기회를 잃습니다. 공격 중단이나 강력한 일격 준비 시간 증가 방향의 제약에 취약합니다."
          },
          {
            "character": {
              "id": "last-light",
              "name": "라스트 라이트"
            },
            "axis": "메인 컨트롤 오퍼레이터 연계",
            "evidence": "세쉬카의 비전은 메인 컨트롤 오퍼레이터의 무기를 강화하고 그 강력한 일격을 추적 공격의 기점으로 사용합니다.",
            "affected": "세쉬카의 비전 · P1",
            "implication": "강력한 일격을 자주 활용하기 어려운 메인 컨트롤 오퍼레이터와 조합하면 부착 공급과 P1 효과를 충분히 활용하기 어렵습니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "메인 컨트롤 낙하 공격 조율",
            "evidence": "궁극기의 강화된 조기 파도와 풍랑의 주재자 용오름은 메인 컨트롤 오퍼레이터가 고대의 진 안에서 낙하 공격을 사용해야 발동합니다.",
            "affected": "대당가께서 지켜보고 계신다! · 풍랑의 주재자",
            "implication": "낙하 공격을 빠르게 넣지 못하면 강화 파도와 추가 용오름의 시점을 놓칠 수 있습니다. 공중 행동 제한이나 메인 컨트롤 교대 제한 방향의 제약이 불리합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "지속 제어와 조기 폭발의 선택",
            "evidence": "고대의 진은 4초 동안 적을 묶고 피해를 주지만, 낙하 공격을 사용하면 변화가 중단되고 거대한 파도가 예정보다 일찍 발생합니다.",
            "affected": "대당가께서 지켜보고 계신다!",
            "implication": "조기 폭발을 선택하면 강화된 파도와 용오름을 빠르게 얻는 대신 남은 지속 제어 구간을 끝내게 됩니다. 생존이나 제어 유지가 중요한 상황에서는 발동 시점을 조절해야 합니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "강력한 일격 발동 의존",
            "evidence": "지원 결정체의 치유는 메인 컨트롤 오퍼레이터가 적에게 강력한 일격 피해를 준 후에만 발동합니다.",
            "affected": "디도스 · 스트레스 테스트",
            "implication": "강력한 일격을 자주 사용하지 못하면 치유 2회를 소모하지 못해 연계 스킬 조건도 늦어집니다. 공격 단계 증가나 강력한 일격 봉쇄 방향의 제약에 취약합니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "아츠 증폭의 최대 생명력 조건",
            "evidence": "디도스의 아츠 증폭 9%는 회복 효과가 발동할 때 메인 컨트롤 오퍼레이터의 생명력이 최대치에 도달한 상태여야 부여되며 중첩되지 않습니다.",
            "affected": "디도스 · P1",
            "implication": "생명력이 계속 감소하는 환경에서는 치유는 작동해도 아츠 증폭을 얻기 어렵습니다. 지속 피해나 최대 생명력 유지 방해 방향의 제약이 지원 화력을 낮춥니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "메인 컨트롤 강력한 일격 의존",
            "evidence": "연쇄 섬광은 메인 컨트롤 오퍼레이터가 강력한 일격 피해를 준 다음에만 사용할 수 있습니다.",
            "affected": "실시간 프로토콜 · 연쇄 섬광",
            "implication": "메인 컨트롤의 일반 공격 순환이나 강력한 일격 기회가 끊기면 핵심 감전 공급이 지연됩니다. 교대 제한·공격 중단 방향의 제약에 취약합니다."
          }
        ]
      },
      {
        "title": "잠재력 의존",
        "entries": [
          {
            "character": {
              "id": "last-light",
              "name": "라스트 라이트"
            },
            "axis": "메인 컨트롤 오퍼레이터 연계",
            "evidence": "세쉬카의 비전은 메인 컨트롤 오퍼레이터의 무기를 강화하고 그 강력한 일격을 추적 공격의 기점으로 사용합니다.",
            "affected": "세쉬카의 비전 · P1",
            "implication": "강력한 일격을 자주 활용하기 어려운 메인 컨트롤 오퍼레이터와 조합하면 부착 공급과 P1 효과를 충분히 활용하기 어렵습니다."
          },
          {
            "character": {
              "id": "last-light",
              "name": "라스트 라이트"
            },
            "axis": "잠재력에 따른 자원·폭딜 강화",
            "evidence": "P3은 연계와 궁극기 피해를 1.15배로 만들고, P4는 궁극기 에너지 요구량을 낮추며, P5는 스킬 게이지 반환과 환영 추격 피해를 강화합니다.",
            "affected": "P3 · P4 · P5",
            "implication": "기본 상태에서도 취약 궁극기 순환은 가능하지만 높은 에너지 부담과 집중 화력·게이지 효율의 보완은 관련 잠재력에 크게 의존합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "잠재력에 따른 순환 효율",
            "evidence": "P1은 연계 쿨타임과 와류당 추가 게이지 반환을 개선하고, P3은 아츠 취약을 강화하며, P5는 궁극기와 궁극기 생성 용오름의 피해를 강화합니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 구조는 완성되어 있지만 와류 회전·아츠 취약 수치·궁극기 폭발력의 상한은 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "잠재력에 따른 지원 상한",
            "evidence": "P1은 아츠 증폭을 추가로 5% 높이고, P3은 연계 스킬을 추가 목표에 튕기며, P5는 궁극기의 증폭 효과를 1.1배로 강화합니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 상태에서도 치유와 속성 증폭을 제공하지만 다중 대상 연계와 아츠·속성 증폭의 상한은 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "짧은 감전 지속 시간",
            "evidence": "연쇄 섬광이 부여하는 강제 감전은 기본 5초 동안 지속됩니다.",
            "affected": "연쇄 섬광 · P1",
            "implication": "감전이 유지되는 짧은 시간 안에 아츠 공격을 집중해야 합니다. 후속 스킬 지연이나 적 이동으로 피해 집중 창을 놓치기 쉽고, 지속 연장은 P1에 배치되어 있습니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "잠재력에 집중된 감전·궁극기 강화",
            "evidence": "P1은 감전 지속을 늘리고, P3·P4는 감전 중 공격력과 아츠 피해 증가 효과를 강화하며, P5는 궁극기 치명타 확률을 올립니다.",
            "affected": "P1 · P3 · P4 · P5",
            "implication": "기본 감전 창과 최종 화력이 잠재력에서 크게 개선됩니다. 잠재력 단계에 따라 감전 지원과 궁극기 마무리 성능 차이가 큽니다."
          }
        ]
      }
    ],
    "discoveries": [
      {
        "character": {
          "id": "last-light",
          "name": "라스트 라이트"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 궁극기 비중이 높지만, 연계 스킬은 냉기 부착·궁극기 에너지 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "tangtang",
          "name": "탕탕"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 배틀 스킬 비중이 높지만, 연계 스킬은 냉기 부착 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "xaihi",
          "name": "자이히"
        },
        "title": "배틀 스킬 재평가",
        "description": "현재 순환은 연계 스킬 비중이 높지만, 배틀 스킬은 아츠 증폭·메인 컨트롤 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "배틀 스킬"
      },
      {
        "character": {
          "id": "perlica",
          "name": "펠리카"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 배틀 스킬 비중이 높지만, 연계 스킬은 강력한 일격·메인 컨트롤 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      }
    ],
    "designHints": [
      {
        "id": "normal",
        "title": "일반 공격 의존도",
        "pressure": "일반 공격 피해 비중을 낮추는 방향",
        "impact": "강화 상태나 메인 컨트롤 중 일반 공격에 몰린 화력 구간이 짧아집니다.",
        "opportunity": "라스트 라이트의 연계 스킬, 탕탕의 연계 스킬처럼 연계·배틀 스킬 중심의 보조 축이 상대적으로 중요해질 수 있습니다.",
        "caution": "일반 공격과 강력한 일격을 동시에 완전히 막으면 스킬 게이지 회복과 불균형 순환까지 함께 끊길 수 있습니다.",
        "characters": [
          {
            "id": "perlica",
            "name": "펠리카"
          }
        ]
      },
      {
        "id": "ultimate",
        "title": "궁극기 반복 의존도",
        "pressure": "궁극기 반복 사용의 효율이 점차 낮아지는 방향",
        "impact": "궁극기를 중심으로 한 강화 구간과 마무리 빈도가 줄어듭니다.",
        "opportunity": "궁극기 에너지를 다른 가치로 돌리거나 배틀·연계 스킬을 주력화하는 운용을 찾게 됩니다.",
        "caution": "첫 궁극기까지 무력화하면 준비 과정의 의미도 사라질 수 있으므로 반복 효율을 조절하는 편이 발견을 만들기 쉽습니다.",
        "characters": [
          {
            "id": "last-light",
            "name": "라스트 라이트"
          },
          {
            "id": "tangtang",
            "name": "탕탕"
          },
          {
            "id": "xaihi",
            "name": "자이히"
          },
          {
            "id": "perlica",
            "name": "펠리카"
          }
        ]
      },
      {
        "id": "battle",
        "title": "배틀 스킬 피해 비중",
        "pressure": "배틀 스킬의 직접 피해를 줄이되 연계 스킬 순환은 열어주는 방향",
        "impact": "스킬 게이지를 사용해 즉시 내는 화력이 줄어듭니다.",
        "opportunity": "배틀 스킬을 상태 생성·변환 용도로만 쓰고, 연계 스킬이나 궁극기 외 추가 피해를 주력으로 삼는 구조가 떠오를 수 있습니다.",
        "caution": "배틀 스킬의 상태 부여까지 막으면 후속 연계 조건 자체가 사라질 수 있습니다.",
        "characters": [
          {
            "id": "last-light",
            "name": "라스트 라이트"
          },
          {
            "id": "tangtang",
            "name": "탕탕"
          },
          {
            "id": "xaihi",
            "name": "자이히"
          },
          {
            "id": "perlica",
            "name": "펠리카"
          }
        ]
      },
      {
        "id": "link",
        "title": "연계 스킬 빈도",
        "pressure": "연계 스킬 사용 빈도와 쿨타임을 크게 흔드는 방향",
        "impact": "조건을 자주 열 수 있는 파티일수록 순환 속도가 크게 달라집니다.",
        "opportunity": "연계 횟수가 늘어날 때 생기는 자원 수급과 보조 피해, 반대로 연계에 대가가 생길 때의 대체 순서를 비교할 수 있습니다.",
        "caution": "연계 조건과 쿨타임을 동시에 막으면 조합의 상호작용이 사라질 수 있습니다.",
        "characters": [
          {
            "id": "last-light",
            "name": "라스트 라이트"
          },
          {
            "id": "tangtang",
            "name": "탕탕"
          },
          {
            "id": "xaihi",
            "name": "자이히"
          }
        ]
      },
      {
        "id": "stack",
        "title": "부착·방어 불능 축적 속도",
        "pressure": "같은 대상에게 스택을 연속으로 쌓는 속도를 제한하는 방향",
        "impact": "최대 스택을 전제로 하는 동결·강타·갑옷 파괴·취약 발동 시점이 늦어집니다.",
        "opportunity": "낮은 스택에서 바로 작동하는 스킬, 강제 이상, 직접 부여 효과의 가치가 올라갈 수 있습니다.",
        "caution": "부착 자체를 금지하면 대체 운용이 아니라 파티의 핵심 문법을 삭제하게 됩니다.",
        "characters": [
          {
            "id": "last-light",
            "name": "라스트 라이트"
          },
          {
            "id": "tangtang",
            "name": "탕탕"
          },
          {
            "id": "xaihi",
            "name": "자이히"
          },
          {
            "id": "perlica",
            "name": "펠리카"
          }
        ]
      }
    ],
    "mechanicProfile": {
      "mechanicIds": [
        "frostInfliction",
        "mainControl",
        "ultimate",
        "ultimateEnergy",
        "powerStrike",
        "skillGauge",
        "artsInfliction",
        "frostDamage",
        "freeze",
        "frostVulnerability",
        "healing",
        "electricInfliction",
        "shock",
        "defenseless",
        "artsVulnerability",
        "artsAmplification",
        "natureAmplification",
        "cleanse",
        "slow",
        "haste",
        "electricDamage",
        "imbalance",
        "generalAttack",
        "battleSkill"
      ],
      "mechanicScores": {
        "frostInfliction": 28,
        "mainControl": 20.5,
        "ultimate": 18.5,
        "ultimateEnergy": 14.5,
        "powerStrike": 12,
        "skillGauge": 11,
        "artsInfliction": 10,
        "frostDamage": 9,
        "freeze": 8.5,
        "frostVulnerability": 7.5,
        "healing": 7.5,
        "electricInfliction": 5,
        "shock": 4.5,
        "defenseless": 4.5,
        "artsVulnerability": 4.5,
        "artsAmplification": 4.5,
        "natureAmplification": 4.5,
        "cleanse": 4.5,
        "slow": 4.5,
        "haste": 4.5,
        "electricDamage": 4,
        "imbalance": 3,
        "generalAttack": 3,
        "battleSkill": 3,
        "physicalDamage": 0,
        "heatDamage": 0,
        "natureDamage": 0,
        "artsDamage": 0,
        "heatInfliction": 0,
        "natureInfliction": 0,
        "artsAbnormality": 0,
        "combustion": 0,
        "corrosion": 0,
        "launch": 0,
        "knockdown": 0,
        "smash": 0,
        "armorBreak": 0,
        "execution": 0,
        "physicalVulnerability": 0,
        "heatVulnerability": 0,
        "electricVulnerability": 0,
        "natureVulnerability": 0,
        "physicalAmplification": 0,
        "heatAmplification": 0,
        "electricAmplification": 0,
        "frostAmplification": 0,
        "skillGaugeReturn": 0,
        "protection": 0,
        "fortification": 0,
        "weakness": 0,
        "comboHit": 0,
        "originiumCrystal": 0,
        "linkSkill": 0
      },
      "dominantAction": "ultimate",
      "actionTotals": {
        "generalAttack": 6,
        "battleSkill": 18,
        "linkSkill": 19,
        "ultimate": 22
      },
      "hintIds": [
        "normal",
        "ultimate",
        "battle",
        "link",
        "stack"
      ],
      "hintTitles": [
        "일반 공격 의존도",
        "궁극기 반복 의존도",
        "배틀 스킬 피해 비중",
        "연계 스킬 빈도",
        "부착·방어 불능 축적 속도"
      ],
      "weaknessAxes": [
        "냉기 부착 3스택 준비",
        "저온 주입의 15초·1회 제한",
        "메인 컨트롤 오퍼레이터 연계",
        "냉기 취약의 소모 기반·중첩 불가",
        "단일 대상 중심의 스택 소모",
        "잠재력에 따른 자원·폭딜 강화",
        "와류 준비 시간과 최대 수량",
        "스킬 게이지 반환의 사전 설치 의존",
        "아츠 취약의 다중 용오름 조건",
        "강력한 일격 발동 의존",
        "연계 스킬의 2회 치유 선행 조건",
        "아츠 증폭의 최대 생명력 조건",
        "냉기 상태 사전 준비",
        "냉기·자연 파티 조합 의존",
        "제한적인 정화 범위",
        "잠재력에 따른 지원 상한",
        "물리 상태와 전기 화력의 조합 의존",
        "좁은 배틀 스킬 범위",
        "냉기 부착 3스택 준비",
        "궁극기 에너지 획득 경로 제한",
        "단일 대상 중심의 스택 소모",
        "잠재력에 따른 자원·폭딜 강화",
        "와류 준비 시간과 최대 수량",
        "스킬 게이지 반환의 사전 설치 의존",
        "잠재력에 따른 순환 효율",
        "연계 스킬의 2회 치유 선행 조건",
        "아츠 증폭의 최대 생명력 조건",
        "직접적인 자원 회복 부재",
        "냉기 부착 3스택 준비",
        "단일 대상 중심의 스택 소모",
        "스킬 게이지 반환의 사전 설치 의존",
        "위치 기반 가속·감속",
        "연계 스킬의 2회 치유 선행 조건",
        "냉기 상태 사전 준비",
        "제한적인 정화 범위",
        "메인 컨트롤 강력한 일격 의존",
        "짧은 감전 지속 시간",
        "좁은 배틀 스킬 범위",
        "저온 주입의 15초·1회 제한",
        "메인 컨트롤 오퍼레이터 연계",
        "메인 컨트롤 낙하 공격 조율",
        "지속 제어와 조기 폭발의 선택",
        "강력한 일격 발동 의존",
        "아츠 증폭의 최대 생명력 조건",
        "메인 컨트롤 강력한 일격 의존",
        "메인 컨트롤 오퍼레이터 연계",
        "잠재력에 따른 자원·폭딜 강화",
        "잠재력에 따른 순환 효율",
        "잠재력에 따른 지원 상한",
        "짧은 감전 지속 시간",
        "잠재력에 집중된 감전·궁극기 강화"
      ],
      "dependencyLabels": [
        "냉기 부착",
        "궁극기 에너지",
        "강력한 일격",
        "스킬 게이지",
        "궁극기"
      ]
    }
  },
  {
    "schemaVersion": 1,
    "id": "party-rossi-administrator-alesh-estella",
    "exportedAt": "2026-07-25T07:06:50.305Z",
    "title": "로시 · 관리자 [남][여] · 알레쉬 · 에스텔라 파티 분석",
    "party": [
      {
        "id": "rossi",
        "name": "로시",
        "order": 1
      },
      {
        "id": "administrator",
        "name": "관리자 [남][여]",
        "order": 2
      },
      {
        "id": "alesh",
        "name": "알레쉬",
        "order": 3
      },
      {
        "id": "estella",
        "name": "에스텔라",
        "order": 4
      }
    ],
    "summary": {
      "title": "파티 전투 구조 분석",
      "sentence": "띄우기·넘어뜨리기 등으로 방어 불능을 쌓고 궁극기·배틀 스킬 화력을 이어가는 파티입니다.",
      "dominantAction": "ultimate",
      "actionTotals": {
        "generalAttack": 4,
        "battleSkill": 24,
        "linkSkill": 24,
        "ultimate": 26
      },
      "dependencies": [
        {
          "id": "defenseless",
          "label": "방어 불능",
          "color": "brown",
          "level": "매우 높음",
          "score": 27
        },
        {
          "id": "artsInfliction",
          "label": "아츠 부착",
          "color": "cyan",
          "level": "매우 높음",
          "score": 20.5
        },
        {
          "id": "frostInfliction",
          "label": "냉기 부착",
          "color": "frost",
          "level": "매우 높음",
          "score": 20
        },
        {
          "id": "freeze",
          "label": "동결",
          "color": "frost",
          "level": "매우 높음",
          "score": 19.5
        },
        {
          "id": "ultimate",
          "label": "궁극기",
          "color": "orange",
          "level": "주력 행동",
          "score": 26
        }
      ]
    },
    "diagram": {
      "nodes": [
        {
          "order": 1,
          "character": {
            "id": "alesh",
            "name": "알레쉬"
          },
          "skill": {
            "name": "비정규 루어",
            "type": "배틀 스킬",
            "typeId": "battleSkill",
            "index": 1
          },
          "title": "부착 소모·동결"
        },
        {
          "order": 2,
          "character": {
            "id": "rossi",
            "name": "로시"
          },
          "skill": {
            "name": "그림자가 타오르는 순간",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "두 상태 준비"
        },
        {
          "order": 3,
          "character": {
            "id": "estella",
            "name": "에스텔라"
          },
          "skill": {
            "name": "디스토션",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "동결 완성"
        },
        {
          "order": 4,
          "character": {
            "id": "administrator",
            "name": "관리자 [남][여]"
          },
          "skill": {
            "name": "봉인 시퀀스",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "동료 연계 대기"
        },
        {
          "order": 5,
          "character": {
            "id": "alesh",
            "name": "알레쉬"
          },
          "skill": {
            "name": "얼음낚시 기술",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "소모 반응 연계"
        },
        {
          "order": 6,
          "character": {
            "id": "estella",
            "name": "에스텔라"
          },
          "skill": {
            "name": "트레몰로",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "취약 궁극기"
        },
        {
          "order": 7,
          "character": {
            "id": "alesh",
            "name": "알레쉬"
          },
          "skill": {
            "name": "월척이다!",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "광역 재공급"
        }
      ],
      "connections": [
        {
          "fromOrder": 1,
          "toOrder": 2,
          "label": "냉기 부착",
          "preparationRoutes": [
            {
              "character": {
                "id": "alesh",
                "name": "알레쉬"
              },
              "skill": {
                "name": "비정규 루어",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "artsInfliction",
                  "label": "아츠 부착"
                }
              ],
              "summary": "냉기 부착 상태의 목표를 명중하면 목표의 냉기 부착을 전부 소모하고, 대상에게 강제로 동결 상태를 부여합니다."
            },
            {
              "character": {
                "id": "estella",
                "name": "에스텔라"
              },
              "skill": {
                "name": "서스테인",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "artsInfliction",
                  "label": "아츠 부착"
                }
              ],
              "summary": "일직선상의 적에게 냉기 피해를 주고 냉기 부착 상태를 부여합니다."
            },
            {
              "character": {
                "id": "administrator",
                "name": "관리자 [남][여]"
              },
              "skill": {
                "name": "봉인 시퀀스",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "defenseless",
                  "label": "방어 불능"
                }
              ],
              "summary": "팀 내 다른 오퍼레이터의 연계 스킬이 피해를 줄 때 사용할 수 있습니다. 물리 이상 효과와 방어 불능 상태를 부여하면 오리지늄 결정을 파괴하고 물리 피해를 추가로 줍니다."
            },
            {
              "character": {
                "id": "estella",
                "name": "에스텔라"
              },
              "skill": {
                "name": "디스토션",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "defenseless",
                  "label": "방어 불능"
                }
              ],
              "summary": "적이 동결 상태일 때 사용할 수 있습니다. 동결 상태의 적에게 명중했을 경우 추가로 피해를 주고 6초 동안 물리 취약을 부여합니다."
            },
            {
              "character": {
                "id": "rossi",
                "name": "로시"
              },
              "skill": {
                "name": "기습 '날카로운 발톱'",
                "type": "궁극기",
                "typeId": "ultimate",
                "index": 3
              },
              "matchedMechanics": [
                {
                  "id": "artsInfliction",
                  "label": "아츠 부착"
                }
              ],
              "summary": "망토를 휘날리며 재빠르게 찔러 짧은 시간 동안 목표에게 여러 차례 열기 피해를 준 뒤 단검으로 2단 베기를 하여 대량의 열기 피해를 주고 열기 부착을 부여합니다."
            },
            {
              "character": {
                "id": "alesh",
                "name": "알레쉬"
              },
              "skill": {
                "name": "월척이다!",
                "type": "궁극기",
                "typeId": "ultimate",
                "index": 3
              },
              "matchedMechanics": [
                {
                  "id": "artsInfliction",
                  "label": "아츠 부착"
                }
              ],
              "summary": "넓은 범위의 냉기 피해를 주고 냉기 부착 상태를 부여하며 일정 스킬 게이지를 회복합니다."
            }
          ]
        },
        {
          "fromOrder": 2,
          "toOrder": 3,
          "label": "다음 조건 연결",
          "preparationRoutes": []
        },
        {
          "fromOrder": 3,
          "toOrder": 4,
          "label": "다음 조건 연결",
          "preparationRoutes": []
        },
        {
          "fromOrder": 4,
          "toOrder": 5,
          "label": "다음 조건 연결",
          "preparationRoutes": [
            {
              "character": {
                "id": "administrator",
                "name": "관리자 [남][여]"
              },
              "skill": {
                "name": "봉인 시퀀스",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "originiumCrystal",
                  "label": "오리지늄 결정"
                }
              ],
              "summary": "팀 내 다른 오퍼레이터의 연계 스킬이 피해를 줄 때 사용할 수 있습니다. 물리 이상 효과와 방어 불능 상태를 부여하면 오리지늄 결정을 파괴하고 물리 피해를 추가로 줍니다."
            },
            {
              "character": {
                "id": "alesh",
                "name": "알레쉬"
              },
              "skill": {
                "name": "비정규 루어",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "artsAbnormality",
                  "label": "아츠 이상"
                }
              ],
              "summary": "냉기 부착 상태의 목표를 명중하면 목표의 냉기 부착을 전부 소모하고, 대상에게 강제로 동결 상태를 부여합니다."
            },
            {
              "character": {
                "id": "estella",
                "name": "에스텔라"
              },
              "skill": {
                "name": "디스토션",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "artsAbnormality",
                  "label": "아츠 이상"
                }
              ],
              "summary": "적이 동결 상태일 때 사용할 수 있습니다. 동결 상태의 적에게 명중했을 경우 추가로 피해를 주고 6초 동안 물리 취약을 부여합니다."
            }
          ]
        },
        {
          "fromOrder": 5,
          "toOrder": 6,
          "label": "다음 조건 연결",
          "preparationRoutes": []
        },
        {
          "fromOrder": 6,
          "toOrder": 7,
          "label": "다음 조건 연결",
          "preparationRoutes": []
        }
      ]
    },
    "combatFlow": [
      {
        "order": 1,
        "character": {
          "id": "alesh",
          "name": "알레쉬"
        },
        "stageIds": [
          "setup",
          "convert",
          "recycle"
        ],
        "title": "부착 소모·동결",
        "detail": "알레쉬의 배틀 스킬로 냉기 부착을 전부 소모해 강제 동결을 부여하고, 소모 스택에 따른 스킬 게이지를 회복한다.",
        "skill": {
          "name": "비정규 루어",
          "type": "배틀 스킬",
          "typeId": "battleSkill",
          "index": 1
        },
        "conditions": [],
        "timing": "",
        "effects": [
          "냉기 부착 상태의 목표를 명중하면 목표의 냉기 부착을 전부 소모하고, 대상에게 강제로 동결 상태를 부여합니다.",
          "소모한 스택 수치에 따라 스킬 게이지를 회복하며 여러 목표를 명중했을 경우 1회만 회복합니다.",
          "냉기 부착 4스택을 소모하면 스킬 게이지 40포인트를 회복합니다."
        ],
        "mechanics": [
          {
            "id": "frostInfliction",
            "label": "냉기 부착"
          },
          {
            "id": "freeze",
            "label": "동결"
          },
          {
            "id": "skillGauge",
            "label": "스킬 게이지"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "estella",
              "name": "에스텔라"
            },
            "skill": {
              "name": "서스테인",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "일직선상의 적에게 냉기 피해를 주고 냉기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "estella",
              "name": "에스텔라"
            },
            "skill": {
              "name": "디스토션",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "freeze",
                "label": "동결"
              }
            ],
            "summary": "적이 동결 상태일 때 사용할 수 있습니다. 동결 상태의 적에게 명중했을 경우 추가로 피해를 주고 6초 동안 물리 취약을 부여합니다."
          },
          {
            "character": {
              "id": "alesh",
              "name": "알레쉬"
            },
            "skill": {
              "name": "월척이다!",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "넓은 범위의 냉기 피해를 주고 냉기 부착 상태를 부여하며 일정 스킬 게이지를 회복합니다. 목표를 처치할 때마다 일정량의 스킬 게이지를 추가로 회복합니다."
          }
        ]
      },
      {
        "order": 2,
        "character": {
          "id": "rossi",
          "name": "로시"
        },
        "stageIds": [
          "setup",
          "trigger"
        ],
        "title": "두 상태 준비",
        "detail": "목표에게 방어 불능과 아츠 부착을 동시에 만들어 로시의 연계 스킬의 조건을 준비한다.",
        "skill": {
          "name": "그림자가 타오르는 순간",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "적이 동시에 방어 불능과 아츠 부착 상태일 때 발동할 수 있으며 연속으로 2회 사용할 수 있습니다.",
          "두 번째 공격은 목표의 아츠 부착을 모두 소모한 뒤 소모한 스택에 따른 물리 피해와 띄우기 피해를 주고, 15초 동안 자신의 치명타 확률 23%와 치명타 피해 46%를 증가시킵니다."
        ],
        "timing": "",
        "effects": [
          "두 번째 공격을 정확하게 연계하면 추가로 방어 불능 1스택을 쌓습니다."
        ],
        "mechanics": [
          {
            "id": "artsInfliction",
            "label": "아츠 부착"
          },
          {
            "id": "defenseless",
            "label": "방어 불능"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "alesh",
              "name": "알레쉬"
            },
            "skill": {
              "name": "비정규 루어",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "artsInfliction",
                "label": "아츠 부착"
              }
            ],
            "summary": "냉기 부착 상태의 목표를 명중하면 목표의 냉기 부착을 전부 소모하고, 대상에게 강제로 동결 상태를 부여합니다."
          },
          {
            "character": {
              "id": "estella",
              "name": "에스텔라"
            },
            "skill": {
              "name": "서스테인",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "artsInfliction",
                "label": "아츠 부착"
              }
            ],
            "summary": "일직선상의 적에게 냉기 피해를 주고 냉기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "administrator",
              "name": "관리자 [남][여]"
            },
            "skill": {
              "name": "봉인 시퀀스",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "defenseless",
                "label": "방어 불능"
              }
            ],
            "summary": "팀 내 다른 오퍼레이터의 연계 스킬이 피해를 줄 때 사용할 수 있습니다. 물리 이상 효과와 방어 불능 상태를 부여하면 오리지늄 결정을 파괴하고 물리 피해를 추가로 줍니다."
          },
          {
            "character": {
              "id": "estella",
              "name": "에스텔라"
            },
            "skill": {
              "name": "디스토션",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "defenseless",
                "label": "방어 불능"
              }
            ],
            "summary": "적이 동결 상태일 때 사용할 수 있습니다. 동결 상태의 적에게 명중했을 경우 추가로 피해를 주고 6초 동안 물리 취약을 부여합니다."
          },
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "skill": {
              "name": "기습 '날카로운 발톱'",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "artsInfliction",
                "label": "아츠 부착"
              }
            ],
            "summary": "망토를 휘날리며 재빠르게 찔러 짧은 시간 동안 목표에게 여러 차례 열기 피해를 준 뒤 단검으로 2단 베기를 하여 대량의 열기 피해를 주고 열기 부착을 부여합니다."
          },
          {
            "character": {
              "id": "alesh",
              "name": "알레쉬"
            },
            "skill": {
              "name": "월척이다!",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "artsInfliction",
                "label": "아츠 부착"
              }
            ],
            "summary": "넓은 범위의 냉기 피해를 주고 냉기 부착 상태를 부여하며 일정 스킬 게이지를 회복합니다."
          }
        ]
      },
      {
        "order": 3,
        "character": {
          "id": "estella",
          "name": "에스텔라"
        },
        "stageIds": [
          "setup",
          "trigger",
          "convert"
        ],
        "title": "동결 완성",
        "detail": "파티의 다른 부착·이상 효과와 연계해 적을 동결 상태로 만든다.",
        "skill": {
          "name": "디스토션",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "적이 동결 상태일 때 사용할 수 있습니다.",
          "동결 상태의 적에게 명중했을 경우 추가로 피해를 주고 6초 동안 물리 취약을 부여합니다."
        ],
        "timing": "",
        "effects": [],
        "mechanics": [
          {
            "id": "freeze",
            "label": "동결"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 4,
        "character": {
          "id": "administrator",
          "name": "관리자 [남][여]"
        },
        "stageIds": [
          "setup",
          "trigger"
        ],
        "title": "동료 연계 대기",
        "detail": "다른 오퍼레이터의 연계 스킬이 피해를 주는 순간 관리자 [남][여]의 연계 스킬을 발동할 준비를 한다.",
        "skill": {
          "name": "봉인 시퀀스",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "팀 내 다른 오퍼레이터의 연계 스킬이 피해를 줄 때 사용할 수 있습니다.",
          "다른 오퍼레이터의 연계 스킬이 피해를 줄 때"
        ],
        "timing": "",
        "effects": [
          "물리 이상 효과와 방어 불능 상태를 부여하면 오리지늄 결정을 파괴하고 물리 피해를 추가로 줍니다."
        ],
        "mechanics": [
          {
            "id": "linkSkill",
            "label": "연계 스킬"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 5,
        "character": {
          "id": "alesh",
          "name": "알레쉬"
        },
        "stageIds": [
          "trigger",
          "convert",
          "recycle"
        ],
        "title": "소모 반응 연계",
        "detail": "근처의 아츠 이상 또는 오리지늄 결정이 소모되면 알레쉬의 연계 스킬을 사용해 게이지를 회복하고 진귀한 린수의 확률형 추가 효과를 노린다.",
        "skill": {
          "name": "얼음낚시 기술",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "근처 목표의 아츠 이상 효과 혹은 오리지늄 결정이 소모되었을 때 사용할 수 있습니다.",
          "아츠 이상 또는 오리지늄 결정 소모 후"
        ],
        "timing": "",
        "effects": [
          "적의 발밑에 구멍을 내 낚시를 시도하여 물리 피해를 주고 스킬 게이지 10포인트를 회복합니다.",
          "일정 확률로 진귀한 린수를 낚을 수 있으며, 이 경우 피해가 대폭 증가하고 스킬 게이지 10포인트를 추가로 회복합니다."
        ],
        "mechanics": [
          {
            "id": "artsAbnormality",
            "label": "아츠 이상"
          },
          {
            "id": "originiumCrystal",
            "label": "오리지늄 결정"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "administrator",
              "name": "관리자 [남][여]"
            },
            "skill": {
              "name": "봉인 시퀀스",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "originiumCrystal",
                "label": "오리지늄 결정"
              }
            ],
            "summary": "팀 내 다른 오퍼레이터의 연계 스킬이 피해를 줄 때 사용할 수 있습니다. 물리 이상 효과와 방어 불능 상태를 부여하면 오리지늄 결정을 파괴하고 물리 피해를 추가로 줍니다."
          },
          {
            "character": {
              "id": "alesh",
              "name": "알레쉬"
            },
            "skill": {
              "name": "비정규 루어",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "artsAbnormality",
                "label": "아츠 이상"
              }
            ],
            "summary": "냉기 부착 상태의 목표를 명중하면 목표의 냉기 부착을 전부 소모하고, 대상에게 강제로 동결 상태를 부여합니다."
          },
          {
            "character": {
              "id": "estella",
              "name": "에스텔라"
            },
            "skill": {
              "name": "디스토션",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "artsAbnormality",
                "label": "아츠 이상"
              }
            ],
            "summary": "적이 동결 상태일 때 사용할 수 있습니다. 동결 상태의 적에게 명중했을 경우 추가로 피해를 주고 6초 동안 물리 취약을 부여합니다."
          }
        ]
      },
      {
        "order": 6,
        "character": {
          "id": "estella",
          "name": "에스텔라"
        },
        "stageIds": [
          "payoff",
          "recycle"
        ],
        "title": "취약 궁극기",
        "detail": "물리 취약이 유지되는 동안 에스텔라의 궁극기를 사용해 원형 물리 피해와 추가 강제 띄우기를 연결한다.",
        "skill": {
          "name": "트레몰로",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [
          "적이 물리 취약 상태라면 대상에게 강제 띄우기 피해를 줍니다."
        ],
        "timing": "물리 취약 효과를 먼저 적용한 뒤 로시의 궁극기를 이어갑니다.",
        "effects": [],
        "mechanics": [
          {
            "id": "physicalDamage",
            "label": "물리 피해"
          },
          {
            "id": "launch",
            "label": "띄우기"
          },
          {
            "id": "physicalVulnerability",
            "label": "물리 취약"
          },
          {
            "id": "ultimate",
            "label": "궁극기"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 7,
        "character": {
          "id": "alesh",
          "name": "알레쉬"
        },
        "stageIds": [
          "setup",
          "trigger",
          "recycle"
        ],
        "title": "광역 재공급",
        "detail": "알레쉬의 궁극기로 넓은 범위에 냉기 피해와 냉기 부착을 제공하고, 명중·처치 상황에 따라 스킬 게이지를 회수해 다음 순환을 준비한다.",
        "skill": {
          "name": "월척이다!",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [],
        "timing": "적에게 필요한 부착·이상 상태를 준비하고, 주력 피해를 집중할 수 있을 때 사용합니다.",
        "effects": [
          "넓은 범위의 냉기 피해를 주고 냉기 부착 상태를 부여하며 일정 스킬 게이지를 회복합니다.",
          "목표를 처치할 때마다 일정량의 스킬 게이지를 추가로 회복합니다."
        ],
        "mechanics": [
          {
            "id": "frostDamage",
            "label": "냉기 피해"
          },
          {
            "id": "frostInfliction",
            "label": "냉기 부착"
          },
          {
            "id": "skillGauge",
            "label": "스킬 게이지"
          }
        ],
        "preparationRoutes": []
      }
    ],
    "supportFlow": [],
    "basicOperation": [
      {
        "order": 1,
        "title": "알레쉬 · 배틀 스킬",
        "detail": "알레쉬의 배틀 스킬로 냉기 부착을 전부 소모해 강제 동결을 부여하고, 소모 스택에 따른 스킬 게이지를 회복한다."
      },
      {
        "order": 2,
        "title": "로시 · 연계 스킬",
        "detail": "목표에게 방어 불능과 아츠 부착을 동시에 만들어 로시의 연계 스킬의 조건을 준비한다."
      },
      {
        "order": 3,
        "title": "에스텔라 · 연계 스킬",
        "detail": "파티의 다른 부착·이상 효과와 연계해 적을 동결 상태로 만든다."
      },
      {
        "order": 4,
        "title": "관리자 [남][여] · 연계 스킬",
        "detail": "다른 오퍼레이터의 연계 스킬이 피해를 주는 순간 관리자 [남][여]의 연계 스킬을 발동할 준비를 한다."
      },
      {
        "order": 5,
        "title": "알레쉬 · 연계 스킬",
        "detail": "근처의 아츠 이상 또는 오리지늄 결정이 소모되면 알레쉬의 연계 스킬을 사용해 게이지를 회복하고 진귀한 린수의 확률형 추가 효과를 노린다."
      },
      {
        "order": 6,
        "title": "에스텔라 · 궁극기",
        "detail": "물리 취약이 유지되는 동안 에스텔라의 궁극기를 사용해 원형 물리 피해와 추가 강제 띄우기를 연결한다."
      },
      {
        "order": 7,
        "title": "알레쉬 · 궁극기",
        "detail": "알레쉬의 궁극기로 넓은 범위에 냉기 피해와 냉기 부착을 제공하고, 명중·처치 상황에 따라 스킬 게이지를 회수해 다음 순환을 준비한다."
      }
    ],
    "roles": [
      {
        "character": {
          "id": "rossi",
          "name": "로시"
        },
        "labels": [
          "열기 부착·방어 불능 생성",
          "물리 피해·아츠 부착 소모",
          "전투 자원 순환",
          "메인 컨트롤 후보"
        ],
        "relation": "관리자 [남][여]의 물리 피해 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "administrator",
          "name": "관리자 [남][여]"
        },
        "labels": [
          "방어 불능·오리지늄 결정 생성",
          "물리 피해·방어 불능 소모",
          "전투 자원 순환",
          "메인 컨트롤 후보"
        ],
        "relation": "로시의 물리 피해 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "alesh",
          "name": "알레쉬"
        },
        "labels": [
          "냉기 부착 생성",
          "냉기 부착·동결 소모",
          "동결 활용",
          "전투 자원 순환"
        ],
        "relation": "로시의 물리 피해 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "estella",
          "name": "에스텔라"
        },
        "labels": [
          "냉기 부착·방어 불능 생성",
          "동결 활용",
          "물리 취약 지원",
          "전투 자원 순환"
        ],
        "relation": "로시의 물리 피해 조건과 직접 이어집니다."
      }
    ],
    "weaknesses": [
      {
        "title": "예열·상태 준비",
        "entries": [
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "axis": "이중 상태 의존",
            "evidence": "연계 스킬은 목표가 방어 불능과 아츠 부착을 동시에 보유해야 발동합니다.",
            "affected": "그림자가 타오르는 순간",
            "implication": "물리 이상 준비와 아츠 부착을 모두 제공하는 파티가 필요합니다. 어느 한쪽 상태가 소모·정화되거나 면역되면 2연속 연계와 치명타 강화가 시작되지 않습니다."
          },
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "axis": "정확한 2연속 입력",
            "evidence": "연계는 연속 2회 발동하며 두 번째 공격이 정확하게 연계될 때 방어 불능 1스택을 추가합니다.",
            "affected": "그림자가 타오르는 순간",
            "implication": "두 번째 입력 타이밍을 놓치거나 적이 이동·무적 상태가 되면 아츠 부착 소모, 치명타 강화, 추가 스택 중 일부를 잃을 수 있습니다."
          },
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "axis": "물리·열기 혼합 지원",
            "evidence": "일반·연계는 주로 물리 피해, 궁극기와 울프팀의 진주는 열기 피해를 사용합니다.",
            "affected": "붉은색의 그림자 · 그림자가 타오르는 순간 · 기습 날카로운 발톱",
            "implication": "한 속성만 강화하는 파티나 제약 환경에서는 전체 스킬이 같은 지원을 받지 못합니다. 다만 늑대의 발톱은 두 피해 유형을 함께 증가시켜 해당 상태 유지가 중요합니다."
          },
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "axis": "늑대의 발톱 전제",
            "evidence": "늑대의 발톱은 방어 불능 대상에게 배틀 스킬을 써 울프팀의 진주가 명중해야 부여됩니다.",
            "affected": "절흔 · 끓어오르는 피",
            "implication": "방어 불능이 없는 목표에게는 진주가 발동하지 않아 지속 피해와 받는 피해 증가, 치명타 추가 효과가 모두 비활성화됩니다. 목표 전환 때마다 다시 준비해야 합니다."
          },
          {
            "character": {
              "id": "administrator",
              "name": "관리자 [남][여]"
            },
            "axis": "동료 연계 스킬 의존",
            "evidence": "봉인 시퀀스는 팀 내 다른 오퍼레이터의 연계 스킬이 피해를 줘야 사용할 수 있습니다.",
            "affected": "봉인 시퀀스",
            "implication": "단독으로는 핵심 결정 부착을 시작할 수 없습니다. 동료의 연계 발동 조건이 막히거나 쿨타임이 늘면 봉인·물리 피해 증가·결정 소모 순환이 함께 지연됩니다."
          },
          {
            "character": {
              "id": "administrator",
              "name": "관리자 [남][여]"
            },
            "axis": "오리지늄 결정 준비와 소모",
            "evidence": "현실 정지와 본질 붕괴, 궁극기 추가 피해는 결정의 부착 또는 소모 여부에 따라 발동합니다.",
            "affected": "봉인 시퀀스 · 본질 붕괴 · 현실 정지 · 폭격 시퀀스",
            "implication": "결정을 너무 빨리 파괴하면 받는 물리 피해 증가의 활용 시간이 짧아지고, 너무 늦게 소모하면 공격력 증가와 추가 피해가 늦어집니다. 부착과 파괴 순서 관리가 필요합니다."
          },
          {
            "character": {
              "id": "administrator",
              "name": "관리자 [남][여]"
            },
            "axis": "물리 이상 파티 의존",
            "evidence": "봉인 시퀀스의 결정은 물리 이상 효과와 방어 불능 상태를 부여할 때 파괴됩니다.",
            "affected": "봉인 시퀀스",
            "implication": "물리 이상이나 방어 불능을 안정적으로 공급할 동료가 없으면 결정 파괴 추가 피해와 본질 붕괴 발동이 제한됩니다. 관련 상태에 저항하는 적에게도 순환이 약해집니다."
          },
          {
            "character": {
              "id": "administrator",
              "name": "관리자 [남][여]"
            },
            "axis": "조건부 자원 회수",
            "evidence": "구성 시퀀스의 스킬 게이지 50 반환은 P1에서 결정 소모에 성공해야 하며, 궁극기 에너지 15 회수도 P3에서 결정 소모 후에만 발동합니다.",
            "affected": "P1 · P3",
            "implication": "기본 단계에서는 코스트 100 배틀 스킬과 궁극기 순환을 보조하는 자원 회수가 없습니다. 결정 소모 실패나 잠재력 부족 시 스킬 회전이 느려집니다."
          },
          {
            "character": {
              "id": "alesh",
              "name": "알레쉬"
            },
            "axis": "냉기 부착 스택 의존",
            "evidence": "비정규 루어는 냉기 부착 상태의 목표를 명중해야 부착을 전부 소모하고 강제 동결과 스킬 게이지 회복을 발동합니다.",
            "affected": "비정규 루어 · 급속 냉동 보존 기술",
            "implication": "냉기 부착을 안정적으로 쌓지 못하면 배틀 스킬이 단순 물리 공격에 가까워지고, 동결과 자원 회복도 함께 사라집니다. 부착 저항·스택 소실 방향의 제약에 취약합니다."
          },
          {
            "character": {
              "id": "alesh",
              "name": "알레쉬"
            },
            "axis": "연계 스킬의 외부 소모 조건",
            "evidence": "얼음낚시 기술은 근처 목표의 아츠 이상 효과 또는 오리지늄 결정이 소모된 뒤에만 사용할 수 있습니다.",
            "affected": "얼음낚시 기술",
            "implication": "알레쉬 혼자서는 오리지늄 결정을 만들 수 없고, 아츠 이상 소모 시점도 파티 구성에 좌우됩니다. 조건을 제공할 동료가 없으면 9초 쿨타임을 충분히 활용하기 어렵습니다."
          },
          {
            "character": {
              "id": "alesh",
              "name": "알레쉬"
            },
            "axis": "물리·냉기 혼합 피해 구조",
            "evidence": "일반 공격·배틀 스킬·연계 스킬은 물리 피해를 주지만 궁극기는 냉기 피해를 주며, 배틀 스킬은 냉기 부착을 조건으로 사용합니다.",
            "affected": "전투 스킬 전반",
            "implication": "한 종류의 피해 증폭만 제공하는 조합에서는 모든 스킬을 동시에 강화하기 어렵습니다. 물리 또는 냉기 한쪽만 지원하는 제약 환경에서 피해 기여가 분산됩니다."
          },
          {
            "character": {
              "id": "alesh",
              "name": "알레쉬"
            },
            "axis": "잠재력에 따른 자원·지원 상한",
            "evidence": "P1은 배틀 스킬의 게이지 회복을 10포인트 늘리고, P3은 확률 성공 후 팀 공격력 버프를 추가하며, P4와 P5는 궁극기 비용과 조건부 피해를 강화합니다.",
            "affected": "P1 · P3 · P4 · P5",
            "implication": "기본 상태에서도 동결과 게이지 회복은 가능하지만 자원 순환, 팀 지원, 궁극기 마무리 성능의 상한은 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "estella",
              "name": "에스텔라"
            },
            "axis": "동결 상태 의존",
            "evidence": "디스토션은 적이 동결 상태일 때만 사용할 수 있고, 동결 대상에게 명중해야 추가 피해와 물리 취약을 부여합니다.",
            "affected": "디스토션 · 트레몰로",
            "implication": "동결을 안정적으로 만들지 못하면 연계 스킬과 물리 취약이 막혀 궁극기의 추가 띄우기 조건까지 이어지지 않습니다. 동결 저항·부착 방해 방향의 제약에 취약합니다."
          },
          {
            "character": {
              "id": "estella",
              "name": "에스텔라"
            },
            "axis": "냉기 준비와 물리 마무리의 분리",
            "evidence": "서스테인은 냉기 피해와 냉기 부착을 제공하지만 디스토션과 트레몰로의 주된 피해는 물리 피해입니다.",
            "affected": "서스테인 · 디스토션 · 트레몰로",
            "implication": "냉기 부착을 준비하면서도 최종 화력은 물리 취약과 물리 피해 지원을 요구합니다. 한 속성 또는 피해 유형에만 집중한 조합에서는 전체 순환을 동시에 강화하기 어렵습니다."
          },
          {
            "character": {
              "id": "estella",
              "name": "에스텔라"
            },
            "axis": "짧은 물리 취약 창",
            "evidence": "디스토션의 물리 취약은 기본 6초 동안 지속되고, 연계 스킬 자체의 쿨타임은 18초입니다.",
            "affected": "디스토션 · 트레몰로",
            "implication": "취약을 부여한 뒤 궁극기와 다른 물리 공격을 빠르게 집중해야 합니다. 교대 지연이나 궁극기 준비 지연 방향의 제약이 취약 창을 낭비하게 만들 수 있습니다."
          },
          {
            "character": {
              "id": "estella",
              "name": "에스텔라"
            },
            "axis": "좁은 연계 범위와 대상 접근",
            "evidence": "디스토션은 빠르게 접근하지만 좁은 범위 내의 적을 공격합니다.",
            "affected": "디스토션",
            "implication": "적이 넓게 퍼진 다수전에서는 한 번의 연계로 여러 대상을 물리 취약 상태로 만들기 어렵습니다. 적 분산이나 접근 방해 방향의 제약에서 효율이 낮아집니다."
          }
        ]
      },
      {
        "title": "스킬 게이지·궁극기 순환",
        "entries": [
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "axis": "치명타 의존",
            "evidence": "끓어오르는 피와 궁극기의 강화 효과는 치명타 피해를 줬을 때 발동합니다.",
            "affected": "끓어오르는 피 · 기습 날카로운 발톱",
            "implication": "치명타가 발생하지 않으면 추가 열기 피해·자기 회복·궁극기 강화의 기대값이 낮아집니다. 치명타 확률 감소나 버프 공백에 민감합니다."
          },
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "axis": "궁극기 에너지와 잠재력",
            "evidence": "궁극기는 에너지 110이 필요하고 P2·P4·P5가 치명타 확률, 에너지 비용, 궁극기 피해를 직접 보완합니다.",
            "affected": "기습 날카로운 발톱 · P2 · P4 · P5",
            "implication": "치명타 중심 마무리의 빈도와 안정성이 잠재력에 따라 크게 달라집니다. 에너지 획득 저하 환경에서는 연계 버프 시간 안에 궁극기를 맞추기 어려울 수 있습니다."
          },
          {
            "character": {
              "id": "administrator",
              "name": "관리자 [남][여]"
            },
            "axis": "동료 연계 스킬 의존",
            "evidence": "봉인 시퀀스는 팀 내 다른 오퍼레이터의 연계 스킬이 피해를 줘야 사용할 수 있습니다.",
            "affected": "봉인 시퀀스",
            "implication": "단독으로는 핵심 결정 부착을 시작할 수 없습니다. 동료의 연계 발동 조건이 막히거나 쿨타임이 늘면 봉인·물리 피해 증가·결정 소모 순환이 함께 지연됩니다."
          },
          {
            "character": {
              "id": "administrator",
              "name": "관리자 [남][여]"
            },
            "axis": "조건부 자원 회수",
            "evidence": "구성 시퀀스의 스킬 게이지 50 반환은 P1에서 결정 소모에 성공해야 하며, 궁극기 에너지 15 회수도 P3에서 결정 소모 후에만 발동합니다.",
            "affected": "P1 · P3",
            "implication": "기본 단계에서는 코스트 100 배틀 스킬과 궁극기 순환을 보조하는 자원 회수가 없습니다. 결정 소모 실패나 잠재력 부족 시 스킬 회전이 느려집니다."
          },
          {
            "character": {
              "id": "alesh",
              "name": "알레쉬"
            },
            "axis": "냉기 부착 스택 의존",
            "evidence": "비정규 루어는 냉기 부착 상태의 목표를 명중해야 부착을 전부 소모하고 강제 동결과 스킬 게이지 회복을 발동합니다.",
            "affected": "비정규 루어 · 급속 냉동 보존 기술",
            "implication": "냉기 부착을 안정적으로 쌓지 못하면 배틀 스킬이 단순 물리 공격에 가까워지고, 동결과 자원 회복도 함께 사라집니다. 부착 저항·스택 소실 방향의 제약에 취약합니다."
          },
          {
            "character": {
              "id": "alesh",
              "name": "알레쉬"
            },
            "axis": "연계 스킬의 외부 소모 조건",
            "evidence": "얼음낚시 기술은 근처 목표의 아츠 이상 효과 또는 오리지늄 결정이 소모된 뒤에만 사용할 수 있습니다.",
            "affected": "얼음낚시 기술",
            "implication": "알레쉬 혼자서는 오리지늄 결정을 만들 수 없고, 아츠 이상 소모 시점도 파티 구성에 좌우됩니다. 조건을 제공할 동료가 없으면 9초 쿨타임을 충분히 활용하기 어렵습니다."
          },
          {
            "character": {
              "id": "alesh",
              "name": "알레쉬"
            },
            "axis": "확률형 연계 강화",
            "evidence": "얼음낚시 기술의 대폭 피해와 스킬 게이지 10포인트 추가 회복은 진귀한 린수를 낚았을 때만 발동하며, 재능은 지능으로 그 확률을 높입니다.",
            "affected": "얼음낚시 기술 · 낚시의 달인 · P3",
            "implication": "핵심 강화가 확률 판정에 포함되어 전투별 결과가 달라질 수 있습니다. 지능 감소나 확률형 효과를 여러 번 시도하기 어려운 짧은 전투에서 편차가 커집니다."
          },
          {
            "character": {
              "id": "alesh",
              "name": "알레쉬"
            },
            "axis": "궁극기의 다수전·처치 의존 회복",
            "evidence": "월척이다!는 넓은 범위를 공격하고 목표를 처치할 때마다 스킬 게이지를 추가로 회복하며 최대 회복량이 정해져 있습니다.",
            "affected": "월척이다!",
            "implication": "적이 적거나 처치가 어려운 단일 강적전에서는 추가 회복 기회가 줄어 광역전보다 게이지 환급 효율이 낮아질 수 있습니다."
          },
          {
            "character": {
              "id": "alesh",
              "name": "알레쉬"
            },
            "axis": "잠재력에 따른 자원·지원 상한",
            "evidence": "P1은 배틀 스킬의 게이지 회복을 10포인트 늘리고, P3은 확률 성공 후 팀 공격력 버프를 추가하며, P4와 P5는 궁극기 비용과 조건부 피해를 강화합니다.",
            "affected": "P1 · P3 · P4 · P5",
            "implication": "기본 상태에서도 동결과 게이지 회복은 가능하지만 자원 순환, 팀 지원, 궁극기 마무리 성능의 상한은 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "estella",
              "name": "에스텔라"
            },
            "axis": "짧은 물리 취약 창",
            "evidence": "디스토션의 물리 취약은 기본 6초 동안 지속되고, 연계 스킬 자체의 쿨타임은 18초입니다.",
            "affected": "디스토션 · 트레몰로",
            "implication": "취약을 부여한 뒤 궁극기와 다른 물리 공격을 빠르게 집중해야 합니다. 교대 지연이나 궁극기 준비 지연 방향의 제약이 취약 창을 낭비하게 만들 수 있습니다."
          },
          {
            "character": {
              "id": "estella",
              "name": "에스텔라"
            },
            "axis": "쇄빙 발동 의존 게이지 반환",
            "evidence": "공감의 스킬 게이지 7.5포인트 반환은 쇄빙이 발생한 뒤 사용하는 다음 서스테인에만 적용되며 중첩되지 않습니다.",
            "affected": "공감 · 서스테인",
            "implication": "동결만 부여하고 쇄빙을 만들지 못하면 게이지 반환이 생기지 않습니다. 또한 효과를 여러 번 저장할 수 없어 발동 후 다음 배틀 스킬 사용 순서를 관리해야 합니다."
          },
          {
            "character": {
              "id": "estella",
              "name": "에스텔라"
            },
            "axis": "궁극기 에너지 수급 보완 의존",
            "evidence": "기본 스킬 설명에서 직접적인 궁극기 에너지 획득은 없고, P5가 동결 부여 후 에너지 5포인트 획득을 추가합니다.",
            "affected": "트레몰로 · P5",
            "implication": "필요 에너지는 70으로 비교적 낮지만 자체 에너지 수급 수단은 잠재력 이전에 제한적입니다. 파티의 에너지 공급이나 P2·P5가 없으면 사용 빈도가 외부 순환에 좌우됩니다."
          },
          {
            "character": {
              "id": "estella",
              "name": "에스텔라"
            },
            "axis": "잠재력에 따른 취약·거리·에너지 보완",
            "evidence": "P1은 물리 취약을 3초 연장하고, P3은 서스테인의 사거리와 첫 대상 피해를 강화하며, P5는 동결 후 궁극기 에너지 획득을 추가합니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 구조의 짧은 취약 시간, 직선 스킬 거리, 자체 에너지 수급 부족을 보완하는 핵심 요소가 잠재력에 배치되어 있습니다."
          }
        ]
      },
      {
        "title": "위치·대상 수",
        "entries": [
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "axis": "늑대의 발톱 전제",
            "evidence": "늑대의 발톱은 방어 불능 대상에게 배틀 스킬을 써 울프팀의 진주가 명중해야 부여됩니다.",
            "affected": "절흔 · 끓어오르는 피",
            "implication": "방어 불능이 없는 목표에게는 진주가 발동하지 않아 지속 피해와 받는 피해 증가, 치명타 추가 효과가 모두 비활성화됩니다. 목표 전환 때마다 다시 준비해야 합니다."
          },
          {
            "character": {
              "id": "administrator",
              "name": "관리자 [남][여]"
            },
            "axis": "동료 연계 스킬 의존",
            "evidence": "봉인 시퀀스는 팀 내 다른 오퍼레이터의 연계 스킬이 피해를 줘야 사용할 수 있습니다.",
            "affected": "봉인 시퀀스",
            "implication": "단독으로는 핵심 결정 부착을 시작할 수 없습니다. 동료의 연계 발동 조건이 막히거나 쿨타임이 늘면 봉인·물리 피해 증가·결정 소모 순환이 함께 지연됩니다."
          },
          {
            "character": {
              "id": "administrator",
              "name": "관리자 [남][여]"
            },
            "axis": "짧은 봉인과 범위 차이",
            "evidence": "봉인은 4초만 지속되고 배틀 스킬은 전방 범위, 궁극기는 부채꼴 범위에 적용됩니다.",
            "affected": "구성 시퀀스 · 봉인 시퀀스 · 폭격 시퀀스",
            "implication": "봉인 시간 안에 파티 공격과 결정 파괴를 맞춰야 하며, 적이 흩어지거나 방향을 바꾸면 범위 스킬의 명중 수가 줄어듭니다."
          },
          {
            "character": {
              "id": "alesh",
              "name": "알레쉬"
            },
            "axis": "냉기 부착 스택 의존",
            "evidence": "비정규 루어는 냉기 부착 상태의 목표를 명중해야 부착을 전부 소모하고 강제 동결과 스킬 게이지 회복을 발동합니다.",
            "affected": "비정규 루어 · 급속 냉동 보존 기술",
            "implication": "냉기 부착을 안정적으로 쌓지 못하면 배틀 스킬이 단순 물리 공격에 가까워지고, 동결과 자원 회복도 함께 사라집니다. 부착 저항·스택 소실 방향의 제약에 취약합니다."
          },
          {
            "character": {
              "id": "alesh",
              "name": "알레쉬"
            },
            "axis": "궁극기의 다수전·처치 의존 회복",
            "evidence": "월척이다!는 넓은 범위를 공격하고 목표를 처치할 때마다 스킬 게이지를 추가로 회복하며 최대 회복량이 정해져 있습니다.",
            "affected": "월척이다!",
            "implication": "적이 적거나 처치가 어려운 단일 강적전에서는 추가 회복 기회가 줄어 광역전보다 게이지 환급 효율이 낮아질 수 있습니다."
          },
          {
            "character": {
              "id": "estella",
              "name": "에스텔라"
            },
            "axis": "동결 상태 의존",
            "evidence": "디스토션은 적이 동결 상태일 때만 사용할 수 있고, 동결 대상에게 명중해야 추가 피해와 물리 취약을 부여합니다.",
            "affected": "디스토션 · 트레몰로",
            "implication": "동결을 안정적으로 만들지 못하면 연계 스킬과 물리 취약이 막혀 궁극기의 추가 띄우기 조건까지 이어지지 않습니다. 동결 저항·부착 방해 방향의 제약에 취약합니다."
          },
          {
            "character": {
              "id": "estella",
              "name": "에스텔라"
            },
            "axis": "짧은 물리 취약 창",
            "evidence": "디스토션의 물리 취약은 기본 6초 동안 지속되고, 연계 스킬 자체의 쿨타임은 18초입니다.",
            "affected": "디스토션 · 트레몰로",
            "implication": "취약을 부여한 뒤 궁극기와 다른 물리 공격을 빠르게 집중해야 합니다. 교대 지연이나 궁극기 준비 지연 방향의 제약이 취약 창을 낭비하게 만들 수 있습니다."
          },
          {
            "character": {
              "id": "estella",
              "name": "에스텔라"
            },
            "axis": "좁은 연계 범위와 대상 접근",
            "evidence": "디스토션은 빠르게 접근하지만 좁은 범위 내의 적을 공격합니다.",
            "affected": "디스토션",
            "implication": "적이 넓게 퍼진 다수전에서는 한 번의 연계로 여러 대상을 물리 취약 상태로 만들기 어렵습니다. 적 분산이나 접근 방해 방향의 제약에서 효율이 낮아집니다."
          }
        ]
      },
      {
        "title": "잠재력 의존",
        "entries": [
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "axis": "궁극기 에너지와 잠재력",
            "evidence": "궁극기는 에너지 110이 필요하고 P2·P4·P5가 치명타 확률, 에너지 비용, 궁극기 피해를 직접 보완합니다.",
            "affected": "기습 날카로운 발톱 · P2 · P4 · P5",
            "implication": "치명타 중심 마무리의 빈도와 안정성이 잠재력에 따라 크게 달라집니다. 에너지 획득 저하 환경에서는 연계 버프 시간 안에 궁극기를 맞추기 어려울 수 있습니다."
          },
          {
            "character": {
              "id": "administrator",
              "name": "관리자 [남][여]"
            },
            "axis": "조건부 자원 회수",
            "evidence": "구성 시퀀스의 스킬 게이지 50 반환은 P1에서 결정 소모에 성공해야 하며, 궁극기 에너지 15 회수도 P3에서 결정 소모 후에만 발동합니다.",
            "affected": "P1 · P3",
            "implication": "기본 단계에서는 코스트 100 배틀 스킬과 궁극기 순환을 보조하는 자원 회수가 없습니다. 결정 소모 실패나 잠재력 부족 시 스킬 회전이 느려집니다."
          },
          {
            "character": {
              "id": "administrator",
              "name": "관리자 [남][여]"
            },
            "axis": "미공개 잠재력",
            "evidence": "P4와 P5의 이름과 효과가 현재 원문에서 미공개입니다.",
            "affected": "P4 · P5",
            "implication": "최종 잠재력 단계의 성능과 순환 보완 폭을 아직 평가할 수 없습니다. 공개 전까지는 P1~P3만으로 잠재력 의존도를 판단해야 합니다."
          },
          {
            "character": {
              "id": "alesh",
              "name": "알레쉬"
            },
            "axis": "잠재력에 따른 자원·지원 상한",
            "evidence": "P1은 배틀 스킬의 게이지 회복을 10포인트 늘리고, P3은 확률 성공 후 팀 공격력 버프를 추가하며, P4와 P5는 궁극기 비용과 조건부 피해를 강화합니다.",
            "affected": "P1 · P3 · P4 · P5",
            "implication": "기본 상태에서도 동결과 게이지 회복은 가능하지만 자원 순환, 팀 지원, 궁극기 마무리 성능의 상한은 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "estella",
              "name": "에스텔라"
            },
            "axis": "궁극기 에너지 수급 보완 의존",
            "evidence": "기본 스킬 설명에서 직접적인 궁극기 에너지 획득은 없고, P5가 동결 부여 후 에너지 5포인트 획득을 추가합니다.",
            "affected": "트레몰로 · P5",
            "implication": "필요 에너지는 70으로 비교적 낮지만 자체 에너지 수급 수단은 잠재력 이전에 제한적입니다. 파티의 에너지 공급이나 P2·P5가 없으면 사용 빈도가 외부 순환에 좌우됩니다."
          },
          {
            "character": {
              "id": "estella",
              "name": "에스텔라"
            },
            "axis": "잠재력에 따른 취약·거리·에너지 보완",
            "evidence": "P1은 물리 취약을 3초 연장하고, P3은 서스테인의 사거리와 첫 대상 피해를 강화하며, P5는 동결 후 궁극기 에너지 획득을 추가합니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 구조의 짧은 취약 시간, 직선 스킬 거리, 자체 에너지 수급 부족을 보완하는 핵심 요소가 잠재력에 배치되어 있습니다."
          }
        ]
      },
      {
        "title": "메인 컨트롤·조작 집중",
        "entries": [
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "axis": "정확한 2연속 입력",
            "evidence": "연계는 연속 2회 발동하며 두 번째 공격이 정확하게 연계될 때 방어 불능 1스택을 추가합니다.",
            "affected": "그림자가 타오르는 순간",
            "implication": "두 번째 입력 타이밍을 놓치거나 적이 이동·무적 상태가 되면 아츠 부착 소모, 치명타 강화, 추가 스택 중 일부를 잃을 수 있습니다."
          }
        ]
      }
    ],
    "discoveries": [
      {
        "character": {
          "id": "rossi",
          "name": "로시"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 배틀 스킬 비중이 높지만, 연계 스킬은 아츠 부착·방어 불능 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "administrator",
          "name": "관리자 [남][여]"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 연계 스킬 비중이 높지만, 연계 스킬은 연계 스킬 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "alesh",
          "name": "알레쉬"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 궁극기 비중이 높지만, 연계 스킬은 아츠 이상·오리지늄 결정 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "estella",
          "name": "에스텔라"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 배틀 스킬 비중이 높지만, 연계 스킬은 동결·물리 취약 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      }
    ],
    "designHints": [
      {
        "id": "ultimate",
        "title": "궁극기 반복 의존도",
        "pressure": "궁극기 반복 사용의 효율이 점차 낮아지는 방향",
        "impact": "궁극기를 중심으로 한 강화 구간과 마무리 빈도가 줄어듭니다.",
        "opportunity": "궁극기 에너지를 다른 가치로 돌리거나 배틀·연계 스킬을 주력화하는 운용을 찾게 됩니다.",
        "caution": "첫 궁극기까지 무력화하면 준비 과정의 의미도 사라질 수 있으므로 반복 효율을 조절하는 편이 발견을 만들기 쉽습니다.",
        "characters": [
          {
            "id": "rossi",
            "name": "로시"
          },
          {
            "id": "administrator",
            "name": "관리자 [남][여]"
          },
          {
            "id": "alesh",
            "name": "알레쉬"
          },
          {
            "id": "estella",
            "name": "에스텔라"
          }
        ]
      },
      {
        "id": "battle",
        "title": "배틀 스킬 피해 비중",
        "pressure": "배틀 스킬의 직접 피해를 줄이되 연계 스킬 순환은 열어주는 방향",
        "impact": "스킬 게이지를 사용해 즉시 내는 화력이 줄어듭니다.",
        "opportunity": "배틀 스킬을 상태 생성·변환 용도로만 쓰고, 연계 스킬이나 궁극기 외 추가 피해를 주력으로 삼는 구조가 떠오를 수 있습니다.",
        "caution": "배틀 스킬의 상태 부여까지 막으면 후속 연계 조건 자체가 사라질 수 있습니다.",
        "characters": [
          {
            "id": "rossi",
            "name": "로시"
          },
          {
            "id": "administrator",
            "name": "관리자 [남][여]"
          },
          {
            "id": "alesh",
            "name": "알레쉬"
          },
          {
            "id": "estella",
            "name": "에스텔라"
          }
        ]
      },
      {
        "id": "link",
        "title": "연계 스킬 빈도",
        "pressure": "연계 스킬 사용 빈도와 쿨타임을 크게 흔드는 방향",
        "impact": "조건을 자주 열 수 있는 파티일수록 순환 속도가 크게 달라집니다.",
        "opportunity": "연계 횟수가 늘어날 때 생기는 자원 수급과 보조 피해, 반대로 연계에 대가가 생길 때의 대체 순서를 비교할 수 있습니다.",
        "caution": "연계 조건과 쿨타임을 동시에 막으면 조합의 상호작용이 사라질 수 있습니다.",
        "characters": [
          {
            "id": "rossi",
            "name": "로시"
          },
          {
            "id": "administrator",
            "name": "관리자 [남][여]"
          },
          {
            "id": "alesh",
            "name": "알레쉬"
          },
          {
            "id": "estella",
            "name": "에스텔라"
          }
        ]
      },
      {
        "id": "stack",
        "title": "부착·방어 불능 축적 속도",
        "pressure": "같은 대상에게 스택을 연속으로 쌓는 속도를 제한하는 방향",
        "impact": "최대 스택을 전제로 하는 동결·강타·갑옷 파괴·취약 발동 시점이 늦어집니다.",
        "opportunity": "낮은 스택에서 바로 작동하는 스킬, 강제 이상, 직접 부여 효과의 가치가 올라갈 수 있습니다.",
        "caution": "부착 자체를 금지하면 대체 운용이 아니라 파티의 핵심 문법을 삭제하게 됩니다.",
        "characters": [
          {
            "id": "rossi",
            "name": "로시"
          },
          {
            "id": "administrator",
            "name": "관리자 [남][여]"
          },
          {
            "id": "alesh",
            "name": "알레쉬"
          },
          {
            "id": "estella",
            "name": "에스텔라"
          }
        ]
      },
      {
        "id": "main",
        "title": "메인 컨트롤 점유",
        "pressure": "전투 중 메인 컨트롤 교체를 어렵게 하거나 한 명에게 고정하는 방향",
        "impact": "메인 컨트롤 전환을 요구하는 궁극기와 강력한 일격 조건이 서로 경쟁합니다.",
        "opportunity": "비조작 상태에서도 작동하는 설치물·연계 스킬·지원 효과를 중심으로 역할을 재배치할 수 있습니다.",
        "caution": "핵심 캐릭터를 잘못 고정하면 플레이 선택보다 편성 실패만 강요할 수 있으므로 후보별 차이가 남아야 합니다.",
        "characters": [
          {
            "id": "rossi",
            "name": "로시"
          },
          {
            "id": "administrator",
            "name": "관리자 [남][여]"
          },
          {
            "id": "alesh",
            "name": "알레쉬"
          },
          {
            "id": "estella",
            "name": "에스텔라"
          }
        ]
      }
    ],
    "mechanicProfile": {
      "mechanicIds": [
        "defenseless",
        "artsInfliction",
        "frostInfliction",
        "freeze",
        "physicalDamage",
        "ultimate",
        "launch",
        "originiumCrystal",
        "frostDamage",
        "skillGauge",
        "physicalVulnerability",
        "heatDamage",
        "artsAbnormality",
        "heatInfliction",
        "ultimateEnergy",
        "linkSkill",
        "battleSkill"
      ],
      "mechanicScores": {
        "defenseless": 27,
        "artsInfliction": 20.5,
        "frostInfliction": 20,
        "freeze": 19.5,
        "physicalDamage": 14.5,
        "ultimate": 10.5,
        "launch": 10,
        "originiumCrystal": 9.5,
        "frostDamage": 9,
        "skillGauge": 9,
        "physicalVulnerability": 7,
        "heatDamage": 6.5,
        "artsAbnormality": 6.5,
        "heatInfliction": 5,
        "ultimateEnergy": 4.5,
        "linkSkill": 4.5,
        "battleSkill": 3,
        "electricDamage": 0,
        "natureDamage": 0,
        "artsDamage": 0,
        "electricInfliction": 0,
        "natureInfliction": 0,
        "combustion": 0,
        "shock": 0,
        "corrosion": 0,
        "knockdown": 0,
        "smash": 0,
        "armorBreak": 0,
        "imbalance": 0,
        "powerStrike": 0,
        "execution": 0,
        "artsVulnerability": 0,
        "heatVulnerability": 0,
        "electricVulnerability": 0,
        "frostVulnerability": 0,
        "natureVulnerability": 0,
        "artsAmplification": 0,
        "physicalAmplification": 0,
        "heatAmplification": 0,
        "electricAmplification": 0,
        "frostAmplification": 0,
        "natureAmplification": 0,
        "skillGaugeReturn": 0,
        "protection": 0,
        "fortification": 0,
        "healing": 0,
        "weakness": 0,
        "comboHit": 0,
        "cleanse": 0,
        "slow": 0,
        "haste": 0,
        "mainControl": 0,
        "generalAttack": 0
      },
      "dominantAction": "ultimate",
      "actionTotals": {
        "generalAttack": 4,
        "battleSkill": 24,
        "linkSkill": 24,
        "ultimate": 26
      },
      "hintIds": [
        "ultimate",
        "battle",
        "link",
        "stack",
        "main"
      ],
      "hintTitles": [
        "궁극기 반복 의존도",
        "배틀 스킬 피해 비중",
        "연계 스킬 빈도",
        "부착·방어 불능 축적 속도",
        "메인 컨트롤 점유"
      ],
      "weaknessAxes": [
        "이중 상태 의존",
        "정확한 2연속 입력",
        "물리·열기 혼합 지원",
        "늑대의 발톱 전제",
        "동료 연계 스킬 의존",
        "오리지늄 결정 준비와 소모",
        "물리 이상 파티 의존",
        "조건부 자원 회수",
        "냉기 부착 스택 의존",
        "연계 스킬의 외부 소모 조건",
        "물리·냉기 혼합 피해 구조",
        "잠재력에 따른 자원·지원 상한",
        "동결 상태 의존",
        "냉기 준비와 물리 마무리의 분리",
        "짧은 물리 취약 창",
        "좁은 연계 범위와 대상 접근",
        "치명타 의존",
        "궁극기 에너지와 잠재력",
        "동료 연계 스킬 의존",
        "조건부 자원 회수",
        "냉기 부착 스택 의존",
        "연계 스킬의 외부 소모 조건",
        "확률형 연계 강화",
        "궁극기의 다수전·처치 의존 회복",
        "잠재력에 따른 자원·지원 상한",
        "짧은 물리 취약 창",
        "쇄빙 발동 의존 게이지 반환",
        "궁극기 에너지 수급 보완 의존",
        "잠재력에 따른 취약·거리·에너지 보완",
        "늑대의 발톱 전제",
        "동료 연계 스킬 의존",
        "짧은 봉인과 범위 차이",
        "냉기 부착 스택 의존",
        "궁극기의 다수전·처치 의존 회복",
        "동결 상태 의존",
        "짧은 물리 취약 창",
        "좁은 연계 범위와 대상 접근",
        "궁극기 에너지와 잠재력",
        "조건부 자원 회수",
        "미공개 잠재력",
        "잠재력에 따른 자원·지원 상한",
        "궁극기 에너지 수급 보완 의존",
        "잠재력에 따른 취약·거리·에너지 보완",
        "정확한 2연속 입력"
      ],
      "dependencyLabels": [
        "방어 불능",
        "아츠 부착",
        "냉기 부착",
        "동결",
        "궁극기"
      ]
    }
  },
  {
    "schemaVersion": 1,
    "id": "party-laevatain-camu-wolfguard-adelia",
    "exportedAt": "2026-07-25T05:48:35.630Z",
    "title": "레바테인 · 카뮤 · 울프가드 · 아델리아 파티 분석",
    "party": [
      {
        "id": "laevatain",
        "name": "레바테인",
        "order": 1
      },
      {
        "id": "camu",
        "name": "카뮤",
        "order": 2
      },
      {
        "id": "wolfguard",
        "name": "울프가드",
        "order": 3
      },
      {
        "id": "adelia",
        "name": "아델리아",
        "order": 4
      }
    ],
    "summary": {
      "title": "파티 전투 구조 분석",
      "sentence": "열기 부착을 준비해 연소·부식 조건으로 전환하고, 연계 스킬·배틀 스킬에 화력을 모으는 파티입니다.",
      "dominantAction": "linkSkill",
      "actionTotals": {
        "generalAttack": 6,
        "battleSkill": 26,
        "linkSkill": 31,
        "ultimate": 24
      },
      "dependencies": [
        {
          "id": "heatInfliction",
          "label": "열기 부착",
          "color": "heat",
          "level": "매우 높음",
          "score": 23
        },
        {
          "id": "combustion",
          "label": "연소",
          "color": "heat",
          "level": "매우 높음",
          "score": 19
        },
        {
          "id": "skillGauge",
          "label": "스킬 게이지",
          "color": "cyan",
          "level": "매우 높음",
          "score": 13.5
        },
        {
          "id": "artsInfliction",
          "label": "아츠 부착",
          "color": "cyan",
          "level": "매우 높음",
          "score": 12
        },
        {
          "id": "linkSkill",
          "label": "연계 스킬",
          "color": "purple",
          "level": "주력 행동",
          "score": 31
        }
      ]
    },
    "diagram": {
      "nodes": [
        {
          "order": 1,
          "character": {
            "id": "camu",
            "name": "카뮤"
          },
          "skill": {
            "name": "사르는 불꽃",
            "type": "배틀 스킬",
            "typeId": "battleSkill",
            "index": 1
          },
          "title": "날개 부여"
        },
        {
          "order": 2,
          "character": {
            "id": "wolfguard",
            "name": "울프가드"
          },
          "skill": {
            "name": "폭렬 수류탄 · β형",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "아츠 상태 준비"
        },
        {
          "order": 3,
          "character": {
            "id": "adelia",
            "name": "아델리아"
          },
          "skill": {
            "name": "화산 분화",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "무상태 대상 포착"
        },
        {
          "order": 4,
          "character": {
            "id": "laevatain",
            "name": "레바테인"
          },
          "skill": {
            "name": "열화",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "상태 준비"
        },
        {
          "order": 5,
          "character": {
            "id": "camu",
            "name": "카뮤"
          },
          "skill": {
            "name": "영혼의 가시",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "연계 조건 생성"
        },
        {
          "order": 6,
          "character": {
            "id": "wolfguard",
            "name": "울프가드"
          },
          "skill": {
            "name": "탄흔의 열기",
            "type": "배틀 스킬",
            "typeId": "battleSkill",
            "index": 1
          },
          "title": "상태 소모 사격"
        },
        {
          "order": 7,
          "character": {
            "id": "wolfguard",
            "name": "울프가드"
          },
          "skill": {
            "name": "다중 연사",
            "type": "일반 공격",
            "typeId": "generalAttack",
            "index": 0
          },
          "title": "게이지 반환"
        },
        {
          "order": 8,
          "character": {
            "id": "camu",
            "name": "카뮤"
          },
          "skill": {
            "name": "선혈의 비",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "궁극기 전개"
        },
        {
          "order": 9,
          "character": {
            "id": "laevatain",
            "name": "레바테인"
          },
          "skill": {
            "name": "황혼",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "레바테인의 궁극기 유지"
        }
      ],
      "connections": [
        {
          "fromOrder": 1,
          "toOrder": 2,
          "label": "열기 부착",
          "preparationRoutes": [
            {
              "character": {
                "id": "wolfguard",
                "name": "울프가드"
              },
              "skill": {
                "name": "탄흔의 열기",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "heatInfliction",
                  "label": "열기 부착"
                },
                {
                  "id": "combustion",
                  "label": "연소"
                },
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "목표를 연속으로 사격하여 소량의 열기 피해를 주고, 마지막 한 발은 열기 부착 상태를 부여합니다."
            },
            {
              "character": {
                "id": "laevatain",
                "name": "레바테인"
              },
              "skill": {
                "name": "불타오르는 화염",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "combustion",
                  "label": "연소"
                }
              ],
              "summary": "이미 녹아내린 불꽃 4스택이 쌓였을 경우 마지막에 모든 스택 수치를 소모해 넓은 범위 내의 적에게 추가로 1회 공격하며, 열기 피해를 주고 짧은 강제 연소 상태를 부여합니다."
            },
            {
              "character": {
                "id": "camu",
                "name": "카뮤"
              },
              "skill": {
                "name": "사르는 불꽃",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "heatInfliction",
                  "label": "열기 부착"
                }
              ],
              "summary": "작은 범위 내의 적에게 열기 피해를 주고 열기 부착을 부여합니다. 이후 타오르는 핏빛 날개는 목표의 주변에서 배회하며 목표에 허약과 열기 취약을 부여합니다."
            },
            {
              "character": {
                "id": "laevatain",
                "name": "레바테인"
              },
              "skill": {
                "name": "열화",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "combustion",
                  "label": "연소"
                }
              ],
              "summary": "적이 연소 상태거나 부식 상태일 때 사용할 수 있습니다."
            },
            {
              "character": {
                "id": "laevatain",
                "name": "레바테인"
              },
              "skill": {
                "name": "황혼",
                "type": "궁극기",
                "typeId": "ultimate",
                "index": 3
              },
              "matchedMechanics": [
                {
                  "id": "heatInfliction",
                  "label": "열기 부착"
                }
              ],
              "summary": "메인 컨트롤 전환 · 지속형 모든 공격이 열기 피해를 주며, 3단계 일반 공격은 열기 부착 상태를 부여합니다. 레바테인의 연계 스킬의 마검을 소환하고 메인 컨트롤 오퍼레이터로 전환합니다."
            },
            {
              "character": {
                "id": "camu",
                "name": "카뮤"
              },
              "skill": {
                "name": "선혈의 비",
                "type": "궁극기",
                "typeId": "ultimate",
                "index": 3
              },
              "matchedMechanics": [
                {
                  "id": "heatInfliction",
                  "label": "열기 부착"
                }
              ],
              "summary": "추적 전환 · 연계 스킬 취급 카뮤가 공중으로 날아올라 창의 비를 퍼붓고 가로 베기 공격을 시전하며, 명중한 목표에 열기 피해를 주고 열기 부착을 부여하며, 동시에 일정 스킬 게이지를 회복합니다. 추적은 연계 스킬로 간주되며, 스킬 게이지를 소모하지 않습니다."
            }
          ]
        },
        {
          "fromOrder": 2,
          "toOrder": 3,
          "label": "다음 조건 연결",
          "preparationRoutes": []
        },
        {
          "fromOrder": 3,
          "toOrder": 4,
          "label": "다음 조건 연결",
          "preparationRoutes": [
            {
              "character": {
                "id": "wolfguard",
                "name": "울프가드"
              },
              "skill": {
                "name": "탄흔의 열기",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "heatInfliction",
                  "label": "열기 부착"
                },
                {
                  "id": "combustion",
                  "label": "연소"
                }
              ],
              "summary": "목표를 연속으로 사격하여 소량의 열기 피해를 주고, 마지막 한 발은 열기 부착 상태를 부여합니다."
            },
            {
              "character": {
                "id": "laevatain",
                "name": "레바테인"
              },
              "skill": {
                "name": "불타오르는 화염",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "combustion",
                  "label": "연소"
                }
              ],
              "summary": "이미 녹아내린 불꽃 4스택이 쌓였을 경우 마지막에 모든 스택 수치를 소모해 넓은 범위 내의 적에게 추가로 1회 공격하며, 열기 피해를 주고 짧은 강제 연소 상태를 부여합니다."
            },
            {
              "character": {
                "id": "camu",
                "name": "카뮤"
              },
              "skill": {
                "name": "사르는 불꽃",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "heatInfliction",
                  "label": "열기 부착"
                }
              ],
              "summary": "작은 범위 내의 적에게 열기 피해를 주고 열기 부착을 부여합니다. 이후 타오르는 핏빛 날개는 목표의 주변에서 배회하며 목표에 허약과 열기 취약을 부여합니다."
            },
            {
              "character": {
                "id": "adelia",
                "name": "아델리아"
              },
              "skill": {
                "name": "질주하는 돌리",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "corrosion",
                  "label": "부식"
                }
              ],
              "summary": "목표가 부식 상태라면 부식을 소모하고 대상에게 물리 취약과 아츠 취약 16%를 30초 동안 부여합니다."
            },
            {
              "character": {
                "id": "wolfguard",
                "name": "울프가드"
              },
              "skill": {
                "name": "폭렬 수류탄 · β형",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "heatInfliction",
                  "label": "열기 부착"
                }
              ],
              "summary": "아츠 부착 상태를 부여한 적이 있을 때 사용할 수 있습니다. 근처 범위 내의 적에게 열기 피해를 주고 열기 부착 상태를 부여합니다."
            },
            {
              "character": {
                "id": "adelia",
                "name": "아델리아"
              },
              "skill": {
                "name": "화산 분화",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "corrosion",
                  "label": "부식"
                }
              ],
              "summary": "메인 컨트롤 오퍼레이터가 방어 불능 혹은 아츠 부착 상태에 처해 있지 않은 적에게 강력한 일격을 준 후 사용할 수 있습니다. 화산 구름은 목표를 추적한 뒤 폭발하여 주변의 다른 적에게 절반의 자연 피해를 주고 강제로 7초 동안 부식 상태를 부여합니다."
            }
          ]
        },
        {
          "fromOrder": 4,
          "toOrder": 5,
          "label": "열기 부착",
          "preparationRoutes": [
            {
              "character": {
                "id": "camu",
                "name": "카뮤"
              },
              "skill": {
                "name": "사르는 불꽃",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "heatInfliction",
                  "label": "열기 부착"
                }
              ],
              "summary": "작은 범위 내의 적에게 열기 피해를 주고 열기 부착을 부여합니다. 이후 타오르는 핏빛 날개는 목표의 주변에서 배회하며 목표에 허약과 열기 취약을 부여합니다."
            },
            {
              "character": {
                "id": "wolfguard",
                "name": "울프가드"
              },
              "skill": {
                "name": "탄흔의 열기",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "heatInfliction",
                  "label": "열기 부착"
                }
              ],
              "summary": "목표를 연속으로 사격하여 소량의 열기 피해를 주고, 마지막 한 발은 열기 부착 상태를 부여합니다."
            },
            {
              "character": {
                "id": "wolfguard",
                "name": "울프가드"
              },
              "skill": {
                "name": "폭렬 수류탄 · β형",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "heatInfliction",
                  "label": "열기 부착"
                }
              ],
              "summary": "아츠 부착 상태를 부여한 적이 있을 때 사용할 수 있습니다. 근처 범위 내의 적에게 열기 피해를 주고 열기 부착 상태를 부여합니다."
            },
            {
              "character": {
                "id": "laevatain",
                "name": "레바테인"
              },
              "skill": {
                "name": "황혼",
                "type": "궁극기",
                "typeId": "ultimate",
                "index": 3
              },
              "matchedMechanics": [
                {
                  "id": "heatInfliction",
                  "label": "열기 부착"
                }
              ],
              "summary": "메인 컨트롤 전환 · 지속형 모든 공격이 열기 피해를 주며, 3단계 일반 공격은 열기 부착 상태를 부여합니다. 레바테인의 연계 스킬의 마검을 소환하고 메인 컨트롤 오퍼레이터로 전환합니다."
            },
            {
              "character": {
                "id": "camu",
                "name": "카뮤"
              },
              "skill": {
                "name": "선혈의 비",
                "type": "궁극기",
                "typeId": "ultimate",
                "index": 3
              },
              "matchedMechanics": [
                {
                  "id": "heatInfliction",
                  "label": "열기 부착"
                }
              ],
              "summary": "추적 전환 · 연계 스킬 취급 카뮤가 공중으로 날아올라 창의 비를 퍼붓고 가로 베기 공격을 시전하며, 명중한 목표에 열기 피해를 주고 열기 부착을 부여하며, 동시에 일정 스킬 게이지를 회복합니다. 추적은 연계 스킬로 간주되며, 스킬 게이지를 소모하지 않습니다."
            }
          ]
        },
        {
          "fromOrder": 5,
          "toOrder": 6,
          "label": "다음 조건 연결",
          "preparationRoutes": [
            {
              "character": {
                "id": "laevatain",
                "name": "레바테인"
              },
              "skill": {
                "name": "불타오르는 화염",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "combustion",
                  "label": "연소"
                }
              ],
              "summary": "이미 녹아내린 불꽃 4스택이 쌓였을 경우 마지막에 모든 스택 수치를 소모해 넓은 범위 내의 적에게 추가로 1회 공격하며, 열기 피해를 주고 짧은 강제 연소 상태를 부여합니다."
            },
            {
              "character": {
                "id": "laevatain",
                "name": "레바테인"
              },
              "skill": {
                "name": "열화",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "combustion",
                  "label": "연소"
                }
              ],
              "summary": "적이 연소 상태거나 부식 상태일 때 사용할 수 있습니다."
            },
            {
              "character": {
                "id": "wolfguard",
                "name": "울프가드"
              },
              "skill": {
                "name": "늑대의 분노",
                "type": "궁극기",
                "typeId": "ultimate",
                "index": 3
              },
              "matchedMechanics": [
                {
                  "id": "combustion",
                  "label": "연소"
                }
              ],
              "summary": "5회에 걸쳐 열기 피해를 주고 강제 연소 상태를 부여합니다."
            }
          ]
        },
        {
          "fromOrder": 6,
          "toOrder": 7,
          "label": "다음 조건 연결",
          "preparationRoutes": [
            {
              "character": {
                "id": "laevatain",
                "name": "레바테인"
              },
              "skill": {
                "name": "불타오르는 화염",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "artsAbnormality",
                  "label": "아츠 이상"
                }
              ],
              "summary": "이미 녹아내린 불꽃 4스택이 쌓였을 경우 마지막에 모든 스택 수치를 소모해 넓은 범위 내의 적에게 추가로 1회 공격하며, 열기 피해를 주고 짧은 강제 연소 상태를 부여합니다."
            },
            {
              "character": {
                "id": "wolfguard",
                "name": "울프가드"
              },
              "skill": {
                "name": "탄흔의 열기",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "artsAbnormality",
                  "label": "아츠 이상"
                }
              ],
              "summary": "목표를 연속으로 사격하여 소량의 열기 피해를 주고, 마지막 한 발은 열기 부착 상태를 부여합니다."
            },
            {
              "character": {
                "id": "adelia",
                "name": "아델리아"
              },
              "skill": {
                "name": "질주하는 돌리",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "artsAbnormality",
                  "label": "아츠 이상"
                }
              ],
              "summary": "목표가 부식 상태라면 부식을 소모하고 대상에게 물리 취약과 아츠 취약 16%를 30초 동안 부여합니다."
            },
            {
              "character": {
                "id": "laevatain",
                "name": "레바테인"
              },
              "skill": {
                "name": "열화",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "artsAbnormality",
                  "label": "아츠 이상"
                }
              ],
              "summary": "적이 연소 상태거나 부식 상태일 때 사용할 수 있습니다."
            },
            {
              "character": {
                "id": "adelia",
                "name": "아델리아"
              },
              "skill": {
                "name": "화산 분화",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "artsAbnormality",
                  "label": "아츠 이상"
                }
              ],
              "summary": "메인 컨트롤 오퍼레이터가 방어 불능 혹은 아츠 부착 상태에 처해 있지 않은 적에게 강력한 일격을 준 후 사용할 수 있습니다."
            },
            {
              "character": {
                "id": "wolfguard",
                "name": "울프가드"
              },
              "skill": {
                "name": "늑대의 분노",
                "type": "궁극기",
                "typeId": "ultimate",
                "index": 3
              },
              "matchedMechanics": [
                {
                  "id": "artsAbnormality",
                  "label": "아츠 이상"
                }
              ],
              "summary": "5회에 걸쳐 열기 피해를 주고 강제 연소 상태를 부여합니다."
            }
          ]
        },
        {
          "fromOrder": 7,
          "toOrder": 8,
          "label": "스킬 게이지",
          "preparationRoutes": []
        },
        {
          "fromOrder": 8,
          "toOrder": 9,
          "label": "스킬 게이지 재투자",
          "preparationRoutes": []
        }
      ]
    },
    "combatFlow": [
      {
        "order": 1,
        "character": {
          "id": "camu",
          "name": "카뮤"
        },
        "stageIds": [
          "setup",
          "payoff"
        ],
        "title": "날개 부여",
        "detail": "카뮤의 배틀 스킬으로 열기 부착을 걸고, 타오르는 핏빛 날개의 허약·열기 취약 배회를 시작한다.",
        "skill": {
          "name": "사르는 불꽃",
          "type": "배틀 스킬",
          "typeId": "battleSkill",
          "index": 1
        },
        "conditions": [],
        "timing": "",
        "effects": [
          "작은 범위 내의 적에게 열기 피해를 주고 열기 부착을 부여합니다.",
          "이후 타오르는 핏빛 날개는 목표의 주변에서 배회하며 목표에 허약과 열기 취약을 부여합니다.",
          "목표가 처치될 때, 타오르는 핏빛 날개는 주변의 다른 적에게 날아가 열기 피해를 주고, 열기 부착을 부여하며, 허약과 열기 취약을 부여합니다."
        ],
        "mechanics": [
          {
            "id": "heatInfliction",
            "label": "열기 부착"
          },
          {
            "id": "heatVulnerability",
            "label": "열기 취약"
          },
          {
            "id": "weakness",
            "label": "허약"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 2,
        "character": {
          "id": "wolfguard",
          "name": "울프가드"
        },
        "stageIds": [
          "setup",
          "trigger",
          "convert"
        ],
        "title": "아츠 상태 준비",
        "detail": "연소 또는 감전 상태를 준비하거나, 연계 스킬로 열기 부착을 부여해 스킬 조건을 만든다.",
        "skill": {
          "name": "폭렬 수류탄 · β형",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "아츠 부착 상태를 부여한 적이 있을 때 사용할 수 있습니다.",
          "아츠 부착 적 존재"
        ],
        "timing": "",
        "effects": [
          "근처 범위 내의 적에게 열기 피해를 주고 열기 부착 상태를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "heatInfliction",
            "label": "열기 부착"
          },
          {
            "id": "combustion",
            "label": "연소"
          },
          {
            "id": "shock",
            "label": "감전"
          },
          {
            "id": "linkSkill",
            "label": "연계 스킬"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "skill": {
              "name": "탄흔의 열기",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "heatInfliction",
                "label": "열기 부착"
              },
              {
                "id": "combustion",
                "label": "연소"
              },
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "목표를 연속으로 사격하여 소량의 열기 피해를 주고, 마지막 한 발은 열기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "skill": {
              "name": "불타오르는 화염",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "combustion",
                "label": "연소"
              }
            ],
            "summary": "이미 녹아내린 불꽃 4스택이 쌓였을 경우 마지막에 모든 스택 수치를 소모해 넓은 범위 내의 적에게 추가로 1회 공격하며, 열기 피해를 주고 짧은 강제 연소 상태를 부여합니다."
          },
          {
            "character": {
              "id": "camu",
              "name": "카뮤"
            },
            "skill": {
              "name": "사르는 불꽃",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "heatInfliction",
                "label": "열기 부착"
              }
            ],
            "summary": "작은 범위 내의 적에게 열기 피해를 주고 열기 부착을 부여합니다. 이후 타오르는 핏빛 날개는 목표의 주변에서 배회하며 목표에 허약과 열기 취약을 부여합니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "skill": {
              "name": "열화",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "combustion",
                "label": "연소"
              }
            ],
            "summary": "적이 연소 상태거나 부식 상태일 때 사용할 수 있습니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "skill": {
              "name": "황혼",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "heatInfliction",
                "label": "열기 부착"
              }
            ],
            "summary": "메인 컨트롤 전환 · 지속형 모든 공격이 열기 피해를 주며, 3단계 일반 공격은 열기 부착 상태를 부여합니다. 레바테인의 연계 스킬의 마검을 소환하고 메인 컨트롤 오퍼레이터로 전환합니다."
          },
          {
            "character": {
              "id": "camu",
              "name": "카뮤"
            },
            "skill": {
              "name": "선혈의 비",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "heatInfliction",
                "label": "열기 부착"
              }
            ],
            "summary": "추적 전환 · 연계 스킬 취급 카뮤가 공중으로 날아올라 창의 비를 퍼붓고 가로 베기 공격을 시전하며, 명중한 목표에 열기 피해를 주고 열기 부착을 부여하며, 동시에 일정 스킬 게이지를 회복합니다. 추적은 연계 스킬로 간주되며, 스킬 게이지를 소모하지 않습니다."
          }
        ]
      },
      {
        "order": 3,
        "character": {
          "id": "adelia",
          "name": "아델리아"
        },
        "stageIds": [
          "setup"
        ],
        "title": "무상태 대상 포착",
        "detail": "방어 불능과 아츠 부착이 없는 적에게 메인 컨트롤 오퍼레이터가 강력한 일격을 넣어 아델리아의 연계 스킬을 연다.",
        "skill": {
          "name": "화산 분화",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "메인 컨트롤 오퍼레이터가 방어 불능 혹은 아츠 부착 상태에 처해 있지 않은 적에게 강력한 일격을 준 후 사용할 수 있습니다.",
          "방어 불능·아츠 부착이 없는 적에게 강력한 일격"
        ],
        "timing": "",
        "effects": [
          "화산 구름은 목표를 추적한 뒤 폭발하여 주변의 다른 적에게 절반의 자연 피해를 주고 강제로 7초 동안 부식 상태를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "artsInfliction",
            "label": "아츠 부착"
          },
          {
            "id": "defenseless",
            "label": "방어 불능"
          },
          {
            "id": "powerStrike",
            "label": "강력한 일격"
          },
          {
            "id": "mainControl",
            "label": "메인 컨트롤"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 4,
        "character": {
          "id": "laevatain",
          "name": "레바테인"
        },
        "stageIds": [
          "setup",
          "convert"
        ],
        "title": "상태 준비",
        "detail": "열기 부착 또는 연소·부식 상태를 만든다.",
        "skill": {
          "name": "열화",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "적이 연소 상태거나 부식 상태일 때 사용할 수 있습니다.",
          "모든 연소 상태 혹은 부식 상태의 적의 발밑에서 불꽃이 솟아오르게 만들고 대상에게 열기 피해를 줍니다."
        ],
        "timing": "",
        "effects": [],
        "mechanics": [
          {
            "id": "heatInfliction",
            "label": "열기 부착"
          },
          {
            "id": "combustion",
            "label": "연소"
          },
          {
            "id": "corrosion",
            "label": "부식"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "skill": {
              "name": "탄흔의 열기",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "heatInfliction",
                "label": "열기 부착"
              },
              {
                "id": "combustion",
                "label": "연소"
              }
            ],
            "summary": "목표를 연속으로 사격하여 소량의 열기 피해를 주고, 마지막 한 발은 열기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "skill": {
              "name": "불타오르는 화염",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "combustion",
                "label": "연소"
              }
            ],
            "summary": "이미 녹아내린 불꽃 4스택이 쌓였을 경우 마지막에 모든 스택 수치를 소모해 넓은 범위 내의 적에게 추가로 1회 공격하며, 열기 피해를 주고 짧은 강제 연소 상태를 부여합니다."
          },
          {
            "character": {
              "id": "camu",
              "name": "카뮤"
            },
            "skill": {
              "name": "사르는 불꽃",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "heatInfliction",
                "label": "열기 부착"
              }
            ],
            "summary": "작은 범위 내의 적에게 열기 피해를 주고 열기 부착을 부여합니다. 이후 타오르는 핏빛 날개는 목표의 주변에서 배회하며 목표에 허약과 열기 취약을 부여합니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "skill": {
              "name": "질주하는 돌리",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "corrosion",
                "label": "부식"
              }
            ],
            "summary": "목표가 부식 상태라면 부식을 소모하고 대상에게 물리 취약과 아츠 취약 16%를 30초 동안 부여합니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "skill": {
              "name": "폭렬 수류탄 · β형",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "heatInfliction",
                "label": "열기 부착"
              }
            ],
            "summary": "아츠 부착 상태를 부여한 적이 있을 때 사용할 수 있습니다. 근처 범위 내의 적에게 열기 피해를 주고 열기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "skill": {
              "name": "화산 분화",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "corrosion",
                "label": "부식"
              }
            ],
            "summary": "메인 컨트롤 오퍼레이터가 방어 불능 혹은 아츠 부착 상태에 처해 있지 않은 적에게 강력한 일격을 준 후 사용할 수 있습니다. 화산 구름은 목표를 추적한 뒤 폭발하여 주변의 다른 적에게 절반의 자연 피해를 주고 강제로 7초 동안 부식 상태를 부여합니다."
          }
        ]
      },
      {
        "order": 5,
        "character": {
          "id": "camu",
          "name": "카뮤"
        },
        "stageIds": [
          "setup",
          "trigger",
          "convert"
        ],
        "title": "연계 조건 생성",
        "detail": "적의 열기 부착을 소모하거나 흡수해 카뮤의 연계 스킬 사용 조건을 충족한다.",
        "skill": {
          "name": "영혼의 가시",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "적의 열기 부착이 소모되거나 흡수된 후 사용할 수 있습니다.",
          "열기 부착 소모·흡수 후"
        ],
        "timing": "",
        "effects": [
          "해당 위치를 이리저리 가로지르며 열기 피해를 주고, 일정량의 스킬 게이지를 회복합니다."
        ],
        "mechanics": [
          {
            "id": "heatInfliction",
            "label": "열기 부착"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "camu",
              "name": "카뮤"
            },
            "skill": {
              "name": "사르는 불꽃",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "heatInfliction",
                "label": "열기 부착"
              }
            ],
            "summary": "작은 범위 내의 적에게 열기 피해를 주고 열기 부착을 부여합니다. 이후 타오르는 핏빛 날개는 목표의 주변에서 배회하며 목표에 허약과 열기 취약을 부여합니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "skill": {
              "name": "탄흔의 열기",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "heatInfliction",
                "label": "열기 부착"
              }
            ],
            "summary": "목표를 연속으로 사격하여 소량의 열기 피해를 주고, 마지막 한 발은 열기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "skill": {
              "name": "폭렬 수류탄 · β형",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "heatInfliction",
                "label": "열기 부착"
              }
            ],
            "summary": "아츠 부착 상태를 부여한 적이 있을 때 사용할 수 있습니다. 근처 범위 내의 적에게 열기 피해를 주고 열기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "skill": {
              "name": "황혼",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "heatInfliction",
                "label": "열기 부착"
              }
            ],
            "summary": "메인 컨트롤 전환 · 지속형 모든 공격이 열기 피해를 주며, 3단계 일반 공격은 열기 부착 상태를 부여합니다. 레바테인의 연계 스킬의 마검을 소환하고 메인 컨트롤 오퍼레이터로 전환합니다."
          },
          {
            "character": {
              "id": "camu",
              "name": "카뮤"
            },
            "skill": {
              "name": "선혈의 비",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "heatInfliction",
                "label": "열기 부착"
              }
            ],
            "summary": "추적 전환 · 연계 스킬 취급 카뮤가 공중으로 날아올라 창의 비를 퍼붓고 가로 베기 공격을 시전하며, 명중한 목표에 열기 피해를 주고 열기 부착을 부여하며, 동시에 일정 스킬 게이지를 회복합니다. 추적은 연계 스킬로 간주되며, 스킬 게이지를 소모하지 않습니다."
          }
        ]
      },
      {
        "order": 6,
        "character": {
          "id": "wolfguard",
          "name": "울프가드"
        },
        "stageIds": [
          "convert"
        ],
        "title": "상태 소모 사격",
        "detail": "울프가드의 배틀 스킬로 연소·감전을 소모해 추가 1회 사격과 대량의 열기 피해를 발생시킨다.",
        "skill": {
          "name": "탄흔의 열기",
          "type": "배틀 스킬",
          "typeId": "battleSkill",
          "index": 1
        },
        "conditions": [],
        "timing": "",
        "effects": [
          "목표를 연속으로 사격하여 소량의 열기 피해를 주고, 마지막 한 발은 열기 부착 상태를 부여합니다.",
          "목표가 연소 또는 감전 상태일 경우 열기 부착 상태를 부여하지 않고, 해당 상태를 소모하여 추가로 1회 사격하며 대량의 열기 피해를 줍니다."
        ],
        "mechanics": [
          {
            "id": "heatDamage",
            "label": "열기 피해"
          },
          {
            "id": "combustion",
            "label": "연소"
          },
          {
            "id": "shock",
            "label": "감전"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "skill": {
              "name": "불타오르는 화염",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "combustion",
                "label": "연소"
              }
            ],
            "summary": "이미 녹아내린 불꽃 4스택이 쌓였을 경우 마지막에 모든 스택 수치를 소모해 넓은 범위 내의 적에게 추가로 1회 공격하며, 열기 피해를 주고 짧은 강제 연소 상태를 부여합니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "skill": {
              "name": "열화",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "combustion",
                "label": "연소"
              }
            ],
            "summary": "적이 연소 상태거나 부식 상태일 때 사용할 수 있습니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "skill": {
              "name": "늑대의 분노",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "combustion",
                "label": "연소"
              }
            ],
            "summary": "5회에 걸쳐 열기 피해를 주고 강제 연소 상태를 부여합니다."
          }
        ]
      },
      {
        "order": 7,
        "character": {
          "id": "wolfguard",
          "name": "울프가드"
        },
        "stageIds": [
          "convert",
          "recycle"
        ],
        "title": "게이지 반환",
        "detail": "아츠 이상을 소모했다면 절제의 원칙으로 스킬 게이지 10포인트를 반환받는다.",
        "skill": {
          "name": "다중 연사",
          "type": "일반 공격",
          "typeId": "generalAttack",
          "index": 0
        },
        "conditions": [
          "처형 공격: 주변에 불균형 상태의 적이 있을 때, 일반 공격을 사용하면 해당 적을 처형하여 대량의 열기 피해를 주고 일정량의 스킬 게이지를 회복합니다."
        ],
        "timing": "",
        "effects": [
          "메인 컨트롤 오퍼레이터라면 강력한 일격이 18포인트의 불균형 피해를 줍니다."
        ],
        "mechanics": [
          {
            "id": "artsAbnormality",
            "label": "아츠 이상"
          },
          {
            "id": "skillGauge",
            "label": "스킬 게이지"
          },
          {
            "id": "skillGaugeReturn",
            "label": "스킬 게이지 반환"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "skill": {
              "name": "불타오르는 화염",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "artsAbnormality",
                "label": "아츠 이상"
              }
            ],
            "summary": "이미 녹아내린 불꽃 4스택이 쌓였을 경우 마지막에 모든 스택 수치를 소모해 넓은 범위 내의 적에게 추가로 1회 공격하며, 열기 피해를 주고 짧은 강제 연소 상태를 부여합니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "skill": {
              "name": "탄흔의 열기",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "artsAbnormality",
                "label": "아츠 이상"
              }
            ],
            "summary": "목표를 연속으로 사격하여 소량의 열기 피해를 주고, 마지막 한 발은 열기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "skill": {
              "name": "질주하는 돌리",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "artsAbnormality",
                "label": "아츠 이상"
              }
            ],
            "summary": "목표가 부식 상태라면 부식을 소모하고 대상에게 물리 취약과 아츠 취약 16%를 30초 동안 부여합니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "skill": {
              "name": "열화",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "artsAbnormality",
                "label": "아츠 이상"
              }
            ],
            "summary": "적이 연소 상태거나 부식 상태일 때 사용할 수 있습니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "skill": {
              "name": "화산 분화",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "artsAbnormality",
                "label": "아츠 이상"
              }
            ],
            "summary": "메인 컨트롤 오퍼레이터가 방어 불능 혹은 아츠 부착 상태에 처해 있지 않은 적에게 강력한 일격을 준 후 사용할 수 있습니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "skill": {
              "name": "늑대의 분노",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "artsAbnormality",
                "label": "아츠 이상"
              }
            ],
            "summary": "5회에 걸쳐 열기 피해를 주고 강제 연소 상태를 부여합니다."
          }
        ]
      },
      {
        "order": 8,
        "character": {
          "id": "camu",
          "name": "카뮤"
        },
        "stageIds": [
          "setup",
          "payoff",
          "recycle"
        ],
        "title": "궁극기 전개",
        "detail": "카뮤의 궁극기로 열기 피해·열기 부착·스킬 게이지 회복을 얻고 다음 배틀 스킬을 추적으로 바꾼다.",
        "skill": {
          "name": "선혈의 비",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [
          "추적 전환 · 연계 스킬 취급"
        ],
        "timing": "적에게 필요한 부착·이상 상태를 준비하고, 주력 피해를 집중할 수 있을 때 사용합니다.",
        "effects": [
          "카뮤가 공중으로 날아올라 창의 비를 퍼붓고 가로 베기 공격을 시전하며, 명중한 목표에 열기 피해를 주고 열기 부착을 부여하며, 동시에 일정 스킬 게이지를 회복합니다.",
          "추적은 연계 스킬로 간주되며, 스킬 게이지를 소모하지 않습니다.",
          "추적: 해당 위치를 이리저리 가로지르며 열기 피해를 주고, 일정량의 스킬 게이지를 회복합니다."
        ],
        "mechanics": [
          {
            "id": "heatDamage",
            "label": "열기 피해"
          },
          {
            "id": "heatInfliction",
            "label": "열기 부착"
          },
          {
            "id": "skillGauge",
            "label": "스킬 게이지"
          },
          {
            "id": "battleSkill",
            "label": "배틀 스킬"
          },
          {
            "id": "ultimate",
            "label": "궁극기"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 9,
        "character": {
          "id": "laevatain",
          "name": "레바테인"
        },
        "stageIds": [
          "convert",
          "payoff",
          "recycle"
        ],
        "title": "레바테인의 궁극기 유지",
        "detail": "메인 컨트롤로 전환해 강화 일반 공격을 이어가며 스킬 사용 중 지속시간 감소를 멈춘다.",
        "skill": {
          "name": "황혼",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [
          "메인 컨트롤 전환 · 지속형"
        ],
        "timing": "적에게 필요한 부착·이상 상태를 준비하고, 주력 피해를 집중할 수 있을 때 사용합니다.",
        "effects": [
          "레바테인의 연계 스킬의 마검을 소환하고 메인 컨트롤 오퍼레이터로 전환합니다.",
          "모든 공격이 열기 피해를 주며, 3단계 일반 공격은 열기 부착 상태를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "mainControl",
            "label": "메인 컨트롤"
          },
          {
            "id": "generalAttack",
            "label": "일반 공격"
          }
        ],
        "preparationRoutes": []
      }
    ],
    "supportFlow": [],
    "basicOperation": [
      {
        "order": 1,
        "title": "카뮤 · 배틀 스킬",
        "detail": "카뮤의 배틀 스킬으로 열기 부착을 걸고, 타오르는 핏빛 날개의 허약·열기 취약 배회를 시작한다."
      },
      {
        "order": 2,
        "title": "울프가드 · 연계 스킬",
        "detail": "연소 또는 감전 상태를 준비하거나, 연계 스킬로 열기 부착을 부여해 스킬 조건을 만든다."
      },
      {
        "order": 3,
        "title": "아델리아 · 연계 스킬",
        "detail": "방어 불능과 아츠 부착이 없는 적에게 메인 컨트롤 오퍼레이터가 강력한 일격을 넣어 아델리아의 연계 스킬을 연다."
      },
      {
        "order": 4,
        "title": "레바테인 · 연계 스킬",
        "detail": "열기 부착 또는 연소·부식 상태를 만든다."
      },
      {
        "order": 5,
        "title": "카뮤 · 연계 스킬",
        "detail": "적의 열기 부착을 소모하거나 흡수해 카뮤의 연계 스킬 사용 조건을 충족한다."
      },
      {
        "order": 6,
        "title": "울프가드 · 배틀 스킬",
        "detail": "울프가드의 배틀 스킬로 연소·감전을 소모해 추가 1회 사격과 대량의 열기 피해를 발생시킨다."
      },
      {
        "order": 7,
        "title": "울프가드 · 일반 공격",
        "detail": "아츠 이상을 소모했다면 절제의 원칙으로 스킬 게이지 10포인트를 반환받는다."
      },
      {
        "order": 8,
        "title": "카뮤 · 궁극기",
        "detail": "카뮤의 궁극기로 열기 피해·열기 부착·스킬 게이지 회복을 얻고 다음 배틀 스킬을 추적으로 바꾼다."
      },
      {
        "order": 9,
        "title": "레바테인 · 궁극기",
        "detail": "메인 컨트롤로 전환해 강화 일반 공격을 이어가며 스킬 사용 중 지속시간 감소를 멈춘다."
      }
    ],
    "roles": [
      {
        "character": {
          "id": "laevatain",
          "name": "레바테인"
        },
        "labels": [
          "열기 부착 생성",
          "열기 피해·연소 소모",
          "연소·부식 활용",
          "전투 자원 순환"
        ],
        "relation": "카뮤의 열기 피해 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "camu",
          "name": "카뮤"
        },
        "labels": [
          "열기 부착 생성",
          "열기 부착·스킬 게이지 소모",
          "열기 취약 지원",
          "전투 자원 순환"
        ],
        "relation": "레바테인의 열기 피해 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "wolfguard",
          "name": "울프가드"
        },
        "labels": [
          "열기 부착 생성",
          "열기 피해·열기 부착 소모",
          "연소·감전 활용",
          "전투 자원 순환"
        ],
        "relation": "레바테인의 열기 피해 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "adelia",
          "name": "아델리아"
        },
        "labels": [
          "부식·아츠 취약 소모",
          "부식 활용",
          "아츠 취약·물리 취약 지원",
          "전투 자원 순환"
        ],
        "relation": "레바테인의 불균형 조건과 직접 이어집니다."
      }
    ],
    "weaknesses": [
      {
        "title": "예열·상태 준비",
        "entries": [
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "메인 컨트롤 점유",
            "evidence": "강력한 일격·처형·궁극기 전환과 강화 일반 공격이 메인 컨트롤 상태에 연결됩니다.",
            "affected": "재 · 불꽃의 심장 · 황혼",
            "implication": "메인 컨트롤 유지가 제한되거나 교대가 강제되면 핵심 발동 기회가 줄어듭니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "4스택 예열",
            "evidence": "불타오르는 화염의 추가 공격은 녹아내린 불꽃 4스택을 이미 보유한 상태에서 사용해야 발동합니다.",
            "affected": "불타오르는 화염 · 열화 · 불꽃의 심장",
            "implication": "중첩 획득 빈도·유지 시간·소모 조건의 변화에 순환 속도가 직접 영향을 받습니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "상태 이상 조건",
            "evidence": "열화는 적이 연소 또는 부식 상태일 때만 사용할 수 있고, 불꽃의 심장은 주변 적의 열기 부착을 흡수합니다.",
            "affected": "열화 · 불꽃의 심장",
            "implication": "아츠 부착과 연소·부식의 부여·유지·갱신이 방해되면 연계 스킬과 중첩 수급이 함께 약해집니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "열기 피해 편중",
            "evidence": "일반 공격부터 궁극기까지 주요 공격이 열기 피해이며, 저항 무시는 불꽃의 심장 4스택 후 20포인트입니다.",
            "affected": "전투 스킬 전반",
            "implication": "열기 저항이 높은 대상에게 피해 효율이 낮아질 수 있으며, 저항 무시 효과의 가동 여부가 중요합니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "대상 수·처치 수 효율",
            "evidence": "열화는 상태 이상 대상마다 공격하고 궁극기 에너지를 획득하며, P5는 처치 수에 따라 황혼을 최대 7초 연장합니다.",
            "affected": "열화 · P5",
            "implication": "적 수가 적거나 처치가 어려운 전투에서는 대상별 에너지 수급과 지속시간 연장의 이득이 감소합니다."
          },
          {
            "character": {
              "id": "camu",
              "name": "카뮤"
            },
            "axis": "열기 부착 소모·흡수 의존",
            "evidence": "영혼의 가시는 적의 열기 부착이 소모되거나 흡수된 후에만 사용할 수 있습니다.",
            "affected": "영혼의 가시",
            "implication": "열기 부착을 소비하거나 흡수할 수단이 부족한 조합에서는 연계 스킬의 발동 빈도가 낮아집니다."
          },
          {
            "character": {
              "id": "camu",
              "name": "카뮤"
            },
            "axis": "배회 목표 의존",
            "evidence": "영혼의 가시가 타오르는 핏빛 날개가 배회 중인 적을 명중해야 추가 폭발과 죄를 쫓는 자의 회복·연타가 함께 발동합니다.",
            "affected": "사르는 불꽃 · 영혼의 가시 · 죄를 쫓는 자",
            "implication": "날개가 붙지 않은 목표를 공격하거나 배회 대상 전환이 꼬이면 주요 연계 보상이 줄어듭니다. 추적은 재능의 배회 조건만 무시합니다."
          },
          {
            "character": {
              "id": "camu",
              "name": "카뮤"
            },
            "axis": "회복 기반 중첩",
            "evidence": "혈류 소생은 스킬로 자신의 생명력을 회복할 때 열기 피해 증가 스택을 얻으며, 기본적으로 영혼의 가시와 추적의 재능 회복에 연결됩니다.",
            "affected": "죄를 쫓는 자 · 혈류 소생",
            "implication": "회복 발동 기회가 적으면 최대 5스택 예열이 늦어지고, 40초 지속 효과를 유지하기 어려워집니다."
          },
          {
            "character": {
              "id": "camu",
              "name": "카뮤"
            },
            "axis": "잠재력에 따른 순환 강화",
            "evidence": "P1은 허약·열기 취약과 배회 시간을 강화하고, P3은 영혼의 가시 쿨타임·피해·게이지 회복량을 개선하며, P5는 혈류 소생의 스택당 열기 피해 증가 효과를 강화합니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 구조는 잠재력 없이 작동하지만, 디버프 유지와 연계 회전, 누적 화력은 관련 잠재력의 영향을 크게 받습니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "연소·감전 소모 의존",
            "evidence": "탄흔의 열기는 목표가 연소 또는 감전 상태일 때만 해당 상태를 소모해 추가 사격과 대량의 열기 피해를 발동합니다.",
            "affected": "탄흔의 열기 · 절제의 원칙",
            "implication": "대상에게 소모할 아츠 이상이 없으면 추가 사격과 스킬 게이지 반환을 함께 얻지 못해 배틀 스킬의 효율이 낮아집니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "파티 상태 공급 의존",
            "evidence": "울프가드가 직접 확정적으로 제공하는 소모 대상은 궁극기의 강제 연소이며, 감전은 별도의 전기 부착 조건이 필요합니다.",
            "affected": "탄흔의 열기 · 늑대의 분노",
            "implication": "궁극기 사이에도 추가 효과를 반복하려면 연소 또는 감전을 안정적으로 공급하는 팀 구성이 유리합니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "스킬 게이지와 쿨타임",
            "evidence": "탄흔의 열기는 스킬 게이지 100포인트를 소모하고, 폭렬 수류탄 · β형은 쿨타임 19초입니다. 스킬 게이지 100포인트의 자연 회복에는 12.5초가 걸립니다.",
            "affected": "탄흔의 열기 · 폭렬 수류탄 · β형",
            "implication": "스킬 게이지 회복 감소, 배틀 스킬 비용 증가, 연계 스킬 쿨타임 증가 방향의 제약에서 상태 소모와 재부착의 순환이 느려질 수 있습니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "상태 소모에 따른 충돌",
            "evidence": "탄흔의 열기는 연소 또는 감전 상태를 소모하며, 그 경우 마지막 탄의 열기 부착을 부여하지 않습니다.",
            "affected": "탄흔의 열기",
            "implication": "다른 오퍼레이터가 유지 중인 연소·감전을 활용해야 하는 조합에서는 울프가드의 소모 시점과 팀의 상태 활용 순서를 맞춰야 합니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "대상 수에 따른 역할 차이",
            "evidence": "탄흔의 열기의 추가 효과는 목표의 상태를 확인하는 단일 대상 중심 구조인 반면, 폭렬 수류탄 · β형과 늑대의 분노는 주변 또는 근처 범위를 공격합니다.",
            "affected": "탄흔의 열기 · 폭렬 수류탄 · β형 · 늑대의 분노",
            "implication": "단일 대상에서는 상태 소모 화력을 집중하기 쉽지만, 다수 대상에서는 각 적에게 소모 가능한 상태를 준비하지 않으면 배틀 스킬의 추가 효과를 넓게 활용하기 어렵습니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "잠재력에 따른 순환 확장",
            "evidence": "P2는 게이지 반환을 추가하고, P3은 불타는 송곳니 유지와 팀 공유를 제공하며, P5는 궁극기 후 연계 스킬 쿨타임을 초기화합니다.",
            "affected": "P2 · P3 · P5",
            "implication": "기본 상태에서도 상태 소모 순환은 가능하지만, 게이지 회수·팀 열기 강화·연계 재사용의 완성도는 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "상반된 연계 조건과 부식 순환",
            "evidence": "화산 분화는 방어 불능과 아츠 부착이 없는 적에게 강력한 일격을 줘야 발동하고, 질주하는 돌리의 추가 효과는 부식 상태를 요구합니다.",
            "affected": "화산 분화 · 질주하는 돌리",
            "implication": "먼저 상태가 없는 목표를 골라 연계로 부식을 만든 뒤 즉시 배틀 스킬로 소모해야 합니다. 다른 파티원이 아츠 부착이나 방어 불능을 먼저 걸면 연계 조건을 놓칠 수 있어 행동 순서 의존도가 높습니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "부식 소모 의존",
            "evidence": "질주하는 돌리는 부식 상태를 소모해야 물리 취약과 아츠 취약을 부여합니다.",
            "affected": "질주하는 돌리 · 마운틴 서퍼",
            "implication": "부식을 준비하지 못하면 배틀 스킬은 자연 피해만 주고 핵심 지원 효과와 추가 돌진을 얻지 못합니다. 상태 면역·상태 제거·부식 준비 지연 방향의 제약에서 성능이 크게 떨어집니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "다수 대상 위치 의존",
            "evidence": "마운틴 서퍼는 부식 상태의 다른 적이 근처에 있을 때만 추가 배틀 스킬을 발동합니다.",
            "affected": "마운틴 서퍼",
            "implication": "단일 대상전에서는 재능 2가 발동하지 않으며, 적이 흩어지면 취약 확장이 끊깁니다. 다수전에서도 부식 대상의 거리와 배치에 따라 실제 이득이 달라집니다."
          }
        ]
      },
      {
        "title": "스킬 게이지·궁극기 순환",
        "entries": [
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "대상 수·처치 수 효율",
            "evidence": "열화는 상태 이상 대상마다 공격하고 궁극기 에너지를 획득하며, P5는 처치 수에 따라 황혼을 최대 7초 연장합니다.",
            "affected": "열화 · P5",
            "implication": "적 수가 적거나 처치가 어려운 전투에서는 대상별 에너지 수급과 지속시간 연장의 이득이 감소합니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "긴 생존 재발동 간격",
            "evidence": "부활의 불씨는 강한 비호와 회복을 제공하지만 120초마다 최대 1회 발동합니다.",
            "affected": "부활의 불씨",
            "implication": "짧은 시간 안에 반복되는 치명적 피해에는 두 번째 대응 수단으로 사용할 수 없습니다."
          },
          {
            "character": {
              "id": "camu",
              "name": "카뮤"
            },
            "axis": "스킬 게이지와 쿨타임",
            "evidence": "사르는 불꽃은 스킬 게이지 100포인트를 소모하고, 영혼의 가시는 기본 쿨타임이 19초입니다. 게이지 100포인트의 자연 회복에는 12.5초가 걸립니다.",
            "affected": "사르는 불꽃 · 영혼의 가시",
            "implication": "스킬 게이지 회복 감소, 배틀 스킬 비용 증가, 연계 스킬 쿨타임 증가 방향의 제약에 순환이 느려질 수 있습니다."
          },
          {
            "character": {
              "id": "camu",
              "name": "카뮤"
            },
            "axis": "배회 목표 의존",
            "evidence": "영혼의 가시가 타오르는 핏빛 날개가 배회 중인 적을 명중해야 추가 폭발과 죄를 쫓는 자의 회복·연타가 함께 발동합니다.",
            "affected": "사르는 불꽃 · 영혼의 가시 · 죄를 쫓는 자",
            "implication": "날개가 붙지 않은 목표를 공격하거나 배회 대상 전환이 꼬이면 주요 연계 보상이 줄어듭니다. 추적은 재능의 배회 조건만 무시합니다."
          },
          {
            "character": {
              "id": "camu",
              "name": "카뮤"
            },
            "axis": "회복 기반 중첩",
            "evidence": "혈류 소생은 스킬로 자신의 생명력을 회복할 때 열기 피해 증가 스택을 얻으며, 기본적으로 영혼의 가시와 추적의 재능 회복에 연결됩니다.",
            "affected": "죄를 쫓는 자 · 혈류 소생",
            "implication": "회복 발동 기회가 적으면 최대 5스택 예열이 늦어지고, 40초 지속 효과를 유지하기 어려워집니다."
          },
          {
            "character": {
              "id": "camu",
              "name": "카뮤"
            },
            "axis": "잠재력에 따른 순환 강화",
            "evidence": "P1은 허약·열기 취약과 배회 시간을 강화하고, P3은 영혼의 가시 쿨타임·피해·게이지 회복량을 개선하며, P5는 혈류 소생의 스택당 열기 피해 증가 효과를 강화합니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 구조는 잠재력 없이 작동하지만, 디버프 유지와 연계 회전, 누적 화력은 관련 잠재력의 영향을 크게 받습니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "연소·감전 소모 의존",
            "evidence": "탄흔의 열기는 목표가 연소 또는 감전 상태일 때만 해당 상태를 소모해 추가 사격과 대량의 열기 피해를 발동합니다.",
            "affected": "탄흔의 열기 · 절제의 원칙",
            "implication": "대상에게 소모할 아츠 이상이 없으면 추가 사격과 스킬 게이지 반환을 함께 얻지 못해 배틀 스킬의 효율이 낮아집니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "스킬 게이지와 쿨타임",
            "evidence": "탄흔의 열기는 스킬 게이지 100포인트를 소모하고, 폭렬 수류탄 · β형은 쿨타임 19초입니다. 스킬 게이지 100포인트의 자연 회복에는 12.5초가 걸립니다.",
            "affected": "탄흔의 열기 · 폭렬 수류탄 · β형",
            "implication": "스킬 게이지 회복 감소, 배틀 스킬 비용 증가, 연계 스킬 쿨타임 증가 방향의 제약에서 상태 소모와 재부착의 순환이 느려질 수 있습니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "잠재력에 따른 순환 확장",
            "evidence": "P2는 게이지 반환을 추가하고, P3은 불타는 송곳니 유지와 팀 공유를 제공하며, P5는 궁극기 후 연계 스킬 쿨타임을 초기화합니다.",
            "affected": "P2 · P3 · P5",
            "implication": "기본 상태에서도 상태 소모 순환은 가능하지만, 게이지 회수·팀 열기 강화·연계 재사용의 완성도는 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "잠재력에 따른 지원 격차",
            "evidence": "P1은 취약을 추가 8% 강화하고 P2는 추가 아군 치유, P5는 부식 지속과 연계 회전을 강화합니다.",
            "affected": "P1 · P2 · P5",
            "implication": "기본 단계에서는 취약 수치, 팀 치유 범위, 부식 유지 시간이 제한됩니다. 취약 강화와 다인 회복을 기대하는 운용은 잠재력 의존도가 높습니다."
          }
        ]
      },
      {
        "title": "위치·대상 수",
        "entries": [
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "대상 수·처치 수 효율",
            "evidence": "열화는 상태 이상 대상마다 공격하고 궁극기 에너지를 획득하며, P5는 처치 수에 따라 황혼을 최대 7초 연장합니다.",
            "affected": "열화 · P5",
            "implication": "적 수가 적거나 처치가 어려운 전투에서는 대상별 에너지 수급과 지속시간 연장의 이득이 감소합니다."
          },
          {
            "character": {
              "id": "camu",
              "name": "카뮤"
            },
            "axis": "배회 목표 의존",
            "evidence": "영혼의 가시가 타오르는 핏빛 날개가 배회 중인 적을 명중해야 추가 폭발과 죄를 쫓는 자의 회복·연타가 함께 발동합니다.",
            "affected": "사르는 불꽃 · 영혼의 가시 · 죄를 쫓는 자",
            "implication": "날개가 붙지 않은 목표를 공격하거나 배회 대상 전환이 꼬이면 주요 연계 보상이 줄어듭니다. 추적은 재능의 배회 조건만 무시합니다."
          },
          {
            "character": {
              "id": "camu",
              "name": "카뮤"
            },
            "axis": "단일 대상과 다수 대상 차이",
            "evidence": "타오르는 핏빛 날개는 배회 중인 목표가 처치될 때 주변의 다른 적에게 이동합니다.",
            "affected": "사르는 불꽃",
            "implication": "다수의 적이 연속으로 등장하는 전투에서는 디버프를 이어가기 쉽지만, 단일 대상 전투에서는 목표 이동 효과의 이득을 얻지 못합니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "대상 수에 따른 역할 차이",
            "evidence": "탄흔의 열기의 추가 효과는 목표의 상태를 확인하는 단일 대상 중심 구조인 반면, 폭렬 수류탄 · β형과 늑대의 분노는 주변 또는 근처 범위를 공격합니다.",
            "affected": "탄흔의 열기 · 폭렬 수류탄 · β형 · 늑대의 분노",
            "implication": "단일 대상에서는 상태 소모 화력을 집중하기 쉽지만, 다수 대상에서는 각 적에게 소모 가능한 상태를 준비하지 않으면 배틀 스킬의 추가 효과를 넓게 활용하기 어렵습니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "부식 소모 의존",
            "evidence": "질주하는 돌리는 부식 상태를 소모해야 물리 취약과 아츠 취약을 부여합니다.",
            "affected": "질주하는 돌리 · 마운틴 서퍼",
            "implication": "부식을 준비하지 못하면 배틀 스킬은 자연 피해만 주고 핵심 지원 효과와 추가 돌진을 얻지 못합니다. 상태 면역·상태 제거·부식 준비 지연 방향의 제약에서 성능이 크게 떨어집니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "다수 대상 위치 의존",
            "evidence": "마운틴 서퍼는 부식 상태의 다른 적이 근처에 있을 때만 추가 배틀 스킬을 발동합니다.",
            "affected": "마운틴 서퍼",
            "implication": "단일 대상전에서는 재능 2가 발동하지 않으며, 적이 흩어지면 취약 확장이 끊깁니다. 다수전에서도 부식 대상의 거리와 배치에 따라 실제 이득이 달라집니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "그림자 접촉형 치유",
            "evidence": "친구의 그림자는 메인 컨트롤 오퍼레이터가 지면의 그림자와 접촉해야 치유합니다.",
            "affected": "친구의 그림자",
            "implication": "치유를 받으려면 메인 컨트롤의 이동 경로를 그림자 위치에 맞춰야 합니다. 그림자는 10초만 유지되고 궁극기 생성은 10% 확률이므로 급한 피해 대응과 원거리 전투에서 안정성이 낮습니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "지속 시전과 무작위 궁극기",
            "evidence": "복슬복슬 파티는 이동 가능한 지속 시전이며 분신을 무작위로 사방에 던집니다.",
            "affected": "복슬복슬 파티",
            "implication": "궁극기 동안 다른 행동이 제한되고 분신의 분포에 따라 단일 대상 명중과 그림자 생성 위치가 흔들릴 수 있습니다. 메인 컨트롤 점유와 목표 배치 변화에 영향을 받습니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "잠재력에 따른 지원 격차",
            "evidence": "P1은 취약을 추가 8% 강화하고 P2는 추가 아군 치유, P5는 부식 지속과 연계 회전을 강화합니다.",
            "affected": "P1 · P2 · P5",
            "implication": "기본 단계에서는 취약 수치, 팀 치유 범위, 부식 유지 시간이 제한됩니다. 취약 강화와 다인 회복을 기대하는 운용은 잠재력 의존도가 높습니다."
          }
        ]
      },
      {
        "title": "생존·피격 조건",
        "entries": [
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "긴 생존 재발동 간격",
            "evidence": "부활의 불씨는 강한 비호와 회복을 제공하지만 120초마다 최대 1회 발동합니다.",
            "affected": "부활의 불씨",
            "implication": "짧은 시간 안에 반복되는 치명적 피해에는 두 번째 대응 수단으로 사용할 수 없습니다."
          },
          {
            "character": {
              "id": "camu",
              "name": "카뮤"
            },
            "axis": "회복 기반 중첩",
            "evidence": "혈류 소생은 스킬로 자신의 생명력을 회복할 때 열기 피해 증가 스택을 얻으며, 기본적으로 영혼의 가시와 추적의 재능 회복에 연결됩니다.",
            "affected": "죄를 쫓는 자 · 혈류 소생",
            "implication": "회복 발동 기회가 적으면 최대 5스택 예열이 늦어지고, 40초 지속 효과를 유지하기 어려워집니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "그림자 접촉형 치유",
            "evidence": "친구의 그림자는 메인 컨트롤 오퍼레이터가 지면의 그림자와 접촉해야 치유합니다.",
            "affected": "친구의 그림자",
            "implication": "치유를 받으려면 메인 컨트롤의 이동 경로를 그림자 위치에 맞춰야 합니다. 그림자는 10초만 유지되고 궁극기 생성은 10% 확률이므로 급한 피해 대응과 원거리 전투에서 안정성이 낮습니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "잠재력에 따른 지원 격차",
            "evidence": "P1은 취약을 추가 8% 강화하고 P2는 추가 아군 치유, P5는 부식 지속과 연계 회전을 강화합니다.",
            "affected": "P1 · P2 · P5",
            "implication": "기본 단계에서는 취약 수치, 팀 치유 범위, 부식 유지 시간이 제한됩니다. 취약 강화와 다인 회복을 기대하는 운용은 잠재력 의존도가 높습니다."
          }
        ]
      },
      {
        "title": "잠재력 의존",
        "entries": [
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "대상 수·처치 수 효율",
            "evidence": "열화는 상태 이상 대상마다 공격하고 궁극기 에너지를 획득하며, P5는 처치 수에 따라 황혼을 최대 7초 연장합니다.",
            "affected": "열화 · P5",
            "implication": "적 수가 적거나 처치가 어려운 전투에서는 대상별 에너지 수급과 지속시간 연장의 이득이 감소합니다."
          },
          {
            "character": {
              "id": "camu",
              "name": "카뮤"
            },
            "axis": "잠재력에 따른 순환 강화",
            "evidence": "P1은 허약·열기 취약과 배회 시간을 강화하고, P3은 영혼의 가시 쿨타임·피해·게이지 회복량을 개선하며, P5는 혈류 소생의 스택당 열기 피해 증가 효과를 강화합니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 구조는 잠재력 없이 작동하지만, 디버프 유지와 연계 회전, 누적 화력은 관련 잠재력의 영향을 크게 받습니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "잠재력에 따른 순환 확장",
            "evidence": "P2는 게이지 반환을 추가하고, P3은 불타는 송곳니 유지와 팀 공유를 제공하며, P5는 궁극기 후 연계 스킬 쿨타임을 초기화합니다.",
            "affected": "P2 · P3 · P5",
            "implication": "기본 상태에서도 상태 소모 순환은 가능하지만, 게이지 회수·팀 열기 강화·연계 재사용의 완성도는 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "잠재력에 따른 지원 격차",
            "evidence": "P1은 취약을 추가 8% 강화하고 P2는 추가 아군 치유, P5는 부식 지속과 연계 회전을 강화합니다.",
            "affected": "P1 · P2 · P5",
            "implication": "기본 단계에서는 취약 수치, 팀 치유 범위, 부식 유지 시간이 제한됩니다. 취약 강화와 다인 회복을 기대하는 운용은 잠재력 의존도가 높습니다."
          }
        ]
      }
    ],
    "discoveries": [
      {
        "character": {
          "id": "laevatain",
          "name": "레바테인"
        },
        "title": "연소를 유지한 연계 스킬 화력 축",
        "description": "주력 순환은 궁극기 이후 강화 일반 공격에 무게가 실리지만, 연소 또는 부식 상태의 적에게 연계 스킬을 발동해 별도의 열기 피해와 궁극기 에너지 수급을 만들 수 있습니다.",
        "opportunity": "일반 공격이나 궁극기의 비중을 낮추는 전투 설계에서는 연소를 곧바로 흡수하지 않고 유지하며 연계 스킬을 반복하는 운용이 새롭게 부각될 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "camu",
          "name": "카뮤"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 연계 스킬 비중이 높지만, 연계 스킬은 열기 부착 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "wolfguard",
          "name": "울프가드"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 연계 스킬 비중이 높지만, 연계 스킬은 아츠 부착 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "adelia",
          "name": "아델리아"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 배틀 스킬 비중이 높지만, 연계 스킬은 아츠 부착·방어 불능 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      }
    ],
    "designHints": [
      {
        "id": "normal",
        "title": "일반 공격 의존도",
        "pressure": "일반 공격 피해 비중을 낮추는 방향",
        "impact": "강화 상태나 메인 컨트롤 중 일반 공격에 몰린 화력 구간이 짧아집니다.",
        "opportunity": "레바테인의 연계 스킬, 카뮤의 연계 스킬처럼 연계·배틀 스킬 중심의 보조 축이 상대적으로 중요해질 수 있습니다.",
        "caution": "일반 공격과 강력한 일격을 동시에 완전히 막으면 스킬 게이지 회복과 불균형 순환까지 함께 끊길 수 있습니다.",
        "characters": [
          {
            "id": "laevatain",
            "name": "레바테인"
          }
        ]
      },
      {
        "id": "ultimate",
        "title": "궁극기 반복 의존도",
        "pressure": "궁극기 반복 사용의 효율이 점차 낮아지는 방향",
        "impact": "궁극기를 중심으로 한 강화 구간과 마무리 빈도가 줄어듭니다.",
        "opportunity": "궁극기 에너지를 다른 가치로 돌리거나 배틀·연계 스킬을 주력화하는 운용을 찾게 됩니다.",
        "caution": "첫 궁극기까지 무력화하면 준비 과정의 의미도 사라질 수 있으므로 반복 효율을 조절하는 편이 발견을 만들기 쉽습니다.",
        "characters": [
          {
            "id": "laevatain",
            "name": "레바테인"
          },
          {
            "id": "camu",
            "name": "카뮤"
          },
          {
            "id": "wolfguard",
            "name": "울프가드"
          },
          {
            "id": "adelia",
            "name": "아델리아"
          }
        ]
      },
      {
        "id": "battle",
        "title": "배틀 스킬 피해 비중",
        "pressure": "배틀 스킬의 직접 피해를 줄이되 연계 스킬 순환은 열어주는 방향",
        "impact": "스킬 게이지를 사용해 즉시 내는 화력이 줄어듭니다.",
        "opportunity": "배틀 스킬을 상태 생성·변환 용도로만 쓰고, 연계 스킬이나 궁극기 외 추가 피해를 주력으로 삼는 구조가 떠오를 수 있습니다.",
        "caution": "배틀 스킬의 상태 부여까지 막으면 후속 연계 조건 자체가 사라질 수 있습니다.",
        "characters": [
          {
            "id": "laevatain",
            "name": "레바테인"
          },
          {
            "id": "camu",
            "name": "카뮤"
          },
          {
            "id": "wolfguard",
            "name": "울프가드"
          },
          {
            "id": "adelia",
            "name": "아델리아"
          }
        ]
      },
      {
        "id": "link",
        "title": "연계 스킬 빈도",
        "pressure": "연계 스킬 사용 빈도와 쿨타임을 크게 흔드는 방향",
        "impact": "조건을 자주 열 수 있는 파티일수록 순환 속도가 크게 달라집니다.",
        "opportunity": "연계 횟수가 늘어날 때 생기는 자원 수급과 보조 피해, 반대로 연계에 대가가 생길 때의 대체 순서를 비교할 수 있습니다.",
        "caution": "연계 조건과 쿨타임을 동시에 막으면 조합의 상호작용이 사라질 수 있습니다.",
        "characters": [
          {
            "id": "laevatain",
            "name": "레바테인"
          },
          {
            "id": "camu",
            "name": "카뮤"
          },
          {
            "id": "wolfguard",
            "name": "울프가드"
          },
          {
            "id": "adelia",
            "name": "아델리아"
          }
        ]
      },
      {
        "id": "stack",
        "title": "부착·방어 불능 축적 속도",
        "pressure": "같은 대상에게 스택을 연속으로 쌓는 속도를 제한하는 방향",
        "impact": "최대 스택을 전제로 하는 동결·강타·갑옷 파괴·취약 발동 시점이 늦어집니다.",
        "opportunity": "낮은 스택에서 바로 작동하는 스킬, 강제 이상, 직접 부여 효과의 가치가 올라갈 수 있습니다.",
        "caution": "부착 자체를 금지하면 대체 운용이 아니라 파티의 핵심 문법을 삭제하게 됩니다.",
        "characters": [
          {
            "id": "laevatain",
            "name": "레바테인"
          },
          {
            "id": "camu",
            "name": "카뮤"
          },
          {
            "id": "wolfguard",
            "name": "울프가드"
          },
          {
            "id": "adelia",
            "name": "아델리아"
          }
        ]
      }
    ],
    "mechanicProfile": {
      "mechanicIds": [
        "heatInfliction",
        "combustion",
        "linkSkill",
        "ultimate",
        "heatDamage",
        "skillGauge",
        "artsInfliction",
        "corrosion",
        "shock",
        "healing",
        "comboHit",
        "battleSkill",
        "mainControl",
        "artsAbnormality",
        "artsVulnerability",
        "physicalVulnerability",
        "natureDamage",
        "heatVulnerability",
        "ultimateEnergy",
        "weakness",
        "defenseless",
        "powerStrike",
        "skillGaugeReturn",
        "generalAttack"
      ],
      "mechanicScores": {
        "heatInfliction": 23,
        "combustion": 19,
        "linkSkill": 15,
        "ultimate": 15,
        "heatDamage": 14.5,
        "skillGauge": 13.5,
        "artsInfliction": 12,
        "corrosion": 11.5,
        "shock": 9,
        "healing": 9,
        "comboHit": 9,
        "battleSkill": 9,
        "mainControl": 8.5,
        "artsAbnormality": 6.5,
        "artsVulnerability": 5,
        "physicalVulnerability": 5,
        "natureDamage": 4.5,
        "heatVulnerability": 4.5,
        "ultimateEnergy": 4.5,
        "weakness": 4.5,
        "defenseless": 3,
        "powerStrike": 3,
        "skillGaugeReturn": 3,
        "generalAttack": 3,
        "physicalDamage": 0,
        "electricDamage": 0,
        "frostDamage": 0,
        "artsDamage": 0,
        "electricInfliction": 0,
        "frostInfliction": 0,
        "natureInfliction": 0,
        "freeze": 0,
        "launch": 0,
        "knockdown": 0,
        "smash": 0,
        "armorBreak": 0,
        "imbalance": 0,
        "execution": 0,
        "electricVulnerability": 0,
        "frostVulnerability": 0,
        "natureVulnerability": 0,
        "artsAmplification": 0,
        "physicalAmplification": 0,
        "heatAmplification": 0,
        "electricAmplification": 0,
        "frostAmplification": 0,
        "natureAmplification": 0,
        "protection": 0,
        "fortification": 0,
        "cleanse": 0,
        "slow": 0,
        "haste": 0,
        "originiumCrystal": 0
      },
      "dominantAction": "linkSkill",
      "actionTotals": {
        "generalAttack": 6,
        "battleSkill": 26,
        "linkSkill": 31,
        "ultimate": 24
      },
      "hintIds": [
        "normal",
        "ultimate",
        "battle",
        "link",
        "stack"
      ],
      "hintTitles": [
        "일반 공격 의존도",
        "궁극기 반복 의존도",
        "배틀 스킬 피해 비중",
        "연계 스킬 빈도",
        "부착·방어 불능 축적 속도"
      ],
      "weaknessAxes": [
        "메인 컨트롤 점유",
        "4스택 예열",
        "상태 이상 조건",
        "열기 피해 편중",
        "대상 수·처치 수 효율",
        "열기 부착 소모·흡수 의존",
        "배회 목표 의존",
        "회복 기반 중첩",
        "잠재력에 따른 순환 강화",
        "연소·감전 소모 의존",
        "파티 상태 공급 의존",
        "스킬 게이지와 쿨타임",
        "상태 소모에 따른 충돌",
        "대상 수에 따른 역할 차이",
        "잠재력에 따른 순환 확장",
        "상반된 연계 조건과 부식 순환",
        "부식 소모 의존",
        "다수 대상 위치 의존",
        "대상 수·처치 수 효율",
        "긴 생존 재발동 간격",
        "스킬 게이지와 쿨타임",
        "배회 목표 의존",
        "회복 기반 중첩",
        "잠재력에 따른 순환 강화",
        "연소·감전 소모 의존",
        "스킬 게이지와 쿨타임",
        "잠재력에 따른 순환 확장",
        "잠재력에 따른 지원 격차",
        "대상 수·처치 수 효율",
        "배회 목표 의존",
        "단일 대상과 다수 대상 차이",
        "대상 수에 따른 역할 차이",
        "부식 소모 의존",
        "다수 대상 위치 의존",
        "그림자 접촉형 치유",
        "지속 시전과 무작위 궁극기",
        "잠재력에 따른 지원 격차",
        "긴 생존 재발동 간격",
        "회복 기반 중첩",
        "그림자 접촉형 치유",
        "잠재력에 따른 지원 격차",
        "대상 수·처치 수 효율",
        "잠재력에 따른 순환 강화",
        "잠재력에 따른 순환 확장",
        "잠재력에 따른 지원 격차"
      ],
      "dependencyLabels": [
        "열기 부착",
        "연소",
        "스킬 게이지",
        "아츠 부착",
        "연계 스킬"
      ]
    }
  },
  {
    "schemaVersion": 1,
    "id": "party-mive-pogranichnik-yufeng-jintianyu",
    "exportedAt": "2026-07-25T06:26:25.509Z",
    "title": "미브 · 포그라니치니크 · 여풍 · 진천우 파티 분석",
    "party": [
      {
        "id": "mive",
        "name": "미브",
        "order": 1
      },
      {
        "id": "pogranichnik",
        "name": "포그라니치니크",
        "order": 2
      },
      {
        "id": "yufeng",
        "name": "여풍",
        "order": 3
      },
      {
        "id": "jintianyu",
        "name": "진천우",
        "order": 4
      }
    ],
    "summary": {
      "title": "파티 전투 구조 분석",
      "sentence": "띄우기·넘어뜨리기 등으로 방어 불능을 쌓고, 강타·갑옷 파괴로 스택을 소모한 뒤 연계 스킬·궁극기 화력을 이어가는 파티입니다.",
      "dominantAction": "linkSkill",
      "actionTotals": {
        "generalAttack": 4,
        "battleSkill": 20,
        "linkSkill": 25,
        "ultimate": 22
      },
      "dependencies": [
        {
          "id": "defenseless",
          "label": "방어 불능",
          "color": "brown",
          "level": "매우 높음",
          "score": 23.5
        },
        {
          "id": "knockdown",
          "label": "넘어뜨리기",
          "color": "brown",
          "level": "매우 높음",
          "score": 19
        },
        {
          "id": "launch",
          "label": "띄우기",
          "color": "brown",
          "level": "매우 높음",
          "score": 15.5
        },
        {
          "id": "physicalVulnerability",
          "label": "물리 취약",
          "color": "brown",
          "level": "매우 높음",
          "score": 14.5
        },
        {
          "id": "linkSkill",
          "label": "연계 스킬",
          "color": "purple",
          "level": "주력 행동",
          "score": 25
        }
      ]
    },
    "diagram": {
      "nodes": [
        {
          "order": 1,
          "character": {
            "id": "yufeng",
            "name": "여풍"
          },
          "skill": {
            "name": "신체 정화",
            "type": "배틀 스킬",
            "typeId": "battleSkill",
            "index": 1
          },
          "title": "물리 취약 준비"
        },
        {
          "order": 2,
          "character": {
            "id": "mive",
            "name": "미브"
          },
          "skill": {
            "name": "후회 없는 주먹",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "물리 취약 부여"
        },
        {
          "order": 3,
          "character": {
            "id": "pogranichnik",
            "name": "포그라니치니크"
          },
          "skill": {
            "name": "보름달 참격",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "방어 불능 누적"
        },
        {
          "order": 4,
          "character": {
            "id": "mive",
            "name": "미브"
          },
          "skill": {
            "name": "검권 합일",
            "type": "일반 공격",
            "typeId": "generalAttack",
            "index": 0
          },
          "title": "개천 마무리"
        },
        {
          "order": 5,
          "character": {
            "id": "yufeng",
            "name": "여풍"
          },
          "skill": {
            "name": "분노의 형상",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "강력한 일격 연결"
        },
        {
          "order": 6,
          "character": {
            "id": "pogranichnik",
            "name": "포그라니치니크"
          },
          "skill": {
            "name": "전선 분쇄",
            "type": "배틀 스킬",
            "typeId": "battleSkill",
            "index": 1
          },
          "title": "스택 소모와 회복"
        },
        {
          "order": 7,
          "character": {
            "id": "jintianyu",
            "name": "진천우"
          },
          "skill": {
            "name": "견천하",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "관통 연계"
        },
        {
          "order": 8,
          "character": {
            "id": "yufeng",
            "name": "여풍"
          },
          "skill": {
            "name": "움직이지 않는 마음",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "궁극기 집적"
        }
      ],
      "connections": [
        {
          "fromOrder": 1,
          "toOrder": 2,
          "label": "물리 취약",
          "preparationRoutes": []
        },
        {
          "fromOrder": 2,
          "toOrder": 3,
          "label": "다음 조건 연결",
          "preparationRoutes": [
            {
              "character": {
                "id": "mive",
                "name": "미브"
              },
              "skill": {
                "name": "절심",
                "type": "궁극기",
                "typeId": "ultimate",
                "index": 3
              },
              "matchedMechanics": [
                {
                  "id": "defenseless",
                  "label": "방어 불능"
                },
                {
                  "id": "launch",
                  "label": "띄우기"
                }
              ],
              "summary": "잠시 차지한 뒤 전방으로 돌진해 목표에게 강제 띄우기 피해를 주고 이어서 지면에 내리꽂아 물리 피해를 줍니다."
            },
            {
              "character": {
                "id": "pogranichnik",
                "name": "포그라니치니크"
              },
              "skill": {
                "name": "전선 분쇄",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "defenseless",
                  "label": "방어 불능"
                }
              ],
              "summary": "소모한 방어 불능 스택 수치에 따라 스킬 게이지를 회복합니다."
            },
            {
              "character": {
                "id": "yufeng",
                "name": "여풍"
              },
              "skill": {
                "name": "신체 정화",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "defenseless",
                  "label": "방어 불능"
                }
              ],
              "summary": "마지막 공격에 명중한 적이 방어 불능 상태가 아니면 추가로 물리 취약 5%를 12초 동안 부여합니다."
            }
          ]
        },
        {
          "fromOrder": 3,
          "toOrder": 4,
          "label": "불균형",
          "preparationRoutes": [
            {
              "character": {
                "id": "pogranichnik",
                "name": "포그라니치니크"
              },
              "skill": {
                "name": "전면 공세",
                "type": "일반 공격",
                "typeId": "generalAttack",
                "index": 0
              },
              "matchedMechanics": [
                {
                  "id": "imbalance",
                  "label": "불균형"
                }
              ],
              "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때, 일반 공격을 사용하면 해당 적을 처형하여 대량의 물리 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 18포인트의 불균형 피해를 줍니다."
            },
            {
              "character": {
                "id": "yufeng",
                "name": "여풍"
              },
              "skill": {
                "name": "업보 파괴",
                "type": "일반 공격",
                "typeId": "generalAttack",
                "index": 0
              },
              "matchedMechanics": [
                {
                  "id": "imbalance",
                  "label": "불균형"
                }
              ],
              "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때, 일반 공격을 사용하면 해당 적을 처형하여 대량의 물리 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 19포인트의 불균형 피해를 줍니다."
            },
            {
              "character": {
                "id": "jintianyu",
                "name": "진천우"
              },
              "skill": {
                "name": "파비하",
                "type": "일반 공격",
                "typeId": "generalAttack",
                "index": 0
              },
              "matchedMechanics": [
                {
                  "id": "imbalance",
                  "label": "불균형"
                }
              ],
              "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때 일반 공격을 사용하면 해당 적을 처형하여 대량의 물리 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 16포인트의 불균형 피해를 줍니다."
            },
            {
              "character": {
                "id": "mive",
                "name": "미브"
              },
              "skill": {
                "name": "절심",
                "type": "궁극기",
                "typeId": "ultimate",
                "index": 3
              },
              "matchedMechanics": [
                {
                  "id": "imbalance",
                  "label": "불균형"
                }
              ],
              "summary": ""
            }
          ]
        },
        {
          "fromOrder": 4,
          "toOrder": 5,
          "label": "물리 취약",
          "preparationRoutes": []
        },
        {
          "fromOrder": 5,
          "toOrder": 6,
          "label": "갑옷 파괴",
          "preparationRoutes": []
        },
        {
          "fromOrder": 6,
          "toOrder": 7,
          "label": "스킬 게이지 재투자",
          "preparationRoutes": []
        },
        {
          "fromOrder": 7,
          "toOrder": 8,
          "label": "다음 조건 연결",
          "preparationRoutes": []
        }
      ]
    },
    "combatFlow": [
      {
        "order": 1,
        "character": {
          "id": "yufeng",
          "name": "여풍"
        },
        "stageIds": [
          "setup",
          "payoff"
        ],
        "title": "물리 취약 준비",
        "detail": "방어 불능이 없는 적에게 여풍의 배틀 스킬의 마지막 공격을 맞혀 물리 취약을 부여하고 넘어뜨리기 추가 피해를 발생시킨다.",
        "skill": {
          "name": "신체 정화",
          "type": "배틀 스킬",
          "typeId": "battleSkill",
          "index": 1
        },
        "conditions": [],
        "timing": "",
        "effects": [
          "마지막 공격에 명중한 적이 방어 불능 상태가 아니면 추가로 물리 취약 5%를 12초 동안 부여합니다."
        ],
        "mechanics": [
          {
            "id": "defenseless",
            "label": "방어 불능"
          },
          {
            "id": "knockdown",
            "label": "넘어뜨리기"
          },
          {
            "id": "physicalVulnerability",
            "label": "물리 취약"
          },
          {
            "id": "cleanse",
            "label": "정화"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "skill": {
              "name": "전선 분쇄",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "defenseless",
                "label": "방어 불능"
              }
            ],
            "summary": "소모한 방어 불능 스택 수치에 따라 스킬 게이지를 회복합니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "skill": {
              "name": "보름달 참격",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "defenseless",
                "label": "방어 불능"
              }
            ],
            "summary": "적이 강타 또는 갑옷 파괴 피해로 방어 불능 스택을 소모한 후 사용할 수 있습니다."
          },
          {
            "character": {
              "id": "mive",
              "name": "미브"
            },
            "skill": {
              "name": "절심",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "defenseless",
                "label": "방어 불능"
              }
            ],
            "summary": ""
          }
        ]
      },
      {
        "order": 2,
        "character": {
          "id": "mive",
          "name": "미브"
        },
        "stageIds": [
          "setup",
          "convert",
          "payoff"
        ],
        "title": "물리 취약 부여",
        "detail": "미브의 연계 스킬으로 물리 취약을 걸고 배틀 스킬을 추형 상태로 전환한다.",
        "skill": {
          "name": "후회 없는 주먹",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "적의 방어 불능 수치가 3스택 이상일 때 사용할 수 있습니다.",
          "방어 불능 3스택 이상"
        ],
        "timing": "",
        "effects": [
          "올려치기로 전방의 적에게 물리 피해를 주고 물리 취약 5%를 16초 동안 부여합니다."
        ],
        "mechanics": [
          {
            "id": "physicalVulnerability",
            "label": "물리 취약"
          },
          {
            "id": "battleSkill",
            "label": "배틀 스킬"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 3,
        "character": {
          "id": "pogranichnik",
          "name": "포그라니치니크"
        },
        "stageIds": [
          "setup"
        ],
        "title": "방어 불능 누적",
        "detail": "파티의 띄우기·넘어뜨리기로 적에게 방어 불능 스택을 충분히 쌓는다.",
        "skill": {
          "name": "보름달 참격",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "적이 강타 또는 갑옷 파괴 피해로 방어 불능 스택을 소모한 후 사용할 수 있습니다.",
          "강타·갑옷 파괴로 방어 불능 소모"
        ],
        "timing": "",
        "effects": [
          "소모한 최대 방어 불능 스택에 따라 동일 단계의 베기 공격을 최대 3단계까지 사용해 물리 피해를 주고 스킬 게이지를 회복합니다.",
          "방어 불능 4스택을 소모하면 3단계 베기 공격이 강화됩니다."
        ],
        "mechanics": [
          {
            "id": "defenseless",
            "label": "방어 불능"
          },
          {
            "id": "launch",
            "label": "띄우기"
          },
          {
            "id": "knockdown",
            "label": "넘어뜨리기"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "mive",
              "name": "미브"
            },
            "skill": {
              "name": "절심",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "defenseless",
                "label": "방어 불능"
              },
              {
                "id": "launch",
                "label": "띄우기"
              }
            ],
            "summary": "잠시 차지한 뒤 전방으로 돌진해 목표에게 강제 띄우기 피해를 주고 이어서 지면에 내리꽂아 물리 피해를 줍니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "skill": {
              "name": "전선 분쇄",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "defenseless",
                "label": "방어 불능"
              }
            ],
            "summary": "소모한 방어 불능 스택 수치에 따라 스킬 게이지를 회복합니다."
          },
          {
            "character": {
              "id": "yufeng",
              "name": "여풍"
            },
            "skill": {
              "name": "신체 정화",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "defenseless",
                "label": "방어 불능"
              }
            ],
            "summary": "마지막 공격에 명중한 적이 방어 불능 상태가 아니면 추가로 물리 취약 5%를 12초 동안 부여합니다."
          }
        ]
      },
      {
        "order": 4,
        "character": {
          "id": "mive",
          "name": "미브"
        },
        "stageIds": [
          "trigger",
          "payoff",
          "recycle"
        ],
        "title": "개천 마무리",
        "detail": "물리 취약 또는 불균형 상태가 유지되는 동안 개천을 사용해 냉정의 1.2배 피해 조건을 노린다.",
        "skill": {
          "name": "검권 합일",
          "type": "일반 공격",
          "typeId": "generalAttack",
          "index": 0
        },
        "conditions": [
          "처형 공격: 주변에 불균형 상태의 적이 있을 때, 일반 공격을 사용하면 해당 적을 처형하여 대량의 물리 피해를 주고 일정량의 스킬 게이지를 회복합니다."
        ],
        "timing": "",
        "effects": [
          "메인 컨트롤 오퍼레이터라면 강력한 일격이 25포인트의 불균형 피해를 줍니다."
        ],
        "mechanics": [
          {
            "id": "imbalance",
            "label": "불균형"
          },
          {
            "id": "physicalVulnerability",
            "label": "물리 취약"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "skill": {
              "name": "전면 공세",
              "type": "일반 공격",
              "typeId": "generalAttack",
              "index": 0
            },
            "matchedMechanics": [
              {
                "id": "imbalance",
                "label": "불균형"
              }
            ],
            "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때, 일반 공격을 사용하면 해당 적을 처형하여 대량의 물리 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 18포인트의 불균형 피해를 줍니다."
          },
          {
            "character": {
              "id": "yufeng",
              "name": "여풍"
            },
            "skill": {
              "name": "업보 파괴",
              "type": "일반 공격",
              "typeId": "generalAttack",
              "index": 0
            },
            "matchedMechanics": [
              {
                "id": "imbalance",
                "label": "불균형"
              }
            ],
            "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때, 일반 공격을 사용하면 해당 적을 처형하여 대량의 물리 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 19포인트의 불균형 피해를 줍니다."
          },
          {
            "character": {
              "id": "jintianyu",
              "name": "진천우"
            },
            "skill": {
              "name": "파비하",
              "type": "일반 공격",
              "typeId": "generalAttack",
              "index": 0
            },
            "matchedMechanics": [
              {
                "id": "imbalance",
                "label": "불균형"
              }
            ],
            "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때 일반 공격을 사용하면 해당 적을 처형하여 대량의 물리 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 16포인트의 불균형 피해를 줍니다."
          },
          {
            "character": {
              "id": "mive",
              "name": "미브"
            },
            "skill": {
              "name": "절심",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "imbalance",
                "label": "불균형"
              }
            ],
            "summary": ""
          }
        ]
      },
      {
        "order": 5,
        "character": {
          "id": "yufeng",
          "name": "여풍"
        },
        "stageIds": [
          "convert",
          "payoff"
        ],
        "title": "강력한 일격 연결",
        "detail": "물리 취약 또는 갑옷 파괴 대상에게 메인 컨트롤 오퍼레이터가 강력한 일격을 넣어 여풍의 연계 스킬을 연다.",
        "skill": {
          "name": "분노의 형상",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "물리 취약 또는 갑옷 파괴 상태의 적이 메인 컨트롤 오퍼레이터의 강력한 일격을 받았을 때 사용할 수 있습니다.",
          "물리 취약·갑옷 파괴 대상에게 강력한 일격"
        ],
        "timing": "",
        "effects": [
          "화신을 내세워 장창으로 찌르며 물리 피해를 주고 20초 동안 연타를 획득합니다."
        ],
        "mechanics": [
          {
            "id": "armorBreak",
            "label": "갑옷 파괴"
          },
          {
            "id": "powerStrike",
            "label": "강력한 일격"
          },
          {
            "id": "physicalVulnerability",
            "label": "물리 취약"
          },
          {
            "id": "mainControl",
            "label": "메인 컨트롤"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 6,
        "character": {
          "id": "pogranichnik",
          "name": "포그라니치니크"
        },
        "stageIds": [
          "trigger",
          "convert",
          "recycle"
        ],
        "title": "스택 소모와 회복",
        "detail": "포그라니치니크의 배틀 스킬의 갑옷 파괴로 스택을 소모해 스킬 게이지를 회복하고 포그라니치니크의 연계 스킬의 조건을 연다.",
        "skill": {
          "name": "전선 분쇄",
          "type": "배틀 스킬",
          "typeId": "battleSkill",
          "index": 1
        },
        "conditions": [],
        "timing": "",
        "effects": [
          "소모한 방어 불능 스택 수치에 따라 스킬 게이지를 회복합니다."
        ],
        "mechanics": [
          {
            "id": "armorBreak",
            "label": "갑옷 파괴"
          },
          {
            "id": "skillGauge",
            "label": "스킬 게이지"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 7,
        "character": {
          "id": "jintianyu",
          "name": "진천우"
        },
        "stageIds": [
          "trigger"
        ],
        "title": "관통 연계",
        "detail": "방어 불능 상태가 확인되면 진천우의 연계 스킬로 경로상의 적을 관통하며 물리 피해와 띄우기를 준다.",
        "skill": {
          "name": "견천하",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "적이 방어 불능 상태일 때 사용할 수 있습니다.",
          "방어 불능 조건"
        ],
        "timing": "",
        "effects": [],
        "mechanics": [
          {
            "id": "physicalDamage",
            "label": "물리 피해"
          },
          {
            "id": "defenseless",
            "label": "방어 불능"
          },
          {
            "id": "launch",
            "label": "띄우기"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 8,
        "character": {
          "id": "yufeng",
          "name": "여풍"
        },
        "stageIds": [
          "payoff"
        ],
        "title": "궁극기 집적",
        "detail": "여풍의 궁극기으로 넓은 범위의 적을 중심으로 끌어당기고 첫 넘어뜨리기와 복마 추가 피해를 넣는다.",
        "skill": {
          "name": "움직이지 않는 마음",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [],
        "timing": "적에게 필요한 부착·이상 상태를 준비하고, 주력 피해를 집중할 수 있을 때 사용합니다.",
        "effects": [
          "화신을 내세워 지면을 내리쳐 넓은 범위의 모든 적에게 물리 피해와 넘어뜨리기 피해를 주고 중심으로 끌어당깁니다.",
          "궁극기가 연타를 소모했다면 대량의 물리 피해를 추가로 줍니다."
        ],
        "mechanics": [
          {
            "id": "knockdown",
            "label": "넘어뜨리기"
          },
          {
            "id": "ultimate",
            "label": "궁극기"
          }
        ],
        "preparationRoutes": []
      }
    ],
    "supportFlow": [],
    "basicOperation": [
      {
        "order": 1,
        "title": "여풍 · 배틀 스킬",
        "detail": "방어 불능이 없는 적에게 여풍의 배틀 스킬의 마지막 공격을 맞혀 물리 취약을 부여하고 넘어뜨리기 추가 피해를 발생시킨다."
      },
      {
        "order": 2,
        "title": "미브 · 연계 스킬",
        "detail": "미브의 연계 스킬으로 물리 취약을 걸고 배틀 스킬을 추형 상태로 전환한다."
      },
      {
        "order": 3,
        "title": "포그라니치니크 · 연계 스킬",
        "detail": "파티의 띄우기·넘어뜨리기로 적에게 방어 불능 스택을 충분히 쌓는다."
      },
      {
        "order": 4,
        "title": "미브 · 일반 공격",
        "detail": "물리 취약 또는 불균형 상태가 유지되는 동안 개천을 사용해 냉정의 1.2배 피해 조건을 노린다."
      },
      {
        "order": 5,
        "title": "여풍 · 연계 스킬",
        "detail": "물리 취약 또는 갑옷 파괴 대상에게 메인 컨트롤 오퍼레이터가 강력한 일격을 넣어 여풍의 연계 스킬을 연다."
      },
      {
        "order": 6,
        "title": "포그라니치니크 · 배틀 스킬",
        "detail": "포그라니치니크의 배틀 스킬의 갑옷 파괴로 스택을 소모해 스킬 게이지를 회복하고 포그라니치니크의 연계 스킬의 조건을 연다."
      },
      {
        "order": 7,
        "title": "진천우 · 연계 스킬",
        "detail": "방어 불능 상태가 확인되면 진천우의 연계 스킬로 경로상의 적을 관통하며 물리 피해와 띄우기를 준다."
      },
      {
        "order": 8,
        "title": "여풍 · 궁극기",
        "detail": "여풍의 궁극기으로 넓은 범위의 적을 중심으로 끌어당기고 첫 넘어뜨리기와 복마 추가 피해를 넣는다."
      }
    ],
    "roles": [
      {
        "character": {
          "id": "mive",
          "name": "미브"
        },
        "labels": [
          "방어 불능 생성",
          "스킬 게이지·배틀 스킬 소모",
          "물리 취약 지원",
          "전투 자원 순환"
        ],
        "relation": "포그라니치니크의 물리 피해 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "pogranichnik",
          "name": "포그라니치니크"
        },
        "labels": [
          "방어 불능 생성",
          "물리 피해·갑옷 파괴 소모",
          "전투 자원 순환",
          "메인 컨트롤 후보"
        ],
        "relation": "미브의 물리 피해 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "yufeng",
          "name": "여풍"
        },
        "labels": [
          "방어 불능 생성",
          "갑옷 파괴·강력한 일격 소모",
          "물리 취약 지원",
          "전투 자원 순환"
        ],
        "relation": "미브의 물리 피해 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "jintianyu",
          "name": "진천우"
        },
        "labels": [
          "전투 자원 순환",
          "메인 컨트롤 후보"
        ],
        "relation": "미브의 물리 피해 조건과 직접 이어집니다."
      }
    ],
    "weaknesses": [
      {
        "title": "예열·상태 준비",
        "entries": [
          {
            "character": {
              "id": "mive",
              "name": "미브"
            },
            "axis": "방어 불능 3스택 요구",
            "evidence": "후회 없는 주먹은 방어 불능 3스택 이상을 요구하고, 추형에서 개천으로 넘어가려면 강타가 최대 3스택 이상을 소모해야 합니다.",
            "affected": "후회 없는 주먹 · 추형 · 개천",
            "implication": "방어 불능을 빠르게 누적할 동료가 없거나 물리 이상이 제한되면 연계와 최종 초식이 동시에 막힙니다. 낮은 스택을 성급히 소모해도 순환이 끊깁니다."
          },
          {
            "character": {
              "id": "mive",
              "name": "미브"
            },
            "axis": "교체 시간 제한",
            "evidence": "단운 이후 추형, 조건 충족 후 개천, 연계와 궁극기 이후 추형은 모두 일정 시간 동안만 배틀 스킬을 교체합니다.",
            "affected": "청파 삼형 · 후회 없는 주먹 · 절심",
            "implication": "교체 창 안에 다음 입력과 조건을 맞춰야 합니다. 적의 이동·행동 방해·목표 전환으로 시간을 잃으면 준비한 초식이 사라질 수 있습니다."
          },
          {
            "character": {
              "id": "mive",
              "name": "미브"
            },
            "axis": "보호 발동 간격",
            "evidence": "분노의 보호는 연계 사용 후 발동하며 기본적으로 60초마다 최대 1회입니다.",
            "affected": "분노",
            "implication": "연계 조건을 못 맞추면 보호를 얻지 못하고, 한 번 소모한 뒤에는 긴 공백이 생깁니다. 지속 피해나 반복 공격을 상대로 상시 생존 수단이 되기 어렵습니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "axis": "방어 불능 스택 의존",
            "evidence": "전선 분쇄의 회복량과 보름달 참격의 단계는 소모한 방어 불능 스택에 따라 달라집니다.",
            "affected": "전선 분쇄 · 보름달 참격",
            "implication": "방어 불능을 충분히 쌓기 전에 소모하면 피해와 게이지 회복이 모두 낮아집니다. 물리 이상이 제한되는 적에게는 핵심 뱅가드 기능이 약해집니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "axis": "스택 소모 순서 경쟁",
            "evidence": "강타·갑옷 파괴로 방어 불능을 소모해야 연계가 열리고, 4스택 소모 시에만 최고 단계가 강화됩니다.",
            "affected": "보름달 참격",
            "implication": "다른 오퍼레이터가 먼저 스택을 소모하면 포그라니치니크가 최대 단계를 얻지 못할 수 있습니다. 파티의 물리 이상 소비 순서를 조정해야 합니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "axis": "궁극기 후속 발동 횟수",
            "evidence": "철의 서약 5포인트는 물리 이상 효과 또는 연계 스킬 피해가 발생할 때마다 1포인트씩 소모됩니다.",
            "affected": "방패병 부대, 전진",
            "implication": "궁극기만 사용해서는 마지막 최후의 승부까지 자동으로 이어지지 않습니다. 후속 조건을 다섯 번 만들어야 하므로 짧은 전투나 상태 면역 적에서는 자원을 남길 수 있습니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "axis": "게이지 회복 누적 문턱",
            "evidence": "생존의 깃발은 자신의 스킬로 게이지를 80포인트 회복한 뒤에야 사기 격양을 부여합니다.",
            "affected": "생존의 깃발",
            "implication": "낮은 스택 소모나 후속 공격 중단으로 회복량이 부족하면 버프가 늦어집니다. 게이지 회복 감소 또는 반환 판정 차이에 민감합니다."
          },
          {
            "character": {
              "id": "yufeng",
              "name": "여풍"
            },
            "axis": "물리 취약 부여 조건",
            "evidence": "신체 정화는 마지막 공격 대상이 방어 불능 상태가 아닐 때 물리 취약을 부여합니다.",
            "affected": "신체 정화",
            "implication": "이미 방어 불능이 깊게 누적된 목표에게는 기본 취약 부여가 제한될 수 있습니다. 파티가 먼저 물리 이상을 쌓는 순서와 충돌할 수 있어 연계 준비가 불안정합니다."
          },
          {
            "character": {
              "id": "yufeng",
              "name": "여풍"
            },
            "axis": "연계 파티 의존",
            "evidence": "분노의 형상은 물리 취약 또는 갑옷 파괴 대상에게 메인 컨트롤 오퍼레이터가 강력한 일격을 줘야 발동합니다.",
            "affected": "분노의 형상",
            "implication": "취약·갑옷 파괴 준비와 메인 컨트롤의 강력한 일격을 모두 맞춰야 합니다. 상태가 사라지거나 메인 컨트롤 공격이 끊기면 연타를 얻지 못합니다."
          },
          {
            "character": {
              "id": "yufeng",
              "name": "여풍"
            },
            "axis": "잠재력 의존",
            "evidence": "P1은 취약 조건과 수치를 보완하고 P5는 복마의 주기적 고배율 피해와 불균형 피해를 추가합니다.",
            "affected": "P1 · P5",
            "implication": "기본 단계에서는 취약 부여 대상이 제한되고 넘어뜨리기 추가 피해가 공격력 100%에 머뭅니다. 취약 안정성과 폭발력은 잠재력 단계에 따라 차이가 큽니다."
          },
          {
            "character": {
              "id": "jintianyu",
              "name": "진천우"
            },
            "axis": "방어 불능 조건 의존",
            "evidence": "견천하는 적이 방어 불능 상태일 때만 사용할 수 있습니다.",
            "affected": "견천하",
            "implication": "물리 이상이 제한되거나 방어 불능을 만들 수 없는 적에게는 연계 스킬이 막힙니다. 방어 불능 저항이나 상태 부여 제한 방향의 제약에 취약합니다."
          },
          {
            "character": {
              "id": "jintianyu",
              "name": "진천우"
            },
            "axis": "공격력 중첩 준비 시간",
            "evidence": "칼날 베기는 스킬 명중마다 8%씩 최대 5스택을 쌓고 각 효과는 10초 동안 지속됩니다.",
            "affected": "칼날 베기",
            "implication": "최대 효과까지 여러 차례 스킬 명중이 필요합니다. 스킬 사용 제한·쿨타임 증가·명중 기회 감소 환경에서는 중첩을 완성하거나 유지하기 어렵습니다."
          }
        ]
      },
      {
        "title": "스킬 게이지·궁극기 순환",
        "entries": [
          {
            "character": {
              "id": "mive",
              "name": "미브"
            },
            "axis": "다단계 스킬 게이지 부담",
            "evidence": "단운은 100을 소모해 50을 반환하고, 추형과 개천은 각각 50을 소모합니다.",
            "affected": "청파 삼형",
            "implication": "전체 3단계를 이어가려면 여러 차례의 게이지 지출이 필요합니다. 자연 충전이 느려지거나 게이지 반환이 막히면 개천까지 도달하기 어렵습니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "axis": "방어 불능 스택 의존",
            "evidence": "전선 분쇄의 회복량과 보름달 참격의 단계는 소모한 방어 불능 스택에 따라 달라집니다.",
            "affected": "전선 분쇄 · 보름달 참격",
            "implication": "방어 불능을 충분히 쌓기 전에 소모하면 피해와 게이지 회복이 모두 낮아집니다. 물리 이상이 제한되는 적에게는 핵심 뱅가드 기능이 약해집니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "axis": "궁극기 후속 발동 횟수",
            "evidence": "철의 서약 5포인트는 물리 이상 효과 또는 연계 스킬 피해가 발생할 때마다 1포인트씩 소모됩니다.",
            "affected": "방패병 부대, 전진",
            "implication": "궁극기만 사용해서는 마지막 최후의 승부까지 자동으로 이어지지 않습니다. 후속 조건을 다섯 번 만들어야 하므로 짧은 전투나 상태 면역 적에서는 자원을 남길 수 있습니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "axis": "게이지 회복 누적 문턱",
            "evidence": "생존의 깃발은 자신의 스킬로 게이지를 80포인트 회복한 뒤에야 사기 격양을 부여합니다.",
            "affected": "생존의 깃발",
            "implication": "낮은 스택 소모나 후속 공격 중단으로 회복량이 부족하면 버프가 늦어집니다. 게이지 회복 감소 또는 반환 판정 차이에 민감합니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "axis": "다수 대상과 단일 대상 차이",
            "evidence": "P1의 추가 반환은 전선 분쇄가 두 명 이상에게 명중해야 하며, 궁극기는 진군 경로의 적을 밀어냅니다.",
            "affected": "전선 분쇄 · P1 · 방패병 부대, 전진",
            "implication": "단일 보스전에서는 P1이 발동하지 않고 밀쳐내기 활용도도 낮습니다. 반대로 다수전에서는 적의 정렬과 진군 경로가 어긋나면 범위 효율이 줄어듭니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "axis": "궁극기·잠재력 의존",
            "evidence": "철의 서약과 대량 게이지 회복은 궁극기에 집중되고 P3·P5가 버프 문턱과 연계 회복을 크게 보완합니다.",
            "affected": "방패병 부대, 전진 · P3 · P5",
            "implication": "궁극기 에너지 획득 저하나 쿨타임 증가 환경에서는 팀 게이지 지원과 사기 격양 공백이 커집니다. 최대 중첩 운용은 잠재력에 따라 차이가 큽니다."
          },
          {
            "character": {
              "id": "yufeng",
              "name": "여풍"
            },
            "axis": "연타 소모 타이밍",
            "evidence": "궁극기는 연타를 소모했을 때만 대량의 추가 물리 피해를 줍니다.",
            "affected": "분노의 형상 · 움직이지 않는 마음",
            "implication": "연타의 20초 지속 시간 안에 궁극기 에너지를 마련하고 사용해야 합니다. 다른 배틀 스킬이나 궁극기가 연타를 먼저 소모하면 여풍의 마무리 피해가 줄어듭니다."
          },
          {
            "character": {
              "id": "jintianyu",
              "name": "진천우"
            },
            "axis": "공격력 중첩 준비 시간",
            "evidence": "칼날 베기는 스킬 명중마다 8%씩 최대 5스택을 쌓고 각 효과는 10초 동안 지속됩니다.",
            "affected": "칼날 베기",
            "implication": "최대 효과까지 여러 차례 스킬 명중이 필요합니다. 스킬 사용 제한·쿨타임 증가·명중 기회 감소 환경에서는 중첩을 완성하거나 유지하기 어렵습니다."
          },
          {
            "character": {
              "id": "jintianyu",
              "name": "진천우"
            },
            "axis": "메인 컨트롤 점유 효율",
            "evidence": "일반 공격의 불균형 피해와 처형 게이지 회복은 메인 컨트롤 오퍼레이터일 때 활용됩니다.",
            "affected": "파비하",
            "implication": "다른 메인 딜러가 필드를 점유하면 일반 공격 기반 불균형과 처형 활용이 줄어듭니다. 진천우를 필드에 두는 시간과 다른 딜러의 점유 시간이 경쟁합니다."
          },
          {
            "character": {
              "id": "jintianyu",
              "name": "진천우"
            },
            "axis": "잠재력 의존",
            "evidence": "P3은 세 전투 스킬의 피해를 함께 강화하고 P5는 연계 쿨타임을 3초 줄입니다.",
            "affected": "P3 · P5",
            "implication": "기본 단계에서는 연계 쿨타임 16초와 별도의 피해 증폭 없이 운용해야 합니다. 공격 순환 속도와 마무리 피해는 잠재력 단계에 따라 차이가 납니다."
          }
        ]
      },
      {
        "title": "메인 컨트롤·조작 집중",
        "entries": [
          {
            "character": {
              "id": "mive",
              "name": "미브"
            },
            "axis": "교체 시간 제한",
            "evidence": "단운 이후 추형, 조건 충족 후 개천, 연계와 궁극기 이후 추형은 모두 일정 시간 동안만 배틀 스킬을 교체합니다.",
            "affected": "청파 삼형 · 후회 없는 주먹 · 절심",
            "implication": "교체 창 안에 다음 입력과 조건을 맞춰야 합니다. 적의 이동·행동 방해·목표 전환으로 시간을 잃으면 준비한 초식이 사라질 수 있습니다."
          },
          {
            "character": {
              "id": "mive",
              "name": "미브"
            },
            "axis": "전방 범위와 위치 조정",
            "evidence": "추형·개천·연계는 전방 범위를 공격하고 절심은 차지 후 전방으로 돌진합니다.",
            "affected": "추형 · 개천 · 후회 없는 주먹 · 절심",
            "implication": "다수의 적을 한 방향에 정렬해야 범위 효율이 높아집니다. 단운의 끌어오기가 실패하거나 적이 흩어지면 명중 수와 마무리 효율이 줄어듭니다."
          },
          {
            "character": {
              "id": "yufeng",
              "name": "여풍"
            },
            "axis": "연계 파티 의존",
            "evidence": "분노의 형상은 물리 취약 또는 갑옷 파괴 대상에게 메인 컨트롤 오퍼레이터가 강력한 일격을 줘야 발동합니다.",
            "affected": "분노의 형상",
            "implication": "취약·갑옷 파괴 준비와 메인 컨트롤의 강력한 일격을 모두 맞춰야 합니다. 상태가 사라지거나 메인 컨트롤 공격이 끊기면 연타를 얻지 못합니다."
          },
          {
            "character": {
              "id": "yufeng",
              "name": "여풍"
            },
            "axis": "연타 소모 타이밍",
            "evidence": "궁극기는 연타를 소모했을 때만 대량의 추가 물리 피해를 줍니다.",
            "affected": "분노의 형상 · 움직이지 않는 마음",
            "implication": "연타의 20초 지속 시간 안에 궁극기 에너지를 마련하고 사용해야 합니다. 다른 배틀 스킬이나 궁극기가 연타를 먼저 소모하면 여풍의 마무리 피해가 줄어듭니다."
          },
          {
            "character": {
              "id": "jintianyu",
              "name": "진천우"
            },
            "axis": "차지 패턴 의존",
            "evidence": "흐름 끊기의 추가 불균형 피해는 스킬로 적의 차지를 끊었을 때만 발동합니다.",
            "affected": "흐름 끊기",
            "implication": "차지를 사용하지 않거나 차단할 수 없는 적을 상대로 재능 하나의 기여가 사라집니다. 차지 타이밍을 놓쳐도 추가 불균형 피해를 얻지 못합니다."
          },
          {
            "character": {
              "id": "jintianyu",
              "name": "진천우"
            },
            "axis": "메인 컨트롤 점유 효율",
            "evidence": "일반 공격의 불균형 피해와 처형 게이지 회복은 메인 컨트롤 오퍼레이터일 때 활용됩니다.",
            "affected": "파비하",
            "implication": "다른 메인 딜러가 필드를 점유하면 일반 공격 기반 불균형과 처형 활용이 줄어듭니다. 진천우를 필드에 두는 시간과 다른 딜러의 점유 시간이 경쟁합니다."
          }
        ]
      },
      {
        "title": "잠재력 의존",
        "entries": [
          {
            "character": {
              "id": "mive",
              "name": "미브"
            },
            "axis": "잠재력 의존",
            "evidence": "P1은 취약과 연계 회전, P3은 보호와 공격력, P5는 모든 초식의 피해를 크게 보완합니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 단계에서는 물리 취약 5%, 긴 보호 간격, 높은 게이지 부담이 그대로 남습니다. 완성된 공격·생존 순환은 잠재력 단계에 따라 차이가 큽니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "axis": "다수 대상과 단일 대상 차이",
            "evidence": "P1의 추가 반환은 전선 분쇄가 두 명 이상에게 명중해야 하며, 궁극기는 진군 경로의 적을 밀어냅니다.",
            "affected": "전선 분쇄 · P1 · 방패병 부대, 전진",
            "implication": "단일 보스전에서는 P1이 발동하지 않고 밀쳐내기 활용도도 낮습니다. 반대로 다수전에서는 적의 정렬과 진군 경로가 어긋나면 범위 효율이 줄어듭니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "axis": "궁극기·잠재력 의존",
            "evidence": "철의 서약과 대량 게이지 회복은 궁극기에 집중되고 P3·P5가 버프 문턱과 연계 회복을 크게 보완합니다.",
            "affected": "방패병 부대, 전진 · P3 · P5",
            "implication": "궁극기 에너지 획득 저하나 쿨타임 증가 환경에서는 팀 게이지 지원과 사기 격양 공백이 커집니다. 최대 중첩 운용은 잠재력에 따라 차이가 큽니다."
          },
          {
            "character": {
              "id": "yufeng",
              "name": "여풍"
            },
            "axis": "능력치 분산",
            "evidence": "돈오는 지능과 의지를 공격력으로 전환하고 P2는 모든 능력치, P3는 전환율을 강화합니다.",
            "affected": "돈오 · P2 · P3",
            "implication": "힘뿐 아니라 지능·의지까지 투자해야 재능의 공격력 증가를 크게 얻습니다. 능력치 감소나 특정 스탯 위주의 세팅에서는 성장 효율이 달라질 수 있습니다."
          },
          {
            "character": {
              "id": "yufeng",
              "name": "여풍"
            },
            "axis": "잠재력 의존",
            "evidence": "P1은 취약 조건과 수치를 보완하고 P5는 복마의 주기적 고배율 피해와 불균형 피해를 추가합니다.",
            "affected": "P1 · P5",
            "implication": "기본 단계에서는 취약 부여 대상이 제한되고 넘어뜨리기 추가 피해가 공격력 100%에 머뭅니다. 취약 안정성과 폭발력은 잠재력 단계에 따라 차이가 큽니다."
          },
          {
            "character": {
              "id": "jintianyu",
              "name": "진천우"
            },
            "axis": "잠재력 의존",
            "evidence": "P3은 세 전투 스킬의 피해를 함께 강화하고 P5는 연계 쿨타임을 3초 줄입니다.",
            "affected": "P3 · P5",
            "implication": "기본 단계에서는 연계 쿨타임 16초와 별도의 피해 증폭 없이 운용해야 합니다. 공격 순환 속도와 마무리 피해는 잠재력 단계에 따라 차이가 납니다."
          }
        ]
      },
      {
        "title": "위치·대상 수",
        "entries": [
          {
            "character": {
              "id": "mive",
              "name": "미브"
            },
            "axis": "전방 범위와 위치 조정",
            "evidence": "추형·개천·연계는 전방 범위를 공격하고 절심은 차지 후 전방으로 돌진합니다.",
            "affected": "추형 · 개천 · 후회 없는 주먹 · 절심",
            "implication": "다수의 적을 한 방향에 정렬해야 범위 효율이 높아집니다. 단운의 끌어오기가 실패하거나 적이 흩어지면 명중 수와 마무리 효율이 줄어듭니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "axis": "다수 대상과 단일 대상 차이",
            "evidence": "P1의 추가 반환은 전선 분쇄가 두 명 이상에게 명중해야 하며, 궁극기는 진군 경로의 적을 밀어냅니다.",
            "affected": "전선 분쇄 · P1 · 방패병 부대, 전진",
            "implication": "단일 보스전에서는 P1이 발동하지 않고 밀쳐내기 활용도도 낮습니다. 반대로 다수전에서는 적의 정렬과 진군 경로가 어긋나면 범위 효율이 줄어듭니다."
          },
          {
            "character": {
              "id": "yufeng",
              "name": "여풍"
            },
            "axis": "지연형 궁극기 명중",
            "evidence": "궁극기의 두 번째 공격은 일정 시간 후에도 범위 안에 남아 있는 적에게만 적용됩니다.",
            "affected": "움직이지 않는 마음",
            "implication": "이동·순간이동·넉백 저항이 강한 적은 두 번째 대량 피해와 넘어뜨리기를 피할 수 있습니다. 범위 유지와 군중 제어가 중요합니다."
          },
          {
            "character": {
              "id": "jintianyu",
              "name": "진천우"
            },
            "axis": "단일 대상 궁극기",
            "evidence": "예풍상은 목표한 적 한 명에게 7단 베기를 집중합니다.",
            "affected": "예풍상",
            "implication": "다수 대상전에서는 궁극기의 범위 기여가 낮고 목표가 사라지거나 이동하면 집중 피해 효율이 떨어질 수 있습니다."
          },
          {
            "character": {
              "id": "jintianyu",
              "name": "진천우"
            },
            "axis": "공격력 중첩 준비 시간",
            "evidence": "칼날 베기는 스킬 명중마다 8%씩 최대 5스택을 쌓고 각 효과는 10초 동안 지속됩니다.",
            "affected": "칼날 베기",
            "implication": "최대 효과까지 여러 차례 스킬 명중이 필요합니다. 스킬 사용 제한·쿨타임 증가·명중 기회 감소 환경에서는 중첩을 완성하거나 유지하기 어렵습니다."
          }
        ]
      }
    ],
    "discoveries": [
      {
        "character": {
          "id": "mive",
          "name": "미브"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 궁극기 비중이 높지만, 연계 스킬은 방어 불능 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "pogranichnik",
          "name": "포그라니치니크"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 연계 스킬 비중이 높지만, 연계 스킬은 방어 불능·강타 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "yufeng",
          "name": "여풍"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 연계 스킬 비중이 높지만, 연계 스킬은 갑옷 파괴·강력한 일격 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "jintianyu",
          "name": "진천우"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 배틀 스킬 비중이 높지만, 연계 스킬은 방어 불능 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      }
    ],
    "designHints": [
      {
        "id": "ultimate",
        "title": "궁극기 반복 의존도",
        "pressure": "궁극기 반복 사용의 효율이 점차 낮아지는 방향",
        "impact": "궁극기를 중심으로 한 강화 구간과 마무리 빈도가 줄어듭니다.",
        "opportunity": "궁극기 에너지를 다른 가치로 돌리거나 배틀·연계 스킬을 주력화하는 운용을 찾게 됩니다.",
        "caution": "첫 궁극기까지 무력화하면 준비 과정의 의미도 사라질 수 있으므로 반복 효율을 조절하는 편이 발견을 만들기 쉽습니다.",
        "characters": [
          {
            "id": "mive",
            "name": "미브"
          },
          {
            "id": "pogranichnik",
            "name": "포그라니치니크"
          },
          {
            "id": "yufeng",
            "name": "여풍"
          },
          {
            "id": "jintianyu",
            "name": "진천우"
          }
        ]
      },
      {
        "id": "battle",
        "title": "배틀 스킬 피해 비중",
        "pressure": "배틀 스킬의 직접 피해를 줄이되 연계 스킬 순환은 열어주는 방향",
        "impact": "스킬 게이지를 사용해 즉시 내는 화력이 줄어듭니다.",
        "opportunity": "배틀 스킬을 상태 생성·변환 용도로만 쓰고, 연계 스킬이나 궁극기 외 추가 피해를 주력으로 삼는 구조가 떠오를 수 있습니다.",
        "caution": "배틀 스킬의 상태 부여까지 막으면 후속 연계 조건 자체가 사라질 수 있습니다.",
        "characters": [
          {
            "id": "mive",
            "name": "미브"
          },
          {
            "id": "pogranichnik",
            "name": "포그라니치니크"
          },
          {
            "id": "yufeng",
            "name": "여풍"
          },
          {
            "id": "jintianyu",
            "name": "진천우"
          }
        ]
      },
      {
        "id": "link",
        "title": "연계 스킬 빈도",
        "pressure": "연계 스킬 사용 빈도와 쿨타임을 크게 흔드는 방향",
        "impact": "조건을 자주 열 수 있는 파티일수록 순환 속도가 크게 달라집니다.",
        "opportunity": "연계 횟수가 늘어날 때 생기는 자원 수급과 보조 피해, 반대로 연계에 대가가 생길 때의 대체 순서를 비교할 수 있습니다.",
        "caution": "연계 조건과 쿨타임을 동시에 막으면 조합의 상호작용이 사라질 수 있습니다.",
        "characters": [
          {
            "id": "mive",
            "name": "미브"
          },
          {
            "id": "pogranichnik",
            "name": "포그라니치니크"
          },
          {
            "id": "yufeng",
            "name": "여풍"
          },
          {
            "id": "jintianyu",
            "name": "진천우"
          }
        ]
      },
      {
        "id": "stack",
        "title": "부착·방어 불능 축적 속도",
        "pressure": "같은 대상에게 스택을 연속으로 쌓는 속도를 제한하는 방향",
        "impact": "최대 스택을 전제로 하는 동결·강타·갑옷 파괴·취약 발동 시점이 늦어집니다.",
        "opportunity": "낮은 스택에서 바로 작동하는 스킬, 강제 이상, 직접 부여 효과의 가치가 올라갈 수 있습니다.",
        "caution": "부착 자체를 금지하면 대체 운용이 아니라 파티의 핵심 문법을 삭제하게 됩니다.",
        "characters": [
          {
            "id": "mive",
            "name": "미브"
          },
          {
            "id": "pogranichnik",
            "name": "포그라니치니크"
          },
          {
            "id": "yufeng",
            "name": "여풍"
          },
          {
            "id": "jintianyu",
            "name": "진천우"
          }
        ]
      },
      {
        "id": "main",
        "title": "메인 컨트롤 점유",
        "pressure": "전투 중 메인 컨트롤 교체를 어렵게 하거나 한 명에게 고정하는 방향",
        "impact": "메인 컨트롤 전환을 요구하는 궁극기와 강력한 일격 조건이 서로 경쟁합니다.",
        "opportunity": "비조작 상태에서도 작동하는 설치물·연계 스킬·지원 효과를 중심으로 역할을 재배치할 수 있습니다.",
        "caution": "핵심 캐릭터를 잘못 고정하면 플레이 선택보다 편성 실패만 강요할 수 있으므로 후보별 차이가 남아야 합니다.",
        "characters": [
          {
            "id": "mive",
            "name": "미브"
          },
          {
            "id": "pogranichnik",
            "name": "포그라니치니크"
          },
          {
            "id": "yufeng",
            "name": "여풍"
          },
          {
            "id": "jintianyu",
            "name": "진천우"
          }
        ]
      }
    ],
    "mechanicProfile": {
      "mechanicIds": [
        "defenseless",
        "knockdown",
        "launch",
        "physicalVulnerability",
        "armorBreak",
        "physicalDamage",
        "ultimate",
        "imbalance",
        "comboHit",
        "skillGauge",
        "smash",
        "battleSkill",
        "powerStrike",
        "mainControl",
        "cleanse"
      ],
      "mechanicScores": {
        "defenseless": 23.5,
        "knockdown": 19,
        "launch": 15.5,
        "physicalVulnerability": 14.5,
        "armorBreak": 13,
        "physicalDamage": 12,
        "ultimate": 10.5,
        "imbalance": 9,
        "comboHit": 9,
        "skillGauge": 8,
        "smash": 7.5,
        "battleSkill": 7.5,
        "powerStrike": 5,
        "mainControl": 5,
        "cleanse": 4.5,
        "heatDamage": 0,
        "electricDamage": 0,
        "frostDamage": 0,
        "natureDamage": 0,
        "artsDamage": 0,
        "heatInfliction": 0,
        "electricInfliction": 0,
        "frostInfliction": 0,
        "natureInfliction": 0,
        "artsInfliction": 0,
        "artsAbnormality": 0,
        "combustion": 0,
        "shock": 0,
        "freeze": 0,
        "corrosion": 0,
        "execution": 0,
        "artsVulnerability": 0,
        "heatVulnerability": 0,
        "electricVulnerability": 0,
        "frostVulnerability": 0,
        "natureVulnerability": 0,
        "artsAmplification": 0,
        "physicalAmplification": 0,
        "heatAmplification": 0,
        "electricAmplification": 0,
        "frostAmplification": 0,
        "natureAmplification": 0,
        "skillGaugeReturn": 0,
        "ultimateEnergy": 0,
        "protection": 0,
        "fortification": 0,
        "healing": 0,
        "weakness": 0,
        "slow": 0,
        "haste": 0,
        "originiumCrystal": 0,
        "generalAttack": 0,
        "linkSkill": 0
      },
      "dominantAction": "linkSkill",
      "actionTotals": {
        "generalAttack": 4,
        "battleSkill": 20,
        "linkSkill": 25,
        "ultimate": 22
      },
      "hintIds": [
        "ultimate",
        "battle",
        "link",
        "stack",
        "main"
      ],
      "hintTitles": [
        "궁극기 반복 의존도",
        "배틀 스킬 피해 비중",
        "연계 스킬 빈도",
        "부착·방어 불능 축적 속도",
        "메인 컨트롤 점유"
      ],
      "weaknessAxes": [
        "방어 불능 3스택 요구",
        "교체 시간 제한",
        "보호 발동 간격",
        "방어 불능 스택 의존",
        "스택 소모 순서 경쟁",
        "궁극기 후속 발동 횟수",
        "게이지 회복 누적 문턱",
        "물리 취약 부여 조건",
        "연계 파티 의존",
        "잠재력 의존",
        "방어 불능 조건 의존",
        "공격력 중첩 준비 시간",
        "다단계 스킬 게이지 부담",
        "방어 불능 스택 의존",
        "궁극기 후속 발동 횟수",
        "게이지 회복 누적 문턱",
        "다수 대상과 단일 대상 차이",
        "궁극기·잠재력 의존",
        "연타 소모 타이밍",
        "공격력 중첩 준비 시간",
        "메인 컨트롤 점유 효율",
        "잠재력 의존",
        "교체 시간 제한",
        "전방 범위와 위치 조정",
        "연계 파티 의존",
        "연타 소모 타이밍",
        "차지 패턴 의존",
        "메인 컨트롤 점유 효율",
        "잠재력 의존",
        "다수 대상과 단일 대상 차이",
        "궁극기·잠재력 의존",
        "능력치 분산",
        "잠재력 의존",
        "잠재력 의존",
        "전방 범위와 위치 조정",
        "다수 대상과 단일 대상 차이",
        "지연형 궁극기 명중",
        "단일 대상 궁극기",
        "공격력 중첩 준비 시간"
      ],
      "dependencyLabels": [
        "방어 불능",
        "넘어뜨리기",
        "띄우기",
        "물리 취약",
        "연계 스킬"
      ]
    }
  },
  {
    "schemaVersion": 1,
    "id": "party-mive-pogranichnik-yufeng-amber",
    "exportedAt": "2026-07-25T06:53:52.713Z",
    "title": "미브 · 포그라니치니크 · 여풍 · 엠버 파티 분석",
    "party": [
      {
        "id": "mive",
        "name": "미브",
        "order": 1
      },
      {
        "id": "pogranichnik",
        "name": "포그라니치니크",
        "order": 2
      },
      {
        "id": "yufeng",
        "name": "여풍",
        "order": 3
      },
      {
        "id": "amber",
        "name": "엠버",
        "order": 4
      }
    ],
    "summary": {
      "title": "파티 전투 구조 분석",
      "sentence": "띄우기·넘어뜨리기 등으로 방어 불능을 쌓고, 강타·갑옷 파괴로 스택을 소모한 뒤 연계 스킬·궁극기 화력을 이어가는 파티입니다.",
      "dominantAction": "linkSkill",
      "actionTotals": {
        "generalAttack": 4,
        "battleSkill": 18,
        "linkSkill": 25,
        "ultimate": 21
      },
      "dependencies": [
        {
          "id": "knockdown",
          "label": "넘어뜨리기",
          "color": "brown",
          "level": "매우 높음",
          "score": 24.5
        },
        {
          "id": "defenseless",
          "label": "방어 불능",
          "color": "brown",
          "level": "매우 높음",
          "score": 21
        },
        {
          "id": "physicalVulnerability",
          "label": "물리 취약",
          "color": "brown",
          "level": "매우 높음",
          "score": 14.5
        },
        {
          "id": "armorBreak",
          "label": "갑옷 파괴",
          "color": "brown",
          "level": "매우 높음",
          "score": 13
        },
        {
          "id": "linkSkill",
          "label": "연계 스킬",
          "color": "purple",
          "level": "주력 행동",
          "score": 25
        }
      ]
    },
    "diagram": {
      "nodes": [
        {
          "order": 1,
          "character": {
            "id": "yufeng",
            "name": "여풍"
          },
          "skill": {
            "name": "신체 정화",
            "type": "배틀 스킬",
            "typeId": "battleSkill",
            "index": 1
          },
          "title": "물리 취약 준비"
        },
        {
          "order": 2,
          "character": {
            "id": "mive",
            "name": "미브"
          },
          "skill": {
            "name": "후회 없는 주먹",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "물리 취약 부여"
        },
        {
          "order": 3,
          "character": {
            "id": "pogranichnik",
            "name": "포그라니치니크"
          },
          "skill": {
            "name": "보름달 참격",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "방어 불능 누적"
        },
        {
          "order": 4,
          "character": {
            "id": "mive",
            "name": "미브"
          },
          "skill": {
            "name": "검권 합일",
            "type": "일반 공격",
            "typeId": "generalAttack",
            "index": 0
          },
          "title": "개천 마무리"
        },
        {
          "order": 5,
          "character": {
            "id": "yufeng",
            "name": "여풍"
          },
          "skill": {
            "name": "분노의 형상",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "강력한 일격 연결"
        },
        {
          "order": 6,
          "character": {
            "id": "pogranichnik",
            "name": "포그라니치니크"
          },
          "skill": {
            "name": "전선 분쇄",
            "type": "배틀 스킬",
            "typeId": "battleSkill",
            "index": 1
          },
          "title": "스택 소모와 회복"
        },
        {
          "order": 7,
          "character": {
            "id": "amber",
            "name": "엠버"
          },
          "skill": {
            "name": "다시 불타오르는 맹세",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "보호 전개"
        },
        {
          "order": 8,
          "character": {
            "id": "yufeng",
            "name": "여풍"
          },
          "skill": {
            "name": "움직이지 않는 마음",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "궁극기 집적"
        }
      ],
      "connections": [
        {
          "fromOrder": 1,
          "toOrder": 2,
          "label": "물리 취약",
          "preparationRoutes": []
        },
        {
          "fromOrder": 2,
          "toOrder": 3,
          "label": "다음 조건 연결",
          "preparationRoutes": [
            {
              "character": {
                "id": "mive",
                "name": "미브"
              },
              "skill": {
                "name": "절심",
                "type": "궁극기",
                "typeId": "ultimate",
                "index": 3
              },
              "matchedMechanics": [
                {
                  "id": "defenseless",
                  "label": "방어 불능"
                },
                {
                  "id": "launch",
                  "label": "띄우기"
                }
              ],
              "summary": "잠시 차지한 뒤 전방으로 돌진해 목표에게 강제 띄우기 피해를 주고 이어서 지면에 내리꽂아 물리 피해를 줍니다."
            },
            {
              "character": {
                "id": "pogranichnik",
                "name": "포그라니치니크"
              },
              "skill": {
                "name": "전선 분쇄",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "defenseless",
                  "label": "방어 불능"
                }
              ],
              "summary": "소모한 방어 불능 스택 수치에 따라 스킬 게이지를 회복합니다."
            },
            {
              "character": {
                "id": "yufeng",
                "name": "여풍"
              },
              "skill": {
                "name": "신체 정화",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "defenseless",
                  "label": "방어 불능"
                }
              ],
              "summary": "마지막 공격에 명중한 적이 방어 불능 상태가 아니면 추가로 물리 취약 5%를 12초 동안 부여합니다."
            }
          ]
        },
        {
          "fromOrder": 3,
          "toOrder": 4,
          "label": "불균형",
          "preparationRoutes": [
            {
              "character": {
                "id": "pogranichnik",
                "name": "포그라니치니크"
              },
              "skill": {
                "name": "전면 공세",
                "type": "일반 공격",
                "typeId": "generalAttack",
                "index": 0
              },
              "matchedMechanics": [
                {
                  "id": "imbalance",
                  "label": "불균형"
                }
              ],
              "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때, 일반 공격을 사용하면 해당 적을 처형하여 대량의 물리 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 18포인트의 불균형 피해를 줍니다."
            },
            {
              "character": {
                "id": "yufeng",
                "name": "여풍"
              },
              "skill": {
                "name": "업보 파괴",
                "type": "일반 공격",
                "typeId": "generalAttack",
                "index": 0
              },
              "matchedMechanics": [
                {
                  "id": "imbalance",
                  "label": "불균형"
                }
              ],
              "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때, 일반 공격을 사용하면 해당 적을 처형하여 대량의 물리 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 19포인트의 불균형 피해를 줍니다."
            },
            {
              "character": {
                "id": "amber",
                "name": "엠버"
              },
              "skill": {
                "name": "돌진 검술",
                "type": "일반 공격",
                "typeId": "generalAttack",
                "index": 0
              },
              "matchedMechanics": [
                {
                  "id": "imbalance",
                  "label": "불균형"
                }
              ],
              "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때, 일반 공격을 사용하면 해당 적을 처형하여 대량의 물리 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 25포인트의 불균형 피해를 줍니다."
            },
            {
              "character": {
                "id": "mive",
                "name": "미브"
              },
              "skill": {
                "name": "절심",
                "type": "궁극기",
                "typeId": "ultimate",
                "index": 3
              },
              "matchedMechanics": [
                {
                  "id": "imbalance",
                  "label": "불균형"
                }
              ],
              "summary": ""
            },
            {
              "character": {
                "id": "amber",
                "name": "엠버"
              },
              "skill": {
                "name": "다시 불타오르는 맹세",
                "type": "궁극기",
                "typeId": "ultimate",
                "index": 3
              },
              "matchedMechanics": [
                {
                  "id": "imbalance",
                  "label": "불균형"
                }
              ],
              "summary": "팀 전체 보호 · 10초 지면을 강타하여 주변의 적에게 열기 피해를 주고, 동시에 팀 전체에게 엠버의 최대 생명력에 따른 보호를 부여합니다."
            }
          ]
        },
        {
          "fromOrder": 4,
          "toOrder": 5,
          "label": "물리 취약",
          "preparationRoutes": []
        },
        {
          "fromOrder": 5,
          "toOrder": 6,
          "label": "갑옷 파괴",
          "preparationRoutes": []
        },
        {
          "fromOrder": 6,
          "toOrder": 7,
          "label": "스킬 게이지 재투자",
          "preparationRoutes": []
        },
        {
          "fromOrder": 7,
          "toOrder": 8,
          "label": "다음 조건 연결",
          "preparationRoutes": []
        }
      ]
    },
    "combatFlow": [
      {
        "order": 1,
        "character": {
          "id": "yufeng",
          "name": "여풍"
        },
        "stageIds": [
          "setup",
          "payoff"
        ],
        "title": "물리 취약 준비",
        "detail": "방어 불능이 없는 적에게 여풍의 배틀 스킬의 마지막 공격을 맞혀 물리 취약을 부여하고 넘어뜨리기 추가 피해를 발생시킨다.",
        "skill": {
          "name": "신체 정화",
          "type": "배틀 스킬",
          "typeId": "battleSkill",
          "index": 1
        },
        "conditions": [],
        "timing": "",
        "effects": [
          "마지막 공격에 명중한 적이 방어 불능 상태가 아니면 추가로 물리 취약 5%를 12초 동안 부여합니다."
        ],
        "mechanics": [
          {
            "id": "defenseless",
            "label": "방어 불능"
          },
          {
            "id": "knockdown",
            "label": "넘어뜨리기"
          },
          {
            "id": "physicalVulnerability",
            "label": "물리 취약"
          },
          {
            "id": "cleanse",
            "label": "정화"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "skill": {
              "name": "전선 분쇄",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "defenseless",
                "label": "방어 불능"
              }
            ],
            "summary": "소모한 방어 불능 스택 수치에 따라 스킬 게이지를 회복합니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "skill": {
              "name": "보름달 참격",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "defenseless",
                "label": "방어 불능"
              }
            ],
            "summary": "적이 강타 또는 갑옷 파괴 피해로 방어 불능 스택을 소모한 후 사용할 수 있습니다."
          },
          {
            "character": {
              "id": "mive",
              "name": "미브"
            },
            "skill": {
              "name": "절심",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "defenseless",
                "label": "방어 불능"
              }
            ],
            "summary": ""
          }
        ]
      },
      {
        "order": 2,
        "character": {
          "id": "mive",
          "name": "미브"
        },
        "stageIds": [
          "setup",
          "convert",
          "payoff"
        ],
        "title": "물리 취약 부여",
        "detail": "미브의 연계 스킬으로 물리 취약을 걸고 배틀 스킬을 추형 상태로 전환한다.",
        "skill": {
          "name": "후회 없는 주먹",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "적의 방어 불능 수치가 3스택 이상일 때 사용할 수 있습니다.",
          "방어 불능 3스택 이상"
        ],
        "timing": "",
        "effects": [
          "올려치기로 전방의 적에게 물리 피해를 주고 물리 취약 5%를 16초 동안 부여합니다."
        ],
        "mechanics": [
          {
            "id": "physicalVulnerability",
            "label": "물리 취약"
          },
          {
            "id": "battleSkill",
            "label": "배틀 스킬"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 3,
        "character": {
          "id": "pogranichnik",
          "name": "포그라니치니크"
        },
        "stageIds": [
          "setup"
        ],
        "title": "방어 불능 누적",
        "detail": "파티의 띄우기·넘어뜨리기로 적에게 방어 불능 스택을 충분히 쌓는다.",
        "skill": {
          "name": "보름달 참격",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "적이 강타 또는 갑옷 파괴 피해로 방어 불능 스택을 소모한 후 사용할 수 있습니다.",
          "강타·갑옷 파괴로 방어 불능 소모"
        ],
        "timing": "",
        "effects": [
          "소모한 최대 방어 불능 스택에 따라 동일 단계의 베기 공격을 최대 3단계까지 사용해 물리 피해를 주고 스킬 게이지를 회복합니다.",
          "방어 불능 4스택을 소모하면 3단계 베기 공격이 강화됩니다."
        ],
        "mechanics": [
          {
            "id": "defenseless",
            "label": "방어 불능"
          },
          {
            "id": "launch",
            "label": "띄우기"
          },
          {
            "id": "knockdown",
            "label": "넘어뜨리기"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "mive",
              "name": "미브"
            },
            "skill": {
              "name": "절심",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "defenseless",
                "label": "방어 불능"
              },
              {
                "id": "launch",
                "label": "띄우기"
              }
            ],
            "summary": "잠시 차지한 뒤 전방으로 돌진해 목표에게 강제 띄우기 피해를 주고 이어서 지면에 내리꽂아 물리 피해를 줍니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "skill": {
              "name": "전선 분쇄",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "defenseless",
                "label": "방어 불능"
              }
            ],
            "summary": "소모한 방어 불능 스택 수치에 따라 스킬 게이지를 회복합니다."
          },
          {
            "character": {
              "id": "yufeng",
              "name": "여풍"
            },
            "skill": {
              "name": "신체 정화",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "defenseless",
                "label": "방어 불능"
              }
            ],
            "summary": "마지막 공격에 명중한 적이 방어 불능 상태가 아니면 추가로 물리 취약 5%를 12초 동안 부여합니다."
          }
        ]
      },
      {
        "order": 4,
        "character": {
          "id": "mive",
          "name": "미브"
        },
        "stageIds": [
          "trigger",
          "payoff",
          "recycle"
        ],
        "title": "개천 마무리",
        "detail": "물리 취약 또는 불균형 상태가 유지되는 동안 개천을 사용해 냉정의 1.2배 피해 조건을 노린다.",
        "skill": {
          "name": "검권 합일",
          "type": "일반 공격",
          "typeId": "generalAttack",
          "index": 0
        },
        "conditions": [
          "처형 공격: 주변에 불균형 상태의 적이 있을 때, 일반 공격을 사용하면 해당 적을 처형하여 대량의 물리 피해를 주고 일정량의 스킬 게이지를 회복합니다."
        ],
        "timing": "",
        "effects": [
          "메인 컨트롤 오퍼레이터라면 강력한 일격이 25포인트의 불균형 피해를 줍니다."
        ],
        "mechanics": [
          {
            "id": "imbalance",
            "label": "불균형"
          },
          {
            "id": "physicalVulnerability",
            "label": "물리 취약"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "skill": {
              "name": "전면 공세",
              "type": "일반 공격",
              "typeId": "generalAttack",
              "index": 0
            },
            "matchedMechanics": [
              {
                "id": "imbalance",
                "label": "불균형"
              }
            ],
            "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때, 일반 공격을 사용하면 해당 적을 처형하여 대량의 물리 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 18포인트의 불균형 피해를 줍니다."
          },
          {
            "character": {
              "id": "yufeng",
              "name": "여풍"
            },
            "skill": {
              "name": "업보 파괴",
              "type": "일반 공격",
              "typeId": "generalAttack",
              "index": 0
            },
            "matchedMechanics": [
              {
                "id": "imbalance",
                "label": "불균형"
              }
            ],
            "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때, 일반 공격을 사용하면 해당 적을 처형하여 대량의 물리 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 19포인트의 불균형 피해를 줍니다."
          },
          {
            "character": {
              "id": "amber",
              "name": "엠버"
            },
            "skill": {
              "name": "돌진 검술",
              "type": "일반 공격",
              "typeId": "generalAttack",
              "index": 0
            },
            "matchedMechanics": [
              {
                "id": "imbalance",
                "label": "불균형"
              }
            ],
            "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때, 일반 공격을 사용하면 해당 적을 처형하여 대량의 물리 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 25포인트의 불균형 피해를 줍니다."
          },
          {
            "character": {
              "id": "mive",
              "name": "미브"
            },
            "skill": {
              "name": "절심",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "imbalance",
                "label": "불균형"
              }
            ],
            "summary": ""
          },
          {
            "character": {
              "id": "amber",
              "name": "엠버"
            },
            "skill": {
              "name": "다시 불타오르는 맹세",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "imbalance",
                "label": "불균형"
              }
            ],
            "summary": "팀 전체 보호 · 10초 지면을 강타하여 주변의 적에게 열기 피해를 주고, 동시에 팀 전체에게 엠버의 최대 생명력에 따른 보호를 부여합니다."
          }
        ]
      },
      {
        "order": 5,
        "character": {
          "id": "yufeng",
          "name": "여풍"
        },
        "stageIds": [
          "convert",
          "payoff"
        ],
        "title": "강력한 일격 연결",
        "detail": "물리 취약 또는 갑옷 파괴 대상에게 메인 컨트롤 오퍼레이터가 강력한 일격을 넣어 여풍의 연계 스킬을 연다.",
        "skill": {
          "name": "분노의 형상",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "물리 취약 또는 갑옷 파괴 상태의 적이 메인 컨트롤 오퍼레이터의 강력한 일격을 받았을 때 사용할 수 있습니다.",
          "물리 취약·갑옷 파괴 대상에게 강력한 일격"
        ],
        "timing": "",
        "effects": [
          "화신을 내세워 장창으로 찌르며 물리 피해를 주고 20초 동안 연타를 획득합니다."
        ],
        "mechanics": [
          {
            "id": "armorBreak",
            "label": "갑옷 파괴"
          },
          {
            "id": "powerStrike",
            "label": "강력한 일격"
          },
          {
            "id": "physicalVulnerability",
            "label": "물리 취약"
          },
          {
            "id": "mainControl",
            "label": "메인 컨트롤"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 6,
        "character": {
          "id": "pogranichnik",
          "name": "포그라니치니크"
        },
        "stageIds": [
          "trigger",
          "convert",
          "recycle"
        ],
        "title": "스택 소모와 회복",
        "detail": "포그라니치니크의 배틀 스킬의 갑옷 파괴로 스택을 소모해 스킬 게이지를 회복하고 포그라니치니크의 연계 스킬의 조건을 연다.",
        "skill": {
          "name": "전선 분쇄",
          "type": "배틀 스킬",
          "typeId": "battleSkill",
          "index": 1
        },
        "conditions": [],
        "timing": "",
        "effects": [
          "소모한 방어 불능 스택 수치에 따라 스킬 게이지를 회복합니다."
        ],
        "mechanics": [
          {
            "id": "armorBreak",
            "label": "갑옷 파괴"
          },
          {
            "id": "skillGauge",
            "label": "스킬 게이지"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 7,
        "character": {
          "id": "amber",
          "name": "엠버"
        },
        "stageIds": [
          "setup"
        ],
        "title": "보호 전개",
        "detail": "엠버의 궁극기로 주변에 열기 피해를 주고 팀 전체에 최대 생명력 기반 보호를 10초 동안 부여한다.",
        "skill": {
          "name": "다시 불타오르는 맹세",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [
          "팀 전체 보호 · 10초"
        ],
        "timing": "지원 효과를 먼저 적용한 뒤 미브의 궁극기를 이어갑니다.",
        "effects": [
          "지면을 강타하여 주변의 적에게 열기 피해를 주고, 동시에 팀 전체에게 엠버의 최대 생명력에 따른 보호를 부여합니다.",
          "보호는 10초 동안 지속됩니다."
        ],
        "mechanics": [
          {
            "id": "heatDamage",
            "label": "열기 피해"
          },
          {
            "id": "protection",
            "label": "보호"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 8,
        "character": {
          "id": "yufeng",
          "name": "여풍"
        },
        "stageIds": [
          "payoff"
        ],
        "title": "궁극기 집적",
        "detail": "여풍의 궁극기으로 넓은 범위의 적을 중심으로 끌어당기고 첫 넘어뜨리기와 복마 추가 피해를 넣는다.",
        "skill": {
          "name": "움직이지 않는 마음",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [],
        "timing": "적에게 필요한 부착·이상 상태를 준비하고, 주력 피해를 집중할 수 있을 때 사용합니다.",
        "effects": [
          "화신을 내세워 지면을 내리쳐 넓은 범위의 모든 적에게 물리 피해와 넘어뜨리기 피해를 주고 중심으로 끌어당깁니다.",
          "궁극기가 연타를 소모했다면 대량의 물리 피해를 추가로 줍니다."
        ],
        "mechanics": [
          {
            "id": "knockdown",
            "label": "넘어뜨리기"
          },
          {
            "id": "ultimate",
            "label": "궁극기"
          }
        ],
        "preparationRoutes": []
      }
    ],
    "supportFlow": [],
    "basicOperation": [
      {
        "order": 1,
        "title": "여풍 · 배틀 스킬",
        "detail": "방어 불능이 없는 적에게 여풍의 배틀 스킬의 마지막 공격을 맞혀 물리 취약을 부여하고 넘어뜨리기 추가 피해를 발생시킨다."
      },
      {
        "order": 2,
        "title": "미브 · 연계 스킬",
        "detail": "미브의 연계 스킬으로 물리 취약을 걸고 배틀 스킬을 추형 상태로 전환한다."
      },
      {
        "order": 3,
        "title": "포그라니치니크 · 연계 스킬",
        "detail": "파티의 띄우기·넘어뜨리기로 적에게 방어 불능 스택을 충분히 쌓는다."
      },
      {
        "order": 4,
        "title": "미브 · 일반 공격",
        "detail": "물리 취약 또는 불균형 상태가 유지되는 동안 개천을 사용해 냉정의 1.2배 피해 조건을 노린다."
      },
      {
        "order": 5,
        "title": "여풍 · 연계 스킬",
        "detail": "물리 취약 또는 갑옷 파괴 대상에게 메인 컨트롤 오퍼레이터가 강력한 일격을 넣어 여풍의 연계 스킬을 연다."
      },
      {
        "order": 6,
        "title": "포그라니치니크 · 배틀 스킬",
        "detail": "포그라니치니크의 배틀 스킬의 갑옷 파괴로 스택을 소모해 스킬 게이지를 회복하고 포그라니치니크의 연계 스킬의 조건을 연다."
      },
      {
        "order": 7,
        "title": "엠버 · 궁극기",
        "detail": "엠버의 궁극기로 주변에 열기 피해를 주고 팀 전체에 최대 생명력 기반 보호를 10초 동안 부여한다."
      },
      {
        "order": 8,
        "title": "여풍 · 궁극기",
        "detail": "여풍의 궁극기으로 넓은 범위의 적을 중심으로 끌어당기고 첫 넘어뜨리기와 복마 추가 피해를 넣는다."
      }
    ],
    "roles": [
      {
        "character": {
          "id": "mive",
          "name": "미브"
        },
        "labels": [
          "방어 불능 생성",
          "스킬 게이지·배틀 스킬 소모",
          "물리 취약 지원",
          "전투 자원 순환"
        ],
        "relation": "포그라니치니크의 물리 피해 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "pogranichnik",
          "name": "포그라니치니크"
        },
        "labels": [
          "방어 불능 생성",
          "물리 피해·갑옷 파괴 소모",
          "전투 자원 순환",
          "메인 컨트롤 후보"
        ],
        "relation": "미브의 물리 피해 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "yufeng",
          "name": "여풍"
        },
        "labels": [
          "방어 불능 생성",
          "갑옷 파괴·강력한 일격 소모",
          "물리 취약 지원",
          "전투 자원 순환"
        ],
        "relation": "미브의 물리 피해 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "amber",
          "name": "엠버"
        },
        "labels": [
          "전투 자원 순환",
          "생존 지원",
          "메인 컨트롤 후보"
        ],
        "relation": "미브의 물리 피해 조건과 직접 이어집니다."
      }
    ],
    "weaknesses": [
      {
        "title": "예열·상태 준비",
        "entries": [
          {
            "character": {
              "id": "mive",
              "name": "미브"
            },
            "axis": "방어 불능 3스택 요구",
            "evidence": "후회 없는 주먹은 방어 불능 3스택 이상을 요구하고, 추형에서 개천으로 넘어가려면 강타가 최대 3스택 이상을 소모해야 합니다.",
            "affected": "후회 없는 주먹 · 추형 · 개천",
            "implication": "방어 불능을 빠르게 누적할 동료가 없거나 물리 이상이 제한되면 연계와 최종 초식이 동시에 막힙니다. 낮은 스택을 성급히 소모해도 순환이 끊깁니다."
          },
          {
            "character": {
              "id": "mive",
              "name": "미브"
            },
            "axis": "교체 시간 제한",
            "evidence": "단운 이후 추형, 조건 충족 후 개천, 연계와 궁극기 이후 추형은 모두 일정 시간 동안만 배틀 스킬을 교체합니다.",
            "affected": "청파 삼형 · 후회 없는 주먹 · 절심",
            "implication": "교체 창 안에 다음 입력과 조건을 맞춰야 합니다. 적의 이동·행동 방해·목표 전환으로 시간을 잃으면 준비한 초식이 사라질 수 있습니다."
          },
          {
            "character": {
              "id": "mive",
              "name": "미브"
            },
            "axis": "보호 발동 간격",
            "evidence": "분노의 보호는 연계 사용 후 발동하며 기본적으로 60초마다 최대 1회입니다.",
            "affected": "분노",
            "implication": "연계 조건을 못 맞추면 보호를 얻지 못하고, 한 번 소모한 뒤에는 긴 공백이 생깁니다. 지속 피해나 반복 공격을 상대로 상시 생존 수단이 되기 어렵습니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "axis": "방어 불능 스택 의존",
            "evidence": "전선 분쇄의 회복량과 보름달 참격의 단계는 소모한 방어 불능 스택에 따라 달라집니다.",
            "affected": "전선 분쇄 · 보름달 참격",
            "implication": "방어 불능을 충분히 쌓기 전에 소모하면 피해와 게이지 회복이 모두 낮아집니다. 물리 이상이 제한되는 적에게는 핵심 뱅가드 기능이 약해집니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "axis": "스택 소모 순서 경쟁",
            "evidence": "강타·갑옷 파괴로 방어 불능을 소모해야 연계가 열리고, 4스택 소모 시에만 최고 단계가 강화됩니다.",
            "affected": "보름달 참격",
            "implication": "다른 오퍼레이터가 먼저 스택을 소모하면 포그라니치니크가 최대 단계를 얻지 못할 수 있습니다. 파티의 물리 이상 소비 순서를 조정해야 합니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "axis": "궁극기 후속 발동 횟수",
            "evidence": "철의 서약 5포인트는 물리 이상 효과 또는 연계 스킬 피해가 발생할 때마다 1포인트씩 소모됩니다.",
            "affected": "방패병 부대, 전진",
            "implication": "궁극기만 사용해서는 마지막 최후의 승부까지 자동으로 이어지지 않습니다. 후속 조건을 다섯 번 만들어야 하므로 짧은 전투나 상태 면역 적에서는 자원을 남길 수 있습니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "axis": "게이지 회복 누적 문턱",
            "evidence": "생존의 깃발은 자신의 스킬로 게이지를 80포인트 회복한 뒤에야 사기 격양을 부여합니다.",
            "affected": "생존의 깃발",
            "implication": "낮은 스택 소모나 후속 공격 중단으로 회복량이 부족하면 버프가 늦어집니다. 게이지 회복 감소 또는 반환 판정 차이에 민감합니다."
          },
          {
            "character": {
              "id": "yufeng",
              "name": "여풍"
            },
            "axis": "물리 취약 부여 조건",
            "evidence": "신체 정화는 마지막 공격 대상이 방어 불능 상태가 아닐 때 물리 취약을 부여합니다.",
            "affected": "신체 정화",
            "implication": "이미 방어 불능이 깊게 누적된 목표에게는 기본 취약 부여가 제한될 수 있습니다. 파티가 먼저 물리 이상을 쌓는 순서와 충돌할 수 있어 연계 준비가 불안정합니다."
          },
          {
            "character": {
              "id": "yufeng",
              "name": "여풍"
            },
            "axis": "연계 파티 의존",
            "evidence": "분노의 형상은 물리 취약 또는 갑옷 파괴 대상에게 메인 컨트롤 오퍼레이터가 강력한 일격을 줘야 발동합니다.",
            "affected": "분노의 형상",
            "implication": "취약·갑옷 파괴 준비와 메인 컨트롤의 강력한 일격을 모두 맞춰야 합니다. 상태가 사라지거나 메인 컨트롤 공격이 끊기면 연타를 얻지 못합니다."
          },
          {
            "character": {
              "id": "yufeng",
              "name": "여풍"
            },
            "axis": "잠재력 의존",
            "evidence": "P1은 취약 조건과 수치를 보완하고 P5는 복마의 주기적 고배율 피해와 불균형 피해를 추가합니다.",
            "affected": "P1 · P5",
            "implication": "기본 단계에서는 취약 부여 대상이 제한되고 넘어뜨리기 추가 피해가 공격력 100%에 머뭅니다. 취약 안정성과 폭발력은 잠재력 단계에 따라 차이가 큽니다."
          },
          {
            "character": {
              "id": "amber",
              "name": "엠버"
            },
            "axis": "피격 조건 의존",
            "evidence": "전선에서의 지원은 메인 컨트롤 오퍼레이터가 공격받아야 사용할 수 있고, 강철에는 강철로도 적의 피해를 받은 후에 발동합니다.",
            "affected": "전선에서의 지원 · 강철에는 강철로",
            "implication": "피격 빈도가 낮으면 연계 스킬과 공격력 중첩의 발동 기회가 줄지만, 발동을 위해 피해를 감수하면 생존 부담이 커집니다."
          },
          {
            "character": {
              "id": "amber",
              "name": "엠버"
            },
            "axis": "조건부 시전 안정성",
            "evidence": "전진의 결의의 50% 비호와 스킬 중단 방지는 진군과 전선에서의 지원을 발동하는 과정에만 적용됩니다.",
            "affected": "전진의 결의 · 진군 · 전선에서의 지원",
            "implication": "두 스킬의 시전 구간 밖에서는 해당 비호를 이용할 수 없으며, 반복 피해가 이어지면 별도의 보호와 치유가 필요합니다."
          },
          {
            "character": {
              "id": "amber",
              "name": "엠버"
            },
            "axis": "보호·치유의 능력치 의존",
            "evidence": "전선에서의 지원의 치유량은 의지로 추가 증가하고, 다시 불타오르는 맹세의 보호량은 엠버의 최대 생명력을 따릅니다.",
            "affected": "전선에서의 지원 · 다시 불타오르는 맹세",
            "implication": "치유와 보호를 모두 강화하려면 서로 다른 능력치 조건을 함께 고려해야 하며, 한쪽에 집중하면 다른 지원 효과의 증가 폭이 제한될 수 있습니다."
          },
          {
            "character": {
              "id": "amber",
              "name": "엠버"
            },
            "axis": "잠재력에 따른 팀 지원 확장",
            "evidence": "P3은 생명력 비율이 가장 낮은 팀원 1명을 추가 치유하고, P5는 보호량과 보호 대상의 공격력을 강화합니다.",
            "affected": "P3 · P5",
            "implication": "기본 상태에서도 메인 컨트롤 치유와 팀 보호를 제공하지만, 다중 대상 치유와 보호 중 공격력 지원은 관련 잠재력에 의존합니다."
          }
        ]
      },
      {
        "title": "스킬 게이지·궁극기 순환",
        "entries": [
          {
            "character": {
              "id": "mive",
              "name": "미브"
            },
            "axis": "다단계 스킬 게이지 부담",
            "evidence": "단운은 100을 소모해 50을 반환하고, 추형과 개천은 각각 50을 소모합니다.",
            "affected": "청파 삼형",
            "implication": "전체 3단계를 이어가려면 여러 차례의 게이지 지출이 필요합니다. 자연 충전이 느려지거나 게이지 반환이 막히면 개천까지 도달하기 어렵습니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "axis": "방어 불능 스택 의존",
            "evidence": "전선 분쇄의 회복량과 보름달 참격의 단계는 소모한 방어 불능 스택에 따라 달라집니다.",
            "affected": "전선 분쇄 · 보름달 참격",
            "implication": "방어 불능을 충분히 쌓기 전에 소모하면 피해와 게이지 회복이 모두 낮아집니다. 물리 이상이 제한되는 적에게는 핵심 뱅가드 기능이 약해집니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "axis": "궁극기 후속 발동 횟수",
            "evidence": "철의 서약 5포인트는 물리 이상 효과 또는 연계 스킬 피해가 발생할 때마다 1포인트씩 소모됩니다.",
            "affected": "방패병 부대, 전진",
            "implication": "궁극기만 사용해서는 마지막 최후의 승부까지 자동으로 이어지지 않습니다. 후속 조건을 다섯 번 만들어야 하므로 짧은 전투나 상태 면역 적에서는 자원을 남길 수 있습니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "axis": "게이지 회복 누적 문턱",
            "evidence": "생존의 깃발은 자신의 스킬로 게이지를 80포인트 회복한 뒤에야 사기 격양을 부여합니다.",
            "affected": "생존의 깃발",
            "implication": "낮은 스택 소모나 후속 공격 중단으로 회복량이 부족하면 버프가 늦어집니다. 게이지 회복 감소 또는 반환 판정 차이에 민감합니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "axis": "다수 대상과 단일 대상 차이",
            "evidence": "P1의 추가 반환은 전선 분쇄가 두 명 이상에게 명중해야 하며, 궁극기는 진군 경로의 적을 밀어냅니다.",
            "affected": "전선 분쇄 · P1 · 방패병 부대, 전진",
            "implication": "단일 보스전에서는 P1이 발동하지 않고 밀쳐내기 활용도도 낮습니다. 반대로 다수전에서는 적의 정렬과 진군 경로가 어긋나면 범위 효율이 줄어듭니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "axis": "궁극기·잠재력 의존",
            "evidence": "철의 서약과 대량 게이지 회복은 궁극기에 집중되고 P3·P5가 버프 문턱과 연계 회복을 크게 보완합니다.",
            "affected": "방패병 부대, 전진 · P3 · P5",
            "implication": "궁극기 에너지 획득 저하나 쿨타임 증가 환경에서는 팀 게이지 지원과 사기 격양 공백이 커집니다. 최대 중첩 운용은 잠재력에 따라 차이가 큽니다."
          },
          {
            "character": {
              "id": "yufeng",
              "name": "여풍"
            },
            "axis": "연타 소모 타이밍",
            "evidence": "궁극기는 연타를 소모했을 때만 대량의 추가 물리 피해를 줍니다.",
            "affected": "분노의 형상 · 움직이지 않는 마음",
            "implication": "연타의 20초 지속 시간 안에 궁극기 에너지를 마련하고 사용해야 합니다. 다른 배틀 스킬이나 궁극기가 연타를 먼저 소모하면 여풍의 마무리 피해가 줄어듭니다."
          },
          {
            "character": {
              "id": "amber",
              "name": "엠버"
            },
            "axis": "스킬 게이지와 쿨타임",
            "evidence": "진군은 스킬 게이지 100포인트를 소모하고, 전선에서의 지원은 쿨타임 19초, 다시 불타오르는 맹세는 쿨타임 20초입니다. 게이지 100포인트의 자연 회복에는 12.5초가 걸립니다.",
            "affected": "진군 · 전선에서의 지원 · 다시 불타오르는 맹세",
            "implication": "배틀 스킬 비용 증가, 스킬 게이지 회복 감소, 연계·궁극기 쿨타임 증가 방향의 제약에서 지원 순환이 느려질 수 있습니다."
          }
        ]
      },
      {
        "title": "생존·피격 조건",
        "entries": [
          {
            "character": {
              "id": "mive",
              "name": "미브"
            },
            "axis": "보호 발동 간격",
            "evidence": "분노의 보호는 연계 사용 후 발동하며 기본적으로 60초마다 최대 1회입니다.",
            "affected": "분노",
            "implication": "연계 조건을 못 맞추면 보호를 얻지 못하고, 한 번 소모한 뒤에는 긴 공백이 생깁니다. 지속 피해나 반복 공격을 상대로 상시 생존 수단이 되기 어렵습니다."
          },
          {
            "character": {
              "id": "mive",
              "name": "미브"
            },
            "axis": "잠재력 의존",
            "evidence": "P1은 취약과 연계 회전, P3은 보호와 공격력, P5는 모든 초식의 피해를 크게 보완합니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 단계에서는 물리 취약 5%, 긴 보호 간격, 높은 게이지 부담이 그대로 남습니다. 완성된 공격·생존 순환은 잠재력 단계에 따라 차이가 큽니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "axis": "게이지 회복 누적 문턱",
            "evidence": "생존의 깃발은 자신의 스킬로 게이지를 80포인트 회복한 뒤에야 사기 격양을 부여합니다.",
            "affected": "생존의 깃발",
            "implication": "낮은 스택 소모나 후속 공격 중단으로 회복량이 부족하면 버프가 늦어집니다. 게이지 회복 감소 또는 반환 판정 차이에 민감합니다."
          },
          {
            "character": {
              "id": "amber",
              "name": "엠버"
            },
            "axis": "피격 조건 의존",
            "evidence": "전선에서의 지원은 메인 컨트롤 오퍼레이터가 공격받아야 사용할 수 있고, 강철에는 강철로도 적의 피해를 받은 후에 발동합니다.",
            "affected": "전선에서의 지원 · 강철에는 강철로",
            "implication": "피격 빈도가 낮으면 연계 스킬과 공격력 중첩의 발동 기회가 줄지만, 발동을 위해 피해를 감수하면 생존 부담이 커집니다."
          },
          {
            "character": {
              "id": "amber",
              "name": "엠버"
            },
            "axis": "조건부 시전 안정성",
            "evidence": "전진의 결의의 50% 비호와 스킬 중단 방지는 진군과 전선에서의 지원을 발동하는 과정에만 적용됩니다.",
            "affected": "전진의 결의 · 진군 · 전선에서의 지원",
            "implication": "두 스킬의 시전 구간 밖에서는 해당 비호를 이용할 수 없으며, 반복 피해가 이어지면 별도의 보호와 치유가 필요합니다."
          },
          {
            "character": {
              "id": "amber",
              "name": "엠버"
            },
            "axis": "보호·치유의 능력치 의존",
            "evidence": "전선에서의 지원의 치유량은 의지로 추가 증가하고, 다시 불타오르는 맹세의 보호량은 엠버의 최대 생명력을 따릅니다.",
            "affected": "전선에서의 지원 · 다시 불타오르는 맹세",
            "implication": "치유와 보호를 모두 강화하려면 서로 다른 능력치 조건을 함께 고려해야 하며, 한쪽에 집중하면 다른 지원 효과의 증가 폭이 제한될 수 있습니다."
          },
          {
            "character": {
              "id": "amber",
              "name": "엠버"
            },
            "axis": "잠재력에 따른 팀 지원 확장",
            "evidence": "P3은 생명력 비율이 가장 낮은 팀원 1명을 추가 치유하고, P5는 보호량과 보호 대상의 공격력을 강화합니다.",
            "affected": "P3 · P5",
            "implication": "기본 상태에서도 메인 컨트롤 치유와 팀 보호를 제공하지만, 다중 대상 치유와 보호 중 공격력 지원은 관련 잠재력에 의존합니다."
          }
        ]
      },
      {
        "title": "메인 컨트롤·조작 집중",
        "entries": [
          {
            "character": {
              "id": "mive",
              "name": "미브"
            },
            "axis": "교체 시간 제한",
            "evidence": "단운 이후 추형, 조건 충족 후 개천, 연계와 궁극기 이후 추형은 모두 일정 시간 동안만 배틀 스킬을 교체합니다.",
            "affected": "청파 삼형 · 후회 없는 주먹 · 절심",
            "implication": "교체 창 안에 다음 입력과 조건을 맞춰야 합니다. 적의 이동·행동 방해·목표 전환으로 시간을 잃으면 준비한 초식이 사라질 수 있습니다."
          },
          {
            "character": {
              "id": "mive",
              "name": "미브"
            },
            "axis": "전방 범위와 위치 조정",
            "evidence": "추형·개천·연계는 전방 범위를 공격하고 절심은 차지 후 전방으로 돌진합니다.",
            "affected": "추형 · 개천 · 후회 없는 주먹 · 절심",
            "implication": "다수의 적을 한 방향에 정렬해야 범위 효율이 높아집니다. 단운의 끌어오기가 실패하거나 적이 흩어지면 명중 수와 마무리 효율이 줄어듭니다."
          },
          {
            "character": {
              "id": "yufeng",
              "name": "여풍"
            },
            "axis": "연계 파티 의존",
            "evidence": "분노의 형상은 물리 취약 또는 갑옷 파괴 대상에게 메인 컨트롤 오퍼레이터가 강력한 일격을 줘야 발동합니다.",
            "affected": "분노의 형상",
            "implication": "취약·갑옷 파괴 준비와 메인 컨트롤의 강력한 일격을 모두 맞춰야 합니다. 상태가 사라지거나 메인 컨트롤 공격이 끊기면 연타를 얻지 못합니다."
          },
          {
            "character": {
              "id": "yufeng",
              "name": "여풍"
            },
            "axis": "연타 소모 타이밍",
            "evidence": "궁극기는 연타를 소모했을 때만 대량의 추가 물리 피해를 줍니다.",
            "affected": "분노의 형상 · 움직이지 않는 마음",
            "implication": "연타의 20초 지속 시간 안에 궁극기 에너지를 마련하고 사용해야 합니다. 다른 배틀 스킬이나 궁극기가 연타를 먼저 소모하면 여풍의 마무리 피해가 줄어듭니다."
          },
          {
            "character": {
              "id": "amber",
              "name": "엠버"
            },
            "axis": "피격 조건 의존",
            "evidence": "전선에서의 지원은 메인 컨트롤 오퍼레이터가 공격받아야 사용할 수 있고, 강철에는 강철로도 적의 피해를 받은 후에 발동합니다.",
            "affected": "전선에서의 지원 · 강철에는 강철로",
            "implication": "피격 빈도가 낮으면 연계 스킬과 공격력 중첩의 발동 기회가 줄지만, 발동을 위해 피해를 감수하면 생존 부담이 커집니다."
          },
          {
            "character": {
              "id": "amber",
              "name": "엠버"
            },
            "axis": "잠재력에 따른 팀 지원 확장",
            "evidence": "P3은 생명력 비율이 가장 낮은 팀원 1명을 추가 치유하고, P5는 보호량과 보호 대상의 공격력을 강화합니다.",
            "affected": "P3 · P5",
            "implication": "기본 상태에서도 메인 컨트롤 치유와 팀 보호를 제공하지만, 다중 대상 치유와 보호 중 공격력 지원은 관련 잠재력에 의존합니다."
          }
        ]
      },
      {
        "title": "잠재력 의존",
        "entries": [
          {
            "character": {
              "id": "mive",
              "name": "미브"
            },
            "axis": "잠재력 의존",
            "evidence": "P1은 취약과 연계 회전, P3은 보호와 공격력, P5는 모든 초식의 피해를 크게 보완합니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 단계에서는 물리 취약 5%, 긴 보호 간격, 높은 게이지 부담이 그대로 남습니다. 완성된 공격·생존 순환은 잠재력 단계에 따라 차이가 큽니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "axis": "다수 대상과 단일 대상 차이",
            "evidence": "P1의 추가 반환은 전선 분쇄가 두 명 이상에게 명중해야 하며, 궁극기는 진군 경로의 적을 밀어냅니다.",
            "affected": "전선 분쇄 · P1 · 방패병 부대, 전진",
            "implication": "단일 보스전에서는 P1이 발동하지 않고 밀쳐내기 활용도도 낮습니다. 반대로 다수전에서는 적의 정렬과 진군 경로가 어긋나면 범위 효율이 줄어듭니다."
          },
          {
            "character": {
              "id": "pogranichnik",
              "name": "포그라니치니크"
            },
            "axis": "궁극기·잠재력 의존",
            "evidence": "철의 서약과 대량 게이지 회복은 궁극기에 집중되고 P3·P5가 버프 문턱과 연계 회복을 크게 보완합니다.",
            "affected": "방패병 부대, 전진 · P3 · P5",
            "implication": "궁극기 에너지 획득 저하나 쿨타임 증가 환경에서는 팀 게이지 지원과 사기 격양 공백이 커집니다. 최대 중첩 운용은 잠재력에 따라 차이가 큽니다."
          },
          {
            "character": {
              "id": "yufeng",
              "name": "여풍"
            },
            "axis": "능력치 분산",
            "evidence": "돈오는 지능과 의지를 공격력으로 전환하고 P2는 모든 능력치, P3는 전환율을 강화합니다.",
            "affected": "돈오 · P2 · P3",
            "implication": "힘뿐 아니라 지능·의지까지 투자해야 재능의 공격력 증가를 크게 얻습니다. 능력치 감소나 특정 스탯 위주의 세팅에서는 성장 효율이 달라질 수 있습니다."
          },
          {
            "character": {
              "id": "yufeng",
              "name": "여풍"
            },
            "axis": "잠재력 의존",
            "evidence": "P1은 취약 조건과 수치를 보완하고 P5는 복마의 주기적 고배율 피해와 불균형 피해를 추가합니다.",
            "affected": "P1 · P5",
            "implication": "기본 단계에서는 취약 부여 대상이 제한되고 넘어뜨리기 추가 피해가 공격력 100%에 머뭅니다. 취약 안정성과 폭발력은 잠재력 단계에 따라 차이가 큽니다."
          },
          {
            "character": {
              "id": "amber",
              "name": "엠버"
            },
            "axis": "잠재력에 따른 팀 지원 확장",
            "evidence": "P3은 생명력 비율이 가장 낮은 팀원 1명을 추가 치유하고, P5는 보호량과 보호 대상의 공격력을 강화합니다.",
            "affected": "P3 · P5",
            "implication": "기본 상태에서도 메인 컨트롤 치유와 팀 보호를 제공하지만, 다중 대상 치유와 보호 중 공격력 지원은 관련 잠재력에 의존합니다."
          }
        ]
      }
    ],
    "discoveries": [
      {
        "character": {
          "id": "mive",
          "name": "미브"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 궁극기 비중이 높지만, 연계 스킬은 방어 불능 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "pogranichnik",
          "name": "포그라니치니크"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 연계 스킬 비중이 높지만, 연계 스킬은 방어 불능·강타 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "yufeng",
          "name": "여풍"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 연계 스킬 비중이 높지만, 연계 스킬은 갑옷 파괴·강력한 일격 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "amber",
          "name": "엠버"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 배틀 스킬 비중이 높지만, 연계 스킬은 메인 컨트롤 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      }
    ],
    "designHints": [
      {
        "id": "ultimate",
        "title": "궁극기 반복 의존도",
        "pressure": "궁극기 반복 사용의 효율이 점차 낮아지는 방향",
        "impact": "궁극기를 중심으로 한 강화 구간과 마무리 빈도가 줄어듭니다.",
        "opportunity": "궁극기 에너지를 다른 가치로 돌리거나 배틀·연계 스킬을 주력화하는 운용을 찾게 됩니다.",
        "caution": "첫 궁극기까지 무력화하면 준비 과정의 의미도 사라질 수 있으므로 반복 효율을 조절하는 편이 발견을 만들기 쉽습니다.",
        "characters": [
          {
            "id": "mive",
            "name": "미브"
          },
          {
            "id": "pogranichnik",
            "name": "포그라니치니크"
          },
          {
            "id": "yufeng",
            "name": "여풍"
          },
          {
            "id": "amber",
            "name": "엠버"
          }
        ]
      },
      {
        "id": "battle",
        "title": "배틀 스킬 피해 비중",
        "pressure": "배틀 스킬의 직접 피해를 줄이되 연계 스킬 순환은 열어주는 방향",
        "impact": "스킬 게이지를 사용해 즉시 내는 화력이 줄어듭니다.",
        "opportunity": "배틀 스킬을 상태 생성·변환 용도로만 쓰고, 연계 스킬이나 궁극기 외 추가 피해를 주력으로 삼는 구조가 떠오를 수 있습니다.",
        "caution": "배틀 스킬의 상태 부여까지 막으면 후속 연계 조건 자체가 사라질 수 있습니다.",
        "characters": [
          {
            "id": "mive",
            "name": "미브"
          },
          {
            "id": "pogranichnik",
            "name": "포그라니치니크"
          },
          {
            "id": "yufeng",
            "name": "여풍"
          },
          {
            "id": "amber",
            "name": "엠버"
          }
        ]
      },
      {
        "id": "link",
        "title": "연계 스킬 빈도",
        "pressure": "연계 스킬 사용 빈도와 쿨타임을 크게 흔드는 방향",
        "impact": "조건을 자주 열 수 있는 파티일수록 순환 속도가 크게 달라집니다.",
        "opportunity": "연계 횟수가 늘어날 때 생기는 자원 수급과 보조 피해, 반대로 연계에 대가가 생길 때의 대체 순서를 비교할 수 있습니다.",
        "caution": "연계 조건과 쿨타임을 동시에 막으면 조합의 상호작용이 사라질 수 있습니다.",
        "characters": [
          {
            "id": "mive",
            "name": "미브"
          },
          {
            "id": "pogranichnik",
            "name": "포그라니치니크"
          },
          {
            "id": "yufeng",
            "name": "여풍"
          },
          {
            "id": "amber",
            "name": "엠버"
          }
        ]
      },
      {
        "id": "stack",
        "title": "부착·방어 불능 축적 속도",
        "pressure": "같은 대상에게 스택을 연속으로 쌓는 속도를 제한하는 방향",
        "impact": "최대 스택을 전제로 하는 동결·강타·갑옷 파괴·취약 발동 시점이 늦어집니다.",
        "opportunity": "낮은 스택에서 바로 작동하는 스킬, 강제 이상, 직접 부여 효과의 가치가 올라갈 수 있습니다.",
        "caution": "부착 자체를 금지하면 대체 운용이 아니라 파티의 핵심 문법을 삭제하게 됩니다.",
        "characters": [
          {
            "id": "mive",
            "name": "미브"
          },
          {
            "id": "pogranichnik",
            "name": "포그라니치니크"
          },
          {
            "id": "yufeng",
            "name": "여풍"
          }
        ]
      },
      {
        "id": "main",
        "title": "메인 컨트롤 점유",
        "pressure": "전투 중 메인 컨트롤 교체를 어렵게 하거나 한 명에게 고정하는 방향",
        "impact": "메인 컨트롤 전환을 요구하는 궁극기와 강력한 일격 조건이 서로 경쟁합니다.",
        "opportunity": "비조작 상태에서도 작동하는 설치물·연계 스킬·지원 효과를 중심으로 역할을 재배치할 수 있습니다.",
        "caution": "핵심 캐릭터를 잘못 고정하면 플레이 선택보다 편성 실패만 강요할 수 있으므로 후보별 차이가 남아야 합니다.",
        "characters": [
          {
            "id": "mive",
            "name": "미브"
          },
          {
            "id": "pogranichnik",
            "name": "포그라니치니크"
          },
          {
            "id": "yufeng",
            "name": "여풍"
          },
          {
            "id": "amber",
            "name": "엠버"
          }
        ]
      }
    ],
    "mechanicProfile": {
      "mechanicIds": [
        "knockdown",
        "defenseless",
        "ultimate",
        "physicalVulnerability",
        "armorBreak",
        "mainControl",
        "launch",
        "physicalDamage",
        "comboHit",
        "skillGauge",
        "smash",
        "imbalance",
        "powerStrike",
        "heatDamage",
        "ultimateEnergy",
        "protection",
        "healing",
        "cleanse",
        "battleSkill"
      ],
      "mechanicScores": {
        "knockdown": 24.5,
        "defenseless": 21,
        "ultimate": 15,
        "physicalVulnerability": 14.5,
        "armorBreak": 13,
        "mainControl": 12,
        "launch": 11.5,
        "physicalDamage": 9,
        "comboHit": 9,
        "skillGauge": 8,
        "smash": 7.5,
        "imbalance": 7.5,
        "powerStrike": 5,
        "heatDamage": 4.5,
        "ultimateEnergy": 4.5,
        "protection": 4.5,
        "healing": 4.5,
        "cleanse": 4.5,
        "battleSkill": 4.5,
        "electricDamage": 0,
        "frostDamage": 0,
        "natureDamage": 0,
        "artsDamage": 0,
        "heatInfliction": 0,
        "electricInfliction": 0,
        "frostInfliction": 0,
        "natureInfliction": 0,
        "artsInfliction": 0,
        "artsAbnormality": 0,
        "combustion": 0,
        "shock": 0,
        "freeze": 0,
        "corrosion": 0,
        "execution": 0,
        "artsVulnerability": 0,
        "heatVulnerability": 0,
        "electricVulnerability": 0,
        "frostVulnerability": 0,
        "natureVulnerability": 0,
        "artsAmplification": 0,
        "physicalAmplification": 0,
        "heatAmplification": 0,
        "electricAmplification": 0,
        "frostAmplification": 0,
        "natureAmplification": 0,
        "skillGaugeReturn": 0,
        "fortification": 0,
        "weakness": 0,
        "slow": 0,
        "haste": 0,
        "originiumCrystal": 0,
        "generalAttack": 0,
        "linkSkill": 0
      },
      "dominantAction": "linkSkill",
      "actionTotals": {
        "generalAttack": 4,
        "battleSkill": 18,
        "linkSkill": 25,
        "ultimate": 21
      },
      "hintIds": [
        "ultimate",
        "battle",
        "link",
        "stack",
        "main"
      ],
      "hintTitles": [
        "궁극기 반복 의존도",
        "배틀 스킬 피해 비중",
        "연계 스킬 빈도",
        "부착·방어 불능 축적 속도",
        "메인 컨트롤 점유"
      ],
      "weaknessAxes": [
        "방어 불능 3스택 요구",
        "교체 시간 제한",
        "보호 발동 간격",
        "방어 불능 스택 의존",
        "스택 소모 순서 경쟁",
        "궁극기 후속 발동 횟수",
        "게이지 회복 누적 문턱",
        "물리 취약 부여 조건",
        "연계 파티 의존",
        "잠재력 의존",
        "피격 조건 의존",
        "조건부 시전 안정성",
        "보호·치유의 능력치 의존",
        "잠재력에 따른 팀 지원 확장",
        "다단계 스킬 게이지 부담",
        "방어 불능 스택 의존",
        "궁극기 후속 발동 횟수",
        "게이지 회복 누적 문턱",
        "다수 대상과 단일 대상 차이",
        "궁극기·잠재력 의존",
        "연타 소모 타이밍",
        "스킬 게이지와 쿨타임",
        "보호 발동 간격",
        "잠재력 의존",
        "게이지 회복 누적 문턱",
        "피격 조건 의존",
        "조건부 시전 안정성",
        "보호·치유의 능력치 의존",
        "잠재력에 따른 팀 지원 확장",
        "교체 시간 제한",
        "전방 범위와 위치 조정",
        "연계 파티 의존",
        "연타 소모 타이밍",
        "피격 조건 의존",
        "잠재력에 따른 팀 지원 확장",
        "잠재력 의존",
        "다수 대상과 단일 대상 차이",
        "궁극기·잠재력 의존",
        "능력치 분산",
        "잠재력 의존",
        "잠재력에 따른 팀 지원 확장"
      ],
      "dependencyLabels": [
        "넘어뜨리기",
        "방어 불능",
        "물리 취약",
        "갑옷 파괴",
        "연계 스킬"
      ]
    }
  }
];
