---
title: Apache Bench(ab) 的使用方法
urlname: apache-bench
tags:
  - Linux
categories:
  - Linux
author: liuxy0551
copyright: true
date: 2022-02-22 16:41:45
updated: 2022-02-22 16:41:45
---


&emsp;&emsp;ApacheBench 是 Apache 服务器自带的一个 web 压力测试工具，简称 ab。ab 是一个命令行工具，对发起负载的本机要求很低，根据 ab 命令可以创建很多的并发访问线程，模拟多个访问者同时对某一 URL 地址进行访问，因此可以用来测试目标服务器的负载压力。总的来说 ab 工具小巧简单，可以提供需要的基本性能指标，但是没有图形化结果，不能监控。这里记录下参数含义。

<!--more-->


&emsp;&emsp;格式：ab [options] [http://]hostname[:port]/path

```shell 
ab -c 10 -n 10 http://baidu.com/
```

指令解释：
- `-n` 本次测试发起的总请求数
- `-c` 一次产生的请求数（或并发数）
- `-t` 测试所进行的最大秒数，默认没有时间限制
- `-r` 抛出异常继续执行测试任务
- `-p` 包含了需要 POST 的数据的文件，文件格式如`p1=1&p2=2`，使用方法是`-p 111.txt`
- `-T` POST 数据所使用的 Content-type 头信息，如`-T “application/x-www-form-urlencoded” `，配合`-p`使用
- `-v` 设置显示信息的详细程度 – 4或更大值会显示头信息， 3或更大值可以显示响应代码(404, 200等), 2或更大值可以显示警告和其他信息。 -V 显示版本号并退出
- `-c` `-C cookie-name=value`对请求附加一个 Cookie:行。其典型形式是`name=value`的一个参数对。此参数可以重复，用逗号分割。
- `-w` 以 HTML 表的格式输出结果，默认是白色背景的两列宽度的一张表。

&emsp;&emsp;参数很多，一般我们用`-c`和`-n`参数就可以了，`ab -c 并发数 -n 请求数 URL地址`。

`-c`后面的 10 表示采用 10 个并发（模拟 10 个人同时访问），`-n`后面的 10 代表总共发出 10 个请求；后面的网址表示测试的目标 URL。

![](https://images-hosting.liuxianyu.cn/posts/apache-bench/1.png)

- Document Path 测试页面
- Document Length 页面大小
- Concurrency Level 测试的并发数
- Time taken for tests 整个测试持续的时间
- Complete requests 完成的请求数量
- Failed requests 失败的请求数量
- Write errors: 0
- Total transferred 整个过程中的网络传输量
- HTML transferred 整个过程中的HTML内容传输量
- Requests per second 最重要的指标之一，相当于LR中的每秒事务数，后面括号中的mean表示这是一个平均值
- Time per request 最重要的指标之二，相当于LR中的平均事务响应时间，后面括号中的mean表示这是一个平均值
- Time per request 每个连接请求实际运行时间的平均值
- Transfer rate 平均每秒网络上的流量，可以帮助排除是否存在网络流量过大导致响应时间延长的问题
