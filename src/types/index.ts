export type CellIdentifier = { id: string; row: number; col: number };

export interface SelectionOptions {
  allowYScrollSelection: boolean;
  clearSelectionOnScroll: boolean;
  scrollThreshold: number;
}

export interface SelectionState {
  selectedCells: Map<string, CellIdentifier>;
  startCell?: CellIdentifier;
}
