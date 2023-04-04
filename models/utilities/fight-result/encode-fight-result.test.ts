import { FightResult, MethodMap } from '../../types';
import { decodeFightResult, encodeFightResult } from './encode-fight-result';
import { InvalidFightResultCodeError } from './InvalidFightResultCodeError';

const validResultTestCases: {
  name: string;
  code: string | null;
  result: FightResult | null;
}[] = [
  {
    name: 'null',
    code: null,
    result: null,
  },
  {
    name: 'DEC, fighter1',
    code: 'decision-1-null',
    result: {
      method: MethodMap.decision,
      winningFighter: 1,
      round: null,
    },
  },
  {
    name: '1st rd KO, fighter1',
    code: 'knockout-1-1',
    result: {
      method: MethodMap.knockout,
      winningFighter: 1,
      round: 1,
    },
  },
  {
    name: '4th rd SUB, fighter2',
    code: 'submission-2-4',
    result: {
      method: MethodMap.submission,
      winningFighter: 2,
      round: 4,
    },
  },
  {
    name: 'DRAW',
    code: 'draw-null-null',
    result: {
      method: MethodMap.draw,
      winningFighter: null,
      round: null,
    },
  },
  {
    name: '2nd rd DQ, fighter1 wins',
    code: 'disqualification-1-2',
    result: {
      method: MethodMap.disqualification,
      winningFighter: 1,
      round: 2,
    },
  },
  {
    name: 'NC',
    code: 'no_contest-null-null',
    result: {
      method: MethodMap.no_contest,
      winningFighter: null,
      round: null,
    },
  },
];
describe('encode-fight-result', () => {
  describe('encodeFightResult', () => {
    test.each(validResultTestCases)('$name [$code]', ({ code, result }) => {
      const actCode = encodeFightResult(result);
      expect(actCode).toBe(code);
    });
  });
  describe('decodeFightResult', () => {
    describe('valid codes', () => {
      test.each(validResultTestCases)('$name [$code]', ({ code, result }) => {
        const actResult = decodeFightResult(code);
        expect(actResult).toEqual(result);
      });
    });

    describe('invalid codes', () => {
      test(`1st round DRAW [411]`, () => {
        const code = '411';

        const func = () => {
          decodeFightResult(code);
        };
        expect(func).toThrow(InvalidFightResultCodeError);
      });

      test(`1st round TKO, no winner [201]`, () => {
        const code = '201';

        const func = () => {
          decodeFightResult(code);
        };
        expect(func).toThrow(InvalidFightResultCodeError);
      });

      test(`1st round DEC [111]`, () => {
        const code = '111';

        const func = () => {
          decodeFightResult(code);
        };
        expect(func).toThrow(InvalidFightResultCodeError);
      });

      test(`DQ, no round [510]`, () => {
        const code = '510';

        const func = () => {
          decodeFightResult(code);
        };
        expect(func).toThrow(InvalidFightResultCodeError);
      });
    });

    describe('incorrectly formatted codes', () => {
      const incorrectlyFormattedCodes = [
        '1',
        '1111',
        'a32',
        '000000',
        '.23',
        'BBB',
      ];
      test.each(incorrectlyFormattedCodes)('(%s)', code => {
        const func = () => {
          decodeFightResult(code);
        };
        expect(func).toThrow(InvalidFightResultCodeError);
      });
    });
  });
});
