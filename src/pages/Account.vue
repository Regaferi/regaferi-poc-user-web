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
          <v-card-title>アカウント</v-card-title>
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
                  <p class="text&#45;&#45;primary"> パスワードを忘れた場合
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
                    <v-text-field
                        v-model="code"
                        :rules="codeRules"
                        label="検証コード"
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
                    ログイン |
                    <v-icon small class="pl-1">mdi-check-underline</v-icon>
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
      <v-bottom-sheet  v-model="sheet" inset>
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
            <v-card-title>アカウント</v-card-title>
            <div class="pt-12">
              <v-card-text>
                <p class="p-text-class">
                  まだ登録されていない
                </p>
              </v-card-text>
              <p class="text--primary">アカウントにログインする方法を選んでください</p>
               <v-card-actions style="display: block"> 
            <div class="padding-text">
               <v-btn
                       style="width: 220px;"
                        color="red"
                        small
                        outlined
                        @click="revealDenlu = true"
                >
                
                      ログイン
                </v-btn>
            </div>
            <div class="padding-text">
                <v-btn
                 style="width: 220px;"
                    color="red"
                    small
                    outlined
                    @click="reveal = true"
                >
                          パスワードを忘れた場合
                </v-btn>  
            </div>

             <div class="padding-text">
                 <i class="el-icon-view el-icon--right"></i> <el-link href="https://regaferi.jp/footer2" target="_blank" >※利用規約</el-link>
                                  と<el-link href="https://regaferi.jp/footer4" target="_blank" >プライバシー</el-link>ポリシーが適用されます
              </div>
                 </v-card-actions>
                 
                 <p style="padding-top:50px" class="p-text-class" >新規登録はこちら</p>
                           <v-card-actions style="display: block">
                <v-btn
                        color="red"
                        small
                        outlined
                        @click="revealZhuce = true"
                >
                 新規登録
                </v-btn>


              </v-card-actions>    
              <v-expand-transition>
                <v-card
                    v-if="reveal"
                    class="transition-fast-in-fast-out v-card--reveal"
                    style="height: 100%;"
                >
                  <v-card-text class="pb-0">
                    <p class="text--primary"> パスワードを忘れた場合
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
                 <div class="padding-text">
                    <v-btn
                        outlined
                        small
                        color="orange accent-4"
                        @click="sendVerifyCode"
                        :disabled="show"
                    >
                     ①検証コードを取得する |{{count}}
                      <v-icon small class="pl-1">mdi-send</v-icon>
                    </v-btn>
                    </div>
                      <v-text-field
                          v-model="code"
                          :rules="codeRules"
                          label="検証コード"
                          required
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <div class="padding-text">
                    <v-btn
                        outlined
                        small
                        color="teal accent-4"
                        @click="login"
                    >
               ②ログイン |
                      <v-icon small class="pl-1">mdi-check-underline</v-icon>
                    </v-btn>
                    </div>
                </v-card>
              </v-expand-transition>
              <v-expand-transition>
                <v-card
                        v-if="revealZhuce"
                        class="transition-fast-in-fast-out v-card--reveal"
                        style="height: 100%;"
                >
                  <v-card-text class="pb-0">
                    <p class="text--primary"> 新規登録
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
                              :type="'password'"
                              v-model="formData.password"
                              :rules="password"
                              label="パスワード"
                              required
                      ></v-text-field>
                      <v-text-field
                              :type="'password'"
                              v-model="formData.repeatPassword"
                              :rules="repeatPassword"
                              label="確認のためパスワードを再入力してください"
                              required
                      ></v-text-field>
                      <v-text-field

                              v-model="formData.verifyCode"
                              :rules="codeRules"
                              label="ワンタイムパスワード."
                              required
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions class="pt-3">
                  <v-btn
                            outlined
                            small
                            color="orange accent-4"
                            @click="sendVerifyCodeTwo"
                            :disabled="show"
                    >
                      検証コードを送る |{{count}}
                      <v-icon small class="pl-1">mdi-send</v-icon>
                    </v-btn>
                    <v-btn
                            outlined
                            small
                            color="teal accent-4"
                            @click="register"
                    >
                     新規登録 |
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
                    <p class="text--primary">ログイン
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
                              :type="'password'"
                              v-model="formData1.password"

                              :rules="password"
                              label="パスワード"
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
                ログイン       |
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
  import { Notify } from 'vant';
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
      formData:{},
      formData1:{
        email:'',
        password:'',
        source:100,
      },
      email: [
        v => !!v || 'Emailが入力されていません！',
      ],password: [
        v => !!v || 'パスワードが入力されていません！',
      ],repeatPassword: [
        v => !!v || 'パスワードが入力されていません！',
      ],
      accountRules: [
        v => !!v || 'Emailが入力されていません！',
      ],
      codeRules: [
        v => !!v || '検証コードが入力されていません！',
      ],
      anonymousShared: true,
    }
  },
  created() {


  },
  mounted() {
    this.isMobile = this.$store.state.isMobile;
  },
  methods: {
    member(){
      let that = this;
      memberLogin(that.formData1)
              .then(function (response) {
                Notify({ type: 'success', message: "登录成功!" });
                if(response.data.firstLogin == true){
                  that.$router.push({name:'firstLogin'})
                }else {
                  that.$router.push({name:'resume'})
                }
                that.$store.commit("COMMIT_TOKEN", response.data);
              })
              .catch(function (error) {
                Notify({ type: 'warning', message: error.errMessage });
              });
    },
    register(){
      console.log(this.formData)
      if(this.formData.verifyCode){
        let that = this;
        if(that.formData.password != that.formData.repeatPassword){
          Notify({ type: 'warning', message: "两次密码不一致，请重新输入" });
        }else{
          memberRegister(that.formData)
                  .then(function (response) {
                    console.log(response)
                    Notify({ type: 'success', message: "注册成功,请重新登录!" });
                    that.revealZhuce = false
                    that.revealDenlu = true
                  })
                  .catch(function (error) {
                    Notify({ type: 'warning', message: error.errMessage });
                  });
        }
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
                  Notify({ type: 'warning', message: error.errMessage });
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
        }else{
          Notify({ type: 'warning', message: '请输入邮箱！' });
        }
      }
      var thas = this
      if(thas.account){
        verify({
          "email": thas.account,
        })
                .then(function (response) {
                  Notify({ type: 'success', message: '邮件发送成功' });
                  console.log(response);

                })
                .catch(function (error) {
                  clearInterval(thas.timer);
                  thas.timer = null;
                  thas.count = "";
                  thas.show = false;
                  Notify({ type: 'warning', message: error.errMessage });
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
    },
    sendVerifyCodeTwo (){
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
      var thas = this
      if(thas.formData.email){
        verify({
          "email": thas.formData.email,
        })
                .then(function (response) {
                  Notify({ type: 'success', message: '邮件发送成功' });
                  console.log(response);

                })
                .catch(function (error) {
                  clearInterval(thas.timer);
                  thas.timer = null;
                  thas.count = "";
                  thas.show = false;
                  Notify({ type: 'warning', message: error.errMessage });
                });
      }else{
        Notify({ type: 'warning', message: '请输入邮箱！' });
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
.p-text-class{
  font-size: 25px;
  color:#5d63ff;
}
.p-text-2{
 padding-top: 25px;
}
.padding-text{
font-size: 0.75rem;
 padding-top: 25px;
}
.el-link.el-link--default {
   color: #1976d2;
}
</style>
