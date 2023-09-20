import { doc, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../firebase/firebaseConfig";

export const updateAppointments = async (property, id) => {
    try {
        const userRef = doc(firebaseDB, `appointments`, id);
        await updateDoc(userRef, property)
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}