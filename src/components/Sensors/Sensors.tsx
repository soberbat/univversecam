import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

import React, { useEffect, useState } from "react";
import { Container, SensorContainer, SensorName } from "./Sensors.styles";
import SensorBar from "../SensorBar/SensorBar";

const Sensors = () => {
  const [percentage, setPercentage] = useState(50);
  const [percentage2, setPercentage2] = useState(50);
  const [percentage3, setPercentage3] = useState(50);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage(Math.floor(Math.random() * 101));
      setPercentage2(Math.floor(Math.random() * 101));
      setPercentage3(Math.floor(Math.random() * 101));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <SensorContainer>
        <SensorName>Population</SensorName>
        <SensorBar percentage={percentage} />
      </SensorContainer>
      <SensorContainer>
        <SensorName>Threat</SensorName>
        <SensorBar percentage={percentage2} />
      </SensorContainer>
      <SensorContainer>
        <SensorName>Economy</SensorName>
        <SensorBar percentage={percentage3} />
      </SensorContainer>
    </Container>
  );
};

export default Sensors;
