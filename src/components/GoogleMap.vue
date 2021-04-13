<template>
  <div id="map" style="width: 100%; height: 450px;"></div>
</template>

<script>


export default {
  name: "GoogleMap",
  created() {
    const loader = this.$store.state.googleMapLoader;
    loader.load()
        .then(function (google) {
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