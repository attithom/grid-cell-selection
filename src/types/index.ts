export type CellIdentifier = { row: number; col: number };

export interface SelectionState {
  selectedCells: Map<string, CellIdentifier>;

  startCell?: CellIdentifier;
}
