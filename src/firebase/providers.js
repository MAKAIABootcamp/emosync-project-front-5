import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "./firebaseConfig";

const googleProvider = new GoogleAuthProvider;

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(firebaseAuth, googleProvider)
        const { displayName, email, uid } = result.user;
        const infoUser = {
            ok: true,
            displayName,
            email,
            key: uid
        }
        return infoUser
    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

export const loginWithEmailAndPassword = async (email, password) => {
    try {
        const resp = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const { uid } = resp.user
        return {
            ok: true,
            uid
        }
    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

export const registerUserWithEmailPassword = async ({ email, password }) => {
    try {
        const resp = await createUserWithEmailAndPassword(firebaseAuth, email, password)
        const { uid } = resp.user;
        const infoUser = {
            ok: true,
            uid
        }
        return infoUser
    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}