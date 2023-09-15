import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    psychologistInfoActive: true
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