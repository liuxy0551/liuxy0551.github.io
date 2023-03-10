---
title: node 服务渲染支持 Markdown 中的数字公式 LaTeX、yUML 流程图支持
urlname: node-markdown
tags:
  - node
  - LaTeX
  - yUML
categories:
  - node
author: liuxy0551
copyright: true
date: 2020-09-28 11:47:25
updated: 2020-09-28 11:47:25
---


&emsp;&emsp;最近在微信小程序中遇到了数学公式的显示，后端不好处理成图片，记录一下通过 node 生成 svg。

<!--more-->


### 一、获取项目

```
git clone https://github.com/liuxy0551/markdown-server
```

&emsp;&emsp;项目结构比较简洁，如下：

```
markdown-server
├─LICENSE
├─README.md
├─index.js
└─package.json
```


### 二、运行项目

#### 1、安装依赖

```
npm i 或 yarn install
```

#### 2、改变端口

&emsp;&emsp;出于个人偏好，将项目本身的 8001 端口改为了 9001。

#### 3、运行服务

```
node index
```


### 三、配置 nginx

&emsp;&emsp;内容如下：

```
server {
    listen          80;
    server_name     markdown.liuxianyu.cn;

    location / {
	    proxy_pass http://localhost:9001/;
    }
}
```

&emsp;&emsp;重启 nginx：

```
nginx -s reload
```


### 四、查看效果

<a href="http://markdown.liuxianyu.cn/?tex=r=%5Csqrt%7Bx^2+y^2%7D" target="_black">http://markdown.liuxianyu.cn/?tex=r=%5Csqrt%7Bx^2+y^2%7D</a>

![](https://images-hosting.liuxianyu.cn/posts/node-markdown/1.png)



### 参考资料

1、<a href="https://github.com/sbfkcel/markdown-server" target="_black">https://github.com/sbfkcel/markdown-server</a>
2、<a href="https://github.com/sbfkcel/towxml" target="_black">https://github.com/sbfkcel/towxml</a>
3、<a href="https://github.com/sbfkcel/towxml/wiki/3.0-%E6%95%B0%E5%AD%97%E5%85%AC%E5%BC%8F&yuml%E6%B5%81%E7%A8%8B%E5%9B%BE%E6%94%AF%E6%8C%81" target="_black">3.0 数字公式&yuml流程图支持</a>
