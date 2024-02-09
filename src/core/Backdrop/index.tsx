import DropShow from "@mui/material/Backdrop";
interface IBackDrop {
  open: boolean;
  children?: React.ReactNode;
}
const Backdrop = ({ open, children }: IBackDrop) => {
  return (
    <DropShow open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer }}>
      {children}
    </DropShow>
  );
};
export default Backdrop;
