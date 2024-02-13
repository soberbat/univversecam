import React, { useContext, useState } from "react";

import { InnerWrapper, Wrapper, Image } from "./SkewedContainer.styles";
import AppContext from "../../state/AppContext";

interface ISkewedContainer {
  children: any;
  canSelectMultiple?: boolean;
  isActiveSlot?: boolean;
  isChildImage: boolean;
  onClick?: (scene: any) => void;
}
const SkewedContainer = ({
  children,
  onClick,
  canSelectMultiple,
  isActiveSlot,
  isChildImage,
}: ISkewedContainer) => {
  const [isActive, setisActive] = useState(isActiveSlot);
  const { sceneRef } = useContext(AppContext);

  const selectSlot = () => {
    canSelectMultiple && setisActive(!isActive);
    onClick && onClick(sceneRef);
  };
  return (
    <Wrapper isActive={isActiveSlot} onClick={selectSlot}>
      <InnerWrapper>
        {isChildImage ? <Image src={children} /> : children}
      </InnerWrapper>
    </Wrapper>
  );
};

export default SkewedContainer;
