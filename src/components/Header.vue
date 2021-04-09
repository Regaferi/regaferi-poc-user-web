<template>
  <v-app-bar
      app
      color="white"
  >
    <!--  PC 模式  -->
    <v-container class="py-0 fill-height" v-show="!isMobile">
      <img class="pl-8 pr-12" style="height: 45px; height: 45px;" src="../assets/logo.png">
      <v-spacer></v-spacer>
      <div class="header-right">
        <div class="header-right-search">
          <v-responsive max-width="260">
          <v-text-field
              dense
              flat
              hide-details
              rounded
              solo-inverted
          ></v-text-field>
        </v-responsive>
        </div>
        <div class="header-right-account"><Account/></div>
      </div>
    </v-container>
    <!--  Mobile 模式  -->
    <v-container class="text-center align-center" v-show="isMobile">
      <v-icon style="position:fixed; margin:auto; left: 5%; top:28%;">mdi-magnify</v-icon>
      <img style="height: 30px; height: 30px;" src="../assets/logo.png">
      <v-icon style="position:fixed; margin:auto; right: 5%; top:28%;">mdi-account</v-icon>
    </v-container>
  </v-app-bar>
</template>

<script>

import Account from "@/pages/Account";

export default {
  name: "Header",
  components : {
    Account,
  },
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
  .header-right {
    position: fixed;
    width: 350px;
    right: 15%;
  }
  .header-right-search {
    position: relative;
    float: left;
  }
  .header-right-account {
    position: relative;
    float: right;
    top: 10px;
  }
  .header-right-account-mob {
    position: relative;
    float: right;
    top: 8%;
  }
</style>