import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import {
  FirebaseFight,
  FirebaseFightCard,
  FirebaseFighter,
} from './firebaseTypes';

type Db = {
  fightCards: FirebaseFirestoreTypes.CollectionReference<FirebaseFightCard>;
  fights: FirebaseFirestoreTypes.CollectionReference<FirebaseFight>;
  fighters: FirebaseFirestoreTypes.CollectionReference<FirebaseFighter>;
};

export function seed(db: Db) {
  seedLewisVsSpivak(db);
  seedTeixeiraVsHill(db);
}

const createFighter = (
  fightersCollection: FirebaseFirestoreTypes.CollectionReference<FirebaseFighter>,
  fighter: Omit<FirebaseFighter, 'createdAt'>,
) => {
  return fightersCollection.doc(fighter.id).set({
    ...fighter,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
};

const createFight = (
  fightsCollection: FirebaseFirestoreTypes.CollectionReference<FirebaseFight>,
  fight: Omit<FirebaseFight, 'createdAt'>,
) => {
  return fightsCollection.doc(fight.id).set({
    ...fight,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
};

const seedLewisVsSpivak = (db: Db) => {
  createFighter(db.fighters, {
    id: '1',
    name: 'Derrick Lewis',
  });
  createFighter(db.fighters, {
    id: '2',
    name: 'Serghei Spivac',
  });
  createFighter(db.fighters, {
    id: '3',
    name: 'Jung Da-un',
  });
  createFighter(db.fighters, {
    id: '4',
    name: 'Devin Clark',
  });
  createFighter(db.fighters, {
    id: '5',
    name: 'Marcin Tybura',
  });
  createFighter(db.fighters, {
    id: '6',
    name: 'Blagoy Ivanov',
  });
  createFighter(db.fighters, {
    id: '7',
    name: 'Choi Doo-ho',
  });
  createFighter(db.fighters, {
    id: '8',
    name: 'Kyle Nelson',
  });
  createFighter(db.fighters, {
    id: '9',
    name: 'Yusaku Kinoshita',
  });
  createFighter(db.fighters, {
    id: '10',
    name: 'Adam Fugitt',
  });

  const fightCardRef = db.fightCards.doc('1');
  fightCardRef.set({
    mainCardDate: new Date('2023-02-05T06:00:00.000Z'),
    name: 'Lewis vs Spivak',
    id: '1',
    createdAt: firestore.FieldValue.serverTimestamp(),
  });

  createFight(db.fights, {
    id: '1',
    fightCardId: fightCardRef.id,
    rounds: 5,
    weight: 265,
    sex: 'male',
    fighter1Id: '1',
    fighter2Id: '2',
  });

  createFight(db.fights, {
    id: '2',
    fightCardId: fightCardRef.id,
    rounds: 3,
    weight: 205,
    sex: 'male',
    fighter1Id: '3',
    fighter2Id: '4',
  });

  createFight(db.fights, {
    id: '3',
    fightCardId: fightCardRef.id,
    rounds: 3,
    weight: 265,
    sex: 'male',
    fighter1Id: '5',
    fighter2Id: '6',
  });

  createFight(db.fights, {
    id: '4',
    fightCardId: fightCardRef.id,
    rounds: 3,
    weight: 145,
    sex: 'male',
    fighter1Id: '7',
    fighter2Id: '8',
  });

  createFight(db.fights, {
    id: '5',
    fightCardId: fightCardRef.id,
    rounds: 3,
    weight: 170,
    sex: 'male',
    fighter1Id: '9',
    fighter2Id: '10',
  });
};

const seedTeixeiraVsHill = (db: Db) => {
  createFighter(db.fighters, {
    id: '11',
    name: 'Glover Teixeira',
  });
  createFighter(db.fighters, {
    id: '12',
    name: 'Jamahal Hill',
  });
  createFighter(db.fighters, {
    id: '13',
    name: 'Deiveson Figueiredo',
  });
  createFighter(db.fighters, {
    id: '14',
    name: 'Brandon Moreno',
  });
  createFighter(db.fighters, {
    id: '15',
    name: 'Gilbert Burns',
  });
  createFighter(db.fighters, {
    id: '16',
    name: 'Neil Magny',
  });
  createFighter(db.fighters, {
    id: '17',
    name: 'Lauren Murphy',
  });
  createFighter(db.fighters, {
    id: '18',
    name: 'Jessica Andrade',
  });
  createFighter(db.fighters, {
    id: '19',
    name: 'Paul Craig',
  });
  createFighter(db.fighters, {
    id: '20',
    name: 'Johnny Walker',
  });

  const fightCardRef = db.fightCards.doc('2');
  fightCardRef.set({
    mainCardDate: new Date('2023-01-22T03:00:00.000Z'),
    name: 'Teixeira vs Hill',
    id: '2',
    createdAt: firestore.FieldValue.serverTimestamp(),
  });

  createFight(db.fights, {
    id: '6',
    fightCardId: fightCardRef.id,
    rounds: 5,
    weight: 205,
    sex: 'male',
    fighter1Id: '11',
    fighter2Id: '12',
  });

  createFight(db.fights, {
    id: '7',
    fightCardId: fightCardRef.id,
    rounds: 5,
    weight: 125,
    sex: 'male',
    fighter1Id: '13',
    fighter2Id: '14',
  });

  createFight(db.fights, {
    id: '8',
    fightCardId: fightCardRef.id,
    rounds: 3,
    weight: 170,
    sex: 'male',
    fighter1Id: '15',
    fighter2Id: '16',
  });

  createFight(db.fights, {
    id: '9',
    fightCardId: fightCardRef.id,
    rounds: 3,
    weight: 125,
    sex: 'female',
    fighter1Id: '17',
    fighter2Id: '18',
  });

  createFight(db.fights, {
    id: '10',
    fightCardId: fightCardRef.id,
    rounds: 3,
    weight: 205,
    sex: 'male',
    fighter1Id: '19',
    fighter2Id: '20',
  });
};
