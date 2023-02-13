<template>
<v-container fluid>
  <v-row>
      <v-col
        md="4"
        sm="12"
        cols="12"
      >
        <strong>Total Todo</strong>
        <Todo />
      </v-col>
      <v-col
        v-if="! $vuetify.breakpoint.xs"
        md="8"
        sm="12"
        cols="12"
      >
        <v-row>
          <v-col
            v-for="j in 6"
            :key="`${j}`"
            :md="`${12/3}`"
            :sm="`${12/3}`"
            :cols="12"
          >
            <strong>Todo {{j}}</strong>
            <Todo single=false />
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

}

</script>
