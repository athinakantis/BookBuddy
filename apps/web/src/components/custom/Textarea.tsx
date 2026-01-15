import { forwardRef, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
  errorMessage?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, error, errorMessage, ...rest }, ref) => {
    return (
      <>
        <textarea
          ref={ref}
          {...rest}
          className={cn(
            "px-2 py-1 rounded-md w-full transition-[color,box-shadow] border-input border border-accent-muted/50",
            "focus:outline-2 focus:outline-accent-muted/30",
            error &&
            "border-2-destructive-accent focus:outline-destructive-accent/30 border-destructive-accent/50",
            className
          )}
        />
        {errorMessage && (
          <p className="text-destructive-accent text-sm">
            {errorMessage}
          </p>
        )}
      </>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
