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
      items: [
        {
          id:1,
          title: 'Frozen Yogurt',
          share: 159,
          updated_at: this.$moment(new Date()).format('MM/DD HH:mm'),
        },
        {
          id:2,
          title: 'Frozen Yogurt',
          share: 159,
          updated_at: this.$moment(new Date()).format('MM/DD HH:mm'),
        },
        {
          id:3,
          title: 'Frozen Yogurt',
          share: 159,
          updated_at: this.$moment(new Date()).format('MM/DD HH:mm'),
        },
      ],
    }
  },
  computed:{
  ...mapGetters({
    isLoading: 'layout/isLoading',
    user: 'user/user'
  }),
  },
  mounted(){
    this.getUser(this.$cookies.get('todoUserId'))
  },
  methods: {
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
    }
  }
}
</script>