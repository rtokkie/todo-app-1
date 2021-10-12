import { firestore } from 'firebase-admin'
import * as functions from 'firebase-functions'
import { FRONT, SERVER } from 'shared'

const functionsWithRegion = functions.region('asia-northeast1')

export const stack = functionsWithRegion.https.onRequest((request, response) => {
  response.send({ FRONT, SERVER })
})
