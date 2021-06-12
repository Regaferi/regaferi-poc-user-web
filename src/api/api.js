import {get,post,put,del} from './request';
//登陆(发送验证码)
export const  verify= (verify)=>post('/member/verify',verify)


// 会员登录
export const  login= (login)=>post('/member/login',login)
/// 会员详情
export const  memberDetail=(memberDetail)=>get('/member/detail',memberDetail)
// 补充信息
export const  signUp= (signUp)=>post('/member/sign-up',signUp)
//注册
export const  memberRegister= (memberRegister)=>post('/member/register',memberRegister)
//普通登录
export const  memberLogin= (memberLogin)=>post('/member/login',memberLogin)

            /*店铺模块*/
//店铺查询
export const  shopIndex=(shopIndex)=>get(`/shop/index?keyword=${shopIndex.keyword}&type=${shopIndex.type}&pageIndex=${shopIndex.pageIndex}&pageSize=${shopIndex.pageSize}&location=${shopIndex.location}`)
//店铺详情
export const  shopId=(shopId)=>get(`/shop?id=${shopId.id}`)
//店铺服务
export const  serviceShop=(serviceShop)=>get(`/service/shop?shopId=${serviceShop.shopId}`)
//服务详情
export const  service=(service)=>get(`/service?id=${service.id}`)

//评论查询
export const  comment=(comment)=>get(`/comment?serviceId=${comment.serviceId}`)
//评论权限查询
export const  isComment=(isComment)=>get(`/comment/is-comment?shopId=${isComment.shopId}`)
//评论删除
export const  commentDel=(commentDel)=>del('/comment/'+commentDel)
//评论
export const  commentPinlun= (commentPinlun)=>post('/comment',commentPinlun)
//创单
export const  order= (order)=>post('/order',order)
//订单列表
export const  orderList=(orderList)=>get('/order',orderList)
//订单详情
export const  orderDetail=(orderDetail)=>get('/order/'+orderDetail)
//订单详情历史
export const  serviceOrder=(serviceOrder)=>get(`/service-order/log-info?orderId=${serviceOrder.orderId}`)

//服务补偿
export const  compensation=(compensation)=>put('/service-order/compensation',compensation)

//行业全查
export const  industryAll=(industryAll)=>get('/industry/all',industryAll)
//行业搜索服务
export const  servicePage=(servicePage)=>get(`/service/page?industryId=${servicePage.industryId}&pageIndex=${servicePage.pageIndex}&pageSize=${servicePage.pageSize}`)
export const  servicePageIndex=(servicePageIndex)=>get(`/service/page?keyword=${servicePageIndex.keyword}&pageIndex=${servicePageIndex.pageIndex}&pageSize=${servicePageIndex.pageSize}&location=${servicePageIndex.location}`)

//第三方
export const  sessions= (sessions)=>post('/api/v1/sessions',sessions)

//结算码
export const  settlement= (settlement)=>post('/order/settlement',settlement)
