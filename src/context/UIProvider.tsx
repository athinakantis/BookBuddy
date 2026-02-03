import { ReactNode, useState } from "react";
import { UIContext } from "./ui-context";
import { Theme } from "../types/ui";

const savedTheme = localStorage.getItem("theme");

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>((savedTheme as Theme) ?? "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  return (
    <UIContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
