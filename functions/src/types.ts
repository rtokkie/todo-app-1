import { firestore } from "firebase-admin";

export type WithIdAndRef<Data> = Data & {
  id: string;
  ref: firestore.DocumentReference;
};

export type DocumentReference = firestore.DocumentReference;

export type FieldValue = firestore.FieldValue;

export type Timestamp = firestore.Timestamp;
