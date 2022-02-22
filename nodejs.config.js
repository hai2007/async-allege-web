const fs = require('fs');
const path = require('path');

module.exports = {

    // 当前配置文件的相对路径上下文
    path: __dirname,

    // package.json路径
    pkg: '.',

    // 定义任务
    task: {
        compileStyle(nodejs, pkg, rootPath) {
            let source = fs.readFileSync(path.join(rootPath, "./src/style.scss"), 'utf-8');
            let cssCode = require('@hai2007/algorithm').scss(source);
            fs.writeFileSync(path.join(rootPath, "./.style.js"), `import addStylesClient from './src/addStylesClient.js';
            addStylesClient(${JSON.stringify(cssCode)});`);
        },
        default(nodejs, pkg, rootPath) {

            [
                'async-allege-web.js',
                'async-allege-web.min.js'
            ].forEach(item => {

                let filePath = path.join(rootPath, "./dist/" + item);

                let banner =
                    `/*!
 * Async Allege Web - ${pkg.description}
 * ${pkg.repository.url}
 *
 * author ${pkg.author} < https://hai2007.gitee.io/sweethome >
 *
 * version ${pkg.version}
 *
 * Copyright (c) 2022 hai2007 走一步，再走一步。
 * Released under the ${pkg.license} license
 *
 * Date:${new Date()}
 */`;

                fs.writeFileSync(filePath, banner + "\n" + fs.readFileSync(filePath));

                try {
                    fs.unlinkSync(path.join(rootPath, "./.style.js"));
                } catch (e) { }

            });

        }
    }

};
