import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

type DetailedViewProps = HTMLAttributes<HTMLDivElement> & {
  pageName: string;
  children: ReactNode;
};

export default function DetailedView({
  pageName,
  children,
  className,
}: DetailedViewProps) {
  return (
    <div
      className={cn("bg-card p-4 rounded-sm shadow-md", className)}>
      <h2>{pageName}</h2>
      {children}
    </div>
  );
}
