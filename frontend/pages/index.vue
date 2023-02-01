<template>
<v-container fluid>
  <v-row fill-height>
      <v-col
        cols="4"
        md="4"
        sm="12"
      >
        <strong>Total Task</strong>
        <Todo />
      </v-col>
      <v-col
        cols="8"
        md="8"
        sm="12"
      >
        <v-row>
          <v-col
            v-for="j in 6"
            :key="`${j}`"
            cols="8"
            :md="`${12/3}`"
            :sm="`${12/3}`"
          >
            <strong>Task {{j}}</strong>
            <Todo />
          </v-col>
        </v-row>
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
