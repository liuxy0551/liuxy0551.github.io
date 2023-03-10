---
title: 通过 node 将本地 json 文件中的数据存储到 mysql
urlname: node-mysql
tags:
  - node
categories:
  - node
  - mysql
author: liuxy0551
copyright: true
date: 2020-08-28 17:39:40
updated: 2020-08-28 17:39:40
---

&emsp;&emsp;最近从 <a href="https://github.com/Tencent/wepy#%E5%93%AA%E4%BA%9B%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%98%AF%E7%94%A8-wepy-%E5%BC%80%E5%8F%91%E7%9A%84" target="_black">wepy 的案例</a> 中看到了一款`诗词墨客`的小程序，风格很喜欢，在这个小程序的`README.md`中又发现了中华古诗词数据库 <a href="https://github.com/chinese-poetry/chinese-poetry" target="_black">chinese-poetry</a>，便想着拿这些数据通过 node 导入 mysql 练练手，<a href="https://github.com/liuxy0551/node-chinese-poetry" target="_black">https://github.com/liuxy0551/node-chinese-poetry</a>，<a href="https://github.com/liuxy0551/chinese-poetry/tree/master/node-mysql" target="_black">node 代码：node-mysql</a>。

<!--more-->

&emsp;&emsp;这些 json 文件的获取建议直接 clone `chinese-poetry`的仓库，我是使用`cnpm install chinese-poetry -D`后从`node_modules`中复制的文件内容，作了一些筛选。


### 一、整理数据

&emsp;&emsp;将本地文件名和数据库表名对应：<a href="https://github.com/liuxy0551/chinese-poetry/blob/master/node-mysql/index.js" target="_black">/node-mysql/index.js</a>


### 二、读取文件

&emsp;&emsp;拼接路径和文件名，读取本地的 json 文件：<a href="https://github.com/liuxy0551/chinese-poetry/blob/master/node-mysql/file.js" target="_black">/node-mysql/file.js</a>


### 三、mysql

&emsp;&emsp;存储到 mysql 数据库主要使用`sequelize`模块：<a href="https://github.com/liuxy0551/chinese-poetry/blob/master/node-mysql/mysql.js" target="_black">/node-mysql/mysql.js</a>
&emsp;&emsp;`sequelize`模块有一些注意事项，如下：

#### 1、区分版本

注意 sequelize 的版本和 mysql 版本的对应关系：<a href="https://github.com/demopark/sequelize-docs-Zh-CN#v6" target="_black">sequelize 版本</a>

v6 版本
|  引擎 |  支持的最低版本 |
| :------------: | :------------: |
|  Postgre | [9.5 ](https://www.postgresql.org/docs/9.5/ ) |
|  `mysql` |  `5.7` |
|  MariaDB |  [10.1](https://mariadb.com/kb/en/changes-improvements-in-mariadb-101/) |
|  Microsoft SQL |  12.0.2000 |
|  SQLite |  [3.0](https://www.sqlite.org/version3.html) 

#### 2、mysql2

&emsp;&emsp;需要同时安装`mysql2`：

```
npm i mysql2 -S
```

#### 3、插入数据

&emsp;&emsp;create 接收 logging 参数，是否显示 sql 语句日志：

```javascript
async function insertData (k) {
  return new Promise(async resolve => {
    await Table.create({
      id: new Date().getTime(),
      title: k.title,
      paragraphs: k.paragraphs.toString(),
      isDelete: 0
    }, { logging: false }) // 不打印日志
    resolve()
  })
}
```


### 参考资料

1、<a href="https://github.com/chinese-poetry/chinese-poetry" target="_black">chinese-poetry</a>
2、<a href="https://itbilu.com/nodejs/npm/V1PExztfb.html" target="_black">Sequelize 中文API文档</a>
