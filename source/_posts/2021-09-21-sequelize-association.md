---
title: Sequelize 中的一对一、一对多、多对多
urlname: sequelize-association
tags:
  - node
  - Sequelize
categories:
  - node
  - Sequelize
author: liuxy0551
copyright: true
date: 2021-09-21 18:53:17
updated: 2021-09-21 18:53:17
---

&emsp;&emsp;最近做了写公司中的基建工作，其中涉及到了 node 项目中使用 sequelize，同时有多对多的关系需要处理，便写了个关于 sequelize 处理多对多关系的练手示例，<a href="https://github.com/liuxy0551/sequelize-association" target="_black">liuxy0551/sequelize-association</a>，目前仅涉及查询，`create`和`update`暂未进行。

<!--more-->

&emsp;&emsp;sql 语句 <a href="https://github.com/liuxy0551/sequelize-association/tree/master/sql" target="_black">点此查看</a>。


### 一、一对一

&emsp;&emsp;一对一的举例是：一个中国公民 (Chinese) 只有一个身份证号 (IDNumber) ，具体实现如下：

``` javascript
const models = initModels(sequelize)
const { Chinese, IDNumber } = models

// 建立关系
Chinese.hasOne(IDNumber, { foreignKey: 'id', sourceKey: 'IDNumberId', as: 'IDNumberInfo' })
IDNumber.belongsTo(Chinese, { foreignKey: 'id', targetKey: 'IDNumberId' })
```

``` javascript
// service 层实现
async getChinese (ctx) {
    try {
        const { offset, limit, page, pageSize } = getPage(ctx.query)
        const { count, rows } = await DB.Chinese.findAndCountAll({
            where: getWhere(),
            attributes: {
                exclude: getExclude(),
            },
            include: [
                {
                    model: DB.IDNumber,
                    as: "IDNumberInfo",
                    required: false,
                    where: getWhere(),
                    attributes: {
                        exclude: getExclude(),
                    },
                },
            ],
            offset,
            limit,
        })
        return setCtxBody(200, rows, '成功', { total: count, page, pageSize })
    } catch (error) {
        return setCtxBody(500, error, '系统错误')
    }
}
```

