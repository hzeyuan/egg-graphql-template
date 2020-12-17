/**
 * 解析template 提取关键信息
 */

import * as path from "path";
import * as fs from "fs";
import { Router } from "../typings";
import * as prettier from "prettier";
import { ROOT } from './utils/common/vars';
import * as eggTsHelper from 'egg-ts-helper';
import { firstUpperCase } from './utils/common/tools';


// 解析本地配置文件
export const parseTempalteConfig = (config = "template.config.json") => {
  const templateConfig = path.join(ROOT, config);
  const dataStr = fs.readFileSync(templateConfig).toString();
  const templateData = JSON.parse(dataStr);
  return templateData;
  // const routers: Router[] = templateData.router.simple;

  // const tsHelper = eggTsHelper.createTsHelperInstance({
  //   cwd: path.join(process.cwd(), 'dist'),
  //   autoRemoveJs: true,
  // });
  // tsHelper.build();
};

// export const addSimpleRouters = (sampleRouters: Router[]) => {
//   let dataStr = fs.readFileSync(TMP_ROUTER_FILE).toString();
//   sampleRouters.forEach((router) => {
//     dataStr = render(dataStr, {
//       nextRouter:
//         `router.${router.methods}('${router.url}', controller.${router.name}.index);` +
//         "\n// {{nextRouter}}",
//     }, 'line');
//   });
//   fs.writeFileSync(DIST_ROUTER_FILE, prettier.format(dataStr, { parser: 'typescript' }));
// }



// // 添加controller 和 service
// export const addControllersAndService = (sampleRouters: Router[]) => {
//   sampleRouters.forEach((router) => {
//     addControllers(router.name)
//     addServices(router.name)
//   });
// }

// export const addControllers = (name: string) => {
//   const tmpFileName = path.join(TMP_CONTROLLER_FOLDER, TEMPLATE_FILE);
//   const distFileName = path.join(DIST_CONTROLLER_FOLDER, `${name}.ts`);
//   let dataStr = fs.readFileSync(tmpFileName).toString();
//   dataStr = render(dataStr, { name, Name: firstUpperCase(name) }, 'key')
//   fs.writeFile(distFileName, prettier.format(dataStr, { parser: 'typescript' }), () => {
//     console.log(`${distFileName} 创建成功`)
//   });

// }

// export const addServices = (name: string) => {
//   const tmpFileName = path.join(TMP_SERVICE_FOLDER, TEMPLATE_FILE);
//   const distFileName = path.join(DIST_SERVICE_FOLDER, `${name}.ts`);
//   let dataStr = fs.readFileSync(tmpFileName).toString();
//   dataStr = render(dataStr, { Name: firstUpperCase(name) }, 'key')
//   fs.writeFile(distFileName, prettier.format(dataStr, { parser: 'typescript' }), () => {
//     console.log(`${distFileName} 创建成功`)
//   });

// }



const render = (str: string, context: any, type = 'key') => {
  let pattern: RegExp;
  switch (type) {
    case 'key':
      pattern = /{{(.*?)}}/g
      break;
    case 'line':
      pattern = /\/\/ {{(.*?)}}/g
      break;
    default:
      console.log('111', type)
      throw new Error('渲染失败');
  }
  return str.replace(
    pattern,
    (_, key: string) => context[key.trim()]
  );
};
