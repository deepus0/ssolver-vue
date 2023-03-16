<script setup lang="ts">
import { Grid } from '../logic/models';

defineProps<{ grid: Grid }>()

</script>

<template>
    <div class="">
        <h3>{{ grid.name }}</h3>
        <div class="grid">
            <div class="cell" v-for="cell in grid.cells">
                {{ cell.allocated !== 0 ? cell.allocated : '' }}
            </div>
        </div>
    </div>
</template>

<style scoped>
    .grid {
        display: grid;
        grid-template-columns: repeat(9, 1fr);
    }
    .cell {
        display: block;
        border: 1px solid #555;
        font-size: 1.2rem;
        width: 1.6em;
        height: 1.6em;
        justify-content: center;
        text-align: center;
        align-items: center;
    }
</style>
