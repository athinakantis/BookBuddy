import { ReactNode, useState } from "react";
import { UIContext } from "./ui-context";
import { Book, UpdateBookInput } from "../types/books";
import { Theme, Toast } from "../types/ui";
import { initialToast } from "@/lib/uiDefaults";

const savedTheme = localStorage.getItem("theme");

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<Toast>(initialToast);
  const [theme, setTheme] = useState<Theme>((savedTheme as Theme) ?? "light");

  const closeToast = () => {
    setToast(initialToast);
  };

  const openToast = (toastContent: Partial<Toast>) => {
    const { content, type = "info", onConfirm } = toastContent
    if (!content) return;
    setToast({
      timeout: 5000,
      open: true,
      content,
      type,
      onConfirm
    });
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  return (
    <UIContext.Provider
      value={{
        toast,
        closeToast,
        openToast,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
