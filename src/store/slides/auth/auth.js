import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    authMethod: null,
    typeUser: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuthenticated: (state) => {
            state.isAuthenticated = !state.isChecking
        },
        updateInfo: (state, { payload }) => {
            state.authMethod = payload.authMethod;
            state.typeUser = payload.typeUser;
        }
    }
})

export const { setIsAuthenticated, updateInfo } = authSlice.actions