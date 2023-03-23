<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive>
      <component :is="Component" :key="route.name" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" :key="route.name" v-if="!$route.meta.keepAlive" />
  </router-view>
</template>

<script setup name="app">
const height = document.documentElement.clientHeight // 获取当前可视区域的高度存到hrt变量
window.onload = function () {
  // 在页面整体加载完毕时
  document.getElementById('app').style.height = height + 'px' // 把获取到的高度赋值给根div
}
</script>
