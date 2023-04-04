<template>
<v-container fluid>
      <v-app-bar app clipped-right>
      <v-app-bar-nav-icon @click.stop="pushDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <input ref="title" type="text" :value="title" @change="modifyTitle">
      </v-toolbar-title>
      <v-btn v-if="share" icon @click="changeShareFalse">
        <v-icon>mdi-link</v-icon>
      </v-btn>
      <v-btn v-else icon  @click="pushPasswordDialogTrue">
        <v-icon>mdi-link-lock</v-icon>
      </v-btn>
      <v-spacer><PasswordDialog :todoId="$route.params.id" /><SortDialog /></v-spacer>
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
          <v-tab key="Add">
            <v-icon>mdi-plus-circle-outline</v-icon>
            Add
            <v-icon>mdi-sort</v-icon>
            Sort
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>


  <v-card v-show="title !== ''">
    <v-tabs-items v-model="tab" continuous>
      <v-tab-item key="Total">
        <Total />
      </v-tab-item>
      <v-tab-item
        v-for="i in subjects.length"
        :key="`${subjects.id}-${i}`"
      >
        <Todo :subjectnum="i-1" :subjectid="subjects[i-1].id" />
      </v-tab-item>
      <v-tab-item>
        <v-row align-content="center">
          <v-col align="center">
            <v-card fill-height class="py-16">
                <v-btn  block color="primary" class="my-4" @click="pushSubject($route.params.id)">
                    <v-icon>mdi-plus-circle-outline</v-icon>
                    Add new Todo
                </v-btn>
                <v-btn  block color="success" class="my-4" @click="pushSortDialogTrue">
                    <v-icon>mdi-sort</v-icon>
                    Sort Todo
                </v-btn>
            </v-card>
          </v-col>
        </v-row>
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
import PasswordDialog from '~/components/PasswordDialog'
import SortDialog from '~/components/SortDialog'

export default {
  components: {
    Todo,
    Total,
    LoadingArea,
    PasswordDialog,
    SortDialog
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
    ...mapActions('todos', ['pushShare','pushTitle','getTodo','pushName','pushSubject']),
    ...mapActions('layout', ['pushDrawer','pushPasswordDialogTrue', 'pushPasswordDialogFalse','pushSortDialogTrue', 'pushSortDialogFalse']),
    modifyTitle(){
      this.pushTitle({id: this.$route.params.id, title: this.$refs.title.value})
    },
    changeShareFalse(){
      if(window.confirm("Do you really want to stro sharing?")){
        this.pushShare(this.$route.params.id)
        this.pushPasswordDialogFalse()
      }
    }
  }
}

window.addEventListener('beforeunload', function (e) {
      if(this.isLoading){
        // イベントをキャンセルする
        e.preventDefault();
        // Chrome では returnValue を設定する必要がある
        e.returnValue = '';
      }
});
</script>


