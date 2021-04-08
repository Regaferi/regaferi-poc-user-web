<template>
  <v-app-bar
      app
      color="white"
  >
    <!--  PC 模式  -->
    <v-container class="py-0 fill-height" v-show="!isMobile">
      <img class="pl-8 pr-12" style="height: 45px; height: 45px;" src="../assets/logo.png">

<!--      <v-btn-->
<!--          v-for="link in links"-->
<!--          :key="link.id"-->
<!--          text-->
<!--          @click="navigateTo(link.name, isMobile)"-->
<!--      >-->
<!--        {{ link.title.pc }}-->
<!--      </v-btn>-->

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
    <v-container class="py-0 fill-height" v-show="isMobile">
      <img style="height: 30px; height: 30px;" src="../assets/logo.png">

<!--      <div style="position: fixed; right: 8%">-->
<!--        <v-btn-->
<!--            class="brown&#45;&#45;text"-->
<!--            v-for="link in links"-->
<!--            :key="link.id"-->
<!--            text-->
<!--            @click="navigateTo(link.name, isMobile)"-->
<!--        >-->
<!--        </v-btn>-->
<!--      </div>-->
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
    links: [
      {
        id:1,
        title : {
          pc : 'PC分类',
          mobile : 'MB分类'
        },
        router : {
          name : '',
          url : '/',
        },
      },
      {
        id:2,
        title : {
          pc : 'PC分类',
          mobile : 'MB分类'
        },
        router : {
          name : '',
          url : '/',
        },
      },
      {
        id:3,
        title : {
          pc : 'PC分类',
          mobile : 'MB分类'
        },
        router : {
          name : '',
          url : '/',
        },
      },
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
</style>