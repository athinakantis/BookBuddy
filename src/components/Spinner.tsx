import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { HTMLAttributes } from "react";

type SpinnerProps = HTMLAttributes<HTMLDivElement>;

export default function Spinner(props: SpinnerProps) {
  const { className } = props;

  return (
    <LoaderCircle
      className={cn("animate-spin text-accent block mx-auto", className)}
    />
  );
}
