<template>
    <div class="page app-cart">
        <Commonnav :title="'购物车'" class="app-navHeader"></Commonnav>
        <template v-if="!isLoading">
            <van-empty description="您还没有登录，请先登录吧">
                <router-link :to="{ name: 'login' }" cutsom v-slot="{ navigate }">
                    <van-button round type="primary" @click="navigate" class="bottom-button">去登录</van-button>
                </router-link>
            </van-empty>
        </template>
        <template v-else>
            <template v-if="cartList">
                <van-swipe-cell v-for="item in cartList" :key="item.userid">
                    <div class="cart_box">
                        <van-checkbox :model-value="item.flag"
                            @update:model-value="changetag(item.cartid, !item.flag)"></van-checkbox>
                        <van-card :num="item.num" :price="item.originprice" :title="item.proname" :thumb="item.img1">
                            <template #tags>
                                <van-tag plain v-if="item.discount" type="primary">{{ item.discount }}折扣</van-tag>
                                <van-tag plain type="primary">包邮</van-tag>
                            </template>
                            <template #footer>
                                <van-button @click="updatecart({ cartid: item.cartid, num: item.num -= 1 })"
                                    :disabled="item.num === 1" style="padding: 10px;" size="mini"><b>-</b></van-button>
                                <van-button @click="updatecart({ cartid: item.cartid, num: item.num += 1 })"
                                    style="padding: 10px;" size="mini"><b>+</b></van-button>
                            </template>
                        </van-card>
                    </div>
                    <template #right>
                        <van-button square @click="handdeletecart(item.cartid)" text="删除" type="danger"
                            class="delete-button" />
                    </template>
                </van-swipe-cell>
                <van-submit-bar class="submitcat" :price="priceAll*100" button-text="提交订单" @submit="onSubmit">
                    <van-checkbox :model-value="selectAll" @update:model-value="handSelectAll">全选</van-checkbox>
                </van-submit-bar>
            </template>
            <template v-else>
                <van-empty style="margin-top: 1rem;" description="购物车空空如也，快去塞满吧😀">
                </van-empty>
            </template>
        </template>

    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia'
import useUserStore from '@/stores/user'
import { showToast, showConfirmDialog } from 'vant';
import { PostCartList, postselectoneCartItemApi, removeCart, upDateNum, type IupCartItem, selectCartAllApi } from '@/api/axiosLink';
const { isLoading, UserInfo } = storeToRefs(useUserStore())

const cartList = ref<cartNs.ICatItem[]>([])
onMounted(() => {
    if (isLoading.value) {
        getUserCartList()
    }
})
const getUserCartList = async () => {
    try {
        const res = await PostCartList(UserInfo.value.userid)
        cartList.value = res
    } catch (error) {
        console.log(error);
    }
}
const updatecart = async (params: IupCartItem) => {
    try {
        await upDateNum(params)
        getUserCartList()
    } catch (err) {
        console.log(err);
    }
}
const handdeletecart = (cartid: string) => {
    showConfirmDialog({
        title: '注意',
        message: '您确定删除该商品吗？'
    }).then(async () => {
        try {
            let res = await removeCart(cartid)
            getUserCartList()
        } catch (error) {
            console.log(error);

        }
    }).catch(() => { })
}
const changetag = async (cartid: string, flag: boolean) => {
    try {
        await postselectoneCartItemApi({ cartid, flag })
        getUserCartList()
    } catch (error) {
        console.log(error);
    }
}

let selectAll = computed(() => {
    return Boolean(cartList.value.length) && cartList.value.every((item) => { return item.flag })
})

const handSelectAll = async () => {
    try {
        await selectCartAllApi({ userid: UserInfo.value.userid, type: !selectAll.value })
        getUserCartList()
    } catch (error) {
        console.log(error);
    }
}

let priceAll = computed(() => {
    console.log(cartList.value);
    
        return  cartList.value.reduce((prod,item) => {
            return item.flag ? prod+item.num*item.originprice : prod
        },0)

})
// console.log(priceAll);


const onSubmit = () => showToast('点击按钮');

</script>

<style scoped lang="scss">
@import '@/assets/css/var.scss';

.bottom-button {
    width: 160px;
    height: 40px;
    background: $red-color;
    border: 0;
}

.cart_box {
    display: flex;
    background: var(--van-card-background);
    margin: 0.03rem 0.1rem;

    .van-card {
        flex: 1;
        padding-left: 0.2rem;
    }
}

.submitcat {
    margin-bottom: 50px;
}

.app-cart {
    padding-bottom: 1.8rem;
}

.delete-button {
    height: 100%;
}
</style>