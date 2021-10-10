import { _User } from 'shared'

import { db } from '../firebaseApp'
import { createConvertor } from '../lib/firestore'
import { Timestamp, WithIdAndRef } from '../types'

export type Data = _User.Data<Timestamp>

export type Model = WithIdAndRef<Data>

export const convertor = createConvertor<Data>()

export const collectionRef = () => {
  return db.collection(_User.collectionPath()).withConverter(convertor)
}

export const docRef = ({ userId }: _User.DocRefOptions) => {
  return collectionRef().doc(userId)
}
