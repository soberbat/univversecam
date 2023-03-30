import styled, { css } from "styled-components";
import {
  InnerWrapper,
  Wrapper as SkewedWrapper,
} from "../SkewedContainer/SkewedContainer.styles";

export const SkewedSearchInner = styled.div(
  ({ theme }) => css`
    background-color: ${theme.fadedBlueSecondary};
  `
);

export const SkewedSearch = styled(SkewedWrapper)(
  ({ theme, isInputField }) => css`
    padding: 0 2rem;
    ${isInputField &&
    css`
      :hover {
        background-color: ${theme.blueDefault};
      }
    `}
  `
);

export const InputFieldWrap = styled.div`
  transform: skew(-38deg);
  padding: 0 0.5rem;
  position: relative;
`;

export const InputField = styled.input(
  ({ theme }) => css`
    background-color: transparent;
    position: relative;
    border: none;
    width: 13vw;
    padding: 0.2rem;
    z-index: 2;

    &:focus {
      outline: none;
      color: ${theme.glowyBlue};
    }
  `
);

export const Skew = styled.div(
  ({ theme }) => css`
    position: absolute;
    transform: skew(38deg);
    background-color: ${theme.fadedBlueSecondary};
    width: 115%;
    z-index: 1;
    height: 100%;
  `
);

export const SearchIcon = styled.img.attrs({ src: "/icons/search.svg" })`
  width: 13px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
  top: 50%;
  right: 0%;
  transform: translate(-50%, -50%);
`;
