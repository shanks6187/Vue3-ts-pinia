<template>
    <div class="common-List" :class="{halt : column==2}">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" :immediate-check="false" @load="onLoad">
            <!-- <van-cell v-for="item in goodslist" :key="item.proid" :title="item.proname" /> -->
            <div class="list-body">
                <div class="common-list-item" v-for="item in goodslist" :key="item.proid" @click="toprodetail(item.proid)">
                    <img :src="item.img1">
                    <div class="info">
                        <div class="proname van-multi-ellipsis--l2">{{ item.proname }}</div> <!-- van-multi-ellipsis--l2 是vant组件样式，最多显示两行 -->
                        <div class="price">
                            <span>{{ (item.originprice*item.discount/10).toFixed(2) }}</span>
                            <span>{{ item.originprice }} / <van-tag plain type="primary" color="#5919ee">{{ item.discount }}折</van-tag></span>
                        </div>
                    </div>
                </div>
            </div>
        </van-list>
    </div>
</template>

<script setup lang="ts">
import { ref,reactive,onMounted } from 'vue';
import type { IPageParams } from '@/api/axiosLink'
import { useRouter } from 'vue-router'

type column = 1|2
interface Iprops{
    column?:column,
    action(params:IPageParams):any
}

const { column=1,action } = defineProps<Iprops>()

onMounted(()=>{
    onLoad()
})
const goodslist = ref<BannerNS.IPageProlist[]>([]);
const loading = ref(false);
const finished = ref(false);
//请求的页码和条数

const pageObjNumber =reactive<IPageParams>({
    count:1,
    limitNum:10
})
const onLoad = async () => {
        // 异步更新数据
        console.log(pageObjNumber.count);
        
        const res = await action(pageObjNumber)
        goodslist.value=goodslist.value.concat(res)
        //数据加载完毕
        loading.value=false
        //若数据已全部加载完毕
        if(res.length===0){
            finished.value=true
        }
        pageObjNumber.count++
        //该组件在初始化的时候没有数据，组件没有数据撑开导致组件初始化时就是最底层就会发起一次onload
        // :immediate-check="false"  是否在初始化时立即执行滚动位置检查
};
const router = useRouter()
const toprodetail=(proid:string)=>{
    router.push({name:'detail',params:{proid}})
}

</script>

<style lang="scss" scoped>
@import '../assets/css/var.scss';
.common-List{
    padding: 0 0.2rem;
    padding-bottom: 1rem;

    &.halt .list-body{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .common-list-item{
            margin-bottom: 0.2rem;
            width: 3.4rem;
            flex-direction: column;
            img{
                width: 3.4rem;
                height: 3.4rem;
            }
        }
        .info{
            padding: 0.1rem 0;
        }
    }

    .list-body{
        .common-list-item{
            display: flex;
            img{
                width: 2rem;
                height: 2rem;
                margin-bottom: 0.1rem;
            }
            .info{
                padding-left:0.1rem ;
                .proname{
                    font-size: 16px;
                    margin-bottom: 0.2rem;
                }
                .price{
                    span{
                        &:first-of-type{
                            font-weight: bold;
                            color: $red-color;
                            margin-right: 0.1rem;
                        }
                        &:last-of-type{
                            font-size: 13px;
                            color: #717171;
                        }
                    }
                }
            }
        }
    }
}
</style>