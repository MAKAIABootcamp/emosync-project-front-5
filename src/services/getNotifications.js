import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { firebaseDB } from "../firebase/firebaseConfig";

export const getNotifications = async (idUser) => {
    try {
        const deliveryRef = collection(firebaseDB, `users/${idUser}/notifications`);
        const dataNotificaciones = query(deliveryRef, orderBy("createdAt", "desc"), limit(10))
        const querySnapshot = await getDocs(dataNotificaciones);
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
