import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Element =
  | HTMLAttributes<HTMLDivElement>
  | HTMLAttributes<HTMLButtonElement>;

type BadgeProps = Element & {
  variant?: "info" | "error" | "success" | "warning"
};

const badgeVariants = {
  info: "hover:bg-bg-muted",
  warning: "hover:bg-warning-accent bg-warning-bg",
  error: "hover:bg-destructive-accent bg-destructive-bg text-destructive-fg border-destructive-fg border",
  success: "hover:bg-success-accent bg-success-bg text-success-fg border-success-accent",
};

export default function Badge(props: BadgeProps) {
  const { children, className, variant = "info", onClick } = props;

  if (onClick)
    return (
      <button
        className={cn(
          "px-2 text-sm border-accent rounded-full border w-fit text-accent transition-colors",
          badgeVariants[variant || "info"],
          className
        )}
      >
        {children}
      </button>
    );
  return (
    <div
      className={cn(
        "px-2 text-sm border-accent rounded-full border w-fit text-accent transition-colors",
        badgeVariants[variant || "info"],
        "hover:none",
        className
      )}
    >
      {children}
    </div>
  );
}
