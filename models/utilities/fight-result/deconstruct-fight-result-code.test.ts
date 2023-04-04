import { deconstructFightResultCode } from './deconstruct-fight-result-code';
import { InvalidFightResultCodeError } from './InvalidFightResultCodeError';

const validResultCodes = [
  'decision-1-null',
  'submission-2-3',
  'knockout-1-2',
  'knockout-2-1',
  'disqualification-1-4',
  'disqualification-2-2',
  'draw-null-null',
  'no_contest-null-null',
];
const invalidResultCodes = [
  'null-1-1',
  'null-2-3',
  'something-1-2',
  'knockout-fighter2-1',
  'disualification-1-null',
  'decision-1-nil',
  'draw-0-0',
];
describe('deconstruct-fight-result-code', () => {
  describe('deconstructFightResultCode', () => {
    test.each(validResultCodes)('%s should be valid', code => {
      const func = () => {
        deconstructFightResultCode(code);
      };
      expect(func).not.toThrow();
    });
    test.each(invalidResultCodes)('%s should be invalid', code => {
      const func = () => {
        deconstructFightResultCode(code);
      };
      expect(func).toThrow(InvalidFightResultCodeError);
    });
  });
});
