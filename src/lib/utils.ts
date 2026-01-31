import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toCapitalized(string: string) {
  return (
    string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase()
  );
}