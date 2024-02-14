import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import PlanetDetailRow from "../PlanetDetailRow/PlanetDetailRow";
import { mediaLarge } from "../../utils/media";
import { opacityVariant } from "./variants";

interface ISlideCount {
  slide: number;
}

export const Container = styled(motion.div).attrs({
  animate: { filter: "blur(0px)", opacity: 1 },
  initial: { filter: "blur(10px)", opacity: 0 },
  exit: { filter: "blur(10px)", opacity: 0 },
})`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background: rgba(3, 15, 35, 0.472);
  backdrop-filter: blur(10px);
  display: flex;
  padding-top: 25%;
  justify-content: center;
  box-sizing: border-box;
  color: ${({ theme }) => theme.fadedBlueSecondary};

  ${mediaLarge(css`
    padding: unset;
    padding-top: unset;
    align-items: center;
  `)};
`;

export const BackgroundOverlay = styled.div`
  width: 50%;
  height: 50%;
  position: absolute;
  bottom: 0;
  left: 0;
  background-image: url("/assets/factions/Septor.png");
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.1;
  z-index: -1;
`;

export const InnerContainer = styled.div`
  width: 95%;
  height: 70%;
  border: 1px solid ${({ theme }) => theme.fadedBlue};
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px ${({ theme }) => theme.glowyBlue};
  box-shadow: 0 0 100px rgba(3, 15, 35, 0.547);
  padding: 1rem;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: stretch;
  gap: 1rem;
  overflow: hidden;

  ${mediaLarge(css`
    width: 55%;
    height: 50%;
  `)}
`;

export const LeftPanel = styled(motion.div)`
  border-right: 1px solid ${({ theme }) => theme.fadedBlueSecondary};
  flex: 0.7;
`;

export const SliderWrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;

export const SliderNavgiation = styled.div`
  background-color: ${({ theme }) => theme.fadedBlueSecondary};
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 2px;
  background-image: url("/icons/right-arrow.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 90%;
`;

export const Slide = styled(motion.div)<ISlideCount>(
  ({ slide }) => css`
    width: ${`${100 / slide}%`};
    height: 100%;
    display: inline-block;
    pointer-events: all;
    overflow-y: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer/Edge */

    /* Hide scrollbar in Webkit-based browsers */
    &::-webkit-scrollbar {
      display: none;
    }
  `
);

export const HeaderWrap = styled(motion.div)``;

export const FactionName = styled(motion.h4)`
  color: ${({ theme }) => theme.glowyBlue};
  margin: 0;
`;

export const Line = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.fadedBlueSecondary};
  width: 40%;
  margin-top: 1rem;
`;

export const FactionGroupName = styled.h5`
  color: ${({ theme }) => theme.fadedBlue};
  margin: 0;
  text-transform: capitalize;
`;

export const Description = styled.p`
  font-size: 0.7rem;
  text-align: justify;
  width: 95%;
`;

export const GasAmount = styled(motion.span)`
  font-weight: 700;
  color: ${({ theme }) => theme.fadedBlue};
`;

export const RightPanel = styled(motion.div)`
  flex: 0.3;
  position: relative;
  z-index: -1;
  display: flex;

  justify-content: space-around;
  flex-direction: column;
`;

export const RightPanelRow = styled.div``;

export const RightPanelTitle = styled.span`
  display: block;
  font-size: 0.7rem;
  border-bottom: 1px solid ${({ theme }) => theme.fadedBlueSecondary};
`;
export const RightPanelText = styled.span`
  color: ${({ theme }) => theme.fadedBlue};
  font-size: 0.7rem;
`;

export const Dot = styled(motion.span).attrs({
  animate: { opacity: 1 },
  initial: { opacity: 0 },
  transition: {
    duration: 1.5,
    repeat: Infinity,
    repeatType: "reverse",
  },
})`
  position: absolute;
  display: block;
  top: 1%;
  right: 1.5%;
  border-radius: 100%;
  width: 3px;
  height: 3px;
  background-color: ${({ theme }) => theme.glowyBlue};

  ${mediaLarge(css`
    top: 2%;
    right: 1%;
  `)}
`;

export const SliderInnerWrapper = styled(motion.div).attrs({
  transition: {
    ease: "circInOut",
    duration: 1,
  },
})<ISlideCount>(
  ({ slide }) => css`
    width: ${`${slide * 100}%`};
    height: 100%;
    pointer-events: none;
  `
);
