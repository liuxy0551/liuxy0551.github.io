---
title: WebStorm、vscode 配置识别 vue 项目的别名 alias @
urlname: webstorm-vscode-alias
tags:
  - vscode
  - WebStorm
categories:
  - 开发工具
  - vscode
author: liuxy0551
copyright: true
date: 2020-05-29 11:40:21
updated: 2020-05-29 11:40:21
---

&emsp;&emsp;记录一下如何配置可以让 WebStorm 和 vscode 识别 Vue CLI 3 项目中的别名 alias @。

<!--more-->


### 一、WebStorm

#### 1、全局设置 `推荐`

&emsp;&emsp;可以在 WebStorm 的项目空间中添加一个`alias.config.js`文件，然后使用该文件。

```
/Users/liuyi/Library/Preferences/WebStorm2019.3/alias.config.js
```

``` javascript
/**
 * 由于 Vue CLI 3 不再使用传统的 webpack 配置文件，故 WebStorm 无法识别别名
 * 本文件对项目无任何作用，仅作为 WebStorm 识别别名用
 * 进入 WebStorm preferences -> Language & Framework -> JavaScript -> Webpack，选择这个文件即可
 * */
const resolve = dir => require('path').join(__dirname, dir)

module.exports = {
  resolve: {
    alias: {
      '@': resolve('src')
    }
  }
}
```

![](https://liuxianyu.cn/image-hosting/posts/webstorm-vscode-alias/1.png)

#### 2、项目单独设置

&emsp;&emsp;参考 [在 WebStorm 中，配置能够识别 Vue CLI 3 创建的项目的别名 alias @](https://juejin.im/post/5c9477ad6fb9a070ce31b050)
&emsp;&emsp;进入 WebStorm -> Preferences -> Language & Framework -> JavaScript -> Webpack，选择`项目目录\node_modules\@vue\cli-service\webpack.config.js`即可。

```
/Users/liuyi/Desktop/Projects/Shengya/zjedu-sky-admin/node_modules/@vue/cli-service/webpavk.config.js
```


### 二、vscode

&emsp;&emsp;vscode 中 vue 项目的`@`不会提示，在根目录添加一个`jsconfig.json`文件，即可在 script 标签中使用`@`。

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
