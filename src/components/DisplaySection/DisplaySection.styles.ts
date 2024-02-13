import styled, { css } from "styled-components";
import { mediaLarge } from "../../utils/media";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 2rem;

  ${mediaLarge(css`
    gap: 7rem;
  `)}
`;

export const Slot = styled.div`
  display: flex;
`;
