<template>
  <div style="padding-top: 200px">
    <p>我们正在处理您的登录请求...</p>
    <p>{{ code }}</p>
    <p>{{ state }}</p>
  </div>
</template>

<script>
import axios from "axios";
import qs from 'qs';

export default {
  name: "LoginCallback",
  data () {
    return {
      code: this.$route.query.code,
      state: this.$route.query.state
    }
  },
  created() {
    // 请求 token
    let _this = this;
    axios.post('https://api.line.me/v2/oauth/accessToken', qs.stringify({
      grant_type: 'authorization_code',
      code : _this.code,
      redirect_uri: 'http://frontend-api.regaferi.jp/login/callback',
      client_id: '1656015883',
      client_secret: '7002c8b2d9d81f392746dc85936319c6'
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(function (response) {
      axios.get('https://api.line.me/v2/profile', {
        headers: {
          'Authorization': 'Bearer ' + response.data.access_token
        }
      })
      .then(function (responses){
        axios.post('http://frontend-api.regaferi.jp/member/login', {
          "source": 300,
          "nickName" : responses.data.displayName,
          "userId" : responses.data.userId,
          "picUrl" : responses.data.pictureUrl
        })
        .then(function (res){
          console.log(res);
          _this.reveal = false;
          _this.isLogin = true;
          _this.$store.commit('isLogin', true);
          this.$router.push({name : 'home'})
        })
      })
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
</script>

<style scoped>

</style>