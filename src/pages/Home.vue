<template>
    <v-main>
        <div style="position: relative" ref="piediv">
            <v-img max-height="20%" width="100%" src="../image/image-plp-recommend.jpg"></v-img>

            <div style="width: 96%;border-radius: 6px;margin: auto;">
                <div style="    z-index: 1;
    border-radius: 6px;
    width: 100%;
    box-sizing: border-box;
    box-shadow: 0 1px 5px 0 rgb(0 0 0 / 25%);
    background: #fff;

    margin-top: 10px;">
                    <ul style="
                    height: 90px;
    position: relative;
    border-radius: 6px;
    width: 100%;
    box-sizing: border-box;
    font-size: 10px;
    ;">
                        <li class="rsttop-container__search-area" style="height: 47px">
                            <div class="rsttop-container__search-area-inner" style="    width: 91%;">
                                <!--                            <van-icon style="font-size: 20px;" name="search" />-->
                                <el-input placeholder="エリア・駅" style="padding-left: 10px;width:90%;"
                                          v-model="input1"></el-input>
                                <!--                            <input placeholder="エリア・駅" type="text">-->
                            </div>
                        </li>
                        <li class="rsttop-container__search-area" style="height: 40px">
                            <div class="rsttop-container__search-area-inner">
                                <!--                            <input placeholder="店名・ジャンル" style="padding-left: 10px;width:100%" type="text">-->
                                <el-input :placeholder=" 'フリーワード' " v-model="input" class="input-with-select">
                                    <el-select style="100px;" v-model="value1" slot="prepend" placeholder="選んでください">
                                        <el-option v-for="item in valueLabel"
                                                   :key="item.value1"
                                                   :label="item.label"
                                                   :value="item.value1"></el-option>
                                    </el-select>
                                </el-input>
                            </div>

                        </li>
                        <li style="position: absolute;top: 30%;right: 2%;">
                            <van-button type="info" size="small" @click="searchStore">GO</van-button>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
        <v-row v-show="isMobile" style="margin-top: 5%;padding-left: 12px;margin-bottom: -15px;">
            <v-col>カテゴリーから選ぶ</v-col>
        </v-row>
        <v-row v-show="isMobile" style="width: 100%; margin: auto; left: 0; right: 0;">
            <v-col :cols="isMobile?'6':'2'"
                   v-for="(navigator, i) in navigators"
                   :key="i"
                   @click="navigateTo(navigator)"
            >
                <v-card :width="isMobile?'100%':'100%'" :height="isMobile?'100%':'300px'">
                    <v-img max-height=100% max-width=100% :src="navigator.url"></v-img>
                    <v-card-subtitle class="font-weight-black" style="margin:auto;padding:auto; text-align: center;">
                        {{navigator.name}}
                    </v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>


        <v-row v-show="isMobile" style="margin-top: 5%;padding-left: 12px;margin-bottom: -15px;">
            <v-col>新着一覧</v-col>
        </v-row>
        <v-row v-show="isMobile" class="pl-2 pr-2">
            <v-col cols="6" v-for="(product, key) in products" :key="key" @click="navigateToPDP(product)">
                <v-card>
                    <v-img v-if="product.logoImage" height="148" :src="product.logoImage.target"/>
                    <van-image style="height: 148px" v-else
                               src="https://regaferi.oss-ap-northeast-1.aliyuncs.com/system/logo-null.jpg">
                        <template v-slot:error>読み込みに失敗しました</template>
                    </van-image>
                    <v-card-title style="font-size: 13px;padding-top: 0px;padding-bottom: 0px">{{ product.title }}
                    </v-card-title>
                    <span style="font-size:11px;padding-left:8px;">営業時間:</span>
                    <v-card-text style="font-size:10px;padding-top: 0px;padding-bottom: 0px">
                        <van-badge style="background: rgb(20, 155, 244)" :content="product.openTime.slice(0,5)"/>
                        <van-badge style="background: rgb(20, 155, 244)" :content="product.closeTime.slice(0,5)"/>
                    </v-card-text>
                    <div style="display: flex;justify-content: space-between;font-size: 6px;padding: 5px">
                        <div style="font-size:10px">
                            <van-icon  name="location-o"/>
                            {{product.location}}
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <!--      pc页面-->

        <div v-show="!isMobile" class="PcMind">
            <div class="PcMindOne">
                <v-row style="margin-top: 5%;padding-left: 12px;margin-bottom: -15px;">
                    <v-col>カテゴリーから選ぶ</v-col>
                </v-row>
                <div style="width: 100%;padding: 12px;display: flex;flex-wrap: wrap;">
                    <v-col :cols="isMobile?'6':'3'"
                           v-for="(navigator, i) in navigators"
                           :key="i"
                           @click="navigateTo(navigator)"
                    >
                        <v-card width="100%">
                            <v-img max-height=100% max-width=100% :src="navigator.url"></v-img>
                            <v-row class="navigator-row">
                                <v-card-subtitle class="font-weight-black" style="margin:auto;padding:auto; ">
                                    {{navigator.name}}
                                </v-card-subtitle>
                            </v-row>
                        </v-card>
                    </v-col>
                </div>

            </div>
        </div>
        <div v-show="!isMobile" class="PcMind">
            <div class="PcMindOne">
                <v-row style="margin-top: 5%;padding-left: 12px;margin-bottom: -15px;">
                    <v-col>新着一覧</v-col>
                </v-row>
                <div style="width: 100%;padding: 12px;display: flex;flex-wrap: wrap">
                    <div style="width: 25%;padding: 12px;" v-for="(product, key) in products" :key="key"
                         @click="navigateToPDP(product)">
                        <v-card :width="isMobile?'100%':'100%'" :height="isMobile?'100%':'100%'">
                            <v-img v-if="product.logoImage" :src="product.logoImage.target"/>
                            <van-image style="height: 148px" v-else
                                       src="https://regaferi.oss-ap-northeast-1.aliyuncs.com/system/logo-null.jpg">
                                <template v-slot:error>加载失败</template>
                            </van-image>
                            <v-row class="navigator-row" style="padding: 2%;">
                                <v-card-subtitle class="font-weight-black">{{product.title}}</v-card-subtitle>

                            </v-row>
                            <div style="    font-size: 10px;    margin-left: 5px;padding: 2%;">
                                <van-badge style="background: rgb(20, 155, 244)"
                                           :content="product.openTime.slice(0,5)"/>
                                <van-badge style="background: rgb(20, 155, 244)"
                                           :content="product.closeTime.slice(0,5)"/>
                            </div>
                            <div style="font-size: 10px;margin-left: 5px;padding: 2%;">
                                <van-icon name="location-o"/>
                                {{product.location}}
                            </div>
                        </v-card>

                    </div>
                </div>

            </div>
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
    import {shopIndex, industryAll} from "@api";

    export default {
        name: "Home",
        data() {
            return {
                show: true,
                input1: '',
                input: '',
                valueLabel: [{
                    value1: 'ショップ',
                    label: 'ショップ'
                }, {
                    value1: 'サービス',
                    label: 'サービス'
                }],
                value1: '選択',
                topWidth: '',
                products: [],
                navigators: [],
                isMobile: false,
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
            }
        },

        components: {},
        created() {
        },
        mounted() {
            this.isMobile = this.$store.state.isMobile;
            var that = this
            shopIndex({
                keyword: '',
                type: 1,
                pageIndex: 0,
                pageSize: 6,
                location: '',
            })
                .then(function (response) {
                    that.products = response.data
                    setTimeout(() => {
                        that.show = false
                    }, 500)
                })
                .catch(function (error) {
                    Notify({type: 'warning', message: error.errMessage});
                });
            industryAll().then(res => {
                this.navigators = res.data
            })
                .catch(err => {
                    console.log(err.data, '失敗')
                });
        },
        methods: {
            serveWeb() {
                this.$router.push({name: 'product'})
            },
            navigateToPDP(val) {
                this.$router.push({name: 'ShopDetails', query: {id: val.id}})
            },
            searchStore() {
                console.log(this.$route.path)
                if (this.value1 == 'ショップ') {
                    if (this.$route.path !== '/storeList') { //判断当前路由和跳转路由是否一致（防止路由复用产生的报错）
                        this.$router.push({name: 'storeList', query: {input: this.input, location: this.input1}})
                    }
                } else {
                    if (this.$route.path !== '/product-list') { //判断当前路由和跳转路由是否一致（防止路由复用产生的报错）
                        this.$router.push({
                            name: 'product-list',
                            query: {input: this.input, location: this.input1, name: 'souSuo'}
                        })
                    }
                }

            },
            navigateTo: function (val) {
                this.$router.push({name: 'product-list', query: {id: val.id, name: 'hangYe'}})
            },
        }

    }
