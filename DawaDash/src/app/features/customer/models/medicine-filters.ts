export type PriceFilter = 'any' | 'under-200' | '200-500' | 'over-500';
export type PrescriptionFilter = 'any' | 'otc' | 'rx';

export const PRICE_OPTIONS: ReadonlyArray<{ value: PriceFilter; label: string }> = [
  { value: 'any', label: 'Any' },
  { value: 'under-200', label: 'Under 200' },
  { value: '200-500', label: '200–500' },
  { value: 'over-500', label: 'Over 500' },
];

export const PRESCRIPTION_OPTIONS: ReadonlyArray<{ value: PrescriptionFilter; label: string }> = [
  { value: 'any', label: 'Any' },
  { value: 'otc', label: 'OTC only' },
  { value: 'rx', label: 'Rx only' },
];

export function matchesPrice(price: number, filter: PriceFilter): boolean {
  switch (filter) {
    case 'under-200':
      return price < 200;
    case '200-500':
      return price >= 200 && price <= 500;
    case 'over-500':
      return price > 500;
    default:
      return true;
  }
}

/** Returns the option after the current one, going back to the first at the end. */
export function nextOption<T extends string>(
  options: ReadonlyArray<{ value: T }>,
  current: T,
): T {
  const index = options.findIndex((option) => option.value === current);
  return options[(index + 1) % options.length].value;
}