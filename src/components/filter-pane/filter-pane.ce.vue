<template>
  <div>
    <div class="overlayWrap" ref="overlayOutside">
      <slot name="overlay"></slot>
      <template v-for="item in options" :key="item.key">
        <slot :name="item.key"></slot>
      </template>
    </div>
    <a-popover
      :title="title"
      overlayClassName="filterPane"
      placement="bottomLeft"
      trigger="click"
    >
      <template #content>
        <div ref="overlay">
          <div v-for="item in options" :key="item.key">
            <a-popover placement="right">
              <div class="overlayItem">{{ item.label }}</div>
              <template #content>
                <div :ref="state[item.key]">
                  {{ item.label }}-{{ item.key }}
                </div>
              </template>
            </a-popover>
          </div>
        </div>
      </template>
      <span><slot></slot></span>
    </a-popover>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref, watchEffect } from "vue";
import { Popover } from "ant-design-vue";
export default defineComponent({
  components: {
    "a-popover": Popover,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { slots }) {
    const overlay = ref(null);
    const overlayOutside = ref(null);
    const state = computed(() => {
      const t = {};
      props.options.forEach((item) => {
        if (!state[item.key]?.value) {
          t[item.key] = ref(null);
        }
      });
      return t;
    });

    watchEffect(() => {
      if (overlay.value && props.options.length && props.id) {
        const outside = document.querySelector(`#${props.id}`).childNodes;
        for (let i = 0; i < outside.length; i++) {
          const childItem = outside[i];
          const slotName = childItem?.getAttribute && childItem?.getAttribute("slot");
          const refState = state.value
          for(let i in refState) {
            if (refState[i].value && slotName === i) {
              refState[i].value.innerHTML=null
              refState[i].value.append(childItem);
            }
          }
        }
      }
    });
    return {
      overlay,
      overlayOutside,
      state,
    };
  },
});
</script>

<style lang="less" scoped>
.overlayWrap {
  position: absolute;
  z-index: -1;
  display: none;
}
.ant-popover-inner-content {
  padding: 0;
}
</style>
