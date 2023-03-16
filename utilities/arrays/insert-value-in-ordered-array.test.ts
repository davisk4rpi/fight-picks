import { convertNumberToSignedBinary } from '../numbers';
import { insertValueInOrderedArray } from './insert-value-in-ordered-array';

describe('insertValueInOrderedArray', () => {
  test('orderedArray.length === 0', () => {
    const act = insertValueInOrderedArray<number[]>(
      10,
      [],
      (target, existing) => (target < existing ? -1 : 1),
    );
    expect(act).toEqual([10]);
  });
  describe('ascending array', () => {
    test('targetValue belongs before first existingValue', () => {
      const orderedArray = [11, 12];
      const act = insertValueInOrderedArray(
        10,
        orderedArray,
        (target, existing) => (target < existing ? -1 : 1),
      );
      expect(act).toEqual([10, 11, 12]);
    });
    test('targetValue belongs after last existingValue', () => {
      const orderedArray = [11, 12];
      const act = insertValueInOrderedArray(
        13,
        orderedArray,
        (target, existing) => (target < existing ? -1 : 1),
      );
      expect(act).toEqual([11, 12, 13]);
    });
    test('targetValue belongs inbetween existingValues', () => {
      let act = insertValueInOrderedArray(12, [11, 13], (target, existing) =>
        target < existing ? -1 : 1,
      );
      expect(act).toEqual([11, 12, 13]);

      act = insertValueInOrderedArray(12, [11, 13, 14], (target, existing) =>
        target < existing ? -1 : 1,
      );
      expect(act).toEqual([11, 12, 13, 14]);

      act = insertValueInOrderedArray(
        12,
        [10, 11, 13, 14],
        (target, existing) => (target < existing ? -1 : 1),
      );
      expect(act).toEqual([10, 11, 12, 13, 14]);
    });
    test('targetValue equals an existingValue', () => {
      const orderedArray = [11, 12];
      let act = insertValueInOrderedArray(
        12,
        orderedArray,
        (target, existing) => {
          if (existing === target) return 0;
          return target < existing ? -1 : 1;
        },
      );
      expect(act).toEqual([11, 12, 12]);
    });
    test('targetValue equals multiple existingValues', () => {
      const orderedArray = [11, 12, 12];
      let act = insertValueInOrderedArray(
        12,
        orderedArray,
        (target, existing) => {
          if (existing === target) return 0;
          return target < existing ? -1 : 1;
        },
      );
      expect(act).toEqual([11, 12, 12, 12]);
    });
  });
  describe('descending array', () => {
    test('targetValue belongs before first existingValue', () => {
      const orderedArray = [9, 8];
      const act = insertValueInOrderedArray(
        10,
        orderedArray,
        (target, existing) => (target > existing ? -1 : 1),
      );
      expect(act).toEqual([10, 9, 8]);
    });
    test('targetValue belongs after last existingValue', () => {
      const orderedArray = [16, 15];
      const act = insertValueInOrderedArray(
        13,
        orderedArray,
        (target, existing) => (target > existing ? -1 : 1),
      );
      expect(act).toEqual([16, 15, 13]);
    });
    test('targetValue belongs inbetween existingValues', () => {
      let act = insertValueInOrderedArray(8, [9, 7], (target, existing) =>
        target > existing ? -1 : 1,
      );
      expect(act).toEqual([9, 8, 7]);

      act = insertValueInOrderedArray(8, [9, 7, 1], (target, existing) =>
        target > existing ? -1 : 1,
      );
      expect(act).toEqual([9, 8, 7, 1]);

      act = insertValueInOrderedArray(8, [10, 9, 7, 1], (target, existing) =>
        target > existing ? -1 : 1,
      );
      expect(act).toEqual([10, 9, 8, 7, 1]);
    });
    test('targetValue equals an existingValue', () => {
      const orderedArray = [12, 11];
      let act = insertValueInOrderedArray(
        12,
        orderedArray,
        (target, existing) => {
          if (existing === target) return 0;
          return target < existing ? -1 : 1;
        },
      );
      expect(act).toEqual([12, 12, 11]);
    });
    test('targetValue equals multiple existingValues', () => {
      const orderedArray = [12, 12, 11];
      let act = insertValueInOrderedArray(
        12,
        orderedArray,
        (target, existing) => {
          if (existing === target) return 0;
          return target < existing ? -1 : 1;
        },
      );
      expect(act).toEqual([12, 12, 12, 11]);
    });
  });

  describe('array of objects', () => {
    test('targetValue belongs before first existingValue', () => {
      const orderedArray = [{ name: 'Sara' }, { name: 'Weili' }];
      const act = insertValueInOrderedArray(
        { name: 'Adam' },
        orderedArray,
        (target, { name }) =>
          convertNumberToSignedBinary(target.name.localeCompare(name)),
      );
      expect(act).toEqual([
        { name: 'Adam' },
        { name: 'Sara' },
        { name: 'Weili' },
      ]);
    });
    test('targetValue belongs after last existingValue', () => {
      const orderedArray = [{ name: 'Esther' }, { name: 'Jamahal' }];
      const act = insertValueInOrderedArray(
        { name: 'Steve' },
        orderedArray,
        (target, { name }) =>
          convertNumberToSignedBinary(target.name.localeCompare(name)),
      );
      expect(act).toEqual([
        { name: 'Esther' },
        { name: 'Jamahal' },
        { name: 'Steve' },
      ]);
    });
    test('targetValue belongs inbetween existingValues', () => {
      const orderedArray = [{ name: 'Eric' }, { name: 'Lucy' }];
      let act = insertValueInOrderedArray(
        { name: 'Hannah' },
        [{ name: 'Eric' }, { name: 'Lucy' }],
        (target, { name }) =>
          convertNumberToSignedBinary(target.name.localeCompare(name)),
      );
      expect(act).toEqual([
        { name: 'Eric' },
        { name: 'Hannah' },
        { name: 'Lucy' },
      ]);

      act = insertValueInOrderedArray(
        { name: 'Hannah' },
        [{ name: 'Eric' }, { name: 'Lucy' }, { name: 'Zach' }],
        (target, { name }) =>
          convertNumberToSignedBinary(target.name.localeCompare(name)),
      );
      expect(act).toEqual([
        { name: 'Eric' },
        { name: 'Hannah' },
        { name: 'Lucy' },
        { name: 'Zach' },
      ]);

      orderedArray.unshift({ name: 'Aaron' });
      act = insertValueInOrderedArray(
        { name: 'Hannah' },
        [
          { name: 'Aaron' },
          { name: 'Eric' },
          { name: 'Lucy' },
          { name: 'Zach' },
        ],
        (target, { name }) =>
          convertNumberToSignedBinary(target.name.localeCompare(name)),
      );
      expect(act).toEqual([
        { name: 'Aaron' },
        { name: 'Eric' },
        { name: 'Hannah' },
        { name: 'Lucy' },
        { name: 'Zach' },
      ]);
    });
  });
});
