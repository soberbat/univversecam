import { mediaLarge } from "../../utils/media";
import { Dot } from "../FactionSearch/FactionSearch.styles";
import { SkewedView } from "./../HeaderTabBar/FooterTabBar.styles";
import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 6vh;
  z-index: 4;
  position: absolute;

  inset: 0;
  top: 0;

  ${mediaLarge(css`
    height: 4vh;
  `)}
`;

export const BlackTop = styled.div`
  background-color: black;
  height: 0.5rem;
`;

export const SkewedTabsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80%;
`;

export const FlashDot = styled(Dot)`
  width: 5px;
  height: 5px;
  top: 1vh;
  position: fixed;
  right: 2%;

  ${mediaLarge(css`
    top: 5vh;
    right: 0.5%;
  `)}
`;

export const SkewedTab = styled.div`
  transform: skew(-30deg);
  height: 100%;
  box-sizing: border-box;
  background-color: black;
  border-right: 3px solid ${({ theme }) => theme.fadedBlue};
  border-bottom: 2px solid ${({ theme }) => theme.fadedBlue};
  flex: 0.3;
  margin-left: -1rem;

  ${mediaLarge(css`
    flex: 0.08;
  `)}
`;

export const CenterView = styled.div`
  border-top: 1px solid ${({ theme }) => theme.fadedBlue};
  height: 2vh;
  flex: 1;
`;

export const SkewedTabReverse = styled(SkewedTab)`
  transform: skew(30deg);
  margin-left: unset;
  margin-right: -1rem;
  border-right: none;
  border-left: 3px solid ${({ theme }) => theme.fadedBlue};
  transition: all ease-in 0.1s;
`;

export const UnSkewContainer = styled.div`
  transform: skew(-30deg);
  height: 100%;
`;
