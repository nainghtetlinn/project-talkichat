export type TType = "info" | "success" | "error";

interface ToastType {
  msg: string;
  show: boolean;
  type: TType;
}
export interface ToastContextType extends ToastType {
  showToast: ({ msg, type }: { msg: string; type?: TType }) => void;
  hideToast: () => void;
}
