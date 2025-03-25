


import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMOu_VUnqOnCLsjSM7znIvPj5czAtLGpI",
  authDomain: "taskhandler-ff053.firebaseapp.com",
  projectId: "taskhandler-ff053",
  storageBucket: "taskhandler-ff053.firebasestorage.app",
  messagingSenderId: "490469745837",
  appId: "1:490469745837:web:cadd281684c89a70e8d224",
  measurementId: "G-W3YXZTFYD8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User signed in:", result.user);
    return result.user;
  } catch (error) {
    console.error("Sign-in error:", error);
  }
};


const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Sign-out error:", error);
  }
};

export { auth, signInWithGoogle, logOut };
