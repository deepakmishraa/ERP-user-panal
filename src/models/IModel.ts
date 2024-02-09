export interface IModel {
  open: boolean;
  activeHandler(data: boolean): void;
  onModelHandler(): void;
  handleClose: () => void;
  children?: React.ReactNode;
  width?: string;
  title?: string;
  subTitle?: string;
}
