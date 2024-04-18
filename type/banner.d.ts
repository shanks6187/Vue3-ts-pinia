//创建全局声明文件
declare namespace BannerNS{
    interface IBannerItem{
        link:string,
        alt:string,
        img:string,
        bannerid:string,
        flag:boolean
    };
    interface IPageProlist{
        banners:string[],
        proid:string,
        brand:string,
        category:String,
        desc:string,
        discount:number,
        img1:string,
        img2:string,
        img3:string,
        img4:string,
        isrecommend:number,
        issale:number,
        isseckill:number,
        originprice:number,
        proname:string,
        sales:number,
        stock:number
    }
}