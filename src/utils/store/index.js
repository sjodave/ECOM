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
import { cartApi } from "./api/cartApi";
import { categoryApi } from "./api/categoryApi";

import authSliceReducer from "./Slices/authSlice";
import cartSliceReducer from "./Slices/cartSlice";
import wishListSliceReducer from "./Slices/wishlistSlice";
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    auth: authSliceReducer,
    wishlist: wishListSliceReducer,
    cartProducts: cartSliceReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(productsApi.middleware)
      .concat(productApi.middleware)
      .concat(cartApi.middleware)
      .concat(categoryApi.middleware);
  },
});
setupListeners(store.dispatch);
export * from "./Slices/authSlice";
export * from "./api/authApi";
export * from "./api/productsApi";
export * from "./api/productApi";
export * from "./api/cartApi";
export * from "./api/categoryApi";
export * from "./Slices/cartSlice";
export * from "./Slices/wishlistSlice";
