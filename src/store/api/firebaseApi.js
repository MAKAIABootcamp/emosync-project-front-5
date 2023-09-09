import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { getDocs, getDoc, addDoc, doc, collection, serverTimestamp, updateDoc } from "firebase/firestore"
import { firebaseDB } from '../../firebase/firebaseConfig';
import { getAuth, updateEmail } from "firebase/auth";

export const firebaseApi = createApi({
  reducerPath: 'firebaseAPI',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getUserById: builder.query({
      providesTags: ['user', 'defaultCache'],
      async queryFn(id) {
        try {
          const userRef = doc(firebaseDB, `users`, id);
          const userSnapshot = await getDoc(userRef);
          const user = userSnapshot.data();
          return { data: user }
        } catch (error) {
          console.log(error);
          return error
        }
      }
    }),
    editInfoUser: builder.mutation({
      async queryFn({ formData, key }) {
        try {
          const userRef = doc(firebaseDB, `users`, key);
          const resp = await updateDoc(userRef, formData)
          if (formData?.email) {
            const auth = getAuth();
            const user = auth.currentUser;
            const newEmail = formData.email;
            await updateEmail(user, newEmail)
          }
          return true
        } catch (error) {
          console.log(error);
          return error
        }
      },
      invalidatesTags: ['user']
    }),
    // patchOrder: builder.mutation({
    //   providesTags: ['defaultCache'],
    //   async queryFn(objState, orderId) {
    //     try {
    //       const orderRef = doc(firebaseDB, `orders`, orderId);
    //       await updateDoc(orderRef, objState)
    //       return "hola"
    //     } catch (error) {
    //       console.log(error);
    //       return error
    //     }
    //   },
    //   invalidatesTags: ['orders']
    // }),
  })

})

export const {
  useGetUserByIdQuery,
  useEditInfoUserMutation,
 } =
  firebaseApi

