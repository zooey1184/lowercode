<template>
  <draggable
    :class="{'list-group': true, flex: mode==='row', 'flex-wrap': !scroll }"
    tag="transition-group"
    class="border-blue border-1 border-solid"
    v-bind="dragOptions"
    v-model="options"
    :group="group"
    :component-data="{
      tag: 'ul',
      type: 'transition-group',
      name: !drag ? 'flip-list' : null,
    }"
    @start="handleStartDrag"
    @end="handleEndDrag"
    :item-key="itemKey"
  >
    <template #item="{ element }">
      <div class="w-60 h-40 bg-blue-10 vertical-top flex-0" @click="handlePickCurrent" @contextmenu.prevent="handlePickParent" :class="{'inline-block': mode==='row'}">{{ element.label }}</div>
    </template>
  </draggable>
</template>

<script>
import { computed, defineComponent, ref, watch } from "vue";
import draggable from "vuedraggable";

export default defineComponent({
  components: {
    draggable,
  },
  props: {
    group: {
      type: [String, Object],
    },
    value: {
      type: Array,
      default: () => [],
    },
    itemKey: {
      type: String,
      default: 'value'
    },
    mode: {
      type: String,
      default: 'row'
    },
    scroll: {
      type: Boolean,
      default: true
    }
  },
  emits: ["update:value"],
  setup(props, { emit }) {
    const options = ref(props.value);

    watch(
      () => props.value,
      (n) => {
        options.value = n;
      }
    );

    const dragOptions = computed(() => ({
      animation: 200,
      group: "description",
      disabled: false,
      ghostClass: "ghost",
      ...props
    }));
    const drag = ref(false);
    const handleEndDrag = () => {
      drag.value = false;
      emit("update:value", options.value);
    };

    const handleStartDrag = (e) => {
      drag.value = true
      emit('dragStart', e, options.value)
    }

    const handlePickCurrent =  (e) => {
      console.log(e);

    }

    const handlePickParent = (e) => {
      console.log(e);
    }
    return {
      dragOptions,
      drag,
      options,
      handleEndDrag,
      handleStartDrag,
      handlePickCurrent,
      handlePickParent
    };
  },
});
</script>

<style lang="less" scoped>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}

.vertical-top {
  vertical-align: top;
}
ul {
  margin-bottom: 0;
}
</style>
