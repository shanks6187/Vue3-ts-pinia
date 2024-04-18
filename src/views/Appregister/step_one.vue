<template>
    <div class="page app_register_one">
        <commonnav title="注册-step1：手机号注册" :back="true" class="app-navHeader"></commonnav>
        <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field v-model="tel" maxlength="11" type="tel" name="手机号" label="手机号" placeholder="请输入手机号"
                        :rules="[{ required: true, message: '请填写手机号', validator: validatorT }]" />
                </van-cell-group>
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit">
                        下一页
                    </van-button>
                </div>
            </van-form>
    </div>
</template>

<script setup lang="ts">
import { ref ,reactive} from 'vue' 
import { useRouter } from 'vue-router';
import { TelRulesReg } from '@/utils/Regexp'
const router = useRouter()
const tel = ref<string>('')
const validatorT = (val: string) => {
    if (!val) return '请输入手机号'
    if (!TelRulesReg.test(val)) return '手机号格式错误'
    return true
}
const onSubmit =()=>{
    router.push({name:'step_two',query:{tel:tel.value}})
}
</script>

<style scoped lang="scss">
@import '@/assets/css/var.scss';
.van-button {
    background: $red-color;
    border: none;
}
</style>