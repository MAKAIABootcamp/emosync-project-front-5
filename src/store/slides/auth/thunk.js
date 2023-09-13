import { doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseDB } from "../../../firebase/firebaseConfig";
import { registerUserWithEmailPassword, signInWithGoogle } from "../../../firebase/providers";
import { login } from "../user/user";

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

export const addNewUser = (id, userInfo) => {
    return async (dispatch) => {
        try {
            console.log("hola")
            // const resp = await setDoc(doc(firebaseDB, "users", id), userInfo)
            const infoLogin = {
                key: id,
                appointmentsPerMonth: userInfo.appointmentsPerMonth,
                cardNumber: userInfo.cardNumber,
                displayName:userInfo.displayName,
                loginMethod: userInfo.loginMethod,
                subscription: userInfo.subscription,
                email: userInfo.email
            }

            dispatch(login(infoLogin))
            return resp && true

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