</script>

<style scoped>
    .navigator-row {
        width: 100%;
        margin: auto;
        left: 0;
        right: 0;
    }

    .navigator-row-mb {
        margin: auto;
        top: 40%;
        left: 20%
    }

    .navigator-subtitle {
        margin: auto;
        position: absolute;
        z-index: 2;
        left: 33%;
        top: 40%;
    }

    /deep/ .van-search {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        box-sizing: border-box;
        padding: 10px 12px;
        background-color: none;
    }

    /deep/ .row {
        display: flex;
        flex-wrap: wrap;
        flex: 1 1 auto;
        margin: 0;
    }

    /deep/ .v-card__subtitle, .v-card__text, .v-card__title {
        padding: 5px;
    }

    /deep/ .navigator-row[data-v-5a90ec03] {
        width: 100%;
        margin: auto;
        left: 0;
        right: 0;
        height: 32px;
    }

    .PcMind {
        -webkit-display: flex;
        display: flex;
        -webkit-align-items: center;
        -webkit-justify-content: center;
        justify-content: center;
    }

    .PcMindOne {
        width: 85%;
        /*background-color:red;*/
    }

    .rsttop-container__search-area {
        display: flex;
        position: relative;
        padding-left: 10px;
        border-right: none;
        border-radius: 6px 0 0 6px;
        width: 100%;
    }

    .rsttop-container__search-area-inner {
        display: flex;
        margin: 10px 0 10px;
        align-items: center;
    }

    /deep/ .el-input-group__prepend {
        border-right: 0;
        width: 30%;
        border: none;
        background-color: rgb(244, 244, 244);
    }

    /deep/ .el-input-group--prepend .el-input__inner, .el-input-group__append {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        width: 100%;

    }

    /deep/ .el-input__inner {
        -webkit-appearance: none;
        background-color: #FFF;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        width: 100%;
        border: none;
        background-color: rgb(244, 244, 244);
    }

    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .row + .row {
        margin-top: 12px;
        padding: 10px;
    }

    /deep/ .el-input__inner {

        background: #ffffff;
    }

    /deep/ .el-input-group__prepend {
        border-right: 0;
        width: 35%;
        border: none;
        background: #ffffff;
    }

    .col-2 {
        max-width: 12.5%;
    }

    .el-input-group__prepend {
        border-right: 0;
        width: 40%;
        border: none;
        background: #ffffff;
    }
</style>
