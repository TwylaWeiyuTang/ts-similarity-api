import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// twMerge will merge two related tailwind classes together to improve the readbility and for
// easy maintenance
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
