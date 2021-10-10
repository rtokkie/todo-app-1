export const collectionPath = () => {
  return 'todos'
}

export type Data<DocRef, Time> = {
  content: string
  completed: boolean
  createdAt: Time
  updatedAt: Time
  deletedAt: Time | null
  creator: {
    id: string
    ref: DocRef
  }
}

export const getDefaultData = <DocRef, Time>({
  now,
  creator,
}: {
  now: Time
  creator: { id: string; ref: DocRef }
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
