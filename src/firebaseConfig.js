// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

// Your web app's Firebase configuration (provided)
const firebaseConfig = {
  apiKey: "AIzaSyCKsn8TxdD8A9OFF9cwt6ye47MS_u-d9I4",
  authDomain: "tecdevweb-15945.firebaseapp.com",
  projectId: "tecdevweb-15945",
  storageBucket: "tecdevweb-15945.firebasestorage.app",
  messagingSenderId: "890282406043",
  appId: "1:890282406043:web:45deca3f79b8957a65563e",
  measurementId: "G-38DNWZYPBP"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Analytics should only be initialized in a browser environment
let analytics = null
if (typeof window !== 'undefined') {
  try{
    analytics = getAnalytics(app)
  }catch(e){
    // analytics may fail in non-browser or restricted environments
    console.warn('Firebase analytics not initialized:', e.message)
  }
}

export const auth = getAuth(app)
export const db = getFirestore(app)
export { analytics }
// export the Firebase app instance for debugging/inspection
// log the initialized options in the browser so you can verify the config
if (typeof window !== 'undefined') {
  try{
    // eslint-disable-next-line no-console
    console.log('Firebase initialized with options:', app.options)
  }catch(e){}
}
export default app
