<template>
<v-app>
    <v-app-bar color="orange" app clipped-left>
      <v-app-bar-nav-icon color="white" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">TODO</v-toolbar-title>
    </v-app-bar>

  <v-app>
    <div>layout</div>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</v-app>
</template>
