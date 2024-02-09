import Paper from "@mui/material/Paper";
import Container from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";

interface ITable {
  children: React.ReactNode;
  size?: "small" | "medium" | undefined;
}

const Table = ({ children, size }: ITable) => {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        border: "none",
        background: "#fff",
        borderRadius: "8px",
      }}
    >
      <Container size={size}>{children}</Container>
    </TableContainer>
  );
};
export default Table;
