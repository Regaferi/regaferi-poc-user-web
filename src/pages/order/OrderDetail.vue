<template>
  <div>支払い結果の確認...</div>
</template>

<script>
export default {
  name: "OrderDetail",
  data () {
    return {
      sessionId: this.$route.query.sessionId,
    }
  },
  created() {
    var https = require('https');
    var secret_key = 'sk_test_2u2m1usd757y38rmar9cqsxi'
    var auth = 'Basic ' + Buffer.from(secret_key + ':').toString('base64');
    var get_options = {
      host: 'komoju.com',
      port: '443',
      path: '/api/v1/sessions/' + this.sessionId,
      method: 'GET',
      headers: {
        'Authorization': auth
      }
    };

    var get_req = https.request(get_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log(chunk);
      });
    });

    get_req.end();

    if (get_req['status'] === 'completed'){
      alert("支払い完了！")
      this.$router.push({name: 'home'});
    }else {
      alert("支払いに失敗しました！")
      this.$router.push({name: 'home'});
    }
  }
}
</script>

<style scoped>

</style>