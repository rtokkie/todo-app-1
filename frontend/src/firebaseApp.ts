import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'
import { connectStorageEmulator, getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDKZpdYcX5iTLqoNW5XMSEac02jDyr5yLE',
  authDomain: 'playground-67a20.firebaseapp.com',
  projectId: 'playground-67a20',
  storageBucket: 'playground-67a20.appspot.com',
  messagingSenderId: '1008914470267',
  appId: '1:1008914470267:web:77fc11d8586398920bd9de',
  measurementId: 'G-P2RHN4186V',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

const TOKYO = 'asia-northeast1'
export const functions = getFunctions(app, TOKYO)

if (process.env.NODE_ENV !== 'production') {
  connectAuthEmulator(auth, 'http://localhost:9099')
  connectFirestoreEmulator(db, 'localhost', 8080)
  connectStorageEmulator(storage, 'localhost', 9199)
  connectFunctionsEmulator(functions, 'localhost', 5001)
}
