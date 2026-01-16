import { Moon, Sun } from "lucide-react";
import Button from "./custom/Button";
import { useUI } from "../context/useUI";
import { HTMLAttributes, ReactNode } from "react";

type ThemeSwitcherProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export default function ThemeSwitcher({ children }: ThemeSwitcherProps) {
  const { theme, toggleTheme } = useUI();

  return (
    <Button onClick={toggleTheme}>
      {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
      {children}
    </Button>
  );
}
