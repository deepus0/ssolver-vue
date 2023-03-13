import { Grid, Cell, createGrid } from './models';
import { HiddenSingleRule, NakedCandidatesRule, NakedSingleRule, PointingPairRule, RemovePossibilitiesRules, Rule, XWingRule } from './rules';
import * as Tests from './samples';



// Logic
const RULE_LIST: Rule[] = [new RemovePossibilitiesRules(), new NakedSingleRule(), new HiddenSingleRule(), new NakedCandidatesRule(), new PointingPairRule(), new XWingRule()]


export function solve() {
    solveTest(Tests.ONE_MISSING);
    solveTest(Tests.TWO_MISSING);
    solveTest(Tests.MULTIPLE_MISSING);
    solveTest(Tests.EASY_1);
    solveTest(Tests.EASY_2);
    solveTest(Tests.EASY_3);
    solveTest(Tests.EASY_4);
    solveTest(Tests.MEDIUM_1);
    solveTest(Tests.MEDIUM_2);
    solveTest(Tests.MEDIUM_3);
    solveTest(Tests.MEDIUM_4);
    solveTest(Tests.HARD_1);
    solveTest(Tests.HARD_2);
    solveTest(Tests.HARD_3);
    solveTest(Tests.HARD_4);
    solveTest(Tests.HARD_5);
    solveTest(Tests.HARD_6);
    solveTest(Tests.HARD_7);
}

function solveTest(test: Tests.TestExample) {
    console.log('Solving...');

    let iteration = 0;
    const grid: Grid = createGrid(test.initial);

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
        const comparison: Grid = createGrid(test.result);
        const solved = grid.compare(comparison);
        console.log('Solved: ' + solved);
        if (!solved) {
            console.log(grid);
        }
    }
}


