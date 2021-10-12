export type CollectionPathOptions = void

export const collectionPath = () => {
  return 'users'
}

export type Data<Timestamp> = {
  email: string
  name: string
  createdAt: Timestamp
  updatedAt: Timestamp
}
