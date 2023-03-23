<template>
  <div :class="screenState == true ? 'screenWrap' : 'wrap'">
    <Header
      :name="name"
      :title="title"
      @handBack="handBack"
      :class="screenState == true ? 'screenHeader' : 'header'"></Header>
    <div class="app_container">
      <div class="container">
        <div :class="screenState == true ? 'screenEcharts' : 'echarts'">
          <div style="height: 100%; width: 100%" id="main"></div>
        </div>
        <div class="tab" :class="screenState == true ? 'screenTab' : 'tab'">
          <div
            class="tab_item"
            v-for="(item, idx) in tab"
            :key="idx"
            :class="{ active: status === item.value }"
            @click="handleClick(item)">
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="console">
import Header from '@/components/HeaderBar.vue'
import { nextTick, onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const title = '体温'
const name = 'arrow-left'
const handBack = () => {
  console.log('返回')
}

const tab = [
  {
    value: 0,
    label: '今日',
  },
  {
    value: 1,
    label: '7天',
  },
  {
    value: 2,
    label: '一个月',
  },
]
const status = ref(0)
const handleClick = (item) => {
  status.value = item.value
}
const screenState = ref(false) // 屏幕状态  横屏||竖屏 默认竖屏（false）

let myChart = null
const init = () => {
  var chartDom = document.getElementById('main')
  myChart = echarts.init(chartDom)
  var option

  option = {
    title: {
      subtext: '最大值39' + '   ' + '最小值19',
      right: '7%',
      top: '6%',
    },
    legend: {
      data: [
        {
          name: '表皮温度(ST)',
        },
        {
          name: '人体温度(BT)',
        },
      ],
    },
    grid: {
      right: '8%',
      bottom: '30%',
      left: '8%',
      top: '24%',
    },
    xAxis: {
      type: 'category',
      data: ['3.5', '3.6', '3.7', '3.8', '3.9', '3.10', '3.11'],
      axisTick: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: 'rgba(0,0,0,.5)',
        },
      },
      axisLine: {
        lineStyle: {
          color: '#dfdfdf',
        },
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: 'rgba(0,0,0,.15)',
        },
      },
    },
    dataZoom: [
      {
        type: 'slider',
        show: true, //flase直接隐藏图形
        backgroundColor: 'rgba(164, 164, 164, 0.05)',
        selectedDataBackground: {
          lineStyle: {
            color: 'rgba(174, 214, 255, 1)',
          },
          areaStyle: {
            color: 'rgba(0, 125, 255, 0.05)',
          },
        },
        xAxisIndex: [0],
        left: '8%', //滚动条靠左侧的百分比
        bottom: '6%',
        start: 0, //滚动条的起始位置
        end: 100, //滚动条的截止位置（按比例分割你的柱状图x轴长度）
        showDataShadow: true,
        moveOnMouseMove: true,
        height: 32,
        handleSize: '100%',
        borderColor: 'rgba(174, 214, 255, 1)',
        brushSelect: true,
        minSpan: 3.5,
        handleStyle: {
          borderWidth: 1,
          borderColor: 'rgba(174, 214, 255, 1)',
        },
        moveHandleSize: 0,
        moveHandleStyle: {
          color: '#fff',
          borderWidth: 0,
        },
      },
      {
        type: 'inside',
      },
    ],
    series: [
      {
        type: 'line',
        smooth: true,
        name: '表皮温度(ST)',
        symbol: 'none',
        data: [35, 30, 39.5, 37, 33, 38.5, 36.5],
        itemStyle: {
          normal: {
            color: 'rgba(91, 143, 249, 1)',
          },
        },
      },
      {
        type: 'line',
        smooth: true,
        name: '人体温度(BT)',
        symbol: 'none',
        data: [10, 10, 10, 10, 10, 10, 10],
        itemStyle: {
          normal: {
            color: 'rgba(90, 216, 166, 1)',
          },
        },
      },
    ],
  }

  option && myChart.setOption(option)
}
window.addEventListener('orientationchange', function () {
  if (window.orientation === 90 || window.orientation === -90) {
    screenState.value = true
  } else {
    screenState.value = false
  }
  setTimeout(() => {
    myChart.resize()
  }, 50)
})
onMounted(() => {
  // 判断当前是横竖屏
  var widtha = window.screen.width
  var heightb = window.screen.height

  if (widtha > heightb) {
    screenState.value = true
  } else {
    screenState.value = false
  }
  setTimeout(() => {
    init()
  }, 1000)
})
</script>
<style lang="scss">
.echarts {
  margin-top: 15px;
  height: 300px;
  width: 100%;
}
.screenWrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  .screenHeader {
    height: 20px !important;
    font-size: 8px !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    background: #007dff;
    color: #fff;
    width: 100%;
    .left-header {
      font-size: 8px !important;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 100%;
      flex: 1;
    }
    .header-title {
      display: flex;
      align-items: center;
      height: 100%;
      font-weight: 500;
    }
    .right-header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 100%;
      flex: 1;
      font-size: 13px;
    }
  }
  .app_container {
    flex: 1;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    .container {
      flex: 1;
      overflow-y: scroll;
      .screenEcharts {
        margin-top: 12px;
        height: 75% !important;
        width: 100%;
        position: relative;
      }
    }
    .container::-webkit-scrollbar {
      width: 0;
      display: none;
    }
  }
  .app_container::-webkit-scrollbar {
    width: 0;
    display: none;
  }
}
.tab {
  display: flex;
  justify-content: center;
  .tab_item {
    width: 100px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #007dff;
    border-radius: 3px;
    margin: 0 16px 0 0;
  }
  .active {
    background: #007dff;
    color: #fff;
  }
  .tab_item:last-child {
    margin: 0;
  }
}
.screenTab {
  display: flex;
  justify-content: center;
  .tab_item {
    width: 80px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #007dff;
    border-radius: 3px;
    margin: 0 16px 0 0;
    font-size: 8px !important;
  }
  .active {
    background: #007dff;
    color: #fff;
  }
  .tab_item:last-child {
    margin: 0;
  }
}
</style>
