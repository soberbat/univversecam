import { Scene } from "three";
import {
  SceneRef,
  setCamera,
  setFactionVisibility,
  setSensorVisibility,
} from "../../types/appTypes";

const cameraConfig = [
  {
    child: "3D",
    description: "3D",
    onClick: (sceneRef: SceneRef, setState: setCamera) => {
      sceneRef!.current.set3dCamera();
      setState({ "2D": false, "3D": true });
    },
    isSlotActive: true,
  },
  {
    child: "2D",
    description: "2D",
    onClick: (sceneRef: SceneRef, setState: setCamera) => {
      sceneRef!.current.set2dCamera();
      setState({ "2D": true, "3D": false });
    },
    isSlotActive: false,
  },
];

const sensorConfig = [
  {
    child: "/icons/radioactive.svg",
    description: "threat",
    onClick: (setState: setSensorVisibility) => {
      setState((prev) => ({ ...prev, threat: !prev.threat }));
    },
    isSlotActive: false,
  },
  {
    child: "/icons/people-fill.svg",
    description: "population",
    onClick: (setState: setSensorVisibility) => {
      setState((prev) => ({ ...prev, population: !prev.population }));
    },
    isSlotActive: false,
  },
  {
    child: "public/icons/cash.svg",
    description: "economy",
    onClick: (setState: setSensorVisibility) => {
      setState((prev) => ({ ...prev, economy: !prev.economy }));
    },
    isSlotActive: false,
  },
];

const factionConfig = [
  {
    child: "/icons/factions/0-circle-fill.svg",
    description: "banu",
    onClick: (sceneRef: SceneRef, setState: setFactionVisibility) => {
      sceneRef!.current.animateFactionVisibility("banu");
      setState((prev) => ({ ...prev, banu: !prev.banu }));
    },
    isSlotActive: false,
  },
  {
    child: "/icons/factions/1-circle-fill.svg",
    description: "menx",
    onClick: (sceneRef: SceneRef, setState: setFactionVisibility) => {
      sceneRef!.current.animateFactionVisibility("menx");
      setState((prev) => ({ ...prev, menx: !prev.menx }));
    },
    isSlotActive: false,
  },
  {
    child: "/icons/factions/2-circle-fill.svg",
    description: "septor",
    onClick: (sceneRef: SceneRef, setState: setFactionVisibility) => {
      sceneRef!.current.animateFactionVisibility("septor");
      setState((prev) => ({ ...prev, septor: !prev.septor }));
    },
    isSlotActive: false,
  },
  {
    child: "/icons/factions/3-circle-fill.svg",
    description: "namstx",
    onClick: (sceneRef: SceneRef, setState: setFactionVisibility) => {
      sceneRef!.current.animateFactionVisibility("namsxt");
      setState((prev) => ({ ...prev, namstx: !prev.namstx }));
    },
    isSlotActive: false,
  },
  {
    child: "/icons/factions/4-circle-fill.svg",
    description: "ka",
    onClick: (sceneRef: SceneRef, setState: setFactionVisibility) => {
      sceneRef!.current.animateFactionVisibility("ka");
      setState((prev) => ({ ...prev, ka: !prev.ka }));
    },
    isSlotActive: false,
  },
  {
    child: "/icons/factions/5-circle-fill.svg",
    description: "px23t",
    onClick: (sceneRef: SceneRef, setState: setFactionVisibility) => {
      sceneRef!.current.animateFactionVisibility("px23t");
      setState((prev) => ({ ...prev, px23t: !prev.px23t }));
    },
    isSlotActive: false,
  },
];

const jumpTunnelsData = [
  {
    child: "Big",
    description: "",
    onClick: () => {
      console.log("3d");
    },
  },
  {
    child: "Medium",
    description: "",
    onClick: () => {
      console.log("3d");
    },
  },
  {
    child: "Large",
    description: "",
    onClick: () => {
      console.log("2d");
    },
  },
];

export { cameraConfig, sensorConfig, jumpTunnelsData, factionConfig };
