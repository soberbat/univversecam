import React, { useContext, useState } from "react";
import Selectable from "../OnlySelectable/OnlySelectable";
import SkewedContainer from "../SkewedContainer/SkewedContainer";
import {
  cameraConfig,
  sensorConfig,
  jumpTunnelsData,
  factionConfig,
} from "./Dipslay.data";
import { Wrapper } from "./DisplaySection.styles";
import AppContext from "../state/AppContext";
import { CameraType, FactionType, SensorType } from "../../types/appTypes";

export default function DisplaySection() {
  const {
    setSensorVisibility,
    sensorVisibility,
    camera,
    sceneRef,
    factionVisibility,
    setFactionVisibility,
    setCamera,
  } = useContext(AppContext);

  const sensorConfigWithState = sensorConfig.map((sensorData) => {
    const key: SensorType = sensorData.description as SensorType;
    return {
      ...sensorData,
      onClick: () => sensorData.onClick(setSensorVisibility),
      isSlotActive: sensorVisibility[key],
    };
  });

  const cameraConfigWithState = cameraConfig.map((cameraData) => {
    const key: CameraType = cameraData.description as CameraType;
    return {
      ...cameraData,
      onClick: () => cameraData.onClick(sceneRef, setCamera),
      isSlotActive: camera[key],
    };
  });

  const factionConfigWithState = factionConfig.map((factionData) => {
    const key: FactionType = factionData.description as FactionType;
    return {
      ...factionData,
      onClick: () => factionData.onClick(sceneRef, setFactionVisibility),
      isSlotActive: factionVisibility[key],
    };
  });

  return (
    <Wrapper>
      <Selectable
        isChildImage={false}
        data={cameraConfigWithState}
        selectionCategory="Camera"
        canSelectMultiple={false}
      />
      <Selectable
        isChildImage={true}
        selectionCategory="Sensors"
        data={sensorConfigWithState}
        canSelectMultiple={true}
      />
      {/* <Selectable
        isChildImage={false}
        selectionCategory="Jump Tunnels"
        data={jumpTunnelsData}
        canSelectMultiple={true}
      /> */}

      <Selectable
        isChildImage={true}
        selectionCategory="Factions"
        data={factionConfigWithState}
        canSelectMultiple={true}
      />
    </Wrapper>
  );
}
