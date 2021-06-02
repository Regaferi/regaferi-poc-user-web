import {get,post,put} from './request';
//登陆(发送验证码)
export const  verify= (verify)=>post('/member/verify',verify)
// 会员登录
export const  login= (login)=>post('/member/login',login)
/// 会员详情
export const  memberDetail=(memberDetail)=>get('/member/detail',memberDetail)
// 补充信息
export const  signUp= (signUp)=>post('/member/sign-up',signUp)


            /*店铺模块*/
//店铺查询
export const  shopIndex=(shopIndex)=>get(`/shop/index?keyword=${shopIndex.keyword}&type=${shopIndex.type}&pageIndex=${shopIndex.pageIndex}&pageSize=${shopIndex.pageSize}`)
//店铺详情
export const  shopId=(shopId)=>get(`/shop?id=${shopId.id}`)
//店铺服务
export const  serviceShop=(serviceShop)=>get(`/service/shop?shopId=${serviceShop.shopId}`)
//服务详情
export const  service=(service)=>get(`/service?id=${service.id}`)
//订单详情
export const  order=(order)=>get('/order/'+order)
//服务补偿
export const  compensation=(compensation)=>put('/service-order/compensation',compensation)
