import { Service } from "egg";

export default class {{Name}} extends Service {
  public async sayHi(name: string) {
    return name;
  }
}