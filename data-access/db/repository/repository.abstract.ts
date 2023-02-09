import { firebase } from '@react-native-firebase/auth';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export abstract class Repository<
  FirebaseType extends FirebaseFirestoreTypes.DocumentData,
> {
  constructor(
    private collection: FirebaseFirestoreTypes.CollectionReference<FirebaseType>,
  ) {}
  getDocRef = (id: string) => {
    return this.collection.doc(id);
  };

  getDocRefs = (ids: string[]) => {
    return ids.map(uid => this.getDocRef(uid));
  };
  currentAuthUser = () => firebase.auth().currentUser;

  getById = async (id: string): Promise<FirebaseType | undefined> => {
    const firebaseDoc = await this.getDocRef(id).get();
    return firebaseDoc.data();
  };
  getByRef = async (
    ref: FirebaseFirestoreTypes.DocumentReference<FirebaseType>,
  ): Promise<FirebaseType | undefined> => {
    const firebaseDoc = await ref.get();
    return firebaseDoc.data();
  };
}
