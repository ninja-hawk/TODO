<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      class="pt-4"
      color="grey lighten-3"
      app
      mini-variant
      clipped
      expand-on-hover
    >
      <v-avatar
        v-for="n in 6"
        :key="n"
        :color="`grey ${n === 2 ? 'darken' : 'lighten'}-1`"
        :size="n === 2 ? 36 : 20"
        class="d-block text-center mx-auto mb-9"
      ></v-avatar>
    </v-navigation-drawer>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>TODO</v-toolbar-title>
      <template #extension>
        <v-tabs v-model="model" right>
          <v-tab nuxt to="/">Total TODO</v-tab>
          <v-tab
            v-for = "i in 6"
            :key="i"
            nuxt
            :to = "{path: `/todo/${i}`}"
          >
            Todo {{i}}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main class="grey lighten-2">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ drawer: null }),
  }
</script>
