import { Controller } from "egg";

export default class {{Name}}Controller extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.{{name}}.sayHi("egg");
  }
}