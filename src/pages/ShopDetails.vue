<template>
    <v-main style="overflow: hidden;position: relative">
        <!--  Banner  -->
        <div style="position: relative">
            <v-img max-height="20%" width="100%" src="../image/image-plp-recommend.jpg"></v-img>
        </div>
        <!--轮播图-->
        <div>
            <van-empty v-if="images.length <= 0" description="別のキーワードを試すか、検索フィルターを削除してください"/>
            <van-swipe v-if="images.length > 0" height="250" class="my-swipe"
                       style="border-radius: 10px;width: 95%; margin-top: 2%;margin-left: 2%" :autoplay="3000"
                       indicator-color="white">
                <van-swipe-item v-for="(img ,index) in images" :key="index">
                    <img style="height: 100%" v-lazy="img"/>
                </van-swipe-item>
            </van-swipe>
        </div>
        <!--  商铺详情  -->
        <v-divider class="mx-4"></v-divider>

        <div style="margin:0 auto;width:95%;padding: 2% 0;">

            <div style="border-radius: 10px;position: relative;background:#F5F5F5;padding: 10px;box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);">
                <div style="width: 100%;height: 100%;margin-bottom: 2%;border-bottom: 2px solid #676a6c;display: flex">
                    <h2 style="font-size: 25px;width: 100%;">{{StoreEllipsis(details.title)}}</h2>
                </div>
                <div style="width: 100%;height: 59%">
                    <div style="font-size: 2%;display: flex;margin-bottom: 2%">

                        <div style="width: 100%;height: 20%;font-size: 15px">
                            <pre>{{brChange(details.description)}}</pre>
                        </div>
                    </div>
                    <div style="font-size: 2%;margin-bottom: 2%;font-size: 15px">
                        <van-icon name="clock-o"/>
                        営業時間
                        <span style="margin : 0 2%;font-size: 15px">{{Tiemllip(details.openTime)}} ~~ {{Tiemllip(details.closeTime)}}</span>
                    </div>
                    <div style="font-size: 2%;margin-bottom: 2%;letter-spacing:2px">

                        <div style="letter-spacing:2px;font-size: 15px">
                            <van-icon name="location-o"/>
                            {{(details.location)}}
                        </div>
                    </div>
                    <div style="font-size: 2%;margin-bottom: 2%;letter-spacing:2px">

                        <div style="letter-spacing:2px;font-size: 15px">
                            <van-icon name="location-o"/>
                            {{Dzellip(details.address)}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--  List Detail  -->
        <div style="margin-top: 0">
            <van-tabs v-model="active">
                <van-tab title="メニュー">
                    <!--                    :class=" divider == true ? '' : 'divader'"-->
                    <div v-if="products.length > 0" style="margin-bottom: 3%;">
                        <van-card
                                style="border-radius: 10px;box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);width: 95%;margin-left: 2%"
                                @click="navigateToPDP(item)"
                                v-for="(item, dex) in products"
                                :key="dex"
                                :desc="item.title"
                                :title="item.name"
                                :thumb="item.logoImage.target"
                        >
                            <template #price>
                                <div style="font-size: 16px; font-family: Avenir-Heavy,PingFang SC,Helvetica Neue,Arial,sans-serif;">{{item.prices}} 円</div>
                            </template>
                            <template #desc>
                                <div style="padding-top:10px">{{item.subTitle}}</div>
                            </template>
                        </van-card>

                    </div>
                    <!--<div v-if="products.length > 1">
                        <van-divider v-show="divider" @click="divider = false"><van-icon name="arrow-up" />折りたたむ</van-divider>
                        <van-divider v-show="!divider" @click="divider = true"><van-icon name="arrow-down" />展開する</van-divider>
                    </div>-->
                </van-tab>
                <van-tab title="ストアレビュー">

                    <v-row>
                        <v-col
                                cols="12"
                                sm="6"
                                offset-sm="3"

                        >
                            <v-card>
                                <div :class=" dividers == true ? '' : 'divader'">
                                    <div v-for="(item, index) in items" :key="index">
                                        <van-field
                                                rows="2"
                                                autosize
                                                readonly
                                                type="textarea"
                                                :value="item.comment"
                                                show-word-limit
                                        />
                                        <div v-if="item.delete == true" @click="commDel(item.id)"
                                             style="color: red;float: right;margin-right: 5%;">
                                            削除
                                        </div>
                                        <van-field
                                                v-if="item.reply"
                                                rows="2"
                                                autosize
                                                readonly
                                                label="返信"
                                                type="textarea"
                                                :placeholder="item.reply"
                                                show-word-limit
                                        />
                                        <van-rate v-model="item.star"
                                                  style="float: right;margin-right: 5%;"
                                                  :size="10"
                                                  readonly
                                                  color="#ffd21e"
                                                  void-icon="star"
                                                  void-color="#eee"
                                        />
                                        <van-divider
                                                :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
                                        >
                                        </van-divider>
                                    </div>
                                </div>

                                <div v-if="items.length > 1">
                                    <van-divider v-show="dividers" @click="dividers = false">
                                        <van-icon name="arrow-up"/>
                                        コメントを隠す
                                    </van-divider>
                                    <van-divider v-show="!dividers" @click="dividers = true">
                                        <van-icon name="arrow-down"/>
                                        {{items.length}}コメント
                                    </van-divider>
                                </div>
                            </v-card>
                        </v-col>

                    </v-row>

                    <div v-if="idcomment" style="padding-top:88px;margin: auto;width: 90%">
                                        <van-rate v-model="value"
                                  :size="20"
                                  color="#ffd21e"
                                  void-icon="star"
                                  void-color="#eee"
                        />
                        <van-field
                                v-model="message"
                                rows="2"
                                autosize
                                type="textarea"
                                maxlength="100"

                                placeholder="レビューを入力してください"
                                show-word-limit
                        >
                            <template #button>
                                <van-button style="float: right" @click="pinLun" round type="info">送信</van-button>
                            </template>
                        </van-field>


                    </div>
                </van-tab>

            </van-tabs>
        </div>
        <van-overlay :show="show">
            <div class="wrapper">
                <van-loading color="#1989fa"/>
            </div>
        </van-overlay>
    </v-main>
</template>

<script>
    import {Notify} from 'vant';
    import {shopId, serviceShop, comment, commentPinlun, commentDel, isComment} from "@api"

    export default {
        name: "ProductList",
        data: () => ({
            message: '',
            show: true,
            divider: false,
            dividers: false,
            ifOver: false, // 文本是否超出三行，默认否
            unfold: false, // 文本是否是展开状态 默认为收起
            active: 'サービス',
            value: 4,
            images: [],
            items: [],
            products: [],
            details: {},
            idcomment: false
        }),

        mounted() {

        },
        created() {
            var that = this
            isComment({
                shopId: that.$route.query.id,
            })
                .then(function (response) {
                    that.idcomment = response.data
                })
                .catch(function (error) {
                    Notify({type: 'warning', message: error.errMessage});
                });
            comment({
                shopId: that.$route.query.id,
            })
                .then(function (response) {
                    that.items = response.data
                    that.show = false
                })
                .catch(function (error) {
                    Notify({type: 'warning', message: error.errMessage});
                });
            serviceShop({
                shopId: that.$route.query.id,
            })
                .then(function (response) {
                    that.products = response.data
                    that.show = false
                })
                .catch(function (error) {
                    Notify({type: 'warning', message: error.errMessage});
                });
            shopId({
                id: that.$route.query.id,
            })
                .then(function (response) {
                    that.details = response.data
                    response.data.imageUrls.forEach(ele => {
                        if (ele.type == 'BANNER') {
                            that.images.push(ele.target)
                        }
                    })
                    that.show = false
                })
                .catch(function (error) {
                    Notify({type: 'warning', message: error.errMessage});
                });
        },
        methods: {
            commDel(id) {
                var that = this
                commentDel(id)
                    .then((res) => {
                        Notify({type: 'success', message: '削除されました！'});
                        comment({
                            shopId: that.$route.query.id,
                        })
                            .then(function (response) {
                                that.items = response.data
                                that.show = false
                            })
                            .catch(function (error) {
                                Notify({type: 'warning', message: error.errMessage});
                            });
                        console.log(res)
                    }).catch(function (error) {
                    Notify({type: 'warning', message: error.errMessage});
                });
            },
            pinLun() {

                // console.log(this.$store.state.token)
                if (this.message == '') {
                    return
                }
                var that = this

                commentPinlun({
                    shopId: that.$route.query.id,
                    star: that.value,
                    comment: that.message
                })
                    .then((res) => {
                        console.log(res)
                        that.message = ''
                        comment({
                            shopId: that.$route.query.id,
                        })
                            .then(function (response) {
                                that.items = response.data

                            })
                            .catch(function (error) {
                                Notify({type: 'warning', message: error.errMessage});
                            });
                    })
                    .catch(function (error) {
                        Notify({type: 'warning', message: error.errMessage});
                    });
            },
            navigateToPDP(val) {
                this.$router.push({name: 'product', query: {id: val.id}})
            },
            StoreEllipsis(value) {
                if (!value) return ''
                if (value.length > 12) {
                    return value.slice(0, 12) + '...'
                }
                return value
            },
            Dzellip(value) {
                if (!value) return ''
                if (value.length > 15) {
                    return value.slice(0, 15) + '...'
                }
                return value
            },
            Tiemllip(value) {
                if (!value) return ''
                return value.slice(0,5)
            },
            ClickStore(val) {
                console.log(val)
                this.$router.push({name: 'ShopDetails'})
            },
            brChange(val){
            if(val!=null){
             val= val.replace(/<br>/g , '\n')
             }
             return val
            }
        },
    }
</script>

<style scoped>
    .my-swipe .van-swipe-item img {
        width: 100%;
    }

    .divader {
        height: 150px;
        overflow: hidden
    }

    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
 pre { 
white-space: pre-wrap; /*css-3*/ 
white-space: -moz-pre-wrap; /*Mozilla,since1999*/ 
white-space: -pre-wrap; /*Opera4-6*/ 
white-space: -o-pre-wrap; /*Opera7*/ 
word-wrap: break-word; /*InternetExplorer5.5+*/ 
} 

</style>
