import { useState } from "react";
import { CellIdentifier } from "../types";

export const useMouseDragSelection = (
  toggleCellSelection: (cell: CellIdentifier, ctrlKey: boolean, shiftKey: boolean, newSelection: boolean) => void
) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (cell: CellIdentifier, event: React.MouseEvent) => {
    setIsDragging(true);
    toggleCellSelection(cell, event.ctrlKey || event.metaKey, event.shiftKey, true);
  };

  const handleMouseEnter = (cell: CellIdentifier, event: React.MouseEvent) => {
    if (isDragging) {
      toggleCellSelection(cell, event.ctrlKey || event.metaKey, event.shiftKey, false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return {
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  };
};
