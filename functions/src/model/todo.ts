import { Schema } from 'shared'

import { db } from '../firebaseApp'
import { DocumentReference, Timestamp, WithIdAndRef } from '../types'
import { createTypedRef } from '../util/firestore'

export type Data = Schema.Todo.Data<DocumentReference, Timestamp>
export type Doc = WithIdAndRef<Data>
export const typedRef = createTypedRef<Data>()(db, Schema.Todo.collectionPath)
