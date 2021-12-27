<template>
  <drag-wrap
    class="pos-r w-100p bg-red-10 overflow-hidden"
    style="max-width: 100%"
    :parent="true"
    :draggable="true"
    :resizable="true"
  >
    <slot></slot>
  </drag-wrap>
</template>

<script>
import { defineComponent, ref } from "vue";
import Vue3DraggableResizable from "vue3-draggable-resizable";

export default defineComponent({
  components: {
    "drag-wrap": Vue3DraggableResizable,
  },
  props: {},
  setup(props) {},
});
</script>
