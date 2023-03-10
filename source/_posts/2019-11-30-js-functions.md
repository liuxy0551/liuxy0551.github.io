---
title: JavaScript 中一些常见的方法
urlname: js-functions
tags:
  - JavaScript
categories:
  - JavaScript
author: liuxy0551
copyright: true
date: 2019-11-30 13:43:38
updated: 2019-11-30 13:43:38
---


　　最近在加强 JavaScript 基础的学习，这里整理了一下 JavaScript 中 String 对象和 Array 对象常见的一些方法。
<!--more-->


### 一、String 对象

#### 1、[indexOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf) 返回索引值

　　`indexOf()`方法返回 str 中`第一次`出现指定值的索引，从 fromIndex 处进行搜索，如果未找到该值，则返回 -1。

``` javascript
str.indexOf(searchValue[, fromIndex])
```

#### 2、[includes()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/includes) 返回布尔值

　　`includes()`方法用于判断 str 中是否包含另一个字符串，从 fromIndex 处进行搜索，根据情况返回 true 或 false。`区分大小写`

``` javascript
str.includes(searchString[, fromIndex])
```

#### 3、[split()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split) 返回 Array

　　`split()`方法使用指定字符串将目标字符串分割成字符串数组，这个指定的字符串作为分隔符来决定每个拆分的位置，返回目标字符串以分隔符出现位置分隔而成的一个数组。 

``` javascript
str.split([separator[, limit]])
```
- separator：分隔符，可以是一个字符串或者正则表达式
- limit：返回值数组的长度

#### 4、[replace()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace) 返回新字符串，不改变原字符串

　　`replace()`方法用于替换字符串中的某些字符，返回一个部分匹配替换或全部匹配替换的新字符串。

　　`语法：`
``` javascript
str.replace(regexp|substr, newSubStr|function)
'abcabc'.replace(/a/g, 'd') // 'dbcdbc'
```
- regexp（pattern）：一个RegExp 对象或者其字面量，该正则所匹配的内容`全部都会被 replace 第二个参数的返回值替换`。
- substr（pattern）：一个将被 newSubStr 替换的字符串，`仅第一个匹配项会被替换`。
- newSubStr（replacement）：用于替换掉第一个参数在原字符串中匹配到的字符串。
- function（replacement）：一个用来创建新字符串的函数，该函数的返回值将替换第一个参数匹配到的字符串。

#### 5、[slice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/slice) 返回新字符串，不改变原字符串

　　`slice()`方法提取字符串的一部分，并返回一个新的字符串，且不会改动原字符串。

``` javascript
str.slice(beginIndex[, endIndex]) // [beginIndex, endIndex)
```

#### 6、[substring()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/substring) 返回新字符串

　　`substring()`方法返回一个字符串从开始索引直到字符串末尾的一个子集, 或从开始索引到结束索引（不包含结束索引）之间的一个子集。

``` javascript
str.substring(beginIndex[, endIndex])        // [beginIndex, endIndex)
```
- endIndex 为负数或 NaN时，则被当作 0
- beginIndex 和 endIndex 大于 str.length 时，会被当作 str.length


### 二、Array 对象

#### 1、[isArray()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) 返回布尔值

　　`Array.isArray()`用于确定传递的值是否是一个 Array。

``` javascript
Array.isArray([1, 2, 3])            // true
Array.isArray('foobar')             // false
Array.isArray(undefined)            // false
```
- 当检测 Array 实例时, Array.isArray 优于`arr1 instanceof Array`，因为 Array.isArray 能检测 iframes。

#### 2、[concat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) 返回新数组，不改变原数组

　　`concat()`方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

``` javascript
arr1.concat(arr2, arr3, ...)
```

#### 3、[filter()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 返回新数组

　　`filter()`方法创建一个新数组, 包含了通过测试的所有元素。

``` javascript
let arr1 = [12, 5, 8, 130, 44]
let arr2 = [12, 54, 18, 130, 44]

arr1.filter(i => i >= 10)            // [12, 130, 44]
arr2.filter((i, index, array) => i >= 10)            // [12, 130, 44]
```

