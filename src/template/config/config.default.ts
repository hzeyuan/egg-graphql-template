import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import graphqlConf from './graphql.conf';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  config.keys = 'v&YOi#*s80QM5pE7UDLCAjy#$BQekY7Q';

  config.graphql = graphqlConf;

  config.middleware = [ 'graphql', 'errorHandler' ];

  config.security = {
    // domainWhiteList: [ 'http://127.0.0.1:8000' ],
    csrf: {
      ignore: () => true,
    },
  };
  config.proxy = true;
  config.cors = {
    credentials: true,
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  config.onerror = {
    // all(err, ctx) {
    //   // 在此处定义针对所有响应类型的错误处理方法
    //   // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
    //   ctx.body = 'error';
    //   ctx.status = 500;
    // },
    html(err, ctx) {
      ctx.body = '<h3>error</h3>';
      ctx.status = 500;
    },
    json(err, ctx) {
      ctx.body = { message: 'error' };
      ctx.status = 500;
    },
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.coÎÎm/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
