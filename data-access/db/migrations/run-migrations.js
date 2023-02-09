'use strict';
exports.__esModule = true;
exports.runMigrations = void 0;
var firebase_admin_1 = require('firebase-admin');
var firestore_1 = require('firebase-admin/firestore');
// runMigrations();
// import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
var init_migration_firestore_1 = require('./init-migration-firestore');
var initial_1 = require('./initial');
(0, firebase_admin_1.initializeApp)();
var firestoreInstance = (0, firestore_1.getFirestore)();
var runMigrations = function () {
  var appFirestore = (0, init_migration_firestore_1.initMigrationFirestore)(
    firestoreInstance,
  );
  (0, initial_1.initialMigration)(appFirestore);
};
exports.runMigrations = runMigrations;
