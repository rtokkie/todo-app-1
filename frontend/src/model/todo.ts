import { DocumentReference, Timestamp } from 'firebase/firestore'
import { _Todo } from 'shared'

import { db } from '../firebaseApp'
import { createTypedRef } from '../lib/firestore'
import { WithIdAndRef } from '../types'

export type Data = _Todo.Data<DocumentReference, Timestamp>
export type Model = WithIdAndRef<Data>
export const { converter, collectionRef, docRef } = createTypedRef<
  Data,
  _Todo.CollectionPathOptions
>(db, _Todo.collectionPath)
