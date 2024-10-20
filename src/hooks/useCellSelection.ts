import { useState } from "react";
import { CellIdentifier, SelectionMode, SelectionState } from "../types";

const getCellKey = (cell: Omit<CellIdentifier, "id">): string => {
  return `${cell.row}-${cell.col}`;
};

export const useCellSelection = (mode: SelectionMode = "single") => {
  const [selectionState, setSelectionState] = useState<SelectionState>({
    selectedCells: new Set(),
    mode,
  });

  const toggleCellSelection = (cell: CellIdentifier, ctrlKey = false, shiftKey = false, newSelection = false) => {
    setSelectionState((prevState) => {
      const selectedCells = new Set(prevState.selectedCells);
      const cellKey = getCellKey(cell);

      if (prevState.startCell && !newSelection) {
        handleRangeSelection(selectedCells, prevState.startCell, cell);
      } else if ((shiftKey || ctrlKey) && newSelection) {
        handleSingleOrMultipleSelection(selectedCells, cellKey);
      } else {
        selectedCells.clear();
        selectedCells.add(cellKey);
      }

      return {
        ...prevState,
        selectedCells,
        startCell: newSelection ? cell : prevState.startCell,
      };
    });
  };

  const isCellSelected = (cell: CellIdentifier) => {
    return selectionState.selectedCells.has(getCellKey(cell));
  };

  return {
    selectedCells: selectionState.selectedCells,
    toggleCellSelection,
    isCellSelected,
  };
};

// New helper functions
function handleRangeSelection(selectedCells: Set<string>, startCell: CellIdentifier, endCell: CellIdentifier) {
  const action = selectedCells.has(getCellKey(startCell)) ? "add" : "delete";
  const [startRow, startCol] = [startCell.row, startCell.col];
  const [endRow, endCol] = [endCell.row, endCell.col];

  const minRow = Math.min(startRow, endRow);
  const maxRow = Math.max(startRow, endRow);
  const minCol = Math.min(startCol, endCol);
  const maxCol = Math.max(startCol, endCol);

  for (let row = minRow; row <= maxRow; row++) {
    for (let col = minCol; col <= maxCol; col++) {
      selectedCells[action](getCellKey({ row, col }));
    }
  }
}

function handleSingleOrMultipleSelection(selectedCells: Set<string>, cellKey: string) {
  if (selectedCells.has(cellKey)) {
    selectedCells.delete(cellKey);
  } else {
    selectedCells.add(cellKey);
  }
}
