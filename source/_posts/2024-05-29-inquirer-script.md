---
title: 用 inquirer 写交互式的脚本
urlname: inquirer-script
tags:
  - git
categories:
  - 前端
author: liuxy0551
copyright: true
date: 2024-05-29 21:39:46
updated: 2024-05-29 21:39:46
---

&emsp;&emsp;最近开发 npm 包，发现基于 [inquirer.js](https://github.com/SBoudrias/Inquirer.js) 写交互式脚本很方便，尤其是一些部署脚本和打版本号之类的脚步，记录一下。

<!--more-->

### 一、打版本号

![](https://images-hosting.liuxianyu.cn/posts/inquirer-script/1.gif)

&emsp;&emsp;前置依赖：

``` bash
npm i inquirer standard-version -D
```

&emsp;&emsp;参考 package.json：

``` json
{
  "name": "release-script",
  "version": "0.0.3",
  "scripts": {
    "release": "node ./scripts/release.js"
  },
  "devDependencies": {
    "cz-conventional-changelog": "^3.3.0",
    "inquirer": "^9.2.22",
    "standard-version": "^9.5.0"
  },
  "type": "module",
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}
```

![](https://images-hosting.liuxianyu.cn/posts/inquirer-script/2.png)


&emsp;&emsp;对应的 [release.js](https://gitee.com/liuxy0551/release-script/blob/master/scripts/release.js)

``` js
import inquirer from "inquirer";
import { spawn } from "child_process";
// const inquirer = require('inquirer');
// const { spawn } = require('child_process');

const runCommand = (command, args) => {
    return new Promise((resolve, reject) => {
        const executedCommand = spawn(command, args, {
            stdio: "inherit",
            shell: true,
        });
        executedCommand.on("error", (error) => {
            reject({ error, message: null, code: null });
        });
        executedCommand.on("exit", (code) => {
            if (code === 0) {
                resolve({ error: null, message: null, code });
            } else {
                reject({ error: null, message: null, code });
            }
        });
        executedCommand.on("message", (message) => {
            resolve({ error: null, message: message, code: null });
        });
    });
};

function execStandardVersion(res) {
    const { bumpType, isPrerelease, prereleaseType, tagPrefix } = res;

    let cmd = `standard-version --release-as ${bumpType} `;
    if (isPrerelease) {
        cmd += ` --prerelease ${prereleaseType} `;
    }
    cmd += ` --tag-prefix ${tagPrefix} `;
    cmd += " --infile CHANGELOG.md ";

    console.info(`\nExecuting: ${cmd} \n`);

    runCommand(cmd)
        .then(({ message }) => {
            console.info("\nPlease checkout recent commit, and then");
            console.info("Push branch and new tag to git repository, publish package to npm");
            // message && console.info(message)
        })
        .catch(({ error, code }) => {
            code && console.error("Error: process exit code" + code);
            error && console.error(error);
        });
}

inquirer
    .prompt([
        {
            type: "list",
            name: "bumpType",
            message: "Which type you want bump",
            choices: ["major", "minor", "patch"],
            loop: false,
        },
        {
            type: "confirm",
            name: "isPrerelease",
            message: "Is a prerelease? Default is no",
            default: false,
            loop: false,
        },
        {
            type: "list",
            name: "prereleaseType",
            message: "What is the current stage",
            choices: ["alpha", "beta"],
            when: (answer) => {
                return answer.isPrerelease;
            },
            loop: false,
        },
        {
            type: "input",
            name: "tagPrefix",
            message: "Input git tag prefix, default is v",
            default: "v",
            loop: false,
        },
    ])
    .then(execStandardVersion);
```


### 二、部署脚步

&emsp;&emsp;待补充
