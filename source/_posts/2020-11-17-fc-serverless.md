---
title: 阿里云函数计算
urlname: fc-serverless
tags:
  - 函数计算
  - serverless
categories:
  - node
  - express
author: liuxy0551
copyright: true
date: 2020-11-17 17:10:00
updated: 2020-11-17 17:10:00
---


&ensp;&ensp;&ensp;&ensp;最近在公司项目中实践数据中台的概念，调研并使用了阿里云提供的函数计算服务，记录下相关内容：

<!--more-->



### 一、安装 fun 命令行工具

```
npm install @alicloud/fun -g
fun --version
```


### 二、搭建基于Express的Serverless Web应用

&ensp;&ensp;&ensp;&ensp;阿里云文档：<a href="https://help.aliyun.com/document_detail/147099.html?spm=a2c4g.11186623.6.752.43ed5e12IPyLRR" target="_black">搭建基于Express的Serverless Web应用</a>

#### 1、通过 fun 模板生成项目

```
fun init -n wisejob-class https://github.com/muxiangqiu/fc-Express-nodejs8.git
```

#### 2、本地运行

>**注意**
>* **本地需要安装 Docker 并启动**
>* **静态页面打包时的路径需带上访问域名的名称前缀**
>* **本地访问静态页面时 url 后需要带 /**

```
cd demo
yarn
npm run dev
fun local start
```

&ensp;&ensp;&ensp;&ensp;本地查看效果：<a href="http://localhost:8000/2016-08-15/proxy/wisejob-class-service/wisejob-class" target="_black">http://localhost:8000/2016-08-15/proxy/wisejob-class-service/wisejob-class</a>

#### 3、通过 .env 文件配置

&ensp;&ensp;&ensp;&ensp;(1)、在项目目录即template.yml文件所在目录下，创建一个名为.env的文件。

>**说明**
>* **建议将 .env 文件放到 .gitignore中，避免泄漏重要的账户信息。**

&ensp;&ensp;&ensp;&ensp;(2)、在 .env 文件录入以下配置：

```
ACCOUNT_ID=xxxxxxxx
REGION=cn-shanghai
ACCESS_KEY_ID=xxxxxxxxxxxx
ACCESS_KEY_SECRET=xxxxxxxxxx
TIMEOUT=10
RETRIES=3
```

#### 4、部署函数到控制台

```
fun deploy
```


### 三、遇到的问题

#### 1、regeneratorRuntime is not defined

&ensp;&ensp;&ensp;&ensp;在代码中使用 async/await 时报错，是 babel 编译的问题，安装 babel-plugin-transform-runtime ，

```
npm i babel-plugin-transform-runtime -D
```

&ensp;&ensp;&ensp;&ensp;然后在 .babelrc 中添加 plugins，重新运行即可。

``` javascript
{
    ...,
    "plugins": ["transform-runtime"]
}
```

#### 2、load code for handler:index.handler

&ensp;&ensp;&ensp;&ensp;本地运行时项目刚启动，调用 POST 接口可能导致程序阻塞（deploy到线上不会阻塞），先调用一次 GET 接口再调用 POST 接口就不会阻塞，原因未知。

#### 3、静态文件使用自定义域名

&ensp;&ensp;&ensp;&ensp;需要每个文件都添加记录，等待后续必须上传到函数计算时，使用打包到 OSS 尝试解决。

#### 4、目录过深，运行报错

&ensp;&ensp;&ensp;&ensp;将项目拷贝到桌面，运行。
