<template>
    <div class="page app_register_one">
        <commonnav title="注册-step3：输入密码" :back="true" class="app-navHeader"></commonnav>
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-cell-group inset>
                    <van-field v-model="password" type="password" name="密码" label="密  码" placeholder="请输入密码"
                        :rules="[{ required: true, message: '请填写密码' }]" />
                </van-cell-group>
            </van-cell-group>
            <van-cell-group inset>
                <van-cell-group inset>
                    <van-field v-model="confimpw" type="password" name="密码" label="确认密码" placeholder="请再次输入密码"
                        :rules="[{ required: true, message: '请填写确认密码' ,validator:okpassword}]" />
                </van-cell-group>
            </van-cell-group>
                <div style="margin: 16px;">
                    <van-button round block type="primary"  native-type="submit">
                        注册
                    </van-button>
                </div>
            </van-form>
    </div>
</template>

<script setup lang="ts">
import { showNotify } from 'vant';
import { ref } from 'vue' 
import { useRoute,useRouter } from 'vue-router';
import { postregister } from '@/api/axiosLink'
const router = useRouter()
const route = useRoute()
const password = ref<string>('')
const confimpw = ref<string>('')
const okpassword = (val: string) => {
    if (!val) return '请输入密码'
    if (password.value!=val) return '两次密码不一致'
    return true
}
const onSubmit = async ()=>{
    try{
        const res= await postregister({tel:route.query.tel as string,password:password.value})
        showNotify({ type: 'success', message: res });
        setTimeout(() => {
        router.push({name:'login'})
            
        }, 1500);
    } catch(error){
        console.log(error);
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/var.scss';
.van-button {
    background: $red-color;
    border: none;
}
</style>