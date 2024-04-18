<template>
         <van-nav-bar :title="title" :left-arrow="back" @click-left="goback" fixed>
           <template v-if="!back" #left>
                <slot  name="left"></slot>
            </template>

            <template v-if="!title" #title>
                <slot name="title"></slot>
            </template>
            
            <template   #right> 
                <slot name="right"></slot>
            </template>
        </van-nav-bar> 
</template>

<script setup lang="ts">
// import { useAttrs } from 'vue';
// const attrs = useAttrs()
// console.log(attrs);
interface THeader{
    title?:string,
    back?:boolean
}

const dates = defineProps<THeader>()
const {title,back = false} = dates


import { useRouter,useRoute } from 'vue-router';
const router = useRouter()  //路由的方法:跳转  router对象是全局路由的实例，是router构造方法的实例
const route = useRoute() //是当前路由(链接)的数据参数:route对象表示当前的路由信息，包含了当前 URL 解析得到的信息。包含当前的路径，参数，query对象等。
const goback = ()=>{
    if(back==true)router.back()
}

</script>

<style scoped lang="scss">
</style>