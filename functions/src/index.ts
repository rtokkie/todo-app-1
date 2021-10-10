import './firebaseApp'

import { firestore } from 'firebase-admin'
import * as functions from 'firebase-functions'
import { _Todo } from 'shared'

import { Todo, User } from './model'

export const helloWorld = functions.https.onRequest((request, response) => {
  const unknownCreator = User.collectionRef().doc()

  const todo: Todo.Data = {
    ..._Todo.defaultData({
      now: firestore.Timestamp.now(),
      creator: { id: unknownCreator.id, ref: User.docRef({ userId: unknownCreator.id }) },
    }),
  }

  response.send(todo)
})
