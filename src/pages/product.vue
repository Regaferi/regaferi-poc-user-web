<template>
    <v-main style="overflow: hidden">
        <div>
            <!--  商品轮播图   -->
            <v-carousel
                    cycle
                    height="260"
                    hide-delimiter-background
                    hide-delimiters
                    show-arrows-on-hover
            >
                <v-carousel-item
                        v-for="(slide, i) in slides"
                        :key="i"
                        reverse-transition="fade-transition"
                        transition="fade-transition"
                >
                    <v-sheet
                            :color="colors[i]"
                            height="100%"
                    >
                        <v-row
                                class="fill-height"
                                align="center"
                                justify="center"
                        >
                            <div class="display-3">
                                {{ slide }} Slide
                            </div>
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>
            <!--  商品基本信息   -->
            <v-row>
                <v-col cols="10"><v-card-title>{{ product.name }}</v-card-title></v-col>
                <v-col cols="2"><v-icon class="pt-5">mdi-heart</v-icon></v-col>
            </v-row>

            <v-card-text>
                <v-row align="center" class="mx-0 pb-3">
                    <v-rating :value="product.rating" color="amber" dense half-increments readonly size="14"/>
                </v-row>
                <h6>{{ product.subTitle }}</h6>
            </v-card-text>
            <v-divider/>
            <v-card-subtitle>営業時間.</v-card-subtitle>
            <v-chip-group column class="pl-5 pb-3">
                <v-chip x-small>{{product.openTime}}PM</v-chip>
                <v-chip x-small>{{product.closeTime}}PM</v-chip>
            </v-chip-group>
            <v-divider/>
            <!--  售卖规格   -->
            <v-card-subtitle>販売仕様.</v-card-subtitle>
            <v-card-text>
                <v-card outlined>
                    <v-row>
                        <v-col cols="8">
                            <v-list-item two-line>
                                <v-list-item-content>
                                    <v-list-item-title>セットメニュー. A</v-list-item-title>
                                    <v-list-item-subtitle>
                                        ABCDE
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-col>
                        <v-col cols="4">
                            <h4 class="pt-5">$500</h4>
                        </v-col>
                    </v-row>
                </v-card>
                <div class="pt-2"/>
                <v-card outlined>
                    <v-row>
                        <v-col cols="8">
                            <v-list-item two-line>
                                <v-list-item-content>
                                    <v-list-item-title>セットメニュー. A</v-list-item-title>
                                    <v-list-item-subtitle>
                                        ABCDE
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-col>
                        <v-col cols="4">
                            <h4 class="pt-5">$500</h4>
                        </v-col>
                    </v-row>
                </v-card>
            </v-card-text>

            <v-divider/>
            <!--  商品评价   -->
            <v-card-subtitle>服务評価</v-card-subtitle>

            <v-list-item v-for="(item , index) in commentJson" :key="index">
                <v-list-item-avatar>
                    <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"/>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>客.客 A</v-list-item-title>
                    <v-list-item-subtitle>
                        {{item.comment}}
                    </v-list-item-subtitle>
                    <span style="width: 100%;border: thin solid rgba(0, 0, 0, 0.12);border-radius: 4px;padding: 5px;height: 10%">
                        {{item.reply}}
                    </span>
                </v-list-item-content>
            </v-list-item>
            <van-field
                    v-model="message"
                    rows="2"
                    autosize
                    label="评论"
                    type="textarea"
                    maxlength="50"
                    placeholder="请输入评论"
                    show-word-limit
            />
            <van-button @click="pinLun"  style="float: right" round type="info">发送</van-button>
            <v-card-text style="color: blue">もっと見る</v-card-text>
            <v-divider/>
            <!--  商品描述   -->
            <v-card-text>
                <h6>{{ product.description }}</h6>
            </v-card-text>
        </div>

        <v-bottom-navigation color="primary" horizontal app>
            <v-btn @click="naviTo()">
                <span>返回</span>
<!--                <v-icon>mdi-face-agent</v-icon>-->
            </v-btn>
            <v-divider
                    class="mx-4"
                    vertical
            ></v-divider>
            <v-btn @click="navigateTo()">
                <span>下单</span>
                <v-icon>mdi-check-outline</v-icon>
            </v-btn>
        </v-bottom-navigation>
        <van-overlay :show="show">
            <div class="wrapper">
                <van-loading color="#1989fa" />
            </div>
        </van-overlay>
    </v-main>
</template>

<script>
    import {service,comment,commentPinlun} from "@api"
    export default {
        name: "PDP",
        data() {
            return {
                message:'',
                show:true,
                product : '',
                colors: [
                    'indigo',
                    'warning',
                    'pink darken-2',
                    'red lighten-1',
                    'deep-purple accent-4',
                ],
                slides: [
                    'First',
                    'Second',
                    'Third',
                    'Fourth',
                    'Fifth',
                ],
                commentJson:[],
            }
        },
        mounted() {
            this.add()
            this.commentAdd()
        },
        created() {

        },
        methods : {
            pinLun(){
                var that = this
                commentPinlun({
                    serviceId:that.$route.query.id,
                    star:5,
                    comment:that.message
                })
                    .then((res)=> {
                        console.log(res)
                        that.commentAdd()
                    })
                    .catch(function (error) {
                        that.$notify({ type: 'warning', message: error.errMessage });
                    });
            },
            naviTo(){
                this.$router.go(-1)
            },
            commentAdd(){
                var that = this
                comment({
                    serviceId:that.$route.query.id,
                })
                    .then((res)=> {
                        console.log(res)
                        that.commentJson = res.data
                    })
                    .catch(function (error) {
                        that.$notify({ type: 'warning', message: error.errMessage });
                    });
            },
            add(){
                var that = this
                service({
                    id:that.$route.query.id,
                })
                    .then((res)=> {
                        that.show = false
                        that.product = res.data
                    })
                    .catch(function (error) {
                        that.$notify({ type: 'warning', message: error.errMessage });
                    });
            },
            navigateTo : function (){
                this.$router.push({name : 'order-confirm', query: {'code': this.$route.query.id}})


            }
        }
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
