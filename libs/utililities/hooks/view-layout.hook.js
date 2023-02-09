'use strict';
exports.__esModule = true;
exports.useViewLayout = void 0;
var react_1 = require('react');
function useViewLayout() {
  var _a = (0, react_1.useState)(undefined),
    layout = _a[0],
    setLayout = _a[1];
  var onLayout = (0, react_1.useCallback)(function (e) {
    setLayout(e.nativeEvent.layout);
  }, []);
  return [layout, onLayout];
}
exports.useViewLayout = useViewLayout;
