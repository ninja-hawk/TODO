<template>
  <v-container style="max-width: 100%">
    <div
      :class="task.done && 'grey--text' || 'primary--text'"
      class="ml-4"
    >
      <!-- タイムスタンプ -->
      <div >
        <v-chip small   :style="`font-size: ${single ? 50 : 10}%;`">
          <input v-if="single" ref="newdate" type="date" :style="`width: ${single ? 100 : 50}%; box-sizing: border-box;`" :value="task.due" @change="setDue(task.id, task.subject_id)">
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
        @change="modifyTask(task.id, task.subject_id)"
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
  </v-container>
</template>

<script>
import {mapActions } from 'vuex'

export default {
  props:{
    task: {
      type: Object,
      default: () =>({
        id: 563,
        subject_id: 4,
        done: false,
        text: "rerum",
        due: "2023-02-08 13:00:00",
        time: "",
        mtg: true,
        priority: true
      })
    },
    single: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    ...mapActions('todos', ['pushTask', 'pushPriority', 'pushMtg', 'pushDue', 'pushDone','changeTask','pushName']),
    modifyTask (id,sid){
      this.changeTask({subjectid: sid, taskId: id, text: this.$refs.newtask.value})
    },
    setPriority (id,sid) {
      this.pushPriority({subjectid: sid, taskId: id})
    },
    setMtg (id,sid) {
      this.pushMtg({subjectid: sid, taskId: id})
    },
    async setDue (id,sid) {
      await this.pushDue({subjectid: sid, taskId: id, due: this.$refs.newdate.value})
      this.modal = false
    },
  },
}
</script>

