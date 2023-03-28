import React, { useState } from "react";
import {
  ButtonWrapper,
  SkewedView,
  TabItem,
  Wrapper,
} from "./FooterTabBar.styles";

export default function FooterTabBar() {
  const [activeTab, setactiveTab] = useState<number>(1);
  const tabItems = ["SEARCH", "BOOKMARKS", "ROUTES", "DİSPLAY"];
  const handleTabClick = (i: number) => setactiveTab(i);

  return (
    <Wrapper>
      {tabItems.map((tabItem, i) => {
        const isActive = i === activeTab;
        return (
          <ButtonWrapper onClick={() => handleTabClick(i)} activeTab={isActive}>
            <SkewedView activeTab={isActive}>
              <TabItem activeTab={isActive}>{tabItem}</TabItem>
            </SkewedView>
          </ButtonWrapper>
        );
      })}
    </Wrapper>
  );
}
