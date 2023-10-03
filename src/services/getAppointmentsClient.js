import { collection, getDocs, query, where } from "firebase/firestore";
import { firebaseDB } from "../firebase/firebaseConfig";

export const getAppointmentsClient = async (key) => {
    try {
        const deliveryRef = collection(firebaseDB, "appointments");
        const queryAppointments = await query(deliveryRef, where("status", "==", "ACCEPTED"), where("clientKey", "==", key))
        const dataAppointments = await getDocs(queryAppointments);
        let appointments = []
        dataAppointments?.forEach((doc) => {
            appointments.push({
                id: doc.id,
                ...doc.data()
            });
        })
        return { data: appointments }
    } catch (error) {
        console.log(error);
        return error
    }
}

export const getAppointmentsPsicologists = async (key, start, end) => {
    try {
        const deliveryRef = collection(firebaseDB, "appointments");
        const queryAppointments = await query(deliveryRef,
            where("psychologistKey", "==", key),
            where("status", "in", ["PENDING","ACCEPTED"]),
            where("appointmentDate", ">=", start),
            where("appointmentDate", "<=", end)
            )
        const dataAppointments = await getDocs(queryAppointments);
        let appointments = []
        dataAppointments?.forEach((doc) => {
            appointments.push({
                id: doc.id,
                ...doc.data()
            });
        })
        return { data: appointments }
    } catch (error) {
        console.log(error);
        return error
    }
}