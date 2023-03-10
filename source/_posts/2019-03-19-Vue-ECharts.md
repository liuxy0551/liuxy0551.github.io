---
title: Vue 项目中使用 ECharts 来绘制世界地图和中国地图
urlname: vue-echarts
tags:
  - Vue
  - ECharts
categories:
  - 前端
  - Vue
  - ECharts
author: liuxy0551
copyright: true
date: 2019-03-19 20:29:30
updated: 2019-03-19 20:29:30
---


　　最近公司项目中需要使用 ECharts 来展示世界地图和中国地图，记录一下。
<!--more-->


### 一、实现效果

![](https://images-hosting.liuxianyu.cn/posts/vue-echarts/1.png)
![](https://images-hosting.liuxianyu.cn/posts/vue-echarts/2.png)

### 二、引入组件及说明
　　1、v-charts：基于 Vue2.0 和 ECharts 封装的图表组件 [官方文档](https://v-charts.js.org)   [Github](https://github.com/ElemeFE/v-charts)
　　2、可参考 [ECharts 官网](https://www.echartsjs.com/tutorial.html) 的文档
　　3、可多参考 [ECharts 的配置项文档](https://echarts.baidu.com/option.html) 来进行颜色、文字等样式的改动
　　4、import '../../../../node_modules/echarts/map/js/china.js' 引入 ECharts 自带的 China、world 等文件时，注意引入的路径

### 三、世界地图的组件代码（已省略部分国家数据，可在代码文件中复制）

　　[世界 - 代码文件](https://github.com/liuxy0551/liuxy0551.github.io/blob/master/assets/posts/vue-echarts/world.vue)
```
    <template>
      <div class="echarts-box">
        <div class="title-box">
          <img class="label" src="~assets/imgs/label2.png" alt="">
          <div class="title">校友世界分布</div>
        </div>
        <v-chart class="echarts" :options="polar" @dblclick="dblClick" @click="doClick"/>
      </div>
    </template>

    <script>
      import ECharts from 'vue-echarts'
      import '../../../../node_modules/echarts/map/js/world.js'

      export default {
        name: 'DailyActiveChart',
        components: { ECharts },
        data () {
          return {
            polar: {
              dataRange: {
                show: true,
                min: 0,
                max: 1000000,
                text: ['High', 'Low'],
                realtime: true,
                calculable: true,
                color: ['#7CF9D0', '#7CC0FE', '#DEF6FF']
              },
              tooltip: {
                trigger: 'item'
              },
              geo: {
                map: 'world',
                label: {
                  emphasis: {
                    show: false
                  }
                },
                roam: false,
                silent: true,
                itemStyle: {
                  normal: {
                    areaColor: '#37376e',
                    borderColor: '#000'
                  },
                  emphasis: {
                    areaColor: '#3E98FE'
                  }
                }
              },
              series: [{
                name: '校友人数',
                type: 'map',
                mapType: 'world',
                itemStyle: {
                  normal: {
                    borderWidth: 0.5,
                    borderColor: '#A9A9A9',
                    areaStyle: {
                      color: '#37376e'
                    }
                  },
                  emphasis: {
                    areaColor: '#3E98FE',
                    borderColor: '#fff',
                    borderWidth: 0
                  }
                },
                mapLocation: {
                  y: 100
                },
                data: [{
                  name: 'Afghanistan',
                  value: 28397.812
                },
                  {
                    name: 'Angola',
                    value: 19549.124
                  },
                  {
                    name: 'Albania',
                    value: 3150.143
                  },
                  {
                    name: 'United Arab Emirates',
                    value: 8441.537
                  },
                  {
                    name: 'Yemen',
                    value: 22763.008
                  },
                  {
                    name: 'South Africa',
                    value: 51452.352
                  },
                  {
                    name: 'Zambia',
                    value: 13216.985
                  },
                  {
                    name: 'Zimbabwe',
                    value: 13076.978
                  }
                ],
                symbolSize: 12,
                label: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: false
                  }
                }
              }]
            }
          }
        },
        methods: {
          // 双击事件
          dblClick (v) {
            console.log(v)
          },
          // 单击事件
          doClick (v) {
            console.log(v)
          }
        }
      }
    </script>

    <style lang="scss" scoped>
      .echarts-box {
        margin: 20px 0;
        padding: 20px;
        border-radius: 5px;
        background-color: #fff;
        .title-box {
          display: flex;
          .label {
            width: 25px;
            height: 25px;
            margin-right: 10px;
          }
          .title {
            color: #4C4C4C;
            font-size: 18px;
          }
        }
        .echarts {
          width: 100%;
          height: 600px;
        }
      }
    </style>
```

### 四、中国地图的组件代码（已省略部分省份数据，可在代码文件中复制）

　　[中国 - 代码文件](https://github.com/liuxy0551/liuxy0551.github.io/blob/master/assets/posts/vue-echarts/China.vue)
```
    <template>
      <div class="echarts-box">
        <v-chart class="echarts" :options="polar" @dblclick="dblClick" @click="doClick"/>
      </div>
    </template>

    <script>
      import ECharts from 'vue-echarts'
      import '../../../../node_modules/echarts/map/js/china.js'

      export default {
        name: 'DailyActiveChart',
        components: { ECharts },
        data () {
          return {
            polar: {
              title: {
                text: '校友中国分布地图'
              },
              tooltip: {}, // 鼠标移到图里面的浮动提示框
              dataRange: {
                show: true,
                min: 0,
                max: 1000,
                text: ['High', 'Low'],
                realtime: true,
                calculable: true
              },
              geo: { // 这个是重点配置区
                map: 'china', // 表示中国地图
                roam: true,
                label: {
                  normal: {
                    show: true, // 是否显示对应地名
                    textStyle: {
                      color: 'rgba(0,0,0,0.4)'
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    borderColor: 'rgba(0, 0, 0, 0.2)'
                  },
                  emphasis: {
                    areaColor: null,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20,
                    borderWidth: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              },
              series: [{
                type: 'scatter',
                coordinateSystem: 'geo' // 对应上方配置
              },
                {
                  name: '启动次数', // 浮动框的标题
                  type: 'map',
                  geoIndex: 0,
                  data: [{
                    name: '北京',
                    value: 599
                  }, {
                    name: '上海',
                    value: 142
                  }, {
                    name: '黑龙江',
                    value: 44
                  }, {
                    name: '深圳',
                    value: 92
                  }, {
                    name: '湖北',
                    value: 810
                  }, {
                    name: '四川',
                    value: 453
                  }] // 这里就是数据，即数组可以单独放在外面也可以直接写
                }]
            }
          }
        },
        methods: {
          // 双击事件
          dblClick (v) {
            console.log(v)
          },
          // 单击事件
          doClick (v) {
            console.log(v)
          }
        },
        mounted () {
          this.polar.series[1].data.push({
            name: '浙江',
            value: 324
          })
        }
      }
    </script>

    <style lang="scss" scoped>
      .echarts-box {
        margin: 20px 0;
        padding: 20px;
        border-radius: 5px;
        background-color: #fff;
        .echarts {
          width: 100%;
          height: 600px;
        }
      }
    </style>
```
