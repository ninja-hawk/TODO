<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      class="pt-4"
      color="grey lighten-3"
      app
      clipped-left
      bottom
      mobile-breakpoint="xs"
    >
      <v-btn
        v-for="n in 6"
        :key="n"
        :color="`grey ${n === 2 ? 'darken' : 'lighten'}-1`"
        text
        block
        class="text-center mx-auto mb-9"
        nuxt
        to = "#"
      >
      TODO {{n}}
      </v-btn>
    </v-navigation-drawer>


    <v-main class="grey lighten-2">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  // data: () => ({ drawer: null }),

  computed: {
    ...mapGetters({
      drawer: 'layout/drawer',
    })
  },

  methods: {
    ...mapActions('layout', ['pushDrawer'])
  }
}
</script>
