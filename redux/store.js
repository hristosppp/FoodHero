import { configureStore } from "@reduxjs/toolkit";
import cartreducer from "./cartSlice";

export default configureStore({
    reducer: {
        cart: cartreducer,
    }
})
