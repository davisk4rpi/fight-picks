export const isStringOrUndefined = (
  val: unknown,
): val is string | undefined => {
  if (['string', 'undefined'].includes(typeof val)) return true;
  return false;
};

export const isNotUndefined = <T extends any>(
  thing: T | undefined,
): thing is T => thing !== undefined;

export const isNotNull = <T extends any>(thing: T | null): thing is T =>
  thing !== null;

export const isNotNullOrUndefined = <T extends any>(
  thing: T | undefined | null,
): thing is T => isNotUndefined(thing) && isNotNull(thing);
