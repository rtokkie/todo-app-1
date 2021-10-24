export type CollectionPathOptions = { userId: string }

export const collectionPath = ({ userId }: CollectionPathOptions) => {
  return `users/${userId}/todos`
}

export type Data<DocumentReference, Timestamp> = {
  content: string
  completed: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
  deletedAt: Timestamp | null

  // NOTE: User
  creator: {
    id: string
    ref: DocumentReference
  }
}
