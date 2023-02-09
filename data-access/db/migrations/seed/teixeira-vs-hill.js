'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y.return
                  : op[0]
                  ? y.throw || ((t = y.return) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
exports.__esModule = true;
exports.seedTeixeiraVsHill = void 0;
var firestore_1 = require('firebase-admin/firestore');
var seedTeixeiraVsHill = function (appFirestore, migrationHelper) {
  return __awaiter(void 0, void 0, void 0, function () {
    var fighterMap,
      _a,
      fighter11Ref,
      fighter12Ref,
      fighter13Ref,
      fighter14Ref,
      fighter15Ref,
      fighter16Ref,
      fighter17Ref,
      fighter18Ref,
      fighter19Ref,
      fighter20Ref,
      fightCardRef,
      fight1Ref,
      fight2Ref,
      fight3Ref,
      fight4Ref,
      fight5Ref;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          return [4 /*yield*/, migrationHelper.getFighterNameMap()];
        case 1:
          fighterMap = _b.sent();
          return [
            4 /*yield*/,
            migrationHelper.createFightersIfNotExist(
              [
                'Glover Teixeira',
                'Jamahal Hill',
                'Deiveson Figueiredo',
                'Brandon Moreno',
                'Gilbert Burns',
                'Neil Magny',
                'Lauren Murphy',
                'Jessica Andrade',
                'Paul Craig',
                'Johnny Walker',
              ],
              fighterMap,
            ),
          ];
        case 2:
          (_a = _b.sent()),
            (fighter11Ref = _a[0]),
            (fighter12Ref = _a[1]),
            (fighter13Ref = _a[2]),
            (fighter14Ref = _a[3]),
            (fighter15Ref = _a[4]),
            (fighter16Ref = _a[5]),
            (fighter17Ref = _a[6]),
            (fighter18Ref = _a[7]),
            (fighter19Ref = _a[8]),
            (fighter20Ref = _a[9]);
          fightCardRef = appFirestore.fightCardsCollection.doc('2');
          fight1Ref = migrationHelper.createFight({
            id: '6',
            fightCardRef: fightCardRef,
            rounds: 5,
            weight: 205,
            sex: 'male',
            fighter1Ref: fighter11Ref,
            fighter2Ref: fighter12Ref,
            result: {
              winningFighterRef: fighter12Ref,
              method: 'decision',
              round: null,
            },
          });
          fight2Ref = migrationHelper.createFight({
            id: '7',
            fightCardRef: fightCardRef,
            rounds: 5,
            weight: 125,
            sex: 'male',
            fighter1Ref: fighter13Ref,
            fighter2Ref: fighter14Ref,
            result: {
              winningFighterRef: fighter14Ref,
              method: 'knockout',
              round: 3,
            },
          });
          fight3Ref = migrationHelper.createFight({
            id: '8',
            fightCardRef: fightCardRef,
            rounds: 3,
            weight: 170,
            sex: 'male',
            fighter1Ref: fighter15Ref,
            fighter2Ref: fighter16Ref,
            result: {
              winningFighterRef: fighter15Ref,
              method: 'submission',
              round: 1,
            },
          });
          fight4Ref = migrationHelper.createFight({
            id: '9',
            fightCardRef: fightCardRef,
            rounds: 3,
            weight: 125,
            sex: 'female',
            fighter1Ref: fighter17Ref,
            fighter2Ref: fighter18Ref,
            result: {
              winningFighterRef: fighter18Ref,
              method: 'decision',
              round: null,
            },
          });
          fight5Ref = migrationHelper.createFight({
            id: '10',
            fightCardRef: fightCardRef,
            rounds: 3,
            weight: 205,
            sex: 'male',
            fighter1Ref: fighter19Ref,
            fighter2Ref: fighter20Ref,
            result: {
              winningFighterRef: fighter20Ref,
              method: 'knockout',
              round: 1,
            },
          });
          migrationHelper.setFightCard(fightCardRef, {
            mainCardDate: firestore_1.Timestamp.fromDate(
              new Date('2023-01-22T03:00:00.000Z'),
            ),
            name: 'Teixeira vs Hill',
            id: '2',
            fightRefs: [fight1Ref, fight2Ref, fight3Ref, fight4Ref, fight5Ref],
          });
          return [2 /*return*/];
      }
    });
  });
};
exports.seedTeixeiraVsHill = seedTeixeiraVsHill;
