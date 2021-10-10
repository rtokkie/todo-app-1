import { collection, doc, Timestamp } from 'firebase/firestore'
import { _User } from 'shared'

import { db } from '../firebaseApp'
import { createConvertor } from '../lib/firestore'
import { WithIdAndRef } from '../types'

export type Data = _User.Data<Timestamp>

export type Model = WithIdAndRef<Data>

export const convertor = createConvertor<Data>()

export const collectionRef = () => {
  return collection(db, _User.collectionPath()).withConverter(convertor)
}

export const docRef = ({ userId }: _User.DocRefOptions) => {
  return doc(db, _User.collectionPath(), userId).withConverter(convertor)
}
