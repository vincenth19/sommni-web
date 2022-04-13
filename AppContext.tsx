import { createContext, ReactNode, useContext, useState } from "react";
import { TAppContext } from "./types";

const contextDefaultValues: TAppContext = {
  user: null,
  setUser: () => {},
  totalCart: 0,
  setTotalCart: () => {},
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

  const value = {
    user,
    setUser,
    totalCart,
    setTotalCart,
  };

  return (
    <>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </>
  );
}

export default AppContext;
