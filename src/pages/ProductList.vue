<template>
  <v-main>
    <v-img max-height="200px" src="../image/image-plp-recommend.jpg"></v-img>
  </v-main>
</template>

<script>
export default {
  name: "ProductList",
  data: () => ({
    selectedItem: 1,
    items: [
      { text: 'Real-Time', icon: 'mdi-clock' },
      { text: 'Audience', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' },
    ],
  }),
}
</script>

<style scoped>

</style>