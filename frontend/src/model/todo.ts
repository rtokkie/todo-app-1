import { DocumentReference, Timestamp } from 'firebase/firestore'
import { _Todo } from 'shared'

import { createTypedRef, FirstParams } from '../lib/firestore'
import { WithIdAndRef } from '../types'

export type Data = _Todo.Data<DocumentReference, Timestamp>
export type Model = WithIdAndRef<Data>
export const { collectionRef, docRef } = createTypedRef<
  Data,
  FirstParams<typeof _Todo.collectionPath>
>(_Todo.collectionPath)
