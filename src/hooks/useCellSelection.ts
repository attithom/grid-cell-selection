import { useState } from "react";
import { CellIdentifier, SelectionState } from "../types";
import { useMouseDragSelection } from "./useMouseDragSelection";

const getCellKey = (cell: Omit<CellIdentifier, "id">): string => {
  return `${cell.row}-${cell.col}`;
};

export const useGridCellSelection = () => {
  const [selectionState, setSelectionState] = useState<SelectionState>({
    selectedCells: new Map<string, CellIdentifier>(),
  });

  const toggleCellSelection = (cell: CellIdentifier, ctrlKey = false, shiftKey = false, newSelection = false) => {
    setSelectionState((prevState) => {
      const selectedCells = new Map(prevState.selectedCells);
      const cellKey = getCellKey(cell);

      if (prevState.startCell && !newSelection) {
        handleRangeSelection(selectedCells, prevState.startCell, cell);
      } else if ((shiftKey || ctrlKey) && newSelection) {
        handleSingleOrMultipleSelection(selectedCells, cellKey, cell);
      } else {
        if (selectedCells.has(cellKey)) {
          selectedCells.clear();
        } else {
          selectedCells.clear();
          selectedCells.set(cellKey, cell);
        }
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

  const { handleMouseDown, handleMouseEnter, handleMouseUp } = useMouseDragSelection(toggleCellSelection);

  return {
    selectedCells: selectionState.selectedCells,
    isCellSelected,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  };
};

// Updated helper functions
function handleRangeSelection(
  selectedCells: Map<string, CellIdentifier>,
  startCell: CellIdentifier,
  endCell: CellIdentifier
) {
  const action = selectedCells.has(getCellKey(startCell)) ? "set" : "delete";
  const [startRow, startCol] = [startCell.row, startCell.col];
  const [endRow, endCol] = [endCell.row, endCell.col];

  const minRow = Math.min(startRow, endRow);
  const maxRow = Math.max(startRow, endRow);
  const minCol = Math.min(startCol, endCol);
  const maxCol = Math.max(startCol, endCol);

  for (let row = minRow; row <= maxRow; row++) {
    for (let col = minCol; col <= maxCol; col++) {
      const cellKey = getCellKey({ row, col });
      if (action === "set") {
        selectedCells.set(cellKey, { row, col });
      } else {
        selectedCells.delete(cellKey);
      }
    }
  }
}

function handleSingleOrMultipleSelection(
  selectedCells: Map<string, CellIdentifier>,
  cellKey: string,
  cell: CellIdentifier
) {
  if (selectedCells.has(cellKey)) {
    selectedCells.delete(cellKey);
  } else {
    selectedCells.set(cellKey, cell);
  }
}
