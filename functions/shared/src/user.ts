export const collectionPath = () => {
  return 'users'
}

export type Data<Time> = {
  email: string
  name: string
  createdAt: Time
  updatedAt: Time
}

export const getDefaultData = <Time>({ now }: { now: Time }) => {
  return {
    email: '',
    name: '',
    createdAt: now,
    updatedAt: now,
  }
}
