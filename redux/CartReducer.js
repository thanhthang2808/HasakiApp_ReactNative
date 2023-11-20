import { createSlice } from "@reduxjs/toolkit";


const addCartToDatabase = (navigation) => {
    fetch(`http://localhost:3000/carts/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            productId: product.id,
            quantity: 1,
        }),
    })
        .then((response) => response.json())
        .then((responseData) => {
            console.log("User added:", responseData);
            navigation.push('Login')

        })
        .catch((error) => {
            console.error("Error adding user:", error);
        });
};


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
export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, removeAllItem } = cartSlice.actions;

export default cartSlice.reducer;