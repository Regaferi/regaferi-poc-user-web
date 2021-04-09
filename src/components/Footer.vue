<template>
  <v-container>
    <v-col class="text-center text-sm-subtitle-2">
      2021 - {{ new Date().getFullYear() }} © Regaferi.jp <div v-show="!isMobile">All Right Reserved.</div>
    </v-col>
  </v-container>
</template>

<script>

export default {
  name: "Footer",
  data: () => ({
    isMobile: Boolean,
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
    navigateTo : function (name, isMobile){
      this.$router.push({name : name, params: {'isMobile': isMobile}})
    },
  }
}
</script>

<style scoped>

</style>