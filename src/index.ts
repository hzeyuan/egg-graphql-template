import { Command, flags } from '@oclif/command'
import { Input } from '@oclif/parser/lib/args'

class EggTypeGraphqlcli extends Command {
  static description = '一个egg模板生成工具'

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    // 生成模板
    template: flags.string({ char: 't', description: '生成egg ts通用模板' }),
  }

  static args = [{ name: 'template' },]

  async run() {
    const { flags, args } = this.parse(EggTypeGraphqlcli)
    this.log(`${flags.template} -- ${args.template}`);

  }
}

export = EggTypeGraphqlcli
