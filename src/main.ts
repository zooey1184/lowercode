import { createApp, defineCustomElement } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import "ant-design-vue/dist/antd.css";
import Vue3DraggableResizable from 'vue3-draggable-resizable'
//需引入默认样式
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'

const app = createApp(App)
app.use(Antd)
app.use(Vue3DraggableResizable)
app.mount('#app')
