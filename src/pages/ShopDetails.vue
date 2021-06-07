<template>
    <v-main style="overflow: hidden;position: relative">
        <!--  Banner  -->
        <div style="position: relative">
            <v-img max-height="200px" width="100%" src="../image/image-plp-recommend.jpg"></v-img>

            <div style="position: absolute;margin:0 auto;width:95%;top: 80%;left: 2%;    z-index: 1;">

                <div style="border-radius: 10px;position: relative;background:#F5F5F5;padding: 10px;box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);">
                    <div style="width: 100%;height: 100%;margin-bottom: 2%;border-bottom: 2px solid #676a6c;display: flex">
                        <h2 style="font-size: 25px;width: 100%;">{{StoreEllipsis(details.title)}}</h2>
                    </div>

                    <div style="width: 100%;height: 59%">
                        <div style="font-size: 2%;display: flex;margin-bottom: 2%">

                            <div style="width: 100%;height: 55px;" v-html="ellipsis(details.description)">
                            </div>
                        </div>
                        <div style="font-size: 2%;margin-bottom: 2%"> <van-icon name="clock-o" />
                            营业时间
                            <span style="margin : 0 2%">{{details.openTime}} ~~ {{details.closeTime}}</span>
<!--                            <span style="margin-right: 1%">更多信息</span>-->
<!--                            <van-icon name="arrow" />-->
                        </div>
                        <div style="font-size: 2%;margin-bottom: 2%;letter-spacing:2px"> <van-icon name="location-o" />
                            {{Dzellip(details.location)}}
<!--                            <div style="margin-left: 5%;letter-spacing:2px">上海浦东新区世博大道1102号</div>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--  商铺详情  -->
        <v-divider class="mx-4"></v-divider>

        <!--轮播图-->
        <div style="margin-top: 12rem;">
            <van-empty v-if="images.length <= 0" description="暂无数据" />
            <van-swipe v-if="images.length > 0" height="250" class="my-swipe" style="border-radius: 10px;width: 95%;margin-left: 2%" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(img ,index) in images" :key="index">
                    <img style="height: 100%" v-lazy="img" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <!--  List Detail  -->
        <div style="margin-top: 0">
            <van-tabs v-model="active">
                <van-tab title="服务">
                        <div v-if="products.length > 0" :class=" divider == true ? '' : 'divader'" style="margin-bottom: 3%;">
                            <van-card
                                    style="border-radius: 10px;box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);width: 95%;margin-left: 2%"
                                    @click="navigateToPDP(item)"
                                    v-for="(item, dex) in products"
                                    :key="dex"
                                    :price="item.prices"
                                    :desc="item.title"
                                    :title="item.name"
                                    thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
                            >
                                <template #desc>
                                    <div>{{item.subTitle}}</div>
                                    <textarea style="    width: 100%;" readonly :placeholder="item.description"></textarea>
                                </template>
                            </van-card>

                        </div>
                    <div v-if="products.length > 2">
                        <van-divider v-show="divider" @click="divider = false"><van-icon name="arrow-up" />折叠</van-divider>
                        <van-divider v-show="!divider" @click="divider = true"><van-icon name="arrow-down" />展开</van-divider>
                    </div>
                </van-tab>
                <van-tab title="评论">

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
                                                label="评论"
                                                readonly
                                                type="textarea"
                                                :placeholder="item.comment"
                                                show-word-limit
                                        />
                                        <van-field
                                                rows="2"
                                                autosize
                                                readonly
                                                label="回复"
                                                type="textarea"
                                                :placeholder="item.reply"
                                                show-word-limit
                                        />
                                        <van-divider
                                                :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
                                        >
                                        </van-divider>
                                    </div>
                                </div>

                                <div v-if="items.length > 2">
                                    <van-divider v-show="dividers" @click="dividers = false"><van-icon name="arrow-up" />隐藏评论</van-divider>
                                    <van-divider v-show="!dividers" @click="dividers = true"><van-icon name="arrow-down" />
                                        {{items.length}}条评论</van-divider>
                                </div>
                            </v-card>
                        </v-col>

                    </v-row>
                   <div v-if="token" style="margin: auto;width: 90%">
                           <van-field
                                   v-model="message"
                                   rows="2"
                                   autosize
                                   label="评论"
                                   type="textarea"
                                   maxlength="100"

                                   placeholder="请输入评论"
                                   show-word-limit
                           >
                               <template #button>
                                   <van-button style="float: right" @click="pinLun" round type="info">发送</van-button>
                               </template>
                           </van-field>

                       </div>
                </van-tab>
            </van-tabs>
        </div>
        <van-overlay :show="show">
            <div class="wrapper">
                <van-loading color="#1989fa" />
            </div>
        </van-overlay>
    </v-main>
</template>

<script>
    import {shopId,serviceShop,comment,commentPinlun} from "@api"
    export default {
        name: "ProductList",
        data: () => ({
            message:'',
            show:true,
            divider:false,
            dividers:false,
            ifOver: false, // 文本是否超出三行，默认否
            unfold: false, // 文本是否是展开状态 默认为收起
            active: '服务',
            value:3,
            images: [],
            items: [],
            products : [],
            details:{},
            token:''
        }),

        mounted() {

        },
        created() {
            this.token = this.$store.state.token
            var that = this
            comment({
                serviceId:that.$route.query.id,
            })
                .then(function (response) {
                    that.items = response.data
                    that.show = false
                })
                .catch(function (error) {
                    that.$notify({ type: 'warning', message: error.errMessage });
                });
            serviceShop({
                shopId:that.$route.query.id,
            })
                .then(function (response) {
                    that.products = response.data

                    that.show = false
                })
                .catch(function (error) {
                    that.$notify({ type: 'warning', message: error.errMessage });
                });
            shopId({
                id:that.$route.query.id,
            })
                .then(function (response) {
                    that.details = response.data
                    response.data.imageUrls.forEach(ele=>{
                        if(ele.type == 'BANNER'){
                            that.images.push(ele.target)
                        }
                    })
                    that.show = false
                })
                .catch(function (error) {
                    that.$notify({ type: 'warning', message: error.errMessage });
                });
        },
        methods: {
            pinLun(){

                // console.log(this.$store.state.token)
                if(this.message == ''){
                    return
                }
                var that = this

                commentPinlun({
                    serviceId:that.$route.query.id,
                    star:5,
                    comment:that.message
                })
                    .then((res)=> {
                        console.log(res)
                        that.message = ''
                        comment({
                            serviceId:that.$route.query.id,
                        })
                            .then(function (response) {
                                that.items = response.data

                            })
                            .catch(function (error) {
                                that.$notify({ type: 'warning', message: error.errMessage });
                            });
                    })
                    .catch(function (error) {
                        that.$notify({ type: 'warning', message: error.errMessage });
                    });
            },
            navigateToPDP (val) {
                this.$router.push({name : 'product',query:{id:val.id}})
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
                if (value.length >12) {
                    return value.slice(0,12) + '...'
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
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
</style>
