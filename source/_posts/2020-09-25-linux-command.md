---
title: linux 中的一些命令
urlname: linux-command
tags:
  - Linux
categories:
  - Linux
author: liuxy0551
copyright: true
date: 2020-09-25 20:26:42
updated: 2020-12-10 14:02:03
---


&emsp;&emsp;记录 linux 中的一些命令。

<!--more-->



#### 1、netstat - 查看端口

&emsp;&emsp;查看是否在监听项目端口，无 PID：

```
netstat -tpln
```


#### 2、lsof - 查看进程

&emsp;&emsp;查看指定端口的进程，会返回 PID：

```
lsof -i:9000
```


#### 3、kill - 杀死进程

&emsp;&emsp;关闭某个进程：

```
kill 9127
```

&emsp;&emsp;-9 表明立即关闭：

```
kill -9 9127
```


#### 4、tailf - 查看日志

```
tailf -100 pm2/logs/pm2-out.log
```


#### 5、cp - 复制文件

```
cp start.sh ../markdown-server/
```


#### 6、mv - 移动文件

```
mv start.sh ../markdown-server/
```
