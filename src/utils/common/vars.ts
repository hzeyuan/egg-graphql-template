import * as path from "path";


export const TEMPLATE_FILE = 'template.ts'

// 根目录
export const ROOT = path.join(__dirname, "../", "../", "../");


export const DIST = path.join(ROOT, 'dist')
const TMP = path.join(ROOT, 'template')


export const TMP_ROUTER_FILE = path.join(TMP, "app", "router.ts");
export const TMP_CONTROLLER_FOLDER = path.join(TMP, "app", "controller");
export const TMP_SERVICE_FOLDER = path.join(TMP, "app", "service");
export const TMP_TYPES_SERVICE_FOLDER = path.join(TMP, "typings", 'app', "service");
export const TMP_TYPES_CONTROLLER_FOLDER = path.join(TMP, "typings", 'app', "controller");




export const DIST_ROUTER_FILE = path.join(DIST, "app", "router.ts");
export const DIST_CONTROLLER_FOLDER = path.join(DIST, "app", "controller");
export const DIST_SERVICE_FOLDER = path.join(DIST, "app", "service");
export const DIST_TYPES_SERVICE_FOLDER = path.join(DIST, "typings", 'app', "service");
export const DIST_TYPES_CONTROLLER_FOLDER = path.join(DIST, "typings", 'app', "controller");

// exprot const TYPES_DIST_



