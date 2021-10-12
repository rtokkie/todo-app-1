import { firestore } from 'firebase-admin'
import * as functions from 'firebase-functions'

const functionsWithRegion = functions.region('asia-northeast1')

export const stack = functionsWithRegion.https.onRequest((request, response) => {
  response.send()
})
