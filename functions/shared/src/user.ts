import { _FieldValue, _Timestamp } from './lib/firestore'

export const collectionPath = () => {
  return 'users'
}

export type DocRefOptions = {
  userId: string
}

export type Data<Timestamp extends _Timestamp> = {
  email: string
  name: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export const defaultData = <Now extends _Timestamp | _FieldValue>({ now }: { now: Now }) => {
  return {
    email: '',
    name: '',
    createdAt: now,
    updatedAt: now,
  }
}
