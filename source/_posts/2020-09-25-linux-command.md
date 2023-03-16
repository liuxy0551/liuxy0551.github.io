---
title: Linux 中的一些命令
urlname: linux-command
tags:
  - Linux
  - Cent OS
categories:
  - Linux
  - Cent OS
author: liuxy0551
copyright: true
date: 2020-09-25 20:26:42
updated: 2023-03-16 17:25:03
---


&emsp;&emsp;记录 Linux 中的一些命令。

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


#### 5、cp - 复制文件、目录

```
cp start.sh ../markdown-server/
cp -r node_modules ../markdown-server/
```


#### 6、mv - 移动文件、重命名

```
mv start.sh ../markdown-server/
mv start.sh new-start.sh
```


#### 7、ssh-copy-id - 添加本机的 SSH 公钥到服务器

```
ssh-copy-id deploy@47.65.55.62
```
或
```
ssh-copy-id -i .ssh/id_rsa_liuxy0551 deploy@47.65.55.62
```


#### 8、du - 查看文件夹空间占用

```
du -h --max-depth=1 /home
```

&emsp;&emsp;MacOS 系统下在当前文件夹下执行：

```
du -h -d 1
```
或
```
find . -size +10M | xargs ls -lah
```


#### 9、ls - 查看文件列表

```
ls -lahS
```

- -l 每个文件一行列出
- -a 所有文件，包含隐藏文件
- -h 将文件内容大小以GB、KB等易读的方式显示
- -S 以文件大小排序


#### 10、查看 CentOS 的 CPU、内存、磁盘等信息

查看每个物理CPU中core的个数(即核数)
```
cat /proc/cpuinfo| grep "cpu cores"| uniq
```

查看内存信息
```
cat /proc/meminfo
```

查看磁盘空间
```
df
```


#### 11、tar 压缩

压缩
```
tar -czf fileName.tar.gz /dist
```

解压
```
tar -xzf fileName.tar.gz
```

<a href="https://blog.csdn.net/MssGuo/article/details/117387213"; target="_black">tar 打包压缩命令</a>
