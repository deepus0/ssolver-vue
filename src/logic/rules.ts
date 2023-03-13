import { Cell, Grid } from "./models";

// Rules
export interface Rule {
    apply(grid: Grid): boolean;
}

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
                    for (let cell2 of cells) {
                        if (cell.id !== cell2.id && !cell2.isPopulated() && cell2.possibilities.includes(cell.allocated)) {
                            cell2.possibilities = cell2.possibilities.filter((c) => c !== cell.allocated);
                            grid.steps.push({ description: `Removed possibility ${cell.allocated} from ${cell2.name()}` });
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

export class HiddenSingleRule implements Rule {
    isChanged = false;
    apply(grid: Grid): boolean {
        this.isChanged = false;

        return this.isChanged;
    }

    findCandidates(grid: Grid, cells: Cell[][], number: number) {
        for (let section of cells) {
            let containsAllocated = false;
            for (let cell of section) {
                if (cell.allocated === number) {
                    containsAllocated = true;
                    break;
                }
            }
            if (!containsAllocated) {
                let candidateCells: Cell[] = [];
                for (let cell of section) {
                    if (cell.possibilities.includes(number)) candidateCells.push(cell);
                }
                if (candidateCells.length === 1) {
                    let cell = candidateCells[0];
                    cell.allocated = number;
                    grid.steps.push({description: `Found hidden single value ${cell.allocated} in cell ${cell.name()}`})
                    this.isChanged = true;
                }
            }
        }
    }
}

export class NakedCandidatesRule implements Rule {
    isChanged = false;
    apply(grid: Grid): boolean {
        this.isChanged = false;
        this.findCandidateCells(grid.boxes, grid);
        this.findCandidateCells(grid.rows, grid);
        this.findCandidateCells(grid.cols, grid);
        return this.isChanged;
    }

    findCandidateCells(cells: Cell[][], grid: Grid) {
        for (let arr of cells) {
            this.findCandidates(arr, grid, 2);
            this.findCandidates(arr, grid, 3);
            this.findCandidates(arr, grid, 4);
        }
    }

    findCandidates(arr: Cell[], grid: Grid, count: number) {
        const pairs = arr.filter((cell) => cell.possibilities.length === count);
        let checker = (arr: any, target: any) => target.every((v: any )=> arr.includes(v));

        for (let pairCell of pairs) {
            const matches: Cell[] = [];
            for (let cell of arr) {
                if (!cell.isPopulated() && checker(pairCell.possibilities, cell.possibilities)) {
                    matches.push(cell);
                }
            }
            if (matches.length === count) {
                for (let cell of arr) {
                    if (!cell.isPopulated() && !matches.includes(cell)) {
                        const currSize = cell.possibilities.length;
                        cell.possibilities = cell.possibilities.filter((number) => matches[0].possibilities.includes(number));
                        if (cell.possibilities.length !== currSize) {
                            grid.steps.push({description: `Added candidate Pair/Triple/Quad rule on ${matches[0].possibilities}`})
                            this.isChanged = true;
                        }
                    }
                }
            }
        }
    }
}

export class PointingPairRule implements Rule {
    isChanged = false;
    apply(grid: Grid): boolean {
        this.isChanged = false;

        return this.isChanged;
    }
}

export class XWingRule implements Rule {
    isChanged = false;
    apply(grid: Grid): boolean {
        this.isChanged = false;

        return this.isChanged;
    }
}