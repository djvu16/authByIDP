import { collection, addDoc } from "firebase/firestore";

export const createDocument = async (db, collectionName, doc) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...doc,
    });
    console.log("Document written with ID: ", docRef.id, docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
