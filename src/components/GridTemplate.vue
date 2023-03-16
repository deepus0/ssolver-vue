<script setup lang="ts">
import { Cell, EndGrid, Grid } from '../logic/models';

defineProps<{ grid: EndGrid }>()

function cellClick(cell: Cell) {
    console.log(cell);
}

</script>

<template>
    <div class="">
        <h3>{{ grid.endGrid.name }}</h3>
        <div class="grids">
            <div class="grid">
                <div class="cell" v-for="cell in grid.expectedGrid.cells" @click="cellClick(cell)">
                    {{ cell.allocated !== 0 ? cell.allocated : '' }}
                </div>
            </div>
            <div class="grid">
                <div class="cell" v-for="cell in grid.originalGrid.cells" @click="cellClick(cell)">
                    {{ cell.allocated !== 0 ? cell.allocated : '' }}
                </div>
            </div>
            <div class="grid">
                <div class="cell" v-for="cell in grid.endGrid.cells" @click="cellClick(cell)">
                    {{ cell.allocated !== 0 ? cell.allocated : '' }}
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    border: 2px solid white;
}

.grid .cell:nth-child(9n - 3) {
    border-right: 2px solid white;
}

.grid .cell:nth-child(9n - 6) {
    border-right: 2px solid white;
}

.grid .cell:nth-child(n + 19):nth-child(-n + 27) {
    border-bottom: 2px solid white;
}

.grid .cell:nth-child(n + 46):nth-child(-n + 54) {
    border-bottom: 2px solid white;
}

.grids {
    display: flex;
    gap: 2em;
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

.cell:hover {
    background-color: #666;
    cursor: pointer;
}
</style>
