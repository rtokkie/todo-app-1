import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

import { Todo } from './model'
import { db } from './firebaseApp'

export const helloWorld = functions.https.onRequest((request, response) => {
  const todoData: Todo.Data = {
    content: '',
    completed: false,
    createdAt: admin.firestore.Timestamp.now(),
    updatedAt: admin.firestore.Timestamp.now(),
    deletedAt: null,
    creator: {
      id: '',
      ref: db.collection('users').doc(),
    },
  }

  const todo: Todo.Model = {
    id: '',
    ref: db.collection('todos').doc(),
    ...todoData,
  }

  response.send(todo)
})
