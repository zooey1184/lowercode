<template>
  <div class="bg-blue-10 w-30 h-30 pos-a" :style="{left: `${location.x}px`, top: `${location.y}px`}" ref='wrap' @mousedown="handleStart">
    <div class="pos-a bottom-0 right-0 w-5 h-5 border-solid border-1"></div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue'

export default defineComponent({
  components: {

  },
  props: {
    parent: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const wrap = ref(null)
    const isMove = ref(false)
    const location = reactive({
      x: 0,
      y: 0,
      w: 30,
      h: 30
    })

    const handleStart = (e) => {
      const rect = wrap.value.getBoundingClientRect()
      isMove.value = true
    }

    const handleMove = (e) => {
      const rect = wrap.value.getBoundingClientRect()
      if(isMove.value) {
        location.x = e.x - props.parent.x
        location.y = e.y - props.parent.y
        console.log(e.y, props.parent.y);
      }
    }
    const handleEnd = (e) => {
      isMove.value = false
    }

    onMounted(() => {
      document.addEventListener('mousemove', (e) => {
        const rect = wrap.value.getBoundingClientRect()
      if(isMove.value) {
        location.x = e.x - props.parent.x
        location.y = e.y - props.parent.y
        console.log(e.y, props.parent.y);
      }
      })
      document.addEventListener('mouseup', () => {
        isMove.value = false
      })
    })
    return {
      handleStart,
      handleMove,
      handleEnd,
      wrap,
      location
    }
  }
})
</script>