import { doc, getDoc } from "firebase/firestore";
import { firebaseDB } from "../firebase/firebaseConfig";

export const getPsychologist = async (id) => {
    try {
        const userRef = doc(firebaseDB, `users`, id);
        const userSnapshot = await getDoc(userRef);
        const user = userSnapshot.data();
        return { data: user }
      } catch (error) {
        console.log(error);
        return error
      }
}