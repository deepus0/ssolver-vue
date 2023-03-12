import { Cell, Grid } from "./models";

// Rules
export interface Rule {
    apply(grid: Grid): boolean;
}

export class RemovePossibilitiesRules implements Rule {
    isChanged = false;

    apply(grid: Grid): boolean {
        console.log('Try RemovePossiblities');
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
                    for (let cell2 of cells) {
                        if (cell.id !== cell2.id && !cell2.isPopulated() && cell2.possibilities.includes(cell.allocated)) {
                            cell2.possibilities = cell2.possibilities.filter((c) => c !== cell.allocated);
                            grid.steps.push({ description: 'Removed possibility' });
                            this.isChanged = true;
                        }
                    }
                }
            }
        }
    }
}

export class NakedSingleRule implements Rule {
    isChanged = false;

    apply(grid: Grid): boolean {
        this.isChanged = false;
        console.log( 'Try Naked Single');
        for (let cell of grid.cells) {
            if (!cell.isPopulated() && cell.possibilities.length === 1) {
                cell.allocated = cell.possibilities[0];
                cell.possibilities = [];
                grid.steps.push({ description: 'Found naked single' });
                this.isChanged = true;
            }
        }

        return this.isChanged;
    }
}