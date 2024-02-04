import React, { createContext } from "react";
import { Scene } from "../../Scene/class/Scene";
import {
  setCamera,
  setFactionVisibility,
  setSensorVisibility,
} from "../../types/appTypes";

export interface IState {
  sceneRef: React.MutableRefObject<Scene> | null;
  setSensorVisibility: setSensorVisibility;
  sensorVisibility: {
    population: boolean;
    threat: boolean;
    economy: boolean;
  };
  camera: {
    "3D": boolean;
    "2D": boolean;
  };
  factionVisibility: {
    banu: boolean;
    menx: boolean;
    septor: boolean;
    namstx: boolean;
    ka: boolean;
    px23t: boolean;
  };
  setFactionVisibility: setFactionVisibility;
  setCamera: setCamera;
}

export const State = {
  sceneRef: null,
  sensorVisibility: {
    population: false,
    threat: false,
    economy: false,
  },
  factionVisibility: {
    banu: false,
    menx: false,
    septor: false,
    namstx: false,
    ka: false,
    px23t: false,
  },
  camera: {
    "3D": true,
    "2D": false,
  },
  setSensorVisibility: () => {},
  setCamera: () => {},
  setFactionVisibility: () => {},
};

export default createContext<IState>(State);
