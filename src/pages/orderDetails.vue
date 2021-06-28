<template>

    <div style="margin-top: 20%;">
        <a-descriptions bordered>
            <a-descriptions-item label="メニュー名">
                {{orderList.serviceName}}
            </a-descriptions-item>
            <a-descriptions-item label="提供開始時間">
                {{orderList.serviceOrder.openTime.slice(0,5)}}
            </a-descriptions-item>
            <a-descriptions-item label="提供終了時間">
                {{orderList.serviceOrder.closeTime.slice(0,5)}}
            </a-descriptions-item>
           // <a-descriptions-item label="購入日">
               {{orderList.serviceOrder.startTime.slice(0,10)}}
           </a-descriptions-item>
            <a-descriptions-item label="有効期間" :span="2">
                {{orderList.serviceOrder.endTime.slice(0,10)}}
            </a-descriptions-item>
            <a-descriptions-item label="住所">
                <a-badge status="processing" :text="orderList.serviceResponse.location" />
            </a-descriptions-item>
            <a-descriptions-item label="残りの有効日数">
                {{orderList.serviceOrder.serviceTimeDay}}
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
                    <h3>残り利用可能日数：{{item.serviceTimeDay}} 日</h3>
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
                thas.show = false
            })
        },
        methods: {

            onChange(e) {
                console.log('size checked', e.target.value);
                this.size = e.target.value;
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
