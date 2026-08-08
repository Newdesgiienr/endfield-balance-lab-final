# V106 기준 V108 통합 패치 업로드 안내

이 패치는 V106 사이트에 스테이지 구성 페이지를 바로 추가합니다. V107 또는 기존 V108 패치를 먼저 업로드할 필요가 없습니다.

## 1. 패치 ZIP 압축 풀기

`endfield-balance-lab-v108-from-v106-stage-integration-patch.zip`을 다운로드한 뒤 컴퓨터에서 압축을 풉니다.

## 2. GitHub 저장소 최상단에 업로드

GitHub 저장소에서 `Add file` → `Upload files`를 선택한 뒤, 압축을 푼 폴더 안의 모든 파일과 `dungeon-monsters` 폴더를 함께 끌어 놓습니다.

### 기존 파일 덮어쓰기

- `app.js`
- `constraint-board.html`
- `constraints.html`
- `constraints.js`
- `glossary.html`
- `glossary.js`
- `index.html`
- `party.html`
- `party.js`
- `results.html`
- `results.js`

### 새로 추가되는 파일과 폴더

- `dungeon-monsters.html`
- `dungeon-monsters/` 폴더 전체

`dungeon-monsters` 폴더에는 몬스터 이미지, 아이콘, 데이터, CSS와 JavaScript가 들어 있습니다. 폴더 안의 파일을 저장소 최상단에 흩어 놓지 말고 폴더 구조 그대로 업로드해야 이미지가 깨지지 않습니다.

## 3. 커밋 및 확인

1. `Commit changes`를 눌러 업로드를 완료합니다.
2. GitHub Pages 배포가 완료될 때까지 기다립니다.
3. 사이트에서 `Ctrl + Shift + R`로 강력 새로고침합니다.
4. 상단 메뉴에서 `분석 결과` 바로 오른쪽의 `스테이지 구성`을 누릅니다.
5. 페이지 제목이 `스테이지 내 적 배치`로 표시되고 몬스터 이미지가 정상 출력되는지 확인합니다.

## 포함된 변경 사항

- `분석 결과` 바로 오른쪽에 `스테이지 구성` 메뉴 추가
- 페이지 제목을 `스테이지 내 적 배치`로 적용
- 스테이지 구성 페이지의 상단 헤더와 메뉴를 제약 추천 페이지의 밝은 테마로 통일
- 몬스터 배치 기능과 이미지·아이콘 리소스 포함
