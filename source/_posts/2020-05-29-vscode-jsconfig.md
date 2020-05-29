---
title: vscode 中 vue 项目的 @ 路径
urlname: vscode-jsconfig
tags:
  - vscode
categories:
  - 前端
  - vscode
author: liuxy0551
copyright: true
date: 2020-05-29 11:40:21
updated: 2020-05-29 11:40:21
---

&ensp;&ensp;&ensp;&ensp;vscode 中 vue 项目的`@`不会提示，在根目录添加一个`jsconfig.json`文件，即可在 script 标签中使用`@`

<!--more-->

```
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "target": "ES6",
    "module": "commonjs",
    "allowSyntheticDefaultImports": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```
