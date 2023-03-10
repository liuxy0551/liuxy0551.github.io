---
title: 用 Koa2 写 GET、POST 测试接口
urlname: koa-get-post
tags:
  - node
  - Koa2
categories:
  - node
  - Koa2
author: liuxy0551
copyright: true
date: 2020-02-02 23:21:42
updated: 2020-02-02 23:21:42
---


&emsp;&emsp;刚接触 Koa2 框架，用 Koa2 写一下 GET 和 POST 接口，平常开发中可以测试使用。

<!--more-->


#### 1、新建文件夹，并初始化

```
mkdir koa2-demo
cd koa2-demo
npm init -y
```

#### 2、安装 koa、koa-router

```
npm i koa koa-router koa-bodyparser -S
```

#### 3、新增 app.js

&emsp;&emsp;通过`vim app.js`命令创建 app.js 文件并保存。代码见：<a href="https://github.com/liuxy0551/learn-node/blob/master/koa-get-post-demo/app.js" target="_black">koa-get-post-demo/app.js</a>

``` javascript
// 引入模块
const Koa = require('koa')
const router = require('koa-router')() // 引入并实例化
const bodyParser = require('koa-bodyparser')

// 实例化
const app = new Koa()
// 配置中间件，通过 bodyParser 获取 post 请求传递过来的参数
app.use(bodyParser())

// GET 接口
router.get('/news', ctx => {
  const { search } = ctx.query
  ctx.body = {
    time: new Date(),
    data: [
      {
        title: `新闻标题 1 - ${ search }`
      },
      {
        title: `新闻标题 2 - ${ search }`
      }
    ]
  }
})

// POST 接口
router.post('/say', ctx => {
  const { name } = ctx.request.body
  ctx.body = {
    time: new Date(),
    reply: `Hello ${ name }!`
  }
})

app.use(router.routes()) // 启动路由
app.listen(3000, () => {
  console.log('Server is running on 3000')
}) // 启动服务
```


#### 4、启动服务

```
node app.js
```

&emsp;&emsp;访问 <a href="http://localhost:3000/news?search=科技" target="_black">http://localhost:3000/news?search=科技</a> 查看效果。

&emsp;&emsp;启动服务推荐使用`nodemon` ——&emsp;<a href="https://liuxianyu.cn/article/node-auto-compile.html" target="_black">node 自动编译</a>

#### 5、测试

{% gp 2-2 %}
![](https://liuxianyu.cn/image-hosting/posts/koa-get-post/1.png)
![](https://liuxianyu.cn/image-hosting/posts/koa-get-post/2.png)
{% endgp %}
