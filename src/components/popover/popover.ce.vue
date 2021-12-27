<template>
  <div>
    <div class="overlayWrap" ref='overlayOutside'>
      <slot name='overlay'></slot>
    </div>
    <a-popover :title='title' trigger="click">
      <template #content>
        <div ref='overlay'></div>
      </template>
      <span><slot></slot></span>
    </a-popover>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watchEffect } from 'vue'
import {Popover} from 'ant-design-vue'
export default defineComponent({
  components: {
    'a-popover': Popover
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    }
  },
  setup(props, {slots}) {
    const overlay = ref(null)
    const overlayOutside = ref(null)

    watchEffect(() => {
      if (overlay.value && props.id) {
        const outside = document.querySelector(`#${props.id}`).childNodes
        for(let i=0; i<outside.length; i++) {
          const childItem = outside[i]
          const slotName = childItem?.getAttribute && childItem?.getAttribute('slot')
          if (slotName === 'overlay') {
            overlay.value.append(childItem)
            break
          }
        }
      }
    })
    return {
      overlay,
      overlayOutside
    }
  }
})
</script>

<style lang="less" scoped>
.overlayWrap {
  position: absolute;
  z-index: -1;
  display: none;
}

</style>