<template>

    <div style="margin-top: 20%;">
        <a-descriptions bordered>
            <a-descriptions-item label="服务名">
                {{orderList.serviceName}}
            </a-descriptions-item>
            <a-descriptions-item label="营业时间">
                {{orderList.serviceOrder.openTime}}
            </a-descriptions-item>
            <a-descriptions-item label="闭店时间">
                {{orderList.serviceOrder.closeTime}}
            </a-descriptions-item>
            <a-descriptions-item label="有效开始时间">
                {{orderList.serviceOrder.startTime}}

            </a-descriptions-item>
            <a-descriptions-item label="失效结束时间" :span="2">
                {{orderList.serviceOrder.endTime}}
            </a-descriptions-item>

            <a-descriptions-item label="天数">
                2018-04-24 18:00:00
            </a-descriptions-item>

            <a-descriptions-item label="Status" :span="3">
                <a-badge status="processing" :text="orderList.serviceResponse.location" />
            </a-descriptions-item>
            <a-descriptions-item label="金额">
                {{orderList.total}}
            </a-descriptions-item>
            <a-descriptions-item label="剩余次数">
                {{orderList.serviceOrder.remCount}}

            </a-descriptions-item>
        </a-descriptions>
        <div>
            <van-steps direction="vertical" :active="0">
                <van-step v-for="(item,index) in orderList.serviceOrderLogInfoResponses" :key="index">
                    <h3>时间：{{item.createTime}}</h3>
                    <h3>剩余次数：{{index + 1}} 次</h3>
                    <h3>剩余天数：{{index + 1}} 次</h3>
                    <h3>类型：{{item.operationType == '1'? '下单' : item.operationType == '2'? '消费' : '补偿'}}</h3>
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
import {orderDetail,serviceOrder} from '@api'
    export default {
        data() {
            return {
                show:true,
                size: 'default',
                orderList:{}
            };
        },
        created() {
            var thas = this
            orderDetail(thas.$route.query.id).then((res)=> {
                thas.orderList = res.data
            })
            serviceOrder({
                orderId:thas.$route.query.id
            }).then((res)=> {
                thas.show = false
                thas.orderList = res.data
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
