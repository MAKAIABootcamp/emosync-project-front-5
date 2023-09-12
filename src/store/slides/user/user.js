import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isChecking: false,
    key: null,
    appointmentsPerMonth: null,
    cardNumber: null,
    displayName: null,
    loginMethod: null,
    subscription: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsChecking: (state) => {
            state.isChecking = !state.isChecking
        },
        login: (state, { payload }) => {
            localStorage.setItem("key", JSON.stringify(payload.key))
            state.isChecking = false;
            state.key = payload.key
            state.appointmentsPerMonth = payload.appointmentsPerMonth
            state.cardNumber = payload.cardNumber
            state.displayName = payload.displayName
            state.loginMethod = payload.loginMethod
            state.subscription = payload.subscription
        },
        logout: (state) => {
            state = initialState;
        }
    }
})

export const { setIsChecking, login, logout } = userSlice.actions
