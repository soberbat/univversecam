import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.div).attrs({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
})`
  position: fixed;
  width: 30vw;
  height: 60vh;
  top: 10%;
  right: 2%;
  background: rgba(3, 15, 35, 0.472);
  backdrop-filter: blur(10px);
`;

export const TitleWrap = styled.div`
  background: #44eef71b;
  backdrop-filter: blur(10px);
  padding: 0.4rem;
  border-bottom: 1px solid ${({ theme }) => theme.glowyBlue};
`;
export const Title = styled.h3`
  padding: 0;
  margin: 0;
  text-transform: uppercase;
  text-align: center;
`;

export const InnerContainer = styled.div`
  height: 100%;
`;

export const PlanetInfo = styled.div`
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 8px;
`;

export const PlanetDescription = styled.p`
  margin: 0;
  margin-top: 3%;
  font-size: 0.6rem;
  color: #333;
  color: ${({ theme }) => theme.glowyBlue};
  text-align: justify;
`;
