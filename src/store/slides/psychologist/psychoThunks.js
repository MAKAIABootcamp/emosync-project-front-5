import { doc, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../../../firebase/firebaseConfig";

export const updatePsychoInfoFirebase = (id, adminInfo) => {
  return async (dispatch) => {
    try {
      const docRef = doc(firebaseDB, "users", id)
      const finalDoc = await updateDoc(docRef, adminInfo)
    } catch (error) {
      console.log("error en updateAdminInfo", error)
      return null
    }
  }
}