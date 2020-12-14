import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFieldMap, GraphQLObjectType, GraphQLSchema, ListTypeNode, NamedTypeNode, NonNullTypeNode, typeFromAST, valueFromAST, TypeInfo, TypeNode, isNamedType, isEqualType, isOutputType, isObjectType, getOperationRootType, isNonNullType, isListType, isInputObjectType, GraphQLScalarType, GraphQLInputObjectType, isEnumType, GraphQLNamedType, } from 'graphql';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import * as path from 'path';
import { isNonNullTypeNode, TypeMap, UrlLoader } from 'graphql-tools';
import { ROOT } from '../common/vars';
import * as traverse from 'traverse';
import { FunctionDeclaration, Project, SourceFile } from "ts-morph";
const excludeElement = ['Int', 'Float', 'Boolean', 'String'];

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




export const genSchema = () => {
    const project = new Project();
    // 加载gql文件
    const graphQLSchema: GraphQLSchema = loadSchemaSync(path.join(ROOT, 'src', 'schema.gql'), {  // load from a single schema file
        loaders: [new GraphQLFileLoader()]
    });
    const m: TypeMap = graphQLSchema.getTypeMap();
    const typeKeys = Object.keys(m).filter((x) => !(x.startsWith('__') || excludeElement.indexOf(x) !== -1))
    typeKeys.forEach((key) => {
        const namedType = m[key]
        let schemaFile: SourceFile;
        if (key === 'Query') {
            genResolver(project, namedType)
            //todo 处理 query
        } else if (key === 'Mutation') {
            genResolver(project, namedType, 'mutation')
            // todo 处理mutation
        }
        else {
            genType(project, namedType)
        }
    })
    project.save();
}


export const genType = (project: Project, namedType: GraphQLNamedType) => {
    const { name } = namedType;
    const needImport = `import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';`
    const schemaFile = project.createSourceFile(`./schema/${name}.ts`, needImport);
    console.log('isObjectType(namedType)', isObjectType(namedType));
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
        console.log('enum类型')
        schemaFile.addEnum({
            name, members: namedType.getValues()
        }).setIsExported(true);
        schemaFile.addStatements(`registerEnumType(${name},{name:'${name}'})`)
    }
}

// 生成 query语句
export const genResolver = (project: Project, namedType: GraphQLNamedType, resolverType = 'query') => {
    const fields = (namedType as GraphQLObjectType).getFields()
    const fieldsKey = Object.keys(fields)
    fieldsKey.forEach(queryName => {
        // query返回对象字段类型对象
        const fieldsType = fields[queryName].type
        // query返回对象字符串
        const fieldsType2String = graphql2jsType(fields[queryName].type.toString())
        const schemaFile = project.createSourceFile(`./${resolverType}/${queryName}.ts`,
            `import { Context } from 'egg';
            import { Arg, Ctx, Query, Resolver ,Mutation } from 'type-graphql';
            import { ${fieldsType2String} } from '../schema/${fieldsType2String}';`);
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
    })
}


// 生成 Muation 语句
export const genMuation = () => {

}