<template>
  <v-main>
    <div class="order-confirm-pc"></div>
    <div class="order-confirm-mobile">
      <!--   确认商品详情   -->
      <div class="pt-5"/>
      <div style="padding-left: 6%">
        <v-card width="96%" style="padding-left: 3%">
          <v-card-title>商品信息</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-img class="pt-3" height="180" src="../../image/image-plp-recommend.jpg"></v-img>
              </v-col>
              <v-col cols="6" style="font-size: xx-small">
                <h4 class="pt-3">今日烧烤屋</h4>
                <h5 style="color: red">500JP / Monthly</h5>
                <v-divider class="pt-3 pb-5"/>
                <h6>次数限制：2 Times / Per Day</h6>
                <h6>可用时间：2021.01.01 - 2021.04.15</h6>

              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
      <div class="pt-5"/>
      <!--   选择支付方式   -->
      <div style="padding-left: 6%">
        <v-card width="96%" style="padding-left: 3%">
          <v-card-title>支付信息</v-card-title>
          <v-row>
            <v-spacer/>
            <v-col
                class="d-flex"
                cols="8"
                sm="6"
            >
              <v-select
                  prepend-icon="mdi-map"
                  height="35"
                  :items="payMethods"
                  item-text="name"
                  item-value="value"
                  label="请选择支付方式"
              ></v-select>
            </v-col>
            <v-spacer/>
          </v-row>
          <v-row>
            <v-spacer/>
            <v-col
                class="d-flex"
                cols="8"
                sm="6"
            >
              <v-text-field
                  :value = "form.creditNum"
                  messages="请输入信用卡号码"
                  prepend-icon="mdi-credit-card-check-outline"
              />
            </v-col>
            <v-spacer/>
          </v-row>
          <v-row>
            <v-spacer/>
            <v-col
                class="d-flex"
                cols="8"
                sm="6"
            >
              <v-text-field
                  :value = "form.creditVerify"
                  messages="请输入信用卡校验码"
                  prepend-icon="mdi-credit-card-check-outline"
              />
            </v-col>
            <v-spacer/>
          </v-row>
          <div class="pb-8"/>
        </v-card>
      </div>
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
        <v-btn>
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
      form : {
        creditVerify : null,
        creditNum : null
      },
      payMethods : [
        {
          name : '信用卡',
          value : 1,
          icon : 'mdi-credit-card-check-outline'
        }
      ],
      renewalMethods : [
        {
          name : '单次订购',
          value : 1,
          icon : 'mdi-credit-card-check-outline'
        },
        {
          name : '自动续费',
          value : 2,
          icon : 'mdi-credit-card-check-outline'
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>