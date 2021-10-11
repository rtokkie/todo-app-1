import { firestore } from 'firebase-admin'
import * as functions from 'firebase-functions'
import { _User } from 'shared'

const functionsWithRegion = functions.region('asia-northeast1')

export const helloWorld = functionsWithRegion.https.onRequest((request, response) => {
  response.send(_User.defaultData({ now: firestore.Timestamp.now() }).createdAt)
})
