<template>
  <v-main>
    <!--  Banner  -->
    <v-img max-height="200px" width="100%" src="../image/image-plp-recommend.jpg"></v-img>
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
          key : '东京',
          value : 1
        },
        {
          key : '大阪',
          value : 2
        },
        {
          key : '京西',
          value : 3
        },
      ],
      type : [
        {
          key : '烤肉',
          value : 1
        },
        {
          key : '饮酒',
          value : 2
        },
        {
          key : '咖啡',
          value : 3
        },
      ],
      sort : [
        {
          key : '按销量',
          value : 1
        },
        {
          key : '按价格',
          value : 2
        },
        {
          key : '按距离',
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