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
  const [activeTab, setactiveTab] = useState<number>(1);
  const tabItems = ["Search", "Display"];
  const handleTabClick = (i: number, tab: string) => {
    setactiveTab(i);
    changeCurrentTab(tab);
  };

  return (
    <Wrapper>
      {tabItems.map((tabName, i) => {
        const isActive = i === activeTab;
        return (
          <ButtonWrapper
            onClick={() => handleTabClick(i, tabName)}
            activeTab={isActive}
          >
            <SkewedView activeTab={isActive}>
              <TabItem activeTab={isActive}>{tabName.toUpperCase()}</TabItem>
            </SkewedView>
          </ButtonWrapper>
        );
      })}
    </Wrapper>
  );
}
