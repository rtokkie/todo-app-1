import { _Todo } from 'shared/src'
import { db } from 'src/firebaseApp'
import { createConvertor } from 'src/lib/firestore'
import { DocumentReference, Timestamp, WithIdAndRef } from 'src/types'

export type Data = _Todo.Data<DocumentReference, Timestamp>

export type Model = WithIdAndRef<Data>

export const convertor = createConvertor<Data>()

export const collectionRef = () => {
  return db.collection(_Todo.collectionPath()).withConverter(convertor)
}

export const docRef = ({ todoId }: { todoId: string }) => {
  return collectionRef().doc(todoId)
}
