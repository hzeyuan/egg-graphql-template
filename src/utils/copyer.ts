/**
 * 搬运工， copy专家
 */

import * as fs from "fs";
import * as path from "path";

//在特定目录下，创建文件
export const addFileInDir = (
  fileName: string,
  dirPath: string,
  data: any
): boolean => {
  const tarDirpath = path.join(dirPath);
  const filePath = path.join(tarDirpath, fileName);
  console.log(filePath, tarDirpath);
  if (!fs.existsSync(tarDirpath)) return false;
  fs.writeFile(filePath, data, (error) => {
    if (error) {
      console.log("writeFile fail", error);
      return false;
    }
  });
  return true;
};

// 拷贝文件夹
export const copyDir = (
  srcPath: string,
  tarPath: string,
  filter: string[] = []
): void => {
  const tarDirpath = path.join(tarPath);
  if (!fs.existsSync(tarDirpath))
    fs.mkdir(path.join(tarDirpath), (err: any) => {});
  fs.readdir(srcPath, (err: NodeJS.ErrnoException | null, files: string[]) => {
    if (err !== null) console.error(err);
    files.forEach(function (filename: string) {
      let filedir = path.join(srcPath, filename);
      let filterFlag = filter.some((item) => item === filename);
      if (!filterFlag) {
        fs.stat(
          filedir,
          function (
            errs: NodeJS.ErrnoException | null,
            stats: { isFile: () => any }
          ) {
            let isFile = stats.isFile();
            if (isFile) {
              // 复制文件
              const destPath = path.join(tarPath, filename);
              fs.copyFile(filedir, destPath, (err: any) => {});
            } else {
              // 创建文件夹
              let tarFiledir = path.join(tarPath, filename);
              fs.mkdir(tarFiledir, (err: NodeJS.ErrnoException | null) => {});
              copyDir(filedir, tarFiledir, filter); // 递归
            }
          }
        );
      }
    });
  });
};
