<template>
  <LoadingArea />
</template>

<script>
import LoadingArea from '~/components/LoadingArea'

export default {
  components: {
    LoadingArea,
  },
  async mounted () {
    const API_URL = `${process.env.API_BASE_URL}/api`
    try {
      const response = await this.$axios.$get(`${API_URL}/login/google/callback`, { params: this.$route.query })
      this.$store.commit('setToken', {token: response.access_token})
      this.$store.commit('setUser', {user: response.user})
      this.$router.replace('/todo/26')
      this.$cookies.set('todoLoggedIn', true)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
