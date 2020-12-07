const fs = require("fs");
const t = {
  nextRouter: "tttt\n{{nextRouter}}",
  name: "test",
};
const dataStr = fs.readFileSync("./test.ts").toString();

const s1 = dataStr.replace(/{{(.*?)}}/g, (_, key) => t[key.trim()]);
console.log(s1);

// 替换整行
// 替换单词
//
