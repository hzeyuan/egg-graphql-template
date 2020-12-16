import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLObjectType, GraphQLSchema, isObjectType, isNonNullType, isInputObjectType, GraphQLInputObjectType, isEnumType, GraphQLNamedType, } from 'graphql';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import * as path from 'path';
import { TypeMap, UrlLoader } from 'graphql-tools';
import { ROOT } from '../common/vars';
import * as ora from 'ora';
// import * as traverse from 'traverse';
import { Project } from "ts-morph";
import { ThreadSpinner } from "thread-spin"



const graphql2jsType = (kind: string) => {
    switch (kind) {
        case 'Int': case 'Float': case 'Int!': case 'Float!':
            return 'number'
        case 'String': case 'String!':
            return 'string'
        case 'Boolean': case 'Boolean!':
            return 'boolean'
        default:
            return kind.replace('!', '');
    }
}




export const genSchema = async (filePath: string) => {
    const spinner = new ThreadSpinner({
        text: "threaded spinner",
        spinner: "dots",
    });
    const project = new Project({ tsConfigFilePath: "tsconfig.json" });
    const graphQLSchema: GraphQLSchema = loadSchemaSync(path.join(ROOT, 'src', 'schema.gql'), {  // load from a single schema file
        loaders: [new GraphQLFileLoader()]
    });
    const m: TypeMap = graphQLSchema.getTypeMap();
    const typeKeys = Object.keys(m).filter((x) => !(x.startsWith('__') || ['Int', 'Float', 'Boolean', 'String'].indexOf(x) !== -1))
    await spinner.start('生成代码');
    typeKeys.forEach((key) => {
        const namedType = m[key]
        if (key === 'Query') {
            genResolver(filePath, project, namedType)
        } else if (key === 'Mutation') {
            genResolver(filePath, project, namedType, 'mutation')
        }
        else {
            genType(filePath, project, namedType)
        }
    })
    project.save();
    await spinner.succeed();
    await ThreadSpinner.shutdown();
}
// 生成类型定义
export const genType = (filePath: string, project: Project, namedType: GraphQLNamedType) => {
    const { name } = namedType;
    const schemaFile = project.createSourceFile(`${filePath}/graphql/schema/${name}.ts`, `import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';`);
    if (isObjectType(namedType) || isInputObjectType(namedType)) {
        const decoratorName = isObjectType(namedType) ? 'ObjectType' : isInputObjectType(namedType) ? 'InputType' : ''
        namedType as GraphQLObjectType | GraphQLInputObjectType;
        const fields = namedType.getFields();
        const fieldsKey = Object.keys(fields)
        /**
         *  添加类，同时添加装饰器函数
         * @ObjectType()
         * class Movie{
         * }
         */
        const aClass = schemaFile.addClass({
            name,
            properties: fieldsKey.map(k => ({ name: k, }))
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
        aClass.getProperties().forEach((pd, index) => {
            const key = pd.getName()
            const { type } = fields[key];
            const typeToString = type.toString();
            const args = (): string[] => {
                const args: string[] = [];
                args.push(`type => ${typeToString.replace('!', '')}`)
                pd.setType(graphql2jsType(typeToString))
                if (isNonNullType(type)) {
                    args.push(' { nullable: true }')
                } else {
                    pd.setHasQuestionToken(true);
                }
                return args;
            }
            // 添加
            pd.addDecorator({
                name: 'Field',
                arguments: args(),
            })
        })
    } else if (isEnumType(namedType)) {
        schemaFile.addEnum({
            name, members: namedType.getValues()
        }).setIsExported(true);
        schemaFile.addStatements(`registerEnumType(${name},{name:'${name}'})`)
        schemaFile.fixMissingImports()
            .organizeImports({ ensureNewLineAtEndOfFile: true })
            .fixUnusedIdentifiers()
            .formatText();
    }
}

// 生成 query语句
export const genResolver = (filePath: string, project: Project, namedType: GraphQLNamedType, resolverType = 'query') => {
    const fields = (namedType as GraphQLObjectType).getFields()
    const fieldsKey = Object.keys(fields)
    fieldsKey.forEach(queryName => {
        // query返回对象字段类型对象
        const fieldsType = fields[queryName].type
        // query返回对象字符串
        const fieldsType2String = graphql2jsType(fields[queryName].type.toString())
        const schemaFile = project.createSourceFile(`${filePath}/graphql/${resolverType}/${queryName}.ts`,
            `import { Context } from 'egg';
            import { Arg, Ctx, Query, Resolver ,Mutation } from 'type-graphql';`);
        // query 参数拼接
        const args = fields[queryName].args.map(arg => {
            const argsType = arg.type
            return `@Arg('${arg.name}') ${arg.name}${isNonNullType(argsType) ? '' : '?'}:${graphql2jsType(argsType.toString())},`
        }).join('\n')
        schemaFile.addStatements(`@Resolver(of => ${fieldsType2String})
        export class ${queryName}Resolver {
          @${resolverType === 'query' ? 'Query' : 'Mutation'}(returns => ${fieldsType2String}, ${isNonNullType(fieldsType) ? '' : '{ nullable: true }'})
          async ${queryName.toLowerCase()}(
            @Ctx() ctx: Context,
            ${args}
          ): Promise<${fieldsType2String} | null> {
            // 需要编写的逻辑
            return null;
          }
        }`)
        // schemaFile.fixMissingImports()
        //     .organizeImports({ ensureNewLineAtEndOfFile: true })
        //     .formatText();
    })
}
