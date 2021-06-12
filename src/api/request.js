import axios from "axios";
import router from "../router/index";
import store from '../store/index'
import { Notify } from 'vant';

axios.defaults.timeout = 60000;
axios.defaults.baseURL = '/apis';
axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded;charset=UTF-8";
/*
 *请求前拦截
 *用于处理需要请求前的操作
 */
axios.interceptors.request.use(
    config => {
        /*loading = Loading.service({
            text: "正在加载中......",
            fullscreen: true
        });*/
        console.log(store.state,'headers')

        if (store.state.token) {
            config.headers["authority-token"] = store.state.token;
            config.headers["Authorization"] = store.state.Authorization;
            config.headers["Content-Length"] = store.state.Content_length;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
/*
 *请求响应拦截
 *用于处理数据返回后的操作
 */
axios.interceptors.response.use(
    response => {
        return new Promise((resolve, reject) => {
            const res = response.data;
            if(res.code == '200' || res.success == true){
                resolve(res)
            }else{
                /*if(){

                }*/
                reject(res)
                Notify(res.errMessage);
            }
            if(res.errMessage == "用户登录信息过期"){
                console.log(store.state.token ,"用户登录信息过期")
                store.state.token = ''
                router.push({
                    path: "/home"
                });
            }
            //请求成功后关闭加载框
           /* if (loading) {
                loading.close();
            }*/

            if (res.errCode != 'SHOP_MEMBER_0009' || res.errCode != 'SHOP_MEMBER_0007') {
                reject(res)

            } else{
                resolve(res)
            }
        })
    },

    error => {
        //断网处理或者请求超时
        if (!error.response) {
            //请求超时
            if (error.message.includes("timeout")) {
                console.log("超时了");
                Notify('超时了');
            } else {
                Notify('断网了');
                //断网，可以展示断网组件
                console.log("断网了");
            }
            return;
        }
        const status = error.response.status;
        switch (status) {
            case 500:
                Notify('服务器内部错误');
                break;
            case 404:
                Notify('未找到远程服务器');
                break;
            case 401:
                Notify('用户登陆过期，请重新登陆');
                // messages("warning", "用户登陆过期，请重新登陆");
                store.state.commit('COMMIT_TOKEN','')
                setTimeout(() => {
                    router.replace({
                        path: "/home",
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });

                }, 1000);
                break;
            case 400:
                Notify('数据异常，详情请咨询聚保服务热线');
                // messages("error", "数据异常，详情请咨询聚保服务热线");
                break;
            default:
                Notify(error.response.data.message);
                // messages("error", error.response.data.message);
        }
        return Promise.reject(error);
    }
);

/*
 *get方法，对应get请求
 *@param {String} url [请求的url地址]
 *@param {Object} params [请求时候携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params
            })
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/*
 *post方法，对应post请求
 *@param {String} url [请求的url地址]
 *@param {Object} params [请求时候携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, params)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}
/*
 *put方法，对应put请求
 *@param {String} url [请求的url地址]
 *@param {Object} params [请求时候携带的参数]
 */
export function put(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .put(url, params)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}
export function del(url,params){
    return new Promise((resolve,reject)=>{
        axios.delete(url,params).then(response=>{  //这里传递的参数不做处理
            resolve(response);
        },err=>{
            reject(err);
        }).catch((error)=>{
            reject(error);
        })
    })
}
