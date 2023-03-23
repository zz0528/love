<template>
  <header class="header">
    <div class="left-header" @click="handBack">
      <van-icon :name="name" />
    </div>
    <div class="header-title">{{ title }}</div>
    <div class="right-header" :style="{ color: color }" @click="handleSubTitle">{{ subtitle }}</div>
  </header>
</template>
<script setup>
import { defineEmits } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default() {
      return ''
    },
  },
  name: {
    type: String,
    default() {
      return ''
    },
  },
  color: {
    type: String,
    default() {
      return ''
    },
  },
  subtitle: {
    type: String,
    default() {
      return ''
    },
  },
})
const emit = defineEmits(['handBack', 'handleSubTitle'])
const handBack = () => {
  emit('handBack')
}
function handleSubTitle(ctx) {
  emit('handleSubTitle')
}
</script>
