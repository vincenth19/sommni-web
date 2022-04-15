import { createContext, ReactNode, useContext, useState } from "react";
import { decrypt, encrypt } from "./lib/cryptojs";
import { TAppContext, TCartItem, TCustomer } from "./types";

const contextDefaultValues: TAppContext = {
  user: null,
  setUser: () => {},
  username: null,
  setUsername: () => {},
  cartItems: [],
  setCartItems: () => {},
  cartUpdater: () => {},
  updateItemQuantity: (action: string, id: string) => {},
  updateLocalStorageCart: (items: TCartItem[]) => {},
};

const AppContext = createContext<TAppContext>(contextDefaultValues);

export function useContextData() {
  return useContext(AppContext);
}

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [user, setUser] = useState<TCustomer | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<TCartItem[]>([]);

  const getLocalStorageCart = () => {
    if (localStorage.getItem("cartItem")) {
      const encryptedCart = localStorage.getItem("cartItem");

      if (encryptedCart) {
        const decryptedCartString = decrypt(encryptedCart);

        if (decryptedCartString) {
          const cartItemsParsed = JSON.parse(decryptedCartString);
          return cartItemsParsed;
        }
      }
    }
  };

  const cartUpdater = () => {
    setCartItems(getLocalStorageCart());
  };

  const updateLocalStorageCart = (items: TCartItem[]) => {
    setCartItems(items);
    const encryptedCartItems = encrypt(items);
    if (encryptedCartItems) {
      localStorage.setItem("cartItem", encryptedCartItems);
    }
  };

  const getItemIndex = (items: TCartItem[], itemID: string) => {
    let index = 0;
    for (let i = 0; i < items.length; i++) {
      if (items[i].product.id === itemID) {
        index = i;
        break;
      }
    }
    return index;
  };

  const updateItemQuantity = (action: string, id: string) => {
    let items: TCartItem[] = getLocalStorageCart();
    let index: number = getItemIndex(items, id);

    if (action === "delete") {
      items.splice(index, 1);
    } else {
      switch (action) {
        case "add":
          items[index].quantity++;
          break;
        case "reduce":
          items[index].quantity--;
          break;
        default:
          throw new Error("Cart quantity handling error");
      }
    }

    updateLocalStorageCart(items);
  };

  const value = {
    user,
    setUser,
    username,
    setUsername,
    cartItems,
    setCartItems,
    cartUpdater,
    updateItemQuantity,
    updateLocalStorageCart,
  };

  return (
    <>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </>
  );
}

export default AppContext;
