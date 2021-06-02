<template>
  <v-main>
    <div class="order-confirm-pc"></div>
    <div class="order-confirm-mobile">
      <!--   确认商品详情   -->
      <div class="pt-5"/>
      <div style="padding-left: 6%">
        <v-card width="96%" style="padding-left: 3%" >
          <v-card-title>{{product.total}}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-img class="pt-3" height="180" src="../../image/image-plp-recommend.jpg"></v-img>
              </v-col>
              <v-col cols="6" style="font-size: xx-small">
                <h4 class="pt-3">今日のバーベキュー屋</h4>
                <h5 style="color: red">${{product.payment}} / Monthly</h5>
                <v-divider class="pt-3 pb-5"/>
                <h6>回数制限.：2 Times / Per Day</h6>
                <h6>利用可能な時間：2021.01.01 - 2021.04.15</h6>

              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
      <div class="pt-5"/>
      <input type="hidden" class="product-name" :value="product.serviceName">
      <input type="hidden" class="order-amount" :value="product.orderAmount ">
      <!--   支付按钮   -->
      <v-bottom-navigation color="primary" horizontal app>
        <v-btn @click="fanHui">
          <span>Back</span>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-divider
            class="mx-4"
            vertical
        ></v-divider>
        <v-btn @click="payNow">
          <v-icon style="padding-left: 12px">mdi-arrow-right</v-icon>
          <span>Pay Now</span>
        </v-btn>
      </v-bottom-navigation>
    </div>
    <van-overlay :show="show">
      <div class="wrapper">
        <van-loading color="#1989fa" />
      </div>
    </van-overlay>
  </v-main>
</template>

<script>

import axios from "axios";
import {order} from '@api'
export default {
  name: "OrderConfirm",
  data () {
    return {
      show:true,
      payToken :null,
      orderCode: null,
      form : {
        creditVerify : null,
        creditNum : null
      },
      product: {
        serviceName : "今日のバーベキュー屋",
        serviceId: 1,
        orderAmount : 1000
      }
    }
  },
  created() {
    var that = this
    order({
      serviceId:that.$route.query.code,
    }).then((res)=> {

              that.product = res.data
              that.show = false
            })
            .catch(function (error) {
              that.$notify({ type: 'warning', message: error.errMessage });
            });
  },
  methods : {
    fanHui(){
      this.$router.go(-1)
    },
    payNow(){
      let _this = this;
      axios.post('http://127.0.0.1:8051/order/create', {
        "memberId": _this.$store.memberId,
        "serviceId" : _this.product.serviceId,
        "orderType" : 100,
        "payType" : 100
      })
      .then(function (res){
         console.log(res.data.orderCode);
        _this.orderCode = res.data.orderCode;
        let querystring = require('querystring');
        let https = require('https');
        let secret_key = 'sk_test_4ojcudizab8oes13yqzuer6a'
        let auth = 'Basic ' + Buffer.from(secret_key + ':').toString('base64');
        let post_data = querystring.stringify({
          'default_locale': 'ja',
          'email': 'regaferi@2021gmail.com',
          'amount': '8888',
          'currency': 'JPY',
          'payment_data[external_order_num]': _this.orderCode,
          'return_url': 'https://regaferi-api.cn.utools.club/orderDetail'
        });

        let post_options = {
          host: 'komoju.com',
          port: '443',
          path: '/api/v1/sessions',
          method: 'POST',
          headers: {
            'Authorization': auth,
            'Access-Control-Allow-Origin':'*',
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
        post_req.end();
      // window.location.href = post_data['session_url'];
      })
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
