import { createSlice } from '@reduxjs/toolkit'

export interface Cart {
    id: number;
    title?: string;
    price?: number;
    description?: string;
    category?: string;
    image?: string;
    rating?: {
        rate: number;
        count: number;
    };
}

export interface CartState {
    items: Cart[];
}

const savedCart: Cart[] = localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart") as string) : [];

const initialState : CartState = {
  items: savedCart,

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