import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({

    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {

        addToCart: (state, action) => {
            const itemInCart = state.cart.find((item) => item.id == action.payload.id);
            if (itemInCart) {
                console.log("Đã có trong giỏ hàng");
            } else {

                state.cart.push({ ...action.payload, quantityInCart: 1 })
            }
        },
        removeFromCart: (state, action) => {
            const removeFromCart = state.cart.filter((item) => item.id !== action.payload.id);
            state.cart = removeFromCart;
        },
        loadCart: (state, action) => {
            state.cart = action.payload;
        },
        removeAllItem: (state, action) => {
            const removeAllItem = [];
            state.cart = removeAllItem;
        },
        incrementQuantity: (state, action) => {
            const itemInCart = state.cart.find((item) => item.id == action.payload.id);
            itemInCart.quantityInCart++;
        },
        decrementQuantity: (state, action) => {
            const itemInCart = state.cart.find((item) => item.id == action.payload.id);
            if (itemInCart.quantityInCart == 1) {
                const removeFromCart = state.cart.filter((item) => item.id !== action.payload.id);
                state.cart = removeFromCart;
            } else {
                itemInCart.quantityInCart--;
            }

        }

    }
})
export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, removeAllItem, loadCart } = cartSlice.actions;

export default cartSlice.reducer;