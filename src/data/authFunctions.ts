import { auth } from "../lib/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Sign Up Function
export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error during sign-up:", error);
    throw error;
  }
};

// Log In Function
export const logIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error during log-in:", error);
    throw error;
  }
};

// Log Out Function
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error during log-out:", error);
    throw error;
  }
};
