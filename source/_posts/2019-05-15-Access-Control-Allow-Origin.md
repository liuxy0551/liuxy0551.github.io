---
title: 前端项目跨域问题的几种解决方案
urlname: access-control-allow-origin
categories:
  - 前端
  - 跨域
author: liuxy0551
copyright: true
date: 2019-05-15 17:36:30
updated: 2019-05-15 17:36:30
---


　　在前端面试中大几率会提到的问题就是有没有遇到过跨域问题，是如何解决的。这里记录一下我知道的几种解决方案。
<!--more-->


### 一、什么是跨域

　　1、浏览器对于 JavaScript 的同源策略的限制

　　2、域名相同、端口相同、协议相同，这就是同源策略的保护，能有效的阻止跨站攻击

　　3、具体怎么才是同源，如下：

| 形式 | 结果 |
| :----: | :----: |
| 同一域名，同一文件夹 | 成功 |
| 同一域名，不同文件夹 | 成功 |
| 不同域名，文件夹相同 | 失败 |
| 同一域名，不同端口号 | 失败 |
| 同一域名，不同的协议 | 失败 |

### 二、几种解决方案

#### 1、Jsonp `不推荐`
　　最早的解决方案，利用script标签可以跨域的原理实现。
    
>**限制**
>* 需要服务的支持
>* 只能发起GET请求

#### 2、CORS (Cross Origin Resource Sharing 跨域资源共享) `推荐`
　　这种方案对于前端同学没什么工作量，和不跨域情况下的写法没有区别，工作量基本都在后端同学那里。每一次请求，浏览器必须先以 `OPTIONS` 请求方式发送一个预检请求（也不是所有请求都会发送 options ，[展开介绍](https://panjiachen.github.io/awesome-bookmarks/blog/cs.html#cors)）,通过预检请求从而获知服务器端对跨域请求支持的 HTTP 方法。在确认服务器允许该跨域请求的情况下，再以实际的 HTTP 请求发送真正的请求。[HTTP访问控制（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
    
>**优点**
>* 只要第一次配置好后，之后不管有多少接口和项目，都可以复用
>* 在服务端进行控制是否允许跨域，可自定义规则
>* 开发环境和正式环境都可以使用
>* 支持各种请求方式

#### 3、前端为主的实现
　　在 `dev` 开发时可以使用 webpack 的 `proxy`，参照 [文档](https://webpack.docschina.org/configuration/dev-server/#devserver-proxy) 基本就会了。但这种方法在生产环境是无法使用的，在生产环境中需要使用 `nginx` 进行反向代理。不论是 `proxy` 还是 `nginx` 的原理都是一样的，通过搭建一个中转服务器来转发请求规避跨域的问题。

#### 4、开发环境通过 node 转发请求
　　在 `dev` 开发时还可以通过 `node` 进行请求转发
    
