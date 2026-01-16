import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>

export default function Card(props: CardProps) {
  const { children, className } = props;

  return (
    <div className={cn("min-w-60 p-4 rounded-md bg-card border-accent-muted relative shadow-md transition-all flex flex-col hover:cursor-pointer w-full", className)}
      {...props}
    >
      {children}
    </div>
  );
}