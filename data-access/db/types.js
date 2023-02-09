'use strict';
exports.__esModule = true;
exports.ConfidenceMap =
  exports.isConfidence =
  exports.isRound =
  exports.RoundMap =
  exports.isMethodWithFinish =
  exports.isMethodWithWinner =
  exports.isMethodWithNoWinner =
    void 0;
var isMethodWithNoWinner = function (method) {
  return method === 'no_contest' || method === 'draw';
};
exports.isMethodWithNoWinner = isMethodWithNoWinner;
var isMethodWithWinner = function (method) {
  return method === 'decision' || (0, exports.isMethodWithFinish)(method);
};
exports.isMethodWithWinner = isMethodWithWinner;
var isMethodWithFinish = function (method) {
  return ['knockout', 'submission', 'disqualification'].includes(
    method !== null && method !== void 0 ? method : '',
  );
};
exports.isMethodWithFinish = isMethodWithFinish;
exports.RoundMap = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 };
var isRound = function (round) {
  return [1, 2, 3, 4, 5].includes(
    round !== null && round !== void 0 ? round : 0,
  );
};
exports.isRound = isRound;
var isConfidence = function (confidence) {
  return [1, 2, 3, 4, 5].includes(
    confidence !== null && confidence !== void 0 ? confidence : 0,
  );
};
exports.isConfidence = isConfidence;
exports.ConfidenceMap = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
};
