import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function daysAgo(createdAt: Date) {
  const today = new Date();
  const creationDate = new Date(createdAt);

  const timeDifference = today.getTime() - creationDate.getTime();

  const dayDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
  return dayDifference;
}
