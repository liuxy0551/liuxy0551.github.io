---
title: 在 Cent OS 中部署 Gotty 并提供给项目使用
urlname: cent-os-gotty
tags:
  - Cent OS
  - Gotty
categories:
  - Linux
  - Cent OS
author: liuxy0551
copyright: true
date: 2021-06-08 09:31:45
updated: 2021-06-08 09:31:45
---


&emsp;&emsp;<a href="https://github.com/yudai/gotty" target="_black">Gotty</a> 是一个能在浏览器打开的终端（Web Terminal），可以用于执行命令，也可以用于 SSH。通过把部署的主机作为跳板机，登录主机列表中的某一台机器。利用 <a href="https://liuxianyu.cn/article/docker-e.html" target="_black">前端学习 Docker 之旅（六）—— Docker 中安装 Cent OS 并通过 SSH 连接</a> 搭建的 Cent OS 环境来尝试部署并使用。

<!--more-->


### 一、实现效果

![](https://images-hosting.liuxianyu.cn/posts/cent-os-gotty/1.gif)


### 二、安装运行

#### 2.1 安装工具

```
yum install -y wget
```

#### 2.2 拉取对应的文件

&emsp;&emsp;从 <a href="https://github.com/yudai/gotty/releases" target="_black">Release</a> 页面下载对应的文件，建议下载最新版，当前最新版 v1.0.1。

```
wget -P /mnt/gotty https://github.com/yudai/gotty/releases/download/v1.0.1/gotty_linux_amd64.tar.gz
```

指令解释：
- wget -P `/保存文件的目录` `文件下载地址`


#### 2.3 解压文件

```
tar -xzvf /mnt/gotty/gotty_linux_amd64.tar.gz -C /mnt/gotty
```

#### 2.4 运行

##### 2.4.1 前台运行

```
/mnt/gotty/gotty -p 9000 -w --max-connection 50 --permit-arguments bash
```

##### 2.4.2 后台运行`推荐`

```
/mnt/gotty/gotty -p 9000 -w --permit-arguments bash >/mnt/gotty/log.file 2>&1 &
```

`>/mnt/gotty/log.file 2>&1 &`是将产生的文件存到指定文件中，可搜索`Linux 后台运行`；上述命令会返回对应进程的 PID。服务启动后可在 MAC 上访问 <a href="http://localhost:9000" target="_black">http://localhost:9000</a> 查看效果。

更多选项可参考：<a href="https://github.com/yudai/gotty#options" target="_black">https://github.com/yudai/gotty#options</a>

指令解释：
- `-p 9000` 表示运行在 9000 端口
- `-w` 表示允许客户端写入
- `--max-connection 50` 表示 socket 最大连接数
- `--permit-arguments` 表示运行 url 携带参数，`?arg=aaa`
- `bash` 表示进入 bash 终端
- `-r` 表示会在 url 后添加随机字符串路径
- `-c admin:1234` 表示需要用户名密码进行访问

#### 2.5 停止后台运行

&emsp;&emsp;**方法一：**

&emsp;&emsp;可参考：<a href="https://liuxianyu.cn/article/linux-command.html" target="_black">Linux 中的一些命令</a>

- 通过`lsof`查看对应端口的程序，会返回对应进程的 PID，假设 PID 是 1476：

```
yum install -y lsof
```
```
lsof -i:9000
```
```
kill 1476
```

&emsp;&emsp;**方法二：**

- 常用任务管理命令：

```
jobs      // 查看任务，返回任务编号n和进程号
fg %n     // 将编号为n的任务转前台运行
bg %n     // 将编号为n的任务转后台运行
ctrl + c  // 结束当前任务
ctrl + z  // 挂起当前任务
```
