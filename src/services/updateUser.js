import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../firebase/firebaseConfig";

export const updateAppointmentsPerMonth = async (id) => {
  try {
    const userRef = doc(firebaseDB, `users`, id);
    await updateDoc(userRef, { appointmentsPerMonth: increment(-1) })
    return true
  } catch (error) {
    console.log(error);
    return false
  }
}

export const recoverClientandPenalizePsycho = async (clientId, psychoId) => {
  try {
    const userRef1 = doc(firebaseDB, `users`, clientId);
    const userRef2 = doc(firebaseDB, `users`, psychoId);

    const showClient = await getDoc(userRef1);
    const showPsycho = await getDoc(userRef1);

    const clientCount = showClient.data().appointmentsPerMonth;
    const psychoCount = showPsycho.data().missedAppointments;

    await updateDoc(userRef1, { appointmentsPerMonth: clientCount + 1 })
    await updateDoc(userRef2, { missedAppointments: psychoCount + 1 })

    return true
  } catch (error) {
    console.log(error);
    return false
  }
}