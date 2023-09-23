import { doc, increment, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../firebase/firebaseConfig";

export const updateAppointmentsPerMonth = async (id) => {
    try {
        const userRef = doc(firebaseDB, `users`, id);
        await updateDoc(userRef, {appointmentsPerMonth: increment(-1)})
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}