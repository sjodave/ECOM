import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  cartProducts: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

export const cartSlice = createSlice({
  name: "cartProducts",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartProducts.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cartProducts));
    },

    deleteCartItem: (state, action) => {
      const modifiedList = state.cartProducts.filter((product) => {
        return product.id !== action.payload;
      });
      state.cartProducts = modifiedList;
      localStorage.setItem(`cart`, JSON.stringify(modifiedList));
    },

    emptyCart: (state, action) => {
      state.cartProducts = [];
      localStorage.setItem(`cart`, []);
    },
  },
});

export const { setCart, deleteCartItem, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
