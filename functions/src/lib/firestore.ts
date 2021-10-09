import { firestore } from "firebase-admin";
import { WithIdAndRef } from "../types";

export const createConvertor = <T>(): firestore.FirestoreDataConverter<T> => {
  return {
    toFirestore: (data: T | Partial<T>) => data,
    fromFirestore: (snap) => snap.data() as T,
  };
};

export const fetchDoc = async <T>(docRef: firestore.DocumentReference) => {
  const docSnap = await docRef.get();

  if (!docSnap.exists) {
    return undefined;
  }

  return {
    id: docSnap.id,
    ref: docSnap.ref,
    ...docSnap.data(),
  } as WithIdAndRef<T>;
};

export const fetchDocs = async <T>(query: firestore.Query) => {
  const queryRef = await query.get();

  if (queryRef.empty) {
    return undefined;
  }

  return queryRef.docs.map(
    (doc) => ({ id: doc.id, ref: doc.ref, ...doc.data() } as WithIdAndRef<T>)
  );
};
