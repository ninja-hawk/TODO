<template>
<v-container fluid>
  <v-row>
      <v-col
        md="4"
        sm="12"
        cols="12"
      >
        <strong>Total Todo</strong>
        <TodoDemo :total="true" />
      </v-col>
      <v-col
        v-if="! $vuetify.breakpoint.xs"
        md="8"
        sm="12"
        cols="12"
      >
        <v-row>
          <v-col
            v-for="j in subjects.length"
            :key="`${subjects.id}-${j}`"
            :md="`${subjects.length > 3 ? 4 : 12/subjects.length}`"
            :sm="`${subjects.length > 3 ? 4 : 12/subjects.length}`"
            :cols="12"
          >
            <strong>{{subjects[j-1].name}}</strong>
            <TodoDemo :single="false" :subjectnum="j-1" :subjectid="subjects[j-1].id"/>
          </v-col>
        </v-row>
      </v-col>
  </v-row>
  </v-container>
</template>

<script>
import { mapGetters} from 'vuex'
import TodoDemo from '~/components/TodoDemo'

export default {
  components: {
    TodoDemo,
  },
  computed: {
  ...mapGetters({
    subjects: 'tododemo/subjects'
  })
  }
}

</script>
