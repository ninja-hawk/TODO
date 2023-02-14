<template>
<v-container fluid>
      <v-app-bar app clipped-right>
      <v-app-bar-nav-icon @click.stop="pushDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-text-field v-model="title" dense hide-details="false"  class="font-weight-black" @input="pushTitle"></v-text-field>
      </v-toolbar-title>
      <v-btn v-if="share" icon @click="pushShare">
        <v-icon>mdi-link</v-icon>
      </v-btn>
      <v-btn v-else icon  @click="pushShare">
        <v-icon>mdi-link-lock</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <p v-if="! $vuetify.breakpoint.xs">最終変更 {{new Date()}}</p>
      <p v-else>最終変更 {{$moment(new Date()).format('MM/DD HH:mm')}}</p>

      <template #extension>
        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="basil"
          grow
        >
          <v-tab key="Total">
            Total
          </v-tab>
          <v-tab
            v-for="item in subjects"
            :key="item"
          >
            {{ item.name }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>


  <v-card color="basil">

    <v-tabs-items v-model="tab" continuous>
      <v-tab-item key="Total">
        <Total />
      </v-tab-item>
      <v-tab-item
        v-for="i in subjects.length"
        :key="subjects[i-1].name"
      >
        <strong>{{subjects[i-1].name}}</strong>
        <Todo :subjectnum="i-1" :subjectid="subjects[i-1].id" />
      </v-tab-item>
    </v-tabs-items>
  </v-card>


  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Todo from '~/components/Todo'
import Total from '~/components/Total'

export default {
  components: {
    Todo,
    Total
  },
  data: () => ({
    tab: null,
  }),
  head() {
  return {
    // nuxt.config.jsの%sに反映される内容
    title: this.title
  }
  },


  computed:{
    ...mapGetters({
      share: 'todos/share',
      title: 'todos/title',
      subjects: 'todos/subjects'
    })
  },

  methods: {
    ...mapActions('todos', ['pushShare','pushTitle']),
    ...mapActions('layout', ['pushDrawer'])
  }
}
// window.addEventListener('beforeunload', function (e) {
//   // イベントをキャンセルする
//   e.preventDefault();
//   // Chrome では returnValue を設定する必要がある
//   e.returnValue = '';
// });
</script>


