<template>
  <div :loading="isLoading" class="loading-area">
    <div v-show="isLoading" :style="{ 'min-height': areaHeight }" class="loading">
      <div class="loading-icon">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
    </div>
    <div v-show="!isLoading">
      <slot />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    height: {
      type: Number,
      default: 400,
    },
  },
  computed: {
    areaHeight() {
      return `${this.height}px`
    },
    ...mapGetters({
      isLoading: 'layout/isLoading',
    }),
  },
}
</script>
<style scoped lang="scss">
.loading-area {
  width: 100%;
  > .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    .loading-icon {
      width: 32px;
      height: 32px;
      > img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
