import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product/product-Slice";
import cartReducer from "./product/cart-Slice";

export const Store = configureStore({
  reducer: {
    showProduct: productReducer,
    cart: cartReducer,
  },
});
