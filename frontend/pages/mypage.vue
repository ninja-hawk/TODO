<template>
  <v-container fluid>
      <v-app-bar app clipped-right>
      <v-app-bar-nav-icon @click.stop="pushDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-avatar size="36px">
          <v-img
            :src="`${$cookies.get('todoUser').avatar}`"
            alt="John"
          ></v-img>
        </v-avatar>
        {{$cookies.get("todoUser").name}}
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>


  <v-card
    class="mx-auto pa-2"
    max-width="100%"
  >
    <v-card-title>
      My TODOs
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="user.todos"
      show-select
      hide-default-footer
      sort-by="updated_at"
      :sort-desc="true"
      :search="search"
      :loading="isLoading"
      loading-text="Loading... Please wait"
      @click:row="moveTodo"
    >
      <template #[`item.share`]="{ item }">
        <v-icon v-if="item.share">mdi-link</v-icon>
        <v-icon v-else>mdi-link-lock</v-icon>
      </template>
      <template #[`item.updated_at`]="{ item }">
        {{$moment(item.updated_at).format('MM/DD HH:mm')}}
      </template>
    </v-data-table>
      <v-btn
        small
        block
        color="primary"
        class="my-5 mx-1"
        align="center"
        @click="createNewTodo">
        <v-icon>mdi-plus-circle-outline</v-icon>
        Add new Todo
      </v-btn>
      <v-btn
        v-show="selected.length !== 0"
        small
        block
        outlined
        color="error"
        class="my-5 mx-1"
        align="center"
        @click="deleteTodos"
      >
        <v-icon>mdi-close-circle-outline</v-icon>
        Delete TODO
      </v-btn>
  </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      search: '',
      selected: [],
      headers: [
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Share',
          value: 'share',
        },
        { text: 'Last Update',
          value: 'updated_at'
        },
      ],
    }
  },
  head() {
    return {
      // nuxt.config.jsの%sに反映される内容
      title: this.$cookies.get("todoUser").name
    }
  },
  computed:{
  ...mapGetters({
    isLoading: 'layout/isLoading',
    user: 'user/user'
  }),
  },
  created() {
    if(! this.$cookies.get('todoLoggedIn')){
      this.$router.push(`/`)
    }
  },
  mounted(){
    this.getUser(this.$cookies.get('todoUserId'))
  },
  methods: {
    ...mapActions('todos', ['newOpen']),
    ...mapActions('user', ['getUser','deleteTodo']),
    ...mapActions('layout', ['pushDrawer']),
    // 表示ボタンが押下された時に呼び出される。
    async deleteTodos() {
      if(window.confirm("Do you really want to delete?")){
        for (const todo of this.selected){
            await this.deleteTodo(todo.id)
          }
      }
    },
    moveTodo(item) {
      this.$router.push(`/todo/${item.id}`)
    },
    async createNewTodo(){
      const id = await this.newOpen(this.$cookies.get('todoUserId'))
      this.$router.push(`/todo/${id}`)
    }
  }
}
</script>
