import { getDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../index.js';

export const sendDataToFirestore = async (collectionName, documentId, data) => {
  const collectionRef = doc(db, collectionName, documentId);
  try {
    await setDoc(collectionRef, data);
    console.log('The data has been successfully updated in Firestore');
  } catch (error) {
    console.error('Error updating data in Firestore', error);
  }
}

export const getDataFromFirestore = async (collectionName, documentId) => {
  const documentRef = doc(db, collectionName, documentId);
  try {
    const docSnapshot = await getDoc(documentRef);
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      return data;
    } else {
      console.log('The document was not found in Firestore');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data from Firestore.', error);
    return null;
  }
}




