import './firebaseApp'

import { firestore } from 'firebase-admin'
import * as functions from 'firebase-functions'
import { _Todo } from 'shared'

import { Todo, User } from './model'

export const helloWorld = functions.https.onRequest((request, response) => {
  const creator = User.collectionRef().doc()

  const todo: Todo.Data = {
    ..._Todo.defaultData({
      now: firestore.Timestamp.now(),
      creator: { id: creator.id, ref: User.docRef({ userId: creator.id }) },
    }),
  }

  response.send(todo)
})
