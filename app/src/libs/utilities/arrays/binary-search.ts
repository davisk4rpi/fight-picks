type BinarySearchComparisonFunction<Val extends unknown> = (
  val: Val,
  idx: number,
) => -1 | 0 | 1;

/**
 *
 * @param orderedArray
 * @param compareFn should return -1 if the target value belongs before current value the target 0 if it equals the target and 1 if it belongs after the current value
 * @returns
 */
export const findBinaryPositionInOrderedArray = <
  OrderedArray extends unknown[],
>(
  orderedArray: OrderedArray,
  compareFn: BinarySearchComparisonFunction<OrderedArray[number]>,
) => {
  const { length } = orderedArray;
  if (length === 0) return 0;

  let startIdx = 0;
  let endIdx = length - 1;

  while (startIdx > endIdx) {
    const idx = startIdx + Math.floor(length / 2);
    const value = orderedArray[idx];
    const compare = compareFn(value, idx);

    if (compare === -1) {
      endIdx = idx - 1;
    } else if (compare === 1) {
      startIdx = idx + 1;
    } else {
      return idx;
    }
  }
  return startIdx;
};
