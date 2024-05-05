import React, {useState, createContext} from 'react';

export const CartContext = createContext();

const CartContextData = ({children}) => {

    const [cartNumber, setCartNumber] = useState('');
    const [cartTotalAmount, setCartTotalAmount] = useState('');

    return (
        <CartContext.Provider value={{cartNumber, setCartNumber, cartTotalAmount, setCartTotalAmount}}>
            {children}
        </CartContext.Provider>      
    )
}

export default CartContextData;