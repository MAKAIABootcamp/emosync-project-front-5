import { collection, getDocs } from "firebase/firestore";
import { firebaseDB } from "../firebase/firebaseConfig";

export const getNotifications = async (idUser) => {
    try {
        const deliveryRef = collection(firebaseDB, `users/${idUser}/notifications`);
        const querySnapshot = await getDocs(deliveryRef);
        const notifications = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return { data: notifications }
    } catch (error) {
        console.log(error);
        return error
    }
}
