---
title: 阿里云函数计算初接触
urlname: fc-serverless
tags:
  - 函数计算
  - Serverless
categories:
  - Serverless
author: liuxy0551
copyright: true
date: 2020-11-17 17:10:00
updated: 2021-05-16 14:10:08
---


&emsp;&emsp;最近在公司项目中实践数据中台的概念，调研并使用了阿里云提供的函数计算服务，记录下相关内容。

<!--more-->

&emsp;&emsp;函数计算是`Serverless`的一部分，目前普遍认为 Serverless = FaaS + BaaS，即 Serverless 相当于函数计算(Function as a Service)和后端即服务(Backend as a Service)两种模式的组合。


### Serverless

&emsp;&emsp;只看 Serverless 字面意思的话，还以为是不需要服务器了，但是其实应该理解为：程序在构建和运行时不需要服务器管理。这个理解听起来好像和前端关系不大，但其实 Serverless 早就和前端产生了联系，比如 CDN，我们把静态资源存放到 CDN 之后，就可以不关心在使用 CDN 时使用的是哪个节点、使用了哪些节点、节点是如何分布的，也不需要关心节点之间是如何负载均衡和网络加速的。类似的还有微信小程序的云开发、对象存储、部分第三方开放接口。
&emsp;&emsp;简单来说，FaaS(Function as a Service) 是可以运行函数的平台，比如阿里云的函数计算、腾讯云的云函数。这一段主要记录一下 Serverless 中的 FaaS 以及阿里云函数计算。

#### 1、主要特点

- 事件驱动 —— 在 FaaS 平台，需要通过各种事件去驱动函数的执行
- 无状态 —— 函数的每次执行，可能在不同的节点，所以无法进行内存共享即数据的共享，需要通过其他方法，如 Redis
- 无运维 —— 使用 Serverless 可以不关心服务器和运维
- 弹性执行 —— 可以根据用户请求量动态扩容
- 低成本 —— 只在函数运行时计费，不浪费服务器资源

#### 2、一些问题

- 依赖第三方服务 - 采用某个云服务商的 Serverless 架构时，就和该云服务商绑定了，比如阿里云的对象存储触发器在触发函数执行时是基于阿里云的 OSS 来进行的，其他云服务商也是类似情况，各个平台之间不互通。
- 调试麻烦
- 构建复杂


### 二、函数计算

&emsp;&emsp;<a href="https://help.aliyun.com/document_detail/52895.html?spm=a2c4g.11186623.6.542.7d61398eyT0KaH" target="_black">函数计算</a> 是阿里云提供的服务，工作流程如下：

