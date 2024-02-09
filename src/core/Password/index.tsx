import Iconify from "../Iconify";
interface IPassword {
  value: boolean | undefined;
}
const Password = ({ value }: IPassword) => {
  return value ? (
    <Iconify icon="heroicons-outline:eye" />
  ) : (
    <Iconify icon="tabler:eye-off" />
  );
};
export default Password;
