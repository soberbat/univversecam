import styled, { css } from "styled-components";

import { Wrapper } from "../DisplaySection/DisplaySection.styles";
import {
  Wrapper as SkewedWrapper,
  InnerWrapper,
} from "../SkewedContainer/SkewedContainer.styles";

export const RoutesWrapper = styled(Wrapper)``;

export const SkewedSearch = styled(SkewedWrapper)(
  ({ disabled, theme }) => css`
    padding: 0 3rem;
    font-size: 0.7rem;
    letter-spacing: 0.2rem;
    font-weight: 400;
    ${(disabled) => css`
      //   background-color: ${theme.fadedBlueSecondary};
      pointer-events: none;
    `}
  `
);
export const SkewedSearchInner = styled(InnerWrapper)``;
