// import { initializeApp } from 'firebase-admin/app';
// import { getAuth } from 'firebase-admin/auth';
// import { FieldValue, getFirestore } from 'firebase-admin/firestore';
// import * as functions from 'firebase-functions';

// initializeApp();

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// export const makeAdmin = functions.https.onCall(async data => {
//   if (data.uid) {
//     const customClaims = {
//       admin: true,
//     };

//     try {
//       // Set custom user claims on this user.
//       await getAuth().setCustomUserClaims(data.uid, customClaims);

//       // Update firestore roles
//       const userRef = getFirestore().doc('users/' + data.uid);
//       return userRef.update({
//         roles: FieldValue.arrayUnion('admin'),
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   return;
// });

// export const removeAdmin = functions.https.onCall(async data => {
//   if (data.uid) {
//     const customClaims = {
//       admin: false,
//     };

//     try {
//       // Set custom user claims on this user.
//       await getAuth().setCustomUserClaims(data.uid, customClaims);

//       // Update firestore roles
//       const userRef = getFirestore().doc('users/' + data.uid);
//       return userRef.update({
//         roles: FieldValue.arrayRemove('admin'),
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   return;
// });
