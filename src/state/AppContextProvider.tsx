import AppContext from "./AppContext";
import useApp from "./useApp";

interface IContext {
  children?: any;
}

export default function AppContextProvider({ children }: IContext) {
  const appState = useApp();

  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
}
