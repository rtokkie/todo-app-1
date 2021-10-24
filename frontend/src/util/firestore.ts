import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  FirestoreDataConverter,
  getDoc,
  getDocs,
  Query,
  SnapshotOptions,
} from 'firebase/firestore'

import { WithIdAndRef } from '../types'

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
    ...(docSnap.data(snapshotOptions) as Data),
  } as WithIdAndRef<Data>
}

export const fetchDocs = async <Data>(query: Query<Data>) => {
  const queryRef = await getDocs(query)

  if (queryRef.empty) {
    return undefined
  }

  return queryRef.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ref: doc.ref,
        ...(doc.data(snapshotOptions) as Data),
      } as WithIdAndRef<Data>)
  )
}

/**
 * Create Firestore Reference
 * args for Converter =>
 * args for Reference =>
 * Reference With Converter
 */
export const createTypedRef =
  <Data>() =>
  <CollectionParams>(
    db: Firestore,
    collectionPath: (collectionParams: CollectionParams) => string
  ) => {
    const converter: FirestoreDataConverter<Data> = {
      toFirestore: (data) => {
        return data as DocumentData
      },
      fromFirestore: (snap, options) => {
        return snap.data(options) as Data
      },
    }

    const collectionRef = (collectionParams: CollectionParams) => {
      return collection(db, collectionPath(collectionParams)).withConverter(converter)
    }

    const docRef = (
      docParams: CollectionParams extends void ? { id: string } : { id: string } & CollectionParams
    ) => {
      const { id, ..._collectionParams } = docParams
      const collectionParams =
        Object.keys(_collectionParams).length > 0 ? _collectionParams : undefined

      return doc(
        db,
        collectionPath(collectionParams as unknown as CollectionParams),
        docParams.id
      ).withConverter(converter)
    }

    return { converter, collectionRef, docRef }
  }
