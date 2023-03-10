---
title: 设置 Host 解决 GitHub 头像不显示
urlname: github-avatar-host
tags:
  - Hosts
  - github
categories:
  - Hosts
author: liuxy0551
copyright: true
date: 2020-04-15 14:26:02
updated: 2020-04-15 14:26:02
---

&emsp;&emsp;GitHub 头像和 icon 大部分时间不能正常显示，很影响使用感受，可以通过设置 hosts 文件来解决。

<!--more-->


&emsp;&emsp;编辑 hosts 文件：

```shell
vim /etc/hosts
```

&emsp;&emsp;在原有配置后追加即可：

```
# GitHub Avatar Start 
192.30.253.112     Build software better, together 
192.30.253.119     gist.github.com
151.101.184.133    assets-cdn.github.com
151.101.184.133    raw.githubusercontent.com
151.101.184.133    gist.githubusercontent.com
151.101.184.133    cloud.githubusercontent.com
151.101.184.133    camo.githubusercontent.com
151.101.184.133    avatars0.githubusercontent.com
151.101.184.133    avatars1.githubusercontent.com
151.101.184.133    avatars2.githubusercontent.com
151.101.184.133    avatars3.githubusercontent.com
151.101.184.133    avatars4.githubusercontent.com
151.101.184.133    avatars5.githubusercontent.com
151.101.184.133    avatars6.githubusercontent.com
151.101.184.133    avatars7.githubusercontent.com
151.101.184.133    avatars8.githubusercontent.com
# GitHub Avatar End
```

`以下为老版，效果自测`

```
# github avatar
199.232.28.133 assets-cdn.github.com
199.232.28.133 raw.githubusercontent.com
199.232.28.133 gist.githubusercontent.com
199.232.28.133 cloud.githubusercontent.com
199.232.28.133 camo.githubusercontent.com
199.232.28.133 avatars0.githubusercontent.com
199.232.28.133 avatars1.githubusercontent.com
199.232.28.133 avatars2.githubusercontent.com
199.232.28.133 avatars3.githubusercontent.com
199.232.28.133 avatars4.githubusercontent.com
199.232.28.133 avatars5.githubusercontent.com
199.232.28.133 avatars6.githubusercontent.com
199.232.28.133 avatars7.githubusercontent.com
199.232.28.133 avatars8.githubusercontent.com
```
