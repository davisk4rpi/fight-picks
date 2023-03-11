import { MethodMap } from '@fight-picks/models';

import { AdminFirestoreModule, FirestoreFightRef } from '../../types';
import { generateFightCardId } from '../../utilities/fight-card-id';
import { FightCardInitialData, FirestoreFightCardSeedHelper } from '../helpers';

const FIGHT_CARD_STATIC_DATA: FightCardInitialData = {
  mainCardDate: new Date('2023-02-26T00:00:00.000Z'),
  name: 'Krylov vs Spann',
  org: 'ufc',
};

export const seedKrylovVsSpann = async (
  adminFirestore: AdminFirestoreModule,
) => {
  const seedHelper = new FirestoreFightCardSeedHelper(
    adminFirestore,
    FIGHT_CARD_STATIC_DATA,
  );
  await seedHelper.initializeFightCardSeed();

  seedHelper.createFight({
    rounds: 5,
    weight: 205,
    sex: 'male',
    fighter1Name: 'Nikita Krylov',
    fighter2Name: 'Ryan Spann',
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 185,
    sex: 'male',
    fighter1Name: 'Andre Muniz',
    fighter2Name: 'Brendan Allen',
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 265,
    sex: 'male',
    fighter1Name: 'Augusto Sakai',
    fighter2Name: "Don'Tale Mayes",
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 125,
    sex: 'female',
    fighter1Name: 'Tatiana Suarez',
    fighter2Name: 'Montana De La Rosa',
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 170,
    sex: 'male',
    fighter1Name: 'Mike Malott',
    fighter2Name: 'Yohan Lainesse',
  });

  await seedHelper.setFightCard();
  return;
};

export const seedKrylovVsSpannResults = async (
  adminFirestore: AdminFirestoreModule,
) => {
  const fightCardId = generateFightCardId(
    FIGHT_CARD_STATIC_DATA.org,
    FIGHT_CARD_STATIC_DATA.mainCardDate,
  );
  const fightCardRef = adminFirestore.fightCardsCollection.doc(fightCardId);
  const fightCardDoc = await fightCardRef.get();
  const fightCard = fightCardDoc.data();
  if (fightCard === undefined) {
    throw new Error(`Could not find fight card ${fightCardId}`);
  }
  const { fightRefs } = fightCard;
  if (fightRefs.length < 5) {
    throw new Error(`Were missing fightRefs for some reason`);
  }
  const [fight1Ref, fight2Ref, fight3Ref, fight4Ref, fight5Ref] = fightRefs;

  await getFightData(fight1Ref);
  const fight2 = await getFightData(fight2Ref);
  const fight3 = await getFightData(fight3Ref);
  const fight4 = await getFightData(fight4Ref);
  const fight5 = await getFightData(fight5Ref);

  fight1Ref.update({
    isCanceled: true,
  });

  fight2Ref.update({
    result: {
      winningFighterRef: fight2.fighter2Ref,
      method: MethodMap.submission,
      round: 3,
    },
  });
  fight3Ref.update({
    result: {
      winningFighterRef: fight3.fighter1Ref,
      method: MethodMap.decision,
      round: null,
    },
  });
  fight4Ref.update({
    result: {
      winningFighterRef: fight4.fighter1Ref,
      method: MethodMap.submission,
      round: 2,
    },
  });
  fight5Ref.update({
    result: {
      winningFighterRef: fight5.fighter1Ref,
      method: MethodMap.submission,
      round: 1,
    },
  });
};

const getFightData = async (fightRef: FirestoreFightRef) => {
  const fightDoc = await fightRef.get();
  const fight = fightDoc.data();
  if (fight === undefined) {
    throw new Error(`fightRef ${fightRef.id} has no data!`);
  }
  return fight;
};
