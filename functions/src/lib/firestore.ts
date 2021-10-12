import { firestore } from 'firebase-admin'

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
export const createTypedRef = <Data, CollectionPathOptions extends Record<string, unknown> | void>(
  db: FirebaseFirestore.Firestore,
  collectionPath: (params: CollectionPathOptions) => string
) => {
  const converter: firestore.FirestoreDataConverter<Data> = {
    toFirestore: (data: Data | Partial<Data>) => {
      return data as firestore.DocumentData
    },
    fromFirestore: (snap: firestore.DocumentSnapshot) => {
      return snap.data() as Data
    },
  }

  const collectionRef = (params: CollectionPathOptions) => {
    return db.collection(collectionPath(params)).withConverter(converter)
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
    converter,
    collectionRef,
    docRef,
  }
}
