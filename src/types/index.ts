export type SelectionMode = "single" | "multiple";

export type CellIdentifier = { id: string; row: number; col: number };

export interface SelectionState {
  selectedCells: Set<string>;
  mode: SelectionMode;
  startCell?: CellIdentifier;
}
