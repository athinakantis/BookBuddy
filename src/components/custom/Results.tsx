import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

type ResultsProps = HTMLAttributes<HTMLDivElement> & {
  options: {
    label: string;
    value: string;
  }[];
  name: string;
  onSelect: (option: any) => void;
  noResult?: () => ReactNode;
};

export default function Results(props: ResultsProps) {
  const { options, className, onSelect, name, noResult } = props;

  return (
    <div
      className={cn(
        "absolute gap-1 top-[calc(100%-2px)] bg-bg-clear border border-accent-muted/50 rounded-md flex flex-col z-10 max-h-90 overflow-auto mt-1 hover:cursor-pointer outline-2 outline-accent-muted/30 text w-full",
        className,
      )}
    >
      {options.map((option) => (
        <button
          type="button"
          className={cn(
            "hover:bg-bg-muted m-1 my-0 py-1 rounded-md text-start pl-2 first:mt-1 last:mb-1 hover:cursor-pointer",
          )}
          key={`option-${name}-${option.value}`}
          onClick={() => onSelect(option)}
        >
          {option.label}
        </button>
      ))}
      {options.length < 1 && noResult ? noResult() : null}
    </div>
  );
}
