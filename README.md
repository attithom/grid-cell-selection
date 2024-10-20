# Grid Cell Selection

A React hook for grid cell selection. A simple headless hook that.

# Made by [Atticus](https://atticusthomson.com)

![Grid Cell Selection](https://github.com/attithom/grid-cell-selection/blob/main/example.gif)

## Installation

```bash
npm install grid-cell-selection
```

## Usage

```tsx
import React from "react";
import { useGridCellSelection } from "grid-cell-selection";

function App() {
  const columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
  const rows = 20;

  const { isCellSelected, handleMouseDown, handleMouseEnter, handleMouseUp } = useGridCellSelection();

  return (
    <>
      <table onMouseUp={handleMouseUp}>
        <tbody>
          {Array.from({ length: rows }, (_, row) => (
            <tr key={row}>
              {columns.map((column, col) => (
                <td
                  onMouseEnter={(event) => handleMouseEnter({ row, col }, event)}
                  onMouseDown={(event) => handleMouseDown({ row, col }, event)}
                  className={`${isCellSelected({ row, col }) ? "selected" : ""}`}
                >
                  {column}
                  {row}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
```

## Cell Selection Behavior

### Single Cell Selection

- Click on a cell to select it.
- Clicking on a different cell deselects any previously selected cells.

### Range Selection

- Click and drag to select a range of cells

### Multiple Range Selection

- Hold Ctrl (or Cmd on Mac) or Shift to select multiple ranges
