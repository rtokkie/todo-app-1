import {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  getDoc,
  getDocs,
  Query,
  SnapshotOptions,
} from 'firebase/firestore'

import { WithIdAndRef } from '../types'

const snapshotOptions: SnapshotOptions = { serverTimestamps: 'estimate' }

export const createConvertor = <Data>(): FirestoreDataConverter<Data> => ({
  toFirestore: (data) => data as DocumentData,
  fromFirestore: (snap, options) => snap.data(options) as Data,
})

export const fetchDoc = async <Data>(docRef: DocumentReference) => {
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists) {
    return undefined
  }

  return {
    id: docSnap.id,
    ref: docSnap.ref,
    ...docSnap.data(snapshotOptions),
  } as WithIdAndRef<Data>
}

export const fetchDocs = async <Data>(query: Query) => {
  const queryRef = await getDocs(query)

  if (queryRef.empty) {
    return undefined
  }

  return queryRef.docs.map(
    (doc) => ({ id: doc.id, ref: doc.ref, ...doc.data(snapshotOptions) } as WithIdAndRef<Data>)
  )
}
