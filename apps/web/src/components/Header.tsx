import { useNavigate } from "react-router-dom";
import Button from "./custom/Button";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex justify-center bg-bg-clear shadow-sm mb-4 ">
      <div className="flex text-accent-hover justify-between p-2 items-center max-w-none lg:max-w-300 w-full">
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

        <button
          onClick={() => navigate("/")}
          className="flex gap-3 items-center hover:cursor-pointer"
        >
          <BookOpen />

          <h1 className="text-2xl">Athinas Library</h1>
        </button>

        <div>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
