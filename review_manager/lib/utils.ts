import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Returns a truncated version of a string or null if string was too short
export function truncateText(text: string, length: number) {
  if (text.length > length) {
    return text.substring(0, length) + "...";
  } else {
    return null;
  }
}
