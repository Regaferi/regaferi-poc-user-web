<template>
    <div style="margin-top: 20%;">
        <a-descriptions bordered>
            <a-descriptions-item label="orderCode">
                {{orderList.code}}
            </a-descriptions-item>
            <a-descriptions-item label="Billing Mode">
                Prepaid
            </a-descriptions-item>
            <a-descriptions-item label="Automatic Renewal">
                YES
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
            <a-descriptions-item label="Negotiated Amount">
                $80.00
            </a-descriptions-item>
            <a-descriptions-item label="Discount">
                $20.00
            </a-descriptions-item>
            <a-descriptions-item label="Official Receipts">
                $60.00
            </a-descriptions-item>
            <a-descriptions-item label="Config Info">
                Data disk type: MongoDB
                <br />
                Database version: 3.4
                <br />
                Package: dds.mongo.mid
                <br />
                Storage space: 10 GB
                <br />
                Replication factor: 3
                <br />
                Region: East China 1<br />
            </a-descriptions-item>
        </a-descriptions>
        <div>
            <van-steps direction="vertical" :active="0">
                <van-step>
                    <h3>【城市】物流状态1</h3>
                    <p>2016-07-12 12:40</p>
                </van-step>
                <van-step>
                    <h3>【城市】物流状态2</h3>
                    <p>2016-07-11 10:00</p>
                </van-step>
                <van-step>
                    <h3>快件已发货</h3>
                    <p>2016-07-10 09:30</p>
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
