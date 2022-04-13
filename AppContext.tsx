import { createContext, ReactNode, useContext, useState } from "react";
import { decrypt } from "./lib/cryptojs";
import { TAppContext } from "./types";

const contextDefaultValues: TAppContext = {
  user: null,
  setUser: () => {},
  totalCart: 0,
  cartTotalUpdater: () => {},
};

const AppContext = createContext<TAppContext>(contextDefaultValues);

export function useContextData() {
  return useContext(AppContext);
}

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [user, setUser] = useState<string | null>(null);
  const [totalCart, setTotalCart] = useState<number>(0);

  const cartTotalUpdater = () => {
    if (localStorage.getItem("cartItem")) {
      const encryptedCart = localStorage.getItem("cartItem");

      if (encryptedCart) {
        const decryptedCart = decrypt(encryptedCart);
        console.log("dec", decryptedCart);
        if (decryptedCart) {
          const itemsParsed = JSON.parse(decryptedCart);
          setTotalCart((prev) => (prev = itemsParsed.length));
        }
      }
    }
  };

  const value = {
    user,
    setUser,
    totalCart,
    cartTotalUpdater,
  };

  return (
    <>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </>
  );
}

export default AppContext;
