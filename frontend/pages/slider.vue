<template>
<div>
      <v-col
      cols="12"
      sm="6"
      md="4"
    >

    <v-chip small>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker in menu"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>

      <v-dialog
        ref="dialog"
        v-model="modal2"
        :return-value.sync="time"
        persistent
        width="290px"
      >
        <template #activator="{ on, attrs }">
          <v-text-field
            v-model="time"
            label="Picker in dialog"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="modal2"
          v-model="time"
          full-width
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modal2 = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dialog.save(time)"
          >
            OK
          </v-btn>
        </v-time-picker>
      </v-dialog>

    </v-chip>

    </v-col>
  <div>bdg</div>
  <div>

  </div>
</div>

</template>

<script>
  export default {
    data: () => ({
      date: null,
      time: null,
      menu: false,
      modal: false,
      modal2: false
    }),
  }
</script>

