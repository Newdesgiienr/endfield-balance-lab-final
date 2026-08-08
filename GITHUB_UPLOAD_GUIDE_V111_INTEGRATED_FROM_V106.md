V106 기준 V111 통합 패치 업로드 방법

이 패치는 V106 저장소에 한 번만 적용하면 V109, V110, V111 수정사항이 모두 적용됩니다.
V107~V110 패치를 먼저 업로드할 필요가 없습니다.

1. endfield-balance-lab-v111-from-v106-integrated-patch.zip을 다운로드하고 압축을 풉니다.
2. GitHub 저장소 최상단에서 Add file → Upload files를 선택합니다.
3. 압축을 푼 모든 파일과 폴더를 한 번에 끌어 놓습니다.
4. 기존 파일 덮어쓰기를 허용하고 Commit changes를 누릅니다.
5. GitHub Pages 배포가 끝난 뒤 Ctrl + Shift + R로 강력 새로고침합니다.

반드시 폴더 구조를 유지해야 하는 항목
- dungeon-monsters/ 폴더 전체

반드시 저장소 최상단에 있어야 하는 파일
- dungeon-monsters.html
- constraint-board-default-versions.js
- constraint-board.html
- constraint-board.css
- constraint-board.js

V111 주요 변경
- V109: 스테이지 구성 페이지, 몬스터 이미지와 기능, 모든 페이지 헤더 정렬, 엔드필드 위기 협약 데이터베이스 문구
- V110: v1.0 기본 버전 기록, v1.1 방식 자동 증가, 원본 크기 미리보기, 가로 스크롤, 관계선과 묶음 표시
- V111: 미리보기 가로 점수 구분선과 칸 격자를 관계선 아래로 이동
- V111: 실제 작업 현황판은 최초 접속 시 빈 상태로 시작

저장 데이터 안내
- 버전 기록 저장 키는 유지되므로 v1.0 기록은 계속 표시됩니다.
- 현재 작업판은 V111부터 새 저장 키를 사용합니다. 이전 작업판 자동 저장 데이터는 삭제되지 않지만 V111 작업판에 자동으로 불러오지는 않습니다.
