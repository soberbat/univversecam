import React, { useContext, useEffect, useState } from "react";
import * as S from "./FactionSearch.styles";
import { FULL_WIDTH, SLIDE_COUNT } from "./FactionSearch.config";
import createData from "../../utils/getData";
import { FactionSearchData } from "../../types/appTypes";
import AppContext from "../../state/AppContext";
import {
  AnimatePresence,
  useAnimationControls,
  useMotionValue,
} from "framer-motion";

const {
  leader,
  factionName,
  description,
  mainHeadquarters,
  economy,
  distanceFromPlanet,
} = createData;

interface IFactionSearch {
  searchedFaction: string;
}

const FactionSearch = ({ searchedFaction }: IFactionSearch) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [data, setData] = useState<FactionSearchData | null>(null);
  const { setIsFactionSearchVisible } = useContext(AppContext);
  const isNavigationActive = activeSlide < SLIDE_COUNT - 1;
  const controls = useAnimationControls();
  const x = useMotionValue(0);

  const getDescriptions = () => {
    return [...Array(3)].map(() => description());
  };

  const onAnimationComplete = async () => {
    await controls.start({ opacity: 0, transition: { duration: 0.1 } });

    setData({
      descriptions: getDescriptions(),
      factionName: factionName(),
      leader: leader(),
      economy: economy(),
      mainHeadquarters: mainHeadquarters(),
      distanceFromPlanet: distanceFromPlanet(),
    });

    controls.start({ opacity: 1 });
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    x.set(-(((activeSlide + 1) * FULL_WIDTH) / SLIDE_COUNT));
    setActiveSlide((activeSlide) =>
      activeSlide < SLIDE_COUNT - 1 ? activeSlide + 1 : activeSlide
    );

    !isNavigationActive && setIsFactionSearchVisible(false);
  };

  useEffect(() => {
    onAnimationComplete();
  }, []);

  if (!data) return <></>;

  return (
    <S.Container>
      <S.InnerContainer>
        <S.Dot />
        <S.LeftPanel>
          <S.SliderWrapper>
            <S.SliderInnerWrapper
              onAnimationComplete={onAnimationComplete}
              animate={{ x: `${x.get()}%` }}
              slide={SLIDE_COUNT}
            >
              {[...Array(SLIDE_COUNT)].map((_, index) => (
                <S.Slide slide={SLIDE_COUNT} animate={controls} key={index}>
                  <S.HeaderWrap>
                    <S.FactionName>{data.factionName}</S.FactionName>
                    <S.FactionGroupName>{searchedFaction}</S.FactionGroupName>
                  </S.HeaderWrap>
                  <S.Line />
                  <S.Description>{data.descriptions[0]}</S.Description>
                  <S.Description>
                    <S.GasAmount>Gas Amount:</S.GasAmount>{" "}
                    {data.descriptions[1]}
                  </S.Description>
                  <S.Description>
                    <S.GasAmount>Cultural Exchange Program:</S.GasAmount>
                    {data.descriptions[2]}
                  </S.Description>
                </S.Slide>
              ))}
            </S.SliderInnerWrapper>
            <S.SliderNavgiation isActive={isNavigationActive} onClick={onClick}>
              {isNavigationActive ? "" : "X"}
            </S.SliderNavgiation>
          </S.SliderWrapper>
        </S.LeftPanel>

        <AnimatePresence mode="wait">
          <S.RightPanel animate={controls}>
            <S.RightPanelRow>
              <S.RightPanelTitle>Leader</S.RightPanelTitle>
              <S.RightPanelText>{data.leader}</S.RightPanelText>
            </S.RightPanelRow>
            <S.RightPanelRow>
              <S.RightPanelTitle>Main Headquarters</S.RightPanelTitle>
              <S.RightPanelText>{data.mainHeadquarters}</S.RightPanelText>
            </S.RightPanelRow>
            <S.RightPanelRow>
              <S.RightPanelTitle>Economy</S.RightPanelTitle>
              <S.RightPanelText>{data.economy}</S.RightPanelText>
            </S.RightPanelRow>
            <S.RightPanelRow>
              <S.RightPanelTitle>Distance from The Planet </S.RightPanelTitle>
              <S.RightPanelText>{data.distanceFromPlanet}</S.RightPanelText>
            </S.RightPanelRow>
          </S.RightPanel>
        </AnimatePresence>
      </S.InnerContainer>
    </S.Container>
  );
};

export default FactionSearch;
