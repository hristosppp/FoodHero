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
            state = initialState;
        }
    }
})

export const { addProducts, leeren} = cartSlice.actions;
export default cartSlice.reducer;