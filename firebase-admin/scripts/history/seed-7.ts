import { seedPavlovichVsBlaydes } from '../../seed';
import { AdminFirestoreModule } from '../../types';

export const seed7 = async (adminFirestore: AdminFirestoreModule) => {
  await seedPavlovichVsBlaydes(adminFirestore);
};
