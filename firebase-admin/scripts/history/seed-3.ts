import { seedEdwardsVsUsman3 } from '../../seed';
import { AdminFirestoreModule } from '../../types';

export const seed3 = async (adminFirestore: AdminFirestoreModule) => {
  await seedEdwardsVsUsman3(adminFirestore);
};
