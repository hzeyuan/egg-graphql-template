import { Application } from "egg";

export default (app: Application) => {
  const { controller, router } = app;

  router.get("/sample", controller.sample.index);
  router.get("/sample2", controller.sample2.index);
  router.get("/sample3", controller.sample3.index);
  // {{nextRouter}}
};
