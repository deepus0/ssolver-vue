import { Grid, Cell, createGrid } from './models';
import { HiddenSingleRule, NakedCandidatesRule, NakedSingleRule, PointingPairRule, RemovePossibilitiesRules, Rule, XWingRule } from './rules';
import * as Tests from './samples';



// Logic
const RULE_LIST: Rule[] = [new RemovePossibilitiesRules(), new NakedSingleRule(), new HiddenSingleRule(), new NakedCandidatesRule(), new PointingPairRule(), new XWingRule()]


export function solve(): Grid[] {
    const grids: Grid[] = [];
    grids.push(solveTest(Tests.ONE_MISSING));
    grids.push(solveTest(Tests.TWO_MISSING));
    grids.push(solveTest(Tests.MULTIPLE_MISSING));
    grids.push(solveTest(Tests.EASY_1));
    grids.push(solveTest(Tests.EASY_2));
    grids.push(solveTest(Tests.EASY_3));
    grids.push(solveTest(Tests.EASY_4));
    grids.push(solveTest(Tests.MEDIUM_1));
    grids.push(solveTest(Tests.MEDIUM_2));
    grids.push(solveTest(Tests.MEDIUM_3));
    grids.push(solveTest(Tests.MEDIUM_4));
    grids.push(solveTest(Tests.HARD_1));
    grids.push(solveTest(Tests.HARD_2));
    grids.push(solveTest(Tests.HARD_3));
    grids.push(solveTest(Tests.HARD_4));
    grids.push(solveTest(Tests.HARD_5));
    grids.push(solveTest(Tests.HARD_6));
    grids.push(solveTest(Tests.HARD_7));

    return grids;
}

function solveTest(test: Tests.TestExample): Grid {
    let iteration = 0;
    const grid: Grid = createGrid(test.name, test.initial);

    ruleLoop:
    while (!grid.isSolved() && iteration < 50) {
        iteration++;
        for (let rule of RULE_LIST) {
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
        console.log('Solved: ' + solved);
        if (!solved) {
            console.log(grid);
        }
    }
    return grid;
}


