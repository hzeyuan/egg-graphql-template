import { Application } from "egg";

export default (app: Application) => {
  const { controller, router } = app;

  router.get("/", controller.home.index);
  router.get("/sample", controller.sample.index);
  router.get("/sample", controller.sample.index);
  // {{nextRouter}}
};
