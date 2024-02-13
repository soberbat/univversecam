import { FlattenSimpleInterpolation, css } from "styled-components";

export default (
  breakpoint: string,
  styles: string | FlattenSimpleInterpolation
) => css`
  @media screen and (min-width: ${breakpoint}) {
    ${styles}
  }
`;
