---
title: 在服务器上自建图床
urlname: images-hosting
tags:
  - Blog
categories:
  - Blog
author: liuxy0551
copyright: true
date: 2023-03-10 22:37:22
updated: 2023-03-10 22:37:22
---


&emsp;&emsp;至此，博客的图片资源已经经历 github -> 阿里云服务器(1M 带宽) -> 七牛云 -> gitee -> 腾讯云服务器(4M 带宽)，一直没有一个稳定的方案，上一次使用的还是 Gitee 图床，可以点击 <a href="https://liuxianyu.cn/article/gitee-image-hosting.html" target="_black">Gitee 图床【已不可用】</a> 查看当时的过程。

<!--more-->

&emsp;&emsp;接下来通过把图片等静态资源放到服务器上，再通过 nginx 转发 + 域名生成固定格式的图片链接，记录下过程。


#### 1、解析域名

&emsp;&emsp;在对应的服务器控制台解析域名，我这里使用的是 `images-hosting.liuxianyu.cn`。

#### 2、申请并下载 SSL 证书

&emsp;&emsp;因为博客使用的是 `https`，所以需要申请一个 SSL 证书，我的域名是在阿里云购买的，每年赠送 20个 免费的证书。申请完成后下载 Nginx 版本的 SSL 证书，重命名并放到服务器指定路径下。

#### 3、服务器创建文件夹

&emsp;&emsp;需要进行的操作：创建 deploy 用户、添加本机的 SSH 公钥到服务器、创建文件夹等

- 创建 deploy 用户并设置密码，把 deploy 用户添加到 sudo 用户组中 - 参考 [Cent OS 基础环境搭建 - 添加 deploy 用户](https://liuxianyu.cn/article/cent-os-base.html#%E4%BA%8C-%E6%B7%BB%E5%8A%A0%E6%9C%AC%E6%9C%BA%E7%9A%84-ssh-%E5%88%B0%E6%9C%8D%E5%8A%A1%E5%99%A8)

- 添加本机的 SSH 公钥到服务器 - 参考 [Cent OS 基础环境搭建 - 添加本机的 SSH 到服务器](https://liuxianyu.cn/article/cent-os-base.html#%E4%BA%8C-%E6%B7%BB%E5%8A%A0%E6%9C%AC%E6%9C%BA%E7%9A%84-ssh-%E5%88%B0%E6%9C%8D%E5%8A%A1%E5%99%A8)

- 在服务器上新建一个 `images-hosting` 文件夹，用来存储图片等静态资源，并授权给 deploy 用户。

``` shell
sudo mkdir -p /mnt/projects/images-hosting
cd /mnt/projects/
sudo chown -R deploy:deploy images-hosting
```

#### 4、本地环境变量

&emsp;&emsp;在本地添加远程服务器的环境变量，避免服务器 IP 暴露在公网。`vim ~/.zshrc` 添加以下内容后执行 `source ~/.zshrc`：

```
# 腾讯云服务器
export serverIP="43.139.139.139"
```

#### 5、本地图床仓库

&emsp;&emsp;在 gitee 新建了一个仓库用来做备份，但是由于包含图床内容，gitee 不允许公开仓库。在本地图床仓库中添加 `deploy.command` 文件：

```
echo -e '1、本地压缩资源中...'
gtar -czf images-hosting.tar.gz *


echo -e '2、上传压缩包到远程服务器'
scp -P 22 -r images-hosting.tar.gz deploy@$serverIP:/mnt/projects/images-hosting/


echo -e '3、在远程服务器解压中...'
ssh deploy@$serverIP "cd /mnt/projects/images-hosting/; tar -xzf images-hosting.tar.gz; rm -rf images-hosting.tar.gz; ls"


echo -e '4、删除本地压缩包'
rm -rf images-hosting.tar.gz


echo -e '\n资源已经成功上传到远程服务器啦~'
```

&emsp;&emsp;在本地图床仓库中添加 `package.json` 文件：

```
{
  "name": "images-hosting",
  "version": "1.0.0",
  "description": "在服务器上自建图床 https://liuxianyu.cn/article/images-hosting.html",
  "scripts": {
    "deploy": "bash deploy.command",
    "push": "git add . && git commit -m 'new images' && git push"
  }
}
```

执行 `npm run deploy` 可将本地图床仓库中的图片等静态资源上传到远程服务器指定的地址了。  
执行 `npm run push` 可以提交到远程 git 仓库。

#### 6、配置 nginx

&emsp;&emsp;配置完成后重启 nginx。

``` images-hosting.conf
# images-hosting 的 nginx 配置
# http
#server {
#    listen          80;
#    server_name     images-hosting.liuxianyu.cn;
#    root            /mnt/projects/images-hosting;
#
#    location / {
#        try_files $uri $uri/ /index.html;
#    }
#}

# https
server {
    listen       443 ssl;
    server_name  images-hosting.liuxianyu.cn;
    root         /mnt/projects/images-hosting;
    ssl_certificate cert/images-hosting.liuxianyu.cn.pem;
    ssl_certificate_key cert/images-hosting.liuxianyu.cn.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**图片资源可以访问啦**
![](https://images-hosting.liuxianyu.cn/comment-bg.png)

#### 7、替换博客原有的链接地址

&emsp;&emsp;全局替换 `https://gitee.com/liuxy0551/image-hosting/` -> `https://images-hosting.liuxianyu.cn/`，重新部署博客即可恢复图片资源的访问啦。

#### 8、缺点

- 每次都是上传全量资源，耗时较长
