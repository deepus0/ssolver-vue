import { Grid } from "../models";
import { Rule } from "../rules";

export class XWingRule implements Rule {
    isChanged = false;
    apply(grid: Grid): boolean {
        this.isChanged = false;

        return this.isChanged;
    }
}