export const collectionPath = () => {
  return 'todos'
}

export type DocRefOptions = {
  todoId: string
}

export type Data<DocumentReference, Timestamp> = {
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

export const defaultData = <DocumentReference, TimestampOrFieldValue>({
  now,
  creator,
}: {
  now: TimestampOrFieldValue
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
