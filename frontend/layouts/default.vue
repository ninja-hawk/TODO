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
        v-for="menu in menus"
        :key="menu.name"
        color="grey lighten-1"
        text
        block
        class="text-center mx-auto mb-9"
        @click="transition(menu.link)"
      >
      {{menu.name}}
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
  data: () => ({
    menus: [
      {
        name: "New TODO",
        link: "new"
      },
      {
        name: "Demo TODO",
        link: "#"
      },
      {
        name: "Open",
        link: "#"
      },
      {
        name: "Login",
        link: "#"
      },
      {
        name: "Sign Up",
        link: "#"
      },
      {
        name: "Logout",
        link: "#"
      }
    ]
   }),

  computed: {
    ...mapGetters({
      drawer: 'layout/drawer',
    })
  },

  methods: {
    ...mapActions('layout', ['pushDrawer']),
    ...mapActions('todos', ['newOpen']),

    async transition(link){
      console.log("test")
      switch(link){
        case "new": {
          const id = await this.newOpen()
          console.log(id)
          this.$router.push(`/todo/${id}`)
          break
        }
        default:
          // this.$router.push('/')
      }
    }
  }
}
</script>
