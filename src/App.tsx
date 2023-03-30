import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Environment from "./Scene/Scene";
import MainView from "./components/MainView/MainView";
import AppContext from "./components/state/AppContext";
import useApp from "./components/state/useApp";

function App() {
  const state = useApp();

  return (
    <AppContext.Provider value={state}>
      <MainView />;
    </AppContext.Provider>
  );
}

export default App;
