<template>
  <div class="wrap desc_inline">
    <Header :name="name" :title="title" @handBack="handBack"></Header>
    <div class="app_container">
      <div class="container">
        <div class="title">vue</div>
        <div class="note">
          <div class="note-title">闭包的作用：</div>
          <div>1、延迟变量的生命周期</div>
          <div>2、创建私有作用域</div>
          <div>3、闭包可以在函数外部访问到函数内部的变量</div>
          <div>4、闭包可以让访问变量不被垃圾机制回收</div>
        </div>
        <div class="note">
          <div class="note-title">闭包应用场景</div>
          <div>1、封闭作用域链</div>
          <div>2、作用域链</div>
          <div>3、保存作用域</div>
          <div>4、参数传递</div>
          <div>5、函数节流</div>
        </div>
        <div class="echarts" id="main" style="height: 300px; width: 100%"></div>
        <div class="button" @click="handleclick()">提交</div>
      </div>
    </div>
  </div>
</template>

<script setup name="console">
import Header from '@/components/HeaderBar.vue'
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const title = '平台'
const name = 'arrow-left'
const handBack = () => {
  console.log('返回')
}
const arr = [1, 2, 3, 4, 5, 5, 4, 3, 2, 6]
/**
 * filter + indexOf 去重
 */
const newArrayFn = (arr) => {
  return arr.filter((item, idx) => {
    return arr.indexOf(item) === idx
  })
}
/**
 * includes 去重
 */
const newArrFn = (arr) => {
  const NewArray = []
  for (let i = 0; i < arr.length; i++) {
    if (!NewArray.includes(arr[i])) {
      NewArray.push(arr[i])
    }
  }
  return NewArray
}
/**
 * reduce 去重
 */
const newArrayReduceFn = (arr) => {
  const newArr = []
  return arr.reduce((prev, next, index, arr) => {
    return newArr.includes(next) ? newArr : newArr.push(next)
  }, 0)
}
/**
 * 闭包  读取其他函数内的变量 作用域
 */
const foo = () => {
  const a = 'hello word'
  const bar = () => {
    console.log('a', a)
  }
  return bar
}
const keith = foo()
keith()
// 节流 (规定时间内只触发一次)
const throttle = (fn, delay) => {
  let timer = null
  delay = delay || 3000
  return function (...args) {
    if (timer) {
      return
    }
    const _this = this
    timer = setTimeout(() => {
      timer = null
    }, delay)
    fn.apply(_this, args)
  }
}
const val = ref(111)
// 防抖 (多次触发只执行一次)
const debounce = (fn, delay) => {
  delay = delay || 200
  let timer = null
  return function (...args) {
    const _this = this
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      timer = null
      fn.apply(_this, args)
    })
  }
}
const handleSubmit = () => {
  console.log('节流', val.value++)
}
const handleclick = throttle((e) => {
  handleSubmit()
}, 5000)

// const handleclick = throttle((e) => {
//   console.log('节流', val.value++)
// }, 3000)
var myChart = null
const init = () => {
  var chartDom = document.getElementById('main')
  myChart = echarts.init(chartDom)
  var option

  option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
      },
    ],
  }

  option && myChart.setOption(option)
}
onMounted(() => {
  init()
  newArrayReduceFn(arr)
  newArrayFn(arr)
  newArrFn(arr)
  console.log('filter + indexOf', newArrayFn(arr))

  console.log('new Set', Array.from(new Set(arr)))

  console.log('includes', newArrFn(arr))

  console.log('reduce', newArrayReduceFn(arr))
  // 判断当前是横竖屏
  var widtha = window.screen.width
  var heightb = window.screen.height

  window.addEventListener('orientationchange', function () {
    console.log('执行', window.orientation)
    console.log(widtha, heightb)
    myChart.resize()
  })
})
</script>
<style lang="scss" scoped>
.title {
  font-size: 20px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  font-style: italic;
  padding: 16px;
}
.note {
  padding: 12px;
  .note-title {
    font-size: 15px;
    font-weight: 500;
    padding: 0 0 12px 0;
  }
  div {
    line-height: 24px;
  }
}
</style>
