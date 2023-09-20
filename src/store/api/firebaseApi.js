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
    getVerifDocs: builder.query({
      providesTags: ['Docs', 'defaultCache'],
      async queryFn() {
        try {
          const querySnapshot = await getDocs(collection(firebaseDB, `verificationDocuments`));
          let docsArray = [];
          querySnapshot.forEach((doc) => {
            //console.log(doc.id, " => ", doc.data());
            docsArray.push({
              id: doc.id,
              ...doc.data()
            })
          });
          return { data: docsArray }
        } catch (error) {
          console.log(error);
          return error
        }
      }
    }),
    getVerifReports: builder.query({
      providesTags: ['Reports', 'defaultCache'],
      async queryFn() {
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
          return { data: reportsArray }
        } catch (error) {
          console.log(error);
          return error
        }
      }
    }),
    editDataUser: builder.mutation({
      async queryFn({ formData, key }) {
        try {
          const userRef = doc(firebaseDB, `users`, key);
          const resp = await updateDoc(userRef, formData)
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
  useGetVerifDocsQuery,
  useGetVerifReportsQuery,
  useEditDataUserMutation
} = firebaseApi
