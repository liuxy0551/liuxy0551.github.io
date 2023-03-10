---
title: 在不同电脑间同步 WebStorm 配置
urlname: webstorm-settings-repository
tags:
  - WebStorm
categories:
  - 开发工具
  - WebStorm
author: liuxy0551
copyright: true
date: 2021-03-02 10:18:35
updated: 2021-03-02 10:18:35
---

&emsp;&emsp;平常使用 WebStorm 比较多，使用中偶尔会变更一下设置或者代码片段等，公司电脑和家里电脑会有些不同步，导出配置文件再导入有些不够高效（懒）。这个功能主要依赖`Preferences -> Tools -> Settings Repository`。

<!--more-->


### 操作步骤

#### 1、新建仓库

&emsp;&emsp;新建一个 git 仓库用来存放配置，这里选的是 Github，生成一个 Token，稍后需要使用。


![](https://liuxianyu.cn/image-hosting/posts/webstorm-settings-repository/1.png)

{% gp 2-2 %}
    ![](https://liuxianyu.cn/image-hosting/posts/webstorm-settings-repository/2.png)
    ![](https://liuxianyu.cn/image-hosting/posts/webstorm-settings-repository/3.png)
{% endgp %}

{% gp 8-4 %}
    ![](https://liuxianyu.cn/image-hosting/posts/webstorm-settings-repository/4.png)
    ![](https://liuxianyu.cn/image-hosting/posts/webstorm-settings-repository/5.png)
    ![](https://liuxianyu.cn/image-hosting/posts/webstorm-settings-repository/6.png)
    ![](https://liuxianyu.cn/image-hosting/posts/webstorm-settings-repository/7.png)
{% endgp %}

#### 2、上传配置

&emsp;&emsp;在需要上传配置的电脑上，打开 File -> Settings Repository，输入仓库地址后点击 Overwrite Remote。

{% gp 1-3 %}
![](https://liuxianyu.cn/image-hosting/posts/webstorm-settings-repository/8-1.png)
![](https://liuxianyu.cn/image-hosting/posts/webstorm-settings-repository/8-2.png)
![](https://liuxianyu.cn/image-hosting/posts/webstorm-settings-repository/9.png)
{% endgp %}

#### 3、下载配置

&emsp;&emsp;在需要下载配置的电脑上，打开 File -> Settings Repository，输入仓库地址后点击 Overwrite Local。

![](https://liuxianyu.cn/image-hosting/posts/webstorm-settings-repository/10.png)


### 参考资料：

&emsp;&emsp;1、<a href="https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token" target="_black">Github: Creating a personal access token</a>  
&emsp;&emsp;2、<a href="https://www.jetbrains.com/help/webstorm/sharing-your-ide-settings.html#settings-repository" target="_black">WebStorm: Share settings through a settings repository</a>  
