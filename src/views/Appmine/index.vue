<template>
    <div class="page app-mine">
        <Commonnav :title="'个人中心'" class="app-navHeader"></Commonnav>
        <div class="info">
            <van-empty v-if="!isLoading" description="⊙o⊙ 您还没有登录哦！">
                <!-- 将link的跳转属性取消，转移给button -->
                <router-link v-slot="{navigate}" :to="{name:'login'}" custom>
                    <van-button @click="navigate" round type="primary" class="bottom-button">去登录</van-button>
                </router-link>
            </van-empty>
            <div v-else class="userinfo">
                <!-- <van-image
                round
                width="2.5rem"
                height="2.5rem"
                :src="UserInfo.avatar"
                /> -->
                <van-image
                round
                width="2.5rem"
                height="2.5rem"
                src="https://s.cn.bing.net/th?id=OHR.DragonWaterfall_ZH-CN9580105565_1920x1080.webp&qlt=50"
                />
                <div><b>{{ UserInfo.nickname }}</b></div>
                <van-button round type="primary" class="bottom-button" @click="exitlogin">退出登录</van-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useUserStore from '@/stores/user';
const userstore = useUserStore()
const {isLoading,UserInfo } = storeToRefs(useUserStore())

const exitlogin = ()=>{
    userstore.exitUser()
}
</script>

<style scoped lang="scss">
@import '@/assets/css/var.scss';
 .bottom-button {
    width: 160px;
    height: 40px;
    background: $red-color;
    border: none;
  }
  .app-mine{
    .info{
        padding-top: 0.7rem;
        .userinfo{
            display: flex;
            flex-direction: column;
            align-items: center;
            &>*{  /*父级引用*/
                margin-bottom: 0.7rem;
            }
        }
    }
  }
</style>