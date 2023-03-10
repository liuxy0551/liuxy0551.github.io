---
title: 使用 certbot 在 Cent OS 中给 nginx 配置 https
urlname: centos-nginx-https
tags:
  - Cent OS
  - nginx
  - https-SSL
categories:
  - Linux
  - Cent OS
  - https-SSL
author: liuxy0551
copyright: true
date: 2019-11-15 17:08:08
updated: 2019-11-15 17:08:08
---


　　免费的 SSL 证书可以通过阿里云获取，也可以通过以下操作安装。这里只记录使用 certbot 在 CentOS 中给 nginx 配置 https：
<!--more-->


　　先去 Certbot 官网 [https://certbot.eff.org/](https://certbot.eff.org/)，选择 nginx ，再选择 CentOS/RHEL 7，意思是在什么系统上使用什么 HTTP 服务器

![](https://liuxianyu.cn/image-hosting/posts/centos-nginx-https/1.png)

#### 1、查看服务器实例
``` shell
sudo cat /sys/devices/virtual/dmi/id/product_uuid
```
　　如果没有 dmi 文件夹，就进行安装：
``` shell
sudo yum -y install dmidecode 
```
　　如果 UUID 是`ec2`开头，则需要运行以下两行指令：
``` shell
sudo yum -y install yum-utils
sudo yum-config-manager --enable rhui-REGION-rhel-server-extras rhui-REGION-rhel-server-optional
```

#### 2、安装 Certbot
``` shell
sudo yum install -y certbot python2-certbot-nginx
```

#### 3、获取并安装 SSL 证书
``` shell
sudo certbot --nginx
```
　　![](https://liuxianyu.cn/image-hosting/posts/centos-nginx-https/2.png)报错如上，参考资料：[Certbot :ImportError: No module named 'requests.packages.urllib3](https://stackoverflow.com/questions/46168364/certbot-importerror-no-module-named-requests-packages-urllib3)，执行以下指令：
``` shell
sudo pip install --upgrade --force-reinstall 'requests==2.6.0' urllib3
```
　　![](https://liuxianyu.cn/image-hosting/posts/centos-nginx-https/3.png)提示输入以下指令升级`pip`，可以不搭理。
``` shell
sudo pip install --upgrade pip
```
　　接下来重新运行`sudo certbot --nginx`：
``` shell
sudo certbot --nginx
```

　　按照提示依次输入：
　　- 输入邮箱，用于接收紧急续订和安全通知邮件
　　- 输入 A，阅读并同意条款
　　- 输入 N，邮箱接收相关推广邮件，不需要
　　- 输入数字，选择部署的域名，多个域名用`,`隔开
　　- 输入数字，选择是否将 http 重定向到 https。1、无需重定向，2、重定向
    {% gp 2-2 %}
    ![](https://liuxianyu.cn/image-hosting/posts/centos-nginx-https/4.png)
    ![](https://liuxianyu.cn/image-hosting/posts/centos-nginx-https/5.png)
    {% endgp %}
    
#### 4、确定 Certbot 正常运行 

　　在浏览器输入域名，在 URL 栏确认是否有 🔒 图标

#### 5、设置自动续订
``` shell
echo "0 0,12 * * * root python -c 'import random; import time; time.sleep(random.random() * 3600)' && certbot renew" | sudo tee -a /etc/crontab > /dev/null
```
　　可查看续订设置：
``` shell
cat /etc/crontab
```
