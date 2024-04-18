<template>
    <div class="home-page">
        <div class="swipe-content">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="item in BannerList" :key="item.bannerid">
                    <img :src="item.img" :alt="item.alt" style="width: 100%;height: 2.8rem;">
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script setup lang="ts">
import { GetBannerList } from '@/api/axiosLink'
import { onMounted,ref } from 'vue';
const BannerList = ref<BannerNS.IBannerItem[]>([])
onMounted(()=>{
    getbanner()
})
// 估计是因为延迟  
// 1.首先排查 是不是@types是关键字 有可能冲突
// 2.其次排查是不是 编辑器延迟 重启看看
// 3.实在不行配置files files和include相比  include支持glob匹配 就是类似src/**/* 这种写法
// 4.files必须把完整的文件名写全 不支持glob匹配
// 5.你看 @types 文件图标都变了  它是有特殊含义的
// 6.看  @types 是个关键字 类似  node包里面也有一共@types 不知道是不是这个冲突了 
// 有可能 所以 应该把所有可能性都测一下 多重启几次 看看到底是不是@types 导致的 这样就清楚了
// 一般没有人起这个名字  就叫types就可以了 @符号在一些npm包下载的时候也会有问题 
// 还有 . 开头的文件名  都要避免  886!
const getbanner = async ()=>{
    try {
        const res = await GetBannerList()
        BannerList.value=res
    } catch (error) {
        console.log(error);
    }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/var.scss';
.home-page{
    position: relative;
    overflow: hidden;
    height: 2.8rem;
    &::after{ //伪类元素
        content: '';
        position: absolute;
        width: 70rem;
        height: 70rem;
        background: $red-color;
        border-radius: 50%;
        top: -68rem;
        left: -31rem;
        z-index: -1;
    }
}
.swipe-content{
    margin:auto;
    margin-top: 0.5px;
    border-radius: 10px;
    width: 7rem;
    overflow: hidden;
    height: 2.8rem;
    background: pink;
}
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 2.8rem;
    text-align: center;
    background-color: #39a9ed;
    z-index: 10;
}
</style>@/api/axiosLink