<template>
    <div class="page app_login">
        <commonnav title="登录" :back="true" class="app-navHeader">
            <template #right>
                <router-link to="/step_one" custom v-slot="{ navigate }">
                    <span @click="navigate">去注册</span>
                </router-link>
            </template>
        </commonnav>
        <div>
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field v-model="login.loginname" type="tel" name="手机号" label="手机号" placeholder="手机号"
                        :rules="[{ required: true, message: '请填写手机号', validator: validatorT }]" />
                    <van-field v-model="login.password" type="password" name="密码" label="密码" placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]" />
                </van-cell-group>
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit">
                        提交
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { TelRulesReg } from '@/utils/Regexp'
import useUserStore from '@/stores/user'
import type { ILoginParams } from '@/api/axiosLink'

const userStore = useUserStore()
const login = reactive<ILoginParams>({
    loginname: '13211111111', //13211111111
    password: '111111'   //111111
})
const validatorT = (val: string) => {
    if (!val) return '请输入手机号'
    if (!TelRulesReg.test(val)) return '手机号格式错误'
    return true
}
const onSubmit = () => {
    userStore.loginActions(login)
};
</script>

<style scoped lang="scss">
@import '@/assets/css/var.scss';

.van-button {
    background: $red-color;
    border: none;
}
</style>