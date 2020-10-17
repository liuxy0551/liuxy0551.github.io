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
