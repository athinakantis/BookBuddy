import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type SeparatorProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
};

export default function Separator(props: SeparatorProps) {
  const { className, orientation = "horizontal" } = props;
  return (
    <div
      className={cn(
        "separator",
        "bg-bg-muted",
        orientation === "horizontal" ? "w-full h-px" : "h-full w-px",
        className,
      )}
    ></div>
  );
}
