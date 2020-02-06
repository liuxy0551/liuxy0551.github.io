---
title: Cent OS 基础环境搭建
urlname: cent-os-base
tags:
  - Cent OS
  - Linux
  - 服务器
categories:
  - Cent OS
  - Linux
  - 服务器
author: liuxy0551
hide: false
copyright: true
date: 2019-11-05 09:52:45
updated: 2019-11-05 09:52:45
---

## 介绍

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


### 二、 添加本机的 SSH 到服务器
以后连接服务器不用每次都输入用户名和密码

　　1、查看本机 SSH 公钥
    ```shell
    cat ~/.ssh/id_rsa.pub
    ```
    
　　2、切换 deploy 用户，服务器创建 .ssh 文件夹，打开服务器 authorized_keys 文件，将本机 SSH 公钥粘贴进去
    ```shell
    su deploy
    cd ~
    mkdir .ssh
    cd .ssh
    vim authorized_keys
    ```
>**注意**
>* **巨坑：如果在第 3 步完成后还是不能免密登录的话，把刚刚粘贴进 authorized_keys 文件的秘钥再粘贴一遍即可**
>* **巨坑：猜测是 Cent OS 对第一个公钥的识别有问题，没查找到合适的资料，待查找。**
    
　　3、配置相应的权限：
    ```shell
    chmod 700 /home/deploy/.ssh
    chmod 600 /home/deploy/.ssh/authorized_keys
    ```
    
　　4、再使用`ssh deploy@47.65.55.62`连接服务器就可以免密登录了


### 三、安装 git
-y 代表需要输入 y 的地方自动输入
```shell
sudo yum install git -y
git --version
```


### 四、安装 nginx

#### （一）、安装与常见命令

　　1、安装 nginx 并查看版本号
    ```shell
    sudo yum install nginx -y
    nginx -v
    ```

　　2、配置 nginx
    ```shell
    sudo vim /etc/nginx/nginx.conf
    ```

　　3、nginx 常用命令
    ```shell
    sudo systemctl start/stop/reload/restart/status nginx
    ```

#### （二）、多配置文件

　　这个服务器之后可能会部署很多学习的项目，为了避免混乱，准备每个项目单独配置。默认配置文件为：`/etc/nginx/nginx.conf`。

　　1、将 nginx 默认配置中的 server 删除，注意保留文件中的`include`指向。
![](/images/posts/cent-os-base/2.png)

　　2、在`/etc/nginx/conf.d`文件夹下创建配置文件，以`.conf`结尾，配置内容可以参考百度或 [Nginx - Vue单页面应用配置](https://blogs.zezeping.com/#/Blog/BlogDetail/16)
```shell
sudo vim /etc/nginx/conf.d/hexo-blog.conf
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

　　启动 nginx 并设置开机自启
    ```shell
    sudo systemctl start nginx
    sudo systemctl enable nginx
    ```

    
>**注意**
>* **配置安全组规则, 这是个大坑。80 端口没打开的时候，无法通过 ip 直接访问，同事说 2018 年 80 端口还是默认打开的，欺负新人**

![](/images/posts/cent-os-base/1.png)


### 五、安装 node

　　1、选择下载目录（[为什么选择这个目录下载？](https://blog.csdn.net/qq_15766181/article/details/80755786)）：
    ```shell
    cd /usr/local/
    ```

　　2、下载源文件
    ```shell
    wget https://nodejs.org/dist/v12.13.0/node-v12.13.0-linux-x64.tar.gz
    ```

　　3、解压源文件
    ```shell
    tar zxvf node-v12.13.0-linux-x64.tar.gz
    ```

　　4、重命名文件夹
    ```shell
    mv node-v12.13.0-linux-x64 nodejs
    ```

　　5、修改配置文件
    ```shell
    vim /etc/profile
    ```

　　6、在当前文件的最后一行加上以下两行：
    ```
   export NODE_HOME=/usr/local/nodejs
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
    

### 六、服务器生成 ssh key
服务器拉取 git 代码时无需输入用户名密码
```shell
ssh-keygen -t rsa -b 4096 -C "liuxy0551@qq.com"
```


### 七、写在后面

　　因为是第一次在服务器上操作，很多操作都是尝试着进行的，而我这个人又有点强迫症，所以在很多不太合适的操作过后我都会重置一下服务器。
操作步骤为：阿里云控制台 -> 云服务器 ECS -> 选择实例 -> 实例详情 -> 右上角 停止实例 -> 左侧 本实例磁盘 -> 重新初始化磁盘。
但是下次再连接服务器的时候就会报错了`WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!`，根据提示编辑`~/.ssh/known_hosts`文件，删除服务器的记录即可。

```shell 
vim ~/.ssh/known_hosts
```
