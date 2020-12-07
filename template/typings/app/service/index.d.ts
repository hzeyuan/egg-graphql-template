import "egg";
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<
  T,
  U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T
> = U extends AnyClass ? InstanceType<U> : U;
import ExportAuth from "../../../app/service/Auth";
import Exportsample from "../../../app/service/sample";
import Exportsample2 from "../../../app/service/sample2";
import Exportsample3 from "../../../app/service/sample3";
// {{import}}

declare module "egg" {
  interface IService {
    auth: AutoInstanceType<typeof ExportAuth>;
    sample: AutoInstanceType<typeof ExportSample>;
    sample2: AutoInstanceType<typeof ExportSample2>;
    sample3: AutoInstanceType<typeof ExportSample3>;
    // {{export}}
  }
}
