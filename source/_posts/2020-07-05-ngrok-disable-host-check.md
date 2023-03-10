---
title: ngrok 出现 Invalid Host header 的解决方案
urlname: ngrok-disable-host-check
tags:
  - ngrok
categories:
  - ngrok
author: liuxy0551
copyright: true
date: 2020-07-05 21:23:32
updated: 2020-07-05 21:23:32
---

&emsp;&emsp;最近有个公司的甲方拿了个项目来让我们改改再用，不是熟悉的 vue 项目，记录一些点。

<!--more-->


&emsp;&emsp;使用 ngrok 工具，在浏览器访问给出的地址，出现了`Invalid Host header`字样。这是因为新版的 webpack-dev-server 出于安全考虑，默认检查 hostname，如果 hostname 不是配置内的就不能访问。


### 一、ngrok.com

- 优点：启动方便
- 缺点：网速慢，不能自定义域名

&emsp;&emsp;官网的工具包链接: <a href="https://pan.baidu.com/s/1r8noo1iQbEt3DJJRkdJhbQ" target="_black">https://pan.baidu.com/s/1r8noo1iQbEt3DJJRkdJhbQ</a>  密码:`vcvj`


### 二、ngrok.cc

- 优点：网速好一点，自定义域名
- 缺点：配置麻烦


### 三、解决办法

&emsp;&emsp;因为不是熟悉的 vue 项目，所以记录一下，vue 项目中解决较为简单，不做赘述。

#### 1、修改 node_modules

&emsp;&emsp;进入`/node_modules/_webpack-dev-server@2.11.5@webpack-dev-server/lib`，在`Server.js`中查找，将
``` javascript
if (this.disableHostCheck) return true;
```
&emsp;&emsp;改为：
``` javascript
return true;
```
&emsp;&emsp;即可，不对 hostname 做检查就返回通过。

#### 2、修改启动命令`推荐`

&emsp;&emsp;修改 script 中的启动命令，添加参数：` --disableHostCheck=true`
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
