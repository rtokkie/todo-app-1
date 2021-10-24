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
    ...(docSnap.data() as Data),
  }
}

export const fetchDocs = async <Data>(query: firestore.Query<Data>) => {
  const queryRef = await query.get()

  if (queryRef.empty) {
    return undefined
  }

  return queryRef.docs.map((doc) => ({ id: doc.id, ref: doc.ref, ...(doc.data() as Data) }))
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
    db: FirebaseFirestore.Firestore,
    collectionPath: (collectionParams: CollectionParams) => string
  ) => {
    const converter: firestore.FirestoreDataConverter<Data> = {
      toFirestore: (data: Data | Partial<Data>) => {
        return data as firestore.DocumentData
      },
      fromFirestore: (snap: firestore.DocumentSnapshot) => {
        return snap.data() as Data
      },
    }

    const collectionRef = (collectionParams: CollectionParams) => {
      return db.collection(collectionPath(collectionParams)).withConverter(converter)
    }

    const docRef = (
      docParams: CollectionParams extends void ? { id: string } : { id: string } & CollectionParams
    ) => {
      const { id, ..._collectionParams } = docParams
      const collectionParams =
        Object.keys(_collectionParams).length > 0 ? _collectionParams : undefined

      return collectionRef(collectionParams as unknown as CollectionParams).doc(id)
    }

    return {
      converter,
      collectionRef,
      docRef,
    }
  }
