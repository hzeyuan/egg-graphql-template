import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFieldMap, GraphQLObjectType, GraphQLSchema, ListTypeNode, NamedTypeNode, NonNullTypeNode, typeFromAST, valueFromAST, TypeInfo, TypeNode, isNamedType, isEqualType, isOutputType, isObjectType, getOperationRootType, isNonNullType, isListType, isInputObjectType, GraphQLScalarType, GraphQLInputObjectType, isEnumType, } from 'graphql';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import * as path from 'path';
import { isNonNullTypeNode, TypeMap } from 'graphql-tools';
import { ROOT } from '../common/vars';
import * as traverse from 'traverse';
import { Project, SourceFile } from "ts-morph";
const excludeElement = ['Int', 'Float', 'Boolean', 'String', 'Query', 'Mutation'];

const graphql2jsType = (kind: string) => {
    switch (kind) {
        case 'Int': case 'Float': case 'Int!': case 'Float!':
            return 'number'
        case 'String': case 'String!':
            return 'string'
        default:
            return kind;
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
        const { name } = namedType
        console.log('className ==>', name);
        const schemaFile = project.createSourceFile(`./test/${name}.ts`, `import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';`);
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
            // schemaFile.addFunction({
            //     name: 'registerEnumType',
            //     parameters: [{ name: 'SortByEnum' }, {
            //         name: `{
            //             name: '${name}',
            //           }` , type: 'object'
            //     }]
            // })
        }

    })
    project.save();
}
