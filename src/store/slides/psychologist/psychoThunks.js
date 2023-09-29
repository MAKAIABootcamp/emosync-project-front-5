import { doc, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../../../firebase/firebaseConfig";
import { getAuth, updateEmail } from "firebase/auth";

export const updatePsychoInfoFirebase = (id, adminInfo) => {
  return async (dispatch) => {
    try {
      const docRef = doc(firebaseDB, "users", id)
      const finalDoc = await updateDoc(docRef, adminInfo)
      if (adminInfo?.email) {
        const auth = getAuth();
        const user = auth.currentUser;
        const newEmail = adminInfo.email;
        await updateEmail(user, newEmail)
        console.log("auth cambiado")
      }
    } catch (error) {
      console.log("error en updateAdminInfo", error)
      return null
    }
  }
}