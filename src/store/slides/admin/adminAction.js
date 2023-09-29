import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { setAdminInfo, setDocsToVefiry, setReportsToVefiry, setUsersForAdmin, updateAdminInfo } from "./adminReducer";
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

export const getDocsToVerify = () => {
  return async (dispatch) => {
    try {
      const querySnapshot = await getDocs(collection(firebaseDB, `verificationDocuments`));
      let docsArray = [];
      querySnapshot.forEach((doc) => {
        docsArray.push({
          id: doc.id,
          ...doc.data()
        })
      });
      dispatch(setDocsToVefiry(docsArray))
    } catch (error) {
      console.log("error getDocsToVerify", error)
    }
  }
}

export const getReportsToVerify = () => {
  return async (dispatch) => {
    try {
      const querySnapshot = await getDocs(collection(firebaseDB, `appointments`));
      let reportsArray = [];
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        reportsArray.push({
          id: doc.id,
          ...doc.data()
        })
      });
      dispatch(setReportsToVefiry(reportsArray))
    } catch (error) {
      console.log("error getReportsToVerify", error)
    }
  }
}

export const getUsersForAdmin = () => {
  return async (dispatch) => {
    try {
      const querySnapshot = await getDocs(collection(firebaseDB, `users`));
      let usersArray = [];
      querySnapshot.forEach((doc) => {
        usersArray.push({
          id: doc.id,
          ...doc.data()
        })
      });
      dispatch(setUsersForAdmin(usersArray))
    } catch (error) {
      console.log("error getDocsToVerify", error)
    }
  }
}
