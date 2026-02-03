export type ToastStatus = "error" | "warning" | "success" | "info";

export type ToastContent = {
  title: string;
  message?: string;
};

export type Theme = "light" | "dark";
