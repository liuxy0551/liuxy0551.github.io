---
title: iframe 跨域时的通信方式 postMessage
urlname: iframe-postMessage
tags:
  - HTML
categories:
  - HTML
author: liuxy0551
copyright: true
date: 2022-03-10 23:02:41
updated: 2022-03-10 23:02:41
---


&emsp;&emsp;最近有个公司客户对接了公司的用户中心，客户期望自己的系统在退出登录时，公司的用户中心也退出登录。提出了 iframe 的技术方案，并给出了实现方式。
&emsp;&emsp;因为客户系统和公司的用户中心必然跨域，这里只记录一下跨域时的处理方法。

<!--more-->

### 一、如何实现

#### postMessage

> window.postMessage() 方法可以安全地实现跨源通信。通常，对于两个不同页面的脚本，只有当执行它们的页面位于具有相同的协议（通常为https），端口号（443为https的默认值），以及主机  (两个页面的模数 Document.domain设置为相同的值) 时，这两个脚本才能相互通信。window.postMessage() 方法提供了一种受控机制来规避此限制，只要正确的使用，这种方法就很安全。

&emsp;&emsp;以上是摘自 MDN 的原文，<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage" target="_black">window.postMessage</a>

**语法**

``` javascript
otherWindow.postMessage(message, targetOrigin, [transfer]);
```

- `otherWindow` 其他窗口的引用对象
- `message` 将要传递的消息，字符串或对象
- `targetOrigin` 目标窗口，* 代表所有
- `transfer` 可选，是一串和 message 同时传递的对象

&emsp;&emsp;`postMessage`非常强大，既可以父传子，也可以子传父，并且是可以跨域传输的。

#### 业务场景

&emsp;&emsp;客户的系统退出登录后，公司的用户中心前端页面无法感知到已经退出登录，也就无法清除 cookie，如果此时进入公司的用户中心页面，依旧可以访问，所以需要实现同步退出登录。而且因为客户的系统和公司的用户中心不同源，存在跨域，这里通过`postMessage`来解决。

#### 父传子

``` html
// 子页面
<script>
    window.addEventListener("message", (e) => {
        console.log('这里是公司的用户中心，客户系统发来消息: ', e.data)
        if (e.data !== 'logout') return
        // TODO 清除 cookie
    })
</script>

// 父页面
<div>
    <iframe src="子页面" id="dtstack-logout" />
    <button onclick="logoutFunc()">退出登录</button>
</div>
<script>
    function logoutFunc () {
        document.getElementById('dtstack-logout').contentWindow.postMessage('logout', '*')
    }
</script>
```

&emsp;&emsp;上面的代码表示：在父页面引入 iframe，src 指向子页面，父页面点击`退出登录`按钮时，向子页面发送一个消息，子页面监听到事先和父页面约定好的信息后，清除 cookie，并给父页面一个反馈。

#### 子传父

``` html
// 子页面
<script>
    window.addEventListener("message", (e) => {
        console.log('这里是公司的用户中心，客户系统发来消息: ', e.data)
        if (e.data !== 'logout') return
        // TODO 清除 cookie
        setTimeout(() => {
            // 向父页面传递消息
            window.parent.postMessage('clear done', '*')
        }, 2500)
    })
</script>

// 父页面
<div>
    <iframe src="子页面" id="dtstack-logout" />
    <button onclick="logoutFunc()">退出登录</button>
</div>
<script>
    window.addEventListener("message", (e) => {
        console.log('这里是客户系统，公司的用户中心发来消息: ', e.data)
        if (!e.data.includes('clear')) return
        // TODO 清除公司用户中心的 cookie 后需要进行的动作
    })
</script>
```

&emsp;&emsp;上面的代码表示：在父页面引入 iframe，src 指向子页面，子页面在接收到父页面清除 cookie 的消息后，清除 cookie，并在完成后给父页面发送消息，父页面接收到后进行下一步动作。


### 二、实现效果

<p align="center">
    <img src="https://images-hosting.liuxianyu.cn/posts/iframe-postMessage/1.gif"/>
</p>

<img src="https://images-hosting.liuxianyu.cn/posts/iframe-postMessage/2.png"/>
<img src="https://images-hosting.liuxianyu.cn/posts/iframe-postMessage/3.png"/>

&emsp;&emsp;以上截图的代码是临时 demo。


### 参考资料

&emsp;&emsp;1、<a href="https://www.runoob.com/tags/tag-iframe.html" target="_black">HTML iframe 标签</a>
