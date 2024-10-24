---
title: MySQL 备份 —— 导出导入 sql 文件
urlname: mysqldump
tags:
    - MySQL
categories:
    - MySQL
author: liuxy0551
copyright: true
date: 2024-01-07 21:46:05
updated: 2024-01-07 21:46:05
---

&emsp;&emsp;最近在学习 MySQL 的备份和恢复，我的实际应用场景是正式服数据同步到测试服用于测试、备份生产环境的数据库。

<!--more-->

&emsp;&emsp;我的 MySQL 是通过 docker 安装的，非容器的可以执行双引号中的命令；可以通过 `ls -lhS` 命令在目录下查看是否已存在文件。下方实例中的 `123456` 为数据库密码，`my-database` 是数据库名。

### 一、数据备份

```shell
docker exec mysql-5.7-backup bash -c "mysqldump -uroot -p123456 my-database > /tmp/my-database.sql"
```

> **注意**
> 　　`-p` 后面跟密码，加空格会被识别为 database；也可以不跟密码，回车后输入密码

&emsp;&emsp;导出后的文件还在 docker 容器中，可以通过 `docker cp` 命令将备份的 sql 文件拷贝到宿主机，便于后面在其他 docker 容器内使用。

```shell
docker cp mysql-5.7:/tmp/my-database.sql /opt/
```

&emsp;&emsp;同时备份多个数据库

```shell
docker exec mysql-5.7-backup bash -c "mysqldump -uroot -p123456 --databases dbname2 dbname2 > Backup.sql"
```


### 二、数据还原

&emsp;&emsp;还原使用 `mysqldump` 命令备份的数据库，先将导出的 sql 文件通过 `docker cp` 命令拷贝到备份的 mysql 容器内。

```shell
docker cp /opt/my-database.sql mysql-5.7-backup:/tmp/
```

&emsp;&emsp;再进行导入：

```shell
docker exec mysql-5.7-backup bash -c "mysql -uroot -p123456 my-database < /tmp/my-database.sql"
```
