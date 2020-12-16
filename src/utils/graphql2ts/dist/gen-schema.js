"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.genResolver = exports.genType = exports.genSchema = void 0;
var load_1 = require("@graphql-tools/load");
var graphql_1 = require("graphql");
var graphql_file_loader_1 = require("@graphql-tools/graphql-file-loader");
var path = require("path");
var vars_1 = require("../common/vars");
// import * as traverse from 'traverse';
var ts_morph_1 = require("ts-morph");
var thread_spin_1 = require("thread-spin");
var graphql2jsType = function (kind) {
    switch (kind) {
        case 'Int':
        case 'Float':
        case 'Int!':
        case 'Float!':
            return 'number';
        case 'String':
        case 'String!':
            return 'string';
        case 'Boolean':
        case 'Boolean!':
            return 'boolean';
        default:
            return kind.replace('!', '');
    }
};
exports.genSchema = function (filePath) { return __awaiter(void 0, void 0, void 0, function () {
    var spinner, project, graphQLSchema, m, typeKeys;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                spinner = new thread_spin_1.ThreadSpinner({
                    text: "threaded spinner",
                    spinner: "dots"
                });
                project = new ts_morph_1.Project({ tsConfigFilePath: "tsconfig.json" });
                graphQLSchema = load_1.loadSchemaSync(path.join(vars_1.ROOT, 'src', 'schema.gql'), {
                    loaders: [new graphql_file_loader_1.GraphQLFileLoader()]
                });
                m = graphQLSchema.getTypeMap();
                typeKeys = Object.keys(m).filter(function (x) { return !(x.startsWith('__') || ['Int', 'Float', 'Boolean', 'String'].indexOf(x) !== -1); });
                return [4 /*yield*/, spinner.start('生成代码')];
            case 1:
                _a.sent();
                typeKeys.forEach(function (key) {
                    var namedType = m[key];
                    if (key === 'Query') {
                        exports.genResolver(filePath, project, namedType);
                    }
                    else if (key === 'Mutation') {
                        exports.genResolver(filePath, project, namedType, 'mutation');
                    }
                    else {
                        exports.genType(filePath, project, namedType);
                    }
                });
                project.save();
                return [4 /*yield*/, spinner.succeed()];
            case 2:
                _a.sent();
                return [4 /*yield*/, thread_spin_1.ThreadSpinner.shutdown()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
// 生成类型定义
exports.genType = function (filePath, project, namedType) {
    var name = namedType.name;
    var schemaFile = project.createSourceFile(filePath + "/graphql/schema/" + name + ".ts", "import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';");
    if (graphql_1.isObjectType(namedType) || graphql_1.isInputObjectType(namedType)) {
        var decoratorName = graphql_1.isObjectType(namedType) ? 'ObjectType' : graphql_1.isInputObjectType(namedType) ? 'InputType' : '';
        namedType;
        var fields_1 = namedType.getFields();
        var fieldsKey = Object.keys(fields_1);
        /**
         *  添加类，同时添加装饰器函数
         * @ObjectType()
         * class Movie{
         * }
         */
        var aClass = schemaFile.addClass({
            name: name,
            properties: fieldsKey.map(function (k) { return ({ name: k }); })
        });
        aClass.setIsExported(true).addDecorator({ name: decoratorName }).setIsDecoratorFactory(true);
        /**
         *  为类添加属性
         * class Movie{
         *  id:string;
         *  title:string;
         * }
         */
        // 为属性 添加装饰器 example: @Field(type => Int)
        aClass.getProperties().forEach(function (pd, index) {
            var key = pd.getName();
            var type = fields_1[key].type;
            var typeToString = type.toString();
            var args = function () {
                var args = [];
                args.push("type => " + typeToString.replace('!', ''));
                pd.setType(graphql2jsType(typeToString));
                if (graphql_1.isNonNullType(type)) {
                    args.push(' { nullable: true }');
                }
                else {
                    pd.setHasQuestionToken(true);
                }
                return args;
            };
            // 添加
            pd.addDecorator({
                name: 'Field',
                arguments: args()
            });
        });
    }
    else if (graphql_1.isEnumType(namedType)) {
        schemaFile.addEnum({
            name: name,
            members: namedType.getValues()
        }).setIsExported(true);
        schemaFile.addStatements("registerEnumType(" + name + ",{name:'" + name + "'})");
        schemaFile.fixMissingImports()
            .organizeImports({ ensureNewLineAtEndOfFile: true })
            .fixUnusedIdentifiers()
            .formatText();
    }
};
// 生成 query语句
exports.genResolver = function (filePath, project, namedType, resolverType) {
    if (resolverType === void 0) { resolverType = 'query'; }
    var fields = namedType.getFields();
    var fieldsKey = Object.keys(fields);
    fieldsKey.forEach(function (queryName) {
        // query返回对象字段类型对象
        var fieldsType = fields[queryName].type;
        // query返回对象字符串
        var fieldsType2String = graphql2jsType(fields[queryName].type.toString());
        var schemaFile = project.createSourceFile(filePath + "/graphql/" + resolverType + "/" + queryName + ".ts", "import { Context } from 'egg';\n            import { Arg, Ctx, Query, Resolver ,Mutation } from 'type-graphql';");
        // query 参数拼接
        var args = fields[queryName].args.map(function (arg) {
            var argsType = arg.type;
            return "@Arg('" + arg.name + "') " + arg.name + (graphql_1.isNonNullType(argsType) ? '' : '?') + ":" + graphql2jsType(argsType.toString()) + ",";
        }).join('\n');
        schemaFile.addStatements("@Resolver(of => " + fieldsType2String + ")\n        export class " + queryName + "Resolver {\n          @" + (resolverType === 'query' ? 'Query' : 'Mutation') + "(returns => " + fieldsType2String + ", " + (graphql_1.isNonNullType(fieldsType) ? '' : '{ nullable: true }') + ")\n          async " + queryName.toLowerCase() + "(\n            @Ctx() ctx: Context,\n            " + args + "\n          ): Promise<" + fieldsType2String + " | null> {\n            // \u9700\u8981\u7F16\u5199\u7684\u903B\u8F91\n            return null;\n          }\n        }");
        // schemaFile.fixMissingImports()
        //     .organizeImports({ ensureNewLineAtEndOfFile: true })
        //     .formatText();
    });
};
