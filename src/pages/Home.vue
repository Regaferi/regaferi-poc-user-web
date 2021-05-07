<template>
  <v-main>
	<v-banner elevation="3" style="margin:7px;padding: 0; background: #f3f0e9;">
    <!-- CMS 轮播开始 -->
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
        </v-banner>
    <!-- CMS 轮播结束 -->

    <!-- 引导菜单开始 -->
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
    <!-- 引导菜单结束 -->
         <!-- SHARE -->
  <v-banner elevation="3" style="margin:7px;padding: 0; background: #f3f0e9;">
    <v-card class="text-center" style="text-align: center">
      <Introduction/>
    </v-card>
     </v-banner>
        <!-- Store Locator -->
  <v-banner elevation="3" style="margin:7px;padding: 3px; background: #f3f0e9;">
    <v-card class="text-center" style="text-align: center">
      <v-card-title>近くのレストランを探す</v-card-title>
      <GoogleMap/>
    </v-card>
    </v-banner> 
  </v-main>
</template>

<script>

import GoogleMap from "@/components/GoogleMap";
import Introduction from "@/pages/Introduction";
export default {
  name: "Home",
  data () {
    return {
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
    GoogleMap,
    Introduction
  },
  created() {

  },
  mounted () {
    this.isMobile = this.$store.state.isMobile
  },
  methods : {
    navigateTo : function (name, category, property){
      this.$router.push({name : name, params: {'category': category, 'property' : property}})
    }
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
</style>