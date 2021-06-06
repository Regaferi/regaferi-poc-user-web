<template>
    <div style="margin-top: 12%;">
        <!-- PC -->
        <v-card v-show="!isMobile">
            <v-card-title>个人中心</v-card-title>
            <v-card-text>
                <v-tabs vertical>
                    <v-tab>
                        <v-icon left>
                            mdi-account
                        </v-icon>
                        {{$t('i18n.account.basic.title')}}
                    </v-tab>
                    <v-tab>
                        <v-icon left>
                            mdi-lock
                        </v-icon>
                        我的订单
                    </v-tab>
                    <v-tab-item>
                        <v-card
                                class="mx-auto"
                                max-width="344"
                                height="350"
                                flat
                        >
                            <!--   头像   -->
                            <!--<div class="pt-5 pb-5">
                                <v-avatar><v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"/></v-avatar>
                            </div>-->
                            <!--   基本信息   -->
                            <h3>{{userName.name}}</h3>
                            <p class="pt-2">email：{{userName.email}}</p>
                            <p class="pt-2">mobile：{{userName.mobile}}</p>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card max-width="344" height="350" class="mx-auto overflow-y-auto" flat>
                            <v-list height="450" class="overflow-y-auto">
                                <div v-for="(item,index) in orderList" :key="index">
                                    <v-card outlined>
                                        <v-list-item>
                                            <v-list-item-title>会員カード A</v-list-item-title>
                                            <v-list-item-title>订单号：{{item.code}}</v-list-item-title>
                                            <v-list-item-subtitle>2021.01.01-2021.06.30</v-list-item-subtitle>
                                            <v-list-item-subtitle>￥{{item.payment}}</v-list-item-subtitle>
                                            <v-list-item-subtitle>期限を限定して使用する</v-list-item-subtitle>
                                            <v-list-item-content>
                                                使用詳細
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-card>
                                    <div class="pt-2"/>
                                </div>
                            </v-list>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </v-card-text>
        </v-card>
        <div v-show="isMobile" class="pt-8 text-center align-center">
            <!--   头像   -->
<!--            <v-avatar><v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"/></v-avatar>-->
            <!--   基本信息   -->
            <v-card-subtitle>
                <h3>{{userName.name}}</h3>
                <p class="pt-2">email：{{userName.email}}</p>
                <p class="pt-2">mobile：{{userName.mobile}}</p>
            </v-card-subtitle>
            <v-divider/>
            <v-card-text>
                <h4 class="pb-3">私のカード券</h4>
                <v-list height="450" class="overflow-y-auto">
                    <div v-for="(item,index) in orderList" :key="index" @click="Details(item)">
                        <v-card outlined>
                            <v-list-item>
                                <v-list-item-title>会員カード A</v-list-item-title>
                                <v-list-item-title>订单号：{{item.code}}</v-list-item-title>
                                <v-list-item-subtitle>2021.01.01-2021.06.30</v-list-item-subtitle>
                                <v-list-item-subtitle>￥{{item.payment}}</v-list-item-subtitle>
                                <v-list-item-subtitle>期限を限定して使用する</v-list-item-subtitle>
                                <v-list-item-content>
                                    使用詳細
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                        <div class="pt-2"/>
                    </div>



                </v-list>
            </v-card-text>
            <van-button @click="tuiChu" type="danger">退出登录</van-button>
            <!--   我的订单   -->
        </div>
        <van-overlay :show="show">
            <div class="wrapper">
                <van-loading color="#1989fa" />
            </div>
        </van-overlay>
    </div>

</template>

<script>
import {memberDetail,orderList} from "@api";
    export default {
        name: "MemberCenter",
        data () {
            return {
                show:true,
                userName: {},
                isMobile : false,
                orderList:[],
            }
        },
        created() {

        },
        mounted() {
            this.isMobile = this.$store.state.isMobile;
            var that = this
            orderList({
            })
                .then(function (response) {
                    that.show = false
                    that.orderList = response.data
                    console.log(that.orderList,9999)
                })
                .catch(function (error) {
                    // this.$notify({ type: 'warning', message: '查询失败' });
                    console.log(error)
                });
            memberDetail({
            })
                .then(function (response) {

                    that.userName = response.data
                })
                .catch(function (error) {
                    // this.$notify({ type: 'warning', message: '查询失败' });
                    console.log(error)
                });
        },
        methods : {
            Details(val){
                this.$router.push({name:'details',query:{id:val.id}})
            },
            tuiChu(){
                this.$router.push({name:'home'})
                this.$store.commit('COMMIT_TOKEN','')
            }
        }
    }
</script>

<style scoped>
/deep/.v-list-item{
    align-items: center;
     display: block;
    flex: 1 1 100%;
    letter-spacing: normal;
    min-height: 48px;
    outline: none;
    padding: 0 16px;
    position: relative;
    text-decoration: none;
}
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>
