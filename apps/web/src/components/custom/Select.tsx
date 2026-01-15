import { HTMLAttributes, SelectHTMLAttributes, useRef, useState } from "react";
import { cn } from "../../lib/utils";

type SelectProps = HTMLAttributes<HTMLButtonElement> & {
  error?: boolean;
  errorMessage?: string;
  options: {
    value: string;
    label: String;
  }[];
  onSelect: (...args: any) => any;
};

export default function Select(props: SelectProps) {
  const {
    className,
    children,
    error,
    errorMessage,
    options,
    onSelect,
    onClick,
    ...rest
  } = props;
  const [open, setOpen] = useState(false);
  const ref = useRef(null)

  function handleBlur(
    e: React.FocusEvent<HTMLDivElement>,
    ref: React.RefObject<HTMLDivElement | null>,
    fn: () => void
  ) {
    if (!ref.current) return;
    const leavingTo = e.relatedTarget;
    if (!ref.current.contains(leavingTo)) {
      fn();
    }
  }

  return (
    <div
      ref={ref}
      className={cn("relative select bg-bg-clear rounded-md border border-accent-muted/50 h-full",
        "[:has(button:focus)]:outline-2 [:has(button:focus)]:outline-accent-muted/30"
      )}
      onBlur={(e) => handleBlur(e, ref, () => setOpen(false))}
    >
      <button
        {...rest}
        onClick={() => setOpen(true)}
        type="button"
        className={cn(
          "px-2 py-1 rounded-md w-full transition-[color,box-shadow] capitalize text-start h-full",
          error &&
          "border-2-destructive-accent focus:outline-destructive-accent/30 border-destructive-accent/50",
          className
        )}
      >
        {children}
      </button>
      {open && (
        <div
          className="absolute gap-1 top-[calc(100%-2px)] bg-bg-clear border border-accent-muted/50 w-full rounded-md
        flex flex-col z-10 max-h-90 overflow-auto mt-1 hover:cursor-pointer outline-2 outline-accent-muted/30 text-"
        >
          {options?.map((option) => (
            <button
              type="button"
              className={cn("hover:bg-bg-muted m-1 my-0 py-1 rounded-md text-start pl-2 first:mt-1 last:mb-1 hover:cursor-pointer"
              )}
              key={`option-${option.value}`}
              onClick={(e) => {
                e.preventDefault();
                onSelect(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
      {errorMessage && (
        <p className="text-destructive-accent text-sm">{errorMessage}</p>
      )}
    </div>
  );
}
