import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite' //解放双手 不用手动引入组件  注:别重名
import { VantResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()
  ,
  Components({
    //指定组件位置,默认是src/components
    dirs:['src'],
    //组件有效文件扩展名
    extensions:['vue'],
    //搜索子目录
    deep:true,
    //ui库解析器,也可以自定义
    resolvers:[VantResolver()], //安装了vant之后要将此代码解开
    //配置文件生成位置
    dts:'src/components.d.ts'
  })
],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
