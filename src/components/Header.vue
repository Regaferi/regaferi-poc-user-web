<template>
  <v-app-bar app>
    <!--  PC 模式  -->
    <v-container ref="backTop" class="py-0 fill-height" v-show="!isMobile">
      <h3 class="pl-8 pr-12" ref="gaoBian" style="height: 30px;color: rgba(0, 0, 0, 0.54)" @click="backToHome()">Regaferi</h3>
      <v-spacer></v-spacer>
      <div class="header-right">
        <div class="header-right-search">
<!--          <v-responsive max-width="260" >-->
<!--            <v-text-field-->
<!--                    label="Prepend"-->
<!--                    prepend-icon="mdi-map-marker"-->
<!--            ></v-text-field>-->
<!--        </v-responsive>-->
<!--          <v-responsive max-width="260" >-->
<!--            <v-text-field-->
<!--                    label="Prepend"-->
<!--                    prepend-icon="mdi-map-marker"-->
<!--            ></v-text-field>-->
<!--          </v-responsive>-->
          <v-responsive max-width="300" >
            <el-input @change="searchStore" placeholder="请输入内容" v-model="input" class="input-with-select">
              <el-select v-model="value1" slot="prepend" placeholder="请选择">
                <el-option  v-for="item in valueLabel"
                            :key="item.value1"
                            :label="item.label"
                            :value="item.value1"></el-option>
              </el-select>
            </el-input>
          </v-responsive>
        </div>

        <div class="header-right-account"><Account/></div>
      </div>
    </v-container>
    <!--  Mobile 模式  -->
    <v-container class="text-center align-center" v-show="isMobile">
      <!--      <v-icon style="position:fixed; margin:auto; left: 5%; top:28%;">mdi-magnify</v-icon>-->
      <h3 style="height: 30px; position: absolute;top:13px;color: rgba(0, 0, 0, 0.54)" @click="backToHome()">Regaferi</h3>
      <Account v-if="!this.$store.state.token"/>

        <van-icon @click="resume" style="float: right" size="25" v-if="this.$store.state.token" name="manager-o" />
    </v-container>
  </v-app-bar>
</template>

<script>

import Account from "@/pages/Account";
export default {
  name: "Header",
  components : {
    Account,
  },
  data: () => ({
    value1:'地点',
    input:'',
    valueLabel: [
      {
        value1: '地点',
        label: '地点'
      },{
      value1: '店铺',
      label: '店铺'
    }, {
      value1: '服务',
      label: '服务'
    }],
    isMobile: false,
  }),
  created() {
  },
  mounted () {
    this.isMobile = this.$store.state.isMobile;
  },
  methods : {
      resume(){
          if (this.$route.path !== '/resume') {
              this.$router.push({name:'resume'})
          }

      },
      searchStore(){
          this.input = ''
          if(this.value1 == '店铺'){
              if (this.$route.path !== '/storeList') { //判断当前路由和跳转路由是否一致（防止路由复用产生的报错）
                  this.$router.push({name : 'storeList'})
              }
          }else if(this.value1 == '服务'){
              if (this.$route.path !== '/product-list') { //判断当前路由和跳转路由是否一致（防止路由复用产生的报错）
                  this.$router.push({name : 'product-list'})
              }
          }

      },
    navigateTo : function (name){
      this.$router.push({name : name})
    },
    backToHome : function (){
      this.$router.push({name: 'home'})
    }

  }
}
</script>

<style scoped>
  .header-right {
    position: fixed;
    width: 350px;
    right: 15%;
  }
  .header-right-search {
    position: relative;
    float: left;
      right: 10%
  }
  .header-right-account {
    position: relative;
    float: right;
    top: 10px;
  }
  .header-right-account-mob {
    position: relative;
    float: right;
    top: 8%;
  }
  /deep/ .theme--light.v-text-field--solo-inverted > .v-input__control > .v-input__slot {
     background: rgba(255, 255, 255, 0.7);
  }
  /deep/.el-input-group__prepend {
    border-right: 0;
    width: 35%;
    border: none;
    background-color: rgb(244, 244, 244);
  }
  /deep/.el-input-group--prepend .el-input__inner, .el-input-group__append {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    width: 100%;

  }
  /deep/.el-input__inner {
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
    border: none;
    background-color: rgb(244, 244, 244);
  }
</style>
