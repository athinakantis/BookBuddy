import {
  createContext
} from "react";
import { Theme } from "../types/ui";

type UIState = {
  // Theme UI
  theme: Theme;
  toggleTheme: () => void;
};

export const UIContext = createContext<UIState | null>(null);
