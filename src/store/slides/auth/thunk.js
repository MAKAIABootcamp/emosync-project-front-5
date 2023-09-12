import { doc, getDoc } from "firebase/firestore";
import { firebaseDB } from "../../../firebase/firebaseConfig";
import { registerUserWithEmailPassword, signInWithGoogle } from "../../../firebase/providers";

export const startGoogle = () => {
    return async (dispatch) => {
        try {
            const resp = await signInWithGoogle()
            if (resp.ok) {
                return resp
            }
        } catch (error) {
            return false
        }
    }
}

export const getUserById = async (id) => {
    const userRef = doc(firebaseDB, `users`, id);
    const userSnapshot = await getDoc(userRef);
    return userSnapshot.data();
}