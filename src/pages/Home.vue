<template>
  <v-main style="padding: 0">
      <div style="position: relative;top: 0" ref="piediv">
          <!--      <div style="-->
          <!--      height: 300px;-->
          <!--      background-image: url('https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4253792690,4157255255&fm=224&gp=0.jpg')-->
          <!--      background-size: 100%;"-->
          <!--      />-->
<!--          <img style="width: 100%;height: 250px" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4253792690,4157255255&fm=224&gp=0.jpg" alt="">-->
          <v-img max-height="200px" width="100%" src="../image/image-plp-recommend.jpg"></v-img>

          <div v-show="isMobile" style="position: absolute;bottom: -8%;;left: 2%;width: 95%">
              <van-search background="none" v-model="value" placeholder="搜索商品" />

          </div>
      </div>
	<!--<v-banner elevation="3" style="margin:7px;padding: 0; background: #f3f0e9;">
    &lt;!&ndash; CMS 轮播开始 &ndash;&gt;
    <v-carousel
        cycle
        height="400"
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
             class="mx-auto transition-swing secondary"
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
        </v-banner>-->
    <!-- CMS 轮播结束 -->

      <v-row v-show="isMobile" style="margin-top: 5%;padding-left: 12px;margin-bottom: -15px;">
          <v-col>热门商品</v-col>
      </v-row>
      <v-row class="pl-2 pr-2" v-show="isMobile">
          <v-col cols="6" v-for="(product, key) in products" :key="key" @click="navigateToPDP(product.code)">
              <v-card>
                  <v-img height="130" :src="product.image"/>
                  <v-card-text>
                      <v-row align="center" class="mx-0">
                          <v-rating :value="product.rating" color="amber" dense half-increments readonly size="14"/>
                      </v-row>
                  </v-card-text>
                  <v-card-title style="font-size: 10px;padding-top: 0px;padding-bottom: 0px">{{ product.title }}</v-card-title>
                  <div style="color: red;padding-left:16px;font-size: 13px"><span>￥</span> <span>566</span>  <span>monthly</span></div>
                  <v-card-text style="padding-top: 0">
                      <h6>{{ product.subTitle }}</h6>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <!-- 引导菜单开始 -->
      <v-row v-show="isMobile" style="margin-top: 5%;padding-left: 12px;margin-bottom: -15px;">
          <v-col>热门主题</v-col>
      </v-row>
      <v-row v-show="isMobile" style="width: 100%; margin: auto; left: 0; right: 0;">
          <v-col :cols="isMobile?'6':'2'"
                 v-for="(navigator, i) in navigators"
                 :key="i"
                 @click="navigateTo(navigator.navigator.name, navigator.navigator.category, navigator.navigator.property)"
          >
              <v-banner elevation="3" style="margin:auto;padding: auto; background: #f3f0e9;">
                  <v-card :width="isMobile?'100%':'100%'" :height="isMobile?'100%':'300px'"  >
                      <v-img :lazy-src="navigator.imageurl" max-height=100% max-width=100% :src="navigator.imageurl" ></v-img>
                      <v-row class="navigator-row"  >
                          <v-card-subtitle  class="font-weight-black" style="margin:auto;padding:auto; ">{{navigator.title}}</v-card-subtitle>
                      </v-row>
                  </v-card>
              </v-banner>
          </v-col>
      </v-row>
      <v-row v-show="isMobile" style="margin-top: 5%;padding-left: 12px;margin-bottom: -15px;">
          <v-col>热门店铺</v-col>
      </v-row>
      <v-row v-show="isMobile" class="pl-2 pr-2">
          <v-col cols="6" v-for="(product, key) in products" :key="key" @click="navigateToPDP(product.code)">
              <v-card>
                  <v-img height="130" :src="product.image"/>
                  <v-card-title style="font-size: 13px;padding-top: 0px;padding-bottom: 0px">{{ product.title }}</v-card-title>
                  <div style="color: red;padding-left:16px;font-size: 13px"><span><van-icon name="star-o" /></span> <span>4.6</span>  <span style="margin-left: 10px"><van-icon name="chat-o" color="#ee0a24" /></span> <span>168</span></div>
                  <v-card-text style="padding-top: 0">
                      <h6>营业时间</h6>
                      <van-badge content="20：00" />
                  </v-card-text>
                  <div style="display: flex;justify-content: space-between;font-size: 6px;padding: 5px">
                      <div>烧烤</div>
                      <div><van-icon name="location-o" />东京</div>
                  </div>
              </v-card>
          </v-col>
      </v-row>
