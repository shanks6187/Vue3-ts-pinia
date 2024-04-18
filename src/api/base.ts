//导出所有接口 && 统一管理接口域名
const base = {
    host:'http://121.89.205.189:3000/api', //域名
    banner:'/banner/list',   //轮播接口地址
    proList:'/pro/list',    //首页商品列表
    ProDetail:'/pro/detail', //获取商品详情
    login:'/user/login',     //用户登录接口
    UserInfo:'/user/info',     //获取用户信息
    register:'/user/dofinishregister',   //用户注册接口
    cartList:'/cart/list',   //获取购物车列表接口
    addCart:'/cart/add',  //添加到购物车
    upCart:'/cart/updatenum',    //更新购物车商品数量
    removeCartItem:'/cart/remove',   //删除购物车当条商品
    upDateCartItem:'/cart/selectone',    //更新购物车是否选中
    selectCartAllItem:'/cart/selectall'   //更新购物车是否全选
}
export default base