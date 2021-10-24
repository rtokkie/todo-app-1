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
export const createTypedRef =
  <Data>() =>
  <Params extends Record<string, unknown> | void>(
    db: FirebaseFirestore.Firestore,
    collectionPath: (params: Params) => string
  ) => {
    const converter: firestore.FirestoreDataConverter<Data> = {
      toFirestore: (data: Data | Partial<Data>) => {
        return data as firestore.DocumentData
      },
      fromFirestore: (snap: firestore.DocumentSnapshot) => {
        return snap.data() as Data
      },
    }

    const collectionRef = (params: Params) => {
      return db.collection(collectionPath(params)).withConverter(converter)
    }

    const docRef = (params: Params extends void ? { id: string } : { id: string } & Params) => {
      const { id, ..._params } = params
      return collectionRef(_params as unknown as Params).doc(id)
    }

    return {
      converter,
      collectionRef,
      docRef,
    }
  }
