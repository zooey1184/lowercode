<script setup lang="ts">
import { ref, onMounted } from "vue";
import PropsPane from './components/props-pane/index.vue'
import HeaderContent from './components/header-pane/index.vue'
import WidgetPane from './components/widget-pane/index.vue'
import draggable from 'vuedraggable'

const myArray = ref([
  {
    id: 'd',
    name: '鲁班7号',
  },
  {
    id: 'xxd',
    name: '孙猴子',
  }
])

const myArray2 = ref([
  {
    id: 'one',
    name: '我是第一项',
  },
  {
    id: 'two',
    name: '我是第二项',
  }
])

</script>

<template>
  <a-layout>
    <a-layout-header class="header">
      <div><HeaderContent /></div>
    </a-layout-header>
    <a-layout class="content">
      <a-layout-sider theme="light">
        <div style="padding: 4px">
          <div>表单组件</div>
          <div>
            <a-row :gutter="8">
              <a-col span='12'>
                <a-card size='small' hoverable title='checkbox'>
                  <img class="widgetImg" src="https://gw.alipayobjects.com/zos/alicdn/8nbVbHEm_/CheckBox.svg" alt="">
                </a-card>
              </a-col>
              <a-col span='12'>
                <a-card size='small' hoverable title='radio'>
                  <img class="widgetImg" src="https://gw.alipayobjects.com/zos/alicdn/8cYb5seNB/Radio.svg" alt="">
                </a-card>
              </a-col>
              <draggable 
                v-model="myArray2" 
                :group="{ name: 'widget', pull: 'clone', put: false }"
                @start="drag=true" 
                @end="drag=false" 
                item-key="id">
                <template #item="{element}">
                  <div>{{element.name}}</div>
                </template>
              </draggable>
            </a-row>
          </div>
        </div>
      </a-layout-sider>
      <a-layout>
        <a-layout-content>
          <div class="centerContainer">
            <draggable 
                v-model="myArray" 
                group="widget" 
                @start="drag=true" 
                @end="drag=false" 
                item-key="id">
                <template #item="{element}">
                  <div>{{element.name}}</div>
                </template>
              </draggable>

            
          </div>
        </a-layout-content>

        <a-layout-sider theme="light" width="250px">
          <PropsPane/>
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
  overflow: auto;
  background: #fafafa;
  border-radius: 2px;
}
</style>
