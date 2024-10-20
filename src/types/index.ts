export type CellIdentifier = { row: number; col: number };

export interface SelectionState {
  selectedCells: Set<string>;

  startCell?: CellIdentifier;
}
