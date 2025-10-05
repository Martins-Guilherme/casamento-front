import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {  // eslint-disable-line @typescript-eslint/no-explicit-any
  return twMerge(clsx(inputs));
}
