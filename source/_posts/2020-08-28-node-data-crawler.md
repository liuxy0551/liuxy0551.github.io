---
title: 使用 node 进行简单爬虫学习
urlname: node-data-crawler
tags:
  - node
categories:
  - node
  - 爬虫
author: liuxy0551
copyright: true
date: 2020-08-28 09:44:17
updated: 2020-08-28 09:44:17
---

&emsp;&emsp;最近在公众号看到篇 node 爬虫的文章，比较简单，本着学习的态度看完觉得可以加大点难度试一试。

<!--more-->

&emsp;&emsp;<a href="https://github.com/liuxy0551/data-crawler" target="_black">Github：data-crawler</a>


### 一、Top250 - 爬取页面

&emsp;&emsp;<a href="https://movie.douban.com/top250" target="_black">豆瓣电影 Top250</a> 是基于网页爬取，每页25条数据，访问 URL 有一定规律。思路是获取 DOM 节点的内容，写入到 json 文件，下载电影的封面图片。`cheerio`用来解析 html 非常方便，写法可参考 [抓取当前页面](https://liuxianyu.cn/article/node-data-crawler.html#2-%E6%8A%93%E5%8F%96%E5%BD%93%E5%89%8D%E9%A1%B5%E9%9D%A2)。

#### 1、入口文件

```javascript
const getFilmsInfo = require('./tools/getFilmsInfo')
const downloadImages = require('./tools/downloadImages')

getAllFilms()

/**
 * https://movie.douban.com/top250 页面分页的规则
 * get 请求，参数为 start，含义是每页25条数据，从第几条开始
 * 如 https://movie.douban.com/top250?start=25, https://movie.douban.com/top250?start=100
 */
// 根据 url 抓取当前页面所有电影的信息
async function getAllFilms () {
  for (let pageNum = 0; pageNum < 10; pageNum++) {
    // 爬取数据并将需要的数据写到 json 文件
    let films = await getFilmsInfo(`https://movie.douban.com/top250?start=${ pageNum * 25 }`, pageNum)
  
    // 下载图片
    await downloadImages(films.map(i => i.pic), pageNum)
  }
}
```

#### 2、抓取当前页面

```javascript
/**
 * 根据 url 抓取当前页面所有电影的信息
 */
const fs = require('fs')
const https = require('https')
const cheerio = require('cheerio')

// url 爬取的网址，pageNum 已存在多少条数据
module.exports = async function getFilmsInfo (url, pageNum) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      // 分段返回的 自己拼接
      let html = ''
  
      // 有数据产生的时候 拼接
      res.on('data', chunk => {
        html += chunk
      })
  
      // 拼接完成
      res.on('end', async () => {
        const $ = cheerio.load(html)
        let films = []
        $('li .item').each(function () {
          const sort = pageNum * 25 + films.length + 1
          const title = $('.title', this).text()
          const star = $('.rating_num', this).text()
          const slogan = $('.inq', this).text()
          const pic = $('.pic img', this).attr('src')
          films.push({ sort, title, star, slogan, pic })
        })
  
        // 按页码写入 json 文件
        let fileName = pageNum + 1
        await fs.writeFile(`./result/top250/page-${ fileName }.json`, JSON.stringify(films, null, 2), err => {
          if (err) {
            reject(err)
          } else {
            console.log(`第${ fileName }页数据保存成功`)
            resolve(films)
          }
        })
      })
    })
  })
}
```

#### 3、下载电影封面图片

```javascript
/**
 * 下载图片
 */
const fs = require('fs')
const https = require('https')

module.exports = function downloadImage (pics, pageNum) {
  for (let i in pics) {
    https.get(pics[i], res => {
      res.setEncoding('binary')
      let str = ''

      res.on('data', chunk => {
        str += chunk
      })
      res.on('end', function () {
        fs.writeFile(`./result/top250/images/page-${ pageNum + 1 }-${ Number(i) + 1 }.jpg`, str, 'binary', err => {
          err && console.log(err)
        })
      })
    })
  }
}
```



### 二、电影列表 - 调用接口

&emsp;&emsp;<a href="https://movie.douban.com/tag/#/" target="_black">豆瓣电影全量列表（9900+条信息）</a> 是通过接口去请求的

```javascript
const fs = require('fs')
const request = require('request')

let sleepTime = 5000 // 过指定时间后返回结果，可以实现相邻请求有间隔时间
let errorCount = 0 // 失败计数
let errorMaxCount = 2 // 失败后尝试指定次数，依旧失败则停止
asyncGetAllFilms()

async function asyncGetAllFilms () {
  for (let i = 127; i < 500; i++) {
    let res = await getAllFilms(`https://movie.douban.com/j/new_search_subjects?start=${ i * 20 }`)

    // 保存数据到 json 文件
    await fs.writeFile(`./result/douban/page-${ i + 1 }.json`, JSON.stringify(res.data, null, 2), err => {
      if (err) {
        console.log('writeFile', err)
      } else {
        console.log(`第${ i + 1 }页数据保存成功`)
      }
    })
  }
}

// 获取所有电影
async function getAllFilms (url) {
  return new Promise((resolve, reject) => {
    request(url, (error, res, body) => {
      if (!error && res.statusCode === 200) {
        setTimeout(() => {
          resolve(JSON.parse(body))
        }, sleepTime)
      } else {
        console.log('error', error)
        if (errorCount < errorMaxCount) {
          setTimeout(() => {
            errorCount++
            getAllFilms(url)
          }, sleepTime)
        } else {
          reject(error)
        }
      }
    })
  }).catch(console.log)
}
```




### 参考资料

<a href="https://mp.weixin.qq.com/s/yO8zuFB20eQEg6S37SPEww" target="_black">你不知道的 node 爬虫原来这么简单</a>
