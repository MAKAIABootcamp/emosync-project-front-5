import { collection, getDocs, query, where } from "firebase/firestore";
import { firebaseDB } from "../firebase/firebaseConfig";

export const getPsychologists = async () => {
    const deliveryRef = collection(firebaseDB, "users");
    try {
        const queryPsychologists = await query(deliveryRef, where("userRole", "==", "PSYCHOLOGIST"), where("isVerified", "==", true))
        const dataPsychologists = await getDocs(queryPsychologists);
        let psychologists = []
        dataPsychologists?.forEach((doc) => {
            psychologists.push({
                id: doc.id,
                ...doc.data()
            });
        })
        return { data: psychologists }
    } catch (error) {
        console.log(error);
        return error
    }
}
