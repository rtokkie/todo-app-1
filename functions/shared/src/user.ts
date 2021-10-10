export const collectionPath = () => {
  return 'users'
}

export type DocRefOptions = {
  userId: string
}

export type Data<Time> = {
  email: string
  name: string
  createdAt: Time
  updatedAt: Time
}

export const defaultData = <Time>({ now }: { now: Time }) => {
  return {
    email: '',
    name: '',
    createdAt: now,
    updatedAt: now,
  }
}
