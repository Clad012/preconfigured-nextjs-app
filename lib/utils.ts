import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names using clsx and tailwind-merge
 *
 * This utility function combines multiple class names into a single string,
 * resolving Tailwind CSS conflicts by using tailwind-merge.
 *
 * @param {ClassValue[]} inputs - Class names or conditional class objects to merge
 * @returns {string} A merged string of class names
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