![](https://liuxy0551.gitee.io/image-hosting/posts/aliyun-function-compute/1.png)

- 1、开发者编码
- 2、通过工具上传代码
- 3、触发函数执行
- 4、动态扩容
- 5、按函数执行的时间计费


### 三、安装 fun 命令行工具

```
npm install @alicloud/fun -g
fun --version
```


### 四、搭建基于Express的Serverless Web应用

&emsp;&emsp;阿里云文档：<a href="https://help.aliyun.com/document_detail/147099.html?spm=a2c4g.11186623.6.752.43ed5e12IPyLRR" target="_black">搭建基于Express的Serverless Web应用</a>

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

&emsp;&emsp;本地查看效果：<a href="http://localhost:8000/2016-08-15/proxy/wisejob-class-service/wisejob-class" target="_black">http://localhost:8000/2016-08-15/proxy/wisejob-class-service/wisejob-class</a>

#### 3、通过 .env 文件配置

&emsp;&emsp;(1)、在项目目录即template.yml文件所在目录下，创建一个名为.env的文件。

>**说明**
>* **建议将 .env 文件放到 .gitignore中，避免泄漏重要的账户信息。**

&emsp;&emsp;(2)、在 .env 文件录入以下配置：

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


### 五、阿里云控制台注意事项

#### 1、自定义域名

&emsp;&emsp;操作路径：控制台 -> 函数计算 -> 自定义域名
&emsp;&emsp;每个路由的 版本/别名 在开发调试时先选择 LATEST，等待上线时，按照第4条的版本管理，选择别名。

#### 2、日志查询

&emsp;&emsp;操作路径：控制台 -> 函数计算 -> 服务/函数 -> (选择一个函数)函数列表 -> 函数名称(点击函数名称) -> 日志查询
&emsp;&emsp;日志内容包含的内容如：接口url、报错信息

#### 3、配置导出

&emsp;&emsp;操作路径：控制台 -> 函数计算 -> 服务/函数 -> (选择一个函数)函数列表 -> 函数名称(点击函数名称) -> 概览 -> 导出 -> 导出配置
&emsp;&emsp;将导出的 template.yml 文件放到项目中，这样控制台配置的配置项就不会被 deploy 覆盖掉。

>**注意**
>* **控制台导出的配置文件可能有部分缺失，需要和本地已有的 template.yml 文件对比，保留部分字段，如：CodeUri**

#### 4、版本管理

&emsp;&emsp;操作路径：控制台 -> 函数计算 -> 服务/函数 -> (选择一个函数)版本管理 -> 别名
&emsp;&emsp;（1）上线时可以新建一个版本，并对该版本新建别名且设置别名对应的版本占比，用来在自定义域名中使用(每个路径都选择该别名)，在 版本管理 -> 别名 中可对该别名进行版本占比控制，达到灰度发布的效果。
&emsp;&emsp;（2）后续迭代时，deploy 后可在 版本管理 中新建一个版本，并在别名中选择该版本的占比。

#### 5、环境变量

&emsp;&emsp;待补充 <a href="https://help.aliyun.com/document_detail/164217.html?spm=a2c4g.11186623.6.629.3e0a283bkc5bnN" target="_black">https://help.aliyun.com/document_detail/164217.html?spm=a2c4g.11186623.6.629.3e0a283bkc5bnN</a>

#### 6、请求环境区分

&emsp;&emsp;调用请求时需要区分生产环境和测试环境，可以发布不同的版本，并创建多个触发器，设置触发器指向不同的版本，如下图：

![](https://liuxy0551.gitee.io/image-hosting/posts/fc-serverless/1.png)

&emsp;&emsp;自定义域名中创建两个域名，用来区分环境，路径可按下方示例填写，生产和测试选择不同的版本/别名即可。

![](https://liuxy0551.gitee.io/image-hosting/posts/fc-serverless/2.png)


### 六、遇到的问题

#### 1、regeneratorRuntime is not defined

&emsp;&emsp;在代码中使用 async/await 时报错，是 babel 编译的问题，安装`babel-plugin-transform-runtime`，

```
npm i babel-plugin-transform-runtime -D
```

&emsp;&emsp;然后在 .babelrc 中添加 plugins，重新运行即可。

``` javascript
{
    ...,
    "plugins": ["transform-runtime"]
}
```

#### 2、使用 ... 扩展符

&emsp;&emsp;在代码中使用 ... 扩展符时本地运行报错，是 babel 编译的问题，安装`babel-plugin-transform-object-rest-spread`，

```
npm i babel-plugin-transform-object-rest-spread -D
```

&emsp;&emsp;然后在 .babelrc 中添加 plugins，重新运行即可。

``` javascript
{
    ...,
    "plugins": ["transform-object-rest-spread"]
}
```

#### 3、load code for handler:index.handler

&emsp;&emsp;本地运行时项目刚启动，调用 POST 接口可能导致程序阻塞（deploy到线上不会阻塞），先调用一次 GET 接口再调用 POST 接口就不会阻塞，原因未知。

#### 4、静态文件使用自定义域名

&emsp;&emsp;需要每个文件都添加记录，等待后续必须上传到函数计算时，使用打包到 OSS 尝试解决。

#### 5、目录过深，运行报错

&emsp;&emsp;将项目拷贝到桌面，运行。
