import React, { useEffect, useState } from "react";
import {
  Container,
  Description,
  Dot,
  FactionGroupName,
  FactionName,
  GasAmount,
  HeaderWrap,
  InnerContainer,
  BackgroundOverlay,
  LeftPanel,
  Line,
  RightPanel,
  RightPanelRow,
  RightPanelText,
  RightPanelTitle,
  Slide,
  SliderInnerWrapper,
  SliderNavgiation,
  SliderWrapper,
} from "./FactionSearch.styles";
import { AnimatePresence, useMotionValue } from "framer-motion";
import { FULL_WIDTH } from "./FactionSearch.config";

const slide = 6;

const FactionSearch = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const x = useMotionValue(0);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    x.set(-(((activeSlide + 1) * FULL_WIDTH) / slide));
    setActiveSlide(activeSlide + 1);
  };

  return (
    <Container>
      <InnerContainer>
        <Dot />
        <LeftPanel>
          <SliderWrapper>
            <SliderInnerWrapper animate={{ x: `${x.get()}%` }} slide={slide}>
              {[...Array(slide)].map((_, index) => (
                <Slide slide={slide}>
                  <HeaderWrap>
                    <FactionName>
                      Galactic Alliance of Celestial Explorers (G.A.C.E.)
                    </FactionName>
                    <FactionGroupName>Banu</FactionGroupName>
                  </HeaderWrap>

                  <Line />
                  <Description>
                    The Galactic Alliance of Celestial Explorers is a coalition
                    of advanced civilizations united in their pursuit of
                    knowledge, exploration, and cooperation. Comprising various
                    species and technological marvels, G.A.C.E. stands as a
                    beacon of unity in the vastness of the cosmos.
                  </Description>

                  <Description>
                    <GasAmount>Gas Amount:</GasAmount> G.A.C.E. primarily
                    operates within the Nebula Quadrant, a region abundant in
                    exotic gases essential for advanced energy production and
                    propulsion systems. The faction is known for its expertise
                    in harnessing and trading these rare gases.
                  </Description>

                  <Description>
                    <GasAmount>Cultural Exchange Program: </GasAmount>
                    G.A.C.E. encourages cultural diversity and understanding
                    among member species through a vibrant Cultural Exchange
                    Program. This program facilitates the sharing of art, music,
                    and traditions, fostering unity and mutual respect.
                  </Description>
                </Slide>
              ))}
            </SliderInnerWrapper>
            <SliderNavgiation onClick={onClick} />
          </SliderWrapper>
        </LeftPanel>

        <AnimatePresence mode="wait">
          <RightPanel key={activeSlide}>
            <RightPanelRow>
              <RightPanelTitle>Leader</RightPanelTitle>
              <RightPanelText>The Grand Coordinator C.A</RightPanelText>
            </RightPanelRow>
            <RightPanelRow>
              <RightPanelTitle>Main Headquarters</RightPanelTitle>
              <RightPanelText>Nexus Station</RightPanelText>
            </RightPanelRow>
            <RightPanelRow>
              <RightPanelTitle>Economy</RightPanelTitle>
              <RightPanelText>Resource Based</RightPanelText>
            </RightPanelRow>
            <RightPanelRow>
              <RightPanelTitle>Distance from The Planet </RightPanelTitle>
              <RightPanelText>40,000 LY (Andromeda)</RightPanelText>
            </RightPanelRow>
          </RightPanel>
        </AnimatePresence>
      </InnerContainer>
    </Container>
  );
};

export default FactionSearch;
