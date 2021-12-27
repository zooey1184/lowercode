import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        // 将所有包含短横线的标签作为自定义元素处理
        isCustomElement: tag => tag.includes('imc-')
      }
    }
  })],
  build: {
    lib: {
      name: 'chart',
      entry: path.resolve(__dirname, './src/index.js'),
      
    }
  }
})
