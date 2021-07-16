<template>
    <v-main>
        <div class="order-confirm-pc"></div>
        <div class="order-confirm-mobile">
            <!--   确认商品详情   -->
            <div class="pt-5"/>

            <div style="padding-left: 6%">
                <v-card width="96%" height="100%" style="padding-left: 3%">

                    <v-card-text>
                     <p style="font-size:16px;text-align:center;" class="pt-3">{{product.name}}</p>
                      <v-divider class="pt-1 pb-1"/>
                        <v-row>
                            <v-col cols="6">
                                <v-img v-if="slides" height="130" :src="slides"/>
                                <van-image v-else
                                           src="https://regaferi.oss-ap-northeast-1.aliyuncs.com/system/logo-null.jpg">
                                    <template v-slot:error>読み込みに失敗しました</template>
                                </van-image>
                            </v-col>
                            <v-col cols="6" style="font-size: xx-small">
                                <p style="font-size:13px"> 回数制限： {{product.totalCount == null ? '無制限':product.totalCount + '回'}}</p>
                                <p style="font-size:13px">有効期間：{{product.serviceTimeDay}}日</p>
                               <v-divider class="pt-1 pb-1"/>
                               <p style="color: red;font-size:13px"> 合計： {{product.prices}}円</p>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <p style="text-align: center;padding-top:50px;font-size:12px;">注文内容にお間違いが無ければ</p>
                 <p style="text-align: center;font-size:12px;">[支払いに進む]</p>
                 <p style="text-align: center;font-size:12px;">を押してください</p>
            </div>
            <div class="pt-5"/>
            <input type="hidden" class="product-name" :value="product.serviceName">
            <input type="hidden" class="order-amount" :value="product.orderAmount ">
            <!--   支付按钮   -->
             <v-bottom-navigation @click="payNow" style="width:100%;background-color: #2196f3 !important;" horizontal app>
                <v-btn style="width:100%;" @click="payNow">
                    <v-icon style="color:white">mdi-arrow-right</v-icon>
                    <span  style="color:white; font-size:15px">支払いに進む</span>
                </v-btn>
            </v-bottom-navigation>
        </div>
        <van-overlay :show="show">
            <div class="wrapper">
                <van-loading color="#1989fa"/>
            </div>
        </van-overlay>
        <van-overlay :show="showSess">
            <div class="wrapper">
                <van-loading color="#1989fa" size="24px">準備中...</van-loading>
            </div>
        </van-overlay>
    </v-main>
    
    
    
</template>

<script>

    // import axios from "axios";
    import {payfor,order, sessions, service} from '@api'
    import {Notify} from "vant";

    export default {
        name: "OrderConfirm",
        data() {
            return {
                show: true,
                showSess: false,
                payToken: null,
                form: {
                    creditVerify: null,
                    creditNum: null
                },
                product: {},
                slides: ''
            }
        },
        created() {
            var that = this
            service({
                id: that.$route.query.id,
            })
                .then((res) => {
                    that.show = false
                    that.product = res.data
                    res.data.imageUrls.forEach(ele => {
                        if (ele.type == 'LOGO') {
                            that.slides = ele.target
                            that.show = false
                        }
                    })

                })
                .catch(function (error) {
                    Notify({type: 'warning', message: error.errMessage});
                });

        },
        methods: {
            fanHui() {

                this.$router.go(-1)
            },
            payNow() {
                if(this.$store.state.token){
                    let _this = this;
                    order({
                        serviceId: _this.$route.query.id,
                    }).then((res) => {
                payfor({
                       tradeNo:res.data.order.code,
                       price:res.data.order.total,
                })
                 .then(function(response){
                      var url=response.data
                      var reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
                      url = url.match(reg);
                      window.location.href = url;
                })
                  .catch(function(error) {
                         this.$notify({ type: 'warning', message: response.data.pay_result });
                });
                      
                    })
                        .catch(function (error) {
                            Notify({ type: 'warning', message: error.errMessage });
                        });
                }else{
                    Notify({type: 'warning', message: 'ログインしていません！'});
                }


                /*let post_options = {
                  host: 'komoju.com',
                  port: '443',
                  path: '/api/v1/sessions',
                  method: 'POST',
                  headers: {
                    'Authorization': auth,
                    'Content-Length': Buffer.byteLength(post_data)
                  }
                };
                let post_req = https.request(post_options, function(res) {
                  res.setEncoding('utf8');
                  res.on('data', function (chunk) {
                    console.log(chunk);
                  });
                });
                 console.log(post_data);
                post_req.write(post_data);
                post_req.end();*/
                // window.location.href = post_data['session_url'];
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
</style>
