import { _User } from 'shared'

import { createTypedRef, FirstParams } from '../lib/firestore'
import { Timestamp, WithIdAndRef } from '../types'

export type Data = _User.Data<Timestamp>
export type Model = WithIdAndRef<Data>
export const { collectionRef, docRef } = createTypedRef<
  Data,
  FirstParams<typeof _User.collectionPath>
>(_User.collectionPath)
