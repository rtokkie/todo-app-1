import { collection, doc, DocumentReference, Timestamp } from 'firebase/firestore'
import { _Todo } from 'shared'

import { db } from '../firebaseApp'
import { createConvertor } from '../lib/firestore'
import { WithIdAndRef } from '../types'

export type Data = _Todo.Data<DocumentReference, Timestamp>

export type Model = WithIdAndRef<Data>

export const convertor = createConvertor<Data>()

export const collectionRef = () => {
  return collection(db, _Todo.collectionPath()).withConverter(convertor)
}

export const docRef = ({ todoId }: _Todo.DocRefOptions) => {
  return doc(db, _Todo.collectionPath(), todoId).withConverter(convertor)
}
