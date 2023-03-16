import { Cell, Grid } from "../models";
import { Rule } from "../rules";

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

    compareArr(arr: number[], arr2: number[]) {
        arr.sort();
        arr2.sort();
        return arr + "" === arr2 + "";
    }

    findCandidates(arr: Cell[], grid: Grid, count: number) {
        const pairs = arr.filter((cell) => cell.possibilities.length === count);

        for (let pairCell of pairs) {
            const matches: Cell[] = [];
            const comparisonArr = arr.filter((cell) => cell !== pairCell);

            for (let cell of comparisonArr) {
                if (!cell.isPopulated() && this.compareArr(pairCell.possibilities, cell.possibilities)) {
                    matches.push(cell);
                }
            }

            if (matches.length === count) {
                for (let cell of arr) {
                    if (!cell.isPopulated() && !matches.includes(cell)) {
                        const newPossibilities = cell.possibilities.filter((number) => matches[0].possibilities.includes(number));
                        if (newPossibilities.length !== cell.possibilities.length) {
                            grid.steps.push({ description: `Added candidate Pair/Triple/Quad rule on ${matches[0].possibilities}` })
                            this.isChanged = true;
                        }
                    }
                }
            }
        }
    }
}