&emsp;&emsp;接口返回的结果如下：
![](https://images-hosting.liuxianyu.cn/posts/sequelize-association/1.png)

&emsp;&emsp;sequelize 自动生成的 sql 语句如下：
``` sql
SELECT
	`Chinese`.`id`,
	`Chinese`.`IDNumberId`,
	`Chinese`.`name`,
	`Chinese`.`createdAt`,
	`Chinese`.`updatedAt`,
	`IDNumberInfo`.`id` AS `IDNumberInfo.id`,
	`IDNumberInfo`.`number` AS `IDNumberInfo.number`,
	`IDNumberInfo`.`address` AS `IDNumberInfo.address`,
	`IDNumberInfo`.`createdAt` AS `IDNumberInfo.createdAt`,
	`IDNumberInfo`.`updatedAt` AS `IDNumberInfo.updatedAt` 
FROM
	`Chinese` AS `Chinese`
	LEFT OUTER JOIN `IDNumber` AS `IDNumberInfo` ON `Chinese`.`IDNumberId` = `IDNumberInfo`.`id` 
	AND `IDNumberInfo`.`isDeleted` = 0 
WHERE
	`Chinese`.`isDeleted` = 0 
	LIMIT 0,
	10;
```


### 二、一对多

&emsp;&emsp;一对多的举例是：一个省份 (Province) 有多个市 (City)，具体实现如下：

``` javascript
const models = initModels(sequelize)
const { Province, City } = models

// 建立关系
Province.hasMany(City, { as: 'cityList' })
City.belongsTo(Province, { foreignKey: 'id' })
```

``` javascript
// service 层实现
async getProvinceList (ctx) {
    try {
        const { offset, limit, page, pageSize } = getPage(ctx.query)
        const { count, rows } = await DB.Province.findAndCountAll({
            where: getWhere(),
            attributes: {
                exclude: getExclude(),
            },
            include: [
                {
                    model: DB.City,
                    as: 'cityList',
                    required: false,
                    where: getWhere(),
                    attributes: {
                        exclude: getExclude(['ProvinceId']),
                    },
                }
            ],
            offset,
            limit,
        })
        return setCtxBody(200, rows, '成功', { total: count, page, pageSize })
    } catch (error) {
        return setCtxBody(500, error, '系统错误')
    }
}
```

&emsp;&emsp;接口返回的结果如下：
![](https://images-hosting.liuxianyu.cn/posts/sequelize-association/2.png)

&emsp;&emsp;sequelize 自动生成的 sql 语句如下：
``` sql
SELECT
	`Province`.*,
	`cityList`.`id` AS `cityList.id`,
	`cityList`.`provinceId` AS `cityList.provinceId`,
	`cityList`.`name` AS `cityList.name`,
	`cityList`.`createdAt` AS `cityList.createdAt`,
	`cityList`.`updatedAt` AS `cityList.updatedAt` 
FROM
	(
	SELECT
		`Province`.`id`,
		`Province`.`name`,
		`Province`.`createdAt`,
		`Province`.`updatedAt` 
	FROM
		`Province` AS `Province` 
	WHERE
		`Province`.`isDeleted` = 0 
		LIMIT 0,
		10 
	) AS `Province`
	LEFT OUTER JOIN `City` AS `cityList` ON `Province`.`id` = `cityList`.`ProvinceId` 
	AND `cityList`.`isDeleted` = 0;
```


### 三、多对多

&emsp;&emsp;多对多的举例是：一部电影 (Movie) 有多个演员 (Actor), 一个演员 (Actor) 参演多部电影 (Movie)，具体实现如下：

``` javascript
const models = initModels(sequelize)
const { Movie, Actor, MovieActor } = models

// 建立关系
Movie.belongsToMany(Actor, { through: MovieActor, as: 'actorList' })
Actor.belongsToMany(Movie, { through: MovieActor, as: 'movieList' })
```

``` javascript
// service 层实现
async getMovieListWithActors (ctx) {
    try {
        const { offset, limit, page, pageSize } = getPage(ctx.query)
        const { count, rows } = await DB.Movie.findAndCountAll({
            where: getWhere(),
            attributes: {
                exclude: getExclude()
            },
            include: [
                {
                    model: DB.Actor,
                    as: 'actorList',
                    required: false,
                    where: getWhere(),
                    attributes: {
                        exclude: getExclude(),
                    },
                    through: { attributes: [] }
                }
            ],
            offset,
            limit,
        })
        return setCtxBody(200, rows, '成功', { total: count, page, pageSize })
    } catch (error) {
        return setCtxBody(500, error, '系统错误')
    }
}

async getActorListWithMovies (ctx) {
    try {
        const { offset, limit, page, pageSize } = getPage(ctx.query)
        const { count, rows } = await DB.Actor.findAndCountAll({
            where: getWhere(),
            attributes: {
                exclude: getExclude()
            },
            include: [
                {
                    model: DB.Movie,
                    as: 'movieList',
                    required: false,
                    where: getWhere(),
                    attributes: {
                        exclude: getExclude(['MovieActor']),
                    },
                    through: { attributes: [] }
                }
            ],
            offset,
            limit,
        })
        return setCtxBody(200, rows, '成功', { total: count, page, pageSize })
    } catch (error) {
        return setCtxBody(500, error, '系统错误')
    }
}
```

&emsp;&emsp;接口返回的结果如下：
![](https://images-hosting.liuxianyu.cn/posts/sequelize-association/3.png)
![](https://images-hosting.liuxianyu.cn/posts/sequelize-association/4.png)

&emsp;&emsp;sequelize 自动生成的 sql 语句如下：
``` sql
-- 多对多 getActorListWithMovies
SELECT
	`Actor`.*,
	`movieList`.`id` AS `movieList.id`,
	`movieList`.`name` AS `movieList.name`,
	`movieList`.`createdAt` AS `movieList.createdAt`,
	`movieList`.`updatedAt` AS `movieList.updatedAt` 
FROM
	(
	SELECT
		`Actor`.`id`,
		`Actor`.`name`,
		`Actor`.`createdAt`,
		`Actor`.`updatedAt` 
	FROM
		`Actor` AS `Actor` 
	WHERE
		`Actor`.`isDeleted` = 0 
		LIMIT 0,
		10 
	) AS `Actor`
	LEFT OUTER JOIN (
		`MovieActor` AS `movieList->MovieActor`
		INNER JOIN `Movie` AS `movieList` ON `movieList`.`id` = `movieList->MovieActor`.`MovieId` 
	) ON `Actor`.`id` = `movieList->MovieActor`.`ActorId` 
	AND `movieList`.`isDeleted` = 0;
```

``` sql
-- 多对多 getMovieListWithActors
SELECT
	`Movie`.*,
	`actorList`.`id` AS `actorList.id`,
	`actorList`.`name` AS `actorList.name`,
	`actorList`.`createdAt` AS `actorList.createdAt`,
	`actorList`.`updatedAt` AS `actorList.updatedAt` 
FROM
	(
	SELECT
		`Movie`.`id`,
		`Movie`.`name`,
		`Movie`.`createdAt`,
		`Movie`.`updatedAt` 
	FROM
		`Movie` AS `Movie` 
	WHERE
		`Movie`.`isDeleted` = 0 
		LIMIT 0,
		10 
	) AS `Movie`
	LEFT OUTER JOIN (
		`MovieActor` AS `actorList->MovieActor`
		INNER JOIN `Actor` AS `actorList` ON `actorList`.`id` = `actorList->MovieActor`.`ActorId` 
	) ON `Movie`.`id` = `actorList->MovieActor`.`MovieId` 
	AND `actorList`.`isDeleted` = 0;
```


### 四、注意事项

&emsp;&emsp;1、在使用关联关系进行查询时，请求参数中不要使用`raw: true`，`raw`默认为 false，此时 sequelize 会自动拼接一些参数，设为 true 的话，会丢失参数导致数据结构错乱，如下图：
![](https://images-hosting.liuxianyu.cn/posts/sequelize-association/5.png)
&emsp;&emsp;2、一对多时会出现返回的结果包含了大驼峰写法的关联 id 及值，可通过`include attributes exclude`将该字段过滤；  
&emsp;&emsp;3、多对多时，一般不需要展示关联表的字段，可通过`include through attributes`将关联表字段过滤，如下：
``` javascript
const { count, rows } = await DB.Actor.findAndCountAll({
    ...
    include: [
        {
            ...
            through: { attributes: [] }
        }
    ]
})
```
![](https://images-hosting.liuxianyu.cn/posts/sequelize-association/6.png)
&emsp;&emsp;4、建立关联关系时，可在`app/utils/mysql/db.js`中进行，引入的 initModels 中导出了所有 model 层，可参考：<a href="https://github.com/liuxy0551/sequelize-association/blob/master/app/utils/mysql/db.js" target="_black">app/utils/mysql/db.js</a>。  
&emsp;&emsp;5、多对多的关联查询可以分解为以下四条 sql 进行，在数据量大的时候能减少查询时间，也是简化 sql 语句的方法：
- 查询电影表的总数量 total  
- 查询电影表前十条数据  
- 拿着上述十条数据去关联表查询关联数据，对关联的演员信息进行去重  
- 拿着上述去重后的演员信息在演员表中查询，由代码拼装数据再从接口返回  


### 五、占坑文章

&emsp;&emsp;1、预先加载，参考 <a href="https://www.sequelize.com.cn/advanced-association-concepts/eager-loading" target="_black">Sequelize 中文文档 - 预先加载</a>


### 六、参考文章

&emsp;&emsp;练习过程中较多的参考了以下文章中提到的内容，在此感谢：

[1] <a href="https://www.sequelize.com.cn/core-concepts/assocs" target="_black">Sequelize 中文文档 - 关联</a>  
[2] <a href="https://sequelize.org/master/manual/assocs.html#many-to-many-relationships" target="_black">Sequelize 英文官网 Many-To-Many relationships</a>  

