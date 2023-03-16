import { findBinaryPositionInOrderedArray } from './find-binary-position-in-ordered-array';
import { BinaryInsertComparisonFunction } from './types';

/**
 * inserts a newValue into an ordered array using binary search.
 * WARNING: mutates the supplied orderedArray in place
 * @param orderedArray
 * @param compareFn should return -1 if the newValue belongs before existingValue, 0 if newValue === existingValue, and 1 if newValue belongs after the existingValue
 * @returns mutatedOrderedArray
 */
export const insertValueInOrderedArray = <OrderedArray extends unknown[]>(
  newValue: OrderedArray[number],
  orderedArray: OrderedArray,
  compareFn: BinaryInsertComparisonFunction<OrderedArray[number]>,
) => {
  const idx = findBinaryPositionInOrderedArray(orderedArray, (existing, i) =>
    compareFn(newValue, existing, i),
  );
  orderedArray.splice(idx, 0, newValue);

  return orderedArray;
};
