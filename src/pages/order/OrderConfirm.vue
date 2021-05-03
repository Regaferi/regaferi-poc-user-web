<template>
  <v-main>
    <div class="order-confirm-pc"></div>
    <div class="order-confirm-mobile">
      <!--   确认商品详情   -->
      <div class="pt-5"/>
      <div style="padding-left: 6%">
        <v-card width="96%" style="padding-left: 3%">
          <v-card-title>商品情報</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-img class="pt-3" height="180" src="../../image/image-plp-recommend.jpg"></v-img>
              </v-col>
              <v-col cols="6" style="font-size: xx-small">
                <h4 class="pt-3">今日のバーベキュー屋</h4>
                <h5 style="color: red">$500 / Monthly</h5>
                <v-divider class="pt-3 pb-5"/>
                <h6>回数制限.：2 Times / Per Day</h6>
                <h6>利用可能な時間：2021.01.01 - 2021.04.15</h6>

              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
      <div class="pt-5"/>
      <input type="hidden" class="product-name" :value="product.productName">
      <input type="hidden" class="order-amount" :value="product.orderAmount ">
      <!--   支付按钮   -->
      <v-bottom-navigation color="primary" horizontal app>
        <v-btn>
          <span>Back</span>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-divider
            class="mx-4"
            vertical
        ></v-divider>
        <v-btn class="custom-button">
          <v-icon style="padding-left: 12px">mdi-arrow-right</v-icon>
          <span>Pay Now</span>
        </v-btn>
      </v-bottom-navigation>
    </div>
  </v-main>
</template>

<script>

export default {
  name: "OrderConfirm",
  data () {
    return {
      payToken :null,
      form : {
        creditVerify : null,
        creditNum : null
      },
      product: {
        productName : "今日のバーベキュー屋",
        orderAmount : 1000
      }
    }
  },
  methods : {
  }
}
</script>

<style scoped>
</style>