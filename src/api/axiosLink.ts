import base from "./base";
import req from './request'

//首页轮播图
export const GetBannerList = () =>{ 
    return req.get<any,BannerNS.IBannerItem[]>(base.banner) 
}
//首页商品列表
export interface IPageParams{ //定义接口 约束获取商品列表
    count:number, //页码，默认值1
    limitNum?:number  //每页显示的个数，默认值为10
}
export const GetShoppingList = (params:IPageParams)=>{
    return req.get<any,BannerNS.IPageProlist[]>(base.proList,{params}) //因为参数名是params 所以 params:params  === params
}
//获取商品详情接口
export const GetProdetailApi=(proid:string)=>{
    return req.get<any,BannerNS.IPageProlist>(`${base.ProDetail}/${proid}`)
}
export interface ILoginParams {
    loginname:string,
    password:string
}
//用户登录接口
export const PostUserLoginApi=(params:ILoginParams)=>{
    return req.post<any,{token:string,userid:string}>(base.login,params)
}
//获取用户信息。需要userID 请求头携带token
export const GetUserInfo=(userid:String)=>{
    return req.get<any,userNS.IuserInfo[]>(base.UserInfo,{params:{userid}})
}

export interface useegister {
    tel:string,
    password:string
}
//用户注册接口。需要手机号和密码
export const postregister=( params:useegister )=>{
    return req.post<any,string>(base.register,{tel:params.tel,password:params.password})
}
//获取购物车列表接口，需要携带userid
export const PostCartList=(userid:string)=>{
    return req.post<any,cartNs.ICatItem[]>(base.cartList,{userid})
}

export interface IaddCartItem {
    userid:string,
    proid:string,
    num:number
}
//添加购物车接口，需要携带userid,proid,num字段
export const addCartApi=(params:IaddCartItem)=>{
    return req.post<any,null>(base.addCart,params)
}
export interface IupCartItem {
    cartid:string,
    num:number
}
//更新购物车商品数量，需要携带cartid，num字段
export const upDateNum=(params:IupCartItem)=>{
    return req.post<any,null>(base.upCart,params)
}
//删除购物车单条商品
export const removeCart=(cartid:string)=>{
    return req.post<any,null>(base.removeCartItem,{cartid})
}
interface IselectOneCartItem {
    cartid:string,
    flag:boolean
}
//更新购物车单条商品是否被选中
export const postselectoneCartItemApi=(params:IselectOneCartItem)=>{
    return req.post<any,null>(base.upDateCartItem,params)
}
interface IselectAllCart {
    userid:string,
    type:boolean
}
//更新购物车是否全选
export const selectCartAllApi=(params:IselectAllCart)=>{
    return req.post<any,null>(base.selectCartAllItem,params)
}

