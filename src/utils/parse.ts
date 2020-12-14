/**
 * 解析template 提取关键信息
 */

import * as path from "path";
import * as fs from "fs";
import { Router } from "../../typings";
import * as prettier from "prettier";
import { ROOT, TEMPLATE_FILE, DIST_ROUTER_FILE, TMP_ROUTER_FILE, DIST_CONTROLLER_FOLDER, TMP_SERVICE_FOLDER, DIST_SERVICE_FOLDER, DIST_TYPES_CONTROLLER_FOLDER, DIST_TYPES_SERVICE_FOLDER, TMP_TYPES_CONTROLLER_FOLDER, TMP_TYPES_SERVICE_FOLDER, TMP_CONTROLLER_FOLDER } from './common/vars';


// 首字母大写
const firstUpperCase = (str: string) => {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

// 解析本地配置文件
export const parseTempalteConfig = (config = "template.config.json") => {
  const templateConfig = path.join(ROOT, config);
  const dataStr = fs.readFileSync(templateConfig).toString();
  const templateData = JSON.parse(dataStr);
  const sampleRouters: Router[] = templateData.router.simple;
  addSimpleRouters(sampleRouters)
  addControllersAndService(sampleRouters)

  gendts(sampleRouters);
};

export const addSimpleRouters = (sampleRouters: Router[]) => {
  let dataStr = fs.readFileSync(TMP_ROUTER_FILE).toString();
  sampleRouters.forEach((router) => {
    dataStr = render(dataStr, {
      nextRouter:
        `router.${router.methods}('${router.url}', controller.${router.name}.index);` +
        "\n// {{nextRouter}}",
    }, 'line');
  });
  fs.writeFileSync(DIST_ROUTER_FILE, prettier.format(dataStr, { parser: 'typescript' }));
}



// 添加controller 和 service
export const addControllersAndService = (sampleRouters: Router[]) => {
  sampleRouters.forEach((router) => {
    addControllers(router.name)
    addServices(router.name)
  });
}

export const addControllers = (name: string) => {
  const tmpFileName = path.join(TMP_CONTROLLER_FOLDER, TEMPLATE_FILE);
  const distFileName = path.join(DIST_CONTROLLER_FOLDER, `${name}.ts`);
  let dataStr = fs.readFileSync(tmpFileName).toString();
  dataStr = render(dataStr, { name, Name: firstUpperCase(name) }, 'key')
  fs.writeFile(distFileName, prettier.format(dataStr, { parser: 'typescript' }), () => {
    console.log(`${distFileName} 创建成功`)
  });

}

export const addServices = (name: string) => {
  const tmpFileName = path.join(TMP_SERVICE_FOLDER, TEMPLATE_FILE);
  const distFileName = path.join(DIST_SERVICE_FOLDER, `${name}.ts`);
  let dataStr = fs.readFileSync(tmpFileName).toString();
  dataStr = render(dataStr, { Name: firstUpperCase(name) }, 'key')
  fs.writeFile(distFileName, prettier.format(dataStr, { parser: 'typescript' }), () => {
    console.log(`${distFileName} 创建成功`)
  });

}

export const gendts = (sampleRouters: Router[]) => {
  let tmp: string;
  let Icontroller = fs.readFileSync(path.join(TMP_TYPES_CONTROLLER_FOLDER, TEMPLATE_FILE)).toString();
  let IService = fs.readFileSync(path.join(TMP_TYPES_SERVICE_FOLDER, TEMPLATE_FILE)).toString();

  const typings: { folder: string, template: string, fill: any }[] = [{
    folder: DIST_TYPES_CONTROLLER_FOLDER,
    template: Icontroller,
    fill: {
      import: `import Export{{Name}} from '../../../app/controller/{{name}}';`,
      export: '{{name}}: Export{{Name}};',
    }
  }, {
    folder: DIST_TYPES_SERVICE_FOLDER,
    template: IService,
    fill: {
      import: `import Export{{Name}} from '../../../app/service/{{name}}';`,
      export: '{{name}}: AutoInstanceType<typeof Export{{Name}}>;'
    }
  }];
  typings.map(t => {
    tmp = t.template;
    const fileName = path.join(t.folder, `index.d.ts`);
    sampleRouters.forEach((router) => {
      tmp = render(tmp, {
        import: render(t.fill.import, { name: router.name, Name: firstUpperCase(router.name) }) + `\n // {{import}}`,
        export: render(t.fill.export, { name: router.name, Name: firstUpperCase(router.name) }) + `\n // {{export}}`
      }, 'line')
    });
    fs.writeFile(fileName, prettier.format(tmp, { parser: 'typescript' }), () => {
      console.log('gendts 写入完成')
    })
  })
}

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
