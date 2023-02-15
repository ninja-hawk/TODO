<template>
<v-container fluid>
      <v-app-bar app clipped-right>
      <v-app-bar-nav-icon @click.stop="pushDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <input ref="title" type="text" :value="title" @change="modifyTitle">
      </v-toolbar-title>
      <v-btn v-if="share" icon @click="pushShare($route.params.id)">
        <v-icon>mdi-link</v-icon>
      </v-btn>
      <v-btn v-else icon  @click="pushShare($route.params.id)">
        <v-icon>mdi-link-lock</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <div>
        <LoadingArea />
        <div v-show="!isLoading">
          最終変更
          <p v-if="! $vuetify.breakpoint.xs">{{lastModified}}</p>
          <p v-else>{{$moment(lastModified).format('MM/DD HH:mm')}}</p>
        </div>
      </div>

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
            :key="item.id"
          >
            {{ item.name }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>


  <v-card v-show="title !== null">
    <v-tabs-items v-model="tab" continuous>
      <v-tab-item key="Total">
        <Total />
      </v-tab-item>
      <v-tab-item
        v-for="i in subjects.length"
        :key="`${subjects.id}-${i}`"
      >
        <strong><input ref="nameindex" type="text" :value="subjects[i-1].name" @change="modifyName(subjects[i-1].id,i)"></strong>
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
import LoadingArea from '~/components/LoadingArea'

export default {
  components: {
    Todo,
    Total,
    LoadingArea
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
      subjects: 'todos/subjects',
      isLoading: 'layout/isLoading',
      lastModified: 'layout/lastModified'
    })
  },

  async mounted (){
    await this.getTodo(this.$route.params.id)
  },

  methods: {
    ...mapActions('todos', ['pushShare','pushTitle','getTodo','pushName']),
    ...mapActions('layout', ['pushDrawer']),
    modifyTitle(){
      this.pushTitle({id: this.$route.params.id, title: this.$refs.title.value})
    },
    modifyName(sid,i){
      this.pushName({id: sid, name: this.$refs.nameindex[i-1].value})
    }
  }
}

window.addEventListener('beforeunload', function (e) {
      // イベントをキャンセルする
      e.preventDefault();
      // Chrome では returnValue を設定する必要がある
      e.returnValue = '';
});
</script>


