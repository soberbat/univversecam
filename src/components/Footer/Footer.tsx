import React, { useState, useEffect } from "react";
import FooterNavigation from "../FooterNavigation/FooterNavigation";
import FooterTabBar from "../HeaderTabBar/FooterTabBar";
import { InnerWrapper, Wrapper } from "./Footer.styles";
import Sensors from "../Sensors/Sensors";

export default function Footer() {
  const [currentTab, setcurrentTab] = useState("displayTab");

  const changeCurrentTab = (tab: string) => {
    switch (tab) {
      case "Search":
        setcurrentTab("searchTab");
        break;
      case "Display":
        setcurrentTab("displayTab");
        break;
    }
  };
  return (
    <Wrapper>
      <InnerWrapper>
        <FooterTabBar changeCurrentTab={changeCurrentTab} />
        <FooterNavigation currentTab={currentTab} />
        <Sensors />
      </InnerWrapper>
    </Wrapper>
  );
}
