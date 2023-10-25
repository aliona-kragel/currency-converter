export const getFirebaseConfig = () => {
  console.log(process.env.FIREBASE_API_KEY);
  console.log(process.env.FIREBASE_AUTH_DOMAIN);
  console.log(process.env.FIREBASE_PROJECT_ID);
  console.log(process.env.FIREBASE_STORAGE_BUCKET);
  console.log(process.env.FIREBASE_MESSAGING_SENDER_ID);
  console.log(process.env.FIREBASE_APP_ID);
  console.log(process.env.FIREBASE_MEASUREMENT_ID);
  return {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  }
};

export const COLLECTION_NAME = 'currencies';
export const DOCUMENT_ID = 'currencyData';