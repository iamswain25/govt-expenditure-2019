const fs = require("fs");
const row = [];
for (let i = 1; i < 26; i++) {
  const file = fs.readFileSync(`${__dirname}/1000/${i}.json`);
  const data = JSON.parse(file);
  const drow = data.TotalExpenditure1[1].row;
  row.push(...drow);
}

const countDep = names =>
  names.reduce(
    (a, b) => {
      const dep1 = b.OFFC_NM;
      const dep2 = b.PGM_NM;
      const dep3 = b.SACTV_NM;
      // const dep3 = b.FSCL_NM;
      // console.log(dep3);
      const money = b.Y_YY_DFN_MEDI_KCUR_AMT;

      const o3 =
        a[dep1] && a[dep1][dep2] && a[dep1][dep2][dep3]
          ? a[dep1][dep2][dep3]
          : { value: 0, count: 0 };
      o3.value += money;
      o3.count += 1;

      const o2 =
        a[dep1] && a[dep1][dep2]
          ? { ...a[dep1][dep2], [dep3]: o3 }
          : { value: 0, count: 0, [dep3]: o3 };
      o2.value += money;
      o2.count += 1;

      const o1 = {
        ...a[dep1],
        [dep2]: o2,
        count: a[dep1] && a[dep1].count ? a[dep1].count + 1 : 1,
        value: a[dep1] && a[dep1].value ? a[dep1].value + money : money
      };
      return {
        ...a,
        [dep1]: o1,
        count: a.count + 1,
        value: a.value + money
      };
    },
    { count: 0, value: 0 }
  );

const depCount = countDep(row);
fs.writeFileSync(`${__dirname}/depth2.json`, JSON.stringify(depCount));
console.log(depCount);
// setTimeout(() => console.log("ok"), 500000);
