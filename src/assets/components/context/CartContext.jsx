import { createContext, useState } from 'react';

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [numberOfItems, setNumberOfItems] = useState(1);

  return (
    <CartContext.Provider value={{ numberOfItems, setNumberOfItems }}>
      {children}
    </CartContext.Provider>
  );
}