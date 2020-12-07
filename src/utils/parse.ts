/**
 * 解析template 提取关键信息
 */

import * as path from "path";
import * as fs from "fs";
import { Router } from "../../typings";
import * as prettier from "prettier";
import { type } from 'os';
const root = path.join(__dirname, "../", "../");

// const file2str = (file) => {
//     return fs.readFileSync(file).toString();
// }


const firstUpperCase = (str: string) => {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

// 解析本地配置文件
export const parseTempalteConfig = (config = "template.config.json") => {
  const templateConfig = path.join(root, config);
  console.log("root", root);
  const dataStr = fs.readFileSync(templateConfig).toString();
  const templateData = JSON.parse(dataStr);
  console.log(templateData);
  // 对应的router配置
  const sampleRouters: Router[] = templateData.router.simple;
  // const graphqlRouters: Router[] = templateData.router.graphql;
  //在router.ts中添加router;
  addSimpleRouters(sampleRouters)
  //在controller中添加对应文件
  addControllers(sampleRouters)
  // // 在service中添加对应文件
  addServices(sampleRouters);
  // 在typings中生成对应的ts文件
  gendts(sampleRouters);
};

export const addSimpleRouters = (sampleRouters: Router[]) => {
  const routerFilePath = path.join(root, "template", "app", "router.ts");
  let dataStr = fs.readFileSync(routerFilePath).toString();
  sampleRouters.forEach((router) => {
    console.log('datastr', dataStr)
    dataStr = render(dataStr, {
      nextRouter:
        `router.${router.methods}('${router.url}', controller.${router.name}.index);` +
        "\n// {{nextRouter}}",
    }, 'line');
  });
  console.log('ttt', dataStr);
  fs.writeFileSync(routerFilePath, prettier.format(dataStr));
}

export const addControllers = (sampleRouters: Router[]) => {
  let t = `
  import { Controller } from "egg";

export default class {{name}}Controller extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi("egg");
  }
}
`
  const folderPath = path.join(root, "template", "app", "controller");
  sampleRouters.forEach((router) => {
    const fileName = path.join(folderPath, `${router.name}.ts`);
    t = render(t, { name: firstUpperCase(router.name) }, 'key')
    fs.writeFile(fileName, prettier.format(t, { parser: 'typescript' }), () => { });
  });
}

export const addServices = (sampleRouters: Router[]) => {
  let t = `
  import { Service } from "egg";


export default class {{name}} extends Service {
  public async sayHi(name: string) {
    return name;
  }
}

`
  const folderPath = path.join(root, "template", "app", "service");
  sampleRouters.forEach((router) => {
    const fileName = path.join(folderPath, `${firstUpperCase(router.name)}.ts`);
    t = render(t, { name: firstUpperCase(router.name) }, 'key')
    fs.writeFile(fileName, prettier.format(t, { parser: 'typescript' }), () => {
      console.log('写入完成')
    })
  });
}

export const gendts = (sampleRouters: Router[]) => {
  let tmp: string;
  let Icontroller = `
  import 'egg';
import ExportAuth from '../../../app/controller/auth';
// {{import}}

declare module 'egg' {
  interface IController {
    auth: ExportAuth;
    // {{export}}
  }
}
`
  let IService = `
  import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAuth from '../../../app/service/Auth';
// {{import}}

declare module 'egg' {
  interface IService {
    auth: AutoInstanceType<typeof ExportAuth>;
    // {{export}}
  }
}
`
  const typings: { folder: string, template: string, fill: any }[] = [{
    folder: 'controller',
    template: Icontroller,
    fill: {
      import: `import Export{{name}} from '../../../app/controller/{{name}}';`,
      export: '{{name}}: Export{{name}};',
    }
  }, {
    folder: 'service',
    template: IService,
    fill: {
      import: `import Export{{name}} from '../../../app/service/{{name}}';`,
      export: '{{name}}: AutoInstanceType<typeof Export{{Name}}>;'
    }
  }];
  typings.map(t => {
    tmp = t.template;
    const folderPath = path.join(root, "template", "typings", 'app', t.folder);
    const fileName = path.join(folderPath, `index.d.ts`);
    sampleRouters.forEach((router) => {

      tmp = render(tmp, {
        import: render(t.fill.import, { name: router.name, Name: firstUpperCase(router.name) }) + `\n // {{import}}`,
        export: render(t.fill.export, { name: router.name, Name: firstUpperCase(router.name) }) + `\n // {{export}}`
      }, 'line')
    });
    fs.writeFile(fileName, prettier.format(tmp, { parser: 'typescript' }), () => {
      console.log('写入完成')
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
  // console.log('pattern', pattern);
  return str.replace(
    pattern,
    (_, key: string) => context[key.trim()]
  );
};
