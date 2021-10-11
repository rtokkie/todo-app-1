import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  getDoc,
  getDocs,
  Query,
  SnapshotOptions,
} from 'firebase/firestore'

import { db } from '../firebaseApp'

/**
 * Fetch Firestore Data
 */
const snapshotOptions: SnapshotOptions = { serverTimestamps: 'estimate' }

export const fetchDoc = async <Data>(docRef: DocumentReference<Data>) => {
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists) {
    return undefined
  }

  return {
    id: docSnap.id,
    ref: docSnap.ref,
    ...docSnap.data(snapshotOptions),
  }
}

export const fetchDocs = async <Data>(query: Query<Data>) => {
  const queryRef = await getDocs(query)

  if (queryRef.empty) {
    return undefined
  }

  return queryRef.docs.map((doc) => ({ id: doc.id, ref: doc.ref, ...doc.data(snapshotOptions) }))
}

/**
 * Create Firestore Reference
 */
export type FirstParams<Fn extends (...args: any) => any> = Parameters<Fn>['length'] extends 0
  ? void
  : Parameters<Fn>[0]

export const createTypedRef = <Data, CollectionPathOptions extends Record<string, unknown> | void>(
  collectionPath: (params: CollectionPathOptions) => string
) => {
  const convertor: FirestoreDataConverter<Data> = {
    toFirestore: (data) => {
      return data as DocumentData
    },
    fromFirestore: (snap, options) => {
      return snap.data(options) as Data
    },
  }

  const collectionRef = (params: CollectionPathOptions) => {
    return collection(db, collectionPath(params)).withConverter(convertor)
  }

  const docRef = (
    params: CollectionPathOptions extends void
      ? { id: string }
      : { id: string } & CollectionPathOptions
  ) => {
    const { id, ...collectionPathOptions } = params
    return doc(
      db,
      collectionPath(collectionPathOptions as unknown as CollectionPathOptions),
      id
    ).withConverter(convertor)
  }

  return { collectionRef, docRef }
}
