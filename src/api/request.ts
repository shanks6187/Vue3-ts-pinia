import axios from 'axios'
import base from './base'
import useUserStore from '@/stores/user'
import { showNotify } from 'vant'
//虽然按照了自动引入工具，但是在vant里面有一些方法是js调用的方法，需要手动引入

const req = axios.create({
    baseURL: base.host,   //请求头
    // timeout: 20000 //请求超时时间
})

// //请求拦截
req.interceptors.request.use(config => {
    //传递token
    //config是发起请求时的一个配置项，里面有很多个属性，其中headers就是其中之一
    //在组件外使用store，要遵顼现用现取原则👇
    const userStore = useUserStore()
    config.headers.token=userStore.token
    return config
}, err => {
    return Promise.reject(err)
})


// //响应拦截
req.interceptors.response.use(
    res => {
        const isSuccess = res.data.code == '200' //成功
        const IsLogin = res.data.code == '10019'   //token失效
        const Errpwd=res.data.code == "10011"    //密码错误
        const NoUse=res.data.code == "10010"    //用户不存在
        const register = isSuccess&&res.data.message==='注册成功'
        if(register){
            return res.data.message
        }

        if (isSuccess){
            return res.data.data
        }
        if(Errpwd || IsLogin || NoUse){
            showNotify({ type: 'warning', message: res.data.message });
            return false
        }
    }, err => {
        return Promise.reject(err)
    })

export default req