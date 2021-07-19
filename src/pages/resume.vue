<template>
    <div style="margin-top: 12%;">
        <!-- PC -->

        <div class="pt-8 text-center align-center">
            <!--   头像   -->
<!--            <v-avatar><v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"/></v-avatar>-->
            <!--   基本信息   -->
            <v-card-subtitle>
                <h3>{{userName.name}}</h3>
                <p class="pt-2">email：{{userName.email}}</p>
                <p class="pt-2">mobile：{{userName.mobile}}</p>
            </v-card-subtitle>
            <v-divider/>
            <div v-if="orderList.length <= 0" style="height: 38vh;">
                <van-empty
                        class="custom-image"
                        image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
                        description="現在有効期間中のサブスクはありません"
                />
            </div>
            <el-tabs type="card" stretch  v-model="activeName" >
             <el-tab-pane  label="使用中で" name="first">
            <div v-for="(item,index) in orderList" :key="index">
            <v-card-text  v-if="item.serviceOrderLogInfoResponses[0].flag==true"  @click="Details(item)" style="box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%) !important;
};width: 90%;margin: auto;margin-bottom: 5%;">
 <p class="pt-3" style="font-size:18px;margin-bottom: 7%;">{{item.serviceName}}</p>
                    <v-row>
                        <v-col cols="6">
                            <v-img v-if="item.serviceLogoImage" height="130" :src="item.serviceLogoImage.target"/>
                            <van-image v-else src="https://regaferi.oss-ap-northeast-1.aliyuncs.com/system/logo-null.jpg">
                                <template v-slot:error>加载失败</template>
                            </van-image>
                        </v-col>
                        <v-col cols="6" style="font-size: xx-small">
                            <p style="color: red;font-size:13px">{{item.total}} 円</p>
                            <p style="font-size:12px">回数制限.： {{item.orderCounter == null ? '無制限':item.serviceOrderLogInfoResponses[0].remCount + '回'}}</p>
                            <p style="font-size:12px">残りの有効日数：{{difference(item.serviceOrderLogInfoResponses[0].endTime.slice(0,10))}}日</p>
                            <p style="font-size:12px">終了期間：{{item.serviceOrderLogInfoResponses[0].endTime.slice(0,10)}}</p>
                        </v-col>

                    </v-row>
                    <v-divider style="padding-bottom:10px"  />
                <van-button @click.stop="checkCode(item)" round type="primary">使用する</van-button>
            </v-card-text>
            </div>
            </el-tab-pane>
              <el-tab-pane label="期限切れ" name="second">
            <div v-for="(item,index) in orderList" :key="index">
                        <v-card-text v-if="item.serviceOrderLogInfoResponses[0].flag==false" @click="Details(item)" style="background: #e4e7ed;box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%) !important;
};width: 90%;margin: auto;margin-bottom: 5%;">
 <p class="pt-3" style="font-size:18px;margin-bottom: 7%;">{{item.serviceName}}</p>
                    <v-row>
                        <v-col cols="6">
                            <v-img v-if="item.serviceLogoImage" height="130" :src="item.serviceLogoImage.target"/>
                            <van-image v-else src="https://regaferi.oss-ap-northeast-1.aliyuncs.com/system/logo-null.jpg">
                                <template v-slot:error>加载失败</template>
                            </van-image>
                        </v-col>
                        <v-col cols="6" style="font-size: xx-small">
                            <p style="color: red;font-size:13px">{{item.total}} 円</p>
                            <p style="font-size:12px">回数制限.： {{item.orderCounter == null ? '無制限':item.serviceOrderLogInfoResponses[0].remCount + '回'}}</p>
                            <p style="font-size:12px">残りの有効日数：{{difference(item.serviceOrderLogInfoResponses[0].endTime.slice(0,10))}}日</p>
                            <p style="font-size:12px">終了期間：{{item.serviceOrderLogInfoResponses[0].endTime.slice(0,10)}}</p>
                        </v-col>

                    </v-row>
                    <v-divider style="padding-bottom:10px"  />
            </v-card-text>
            </div>
            </el-tab-pane>
            </el-tabs>
            <van-button style="margin-bottom: 5%" @click="tuiChu" type="danger">サインアウト</van-button>
            <!--   我的订单   -->
        </div>
        <van-overlay :show="show">
            <div class="wrapper">
                <van-loading color="#1989fa" />
            </div>
        </van-overlay>
