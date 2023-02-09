'use strict';
exports.__esModule = true;
exports.initMigrationFirestore = void 0;
var initMigrationFirestore = function (firestoreInstance) {
  var usersCollection = firestoreInstance.collection('users');
  var fightCardsCollection = firestoreInstance.collection('fightCards');
  var fightersCollection = firestoreInstance.collection('fighters');
  var fightsCollection = firestoreInstance.collection('fights');
  var migrationsCollection = firestoreInstance.collection('migrations');
  var fightPicksQuery = firestoreInstance.collectionGroup('fightPicks');
  return {
    usersCollection: usersCollection,
    fightCardsCollection: fightCardsCollection,
    fightersCollection: fightersCollection,
    fightsCollection: fightsCollection,
    fightPicksQuery: fightPicksQuery,
    migrationsCollection: migrationsCollection,
  };
};
exports.initMigrationFirestore = initMigrationFirestore;
