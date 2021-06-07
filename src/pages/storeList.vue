<template>
    <v-main style="overflow: hidden;">
        <!--  Banner  -->
        <div style="position: relative" ref="piediv">
            <!--      <div style="-->
            <!--      height: 300px;-->
            <!--      background-image: url('https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4253792690,4157255255&fm=224&gp=0.jpg')-->
            <!--      background-size: 100%;"-->
            <!--      />-->
            <!--          <img style="width: 100%;height: 250px" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4253792690,4157255255&fm=224&gp=0.jpg" alt="">-->
            <v-img max-height="200px" width="100%" src="../image/image-plp-recommend.jpg"></v-img>
        </div>
        <!--  Filter  -->
        <v-divider class="mx-4"></v-divider>

        <!--  List Detail  -->
        <!--<v-row class="pl-2 pr-2">
            <v-col cols="6" v-for="(product, key) in products" :key="key" @click="navigateToPDP(product.code)">
                <v-card>
                    <v-img height="180" :src="product.image"/>
                    <v-card-title>{{ product.title }}</v-card-title>
                    <v-card-text>
                        <v-row align="center" class="mx-0 pb-3">
                            <v-rating :value="product.rating" color="amber" dense half-increments readonly size="14"/>
                        </v-row>
                        <h6>{{ product.subTitle }}</h6>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>-->
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="load_more"
        >
            <van-empty v-if="products.length <= 0" description="暂无数据" />
        <div @click="ClickStore(product)" v-for="(product, key) in products" :key="key" style="margin-top: 5%;">
            <div style="width: 90%;
    margin: auto;
    ">
                <van-card
                        style="border-radius: 10px;"
                        desc="￥170/人"
                        :title="product.title"
                        :thumb="product.image"
                >
                    <template #tags>
                        营业时间：
                        <van-tag plain type="danger">{{product.openTime}}</van-tag>
                        <van-tag plain type="danger">{{product.closeTime}}</van-tag>
                    </template>
                    <template #num>
                        <span style="position: absolute;    right: 2%;top: 21%;">{{product.location}}</span>
                    </template>
                    <template #footer>
                        <div style="width: 100%;height: 100px;display: flex;">
                            <div style="width: 20%;height: 100%;"></div>
                            <div style="width: 20%;height: 100%;white-space: nowrap;overflow: hidden;margin: 1%" v-for="(item,index) in 4" :key="index">
                                <img style="height: 60%;width: 100%;border-radius:5%;" src="../image/image-plp-recommend.jpg" alt="">
                                <div style="height: 40%;width: 100%;text-align: center">
                                    <div style="width: 100%;height: 50%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;  ">
                                        [人气单品]爆款</div>
                                    <div style="width: 100%;height: 50%;color: #ffd01e">￥999</div>
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
    import { shopIndex } from "@api";
    export default {
        name: "ProductList",
        data: () => ({
            loading: false,
            finished: false,
            page: 1,//页数
            limit: 15,//条数
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
            console.log(that.$route.query.location,'55555555555555555555')
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
                    that.$notify({ type: 'warning', message: error.errMessage });
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
                        type:2,
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
</style>
