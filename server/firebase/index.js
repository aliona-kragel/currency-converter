import { getDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../index.js';

export const sendDataToFirestore = async (collectionName, documentId, data) => {
  console.log('--------------------');
  console.log('send data to firestore');
  console.log('--------------------');
  const collectionRef = doc(db, collectionName, documentId);
  console.log('--------------------');
  console.log('get collectionRef');
  console.log(collectionRef);
  console.log('--------------------');
  try {
    await setDoc(collectionRef, data);
    console.log('--------------------');
    console.log('The data has been successfully updated in Firestore');
    console.log('--------------------');
  } catch (error) {
    console.log('--------------------');
    console.error('Error updating data in Firestore', error);
    console.log('--------------------');
  }
}

export const getDataFromFirestore = async (collectionName, documentId) => {
  const documentRef = doc(db, collectionName, documentId);
  console.log('--------------------');
  console.log('get documentRef');
  console.log(documentRef);
  console.log('--------------------');
  try {
    const docSnapshot = await getDoc(documentRef);
    console.log('--------------------');
    console.log('get docSnapshot');
    console.log(docSnapshot);
    console.log('--------------------');

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      console.log('--------------------');
      console.log('snapshot exist and get data');
      console.log(data);
      console.log('--------------------');
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




