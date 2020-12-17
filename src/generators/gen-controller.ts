import { eggProject } from '.'
import { ROOT } from '../utils/common/vars';
import * as path from 'path';
import { firstUpperCase } from '../utils/common/tools';
import { Scope } from 'ts-morph';
export const genControllerTs = (name: string) => {
    const filePath = path.join(ROOT, 'dist', 'app', 'controller', `${name}.ts`);
    let controllerTs = eggProject.addSourceFileAtPathIfExists(filePath,);
    if (!controllerTs) {
        controllerTs = eggProject.createSourceFile(filePath, 'import { Controller } from "egg";');
        const aClass = controllerTs.addClass({ name: firstUpperCase(name) }).setExtends('Controller').setIsDefaultExport(true);

        aClass.addMethod({ isStatic: true, name: 'index', statements: [' const { ctx } = this;', ''] }).setIsAsync(true).setScope(Scope.Public)
        controllerTs.save();
    }
}