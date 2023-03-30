import React, { useState } from "react";
import SkewedContainer from "../SkewedContainer/SkewedContainer";
import {
  SkewedTab,
  Wrapper,
  SkewedTabReverse,
  SkewedTabsWrapper,
  CenterView,
  TabInner,
} from "./Header.styles";

export default function Header() {
  const [isSoundOn, setisSoundOn] = useState(true);

  return (
    <Wrapper>
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
