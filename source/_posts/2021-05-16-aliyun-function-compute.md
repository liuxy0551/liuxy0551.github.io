---
title: 阿里云函数计算介绍与实践
urlname: aliyun-function-compute
tags:
  - Serverless
  - 函数计算
categories:
  - Serverless
author: liuxy0551
copyright: true
date: 2021-05-16 14:10:08
updated: 2021-05-16 14:10:08
---


&emsp;&emsp;函数计算是`Serverless`的一部分，目前普遍认为 Serverless = FaaS + BaaS，即 Serverless 相当于函数计算(Function as a Service)和后端即服务(Backend as a Service)两种模式的组合。这篇随笔主要记录一下 Serverless 中的 FaaS 以及阿里云函数计算。

<!--more-->

&emsp;&emsp;只看 Serverless 字面意思的话，还以为是不需要服务器了，但是其实应该理解为：程序在构建和运行时不需要服务器管理。这个理解听起来好像和前端关系不大，但其实 Serverless 早就和前端产生了联系，比如 CDN，我们把静态资源存放到 CDN 之后，就可以不关心在使用 CDN 时使用的是哪个节点、使用了哪些节点、节点是如何分布的，也不需要关心节点之间是如何负载均衡和网络加速的。类似的还有微信小程序的云开发、对象存储、部分第三方开放接口。
&emsp;&emsp;简单来说，FaaS(Function as a Service) 是可以运行函数的平台，比如阿里云的函数计算、腾讯云的云函数。


### 一、Serverless

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
