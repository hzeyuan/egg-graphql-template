import { Service } from "egg";

export default class {{name}} extends Service {
  public async sayHi(name: string) {
    return name;
  }
}