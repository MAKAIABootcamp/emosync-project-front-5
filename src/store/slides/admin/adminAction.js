import { doc, getDoc, setDoc } from "firebase/firestore";
import { setAdminInfo, updateAdminInfo } from "./adminReducer";
import { firebaseDB } from "../../../firebase/firebaseConfig";

export const getAdminInfo = (adminKey) => {
  return async (dispatch) => {
    try {
      const adminRef = doc(firebaseDB, "users", adminKey);
      const adminSnap = await getDoc(adminRef);
      //console.log("getAdminInfo: ", adminSnap.data())
      const adminObj = {

      }
      dispatch(setAdminInfo(adminSnap.data()))
    } catch (error) {
      console.log("error", error)
    }
  }
}

export const updateAdminInfoFirebase = (id, adminInfo) => {
  return async (dispatch) => {
    try {
      const resp = await setDoc(doc(firebaseDB, "users", id), adminInfo)
      dispatch(setAdminInfo(adminInfo))
    } catch (error) {
      console.log("error en updateAdminInfo", error)
      return null
    }
  }
}
