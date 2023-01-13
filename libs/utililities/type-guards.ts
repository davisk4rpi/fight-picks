export const isStringOrUndefined = (
  val: unknown,
): val is string | undefined => {
  if (['string', 'undefined'].includes(typeof val)) return true;
  return false;
};
