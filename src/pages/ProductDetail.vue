<template>
  <v-main>
    <div>
      <!--  商品轮播图   -->
      <v-carousel
          cycle
          height="260"
          hide-delimiter-background
          hide-delimiters
          show-arrows-on-hover
      >
        <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
            reverse-transition="fade-transition"
            transition="fade-transition"
        >
          <v-sheet
              :color="colors[i]"
              height="100%"
          >
            <v-row
                class="fill-height"
                align="center"
                justify="center"
            >
              <div class="display-3">
                {{ slide }} Slide
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <!--  商品基本信息   -->
      <v-row>
        <v-col cols="10"><v-card-title>{{ product.title }}</v-card-title></v-col>
        <v-col cols="2"><v-icon class="pt-5">mdi-heart</v-icon></v-col>
      </v-row>

      <v-card-text>
        <v-row align="center" class="mx-0 pb-3">
          <v-rating :value="product.rating" color="amber" dense half-increments readonly size="14"/>
        </v-row>
        <h6>{{ product.subTitle }}</h6>
      </v-card-text>
      <v-divider/>
      <v-card-subtitle>营业时间</v-card-subtitle>
      <v-chip-group column class="pl-5 pb-3">
        <v-chip x-small>5:30PM</v-chip>
        <v-chip x-small>7:30PM</v-chip>
        <v-chip x-small>8:00PM</v-chip>
        <v-chip x-small>9:00PM</v-chip>
      </v-chip-group>
      <v-divider/>
      <!--  售卖规格   -->
      <v-card-subtitle>售卖规格</v-card-subtitle>
      <v-card-text>
        <v-card outlined>
          <v-row>
            <v-col cols="8">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>套餐 A</v-list-item-title>
                  <v-list-item-subtitle>
                    包含 ABCDE
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="4">
              <h4 class="pt-5">$500</h4>
            </v-col>
          </v-row>
        </v-card>
        <div class="pt-2"/>
        <v-card outlined>
          <v-row>
            <v-col cols="8">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>套餐 A</v-list-item-title>
                  <v-list-item-subtitle>
                    包含 ABCDE
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="4">
              <h4 class="pt-5">$500</h4>
            </v-col>
          </v-row>
        </v-card>
      </v-card-text>

      <v-divider/>
      <!--  商品评价   -->
      <v-card-subtitle>商品评价</v-card-subtitle>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"/>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>顾客 A</v-list-item-title>
          <v-list-item-subtitle>
            Good!
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"/>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>顾客 A</v-list-item-title>
          <v-list-item-subtitle>
            Good!
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"/>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>顾客 A</v-list-item-title>
          <v-list-item-subtitle>
            Good!
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-card-text style="color: blue">查看更多</v-card-text>
      <v-divider/>
      <!--  商品描述   -->
      <v-card-text>
        <h6>{{ product.description }}</h6>
        <h6>{{ product.description }}</h6>
        <h6>{{ product.description }}</h6>
        <h6>{{ product.description }}</h6>
      </v-card-text>
    </div>

    <v-bottom-navigation color="primary" horizontal app>
      <v-btn>
        <span>Service</span>
        <v-icon>mdi-face-agent</v-icon>
      </v-btn>
      <v-divider
          class="mx-4"
          vertical
      ></v-divider>
      <v-btn @click="navigateTo(product.code)">
        <span>Buy Now</span>
        <v-icon>mdi-check-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-main>
</template>

<script>
export default {
  name: "PDP",
  data() {
    return {
      product : {
        title: '例示商品タイトル',
        code: '1234',
        subTitle: '例示商品副題',
        description: '例示的な商品記述',
        rating: 4.5,
        image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
      },
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
    }
  },
  methods : {
    navigateTo : function (code){
      this.$router.push({name : 'order-confirm', params: {'code': code}})
    }
  }
}
</script>

<style scoped>

</style>