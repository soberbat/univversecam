import React from "react";
import DisplaySection from "../DisplaySection/DisplaySection";
import RoutesSection from "../RoutesSection/RoutesSection";
import SkewedContainer from "../SkewedContainer/SkewedContainer";
import { InnerWrapper, Wrapper } from "./FooterNavigation.styles";

interface IFooterNavigation {
  currentTab: string;
}

interface ITabs {
  [displayTab: string]: JSX.Element;
}
export default function FooterNavigation({ currentTab }: IFooterNavigation) {
  const Tabs: ITabs = {
    ["displayTab"]: <DisplaySection />,
    ["routesTab"]: <RoutesSection />,
    ["bookmarksTab"]: <RoutesSection />,
    ["searchTab"]: <RoutesSection />,
  };
  return (
    <Wrapper>
      <InnerWrapper>{Tabs[currentTab]}</InnerWrapper>
    </Wrapper>
  );
}