#### 4、[map()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 返回新数组

　　`map()`方法创建一个新数组，其结果是该数组中的每个元素都调用执行函数后返回的结果。

#### 5、[pop()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) 返回从数组中删除的元素（数组为空时返回 undefined）

　　`pop()`方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。

#### 6、[push()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push) 返回数组新的 length

　　`push()`方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。此方法更改数组的长度。

#### 7、[shift()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) 返回从数组中删除的元素（数组为空时返回 undefined）

　　`shift()`方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。

#### 8、[unshift()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) 返回数组新的 length

　　`unshift()`方法将一个或多个元素添加到数组的开头，并返回该数组的新长度。此方法更改数组的长度。

#### 9、[forEach()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) 返回 undefined

　　`forEach()`方法对数组的每个元素执行一次函数。

>**注意**
>* **除了抛出异常以外，无法跳出循环**

#### 10、[slice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) 返回新数组

　　`slice()`方法返回一个含有被提取元素的新数组，这个数组是由 beginIndex 和 endIndex 决定的原数组的浅拷贝。原始数组不会被改变。

``` javascript
arr.slice([beginIndex[, endIndex]])        // [beginIndex, endIndex)
```
- 如果 beginIndex 大于数组的长度，则返回空数组
- slice(-2) 表示提取数组中的倒数第二个元素到最后一个元素（包含最后一个元素）
- slice(-2, -1) 表示提取数组中的倒数第二个元素到最后一个元素（不包含最后一个元素）

#### 11、[splice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) 返回被删除元素组成的数组

　　`splice()`方法通过删除或替换现有元素或者原地添加新的元素来修改数组，并以数组形式返回被修改的内容。此方法会改变原数组。

``` javascript
arr.splice(beginIndex, deleteCount, item1, item2, ...)
```
- beginIndex 修改开始的位置
- deleteCount 要移除的元素个数，可选
- item1, item2, ... 要添加进数组的元素，可选

#### 12、[reverse()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse) 返回颠倒后的数组

　　`reverse()`方法将数组中元素的位置颠倒，并返回该数组。此方法会改变原数组。

#### 13、[some()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some) 返回布尔值

　　`some()`方法测试数组中是不是至少有一个元素通过了测试函数，返回一个 Boolean 类型的值。

>**注意**
>* **若收到一个空数组，此方法在任何情况下都会返回 false**

#### 14、[every()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every) 返回布尔值

　　`every()`方法测试数组内的所有元素是否都能通过某个指定函数的测试。

``` javascript
let arr1 = [12, 5, 8, 130, 44]
let arr2 = [12, 54, 18, 130, 44]
let arr3 = [12, 54, 18, 130, 44]

arr1.every(i => i >= 10)            // false
arr2.every(i => i >= 10)            // true
arr3.every((i, index, array) => { return i >= 20 })            // false
```
>**注意**
>* **若收到一个空数组，此方法在任何情况下都会返回 true**

#### 15、[includes()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) 返回布尔值

　　`includes()`方法用来判断一个数组是否包含一个指定的值。

#### 16、[indexOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) 返回索引值

　　`indexOf()`方法返回在数组中可以找到给定元素的第一个索引，如果不存在，则返回 -1。

#### 17、[join()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join) 返回新字符串

　　`join()`方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。

#### 18、[flat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) 返回新数组

　　`flat()`方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

``` javascript
let arr1 = [1, 2, [3, 4]]
arr1.flat()             // [1, 2, 3, 4]

let arr2 = [1, 2, [3, 4, [5, 6]]]
arr2.flat()             // [1, 2, 3, 4, [5, 6]]

let arr3 = [1, 2, [3, 4, [5, 6]]]
arr3.flat(2)            // [1, 2, 3, 4, 5, 6]

//使用 Infinity，可展开任意深度的嵌套数组
let arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]
arr4.flat(Infinity)     // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

let arr5 = [1, 2, , 4, 5]
arr4.flat()             // [1, 2, 4, 5]
```
