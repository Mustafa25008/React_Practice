import { createSlice } from '@reduxjs/toolkit'

const savedCart = localStorage.getItem("cart");

const initialState = {
  items: savedCart ? JSON.parse(savedCart) : [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    saveCart: (state, actions)=>{
        state.items.push(actions.payload);
        localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeCart: (state, actions)=>{
        state.items.splice(actions.payload, 1);
        localStorage.setItem("cart", JSON.stringify(state.items));
    }
  },
})

export const { saveCart, removeCart } = cartSlice.actions

export default cartSlice.reducer