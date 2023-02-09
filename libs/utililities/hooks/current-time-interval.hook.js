'use strict';
exports.__esModule = true;
exports.useCurrentTimeInterval = void 0;
var react_1 = require('react');
var native_1 = require('@react-navigation/native');
// TODO since this uses `@react-navigation/native` determine whether this should be in utilities or if it should be refactored
var useCurrentTimeInterval = function (intervalMs) {
  if (intervalMs === void 0) {
    intervalMs = 1000;
  }
  var _a = (0, react_1.useState)(new Date()),
    currentTime = _a[0],
    setCurrentTime = _a[1];
  (0, native_1.useFocusEffect)(
    (0, react_1.useCallback)(
      function () {
        var updateCurrentTime = function () {
          setCurrentTime(new Date());
        };
        updateCurrentTime();
        var interval = setInterval(updateCurrentTime, intervalMs);
        return function () {
          return clearInterval(interval);
        };
      },
      [intervalMs],
    ),
  );
  return currentTime;
};
exports.useCurrentTimeInterval = useCurrentTimeInterval;
