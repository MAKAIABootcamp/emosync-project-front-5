import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../firebase/firebaseConfig";

export const createVerificationDocument = async (VerDoc) => {
  try {
    await addDoc(collection(firebaseDB, "verificationDocuments"), VerDoc);
    return true
  } catch (error) {
    console.log(error);
    return false
  }
}

export const editVerificationDocument = async (docId, docInfo) => {
  try {
    const docRef = doc(firebaseDB, "verificationDocuments", docId)
    const finalDoc = await updateDoc(docRef, docInfo)
    return true
  } catch (error) {
    console.log(error);
    return false
  }
}

export const createNotificationToPsycho = async (idUser, docInfo) => {
  try {
    await addDoc(collection(firebaseDB, `users/${idUser}/notifications`), docInfo);
    return true
  } catch (error) {
    console.log(error);
    return false
  }
}

export const updatePsychoFromVerDoc = async (id, adminInfo) => {
  try {
    const docRef = doc(firebaseDB, "users", id);
    const finalDoc = await updateDoc(docRef, adminInfo);
    return true
  } catch (error) {
    console.log(error);
    return false
  }
}