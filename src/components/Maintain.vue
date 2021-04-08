<template>
  <v-card
      className="mx-auto"
      style="padding-top: 12%"
      max-width="344"
  >
    <v-card-title>
      Coming Soon ...
    </v-card-title>

    <v-card-subtitle>
      即将开放功能
    </v-card-subtitle>


    <v-expand-transition>
      <div>
        <v-divider></v-divider>
        <v-card-text>
          {{ desc }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: "Building",
  props: {
    desc: String,
  }
}
</script>

<style scoped>

</style>