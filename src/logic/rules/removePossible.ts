import { Cell, Grid } from "../models";
import { Rule } from "../rules";

export class RemovePossibilitiesRules implements Rule {
    isChanged = false;

    apply(grid: Grid): boolean {
        this.isChanged = false;
        this.findPossibilities(grid, grid.rows);
        this.findPossibilities(grid, grid.cols);
        this.findPossibilities(grid, grid.boxes);
        return this.isChanged;
    }

    private findPossibilities(grid: Grid, arr: Cell[][]) {
        for (let cells of arr) {
            for (let cell of cells) {
                if (cell.isPopulated()) {
                    cell.possibilities = [];
                    for (let cell2 of cells) {
                        if (cell.id !== cell2.id && !cell2.isPopulated() && cell2.possibilities.includes(cell.allocated)) {
                            cell2.possibilities = cell2.possibilities.filter((c) => c !== cell.allocated);
                            // grid.steps.push({ description: `Removed possibility ${cell.allocated} from ${cell2.name()}` });
                            this.isChanged = true;
                        }
                    }
                }
            }
        }
    }
}