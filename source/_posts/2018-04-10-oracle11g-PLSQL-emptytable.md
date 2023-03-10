---
title: Oracle 11g 数据库备份涉及的部分记忆点
urlname: oracle11g-PLSQL-emptytable
tags:
  - Oracle
categories:
  - 数据库
  - Oracle
author: liuxy0551
copyright: true
date: 2018-04-10 21:39:30
updated: 2018-04-10 21:39:30
---


&emsp;&emsp;在开发中有一个项目，其中有 32 个表，含有 10 个空表（没有数据），开发过程恰逢自己电脑换系统和新配一台工作电脑，在备份数据库时，感觉有部分记忆点值得记录一下。
<!--more-->


### 一、导出、导入数据文件（可用于数据备份，或者不同地点间的数据库同步）

&emsp;&emsp;1、使用 PLSQL 12 中自带的 工具——导出表 ，单击第一个表，按住 Shift 键单击最后一个表即可将所有表全部选定，选定导出目录，填写输出文件名称，保存，数据多的时候可以在弹出的窗口中看见导出过程。（这时候可以发现有部分表提示“导出失败，某某表不存在”，查看这些表后发现这些表都有一个共同的特征：无数据，解决办法可跳至第三段）

&emsp;&emsp;2、在新电脑中使用 PLSQL 12 中的 工具——导入表，选中刚刚的导出文件，导入数据即可。

### 二、想象中的导出、导入数据文件

#### 以下为缺少表空间的错误：

1、在原先正常的电脑上使用 PL SQL 12 导出 32 个表，为 .dmp 格式文件，并在新电脑进行导入表的操作  
2、弹出一个窗口后秒关，尝试通过截图快捷键截图查看，以失败告终，请教项目组上的数据库老师后知道了这是缺少表空间的缘故，之后   就是各种恶补表空间知识。  
3、在 PLSQL 中新建 SQL 窗口，键入以下语句并执行：

```
CREATE TABLESPACE OP
LOGGING
DATAFILE 'D:\Oracle\product\11.2.0\OP.DBF'
SIZE 50M
AUTOEXTEND ON
NEXT 32M MAXSIZE UNLIMITED
EXTENT MANAGEMENT LOCAL;
```

&emsp;&emsp;其中第三行语句含有表空间的存放位置，建议放在 Oracle 的安装目录里面，防止误删除。OP 为表空间名字，其他行语句想了解的可自行百度具体含义。删除已经使用的表空间会使得对应的用户无法登录使用，我是重装 Oracle 解决的，就是这么低技术含量，幸好是没有什么重要数据。可以删除表空间后再删除这个 .DBF 文件，删除语句如下：

``` 
DROP TABLESPACE OP;
```

### 三、解决空表不导出的方法

1、在数据导出的时候，无法导出空表，提示错误“EXP-00011：table 不存在”。
产生原因：Oracle 11g 默认创建一个表时不分配 segment，只有在插入数据时才会产生（当然也可以强制分配），以节省磁盘空间。

2、解决方法：  
&emsp;&emsp;(1)第一种：在空表中插入一条数据然后再对插入的数据进行删除，便可以进行数据导出（我的那几个表添加假数据很难，如果表少的话可以手动执行，对于多个表的情况可以采用语句进行批量操作的）。  
&emsp;&emsp;(2)第二种：可以使用手工为空表分配 Extent 的方式，来解决导出之前建立的空表的问题。在 PLSQL 中新建 SQL 窗口，键入以下语句并执行：

``` 
SELECT 'ALTER TABLE '||TABLE_NAME||' ALLOCATE EXTENT;' FROM USER_TABLES WHERE SEGMENT_CREATED='NO';
```

![](https://liuxianyu.cn/image-hosting/posts/oracle11g-PLSQL-emptytable/1.png)<br>

可以通过语句导出查询结果，执行导出的语句即可（表数量少的话可以复制粘贴执行查询结果）。

<br>![](https://liuxianyu.cn/image-hosting/posts/oracle11g-PLSQL-emptytable/2.png)

``` 
set heading off;
set echo off;
set feedback off;
set termout on;
spool D:\Oracle\product\11.2.0\allocate.sql;
SELECT 'ALTER TABLE '||TABLE_NAME||' ALLOCATE EXTENT;' FROM USER_TABLES WHERE SEGMENT_CREATED='NO';
spool off;
```


导出后执行导出的语句：

``` 
@ D:\Oracle\product\11.2.0\allocate.sql;
```

&emsp;&emsp;(3)第三种：设置deferred_segment_creation 参数，该参数值默认是TRUE，当改为FALSE时，无论是空表还是非空表，都分配segment。
    （这种方法我没有试过，你可以自行尝试）

``` 
SELECT 'ALTER TABLE '||TABLE_NAME||' ALLOCATE EXTENT;' FROM USER_TABLES WHERE NUM_ROWS=0;
```

>* 实测上面百度到的这句指令不显示空表结果，你可以自己试一试。
>* 下面这个语句可在 TNS 连接不上时导入表：

``` 
imp scott/tiger@localhost:1521/orcl full=y  file= E:\my.dmp ignore=y;
```

>* 1、写这篇随笔的时候发现在 Atom 中选中单词，按住 Ctrl 后按 K， 再按 U，即可将选中的单词大写
>* 2、白天的技巧：Eclipse 中查看方法在哪里被调用了——选中方法，直接Ctrl + Shift + G 或者 Ctrl + Alt + H
