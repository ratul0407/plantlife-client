// // wishlistMiddleware.ts
// import type { Middleware } from "@reduxjs/toolkit";
// import {
//   addToReduxWishlist,
//   removeFromReduxWishlist,
//   setReduxWishlist,
// } from "./wishlistSlice";

// export const wishlistMiddleware: Middleware = (store) => (next) => (action) => {
//   const result = next(action);

//   if (
//     addToReduxWishlist.match(action) ||
//     removeFromReduxWishlist.match(action) ||
//     setReduxWishlist.match(action)
//   ) {
//     const state = store.getState();
//     try {
//       localStorage.setItem("wishlist", JSON.stringify(state.wishlist.items));
//     } catch (err) {
//       console.error("Failed to save wishlist", err);
//     }
//   }

//   return result;
// };
