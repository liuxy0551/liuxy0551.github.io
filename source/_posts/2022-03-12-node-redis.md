---
title: Node.js 中操作 Redis
urlname: node-redis
tags:
  - node
  - Redis
categories:
  - node
  - Redis
author: liuxy0551
copyright: true
date: 2022-03-12 22:25:55
updated: 2022-03-12 22:25:55
---


&emsp;&emsp;之前写了个爬取 Github Trending 的服务 <a href="https://github.com/liuxy0551/github-trending-api" target="_black">github-trending-api</a>，因为网络原因，失败率比较高，最近在进行优化，会每个小时请求一次 Github，失败则重试5次，然后把成功的结果存到 Redis 中。记录下 Node.js 中操作 Redis 的一些方法。

<!--more-->


### 一、安装 Redis

&emsp;&emsp;我这里是通过 Docker 来安装 Redis 的，具体可参考：<a href="https://liuxianyu.cn/article/docker-d.html" target="_black">前端学习 Docker 之旅（五）—— 安装 Redis 并启动、连接</a>。


### 二、缓存类型

&emsp;&emsp;主要分为三种：数据库、本地应用缓存（内存等）、远程缓存（Redis），这里不展开细讲。


### 三、缓存模式

{% gp 4-4 %}
![](https://liuxianyu.cn/image-hosting/posts/node-redis/1.png)
![](https://liuxianyu.cn/image-hosting/posts/node-redis/2.png)
![](https://liuxianyu.cn/image-hosting/posts/node-redis/3.png)
{% endgp %}


### 四、Node.js 与 Redis

``` javascript
import { createClient } from 'redis';

(async () => {
    const client = createClient({
        url: 'redis://username:password@host:port/db-number'
    });

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();

    await client.set('key', 'value');
    const value = await client.get('key');
})();
```

&emsp;&emsp;语法：

``` javascript
createClient({
    url: 'redis://alice:foobared@awesome.redis.server:6380'
})
```


### 五、Redis value 类型

&emsp;&emsp;Redis 的 key 是唯一的，如果 key 所对应的 value 是 string 类型，则不能再次覆盖修改为 hash 类型。<a href="https://github.com/redis/node-redis/blob/be51abe347/packages/client/lib/client/commands.ts#L85" target="_black">点此查看其他方法</a> 

#### 5.1、string

``` javascript
await redis.set('key', 'value')
const value = await redis.get('key')

await redis.setEx('key', 60, 'value') // 设置缓存，单位秒
```

&emsp;&emsp;不建议赋值后再设置过期时间，这样不能保证原子性。

#### 5.2、hash

``` javascript
const obj = { name: 'Tom' }
// await redis.hSet('key', obj, 'EX', 60)

const obj = await redis.hGetAll('key') // { name: 'Tom' }
const name = await redis.hGet('key', 'name') // 'Tom'
const value = await redis.hVals('key') // ['Tom']
```

&emsp;&emsp;取出存入 Redis 的对象时，每个 key 的值会被转成 string。

#### 5.3、lists

#### 5.4、sets

#### 5.4、事务

``` javascript
redis.multi()
    .set('key', 'value')
    .get('key')
    .exec((error, replies) => {
        console.log(replies) // ['OK', 'value']
    })
```


### 参考资料

1、<a href="https://www.cnblogs.com/zhaowinter/p/10776868.html" target="_black">nodejs操作redis总结</a>   
2、<a href="https://github.com/redis/node-redis" target="_black">node-redis</a>   
3、<a href="https://redis.js.org/" target="_black">https://redis.js.org/</a>   
4、涉及代码：<a href="https://github.com/liuxy0551/github-trending-api" target="_black">https://github.com/liuxy0551/github-trending-api</a>   
