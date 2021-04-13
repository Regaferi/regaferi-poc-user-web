<template>
  <v-main>
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
    <!-- CMS 轮播结束 -->
    <!-- 引导菜单开始 -->
    <v-row style="width: 60%; margin: auto; left: 0; right: 0;">
      <v-col cols="4"
             v-for="(navigator, i) in navigators"
             :key="i"
             @click="navigateTo(navigator.navigator.name, navigator.navigator.category, navigator.navigator.property)"
      >
        <v-card :width="isMobile?'50px':'220px'" :height="isMobile?'50px':'80px'">
          <v-row class="navigator-row" v-show="!isMobile">
            <v-col cols="4" style="margin: auto; top: 15%"><v-icon :size="35">{{navigator.icon}}</v-icon></v-col>
            <v-col cols="8"><v-card-subtitle>{{navigator.title}}</v-card-subtitle></v-col>
          </v-row>
          <v-icon class="navigator-row-mb" :size="30" v-show="isMobile">{{navigator.icon}}</v-icon>
        </v-card>
      </v-col>
    </v-row>
    <!-- 引导菜单结束 -->
    <!-- Store Locator -->
    <v-card class="text-center" style="text-align: center">
      <v-card-title>近くのレストランを探す</v-card-title>
      <GoogleMap/>
    </v-card>

  </v-main>
</template>

<script>

import GoogleMap from "@/components/GoogleMap";
export default {
  name: "Home",
  data () {
    return {
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
    GoogleMap
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
  width:180px;
  margin: auto;
  left: 0;
  right: 0;
}
.navigator-row-mb {
  margin: auto;
  top: 20%;
  left: 20%
}
</style>