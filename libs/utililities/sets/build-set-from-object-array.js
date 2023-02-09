'use strict';
exports.__esModule = true;
exports.buildSetFromObjectArray = void 0;
function buildSetFromObjectArray(objects, objectTransformFunc) {
  var set = new Set();
  objects.forEach(function (obj) {
    return set.add(objectTransformFunc(obj));
  });
  return set;
}
exports.buildSetFromObjectArray = buildSetFromObjectArray;
