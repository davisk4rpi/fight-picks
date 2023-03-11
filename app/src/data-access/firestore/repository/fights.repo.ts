import { FightResult } from '@fight-picks/models';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import { FirebaseFight, FirebaseFighter, FirebaseFightResult } from '../types';
import { Repository } from './repository.abstract';

export class FightsRepository extends Repository<FirebaseFight> {
  constructor(
    collection: FirebaseFirestoreTypes.CollectionReference<FirebaseFight>,
    protected fightersCollection: FirebaseFirestoreTypes.CollectionReference<FirebaseFighter>,
  ) {
    super(collection);
  }

  setResult = async (fightId: string, result: FightResult | null) => {
    const fightDoc = this.getDocRef(fightId);
    if (result === null) {
      return fightDoc.update({ result });
    }
    const { method, round, winningFighterId } = result;

    const firebaseResult: FirebaseFightResult = {
      method: method,
      round: round,
      winningFighterRef:
        winningFighterId === null
          ? null
          : this.fightersCollection.doc(winningFighterId),
    };
    return fightDoc.update({ result: firebaseResult });
  };
}
