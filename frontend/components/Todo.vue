<template>
<v-app>
  <v-container style="max-width: 500px">
    <v-text-field
      v-model="newTask"
      label="What are you working on?"
      solo
      @keydown.enter="createNewTask"
    >
      <template #append>
        <v-fade-transition>
          <v-icon
            v-if="newTask"
            @click="createNewTask"
          >
            mdi-plus-circle
          </v-icon>
        </v-fade-transition>
      </template>
    </v-text-field>

    <h2 class="text-h4 success--text pl-4">
      Tasks:&nbsp;
      <v-fade-transition leave-absolute>
        <span :key="`tasks-${tasks.length}`">
          {{ tasks.length }}
        </span>
      </v-fade-transition>
    </h2>

    <v-divider class="mt-4"></v-divider>

    <v-row
      class="my-1"
      align="center"
    >
      <strong class="mx-4 info--text text--darken-2">
        Remaining: {{ remainingTasks }}
      </strong>

      <v-divider vertical></v-divider>

      <strong class="mx-4 success--text text--darken-2">
        Completed: {{ completedTasks }}
      </strong>

      <v-spacer></v-spacer>

      <v-progress-circular
        :value="progress"
        class="mr-2"
      ></v-progress-circular>
    </v-row>

    <v-divider class="mb-4"></v-divider>

    <v-card v-if="tasks.length > 0">
      <v-slide-y-transition
        class="py-0"
        group
        tag="v-list"
      >
        <template v-for="(task, i) in tasks">
          <v-divider
            v-if="i !== 0"
            :key="`${i}-divider`"
          ></v-divider>

          <v-list-item :key="`${i}-${task.text}`">

              <v-checkbox
                :input-value="task.done"
                :color="task.done && 'grey' || 'primary'"
                @change="setDone(task.id)"
              ></v-checkbox>

                <div
                  :class="task.done && 'grey--text' || 'primary--text'"
                  class="ml-4"
                >
                  <!-- タイムスタンプ -->
                  <div v-show="!single">
                    <v-chip v-if="task.due" small  class="ma-2" style="font-size: 50%;">
                      {{ $moment(task.due).format('MM/DD HH:mm') }}
                      <!-- ミーティングフラグ -->
                      <v-btn v-if="task.mtg" icon @click="setMtg (task.id)">
                        <v-icon color="red" size="x-small">mdi-human-greeting-proximity</v-icon>
                      </v-btn>
                      <v-btn v-if="!task.mtg" icon @click="setMtg (task.id)">
                        <v-icon size="x-small">mdi-human-greeting-proximity</v-icon>
                      </v-btn>
                    </v-chip>
                    <v-chip v-else class="ma-2" style="font-size: 50%;">
                      set deadline
                      <v-btn v-if="task.mtg" icon @click="setMtg (task.id)">
                        <v-icon color="red" size="x-small">mdi-human-greeting-proximity</v-icon>
                      </v-btn>
                      <v-btn v-if="!task.mtg" icon @click="setMtg (task.id)">
                        <v-icon size="x-small">mdi-human-greeting-proximity</v-icon>
                      </v-btn>
                    </v-chip>
                  </div>

                  <!-- TODO内容 -->
                  <v-text-field
                    :value="task.text"
                    dense
                    variant="plain"
                    hide-details="false"
                    class="mx-auto"
                    @keydown.enter="modifyTask(task.id, task.text)"
                  >
                    <!-- 優先フラグ -->
                    <template #append>
                      <p v-show="!single && !task.done">
                        <v-btn v-if="task.priority" icon @click="setPriority (task.id)">
                          <v-icon color="red" size="small">mdi-exclamation-thick</v-icon>
                        </v-btn>
                        <v-btn v-if="!task.priority" icon @click="setPriority (task.id)">
                          <v-icon  size="small">mdi-exclamation-thick</v-icon>
                        </v-btn>
                      </p>
                    </template>
                  </v-text-field>

                </div>

            <v-spacer></v-spacer>

            <v-scroll-x-transition>
              <v-icon
                v-if="task.done"
                color="success"
              >
                mdi-check
              </v-icon>
            </v-scroll-x-transition>
          </v-list-item>
        </template>
      </v-slide-y-transition>
    </v-card>
  </v-container>
</v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'


  export default {
    filters: {
      omittedText(text, single) {
      return single && text.length > 6 ? text.slice(0, 6) + "…" : text;
      },
    },
    props:{
      single: {
        type: Boolean,
        default: false
      },
      subjectId: {
        type: Number,
        default: 0
      }
    },
    data: () => ({
      newTask: null,
    }),
    computed: {
      ...mapGetters({
        subjects: 'todos/subjects'
      }),
      tasks () {
        return this.subjects[this.subjectId].task
      },
      completedTasks () {
        return this.tasks.filter(task => task.done).length
      },
      progress () {
        return this.completedTasks / this.tasks.length * 100
      },
      remainingTasks () {
        return this.tasks.length - this.completedTasks
      },

    },
    methods: {
      ...mapActions('todos', ['pushTask', 'pushPriority', 'pushMtg', 'pushDue', 'pushDone','changeTask']),
      createNewTask () {
        this.pushTask({subjectId: this.subjectId, newTask: this.newTask})
        this.newTask = null
      },
      modifyTask (id, newtext){
        this.changeTask({subjectId: this.subjectId, taskId: id, text: newtext})
      },
      setDone (id){
        this.pushDone({subjectId: this.subjectId, taskId: id})
      },
      setPriority (id) {
        this.pushPriority({subjectId: this.subjectId, taskId: id})
      },
      setMtg (id) {
        this.pushMtg({subjectId: this.subjectId, taskId: id})
      },
      setDue (id, newDue) {
        console.log("test")
        this.pushDue({subjectId: this.subjectId, taskId: id, due: newDue})
        this.modal = false
      },
    },
  }
</script>
