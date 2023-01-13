export function buildSetFromObjectArray<T extends {}, S>(
  objects: T[],
  objectTransformFunc: (obj: T) => S,
) {
  const set: Set<S> = new Set();
  objects.forEach(obj => set.add(objectTransformFunc(obj)));
  return set;
}
