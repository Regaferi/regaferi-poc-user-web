<template>
  <div>
    <!--  PC 弹窗  -->
    <!--<v-row v-show="!isMobile">
      <v-dialog v-model="dialog" max-width="45%">
        <template v-slot:activator="{ on, attrs }" >
          <v-btn  class="mx-2" small fab outlined color="primary" v-bind="attrs" v-on="on">
            <v-icon>
              mdi-account
            </v-icon>
          </v-btn>
        </template>
        <v-card v-show="!isLogin">
&lt;!&ndash;          <v-card-title>{{ $t('i18n.member.basic.title') }}</v-card-title>&ndash;&gt;
          <v-card-title>個人センター.</v-card-title>
          <v-card class="mx-auto" max-width="344" height="350" flat>
            <v-card-text>
              <p class="display-1 text&#45;&#45;primary">
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
                  class="transition-fast-in-fast-out v-card&#45;&#45;reveal"
                  style="height: 100%;"
              >
                <v-card-text class="pb-0">
                  <p class="text&#45;&#45;primary">迅速な登録/登録
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
                      @click="sendVerifyCode"
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
    </v-row>-->
    <!--  Mobile 页面  -->
    <div class="text-center">
      <v-bottom-sheet v-model="sheet" inset>
        <template v-slot:activator="{ on, attrs }">
          <div
              v-bind="attrs"
              v-on="on"
          >
            <v-icon style="position:fixed; margin:auto; right: 5%; top:28%">mdi-account</v-icon>
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
                <v-btn
                        color="red"
                        small
                        outlined
                        @click="revealZhuce = true"
                >
                  注册
                </v-btn>
                <v-btn
                        color="red"
                        small
                        outlined
                        @click="revealDenlu = true"
                >
                  登录
                </v-btn>
                <v-btn
                    color="brown"
                    small
                    outlined
                    @click="reveal = true"
                    class="text-center align-center"
                >
                  LINE
                </v-btn>
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
              <v-expand-transition>
                <v-card
                        v-if="revealZhuce"
                        class="transition-fast-in-fast-out v-card--reveal"
                        style="height: 100%;"
                >
                  <v-card-text class="pb-0">
                    <p class="text--primary">迅速な登録/登録
                      <v-btn
                              text
                              x-small
                              @click="revealZhuce = false"
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
                              v-model="formData.email"
                              :rules="email"
                              label="Email"
                              required
                      ></v-text-field>
                      <v-text-field
                              v-model="formData.password"
                              :rules="password"
                              label="请输入密码"
                              required
                      ></v-text-field>
                      <v-text-field
                              v-model="formData.repeatPassword"
                              :rules="repeatPassword"
                              label="请再次输入密码"
                              required
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions class="pt-3">
                    <v-btn
                            outlined
                            small
                            color="teal accent-4"
                            @click="register"
                    >
                      注册 |
                      <v-icon small class="pl-1">mdi-check-underline</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-expand-transition>
              <v-expand-transition>
                <v-card
                        v-if="revealDenlu"
                        class="transition-fast-in-fast-out v-card--reveal"
                        style="height: 100%;"
                >
                  <v-card-text class="pb-0">
                    <p class="text--primary">登録/登録
                      <v-btn
                              text
                              x-small
                              @click="revealDenlu = false"
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
                              v-model="formData1.email"
                              :rules="email"
                              label="Email"
                              required
                      ></v-text-field>
                      <v-text-field
                              v-model="formData1.password"
                              :rules="password"
                              label="请输入密码"
                              required
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions class="pt-3">
                    <v-btn
                            outlined
                            small
                            color="teal accent-4"
                            @click="member"
                    >
                      登录 |
                      <v-icon small class="pl-1">mdi-check-underline</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-expand-transition>
            </div>
          </v-card>
        </v-sheet>
      </v-bottom-sheet>
    </div>
  </div>
</template>

<script>

import { verify,login,memberRegister,memberLogin} from "@api";
export default {

  name: "Account",
  components: {
  },
  data() {
    return {
      sheet: false,
      isMobile :false,
      isLogin : false,
      dialog: false,
      reveal: false,
      revealZhuce: false,
      revealDenlu: false,
      valid: true,
      account: '',
      code:'',
      show: false,
      count: '',
      timer: null,
      formData:{
        email:'',
        password:'',
        repeatPassword:'',
      },
      formData1:{
        email:'',
        password:'',
        source:100,
      },
      email: [
        v => !!v || '请输入邮箱',
      ],password: [
        v => !!v || '请输入密码',
      ],repeatPassword: [
        v => !!v || '请再次输入密码',
      ],
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
    member(){
      let that = this;
      memberLogin(that.formData1)
              .then(function (response) {
                that.$notify({ type: 'success', message: "登录成功!" });
                if(response.data.firstLogin == true){
                  that.$router.push({name:'firstLogin'})
                }else {
                  that.$router.push({name:'resume'})
                }
                that.$store.commit("COMMIT_TOKEN", response.data);
              })
              .catch(function (error) {
                that.$notify({ type: 'warning', message: error.errMessage });
              });
    },
    register(){
      let that = this;
      if(that.formData.password != that.formData.repeatPassword){
        that.$notify({ type: 'warning', message: "两次密码不一致，请重新输入" });
      }else{
        memberRegister(that.formData)
                .then(function (response) {
                  console.log(response)
                  that.$notify({ type: 'success', message: "注册成功,请重新登录!" });
                  that.revealDenlu = false
                  that.reveal = true
                })
                .catch(function (error) {
                  that.$notify({ type: 'warning', message: error.errMessage });
                });
      }


    },
    login (){

      let that = this;
      /*login({
        "source": 200,
        "email": this.account,
        "verifyCode": this.code
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err.data,'失败')
      });*/
      // http://frontend-api.regaferi.jp/member/login
      if(this.code){
        login({
          "source": 200,
          "email": this.account,
          "verifyCode": this.code
        })
                .then(function (response) {
                  if(response.data.firstLogin == true){
                    that.$router.push({name:'firstLogin'})
                  }else {
                    that.$router.push({name:'resume'})
                  }
                  that.$store.commit("COMMIT_TOKEN", response.data);
                })
                .catch(function (error) {
                  that.$notify({ type: 'warning', message: error.errMessage });
                });

      }

    },
    sendVerifyCode (){
      const TIME_COUNT = 60;
      if (!this.timer) {
        if(this.account){
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
      }
      var thas = this
      if(thas.account){
        verify({
          "email": thas.account,
        })
                .then(function (response) {
                  thas.$notify({ type: 'success', message: '邮件发送成功' });
                  console.log(response);

                })
                .catch(function (error) {
                  clearInterval(thas.timer);
                  thas.timer = null;
                  thas.count = "";
                  thas.show = false;
                  thas.$notify({ type: 'warning', message: error.errMessage });
                });
      }
      /*axios.post('http://frontend-api.regaferi.jp/member/verify', {
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
      });*/
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
