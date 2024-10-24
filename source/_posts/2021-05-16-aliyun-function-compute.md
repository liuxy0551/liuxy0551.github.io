---
title: 阿里云函数计算介绍与实践
urlname: aliyun-function-compute
tags:
  - Serverless
categories:
  - Serverless
author: liuxy0551
copyright: true
date: 2021-05-16 14:10:08
updated: 2021-05-16 14:10:08
---


&emsp;&emsp;函数计算是一个和 Serverless 相关的概念，函数计算可以理解为 FaaS，目前 Serverless 并没有一个很官方的定义，业内普遍认为 Serverless = BaaS + FaaS。

<!--more-->

### 一、Serverless

&emsp;&emsp;Serverless 是一种新型的互联网架构 —— 无服务器架构，这里的无服务器不是指不需要服务器，而是开发者可以不管理服务器等基础设施。其实 Serverless 也谈不上新，因为这个概念在 2012 年就已经提出了，简单看下 Serverless 的发展历史：

![](https://images-hosting.liuxianyu.cn/posts/aliyun-function-compute/1.png)

&emsp;&emsp;云计算的发展过程从 IaaS，PaaS，SaaS 到最新的 Serverless，介绍下这些基本概念就可以看出 Serverless 是云计算发展到某一阶段的必然产物，可以节省运维成本和开发成本。

- IaaS：基础设施即服务，服务商提供物理层基础设施资源，开发者需要购买并选择操作系统，安装软件、部署程序、监控应用。
- PaaS：平台即服务，服务商提供操作系统、数据库、负载均衡器和其他中间件，相比 IaaS，开发者仅需要控制上层的程序部署与应用托管的环境即可。
- SaaS：软件即服务， 服务商提供基于软件的解决方案，如 OA、CRM、ERP、Office、iCloud 等，客户只需要通过服务商平台获取软件使用即可。
- BaaS：后端即服务，如提供文件存储、推送服务、身份验证服务等。
- FaaS：函数即服务，服务商提供一个平台，允许开发者开发、允许和管理应用程序，而无需构建和维护基础架构，通常在构建微服务应用时使用。


### 二、函数计算

![](https://images-hosting.liuxianyu.cn/posts/aliyun-function-compute/2.png)

> &emsp;&emsp;函数计算是阿里云作为云服务商提供的一项服务能力，类似的服务还有亚马逊的 Lambda、腾讯云的云函数、Google Cloud Functions 等。本篇随笔就介绍一下阿里云的函数计算，并进行小场景实践：基于 egg 和 MySQL 提供 Web 服务。
> &emsp;&emsp;阿里云对函数计算（Function Compute）的定义是：一个事件驱动的全托管 Serverless 计算服务，无需管理服务器等基础设施，只需编写代码并上传，函数计算会准备好计算资源，并以弹性、可靠的方式运行代码，并提供日志查询、性能监控和报警等功能。

&emsp;&emsp;我们可以对比一个应用从开发到上线的过程：

![](https://images-hosting.liuxianyu.cn/posts/aliyun-function-compute/3.png)

#### 2.1、工作流程

![](https://images-hosting.liuxianyu.cn/posts/aliyun-function-compute/4.png)

- 1、开发者编写程序，函数计算支持的 <a href="https://help.aliyun.com/document_detail/74712.htm?spm=a2c4g.11186623.2.8.d913398eQ0WizG#concept-2259869" target="_black">开发语言列表</a>。
- 2、开发者上传程序到函数计算。
- 3、触发函数执行，触发方式包括OSS、API网关、日志服务、表格存储以及函数计算API、SDK等。
- 4、动态扩容，根据用户请求量自动扩容，减轻运维压力，开发者和用户无感知。
- 5、按函数执行时间计费。

#### 2.2、特点

- 高效免运维
- 弹性执行
- 按量付费，低成本
- 事件驱动

- 调试麻烦
- 构建复杂
- 休眠启动

#### 2.3、典型场景

- Web 应用
- 对计算能力有很强的弹性诉求
- 事件驱动型的应用


### 三、实践

&emsp;&emsp;可参考官方文档：<a href="https://help.aliyun.com/document_detail/51732.html?spm=a2c4g.11186623.3.3.7f4f6eeeXqErFn" target="_black">快速入门</a>。创建函数的方法有很多种，我采用的是通过命令行创建函数。

#### 3.1、开通函数计算服务

&emsp;&emsp;登录阿里云控制台，搜索函数计算并开通。

#### 3.2、安装命令行工具

&emsp;&emsp;全局安装命令行工具 Funcraft：

```
npm install @alicloud/fun -g
fun --version
```

&emsp;&emsp;使用 fun 工具部署可以去全局定义账户信息，输入`fun config`依次配置 Account ID（阿里云账号 ID）、AccessKey ID、AccessKey Secret、Default Region Name。如果账号是 RAM 用户，Account ID 需要配置为阿里云账号的 ID，AccessKey ID、AccessKey Secret 为 RAM 用户的密钥。推荐全局配置，完成配置后，Funcraft 会将配置保存到用户目录下的`.fcli/config.yaml`文件中。

![](https://images-hosting.liuxianyu.cn/posts/aliyun-function-compute/5.png)

#### 3.3、编写代码

&emsp;&emsp;先写个 hello-world：

```
mkdir hello-world
cd hello-world
npm init egg --type=simple
npm i
npm run dev
```

&emsp;&emsp;写个 GET 和 POST 的接口，egg 会有 CSRF 攻击的限制，可以在/config/config.default.js中添加 csrf 配置的代码：

```
module.exports = appInfo => {
  const config = exports = {};
  config.security = {
    csrf: {
      enable: false
    }
  }
}
```

#### 3.4、部署过程

&emsp;&emsp;部署时会同时上传 node_modules，所以使用 deploy 命令中使用了`npm i --production`。也可以通过 <a href="https://help.aliyun.com/document_detail/193057.html?spm=a2c4g.11186623.2.2.98b41636ZIbJbm" target="_black">层</a> 的概念去上传依赖包，层可以理解为依赖库、自定义运行环境，此时可配置`.funignore`文件，过滤不上传的文件或目录。

```
rm -rf node_modules
npm i --production
fun deploy
```

&emsp;&emsp;确认服务和函数的名称后，fun 工具会生成对应的配置文件：

（1）新增配置文件

```
ROSTemplateFormatVersion: '2015-09-01'
Transform: 'Aliyun::Serverless-2018-04-03'
Resources:
  dingtalk-robot: # service name
    Type: 'Aliyun::Serverless::Service'
    Properties:
      Description: This is FC service
      LogConfig:
        Project: aliyun-fc-cn-hangzhou-3ff06808-bae1-59f3-a782-6e6623a34e1f
        Logstore: function-log
        EnableRequestMetrics: true
      TracingConfig: Disable
      InternetAccess: true
    dingtalk-robot: # function name
      Type: 'Aliyun::Serverless::Function'
      Properties:
        Handler: index.handler
        Runtime: custom
        CodeUri: ./
        MemorySize: 1024
        InstanceConcurrency: 1
        Timeout: 120
        
      Events:
        httpTrigger:
          Type: HTTP
          Properties:
            AuthType: ANONYMOUS
            Methods: ['GET', 'POST']
```

&emsp;&emsp;（2）自定义运行环境，需要将可执行文件 bootstrap 的顶部配置更新为：

```
#!/bin/bash
```

&emsp;&emsp;同时，给予 bootstrap 文件可执行权限（777 或 755）：

```
chmod 777 bootstrap
```

&emsp;&emsp;部署代码到后，函数计算会运行bootstrap 文件，该文件指定运行端口、启动程序。

```
// bootstrap
#!/bin/bash
export PORT=9000
export EGG_SERVER_ENV=prod
npx --no-install egg-scripts start --workers=1
```

#### 3.5、部署完成

&emsp;&emsp;继续命令行的部署，配置自定义域名后进行验证。

![](https://images-hosting.liuxianyu.cn/posts/aliyun-function-compute/6.png)


### 四、复杂场景

&emsp;&emsp;本节代码：<a href="https://github.com/liuxy0551/dingtalk-robot" target="_black">https://github.com/liuxy0551/dingtalk-robot</a>

#### 4.1、实现效果

&emsp;&emsp;可以发送消息到指定钉钉群，效果如下:

![](https://images-hosting.liuxianyu.cn/posts/aliyun-function-compute/14.gif)

#### 4.2、通过钉钉群机器人发消息

``` javascript
/**
 * 发送消息
 * @param {string} url 
 * @param {object} msg 
 * @returns {Promise}
 */
const sendMsgToGroup = (msg, service) => {
  return new Promise(async (resolve, reject) => {
    try {
      const robots = await service.robot.getRobots()
      let promiseList = []
      for (let i of robots) {
        promiseList.push(sendOne(getSignUrl(i.secret, i.Webhook), msg, i.name))
      }
      const res = await Promise.all(promiseList)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
  function sendOne (url, msg, name) {
    const params = {
      json: msg,
      encoding: 'utf-8',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return new Promise((resolve, reject) => {
      request.post(url, params, (error, response, body) => {
          if (!error && response.statusCode == 200) {
            resolve({ ...body, name })
          } else {
            reject({ ...error, name })
          }
        }
      )
    })
  }
}
```

`/app/service/robot.js`：

``` javascript
// 获取机器人列表
getRobots () {
  return new Promise(async (resolve, reject) => {
    try {
      const robots = await db.Robot.findAll({
        where: getWhere(),
        raw: true
      })
      resolve(robots)
    } catch (err) {
      reject(err)
    }
  })
}
```

#### 4.3、百度统计

&emsp;&emsp;通过定时任务拉取百度统计的埋点数据，并通过统一的钉钉群机器人发送到群

![](https://images-hosting.liuxianyu.cn/posts/aliyun-function-compute/7.png)

``` javascript
// 百度统计实现
const baidutjAPI = async (config) => {
  const { apiUrl, header, body } = config
  const params = {
    header,
    body: {
      ...body,
      start_date: getDate(-1),
      end_date: getDate(),
    }
  }
  
  return new Promise((resolve, reject) => {
    axios.post(apiUrl, params).then(res => {
      const desc = res.data.header.desc
      desc === 'success' ? resolve(res.data) : reject(desc)
    }).catch(err => {
      reject(err)
    })
  })
}
```

![](https://images-hosting.liuxianyu.cn/posts/aliyun-function-compute/8.png)

``` javascript
// 定时触发器
const axios = require('axios')
// 入口文件
exports.handler = (event, context, callback) => {
  const url = 'http://dingtalk-robot.liuxianyu.cn/api/baidutj'
  axios.post(url)
  callback(null, 'timed-task')
}
```

#### 4.4、记账啦

&emsp;&emsp;通过定时任务拉取微信小程序的数据，并通过统一的钉钉群机器人发送到群

![](https://images-hosting.liuxianyu.cn/posts/aliyun-function-compute/9.png)

#### 4.5、从 MySQL 查询数据

![](https://images-hosting.liuxianyu.cn/posts/aliyun-function-compute/10.png)


### 五、使用心得

#### 5.1、版本管理

&emsp;&emsp;操作路径：控制台 -> 函数计算 -> 服务及函数 -> (选择一个服务)版本管理。
&emsp;&emsp;每次部署时可以新建一个版本，第一次新建版本后可以在此版本的基础上新建别名，如：prod，并将自定义域名（第 3 条）、函数的 http 触发器中 版本/别名 选择为 prod。后续部署时，可以新建版本，需要该版本生效时，可以简单编辑 prod 别名对应的版本即可，同时别名支持版本配比，可进行灰度测试。

![](https://images-hosting.liuxianyu.cn/posts/aliyun-function-compute/11.png)

#### 5.2、配置导出

&emsp;&emsp;操作路径：控制台 -> 函数计算 -> 服务及函数 -> (选择一个服务)函数列表 -> 函数名称(点击函数名称) -> 概览 -> 导出 -> 导出配置将导出的 template.yml 文件放到项目中，这样控制台配置的配置项就不会被 deploy 覆盖掉。

> **注意**
控制台导出的配置文件可能有部分缺失，需要和本地已有的 template.yml 文件对比，保留部分字段，如：CodeUri

#### 5.3、自定义域名

&emsp;&emsp;操作路径：控制台 -> 函数计算 -> 自定义域名每个路由的 版本/别名 在开发调试时先选择 LATEST，等待上线时，按照第 1 条的版本管理，选择别名。

#### 5.4、日志查询
&emsp;&emsp;操作路径：控制台 -> 函数计算 -> 服务及函数 -> (选择一个服务)函数列表 -> 函数名称(点击函数名称) -> 日志查询日志内容包含的内容如：接口 url、报错信息。

> 注意
当函数的 单实例并发度 大于 1 时，只有高级查询，等于 1 时，有简单查询和高级查询。

#### 5.5、请求环境区分

&emsp;&emsp;使用函数时如果需要区分生产环境和测试环境，可以发布不同的版本，并创建多个触发器，设置触发器指向不同的版本/别名，如下图：	

![](https://images-hosting.liuxianyu.cn/posts/aliyun-function-compute/12.png)

&emsp;&emsp;自定义域名中创建两个域名，用来区分环境，路径可按下方示例填写，生产和测试选择不同的版本/别名即可。

![](https://images-hosting.liuxianyu.cn/posts/aliyun-function-compute/13.png)


### 参考文章
[1] <a href="https://developer.aliyun.com/article/574222" target="_black">当我们在聊 Serverless 时你应该知道这些</a>


### 附件

1、<a href="https://images-hosting.liuxianyu.cn/posts/aliyun-function-compute/函数计算的介绍与实践.pptx" target="_black">函数计算的介绍与实践.pptx (2.7 MB)</a>

2、<a href="https://a.jizhangla.liuxianyu.cn/assets/media/%E9%83%A8%E7%BD%B2%E6%BC%94%E7%A4%BA.mp4" target="_black">部署演示.mp4 (28.2 MB)</a>
