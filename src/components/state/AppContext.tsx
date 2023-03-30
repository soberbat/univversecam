import React, { createContext } from "react";

export interface IState {
  sceneRef: any;
}

export const State = {
  sceneRef: null,
};

export default createContext<IState>(State);
