//models
const SU_NUMBER = 9;

export enum TYPE {
    ROW, COL, BOX
}

export class Cell {
    id: number;
    allocated: number;
    possibilities: number[] = [];
    row: number;
    col: number;
    box: number;
    boxCell: number;


    constructor(id: number, allocated: number, row: number, col: number) {
        this.id = id;
        this.allocated = allocated;
        this.row = row;
        this.col = col;
        this.box = this.calculateBox(row, col);
        this.boxCell = this.calculateBoxCell();
        if (allocated === 0) {
            this.possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        }
    }

    calculateBox(row: number, col: number): number {
        if (row <= 2 && col <= 2) return 0;
        if (row <= 2 && col <= 5) return 1;
        if (row <= 2) return 2;
        if (row <= 5 && col <= 2) return 3;
        if (row <= 5 && col <= 5) return 4;
        if (row <= 5) return 5;
        if (col <= 2) return 6;
        if (col <= 5) return 7;
        return 8
    }

    calculateBoxCell(): number {
        return ((this.row % 3) * 3) + this.col % 3
    }

    isPopulated(): boolean {
        return this.allocated !== 0;
    }

    equals(cell: Cell): boolean {
        return this.id === cell.id && this.allocated === cell.allocated && this.row === cell.row && this.col === cell.col && this.box === cell.box && this.boxCell === cell.boxCell;
    }
    
    name(): string {
        return `Cell ${this.col + 1} ${this.row + 1}`
    }
}

export class SolvedStep {
    description: string;

    constructor(description: string) {
        this.description = description;
    }
}

export class Grid {
    name: string;
    cells: Cell[];
    steps: SolvedStep[] = [];
    iterationCount: number = 0;
    rows: Cell[][] = [];
    cols: Cell[][] = [];
    boxes: Cell[][] = [];

    constructor(name: string, cells: Cell[]) {
        this.name = name;
        this.cells = cells;

        for (let i = 0; i < 9; i++) {
            this.rows.push([]);
            this.cols.push([]);
            this.boxes.push([]);
        }

        for (let cell of this.cells) {
            this.rows[cell.row].push(cell);
            this.cols[cell.col].push(cell);
            this.boxes[cell.box].push(cell);
        }
    }

    isSolved(): boolean {
        for (let cell of this.cells) {
            if (!cell.isPopulated()) {
                return false;
            }
        }
        return true;
    }
    
    compare(grid: Grid): boolean {
        for (let i = 0; i < this.cells.length; i++) {
            if (grid.cells[i].allocated !== this.cells[i].allocated) {
                return false;
            }
        }
        return true;
    }
}

export function createGrid(name: string, line: string): Grid {
    const cells: Cell[] = [];
    for (let i = 0; i < line.length; i++) {
        const letter = line.charAt(i);
        const number = parseInt(letter);
        const cell: Cell = new Cell(i, number, Math.floor(i / SU_NUMBER), i % SU_NUMBER);
        cells.push(cell);
    }
    return new Grid(name, cells);
}
