# 2019년도 국회확정예산 TREEMAP

## 참조링크

1. https://econbigdata.tistory.com/55
2. http://bl.ocks.org/ganeshv/6a8e9ada3ab7f2d88022
3. http://www.openfiscaldata.go.kr/portal/service/openInfPage.do?mId=B002

## 데이타 가공 순서

1. `npm install` 혹은 `yarn install` 실행하여 `node-fetch`모듈을 받는다.
2. `.env.local` 파일에 열린재정에서 승인 받은 API키를 `apiKey=MV????????????????????FPC` 와 같이 저장한다.
3. `./data/dataCollector.js` 를 실행하여 `./1000/` 폴더에 2019년 자료 24542건을 다운로드 받는다. (천개씩 파일 25개)
4. `./data/depth2.js` 를 실행하여 자료를 3단계로 구조화 시킨다. output: `./data/depth.json`.
5. `./data/d3data.js` 를 실행하여 구조화된 자료를 d3에 맞게 변형한다. output: `./data/d3data.json`

## 로컬컴퓨터에서 실행

`python -m SimpleHTTPServer` 실행하여 `http://localhost:8000/`에서 본다.

## https://econbigdata.tistory.com/55 에서 보완한 점

1. (설명) pIndex가 1000개 단위로 세팅되어 있다. 정부 OpenAPI 설계가 이상하다.
2. `소관명`, `프로그램명` 2단계에서 `세부사업명`까지 넣어 3단계로 바꾸었다.

