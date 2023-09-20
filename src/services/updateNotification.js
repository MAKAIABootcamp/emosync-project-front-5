import { doc, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../firebase/firebaseConfig";

export const updateNotification = async (property,idUser, id) => {
    try {
        const userRef = doc(firebaseDB, `users/${idUser}/notifications`, id);
        await updateDoc(userRef, property)
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}
