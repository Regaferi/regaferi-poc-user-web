<template>
  <v-main>
    <!--  Banner  -->
    <v-img max-height="200px" width="100%" src="../image/image-plp-recommend.jpg"></v-img>
    <!--  Filter  -->
    <v-divider class="mx-4"></v-divider>
    <v-row class="pt-5 pl-5 pr-5">
      <v-btn
          depressed
          outlined
          plain
          class="align-center text-center"
          width="31%"
      >選別する.<v-icon size="15">mdi-menu-down</v-icon>
      </v-btn>
      <div class="pl-2"/>
      <v-btn
          depressed
          outlined
          plain
          class="align-center text-center pl-5"
          width="31%"
      >選別する.<v-icon size="15">mdi-menu-down</v-icon>
      </v-btn>
      <div class="pl-2"/>
      <v-btn
          depressed
          outlined
          plain
          class="align-center text-center pl-5"
          width="31%"
      >選別する.<v-icon size="15">mdi-menu-down</v-icon>
      </v-btn>
    </v-row>
    <!--  List Detail  -->
    <v-row>
      <v-col cols="6" v-for="(product, key) in products" :key="key">
          <v-card class="pl-2">
            <v-img height="180" :src="product.image"/>
            <v-card-title>{{ product.title }}</v-card-title>
            <v-card-text>
              <v-row align="center" class="mx-0 pb-3">
                <v-rating :value="product.rating" color="amber" dense half-increments readonly size="14"/>
              </v-row>
              <h6>{{ product.subTitle }}</h6>
              <h6>{{ product.descriptions }}</h6>
            </v-card-text>
          </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
export default {
  name: "ProductList",
  data: () => ({
    loading: false,
    selection: 1,
    products : [
      {
        title: '例示商品タイトル',
        subTitle: '例示商品副題',
        description: '例示的な商品記述',
        rating: 4.5,
        image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
      },
      {
        title: '例示商品タイトル',
        subTitle: '例示商品副題',
        description: '例示的な商品記述',
        rating: 4.5,
        image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
      },
      {
        title: '例示商品タイトル',
        subTitle: '例示商品副題',
        description: '例示的な商品記述',
        rating: 4.5,
        image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
      },
      {
        title: '例示商品タイトル',
        subTitle: '例示商品副題',
        description: '例示的な商品記述',
        rating: 4.5,
        image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
      },
      {
        title: '例示商品タイトル',
        subTitle: '例示商品副題',
        description: '例示的な商品記述',
        rating: 4.5,
        image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
      },
      {
        title: '例示商品タイトル',
        subTitle: '例示商品副題',
        description: '例示的な商品記述',
        rating: 4.5,
        image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
      }
    ]
  }),
  methods: {
    reserve () {
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
    },
  },
}
</script>

<style scoped>

</style>