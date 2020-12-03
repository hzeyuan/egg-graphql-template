import { Command, flags } from '@oclif/command'

class EggTypeGraphqlcli extends Command {
  static description = '一个egg模板生成工具'

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),

    // 生成模板
    force: flags.boolean({ char: 't', description: '生成egg ts通用模板' }),
  }

  // static args = [{ name: 'file' }]

  async run() {
    const { args, flags } = this.parse(EggTypeGraphqlcli)
    this.log(`${args.name}`);

  }
}

export = EggTypeGraphqlcli
