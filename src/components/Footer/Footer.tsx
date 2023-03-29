import React, { useState } from "react";
import FooterNavigation from "../FooterNavigation/FooterNavigation";
import FooterTabBar from "../HeaderTabBar/FooterTabBar";
import { InnerWrapper, Wrapper } from "./Footer.styles";

export default function Footer() {
  const [currentTab, setcurrentTab] = useState("routesTab");

  const changeCurrentTab = (tab: string) => {
    switch (tab) {
      case "Search":
        setcurrentTab("searchTab");
        break;
      case "BOOKMARKS":
        setcurrentTab("bookmarksTab");
        break;
      case "ROUTES":
        setcurrentTab("routesTab");
        break;
      case "DİSPLAY":
        setcurrentTab("displayTab");
        break;
    }
  };
  return (
    <Wrapper>
      <InnerWrapper>
        <FooterTabBar changeCurrentTab={changeCurrentTab} />
        <FooterNavigation currentTab={currentTab} />
      </InnerWrapper>
    </Wrapper>
  );
}
