<template>

    <div style="margin-top: 20%;">
        <div v-show="orderInformation" style="height: 38vh;">
            <van-empty
                    class="custom-image"
                    image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
                    description="現在有効期間中のサブスクはありません"
            />
        </div>
        <a-descriptions bordered>
            <a-descriptions-item label="メニュー名">
                {{orderList.serviceName}}
            </a-descriptions-item>
            <a-descriptions-item label="提供開始時間">
                {{Tiemllip(orderList.serviceOrder.openTime)}}
            </a-descriptions-item>
            <a-descriptions-item label="提供終了時間">
                {{Tiemllip(orderList.serviceOrder.closeTime)}}
            </a-descriptions-item>
           // <a-descriptions-item label="購入日">
               {{tenTime(orderList.serviceOrder.startTime)}}
           </a-descriptions-item>
            <a-descriptions-item label="有効期間">
                {{tenTime(orderList.serviceOrder.endTime)}}
            </a-descriptions-item>
            <a-descriptions-item label="残りの有効日数">
                {{difference(orderList.serviceOrder.endTime)}}
            </a-descriptions-item>

            <a-descriptions-item label="残りの有効回数">
                {{orderList.serviceOrder.remCount == null ? '回数無制限':orderList.serviceOrder.remCount + '回'}}
            </a-descriptions-item>
        </a-descriptions>
        <div>
            <van-steps direction="vertical" :active="0">
                <van-step v-for="(item,index) in orderList.serviceOrderLogInfoResponses" :key="index">
                    <h3>時間：{{item.createTime}}</h3>
                    <h3>利用可能上限：{{item.remCount}} 回</h3>
                    <h3>残り利用可能日数：{{difference(item.endTime)}} 日</h3>
                    <h3>種類：{{item.operationType == '1'? '注文' : item.operationType == '2'? '消費' : 'ストアギフト'}}</h3>
                </van-step>
            </van-steps>
        </div>
        <van-overlay :show="show">
            <div class="wrapper">
                <van-loading color="#1989fa" />
            </div>
        </van-overlay>
    </div>
</template>

<script>
import {orderDetail} from '@api'
    export default {
        data() {
            return {
                show:true,
                orderInformation:true,
                size: 'default',
                orderList:{
                    serviceOrder:{},
                    serviceResponse:{}

                },
            };
        },
        created() {
            var thas = this
            orderDetail(thas.$route.query.id).then((res)=> {
                thas.orderList = res.data
                thas.orderInformation = false
                setTimeout(()=>{
                    thas.show = false
                },200)
            })
        },
        methods: {
            Tiemllip(value) {
                if (!value) return ''
                return value.slice(0,5)
            },
            tenTime(value) {
                if (!value) return ''
                return value.slice(0,10)
            },
            onChange(e) {
                console.log('size checked', e.target.value);
                this.size = e.target.value;
            },
             // 时间差计算
    difference (beginTime) {
      var dateBegin = new Date(beginTime);
      var myDate = new Date();
      var dateDiff =  dateBegin.getTime()-myDate.getTime(); //时间差的毫秒数
      var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
      return dayDiff;
    },
        },
    }
</script>

<style scoped>
    .van-cell-group{
        background-color: #f7f8fa;

    }
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
</style>
