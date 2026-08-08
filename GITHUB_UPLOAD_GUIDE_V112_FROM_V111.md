# V111 → V112 GitHub 업로드 안내

## 변경 내용

- 스테이지 구성 페이지의 웨이브 1~4 요약 카드 글자 크기를 확대했습니다.
- 카드 폭이 좁아질 때 제목, 마릿수, 총 HP 글자가 실제 사용 가능한 폭을 측정해 자동 축소됩니다.
- 화면을 다시 넓히면 글자 크기도 다시 커집니다.
- 긴 HP 값이 카드 밖으로 잘리거나 다른 영역을 침범하지 않도록 했습니다.

## 패치에서 변경되는 파일

```text
dungeon-monsters.html
dungeon-monsters/dashboard.js
dungeon-monsters/editor-v13.css
```

## GitHub Desktop 업로드

1. 패치 ZIP을 압축 해제합니다.
2. GitHub Desktop에서 `endfield-balance-lab` 저장소를 선택합니다.
3. `Show in Explorer`를 누릅니다.
4. 압축을 푼 내부의 `dungeon-monsters.html`과 `dungeon-monsters` 폴더를 저장소 최상단에 복사합니다.
5. 같은 이름의 파일은 덮어씁니다.
6. Summary에 `V112 웨이브 카드 반응형 글자 크기`를 입력합니다.
7. `Commit to main`을 누른 뒤 `Push origin`을 누릅니다.
8. 배포 후 사이트에서 `Ctrl + Shift + R`을 누릅니다.

`editor-v13.css`는 반드시 `dungeon-monsters` 폴더 안에 있어야 합니다.
