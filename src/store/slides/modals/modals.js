import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    modalActive: false
}

export const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        setModalActive: (state) => {
            state.modalActive = !state.modalActive;
        }
    }
})

export const { setModalActive } = modalsSlice.actions