export type BinarySearchComparisonFunction<Val extends unknown> = (
  existingValue: Val,
  idx: number,
) => -1 | 0 | 1;

export type BinaryInsertComparisonFunction<Val extends unknown> = (
  newValue: Val,
  existingValue: Val,
  idx: number,
) => -1 | 0 | 1;
