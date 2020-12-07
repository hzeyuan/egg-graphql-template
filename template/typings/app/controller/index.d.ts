import "egg";
import ExportAuth from "../../../app/controller/auth";
import Exportsample from "../../../app/controller/sample";
import Exportsample2 from "../../../app/controller/sample2";
import Exportsample3 from "../../../app/controller/sample3";
// {{import}}

declare module "egg" {
  interface IController {
    auth: ExportAuth;
    sample: Exportsample;
    sample2: Exportsample2;
    sample3: Exportsample3;
    // {{export}}
  }
}
