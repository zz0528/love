<template>
  <div class="tab">
    <div
      v-for="(item, idx) in Tab"
      :key="idx"
      :class="{ active: status === item.value }"
      class="label"
      @click="handleClick(item, idx)">
      {{ item.label }}
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  Tab: {
    type: Array,
    default() {
      return []
    },
  },
  status: {
    type: Number,
    default() {
      return 0
    },
  },
})
const emit = defineEmits(['handleClick'])
const handleClick = () => {
  emit('handleClick')
}
</script>
<style lang="scss" scoped>
.tab {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  border-radius: 5px;
  padding: 0 6px;
  margin-bottom: 10px;
  .label {
    display: flex;
    justify-content: center;
    height: 42px;
    align-items: center;
    box-sizing: border-box;
  }
  .active {
    border-bottom: 2px solid #0080ce;
    color: #0080ce;
    box-sizing: border-box;
  }
}
</style>
