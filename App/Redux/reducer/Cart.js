import { createSlice } from "@reduxjs/toolkit";

export const cart = createSlice({
    name: "Cart",
    initialState: {
        initialCart: [],
        CartData: []
    },

    reducers: {
        setAddInitialCart(state, action) {
            state.initialCart.push(action.payload);
        },
        setInitialCart(state, action) {
            state.initialCart = action.payload;
        },

        setDeleteCartItem(state, action) {
            const index = state.initialCart.findIndex((item) => item.id === action.payload.id);
            if (index !== -1) {
                state.initialCart.splice(index, 1);
            }
        },
        setQuantityUpdate(state, action) {
            state.initialCart = [...state.initialCart, action.payload]
        },
        setCartContentUpdate(state, action) {
            let item = state.CartData.some((item) => item.id === action.payload.id);
            if (!item) { state.CartData = [...state.CartData, action.payload] }
        },
        CartDataUpdated(state, action) {
            const index = state.CartData.filter((item) => item.id !== action.payload.id);
            state.CartData = index
        },
        afterDeleteProductFromCart(state, action) {
            state.initialCart = state.initialCart.filter((item) => item.id !== action.payload);
        }
    }
});

export const {
    setAddInitialCart,
    setInitialCart,
    setDeleteCartItem,
    setQuantityUpdate,
    setCartContentUpdate,
    CartDataUpdated,
    afterDeleteProductFromCart
} = cart.actions;

export default cart.reducer;
