import { TablePagination } from "@mui/material";

// ----------------------------------------------------------------------
interface IProps {
  count: number;
  page: number;
  rowsPerPage: number;
  ChangePage: (event: unknown, newPage: number) => void;
  ChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
// ----------------------------------------------------------------------

const TPagination = ({
  count,
  page,
  rowsPerPage,
  ChangePage,
  ChangeRowsPerPage,
}: IProps) => {
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={ChangePage}
      onRowsPerPageChange={ChangeRowsPerPage}
    />
  );
};
export default TPagination;
