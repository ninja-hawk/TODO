<template>
<v-app>
  <v-container style="max-width: 500px">
    <v-text-field
      v-show="!total"
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
        <span :key="`todoTasks-${todoTasks.length}-${subjectid}`">
          {{ todoTasks.length }}
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

    <v-card v-if="todoTasks.length > 0">
      <v-slide-y-transition
        class="py-0"
        group
        tag="v-list"
      >
        <template v-for="(task, i) in todoTasks">
          <v-divider
            v-if="i !== 0"
            :key="`${i}-divider-${subjectid}`"
          ></v-divider>

          <v-list-item :key="`${i}-${task.text}-${subjectid}`">

              <v-checkbox
                :input-value="task.done"
                :color="task.done && 'grey' || 'primary'"
                @change="setDone(task.id, task.subject_id)"
              ></v-checkbox>

                <div
                  :class="task.done && 'grey--text' || 'primary--text'"
                  class="ml-4"
                >
                  <!-- タイムスタンプ -->
                  <div >
                    <v-chip small   :style="`font-size: ${single ? 50 : 10}%;`">
                      <input v-if="single" ref="newdate" type="date" :style="`width: ${single ? 100 : 50}%; box-sizing: border-box;`" :value="task.due" @change="setDue(task.id, task.subject_id,i)">
                      <div v-else-if="!single && task.due !== null">{{ $moment(task.due).format('MM/DD') }}</div>
                      <div v-else>non set</div>
                      <!-- ミーティングフラグ -->
                      <div v-show="single">
                        <v-btn v-if="task.mtg" icon @click="setMtg (task.id, task.subject_id)">
                          <v-icon color="red" size="x-small">mdi-human-greeting-proximity</v-icon>
                        </v-btn>
                        <v-btn v-if="!task.mtg" icon @click="setMtg (task.id, task.subject_id)">
                          <v-icon size="x-small">mdi-human-greeting-proximity</v-icon>
                        </v-btn>
                      </div>
                    </v-chip>
                  </div>

                  <!-- TODO内容 -->
                  <input
                    ref="newtask"
                    type="text"
                    :value="task.text"
                    :style="`width: ${single ? 100 : 50}%; box-sizing: border-box;`"
                    @change="modifyTask(task.id, task.subject_id, i)"
                  />
                    <!-- 優先フラグ -->
                      <p v-show="single && !task.done" style="display: inline;">
                        <v-btn v-if="task.priority" icon @click="setPriority (task.id, task.subject_id)">
                          <v-icon color="red" size="small">mdi-exclamation-thick</v-icon>
                        </v-btn>
                        <v-btn v-if="!task.priority" icon @click="setPriority (task.id, task.subject_id)">
                          <v-icon  size="small">mdi-exclamation-thick</v-icon>
                        </v-btn>
                      </p>

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
      default: true
    },
    subjectnum: {
      type: Number,
      default: 0
    },
    // 登録時に使うもの基本的にはタスクから取得
    subjectid: {
      type: Number,
      default: 0
    },
    total: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    newTask: null,
    allTask: []
  }),
  computed: {
    ...mapGetters({
      subjects: 'tododemo/subjects'
    }),
    todoTasks () {
      if(this.total){
        this.getAllTask()
        return this.allTask
      }
      else{
        return this.subjects[this.subjectnum].tasks
      }
    },
    completedTasks () {
      return this.todoTasks.filter(task => task.done).length
    },
    progress () {
      return this.completedTasks / this.todoTasks.length * 100
    },
    remainingTasks () {
      return this.todoTasks.length - this.completedTasks
    },

  },
  methods: {
    ...mapActions('tododemo', ['pushTask', 'pushPriority', 'pushMtg', 'pushDue', 'pushDone','changeTask']),
    getAllTask(){
      this.allTask = []
      this.subjects.forEach(element => {
        this.allTask = this.allTask.concat(element.tasks)
      });
    },
    createNewTask () {
      this.pushTask({subjectid: this.subjectid, newTask: this.newTask})
      this.newTask = null
    },
    modifyTask (id,sid,i){
      this.changeTask({subjectid: sid, taskId: id, text: this.$refs.newtask[i].value})
    },
    setDone (id,sid){
      this.pushDone({subjectid: sid, taskId: id})
    },
    setPriority (id,sid) {
      this.pushPriority({subjectid: sid, taskId: id})
    },
    setMtg (id,sid) {
      this.pushMtg({subjectid: sid, taskId: id})
    },
    setDue (id,sid,i) {
      this.pushDue({subjectid: sid, taskId: id, due: this.$refs.newdate[i].value})
      this.modal = false
    },
  },
}
</script>
