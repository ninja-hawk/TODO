<template>
  <div>
    <LoadingArea />
  </div>
</template>

<script>
import LoadingArea from '~/components/LoadingArea'
const API_URL = `${process.env.API_BASE_URL}/api`

export default {
  components: {
    LoadingArea,
  },
  mounted(){
    this.login("google")
  },
  methods: {
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