<!--      pc页面-->
      <div   v-show="!isMobile" class="PcMind">
          <div class="PcMindOne">
              <v-row style="margin-top: 5%;padding-left: 12px;margin-bottom: -15px;">
                  <v-col>热门商品</v-col>
              </v-row>
              <div style="width: 100%;padding: 12px;display: flex;flex-wrap: wrap">
              <div style="width: 25%;padding: 12px;" v-for="(product, key) in 6" :key="key">
                  <v-card :width="isMobile?'100%':'100%'" :height="isMobile?'100%':'100%'"  >
                      <v-img lazy-src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4253792690,4157255255&fm=224&gp=0.jpg" max-height=80% max-width=100% src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4253792690,4157255255&fm=224&gp=0.jpg" ></v-img>
                      <v-row class="navigator-row"  >
                          <v-card-subtitle  class="font-weight-black">商品名称</v-card-subtitle>

                      </v-row>
                      <div style="display: flex;justify-content: space-around">
                          <span>月卡</span>
                          <span>699</span>
                      </div>
                      <div style="display: flex;justify-content: space-around">
                          <span>月卡</span>
                          <span>699</span>
                      </div>
                  </v-card>

                 </div>
              </div>

          </div>
      </div>
      <div  v-show="!isMobile" class="PcMind">
          <div class="PcMindOne">
              <v-row style="margin-top: 5%;padding-left: 12px;margin-bottom: -15px;">
                  <v-col>推荐店铺</v-col>
              </v-row>
              <div style="width: 100%;padding: 12px;display: flex;flex-wrap: wrap;">
                  <div style="width: 25%;padding: 12px;" v-for="(product, key) in 6" :key="key">
                      <v-card :width="isMobile?'100%':'100%'" :height="isMobile?'100%':'100%'"  >
                          <v-img lazy-src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4253792690,4157255255&fm=224&gp=0.jpg" max-height=80% max-width=100% src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4253792690,4157255255&fm=224&gp=0.jpg" ></v-img>
                          <v-row class="navigator-row"  >
                              <v-card-subtitle  class="font-weight-black">商品名称</v-card-subtitle>

                          </v-row>
                          <v-card-text style="padding-top: 0">
                              <h6>subTitle }}</h6>
                          </v-card-text>
                          <v-card-text>
                              <v-row align="center" class="mx-0" >
                                  <v-rating :value="product.rating" color="amber" dense half-increments readonly size="14"/>
                              </v-row>
                          </v-card-text>
                      </v-card>

                  </div>
              </div>

          </div>
      </div>
      <div  v-show="!isMobile" class="PcMind">
          <div class="PcMindOne">
              <v-row style="margin-top: 5%;padding-left: 12px;margin-bottom: -15px;">
                  <v-col>热门商品</v-col>
              </v-row>
              <v-row style="width: 100%; margin: auto; left: 0; right: 0;">
                  <v-col :cols="isMobile?'6':'2'"
                         v-for="(navigator, i) in navigators"
                         :key="i"
                         @click="navigateTo(navigator.navigator.name, navigator.navigator.category, navigator.navigator.property)"
                  >
                      <v-banner elevation="3" style="margin:auto;padding: auto; background: #f3f0e9;">
                          <v-card :width="isMobile?'100%':'100%'" :height="isMobile?'100%':'300px'"  >
                              <v-img :lazy-src="navigator.imageurl" max-height=100% max-width=100% :src="navigator.imageurl" ></v-img>
                              <v-row class="navigator-row"  >
                                  <v-card-subtitle  class="font-weight-black" style="margin:auto;padding:auto; ">{{navigator.title}}</v-card-subtitle>
                              </v-row>
                          </v-card>
                      </v-banner>
                  </v-col>
              </v-row>

          </div>
      </div>


    <!-- 引导菜单结束 -->
         <!-- SHARE -->

        <!-- Store Locator -->
  <!--<v-banner elevation="3" style="margin:7px;padding: 3px; background: #f3f0e9;">
    <v-card class="text-center" style="text-align: center">
      <v-card-title>近くのレストランを探す</v-card-title>
      <GoogleMap/>
    </v-card>

    </v-banner>
      <v-banner elevation="3" style="margin:7px;padding: 0; background: #f3f0e9;">
          <v-card class="text-center" style="text-align: center">
              <Introduction/>
          </v-card>
      </v-banner>-->
  </v-main>
