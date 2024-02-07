import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: -250%;
  z-index: 9999999999;
  left: 0;
  width: 100%;
  background: rgba(3, 15, 35, 0.472);
  backdrop-filter: blur(10px);
  box-sizing: border-box;
`;

export const InnerWrapper = styled.div``;

export const Selection = styled.div`
  padding: 1% 3%;
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.fadedBlueSecondary};
  }
`;

export const FactionName = styled.span`
  transform: skew(-40deg);
  display: inline-block;
  text-transform: capitalize;
`;

export const FactionLogo = styled.img``;
