import { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "icon" | "inline" | "secondary" | "info" | "warning" | "error" | "success"
};

const variants = {
  primary: "border-none text-accent bg-card-muted",
  icon: "p-1 rounded-md bg-transparent text-fg border-none",
  inline: "bg-transparent font-semibold",
  secondary: "bg-accent text-bg hover:bg-accent-hover active:bg-accent-active",
  info: "hover:bg-bg-muted",
  warning: "hover:bg-warning-accent bg-warning-bg",
  error: "hover:bg-destructive-accent bg-destructive-bg text-destructive-fg focus:outline-2 focus:outline-destructive-accent/50 focus:border-destructive-accent border-0",
  success: "hover:bg-success-accent/40 bg-success-bg text-success-fg border-0",
};


export default function Button(props: ButtonProps) {
  const { className, children, variant, ...rest } = props;
  return (
    <button
      className={cn(
        "hover:bg-bg-muted",
        "py-1 px-2 flex rounded-lg items-center transition-colors border text-sm capitalize gap-2 hover:cursor-pointer text-bg z-2 relative",
        "focus:outline-accent-muted/30 focus:border-accent-muted/50 focus:outline-2",
        variants[variant || "primary"],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
