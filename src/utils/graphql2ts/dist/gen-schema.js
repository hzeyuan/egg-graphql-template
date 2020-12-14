"use strict";
exports.__esModule = true;
exports.genResolver = exports.genType = exports.genSchema = void 0;
var load_1 = require("@graphql-tools/load");
var graphql_1 = require("graphql");
var graphql_file_loader_1 = require("@graphql-tools/graphql-file-loader");
var path = require("path");
var vars_1 = require("../common/vars");
// import * as traverse from 'traverse';
var ts_morph_1 = require("ts-morph");
var excludeElement = ['Int', 'Float', 'Boolean', 'String'];
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
exports.genSchema = function (filePath) {
    var project = new ts_morph_1.Project({ tsConfigFilePath: "tsconfig.json" });
    // 加载gql文件
    var graphQLSchema = load_1.loadSchemaSync(path.join(vars_1.ROOT, 'src', 'schema.gql'), {
        loaders: [new graphql_file_loader_1.GraphQLFileLoader()]
    });
    var m = graphQLSchema.getTypeMap();
    var typeKeys = Object.keys(m).filter(function (x) { return !(x.startsWith('__') || excludeElement.indexOf(x) !== -1); });
    typeKeys.forEach(function (key) {
        var namedType = m[key];
        var schemaFile;
        if (key === 'Query') {
            exports.genResolver(filePath, project, namedType);
            //todo 处理 query
        }
        else if (key === 'Mutation') {
            exports.genResolver(filePath, project, namedType, 'mutation');
            // todo 处理mutation
        }
        else {
            exports.genType(filePath, project, namedType);
        }
    });
    project.save();
};
exports.genType = function (filePath, project, namedType) {
    var name = namedType.name;
    var needImport = "import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';";
    var schemaFile = project.createSourceFile(filePath + "/graphql/schema/" + name + ".ts", needImport);
    console.log('isObjectType(namedType)', graphql_1.isObjectType(namedType));
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
            .organizeImports()
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
        var schemaFile = project.createSourceFile(filePath + "/graphql/" + resolverType + "/" + queryName + ".ts", "import { Context } from 'egg';\n            import { Arg, Ctx, Query, Resolver ,Mutation } from 'type-graphql';\n            import { " + fieldsType2String + " } from '../schema/" + fieldsType2String + "';");
        // query 参数拼接
        var args = fields[queryName].args.map(function (arg) {
            var argsType = arg.type;
            return "@Arg('" + arg.name + "') " + arg.name + (graphql_1.isNonNullType(argsType) ? '' : '?') + ":" + graphql2jsType(argsType.toString()) + ",";
        }).join('\n');
        schemaFile.addStatements("@Resolver(of => " + fieldsType2String + ")\n        export class " + queryName + "Resolver {\n          @" + (resolverType === 'query' ? 'Query' : 'Mutation') + "(returns => " + fieldsType2String + ", " + (graphql_1.isNonNullType(fieldsType) ? '' : '{ nullable: true }') + ")\n          async " + queryName.toLowerCase() + "(\n            @Ctx() ctx: Context,\n            " + args + "\n          ): Promise<" + fieldsType2String + " | null> {\n            // \u9700\u8981\u7F16\u5199\u7684\u903B\u8F91\n            return null;\n          }\n        }");
        schemaFile.fixMissingImports()
            .organizeImports()
            .formatText();
    });
};
