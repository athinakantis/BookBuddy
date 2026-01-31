import Button from "./custom/Button";
import { Moon, Settings as SettingsIcon, Sun } from "lucide-react"
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { useUI } from "@/context/useUI";

export default function Settings() {
  const { toggleTheme, theme } = useUI();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="Open settings">
          <SettingsIcon aria-hidden
            size={15}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={toggleTheme}>
          {theme === "light" ? <Moon aria-hidden/> : <Sun aria-hidden/>}
          Toggle {theme === "light" ? "darkmode" : "lightmode"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
