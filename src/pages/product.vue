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
                    <img style="height: 100%;width: 100%;" v-lazy="slide" />
                </v-carousel-item>
            </v-carousel>
            <!--  商品基本信息   -->
            <v-row>
                <v-col cols="10"><v-card-title>{{ product.name }}</v-card-title></v-col>
<!--                <v-col cols="2"><v-icon class="pt-5">mdi-heart</v-icon></v-col>-->
            </v-row>

            <v-card-text>
<!--                <v-row align="center" class="mx-0 pb-3">-->
<!--                    <v-rating :value="product.rating" color="amber" dense half-increments readonly size="14"/>-->
<!--                </v-row>-->
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
            <v-card-subtitle>使用说明</v-card-subtitle>
            <v-card-text>
                <v-card outlined>
                    <v-row>
                        <v-col cols="8">
                            <v-list-item two-line>
                                <v-list-item-content>
                                    <v-list-item-title>{{product.subTitle}}</v-list-item-title>
                                    <v-list-item-subtitle>
                                       总次数： {{product.totalCount}}次
                                    </v-list-item-subtitle> <v-list-item-subtitle>
                                       服务时长： {{product.serviceTimeDay}}天
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-col>
                        <v-col cols="4">
                            <h4 class="pt-5">{{product.prices}}</h4>
                        </v-col>
                    </v-row>
                </v-card>
                <div class="pt-2"/>

            </v-card-text>

            <v-divider/>
            <!--  商品评价   -->
            <v-card-subtitle>服务評価</v-card-subtitle>


            <v-card>
                <v-list two-line :class=" dividers == true ? '' : 'divader'">
                    <template v-for="(item, index) in commentJson">
                        <v-subheader
                                v-if="item.header"
                                :key="item.header"
                        >
                            {{ item.header }}
                        </v-subheader>
                        <v-divider
                                v-else-if="item.divider"
                                :key="index"
                                :inset="item.inset"
                        ></v-divider>
                        <v-list-item
                                v-else
                                :key="item.title"
                        >
                            <!--                                            <v-list-item-avatar>-->
                            <!--                                                <img :src="item.avatar">-->
                            <!--                                            </v-list-item-avatar>-->
                            <v-list-item-content>
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
                                        v-if="item.reply"
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
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </v-list>
                <div v-if="commentJson.length > 2">
                    <van-divider v-show="dividers" @click="dividers = false"><van-icon name="arrow-up" />隐藏评论</van-divider>
                    <van-divider v-show="!dividers" @click="dividers = true"><van-icon name="arrow-down" />更多评论</van-divider>
                </div>
            </v-card>
            <div v-if="token" style="margin-top: 10px;">
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
    import { Notify } from 'vant';
    import {service,comment,commentPinlun} from "@api"
    export default {
        name: "PDP",
        data() {
            return {
                message:'',
                show:true,
                dividers:false,
                product : '',
                colors: [
                    'indigo',
                    'warning',
                    'pink darken-2',
                    'red lighten-1',
                    'deep-purple accent-4',
                ],
                slides: [],
                commentJson:[],
                token:''
            }
        },
        mounted() {
            this.add()
            this.commentAdd()
        },
        created() {
            this.token = this.$store.state.token
        },
        methods : {
            pinLun(){
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
                        that.commentAdd()
                    })
                    .catch(function (error) {
                        Notify({ type: 'warning', message: error.errMessage });
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
                        Notify({ type: 'warning', message: error.errMessage });
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
                        res.data.imageUrls.forEach(ele=>{
                            if(ele.type == 'BANNER' ){
                                that.slides.push(ele.target)
                            }
                        })

                    })
                    .catch(function (error) {
                        Notify({ type: 'warning', message: error.errMessage });
                    });
            },
            navigateTo : function (){
                
                this.$router.push({name : 'order-confirm', query: {'id': this.$route.query.id,}})


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
    .divader{
        height: 150px;overflow: hidden
    }
</style>
