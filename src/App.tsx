import { Row } from "./hooks/selectionComponents";
import { useCellSelection } from "./hooks/useCellSelection";
import { useMouseDragSelection } from "./hooks/useMouseDragSelection";

function App() {
  const columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
  const rows = 20;

  const { toggleCellSelection, isCellSelected } = useCellSelection("multiple");
  const { handleMouseDown, handleMouseEnter, handleMouseUp } = useMouseDragSelection(toggleCellSelection);
  return (
    <>
      <table onMouseUp={handleMouseUp}>
        <tbody>
          {Array.from({ length: rows }, (_, row) => (
            <Row
              key={row}
              columns={columns}
              row={row}
              isCellSelected={isCellSelected}
              handleMouseDown={handleMouseDown}
              handleMouseEnter={handleMouseEnter}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
