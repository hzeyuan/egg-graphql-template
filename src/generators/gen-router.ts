import { eggProject } from '.'
import { ROOT } from '../utils/common/vars';
import * as path from 'path';
export const genRouterTs = () => {
    let routerTs = eggProject.addSourceFileAtPathIfExists(path.join(ROOT, 'dist', 'app', 'router.ts'));
    if (!routerTs) {
        routerTs = eggProject.createSourceFile(path.join(ROOT, 'dist', 'app', 'router.ts'), 'import { Application } from "egg";');
        routerTs.addStatements(`export default (app: Application) => {
        const { controller, router } = app;
      };`);
        routerTs.formatText();
        routerTs.save();
    }
}

const addRouter = (name: string) => {
    console.log('1')
}
