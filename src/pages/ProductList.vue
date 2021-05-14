<template>
  <v-main style="padding: 0">
    <!--  Banner  -->
    <div style="position: relative;top: 0" ref="piediv">
      <!--      <div style="-->
      <!--      height: 300px;-->
      <!--      background-image: url('https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4253792690,4157255255&fm=224&gp=0.jpg')-->
      <!--      background-size: 100%;"-->
      <!--      />-->
      <!--          <img style="width: 100%;height: 250px" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4253792690,4157255255&fm=224&gp=0.jpg" alt="">-->
      <v-img max-height="200px" width="100%" src="../image/image-plp-recommend.jpg"></v-img>
    </div>
    <!--  Filter  -->
    <v-divider class="mx-4"></v-divider>
    <v-row class="pt-5 pl-2 pr-2">
      <v-col cols="4">
        <v-btn depressed outlined plain class="align-center text-center" width="90%" @click="areaFilter = !areaFilter">{{ $t('i18n.product.list.filter.options.area') }}<v-icon size="15">mdi-menu-down</v-icon></v-btn>
        <v-bottom-sheet v-model="areaFilter">
          <v-sheet class="text-center" height="65%">
            <div class="py-3 pb-5">
                <v-card flat>
                  <v-card-title>{{ $t('i18n.product.list.filter.options.area') }}</v-card-title>
                  <v-card-text>
                    <v-container fluid>
                      <v-row>
                        <v-col cols="6" sm="4" md="4" v-for="(typeItem, key) in fields.area" :key="key">
                          <v-checkbox :label="typeItem.key" color="red" :value="typeItem.value" hide-details/>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-card>
            </div>
          </v-sheet>
        </v-bottom-sheet>
      </v-col>
      <v-col cols="4">
        <v-btn depressed outlined plain class="align-center text-center" width="90%" @click="typeFilter = !typeFilter">{{ $t('i18n.product.list.filter.options.type') }}<v-icon size="15">mdi-menu-down</v-icon></v-btn>
        <v-bottom-sheet v-model="typeFilter">
          <v-sheet class="text-center" height="65%">
            <div class="py-3 pb-5">
              <v-card flat>
                <v-card-title>{{ $t('i18n.product.list.filter.options.type') }}</v-card-title>
                <v-card-text>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="6" sm="4" md="4" v-for="(typeItem, key) in fields.type" :key="key">
                        <v-checkbox :label="typeItem.key" color="red" :value="typeItem.value" hide-details/>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </div>
          </v-sheet>
        </v-bottom-sheet>
      </v-col>
      <v-col cols="4">
        <v-btn depressed outlined plain class="align-center text-center" width="90%" @click="sortFilter = !sortFilter">{{ $t('i18n.product.list.filter.options.sort') }}<v-icon size="15">mdi-menu-down</v-icon></v-btn>
        <v-bottom-sheet v-model="sortFilter">
          <v-sheet class="text-center" height="65%">
            <div class="py-3 pb-5">
              <v-card flat>
                <v-card-title>{{ $t('i18n.product.list.filter.options.sort') }}</v-card-title>
                <v-card-text>
                  <v-container fluid>
                    <v-radio-group v-model="radioGroup">
                      <v-radio class="pt-1 pb-1" v-for="(sortItem, key) in fields.sort" :key="key" :label="sortItem.key" :value="sortItem.value"/>
                    </v-radio-group>
                  </v-container>
                </v-card-text>
              </v-card>
            </div>
          </v-sheet>
        </v-bottom-sheet>
      </v-col>
    </v-row>
    <!--  List Detail  -->
    <v-row class="pl-2 pr-2">
      <v-col cols="6" v-for="(product, key) in products" :key="key" @click="navigateToPDP(product.code)">
          <v-card>
            <v-img height="180" :src="product.image"/>
            <v-card-title>{{ product.title }}</v-card-title>
            <v-card-text>
              <v-row align="center" class="mx-0 pb-3">
                <v-rating :value="product.rating" color="amber" dense half-increments readonly size="14"/>
              </v-row>
              <h6>{{ product.subTitle }}</h6>
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
    areaFilter : false,
    typeFilter : false,
    sortFilter : false,
    fields : {
      area : [
        {
          key : '東京',
          value : 1
        },
        {
          key : '大阪',
          value : 2
        },
        {
          key : '京西.',
          value : 3
        },
      ],
      type : [
        {
          key : '焼肉を焼く',
          value : 1
        },
        {
          key : '飲み物.飲み物',
          value : 2
        },
        {
          key : 'コーヒー.コーヒー',
          value : 3
        },
      ],
      sort : [
        {
          key : '売り上げごとに',
          value : 1
        },
        {
          key : '値段によって.',
          value : 2
        },
        {
          key : '距離を押す',
          value : 3
        },
      ]
    },
    products : [
      {
        title: '例示商品タイトル',
        code: '1234',
        subTitle: '例示商品副題',
        description: '例示的な商品記述',
        rating: 4.5,
        image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
      },
      {
        title: '例示商品タイトル',
        code: '1234',
        subTitle: '例示商品副題',
        description: '例示的な商品記述',
        rating: 4.5,
        image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
      },
      {
        title: '例示商品タイトル',
        code: '1234',
        subTitle: '例示商品副題',
        description: '例示的な商品記述',
        rating: 4.5,
        image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
      },
      {
        title: '例示商品タイトル',
        code: '1234',
        subTitle: '例示商品副題',
        description: '例示的な商品記述',
        rating: 4.5,
        image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
      },
      {
        title: '例示商品タイトル',
        code: '1234',
        subTitle: '例示商品副題',
        description: '例示的な商品記述',
        rating: 4.5,
        image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
      },
      {
        title: '例示商品タイトル',
        code: '1234',
        subTitle: '例示商品副題',
        description: '例示的な商品記述',
        rating: 4.5,
        image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
      }
    ],
    radioGroup: 1,
  }),
  methods: {
    reserve () {
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
    },
    navigateToPDP (itemCode) {
      this.$router.push({name : 'product-detail', params: {'code': itemCode}})
    }
  },
}
</script>

<style scoped>

</style>
