import { BookOpen, ChevronLeft, ChevronRight, Minus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./custom/Button";
import Settings from "./Settings";

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        send: (channel: string, ...args: any[]) => void;
      };
    };
  }
}


export default function Header() {
  const navigate = useNavigate();

  const handleMinimize = () => {
    window.electron.ipcRenderer.send("minimizeApp");
  };
  const handleClose = () => {
    window.electron.ipcRenderer.send("closeApp");
  };

  return (
    <header className="w-full bg-bg-clear text-fg flex items-center mb-8">
      <div className="flex text-accent-hover justify-between *:py-3 items-center max-w-none lg:max-w-300 w-full *:first:pl-3 *:last:pr-3 mx-auto">
        <div className="flex gap-1">
          <Button
            onClick={() => navigate(-1)}
            className="px-1"
          >
            <ChevronLeft size={15} />
          </Button>
          <Button
            onClick={() => navigate(+1)}
            className="px-1"
          >
            <ChevronRight size={15} />
          </Button>
        </div>

        {/* Draggable area */}
        <div
          className="bg-bg-clear w-full h-8 flex-center"
          style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
        >
          <button
            onClick={() => navigate("/")}
            className="flex gap-3 items-center hover:cursor-pointer"
          >
            <BookOpen />

            <h1 className="text-2xl">BookBuddy</h1>
          </button>
        </div>

        <div className="flex gap-1 *:p-1 *:flex-center">
          <Settings />
          <Button
            className="relative w-6"
            id="minimize-btn"
            onClick={handleMinimize}
            aria-label="Minimize window"
          >
            <Minus className="absolute -bottom-px left-1.25" size={15} />
          </Button>
          <Button
            id="close-btn"
            onClick={handleClose}
            aria-label="Exit program"
          >
            <X size={15} aria-hidden />
          </Button>
        </div>
      </div>

    </header>
  );
}
