import {
  createContext,
  Dispatch, SetStateAction
} from "react";
import { Book, UpdateBookInput } from "../types/books";
import { Theme, Toast } from "../types/ui";

type UIState = {
  // Toast UI
  toast: Toast;
  closeToast: () => void;
  openToast: (toastContent: Partial<Toast>) => any;

  // Theme UI
  theme: Theme;
  toggleTheme: () => void;
};

export const UIContext = createContext<UIState | null>(null);
