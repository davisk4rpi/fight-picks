import { seedKrylovVsSpannResults } from '../../seed';
import { AdminFirestoreModule } from '../../types';

export const seed1 = async (adminFirestore: AdminFirestoreModule) => {
  await seedKrylovVsSpannResults(adminFirestore);
};
