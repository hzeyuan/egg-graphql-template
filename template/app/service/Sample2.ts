import { Service } from "egg";

export default class Sample extends Service {
  public async sayHi(name: string) {
    return name;
  }
}
