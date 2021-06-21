<template>
  <div>
    <v-footer

            dark
            padless
    >
      <v-card
              style="    width: 100%;"
              flat
              tile
              class="indigo lighten-1 white--text text-center"
      >
        <v-btn
                v-for="(link,index) in links"
                :key="index"
                color="white"
                text
                rounded
                class="my-2"
                @click="footerList(index)"
        >
          {{ link }}
        </v-btn>

        <!--<v-card-text class="white&#45;&#45;text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </v-card-text>-->

        <v-divider></v-divider>

        <v-container>
          <v-col class="text-center text-sm-subtitle-2">
            2021 - {{ new Date().getFullYear() }} © Regaferi.jp <div v-show="!isMobile">All Right Reserved.</div>
          </v-col>
        </v-container>
        <v-container>
          <v-col class="text-center text-sm-subtitle-2">
            <v-btn
                    color="white"
                    text
                    rounded
                    class="my-2"
                    @click="backgroundLink"
            >
              商定刊登方法
            </v-btn>

          </v-col>
        </v-container>
      </v-card>
    </v-footer>

  </div>

</template>

<script>

export default {
  name: "Footer",
  data: () => ({
    isMobile: Boolean,
    links: [
      '会社概要',
      '利用規約',
      '特定商取引法に基づく表記',
      'プライバシーポリシー',
    ],
  }),
  beforeDestroy () {
    if (typeof window === 'undefined') return
    window.removeEventListener('resize', this.onResize, { passive: true })
  },
  created() {
    this.$data.isMobile = this.$route.params.isMobile
    this.onResize();
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  methods : {
    backgroundLink(){
      window.location.href = "http://manager-web.regaferi-japan.com";
    },
    footerList(index){
      console.log(index)
      if(index == 0){
        window.location.href = "https://www.office-regaferi.com/%E4%BC%9A%E7%A4%BE%E6%A6%82%E8%A6%81/";
      }else if(index == 1){
         window.location.href = "https://www.office-regaferi.com/%E5%88%A9%E7%94%A8%E8%A6%8F%E7%B4%84/";
      }else if(index == 2){
          window.location.href = "https://www.office-regaferi.com/%E7%89%B9%E5%AE%9A%E5%95%86%E5%8F%96%E5%BC%95%E3%81%AB%E5%9F%BA%E3%81%A5%E3%81%8F%E8%A1%A8%E8%A8%98/";
      }else{
          window.location.href = "https://www.office-regaferi.com/%E3%83%97%E3%83%A9%E3%82%A4%E3%83%90%E3%82%B7%E3%83%BC%E3%83%BB%E3%83%9D%E3%83%AA%E3%82%B7%E3%83%BC/";
      }
    },
    onResize () {
      this.isMobile = window.innerWidth < 600
    },
    navigateTo : function (name){
      this.$router.push({name : name})
    },
  }
}
</script>

<style scoped>

</style>
