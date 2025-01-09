import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Returns a truncated version of a string or null if string was too short
export function truncateText(text: string, length: number) {
  if (text.length > length) {
    // Find the last space before maxLength
    const lastSpace = text.lastIndexOf(" ", length);
    if (lastSpace === -1) return text.slice(0, length) + "...";
    return text.slice(0, lastSpace) + "...";
  } else {
    return null;
  }
}
