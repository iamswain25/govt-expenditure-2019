const fs = require("fs");
const fetch = require("node-fetch");
for (let i = 1; i < 26; i++) {
  fetch(
    `http://openapi.openfiscaldata.go.kr/TotalExpenditure1?Type=json&pIndex=${i}&pSize=1000&Key=${
      process.env.apiKey
    }&FSCL_YY=2019`
  )
    .then(res => res.json())
    .then(json =>
      fs.writeFileSync(`${__dirname}/1000/${i}.json`, JSON.stringify(json))
    )
    .catch(console.err)
    .finally(console.log);
}
console.log("complete");
