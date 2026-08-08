# V112 기준 V113 GitHub 업로드 안내

## 적용 내용

- 모든 몬스터 HP를 기존 값 ÷ 1.3으로 변경해 기본 HP로 복원
- 스테이지 내 적 배치 제목 오른쪽에 `몬스터 HP 증가` 입력창 추가
- 입력한 퍼센트에 따라 몬스터 HP와 웨이브 총 HP 즉시 재계산
- HP 증가율 브라우저 자동 저장
- 계산 결과는 소수점 둘째 자리에서 반올림해 소수점 첫째 자리까지 표시

## 변경 파일

저장소 최상단에서 다음 파일을 덮어씁니다.

```text
dungeon-monsters.html
dungeon-monsters/dashboard.js
dungeon-monsters/enemy-data.js
dungeon-monsters/editor-v13.css
```

새 안내 파일:

```text
DUNGEON_MONSTER_UPDATE_V113.txt
```

## GitHub Desktop 업로드

1. V113 패치 ZIP을 압축 해제합니다.
2. GitHub Desktop에서 `endfield-balance-lab` 저장소를 선택합니다.
3. `Show in Explorer`를 눌러 로컬 저장소 폴더를 엽니다.
4. 압축을 푼 내부 파일과 `dungeon-monsters` 폴더를 저장소 최상단에 복사합니다.
5. 같은 이름의 파일은 덮어씁니다.
6. GitHub Desktop의 Summary에 `V113 몬스터 HP 배율 업데이트`를 입력합니다.
7. `Commit to main`을 누른 뒤 `Push origin`을 누릅니다.
8. GitHub Pages 배포 후 `Ctrl + Shift + R`로 강력 새로고침합니다.

## 확인 방법

- 기본값 `0%`: 복원된 기본 몬스터 HP 표시
- `30%`: V111/V112에서 보이던 1.3배 HP와 웨이브 합계 표시
