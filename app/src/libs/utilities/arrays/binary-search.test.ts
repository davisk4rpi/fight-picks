import { convertNumberToSignedBinary } from '../numbers';
import { findBinaryPositionInOrderedArray } from './binary-search';

describe('findBinaryPositionInOrderedArray', () => {
  test('orderedArray.length === 0', () => {
    const targetValue = 10;
    const actIdx = findBinaryPositionInOrderedArray([], val =>
      targetValue < val ? -1 : 1,
    );
    expect(actIdx).toEqual(0);
  });
  describe('ascending array', () => {
    test('targetValue belongs before first existing value', () => {
      const targetValue = 10;
      const orderedArray = [11, 12];
      const actIdx = findBinaryPositionInOrderedArray(orderedArray, val =>
        targetValue < val ? -1 : 1,
      );
      expect(actIdx).toEqual(0);
    });
    test('targetValue belongs after last existing value', () => {
      const targetValue = 13;
      const orderedArray = [11, 12];
      const actIdx = findBinaryPositionInOrderedArray(orderedArray, val =>
        targetValue < val ? -1 : 1,
      );
      expect(actIdx).toEqual(2);
    });
    test('targetValue belongs inbetween existing values', () => {
      const targetValue = 12;
      const orderedArray = [11, 13];
      let actIdx = findBinaryPositionInOrderedArray(orderedArray, val =>
        targetValue < val ? -1 : 1,
      );
      expect(actIdx).toEqual(1);

      orderedArray.push(14);
      actIdx = findBinaryPositionInOrderedArray(orderedArray, val =>
        targetValue < val ? -1 : 1,
      );
      expect(actIdx).toEqual(1);

      orderedArray.unshift(10);
      actIdx = findBinaryPositionInOrderedArray(orderedArray, val =>
        targetValue < val ? -1 : 1,
      );
      expect(actIdx).toEqual(2);
    });
    test('targetValue equals an existing value', () => {
      const targetValue = 12;
      const orderedArray = [11, 12];
      let actIdx = findBinaryPositionInOrderedArray(orderedArray, val => {
        if (val === targetValue) return 0;
        return targetValue < val ? -1 : 1;
      });
      expect([1, 2]).toContain(actIdx);
    });
    test('targetValue equals multiple existing values', () => {
      const targetValue = 12;
      const orderedArray = [11, 12, 12];
      let actIdx = findBinaryPositionInOrderedArray(orderedArray, val => {
        if (val === targetValue) return 0;
        return targetValue < val ? -1 : 1;
      });
      expect([1, 2, 3]).toContain(actIdx);
    });
  });
  describe('descending array', () => {
    test('targetValue belongs before first existing value', () => {
      const targetValue = 10;
      const orderedArray = [9, 8];
      const actIdx = findBinaryPositionInOrderedArray(orderedArray, val =>
        targetValue > val ? -1 : 1,
      );
      expect(actIdx).toEqual(0);
    });
    test('targetValue belongs after last existing value', () => {
      const targetValue = 13;
      const orderedArray = [16, 15];
      const actIdx = findBinaryPositionInOrderedArray(orderedArray, val =>
        targetValue > val ? -1 : 1,
      );
      expect(actIdx).toEqual(2);
    });
    test('targetValue belongs inbetween existing values', () => {
      const targetValue = 8;
      const orderedArray = [9, 7];
      let actIdx = findBinaryPositionInOrderedArray(orderedArray, val =>
        targetValue > val ? -1 : 1,
      );
      expect(actIdx).toEqual(1);

      orderedArray.push(1);
      actIdx = findBinaryPositionInOrderedArray(orderedArray, val =>
        targetValue > val ? -1 : 1,
      );
      expect(actIdx).toEqual(1);

      orderedArray.unshift(10);
      actIdx = findBinaryPositionInOrderedArray(orderedArray, val =>
        targetValue > val ? -1 : 1,
      );
      expect(actIdx).toEqual(2);
    });
    test('targetValue equals an existing value', () => {
      const targetValue = 12;
      const orderedArray = [12, 11];
      let actIdx = findBinaryPositionInOrderedArray(orderedArray, val => {
        if (val === targetValue) return 0;
        return targetValue < val ? -1 : 1;
      });
      expect([0, 1]).toContain(actIdx);
    });
    test('targetValue equals multiple existing values', () => {
      const targetValue = 12;
      const orderedArray = [12, 12, 11];
      let actIdx = findBinaryPositionInOrderedArray(orderedArray, val => {
        if (val === targetValue) return 0;
        return targetValue < val ? -1 : 1;
      });
      expect([0, 1, 2]).toContain(actIdx);
    });
  });

  describe('array of objects', () => {
    test('targetValue belongs before first existing value', () => {
      const targetValue = { name: 'Adam' };
      const orderedArray = [{ name: 'Sara' }, { name: 'Weili' }];
      const actIdx = findBinaryPositionInOrderedArray(
        orderedArray,
        ({ name }) =>
          convertNumberToSignedBinary(targetValue.name.localeCompare(name)),
      );
      expect(actIdx).toEqual(0);
    });
    test('targetValue belongs after last existing value', () => {
      const targetValue = { name: 'Steve' };
      const orderedArray = [{ name: 'Esther' }, { name: 'Jamahal' }];
      const actIdx = findBinaryPositionInOrderedArray(
        orderedArray,
        ({ name }) =>
          convertNumberToSignedBinary(targetValue.name.localeCompare(name)),
      );
      expect(actIdx).toEqual(2);
    });
    test('targetValue belongs inbetween existing values', () => {
      const targetValue = { name: 'Hannah' };
      const orderedArray = [{ name: 'Eric' }, { name: 'Lucy' }];
      let actIdx = findBinaryPositionInOrderedArray(orderedArray, ({ name }) =>
        convertNumberToSignedBinary(targetValue.name.localeCompare(name)),
      );
      expect(actIdx).toEqual(1);

      orderedArray.push({ name: 'Zach' });
      actIdx = findBinaryPositionInOrderedArray(orderedArray, ({ name }) =>
        convertNumberToSignedBinary(targetValue.name.localeCompare(name)),
      );
      expect(actIdx).toEqual(1);

      orderedArray.unshift({ name: 'Aaron' });
      actIdx = findBinaryPositionInOrderedArray(orderedArray, ({ name }) =>
        convertNumberToSignedBinary(targetValue.name.localeCompare(name)),
      );
      expect(actIdx).toEqual(2);
    });
  });
});
