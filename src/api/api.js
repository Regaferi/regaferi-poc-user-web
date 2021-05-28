import {get,post,put} from './request';
//登陆
export const  login= (login)=>post('/shop-member/login',login)

            /*用户模块*/
//用户列表
export const  memberBase=(memberBase)=>get('/member-base',memberBase)
//用户详情
export const  memberId=(memberId)=>get('/member-base/'+memberId)
//订单详情
export const  order=(order)=>get('/order/'+order)
//服务补偿
export const  compensation=(compensation)=>put('/service-order/compensation',compensation)
