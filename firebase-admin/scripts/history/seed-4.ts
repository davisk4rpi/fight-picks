import { seedVeraVsSandhagen } from '../../seed';
import { AdminFirestoreModule } from '../../types';

export const seed4 = async (adminFirestore: AdminFirestoreModule) => {
  await seedVeraVsSandhagen(adminFirestore);
};
