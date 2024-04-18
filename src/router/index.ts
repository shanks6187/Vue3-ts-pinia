import { createRouter, createWebHashHistory } from 'vue-router'
import Main from '@/views/Appmain/index.vue'
import Cart from '@/views/Appcart/index.vue'
import Mine from '@/views/Appmine/index.vue'
import notfound from '@/views/notfound/index.vue'
import list from '@/views/AppList/index.vue'
import detail from '@/views/AppDetail/index.vue'
import login from '@/views/Applogin/index.vue'
import step_one from '@/views/Appregister/step_one.vue'
import step_two from '@/views/Appregister/step_two.vue'
import step_three from '@/views/Appregister/step_three.vue'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',name:'home', component:Main},
    {path:'/cart',name:'cart', component:Cart},
    {path:'/mine',name:'mine', component:Mine},
    {path:'/list',name:'list', component:list,meta:{hiddfoot:true}},
    {path:'/detail/:proid',name:'detail', component:detail,meta:{hiddfoot:true}},
    {path:'/login',name:'login', component:login,meta:{hiddfoot:true}},
    {path:'/step_one',name:'step_one', component:step_one,meta:{hiddfoot:true}},
    {path:'/step_two',name:'step_two',component:step_two,meta:{hiddfoot:true}},
    {path:'/step_three',name:'step_three',component:step_three,meta:{hiddfoot:true}},

    //  :pathMatch(.*)* == 匹配所有路由
    {path:'/:pathMatch(.*)*',name:'Notfund',component:notfound,meta:{hiddfoot:true}}//meta是往路由里传参数
  ]
})

export default router
