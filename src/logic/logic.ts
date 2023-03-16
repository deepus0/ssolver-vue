import { Grid, Cell, createGrid, EndGrid } from './models';
import { RULES } from './rules';
import * as Tests from './samples';


export function solve(): EndGrid[] {
    const grids: EndGrid[] = [];
    // grids.push(solveTest(Tests.ONE_MISSING));
    // grids.push(solveTest(Tests.TWO_MISSING));
    // grids.push(solveTest(Tests.MULTIPLE_MISSING));
    // grids.push(solveTest(Tests.EASY_1));
    // grids.push(solveTest(Tests.EASY_2));
    // grids.push(solveTest(Tests.EASY_3));
    // grids.push(solveTest(Tests.EASY_4));
    // grids.push(solveTest(Tests.MEDIUM_1));
    // grids.push(solveTest(Tests.MEDIUM_2));
    // grids.push(solveTest(Tests.MEDIUM_3));
    // grids.push(solveTest(Tests.MEDIUM_4));
    grids.push(solveTest(Tests.HARD_1));
    grids.push(solveTest(Tests.HARD_2));
    grids.push(solveTest(Tests.HARD_3));
    grids.push(solveTest(Tests.HARD_4));
    grids.push(solveTest(Tests.HARD_5));
    grids.push(solveTest(Tests.HARD_6));
    grids.push(solveTest(Tests.HARD_7));

    return grids;
}

function solveTest(test: Tests.TestExample): EndGrid {
    let iteration = 0;
    const grid: Grid = createGrid(test.name, test.initial);

    ruleLoop:
    while (!grid.isSolved() && iteration < 100) {
        iteration++;
        if (!validateGrid(grid)) {
            return new EndGrid(createGrid(test.name, test.initial), grid, createGrid(test.name, test.result));
        }

        for (let rule of RULES) {
            if (rule.apply(grid)) {
                grid.iterationCount = iteration;
                continue ruleLoop;
            }
        }

        console.log('Could not find any more solutions');
        break;
    }
    grid.iterationCount = iteration;

    if (test.result) {
        const comparison: Grid = createGrid(test.name, test.result);
        const solved = grid.compare(comparison);
        if (!solved) {
            console.log(grid);
        }
    }
    return new EndGrid(createGrid(test.name, test.initial), grid, createGrid(test.name, test.result));
}

function validateGrid(grid: Grid) {
    return validateCells(grid.rows) && validateCells(grid.cols) && validateCells(grid.boxes);
}

function validateCells(arr: Cell[][]): boolean {
    for (let row of arr) {
        const cells: number[] = row.filter((c) => c.isPopulated()).map((c) => c.allocated);
        if (new Set(cells).size < cells.length) {
            console.log('Invalid row/col/box at ' + arr.indexOf(row));
            return false;
        }
    }
    return true;
}

