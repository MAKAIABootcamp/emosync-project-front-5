import { firebaseDB } from "../../../firebase/firebaseConfig";
import { registerUserWithEmailPassword, signInWithGoogle } from "../../../firebase/providers";

export const startGoogle = () => {
    return async (dispatch) => {
        try {
            const resp = await signInWithGoogle()
            if (resp.ok) {
                console.log(resp)
                return true
            }
        } catch (error) {
            return false
        }
    }
}