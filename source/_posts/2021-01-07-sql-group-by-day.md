---
title: SQL 按日期分组统计数量
urlname: sql-group-by-day
tags:
  - SQL 语句
categories:
  - 数据库
  - SQL 语句
author: liuxy0551
date: 2021-01-07 16:35:17
updated: 2021-01-07 16:35:17
---


&emsp;&emsp;最近在学习用 node 写个 Web Server，有个需求是统计最近30天每天新增的用户数，记录下 SQL 语句。

<!--more-->


### 1、User 表

![](https://liuxianyu.cn/image-hosting/posts/sql-group-by-day/1.png)

### 2、SQL 语句和结果

![](https://liuxianyu.cn/image-hosting/posts/sql-group-by-day/2.png)

```
SELECT
  DATE_FORMAT( createTime, "%Y-%m-%d" ) AS DAY,
  COUNT(*) AS count 
FROM
  `User` 
GROUP BY
  DATE_FORMAT( createTime, "%Y-%m-%d" );
```

### 参考资料：

<a href="https://blog.csdn.net/weixin_41679015/article/details/103914132" target="_black">sql 按日期分组统计数量</a>
