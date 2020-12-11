import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFieldMap, GraphQLObjectType, GraphQLSchema, ListTypeNode, NamedTypeNode, NonNullTypeNode } from 'graphql';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import * as path from 'path';
import { TypeMap } from 'graphql-tools';
import { ROOT } from '../common/vars';
import * as traverse from 'traverse';
import { ClassDeclaration, Project, PropertyDeclaration, StructureKind, SyntaxKind, WriterFunction, Decorator } from "ts-morph";
const excludeElement = ['Int', 'Float', 'Boolean', 'String'];

const types2js = (kind: string) => {
    switch (kind) {
        case 'Int' || 'Float':
            return 'number'
        case 'String':
            return 'string'
        default:
            return kind;
    }
}

export class genTypeGraphql {

}


export const genSchema = () => {
    // 加载gql文件
    const schema: GraphQLSchema = loadSchemaSync(path.join(ROOT, 'src', 'test.gql'), {  // load from a single schema file
        loaders: [new GraphQLFileLoader()]
    });
    const m: TypeMap = schema.getTypeMap();
    let schemaFile;
    let className: string;
    let aClass;
    const typeKeys = Object.keys(m).filter((x) => !(x.startsWith('__') || excludeElement.indexOf(x) !== -1))
    const project = new Project();
    typeKeys.forEach((key) => {
        className = m[key].astNode?.name.value!;
        schemaFile = project.createSourceFile(`./test/${className}.ts`, `import { Field, Int, ObjectType, } from 'type-graphql';`);
        const t = m[key] as GraphQLObjectType;
        const fields = t.getFields();
        const fieldsKey = Object.keys(fields)
        aClass = schemaFile.addClass({
            name: className,
        });
        aClass.addDecorator({ name: 'ObjectType' }).setIsDecoratorFactory(true)
        const PropertyDeclaration = aClass.addProperties(fieldsKey.map(k => {
            return {
                name: k,
            }
        }));
        PropertyDeclaration.forEach((pd, index) => {
            console.log('name', pd.getName());
            const args = (): string[] => {
                const key = pd.getName()
                const args: string[] = [];
                console.log('ttt', fields[key].astNode?.type);
                if (fields[key].astNode?.type.kind === 'NamedType') {
                    pd.setHasQuestionToken(true);
                    const type = (fields[key].astNode?.type as NamedTypeNode).name.value
                    args.push(`type => ${type}`)
                    pd.setType(types2js(type))
                } else if (fields[key].astNode?.type.kind === 'ListType') {
                    // todo  list类型时，处理
                } else if (fields[key].astNode?.type.kind === 'NonNullType') {
                    const type = ((fields[key].astNode?.type as NonNullTypeNode).type as NamedTypeNode).name.value
                    args.push(`type => ${type}`);
                    pd.setType(types2js(type))
                    args.push(' { nullable: true }')
                }
                console.log('args', args);
                return args;
            }
            // 添加
            pd.addDecorator({
                name: 'Field',
                arguments: args(),
            })
        })
        project.save();
    })
}


const getType = () => {
    // const types = Object.keys(m).filter((x) => !(x.startsWith('__') || excludeElement.indexOf(x) !== -1))

}