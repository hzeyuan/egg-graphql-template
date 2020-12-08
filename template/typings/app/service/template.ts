import "egg";
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<
  T,
  U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T
  > = U extends AnyClass ? InstanceType<U> : U;

// {{import}}

declare module "egg" {
  interface IService {
    auth: AutoInstanceType<typeof ExportAuth>;
    // {{export}}
  }
}
