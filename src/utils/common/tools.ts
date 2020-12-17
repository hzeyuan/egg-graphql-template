import { ExportSpecifier } from 'ts-morph';

// 首字母大写
export const firstUpperCase = (str: string) => {
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}
