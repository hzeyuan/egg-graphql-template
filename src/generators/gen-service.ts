import { eggProject } from '.'
import { ROOT } from '../utils/common/vars';
import * as path from 'path';
import { firstUpperCase } from '../utils/common/tools';
import { Scope } from 'ts-morph';
export const genServiceTs = (name: string) => {
    const filePath = path.join(ROOT, 'dist', 'app', 'service', `${name}.ts`);
    let serviceTs = eggProject.addSourceFileAtPathIfExists(filePath,);
    if (!serviceTs) {
        serviceTs = eggProject.createSourceFile(filePath, 'import { Service } from "egg";');
        const aClass = serviceTs.addClass({ name: firstUpperCase(name) }).setExtends('Service').setIsDefaultExport(true);
        aClass.addMethod({ isStatic: true, name: 'index', statements: [' const { ctx } = this;', ''] }).setIsAsync(true).setScope(Scope.Public)
        serviceTs.save();
    }
}