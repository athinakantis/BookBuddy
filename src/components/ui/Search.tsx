import { SearchIcon } from "lucide-react";
import Input from "./custom/Input";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SearchProps = HTMLAttributes<HTMLDivElement>

export default function Search(props: SearchProps) {
  const { className } = props;

  return (
    <div className={cn("relative max-w-80", className)}>
      <SearchIcon className="absolute left-3 text-accent-muted top-[50%] transform-[translateY(-50%)]" size={20} />
      <Input className="pl-10" />
    </div>
  );
}