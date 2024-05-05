import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
}

const userSlice = createSlice(
    {
        name: 'null',
        initialState,
        reducers: {
            signInStart: (state) => {
                state.loading = true
            },

            signInSuccess: (state, action) => {
                state.currentUser = action.payload
                state.loading
                state.error
            },

            signInFailure: (state, action) => {
                state.error = state.error = action.payload
                state.loading = false
            }
        }
    }
)

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions

export default userSlice.reducer