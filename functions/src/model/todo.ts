import { DocumentReference, Timestamp } from "src/types";
import { _Todo } from "shared";
import { createConvertor } from "src/lib/firestore";
import { db } from "src/firebaseApp";

export type Data = _Todo.Data<DocumentReference, Timestamp>;

export type Model = _Todo.Model<Data, DocumentReference>;

export const convertor = createConvertor<Data>();

export const collectionRef = () => {
  return db.collection(_Todo.collectionPath()).withConverter(convertor);
};

export const docRef = ({ todoId }: { todoId: string }) => {
  return collectionRef().doc(todoId);
};
