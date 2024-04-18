<template>
    <div class="page app_detail_page">
        <!-- Prodetail?.proname  语义是 先判断Prodetail存不存在，存在就.proname -->
        <commonnav v-if="Prodetail"  :title="Prodetail?.proname" :back="true" class="app-navHeader">
            <template v-if="isLoading" #right>
                <router-link :to="{name:'cart'}">
                    <van-icon name="cart-o" color="#ffffff" size="30px" />
                </router-link>
            </template>
        </commonnav>
        <template v-if="Prodetail">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item >
                    <img :src="Prodetail.img1"/>
                </van-swipe-item>
                <van-swipe-item >
                    <img :src="Prodetail.img2"/>
                </van-swipe-item>
                <van-swipe-item >
                    <img :src="Prodetail.img3"/>
                </van-swipe-item>
                <van-swipe-item >
                    <img :src="Prodetail.img4"/>
                </van-swipe-item>
            </van-swipe>
            <div class="app-detail-info">
                <van-space direction="vertical" fill>
                    <h3>{{Prodetail.proname}}</h3>
                    <span>{{Prodetail.desc}}</span>
                </van-space>
            </div>
            <van-submit-bar :price="Prodetail.originprice*100*Prodetail.discount/10" :button-text="isLoading?'加入购物车':'去登录'" @submit="onSubmit" />
        </template>

    </div>
</template>

<script setup lang="ts">
import { GetProdetailApi,addCartApi } from '@/api/axiosLink'
import { useRoute,useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import useUserStore from '@/stores/user'
import { storeToRefs } from 'pinia'
import { showNotify } from 'vant'
const {  UserInfo,isLoading } = storeToRefs(useUserStore())
const route = useRoute()
const router = useRouter()

//商品详情对象
const Prodetail = ref<BannerNS.IPageProlist>()
onMounted(() => {
    getprodetail()
})
const getprodetail = async () => {
    try {
        const res = await GetProdetailApi(route.params.proid as string)
        Prodetail.value=res
    } catch (error) {
        console.log(error);
    }
}
const onSubmit = async() => {
    if(!isLoading.value){
        router.push({name:'login'})
        return 
    }else{
        try{
            const res = await addCartApi({userid:UserInfo.value.userid,proid:route.params.proid as string,num:1})
            console.log(res);
            showNotify({ type: 'success', message: '添加成功' });
        }catch(err){
            showNotify({ type: 'danger', message: '操作失败' });
            console.log(err);
        }
    }
}
</script>

<style scoped lang="scss">
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
    height: 250px;
    img{
        width: 100%;    
        height: 250px;  
    }
}

.app_detail_page {
    .app-detail-info {
        padding: 0.2rem;
    }
}
</style>