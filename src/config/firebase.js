import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCy35FFJ_eaGPiG-8Ay9-hEJPVQZpmZ0us",
  authDomain: "reecomm-1.firebaseapp.com",
  projectId: "reecomm-1",
  storageBucket: "reecomm-1.firebasestorage.app",
  messagingSenderId: "627030040807",
  appId: "1:627030040807:web:462ac919e6dfa9e1fe8242",
  measurementId: "G-XCV03JNC7M"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
