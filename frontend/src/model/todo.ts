import { DocumentReference, Timestamp } from 'firebase/firestore'
import { Schema } from 'shared'

import { db } from '../firebaseApp'
import { WithIdAndRef } from '../types'
import { createTypedRef } from '../util/firestore'

export type Data = Schema.Todo.Data<DocumentReference, Timestamp>
export type Model = WithIdAndRef<Data>
export const typedRef = createTypedRef<Data>()(db, Schema.Todo.collectionPath)
