import {
  seedAndradeVsBlanchfield,
  seedKrylovVsSpann,
  seedLewisVsSpivak,
  seedMakhachevVsVolkanovski,
  seedTeixeiraVsHill,
} from '../../seed';
import { AdminFirestoreModule } from '../../types';

export const seed0 = async (adminFirestore: AdminFirestoreModule) => {
  await seedTeixeiraVsHill(adminFirestore);
  await seedLewisVsSpivak(adminFirestore);
  await seedMakhachevVsVolkanovski(adminFirestore);
  await seedAndradeVsBlanchfield(adminFirestore);
  await seedKrylovVsSpann(adminFirestore);
};
