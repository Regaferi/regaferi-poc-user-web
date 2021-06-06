<template>
  <v-main>
    <div class="order-confirm-pc"></div>
    <div class="order-confirm-mobile">
      <!--   确认商品详情   -->
      <div class="pt-5"/>
      <div style="padding-left: 6%">
        <v-card width="96%" style="padding-left: 3%" >
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-img v-if="products.logoImage" height="130" :src="products.logoImage.target"/>
                <van-image v-else src="https://regaferi.oss-ap-northeast-1.aliyuncs.com/system/logo-null.jpg">
                  <template v-slot:error>加载失败</template>
                </van-image>
              </v-col>
              <v-col cols="6" style="font-size: xx-small">
                <h4 class="pt-3">{{products.title}}</h4>
                <h5 style="color: red">$500 / Monthly</h5>
                <v-divider class="pt-3 pb-5"/>
                <h6>回数制限.：2 Times / Per Day</h6>
                <h6>利用可能な時間：{{products.createTime}} - {{products.updateTime}}</h6>

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

// import axios from "axios";
import {order,sessions} from '@api'
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
      product: {},
      products:{}
    }
  },
  created() {
    var that = this
    let data = JSON.parse(this.$route.query.data)
    that.products = Object.assign({}, data)
    order({
      serviceId:that.$route.query.code,
    }).then((res)=> {

              that.product = res.data
              that.show = false
      that.orderCode = res.data.code;
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
        let querystring = require('querystring');
        // let https = require('https');
        let secret_key = 'sk_test_4ojcudizab8oes13yqzuer6a'
        let auth = 'Basic ' + Buffer.from(secret_key + ':').toString('base64');
        let post_data = querystring.stringify({
          'default_locale': 'ja',
          'email': 'regaferi@2021gmail.com',
          'amount': _this.product.total,
          'currency': 'JPY',
          'payment_data[external_order_num]': _this.orderCode,
          'return_url': 'https://regaferi-api.cn.utools.club/orderDetail'
        });

        _this.$store.commit('COMMIT_ZHIFU',auth)
        _this.$store.commit('COMMIT_Content',Buffer.byteLength(post_data))
        sessions(post_data).then(function (res){
          console.log(res,'支付')
          window.open(res.session_url)
        }).catch(function (error) {
          window.open(error.session_url)
          console.log(error)
        });
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
