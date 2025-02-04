import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

export function monthlyLoanAmount(
  loanTermMonths: number,
  interestRateMonthly: number,
  loanAmount: number,
) {
  const interestExponent = (1 + interestRateMonthly) ** loanTermMonths;
  const top = interestRateMonthly * interestExponent;
  const bottom = interestExponent - 1;
  return loanAmount * (top / bottom);
}

export function formatDollarAmount(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function reformatName(name: string): string {
  // List of common company suffixes
  const companyIdentifiers = [
    'LLC',
    'LIMITED',
    'INC',
    'CORPORATION',
    'CORP',
    'HOLDINGS',
  ];

  // Check if the name appears to be a company name
  const isCompany = companyIdentifiers.some((identifier) =>
    name.toUpperCase().includes(identifier),
  );

  if (isCompany) {
    return `Company: ${name.trim().toLowerCase()}`;
  }

  // Split the name into parts
  const parts = name.trim().split(/\s+/);
  // Assuming the last part is the last name
  const lastName = capitalizeWord(parts[0] ?? '');

  // If only the last name is present
  if (parts.length === 1) {
    return lastName;
  }

  // If there's a first name (and possibly middle name or initial)
  const firstName = capitalizeWord(parts[1] ?? '');
  const middleNameOrInitial =
    parts.length > 2 ? parts.slice(2).map(capitalizeWord).join(' ') : '';

  // Return formatted name
  if (middleNameOrInitial) {
    return `${firstName} ${middleNameOrInitial} ${lastName}`;
  } else {
    return `${firstName} ${lastName}`;
  }
}

function capitalizeWord(word: string): string {
  return word.toLowerCase() === 'llc'
    ? 'LLC'
    : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
