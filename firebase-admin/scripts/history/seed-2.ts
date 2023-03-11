import {
  seedJonesVsGane,
  seedKrylovVsSpannResults,
  seedYanVsDvalishvili,
} from '../../seed';
import { AdminFirestoreModule } from '../../types';

export const seed2 = async (adminFirestore: AdminFirestoreModule) => {
  await seedJonesVsGane(adminFirestore);
  await seedYanVsDvalishvili(adminFirestore);
};
