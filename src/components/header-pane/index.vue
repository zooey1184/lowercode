<template>
  <div class="flex items-center p-8">
    <div class="mx-16 cursor-pointer hover-shadow-blue" @click='handleClick(item)' v-for='item in actions' :key='item.value'>{{item.label}}</div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
defineProps<{ msg: string }>()

const count = ref(0)
const actions = ref([
  {
    label: '保存',
    value: 'save',
  },
  {
    label: '预览',
    value: 'overview'
  },
  {
    label: '清空',
    value: 'clear'
  },
  {
    label: '新建图层容器',
    value: 'addContainer'
  }
])

const emit= defineEmits<{
    (e: 'click', type: string): void
  }>()

const handleClick = (e) => {
  emit('click', e.value)
}
</script>
