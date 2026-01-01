import { createSlice } from '@reduxjs/toolkit'

const saveproducts = localStorage.getItem("products");

const initialState = {
  value: saveproducts? JSON.parse(saveproducts) : [],
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    load: (state, actions)=>{
        state.value = actions.payload;
        localStorage.setItem("products", JSON.stringify(state.value));
    }
  },
})

export const { load } = productSlice.actions

export default productSlice.reducer