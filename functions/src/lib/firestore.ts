import { firestore } from 'firebase-admin'

import { WithIdAndRef } from '../types'

export const createConvertor = <Data>(): firestore.FirestoreDataConverter<Data> => {
  return {
    toFirestore: (data: Data | Partial<Data>) => data,
    fromFirestore: (snap) => snap.data() as Data,
  }
}

export const fetchDoc = async <Data>(docRef: firestore.DocumentReference) => {
  const docSnap = await docRef.get()

  if (!docSnap.exists) {
    return undefined
  }

  return {
    id: docSnap.id,
    ref: docSnap.ref,
    ...docSnap.data(),
  } as WithIdAndRef<Data>
}

export const fetchDocs = async <Data>(query: firestore.Query) => {
  const queryRef = await query.get()

  if (queryRef.empty) {
    return undefined
  }

  return queryRef.docs.map(
    (doc) => ({ id: doc.id, ref: doc.ref, ...doc.data() } as WithIdAndRef<Data>)
  )
}
