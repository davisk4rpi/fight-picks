'use strict';
exports.__esModule = true;
exports.isNotNullOrUndefined =
  exports.isNotNull =
  exports.isNotUndefined =
  exports.isStringOrUndefined =
    void 0;
var isStringOrUndefined = function (val) {
  if (['string', 'undefined'].includes(typeof val)) return true;
  return false;
};
exports.isStringOrUndefined = isStringOrUndefined;
var isNotUndefined = function (thing) {
  return thing !== undefined;
};
exports.isNotUndefined = isNotUndefined;
var isNotNull = function (thing) {
  return thing !== null;
};
exports.isNotNull = isNotNull;
var isNotNullOrUndefined = function (thing) {
  return (0, exports.isNotUndefined)(thing) && (0, exports.isNotNull)(thing);
};
exports.isNotNullOrUndefined = isNotNullOrUndefined;
