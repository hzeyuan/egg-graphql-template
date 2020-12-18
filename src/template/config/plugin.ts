import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  // 'apollo-server': {
  //   enable: true,
  //   package: 'egg-apollo-server',
  // },
  valiate: {
    enable: true,
    package: 'egg-validate',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  // graphql: {
  //   enable: true,
  //   package: 'egg-graphql',
  // },
};

export default plugin;
