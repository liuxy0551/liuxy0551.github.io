---
title: Vue Mint-UI 省市区地址三级联动
urlname: vue-mintui-address
tags:
  - Vue
  - Mint UI
categories:
  - 前端
  - Vue
  - Mint UI
author: liuxy0551
copyright: true
date: 2018-11-18 20:29:30
updated: 2018-11-18 20:29:30
---


　　最近公司项目中用到收货地址的功能，遂采用这种联动的方式

<!--more-->


### 一、实现效果

![](https://liuxianyu.cn/image-hosting/posts/vue-mintui-address/1.gif)

　　功能的实现参考了部分资料：

1、[vue mint-ui 三级地址联动](https://www.cnblogs.com/WoAiZmm/p/8413604.html) 这篇文章中间联动部分的代码写的不是很好，直接复制是联动不了的。

2、[Mint UI Picker 的源码](https://github.com/ElemeFE/mint-ui/blob/master/example/pages/picker.vue) Mint UI 官网 [Picker](https://mint-ui.github.io/docs/#/zh-cn2/picker) 二级联动的代码，有一定的参考意义。

3、[中国行政区划数据：省份、城市、区县、乡镇，省市区镇三级四级联动](https://github.com/artiely/Administrative-divisions-of-China) 有二、三、四、五级的地名联动，在 README.md 中下载需要的 json 文件即可（打包下载，部分文件无港澳台地区的联动）。

4、<a href="https://github.com/liuxy0551/liuxy0551.github.io/blob/master/assets/posts/vue-mintui-address/pca-code.json" target="_black">pca-code.json</a>

5、这篇随笔的代码：<a href="https://github.com/liuxy0551/liuxy0551.github.io/blob/master/assets/posts/vue-mintui-address/addAddress.vue" target="_black">addAddress.vue</a> 


### 二、具体实现

#### 1、HTML 部分

　　![](https://liuxianyu.cn/image-hosting/posts/vue-mintui-address/2.png)
```
    <li class="m-default-address" @click="addressPopup = true">
      <div>
        <span class="m-border"></span>
        <span class="m-label"><span class="m-must">*</span> 省市区</span>
      </div>
      <div>
        <div class="m-address-text">{{addressText}}</div>
        <!--<span class="m-icon-more"></span>-->
      </div>
    </li>
```

　　![](https://liuxianyu.cn/image-hosting/posts/vue-mintui-address/3.png)
```
    <!--省市区地址三级联动-->
    <mt-popup class="m-address-popup" v-model="addressPopup" position="bottom">
      <div class="m-popup-btn">
        <div @click="addressPopup = false">取消</div>
        <div @click="addressDone">确认</div>
      </div>
      <div class="m-popup-btn">
        <div></div>
        <div>{{myAddressProvince}}-{{myAddressCity}}-{{myAddressArea}}</div>
        <div></div>
      </div>
      <mt-picker :slots="myAddressSlots" value-key="name" :visibleItemCount="7" @change="onMyAddressChange"></mt-picker>
    </mt-popup>
```

#### 2、JavaScript 部分

　　![](https://liuxianyu.cn/image-hosting/posts/vue-mintui-address/4.png)
```
    data() {
      return {
        name: '',
        user: {},
        address: { uadefault: "0" },
        addressText: "请选择省-市-区",
        addressPopup: false,
        myAddressSlots: [
          {
            flex: 1,
            defaultIndex: 1,
            values: myaddress, //省份数组
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          },{
            divider: true,
            content: '-',
            className: 'slot4'
          },{
            flex: 1,
            values: [],
            className: 'slot5',
            textAlign: 'center'
          }
        ],
        myAddressProvince: '',
        myAddressCity: '',
        myAddressArea: '',
      }
    }
```

　　![](https://liuxianyu.cn/image-hosting/posts/vue-mintui-address/5.png)
      
```
      // 地址三级联动
      onMyAddressChange(picker, values) {
        if(values[0]) {      // 判断values[0]是否有值
          picker.setSlotValues(1, values[0].children);    // 将所点击省份拿到的城市list赋值
          this.myAddressProvince = values[0].name;
          if(values[1]) {      // 判断values[1]是否有值
            picker.setSlotValues(2, values[1].children);  // 将所点击城市拿到的区县list赋值
            this.myAddressCity = values[1].name;
            if(values[2]) {      // 判断values[2]是否有值
              this.myAddressArea = values[2].name;
              this.address.aaid = values[2].code;
            }
          }
        }
      },
      // 省市区三级联动选择后
      addressDone() {
        this.addressText = this.myAddressProvince + "-" + this.myAddressCity + "-" + this.myAddressArea;
        this.addressPopup = false;
      }
```

　　![](https://liuxianyu.cn/image-hosting/posts/vue-mintui-address/6.png)
      
```
    created() {
      common.changeTitle('添加地址');
      this.getUser();         // 获取用户信息

      this.$nextTick(() => { //vue里面全部加载好了再执行的函数 （类似于setTimeout）
        this.myAddressSlots[0].defaultIndex = 0;
        // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
        //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
      });
    }
```
