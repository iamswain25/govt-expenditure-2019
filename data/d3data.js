const fs = require("fs");
const file = fs.readFileSync(`${__dirname}/depth2.json`);
const js = JSON.parse(file);
function arrayfy(arr) {
  return Object.keys(arr)
    .filter(a => a !== "value" && a !== "count")
    .map(a => {
      if (Object.keys(arr[a]).length > 2) {
        return { key: a, values: arrayfy(arr[a]) };
      } else {
        return { key: a, value: arr[a].value, count: arr[a].count };
      }
    });
}
const array = arrayfy(js);
fs.writeFileSync(`${__dirname}/d3data.json`, JSON.stringify(array));
console.log("ok");
