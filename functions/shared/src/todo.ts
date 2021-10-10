import { _DocumentReference, _FieldValue, _Timestamp } from './lib/firestore'

export const collectionPath = () => {
  return 'todos'
}

export type DocRefOptions = {
  todoId: string
}

export type Data<DocumentReference extends _DocumentReference, Timestamp extends _Timestamp> = {
  content: string
  completed: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
  deletedAt: Timestamp | null
  creator: {
    id: string
    ref: DocumentReference
  }
}

export const defaultData = <
  Now extends _Timestamp | _FieldValue,
  DocumentReference extends _DocumentReference
>({
  now,
  creator,
}: {
  now: Now
  creator: {
    id: string
    ref: DocumentReference
  }
}) => {
  return {
    content: '',
    completed: false,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
    creator,
  }
}
