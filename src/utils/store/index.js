// import { createStore } from 'redux'
// import { rootReducer } from './reducers';
// // prepare the default state
// const state = {
//     auth: null,
// };
// export const store = createStore(
//     rootReducer,
//     state,
// );
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "./api/productsApi";
import { productApi } from "./api/productApi";
import { authApi } from "./api/authApi";
import { signupApi } from "./api/signupApi";
import { cartApi } from "./api/cartApi";
import { categoryApi } from "./api/categoryApi";
import { searchProductApi } from "./api/searchProductApi";

import authSliceReducer from "./Slices/authSlice";
import cartSliceReducer from "./Slices/cartSlice";
import wishListSliceReducer from "./Slices/wishlistSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [signupApi.reducerPath]: signupApi.reducer,

    [productsApi.reducerPath]: productsApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [searchProductApi.reducerPath]: searchProductApi.reducer,

    auth: authSliceReducer,
    wishlist: wishListSliceReducer,
    cartProducts: cartSliceReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(signupApi.middleware)
      .concat(productsApi.middleware)
      .concat(productApi.middleware)
      .concat(cartApi.middleware)
      .concat(categoryApi.middleware)
      .concat(searchProductApi.middleware);
  },
});
setupListeners(store.dispatch);
export * from "./Slices/authSlice";
export * from "./api/authApi";
export * from "./api/productsApi";
export * from "./api/productApi";
export * from "./api/cartApi";
export * from "./api/searchProductApi";
export * from "./api/signupApi";

export * from "./api/categoryApi";
export * from "./Slices/cartSlice";
export * from "./Slices/wishlistSlice";
