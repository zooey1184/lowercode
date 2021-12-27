<template>
  <div>

  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import {Input, Radio, Checkbox, Select, } from 'ant-design-vue'

export default defineComponent({
  components: {
    'a-input': Input,
  },
  props: {
    options: {
      type: Array,
      default: () => ([])
    }
  },
  setup(props) {
    return {

    }
  }
})
</script>