<template>
  <LoadingArea />
</template>

<script>
import LoadingArea from '~/components/LoadingArea'

export default {
  components: {
    LoadingArea,
  },
  mounted(){
    this.$store.commit('layout/loadingTrue');
    if(this.$cookies.get('todoLoggedIn') ){
      this.$store.commit('layout/loadingFalse');
      this.$router.push('/mypage')
    }
    else{
      this.$store.commit('layout/loadingFalse');
      this.$router.push('/demo')
    }
  },
}
</script>
