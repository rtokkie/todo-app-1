import { DocumentReference, onSnapshot, Query, SnapshotOptions } from 'firebase/firestore'
import { DependencyList, useEffect, useState } from 'react'

import { WithIdAndRef } from '../types'

/**
 * Subscribe Firestore Data
 */
const snapshotOptions: SnapshotOptions = { serverTimestamps: 'estimate' }

export const useSubscribeDoc = <Data>(
  docRef: DocumentReference<Data> | null,
  deps: DependencyList = []
) => {
  const [initialized, setInitialize] = useState(false)
  const [value, setValue] = useState<WithIdAndRef<Data>>()

  useEffect(() => {
    if (docRef) {
      const unsubscribe = onSnapshot(docRef, (snap) => {
        if (snap.exists()) {
          setValue({ id: snap.id, ref: snap.ref, ...(snap.data(snapshotOptions) as Data) })
        } else {
          setValue(undefined)
        }

        if (!initialized) setInitialize(true)
      })
      return unsubscribe
    } else {
      setValue(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return [value, initialized] as const
}

export const useSubscribeDocs = <Data>(query: Query<Data> | null, deps: DependencyList = []) => {
  const [initialized, setInitialize] = useState(false)
  const [values, setValues] = useState<WithIdAndRef<Data>[]>()

  useEffect(() => {
    if (query) {
      const unsubscirbe = onSnapshot(query, (snap) => {
        if (snap.empty) {
          setValues(undefined)
        } else {
          setValues(
            snap.docs.map((doc) => ({
              id: doc.id,
              ref: doc.ref,
              ...(doc.data(snapshotOptions) as Data),
            }))
          )
        }

        if (!initialized) setInitialize(true)
      })
      return unsubscirbe
    } else {
      setValues(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return [values, initialized] as const
}
