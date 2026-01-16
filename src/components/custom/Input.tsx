import { InputHTMLAttributes, SelectHTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import { FieldErrors } from "react-hook-form";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
  errorMessage?: string
};

export default function Input(props: InputProps) {
  const { className, children, error, errorMessage, ...rest } = props;

  return (
    <>
      <input
        {...rest}
        className={cn(
          "bg-card px-2 py-1 rounded-md w-full transition-[color,box-shadow] border-input border border-accent-muted/50",
          "focus:outline-2 focus:outline-accent-muted/30",
          props.error && "focus:outline-destructive-accent/30 border-destructive-accent/50",
          className
        )}
      >
        {children}
      </input>
      {errorMessage && <p className="text-destructive-accent text-sm">{errorMessage}</p>}
    </>

  );
}
