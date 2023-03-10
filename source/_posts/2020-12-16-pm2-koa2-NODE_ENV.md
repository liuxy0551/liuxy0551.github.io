---
title: koa2 本地运行及 pm2 运行时如何区分 development 和 production
urlname: pm2-koa2-NODE_ENV
tags:
  - node
  - pm2
categories:
  - node
  - pm2
author: liuxy0551
copyright: true
date: 2020-12-16 11:10:20
updated: 2020-12-16 11:10:20
---

&emsp;&emsp;最近项目本地开发时希望和生产环境区分数据库，本地是 nodemon 启动 app.js 的，生产环境是通过 pm2 启动的，记录在`macOS`开发时的配置。 

<!--more-->


&emsp;&emsp;在 app.js 中打印`process.env.NODE_ENV`，可分别输出 development、production。

``` shell app.js
console.log('NODE_ENV', process.env.NODE_ENV)
```

### 一、本地运行

&emsp;&emsp;本地运行时希望`process.env.NODE_ENV`拿到的值是`development`，可以在`package.json`中的`script`设置：

```
"scripts": {
  "dev": "export NODE_ENV=development && nodemon app.js"
},
```

>**注意**
>* **其他文章看到说 Linux、macOS 使用 export，Windows 使用 set，未验证 set 是否有效**
>* **nodemon 参考 <a href="https://liuxianyu.cn/article/node-auto-compile.html" target="_black">node 自动编译</a>**

&emsp;&emsp;启动时执行`npm run dev`。


### 二、生产环境

&emsp;&emsp;生产环境运行时希望`process.env.NODE_ENV`拿到的值是`production`，此随笔涉及到的项目是用 pm2 部署的，关于 pm2 可参考 <a href="https://liuxianyu.cn/article/node-pm2.html" target="_black">使用 pm2 部署 node 项目</a>。

&emsp;&emsp;对应的 pm2 配置文件内容如下：

```
{
  "name": "jizhangla",
  "script": "./app.js",
  "cwd"   : "./",
  "log_date_format": "YYYY-MM-DD HH:mm:ss",
  "max_memory_restart": "500M",
  "out_file"   : "./pm2/logs/pm2-out.log",
  "error_file" : "./pm2/logs/pm2-err.log",
  "env_production": {
    "NODE_ENV": "production"
  }
}
```

&emsp;&emsp;对应的 start.sh 文件内容如下：

```
git pull origin master
cnpm i
pm2 restart ./pm2/config.json --env production
pm2 monit
```

>**注意**
>* **常见命令为：**`pm2 start app.js --env production`
