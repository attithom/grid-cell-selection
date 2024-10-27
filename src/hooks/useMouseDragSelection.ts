import { useRef, useState } from "react";
import { CellIdentifier } from "../types";

export const useMouseDragSelection = (
  toggleCellSelection: (cell: CellIdentifier, ctrlKey: boolean, shiftKey: boolean, newSelection: boolean) => void
) => {
  const [isDragging, setIsDragging] = useState(false);
  const touchMoveTriggeredRef = useRef<Record<string, boolean>>({});

  const handleTouchStart = (cell: CellIdentifier, event: React.TouchEvent) => {
    setIsDragging(true);
    toggleCellSelection(cell, event.ctrlKey || event.metaKey, event.shiftKey, true);
  };

  const handleMouseEnter = (cell: CellIdentifier, event: React.MouseEvent | React.TouchEvent) => {
    if (isDragging) {
      toggleCellSelection(cell, event.ctrlKey || event.metaKey, event.shiftKey, false);
    }
  };

  const handleMouseDown = (cell: CellIdentifier, event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) {
      setIsDragging(true);
      toggleCellSelection(cell, event.ctrlKey || event.metaKey, event.shiftKey, true);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    touchMoveTriggeredRef.current = {};
  };

  return {
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    handleTouchStart,
  };
};
