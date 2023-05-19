import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        products: [],
        totalSum: 0,
        cAmount: 0
    },
    reducers: {
        addProducts: (state, action) => {
            state.products.push(action.payload);
            state.cAmount += 1;
            state.totalSum += action.payload.preis * action.payload.menge;
        },
        leeren: (state) => {
            state.products = [];
            state.cAmount = 0;
            state.totalSum = 0;
        },
        removeProduct: (state, action) => {
            const leftProducts = state.products.filter( product => product._id !== action.payload._id);
            state.products = leftProducts;
            state.cAmount -= 1;
            state.totalSum -= action.payload.preis * action.payload.menge;
        }
    }
})

export const { addProducts, leeren, removeProduct} = cartSlice.actions;
export default cartSlice.reducer;