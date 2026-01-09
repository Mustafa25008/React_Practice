import { configureStore } from '@reduxjs/toolkit'
import productSlicer  from './product/productslice'
import cartSlicer from './product/cart-Slice'

export const store = configureStore({
  reducer: {
    showproduct: productSlicer,
    cart: cartSlicer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
