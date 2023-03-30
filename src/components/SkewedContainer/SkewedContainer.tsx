import React, { useState } from "react";

import { InnerWrapper, Wrapper, Image } from "./SkewedContainer.styles";

interface ISkewedContainer {
  children: any;
  canSelectMultiple?: boolean;
  isActiveSlot?: boolean;
  isChildImage: boolean;
  onClick?: () => void;
}
const SkewedContainer = ({
  children,
  onClick,
  canSelectMultiple,
  isActiveSlot,
  isChildImage,
}: ISkewedContainer) => {
  const [isActive, setisActive] = useState(false);

  const selectSlot = () => {
    canSelectMultiple && setisActive(!isActive);
    onClick && onClick();
  };
  return (
    <Wrapper isActive={isActiveSlot || isActive} onClick={selectSlot}>
      <InnerWrapper>
        {isChildImage ? <Image src={children} /> : children}
      </InnerWrapper>
    </Wrapper>
  );
};

export default SkewedContainer;
