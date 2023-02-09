'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
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
exports.FirebaseMigrationHelper = void 0;
var firestore_1 = require('firebase-admin/firestore');
var utililities_1 = require('../../../../libs/utililities');
var FirebaseMigrationStatus;
(function (FirebaseMigrationStatus) {
  FirebaseMigrationStatus.initialized = 'initialized';
  FirebaseMigrationStatus.failed = 'failed';
  FirebaseMigrationStatus.complete = 'complete';
})(FirebaseMigrationStatus || (FirebaseMigrationStatus = {}));
var FirebaseMigrationHelper = /** @class */ (function () {
  function FirebaseMigrationHelper(migrationFirestore, migrationName) {
    var _this = this;
    this.migrationFirestore = migrationFirestore;
    this.migrationName = migrationName;
    this.migrationActive = false;
    this.initializeMigration = function () {
      return __awaiter(_this, void 0, void 0, function () {
        var migrationSnapshot;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, this.migrationRef.get()];
            case 1:
              migrationSnapshot = _a.sent();
              if (migrationSnapshot.exists) {
                throw new utililities_1.MigrationAlreadyExistsError(
                  this.migrationName,
                  migrationSnapshot.data(),
                );
              }
              this.migrationRef.set({
                name: this.migrationName,
                status: FirebaseMigrationStatus.initialized,
                createdAt: firestore_1.FieldValue.serverTimestamp(),
                updatedAt: firestore_1.FieldValue.serverTimestamp(),
              });
              this.migrationActive = true;
              return [2 /*return*/];
          }
        });
      });
    };
    this.validateActiveIsMigration = function () {
      if (_this.migrationActive) return;
      throw Error('Migration is not active!');
    };
    this.failMigration = function () {
      return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          this.migrationRef.update({
            status: FirebaseMigrationStatus.failed,
            updatedAt: firestore_1.FieldValue.serverTimestamp(),
          });
          this.migrationActive = false;
          return [2 /*return*/];
        });
      });
    };
    this.markMigrationComplete = function () {
      return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          this.migrationRef.update({
            status: FirebaseMigrationStatus.complete,
            updatedAt: firestore_1.FieldValue.serverTimestamp(),
          });
          return [2 /*return*/];
        });
      });
    };
    this.createFightersIfNotExist = function (fighterNames, fighterMap) {
      return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
          return [
            2 /*return*/,
            fighterNames.map(function (fighterName) {
              var _a;
              return (_a = fighterMap.get(fighterName)) !== null &&
                _a !== void 0
                ? _a
                : _this.createFighter(fighterName);
            }),
          ];
        });
      });
    };
    this.createFighter = function (fighterName) {
      _this.validateActiveIsMigration();
      var ref = _this.migrationFirestore.fightersCollection.doc();
      ref.set({
        id: ref.id,
        name: fighterName,
        createdAt: firestore_1.FieldValue.serverTimestamp(),
      });
      return ref;
    };
    this.createFight = function (fight) {
      _this.validateActiveIsMigration();
      var ref = _this.migrationFirestore.fightsCollection.doc(fight.id);
      ref.set(
        __assign(__assign({}, fight), {
          createdAt: firestore_1.FieldValue.serverTimestamp(),
        }),
      );
      return ref;
    };
    this.setFightCard = function (ref, fightCard) {
      _this.validateActiveIsMigration();
      ref.set(
        __assign(__assign({}, fightCard), {
          createdAt: firestore_1.FieldValue.serverTimestamp(),
        }),
      );
      return ref;
    };
    this.getFighterNameMap = function () {
      return __awaiter(_this, void 0, void 0, function () {
        var fighters, fighterMap;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              this.validateActiveIsMigration();
              return [
                4 /*yield*/,
                this.migrationFirestore.fightersCollection.get(),
              ];
            case 1:
              fighters = _a.sent();
              fighterMap = new Map();
              fighters.docs.forEach(function (fighter) {
                return fighterMap.set(fighter.data().name, fighter.ref);
              });
              return [2 /*return*/, fighterMap];
          }
        });
      });
    };
    this.migrationRef = this.migrationFirestore.migrationsCollection.doc(
      this.migrationName,
    );
  }
  return FirebaseMigrationHelper;
})();
exports.FirebaseMigrationHelper = FirebaseMigrationHelper;
