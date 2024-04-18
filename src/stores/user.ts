import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { PostUserLoginApi, type ILoginParams, GetUserInfo } from '@/api/axiosLink'
import router from '@/router'
import { showNotify } from 'vant'

const useUserStore = defineStore('user', () => {
    // store 定义参数数据
    const token = ref<string>('')
    //用户信息
    const UserInfo = ref({
        "userid": '',
        "username": '',
        "nickname": "",
        "avatar":''
    })
    //getter //判断用户是否登录，返回boolean值
    const isLoading = computed(() => !!UserInfo.value.userid)
    //actions 调用函数 登录方法
    const loginActions = async (login: ILoginParams) => {
        const res = await PostUserLoginApi(login)
        if (res) { 
            console.log(res);
            
            token.value = res.token
            const info = await GetUserInfo(res.userid)
            //存储用户信息
            console.log(info);
            UserInfo.value = info[0]
            showNotify({ type: 'success', message: '登录成功' });
            setTimeout(() => {
                router.push({ path: '/' })
            }, 2000);
        }
    }
    //退出登录方法 ==>actions
    const exitUser = ()=>{
        token.value=""
        UserInfo.value={
            "userid": '',
            "username": '',
            "nickname": "",
            "avatar":''
        }
        router.push('/login')
    }
    return { token, UserInfo, loginActions, isLoading, exitUser }
},{
    persist:true // 调用数据本地存储插件
})
export default useUserStore