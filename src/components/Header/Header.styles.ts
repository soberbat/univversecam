import { SkewedView } from "./../HeaderTabBar/FooterTabBar.styles";
import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  overflow: hidden;

  width: 100%;
  height: 4vh;
  z-index: 2;
  position: absolute;

  inset: 0;
  top: 0;

  padding-top: 0.5rem;
`;

export const SkewedTabsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80%;
`;

export const SkewedTab = styled.div`
  transform: skew(-30deg);
  height: 100%;
  box-sizing: border-box;
  background-color: black;
  border-right: 3px solid ${({ theme }) => theme.fadedBlue};
  border-bottom: 2px solid ${({ theme }) => theme.fadedBlue};
  flex: 0.07;
`;

export const CenterView = styled.div`
  border-top: 1px solid ${({ theme }) => theme.fadedBlue};
  height: 2vh;
  flex: 1;
`;

export const SkewedTabReverse = styled(SkewedTab)<{ isSoundOn: boolean }>`
  transform: skew(30deg);
  border-right: none;
  border-left: 3px solid ${({ theme }) => theme.fadedBlue};
  transition: all ease-in 0.1s;

  ${({ isSoundOn }) =>
    isSoundOn &&
    css`
      border-bottom: 2px solid ${({ theme }) => theme.glowyBlue};
    `}
`;

export const UnSkewContainer = styled.div`
  transform: skew(-30deg);
  height: 100%;
`;
