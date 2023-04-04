<template>
  <div class="sample">
    <div style="margin-top: 20px;">
      <h1>vuedraggableプラグインサンプル</h1>
    </div>
    <div style="margin-top: 20px;">
      <div style="width: 50%; margin-left: 25%;">
        <draggable v-model="arrayList">
          <div
            v-for="elem in arrayList"
            :key="elem.id"
            style="
              background-color: aliceblue;
              padding: 20px;
              margin-bottom: 15px;
            "
          >
            {{ elem.param }}
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'

export default {
  components: { draggable },
  data() {
    return {
      arrayList: [
        { id: 1, param: 'Test List1' },
        { id: 2, param: 'Test List2' },
        { id: 3, param: 'Test List3' },
      ],
    }
  },
}
</script>
<style>
.sample {
  margin: 0 auto;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
