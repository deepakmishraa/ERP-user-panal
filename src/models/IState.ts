export interface IState {
    loader: boolean;
    tosted: boolean;
    severity: "error" | "warning" | "info" | "success" | undefined;
    message: string;
  }
  