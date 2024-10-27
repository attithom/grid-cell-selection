import React, { useState } from "react";
import { useGridCellSelection } from "./index";

function App() {
  const [mode, setMode] = useState<"mouse" | "touch">("mouse");
  const columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
  const rows = 20;

  const { isCellSelected, handleMouseDown, handleMouseEnter, handleMouseUp, handleTouchMove, handleTouchStart } =
    useGridCellSelection();

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
      </div>
      {mode === "touch" ? (
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
