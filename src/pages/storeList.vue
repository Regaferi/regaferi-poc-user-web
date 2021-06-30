<template>
    <v-main style="overflow: hidden;">
        <!--  Banner  -->
        <div style="position: relative" ref="piediv">
            <v-img max-height="20%" width="100%" src="../image/image-plp-recommend.jpg"></v-img>
        </div>
        <!--  Filter  -->
        <v-divider class="mx-4"></v-divider>
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text=""
                @load="load_more"
        >
            <van-empty v-if="products.length <= 0" description="現在有効期間中のサブスクはありません" />
        <div @click="ClickStore(product)" v-for="(product, key) in products" :key="key" style="margin: 2% 0;">
            <div style="width: 90%;
    margin: auto;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    ">
                <van-card
                        style="border-radius: 10px;"
                        :title="product.title"
                        :thumb="product.image"
                >
                    <template #tags>
                        営業時間：
                        <van-tag plain type="danger">{{product.openTime}}</van-tag>
                        <van-tag plain type="danger">{{product.closeTime}}</van-tag>
                    </template>
                    <template #num>
                        <span style="position: absolute;    right: 2%;top: 21%;"><van-icon name="location-o" /> {{product.location}}</span>
                    </template>
                    <template #footer>
                        <div style="width: 100%;display: flex;">
                            <div style="width: 20%;height: 100%;"></div>
                            <div style="width: 20%;height: 100%;white-space: nowrap;overflow: hidden;margin-right: 1%" v-for="(item,index) in product.serviceResponses" :key="index">
                                <van-image style="height: 60%;width: 100%;border-radius:5%;" :src="item.logoImage.target" alt=""/>
                                <div style="height: 40%;width: 100%;text-align: center">
                                    <div style="width: 100%;height: 50%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;  ">
                                        {{item.name}}</div>
                                    <div style="width: 100%;height: 50%;color: #ffd01e">{{item.prices}}</div>
                                </div>
                            </div>
                        </div>
                    </template>
                </van-card>
            </div>


        </div>
        </van-list>
        <van-overlay :show="show">
            <div class="wrapper">
                <van-loading color="#1989fa" />
            </div>
        </van-overlay>
    </v-main>
</template>

<script>
    import { Notify } from 'vant';
    import { shopIndex } from "@api";
    export default {
        name: "ProductList",
        data: () => ({
            loading: false,
            finished: false,
            page: 1,//页数
            limit: 10,//条数
            show : true,
            areaFilter : false,
            typeFilter : false,
            sortFilter : false,
            fields : {
                area : [
                    {
                        key : '東京',
                        value : 1
                    },
                    {
                        key : '大阪',
                        value : 2
                    },
                    {
                        key : '京西.',
                        value : 3
                    },
                ],
                type : [
                    {
                        key : '焼肉を焼く',
                        value : 1
                    },
                    {
                        key : '飲み物.飲み物',
                        value : 2
                    },
                    {
                        key : 'コーヒー.コーヒー',
                        value : 3
                    },
                ],
                sort : [
                    {
                        key : '売り上げごとに',
                        value : 1
                    },
                    {
                        key : '値段によって.',
                        value : 2
                    },
                    {
                        key : '距離を押す',
                        value : 3
                    },
                ]
            },
            products : [],
            radioGroup: 1,
        }),
        created() {
            var that = this
            shopIndex({
                keyword:that.$route.query.input,
                type:1,
                pageIndex:0,
                pageSize:10,
                location:that.$route.query.location
            })
                .then(function (response) {
                    that.products = response.data
                    that.show = false
                })
                .catch(function (error) {
                    Notify({ type: 'warning', message: error.errMessage });
                });
        },
        methods: {
            load_more: function() {
                this.page += 1;//页数+1
                this.onLoad();
            },
                onLoad() {
                    var that = this

                    shopIndex({
                        keyword:that.$route.query.input,
                        type:1,
                        pageIndex:that.page,
                        pageSize:that.limit,
                        location:that.$route.query.location,
                    })
                        .then(function (response){
                            that.show = false
                                // 加载状态结束
                                that.loading = false;
                                that.products = that.products.concat(response.data);//追加数据
                                if (response.data.length == 0) {  //数据全部加载完成
                                    that.finished = true;
                                }else{
                                    that.finished = false;
                                }
                        })
            },
            ClickStore(val){
                console.log(val)
                this.$router.push({name : 'ShopDetails',query:{id:val.id}})
            },
            reserve () {
                this.loading = true
                setTimeout(() => (this.loading = false), 2000)
            },
            navigateToPDP (itemCode) {
                this.$router.push({name : 'product', params: {'code': itemCode}})
            }
        },
    }
</script>

<style scoped>
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    .van-card__content {
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        min-width: 0;
        min-height: 44px;
    }
    .van-card__title {
        max-height: 32px;
        font-weight: 500;
        line-height: 21px;
        font-size: 17px;
    }
</style>
