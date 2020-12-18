import { Command, flags } from "@oclif/command";
import { genSchema } from './generators/gen-gql'
import *  as path from 'path';
import { ThreadSpinner } from 'thread-spin';
import { genRouterTs } from './generators/gen-router';
import { genControllerTs } from './generators/gen-controller';
import { genTemplate } from "./generators";



class EggTypeGraphqlcli extends Command {
  static description = "一个egg模板生成工具";

  static flags = {
    version: flags.version({ char: "v", description: "显示当前版本号" }),
    help: flags.help({ char: "h", description: "帮助信息" }),
    // 生成模板
    template: flags.string({ char: "t", description: "生成egg ts通用模板" }),
    graphql: flags.string({
      char: "g",
      description: "根据graphql schema生成typeGraphql代码",
    }),
  };

  static args = [{ name: "template" }, { name: 'graphql' }];

  async run() {
    const { flags, args } = this.parse(EggTypeGraphqlcli);

    // parseTempalteConfig();
    if (flags.graphql) {
      const filePath = path.join(process.cwd(), flags.graphql)
      // console.log('根据graphql schema生成typeGraphql代码')
      genSchema(filePath);
    } else if (flags.template === 'simple') {
      await genTemplate();
      // parseTempalteConfig();
    }

    genRouterTs();
    genControllerTs('test');
    ThreadSpinner.shutdown();
  }
}

export = EggTypeGraphqlcli;
