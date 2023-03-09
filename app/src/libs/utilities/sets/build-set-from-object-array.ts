/**
 * Creates a new Set<S>() containing all unique values returned by the objectTransformFunc for each object in the provided array.
 * @param objects
 * @param objectTransformFunc
 * @returns set
 */
export function buildSetFromObjectArray<T extends {}, S>(
  objects: T[],
  objectTransformFunc: (obj: T) => S,
) {
  const set: Set<S> = new Set();
  objects.forEach(obj => set.add(objectTransformFunc(obj)));
  return set;
}
