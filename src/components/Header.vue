<template>
  <v-app-bar app>
    <!--  PC 模式  -->
    <v-container class="py-0 fill-height" v-show="!isMobile">
      <h3 class="pl-8 pr-12" style="height: 45px; height: 45px;" @click="backToHome()">Regaferi</h3>
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
      <h3 style="height: 30px; height: 30px;" @click="backToHome()">Regaferi</h3>
      <Account/>
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
    isMobile: false,
  }),
  created() {
  },
  mounted () {
    this.isMobile = this.$store.state.isMobile
  },
  methods : {
    navigateTo : function (name){
      this.$router.push({name : name})
    },
    backToHome : function (){
      this.$router.push({name: 'home'})
    }

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