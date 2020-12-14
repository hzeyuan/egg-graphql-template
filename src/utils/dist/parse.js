"use strict";
/**
 * 解析template 提取关键信息
 */
exports.__esModule = true;
exports.gendts = exports.addServices = exports.addControllers = exports.addControllersAndService = exports.addSimpleRouters = exports.parseTempalteConfig = void 0;
var path = require("path");
var fs = require("fs");
var prettier = require("prettier");
var vars_1 = require("./common/vars");
// 首字母大写
var firstUpperCase = function (str) {
    return str.toLowerCase().replace(/( |^)[a-z]/g, function (L) { return L.toUpperCase(); });
};
// 解析本地配置文件
exports.parseTempalteConfig = function (config) {
    if (config === void 0) { config = "template.config.json"; }
    var templateConfig = path.join(vars_1.ROOT, config);
    var dataStr = fs.readFileSync(templateConfig).toString();
    var templateData = JSON.parse(dataStr);
    var sampleRouters = templateData.router.simple;
    exports.addSimpleRouters(sampleRouters);
    exports.addControllersAndService(sampleRouters);
    exports.gendts(sampleRouters);
};
exports.addSimpleRouters = function (sampleRouters) {
    var dataStr = fs.readFileSync(vars_1.TMP_ROUTER_FILE).toString();
    sampleRouters.forEach(function (router) {
        dataStr = render(dataStr, {
            nextRouter: "router." + router.methods + "('" + router.url + "', controller." + router.name + ".index);" +
                "\n// {{nextRouter}}"
        }, 'line');
    });
    fs.writeFileSync(vars_1.DIST_ROUTER_FILE, prettier.format(dataStr, { parser: 'typescript' }));
};
// 添加controller 和 service
exports.addControllersAndService = function (sampleRouters) {
    sampleRouters.forEach(function (router) {
        exports.addControllers(router.name);
        exports.addServices(router.name);
    });
};
exports.addControllers = function (name) {
    var tmpFileName = path.join(vars_1.TMP_CONTROLLER_FOLDER, vars_1.TEMPLATE_FILE);
    var distFileName = path.join(vars_1.DIST_CONTROLLER_FOLDER, name + ".ts");
    var dataStr = fs.readFileSync(tmpFileName).toString();
    dataStr = render(dataStr, { name: name, Name: firstUpperCase(name) }, 'key');
    fs.writeFile(distFileName, prettier.format(dataStr, { parser: 'typescript' }), function () {
        console.log(distFileName + " \u521B\u5EFA\u6210\u529F");
    });
};
exports.addServices = function (name) {
    var tmpFileName = path.join(vars_1.TMP_SERVICE_FOLDER, vars_1.TEMPLATE_FILE);
    var distFileName = path.join(vars_1.DIST_SERVICE_FOLDER, name + ".ts");
    var dataStr = fs.readFileSync(tmpFileName).toString();
    dataStr = render(dataStr, { Name: firstUpperCase(name) }, 'key');
    fs.writeFile(distFileName, prettier.format(dataStr, { parser: 'typescript' }), function () {
        console.log(distFileName + " \u521B\u5EFA\u6210\u529F");
    });
};
exports.gendts = function (sampleRouters) {
    var tmp;
    var Icontroller = fs.readFileSync(path.join(vars_1.TMP_TYPES_CONTROLLER_FOLDER, vars_1.TEMPLATE_FILE)).toString();
    var IService = fs.readFileSync(path.join(vars_1.TMP_TYPES_SERVICE_FOLDER, vars_1.TEMPLATE_FILE)).toString();
    var typings = [{
            folder: vars_1.DIST_TYPES_CONTROLLER_FOLDER,
            template: Icontroller,
            fill: {
                "import": "import Export{{Name}} from '../../../app/controller/{{name}}';",
                "export": '{{name}}: Export{{Name}};'
            }
        }, {
            folder: vars_1.DIST_TYPES_SERVICE_FOLDER,
            template: IService,
            fill: {
                "import": "import Export{{Name}} from '../../../app/service/{{name}}';",
                "export": '{{name}}: AutoInstanceType<typeof Export{{Name}}>;'
            }
        }];
    typings.map(function (t) {
        tmp = t.template;
        var fileName = path.join(t.folder, "index.d.ts");
        sampleRouters.forEach(function (router) {
            tmp = render(tmp, {
                "import": render(t.fill["import"], { name: router.name, Name: firstUpperCase(router.name) }) + "\n // {{import}}",
                "export": render(t.fill["export"], { name: router.name, Name: firstUpperCase(router.name) }) + "\n // {{export}}"
            }, 'line');
        });
        fs.writeFile(fileName, prettier.format(tmp, { parser: 'typescript' }), function () {
            console.log('gendts 写入完成');
        });
    });
};
var render = function (str, context, type) {
    if (type === void 0) { type = 'key'; }
    var pattern;
    switch (type) {
        case 'key':
            pattern = /{{(.*?)}}/g;
            break;
        case 'line':
            pattern = /\/\/ {{(.*?)}}/g;
            break;
        default:
            console.log('111', type);
            throw new Error('渲染失败');
    }
    return str.replace(pattern, function (_, key) { return context[key.trim()]; });
};
