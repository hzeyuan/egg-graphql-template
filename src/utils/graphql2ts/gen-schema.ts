import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import * as path from 'path';
import { TypeMap } from 'graphql-tools';
import { ROOT } from '../common/vars';
import * as traverse from 'traverse';


const excludeElement = ['Int', 'Float', 'Boolean', 'String'];
export const genSchema = () => {
    // 加载gql文件
    const schema: GraphQLSchema = loadSchemaSync(path.join(ROOT, 'src', 'test.gql'), {  // load from a single schema file
        loaders: [new GraphQLFileLoader()]
    });
    // 加载完以后，获取ast解析树
    const m: TypeMap = schema.getTypeMap();
    // console.log('测试', JSON.stringify(m))
    // 生成模板
    // @ts-ignore
    // traverse(m).forEach(function (x) {
    //     if (this.key?.startsWith('__') || this.key?.startsWith('_')) this.after(() => {
    //         this.remove();
    //     });
    // })
    const typeKeys = Object.keys(m).filter((x) => !(x.startsWith('__') || excludeElement.indexOf(x) !== -1))
    console.log()
    console.log(typeKeys);
    typeKeys.forEach((key) => {
        // 这里可以获取键的名称
        console.log('name', m[key].astNode?.name);
        // 这里获取键的类型定义
        const t = m[key] as GraphQLObjectType;
        console.log(t.getFields());
    })
    // console.log('movie', m)
}


const getType = () => {
    // const types = Object.keys(m).filter((x) => !(x.startsWith('__') || excludeElement.indexOf(x) !== -1))

}