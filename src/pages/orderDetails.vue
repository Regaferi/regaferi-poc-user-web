<template>
    <div style="margin-top: 20%;">
        <a-descriptions bordered>
            <a-descriptions-item label="orderCode">
                {{orderList.code}}
            </a-descriptions-item>
            <a-descriptions-item label="有效期开始时间">
                {{orderList.effectiveTime}}
            </a-descriptions-item>
            <a-descriptions-item label="有效期结束时间">
                {{orderList.expiredTime}}
            </a-descriptions-item>
            <a-descriptions-item label="Order time">
                2018-04-24 18:00:00
            </a-descriptions-item>
            <a-descriptions-item label="Usage Time" :span="2">
                2019-04-24 18:00:00
            </a-descriptions-item>
            <a-descriptions-item label="Status" :span="3">
                <a-badge status="processing" text="Running" />
            </a-descriptions-item>
            <a-descriptions-item label="订单状态">
                {{orderList.type == '100' ? '已创建待支付': orderList.type == '200' ? '待使用': orderList.type == '201' ? '部分使用':orderList.type == '202'?'已使用':orderList.type == '300'? '已取消':'已过期' }}
            </a-descriptions-item>
            <a-descriptions-item label="金额">
                {{orderList.total}}
            </a-descriptions-item>
            <a-descriptions-item label="服务开始时间">
                {{orderList.createTime}}
            </a-descriptions-item>
            <a-descriptions-item label="服务结束时间">
                {{orderList.updateTime}}
                <!--<br />
                Database version: 3.4
                <br />
                Package: dds.mongo.mid
                <br />
                Storage space: 10 GB
                <br />
                Replication factor: 3
                <br />
                Region: East China 1<br />-->
            </a-descriptions-item>
        </a-descriptions>
        <div>
            <van-steps direction="vertical" :active="0">
                <van-step v-for="(item,index) in orderList.orderLines" :key="index">
                    <h3>消费次数：{{item.quantity}}</h3>
                    <p>2016-07-12 12:40</p>
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
                thas.show = false
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
