<template>
    <div style="margin-top: 20%;">
        <a-descriptions bordered>
            <a-descriptions-item label="Product">
                Cloud Database
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
    </div>
</template>

<script>

    export default {
        data() {
            return {
                size: 'default',
            };
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
</style>
