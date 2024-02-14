import { useRef, useState } from "react";

export default function useApp() {
  const sceneRef = useRef<any | null>(null);
  const [isFactionSearchVisible, setIsFactionSearchVisible] = useState(false);
  const [searchedFaction, setSearchedFaction] = useState("");
  const [camera, setCamera] = useState({
    "3D": true,
    "2D": false,
  });
  const [sensorVisibility, setSensorVisibility] = useState({
    population: false,
    threat: false,
    economy: false,
  });
  const [factionVisibility, setFactionVisibility] = useState({
    banu: false,
    menx: false,
    septor: false,
    namstx: false,
    ka: false,
    px23t: false,
  });

  return {
    sceneRef,
    sensorVisibility,
    factionVisibility,
    searchedFaction,
    camera,
    isFactionSearchVisible,
    setSensorVisibility,
    setFactionVisibility,
    setSearchedFaction,
    setCamera,
    setIsFactionSearchVisible,
  };
}
