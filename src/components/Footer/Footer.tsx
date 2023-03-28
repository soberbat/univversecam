import React from "react";
import FooterTabBar from "../HeaderTabBar/FooterTabBar";
import { InnerWrapper, Wrapper } from "./Footer.styles";

export default function Footer() {
  return (
    <Wrapper>
      <InnerWrapper>
        <FooterTabBar />
      </InnerWrapper>
    </Wrapper>
  );
}
