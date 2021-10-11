export const collectionPath = () => {
  return 'users'
}

export type DocRefOptions = {
  userId: string
}

export type Data<Timestamp> = {
  email: string
  name: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export const defaultData = <TimestampOrFieldValue>({ now }: { now: TimestampOrFieldValue }) => {
  return {
    email: '',
    name: '',
    createdAt: now,
    updatedAt: now,
  }
}
