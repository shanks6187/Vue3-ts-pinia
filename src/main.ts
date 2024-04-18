import { createApp } from 'vue'

import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/assets/css/index.scss' //引入CSS样式
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' //]本地存储

//引入全局注册的组件
import {common as Commonnav}from '@/utils/plugin'

//vant函数形式的组件的样式
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'

const app = createApp(App)
const pinia =createPinia()
pinia.use(piniaPluginPersistedstate) //调用数据本地存储插件
app.use(pinia)
app.use(router)
app.use(Commonnav)
app.mount('#app')