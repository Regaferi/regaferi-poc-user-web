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
                <h5>{{ product.subTitle }}</h5>
            </v-card-text>
 
 <v-divider/>
            <v-card-text @click="backToStore" style="color: black;font-size: 18px"><u>{{shopName}}</u></v-card-text>
                       <v-divider/>
            <v-card-text style="color: blue;font-size: 18px">メニュー説明</v-card-text>

            <!--  商品描述   -->
            <v-card-text style="font-size: 18px">
                <h5><pre>{{ brChange(product.description) }}</pre></h5>
            </v-card-text>
            <v-card-text style="font-size: 18px">
            <h5>所在地</h5>
                <h5>{{ product.address }}</h5>
            </v-card-text>

            <v-divider/>
            <!--  售卖规格   -->
            <v-card-text style="color: blue;font-size: 18px">メニュー内容</v-card-text>
            <v-card-text>
                <v-card outlined>
                    <v-row>
                        <v-col cols="8">
                            <v-list-item two-line>
                                <v-list-item-content>
                                    <v-list-item-title>{{product.name}}</v-list-item-title>
                                    <v-list-item-subtitle style="padding-top: 7px;">
                                       合計数： {{product.totalCount == null ? '回数無制限':product.totalCount + '回'}}
                                    </v-list-item-subtitle>
                                    <v-list-item-subtitle style="padding-top: 7px;">
                                       有効期間： {{product.serviceTimeDay}}日
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-col>
                        <v-col cols="4">
                      <v-list-item two-line>
                                <v-list-item-content>
                                    <v-list-item-title>{{product.prices}}円</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-col>
                    </v-row>
                </v-card>
                                           <p style="text-align: right;">価格は税込み表示です</p>
                               <v-card-subtitle>メニュー提供時間</v-card-subtitle>
            <v-chip-group column class="pl-5 pb-3">
                <v-chip x-small>{{Tiemllip(product.openTime)}}AM</v-chip>
                                <p style="padding-right:7px;">〜</p>
                <v-chip x-small >{{Tiemllip(product.closeTime)}}PM</v-chip>
            </v-chip-group>
                <div class="pt-2"/>

            </v-card-text>
        </div>
        <div style="padding: 5%">
            <van-button @click="naviTo" icon="revoke" type="info">
                戻る
            </van-button>
        </div>
        <v-bottom-navigation style="width:100%;background-color:  #45ae63 !important;" horizontal app>
            <v-btn color="#45ae63" style="width:100%;"  @click="navigateTo()">
                <span  style="color:white; font-size:15px">注文する</span>
                <v-icon style="color:white;" >mdi-check-outline</v-icon>
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
    import {service,shopId} from "@api"
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
                token:'',
                shopName:''
            }
        },
        mounted() {
            this.add()
        },
        created() {
            this.token = this.$store.state.token
        },
        methods : {
            backToStore(){
                this.$router.push({
                    name:'ShopDetails',
                    query:{id:this.product.shopId}
                })
            },
            naviTo(){
                this.$router.go(-1)
            },
            add(){
                var that = this
                service({
                    id:that.$route.query.id,
                })
                    .then((res)=> {
                        that.show = false
                        that.product = res.data
                        shopId({
                            id: res.data.shopId,
                        })
                            .then(function (response) {
                                that.shopName = response.data.title
                            })
                            .catch(function (error) {
                                Notify({type: 'warning', message: error.errMessage});
                            });
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
            Tiemllip(value) {
                if (!value) return ''
                return value.slice(0,5)
            },
            navigateTo : function (){

                this.$router.push({name : 'order-confirm', query: {'id': this.$route.query.id,}})
            },
             brChange(val){
            if(val!=null){
             val= val.replace(/<br>/g , '\n')
             }
             return val
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
     pre { 
white-space: pre-wrap; /*css-3*/ 
white-space: -moz-pre-wrap; /*Mozilla,since1999*/ 
white-space: -pre-wrap; /*Opera4-6*/ 
white-space: -o-pre-wrap; /*Opera7*/ 
word-wrap: break-word; /*InternetExplorer5.5+*/ 
} 
</style>
