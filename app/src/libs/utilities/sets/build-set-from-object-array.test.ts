import { buildSetFromObjectArray } from './build-set-from-object-array';

// }
describe('buildSetFromObjectArray', () => {
  it('returns a JS Set containing only the values of an object field', () => {
    const arr = [
      { status: 'complete' },
      { status: 'failed' },
      { status: 'pending' },
    ];

    const set = buildSetFromObjectArray(arr, obj => obj.status);
    expect(set).toBeInstanceOf(Set);
    expect(set.size).toEqual(3);
    expect(set).toContain('complete');
    expect(set).toContain('failed');
    expect(set).toContain('pending');
    expect(set).not.toContain('something else');
  });
  it('returns an empty set when there are no objects in the provided array', () => {
    const arr: {}[] = [];

    const set = buildSetFromObjectArray(arr, _ => 1);
    expect(set).toBeInstanceOf(Set);
    expect(set.size).toEqual(0);
  });

  it('returns a JS Set containing values calculated from each object', () => {
    const arr = [
      { startingValue: 1 },
      { startingValue: 2 },
      { startingValue: 3 },
    ];

    const set = buildSetFromObjectArray(arr, obj => obj.startingValue * 3);
    expect(set.size).toEqual(3);
    expect(set).toContain(3);
    expect(set).toContain(6);
    expect(set).toContain(9);
  });

  it('rethrow an error if one call on objectTransformFunc throws an error', () => {
    const arr = [
      { startingValue: 1 },
      { startingValue: 2 },
      { startingValue: 3 },
    ];

    expect(() =>
      buildSetFromObjectArray(arr, obj => {
        if (obj.startingValue === 3) {
          throw new Error('Error!');
        }
        return obj.startingValue;
      }),
    ).toThrow('Error!');
  });
});
