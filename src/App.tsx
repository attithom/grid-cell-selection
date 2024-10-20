import React from "react";
import { useGridCellSelection } from "./index";

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

export default App;