<!--        v-if="!time == 0"-->
        <van-dialog confirm-button-text="確認" cancel-button-text="キャンセル" :showCancelButton="true" @confirm="payfor()" v-model="showCancel" title="店員確認">
            <!--<div style="text-align: center;">
                <van-count-down :time="time" format="mm 分 ss 秒" />
            </div>-->
            <!--<div style="text-align: center;line-height: 40px;letter-spacing:25px;font-size: 25px">
                <span>{{code}}</span>
            </div>-->
            <v-img style="padding-top:10px;" height="100%" :src="imgUrl"/>
            <van-field v-model="consumerToConfirm.name" readonly label="サービス名：" />
            <van-field v-model="consumerToConfirm.endTime" readonly label="有効期間：" />
            <van-field v-model="consumerToConfirm.remCount" readonly label="有効回数：" /> 
            <p style="font-size:15px;padding:15px;color:red">残り時間：{{day}}日{{hour}}時{{min}}分{{second}}秒</p>
        </van-dialog>
    </div>

</template>

<script>
    // import { Notify } from 'vant';
    // settlement
import {settlement,memberDetail,orderList,} from "@api";
    export default {
        name: "MemberCenter",
        data () {
            return {
                activeName: 'first',
                time:0,
                value:'asdasdas',
                showCancel:false,
                show:true,
                userName: {},
                isMobile : false,
                orderList:[],
                code:'',
                imgUrl:'',
                consumerToConfirm:{},
                curStartTime: '2019-07-31 08:00:00',
                id:'',
                valdate:{},
    day: '0',
    hour: '00',
    min: '00',
    second: '00',
            }
        },
        created() {

        },
        mounted() {
            this.isMobile = this.$store.state.isMobile;
            var that = this
            orderList({
            })
                .then(function (response) {
                    that.show = false
                    that.orderList = response.data
                })
                .catch(function (error) {
                    // this.$notify({ type: 'warning', message: 'クエリが失敗しました' });
                    console.log(error)
                });
            memberDetail({
            })
                .then(function (response) {

                    that.userName = response.data
                })
                .catch(function (error) {
                    // this.$notify({ type: 'warning', message: 'クエリが失敗しました' });
                    console.log(error)
                });
        },
        methods : {
            checkCode(val){
                this.time = 0
                var that = this
                this.valdate=val
                that.consumerToConfirm = {}
                that.showCancel = true
                that.consumerToConfirm = val.serviceOrderLogInfoResponses[0]
                if(that.consumerToConfirm.remCount==-1 || that.consumerToConfirm.remCount==null){
                that.consumerToConfirm.remCount='無制限'
                }
                this.curStartTime = that.consumerToConfirm.endTime
                this.imgUrl=val.serviceLogoImage.target
                this.countTime()
            },
            Details(val){
                this.$router.push({name:'details',query:{id:val.id}})
            },
            tuiChu(){
                this.$router.push({name:'home'})
                this.$store.commit('COMMIT_TOKEN','')
            },
                        // 时间差计算
    difference (beginTime) {
      var dateBegin = new Date(beginTime);
      var myDate = new Date();
      var dateDiff =  dateBegin.getTime()-myDate.getTime(); //时间差的毫秒数
      var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
      if(dayDiff<0){
      dayDiff=0;
      }
      return dayDiff;
    },
     payfor(){
     let val=this.valdate
      this.$router.push('/details/?id='+val.id);
              settlement({
                 code:val.code,
                 orderId:val.id,
                }).then(function(response){
                      this.$notify({ type: 'success', message: 'メニューを利用しました' });
                }).catch(function(error){
                });
                  
              },
countTime() {
  // 获取当前时间
  let date = new Date()
  let now = date.getTime()
  // 设置截止时间
  let endDate = new Date(this.curStartTime) // this.curStartTime需要倒计时的日期
let end = endDate.getTime()
  // 时间差
let leftTime = end - now
  // 定义变量 d,h,m,s保存倒计时的时间
if (leftTime >= 0) {
    // 天
this.day = Math.floor(leftTime / 1000 / 60 / 60 / 24)
    // 时
let h = Math.floor(leftTime / 1000 / 60 / 60 % 24)
this.hour = h < 10 ? '0' + h : h
    // 分
let m = Math.floor(leftTime / 1000 / 60 % 60)
this.min = m < 10 ? '0' + m : m
    // 秒
let s = Math.floor(leftTime / 1000 % 60)
  this.second = s < 10 ? '0' + s : s
  } else {
    this.day = 0
    this.hour = '00'
    this.min = '00'
    this.second = '00'
  }
   
  // 等于0的时候不调用
  if (Number(this.hour) === 0 && Number(this.day) === 0 && Number(this.min) === 0 && Number(this.second) === 0) {
    return
  } else {
  // 递归每秒调用countTime方法，显示动态时间效果,
    setTimeout(this.countTime, 1000)
  }
},　
        }
    }
</script>

<style scoped>
/deep/.v-list-item{
    align-items: center;
     display: block;
    flex: 1 1 100%;
    letter-spacing: normal;
    min-height: 48px;
    outline: none;
    padding: 0 16px;
    position: relative;
    text-decoration: none;
}
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>
