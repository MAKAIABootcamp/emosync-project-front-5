import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isChecking: false,
    appointmentsPerMonth: null,
    cardNumber: null,
    displayName: null,
    loginMethod: null,
    subscription: null,
    email: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsChecking: (state) => {
            state.isChecking = !state.isChecking
        },
        login: (state, { payload }) => {
            state.isChecking = false;
            state.appointmentsPerMonth = payload.appointmentsPerMonth
            state.cardNumber = payload.cardNumber
            state.displayName = payload.displayName
            state.loginMethod = payload.loginMethod
            state.subscription = payload.subscription
            state.email = payload.email
        },
        logout: (state) => {
            state.isChecking = false
            state.appointmentsPerMonth = null
            state.cardNumber = null
            state.displayName = null
            state.loginMethod = null
            state.subscription = null
            state.email = null
        }
    }
})

export const { setIsChecking, login, logout } = userSlice.actions
