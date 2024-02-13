import React, { useEffect, useState } from "react";
import * as S from "./FactionSearch.styles"; // Import styled-components as S
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
    <S.Container>
      <S.InnerContainer>
        <S.Dot />
        <S.LeftPanel>
          <S.SliderWrapper>
            <S.SliderInnerWrapper animate={{ x: `${x.get()}%` }} slide={slide}>
              {[...Array(slide)].map((_, index) => (
                <S.Slide slide={slide} key={index}>
                  <S.HeaderWrap>
                    <S.FactionName>
                      Galactic Alliance of Celestial Explorers (G.A.C.E.)
                    </S.FactionName>
                    <S.FactionGroupName>Banu</S.FactionGroupName>
                  </S.HeaderWrap>

                  <S.Line />

                  <S.Description>
                    The Galactic Alliance of Celestial Explorers is a coalition
                    of advanced civilizations united in their pursuit of
                    knowledge, exploration, and cooperation. Comprising various
                    species and technological marvels, G.A.C.E. stands as a
                    beacon of unity in the vastness of the cosmos.
                  </S.Description>

                  <S.Description>
                    <S.GasAmount>Gas Amount:</S.GasAmount> G.A.C.E. primarily
                    operates within the Nebula Quadrant, a region abundant in
                    exotic gases essential for advanced energy production and
                    propulsion systems. The faction is known for its expertise
                    in harnessing and trading these rare gases.
                  </S.Description>

                  <S.Description>
                    <S.GasAmount>Cultural Exchange Program: </S.GasAmount>
                    G.A.C.E. encourages cultural diversity and understanding
                    among member species through a vibrant Cultural Exchange
                    Program. This program facilitates the sharing of art, music,
                    and traditions, fostering unity and mutual respect.
                  </S.Description>
                </S.Slide>
              ))}
            </S.SliderInnerWrapper>
            <S.SliderNavgiation onClick={onClick} />
          </S.SliderWrapper>
        </S.LeftPanel>

        <AnimatePresence mode="wait">
          <S.RightPanel key={activeSlide}>
            <S.RightPanelRow>
              <S.RightPanelTitle>Leader</S.RightPanelTitle>
              <S.RightPanelText>The Grand Coordinator C.A</S.RightPanelText>
            </S.RightPanelRow>
            <S.RightPanelRow>
              <S.RightPanelTitle>Main Headquarters</S.RightPanelTitle>
              <S.RightPanelText>Nexus Station</S.RightPanelText>
            </S.RightPanelRow>
            <S.RightPanelRow>
              <S.RightPanelTitle>Economy</S.RightPanelTitle>
              <S.RightPanelText>Resource Based</S.RightPanelText>
            </S.RightPanelRow>
            <S.RightPanelRow>
              <S.RightPanelTitle>Distance from The Planet </S.RightPanelTitle>
              <S.RightPanelText>40,000 LY (Andromeda)</S.RightPanelText>
            </S.RightPanelRow>
          </S.RightPanel>
        </AnimatePresence>
      </S.InnerContainer>
    </S.Container>
  );
};

export default FactionSearch;
