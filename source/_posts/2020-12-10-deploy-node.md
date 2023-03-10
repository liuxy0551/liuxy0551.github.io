---
title: node 项目部署（pm2）
urlname: deploy-node
tags:
  - node
  - pm2
categories:
  - node
author: liuxy0551
copyright: true
date: 2020-12-10 15:28:15
updated: 2020-12-10 15:28:15
---

&emsp;&emsp;最近在用 node 写个 Web Server，记录一下部署方法。

<!--more-->


### 一、部署项目

#### 1、部署前准备

&emsp;&emsp;服务器端需要提前安装好 git、nginx、node、cnpm（<a href="https://liuxianyu.cn/article/cent-os-base.html#%E4%B8%89-%E5%AE%89%E8%A3%85-git" target="_black">安装 git、安装 nginx</a>）、pm2（<a href="https://liuxianyu.cn/article/node-pm2.html" target="_black">使用 pm2 部署 node 项目</a>）
&emsp;&emsp;1、ssh 到服务器，并在指定目录位置通过 git clone 拉取代码初始化文件夹
&emsp;&emsp;2、配置 node 服务的 nginx，服务启动在 9000 端口，http、https 均可访问(需要配置证书)，配置如下：

```
# 记账啦后端 node api 的 nginx 配置
# http
server {
    listen          80;
    server_name     api.jzl.liuxianyu.cn;

    location / {
	    proxy_pass http://localhost:9000/;
    }
}

# https
server {
    listen       443 ssl;
    server_name  api.jzl.liuxianyu.cn;
    client_max_body_size 50M; 
    client_body_timeout 10m;
    ssl_certificate cert/api.jzl.liuxianyu.cn.pem;
    ssl_certificate_key cert/api.jzl.liuxianyu.cn.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;

    location / {
	    proxy_pass http://localhost:9000/;
    }
}
```

#### 2、部署流程

&emsp;&emsp;1、本地修改代码，上传到 git
&emsp;&emsp;2、服务器通过 git 拉取最新代码
&emsp;&emsp;3、重启 pm2 对应进程



### 二、操作

&emsp;&emsp;终端连接到服务器，进入对应目录，命令行执行：

```
./start.sh
```

&emsp;&emsp;`start.sh`文件内容如下：

```
git pull origin master
cnpm i
pm2 restart ./pm2/config.json
pm2 monit
```

&emsp;&emsp;可按需要添加以下两条命令：

| 含义 | 命令 |
| :---: | --- |
| 显示每个应用程序的 CPU 和内存占用情况 | pm2 monit |
| 查看输出的日志 | pm2 logs |

![pm2 monit](https://images-hosting.liuxianyu.cn/posts/deploy-node/1.jpg)
![pm2 logs](https://images-hosting.liuxianyu.cn/posts/deploy-node/2.jpg)
