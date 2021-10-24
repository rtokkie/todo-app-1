import { Schema } from 'shared'

import { db } from '../firebaseApp'
import { Timestamp, WithIdAndRef } from '../types'
import { createTypedRef } from '../util/firestore'

export type Data = Schema.User.Data<Timestamp>
export type Doc = WithIdAndRef<Data>
export const typedRef = createTypedRef<Data>()(db, Schema.User.collectionPath)
