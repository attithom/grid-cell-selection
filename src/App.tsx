import React, { useState } from "react";
import { useGridCellSelection } from "./index";

function App() {
  const [mode, setMode] = useState<"mouse" | "touch">("touch");
  const [allowYScrollSelection, setAllowYScrollSelection] = useState(false);
  const columns = ["A", "B", "C", "D", "E", "F", "G"];
  const rows = 100;

  const { isCellSelected, handleMouseDown, handleMouseEnter, handleMouseUp, handleTouchMove, handleTouchStart } =
    useGridCellSelection({ options: { allowYScrollSelection, clearSelectionOnScroll: true, scrollThreshold: 100 } });

  return (
    <>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <div
          style={{ cursor: "pointer", fontWeight: mode === "mouse" ? "bold" : "normal" }}
          onClick={() => setMode("mouse")}
        >
          Mouse Only Selection
        </div>
        <div
          style={{ cursor: "pointer", fontWeight: mode === "touch" ? "bold" : "normal" }}
          onClick={() => setMode("touch")}
        >
          Mouse + Touch Selection
        </div>
        <div
          style={{ cursor: "pointer", fontWeight: allowYScrollSelection ? "bold" : "normal" }}
          onClick={() => setAllowYScrollSelection(!allowYScrollSelection)}
        >
          {allowYScrollSelection ? "Disable" : "Enable"} Y Scroll Selection
        </div>
      </div>
      {mode === "touch" ? (
        <table onMouseUp={handleMouseUp} onTouchMove={handleTouchMove} onTouchEnd={handleMouseUp}>
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
                    <button onClick={() => console.log(isCellSelected({ id: `${row}-${col}`, row, col }))}>
                      isSelected
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
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
      )}
    </>
  );
}

export default App;
