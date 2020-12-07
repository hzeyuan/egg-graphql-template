import { Controller } from "egg";

export default class SampleController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi("egg");
  }
}
