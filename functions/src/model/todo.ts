import { _Todo } from 'shared'

import { db } from '../firebaseApp'
import { createConvertor } from '../lib/firestore'
import { DocumentReference, Timestamp, WithIdAndRef } from '../types'

export type Data = _Todo.Data<DocumentReference, Timestamp>

export type Model = WithIdAndRef<Data>

export const convertor = createConvertor<Data>()

export const collectionRef = () => {
  return db.collection(_Todo.collectionPath()).withConverter(convertor)
}

export const docRef = ({ todoId }: _Todo.DocRefOptions) => {
  return collectionRef().doc(todoId)
}
