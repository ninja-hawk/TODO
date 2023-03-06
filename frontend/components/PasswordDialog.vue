<template>
  <v-row justify="center">
    <v-dialog
      v-model="passwordDialog"
      persistent
    >
      <v-card>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="tempPassword"
              type="password"
              label="Password"
              hint="Needed for others to see this TODO. The author doesn't have to input every time."
              @keydown.enter="changeShareTrue"
            ></v-text-field>
            <v-spacer></v-spacer>
            After login as author, password is not needed.
            <nuxt-link to="#">Login</nuxt-link>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            plain
            @click="pushPasswordDialogFalse"
          >
            Close
          </v-btn>
          <v-btn
            color="primary"
            plain
            @click="changeShareTrue"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    todoId: {
      type: String,
      default: '0'
    },
  },
  data: () => ({
    tempPassword: null,
    dialog: false,
  }),
  computed:{
    ...mapGetters({
      password: 'layout/password',
      passwordDialog: 'layout/passwordDialog',
    })
  },
  methods: {
    ...mapActions('layout', ['pushPasswordDialogFalse']),
    ...mapActions('todos', ['pushPassword']),
    async changeShareTrue(){
      await this.pushPassword({id: this.todoId, password: this.tempPassword})
      this.pushPasswordDialogFalse()
    },
  }
}
</script>
