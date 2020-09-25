---
title: linux 中关于进程的一些命令
urlname: linux-command
tags:
  - Linux
categories:
  - Linux
author: liuxy0551
copyright: true
date: 2020-09-25 20:26:42
updated: 2020-09-25 20:26:42
---


&ensp;&ensp;&ensp;&ensp;记录一些服务器上经常用到的关于进程的命令。

<!--more-->


#### 1、netstat

&ensp;&ensp;&ensp;&ensp;查看是否在监听项目端口，无 PID：

```
netstat -tpln
```


#### 2、lsof

&ensp;&ensp;&ensp;&ensp;查看指定端口的进程，会返回 PID：

```
lsof -i:9000
```


#### 3、kill

&ensp;&ensp;&ensp;&ensp;关闭某个进程：

```
kill 9127
```

&ensp;&ensp;&ensp;&ensp;-9 表明立即关闭：

```
kill -9 9127
```

