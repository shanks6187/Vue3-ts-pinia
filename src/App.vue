<script setup lang="ts">
    import { themeVars} from '@/config/theme'
    //使用路由配置
    import { useRoute,type RouteLocationNormalizedLoaded } from 'vue-router';
    const route:RouteLocationNormalizedLoaded = useRoute()
</script>

<template>
    <van-config-provider :theme-vars="themeVars">
        <main class="app-comtainer">
            <RouterView></RouterView>
        </main>
        <CommonFool v-if="!route.meta.hiddfoot"></CommonFool>
    </van-config-provider>
</template>

<style scoped>
.app-comtainer{
    padding-top: 46px;
}
</style>
