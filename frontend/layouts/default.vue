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
const API_URL = `${process.env.API_BASE_URL}/api`

export default {
  data: () => ({
    menus: [],
    defaultMenus: [
      {
        name: "Demo TODO",
        link: "demo"
      },
      {
        name: "Login",
        link: "login"
      }
    ],
    loggedInMenu: [
      {
        name: "Mypage",
        link: "mypage"
      },
      {
        name: "New TODO",
        link: "new"
      },
      {
        name: "Demo TODO",
        link: "demo"
      },
      {
        name: "Logout",
        link: "logout"
      }
    ]
   }),


  computed: {
    ...mapGetters({
      loggedIn: 'loggedIn',
      user: 'user',
      drawer: 'layout/drawer',
    }),
  },
  created() {
    this.setMenu()
  },

  methods: {
    ...mapActions('layout', ['pushDrawer']),
    ...mapActions('todos', ['newOpen']),
    ...mapActions(['logout']),

    setMenu(){
      if(this.$cookies.get('todoLoggedIn')){
        this.menus = this.loggedInMenu
      }
      else {
        this.menus = this.defaultMenus
      }
    },

    async transition(link){
      switch(link){
        case "new": {
          const id = await this.newOpen(this.$cookies.get('todoUserId'))
          this.$router.push(`/todo/${id}`)
          break
        }
        case "mypage": {
          this.$router.push(`/mypage`)
          break
        }
        case("login"): {
          this.login("google")
          this.$router.push('/mypage')
          break
        }
        case("logout"): {
          this.logout(this.$cookies.get('todoUserId'))
          this.setMenu()
          this.$router.push('/')
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
