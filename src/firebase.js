// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { browserSessionPersistence, getAuth, setPersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1IPK0QcJBa3R_GbbKSQfXBNt-60xUMy4",
  authDomain: "meal-planner-devbisht.firebaseapp.com",
  projectId: "meal-planner-devbisht",
  storageBucket: "meal-planner-devbisht.firebasestorage.app",
  messagingSenderId: "968792601427",
  appId: "1:968792601427:web:b407d4eb3479429c3f27a6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Set auth persistence
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log('Auth persistence set to session');
  })
  .catch((error) => {
    console.error('Failed to set persistence:', error);
  });

export { auth };