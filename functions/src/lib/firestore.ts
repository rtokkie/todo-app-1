import { firestore } from 'firebase-admin'

import { WithIdAndRef } from '../types'

type Primitive = string | number | boolean | undefined | null

export type WithFieldValue<T> = T extends Primitive
  ? T
  : T extends Record<string, unknown>
  ? {
      [K in keyof T]: WithFieldValue<T[K]> | firestore.FieldValue
    }
  : T

// NOTE: 改造前
// export type WithFieldValue<T> = T extends Primitive
//   ? T
//   : T extends {}
//   ? {
//       [K in keyof T]: WithFieldValue<T[K]> | firestore.FieldValue
//     }
//   : Partial<T>

export const createConvertor = <Data>() => {
  return {
    toFirestore: (data: WithFieldValue<Data> | Partial<WithFieldValue<Data>>) => {
      return data as firestore.DocumentData
    },
    fromFirestore: (snap: firestore.DocumentSnapshot) => {
      return snap.data() as Data
    },
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
