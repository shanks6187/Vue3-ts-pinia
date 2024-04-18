<template>
    <div class="page app_register_one">
        <commonnav title="注册-step2：输入验证码" :back="true" class="app-navHeader"></commonnav>
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field
                    v-model="telyzm"
                    center
                    clearable
                    label="短信验证码"
                    placeholder="请输入短信验证码"
                    maxlength="6"
                    :rules="[{ required: true, message: '请填写验证码', validator: validatorT }]"
                >
                <template #button>
                <van-button size="small" :disabled="num>5?false:true"   @click="sendtime" type="primary">{{ num>5?`发送验证码`:`重新发送 (${num}s)` }}</van-button>
                </template>
            </van-field>
            </van-cell-group>
                <div style="margin: 16px;">
                    <van-button round block type="primary" :disabled="telyzm?(telyzm.length<6?true:false):true" native-type="submit">
                        下一页
                    </van-button>
                </div>
            </van-form>
    </div>
</template>

<script setup lang="ts">
import { ref ,reactive,onUnmounted,} from 'vue' 
import { TelRulesReg } from '@/utils/Regexp'
import { useRoute,useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()

const tel = ref<string>('')
const telyzm = ref<string>('')
const num = ref<number>(6)
var bra = ref<boolean>(true)
let timeout:number

const validatorT = (val: string) => {
    if (!val) return '请输入验证码'
    if (val.length<6) return '验证码格式错误'
    return true
}
const onSubmit =()=>{
    router.push({name:'step_three',query:{tel:route.query.tel}})
}
onUnmounted(() => {
    timeout && clearInterval(timeout)
})

const sendtime = ()=>{
    num.value=5
    clearInterval(timeout)
    timeout = setInterval(() => {
        num.value--
        if(num.value<0){
            clearInterval(timeout)
            num.value=6
        }
    }, 1000);
}
</script>

<style scoped lang="scss">
@import '@/assets/css/var.scss';
.van-button {
    background: $red-color;
    border: none;
}
</style>