import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { getDocs, getDoc, addDoc, doc, collection, serverTimestamp, updateDoc, query, where } from "firebase/firestore"
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
    getPsychologists: builder.query({
      providesTags: ['psychologists'],
      async queryFn() {
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
  })

})

export const {
  useGetUserByIdQuery,
  useEditInfoUserMutation,
  useGetPsychologistsQuery
} =
  firebaseApi
