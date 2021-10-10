import { DocumentReference } from 'firebase/firestore'

export type WithIdAndRef<Data> = Data & {
  id: string
  ref: DocumentReference
}
