---
title: Linux 定时备份 mysql (内有 docker 版)
urlname: linux-crontab
tags:
    - Linux
categories:
    - Linux
author: liuxy0551
copyright: true
date: 2024-01-08 14:02:17
updated: 2024-01-08 14:02:17
---

&emsp;&emsp;Linux 中的定时任务一般通过 `crontab` 命令来管理，这里记录下常用的一些任务。

<!--more-->

### 一、常用命令

- `crontab -l` 查看当前用户的定时任务列表
- `crontab -e` 编辑当前用户的定时任务列表
- `service crond status`  查看服务状态
- `service crond start`   启动服务
- `service crond stop`    关闭服务
- `service crond restart` 重启服务
- `service crond reload`  重新载入配置


### 二、命令脚本

&emsp;&emsp;先创建存放脚本的文件夹：

``` shell
mkdir -p /mnt/mysqldump
```

&emsp;&emsp;再编辑脚本文件(`docker 版` 在下方)：

``` shell
vim /mnt/mysqldump/my-database.sh
```

``` sh
#!/bin/bash

# 数据库用户名
username=root
# 数据库密码
password=123456
# 要备份的数据库名称
database_name=my-database
# 保存备份个数，备份30天数据
number=30
# 日期格式
day=`date +%Y%m%d`
# 备份保存路径
backup_dir=/mnt/mysqldump/$day


# 如果文件夹不存在则创建
if [ ! -d $backup_dir ];
then
    mkdir -p $backup_dir;
fi

# 简单写法 mysqldump -u root -p123456 my-database > /mnt/my-database.sql
mysqldump -u $username -p$password $database_name > $backup_dir/$database_name.sql

# 写创建备份日志
echo "create $backup_dir/$database_name.dump" >> $backup_dir/log.txt

# 删除超期的备份
delfile=`ls -l -crt $backup_dir/*.sql | awk '{print $9 }' | head -1`

# 判断现在的备份数量是否大于 $number
count=`ls -l -crt $backup_dir/*.sql | awk '{print $9 }' | wc -l`

if [ $count -gt $number ]
then
  # 删除更早生成的备份，只保留 $number 数量的备份
  rm $delfile
  # 写删除文件日志
  echo "delete $delfile" >> $backup_dir/log.txt
fi
```

&emsp;&emsp;上述脚本仅需关注 `username`、`password`、`database_name`、`number` 等变量；通过 ls 命令获取第 9 列（文件名列），再通过实现定义操作时间最晚的那个需要删除的文件。

> **注意**
> 　　执行命令可能提示 `You have new mail.`，输入 `mail` 查看 crontab 返回的信息，输入数字查看对应的信息

&emsp;&emsp;`mail` 交互式界面中的常用命令：

- `n` 查看下一封邮件
- `p` 查看上一封邮件
- `d 1 2` 按编号删除邮件，不填编号时删除当前邮件
- `d *` 删除所有邮件
- `u 1 2` 按编号恢复删除的邮件
- `q` 退出 mail 界面
- `h` 显示邮件列表的头部信息，包括邮件的发件人、主题等
- `?` 显示帮助信息

![](https://images-hosting.liuxianyu.cn/posts/linux-crontab/1.png)

&emsp;&emsp;给脚本文件授权，否则会在 mail 中看到 `Permission denied`：

``` shell
chmod +x /mnt/mysqldump/*.sh
```


### crontab

&emsp;&emsp;cron 读取一个或多个配置文件，这些配置文件中包含了命令行及其调用时间。cron 的配置文件称为 `crontab`，是 `cron table` 的简写。

#### crontab 语法

```
        minute  hour   day-of-month  month-of-year  day-of-week commands
合法值   00-59  00-23      01-31          01-12         0-6     (0 is sunday)
```

&emsp;&emsp;除了数字还有几个个特殊的符号就是 `*` `/` 和 `-` `,`，`*` 代表所有的取值范围内的数字，`/` 代表每的意思，`/5` 表示每 5 个单位，`-` 代表从某个数字到某个数字，`,` 分开几个离散的数字。

#### 添加 cron 定时任务

&emsp;&emsp;`crontab -e` 编辑任务文件，添加以下内容：

```
50 23 * * * /mnt/mysqldump/my-database.sh
```

&emsp;&emsp;可以使用 `crontab -l` 查看任务是否已添加成功。


### docker 版

&emsp;&emsp;当通过 docker 安装 mysql 时，也可以进行备份，比常规版新增了 `container_name`、`container_tmp_dir` 参数，需要注意 `container_name` 的值。使用下方脚本：

``` sh
#!/bin/bash

# 数据库用户名
username=root
# 数据库密码
password=123456
# 要备份的数据库名称
database_name=my-database
# docker 容器名
container_name=mysql-5.7
# 容器内临时存放的路径
container_tmp_dir=/tmp
# 保存备份个数，备份30天数据
number=30
# 日期格式
day=`date +%Y%m%d`
# 宿主机备份保存路径
backup_dir=/mnt/mysqldump/$day


# 如果文件夹不存在则创建
if [ ! -d $backup_dir ];
then
    mkdir -p $backup_dir;
fi

container_sql_path=$container_tmp_dir/$database_name.sql
# docker exec mysql-5.7 bash -c "mysqldump -u root -pMysql..1234 $database_name > /tmp/my-database.sql"
docker exec $container_name bash -c "mysqldump -u $username -p$password $database_name > $container_sql_path"
# 将容器内的文件挪到宿主机
docker cp $container_name:$container_sql_path $backup_dir
# 删除容器内的临时文件
docker exec $container_name rm -rf $container_sql_path

# 写创建备份日志
echo "create $backup_dir/$database_name-$dd.dump" >> $backup_dir/log.txt

# 删除超期的备份
delfile=`ls -l -crt $backup_dir/*.sql | awk '{print $9 }' | head -1`

# 判断现在的备份数量是否大于 $number
count=`ls -l -crt $backup_dir/*.sql | awk '{print $9 }' | wc -l`

if [ $count -gt $number ]
then
  # 删除更早生成的备份，只保留 $number 数量的备份
  rm $delfile
  # 写删除文件日志
  echo "delete $delfile" >> $backup_dir/log.txt
fi
```


### 参考资料：

&emsp;&emsp;<a href="https://segmentfault.com/a/1190000040642688#item-4" target="_black">编写BASH维护固定数量备份文件</a>

