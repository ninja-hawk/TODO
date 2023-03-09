<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :value="drawer"
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
        link: "demo"
      },
      {
        name: "Open",
        link: "#"
      },
      {
        name: "Login",
        link: "login"
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
      switch(link){
        case "new": {
          const id = await this.newOpen()
          this.$router.push(`/todo/${id}`)
          break
        }
        case("login"): {
          this.login("google")
          break
        }
        case("demo"): {
          this.$router.push('/')
          break
        }
        default:
          console.log("now developing")
      }
    },
    async login(provider) {
      const API_URL = `${process.env.API_BASE_URL}/api`
      try {
        const response = await this.$axios.$get(`${API_URL}/login/${provider}`)
        window.location.href = response
      } catch (err) {
        console.log(err)
      }
    },
  }
}
</script>
