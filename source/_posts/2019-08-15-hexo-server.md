---
title: 将 Hexo 个人空间放到服务器上
urlname: hexo-server
tags:
  - blog
  - Hexo
  - Linux
categories:
  - Linux
  - Cent OS
author: liuxy0551
hide: false
copyright: true
date: 2019-08-15 17:23:45
updated: 2019-11-05 09:52:45
---


最近拿到一个服务器，尝试着把基于 Hexo 搭建的个人空间放到服务器上，用 Nginx 进行转发，顺便再熟悉一下 Linux 下的一些操作，同时会将部署、git 备份、上传服务器等一系列操作自动化。
<!--more-->


### 一、 虚拟机练手

　　1、我根据网上的教程在服务器上部署后，个人站的打开速度提升了很多，借用同事的一句话：5M 带宽的服务器放你一个静态资源怎么会慢？

　　2、实现目标后就想着总结一下过程，故在虚拟机上再试一次，同时也是感受一下 Mac OS 系统中虚拟机的玩法

　　3、我以前在 Windows 上玩的虚拟机是 VMware，这次在 Mac OS 上安装的是 VMware Fusion，基本上新建虚拟机的步骤都差不多，不再赘述，可参考以前的一篇随笔 [在 VMware 中安装 MacOS High Sierra 10.13](https://liuxianyu.cn/article/vmware-macos.html)

　　4、我目前选用的是和服务器一样的 Cent OS，具体操作步骤参考 [服务器实践](https://liuxianyu.cn/article/hexo-server.html#%E4%BA%8C-%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%AE%9E%E8%B7%B5)


### 二、 服务器实践

#### （一）、服务器基础环境搭建

　　1、参考 [Cent OS 基础环境搭建](https://liuxianyu.cn/article/cent-os-base.html)

#### （二）、Hexo 的部署

　　需要进行的操作：创建 deploy 用户、添加本机的 SSH 公钥到服务器、安装 git、安装 nginx 并配置等

　　1、创建 deploy 用户并设置密码，把 deploy 用户添加到 sudo 用户组中 - 参考 [Cent OS 基础环境搭建 - 添加 deploy 用户](https://liuxianyu.cn/article/cent-os-base.html#%E4%B8%80-%E6%B7%BB%E5%8A%A0-deploy-%E7%94%A8%E6%88%B7)

　　2、添加本机的 SSH 公钥到服务器 - 参考 [Cent OS 基础环境搭建 - 添加本机的 SSH 到服务器](https://liuxianyu.cn/article/cent-os-base.html#%E4%BA%8C-%E6%B7%BB%E5%8A%A0%E6%9C%AC%E6%9C%BA%E7%9A%84-ssh-%E5%85%AC%E9%92%A5%E5%88%B0%E6%9C%8D%E5%8A%A1%E5%99%A8)

　　3、切换到 deploy 用户，安装 git、nginx
　　参考 [Cent OS 基础环境搭建 - 安装 git](https://liuxianyu.cn/article/cent-os-base.html#%E4%B8%89-%E5%AE%89%E8%A3%85-git-vim-wget-lsof)
　　参考 [Cent OS 基础环境搭建 - 安装 nginx](https://liuxianyu.cn/article/cent-os-base.html#%E4%B8%89-%E5%AE%89%E8%A3%85-git-vim-wget-lsof)

　　4、在服务器上新建一个`blog`文件夹，用来存储`hexo d`后的静态文件，并授权给 deploy 用户。
    ```shell
    sudo mkdir -p /mnt/projects/hexo-blog/blog
    cd /mnt/projects/hexo-blog
    sudo chown -R deploy:deploy blog
    ```

　　5、在`hexo-blog`目录下初始化一个 git 裸库，服务器上的 git 仓库通常都以`.git`结尾，并把 git 仓库的 owner 改为 deploy 用户
    ```shell
    sudo git init --bare blog.git
    sudo chown -R deploy:deploy blog.git
    ```

　　6、新建一个 post-receive 文件
    ```shell
    sudo vim blog.git/hooks/post-receive
    ```
　　然后在该文件中输入以下内容，表示将分支导出到`blog`文件夹下。
    ```shell
    git --work-tree=/mnt/projects/hexo-blog/blog --git-dir=/mnt/projects/hexo-blog/blog.git checkout -f
    ```
　　保存退出之后，再执行以下命令，赋予该文件可执行权限。
    ```shell
    sudo chmod +x blog.git/hooks/post-receive
    ```

　　7、修改博客根目录下的`_config.yml`文件：
    ```shell
    deploy:
      type: git
      repo:
        github: https://github.com/liuxy0551/liuxy0551.github.io.git,master
        coding: https://git.dev.tencent.com/liuxianyu/liuxy0551.coding.me.git,master
        gitee: git@gitee.com:liuxy0551/liuxy0551.git,master
        server: deploy@47.65.55.62:/mnt/projects/hexo-blog/blog.git,master
    ```

　　8、在博客根目录下输入以下命令：
    ```shell
    hexo clean
    hexo g
    hexo d
    ```

　　9、配置 nginx
![](https://images-hosting.liuxianyu.cn/posts/hexo-server/1.png)
```shell
sudo vim /etc/nginx/conf.d/hexo-blog.conf
```
　　细节配置参考 [Cent OS 基础环境搭建 - 安装 nginx - 多配置文件](https://liuxianyu.cn/article/cent-os-base.html#%E4%BA%8C-%E5%A4%9A%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)，配置完成后启动 nginx 并设置开机自启，然后在浏览器输入域名就可以看见博客的内容了。
    ```shell
    sudo systemctl enable nginx
    sudo systemctl start nginx
    ```


### 参考资料

&emsp;&emsp;1、<a href="https://segmentfault.com/a/1190000012907499" target="_black">基于CentOS搭建Hexo博客</a>
