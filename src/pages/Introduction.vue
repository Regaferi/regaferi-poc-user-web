<template>
  <v-card
    max-width="100%"

  >
    <v-toolbar color="#bf8860" dark>
      <v-toolbar-title>お知らせ</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-subheader
          v-if="item.header"
          :key="item.header"
          v-text="item.header"
        ></v-subheader>

        <v-divider
          v-else-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider>

        <v-list-item
          v-else
          :key="item.title"
        >

          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>
<script>
  export default {
    data: () => ({
      items: [
        { header: 'お知らせ' },
        {
          title: 'Brunch this weekend?',
          subtitle: ` I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { divider: true, inset: true },
        {
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: `to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: true },
        {
          title: 'Oui oui',
          subtitle: ' Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: true },
        {
          title: 'Birthday gift',
          subtitle: '  Have any ideas about what we should get Heidi for her birthday?',
        },
        { divider: true, inset: true },
        {
          title: 'Recipe to try',
          subtitle: ' We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
    }),
  }
</script>