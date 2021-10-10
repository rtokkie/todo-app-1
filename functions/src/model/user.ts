import { _User } from 'shared/src'
import { db } from 'src/firebaseApp'
import { createConvertor } from 'src/lib/firestore'
import { Timestamp, WithIdAndRef } from 'src/types'

export type Data = _User.Data<Timestamp>

export type Model = WithIdAndRef<Data>

export const convertor = createConvertor<Data>()

export const collectionRef = () => {
  return db.collection(_User.collectionPath()).withConverter(convertor)
}

export const docRef = ({ todoId }: { todoId: string }) => {
  return collectionRef().doc(todoId)
}
