import React, { useState } from "react";
import SkewedContainer from "../SkewedContainer/SkewedContainer";
import {
  SkewedTab,
  Wrapper,
  SkewedTabReverse,
  SkewedTabsWrapper,
  CenterView,
  BlackTop,
} from "./Header.styles";

export default function Header() {
  const [isSoundOn, setisSoundOn] = useState(true);

  return (
    <Wrapper>
      <BlackTop />
      <SkewedTabsWrapper>
        <SkewedTab></SkewedTab>
        <CenterView />
        <SkewedTabReverse
          isSoundOn={isSoundOn}
          onClick={() => setisSoundOn(!isSoundOn)}
        ></SkewedTabReverse>
      </SkewedTabsWrapper>
    </Wrapper>
  );
}
