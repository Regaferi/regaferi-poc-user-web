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
                            <div class="pt-5 pb-5">
                                <v-avatar><v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"/></v-avatar>
                            </div>
                            <!--   基本信息   -->
                            <h3>顾客昵称</h3>
                            <p class="pt-2">{{userName.name}}</p>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card max-width="344" height="350" class="mx-auto overflow-y-auto" flat>
                            <v-list>
                                <v-row>
                                    <v-col cols="12">
                                        <v-card outlined>
                                            <v-card-text>
                                                <p>会员卡 A</p>
                                                <p>2021.01.01-2021.06.30</p>
                                                <p>限定期限使用</p>
                                                <p>使用详情</p>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-card outlined>
                                            <v-card-text>
                                                <p>会员卡 A</p>
                                                <p>2021.01.01-2021.06.30</p>
                                                <p>限定期限使用</p>
                                                <p>使用详情</p>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-card outlined>
                                            <v-card-text>
                                                <p>会员卡 A</p>
                                                <p>2021.01.01-2021.06.30</p>
                                                <p>限定期限使用</p>
                                                <p>使用详情</p>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-list>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </v-card-text>
        </v-card>
        <div v-show="isMobile" class="pt-8 text-center align-center">
            <!--   头像   -->
            <v-avatar><v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"/></v-avatar>
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
                    <v-card outlined>
                        <v-list-item>
                            <v-list-item-title>会員カード A</v-list-item-title>
                            <v-list-item-subtitle>2021.01.01-2021.06.30</v-list-item-subtitle>
                            <v-list-item-subtitle>期限を限定して使用する</v-list-item-subtitle>
                            <v-list-item-content>
                                使用詳細
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                    <div class="pt-2"/>
                    <v-card outlined>
                        <v-list-item>
                            <v-list-item-title>会員カード A</v-list-item-title>
                            <v-list-item-subtitle>2021.01.01-2021.06.30</v-list-item-subtitle>
                            <v-list-item-subtitle>期限を限定して使用する</v-list-item-subtitle>
                            <v-list-item-content>
                                使用詳細
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                    <div class="pt-2"/>
                    <v-card outlined>
                        <v-list-item>
                            <v-list-item-title>会員カード A</v-list-item-title>
                            <v-list-item-subtitle>2021.01.01-2021.06.30</v-list-item-subtitle>
                            <v-list-item-subtitle>期限を限定して使用する</v-list-item-subtitle>
                            <v-list-item-content>
                                使用詳細
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                    <div class="pt-2"/>
                    <v-card outlined>
                        <v-list-item>
                            <v-list-item-title>会員カード A</v-list-item-title>
                            <v-list-item-subtitle>2021.01.01-2021.06.30</v-list-item-subtitle>
                            <v-list-item-subtitle>期限を限定して使用する</v-list-item-subtitle>
                            <v-list-item-content>
                                使用詳細
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                    <div class="pt-2"/>
                    <v-card outlined>
                        <v-list-item>
                            <v-list-item-title>会員カード A</v-list-item-title>
                            <v-list-item-subtitle>2021.01.01-2021.06.30</v-list-item-subtitle>
                            <v-list-item-subtitle>期限を限定して使用する</v-list-item-subtitle>
                            <v-list-item-content>
                                使用詳細
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                    <div class="pt-2"/>
                    <v-card outlined>
                        <v-list-item>
                            <v-list-item-title>会員カード A</v-list-item-title>
                            <v-list-item-subtitle>2021.01.01-2021.06.30</v-list-item-subtitle>
                            <v-list-item-subtitle>期限を限定して使用する</v-list-item-subtitle>
                            <v-list-item-content>
                                使用詳細
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                    <div class="pt-2"/>


                </v-list>
            </v-card-text>
            <!--   我的订单   -->
        </div>
    </div>

</template>

<script>
import {memberDetail} from "@api";
    export default {
        name: "MemberCenter",
        data () {
            return {
                userName: {},
                isMobile : false,
            }
        },
        mounted() {
            this.isMobile = this.$store.state.isMobile;
            var that = this
            memberDetail({
            })
                .then(function (response) {
                    console.log(response)
                    that.userName = response.data
                })
                .catch(function (error) {
                    // this.$notify({ type: 'warning', message: '查询失败' });
                    console.log(error)
                });
        },
        methods : {
        }
    }
</script>

<style scoped>

</style>
