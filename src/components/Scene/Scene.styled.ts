import { motion } from "framer-motion";
import styled from "styled-components";
import { Dot } from "../FactionSearch/FactionSearch.styles";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(3, 15, 35);

  button {
    position: absolute;
    top: 30px;
    z-index: 1000;
  }

  #id {
    position: absolute;
    top: 200px;
    left: 150px;
    z-index: 1000;
  }
`;

export const SceneContainer = styled(motion.div)<{ isVisible: boolean }>`
  width: 100%;
  height: 100%;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
`;
