import { color, motion } from "framer-motion";
import styled, { css } from "styled-components";
import { Dot } from "../FactionSearch/FactionSearch.styles";
import { mediaLarge } from "../../utils/media";

export const Container = styled(motion.div).attrs({
  exit: { filter: "blur(10px)", opacity: 0 },
})`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(3, 15, 35, 0.224);
  backdrop-filter: blur(45px);
`;

export const InnerContainer = styled(motion.div).attrs({
  transition: {
    duration: 50,
    repeat: Infinity,
    ease: "linear",
  },
  animate: { transform: "rotate(360deg)" },
})`
  background-image: url("/loaderBg.png");
  height: 100%;
  width: 100%;
  background-position: center;
  background-size: 60%;
  pointer-events: none;
  background-repeat: no-repeat;

  ${mediaLarge(css`
    background-size: 30%;
  `)}
`;

export const Continue = styled.div<{ color: string }>`
  margin-bottom: 20vh;
  cursor: pointer;
  border-bottom: 1px solid ${({ color }) => color};
  color: ${({ color }) => color};
`;
