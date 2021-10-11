import { firestore } from 'firebase-admin'

import { db } from '../firebaseApp'

/**
 * Fetch Firestore Data
 */

export const fetchDoc = async <Data>(docRef: firestore.DocumentReference<Data>) => {
  const docSnap = await docRef.get()

  if (!docSnap.exists) {
    return undefined
  }

  return {
    id: docSnap.id,
    ref: docSnap.ref,
    ...docSnap.data(),
  }
}

export const fetchDocs = async <Data>(query: firestore.Query<Data>) => {
  const queryRef = await query.get()

  if (queryRef.empty) {
    return undefined
  }

  return queryRef.docs.map((doc) => ({ id: doc.id, ref: doc.ref, ...doc.data() }))
}

/**
 * Create Firestore Reference
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FirstParams<Fn extends (...args: any) => any> = Parameters<Fn>['length'] extends 0
  ? void
  : Parameters<Fn>[0]

export const createTypedRef = <Data, CollectionPathOptions extends Record<string, unknown> | void>(
  collectionPath: (params: CollectionPathOptions) => string
) => {
  const convertor: firestore.FirestoreDataConverter<Data> = {
    toFirestore: (data: Data | Partial<Data>) => {
      return data as firestore.DocumentData
    },
    fromFirestore: (snap: firestore.DocumentSnapshot) => {
      return snap.data() as Data
    },
  }

  const collectionRef = (params: CollectionPathOptions) => {
    return db.collection(collectionPath(params)).withConverter(convertor)
  }

  const docRef = (
    params: CollectionPathOptions extends void
      ? { id: string }
      : { id: string } & CollectionPathOptions
  ) => {
    const { id, ...collectionPathOptions } = params
    return collectionRef(collectionPathOptions as unknown as CollectionPathOptions).doc(id)
  }

  return {
    collectionRef,
    docRef,
  }
}
