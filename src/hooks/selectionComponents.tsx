// import { memo } from "react";
// import { CellIdentifier } from "../types";

// // New Cell component
// export const Cell = memo(
//   ({
//     column,
//     col,
//     row,
//     isCellSelected,
//     handleMouseDown,
//     handleMouseEnter,
//   }: // handleKeyDown,
//   {
//     column: string;
//     col: number;
//     row: number;
//     isCellSelected: (cell: CellIdentifier) => boolean;
//     handleMouseDown: (cell: CellIdentifier, event: React.MouseEvent<HTMLDivElement>) => void;
//     handleMouseEnter: (cell: CellIdentifier, event: React.MouseEvent<HTMLDivElement>) => void;
//   }) => (
//     <td
//       onMouseEnter={(event) => handleMouseEnter({ id: `${column}${row}`, row, col }, event)}
//       onMouseDown={(event) => handleMouseDown({ id: `${column}${row}`, row, col }, event)}
//       className={`${isCellSelected({ id: `${column}${row}`, row, col }) ? "selected" : ""}`}
//     >
//       {column}
//       {row}
//     </td>
//   )
// );

// // New Row component
// export const Row = memo(
//   ({
//     columns,
//     row,
//     isCellSelected,
//     handleMouseDown,
//     handleMouseEnter,
//   }: // handleKeyDown,
//   {
//     columns: string[];
//     row: number;
//     isCellSelected: (cell: CellIdentifier) => boolean;
//     handleMouseDown: (cell: CellIdentifier, event: React.MouseEvent<HTMLDivElement>) => void;
//     handleMouseEnter: (cell: CellIdentifier, event: React.MouseEvent<HTMLDivElement>) => void;
//     // handleKeyDown: (cell: CellIdentifier, event: React.KeyboardEvent) => void;
//   }) => (
//     <tr>
//       {columns.map((column, index) => (
//         <Cell
//           key={`${column}${row}`}
//           column={column}
//           col={index}
//           row={row}
//           isCellSelected={isCellSelected}
//           handleMouseDown={handleMouseDown}
//           handleMouseEnter={handleMouseEnter}
//           // handleKeyDown={handleKeyDown}
//         />
//       ))}
//     </tr>
//   )
// );
