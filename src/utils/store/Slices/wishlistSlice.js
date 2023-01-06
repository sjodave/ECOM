import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  wishlistProducts: localStorage.getItem("wishlist")
    ? JSON.parse(localStorage.getItem("wishlist"))
    : [],
};

export const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.wishlistProducts.push(action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.wishlistProducts));
    },
    deleteWishlistItem: (state, action) => {
      const modifiedList = state.wishlistProducts.filter((product) => {
        return product.id !== action.payload;
      });
      state.wishlistProducts = modifiedList;
      localStorage.setItem(`wishlist`, JSON.stringify(modifiedList));
    },
  },
});

export const { setWishlist, deleteWishlistItem } = wishListSlice.actions;
export default wishListSlice.reducer;
