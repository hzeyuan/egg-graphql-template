/**
 * 解析template 提取关键信息
 */

import * as path from "path";
import * as fs from "fs";
import { Router } from "../../typings";
import * as prettier from "prettier";
const root = path.join(__dirname, "../", "../");

// const file2str = (file) => {
//     return fs.readFileSync(file).toString();
// }

// 解析本地配置文件
export const parseTempalteConfig = (config = "template.config.json") => {
  const templateConfig = path.join(root, config);
  console.log("root", root);
  const dataStr = fs.readFileSync(templateConfig).toString();
  const templateData = JSON.parse(dataStr);
  console.log(templateData);
  // 对应的router配置
  const sampleRouters: Router[] = templateData.router.sample;
  const graphqlRouters: Router[] = templateData.router.graphql;
  addSimpleRouters(sampleRouters)

  console.log("sampleRouter", sampleRouters);
};


export const addSimpleRouters = (sampleRouters: Router[]) => {
  const routerFilePath = path.join(root, "template", "app", "router.ts");
  let dataStr = fs.readFileSync(routerFilePath).toString();
  sampleRouters.forEach((router) => {
    dataStr = render(dataStr, {
      nextRouter:
        `router.${router.methods}('${router.url}', controller.${router.name}.index);` +
        "\n// {{nextRouter}}",
    });
  });
  fs.writeFileSync(routerFilePath, prettier.format(dataStr));
}

const render = (str: string, context: any) => {
  return str.replace(
    /\/\/ {{(.*?)}}/g,
    (_, key: string) => context[key.trim()]
  );
};
