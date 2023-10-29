// Import the functions you need from the SDKs you need
import { initializeApp,getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,Auth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId:process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket:process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId:process.env.NEXT_PUBLIC_MESSAGE_SENDER_ID,
  appId:process.env.NEXT_PUBLIC_APP_ID,
  measurementId:process.env.NEXT_PUBLIC_MEASUREMENT_ID
};



let app : any;
try {
  app = initializeApp(firebaseConfig);
} catch (e) {
  app = getApp();
}
 
export { app };
export const auth : Auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)