</template>

<script>

// import GoogleMap from "@/components/GoogleMap";
// import Introduction from "@/pages/Introduction";
export default {
  name: "Home",
  data () {
    return {
        topWidth:'',
        products : [
            {
                title: '例示商品タイトル',
                code: '1234',
                subTitle: '例示商品副題',
                description: '例示的な商品記述',
                rating: 4.5,
                image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
            },
            {
                title: '例示商品タイトル',
                code: '1234',
                subTitle: '例示商品副題',
                description: '例示的な商品記述',
                rating: 4.5,
                image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
            },
            {
                title: '例示商品タイトル',
                code: '1234',
                subTitle: '例示商品副題',
                description: '例示的な商品記述',
                rating: 4.5,
                image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
            },
            {
                title: '例示商品タイトル',
                code: '1234',
                subTitle: '例示商品副題',
                description: '例示的な商品記述',
                rating: 4.5,
                image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
            },
            {
                title: '例示商品タイトル',
                code: '1234',
                subTitle: '例示商品副題',
                description: '例示的な商品記述',
                rating: 4.5,
                image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
            },
            {
                title: '例示商品タイトル',
                code: '1234',
                subTitle: '例示商品副題',
                description: '例示的な商品記述',
                rating: 4.5,
                image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
            },
            {
                title: '例示商品タイトル',
                code: '1234',
                subTitle: '例示商品副題',
                description: '例示的な商品記述',
                rating: 4.5,
                image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
            },
            {
                title: '例示商品タイトル',
                code: '1234',
                subTitle: '例示商品副題',
                description: '例示的な商品記述',
                rating: 4.5,
                image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
            }
        ],
      navigators : [
        {
          title : '推荐',
          icon: 'mdi-dialpad',
          navigator : {
            name: 'product-list',
            url: '/list',
            category : 'recommend',
            property : ''
          },
           imageurl : 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4253792690,4157255255&fm=224&gp=0.jpg',
        },
        {
          title : '美食',
          icon: 'mdi-dialpad',
          navigator : {
            name: 'product-list',
            url: '/list',
          },
          imageurl : 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1992102675,2090288480&fm=26&gp=0.jpg',
        },
        {
          title : '饮品',
          icon: 'mdi-dialpad',
          imageurl : 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4276895145,1303738748&fm=26&gp=0.jpg',
          navigator : {
            name: 'product-list',
            url: '/list',
          }
        },
        {
          title : '娱乐',
          icon: 'mdi-dialpad',
           imageurl : 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=8018056,954128737&fm=26&gp=0.jpg',
          navigator : {
            name: 'product-list',
            url: '/list',
          }
        },
        {
          title : '温泉',
          icon: 'mdi-dialpad',
           imageurl : 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4253792690,4157255255&fm=224&gp=0.jpg',
          navigator : {
            name: 'product-list',
            url: '/list',
          }
        },
        {
          title : '旅馆',
          icon: 'mdi-dialpad',
          imageurl : 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=220512769,876056645&fm=224&gp=0.jpg',
          navigator : {
            name: 'product-list',
            url: '/list',
          }
        },
      ],
      isMobile : false,
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
  components : {
    // GoogleMap,
    // Introduction
  },
  created() {
  },
  mounted () {
    this.isMobile = this.$store.state.isMobile;
  },
  methods : {
    navigateTo : function (name, category, property){
      this.$router.push({name : name, params: {'category': category, 'property' : property}})
    },
  }

}
</script>

<style scoped>
.navigator-row {
  width:100%;
  margin: auto;
  left: 0;
  right: 0;
}
.navigator-row-mb {
  margin: auto;
  top: 40%;
  left: 20%
}
.navigator-subtitle{
    margin: auto;
	position:absolute;
	z-index:2;
	left:33%;
	top:40%;
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
/deep/ .v-card__subtitle, .v-card__text, .v-card__title{
    padding: 5px;
}
/deep/ .navigator-row[data-v-5a90ec03] {
    width: 100%;
    margin: auto;
    left: 0;
    right: 0;
    height: 32px;
}
    .PcMind{
        -webkit-display:flex;
        display:flex;
        -webkit-align-items:center;
        -webkit-justify-content:center;
        justify-content:center;
    }
    .PcMindOne{
        width:85%;
        /*background-color:red;*/
    }
</style>
