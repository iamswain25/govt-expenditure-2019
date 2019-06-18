const fs = require("fs");
const row = [];
for (let i = 1; i < 26; i++) {
  const file = fs.readFileSync(`${__dirname}/1000/${i}.json`);
  const data = JSON.parse(file);
  const drow = data.TotalExpenditure1[1].row;
  row.push(...drow);
}

const countDep = names =>
  names.reduce((a, b) => {
    const dep1 = b.OFFC_NM;
    const dep2 = b.FSCL_NM;
    const money = b.Y_YY_DFN_MEDI_KCUR_AMT;
    const children = a[dep1] && a[dep1].children ? a[dep1].children : {};
    if (children[dep2] && children[dep2].value) {
      children[dep2].value += money;
    } else {
      children[dep2] = { value: money };
    }
    return {
      ...a,
      [dep1]: {
        count: a[dep1] && a[dep1].count ? a[dep1].count + 1 : 1,
        value: a[dep1] && a[dep1].value ? a[dep1].value + money : money,
        children
      }
    };
  }, {});

const depCount = countDep(row);
fs.writeFileSync(`${__dirname}/depth.json`, JSON.stringify(depCount));
