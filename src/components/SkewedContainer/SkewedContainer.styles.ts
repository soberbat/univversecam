import styled, { css } from "styled-components";

export interface IWrapper {
  isActive: boolean;
  disabled?: boolean;
}

export const Wrapper = styled.div<IWrapper>(
  ({ theme, isActive }) => css`
    position: relative;
    height: 100%;
    background-color: ${isActive
      ? theme.fadedBlueSecondary
      : theme.blueDefault};
    width: fit-content;
    padding: 0rem 0.7rem;
    box-sizing: border-box;
    transform: skew(40deg);
    font-size: 0.55rem;
    font-weight: 600;
    color: ${theme.fadedBlue};
    display: flex;
    align-items: center;
    justify-content: center;

    :hover {
      background-color: ${theme.blueHover};
    }

    ::after {
      content: "";
      height: 4px;
      background-color: ${theme.fadedBlueSecondary};
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 10;
      width: 100%;
      transition: all ease-in 0.1s;

      ${isActive &&
      css`
        background-color: ${theme.glowyBlue};
        box-shadow: 0px 0px 10px 4px rgb(68, 237, 247, 0.5);
      `}
    }
  `
);

export const InnerWrapper = styled.div`
  transform: skew(-40deg);
`;

export const Image = styled.img`
  width: 12px;
`;
