<script setup lang="ts">
import { ref, onMounted } from "vue";
import PropsPane from "./components/props-pane/index.vue";
import HeaderContent from "./components/header-pane/index.vue";
import WidgetPane from "./components/widget-pane/index.vue";
import draggable from "vuedraggable";
import Drag from "./components/drag/index.vue";
import Container from "./components/container/index.vue";
const myArray = ref([]);

const myArray2 = ref([
  {
    value: "one",
    label: "我是第一项",
  },
  {
    value: "two",
    label: "我是第二项",
  },
  {
    value: "d",
    label: "鲁班7号",
  },
  {
    value: "xxd",
    label: "孙猴子",
  },
]);

const containerList = ref([]);

const handleHeaderItem = (e) => {
  console.log(e);
  if (e === "addContainer") {
    containerList.value.push({
      value: +new Date(),
      label: "新建图层",
      list: [],
    });
  }
};
</script>

<template>
  <a-layout>
    <a-layout-header class="header">
      <div><HeaderContent @click="handleHeaderItem" /></div>
    </a-layout-header>
    <a-layout class="content">
      <a-layout-sider theme="light">
        <div style="padding: 4px">
          <div>表单组件</div>
          <div>
            <a-row :gutter="8">
              <a-col span="12">
                <a-card size="small" hoverable title="checkbox">
                  <img
                    class="widgetImg"
                    src="https://gw.alipayobjects.com/zos/alicdn/8nbVbHEm_/CheckBox.svg"
                    alt=""
                  />
                </a-card>
              </a-col>
              <a-col span="12">
                <a-card size="small" hoverable title="radio">
                  <img
                    class="widgetImg"
                    src="https://gw.alipayobjects.com/zos/alicdn/8cYb5seNB/Radio.svg"
                    alt=""
                  />
                </a-card>
              </a-col>
              <draggable
                v-model="myArray2"
                :group="{ name: 'widget', pull: 'clone', put: false }"
                @start="drag = true"
                @end="drag = false"
                item-key="value"
              >
                <template #item="{ element }">
                  <div>{{ element.label }}</div>
                </template>
              </draggable>
            </a-row>
          </div>
        </div>
      </a-layout-sider>
      <a-layout>
        <a-layout-content>
          <div class="centerContainer">
            <DraggableContainer>
              <Container v-for="item in containerList" :key="item.value">
                <Drag
                  group="widget"
                  mode="col"
                  v-model:value="item.list"
                ></Drag>
              </Container>
            </DraggableContainer>
          </div>
        </a-layout-content>

        <a-layout-sider theme="light" width="250px">
          <PropsPane />
        </a-layout-sider>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style lang="less" scoped>
.header {
  height: 5vh;
  background: #fff;
  line-height: 16px;
  padding: 0;
  border-bottom: 1px solid #ccc;
}
.content {
  height: 95vh;
}
.widgetImg {
  width: 100%;
  height: 50px;
}
.centerContainer {
  width: 375px;
  height: 600px;
  margin: 10px auto;
  border: 1px solid #ccc;
  box-sizing: border-box;
  overflow: auto;
  background: #fafafa;
  border-radius: 2px;
}
</style>
