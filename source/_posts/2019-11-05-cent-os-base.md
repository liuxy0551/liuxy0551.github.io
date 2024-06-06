---
title: Cent OS 基础环境搭建
urlname: cent-os-base
tags:
  - Linux
  - Cent OS
categories:
  - Linux
  - Cent OS
author: liuxy0551
hide: false
copyright: true
date: 2019-11-05 09:52:45
updated: 2019-11-05 09:52:45
---


　　趁着双十一买了服务器和域名，这里记录一下 Cent OS 服务器基础环境的搭建。
<!--more-->


### 一、 添加 deploy 用户

　　购买服务器后在实例详情 -> 基本信息 -> 更多 -> 重置实例密码，重启服务器后就可以使用`ssh root@47.65.55.62`来连接服务器了。

　　1、创建用户，默认生成 用户组 和 用户名 相同；将 deploy 加入 root 组
    ```shell
    adduser deploy
    usermod -a -G root deploy
    ```

　　2、修改 deploy 的密码
    ```shell
    passwd deploy
    ```

　　3、切换 sudo 时候无需密码
    ```shell
    vim /etc/sudoers
    ```
　　找到 root ALL=(ALL:ALL) ALL，在这行下面增加以下代码，NOPASSWD 表示切换 sudo 时候无需输入 root 密码
    ```shell
    deploy ALL=(ALL) NOPASSWD: ALL
    ```


### 二、 添加本机的 SSH 公钥到服务器

　　以后连接服务器不用每次都输入用户名和密码

　　1、在本地生成公私钥对

```shell
ssh-keygen -t rsa
```

　　2、本地执行以下命令并输入对应密码完成自动写入到远程服务器的`~/.ssh/authorized_keys`文件，没有公钥可通过`ssh-keygen -t rsa`一路回车生成公钥

```shell
ssh-copy-id deploy@47.65.55.62
```
或
```
ssh-copy-id -i .ssh/id_rsa_liuxy0551 deploy@47.65.55.62
```

　　3、windows 执行以下操作

```shell
 type $env:USERPROFILE\.ssh\id_rsa.pub | ssh {user-name}@{user-ip} "cat >> .ssh/authorized_keys"
```
　　deploy 用户可能没有 .ssh 文件夹，执行以下命令：
```shell
su deploy
```
```shell
mkdir ~/.ssh
chmod 700 ~/.ssh
touch ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

　　4、再使用`ssh deploy@47.65.55.62`连接服务器就可以免密登录了

>**注意**
>* **如果还不能免密登录，就进行第 3 步设置权限**
>* **authorized_keys 权限一定要为600**

　　5、【可选】在远程服务器配置相应的权限：
    ```shell
    chmod 700 /home/deploy
    chmod 700 /home/deploy/.ssh
    chmod 600 /home/deploy/.ssh/authorized_keys
    ```
　　`chmod 777 -R /mnt`将 mnt 目录下所有文件都给予 777 权限

### 三、安装 git，vim、wget、lsof
-y 代表需要输入 y 的地方自动输入
```shell
yum install git -y
git --version
```

```shell
yum install vim wget lsof -y
```


### 四、安装 nginx

#### （一）、安装与常见命令

　　1、安装 nginx 并查看版本号，安装完成后就启动 nginx 查看是否有问题
    ```shell
    yum install nginx -y
    nginx -v
    systemctl start nginx
    ```

　　2、nginx 常用命令

    ```shell
    systemctl start/stop/reload/restart/status nginx
    ```

&emsp;&emsp;重新加载 nginx 配置

    ```shell
    nginx -s reload
    ```

#### （二）、多配置文件

　　这个服务器之后可能会部署很多学习的项目，为了避免混乱，准备每个项目单独配置。默认配置文件为：`/etc/nginx/nginx.conf`。

　　1、如果没有域名且想要使用 80 端口，需要将 nginx 默认配置中的 server 删除，注意保留文件中的`include`指向。
![](https://images-hosting.liuxianyu.cn/posts/cent-os-base/1.png)

　　2、在`/etc/nginx/conf.d`文件夹下创建配置文件，以`.conf`结尾，配置内容可以参考百度或 [Nginx - Vue单页面应用配置(Vue部署)](https://github.com/wuyuedefeng/blogs/issues/16)
```shell
vim /etc/nginx/conf.d/hexo-blog.conf
```
```
server {
    listen 80;
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
}
```

　　启动 nginx，并设置开机自启
    ```shell
    systemctl start nginx
    systemctl enable nginx
    ```


>**注意**
>* **配置安全组规则, 这是个大坑。80 端口没打开的时候，无法通过 ip 直接访问，同事说 2018 年 80 端口还是默认打开的，欺负新人**

![](https://images-hosting.liuxianyu.cn/posts/cent-os-base/2.png)


### 五、安装 node

　　1、选择下载目录（[为什么选择这个目录下载？](https://blog.csdn.net/qq_15766181/article/details/80755786)）：
    ```shell
    cd /usr/local/
    ```

　　2、下载源文件
    ```shell
    wget https://nodejs.org/dist/v14.21.1/node-v14.21.1-linux-x64.tar.gz
    ```

　　3、解压源文件
    ```shell
    tar zxvf node-v14.21.1-linux-x64.tar.gz
    ```

　　4、重命名文件夹
    ```shell
    mv node-v14.21.1-linux-x64 nodejs14
    ```

　　5、修改配置文件
    ```shell
    vim /etc/profile
    ```

　　6、在当前文件的最后一行加上以下内容：
    ```
    # node
   export NODE_HOME=/usr/local/nodejs14
   export PATH=$NODE_HOME/bin:$PATH
    ```

　　7、更新配置文件
    ```shell
    source /etc/profile
    ```

　　8、查看版本号
    ```shell
    node -v
    npm -v
    ```


### 六、其他安装

```shell
npm i nrm pm2 yarn pnpm -g
```


### 七、服务器生成 ssh key
服务器拉取一些私有仓库的 git 代码时无需输入用户名密码
```shell
ssh-keygen -t rsa -b 4096 -C "liuxy0551@qq.com"
```


### 八、写在后面

　　因为是第一次在服务器上操作，很多操作都是尝试着进行的，而我这个人又有点强迫症，所以在很多不太合适的操作过后我都会重置一下服务器。
操作步骤为：阿里云控制台 -> 云服务器 ECS -> 选择实例 -> 实例详情 -> 右上角 停止实例 -> 左侧 本实例磁盘 -> 重新初始化磁盘。
但是下次再连接服务器的时候就会报错了`WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!`，根据错误提示编辑对应的文件，删除服务器的记录即可。

![](https://images-hosting.liuxianyu.cn/posts/cent-os-base/3.png)

```shell
vim ~/.ssh/known_hosts
```
