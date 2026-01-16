export type ToastStatus = "error" | "warning" | "success" | "info";

export type ToastContent = {
  title: string;
  message?: string;
  confirm?: boolean;
};

export interface Toast {
  type: ToastStatus | null;
  content: ToastContent | null;
  open: boolean;
  timeout?: number | null;
  onConfirm?: () => void;
}

export type Theme = "light" | "dark";
