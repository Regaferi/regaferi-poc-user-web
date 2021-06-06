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
    <v-row class="pt-5 pl-2 pr-2">
      <v-col cols="4">
        <v-btn depressed outlined plain class="align-center text-center" width="90%" @click="areaFilter = !areaFilter">{{ $t('i18n.product.list.filter.options.area') }}<v-icon size="15">mdi-menu-down</v-icon></v-btn>
        <v-bottom-sheet v-model="areaFilter">
          <v-sheet class="text-center" height="65%">
            <div class="py-3 pb-5">
                <v-card flat>
                  <v-card-title>{{ $t('i18n.product.list.filter.options.area') }}</v-card-title>
                  <v-card-text>
                    <v-container fluid>
                      <v-row>
                        <v-col cols="6" sm="4" md="4" v-for="(typeItem, key) in fields.area" :key="key">
                          <v-checkbox :label="typeItem.key" color="red" :value="typeItem.value" hide-details/>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-card>
            </div>
          </v-sheet>
        </v-bottom-sheet>
      </v-col>
      <v-col cols="4">
        <v-btn depressed outlined plain class="align-center text-center" width="90%" @click="typeFilter = !typeFilter">{{ $t('i18n.product.list.filter.options.type') }}<v-icon size="15">mdi-menu-down</v-icon></v-btn>
        <v-bottom-sheet v-model="typeFilter">
          <v-sheet class="text-center" height="65%">
            <div class="py-3 pb-5">
              <v-card flat>
                <v-card-title>{{ $t('i18n.product.list.filter.options.type') }}</v-card-title>
                <v-card-text>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="6" sm="4" md="4" v-for="(typeItem, key) in fields.type" :key="key">
                        <v-checkbox :label="typeItem.key" color="red" :value="typeItem.value" hide-details/>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </div>
          </v-sheet>
        </v-bottom-sheet>
      </v-col>
      <v-col cols="4">
        <v-btn depressed outlined plain class="align-center text-center" width="90%" @click="sortFilter = !sortFilter">{{ $t('i18n.product.list.filter.options.sort') }}<v-icon size="15">mdi-menu-down</v-icon></v-btn>
        <v-bottom-sheet v-model="sortFilter">
          <v-sheet class="text-center" height="65%">
            <div class="py-3 pb-5">
              <v-card flat>
                <v-card-title>{{ $t('i18n.product.list.filter.options.sort') }}</v-card-title>
                <v-card-text>
                  <v-container fluid>
                    <v-radio-group v-model="radioGroup">
                      <v-radio class="pt-1 pb-1" v-for="(sortItem, key) in fields.sort" :key="key" :label="sortItem.key" :value="sortItem.value"/>
                    </v-radio-group>
                  </v-container>
                </v-card-text>
              </v-card>
            </div>
          </v-sheet>
        </v-bottom-sheet>
      </v-col>
    </v-row>
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
    <div style="padding-left: 4%;margin-top: 10px" v-for="(item, index) in products" :key="index"  @click="naviga(item)">
      <v-card width="96%">
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-img class="pt-3" height="180" src="../image/image-plp-recommend.jpg"></v-img>
            </v-col>
            <v-col cols="6" style="font-size: xx-small">
              <h4 class="pt-3">{{item.title}}</h4>
              <h5 style="color: red">$500 / Monthly</h5>
              <v-divider class="pt-3 pb-5"/>
              <h6>回数制限.：2 Times / Per Day</h6>
              <h6>利用可能な時間：2021.01.01 - 2021.04.15</h6>

            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
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
  import {shopIndex,servicePage} from "@api"
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
    products : [
    ],
    radioGroup: 1,
  }),
  created() {
    var that = this
    console.log(that.$route.query.name,'------------------------------------------')
    if(that.$route.query.name == 'hangYe'){
      servicePage({
        industryId:that.$route.query.id,
        pageIndex:0,
        pageSize:10,
      })
              .then(function (response) {
                that.products = response.data
                that.show = false
              })
              .catch(function (error) {
                that.$notify({ type: 'warning', message: error.errMessage });
              });
    }
    if(that.$route.query.name == 'souSuo'){
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
    }


  },
  methods: {
    load_more: function() {
      this.page += 1;//页数+1
      this.onLoad();
    },
    onLoad() {
      var that = this
      if(that.$route.query.name == 'hangYe'){
        servicePage({
          industryId:that.$route.query.id,
          pageIndex:that.page,
          pageSize:that.limit,
        })
                .then(function (response) {
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
                .catch(function (error) {
                  that.$notify({ type: 'warning', message: error.errMessage });
                });
      }
      if(that.$route.query.name == 'souSuo'){
        shopIndex({
          keyword:that.$route.query.input,
          type:2,
          pageIndex:that.page,
          pageSize:that.limit,
          location:that.$route.query.location,
        })
                .then(function (response) {
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
                .catch(function (error) {
                  that.$notify({ type: 'warning', message: error.errMessage });
                });
      }

    },
    reserve () {
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
    },
    naviga (val) {
      this.$router.push({name : 'product',query:{id:val.id}})
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
