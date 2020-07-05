---
title: ngrok 出现 Invalid Host header 的解决方案
urlname: ngrok-disable-host-check
tags:
categories:
  - 前端
  - ngrok
author: liuxy0551
copyright: true
date: 2020-07-05 21:23:32
updated: 2020-07-05 21:23:32
---

&ensp;&ensp;&ensp;&ensp;最近有个公司的甲方拿了个项目来让我们改改再用，不是熟悉的 vue 项目，记录一些点。

<!--more-->


### 一、ngrok

&ensp;&ensp;&ensp;&ensp;使用 ngrok 官网的工具，在官网登录后访问 <a href="https://dashboard.ngrok.com/get-started/setup" target="_black">https://dashboard.ngrok.com/get-started/setup</a>，按照步骤即可启动服务。浏览器访问给出的地址，出现了`Invalid Host header`字样。这是因为新版的 webpack-dev-server 出于安全考虑，默认检查 hostname，如果 hostname 不是配置内的就不能访问。


### 二、解决办法

#### 1、修改 node_modules

&ensp;&ensp;&ensp;&ensp;进入`/node_modules/_webpack-dev-server@2.11.5@webpack-dev-server/lib`，在`Server.js`中查找，将
``` javascript
if (this.disableHostCheck) return true;
```
&ensp;&ensp;&ensp;&ensp;改为：
``` javascript
return true;
```
&ensp;&ensp;&ensp;&ensp;即可，不对 hostname 做检查就返回通过。

#### 2、修改启动命令

&ensp;&ensp;&ensp;&ensp;在 script 命令中修改，添加：` --disableHostCheck=true`
```
    "scripts": {
        "dev": "npm run development",
        "development": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
        "watch": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --watch --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
        "watch-poll": "npm run watch -- --watch-poll",
        "hot": "cross-env NODE_ENV=development node_modules/webpack-dev-server/bin/webpack-dev-server.js --disableHostCheck=true --inline --hot --config=node_modules/laravel-mix/setup/webpack.config.js",
        "prod": "npm run production",
        "production": "cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --no-progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js"
    }
```
