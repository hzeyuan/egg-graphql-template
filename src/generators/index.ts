import { ThreadSpinner } from 'thread-spin';
import { Project } from "ts-morph";

export const eggProject = new Project({ tsConfigFilePath: "tsconfig.json" });


export const spinner = new ThreadSpinner({
    spinner: "dots",
});