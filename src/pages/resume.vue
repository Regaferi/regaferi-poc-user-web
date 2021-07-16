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
            <v-card-text v-for="(item,index) in orderList" :key="index" @click="Details(item)" style="box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%) !important;
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
                <van-button @click.stop="checkCode(item)" round type="info">検証コード</van-button>
            </v-card-text>
            <van-button style="margin-bottom: 5%" @click="tuiChu" type="danger">サインアウト</van-button>
            <!--   我的订单   -->
        </div>
        <van-overlay :show="show">
            <div class="wrapper">
                <van-loading color="#1989fa" />
            </div>
        </van-overlay>
        <van-dialog confirm-button-text="確認" v-model="showCancel" v-if="!time == 0" title="検証コード">
<div style="text-align: center;">
    <van-count-down :time="time" format="mm 分 ss 秒" />
</div>
            <div style="text-align: center;line-height: 40px;letter-spacing:25px;font-size: 25px">

                <span>{{code}}</span>
    </div>
        </van-dialog>
    </div>

</template>

<script>
    import { Notify } from 'vant';
import {memberDetail,orderList,settlement} from "@api";
    export default {
        name: "MemberCenter",
        data () {
            return {
                time:0,
                value:'asdasdas',
                showCancel:false,
                show:true,
                userName: {},
                isMobile : false,
                orderList:[],
                code:''
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
                settlement({
                    code:that.code,
                    orderId:val.id
                })
                    .then(function (response) {

                        that.time = response.data.ttl * 1000
                        that.code = response.data.code
                        Notify({ type: 'warning', message: '10分間有効！' });
                        that.showCancel = true
                    })
                    .catch(function (error) {
                        // this.$notify({ type: 'warning', message: 'クエリが失敗しました' });
                        console.log(error)
                    });


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
