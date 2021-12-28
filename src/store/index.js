import { configureStore } from '@reduxjs/toolkit'
import notificationToastsSliceReducer from './notificationToastsSlice'

export const store = configureStore({
    reducer: {
        toasts: notificationToastsSliceReducer
    }
})