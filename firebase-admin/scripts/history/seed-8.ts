import { seedSongVsSimon } from '../../seed';
import { AdminFirestoreModule } from '../../types';

export const seed8 = async (adminFirestore: AdminFirestoreModule) => {
  await seedSongVsSimon(adminFirestore);
};
