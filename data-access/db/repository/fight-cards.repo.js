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
exports.__esModule = true;
exports.FightCardsRepository = void 0;
var repository_abstract_1 = require('./repository.abstract');
var FightCardsRepository = /** @class */ (function (_super) {
  __extends(FightCardsRepository, _super);
  function FightCardsRepository() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  return FightCardsRepository;
})(repository_abstract_1.Repository);
exports.FightCardsRepository = FightCardsRepository;
