'use strict';
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      if (typeof b !== 'function' && b !== null)
        throw new TypeError(
          'Class extends value ' + String(b) + ' is not a constructor or null',
        );
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
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
exports.UsersRepository = void 0;
var nanoid_1 = require('nanoid');
var firestore_1 = require('@react-native-firebase/firestore');
var utililities_1 = require('../../../libs/utililities');
var repository_abstract_1 = require('./repository.abstract');
var UsersRepository = /** @class */ (function (_super) {
  __extends(UsersRepository, _super);
  function UsersRepository(collection, fightersCollection, fightsCollection) {
    var _this = _super.call(this, collection) || this;
    _this.fightersCollection = fightersCollection;
    _this.fightsCollection = fightsCollection;
    _this.set = function (_a) {
      var uid = _a.uid,
        displayName = _a.displayName;
      return __awaiter(_this, void 0, void 0, function () {
        var userRef, existingUserSnapshot;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              userRef = this.getDocRef(uid);
              return [4 /*yield*/, userRef.get()];
            case 1:
              existingUserSnapshot = _b.sent();
              if (existingUserSnapshot.exists) {
                return [2 /*return*/];
              }
              return [
                2 /*return*/,
                userRef.set({
                  uid: uid,
                  authDisplayName: displayName,
                  createdAt: firestore_1.default.FieldValue.serverTimestamp(),
                }),
              ];
          }
        });
      });
    };
    _this.setFightPick = function (fightId, _a, uid) {
      var id = _a.id,
        winningFighterId = _a.winningFighterId,
        round = _a.round,
        method = _a.method,
        confidence = _a.confidence;
      return __awaiter(_this, void 0, void 0, function () {
        var currentUid, fightPicksCollection, docId, setOptions;
        var _b;
        return __generator(this, function (_c) {
          currentUid =
            uid !== null && uid !== void 0
              ? uid
              : (_b = this.currentAuthUser()) === null || _b === void 0
              ? void 0
              : _b.uid;
          if (currentUid === undefined) {
            // Throw Error?
            // TODO log
            return [2 /*return*/];
          }
          fightPicksCollection = this.getFightPicksCollection(currentUid);
          docId = id === undefined || id === '' ? (0, nanoid_1.nanoid)() : id;
          setOptions = {
            mergeFields: [
              'userRef',
              'fightRef',
              'winningFighterRef',
              'round',
              'method',
              'confidence',
              'updatedAt',
            ],
          };
          return [
            2 /*return*/,
            fightPicksCollection.doc(docId).set(
              {
                id: docId,
                userRef: this.getDocRef(currentUid),
                fightRef: this.fightsCollection.doc(fightId),
                winningFighterRef:
                  this.fightersCollection.doc(winningFighterId),
                round: round,
                method: method,
                confidence: confidence,
                createdAt: firestore_1.default.FieldValue.serverTimestamp(),
                updatedAt: firestore_1.default.FieldValue.serverTimestamp(),
              },
              id === undefined || id === '' ? undefined : setOptions,
            ),
          ];
        });
      });
    };
    _this.getFightPicksCollection = function (uid) {
      var _a;
      var docId =
        uid !== null && uid !== void 0
          ? uid
          : (_a = _this.currentAuthUser()) === null || _a === void 0
          ? void 0
          : _a.uid;
      if (docId === undefined) {
        throw new utililities_1.NotFoundError('Could not find fight picks');
      }
      return _this.getDocRef(docId).collection('fightPicks');
    };
    return _this;
  }
  return UsersRepository;
})(repository_abstract_1.Repository);
exports.UsersRepository = UsersRepository;
