export const convertNumberToSignedBinary = (val: number): -1 | 0 | 1 => {
  if (val === 0) return 0;
  return val > 0 ? 1 : -1;
};

describe('convertNumberToSignedBinary', () => {
  test('0 converts to 0', () => {
    expect(convertNumberToSignedBinary(0)).toBe(0);
  });
  test('positive numbers convert to 1', () => {
    expect(convertNumberToSignedBinary(1)).toBe(1);
    expect(convertNumberToSignedBinary(Infinity)).toBe(1);
    expect(convertNumberToSignedBinary(0.000001)).toBe(1);
    expect(convertNumberToSignedBinary(42)).toBe(1);
  });
  test('negative numbers convert to -1', () => {
    expect(convertNumberToSignedBinary(-1)).toBe(-1);
    expect(convertNumberToSignedBinary(-Infinity)).toBe(-1);
    expect(convertNumberToSignedBinary(-0.000001)).toBe(-1);
    expect(convertNumberToSignedBinary(-42)).toBe(-1);
  });
});
