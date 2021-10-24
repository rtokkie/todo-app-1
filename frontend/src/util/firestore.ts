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
 * args for Converter =>
 * args for Reference =>
 * Reference With Converter
 */
export const createTypedRef =
  <Data>() =>
  <Params extends Record<string, unknown> | void>(
    db: Firestore,
    collectionPath: (params: Params) => string
  ) => {
    const converter: FirestoreDataConverter<Data> = {
      toFirestore: (data) => {
        return data as DocumentData
      },
      fromFirestore: (snap, options) => {
        return snap.data(options) as Data
      },
    }

    const collectionRef = (params: Params) => {
      return collection(db, collectionPath(params)).withConverter(converter)
    }

    const docRef = (params: Params extends void ? { id: string } : { id: string } & Params) => {
      const { id, ..._params } = params
      return doc(db, collectionPath(_params as unknown as Params), id).withConverter(converter)
    }

    return { converter, collectionRef, docRef }
  }
