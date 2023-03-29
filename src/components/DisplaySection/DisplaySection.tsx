import React, { useState } from "react";
import Selectable from "../OnlySelectable/OnlySelectable";
import SkewedContainer from "../SkewedContainer/SkewedContainer";
import {
  cameraData,
  sensorData,
  jumpTunnelsData,
  factions,
} from "./Dipslay.data";
import { Slot, Wrapper } from "./DisplaySection.styles";

export default function DisplaySection() {
  const [setIsActive, setsetIsActive] = useState(false);

  return (
    <Wrapper>
      <Selectable
        isChildImage={false}
        data={cameraData}
        selectionCategory="Camera"
        canSelectMultiple={false}
      />
      <Selectable
        isChildImage={true}
        selectionCategory="Sensors"
        data={sensorData}
        canSelectMultiple={true}
      />
      <Selectable
        isChildImage={false}
        selectionCategory="Jump Tunnels"
        data={jumpTunnelsData}
        canSelectMultiple={true}
      />

      <Selectable
        isChildImage={true}
        selectionCategory="Factions"
        data={factions}
        canSelectMultiple={true}
      />
    </Wrapper>
  );
}
