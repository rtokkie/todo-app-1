import { WithIdAndRef } from "./types";

export const collectionPath = () => {
  return "todos";
};

export type Data<DocumentReference, Timestamp> = {
  content: string;
  completed: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt: Timestamp | null;
  creator: {
    id: string;
    ref: DocumentReference;
  };
};

export type Model<Data, DocumentReference> = WithIdAndRef<
  Data,
  DocumentReference
>;
