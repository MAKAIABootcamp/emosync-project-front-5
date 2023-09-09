import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isChecking: false,
    key: null,
    userRole: null,
    address: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsChecking: (state) => {
            state.isChecking = !state.isChecking
        },
        login: (state, { payload }) => {
            localStorage.setItem("infoUser", JSON.stringify(payload))
            state.isChecking = false;
            state.key = payload.key
            state.userRole = payload.userRole
            state.address = payload.address
        },
        logout: (state) => {
            state.isChecking = false
            state.key = null
            state.userRole = null
            state.address = null
        },
        updateInfo: (state, { payload }) => {
            state.address = payload;
        }
    }
})

export const { setIsChecking, login, logout, updateInfo } = userSlice.actions
