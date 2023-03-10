export const convertNumberToSignedBinary = (val: number): -1 | 0 | 1 => {
  if (val === 0) return 0;
  return val > 0 ? 1 : -1;
};
