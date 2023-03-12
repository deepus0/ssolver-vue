import { Grid, Cell, createGrid } from './models';
import { NakedSingleRule, RemovePossibilitiesRules, Rule } from './rules';
import * as Tests from './samples';



// Logic
const RULE_LIST: Rule[] = [ new RemovePossibilitiesRules(), new NakedSingleRule() ]


export function solve() {
    console.log('Solving...');

    let iteration = 0;
    const grid: Grid = createGrid(Tests.ONE_MISSING.initial);

    console.log(grid);

    ruleLoop:
    while (!grid.isSolved() && iteration < 5) {
        iteration++;
        for (let rule of RULE_LIST) {
            console.log('Try');
            if (rule.apply(grid)) {
                grid.iterationCount = iteration;
                continue ruleLoop;
            }
        }

        console.log('Could not find any more solutions');
        break;
    }
    grid.iterationCount = iteration;
    console.log(grid);
    console.log(grid.steps.map((s) => s.description));
}



