<template>
  <div id="map" style="width: 100%; height: 450px;"></div>
</template>

<script>

import {Loader} from 'google-maps';

export default {
  name: "GoogleMap",
  created() {
    const loader = new Loader('AIzaSyB9E3oa8d364apiXxwe3vYa7kfaIq1ww1A', {});
    loader.load().then(function (google) {
      new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8,
      });
    });
  }
}
</script>

<style scoped>

</style>