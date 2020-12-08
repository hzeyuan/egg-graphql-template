import { Controller } from "egg";

export default class {{name}}Controller extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi("egg");
  }
}