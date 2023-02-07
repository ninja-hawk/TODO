<template>
<v-container fluid>
      <v-app-bar app clipped-right>
      <v-app-bar-nav-icon @click.stop="pushDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>TODO</v-toolbar-title>
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
            v-for="item in items"
            :key="item"
          >
            {{ item }}
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
        v-for="item in items"
        :key="item"
      >
        <strong>{{item}}</strong>
        <Todo />
      </v-tab-item>
    </v-tabs-items>
  </v-card>


  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import Todo from '~/components/Todo'
import Total from '~/components/Total'

export default {
  components: {
    Todo,
    Total
  },

  data: () => ({
    tab: null,
    items: [
      'Todo1', 'Todo2', 'Todo3','Todo4', 'Todo5', 'Todo6',
    ],
  }),

  methods: {
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
