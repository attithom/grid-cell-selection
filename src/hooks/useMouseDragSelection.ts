import { useRef, useState } from "react";
import { CellIdentifier, SelectionOptions } from "../types";

export const useMouseDragSelection = (
  toggleCellSelection: (cell: CellIdentifier, ctrlKey: boolean, shiftKey: boolean, newSelection: boolean) => void,
  resetSelection: () => void,
  options: SelectionOptions
) => {
  const [isDragging, setIsDragging] = useState(false);

  const selectionStartScrollY = useRef<number | null>(null);
  const initialCellRef = useRef<CellIdentifier | null>(null);

  const handleTouchStart = (cell: CellIdentifier, event: React.TouchEvent) => {
    setIsDragging(true);
    initialCellRef.current = cell;
    selectionStartScrollY.current = window.scrollY;
    toggleCellSelection(cell, event.ctrlKey || event.metaKey, event.shiftKey, true);
  };

  const handleMouseEnter = (cell: CellIdentifier, event: React.MouseEvent | React.TouchEvent) => {
    if (isDragging) {
      // Check if the user is dragging vertically
      const isDraggingVertically = initialCellRef.current && cell.row !== initialCellRef.current.row;

      // If the user is dragging vertically, prevent the selection
      if (!options.allowYScrollSelection && isDraggingVertically) {
        return;
      }

      toggleCellSelection(cell, event.ctrlKey || event.metaKey, event.shiftKey, false);
    }
  };

  const handleMouseDown = (cell: CellIdentifier, event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) {
      setIsDragging(true);
      initialCellRef.current = cell;
      toggleCellSelection(cell, event.ctrlKey || event.metaKey, event.shiftKey, true);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (selectionStartScrollY.current !== null && options.clearSelectionOnScroll) {
      console.log("scrollY", window.scrollY, "selectionStartScrollY", selectionStartScrollY.current);
      if (Math.abs(window.scrollY - selectionStartScrollY.current) > options.scrollThreshold) {
        resetSelection();
      }
    }
    selectionStartScrollY.current = null;
  };

  return {
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    handleTouchStart,
  };
};
