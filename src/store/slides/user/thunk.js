import { editInfo } from "./user";
import { doc, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../../../firebase/firebaseConfig";
import { getAuth, updateEmail } from "firebase/auth";

export const editInfoUser = ({ formData, key }) => {
    return async (dispatch) => {
        try {
            dispatch(editInfo(formData))
            const userRef = doc(firebaseDB, `users`, key);
            await updateDoc(userRef, formData)
            if (formData?.email) {
                const auth = getAuth();
                const user = auth.currentUser;
                const newEmail = formData.email;
                await updateEmail(user, newEmail)
            }
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }
}