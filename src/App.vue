<template>
  <v-app class="custom-font" v-title data-title="Regaferi[定額制]見つけた時からいつものお店">
    <Header/>
    <router-view/>
    <Footer/>
  </v-app>
</template>

<script>


import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: 'App',
  components : {
    Header,
    Footer,
  },
  data: () => ({
  }),
  beforeCreate() {
    this.$store.commit('isMobile')
  },
  created() {
    // 自适配夜间模式
    /*if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches){
      this.$vuetify.theme.dark = true;
    }else {
      this.$vuetify.theme.dark = false;
    }*/
  },
  mounted () {
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  methods : {
    onResize () {
      // vuex 持久化存储客户端类型
      this.$store.commit('isMobile')
    },
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'webfont';
  font-display: swap;
  src: url('//at.alicdn.com/t/webfont_z2hp7dww0td.eot'); /* IE9*/
  src: url('//at.alicdn.com/t/webfont_z2hp7dww0td.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('//at.alicdn.com/t/webfont_z2hp7dww0td.woff2') format('woff2'),
  url('//at.alicdn.com/t/webfont_z2hp7dww0td.woff') format('woff'), /* chrome、firefox */
  url('//at.alicdn.com/t/webfont_z2hp7dww0td.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
  url('//at.alicdn.com/t/webfont_z2hp7dww0td.svg#Alibaba-PuHuiTi-Regular') format('svg'); /* iOS 4.1- */
}
.custom-font {
  font-family:"webfont" !important;
  font-size:16px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
#map {
  height: 100%;
}

</style>
