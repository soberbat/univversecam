import styled, { css } from "styled-components";
import {
  InnerWrapper,
  Wrapper as SkewedWrapper,
} from "../SkewedContainer/SkewedContainer.styles";
import { mediaLarge } from "../../utils/media";

interface ICaret {
  isExpanded: boolean;
}

export const SkewedSearchInner = styled.div(
  ({ theme }) => css`
    background-color: ${theme.fadedBlueSecondary};
    width: 100%;
  `
);

export const SkewedSearch = styled(SkewedWrapper)(
  ({ theme, isInputField }) => css`
    padding: 0 1rem;
    z-index: 99;
    width: 100%;

    ${isInputField &&
    css`
      :hover {
        background-color: ${theme.blueDefault};
      }
    `}

    ${mediaLarge(css`
      padding: 0 2rem;
      width: unset;
    `)}
  `
);

export const InputFieldWrap = styled.div`
  transform: skew(-38deg);
  padding: 0 0.5rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Selection = styled.div(
  ({ theme }) => css`
    background-color: transparent;
    position: relative;
    text-transform: capitalize;
    font-weight: 300;
    border: none;
    width: 15vw;
    font-size: 0.4rem;
    padding: 0.2rem;
    z-index: 2;

    &:focus {
      outline: none;
      color: ${theme.glowyBlue};
    }

    ${mediaLarge(css``)}
  `
);

export const Caret = styled.img.attrs({
  src: "/icons/caret.svg",
})<ICaret>`
  transform: ${({ isExpanded }) => (isExpanded ? "scale(1)" : "scale(-1)")};
`;

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
