---
title: node 爬虫尝试使用动态代理 IP
urlname: node-data-crawler-proxy-ip
tags:
  - node
categories:
  - node
  - 爬虫
author: liuxy0551
copyright: true
date: 2020-08-28 14:58:30
updated: 2020-08-28 14:58:30
---

&emsp;&emsp;这两天在学习 node 爬虫，考虑到 IP 被封的可能性以及被豆瓣间歇性限制 IP，先记录一下如何使用代理 IP。

<!--more-->

&emsp;&emsp;<a href="https://github.com/liuxy0551/data-crawler/blob/master/proxy-ip/index.js" target="_black">Github：data-crawler-proxy-ip</a> 其实代理就是在`request`中把 options 写完整：

```javascript
let options = {
  method: 'GET',
  url: 'https://movie.douban.com/chart',
  gzip: true,
  encoding: null,
  proxy: `http://${ proxyIp }`, // proxyIp 是动态获取到的代理 IP 及端口号
  headers: { 'User-Agent': userAgent }, // 随机的请求头
  timeout: 5000
}
```



### 一、代码

#### 1、index.js

```javascript
const request = require('request')
const userAgents = require('./commons/userAgents')

main()

async function main () {
  let proxyIPs = await getProxyIPs()

  // for (let proxyIP of proxyIPs) {
  //   let IPCanUse = await testProxyIP(proxyIP)
  //   console.log(proxyIp, IPCanUse)
  // }

  let proxyIP = proxyIPs[Math.floor(Math.random() * proxyIPs.length)]
  let IPCanUse = await testProxyIP(proxyIP)
  console.log(proxyIp, IPCanUse)
}

// 获取一批代理 IP
async function getProxyIPs () {
  let url = 'http://www.66ip.cn/mo.php?sxb=&tqsl=100&port=&export=&ktip=&sxa=&submit=%CC%E1++%C8%A1&textarea=http%3A%2F%2Fwww.66ip.cn%2F%3Fsxb%3D%26tqsl%3D100%26ports%255B%255D2%3D%26ktip%3D%26sxa%3D%26radio%3Dradio%26submit%3D%25CC%25E1%2B%2B%25C8%25A1'
  let options = {
    method: 'GET',
    url,
    gzip: true,
    encoding: null,
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36',
      'referer': 'http://www.66ip.cn/'
    }
  }
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        resolve(body.toString().match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,4}/g))
      } else {
        console.log('getProxyIPs error', error)
        reject(error)
      }
    })
  }).catch(console.log)
}

// 测试代理 IP 是否可用
async function testProxyIP (proxyIp) {
  let userAgent = userAgents[Math.floor(Math.random() * userAgents.length)]
  return new Promise((resolve, reject) => {
    //这里修改成你要访问的目标网站
    console.log(`开始测试这个IP ${ proxyIp }`)
    let options = {
      method: 'GET',
      url: 'https://movie.douban.com/chart',
      gzip: true,
      encoding: null,
      proxy: `http://${ proxyIp }`,
      headers: { 'User-Agent': userAgent },
      timeout: 5000
    }

    request(options, (error, response, body) => {
      console.log(11111111, body)
      if (!error && response.statusCode === 200) {
        console.log(body)
        resolve(true)
      } else {
        console.log('testProxyIP error', error)
        reject(false)
      }
    })
  }).catch(console.log)
}
```


#### 2、userAgents.js

```javascript
const userAgents = [
  'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12',
  'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; Acoo Browser; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; .NET CLR 3.0.04506)',
  'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7 Safari/535.20',
  'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko Fedora/1.9.0.8-1.fc10 Kazehakase/0.5.6',
  'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.71 Safari/537.1 LBBROWSER',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET CLR 2.0.50727; Media Center PC 6.0) ,Lynx/2.8.5rel.1 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/1.2.9',
  'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; QQBrowser/7.0.3698.400)',
  'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; QQDownload 732; .NET4.0C; .NET4.0E)',
  'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:2.0b13pre) Gecko/20110307 Firefox/4.0b13pre',
  'Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168 Version/11.52',
  'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; LBBROWSER)',
  'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko Fedora/1.9.0.8-1.fc10 Kazehakase/0.5.6',
  'Mozilla/5.0 (X11; U; Linux; en-US) AppleWebKit/527+ (KHTML, like Gecko, Safari/419.3) Arora/0.6',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; QQBrowser/7.0.3698.400)',
  'Opera/9.25 (Windows NT 5.1; U; en), Lynx/2.8.5rel.1 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/1.2.9',
  'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
]

module.exports = userAgents
```



### 参考资料

1、<a href="https://www.cnblogs.com/bruce-gou/p/9315592.html" target="_black">node.js 爬虫动态代理 ip</a>
2、<a href="https://segmentfault.com/q/1010000008196143" target="_black">nodejs 代理 IP 发送 HTTP 请求</a>
