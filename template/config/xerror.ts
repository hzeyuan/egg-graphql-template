/**
 * 业务自定义异常信息
 */
export class XError extends Error {
  code: number; // 错误码
  status?: number; // http返回码
  raw?: Error; // 原始错误信息

  constructor(code: number, message?: string, status?: number, raw?: Error) {
    super(message);
    this.code = code;
    this.status = status;
    this.raw = raw;
  }
}

export const xerrors = {

  // 通用
  runtime(message: string): XError { return new XError(10001, message); },
  unauthorized(): XError { return new XError(10002, '访问未授权', 401); },
  invokeApiError(api: string, code?: number, message?: string) { return new XError(10003, `调用服务失败。接口：${api}，错误码：${code}, 错误消息：${message}`) },
  requiredParams(params: string): XError { return new XError(10004, `缺少参数${params}`) },

  // 用户
  userNotExist(id: string) { return new XError(10100, `用户${id}不存在`); },
  verifyCodeError() { return new XError(10101, '验证码错误'); },
  userNotExistByPhone(phone: string) { return new XError(10102, `手机号${phone}的用户不存在`); },
  userNotExistByEmail(email: string) { return new XError(10103, `邮箱为${email}的用户不存在`); },

  // 用户池
  userPoolNotExist(id: string) { return new XError(10200, `用户池${id}不存在`); },
  inconsistentSecret() { return new XError(10201, '密钥不一致'); },
  userPoolSmsConfigNotExist(id: string) { return new XError(10202, `用户池${id}没有短信配置`) },
  userPoolAppNotExist(id: string) { return new XError(10203, `用户池${id}应用配置不存在`)},

  // 配置模板
  configTemplateNotExist(key: string) { return new XError(10200, `配置模板key: ${key}不存在`); },

  //发送短信验证码
  sendSmsFailed(phone: string) { return new XError(10210, `发送短信至手机号: ${phone}失败`); },

  //社会化登陆
  connectionDisabled(connection: string) { return new XError(10221, `未开启${connection}登录`)},
};
