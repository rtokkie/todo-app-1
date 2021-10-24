import { Timestamp } from 'firebase/firestore'
import { Schema } from 'shared'

import { db } from '../firebaseApp'
import { WithIdAndRef } from '../types'
import { createTypedRef } from '../util/firestore'

export type Data = Schema.User.Data<Timestamp>
export type Model = WithIdAndRef<Data>
export const typedRef = createTypedRef<Data, Schema.User.CollectionPathOptions>(
  db,
  Schema.User.collectionPath
)
