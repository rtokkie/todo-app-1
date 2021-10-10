export type WithIdAndRef<Data, DocumentReference> = Data & {
  id: string
  ref: DocumentReference
}
