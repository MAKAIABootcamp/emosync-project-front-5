import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { getDocs, getDoc, addDoc, doc, collection, serverTimestamp, updateDoc, query, where, increment } from "firebase/firestore"
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
    getAppointPsicho: builder.query({
      providesTags: ['psychoAppoint'],
      async queryFn(key) {
        try {
          const deliveryRef = collection(firebaseDB, "appointments");
          const queryAppointments = await query(deliveryRef,
            where("psychologistKey", "==", key),
            where("status", "in", ["PENDING", "ACCEPTED"]),
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
    }),
    editAppointPsicho: builder.mutation({
      async queryFn({ formData, id }) {
        try {
          console.log(formData);
          const userRef = doc(firebaseDB, `appointments`, id);
          await updateDoc(userRef, formData)
          return true
        } catch (error) {
          console.log(error);
          return error
        }
      },
      invalidatesTags: ['psychoAppoint', 'psychoClients']
    }),
    getClientPsychologist: builder.mutation({
      providesTags: ['psychoClients'],
      async queryFn({ id }) {
        console.log(id);
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
    getClientsPsycho: builder.query({
      providesTags: ['psychoClients'],
      async queryFn({ listIds }) {
        console.log(listIds);
        const q = query(collection(db, 'nombreDeTuColección'), where('id', 'in', listIds));
        try {
          const querySnapshot = await getDocs(q);
          let docsArray = [];
          querySnapshot.forEach((doc) => {
            docsArray.push({
              id: doc.id,
              ...doc.data()
            })
          });
          return {data: docsArray}
        } catch (error) {
          console.log(error);
          return error
        }
      },
    }),
    editHistoryUser: builder.mutation({
      async queryFn({ formHistory, idUser }) {
        try {
          console.log(formHistory);
           const userRef = collection(firebaseDB, `users`, idUser, 'history');
           await addDoc(userRef, formHistory)
          return true
        } catch (error) {
          console.log(error);
          return error
        }
      },
      invalidatesTags: ['psychoAppoint', 'psychoClients']
    }),
    addClientAppointments: builder.mutation({
      async queryFn({  idClient }) {
        try {
                const userRef = doc(firebaseDB, `users`, idClient);
                await updateDoc(userRef, {appointmentsPerMonth: increment(1)})
                return true
        } catch (error) {
          console.log(error);
          return error
        }
      },
    }),
    reduceClientAppointments: builder.mutation({
      async queryFn({  idClient }) {
        try {
                console.log(idClient);
                const userRef = doc(firebaseDB, `users`, idClient);
                await updateDoc(userRef, {appointmentsPerMonth: increment(-1)})
                return true
        } catch (error) {
          console.log(error);
          return error
        }
      },
    }),
    addNotifyUser: builder.mutation({
      async queryFn({ formNotify, idClient }) {
        try {
          console.log(formNotify);
           const userRef = collection(firebaseDB, `users`, idClient, 'notifications');
           await addDoc(userRef, formNotify)
          return true
        } catch (error) {
          console.log(error);
          return error
        }
      },
      invalidatesTags: ['psychoAppoint', 'psychoClients']
    }),

  })

})

export const {
  useGetUserByIdQuery,
  useEditInfoUserMutation,
  useGetVerifDocsQuery,
  useGetVerifReportsQuery,
  useEditDataUserMutation,
  useGetAppointPsichoQuery,
  useEditAppointPsichoMutation,
  useGetClientPsychologistMutation,
  useGetClientsPsychoQuery,
  useEditHistoryUserMutation,
  useAddClientAppointmentsMutation,
  useReduceClientAppointmentsMutation,
  useAddNotifyUserMutation
} = firebaseApi
