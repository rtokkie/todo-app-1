import { _User } from 'shared'

import { db } from '../firebaseApp'
import { createTypedRef } from '../lib/firestore'
import { Timestamp, WithIdAndRef } from '../types'

export type Data = _User.Data<Timestamp>
export type Model = WithIdAndRef<Data>
export const { converter, collectionRef, docRef } = createTypedRef<
  Data,
  _User.CollectionPathOptions
>(db, _User.collectionPath)
