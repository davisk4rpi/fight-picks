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
exports.MigrationAlreadyExistsError = void 0;
var InputError_1 = require('./InputError');
var DEFAULT_MESSAGE = 'MIGRATION alreaduy exists!';
var MigrationAlreadyExistsError = /** @class */ (function (_super) {
  __extends(MigrationAlreadyExistsError, _super);
  function MigrationAlreadyExistsError(migrationName, data) {
    var _this = this;
    var message = migrationName
      ? 'MIGRATION '.concat(migrationName, ' already exists! ').concat(data)
      : ''.concat(DEFAULT_MESSAGE, ' ').concat(data);
    _this = _super.call(this, message) || this;
    _this.name = 'MigrationAlreadyExistsError';
    return _this;
  }
  return MigrationAlreadyExistsError;
})(InputError_1.InputError);
exports.MigrationAlreadyExistsError = MigrationAlreadyExistsError;
