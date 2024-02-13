import styled, { css } from "styled-components";

import { Wrapper } from "../DisplaySection/DisplaySection.styles";
import {
  Wrapper as SkewedWrapper,
  InnerWrapper,
} from "../SkewedContainer/SkewedContainer.styles";
import { mediaLarge } from "../../utils/media";

export const RoutesWrapper = styled(Wrapper)`
  gap: 2rem;
  justify-content: flex-start;
  width: 100%;
  flex-direction: row;

  ${mediaLarge(css`
    width: unset;
    flex-direction: row-reverse;
  `)}
`;

export const SkewedSearch = styled(SkewedWrapper)(
  ({ disabled, theme }) => css`
    font-size: 0.7rem;
    letter-spacing: 0.3rem;
    font-weight: 400;
    cursor: pointer;
    flex: 0.2;
    padding: 0 0.2rem;
    ${disabled &&
    css`
      pointer-events: none;
    `}

    ${mediaLarge(css`
      padding: 0 3rem;
      flex: 1;
    `)}
  `
);

export const SkewedSearchInner = styled(InnerWrapper)`
  text-transform: uppercase;
  font-size: 0.5rem;
  padding: 1rem;

  ${mediaLarge(css`
    font-size: 0.6rem;
  `)}
`;

export const SearchBarsWrapper = styled.div`
  display: flex;
  flex: 1;
  gap: 0.1rem;
`;
