<template>
<v-container fluid>
  <v-row>
      <v-col
        cols="12"
      >
        <strong>Task {{$route.params.id}}</strong>
        <Todo />
      </v-col>
  </v-row>
  </v-container>
</template>

<script>
import Todo from '~/components/Todo'

export default {
  components: {
    Todo,
  },

  data: () => ({
     drawer: null
  }),
}
</script>
