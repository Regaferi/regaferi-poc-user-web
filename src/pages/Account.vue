<template>
  <div>
    <!--  PC 弹窗  -->
    <v-row v-show="!isMobile">
      <v-dialog v-model="dialog" max-width="45%">
        <template v-slot:activator="{ on, attrs }" >
          <v-btn  class="mx-2" small fab outlined color="primary" v-bind="attrs" v-on="on">
            <v-icon style="color: #FFFFFF">
              mdi-account
            </v-icon>
          </v-btn>
        </template>
        <v-card v-show="!isLogin">
          <v-card-title>{{ $t('i18n.member.basic.title') }}</v-card-title>
          <v-card class="mx-auto" max-width="344" height="350" flat>
            <v-card-text>
              <p class="display-1 text--primary">
                まだ登録されていない
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="red" small outlined @click="reveal = true">E Mail</v-btn>
              <v-btn color="brown" small outlined @click="reveal = true">LINE</v-btn>
            </v-card-actions>

            <v-expand-transition>
              <v-card
                  outlined
                  v-if="reveal"
                  class="transition-fast-in-fast-out v-card--reveal"
                  style="height: 100%;"
              >
                <v-card-text class="pb-0">
                  <p class="text--primary">迅速な登録/登録
                    <v-btn
                        text
                        x-small
                        @click="reveal = false"
                    >
                      <v-icon small>mdi-chevron-up</v-icon>
                    </v-btn>
                  </p>
                  <v-form
                      ref="form"
                      v-model="valid"
                      lazy-validation
                  >
                    <v-text-field
                        v-model="account"
                        :rules="accountRules"
                        label="Email/Mobile"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="code"
                        :rules="codeRules"
                        label="验证码"
                        required
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions class="pt-3">
                  <v-btn
                      outlined
                      small
                      color="teal accent-4"
                      @click="login"
                  >
                    登録/登録 |
                    <v-icon small class="pl-1">mdi-check-underline</v-icon>
                  </v-btn>
                  <v-btn
                      outlined
                      small
                      color="orange accent-4"
                      @click="reveal = false"
                      :disabled="show"
                  >
                    検証コードを送る |{{count}}
                    <v-icon small class="pl-1">mdi-send</v-icon>
                  </v-btn>

                </v-card-actions>

              </v-card>
            </v-expand-transition>
          </v-card>
        </v-card>
        <MemberCenter v-show="isLogin"/>
      </v-dialog>
    </v-row>
    <!--  Mobile 页面  -->
    <div class="text-center" v-show="isMobile">
      <v-bottom-sheet v-model="sheet" inset>
        <template v-slot:activator="{ on, attrs }">
          <div
              v-bind="attrs"
              v-on="on"
          >
            <v-icon style="position:fixed; margin:auto; right: 5%; top:28%;color: #FFF">mdi-account</v-icon>
          </div>
        </template>
        <v-sheet
            class="text-center"
            height="800px"
        >
          <v-card outlined height="100%" v-show="!isLogin">
            <v-card-title>個人センター.</v-card-title>
            <div class="pt-12">
              <v-card-text>
                <p class="display-1 text--primary">
                  まだ登録されていない
                </p>
                <p>ようこそご利用ください Regaferi</p>
                <p class="text--primary">会員登録は当ステーション関連サービス契約にご同意いただきます</p>
              </v-card-text>
              <v-card-actions style="display: block">
                <v-btn
                    color="red"
                    small
                    outlined
                    @click="reveal = true"
                >
                  E-Mail
                </v-btn>
<!--                <v-btn-->
<!--                    color="brown"-->
<!--                    small-->
<!--                    outlined-->
<!--                    @click="reveal = true"-->
<!--                    class="text-center align-center"-->
<!--                >-->
<!--                  LINE-->
<!--                </v-btn>-->
              </v-card-actions>
              <v-expand-transition>
                <v-card
                    v-if="reveal"
                    class="transition-fast-in-fast-out v-card--reveal"
                    style="height: 100%;"
                >
                  <v-card-text class="pb-0">
                    <p class="text--primary">迅速な登録/登録
                      <v-btn
                          text
                          x-small
                          @click="reveal = false"
                      >
                        <v-icon small>mdi-chevron-up</v-icon>
                      </v-btn>
                    </p>
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                      <v-text-field
                          v-model="account"
                          :rules="accountRules"
                          label="Email"
                          required
                      ></v-text-field>
                      <v-text-field
                          v-model="code"
                          :rules="codeRules"
                          label="検証コード."
                          required
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions class="pt-3">
                    <v-btn
                        outlined
                        small
                        color="teal accent-4"
                        @click="login"
                    >
                      登録/登録 |
                      <v-icon small class="pl-1">mdi-check-underline</v-icon>
                    </v-btn>
                    <v-btn
                        outlined
                        small
                        color="orange accent-4"
                        @click="sendVerifyCode"
                        :disabled="show"
                    >
                      検証コードを送る |{{count}}
                      <v-icon small class="pl-1">mdi-send</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-expand-transition>
            </div>
          </v-card>
          <MemberCenter v-show="isLogin"/>
        </v-sheet>
      </v-bottom-sheet>
    </div>
  </div>
</template>

<script>

import MemberCenter from "@/pages/MemberCenter";
import axios from "axios";
export default {

  name: "Account",
  components: {
    MemberCenter
  },
  data() {
    return {
      sheet: false,
      isMobile :false,
      isLogin : false,
      dialog: false,
      reveal: false,
      valid: true,
      account: '',
      code:'',
      show: false,
      count: '',
      timer: null,
      accountRules: [
        v => !!v || '请输入邮箱/手机号',
      ],
      codeRules: [
        v => !!v || '请输入验证码',
      ],
      anonymousShared: true,
    }
  },
  mounted() {
    this.isMobile = this.$store.state.isMobile;
  },
  methods: {
    login (){
      let that = this;
      // http://frontend-api.regaferi.jp/member/login
      axios.post('http://frontend-api.regaferi.jp/member/login', {
        "source": 200,
        "email": this.account,
        "verifyCode": this.code
      })
      .then(function (response) {
        if (response.data.isSuccess){
          that.reveal = false;
          that.isLogin = true;
          that.$store.commit('isLogin', true);

          // 请求用户详情
          // http://frontend-api.regaferi.jp/member/detail
          axios.post('http://frontend-api.regaferi.jp/member/detail', {})
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        }else{
          alert(response.data.message)
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    },
    sendVerifyCode (){
     this.$message.success(`邮件发送成功`)
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.show = true;
        this.count = TIME_COUNT;
        this.timer = setInterval(() => {
        if (this.count > 0 && this.count <= TIME_COUNT) {
          this.count--;
         } else {
          this.show = false;
          clearInterval(this.timer);
          this.timer = null;
          this.count = "";
         }
        }, 1000)
       }
      axios.post('http://frontend-api.regaferi.jp/member/verify', {
        'email' : this.account,
        'mobile' : null
      })
      .then(function (response) {
        if (response.data.isSuccess){
          console.log("success")
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },


}

</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
