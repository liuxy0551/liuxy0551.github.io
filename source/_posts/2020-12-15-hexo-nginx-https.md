---
title: hexo-nginx 配置 https 证书
urlname: hexo-nginx-https
tags:
  - nginx
  - https-SSL
categories:
  - nginx
  - https-SSL
author: liuxy0551
copyright: true
date: 2020-12-15 11:52:19
updated: 2020-12-15 11:52:19
---

&emsp;&emsp;之前通过 <a href="https://liuxianyu.cn/article/centos-nginx-https.html" target="_black">使用 certbot 在 Cent OS 中给 nginx 配置 https</a> 给 hexo 配置的 https 似乎到期了，Chrome 会报危险，这次参考 <a href="https://liuxianyu.cn/article/nginx-https.html" target="_black">在阿里云通过 SSL证书和 nginx 配置 https</a>，对 https 证书进行了更新，记录下 nginx 配置。

<!--more-->


&emsp;&emsp;只在原有的 nginx 配置上进行了简单更改，如下：

```
# 博客的 nginx 配置
server { 
    server_name liuxianyu.cn;

    root /mnt/projects/hexo-blog/blog;
    index index.html;
    location ^~ /static|img|js|css/ {
      gzip_static on;
      expires max;
      add_header Cache-Control public;
    }
    location / {
      try_files $uri $uri/ /index.html;
    }
    location ~* \.(css|js|gif|jpe?g|png)$ {
      expires 50d;
      access_log off;
      add_header Pragma public;
      add_header Cache-Control "public";
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate cert/liuxianyu.cn.pem;
    ssl_certificate_key cert/liuxianyu.cn.key;

}
server {
    if ($host = liuxianyu.cn) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80; 
    server_name liuxianyu.cn;
    return 404; # managed by Certbot
}
```
