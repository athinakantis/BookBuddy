import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "../lib/utils";

type RatingProps = {
  rating: number | null;
  setRating?: (number: number) => void;
  readOnly?: boolean;
  className?: string;
};

export default function Rating({
  rating,
  setRating,
  readOnly = false,
  className,
}: RatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={cn("flex items-center my-2", className)}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = hovered // fill if rated or hovered
          ? hovered !== null && i <= hovered
          : rating && rating > i;

        return (
          <button
            disabled={readOnly}
            key={i}
            type="button"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className={cn("p-1 cursor-pointer")}
            aria-label={`Rate ${i + 1}`}
            onClick={
              !readOnly && setRating ? () => setRating(i + 1) : undefined
            }
          >
            <Star
              className={cn(`${filled ? "fill-accent" : ""}`, "text-accent")}
            />
          </button>
        );
      })}
    </div>
  );
}
