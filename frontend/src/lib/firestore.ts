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

export const createTypedRef = <Data, CollectionPathOptions extends Record<string, unknown> | void>(
  db: Firestore,
  collectionPath: (params: CollectionPathOptions) => string
) => {
  const converter: FirestoreDataConverter<Data> = {
    toFirestore: (data) => {
      return data as DocumentData
    },
    fromFirestore: (snap, options) => {
      return snap.data(options) as Data
    },
  }

  const collectionRef = (params: CollectionPathOptions) => {
    return collection(db, collectionPath(params)).withConverter(converter)
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
    ).withConverter(converter)
  }

  return { converter, collectionRef, docRef }
}
