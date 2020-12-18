import { ThreadSpinner } from 'thread-spin';
import * as eggTsHelper from 'egg-ts-helper';
import * as path from "path";
import { Project } from "ts-morph";
import { copyDir } from '../utils/copyer';
import { ROOT } from '../utils/common/vars';
import { genRouterTs } from './gen-router';
import { genControllerTs } from './gen-controller';
import { genServiceTs } from './gen-service';

export const eggProject = new Project({ tsConfigFilePath: "tsconfig.json" });


export const spinner = new ThreadSpinner({
    spinner: "dots",
});

export const tsHelper = eggTsHelper.createTsHelperInstance({
    cwd: path.join(process.cwd(), 'dist'),
    autoRemoveJs: true,
});


export const genTemplate = async () => {
    const templateDir = path.join(ROOT, "template");
    const sourceDir = path.join(ROOT, "dist");
    copyDir(templateDir, sourceDir, ["node_modules"]);
    genRouterTs();
    genControllerTs('test');
    genServiceTs('test')
}
