<template>
  <v-main style="overflow: hidden;">
    <!--  Banner  -->
    <div style="position: relative" ref="piediv">
      <v-img max-height="20%" width="100%" src="../image/image-plp-recommend.jpg"></v-img>
    </div>
    <!--  Filter  -->
    <v-divider class="mx-4"></v-divider>
    <van-list
            v-model="loading"
            :finished="finished"
            finished-text=""
            @load="load_more"
    >
      <van-empty v-if="products.length <= 0" description="現在有効期間中のサブスクはありません" />
    <div  v-show="isMobile" style="padding-left: 4%;margin: 2% 0" v-for="(item, index) in products" :key="index"  @click="naviga(item)">
      <v-card width="96%">
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-img v-if="item.logoImage" height="130" :src="item.logoImage.target"/>
              <van-image v-else src="https://regaferi.oss-ap-northeast-1.aliyuncs.com/system/logo-null.jpg">
                <template v-slot:error>読み込みに失敗しました</template>
              </van-image>
            </v-col>
            <v-col cols="6" style="font-size: xx-small">
              <h4 class="pt-3">{{item.name}}</h4>
              <h5 style="color: red">{{item.prices}}円</h5>
              <h6><van-icon name="location-o" />{{item.location}}</h6>
              <h6>回数制限：{{item.totalCount == null ? '回数無制限':item.totalCount + '  回'}}</h6>
              <h6>利用可能な時間：{{item.createTime.slice(0,10)}} - {{item.updateTime.slice(0,10)}}</h6>

            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
      <div v-show="!isMobile" style="padding-left: 4%;display: flex" v-for="(item, index) in products" :key="'info2-'+index"  @click="naviga(item)">
      <v-card width="40%" style="margin-top: 10px;">
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-img v-if="item.logoImage" height="130" :src="item.logoImage.target"/>
              <van-image v-else src="https://regaferi.oss-ap-northeast-1.aliyuncs.com/system/logo-null.jpg">
                <template v-slot:error>読み込みに失敗しました</template>
              </van-image>
            </v-col>
            <v-col cols="6" style="font-size: xx-small">
              <h4 class="pt-3">{{item.name}}</h4>
              <h5 style="color: red">{{item.prices}} 円</h5>
              <h6><van-icon name="location-o" />{{item.location}}</h6>
              <h6>回数制限：{{item.totalCount == null ? '回数無制限':item.totalCount + '  回'}}</h6>
              <h6>利用可能な時間：{{item.createTime.slice(0,10)}} - {{item.updateTime.slice(0,10)}}</h6>

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
  import { Notify } from 'vant';
  import {servicePageIndex,servicePage} from "@api"
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
    isMobile:false
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
                Notify({ type: 'warning', message: error.errMessage });
              });
    }
    if(that.$route.query.name == 'souSuo'){
      servicePageIndex({
        keyword:that.$route.query.input,
        pageIndex:0,
        pageSize:10,
        location:that.$route.query.location
      })
              .then(function (response) {
                that.products = response.data
                that.show = false
              })
              .catch(function (error) {
                Notify({ type: 'warning', message: error.errMessage });
              });
    }


  },
  mounted() {
    this.isMobile = this.$store.state.isMobile;
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
                  Notify({ type: 'warning', message: error.errMessage });
                });
      }
      if(that.$route.query.name == 'souSuo'){
        servicePageIndex({
          keyword:that.$route.query.input,
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
                  Notify({ type: 'warning', message: error.errMessage });
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
