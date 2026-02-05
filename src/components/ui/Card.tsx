import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type CardProps = Readonly<HTMLAttributes<HTMLDivElement>>;

export default function Card(props: CardProps) {
  const { children, className, ...rest } = props;

  return (
    <div
      className={cn(
        "min-w-60 p-4 rounded-md bg-card border-accent-muted relative transition-all flex flex-col w-full shadow-sm",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
