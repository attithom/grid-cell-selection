export type SelectionMode = "single" | "multiple";

export type CellIdentifier = { row: number; col: number };

export interface SelectionState {
  selectedCells: Set<string>;
  mode: SelectionMode;
  startCell?: CellIdentifier;
}
