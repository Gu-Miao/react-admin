import { configureStore } from '@reduxjs/toolkit'
import user from './user'

const store = configureStore({
  reducer: {
    user
  }
})

export type Store = ReturnType<typeof store.getState>

export default store
