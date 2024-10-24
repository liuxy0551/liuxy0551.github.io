---
title: Git Submodules 的使用
urlname: git-submodules
tags:
  - git
categories:
  - git
author: liuxy0551
copyright: true
date: 2020-03-25 12:40:38
updated: 2020-03-25 12:40:38
---


&emsp;&emsp;git submodules 是为了多个项目（模块）都能够及时更新到最新的公共资源，解决需要把最新代码拷贝到各个项目的痛点。刚好最近公司开发的产品需要分为各个版本，但是主体功能一致，所以点上 git submodules 的技能点。对于 vue 项目，公共库可以分为 pages、components、styles 等几个目录。
<!--more-->


###  一、准备项目

&emsp;&emsp;**这篇随笔暂时只记录多个项目使用一个公共库的过程。**
&emsp;&emsp;准备好公共库（以 git-public 为例，称为子模块），准备好使用子模块的项目若干（以 git-a 和 git-b 为例，称为主项目）。


### 二、为主项目添加 submodules

#### 2.1、主项目初次引入

&emsp;&emsp;在 git-a 主项目下执行：`git submodules add <url> <path>`
``` shell
git submodules add https://github.com/liuxy0551/git-public.git src/submodules
```

#### 2.2、多人协同

##### 2.2.1、clone
&emsp;&emsp;如果你是第一次在项目中引入子模块的开发人员，那么项目新加入的成员可以按照以下方法 clone 带有 submodules 的项目：
``` shell
git clone https://github.com/liuxy0551/git-a.git
git submodule init
git submodule update
```
或：
``` shell
git clone --recursive https://github.com/liuxy0551/git-a.git
```
`--recursive`代表 clone 项目的同时 clone 关联的 submodules。

##### 2.2.2、pull
&emsp;&emsp;如果你是第一次在项目中引入子模块的开发人员，那么项目的其他成员可以按照以下方法 pull 到带有 submodules 的项目：
``` shell
git pull origin <当前分支>
```


### 三、获取、更新子模块代码

#### 3.1、获取子模块代码
&emsp;&emsp;在主项目中的子模块路径下执行：
``` shell
git pull origin master
```
&emsp;&emsp;多个子模块可在主项目路径下执行：
``` shell
git submodule foreach git pull origin master
```

#### 3.2、更新子模块代码

##### 3.2.1、在子模块项目中更新
&emsp;&emsp;按照正常的 git 项目更新提交代码，其他开发成员获取参照`3.1、获取子模块代码`

##### 3.2.2、在主项目中更新子模块的代码
&emsp;&emsp;`在子模块路径下`按照正常的 git 项目更新提交代码，其他开发成员获取参照`3.1、获取子模块代码`。主项目的代码应在子模块的代码提交后再提交，否则主项目检测不到子模块具体的变动。


### 四、删除 git submodules

&emsp;&emsp;删除公共库的步骤较为复杂，如下：

#### 1、删除公共库目录及代码
``` shell
rm -rf src/submodules
```

#### 2、删除（更改）子项目根目录下的 .gitmodules
``` shell
rm -rf .gitmodules
```

#### 3、删除（更改）.git/config 文件中的公共库部分
```
// .git/config
[submodule "src/submodules"]
        url = https://github.com/liuxy0551/git-public.git
        active = true
```

#### 4、删除模块下的公共库目录
``` shell
rm -rf .git/modules/src
```



### 参考资料

1、[Git Submodule使用完整教程](https://www.cnblogs.com/lsgxeva/p/8540758.html)
2、[git submodules学习笔记](https://github.com/wuyuedefeng/blogs/issues/48)
