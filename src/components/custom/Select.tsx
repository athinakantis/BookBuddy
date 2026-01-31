import { HTMLAttributes, SelectHTMLAttributes, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import Results from "./Results";

type SelectProps = HTMLAttributes<HTMLButtonElement> & {
  error?: boolean;
  errorMessage?: string;
  options: {
    value: string;
    label: string;
  }[];
  onSelect: (...args: any) => any;
};

function handleBlur(
  e: React.FocusEvent<HTMLDivElement>,
  ref: React.RefObject<HTMLDivElement | null>,
  fn: () => void,
) {
  if (!ref.current) return;
  const leavingTo = e.relatedTarget;
  if (!ref.current.contains(leavingTo)) {
    fn();
  }
}

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
  const ref = useRef(null);



  return (
    <div
      ref={ref}
      className={cn(
        "relative select bg-bg-clear rounded-md border border-accent-muted/50 h-full",
        "[:has(button:focus)]:outline-2 [:has(button:focus)]:outline-accent-muted/30 h-fit",
        className
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

        )}
      >
        {children}
      </button>
      {open && (
        <Results
          options={options}
          name="select"
          onSelect={(val) => {
            onSelect(val);
            setOpen(false);
          }}
        />
      )}
      {errorMessage && (
        <p className="text-destructive-accent text-sm">{errorMessage}</p>
      )}
    </div>
  );
}
