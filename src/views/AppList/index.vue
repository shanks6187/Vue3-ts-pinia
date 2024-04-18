<template>
    <div>
        <Commonnav class="app-navHeader" :back="true">
            <template #title>
                <van-search
                    v-model="title"
                    shape="round"
                    background="#d30707"
                    placeholder="请输入搜索内容"
                />
            </template>
        </Commonnav>
        
        <!-- 商品列表 -->
        <conmonList  :action="GetShoppingList"></conmonList>
    </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue'
import { GetShoppingList } from '@/api/axiosLink'
import { useRoute } from 'vue-router'
const route = useRoute()
const title = ref<string>(route.query.search as string || '')
// console.log(title);
onMounted( async ()=>{
    // console.log( await GetShoppingList());
    
})

</script>

<style scoped>

</style>