import { addDoc, collection } from "firebase/firestore";
import { firebaseDB } from "../firebase/firebaseConfig";

export const createAppointment = async (appointment) => {
  try {
    await addDoc(collection(firebaseDB, "appointments"), appointment);
    return true
  } catch (error) {
    console.log(error);
    return false
  }
}