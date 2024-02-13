import MainView from "./components/MainView/MainView";
import AppContext from "./state/AppContext";
import useApp from "./state/useApp";

function App() {
  const state = useApp();

  return (
    <AppContext.Provider value={state}>
      <MainView />;
    </AppContext.Provider>
  );
}

export default App;
