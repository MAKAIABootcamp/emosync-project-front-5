
export const getUser = (key) => {
    return async (dispatch) => {
        try {
            const userData = await getUserById(key)
            const infoUser = {
                key,
                userRole: userData.role,
                address: userData.address
            }
            dispatch(login(infoUser))
        } catch (error) {
            return error
        }
    }
}





export const getPaymentMethods = (key) => {
    return async (dispatch) => {
        try {
            const deliveryRef = collection(firebaseDB, `users/${key}/paymentMethods`);
            const querySnapshot = await getDocs(deliveryRef);
            const paymentMethods = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            return { data: paymentMethods }
        } catch (error) {
            return false
        }
    }
}

export const addPaymentMethods = (key, cardInfo) => {
    return async (dispatch) => {
        try {
            const deliveryRef = collection(firebaseDB, `users/${key}/paymentMethods`);
            await addDoc(deliveryRef, cardInfo);

        } catch (error) {
            return false
        }
    }
}

export const deletePaymentMethods = (id, key) => {
    return async (dispatch) => {
        try {
            await deleteDoc(doc(firebaseDB, `users/${key}/paymentMethods/${id}`));
        } catch (error) {
            console.log(error)
            return false
        }
    }
}
