import styled, { css } from "styled-components";

export const Wrapper = styled.div(
  ({ theme }) => css`
    height: 65%;
    margin-top: 1.5vh;
    border-top: 1px solid ${theme.fadedBlueSecondary};
    border-bottom: 1px solid ${theme.fadedBlueSecondary};
    width: 100%;
    position: relative;

    ::after {
      content: "";
      background-color: ${theme.fadedBlueSecondary};
      position: absolute;
      bottom: 3px;
      z-index: 200;
      height: 1px;
      width: 100%;
    }
  `
);

export const InnerWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 100%;
  padding: 0rem 4rem;
  gap: 2%;
`;
