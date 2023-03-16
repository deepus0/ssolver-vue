import { Grid } from "../models";
import { Rule } from "../rules";

export class NakedSingleRule implements Rule {
    isChanged = false;

    apply(grid: Grid): boolean {
        this.isChanged = false;
        for (let cell of grid.cells) {
            if (!cell.isPopulated() && cell.possibilities.length === 1) {
                cell.allocated = cell.possibilities[0];
                cell.possibilities = [];
                grid.steps.push({ description: `Found naked single ${cell.allocated} in cell ${cell.name()}` });
                this.isChanged = true;
            }
        }

        return this.isChanged;
    }
}