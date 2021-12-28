import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
    value: []
}

export const notificationToastsSlice = createSlice({
    name: 'toasts',
    initialState,
    reducers: {
        push: (state, action) => {
            action.payload = { ...action.payload, id: uuidv4() }

            state.value = [...state.value, action.payload]
        },
        pop: (state, action) => {
            state.value = [...state.value.filter((toast) => toast.id !== action.payload.id)]
        }
    }
})

export const { push, pop } = notificationToastsSlice.actions

export default notificationToastsSlice.reducer