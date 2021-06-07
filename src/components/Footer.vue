<template>
  <div>
    <v-footer
            dark
            padless
    >
      <v-card
              flat
              tile
              class="indigo lighten-1 white--text text-center"
      >
        <v-btn
                v-for="link in links"
                :key="link"
                color="white"
                text
                rounded
                class="my-2"
        >
          {{ link }}
        </v-btn>

        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </v-card-text>

        <v-divider></v-divider>

        <v-container>
          <v-col class="text-center text-sm-subtitle-2">
            2021 - {{ new Date().getFullYear() }} © Regaferi.jp <div v-show="!isMobile">All Right Reserved.</div>
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
      'よくある質問',
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
