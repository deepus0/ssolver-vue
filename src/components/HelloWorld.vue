<script setup lang="ts">
import GridTemplate from './GridTemplate.vue'
import { ref } from 'vue'
import { solve } from '../logic/logic';
import { EndGrid, Grid } from '../logic/models';

defineProps<{ msg: string }>()



let grids: EndGrid[] = [];

const count = ref(0)

function getGrids() {
  count.value++;
  grids = solve();
  console.log(grids);
}

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="getGrids()">count is {{ count }}</button>

    <div v-for="grid in grids">
      <GridTemplate :grid="grid" class="grid-template"/>
    </div>

  </div>
</template>

<style scoped>
.grid-template {
  margin-top: 2em;
  margin-bottom: 2em;
}
.read-the-docs {
  color: #888;
}
</style>
