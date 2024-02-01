import React, { createContext } from "react";
import { Scene } from "../../Scene/class/Scene";

export interface IState {
  sceneRef: React.MutableRefObject<Scene> | null;
}

export const State = {
  sceneRef: null,
};

export default createContext<IState>(State);
