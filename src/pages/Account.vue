<template>
  <div>
    <!--  PC 弹窗  -->
    <v-row v-show="!isMobile">
      <v-dialog v-model="dialog" persistent max-width="45%">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              class="mx-2"
              small
              fab
              outlined
              color="primary"
              v-bind="attrs"
              v-on="on"
          >
            <v-icon>
              mdi-account
            </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-toolbar>
            <v-toolbar-title>个人中心</v-toolbar-title>
          </v-toolbar>
          <v-tabs vertical>
            <v-tab>
              <v-icon left>
                mdi-account
              </v-icon>
              {{$t('i18n.account.basic.title')}}
            </v-tab>
            <v-tab>
              <v-icon left>
                mdi-lock
              </v-icon>
              隐私策略
            </v-tab>
            <v-tab>
              <v-icon left>
                mdi-access-point
              </v-icon>
              统计信息
            </v-tab>

            <v-tab-item>
              <v-card
                  class="mx-auto"
                  max-width="344"
                  height="350"
                  flat
              >
                <v-card-text>
                  <p class="display-1 text--primary">
                    尚未登录
                  </p>
                  <p>辨识 ID：XJASUD23311</p>
                  <p class="text--primary">* 辨识 ID 仅用于在游客身份下匿名化处理数据</p>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                      color="red"
                      small
                      outlined
                      @click="reveal = true"
                  >
                    邮箱快捷登录
                  </v-btn>
                  <v-btn
                      color="brown"
                      small
                      outlined
                      @click="reveal = true"
                  >
                    LINE 登录
                  </v-btn>
                </v-card-actions>

                <v-expand-transition>
                  <v-card
                      v-if="reveal"
                      class="transition-fast-in-fast-out v-card--reveal"
                      style="height: 100%;"
                  >
                    <v-card-text class="pb-0">
                      <p class="text--primary">快捷注册/登录
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
                          @click="reveal = false"
                      >
                        注册/登录 |
                        <v-icon small class="pl-1">mdi-check-underline</v-icon>
                      </v-btn>
                      <v-btn
                          outlined
                          small
                          color="orange accent-4"
                          @click="reveal = false"
                      >
                        发送验证码 |
                        <v-icon small class="pl-1">mdi-send</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-expand-transition>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card class="mx-auto"
                      max-width="344"
                      height="350"
                      flat>
                <v-card-text>
                  <v-switch
                      v-model="anonymousShared"
                      label="匿名化数据共享"
                  ></v-switch>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card class="mx-auto"
                      max-width="344"
                      height="350"
                      flat>
                <v-card-text>
                  <p>
                    当前已收集的匿名数据量：8232
                  </p>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined small @click="dialog = false">关闭</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!--  Mobile 页面  -->
    <div class="text-center" v-show="isMobile">
      <v-bottom-sheet
          v-model="sheet"
          inset
      >
        <template v-slot:activator="{ on, attrs }">
          <div
              v-bind="attrs"
              v-on="on"
          >
            <v-icon style="position:fixed; margin:auto; right: 5%; top:28%;">mdi-account</v-icon>
          </div>
        </template>
        <v-sheet
            class="text-center"
            height="800px"
        >
          <v-card outlined height="100%">
            <v-card-title>个人中心</v-card-title>
            <div class="pt-12">
              <v-card-text>
                <p class="display-1 text--primary">
                  尚未登录
                </p>
                <p>欢迎使用 Regaferi</p>
                <p class="text--primary">注册会员即代表您同意本站相关服务协议</p>
              </v-card-text>
              <v-card-actions style="display: block">
                <v-btn
                    color="red"
                    small
                    outlined
                    @click="reveal = true"
                >
                  邮箱快捷登录
                </v-btn>
                <v-btn
                    color="brown"
                    small
                    outlined
                    @click="reveal = true"
                    class="text-center align-center"
                >
                  LINE 登录
                </v-btn>
              </v-card-actions>
              <v-expand-transition>
                <v-card
                    v-if="reveal"
                    class="transition-fast-in-fast-out v-card--reveal"
                    style="height: 100%;"
                >
                  <v-card-text class="pb-0">
                    <p class="text--primary">快捷注册/登录
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
                        @click="reveal = false"
                    >
                      注册/登录 |
                      <v-icon small class="pl-1">mdi-check-underline</v-icon>
                    </v-btn>
                    <v-btn
                        outlined
                        small
                        color="orange accent-4"
                        @click="reveal = false"
                    >
                      发送验证码 |
                      <v-icon small class="pl-1">mdi-send</v-icon>
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

export default {

  name: "Account",
  components: {
  },
  data() {
    return {
      sheet: false,
      isMobile :false,
      dialog: false,
      reveal: false,
      valid: true,
      account: '',
      code:'',
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