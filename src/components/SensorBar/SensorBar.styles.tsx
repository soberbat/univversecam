import { motion } from "framer-motion";
import styled from "styled-components";

export const ProgressBar = styled(motion.div)`
  width: 10vw;
  height: 0.2vh;
  background: rgba(3, 15, 35, 0.472);
  overflow: hidden;
  border: 0.2px solid ${({ theme }) => theme.blueDefault};
`;

export const Bar = styled(motion.div)`
  height: 100%;
`;
