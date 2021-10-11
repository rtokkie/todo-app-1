import { firestore } from 'firebase-admin'
import * as functions from 'firebase-functions'
import { HELLO_WORLD } from 'shared'

const functionsWithRegion = functions.region('asia-northeast1')

export const helloWorld = functionsWithRegion.https.onRequest((request, response) => {
  response.send(HELLO_WORLD)
})
