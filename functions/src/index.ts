import * as functions from 'firebase-functions'

import { auth, db } from './firebaseApp'

const functionsWithRegion = functions.region('asia-northeast1')

export const helloWorld = functionsWithRegion.https.onRequest((request, response) => {
  response.send('Hello World')
})
