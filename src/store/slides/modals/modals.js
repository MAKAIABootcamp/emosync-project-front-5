import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    psychologistInfoActive: false
}

export const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        setPsychologistInfoActive: (state) => {
            state.psychologistInfoActive = !state.psychologistInfoActive;
        }
    }
})

export const { setPsychologistInfoActive } = modalsSlice.actions