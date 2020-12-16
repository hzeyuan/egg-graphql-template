"use strict";
/**
 * 搬运工， copy专家
 */
exports.__esModule = true;
exports.copyDir = exports.addFileInDir = void 0;
var fs = require("fs");
var path = require("path");
//在特定目录下，创建文件
exports.addFileInDir = function (fileName, dirPath, data) {
    var tarDirpath = path.join(dirPath);
    var filePath = path.join(tarDirpath, fileName);
    console.log(filePath, tarDirpath);
    if (!fs.existsSync(tarDirpath))
        return false;
    fs.writeFile(filePath, data, function (error) {
        if (error) {
            console.log("writeFile fail", error);
            return false;
        }
    });
    return true;
};
// 拷贝文件夹
exports.copyDir = function (srcPath, tarPath, filter) {
    if (filter === void 0) { filter = []; }
    var tarDirpath = path.join(tarPath);
    if (!fs.existsSync(tarDirpath))
        fs.mkdir(path.join(tarDirpath), function (err) { });
    var files = fs.readdirSync(srcPath);
    files.forEach(function (filename) {
        var filedir = path.join(srcPath, filename);
        var filterFlag = filter.some(function (item) { return item === filename; });
        if (!filterFlag) {
            var stats = fs.statSync(filedir);
            var isFile = stats.isFile();
            if (isFile) {
                // 复制文件
                var destPath = path.join(tarPath, filename);
                fs.copyFile(filedir, destPath, function (err) { });
            }
            else {
                // 创建文件夹
                var tarFiledir = path.join(tarPath, filename);
                fs.mkdir(tarFiledir, function (err) { });
                exports.copyDir(filedir, tarFiledir, filter); // 递归
            }
        }
    });
};
