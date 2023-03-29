import styled, { css } from "styled-components";
import { Slot } from "../DisplaySection/DisplaySection.styles";

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const OnlySelectableSlot = styled(Slot)`
  height: 100%;
  gap: 0.1rem;
`;

export const SkewedWrapper = styled.div`
  cursor: pointer;
`;

export const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  gap: 0.2rem;
  position: absolute;
  left: 25%;
  font-size: 0.7rem;
`;

export const SlotName = styled.span(
  ({ theme }) => css`
    font-weight: 500;
    color: ${theme.blueHover};
  `
);

export const SelectedCategory = styled.span(
  ({ theme }) => css`
    font-weight: 500;
    color: ${theme.glowyBlue};
  `
);
