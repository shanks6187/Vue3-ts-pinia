<template>
    <div class="page app-notfound">
        <Commonnav :title="'Not Found'" :back="true"  class="app-navHeader"></Commonnav>
        <van-empty description="一不小心走丢了TnT">
        <!-- 表现式导航，custom可以让router-link失去点击效果，v-shot提取出内置的事件，然后将事件绑定在被router-link包裹的元素中 -->
            <RouterLink to="/" custom v-slot="{ navigate }">
                <van-button round type="primary" @click="navigate" class="bottom-button">返回首页</van-button>
            </RouterLink>
        </van-empty>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss"> 
@import '@/assets/css/var.scss';
.bottom-button {
    width: 160px;
    height: 40px;
    background: $red-color;
    border: none;
  }
</style>