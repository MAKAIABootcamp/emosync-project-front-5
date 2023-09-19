import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    modalActive: false,
    modalAuxActive: false
}

export const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        setModalActive: (state) => {
            state.modalActive = !state.modalActive;
        },
        setModalAuxActive: (state) => {
            state.modalAuxActive = !state.modalAuxActive;
        }
    }
})

export const { setModalActive, setModalAuxActive } = modalsSlice.actions