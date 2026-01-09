import { createSlice } from '@reduxjs/toolkit'

export interface Product {
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

const saveproducts: Product[] = localStorage.getItem("products")? JSON.parse(localStorage.getItem("products") as string) : [];

export interface ProductState {
    value: Product[];
    status: 'idle' | 'loading' | 'failed' | 'success';
}

const initialState: ProductState = {
    value: saveproducts,
    status: saveproducts.length > 0 ? 'success' : 'idle',
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    loadProducts: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("products", JSON.stringify(state.value));
      state.status = 'success';
    },
    setLoading: (state) =>{
      state.status = 'loading';
    },
    setFailed: (state) =>{
      state.status = 'failed';
    },
    deleteProduct: (state, action) => {
      state.value = state.value.filter((item)=> item.id !== action.payload);
      localStorage.setItem("products", JSON.stringify(state.value));
    }
  },
})

// Action creators are generated for each case reducer function
export const { loadProducts, setLoading, setFailed, deleteProduct } = productSlice.actions

export default productSlice.reducer