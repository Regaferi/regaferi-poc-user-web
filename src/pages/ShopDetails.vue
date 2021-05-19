<template>
    <v-main style="overflow: hidden;position: relative">
        <!--  Banner  -->
        <div>
            <v-img max-height="200px" width="100%" src="../image/image-plp-recommend.jpg"></v-img>
        </div>
        <!--  商铺详情  -->
        <v-divider class="mx-4"></v-divider>
        <div style="position: absolute;margin:0 auto;width:95%;top: 75px;left: 2%;">
            <div style="border-radius: 10px;position: relative;background:#F5F5F5;padding: 10px;box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);">
                <div style="width: 70%;height: 41%;margin-bottom: 2%;border-bottom: 2px solid #676a6c;display: flex">
                    <h2 style="font-size: 25px;width: 65%;letter-spacing:5px;">{{StoreEllipsis('トマトスクランブル')}}</h2>
                    <span style="width: 35%;">
                    <span>8.8</span>
                    <van-rate size="10" color="#ffd21e" readonly  v-model="value" />
                    <h6 style="font-size: 2%">观众评分230人</h6>
                </span>
                    <van-image
                            round
                            style="border-radius: 10px;position: absolute;top: -17%;right: 2%;width: 28%;height: 53%"
                            src="https://img01.yzcdn.cn/vant/cat.jpeg"
                    />
                </div>

                <div style="width: 100%;height: 59%">
                    <div style="font-size: 2%;display: flex;margin-bottom: 2%">
                        <div style="width: 17%;font-size: 15px">
                            店铺介绍
                        </div>
                        <div style="width: 50%;height: 55px;">
                            {{ellipsis(title)}}
                        </div>
                    </div>
                    <div style="font-size: 2%;margin-bottom: 2%"> <van-icon name="clock-o" />
                        营业时间
                        <span style="margin : 0 2%">00：00：00 ~~ 00：00：00</span>
                        <span style="margin-right: 1%">更多信息</span>
                        <van-icon name="arrow" />
                    </div>
                    <div style="font-size: 2%;margin-bottom: 2%;letter-spacing:2px"> <van-icon name="location-o" />
                        {{Dzellip(diZhi)}}
                        <div style="margin-left: 5%;letter-spacing:2px">上海浦东新区世博大道1102号</div>
                    </div>
                </div>
            </div>
        </div>
        <!--轮播图-->
        <div style="margin-top: 140px">
            <van-swipe height="150" class="my-swipe" style="border-radius: 10px;width: 95%;margin-left: 2%" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(img ,index) in images" :key="index">
                    <img style="height: 100%" v-lazy="img" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <!--  List Detail  -->
        <div style="margin-top: 0">
            <van-tabs v-model="active">
                <van-tab title="服务">
                        <div :class=" divider == true ? '' : 'divader'" style="margin-bottom: 3%;">
                            <van-card
                                    style="border-radius: 10px;box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);width: 95%;margin-left: 2%"
                                    @click="navigateToPDP"
                                    v-for="(item, dex) in 5"
                                    :key="dex"
                                    price="271.00"
                                    desc="描述信息"
                                    title="商品标题"
                                    thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
                            >
                                <template #desc>
                                    <div>描述信息描述信息</div>
                                    <div>描述信息描述信息</div>
                                </template>
                            </van-card>

                        </div>
                    <div>
                        <van-divider v-show="divider" @click="divider = false"><van-icon name="arrow-up" />折叠</van-divider>
                        <van-divider v-show="!divider" @click="divider = true"><van-icon name="arrow-down" />展开</van-divider>
                    </div>
                </van-tab>
                <van-tab title="评论">内容 2</van-tab>
            </van-tabs>
        </div>

    </v-main>
</template>

<script>
    export default {
        name: "ProductList",
        data: () => ({
            divider:false,
            ifOver: false, // 文本是否超出三行，默认否
            unfold: false, // 文本是否是展开状态 默认为收起
            active: '服务',
            diZhi:'上海梅赛德斯奔驰文化中心（上海世博会）',
            value:3,
            title:'例示商品タイトル例示商品タイトル例示商品タイトル例示商品タイトル例示商品タイトル例示商品タイトル例示商品タイトル例示商品タイトル例示商品タイトル例示商品タイトル例示商品タイトル例示商品タイトル例示商品タイトル例示商品タイトル例示商品タイトル例示商品タイトル例示商品タイトル例示商品タイトル例示商品タイトル例示商品タイトル',
            images: [
                'https://cdn.vuetifyjs.com/images/cards/cooking.png',
                'https://cdn.vuetifyjs.com/images/cards/cooking.png',
            ],
            products : [
                {
                    title: '例示商品タイトル',
                    code: '1234',
                    subTitle: '例示商品副題',
                    description: '例示的な商品記述',
                    rating: 4.5,
                    image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
                },
                {
                    title: '例示商品タイトル',
                    code: '1234',
                    subTitle: '例示商品副題',
                    description: '例示的な商品記述',
                    rating: 4.5,
                    image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
                },
                {
                    title: '例示商品タイトル',
                    code: '1234',
                    subTitle: '例示商品副題',
                    description: '例示的な商品記述',
                    rating: 4.5,
                    image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
                },
                {
                    title: '例示商品タイトル',
                    code: '1234',
                    subTitle: '例示商品副題',
                    description: '例示的な商品記述',
                    rating: 4.5,
                    image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
                },
                {
                    title: '例示商品タイトル',
                    code: '1234',
                    subTitle: '例示商品副題',
                    description: '例示的な商品記述',
                    rating: 4.5,
                    image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
                },
                {
                    title: '例示商品タイトル',
                    code: '1234',
                    subTitle: '例示商品副題',
                    description: '例示的な商品記述',
                    rating: 4.5,
                    image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
                }
            ],
        }),
        mounted() {
        },
        methods: {
            navigateToPDP () {
                this.$router.push({name : 'product-detail'})
            },
            ellipsis (value) {
                if (!value) return ''
                if (value.length >40) {
                    return value.slice(0,40) + '...'
                }
                return value
            },
            StoreEllipsis (value) {
                if (!value) return ''
                if (value.length >9) {
                    return value.slice(0,9) + '...'
                }
                return value
            },
            Dzellip (value) {
                if (!value) return ''
                if (value.length >15) {
                    return value.slice(0,15) + '...'
                }
                return value
            },
            ClickStore(val){
                console.log(val)
                this.$router.push({name : 'ShopDetails'})
            },
        },
    }
</script>

<style scoped>
    .my-swipe .van-swipe-item img{
        width: 100%;
    }
    .divader{
        height: 150px;overflow: hidden
    }
</style>
