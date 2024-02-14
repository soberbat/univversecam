import React, { useState } from "react";
import SkewedContainer from "../SkewedContainer/SkewedContainer";
import {
  SkewedTab,
  Wrapper,
  SkewedTabReverse,
  SkewedTabsWrapper,
  CenterView,
  BlackTop,
  FlashDot,
} from "./Header.styles";

export default function Header() {
  const [isSoundOn, setisSoundOn] = useState(true);

  return (
    <Wrapper>
      <BlackTop />
      <SkewedTabsWrapper>
        <SkewedTab></SkewedTab>
        <CenterView />
        <SkewedTabReverse></SkewedTabReverse>
      </SkewedTabsWrapper>
      <FlashDot />
    </Wrapper>
  );
}
