<template>
    <div class="page app-main">
        <!-- 导航头 -->
        <Commonnav class="app-navHeader">
            <template #left>
                <van-icon name="apps-o" />
            </template>
            <template #title>
                <van-search
                    shape="round"
                    background="#d30707"
                    placeholder="请输入搜索内容"
                    @search="endsearch"
                />
            </template>
            <template #right>
                <span v-if="userStore.isLoading">{{userStore.UserInfo.nickname}}</span>
                <router-link v-else to="/login" custom v-slot="{navigate}">
                    <span @click="navigate">登录</span>
                </router-link>
            </template>
        </Commonnav>
        <!-- 轮播 -->
        <banner></banner>
        <!-- 十宫格 -->
        <grid></grid>
        <!-- 商品列表 -->
        <conmonList :column="2" :action="GetShoppingList"></conmonList>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useUserStore from '@/stores/user'
const userStore=useUserStore()
import { GetShoppingList } from '@/api/axiosLink'
import router from '@/router';
// var searchText = ref<String|number>('')
const endsearch = (text:string|number)=>{
    router.push({name:'list',query:{search:text}})
}

</script>

<style scoped lang="scss"> 

</style>