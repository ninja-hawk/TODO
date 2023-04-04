<template>
  <v-row justify="center">
    <v-dialog
      v-model="sortDialog"
      persistent
    >
      <v-card>
        <v-card-text>
          <v-container>
            <draggable v-model="beforeSortedSubject">
              <div v-for="item in beforeSortedSubject" :key="item.id">
                {{ item.name }}
              </div>
            </draggable>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            plain
            @click="pushSortDialogFalse"
          >
            Close
          </v-btn>
          <v-btn
            color="primary"
            plain
            @click="sortTodo"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import draggable from 'vuedraggable'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { draggable },
  data: () => ({
    beforeSortedSubject: [],
  }),
  fetch(){
    this.beforeSortedSubject = this.subjects
  },
  computed:{
    ...mapGetters({
      sortDialog: 'layout/sortDialog',
      subjects: 'todos/subjects',
    })
  },
  methods: {
    ...mapActions('layout', ['pushSortDialogFalse']),
    ...mapActions('todos', ['pushSortSubject']),
    async sortTodo(){
      await this.pushSortSubject(this.beforeSortedSubject)
      this.pushSortDialogFalse()
    },
  }
}
</script>
