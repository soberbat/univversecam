import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 1%;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -70%;
  left: 0;
  gap: 1vh;
`;

export const SensorName = styled.span`
  font-size: 0.6rem;
  color: ${({ theme }) => theme.blueHover};
`;

export const SensorContainer = styled.div``;
