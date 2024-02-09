import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
interface ICard {
  children: React.ReactNode;
  link: string;
}

const Card = ({ children, link }: ICard) => {
  return (
    <Link to={`${link}`}>
      <IconButton>{children}</IconButton>
    </Link>
  );
};
export default Card;
