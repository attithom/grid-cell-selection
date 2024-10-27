# Grid Cell Selection

A React hook for grid cell selection. A simple headless hook that.

# Made by [Atticus](https://atticusthomson.com)

![Grid Cell Selection](https://github.com/attithom/grid-cell-selection/blob/main/example.gif)

## Installation

```bash
npm install grid-cell-selection
```

## Usage

### Mouse Only

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
                  key={`${row}-${col}`}
                  onMouseEnter={(event) => handleMouseEnter({ id: `${row}-${col}`, row, col }, event)}
                  onMouseDown={(event) => handleMouseDown({ id: `${row}-${col}`, row, col }, event)}
                  className={`${isCellSelected({ id: `${row}-${col}`, row, col }) ? "selected" : ""}`}
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

### Mouse + Touch

> Note that data-cell-id, data-cell-row, and data-cell-col are required for touch events to work.

```tsx
function App() {
  const columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
  const rows = 20;

  const { isCellSelected, handleMouseDown, handleMouseEnter, handleMouseUp, handleTouchMove, handleTouchStart } =
    useGridCellSelection();

  return (
    <table onMouseUp={handleMouseUp} onTouchMove={handleTouchMove} style={{ touchAction: "none" }}>
      <tbody>
        {Array.from({ length: rows }, (_, row) => (
          <tr key={row}>
            {columns.map((column, col) => (
              <td
                key={`${row}-${col}`}
                onMouseEnter={(event) => handleMouseEnter({ id: `${row}-${col}`, row, col }, event)}
                onMouseDown={(event) => handleMouseDown({ id: `${row}-${col}`, row, col }, event)}
                onTouchStart={(event) => handleTouchStart({ id: `${row}-${col}`, row, col }, event)}
                className={`${isCellSelected({ id: `${row}-${col}`, row, col }) ? "selected" : ""}`}
                data-cell-id={`${row}-${col}`} // Required for touch events
                data-cell-row={row} // Required for touch events
                data-cell-col={col} // Required for touch events
              >
                {column}
                {row}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
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

### ID Prop

If you provide an array of all cells, the hook will include the cell IDs when tracking the selected cells.
