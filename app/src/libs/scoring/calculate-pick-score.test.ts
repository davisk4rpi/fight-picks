import { FightResult, MethodMap, Round } from '@fight-picks/models';

import { calculatePickScore } from './calculate-pick-score';

const rounds: Round[] = [1, 2, 3, 4, 5];

describe('calculatePickScore', () => {
  describe('no winner fightResult', () => {
    it('returns 0 score and negative confidenceScore when fightResult.method === "no_contest"', () => {
      const fightPick: FightResult = {
        winningFighter: 1,
        method: MethodMap.decision,
        round: null,
      };
      let fightResult: FightResult = {
        winningFighter: null,
        method: MethodMap.no_contest,
        round: null,
      };
      const actScore = calculatePickScore(fightPick, fightResult);
      expect(actScore).toEqual(0);
    });

    it('returns 0 score and negative confidenceScore when fightResult.method === "draw"', () => {
      const fightPick: FightResult = {
        winningFighter: 1,
        method: MethodMap.decision,
        round: null,
      };
      let fightResult: FightResult = {
        winningFighter: null,
        method: MethodMap.draw,
        round: null,
      };

      const actScore = calculatePickScore(fightPick, fightResult);
      expect(actScore).toEqual(0);
    });
  });

  describe('decision fightResult', () => {
    const decisionfightResult: FightResult = {
      winningFighter: 1,
      method: MethodMap.decision,
      round: null,
    };

    test('has incorrect winner', () => {
      const fightPick: FightResult = {
        winningFighter: 2,
        method: MethodMap.decision,
        round: null,
      };

      const actScore = calculatePickScore(fightPick, decisionfightResult);
      expect(actScore).toEqual(0);
    });

    describe('has correct winner', () => {
      test('perfect pick', () => {
        const fightPick: FightResult = {
          winningFighter: 1,
          method: MethodMap.decision,
          round: null,
        };

        const actScore = calculatePickScore(fightPick, decisionfightResult);
        expect(actScore).toEqual(3);
      });

      test('has correct winner, incorrect method', () => {
        const fightPick: FightResult = {
          winningFighter: 1,
          method: MethodMap.knockout,
          round: 1,
        };

        const actScore = calculatePickScore(fightPick, decisionfightResult);
        expect(actScore).toEqual(1);
      });
    });
  });

  describe.each([
    MethodMap.knockout,
    MethodMap.submission,
    MethodMap.disqualification,
  ])('%s fightResult', method => {
    describe('has incorrect winner', () => {
      test.each(rounds)(`correct round (%i) and method (${method})`, round => {
        const fightResult: FightResult = {
          winningFighter: 1,
          method,
          round,
        };
        const fightPick: FightResult = {
          winningFighter: 2,
          method: MethodMap.decision,
          round: null,
        };

        const actScore = calculatePickScore(fightPick, fightResult);
        expect(actScore).toEqual(0);
      });
    });

    describe('has correct winner', () => {
      describe.each(rounds)('correct round (%i)', round => {
        test('correct method', () => {
          const fightPick: FightResult = {
            winningFighter: 1,
            method,
            round,
          };
          const fightResult: FightResult = {
            winningFighter: 1,
            method,
            round,
          };
          const expScore = 3 + round;
          const actScore = calculatePickScore(fightPick, fightResult);
          expect(actScore).toEqual(expScore);
        });
        test('incorrect method', () => {
          const fightPick: FightResult = {
            winningFighter: 1,
            method:
              method === MethodMap.knockout
                ? MethodMap.submission
                : MethodMap.knockout,
            round,
          };
          const fightResult: FightResult = {
            winningFighter: 1,
            method,
            round,
          };
          const expScore = 1 + round;
          const actScore = calculatePickScore(fightPick, fightResult);
          expect(actScore).toEqual(expScore);
        });
      });

      describe('incorrect round', () => {
        test('incorrect method', () => {
          const fightPick: FightResult = {
            winningFighter: 1,
            method:
              method === MethodMap.knockout
                ? MethodMap.submission
                : MethodMap.knockout,
            round: 2,
          };
          const fightResult: FightResult = {
            winningFighter: 1,
            method,
            round: 1,
          };

          const actScore = calculatePickScore(fightPick, fightResult);
          expect(actScore).toEqual(1);
        });
        test('correct method', () => {
          const fightPick: FightResult = {
            winningFighter: 1,
            method,
            round: 2,
          };
          const fightResult: FightResult = {
            winningFighter: 1,
            method,
            round: 1,
          };

          const actScore = calculatePickScore(fightPick, fightResult);
          expect(actScore).toEqual(2);
        });
      });
    });
  });
});
