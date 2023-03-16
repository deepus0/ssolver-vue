import { Cell, Grid } from "../models";
import { Rule } from "../rules";

export class HiddenSingleRule implements Rule {
    isChanged = false;
    apply(grid: Grid): boolean {
        this.isChanged = false;
        for (let i = 1; i <= 9; i++) {
            this.findCandidates(grid, grid.rows, i);
            this.findCandidates(grid, grid.cols, i);
            this.findCandidates(grid, grid.boxes, i);
        }
        return this.isChanged;
    }

    findCandidates(grid: Grid, cells: Cell[][], search: number) {
        for (let section of cells) {
            let containsAllocated = false;
            for (let cell of section) {
                if (cell.allocated === search) {
                    containsAllocated = true;
                    break;
                }
            }
            if (!containsAllocated) {
                let candidateCells: Cell[] = [];
                for (let cell of section) {
                    if (cell.possibilities.includes(search)) candidateCells.push(cell);
                }
                if (candidateCells.length === 1) {
                    let cell = candidateCells[0];
                    cell.allocated = search;
                    grid.steps.push({ description: `Found hidden single value ${cell.allocated} in cell ${cell.name()}` })
                    this.isChanged = true;
                }
            }
        }
    }
}
