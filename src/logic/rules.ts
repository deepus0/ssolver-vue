import { Grid } from "./models";
import { HiddenSingleRule } from "./rules/hiddenSingle";
import { NakedCandidatesRule } from "./rules/nakedCandidate";
import { NakedSingleRule } from "./rules/nakedSingle";
import { PointingPairRule } from "./rules/pointingPair";
import { RemovePossibilitiesRules } from "./rules/removePossible";
import { XWingRule } from "./rules/xwing";

// Rules
export interface Rule {
    apply(grid: Grid): boolean;
}

export const RULES: Rule[] = [
    new RemovePossibilitiesRules(),
    new NakedSingleRule(),
    new HiddenSingleRule(),
    new NakedCandidatesRule(),
    new PointingPairRule(),
    new XWingRule()
]
