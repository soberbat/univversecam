import React, { useState } from "react";
import {
  ButtonWrapper,
  SkewedView,
  TabItem,
  Wrapper,
} from "./FooterTabBar.styles";

interface IFooterTabBar {
  changeCurrentTab: (tab: string) => void;
}
export default function FooterTabBar({ changeCurrentTab }: IFooterTabBar) {
  const tabItems = ["SEARCH", "BOOKMARKS", "ROUTES", "DİSPLAY"];
  const [activeTab, setactiveTab] = useState<number>(1);
  const handleTabClick = (i: number, tab: string) => {
    setactiveTab(i);
    changeCurrentTab(tab);
  };

  return (
    <Wrapper>
      {tabItems.map((tabItem, i) => {
        const isActive = i === activeTab;
        return (
          <ButtonWrapper
            onClick={() => handleTabClick(i, tabItem)}
            activeTab={isActive}
          >
            <SkewedView activeTab={isActive}>
              <TabItem activeTab={isActive}>{tabItem}</TabItem>
            </SkewedView>
          </ButtonWrapper>
        );
      })}
    </Wrapper>
  );
}
