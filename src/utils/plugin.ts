//type 用来描述对象或函数类型  给这些对象请一个新的名字
import type { App } from "vue"
import commonnavVue from "@/components/commonnav.vue"

export const common = {
    install(app:App){
        //如果同时传递一个组件名字符串及其定义，则注册一个全局组件；如果只传递一个名字，则会返回用该名字注册的组件 (如果存在的话)。
        app.component("commonnavVue",commonnavVue)
    }
}