---
title: Vue 项目实现微信自定义分享
urlname: vue-wx-share
tags:
  - Vue
  - 微信公众号
categories:
  - 前端
  - 微信公众号
author: liuxy0551
copyright: true
date: 2018-12-18 20:29:30
updated: 2018-12-18 20:29:30
---


&emsp;&emsp;最近公司项目中有在微信中自定义分享的需要，遇到的问题记录一下。
<!--more-->


### 一、实现效果

![](https://images-hosting.liuxianyu.cn/posts/vue-wx-share/3.png)


### 二、遇到的问题
 
&emsp;&emsp;1、需求：项目需要带参分享，进行好友拆礼盒的类似操作，需要带个参与活动的 id，其实这种分享微信是不太赞成的，这里不论。
　　2、问题 1：项目本身引入的 js-sdk 是 1.3.3 版本，与微信目前推荐的 1.4.0 版本还有版本差距。
　　3、问题 2：微信认证 url 之后，设置的分享链接在 '#' 及其之后会被微信去除。


### 三、解决过程

&emsp;&emsp;其实如果早知道第二条第 3 小条的话，也许我就不需要花费很多时间在这个自定义链接上。
　　1、微信分享中的配置微信 js-sdk，自行查阅 [微信 JS-SDK 说明文档](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115)。
　　2、因为项目有多处需要自定义分享，所以我将请求签名和注入权限的方法写到了一个 js 文件中，同时在需要自定义分享的页面加载时调用这些方法。

![](https://images-hosting.liuxianyu.cn/posts/vue-wx-share/4.png)
![](https://images-hosting.liuxianyu.cn/posts/vue-wx-share/5.png)

　　3、像下图这种基本就是没有完成页面的签名及授权验证，按照微信文档接收后端同学返回的数据即可。

![](https://images-hosting.liuxianyu.cn/posts/vue-wx-share/1.png)
```
  wxRegister(link) {
    let params = {
      url: link,
      app_from: window.location.origin.substr(8, window.location.origin.length)
    };
    axios.get(api.get_wxconfig, { params: params }).then((res) => {
      if(res.data.status == 200) {
        wx.config({
          debug: false,
          appId: res.data.data.appId,
          timestamp: Number(res.data.data.timestamp),
          nonceStr: res.data.data.noncestr,
          signature: res.data.data.sign,
          jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareAppMessage', 'onMenuShareTimeline',
            'previewImage']
        });
      }
    }).catch((error) => {
      console.log(error)
    });
    // 需在用户可能点击分享按钮前就先调用
    wx.ready(function() {
      // 获取微信分享参数
      axios.get(api.get_share_params).then(res => {
        if(res.data.status == 200) {
          let params = res.data.data;
          // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
          if(wx.updateAppMessageShareData) {
            wx.updateAppMessageShareData({
              title: params.title, // 分享标题
              desc: params.content, // 分享描述
              link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: params.img, // 分享图标
              success: function () {
                // 设置成功
              }
            });
          }
          // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
          if(wx.updateTimelineShareData) {
            wx.updateTimelineShareData({
              title: params.title, // 分享标题
              link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: params.img, // 分享图标
              success: function () {
                // 设置成功
              }
            });
          }
        }
      });
    });
  }
```

　　4、像下图这种就是困扰我的问题，分享出去的内容除了最关键的自定义链接，其余都正常，这是很伤心的一件事，也是这篇随笔的来源。解决这个问题需要知道这样的信息，
微信公众号中的项目在请求签名和自定义分享链接的时候对于 Vue 的 # 路由不太友好，因为分享出去的自定义链接在 # 之后会被微信去除，了解这点后，我们就可以来着手解决问题了。

![](https://images-hosting.liuxianyu.cn/posts/vue-wx-share/2.png)
<br>

　　5、点击页面中的分享按钮，这个时候将需要分享出去的自定义内容准备好，按照微信文档的格式写就可以。建议在调用微信分享方法前判断是否可用，因为这几个分享接口都是即将废弃的，
下图中白色字体代码是因为当前没有引入 1.4.0 版本的 js 文件。

![](https://images-hosting.liuxianyu.cn/posts/vue-wx-share/6.png)
```
 // 点击分享
 share () {
   let options = {
     title: '魔法礼盒',
     desc: '快来帮您的好友拆开魔法礼盒吧',
     imgUrl: this.box.prpic
   };
   // 参与魔盒活动(获取分享所需的url参数) - 拿mbjid
   axios.post(api.join_magicbox + '?token='+ localStorage.getItem('token'), { mbaid: this.mbaid }).then(res => {
     if(res.data.status == 200) {
       localStorage.setItem('mbjid', res.data.data.mbjid);
       options.link = window.location.href.split('#')[0] + '?mbjid=' + localStorage.getItem('mbjid');
       // options.link = window.location.origin + '/#/pandora?mbjid=' + localStorage.getItem('mbjid');

       // 点击分享
       this.show_invite = true;
       // 倒计时
       const TIME_COUNT = 3;
       let count = TIME_COUNT;
       let time = setInterval(() => {
         if (count > 0 && count <= TIME_COUNT) {
           count --;
         } else {
           this.show_invite = false;
           clearInterval(time);
         }
       }, 1000);
       axios.get(api.secret_usid + '?token=' + localStorage.getItem('token')).then(res => {
         if(res.data.status == 200) {
           options.link += '&secret_usid=' + res.data.data.secret_usid;
         }
       });

       // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
       if(wx.updateAppMessageShareData) {
         wx.updateAppMessageShareData(options);
       }
       // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
       if(wx.updateTimelineShareData) {
         wx.updateTimelineShareData(options);
       }
       // 获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）
       if(wx.onMenuShareAppMessage) {
         wx.onMenuShareAppMessage(options);
       }
       // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
       if(wx.onMenuShareTimeline) {
         wx.onMenuShareTimeline(options);
       }
     }
   });
 }
```

　　6、看上面的代码就能看出，我的思路是微信处理 # ，我就避开 # ，将需要分享的参数直接附在 # 之前，我的后端同学在以为是签名 url 出错时，给过替换 # 的提议，都是大同小异的方法。
然后在 APP.vue 文件的初始化方法中查看点击分享到底是跳到什么 url 去了，建议使用 alert，因为 vconsoel 打印过后如果页面重定向后，就看不到打印的信息了。

![](https://images-hosting.liuxianyu.cn/posts/vue-wx-share/7.png)

　　7、同时分享出去的自定义链接还会被微信加上一些识别流量来源的参数，但是这些参数并不会影响页面的重定向。可是为防止这些参数在分享出去后，在接收处理数据时乱入，故将其直接去除，使用 split。

```
    ?from=singlemessage
    ?from=timeline
    ?from=groupmessage
```
