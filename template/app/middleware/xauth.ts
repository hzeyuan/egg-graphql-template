import { Application, Context } from 'egg';
// import { xerrors } from '../../config/xerror';

interface Options {
  whiteUrls?: [string] // 白名单过滤不需要校验权限
}

// const getToken = (ctx: Context, cookieKey: string): string | null => {
//   let token = null;
//   if (ctx.headers.authorization) {
//     token = ctx.headers.authorization
//       ?.replace('Bearer ', '')
//       ?.replace('bearer ', '');
//   }

//   if (!token) {
//     token = ctx.cookies ? ctx.cookies[cookieKey] : null;
//   }

//   if (!token) {
//     token = ctx.query?._authing_token;
//   }

//   return token;
// };

export default (options: Options, _app: Application) => {

  return async function (ctx: Context, next: Function) {
    
    await next();
  };
};
