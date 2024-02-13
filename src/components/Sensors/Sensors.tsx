import { useContext, useEffect, useState } from "react";
import { Container, SensorContainer, SensorName } from "./Sensors.styles";
import SensorBar from "../SensorBar/SensorBar";
import AppContext from "../../state/AppContext";
import { AnimatePresence } from "framer-motion";

enum SensorData {
  threat = "threat",
  population = "population",
  economy = "economy",
}

const Sensors = () => {
  const { sensorVisibility } = useContext(AppContext);
  const [sensorPercantage, setSensorPercantage] = useState({
    population: 50,
    threat: 50,
    economy: 50,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorPercantage({
        population: Math.floor(Math.random() * 101),
        threat: Math.floor(Math.random() * 101),
        economy: Math.floor(Math.random() * 101),
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      {Object.values(SensorData).map(
        (sensor) =>
          sensorVisibility[sensor] && (
            <SensorContainer key={sensor} layout>
              <SensorName>{sensor}</SensorName>
              <SensorBar percentage={sensorPercantage[sensor]}></SensorBar>
            </SensorContainer>
          )
      )}
    </Container>
  );
};

export default Sensors;
