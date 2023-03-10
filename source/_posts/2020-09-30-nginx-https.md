---
title: 在阿里云通过 SSL证书和 nginx 配置 https
urlname: nginx-https
tags:
  - nginx
  - https-SSL
categories:
  - nginx
  - https-SSL
author: liuxy0551
copyright: true
date: 2020-09-30 15:47:59
updated: 2020-09-30 15:47:59
---


&emsp;&emsp;前几天部署了一个 node 项目，在各个小程序配置中，基本都要求 https 请求，记录一下在阿里云通过 SSL证书和 nginx 配置 https。

<!--more-->



### 一、购买、下载、上传 SSL 证书

&emsp;&emsp;登录阿里云后在控制台搜索进入`SSL 证书`，点击购买证书，选择单个域名、DV域名级SSL、免费版、1年，支付0元购买。在证书列表页点击证书申请按钮，填入证书绑定域名`api.koa-app.liuxianyu.cn`，下一步（在阿里云购买的域名会自动在域名解析处添加域名验证信息，https 生效后可删除该条解析），下载证书（Nginx）。解压后将证书上传到`/etc/nginx/cert`目录下，建议将文件名都改为对应域名以作区分。


### 二、配置 nginx

&emsp;&emsp;编辑已有的`koa-app.conf`，新的配置如下：

```
# 学习 koa-app 的 nginx 配置
# http
#server {
#    listen          80;
#    server_name     api.koa-app.liuxianyu.cn;
#
#    location / {
#	    proxy_pass http://localhost:9000/;
#    }
#}

# https
server {
    listen       443 ssl;
    server_name  api.koa-app.liuxianyu.cn;
    client_max_body_size 50M; 
    client_body_timeout 10m;
    ssl_certificate cert/api.koa-app.liuxianyu.cn.pem;
    ssl_certificate_key cert/api.koa-app.liuxianyu.cn.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;

    location / {
	    proxy_pass http://localhost:9000/;
    }
}
```

| 配置名 | 含义 |
| :---: | --- |
| client_max_body_size | 限制上传文件的大小，默认 1M |
| client_body_timeout | 客户端与服务端建立连接后发送 request body 的超时时间，默认 60s |
| ssl_certificate | 证书文件目录 |
| ssl_certificate_key | 私钥文件目录 |
| ssl_session_timeout | 指定客户端可以重用会话参数的时间（超时之后不可使用） |
| ssl_ciphers | 密码加密方式 |
| ssl_protocols | 指定密码为 openssl 支持的格式 |
| ssl_prefer_server_ciphers | 依赖SSLv3和TLSv1协议的服务器密码将优先于客户端密码 |



>**注意**
>* 放开 80 的 server 注释，通过 http 也可以访问（vim 中的取消一行的注释快捷键是 X）
