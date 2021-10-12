import { _Todo } from 'shared'

import { db } from '../firebaseApp'
import { createTypedRef } from '../lib/firestore'
import { DocumentReference, Timestamp, WithIdAndRef } from '../types'

export type Data = _Todo.Data<DocumentReference, Timestamp>
export type Model = WithIdAndRef<Data>
export const { converter, collectionRef, docRef } = createTypedRef<
  Data,
  _Todo.CollectionPathOptions
>(db, _Todo.collectionPath)
